---
version: alpha
name: Money Ops Review System
description: A native decision workspace with editable inputs and visible financial tradeoffs.
colors:
  primary: "#304b3c"
  surface: "#ffffff"
  surface-container: "#edf4ef"
  on-surface: "#242a27"
  on-surface-variant: "#505a54"
  outline: "#505a54"
  outline-variant: "#c7d4cc"
  error: "#8a3028"
  chart-reserve: "#769180"
  chart-premium: "#c6a36a"
  chart-baseline: "#a7b5ac"
typography:
  display-lg: {fontFamily: system-ui, fontSize: 42px, fontWeight: 700, lineHeight: 50px}
  headline-lg: {fontFamily: system-ui, fontSize: 30px, fontWeight: 700, lineHeight: 36px}
  headline-md: {fontFamily: system-ui, fontSize: 24px, fontWeight: 600, lineHeight: 30px}
  body-lg: {fontFamily: system-ui, fontSize: 18px, fontWeight: 400, lineHeight: 27px}
  body-md: {fontFamily: system-ui, fontSize: 16px, fontWeight: 400, lineHeight: 24px}
  body-sm: {fontFamily: system-ui, fontSize: 14px, fontWeight: 400, lineHeight: 21px}
  label-md: {fontFamily: system-ui, fontSize: 16px, fontWeight: 600, lineHeight: 24px}
  label-sm: {fontFamily: system-ui, fontSize: 12px, fontWeight: 500, lineHeight: 18px}
rounded:
  none: 0px
  sm: 8px
  md: 12px
  lg: 24px
spacing:
  none: 0px
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 16px
    height: 48px
  button-quiet:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 12px
    height: 48px
  loan-summary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.none}"
    padding: 24px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.md}"
    padding: 16px
    height: 48px
  comparison:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 16px
---

## Brand & Style

Scope is only `mockups/finance-native`, the Money Ops prototype. Other ProductOS identity templates in this repository describe SAM and do not govern this app. The product intent is in FINANCIAL-PRODUCT-REVISION.md and the user's current instructions. Name and tagline are Money Ops / Know what to do with your debt.

This documents the existing native palette and consolidates the UI around a loan decision. It is a review baseline, not approval of a production identity. ProductOS Design System from Code supplied the extraction method; Design Better supplies hierarchy, interaction and accessibility checks.

## Colors

The existing theme is the source for the colours above. White is the continuous working surface; ink carries the loan context and outcomes. Primary green marks the main action and the repayment scenario. Error text uses the existing dark red. No gradients, ambient glow or default shadows.

Inputs and meaningful chart strokes use on-surface-variant rather than the low-contrast decorative outline. The current comparison uses three horizontal bars on one scale, with exact rupee labels. The selected option uses primary green; the other bars use on-surface-variant. Zero interest has no filled bar. Legacy allocation colours remain available but are not used on the current screen.

## Typography

Use the platform system font as an interface workhorse. Identity comes from the existing bespoke bare SVG logo, not a newly downloaded display font. Native uses its system default, while the web preview resolves its system sans. The eight levels above map to `ui.type` and `ui.leading`; regular, medium, strong and bold weights are 400, 500, 600 and 700.

Use tabular numbers. Avoid uppercase metadata and large promotional statements. Never reduce real comparison figures below body-sm to force columns to fit.

## Layout & Spacing

Use a 4px base and the documented spacing scale. The working canvas has a 1040px maximum width. At widths below 800px, input and result columns stack in source order; expanded evidence uses the 680px reading measure. Minimum comparison columns are 280px before stacking. These layout roles are the new patterns introduced by the requested redo, implemented in `ui.layout`.

The app has one page. A payment field updates the recommendation and three interest bars immediately. Loan editing, spare-money calculation, reasoning and insurance evidence expand in place. Insurance remains independent of loan input. Charts stay next to the figures they explain. Do not make people scroll through a household dashboard before trying a loan question.

## Elevation & Depth

Use tonal surface changes, not shadows. The loan summary is a plain contextual row. Only the selected comparison gets a tonal surface, keeping the payment and result visually connected. Do not add glass, noisy backgrounds or floating decorative objects to a financial form.

## Shapes

Buttons and inputs use the 12px radius. The account summary has no enclosing panel. Small selectable rows use 8px. Chart geometry comes from plotted data, not decorative CSS shapes. Numerical bounds are mathematical rather than spacing tokens.

## Components

**button-primary:** one visually dominant action per view. Minimum 48px touch height; tone changes on hover/press; 2px visible focus. Invalid actions are disabled at 0.45 opacity with a nearby explanation.

**button-quiet:** secondary navigation and disclosure with the same touch floor and focus treatment. Never use filled-plus-outlined button pairs.

**loan-summary:** plain account context with balance, interest rate and remaining term. Edit opens labelled fields inline.

**input:** visible label, numeric keyboard, blur validation, native focus. The 2px outline uses on-surface-variant; focus uses primary. Preserve in-memory input when disclosures close. No placeholder-only labels.

**comparison:** three aligned horizontal interest bars: No part-payment, Finish earlier and Lower EMI. The latter two are selectable buttons with a visible selected state. Selecting one changes the outcome sentence above the chart. Show no-prepayment, shorter-term and lower-EMI values from one unrounded calculation. Prose gives the conditions behind an outcome. Current prototype assumes no fees or tax effects.

## Do's and Don'ts

- Do keep data synthetic until the user edits the local scenario; never persist it.
- Do put both repayment outcomes on one view and show their assumptions.
- Do keep real text visible without relying on entrance animations.
- Do provide numeric labels alongside every chart and keep the final payment accurate.
- Do test zero interest, zero/full prepayment, shortfall and invalid input.
- Don't add arbitrary financial-health scores or pretend upload controls.
- Don't hide policy evidence in a tooltip or make insurance depend on loan input.
- Don't claim the full product MVP is complete. This is a UI and calculation prototype.

## Reference provenance and application

The Pleo and Feather observations are recorded separately in [PLEO-DESIGN.md](design-references/PLEO-DESIGN.md) and [FEATHER-DESIGN.md](design-references/FEATHER-DESIGN.md). They contain sampled live browser styles, not complete Context.dev exports. Context.dev was reported connected on 8 September 2026, but no connector extraction tools were exposed in this session.

Borrow Pleo's clear hierarchy and Feather's short explanations. Keep Money Ops focused on a working decision rather than a marketing homepage. Reference fonts, photographs, logos and brand colours have not been installed or copied.

| Before | After | Why |
| --- | --- | --- |
| Several navigation paths | One page with inline disclosures | Keep the decision in view |
| Dense text and multiple chart types | Three comparable interest bars | Show the cost difference directly |
| Separate result explanation | One outcome sentence with optional reasoning | Give the answer before the detail |

## Policy-first revision: 8 September 2026

The primary value proposition becomes “Make sense of your policy.” The first section accepts policy wording and surfaces matching passages under six everyday questions. The loan comparison follows below and remains independently usable. This supersedes the loan-first order above.

DocumentReview uses the existing system tokens: title/section/body/small typography, green action, white canvas, wash for expanded evidence, 48px controls, 8px corners and 24px section gaps. There are no new visual tokens. One solid file-selection action is followed by a quiet sample action. Six full-width disclosure rows show topic names and matching-passage counts, with clear missing-text states rather than coverage ticks. Evidence is plain text, never rendered HTML.

AnyDoc 0.2.4 runs in a self-hosted browser worker. Files are never sent to an extraction service. This first implementation accepts English public policy-wording documents without buyer details: PDF, DOCX, DOC and RTF, up to 5 MB. Scans and password-protected files get actionable errors. Clear terminates processing and removes the in-memory review. No document names, storage, analytics or hosted OCR. Common identifier redaction is defence in depth, not a promise of complete anonymisation.

The review is a keyword-based reading guide, not an AI interpretation or coverage decision. Every topic shows the relevant source text with an extracted-paragraph locator, and missing matches mean “not found”, never “not covered”. Help text explains what to check rather than fabricating policy facts. Local PDF export includes the same limitations. User-authorised exports are the only saved outputs.

Native React Native builds retain an honest web-only notice for document reading; the browser worker is not loaded on native. The loan tools continue to use native components.

## Product hub revision: 9 September 2026

The user's latest brief supersedes the policy-first and single-page navigation above. Money Ops is a personal finance decision product. The design-review build has mobile-number and OTP onboarding, an explicitly simulated MPIN/biometric return flow, and a home screen with Loans and Insurance. Credit Cards, Mutual Funds and Financial Dashboard are visible as upcoming, not available tools.

The selected identity is the approved blue document scanner with white rupee glyph. Use its original flat SVG silhouette. Only the horizontal scanner rail moves; the document and rupee remain still. The app uses restrained Drawably geometry for interactive controls and surfaces. The studio's 3D and particle effects remain studio treatments. Motion must respect reduced motion and have a pause control if it loops. Controls and content are always visible.

New web design tokens may use the approved logo's blue (#386ADA), a darker action blue (#1947C7), white (#FFFFFF), pale blue (#F1F5FF), dark ink (#242A27), muted ink (#505A54), and existing error red (#8A3028). These replace green for the redesigned web experience. Retain the spacing, typography, touch floor and responsive measurements in the token table. Centralize role-specific geometry in the web token sheet. Keep the brand mark bare, no containing logo tile.

Loan comparison accepts two or more user-entered offers, explicitly labels rupee-denominated upfront fees and months, and distinguishes flat from reducing interest. Rank by total borrowing cost only for the same principal and loan type. Different terms remain visible as a monthly-affordability tradeoff. Display calculated totals, repayment amount and interest/fee breakdown alongside the recommendation. A zero-cost tie must read as a tie. Default reducing interest must be visible even though rate type is optional in the brief.

Prepay versus invest asks for usable surplus, reserve retained from that surplus, and an assumed net investment return in addition to the existing loan fields. Show baseline, shorter tenure and lower EMI totals, with a toggle selecting the recommendation scenario. Fees reduce the available prepayment budget. Compare wealth at the original loan maturity using equal initial funds and equal monthly budgets. Investing the freed EMI is an explicit assumption, and future returns are uncertain. No lender or investment product endorsement is implied.

Insurance retains the working local document reader. It remains a source-passage reading guide, not verified extraction of every policy fact. The comparison path is a clearly preliminary manual worksheet until the user specifies its product-specific coverage and recommendation rules. Do not recommend insurance solely on price.

Authentication is a user-approved demo for design review. No SMS is sent, MPINs are not persisted, and a simulated biometric action must never claim to authenticate the device. Financial inputs remain in memory. Production authentication, account storage and a validated insurance recommendation model are separate implementation work.

### Web implementation role tokens

The web shell centralizes its role palette in `app.web.css`: ink #182640 and muted #50617B are blue-tinted text roles; line #BDCBEA is the Drawably outline role. They accompany action #1947C7, white #FFFFFF and wash #F1F5FF. Layout uses a 1120px outer canvas, 760px reading measure, 48px controls, 12px corners, 36px desktop title and 30px mobile title. These explicit web roles supersede the earlier 1040px native canvas for this review. Body remains 16px and comparison figures use tabular numbers.


## One-page corrected field specification: 9 September 2026

The corrected field specification supplied in attachment 92542e4e-43db-4ff1-8d11-dddb52a8679a supersedes the earlier review flow. The app opens directly as one continuous page with anchor navigation to loan comparison, surplus decisions and term-life insurance. Demo authentication is an optional disclosure, not a gate or separate page. Compare-set cap is three; Flow 1 prepay intent is deferred.

Loan costs now include processing fee percent/amount selection, editable default18% GST, upfront/financed insurance, months/years, net disbursal, XIRR effective APR and cost per lakh. Different amounts or tenures use APR as the primary ranking and retain cumulative cost-per-lakh differences. Rate basis (flat/reducing) is distinct from arrangement (fixed/floating). Default assumptions stay visible.

Surplus analysis includes profile tax assumption, explicit confirmed loan-interest tax saving, gross-return presets and slider, optional EMI reconciliation, percentage/amount prepayment fees, and protected liquidity. Blank emergency-buffer amount uses monthly essential expenses times an editable3–6months. If expenses are missing too, the verdict requires clarification instead of inventing a buffer. Foreclosure routing checks principal first then flags any fee/reserve shortfall. A fee-heavy prepayment cannot win merely because the headline loan rate exceeds expected return.

The tax treatment is an explicit simplified scenario, not a statutory tax engine: positive investment returns use the entered slab haircut, negative returns receive no assumed tax credit, and loan relief is only the user-confirmed amount capped by modeled interest. No section24(b) or80C eligibility is inferred from loan type. Loan tax regime, capital-gains treatment and deduction limits require separate validated implementation.

Insurance is term life only. Manual inputs are the source of the summary; local PDF assist can suggest unambiguous labelled amounts/terms with source snippets. Users must individually confirm candidates before applying them. Scanned-PDF OCR is not implemented; the screen says so and provides manual entry. The10–15times income plus liabilities target is a movable heuristic, not product advice. Premium due dates create on-page flags only, not scheduled notifications or inferred lapse status.

Logo behavior: the approved flat SVG scans by default. Hover, keyboard focus or touch reveals dots sampled from the same geometry, with pointer repulsion and click/Enter ripples. The rupee and document remain fixed; only the scan rail travels. Leaving restores the solid animated mark. Pause and reduced-motion keep a static mark. Particle padding keeps displaced dots within the canvas, and no layout size changes on hover. Logo dimensions64×70.4px are role tokens in hover-logo.css.


### Header refinement

The user explicitly removed the visible Pause logo control. The flat scanner plays automatically and retains hover dots; system reduced-motion still displays the static mark. Do not restore a playback control in the app header.

## Frontend MVP refinement: 9 September 2026

The user deferred backend work after discussing real phone login. This pass is frontend-only: preserve the one-page Drawably product, remove simulated account affordances, and improve form clarity, component reuse and mobile/keyboard behavior. No account, cloud persistence or SMS capability is implied.

Skill sequence applied: ProductOS Develop Design Better (scope, form states and touch layout); Emil Component Design (shared form controls with native props); Emil Design Engineering (purposeful motion and stable interaction); Emil UI Review (browser verification and final craft gate). The full ProductOS backend build is deferred, not marked complete.

The logo uses the normal pointer cursor, never a crosshair. It scans by default and keeps hover/focus dots. Field status text uses the existing12px caption role; range inputs receive at least44px touch height. Form errors appear by the field on blur, clear when edited and remain accessible. Successful reviews take focus to their result without hiding any content or animating entry. Anchor and result targets clear the sticky navigation.


### Document scrolling
The web MVP uses document scrolling, overriding Expo body overflow:hidden. Lenis smooths wheel input with lerp0.12 and automatic RAF; touch remains native. Reduced-motion destroys the smoother and restores native scrolling. Native anchor offsets and result focus remain supported.

### Field visibility and theme
User-requested grey editable boxes use field-surface #e9e9e9 and field-edge #c5c5c5, existing s2 radius and 48px minimum height. Header right holds a labelled Light/Dark switch with persistent local preference. Dark mode uses neutral paper #191919, wash #252525, ink #f2f2f2, muted #b9b9b9, blue #a9c0ff, fields #353535 and edge #686868. Action text uses on-action #fff in light and #151515 in dark. Drawably chrome inherits theme tokens.

### Emil design engineering craft pass
Preserve the one-page Drawably design, grey fields, theme and scanner. Compact field labels keep status beside the label when space permits. Native select affordances stay visible. Navigation uses current-location text weight750 and ink, with no decorative dot. Keyboard anchor activation scrolls instantly and focuses the section. Pointer-only button presses use scale0.98,120ms and cubic-bezier(.23,1,.32,1); no entrance reveals, keyboard movement or reduced-motion scaling. Mobile title uses section token24px; card padding uses s4.

### Live financial explanations
Three result-local disclosures use Recharts for exact geometry, Rough.js seeded hatching for fee bars, and Drawably sliders and disclosures. Cost layers use a fixed shared zero scale. Repayment curves use compareLoan monthly balances with both tenure and EMI modes. Flat/reducing teaching uses the first compared offer principal, quoted rate and term, with fees excluded and unchanged actual offer ranking. Native sliders inspect months, controls work with keyboard and touch, data updates are immediate with no entrance or count-up animation. All figures have text readouts; existing liquidity/review gates stay visible. Chart height260px / mobile220px; typography, surfaces, spacing and colours inherit existing tokens.

## Waitlist landing page: 9 September 2026

The web root is a quiet Money Ops waitlist page; the working financial prototype remains available at `?app=1`. This keeps the acquisition page separate from the local, editable decision workspace and does not imply accounts, saved data or backend readiness.

Waitlist page tokens are scoped in `waitlist.css`: page surface `#F4F3F4`, ink `#242A27`, muted text `#505A54`, action/focus blue `#1947C7`, and footer `#060706`. No background image has been supplied yet, so the page uses the approved `#F4F3F4` surface until an asset is available. The preview asset is `public/money-ops-preview.png`; it has no frame, container border or shadow and reaches the black footer as one composed visual sequence.

Forum is a user-directed display face used only for the waitlist wordmark and the hero H1, with tight `-0.055em` to `-0.065em` tracking. DM Sans regular is used for all other waitlist copy and subheadings. The responsive tokens are a `680px` reading measure, `1100px` heading measure, `clamp(20px, 5vw, 80px)` page gutter, `clamp(30px, 7vw, 80px)` hero display, `clamp(28px, 3vw, 32px)` supporting heading and a 2px visible focus outline. The header is a three-column grid that keeps the bare scanner/rupee mark and wordmark centered while the prototype link occupies the right column; on narrow screens it becomes two centered rows. It retains its automatic rail and pointer-dot treatment, with a static reduced-motion fallback.

The official Paperform React embed loads only when `EXPO_PUBLIC_PAPERFORM_ID` is supplied. It appends `https://paperform.co/__embed.min.js` and renders the documented `data-paperform-id` host; a direct `https://<id>.paperform.co` link remains available if embedding fails. With no configured ID, the page truthfully reserves the signup area without a fake email field or claim that a submission was recorded. Policy guidance remains factual: text-based PDF assistance only, no scanned-document OCR, and any extracted detail requires confirmation and cannot establish active cover or personal suitability.


### Finlens result-pattern adoption: 9 September 2026
The decision workspace adopts the team prototype's takeaway, key difference and reason structure using existing Money Ops tokens and calculations. The policy reader precedes the manual policy, loan and surplus disclosures in source order as well as visual order. Applying confirmed PDF values opens the manual review. Policy facts are explicitly entered values, with source evidence retained in the reader; policy term is not described as remaining cover. Gap and target remain illustrative. Loan APR ranking and directional cost differences, buffer and EMI warnings, and investment uncertainty remain visible. Detailed figures, assumptions and live charts expand in place. The scanner, Drawably controls, grey inputs, Light/Dark preference and document scrolling are retained. No account, reminder or storage capability is added.

### Waitlist device mockup
The user requested an image-generated hand holding an iPhone, replacing the flat screenshot. The landing page uses public/money-ops-hand-iphone.png, generated from a browser capture of the refreshed mobile policy-upload interface. The uniform backdrop matches #F4F3F4 and the wrist meets the footer edge. This is a static app preview, not a functioning native iPhone app. The source screenshot is retained in .playwright-mcp/money-ops-phone-screen.png.



### Reduced-copy workspace: 9 September 2026
The user requested less visible text after an Emil UI Review. Keep one short introduction, a prominent Drawably upload action and a single format/privacy line. File limitations and confirmation guidance expand under File support & privacy; detected source passages remain visible beside their selection controls. Shared profile fields expand under Income, tax and buffer. Results retain their takeaway, exact figures, provenance and essential risk or validation warnings; secondary policy context stays in Assumptions and checks. Use the existing typography, colour, spacing and 48px action tokens. Do not replace removed prose with decorative icons or hide required evidence.

### Video-reference waitlist refinement
The user's supplied tutorial and hand pose supersede the earlier straight-on phone image. Use public/money-ops-hand-angled.png: a clockwise-angled phone and diagonal forearm, with a full-width violet/blue/amber colour band as explicitly requested by the reference. The extra product-preview heading is removed. Hero tokens: intro gap clamp(56px, 7vw, 96px), bottom gap 24px, title clamp(30px, 5.5vw, 64px) with 1.05 leading. Mobile intro is 48px. The image's top 12% fades into the page without touching the phone; mobile uses a square cover crop at 58% bottom, keeping the whole device visible. The wrist meets the footer with no gap. Footer limitations use #c6c6c6 on #060706. These page-only changes leave the financial workspace intact.


### Emil craft pass 2: 9 September 2026
Interaction polish only; no palette, layout, copy or calculation changes. Navigation links reserve their bold width with a hidden `data-label` copy so the current section no longer reflows the row. The sticky navigation carries a 14px paper-to-transparent fade below it so content dissolves under the bar rather than being cut. Disclosure summaries use one round-capped chevron that rotates 90° in 160ms; opened content settles with a 140ms opacity keyframe that starts from the visible default, so nothing is hidden if motion never runs. The Drawably sketch is hidden inside grey fields, which removes the ghost outline and second chevron that showed through the locked policy-type select; disabled fields now keep full opacity with muted text and a softer edge. Verdict figures, slider readouts and facts use tabular numerals. Quiet buttons, chart choices, summaries and the theme knob share the existing 120ms/160ms motion tokens and `cubic-bezier(.23,1,.32,1)`; pointer presses scale to 0.98. Focus rings are one 2px blue outline with a 3px offset (fields keep 2px), and Drawably's sketched focus path is suppressed to avoid a double ring. Text selection uses a 24% blue tint. Reduced motion still disables every transition and animation.

### Alternative mockups canvas: 9 September 2026
A design canvas at https://claude.ai/code/artifact/27c309f6-61fd-47de-b8f4-8015d718572a holds the current screen beside four alternatives, each changing one axis with the existing tokens: A Sketchbook (pen texture on every surface, hachure wash on the key figure), B Ledger (tonal rows, 42px figure, no wash panel), C Phone-first (mark as hero, full-width action, bottom section switcher), D Split workspace (inputs left, live answer right). A second page shows the approved mark unchanged with explorations that reuse its paths (mono ink, reversed on action blue, on ink, Drawably outline, lockups, small sizes) and three Drawably control treatments (grey box, sketched box, pen baseline). Static mockups, not prototypes; nothing here changes the approved identity or the app. Working files and the generator are in `docs/design-canvas/alternatives/`; sketch strokes come from rough.js so they match Drawably's.

### Clickable prototype canvas: 9 September 2026
A working prototype of the whole one-page workspace lives on a design canvas (working files in `docs/design-canvas/prototype/`). It carries the web token sheet, the grey fields, the Light/Dark switch, the sketched offer cards and the scanning mark, and it runs the app's own loanMath, mvpMath and policyAssist code ported verbatim, so every result matches the app: term-life review with the rule-of-thumb gap, two-or-three offer comparison with APR or cost ranking, the fee and flat-versus-reducing explanations, and the four-scenario surplus verdict with the repayment chart. The PDF reader cannot run inside the canvas sandbox, so "Upload policy PDF" and "Use the sample policy" both read the labelled test-fixture policy through the real candidate extractor, and the status line says so. Charts are plain SVG and CSS hatching rather than Recharts and Rough.js. Forms use button handlers because the sandbox blocks native submission. It is a prototype for review, not the product build; nothing is stored.

### Health-policy PDF reading fix: 9 September 2026
The shared upload reads text-based health and life policy PDFs into the existing six-topic source-passage guide. Reuse the web Disclosure component and current typography/spacing/theme tokens; no new visual system. A successful extraction without calculator candidates is a successful reading, with clear topic matches and missing-information states. Show extracted-paragraph locations, omitted-match counts and partial-reading warnings. Keyword matches do not establish coverage or suitability.

The manual calculator remains term life only. Only explicitly identified term-life documents without health-policy signals may propose calculator values, and each still requires source confirmation. Health, mixed and unidentified documents stay in the reading guide. Clearing removes the guide and candidates from memory. Documents are not uploaded or persisted; identifier filtering remains incomplete.

### Policy TLDR and workspace orientation: 9 September 2026
The policy result now leads with “Your policy, in brief”: plain-English highlights derived from a local, serializable JSON record. Each found highlight includes its extracted-paragraph source. Unclear or conflicting values stay marked for checking; missing text is never treated as no cover. Full keyword excerpts move under Explore policy wording, and the JSON stays under About this summary. No hosted model, document upload, suitability judgment or automatic calculator update is introduced. Keep the 1,000,000-character reading cap and the 5 MB file limit.

The policy summary uses the existing reading measure (`--policy-reading-width: 760px`), body/section/small typography, paper/wash surfaces, 24px desktop or 16px mobile padding, and the 12px radius. The JSON inspection region uses `--policy-json-height: 384px` (eight 48px spacing units); overflow scrolls within this optional, keyboard-focusable view. Highlight labels and explanations align as a 1:3 grid on desktop and stack below 800px. Source text wraps and remains visible without an entrance animation. No shadows, new palette, pill metadata or illustrative dashboard.

Workspace breadcrumbs represent real anchors and the current tool. The shared profile becomes one compact disclosure with its purpose stated: calculator inputs are optional for policy reading. Field placeholders show examples without replacing persistent labels or entering data. Context links open the profile when income or buffer inputs are needed. Tighten section gaps using existing spacing tokens while preserving the one-page flow, automatic scanner, grey inputs, Light/Dark preference and native document scrolling.

The workspace profile chevron retains its existing 14px glyph size via `--workspace-chevron-size`. Breadcrumb links use the 48px control floor. Workspace gaps use 32px between tools, 24px above the first tool and 16px below section headings. The previous disclosure-opacity keyframe is removed: only the chevron changes state, and text is present immediately.
