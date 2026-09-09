# Prototype review, 9 September 2026

Scope: an isolated policy-reading exploration. Production integration and the chosen/rejected decision remain pending.

## Evidence

- Existing loan and policy tests: `npm test` passed in finance-native.
- Isolated export: `expo export --platform web --output-dir dist` passed (430 modules).
- Browser: Inline sample conversion and expanded waiting-period evidence worked. Sheet opened with all four waiting-period matches, with paragraph references. Next, Back, Close, Escape and keyboard focus wrap worked. Escape restored the topic opener.
- Complete: every topic selector worked; reading acknowledgement replaced the evidence, received focus, and reset on Next topic. Missing matches offered no reading acknowledgement.
- Picker: keys 1/2/3 and R, selection query updates and variant switching worked.
- Motion controls: duration changed from 220 to 300 ms, Copy config reported success, and 220 ms at 0.25x produced an 880 ms CSS duration.
- Layout inspected at 390 × 844 and 1280 × 900. No horizontal page overflow at phone width. Long sheet headings and Close fit; long evidence has its own scroll region. Desktop sheet capped at the existing 680 px reading token.
- Reduced-motion fallbacks were inspected in CSS. OS-level reduced-motion emulation was not run.
- Baseline PDF export showed its error state under Metro development serving. In the exported build at port 4322, the sample converted and the PDF action completed without an error state or console error. The exported build is the handoff preview; the development-only export issue remains a limitation.
- The browser's download-event observer timed out for the PDF action. Actual saved-file delivery is therefore unverified, even though the exported UI returned without an error. Do not report end-to-end PDF download as passed.

## Design-law re-check

The supplied law was walked through against this scope. The matching project design specification governs the native workspace, including its system font and white/green surfaces. This is a functional document-reading prototype, not a promotional homepage.

| Applicable rule family | Result |
| --- | --- |
| Type choices, house mono, uppercase metadata, display wrapping and cramped tracking | Existing system typography and tokens retained. No new display face, mono styling, ornamental quote marks or tracked metadata. Long mobile heading fits two lines. |
| Palette, gradients, candy washes, cool charcoal, beige and UI-kit grey defaults | Existing ink, white, green and wash tokens retained. No new brand palette or gradient. |
| Glows, shadows, fake shadow boxes, blur and glass | None in the new product surfaces. The isolated picker uses the explicitly requested skill's fixed chrome, including its prescribed glass and shadow. |
| Badges, icon tiles, invented marks and decorative lines | No metadata pills, social proof, purchased-brand claims, accent rails or invented customer logos. Existing app logo reused. |
| Default hero, split panel, kicker/H2, feature cards, pricing, testimonials, FAQ, CTA slab and footer sequence | Not introduced. Each variant is one policy-reading interaction. |
| Invisible entrance content and motion fallback | Completion text is visible by default. Motion transforms already-rendered content; reduced motion disables the animation. No opacity-zero reveal dependency. |
| Hover boop, card lift, animated underline, floating tags and looping ornaments | Not added to product controls. Picker press feedback is confined to the skill's prescribed harness. |
| Clipped content, overlap seams and gutters | Mobile Close fits beside the long heading; evidence scrolls inside bounded height. Desktop reading width corrected. Picker/controls collision corrected; no decorative cuts introduced. |
| Centering and alignment | Sheet centered at desktop reading width. Topic roles align consistently and action rows retain the touch-height token. |
| Dead controls and fake states | Source topics, missing evidence, acknowledgement, navigation, replay and tuning exercised. No signature feature or coverage-confirmation claim. |
| Cohesion and reference specificity | Exact Nick Pyl resource documented. The action-to-confirmation idea is adapted to the existing policy reader; the source video's imagery, contract copy and styling were not copied. |
| Copy and humanizer | Short functional copy; fictional data labelled. No invented testimonials, metrics, user research or claims of real insurance analysis. |

## Fixes made during review

Removed duplicate baseline heading; exposed every matching passage; added missing-evidence fixtures; disabled acknowledgement when no passage exists; corrected quarter-speed timing; reset acknowledgements on topic changes; restored sheet focus; focused completion status; made Close persistent; bounded scrolling; fixed mobile harness collision; bounded desktop reading width; added copy feedback and picker resize handling; validated variant query values.

## Limits

The two new directions use in-memory fictional text. They do not process user documents, export a new guide, persist reading progress or sign anything. Inline imports the original reader unchanged. A direction still needs to be selected and integrated, then validated with real document flows before release. A local runtime startup error during file rewrites was resolved before the interaction checks.
