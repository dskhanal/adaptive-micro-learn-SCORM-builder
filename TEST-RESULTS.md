# Verification — static finalised-folder update

Passed:

- Generated the statistics starter using the original course generator.
- Compared all 10 finalised files byte-for-byte with the files inside the SCORM ZIP generated for the same project: identical.
- Parsed the generated manifest and verified its launch resource and listed file paths exist.
- Exercised the test runtime in a JavaScript VM: initialization, rejection before initialization/after termination, interaction counts, commit, termination, restored suspend data on resume and clean state for a fresh attempt.
- JavaScript syntax checks for the compiled builder and new scripts.
- Removed the upload-based preview and active shared-project API calls.

Not verified here:

- End-to-end browser UI, service-worker installation and actual folder picker writing. The environment lacked a browser executable; the attempted browser download returned an invalid archive.
- Destination LMS acceptance, full SCORM conformance, multi-SCO sequencing or every assessment path.

Manual acceptance:

1. Start the static server as described in README.md.
2. Finalise the starter course and launch it in the player.
3. Answer activities, close the course popup, then resume the attempt.
4. Save the finalised folder and load it again through Load SCORM folder.
5. Confirm the same course content launches and tracking calls appear.
6. ZIP the saved folder contents and test that ZIP in the destination LMS.
