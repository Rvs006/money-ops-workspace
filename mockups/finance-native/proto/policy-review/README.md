# Money Ops policy-reading prototype

Disposable Expo web harness for choosing a mobile policy-reading interaction. It imports Money Ops tokens, logo, policy matching and the existing `DocumentReview.web.js` baseline, but production code imports none of this directory.

Run `..\\..\\node_modules\\.bin\\expo.cmd start --web --port 4321 --localhost` from this directory. Open `http://localhost:4321/`.

For the reviewed built preview, run `..\\..\\node_modules\\.bin\\expo.cmd export --platform web --output-dir dist`, then `python -m http.server 4322 --bind 127.0.0.1 --directory dist`. Open `http://localhost:4322/`. Baseline PDF export showed its error state in the development preview but completed without that error in this exported build; use the built preview for comparison.

| Variant | Axis | When it helps | Cost |
| --- | --- | --- | --- |
| Inline | Existing inline reader | File selection and disclosures need to remain in one long-form view | Dense on a narrow screen |
| Sheet | One focused question and its source passages | Reading conditions carefully matters more than scanning | Adds a modal step between topics |
| Complete | Source passage followed by a local read acknowledgment | A person benefits from a deliberate review checkpoint | “Read” records no real action and cannot confirm cover |

Use `1`, `2`, `3`, or arrow keys to switch variants, and `R` to re-mount the active variant. `?v=1`, `?v=2`, and `?v=3` preserve a selection on reload. The top-right harness control sets completion duration and playback speed, then copies its values. Sheet and Complete include a no-match sample fixture so “not found” can be evaluated without implying exclusion.

The copied `public/` runtime only supports the untouched baseline’s local AnyDoc sample/file flow. Sheet and Complete use fictional in-memory passages and do not support user files or any signing function.
