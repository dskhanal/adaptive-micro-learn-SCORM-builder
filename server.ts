import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import multer from 'multer';
import AdmZip from 'adm-zip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = '0.0.0.0';

const MAX_BYTES = 64 * 1024 * 1024; // 64MB limit matching original config
const projectFile = process.env.ADAPTIVE_SCORM_PROJECT_FILE || path.join(__dirname, 'api', 'data', 'project.json');
const COURSES_DIR = path.join(__dirname, 'courses');

// Ensure courses directory exists
if (!fs.existsSync(COURSES_DIR)) {
  fs.mkdirSync(COURSES_DIR, { recursive: true, mode: 0o777 });
}

app.use(express.json({ limit: '64mb' }));
app.use(express.urlencoded({ extended: true, limit: '64mb' }));

// Helper to clean old temp course folders
function cleanOldCourses(baseDir: string) {
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true, mode: 0o777 });
    return;
  }
  try {
    const items = fs.readdirSync(baseDir);
    for (const item of items) {
      const itemPath = path.join(baseDir, item);
      try {
        fs.rmSync(itemPath, { recursive: true, force: true });
      } catch (err) {
        console.warn('Could not clean old course:', itemPath, err);
      }
    }
  } catch (err) {
    console.warn('Error reading courses dir for cleanup:', err);
  }
}

// Helper to process uploaded ZIP file and determine launch info
function processCourseZip(zipBuffer: Buffer, studentName = 'Jane Doe', studentId = 'user_12345') {
  cleanOldCourses(COURSES_DIR);

  const courseId = `course_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const targetDir = path.join(COURSES_DIR, courseId);
  fs.mkdirSync(targetDir, { recursive: true, mode: 0o777 });

  const zip = new AdmZip(zipBuffer);
  zip.extractAllTo(targetDir, true);

  let entryPoint = 'index.html';
  let standard = 'scorm';

  const tincanPath = path.join(targetDir, 'tincan.xml');
  const imsmanifestPath = path.join(targetDir, 'imsmanifest.xml');
  const playerHtmlPath = path.join(targetDir, 'player.html');

  if (fs.existsSync(tincanPath)) {
    standard = 'xapi';
    const xmlContent = fs.readFileSync(tincanPath, 'utf8');
    const match = xmlContent.match(/<launch[^>]*>([^<]+)<\/launch>/i);
    if (match && match[1]) {
      entryPoint = match[1].trim();
    }
  } else if (fs.existsSync(imsmanifestPath)) {
    standard = 'scorm';
    if (fs.existsSync(playerHtmlPath)) {
      // player.html is the direct interactive player in Adaptive SCORM Studio packages
      entryPoint = 'player.html';
    } else {
      const xmlContent = fs.readFileSync(imsmanifestPath, 'utf8');
      const match = xmlContent.match(/<resource[^>]+href=["']([^"']+)["']/i);
      if (match && match[1]) {
        entryPoint = match[1].trim();
      }
    }
  } else if (fs.existsSync(playerHtmlPath)) {
    entryPoint = 'player.html';
  }

  const cleanName = studentName.trim() || 'Jane Doe';
  const cleanId = studentId.trim() || 'user_12345';
  const folder = `courses/${courseId}`;
  const playerUrl = `/player?folder=${encodeURIComponent(folder)}&entry=${encodeURIComponent(entryPoint)}&standard=${encodeURIComponent(standard)}&name=${encodeURIComponent(cleanName)}&id=${encodeURIComponent(cleanId)}`;

  return {
    courseId,
    targetDir,
    entryPoint,
    standard,
    studentName: cleanName,
    studentId: cleanId,
    folder,
    playerUrl,
  };
}

// Multer setup for memory storage up to 100MB
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 },
});

// Route handler for course ZIP upload & temp publish
const uploadCourseHandler = (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No course ZIP file was provided.' });
    }

    const studentName = (req.body.studentName as string) || 'Jane Doe';
    const studentId = (req.body.studentId as string) || 'user_12345';

    const result = processCourseZip(file.buffer, studentName, studentId);

    const wantsJson =
      req.xhr ||
      req.headers.accept?.includes('application/json') ||
      req.headers['x-requested-with'] === 'fetch' ||
      req.headers['content-type']?.includes('application/json');

    if (wantsJson) {
      return res.json(result);
    }

    return res.redirect(302, result.playerUrl);
  } catch (err: any) {
    console.error('Error handling course upload:', err);
    return res.status(500).json({ error: err.message || 'Failed to extract and publish course ZIP.' });
  }
};

app.post(['/api/upload-course', '/api/temp-publish', '/index.php'], upload.single('courseFile'), uploadCourseHandler);

// Helper to calculate sha256 revision
function currentRevision(raw: string): string {
  return crypto.createHash('sha256').update(raw).digest('hex');
}

// Timing-safe key comparison
function isKeyMatch(expected: string, provided: string): boolean {
  if (!expected || !provided) return false;
  const bufExpected = Buffer.from(expected);
  const bufProvided = Buffer.from(provided);
  if (bufExpected.length !== bufProvided.length) return false;
  return crypto.timingSafeEqual(bufExpected, bufProvided);
}

// Middleware for common API headers
function apiSecurityHeaders(_req: Request, res: Response, next: NextFunction) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  next();
}

// Shared project route handler
const projectHandler = (req: Request, res: Response) => {
  const configuredKey = process.env.ADAPTIVE_SCORM_ACCESS_KEY || 'adaptive-scorm-demo-key-2024';
  if (!configuredKey || configuredKey.startsWith('CHANGE_THIS_')) {
    return res.status(503).json({
      error: 'Set a private shared-project access key in environment before using shared storage.',
    });
  }

  const providedKey = (req.headers['x-project-key'] as string) || '';
  if (!providedKey || !isKeyMatch(configuredKey, providedKey)) {
    res.setHeader('WWW-Authenticate', 'Bearer realm="Adaptive SCORM Studio"');
    return res.status(401).json({
      error: 'The shared-project access key is not valid.',
    });
  }

  const method = req.method.toUpperCase();

  if (method === 'GET') {
    if (!fs.existsSync(projectFile)) {
      return res.status(200).json({ project: null, revision: null, updatedAt: null });
    }

    try {
      const raw = fs.readFileSync(projectFile, 'utf8');
      const project = JSON.parse(raw);
      if (typeof project !== 'object' || project === null || Array.isArray(project)) {
        return res.status(500).json({ error: 'The shared project file is not a project object.' });
      }

      const stat = fs.statSync(projectFile);
      return res.status(200).json({
        project,
        revision: currentRevision(raw),
        updatedAt: new Date(stat.mtimeMs).toISOString(),
      });
    } catch {
      return res.status(500).json({ error: 'The shared project file contains invalid JSON.' });
    }
  }

  if (method === 'PUT') {
    const payload = req.body;
    if (!payload || typeof payload !== 'object') {
      return res.status(400).json({ error: 'A project JSON body is required.' });
    }

    const project = payload.project;
    const baseRevision = typeof payload.revision === 'string' ? payload.revision : null;

    if (!project || typeof project !== 'object' || Array.isArray(project)) {
      return res.status(422).json({ error: 'The request does not contain a project object.' });
    }

    const requiredFields = ['editorVersion', 'version', 'code', 'title', 'modules', 'diagnostic', 'final'];
    for (const field of requiredFields) {
      if (!(field in project)) {
        return res.status(422).json({ error: `The project is missing the required ${field} field.` });
      }
    }

    if (!Array.isArray(project.modules) || !Array.isArray(project.diagnostic) || !Array.isArray(project.final)) {
      return res.status(422).json({ error: 'Modules, diagnostic and final must be arrays.' });
    }

    const directory = path.dirname(projectFile);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true, mode: 0o750 });
    }

    // Check revision lock
    if (fs.existsSync(projectFile)) {
      let existingRaw = '';
      try {
        existingRaw = fs.readFileSync(projectFile, 'utf8');
      } catch {
        return res.status(500).json({ error: 'The existing shared project could not be read.' });
      }
      const existingRevision = currentRevision(existingRaw);
      if (baseRevision === null || existingRevision !== baseRevision) {
        return res.status(409).json({
          error: 'Another author saved a newer version. Load the shared project before saving again.',
          revision: existingRevision,
        });
      }
    }

    let encoded = '';
    try {
      encoded = JSON.stringify(project, null, 2) + '\n';
    } catch {
      return res.status(422).json({ error: 'The project contains data that cannot be encoded as JSON.' });
    }

    if (Buffer.byteLength(encoded, 'utf8') > MAX_BYTES) {
      return res.status(413).json({ error: 'The project is larger than the configured server limit.' });
    }

    const tempFile = path.join(directory, `project-${Date.now()}-${Math.random().toString(36).slice(2)}.tmp`);
    try {
      fs.writeFileSync(tempFile, encoded, { mode: 0o640 });
      if (fs.existsSync(projectFile)) {
        try {
          fs.copyFileSync(projectFile, `${projectFile}.backup.json`);
        } catch {}
      }
      fs.renameSync(tempFile, projectFile);
    } catch {
      try {
        if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
      } catch {}
      return res.status(500).json({ error: 'The shared project could not be saved to disk.' });
    }

    const stat = fs.statSync(projectFile);
    return res.status(200).json({
      saved: true,
      revision: currentRevision(encoded),
      updatedAt: new Date(stat.mtimeMs).toISOString(),
    });
  }

  res.setHeader('Allow', 'GET, PUT');
  return res.status(405).json({ error: 'Only GET and PUT are supported.' });
};

// Wire project API
app.all(['/api/project.php', '/api/project'], apiSecurityHeaders, projectHandler);

// Serve extracted course packages statically
app.use('/courses', express.static(COURSES_DIR));

// Function to render the Universal SCORM Player / Tester page (matching user attachment)
function renderScormPlayerHtml(req: Request): string {
  const isPlayer = Boolean(req.query.folder && req.query.entry);
  const name = String(req.query.name || 'Jane Doe');
  const id = String(req.query.id || 'user_12345');
  const standard = String(req.query.standard || 'scorm');

  const escapeHtml = (str: string) =>
    str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Universal SCORM Tester &amp; Player</title>
    <style>
        body, html { margin: 0; height: 100%; font-family: system-ui, -apple-system, sans-serif; background: #0f172a; color: #1e293b; }
        
        /* Upload Screen Styles */
        .upload-container { display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; box-sizing: border-box; }
        .upload-card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); width: 100%; max-width: 440px; }
        .upload-card h1 { margin-top: 0; font-size: 24px; color: #0f172a; }
        .upload-group { margin-bottom: 16px; }
        .upload-group label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; color: #334155; }
        .upload-group input { width: 100%; padding: 10px 12px; box-sizing: border-box; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; }
        .upload-btn { background: #2563eb; color: white; border: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; cursor: pointer; width: 100%; transition: background 0.2s; margin-top: 10px; font-size: 15px; }
        .upload-btn:hover { background: #1d4ed8; }
        .back-link { display: inline-block; margin-top: 16px; color: #64748b; text-decoration: none; font-size: 13px; }
        .back-link:hover { color: #0f172a; text-decoration: underline; }

        /* Player Screen Styles */
        body.player-mode { overflow: hidden; background: #111827; }
        #control-bar { background: #1e293b; color: white; padding: 10px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #3b82f6; box-shadow: 0 2px 8px rgba(0,0,0,0.25); flex-wrap: wrap; gap: 10px; }
        .header-info { display: flex; gap: 16px; font-size: 13px; color: #94a3b8; align-items: center; flex-wrap: wrap; }
        .header-info span { color: white; font-weight: 600; }
        .badge { padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
        .badge-status { background: #334155; color: #38bdf8; }
        .badge-score { background: #1e3a8a; color: #93c5fd; }
        .badge-interactions { background: #064e3b; color: #6ee7b7; }
        .btn-group { display: flex; align-items: center; gap: 8px; }
        .btn { padding: 7px 14px; border: none; border-radius: 5px; font-weight: 600; cursor: pointer; font-size: 13px; text-decoration: none; display: inline-flex; align-items: center; gap: 5px; transition: opacity 0.15s; }
        .btn:hover { opacity: 0.9; }
        .btn-back { background: #475569; color: white; }
        .btn-download { background: #059669; color: white; }
        .btn-studio { background: #3b82f6; color: white; }
        #content-area { width: 100%; height: calc(100vh - 56px); background: #ffffff; position: relative; }
        iframe { width: 100%; height: 100%; border: none; outline: none; display: block; }
    </style>

    ${
      isPlayer
        ? `
    <script>
        // --- IN-BROWSER "MOCK SERVER" (SERVICE WORKER) ---
        const swCode = \`
            self.addEventListener('fetch', event => {
                const url = event.request.url;
                if (url.includes('/mock-lrs/xapi/statements')) {
                    if (event.request.method === 'POST' || event.request.method === 'PUT') {
                        event.request.clone().json().then(data => {
                            self.clients.matchAll().then(clients => clients.forEach(c => c.postMessage({ type: 'xAPI', data: data })));
                        }).catch(e => console.error(e));
                        event.respondWith(new Response('[]', { status: 200, headers: { 'Content-Type': 'application/json' } }));
                    } else { event.respondWith(new Response('[]', { status: 200 })); }
                } else if (url.includes('/mock-lrs/aicc')) {
                    if (event.request.method === 'POST') {
                        event.request.clone().text().then(text => {
                            self.clients.matchAll().then(clients => clients.forEach(c => c.postMessage({ type: 'AICC', data: text })));
                        });
                    }
                    event.respondWith(new Response('error=0\\\\nerror_text=Successful', { status: 200, headers: { 'Content-Type': 'text/plain' } }));
                }
            });
        \`;

        window.intercepted_xAPI = [];
        window.intercepted_AICC = [];
        window.API = {};
        window.API_1484_11 = {};

        function updateBadges() {
            const data = window.API_1484_11?.data || window.API?.data || {};
            const statusEl = document.getElementById('badge-status');
            const scoreEl = document.getElementById('badge-score');
            const interactionsEl = document.getElementById('badge-interactions');

            if (statusEl) {
                const st = data['cmi.completion_status'] || data['cmi.core.lesson_status'] || 'incomplete';
                const succ = data['cmi.success_status'] || '';
                statusEl.textContent = succ && succ !== 'unknown' ? st + ' (' + succ + ')' : st;
            }
            if (scoreEl) {
                const raw = data['cmi.score.raw'] || data['cmi.core.score.raw'];
                const scaled = data['cmi.score.scaled'];
                if (raw !== undefined && raw !== '') {
                    scoreEl.textContent = 'Score: ' + raw + (scaled ? ' (' + Math.round(Number(scaled)*100) + '%)' : '');
                } else {
                    scoreEl.textContent = 'Score: --';
                }
            }
            if (interactionsEl) {
                const count = data['cmi.interactions._count'] || Object.keys(data).filter(k => k.startsWith('cmi.interactions.') && k.endsWith('.id')).length;
                interactionsEl.textContent = count + ' recorded';
            }
        }

        // Initialize immediately so child windows/iframes find it
        (function initMocks() {
            const urlParams = new URLSearchParams(window.location.search);
            const name = urlParams.get('name') || ${JSON.stringify(name)};
            const id = urlParams.get('id') || ${JSON.stringify(id)};

            // SCORM 1.2
            window.API = {
                data: {
                    "cmi.core.student_name": name,
                    "cmi.core.student_id": id,
                    "cmi.core.lesson_status": "not attempted",
                    "cmi.core.lesson_mode": "normal",
                    "cmi.core.credit": "credit",
                    "cmi.core.entry": "ab-initio",
                    "cmi.core.lesson_location": "",
                    "cmi.suspend_data": "",
                    "cmi.interactions._count": "0"
                },
                LMSInitialize: function() { return "true"; },
                LMSFinish: function() { return "true"; },
                LMSGetValue: function(e) { return this.data[e] || ""; },
                LMSSetValue: function(e, v) {
                    this.data[e] = String(v);
                    updateBadges();
                    return "true";
                },
                LMSCommit: function() { updateBadges(); return "true"; },
                LMSGetLastError: function() { return "0"; },
                LMSGetErrorString: function() { return ""; },
                LMSGetDiagnostic: function() { return ""; }
            };

            // SCORM 2004 4th Edition
            window.API_1484_11 = {
                data: {
                    "cmi.learner_name": name,
                    "cmi.learner_id": id,
                    "cmi.completion_status": "incomplete",
                    "cmi.success_status": "unknown",
                    "cmi.mode": "normal",
                    "cmi.credit": "credit",
                    "cmi.entry": "ab-initio",
                    "cmi.location": "",
                    "cmi.suspend_data": "",
                    "cmi.interactions._count": "0",
                    "cmi.objectives._count": "0"
                },
                Initialize: function() { return "true"; },
                Terminate: function() { return "true"; },
                GetValue: function(e) {
                    if (e === "cmi.interactions._count") {
                        const count = Object.keys(this.data).filter(k => k.startsWith('cmi.interactions.') && k.endsWith('.id')).length;
                        return String(count);
                    }
                    if (e === "cmi.objectives._count") {
                        const count = Object.keys(this.data).filter(k => k.startsWith('cmi.objectives.') && k.endsWith('.id')).length;
                        return String(count);
                    }
                    return this.data[e] !== undefined ? String(this.data[e]) : "";
                },
                SetValue: function(e, v) {
                    this.data[e] = String(v);
                    if (e.startsWith('cmi.interactions.') && e.endsWith('.id')) {
                        const count = Object.keys(this.data).filter(k => k.startsWith('cmi.interactions.') && k.endsWith('.id')).length;
                        this.data['cmi.interactions._count'] = String(count);
                    }
                    if (e.startsWith('cmi.objectives.') && e.endsWith('.id')) {
                        const count = Object.keys(this.data).filter(k => k.startsWith('cmi.objectives.') && k.endsWith('.id')).length;
                        this.data['cmi.objectives._count'] = String(count);
                    }
                    updateBadges();
                    return "true";
                },
                Commit: function() {
                    updateBadges();
                    return "true";
                },
                GetLastError: function() { return "0"; },
                GetErrorString: function() { return ""; },
                GetDiagnostic: function() { return ""; }
            };
        })();

        window.onload = function() {
            // Register Service Worker
            try {
                const blob = new Blob([swCode], {type: 'application/javascript'});
                const swUrl = URL.createObjectURL(blob);
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.register(swUrl, { scope: '/' })
                        .then(() => console.log("Mock LRS Service Worker Active"))
                        .catch(err => console.warn("SW register notice:", err));
                    navigator.serviceWorker.addEventListener('message', event => {
                        if (event.data.type === 'xAPI') window.intercepted_xAPI.push(event.data.data);
                        if (event.data.type === 'AICC') window.intercepted_AICC.push(event.data.data);
                    });
                }
            } catch (err) {
                console.warn(err);
            }

            const urlParams = new URLSearchParams(window.location.search);
            const folder = urlParams.get('folder');
            const entry = urlParams.get('entry');
            const standard = urlParams.get('standard') || 'scorm';
            const name = urlParams.get('name') || ${JSON.stringify(name)};
            const id = urlParams.get('id') || ${JSON.stringify(id)};

            // Launch Course
            let launchUrl = '/' + folder.replace(/^\\/+/, '') + '/' + entry.replace(/^\\/+/, '');
            const mockServerUrl = window.location.origin + '/mock-lrs';

            if (standard === 'xapi') {
                const endpoint = encodeURIComponent(mockServerUrl + '/xapi/');
                const actor = encodeURIComponent(JSON.stringify({ mbox: 'mailto:' + id + '@test.com', name: name }));
                launchUrl += '?endpoint=' + endpoint + '&auth=Basic%20VG9rZW4=&actor=' + actor;
            } else if (standard === 'aicc') {
                const aiccUrl = encodeURIComponent(mockServerUrl + '/aicc');
                launchUrl += '?aicc_url=' + aiccUrl + '&aicc_sid=' + id;
            }

            const frame = document.getElementById('course-frame');
            if (frame) {
                frame.src = launchUrl;
            }
            updateBadges();
        };

        function downloadTrackingData() {
            const standard = new URLSearchParams(window.location.search).get('standard') || 'scorm';
            let dataToExport, filename;

            if (standard === 'xapi') {
                if (!window.intercepted_xAPI || window.intercepted_xAPI.length === 0) {
                    alert("No xAPI statements intercepted yet.");
                    return;
                }
                dataToExport = window.intercepted_xAPI;
                filename = "xapi_data.json";
            } else if (standard === 'aicc') {
                if (!window.intercepted_AICC || window.intercepted_AICC.length === 0) {
                    alert("No AICC data intercepted yet.");
                    return;
                }
                dataToExport = window.intercepted_AICC;
                filename = "aicc_data.json";
            } else {
                if (window.API_1484_11 && window.API_1484_11.data) {
                    dataToExport = window.API_1484_11.data;
                    filename = "scorm_2004_data.json";
                } else {
                    dataToExport = window.API ? window.API.data : {};
                    filename = "scorm_1.2_data.json";
                }
            }

            const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        }
    </script>
    `
        : ''
    }
</head>
<body class="${isPlayer ? 'player-mode' : ''}">

    ${
      !isPlayer
        ? `
    <!-- UPLOAD SCREEN -->
    <div class="upload-container">
        <div class="upload-card">
            <h1>Course Tester</h1>
            <p style="color: #64748b; margin-bottom: 24px; font-size: 14px; line-height: 1.5;">Upload a SCORM 2004, SCORM 1.2, or xAPI .zip package to test in the standalone player.</p>
            <form action="/index.php" method="post" enctype="multipart/form-data">
                <div class="upload-group">
                    <label>Learner Name</label>
                    <input type="text" name="studentName" value="Jane Doe" required>
                </div>
                <div class="upload-group">
                    <label>Learner ID</label>
                    <input type="text" name="studentId" value="user_12345" required>
                </div>
                <div class="upload-group">
                    <label>Course ZIP File</label>
                    <input type="file" name="courseFile" accept=".zip" required>
                </div>
                <button type="submit" class="upload-btn">Upload &amp; Launch</button>
            </form>
            <a href="/" class="back-link">← Return to Adaptive SCORM Studio</a>
        </div>
    </div>
    `
        : `
    <!-- PLAYER SCREEN -->
    <div id="control-bar">
        <div class="header-info">
            <div>Testing as: <span>${escapeHtml(name)}</span></div>
            <div>Standard: <span style="text-transform: uppercase;">${escapeHtml(standard)}</span></div>
            <div>Status: <span id="badge-status" class="badge badge-status">incomplete</span></div>
            <div><span id="badge-score" class="badge badge-score">Score: --</span></div>
            <div><span id="badge-interactions" class="badge badge-interactions">0 recorded</span></div>
        </div>
        <div class="btn-group">
            <button class="btn btn-download" onclick="downloadTrackingData()" title="Export captured LMS tracking records">↓ Download Data</button>
            <a href="/tester" class="btn btn-back">Upload New Course</a>
            <a href="/" target="_blank" class="btn btn-studio" title="Open Studio editor">Editor Studio ↗</a>
        </div>
    </div>
    <div id="content-area">
        <iframe id="course-frame" src="about:blank" allow="fullscreen" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"></iframe>
    </div>
    `
    }

</body>
</html>`;
}

// Player routes: /player, /tester, /index.php
app.get(['/player', '/tester', '/index.php'], (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(renderScormPlayerHtml(req));
});

// Serve preview bridge and static assets
app.get('/preview-bridge.js', (_req: Request, res: Response) => {
  res.type('application/javascript').sendFile(path.join(__dirname, 'preview-bridge.js'));
});
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Serve index.html for root and SPA routing
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Adaptive SCORM Studio server listening on http://${HOST}:${PORT}`);
});
