import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = '0.0.0.0';

const MAX_BYTES = 64 * 1024 * 1024; // 64MB limit matching original config
const projectFile = process.env.ADAPTIVE_SCORM_PROJECT_FILE || path.join(__dirname, 'api', 'data', 'project.json');

app.use(express.json({ limit: '64mb' }));

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

// Wire both exact path and extensionless path
app.all(['/api/project.php', '/api/project'], apiSecurityHeaders, projectHandler);

// Serve static assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Serve index.html for root and SPA routing
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Adaptive SCORM Studio server listening on http://${HOST}:${PORT}`);
});
