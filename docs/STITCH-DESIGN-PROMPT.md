# Money Ops: Google Stitch design exploration prompt

Design three alternative UI and UX concepts for Money Ops, a working personal-finance decision workspace. Focus on the product interface, not a marketing or waitlist page. Create desktop and mobile designs, with light and dark variants. Treat this brief as the current design specification; historical directions in the full DESIGN.md are superseded where they conflict with it.

## Objective

Help someone understand their insurance policy, inspect the source behind a finding, and then optionally explore a financial decision. The first useful action is uploading a policy PDF. Reduce visible form density while keeping evidence, uncertainty and required validation accessible.

The product has three independent tools on one continuous page:
- Policy reading, with a separate manual term-life calculator.
- Comparison of two or three loan offers.
- Prepay versus invest analysis.

Policy reading must work without entering income, a loan or a household profile. Keep navigation as real section anchors. No onboarding gate, dashboard home, account screens, OTP, biometric login, saved-policy library or cloud-storage claims.

## Deliver three genuinely different concepts

A. Reading-first workspace: put the policy summary and its source evidence at the centre of the experience. Explore a clear, document-like reading flow with calculators available through compact in-page sections.

B. Guided review: organise the same page around upload, inspect and confirm. Use progressive disclosure without turning it into a forced multi-page wizard. Keep users free to switch tools and revise earlier values.

C. Decision workspace: on wide screens, keep editable context and its current result visible together. On mobile, compose one clear reading order with a compact result recap near the relevant inputs. This is functional workspace organisation, not a split marketing hero.

Change information hierarchy and interaction structure between concepts, not just colours. Explain the main tradeoff of each in two sentences. Preserve the same tokens, identity, capabilities and financial safeguards so the alternatives are comparable.

## Identity and visual language

Name: Money Ops.

Use the existing approved flat blue document-scanner mark with a white rupee glyph. I will supply the original SVG or a reference screenshot. Preserve its geometry; do not invent a replacement, wrap it in an icon tile, or add a gradient. If the asset is unavailable, reserve the correct space and identify it as an asset dependency.

Keep the Drawably character: restrained hand-drawn frames and controls, with crisp text and mathematically exact charts. Sketch texture belongs in outlines, seeded hatching and occasional annotations. It must not distort data, obscure labels or create double borders. Grey editable fields should read immediately as editable.

Use platform system-ui typography for this product. The approved mark carries the identity. Do not import the waitlist page's display fonts or imagery. Make this feel like a considered financial reading tool, with character coming from evidence presentation and disciplined sketch details.

## Design tokens

Use these named roles consistently. Do not introduce arbitrary visual values. Any necessary new token must be listed as a proposed extension for review.

| Role | Light | Dark |
| --- | --- | --- |
| Page / paper | #FFFFFF | #191919 |
| Secondary surface / wash | #F1F5FF | #252525 |
| Main text / ink | #182640 | #F2F2F2 |
| Secondary text | #50617B | #B9B9B9 |
| Action / focus | #1947C7 | #A9C0FF |
| Text on action | #FFFFFF | #151515 |
| Editable field | #E9E9E9 | #353535 |
| Field edge | #C5C5C5 | #686868 |

Approved logo blue: #386ADA. Light-theme Drawably outline: #BDCBEA. Existing error red: #8A3028. A dark-theme error role is not specified here: propose an accessible equivalent explicitly rather than silently reusing low-contrast red.

Typography: system-ui; body 16/24px, supporting body 14/21px, large body 18/27px, caption 12/18px, section heading 24/30px, desktop title 36px, mobile title 30px. Mobile section titles remain 24px. Large comparison figures may use the existing 42/50px display role. Use tabular numerals for figures. Do not shrink important figures below 14px.

Spacing scale: 0, 4, 8, 12, 16, 24, 32, 48px.
Corners: 0, 8, 12, 24px; standard fields and buttons use 12px.
Outer canvas: maximum 1120px. Reading measure: 760px. Stack related columns below 800px. Comparison columns need at least 280px before stacking.
Controls: minimum 48px height. Sliders: minimum 44px touch area. Focus: one visible 2px outline, 3px offset except fields at 2px.
Charts: 260px desktop height, 220px mobile, with exact text values available.

Keep a labelled Light/Dark switch on the right of the header. Do not use the stock sun-and-moon pill. Theme preference may persist; financial inputs and documents do not.

## Primary flow: understand a policy

Initial view:
- One short introduction and a prominent Upload policy PDF action.
- A quiet Use sample policy action with an honest sample label.
- One short supported-format/privacy line.
- File support & privacy disclosure for the detailed limits.
- Compact access to manual term-life entry and the other tools.

Capabilities and limits:
- Local reading of text-based health and life insurance PDFs, up to 5 MB.
- No scanned-document OCR. Do not advertise Word, DOCX or RTF support.
- Reading is limited to 1,000,000 characters; partial reading must be disclosed.
- Policy text is processed locally, not sent to a hosted model or extraction service, and is not persisted. Identifier filtering is incomplete; avoid absolute claims such as fully anonymised or guaranteed private.
- Manual term-life entry remains available when extraction is unsupported or fails.

After reading, lead with Your policy, in brief:
- Plain-language highlights, each linked to its extracted-paragraph source.
- Explicit unclear, conflicting and not-found states.
- Not found never means not covered.
- Explore policy wording expands the six-topic source-passage guide.
- About this summary contains provenance, limitations and optional JSON inspection.
- Reading a health policy successfully is a valid outcome even when no term-life calculator fields can be suggested.

Show policy facts, candidate values and findings as different things. Only clearly identified term-life documents without health-policy signals may suggest calculator values. Each suggested field needs its own confirmation beside visible source evidence. Applying confirmed values opens the manual review; never silently populate it from ambiguous text. Do not describe policy term as remaining cover or imply that document text proves active cover or suitability.

Clear removes the current review and candidates from memory. A sample action must be clearly labelled and provide usable sample evidence. Never disguise a sample as a real uploaded document.

## Secondary tools and results

Shared profile: one compact Income, tax and buffer disclosure. Explain that these inputs are for calculators and are optional for policy reading. Context links may open it when needed. Persistent labels are mandatory; placeholders are examples, not prefilled facts.

Term-life calculator: distinguish manually entered and confirmed values. Any income-multiple cover target is an adjustable illustrative heuristic, not a personalised recommendation. Premium-date flags are on-page indicators, not scheduled reminders or proof of lapse.

Loan comparison: support two or three offers. Keep principal, term and units, interest rate, flat/reducing basis, fixed/floating arrangement, fees, fee percent/amount, editable GST assumption and upfront/financed insurance discoverable. Results include net disbursal, effective APR, repayment and interest/fee breakdown. APR is primary when amounts or terms differ. Do not rank unlike loans by the shortest total-cost bar. Show zero-cost ties honestly.

Prepay versus invest: preserve surplus, protected reserve, essential expenses, editable buffer months, prepayment fees, tax assumptions, expected return and EMI reconciliation. Missing buffer information requires clarification. Fees and reserve shortfalls must remain visible. Loan-interest tax relief is explicitly user-confirmed. Investment returns are uncertain. Explain the equal-funds/equal-monthly-budget comparison and any reinvestment of freed EMI under assumptions. Do not infer tax eligibility.

Each result leads with:
1. One plain-language takeaway.
2. Its key amount or difference.
3. A short reason.

Put full figures, assumptions and educational charts behind clearly named disclosures. Essential warnings and required confirmations remain visible. Distinguish chart-only scenario exploration from changes to the actual recommendation.

Charts use real amortisation series and shared scales where appropriate, not interpolated endpoint curves or decorative financial graphics. For design-only outputs, label every illustrative amount as sample data. Do not imply that Stitch has implemented or validated the financial calculations.

## Interaction and accessibility

- Content is visible by default, including when JavaScript or animation fails.
- Opening and closing disclosures preserves in-memory edits.
- Labels, units, inline errors and focus states are designed, not omitted.
- Validate fields on blur and clear their stale error when edited.
- After an explicit review action, focus can move to the result. Routine edits and chart exploration must not steal focus or change scroll position.
- Maintain native document and touch scrolling. Sticky elements cannot obscure anchor targets, focused controls or results.
- Every interactive control needs a specified response. If a prototype cannot implement an interaction, clearly annotate it as a design state rather than pretending it works.
- Use one dominant action per local task. Secondary actions are quiet; avoid filled-primary plus outlined-secondary button pairs.
- Align corresponding comparison rows and actions even when copy lengths differ.
- Support keyboard, touch, zoom and narrow mobile widths. Never rely on colour alone for a warning or selected state.
- Check contrast in both themes, especially disabled fields, warnings, source text and chart labels.

Motion: the original scanner rail moves automatically while document and rupee stay still; hover/focus can reveal the existing dot effect. Reduced motion shows a static mark. Do not add a pause-logo button or crosshair cursor. Keep disclosures and state changes quiet and purposeful. No button hover lift, floating decorative cards, animated underlines or content hidden behind entrance reveals.

## Avoid

Generic SaaS landing-page sections, hero-plus-right-hand-mockup compositions, pricing tiers, fake testimonials, arbitrary financial-health scores, stock icon tiles, pill metadata everywhere, gradient headings, glows, glass panels, symmetrical shadow halos, decorative graph-paper backgrounds, novelty display fonts and oversized footer branding.

Do not invent customers, services, authentication, cloud storage, persistent financial history, OCR, reminders or financial advice. Do not add marketing atmosphere that makes a real form harder to use. The product-specific visual signature is the scanner plus a careful policy-evidence reading experience.

## Required design outputs

For each concept, produce:
- Desktop initial and populated policy-review screens at approximately 1440px viewport width.
- Mobile equivalents at approximately 390px, plus a check at 320px.
- A dark-theme populated review.
- An expanded evidence and field-confirmation state.
- A compact calculator and result state with expanded assumptions.
- Upload-processing, unsupported/scanned PDF, missing text, conflicting evidence, invalid numeric input and empty-result states.
- Component sheet covering fields, disclosures, buttons, source references, findings, warnings, navigation and theme control.
- Brief interaction annotations and a list of any proposed new tokens or unavailable assets.

Prefer complete alternatives over a collage of disconnected components. Keep all three concepts comparable using the same clearly labelled sample content.

## Final design review

Before delivering, inspect each concept against every requirement above. Fix clipped text, off-centre controls, ragged comparisons, cramped gutters, weak contrast, hidden evidence and dead controls. Verify that policy upload is the first useful action, policy reading needs no profile, and the user can identify what is known, what is uncertain and what needs confirmation.

End with one recommended concept and its reason, plus the main usability question to test for each alternative.
