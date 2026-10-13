import fs from 'fs';

const starter = fs.readFileSync('statistics_starter.json', 'utf8');

const code = `// Universal SCORM Player Bridge & Statistics Starter
(function() {
  // Clear any legacy HLTINF006 / infection sample project from localStorage
  try {
    const keys = ["adaptive-scorm-studio-project-v2", "adaptive-scorm-studio-project-v1"];
    for (const k of keys) {
      const val = localStorage.getItem(k);
      if (val && (val.includes("HLTINF006") || val.includes("Infection") || val.includes("infection"))) {
        localStorage.removeItem(k);
        console.log("Cleared legacy HLTINF006 sample content from " + k);
      }
    }
  } catch (e) {
    console.warn("Notice checking localStorage:", e);
  }

  // Provide the default Basic to Advanced Statistics starter project
  window.__STATISTICS_STARTER = ` + starter.trim() + `;

  // In-page SCORM Mocks so iframes can access window.parent.API_1484_11
  const defaultLearnerName = "Jane Doe";
  const defaultLearnerId = "user_12345";

  function updateModalBadges() {
    const data = window.API_1484_11?.data || window.API?.data || {};
    const statusEl = document.getElementById('scorm-modal-badge-status');
    const scoreEl = document.getElementById('scorm-modal-badge-score');
    const interactionsEl = document.getElementById('scorm-modal-badge-interactions');

    if (statusEl) {
      const st = data['cmi.completion_status'] || data['cmi.core.lesson_status'] || 'incomplete';
      const succ = data['cmi.success_status'] || '';
      statusEl.textContent = succ && succ !== 'unknown' ? st + ' (' + succ + ')' : st;
      statusEl.style.color = (st === 'completed' || succ === 'passed') ? '#4ade80' : '#38bdf8';
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

  // Global SCORM 1.2 Mock
  window.API = {
    data: {
      "cmi.core.student_name": defaultLearnerName,
      "cmi.core.student_id": defaultLearnerId,
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
      updateModalBadges();
      return "true";
    },
    LMSCommit: function() { updateModalBadges(); return "true"; },
    LMSGetLastError: function() { return "0"; },
    LMSGetErrorString: function() { return ""; },
    LMSGetDiagnostic: function() { return ""; }
  };

  // Global SCORM 2004 4th Edition Mock
  window.API_1484_11 = {
    data: {
      "cmi.learner_name": defaultLearnerName,
      "cmi.learner_id": defaultLearnerId,
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
      updateModalBadges();
      return "true";
    },
    Commit: function() {
      updateModalBadges();
      return "true";
    },
    GetLastError: function() { return "0"; },
    GetErrorString: function() { return ""; },
    GetDiagnostic: function() { return ""; }
  };

  // Function to download tracked LMS records
  window.downloadModalTrackingData = function() {
    const dataToExport = window.API_1484_11.data || window.API.data || {};
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "scorm_2004_data.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  // Close modal helper
  window.closeScormPlayerModal = function() {
    const modal = document.getElementById("scorm-player-inpage-modal");
    if (modal) modal.remove();
  };

  // Render in-page player modal
  function showInPagePlayerModal(playerUrl, courseSrc, title) {
    window.closeScormPlayerModal();

    const container = document.createElement("div");
    container.id = "scorm-player-inpage-modal";
    container.style.cssText = "position: fixed; inset: 0; z-index: 999999; background: rgba(15, 23, 42, 0.95); display: flex; flex-direction: column; font-family: system-ui, -apple-system, sans-serif;";

    container.innerHTML = \`
      <div style="background: #1e293b; color: white; padding: 10px 18px; display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #3b82f6; flex-wrap: wrap; gap: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.4);">
        <div style="display: flex; gap: 14px; align-items: center; font-size: 13px; color: #94a3b8; flex-wrap: wrap;">
          <div style="color: white; font-weight: 700; display: flex; align-items: center; gap: 6px;">
            <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #22c55e;"></span>
            \${title || 'SCORM 2004 Course'}
          </div>
          <div>Testing as: <span style="color: white; font-weight: 600;">\${defaultLearnerName}</span></div>
          <div>Standard: <span style="color: white; font-weight: 600; text-transform: uppercase;">SCORM 2004</span></div>
          <div>Status: <span id="scorm-modal-badge-status" style="background: #334155; color: #38bdf8; padding: 2px 7px; border-radius: 4px; font-size: 11px; font-weight: 700; text-transform: uppercase;">incomplete</span></div>
          <div><span id="scorm-modal-badge-score" style="background: #1e3a8a; color: #93c5fd; padding: 2px 7px; border-radius: 4px; font-size: 11px; font-weight: 700;">Score: --</span></div>
          <div><span id="scorm-modal-badge-interactions" style="background: #064e3b; color: #6ee7b7; padding: 2px 7px; border-radius: 4px; font-size: 11px; font-weight: 700;">0 recorded</span></div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <button onclick="window.downloadModalTrackingData()" style="background: #059669; color: white; border: none; padding: 7px 13px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
            ↓ Download Data
          </button>
          <a href="\${playerUrl}" target="_blank" style="background: #2563eb; color: white; border: none; padding: 7px 13px; border-radius: 6px; font-size: 12px; font-weight: 600; text-decoration: none; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
            Open in New Tab ↗
          </a>
          <button onclick="window.closeScormPlayerModal()" style="background: #475569; color: white; border: none; padding: 7px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer;">
            ✕ Close
          </button>
        </div>
      </div>
      <div style="flex: 1; position: relative; background: #ffffff;">
        <iframe id="scorm-modal-course-frame" src="\${courseSrc}" allow="fullscreen" style="width: 100%; height: 100%; border: none; display: block;"></iframe>
      </div>
    \`;

    document.body.appendChild(container);
    updateModalBadges();
  }

  // Toast / notification helper
  function showPublishToast(message, isSpinner = true) {
    let toast = document.getElementById("scorm-publish-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "scorm-publish-toast";
      toast.style.cssText = "position: fixed; bottom: 24px; right: 24px; z-index: 9999999; background: #1e293b; color: white; padding: 14px 20px; border-radius: 10px; border: 1px solid #3b82f6; box-shadow: 0 10px 25px rgba(0,0,0,0.5); display: flex; align-items: center; gap: 12px; font-family: system-ui, sans-serif; font-size: 14px;";
      document.body.appendChild(toast);
    }
    toast.innerHTML = (isSpinner ? '<span style="display:inline-block;width:18px;height:18px;border:2px solid #64748b;border-top-color:#38bdf8;border-radius:50%;animation:spin 0.8s linear infinite;"></span>' : '<span>✓</span>') + ' ' + message;
  }

  function hidePublishToast() {
    const toast = document.getElementById("scorm-publish-toast");
    if (toast) toast.remove();
  }

  // Temp publish and launch SCORM player in BOTH in-page modal AND new tab
  window.tempPublishAndOpenPlayer = async function(project) {
    const proj = project || window.__STATISTICS_STARTER;
    if (!proj) {
      console.error("No project provided for preview.");
      return;
    }

    showPublishToast("Packaging & temp publishing SCORM 2004 course…", true);

    // Attempt to open new tab in user gesture
    let playerWin = null;
    try {
      playerWin = window.open("about:blank", "_blank");
    } catch (e) {
      console.warn("Notice: Popup blocked or restricted in iframe:", e);
    }

    if (playerWin && playerWin.document) {
      try {
        playerWin.document.write(\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Temp Publishing SCORM Player…</title>
  <style>
    body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #0f172a; color: #f8fafc; font-family: system-ui, sans-serif; text-align: center; padding: 24px; }
    .card { background: #1e293b; padding: 36px 30px; border-radius: 12px; max-width: 440px; border: 1px solid #334155; }
    .spinner { width: 40px; height: 40px; border: 4px solid #334155; border-top-color: #38bdf8; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 16px; }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
</head>
<body>
  <div class="card">
    <div class="spinner"></div>
    <h2 style="margin:0 0 8px;font-size:18px;">Publishing SCORM 2004 Package</h2>
    <p style="margin:0;color:#94a3b8;font-size:14px;">Preparing universal SCORM player and launching course…</p>
  </div>
</body>
</html>\`);
      } catch (err) {}
    }

    try {
      if (typeof window.__buildScormZip !== "function") {
        throw new Error("SCORM packaging generator (__buildScormZip) not yet ready. Please try again in 1 second.");
      }

      // Generate the package ZIP in memory using the native studio engine
      const zipBlob = await window.__buildScormZip(proj);

      const formData = new FormData();
      formData.append("courseFile", zipBlob, (proj.code || "course") + ".zip");
      formData.append("studentName", defaultLearnerName);
      formData.append("studentId", defaultLearnerId);

      const response = await fetch("/api/upload-course", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || ("Server responded with HTTP " + response.status));
      }

      const result = await response.json();
      hidePublishToast();

      if (result && result.playerUrl) {
        // 1. If new tab was permitted, navigate it to playerUrl
        if (playerWin && !playerWin.closed) {
          playerWin.location.href = result.playerUrl;
        }

        // 2. ALWAYS show the in-page player modal so it is guaranteed to work right inside the viewport
        const courseIframeSrc = '/' + result.folder + '/' + result.entry;
        showInPagePlayerModal(result.playerUrl, courseIframeSrc, proj.title || 'Basic to Advanced Statistics');
      } else {
        throw new Error("No playerUrl received in server publish response.");
      }
    } catch (err) {
      hidePublishToast();
      console.error("Failed to temp publish course for preview:", err);
      const errMsg = err && err.message ? err.message : String(err);
      if (playerWin && !playerWin.closed) {
        try {
          playerWin.document.body.innerHTML = '<div style="background:#1e293b;padding:32px;color:white;font-family:sans-serif;text-align:center;max-width:400px;margin:50px auto;border-radius:10px;"><h3 style="color:#ef4444;margin:0 0 10px;">Publish Error</h3><p>' + errMsg + '</p><button onclick="window.close()" style="background:#475569;color:white;border:none;padding:8px 16px;border-radius:4px;cursor:pointer;">Close</button></div>';
        } catch (e) {}
      }
      alert("Notice launching preview: " + errMsg);
    }
  };
})();
`;

fs.writeFileSync('preview-bridge.js', code, 'utf8');
console.log('Successfully wrote updated preview-bridge.js with in-page player modal support!');
