# Money Ops application

This folder is the active Expo project. Read the [workspace README](../../README.md) for Mac/Xcode setup, project history, and the native test checklist. Design tokens and component rules are in [docs/DESIGN.md](../../docs/DESIGN.md).

## Install and run

Use Node.js 22.13 or newer, then run these commands from this folder:

```sh
npm ci
npm test
npm run web -- --port 4320
```

Open <http://localhost:4320/?app=1> for the application workspace. The root URL shows the landing page.

```sh
npm run build        # Export the web app to dist/
npm run ios          # Open the native app in Expo Go on a Mac's iOS simulator
npm run android      # Open the native app on an Android device/emulator
```

For a locally compiled iOS app, configure Xcode as described in the workspace README and run `npx expo run:ios`. Web exports must be served over HTTP rather than opened from disk.

## Browser and native scope

`App.web.js` is the fuller browser application: policy PDF reading, editable loan offers, prepay-versus-invest, term-life estimates, charts, and themes.

`App.js` is the smaller native prototype: enter a part-payment, select Finish earlier or Lower EMI, edit loan details, work out spare money, and inspect the calculation. Three horizontal bars compare future interest on one scale. Reset sample restores the defaults. Document reading currently shows a notice directing users to the browser app.

The native chart renders React Native and `react-native-svg` components directly. It no longer uses the OpenUI renderer that produced the native `div` render error. Device verification remains pending.

## Policy reader

The active workspace accepts text-based PDFs up to 5 MB and 1,000,000 extracted characters. It uses AnyDoc WASM 0.2.4 locally. Other-format fixtures and older reader experiments do not indicate DOCX/RTF support in the active workspace. Scanned-document OCR is not implemented.

Highlights come from text-matching rules, with source passages and uncertainty available for review. Users must confirm extracted values before applying them to calculations. Missing matches do not prove exclusions, and policy text does not establish active cover or personal suitability. Identifier filtering is incomplete; use synthetic test documents.

`scripts/copy-anydoc.cjs` copies the installed runtime and its MIT licence into `public/vendor/anydoc` before web start/build. This generated directory is excluded from Git. Keep the script and `public/anydoc-worker.js` when redistributing.

## Validation and data

`npm test` runs the amortization, policy evidence, financial contract, PDF assistance, and policy summary suites. `npm run build` verifies the browser export. Neither command proves that the app runs on an Android device or iPhone simulator.

Starting values and bundled document fixtures are synthetic. Financial entries stay in memory; theme persistence is separate. Accounts, phone login, and cloud storage are deferred. The native calculator excludes fees, tax effects, and rate changes; the web calculators have their own documented assumptions and validation.
