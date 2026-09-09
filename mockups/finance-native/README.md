# Money Ops: one-page React Native prototype

Run `npm install`, then `npx expo start --web --port 4320`. Local preview: http://localhost:4320/. Stack: Expo, React Native, React Native Web, native stack, SVG and OpenUI. Android and iOS builds have not been verified.

Enter a part-payment and select Finish earlier or Lower EMI. Three horizontal bars compare future interest on one scale. Edit loan details, work out spare money, inspect calculation reasoning and read sample insurance evidence inline. Reset sample restores the defaults.

The name is Money Ops; the tagline is “Know what to do with your debt.” The bare SVG logo is retained. Tokens and component rules are in ../../docs/DESIGN.md. Pleo and Feather browser observations are in ../../docs/design-references/. Context.dev extraction remains pending because its tools are not exposed in this session, despite the user reporting it connected.

All starting values and policy wording are synthetic. State stays in memory; there are no uploads, storage, telemetry, payments or model endpoints. Calculations use monthly reducing interest and immediate prepayment, excluding fees, tax and rate changes. This is a single-loan prototype, not the complete multi-loan decision engine.

Validation: `node loanMath.test.cjs` passes the sample, zero-interest, zero/full-prepayment, partial-final-payment and boundary-matrix cases. App.js and InterestBars.js pass JSX parsing. The live web preview has shown both selectable repayment outcomes. Additional native device and screen-reader checks remain pending. OpenUI observability is disabled; previewSetup.js suppresses the installed version's development inspector.

## Policy-first reader

Use `npm run web` for development, `npm run build` for a deployable `dist/`, and `npm test` for loan and policy checks. Serve the web build over HTTP. `vercel.json` contains the build configuration.

AnyDoc WASM 0.2.4 reads English public PDF, DOC/DOCX and RTF wording locally, up to 5 MB. Do not select files containing buyer details. Initial reader loading has a 60-second timeout; conversion has a separate 20-second timeout. Scans are rejected rather than sent to OCR. Native apps show a web-only notice for document reading.

The output is a keyword-based reading guide, not an AI interpretation or coverage decision. Missing matches and omitted text are explicit. Common identifier filtering is not complete anonymisation. Check the original wording, schedule and endorsements. PDF export saves only when requested.

`scripts/copy-anydoc.cjs` copies the installed runtime and its MIT licence into `public/vendor/anydoc`. Keep that script and `public/anydoc-worker.js` when redistributing. Vercel builds the runtime from the pinned package.
