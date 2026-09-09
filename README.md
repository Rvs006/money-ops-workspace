# Money Ops workspace

Insurance policy reading, loan comparison, and prepayment planning. This repository contains the current application, financial tests, product documents, and earlier design prototypes so development can continue on another computer.

Start in **`mockups/finance-native`**. Despite the folder name, it contains both the active browser application and a smaller React Native application.

## What works today

| Target | Entry point | Current scope |
| --- | --- | --- |
| Browser | `mockups/finance-native/App.web.js` | Policy PDF reading, loan comparison, prepay-versus-invest, term-life estimates, charts, and Light/Dark themes |
| Android / iOS | `mockups/finance-native/App.js` | Single-loan prepayment calculator with Finish earlier and Lower EMI options; policy reading displays a web-only notice |

The browser interface uses HTML, CSS, Drawably, Recharts, and browser document APIs. Those features still need native implementations before the phone app matches the web app. Xcode does not convert them automatically.

The native interest chart now renders React Native and SVG components directly. This removes the OpenUI renderer that introduced an HTML `div` into the native component tree. Android and iOS device verification is still pending.

## Get the project on your Mac

This is a private repository. Sign in to GitHub with an account that has access before cloning, using GitHub Desktop, GitHub CLI, or your Git credential manager.

```sh
git clone https://github.com/Rvs006/money-ops-workspace.git
cd money-ops-workspace/mockups/finance-native
npm ci
npm test
```

Install Node.js **22.13 or newer** first. Keep `package-lock.json` and use `npm ci` to install the recorded dependency versions. Windows dependency folders and caches are intentionally excluded; install fresh dependencies on the Mac.

Keep the checkout in a normal local development folder, outside OneDrive or iCloud-synced folders, to avoid file-watcher and dependency-sync problems.

## Run the web app

From `mockups/finance-native`:

```sh
npm run web -- --port 4320
```

- Landing page: <http://localhost:4320/>
- Application workspace: <http://localhost:4320/?app=1>

The start script copies the installed AnyDoc runtime into `public/vendor/anydoc`. These generated vendor files are not committed.

To make a static web build:

```sh
npm run build
```

The result is `mockups/finance-native/dist`. Serve it over HTTP; opening `index.html` directly from disk will not provide the worker paths used by the policy reader. This command builds the **web app only**, not an iOS or Android binary.

## Run on the iPhone simulator

The app uses Expo SDK 57, React Native 0.86, and React 19.2.3. Install a compatible Xcode version (**26.4 or newer**), its Command Line Tools, and an iOS Simulator runtime. Check [Expo SDK requirements](https://docs.expo.dev/versions/v57.0.0/) and [Apple's Xcode/macOS compatibility table](https://developer.apple.com/xcode/system-requirements) before installing.

Open Xcode once to complete its setup. In Xcode Settings, select Command Line Tools under Locations and install an iOS runtime under Components.

For the first simulator preview, run this from the app directory:

```sh
npm run ios
```

Expo starts Metro and opens the native app in the simulator through Expo Go. If prompted, allow the matching Expo Go version to be installed. See [Expo's simulator guide](https://docs.expo.dev/workflow/ios-simulator/).

For a locally compiled native iOS build:

```sh
npx expo run:ios
```

Expo generates the `ios/` project when it is missing, installs native dependencies, builds with Xcode, and starts Metro. Use the generated `.xcworkspace` inside `ios/` when opening it in Xcode. See [Expo's local build guide](https://docs.expo.dev/guides/local-app-development/).

The generated `ios/` and `android/` directories are currently ignored. Keep native configuration changes in Expo app configuration or config plugins so regeneration can reproduce them. There is no Swift/SwiftUI rewrite required to run the existing React Native screen.

Local development does not require Artemis, an AI API key, or paid cloud builds. App Store/TestFlight distribution is a separate step requiring Apple Developer Program membership.

## First native check

1. Open Money Ops and confirm there is no `View config getter ... div` error.
2. Change the sample part-payment from ₹20,000 to ₹10,000.
3. Select **Finish earlier**, then **Lower EMI**; confirm the takeaway and selected bar change.
4. Edit the loan details, open the spare-money and calculation disclosures, and try invalid inputs.
5. Scroll through the screen and choose **Reset sample**. Confirm the original inputs return.

Use synthetic values for testing. No physical-device or iOS-simulator pass is claimed by this handoff.

## Project map

| Location | Contents |
| --- | --- |
| `mockups/finance-native/` | Active Expo app, calculation modules, parser tests, synthetic document fixtures, and assets |
| `mockups/finance-native/proto/policy-review/` | Earlier policy-review experiment |
| `mockups/personal-finance/` | Earlier finance flows and interface studies |
| `mockups/money-ops-logo-lab/` | Logo geometry, exported assets, and exploration |
| `mockups/money-ops-logo-prototypes/` | Interactive logo studies |
| `docs/` | Design tokens, product decisions, reference notes, and HTML design studies |
| `PM-Capability-Platform-Blueprint.md` | Original case-study context |
| `CLAUDE.md` / `AGENTS.md` | Project instructions; `AGENTS.md` is a relative symbolic link to `CLAUDE.md` |

Older prototypes are reference material, not the active app. Their own package files and READMEs describe their setup. Read `docs/DESIGN.md` before changing the active UI.

## Policy reader and data

The active workspace accepts text-based PDFs up to 5 MB and 1,000,000 extracted characters. It uses local text-matching rules to produce highlights, source passages, and candidate calculator values. Users must confirm extracted values before applying them. OCR and hosted AI interpretation are not implemented.

The underlying document library and older prototypes include other-format experiments. The active workspace's supported input is PDF; do not infer DOCX/RTF support from the test fixtures.

Financial entries stay in memory. Theme preference may persist independently. Backend accounts, phone login, and cloud storage for financial data are not implemented. Extracted text does not prove active cover or personal suitability.

## Verification

Run from `mockups/finance-native`:

```sh
npm test
npm run build
```

The test command checks amortization, offer comparisons, surplus decisions, policy evidence, PDF assistance, and policy summaries. A passing web build does not verify the native renderer. The native checklist above must still be exercised on a simulator or device.

## What is excluded

Credentials, local environment files, dependency folders, build outputs, Expo caches, signing files, and local tool configuration are not part of the upload. Runtime vendor assets are recreated by `npm run prepare:documents` (also run automatically before web start/build).

The separate `mockups/money-ops-logo-public/` publishing checkout, its generated archive, and the old instruction-file backup stay local. The editable logo sources and exported artwork are included in the logo lab and prototype folders.

The locally supplied `productos/` strategy toolkit and machine-specific `.agents/` / `.claude/` skill installations remain excluded under the existing project rules. They are optional development tools, not application runtime dependencies. Their project outputs are included in `docs/`.

## Existing deployment

The earlier deployed project is `rvs006s-projects/money-ops`; its [review workspace](https://money-ops-rvs006s-projects.vercel.app/?app=1) may differ from this checkout. Creating this handoff repository does not deploy or relink that project.

The app's Vercel configuration lives in `mockups/finance-native/vercel.json`. If deployment is later requested, use `mockups/finance-native` as the project root.
