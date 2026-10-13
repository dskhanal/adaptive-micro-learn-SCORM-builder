# Verification — toolbar and separate test window update

## Passed

- Compiled application evaluated in a JavaScript VM and toolbar component rendered as a component tree: Project Files JSON and SCORM groups, divider and Import/Save/Test/Export actions present.
- Save downloaded a project-name JSON with a 17-digit date/time suffix.
- Both confirmed reset actions initiated the JSON backup before replacing project state.
- Removed duplicate Download project and Finalise & test buttons from Overview.
- New blank project contained 4 diagnostic questions, 4 module checkpoints and 1 final question.
- Blank, empty and partial draft projects each generated all 10 course files without modifying their original author objects.
- Course runtime executed with a DOM test double: welcome and all role/module/level combinations for those draft fixtures rendered without exceptions; restrictions rejected premature jumps; bypass navigation and skipped final questions worked.
- Test harness executed with DOM/storage doubles: direct player.html frame launch, API lifecycle, zero score display, interaction count, commit/resume, fresh attempts and isolation from retired attempts.
- Worker fetch logic injected valid navigation-control JavaScript in the scoped test runtime response, without modifying stored runtime bytes.
- For the same completed statistics project, all 10 normal finalised files remained byte-identical to ZIP export contents.
- JavaScript syntax checks for updated scripts and compiled UI.

## Not verified in this environment

- Full browser rendering, actual popup behaviour, service-worker installation/update lifecycle and operating-system folder picker writing. The environment did not have an available browser executable; the earlier browser download returned an invalid archive.
- Destination LMS acceptance, full SCORM conformance or every authored question type/pathway.

## Manual acceptance

1. Start the static server and open the builder.
2. Verify the toolbar groups, then Save twice and compare timestamped filenames.
3. Confirm Start blank: check the previous JSON downloads and the new placeholders appear.
4. Click Test: the builder should remain open and a separate test window should display course content in the right frame.
5. Toggle Skip restrictions on, jump between roles/modules/levels and skip a checkpoint. Turn it off and start a new attempt to check normal progression.
6. Answer activities, then Resume attempt; inspect tracking and download the test data.
7. Confirm Reload Example: check the project JSON downloads first.
8. Export SCORM and verify its original LMS launcher is retained.
9. Test the exported ZIP in the destination LMS.
