# Personal finance app: acceptance-first revision

Revised 2026-09-08 after the startup ideas workshop. Proposed working description, not a final brand. This document supersedes the mandatory combined intake and immediate paid-test sequence in the earlier financial-product notes. It preserves the combined product vision and does not replace the existing PM Workbench ProductOS offer.

## Revised idea

A private personal-finance app that helps people understand their loans, understand their insurance, and compare what to do with spare money. Each area works independently. When a user chooses to connect the information, the app provides a combined decision view with visible reasons, calculations, and policy evidence.

Lead with the user's current question. Someone with a loan question should receive a useful loan result without supplying insurance documents. Someone reviewing a health policy should receive its explanation without entering debts. Combining both should earn the additional effort.

The earlier Household Money Review can become the combined result within the app. It should not be the compulsory entry experience or the only way to understand the product.

## Evidence and CE position

**Observed:** the pasted September 8 transcript, lines 775–783, records acceptance-first discussion, concern about limiting exploration to one loan, and removing or deferring landing-page pricing. Speaker segmentation is imperfect, so these are group direction signals rather than an exclusively Ritesh-authored specification. Granola's retrieved summary also records a waitlist, an offer from Ritesh to seed 8–10 users, a 100-user aspiration, and a requested short PRD. Recruitment offers and targets are not completed validation.

**Verified project context:** there is no app or `docs/DESIGN.md`; the existing financial validation report is desk research with no observed users or payments. The existing ProductOS offer/persona describe PM Workbench. No financial-product production capability is implied by these notes.

**Position:** keep the combined app, make the three entry paths independently useful, and test free acceptance first. This is a reversible Tier-1 concept decision. The strength is lower entry friction and clearer evidence about which problem attracts users. The tradeoff is that a free test cannot establish willingness to pay or sustainable acquisition cost. No new external market claim is needed to justify this revision.

**Recommendation:** distinguish the whole-product demonstration from the first supported implementation. Let people explore every proposed capability using clearly labeled worked examples; ship actual calculations only for verified supported cases. Never disguise an example as analysis of the user's own data.

## What changes

| Earlier proposal | Revised proposal |
| --- | --- |
| One paid household review as the entry offer | Free discovery and separate loan, insurance, and surplus entry paths |
| Loan and insurance information requested together | Progressive input: request only what the current question needs |
| ₹499 purchase as an early success gate | Completion, understanding, usefulness and voluntary next steps first |
| One-loan restriction defines the product | Multiple loans remain in the vision; validation samples show the wider concept |
| Combined use assumed to be valuable | Measure whether users voluntarily connect modules and benefit from doing so |

The ₹499 figure remains a historical pricing hypothesis. It is not an approved price, landing-page claim, current paywall, or acceptance-test requirement. Free-first does not mean permanently free.

## Proposed screens and interactions

| Screen | What appears | What the person can do | What this tests |
| --- | --- | --- | --- |
| Discovery page | Plain explanation and three questions: manage loans, understand a policy, allocate spare money | Explore a complete sample; optionally request a pilot invitation | Which problem brings people in |
| Start workspace | The selected question and relevant sample or personal-input route | Continue without signup; switch paths without losing the current in-memory session | Whether the flow is understandable |
| Loans | Loan rows with balance, EMI, rate basis, remaining term, fees, and missing-input notices | Add supported loans; compare part-payment, refinance or payoff scenarios where implemented | Whether comparison helps beyond an EMI number |
| Insurance | Document-type/readability check, editable extracted facts, then coverage, exclusions, waiting periods and services | Open source passages, inspect conditions, download masked summary | Whether users understand and trust the explanation |
| Spare money | Amount available, already-funded commitments, user-selected reserve and feasible scenarios | Adjust assumptions and compare modeled choices | Whether connecting policy commitments and loans adds value |
| Result and feedback | Preferred modeled option, alternatives, evidence, uncertainties and next questions | Export, correct an input, explain usefulness, or clear session | Understanding and a concrete next step |

Navigation in the future app can use Start, Loans, Insurance, and Spare money. On a phone, each path should be a focused flow, with loan detail and policy evidence opening as full pages rather than compressed side panels. On desktop, a selected calculation or policy excerpt can sit beside the result. These are proposed interaction structures, not approved design tokens.

The interface should resemble a calm working tool. Use actual loan rows, readable policy passages and side-by-side scenario differences. Avoid an unexplained financial-health score, decorative dashboards, fake balances, claims of savings without calculations, or an AI chat box as the only route through the product.

## A concrete walkthrough

Synthetic example: a user chooses Spare money and enters ₹2,00,000. The user confirms that it is not already net of a ₹30,000 unfunded upcoming premium, then chooses a ₹70,000 reserve top-up. That leaves ₹1,00,000 for supported loan scenarios. Show the subtraction and avoid deducting money already reserved elsewhere.

If insurance is not provided, the loan comparison still works with explicit user-entered commitments. The result states that policy terms have not been checked; it does not interpret missing information as no insurance or no premium obligation. A waiting period or exclusion never automatically becomes an invented cash reserve.

For someone starting with Insurance, the useful outcome can simply be understanding an included annual checkup and its conditions. Connecting loans remains optional. The app should not force an allocation recommendation onto a policy explanation.

## Scope: visible vision versus supported beta

- **Discovery stage:** working sample explorations of the three paths; show loan scenarios with verified demonstration calculations and policy explanations from synthetic material. A waitlist is optional and clearly separate from financial data.
- **First supported beta:** manual input for explicitly supported loan types and one supported health-policy category; editable fact confirmation, a tested calculation engine, source-linked summary, export and session reset. Device-only document processing must pass feasibility and privacy checks before personal uploads are enabled.
- **Later capabilities:** broaden loan types and policy formats; add verified refinancing, multi-loan payoff sequencing, tenure/EMI optimization and investment scenarios. Each unsupported capability is labeled as an example or planned feature, with no inactive control masquerading as a working tool.

LoanOptimizer's five requested capabilities and the eventual Surplus Allocator remain in the vision. Ritesh's request to explore the breadth does not prove that every engine should be built before the first feedback session.

## Privacy and business boundaries

Keep personal identifiers masked and personal financial documents out of servers, analytics, recordings and logs under the existing requirement. Prototype with synthetic information. Do not add Aadhaar/PAN linking, bank access, automatic reminders, saved profiles or cloud retention based on meeting speculation.

A waitlist necessarily stores contact information. Offer it only as a separate opt-in with a defined purpose, retention period and deletion route; if the original no-storage requirement extends to contact information, omit the waitlist and use user-initiated pilot participation instead. A person must be able to explore without joining it.

Family/dependent use needs authority and privacy boundaries before real document handling. No public sharing, no arbitrary third-party document upload, and no inferred authority merely because someone is a relative. User-requested local exports remain an explicit save operation.

Affiliate/DSA income, financial-product distribution, credit-score access and data monetization mentioned in the meeting are future ideas, not accepted requirements. In particular, a data-monetization path conflicts with the current privacy promise. Personal investment advice and financial execution remain outside the first acceptance test.

## Revised validation sequence

Recruit the offered 8–10 users, screen for an actual loan or insurance question, and include people outside the immediate team. This is a starting convenience sample, not evidence representative of all Indian households.

1. On the discovery page, record which question users choose and what they expected it to solve.
2. In the sample, observe whether they reach a result and correctly explain one material condition or calculation. Synthetic sessions test understanding, not actual financial outcomes.
3. After one useful result, make the other paths available and observe voluntary exploration. Do not require both modules to count a single-module success.
4. Ask what they would do next, what is missing and whether the combined view adds anything. Use user feedback to choose the next implementation slice.
5. Test price only after a useful experience and a separately agreed pricing experiment. Do not treat interest in free use as willingness to pay.

Proposed initial learning gates: at least 7 of 10 complete one flow and explain its main result correctly; at least 5 identify a concrete useful next step; inspect every observed misunderstanding. Track combined-path selection separately, without setting a threshold that forces a preference for the combined experience. Any critical calculation or coverage error blocks exposing that result again until corrected.

With no financial-data retention, conduct observation without recordings or document capture, and use explicitly agreed anonymous aggregate tallies. Do not add analytics or follow-up contact capture silently. A future target of 100 active users needs a definition: reaching and understanding a relevant result is stronger than merely joining a waitlist.

## Next steps

First, review this concept with the group and produce its requested short PRD. Define the supported sample behaviors and feedback questions, then create the design system before implementing a landing page or prototype. Run the 8–10-user acceptance test; use the results to choose the next real capability and revisit pricing afterward. This revision does not convert the earlier Weak business verdict into a Strong one.
