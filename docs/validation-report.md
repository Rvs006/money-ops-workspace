# Validation Report: private household money review

Generated: 2026-09-08

Direction update, 2026-09-08: the subsequent workshop and founder request revise the experiment to free acceptance testing with independent loan, insurance and spare-money entry paths. See `FINANCIAL-PRODUCT-REVISION.md`. The paid-report assumption and payment gates below are retained as the original desk-validation record, not the current first-test instructions. The Weak verdict remains: the meeting adds direction and a recruitment offer, not observed customer demand.

## Verdict

**Weak**

The combined concept has a coherent decision to serve, but there is insufficient evidence that users will complete both workflows and pay for the result. Test a private, document-backed review of one surplus decision before building the full financial platform; proceed to detailed planning only if the combined view adds demonstrable value beyond a loan tool and insurance summary used separately.

This is desk validation, not demonstrated product-market fit. No interviews, pilots, payments, or measured accuracy results were collected. Scores below express evidence strength and judgment, not statistical probabilities.

## Proposal produced by CE, before validation

**Position:** combine the ideas around one household money decision. Working descriptor: **Household Money Review**. This is not a checked brand or trademark.

**One-line offer:** Understand your loans and insurance, then see what your available cash can do after upcoming commitments and your chosen liquidity reserve are accounted for.

**Proposed early customer:** an Indian salaried household with an active loan and health insurance, facing a bonus, proposed part-payment, refinance offer, or upcoming policy renewal. Start recruiting around a surplus decision in the next 30 days. Geography, customer segment, English-language scope, and a one-off paid report are working assumptions, not founder-confirmed choices.

**Why combine:** policy premiums are cash commitments; exclusions, deductibles, and waiting periods can reveal questions that matter before a household commits liquid money to debt. The app can put these facts beside the loan comparison. It cannot infer a precise emergency reserve from a policy alone or treat insurance as equivalent to cash.

**Strength:** one supported action plan can connect information the user currently considers separately. **Risk:** collecting both sets of documents creates friction, and broad financial planning is already offered elsewhere.

**Project grounding:** `FINANCIAL-PRODUCT-INTAKE.md` captures both original concepts and the no-storage requirement; `FINANCIAL-PRODUCT-NEXT-STEPS.md` records no application or design system. The inspected ProductOS offer remains for PM Workbench. No prior `product-idea.md`, `validation-report.md`, or `docs/solutions/` existed at intake. This work updates planning notes without replacing the PM Workbench offer.

**External grounding:** borrower self-reports E7/E8 show that debt and liquidity choices coexist. E1 shows an established combined-planning substitute, and E6 shows that basic insurance summaries already have a standardized alternative. None proves demand for this product.

**Conditions:** factual policy evidence, reproducible calculations, explicit unknowns, and a privacy model that actually meets the founder's requirement. No implementation architecture, financial-rule set, or regulatory permission has been approved.

**Decision scope:** Tier 1, reversible concept exploration. Deployment handling financial and insurance documents would require a separate, higher-stakes review. CE formed the proposal in the main context with a separate evidence-gathering subagent. Idea Validator was then applied in the main context; this is sequential critique, not independent-model corroboration.

### The complete product shape

| Capability | Role in the combined product | Sequence |
| --- | --- | --- |
| Insurance reader | PDF/scan explanation of benefits, exclusions, periods, gaps, services, and source-supported contacts; separate summary and masked PDF export | One policy category in first test; broad OCR and categories later |
| Effective Cost Engine | Normalize dated cash flows, fees, financed insurance and other applicable charges; retain provenance | Foundation for loan comparisons |
| Part-Payment Optimizer | Compare tenure reduction and EMI reduction against the same baseline | First supported loan decision |
| Refinance Analyzer | Compare existing versus proposed loan, fees, residual balances and break-even horizon | After the core engine is verified |
| Debt Payoff Sequencer | Compare supported debts and feasible repayment orders | After single-loan validation |
| Prepay vs Invest | Explicit return scenarios, tax assumptions, risk and liquidity tradeoffs | Later, following rule and advice-boundary review |
| Surplus Allocator | Rank feasible allocations after confirmed commitments and user-selected reserve constraints | Start bounded; extend only with tested calculations |

All original capabilities remain in the product vision. The first experiment tests the connection between insurance and debt without implementing every module.

### One user flow

1. Enter the decision and available amount, for example a ₹2 lakh bonus. Define whether this amount is already net of bills and reserves.
2. Provide loan facts and relevant policy documents, or use a synthetic example. Confirm extracted amounts, dates and source passages.
3. Review commitments not already funded, policy limitations, missing facts, and a user-selected liquidity reserve.
4. Compare feasible part-payment scenarios. Show the preferred modeled option, alternatives, assumptions, and evidence. An unresolved material input can result in a request for clarification rather than an allocation.
5. Open the policy summary or calculation details, download a masked PDF if desired, and clear the session.

Illustration only: if ₹2,00,000 is not net of commitments, ₹30,000 of a confirmed upcoming premium remains unfunded, and the user chooses a ₹70,000 reserve top-up, ₹1,00,000 remains for modeled debt scenarios. These are invented demonstration inputs, not recommended amounts. Count each commitment once. A premium already funded elsewhere must not be deducted again.

Coverage findings stay distinct from cash calculations: a waiting period generates a limitation and a question; it does not generate an invented rupee amount. A health-check benefit may be useful to explain without changing the debt allocation.

### Privacy interpretation and limits

The founder's no-storage requirement remains binding. Proposed test uses synthetic documents or user-operated, local review of masked facts, with no collection or recording of personal documents. No session replay, policy-content logging, public report links, or cloud uploads. Retaining research notes, contact information, or payment records would require a separate explicit research/payment arrangement and must not be described as zero storage.

Production feasibility is unresolved: device-only parsing, OCR, summarization, caching behavior and export privacy must be tested. Temporary cloud processing is not an assumed exception. A user-requested PDF download is a deliberate local save; that exception and the interpretation of masked policy display need confirmation before implementation. The app cannot promise automatic monthly monitoring while retaining nothing; early repeat use requires re-entry or re-import. Do not assume encrypted storage is permitted either.

## Scorecard

| Area | Score | Read |
| --- | ---: | --- |
| Pain intensity | 4/5 | E7/E8 contain concrete surplus and liquidity dilemmas; anecdotes establish existence, not prevalence. |
| Buyer clarity | 2/5 | A recruitable situation is proposed, but no founder-accessible customer or channel has been confirmed. |
| Urgency | 3/5 | A bonus or renewal creates a deadline; monthly recurrence is unproven. |
| Differentiation | 2/5 | E1 spans loans and insurance; E2/E3 offer insurance guidance and E5 provides cited PDF answers. |
| Speed to validate | 4/5 | A two-week manual comparison can test usefulness; trustworthy full automation cannot be assumed on that schedule. |
| Founder advantage | 1/5 | No relevant customer access, domain-review capacity, proprietary data, or distribution advantage is established here. This scores missing evidence, not ability. |

## Core Assumption

Households facing a surplus decision will complete a private review of both loan and insurance facts and pay for its combined action report because it improves their decision beyond the tools or advisers they already use.

## Fatal Flaws

| Risk | Severity | Why it matters | Fast test |
| --- | --- | --- | --- |
| Combined review adds effort without changing the decision | High | Insurance explanation may be useful yet unrelated to the immediate loan question, while E1 already offers a broader plan. | Compare the same household scenario with and without policy-linked commitments; measure comprehension, relevant action changes, completion time and preference. |
| Trust and privacy requirements exceed delivery capability | High | A mistaken exclusion or loan cash flow can contaminate the action plan, and the founder rules out storing buyer information. | Two domain reviewers check synthetic cases, followed by a local-processing feasibility test; stop on a critical error or unapproved data transfer. |
| No demonstrated route to paying users against free guidance | High | No reachable early-adopter group is established, and E1/E2/E3 create a strong free-entry comparison. | Manually recruit ten eligible users and test a concrete one-off price after use; measure paid follow-through rather than compliments. |

## Problem Reality

- **Pain:** borrowers report difficulty choosing between debt reduction and keeping cash available. E7 describes insurance ownership alongside no emergency fund; E8 asks how to divide a ₹2 lakh bonus. Frequency, monetary harm and willingness to pay are unknown.
- **Early adopter:** proposed household member who handles repayments and policy renewal, has documents at hand, and must decide what to do with surplus within 30 days. The founder has not yet identified a named accessible person or confirmed community access.
- **Vitamin or painkiller:** a broad monthly review is currently a vitamin hypothesis. It becomes a candidate painkiller when it resolves one imminent decision with evidence the user can verify.

## Competition

- **Current behavior:** ask the lender, insurer, adviser or community; use a calculator and policy summary; maintain a spreadsheet; postpone the decision. E7/E8 show community advice-seeking, but the other behaviors require interview confirmation.
- **Real enemy:** the effort and trust cost of introducing a new tool when free guidance and existing relationships are available. E1 already joins the categories, so category breadth is not a defensible claim.
- **Differentiation needed:** a document-backed, reproducible decision that connects confirmed policy commitments to debt scenarios and meets a tested privacy promise. Benchmark against separate summaries/calculators and an existing adviser. No moat is demonstrated.

### Evidence register

Sources checked 2026-09-08. Vendor statements indicate advertised features, not measured accuracy, market leadership, or audited outcomes. The competitor search is bounded and not exhaustive.

| ID | Source and observed evidence | Meaning and limit |
| --- | --- | --- |
| E1 | [1 Finance](https://1finance.co.in/), [insurance planning](https://1finance.co.in/insurance-planning), [prepayment calculator](https://1finance.co.in/calculator/loan-prepayment): combined financial planning includes loans and insurance. Homepage offers a free first plan/consultation and advertises ₹10,000/year plus GST priority membership. | Direct overlap in the combined outcome. Automated private document-to-allocation behavior was not established. Price is a vendor observation, not proof our customer will pay. |
| E2 | [Ditto](https://joinditto.in/): plain-language insurance guidance, policy comparison and personalized recommendations; free consultation advertised. | Insurance clarity and an explanation already have substitutes. Arbitrary private PDF ingestion was not established. |
| E3 | [Beshak](https://www.beshak.org/lp/make-right-insurance-decisions/): personalized insurance recommendation report, expert explanation and free consultation advertised. | Competes with an explanatory report; no hands-on comparison was performed. |
| E4 | [EMICalculator.net](https://emicalculator.net/home-loan-emi-calculator/): home-loan inputs include insurance, fees and prepayment schedules, with amortization output. | Fee inclusion alone is insufficient differentiation; policy interpretation is a different capability. |
| E5 | [Adobe Acrobat AI Assistant](https://helpx.adobe.com/acrobat/desktop/use-acrobat-ai/ai-assistant-plus-acrobat.html), [cited answers](https://helpx.adobe.com/acrobat/using/get-ai-generated-answers.html): document summaries, questions and source citations. | General document Q&A is a substitute. India pricing and insurance-specific completeness were not verified. No-training claims do not establish zero retention. |
| E6 | [IRDAI Health Department](https://irdai.gov.in/health-dept): Customer Information Sheet describes benefits, exclusions, sublimits, deductibles, waiting periods and service/grievance information. | Basic policy explanation already has a standardized starting point. Search-index text was available; direct open failed. No numerical regulatory limits are adopted from this page. |
| E7 | [Borrower discussion: loans and emergency funds](https://www.reddit.com/r/personalfinanceindia/comments/1uezaut/advice_needed_on_managing_loan_and_building/): author describes health/life insurance, substantial prepayments and no emergency fund. | One unverified self-report supporting the intersection of debt and liquidity, not paid demand or financial advice. Search and page dates conflicted, so no exact posting date is asserted. |
| E8 | [Borrower discussion: ₹2 lakh bonus](https://www.reddit.com/r/personalfinanceindia/comments/1mb8oa8/need_help_deciding_loan_prepayment/): author compares car-loan closure, home-loan prepayment, split allocation and emergency cash. | Another unverified self-report. Comments contain competing advice that has not been checked and is not endorsed. |
| E9 | [RBI KFS circular, issuer-authored PDF hosted by FIDC](https://www.fidcindia.org.in/wp-content/uploads/2019/06/RBI-KFS-FOR-LOANS-15-04-24.pdf), dated 15 April 2024. | A standardized loan-disclosure baseline exists. Current applicability and amendments need verification before encoding rules; this report does not assert lenders universally hide costs. |

## First 10 Customers

1. **Reach a relevant network:** founder asks professional or alumni contacts for introductions to households with an imminent surplus decision and both a loan and health policy. Target five qualifying conversations, with no documents requested. First message asks about their last decision, not a sale. Existing access is unconfirmed.
2. **Reach beyond friends:** seek permission for a research invitation in a local resident or personal-finance community, or introductions through a qualified adviser. Recruit five additional eligible participants; at least five of the ten must be outside close friends/family. Do not scrape, mass-message, or treat public posters as leads already acquired.
3. **Run and follow up manually:** invite ten eligible participants to the comparison session, then make a clear optional offer for a one-off reviewed report. Success means completed use, a concrete next step and, where a compliant payment route is available, actual purchases. No outreach or payment collection is authorized or executed by this report.

Sample conversation invitation: “I’m researching how households decide what to do with a bonus while managing loans and insurance. Could we spend 20 minutes discussing your last decision? You don’t need to share documents or account details.”

## MVP

- **Build:** one local/synthetic scenario flow with one supported amortizing loan and one health policy, confirmed premium commitments, user-selected reserve, part-payment comparison, cited policy summary, and a masked downloadable action report. A qualified reviewer checks the calculation and policy interpretation. Manual assistance must be disclosed and must not expose private documents to researchers.
- **Cut:** broad insurance support, bank integrations, automatic money movement, insurer/product sales, investment picks, tax optimization, subscription billing, saved profiles, monthly reminders, arbitrary OCR, full refinance automation and general multi-loan optimization. Preserve them as later vision items where appropriate.
- **2-week test:** recruit ten eligible external users, compare a debt-only result with the combined view, and test a proposed ₹499 one-off report. Price is an experiment, not a market-derived recommendation or approved charge. Use a real payment offer only after qualified delivery, applicable advice/payment obligations and separate records handling are established. If payment cannot be tested, report willingness-to-pay as unresolved.

### Test schedule and decision rules

Days 1–2: confirm recruitment access and domain reviewers; prepare ten synthetic cases, including cases where insurance changes nothing. Independent loan and insurance checks must identify zero critical errors before user exposure. Define a critical error as an unsupported coverage conclusion, wrong material amount, double-counted commitment, or infeasible allocation.

Days 3–5: hold ten short discovery conversations. Record aggregate, non-identifying tallies only under the agreed research arrangement. No documents, recordings, account details or financial amounts need be retained.

Days 6–10: run ten comparison sessions. Alternate which result appears first to reduce order effects. Evaluate each participant on finding a restriction, explaining the available amount and identifying a supported next step. Personalized manual facts stay with the user; if local privacy is not proven, use synthetic cases and explicitly limit conclusions to comprehension and interaction.

Days 11–14: follow up on chosen next steps and the optional report offer. Do not encourage a financial transaction simply to create an activation metric: a lender clarification or corrected interpretation can be a useful action. Payments, if tested, require an explicit separate records arrangement; contact/recontact cannot be silently stored under a zero-storage promise.

Proposed pass criteria, fixed before sessions:

- At least 7/10 complete the combined review and correctly explain one material policy condition plus the cash calculation.
- At least 5/10 identify a relevant, independently supported next step that the debt-only view did not expose. Count cases where no change is needed as correct results, but not evidence of incremental value.
- At least 3/10 buy the proposed one-off report through an approved route. Expressed interest does not satisfy this threshold.
- Zero critical errors across the reviewed cases and sessions; no unapproved transmission or retention of personal data.

These are directional discovery gates, not statistical validation. Failure to recruit ten is itself evidence about distribution. Synthetic-only sessions cannot satisfy the paid-demand or real-decision-value claims, even if usability scores pass.

If people value both modules but the combined result adds little, keep the combined product vision and test optional entry paths before making a combined intake mandatory. If the value is strong but payment fails, investigate free distribution or a different payer only with evidence; do not assume subscriptions solve it. If only one module earns repeat use, return to the founder with that evidence before changing the combined direction.

## Five discovery questions

1. Tell me about the last time you had spare money and a loan balance. What did you do, and what information did you use?
2. When did you last open your insurance documents? What were you trying to find, and how did you get the answer?
3. Did a premium, coverage condition or cash shortfall affect that debt decision? Walk me through what happened.
4. What did you pay for help, if anything? What did that service deliver?
5. Which document details would you refuse to enter into a tool, and what would you need to see before using it again?

## Edits Applied to product-idea.md

No `product-idea.md` edits or creation: verdict was Weak, following Idea Validator's contract. The combined proposal is preserved in this report and the earlier intake notes now record the founder's combine instruction. Existing PM Workbench ProductOS documents remain unchanged.

## Next Step

Run the ten-user comparison test, then re-run Idea Validator with observed completion, incremental value, privacy findings and payment evidence before generating the combined ProductOS offer and build-ready PRD.
