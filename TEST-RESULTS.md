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

## 1.2.1 interface adjustment

Moved the code/title header to the test sidebar and set the browser title from the project title. Removed the builder save-state element. Toolbar group labels now use white on the dark navigation background. Checked markup placement and JavaScript syntax; full browser rendering remains unverified.

## 2.0 authoring evolution

Passed:

- Seven-stage stepper tree and all 26 current validation checks rendered with navigation actions.
- Draft placeholders remained incomplete; editing a reviewed project invalidated its preview-review fingerprint.
- Module and question movement preserved IDs, unrelated pools, references and selected-item identity.
- In-memory learner simulation graded correct answers at 100% for all 11 existing interaction types.
- Incorrect multiple-choice feedback/remediation and partial-credit sorting/sequencing scores matched the learner runtime.
- Safe formatting escaped raw HTML and rendered the supported bold/italic/code subset.
- Completed-project SCORM file generation and ZIP file contents matched; test-only navigation injection still worked without changing saved course bytes.
- New JavaScript syntax checks passed. Reproducible component and simulation tests are included under tests/.

Limits:

- Component tests and simulation tests use DOM doubles, not a full browser.
- Responsive layout, visual appearance, drag-and-drop gestures, cursor preservation, assistive-technology behaviour and real-browser preview latency remain unverified.
- No sub-100ms or 16ms timing guarantee is claimed.
- Distractor plausibility is explicitly an author-review task; duplicate/empty choice detection is only a structural aid.
- Destination LMS acceptance remains necessary.

Suggested browser acceptance:

1. Navigate all seven stages using both stepper and Previous/Next controls.
2. Edit a module tier with bold text and Greek symbols; check single and four-tier comparison views.
3. Reorder modules/questions with drag handles and keyboard Up/Down controls; save/import and confirm order.
4. Edit and answer each interaction type. Verify immediate feedback, remediation and Reset answer.
5. Mark design preview reviewed, edit content, and confirm that review becomes incomplete.
6. Use Test and Export; verify the independent Test window, retained export launcher and formatting inside the course.


## 2.1 modular Kitten TTS

Passed:

- Actual bundled SDK, model, voices, dictionary and ONNX WebAssembly generated a RIFF/WAV (229,244 bytes, 24,000 Hz) from “Statistics helps us learn from data.” in a Node VM with local-only fetch. No external fetch was permitted. This is real synthesis, not a provider mock.
- All 25 finalised files were byte-identical to the corresponding ZIP export files, including audio assets. Audio-disabled finalisation omitted all audio assets.
- Course voice and section narration survived project normalization/import.
- Player DOM-double tests covered disabled sections, chosen voice, generation state, cached replay, one-at-a-time playback, speed, Stop/cancellation and object-URL cleanup.
- Existing wizard, reordering, formatting and all eleven interaction simulation checks passed.

Not verified: actual browser audio output, pronunciation quality, full browser/service-worker lifecycle, mobile performance and destination LMS/CSP acceptance.

Manual acceptance:

1. In Modules, generate audio for Essential and each tier; pause, seek, change speed, stop and replay.
2. Change voice and spoken text; confirm the next clip uses the update. Save JSON and re-import it.
3. Test in the separate player, then navigate away during playback and confirm it stops.
4. Export and upload to the intended LMS; confirm audio works with external network requests blocked.
5. Disable course audio and export again; confirm no audio files or controls appear.
