# Prayer Times 3.1.0 — source release

Upload the contents of this directory to the root of your GitHub repository. The existing `.github/workflows/main.yml` Windows workflow is included.

## Changes
- Quotation text spacing and a right-aligned live-card Mark Complete button.
- Friday's Dhuhr/Jumu'ah Fard selection is mutually exclusive; completion summary records 4 or 2 rak'ahs respectively.
- Existing audible tick cues remain enabled by the Sound setting.
- Removed the Revise event record panel; prior pending revisions are restored on load to their last selected states, and active records can be unticked directly until locked.
- Countdown text uses the chosen interface font.
- Preferred start/end notifications accept explicit zero minutes and fire at the preferred boundary (with the existing reminder grace window).
- A Blessed Reminder / বরকতময় উপদেশ.
- Five additional dark and five additional light themes.
- Ten additional offline English font families and ten additional offline Bengali font choices. Bengali choices include two additional families and eight separate Noto Bengali width/weight faces, not ten independent families.

## Validation performed
- `npm run check`: passed.
- `npm test`: 387 passed, 0 failed, 5 skipped (392 total).
- Additional 3.1.0 tests check zero-minute reminder timing, Friday selection wiring, themes, and font assets.

## Not validated here
- Native Windows Tauri build and notification/sound behavior on Windows, since Rust and npm packages were not available in this execution environment.
- Visual regression in the target Windows WebView2 desktop runtime.

Run the GitHub Actions Windows build and test the resulting app on Windows before distributing it. The original 2.5.3 archive was not modified.
