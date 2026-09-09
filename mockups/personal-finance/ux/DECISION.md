# Entry-flow exploration

Status: awaiting user choice. No winner selected or promoted.

Review URLs: http://127.0.0.1:4318/ux.html?v=2 and Agent-Native plan-e6289e388e894e47. Native exported MDX lives in native/. The local comparison preserves the old page at / and uses the same authored screen content in prototype.mdx.

Verified: all three variants render; loan assumption disclosure and both repayment results; policy source navigation; funded/unfunded premium branches; reset by returning to the question; keyboard variant switching and selection after reload. Local browser console had no errors. Agent-Native local-files viewer successfully navigated from Guided through the premium question to its result. Screenshots reviewed for all three variants. Readability, tap sizes, focus, number alignment and always-visible content checked against the user design rules. Original baseline shortcomings remain intentionally visible. No user preference or usability-test success is claimed.

- Current: unchanged baseline in an iframe. Lowest change cost; asks users to interpret a feature list.
- Guided: asks the immediate question, then one relevant choice, then a reasoned result. More steps.
- Overview: opens a populated household picture and offers a useful result immediately. Requires a user's information to be available in the real app.

Shared loan sample: balance 120000, monthly rate .01, 12 remaining payments, immediate 20000 prepayment, no fees or taxes. Unrounded EMI 10661.854641400992. Keeping EMI: 10 payments, future interest 5534.169614261625. Keeping term: EMI 8884.87886783416, future interest 6618.546414009936. Interest saving from keeping EMI vs no prepayment: 2408.086082550292.

All values and policy wording are synthetic. The new directions intentionally use clickable scenario choices rather than personal input. No claim of real-document analysis, exports, storage, investments or optimal allocation.

Review styling uses the existing mockup palette and system type. It is not an approved production design system. The picker uses plain controls under the user's anti-glass instruction, overriding PICKER.md decoration. Keyboard switching, current state, URL persistence and remount behavior are retained. The unchanged iframe baseline takes keyboard focus separately.
