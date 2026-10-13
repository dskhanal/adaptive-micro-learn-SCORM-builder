# Adaptive SCORM Studio — static folder workflow

No PHP configuration, project API, upload endpoint, npm installation or Node server is required.

## Start

Extract the complete application, then run this command from its folder:

    python3 -m http.server 8000

Open http://localhost:8000/ in Chrome or Edge.

You can also use HTTPS static hosting, including a subfolder. The test player needs localhost or HTTPS for its service worker. Double-clicking index.html with a file:// URL is not supported.

## Author → finalise → test → package

1. Author or import your course. Save stores a browser copy and downloads a project JSON backup.
2. Select **Finalise & test** on Overview, or **Finalise & test SCORM** in Design preview.
3. The builder validates the project and creates the complete SCORM file set. The player reads those saved bytes through a browser-local virtual folder. No upload occurs.
4. In the test player, use the course launcher's **Open Course Window** button. Allow its popup and keep the launcher open.
5. Complete activities. Inspect completion, success, score and recorded SCORM calls. **Download test data** saves the attempt records.
6. Close the course popup before choosing **Resume attempt** or **New attempt**. Resume restores the last committed tracking state; New attempt starts fresh.
7. **Save finalised folder** writes the exact tested bytes into a uniquely named subfolder of a folder you choose. Chrome/Edge on localhost or HTTPS is required for this folder-writing feature.
8. ZIP the contents of that saved course folder, with imsmanifest.xml at the ZIP root, and upload to your LMS.

You may instead use **Export SCORM** in the builder. With the same unchanged project it generates the same course file contents. To package precisely what you tested after further editor changes, use the saved finalised folder.

## Test an existing extracted folder

Open test-player.html and use **Load SCORM folder**. Select the folder containing imsmanifest.xml; the player imports the file bytes locally and launches the manifest's first item resource.

Folder testing is intended for this builder's single-SCO SCORM 2004 output. It also exposes a basic SCORM 1.2 API for simple packages, but does not implement multi-SCO sequencing or certify SCORM conformance.

Finalised test copies and attempts persist in this browser. Clearing site data removes them. Keep downloaded project backups and saved course folders.

## Files

- index.html, assets/: authoring application.
- preview-bridge.js: starter content and finalisation entry point.
- package-store.js: finalised byte storage and manifest launch resolution.
- package-worker.js: serves saved course files locally, preserving relative asset paths.
- test-player.html, test-player.js: standalone folder test harness.
- statistics_starter.json: example project.

The finalised course contains imsmanifest.xml, index.html, player.html, runtime.css, scorm.js, course.js, runtime.js, course.json, project.json and README.txt. Only the course files go into the LMS ZIP, not the builder or test harness.

## Limits and checks

- The test harness records calls and supports commit/resume, completion and score inspection. It is not a full LMS data-model validator or conformance suite.
- Hosted media, embedded players and configured xAPI services still require their external connections.
- Load only course packages you trust: course scripts run on the test site's origin.
- Browser folder selection imports a snapshot. Select the folder again after editing files outside the app.
- Perform the final acceptance test in your destination LMS.
- The supplied project contains a compiled UI bundle rather than its original authoring source. This update preserves that bundle and adds readable, separate folder-player scripts.

See TEST-RESULTS.md for the checks completed with this update.
