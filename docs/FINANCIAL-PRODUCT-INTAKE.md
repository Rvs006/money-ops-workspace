# LoanOptimizer and insurance assistant: planning intake

Captured 2026-09-08. Draft intake for a new product decision. This file preserves two distinct ideas from the founder's brief; it does not replace the existing PM Workbench offer, persona, or validation notes. No customer validation, financial-rule verification, implementation, or privacy audit has been performed for these ideas.

## Direction update: combined product

Latest direction: `FINANCIAL-PRODUCT-REVISION.md` incorporates the workshop. The combined app now has independent loan, insurance and spare-money entry paths, with free acceptance testing before pricing. Use that revision for current scope and sequence.

On 2026-09-08 the founder explicitly chose to combine both ideas. The working direction is a private household money review: explain policy terms and loan costs, then connect confirmed commitments and user-selected liquidity constraints to a ranked action plan. See `validation-report.md` for the combined proposal, evidence, and verdict. That report supersedes the recommendation below to keep separate product tracks; the original briefs remain as scope history.

Product selection is resolved. India, initial customer, pricing, and processing architecture remain proposed assumptions. No application build is approved by this concept document.

## Earlier framing, retained for context

Choose LoanOptimizer, the insurance-document assistant, or two separate product tracks. Do not merge them into one MVP by default. Both concern personal finances, but their inputs, correctness tests, and repeat-use triggers differ.

My preference is to test one complete decision before building a broad financial assistant. The insurance concept has a concrete first artifact: a readable, evidence-linked policy summary. LoanOptimizer has a concrete decision: whether a specific balance-transfer offer is worth taking. Neither concept has demonstrated demand here.

## LoanOptimizer

### Captured intent

Help a borrower compare the real cost of loans and choose what to do with surplus money. The supplied brief names processing fees, GST, bundled insurance, flat versus reducing rates, prepayment penalties, tax slab, risk appetite, and liquidity as inputs to consider. These are requirements to investigate, not verified financial rules.

The requested capabilities are:

1. Effective Cost Engine.
2. Refinance / Balance-Transfer Analyzer.
3. Prepay vs Invest.
4. Part-Payment Optimizer: reduce tenure versus reduce EMI.
5. Debt Payoff Sequencer.

The later Surplus Allocator takes an amount such as ₹2 lakh and compares allocations across debts and investment scenarios, explaining its ranking.

### Proposed first release

An India-focused browser tool for a borrower comparing an existing amortizing loan with a specific balance-transfer offer. Geography and loan class are assumptions pending confirmation.

Start with manual input and a deterministic cost engine, followed by one refinance decision. Show the current and proposed cash-flow schedules, total outflow, fees, break-even point, remaining tenure, and assumptions. Separate lower monthly payments from lower overall cost. If a fee or relevant loan term is missing, ask for it or show a bounded scenario rather than a confident recommendation.

The effective-cost engine is a dependency of the other modules. Defer investment recommendations and multi-loan allocation until the supported financial rules and calculation tests are established. Tax treatment requires more than a tax-slab field; collect the applicable regime and eligibility facts only when that functionality is introduced and independently verified.

### Proposed acceptance checks

- Independently reviewed reference cases cover zero interest, fee-heavy offers, flat versus reducing rates, different remaining tenures, irregular dates, prepayment charges, and rounded final payments.
- Define dated cash flows, sign convention, annualization, day-count convention, financed versus upfront fees, and solver failure behavior before implementation.
- Compare the same decision horizon and explain any residual balance or terminal assumption.
- Every recommendation identifies its input assumptions and calculation version. Language generation cannot change numeric results.
- Missing critical inputs produce an incomplete result, not a fabricated saving.
- Later investment scenarios distinguish uncertain returns from contractual loan payments and preserve a user-defined liquidity reserve.
- Label rankings as best among the modeled scenarios; do not claim a globally optimal allocation without a defined objective and constraints.

### Validation questions

Can borrowers find the necessary inputs? Does the recommendation change their understanding compared with their current method? Can an independent reviewer reproduce the result? How often does the decision recur? Will users pay for a single analysis or sustained support? These remain unanswered.

## Insurance-document assistant

### Captured intent

Read a policy PDF or scan, explain it in everyday language, and show a separate summary page with downloadable PDF output. Cover benefits, exclusions, duration, gaps, and included services such as checkups or outpatient visits. Present relevant contact details when supported by the document.

The founder requires buyer privacy and no storage, display, or publication of buyer information. Proposed interpretation: personal identifiers stay masked; the buyer sees policy facts in their own session and can explicitly download a summary. This interpretation is not yet confirmed. A downloaded file remains on the buyer's device by their choice.

### Proposed first release

Start with one insurance category: English-language individual health policies, proposed because the brief names checkups and outpatient visits. Country, category, and language are unconfirmed. Accept a policy schedule together with wording and endorsements when available. Identify a proposal as a proposal; it does not establish active coverage.

Flow: choose PDF or scanned pages → check readability and missing documents → extract supported policy facts → show summary → inspect the supporting excerpt → download a masked summary → clear the session.

The useful result is a buyer finding an included service, its limits, and the exact clause supporting it. The summary must also say when an answer is absent, unreadable, or conditional.

### Summary contract

| Section | Required information |
| --- | --- |
| Document status | Proposal or issued policy, document types supplied, missing material, extraction limitations |
| Coverage | Benefit, limit, conditions, applicable period, supporting page and excerpt |
| Exclusions | Explicit exclusion and evidence; distinguish exclusion from information not found |
| Waiting periods and costs | Waiting period, deductible, copayment, sublimits, and applicable conditions when stated |
| Included services | Service, eligibility, frequency, booking instructions and source-supported contact details |
| Questions to resolve | Contradictions, missing endorsements, unclear terms, and questions for the insurer |
| Export | Masked summary with citations and limitations, without personal identifiers in filename or metadata |

### Privacy requirements to prove

No accounts, policy archive, public links, session replay, document-content analytics, or document-content logs in the proposed MVP. Use synthetic documents in prototypes. Do not upload real policies to an external model or OCR service until the permitted processing model is explicit and the provider's actual retention behavior is checked.

Device-only processing is a candidate, subject to an OCR and summarization feasibility test on representative devices. Temporary remote processing is a separate decision requiring agreement; it must not be silently presented as equivalent to device-only processing. A promise of no database does not establish privacy.

Inspect network payloads, browser storage, caches, error reports, server logs, temporary files, model/OCR-provider retention, and generated PDF metadata. Clear application references on session reset and revoke object URLs; do not claim forensic memory erasure from browser behavior. Downloads are an explicit exception to session-only output.

### Proposed acceptance checks

- Every affirmative coverage, exclusion, period, amount, and service statement has a supporting excerpt and page reference.
- Extraction failure and absent wording produce a visible limitation; absence is never interpreted as proof of coverage or exclusion.
- Contacts come from the supplied source with provenance. Unverified or absent contacts are labeled accordingly; no invented phone numbers.
- Blurred scans, rotated pages, tables, missing pages, conflicting endorsements, and protected PDFs have actionable states.
- Embedded document instructions cannot redirect the system or trigger external actions.
- A human-reviewed synthetic/de-identified evaluation set checks factual accuracy, critical omissions, unsupported statements, and source alignment. Define release thresholds before beta; any critical coverage error blocks that release until resolved.
- Users can find a benefit, explain its restriction, open its source, export, and clear the session in observed tests.
- The PDF preserves citations, wraps long content, and excludes personal identifiers from visible content and metadata.

### Scope deferred

Policy purchase, insurer ranking, claims eligibility guarantees, automatic claims submission, personalized medical advice, saved policy history, and support for every insurance type. A summary cannot establish that a claim will be paid.

## Product Planner intake still needed

Known: two concepts, their main capabilities, privacy intent for insurance, and Codex as the current planning tool. Unknown: selected product, founder expertise relevant to it, initial geography and audience, platform choice, business model, budget, deadline, and approved processing architecture.

Do not invent these answers as founder commitments. `docs/VISION.md` has not been created or validated. Use the Product Planner intake after selecting a track, pre-filling the information captured here. ProductOS canonical filenames take precedence over generating a competing lowercase PRD or second roadmap.

## Evidence boundary

This is product scoping, not financial, medical, legal, or regulatory guidance. No market-size, competitor, pricing, savings, or compliance claims were researched or established. Financial rules and external service capabilities must be checked against current primary sources when the product and geography are selected.
