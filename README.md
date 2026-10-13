# Adaptive SCORM Studio — authoring and separate test window

## Start

Extract this complete package. From its folder, run:

    python3 -m http.server 8000

Open http://localhost:8000/ in Chrome or Edge. HTTPS static hosting also works, including a subfolder. No PHP, project-storage API, upload server or npm installation is required. Opening the application with a file:// URL is not supported.

## Top toolbar

**Project Files JSON**: Import · Save

A divider separates it from **SCORM**: Test · Export.

- Import loads a project JSON (existing project ZIP imports remain supported).
- Save stores the project in this browser and downloads a JSON backup.
- Test opens a separate window and leaves the builder open with its current project and page unchanged. Allow popups for this site.
- Export validates the authored project and downloads its SCORM ZIP. The exported LMS launcher/staging page is unchanged.

JSON backups, SCORM ZIPs and test-data downloads use the project title and a local numeric timestamp including seconds and milliseconds:

    My-project_Project_20261013214141023.json
    My-project_SCORM_20261013214142204.zip

The timestamp format is YYYYMMDDHHmmssSSS, using the browser's local time. Milliseconds and a monotonic per-window timestamp help distinguish rapid repeated downloads.

## Test window

The left sidebar contains:

- New attempt and Resume attempt.
- Jump to role, module and level.
- Skip restrictions On/Off and Skip current step.
- Download test data.
- Completion, success, score and Recorded SCORM calls.
- A collapsible Course files section for loading an existing folder or saving the finalised files.

The right frame loads this builder's course content page directly. It does not open the exported staging page or a second course popup.

Skip restrictions starts Off. Normal learner progression applies. Restricted jumps explain why they cannot proceed. With it On, authors can inspect any role/module/level and skip steps without selecting correct answers. These controls do not award correct responses or passing marks; skipped final questions remain unanswered. Reports identify attempts that used bypass controls. Use New attempt to check the normal learner path again.

Resume attempt restores committed SCORM state for the current test snapshot. A new Test from the builder creates a separate snapshot and attempt. The on-screen log shows the most recent 150 calls; downloaded test data includes the full call log.

Jump controls support this builder's runtime. An imported third-party SCORM folder can use the basic test API, but may not support these controls or direct-content launch.

## Work in progress and placeholders

Start blank creates an editable course with:

- Course identity and cover text.
- A role and module, including essential content and all four learning levels.
- Four checkpoint questions.
- Four diagnostic questions, one per level.
- A final assessment question, feedback and remediation text.
- Theme/style defaults and an editable source placeholder.

Adding a module also supplies its content, checkpoint, diagnostic and final-assessment placeholders.

Test is available before export validation passes. It creates a separate draft snapshot, supplying defaults for missing content and question pools. The saved author project is not modified by those draft repairs. Export still validates the actual project.

Replace placeholder content and review the assessment before releasing the course. A saved draft test folder can still contain draft placeholders.

## Replace a project safely

After confirming either Reload Example (Statistics Starter) or Start blank, the builder first downloads the current project as a timestamped JSON, then replaces it. Cancelling the confirmation leaves the current project in place.

## Folder workflow

Use Test to prepare a snapshot, then Course files → Save finalised folder. Choose a parent folder; the application creates a timestamped course subfolder. Folder writing requires Chrome/Edge on localhost or HTTPS.

Use Load SCORM folder to test an extracted folder whose root contains imsmanifest.xml. Files are imported as a snapshot; load the folder again after editing external files.

To package a saved folder, ZIP its contents with imsmanifest.xml at the ZIP root. Only include course files, not the builder or test harness. The saved index.html remains the original LMS launcher.

The test worker injects navigation controls only into the browser-local runtime response. It does not alter stored files, exported ZIPs or saved course folders.

## Persistence and limits

Projects, test snapshots and attempt data are stored in this browser. Keep downloaded backups; clearing site data removes browser copies.

This is a single-SCO author test harness, not a full LMS or SCORM conformance validator. Perform acceptance testing in the destination LMS. External hosted media and configured xAPI services still require their connections. Only test course packages you trust, because their scripts execute on the test site's origin.

The original authoring source was not supplied: the compiled UI bundle is retained, with readable supporting scripts. See TEST-RESULTS.md for checks and remaining limitations.
