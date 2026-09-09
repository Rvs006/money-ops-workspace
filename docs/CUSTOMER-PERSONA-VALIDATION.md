# PM Workbench: customer persona validation brief

Prepared 8 September 2026 for the six-person buildathon team. This completes Customer Persona drafting only. Zero interviews, observed sessions or purchases were collected. The 100 external users and five PM/founder feedback conversations remain goals within the existing event window ending 16 September.

Canonical persona: [Customer Persona](../productos/define/2.%20Customer%20Persona.md). Source of intent: [Product Offer](../productos/define/1.%20Product%20Offer.md) and [offer notes](OFFER-VALIDATION-NOTES.md). [U] means user-provided direction, [E] external evidence, [I] inference and [A] assumption to test. Recommendations below are proposed tests, not measured findings.

## Initial customer decision

Recommend a PM from a non-engineering background who owns a customer-facing SaaS requirement, has an engineering review within seven days, and needs to resolve or explain an unfamiliar API behavior. [U, I, A]

This is the strongest starting hypothesis among the supplied audiences because it combines an observable deadline, an existing artifact and a reviewer who can assess usefulness. It is not a proven best segment. Recruit around 1-5 PM years and 20-200 staff initially, but include a boundary case to test whether the job matters more than those ranges. Background is context, never a competence score. [I]

Prefer candidates with a recent checkout, billing or comparable retry question for the first test. A PM with an unrelated API requirement may inform research, but a checkout simulation alone does not validate usefulness on their system. Aspiring PMs have a weaker workplace outcome to observe; founders qualify when they actually own this job; specialist PMs may already know the supported concept. [I]

My recommendation is to sell preparation for a real review before selling a learning habit. The practice step has to earn the time it consumes.

## Evidence register

All URLs checked 8 September 2026. Eight pages provide the following ten directional data points. Counts of posts, claims or features are not counts of customers. No prevalence, market size or willingness to pay follows from them.

| Finding and source | Type and limit | Decision implication |
| --- | --- | --- |
| The [applied-learning author](https://www.reddit.com/r/ProductManagement/comments/1qwt1nl/advice_for_understanding_tech_as_a_nontechnical_pm/) describes product ops, a marketing background and eight months in role. | E: public self-report, adjacent role. | Do not present this as evidence for a 1-5-year SaaS PM segment. |
| The same author says, “I can't make it feel applied or see the bigger picture.” | E: anecdote, no observed behavior or purchase. | Investigate connection between an explanation and an actual decision. |
| Replies in that discussion describe using engineer explanations tied to their product, and using AI; one disputes the need for deep technical knowledge. | E: conflicting anecdotes, selection bias. | Engineers and existing AI are serious alternatives; test sufficient depth rather than teaching engineering broadly. |
| A [second author](https://www.reddit.com/r/ProductManagement/comments/1j3ghbk/technical_learnings_for_nontechnical_pm/) reports three PM years, 18 domain years and interest in APIs, integrations and courses. | E: one self-report, no buying evidence. | Domain experience and technical familiarity are separate; course interest does not establish workplace-tool demand. |
| [Atlassian’s PRD guidance](https://www.atlassian.com/agile/product-management/requirements) includes assumptions and revisiting them. | E: prescriptive vendor guidance. | An explicit assumptions review fits a recognizable requirements artifact. |
| [ChatPRD](https://www.chatprd.ai/pricing) advertises saved project knowledge, document generation and export. | E: provider claim; no product test here. | Saved context and better writing alone are weak differentiation. |
| That pricing page displays Pro $15/month equivalent, billed $179/year; free has three limited chats. | E: displayed annual-billing price. | Compare the full sample experience and added value; do not call $15 a cancellable monthly plan. |
| [OpenAI](https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus) lists ChatGPT Plus at $20/month. | E: provider price; participant spend unknown. | Existing paid access may make an additional tool difficult to justify. |
| [Hello Interview](https://www.hellointerview.com/premium) advertises guided practice and promotional $47 one-month / $79 one-year access without auto-renewal. | E: adjacent interview product, effectiveness untested. | Practice is already a competing format; time-limited access is an anchor, not proof of PM demand. |
| [Lenny’s community](https://www.lennysnewsletter.com/p/community) is for paid subscribers; [Lenny Rachitsky](https://lennyrachitsky.com/) links newsletter and podcast. | E: discoverable channel, no evidence our customer follows it. | Ask about existing membership before treating it as reachable. |

Prices are displayed USD amounts, without currency conversion or assumptions about tax and checkout totals. No competitor has been independently benchmarked. The live [PM Job Coach](https://product-job-coach.lovable.app/) returned a browser-fetch error; its relationship to this product is user-provided context, and no feature or entitlement claim is inferred from it.

## Work, trigger and useful result

Hypothesized workflow: request from a stakeholder or customer → PM clarifies intent → drafts behavior in an editor → checks project/API facts → searches or asks AI/engineering → updates acceptance criteria → engineering review. Likely friction is reconstruction of assumptions across the draft, chat and source tabs. This sequence has not been observed; interviews must test it. [U, A]

Illustrative example, not a customer incident: the requirement says “Add a retry button when checkout fails.” Engineering asks what happens if the operation completed but the response timed out. Leaving the question unresolved means the requirement does not distinguish a known failure from an unknown result or specify the associated customer states. No duplicate payment or financial loss is claimed to have occurred. [U]

The PM decides intended customer behavior and which questions require confirmation. Engineering establishes what the real API and system guarantee. The simulation must disclose its assumptions and supported scope; it cannot establish what happened in an actual checkout. [U, I]

| Outcome | Separate evidence of success |
| --- | --- |
| Better requirement | Compare original and revision using the offer’s five 0-2 dimensions: states, assumptions, failure handling, testability, rationale/evidence. The +2/10 target remains provisional. |
| Better understanding | Without seeing generated text, explain a changed condition and identify the fact needed before recommending behavior. Use an engineer-reviewed answer key. |
| Grounded confidence | Record confidence before and after, then compare it with explanation accuracy. More confidence with incorrect reasoning is a failure. |
| Useful engineering conversation | After the real review, ask what the note clarified, what engineering corrected, and whether it helped reach a decision. A downloaded note is insufficient evidence. |

The existing 20-minute session target is a hypothesis, not a speed promise. Log abandonment and help given as well as completions.

## Alternatives, objections and switching conditions

The following are inferences to test. Objections are anticipated from the brief, not interview quotations.

| Current alternative or objection | What must justify adding PM Workbench | What stays elsewhere / first-experience implication |
| --- | --- | --- |
| Ask an engineer: they know our system | Arrive with clearer questions and a reasoned draft without creating more correction work | Keep engineering review; explicitly list unknown project facts. |
| General AI: I can ask ChatGPT | Better source-grounded reasoning or output than a capable assistant given equivalent context | Keep general AI for broad work; compare fairly, without a deliberately weak baseline. |
| ChatPRD: already helps write requirements | Added understanding and useful decision rationale, beyond advertised drafting/context features | Keep the existing editor; export a usable note without migration. |
| Documentation/search: I need authoritative facts | Connect a relevant passage to a concrete requirement gap | Keep source links and dates; make unsupported claims visible. |
| Course: I want structured depth | Apply one concept to today’s decision with acceptable effort | Leave full curricula and interview preparation adjacent. |
| I need an answer now | A useful finding before extended practice | Show the gap and rationale early; test shorter optional practice before changing the agreed loop. |
| Can I upload a company PRD? | Clear, accurate data-handling information and employer permission | Offer the complete sample; accept only authorized context. Do not promise privacy behavior before it exists. |
| Is the advice correct and relevant? | Inspectable support, explicit assumptions and an expert-reviewed scenario | State checkout scope before input/exercise; never present simulation results as production evidence. |

No objection requires adding enterprise procurement, repository ingestion or a broad scenario library to this release.

## User, buyer and pricing handoff

Initial user: the PM doing the review preparation. First buyer hypothesis: that PM paying personally or claiming an expense; a manager may approve repeat workplace use and data access. An engineer is a reviewer and possible internal advocate, not an assumed budget holder. These roles are unvalidated. [A]

For `studio-define-pricing`, collect the last comparable purchase, who paid, who approved it, budget category, reimbursement process, current subscriptions and monthly frequency of supported tasks. Ask what they would stop using or buying. Test £12/month for ten completed reviews against the existing £9 five-review pack hypothesis and “continue with my current method,” after value has been experienced. Vary presentation order. No price is approved here. [U, I]

A single checkout scenario may offer too little repeat value for either bundle. If users value one session but cannot name another supported task, revisit the unit of purchase before making a recurring promise. Stated preference is weak evidence; actual buying would require a later authorized paid pilot. Do not collect payment now.

## Poor-fit lookalikes

| Customer | Fit assessment and signal |
| --- | --- |
| Aspiring PM without a real task | Can test comprehension on the sample; cannot validate current workplace demand. Record as a separate learning cohort. |
| Technical platform PM | Can review scenario quality; qualify as a customer only if the supported decision remains unfamiliar and useful. |
| Enterprise PM | Could use a permitted sample; poorly served if useful use requires procurement, SSO or prohibited private uploads. Ask constraints, not company size alone. |
| Interview-course seeker | Adjacent entry point; scope notice prevents an expectation of comprehensive interview preparation. |
| Autonomous coding-agent seeker | Poor fit: output is a requirement and note, with no code delivery. |
| Founder acting as PM | Eligible when they own the same requirement-review job; report separately from employed PMs. |

## Recruitment and five-question screener

Use warm PM contacts first, then buildathon introductions and colleague referrals to people who own software requirements. Aim for five qualifying conversations: three close to the hypothesized segment, one who currently solves this well with an engineer, and one relevant boundary case outside the tenure/company-size ranges. Include at least two recent checkout/billing retry tasks if reachable; failure to find them is evidence about reach. These are proposed quotas, not booked participants. [I]

Supplement with r/ProductManagement or Lenny’s community only when an existing member can use an allowed recruitment channel. Check current community rules before any later posting. Do not infer that commissioning colleagues or resume-coach users are already qualified customers. No outreach has been sent.

Ask exactly these five screening questions before explaining the proposed solution:

1. What is your current role and company size, and which requirement did you personally take to engineering most recently? When was that?
2. What questions came back, if any, and which decision did you personally need to make?
3. What did you do next, in order, including the people, documents or tools you used?
4. What happened to that requirement, and what review or related decision is coming up next?
5. What could you discuss or show in a research session under your employer’s rules: an authorized excerpt, a verbal reconstruction, or only a public sample?

Prioritize a requirement within 30 days plus a forthcoming review or unresolved question. Do not require dissatisfaction, liking AI, claiming low technical ability or willingness to pay. Log screened-out reasons and compare the boundary participant with the core group.

Draft outreach, not sent:

> I’m researching how PMs prepare requirements for engineering review. I’d like to hear about one you worked on recently, what questions came back and what you did next. Could you spare 30 minutes? A verbal walkthrough is enough; please keep company-confidential material private. I’m looking for examples where the current process worked well too.

## Interview guide for five conversations

Use the same guide for all five. One interviewer and one note-taker can rotate across the six-person team. Ask permission to retain notes or record; anonymize findings and avoid collecting private artifacts by default. Record source channel to make warm-network bias visible.

- Minutes 0-3: confirm role, task ownership and consent. Explain that the team is investigating a workflow, not assessing technical ability.
- Minutes 3-12: reconstruct the last requirement. What started it? What was the first draft? What exact question arose? Which source or person was consulted next? What changed, and what happened in review? Capture timestamps where available; label recall separately from inspected artifacts.
- Minutes 12-17: ask what worked well, what remained unresolved, the last tool adopted or abandoned, and current satisfaction from 1-10. Ask about the last comparable purchase and its approver before naming our price.
- Minutes 17-25: show the public checkout requirement as a clearly labelled research stimulus. Ask what they would do with their usual method and how they would check their answer. Then discuss an explanation and practice concept; if a prototype does not exist, record stated reaction only, not completion or learning results.
- Minutes 25-28: ask which output would matter in the next review, what they would skip under deadline, and what would make the tool unnecessary. Probe artifact, understanding and structured learning separately.
- Minutes 28-30: ask what can be checked after the actual review and whether they permit a follow-up. Record permission; do not send it automatically.

Capture one row per participant: task/date, ownership, workflow evidence, consequence, alternative, satisfaction, AI verification behavior, learning appetite, buyer/approver, data constraint, next review and contradictory evidence. After each conversation, update assumptions without rewriting earlier findings as confirmation. Five conversations are formative; preserve counts and exceptions.

## Challenge the learning mechanism

Proposed later comparison: A uses the agreed prediction → observation → explanation → revision loop; B shows the finding and brief explanation first, with short optional practice. Give both equivalent sources and task difficulty. Counterbalance order using different matched cases, log hints and elapsed time, and ask both groups an unassisted changed-case question. Five conversations can expose friction; the offer’s proposed 12-person comparison would provide a broader formative check, not statistical proof.

If participants skip practice but explain the changed case correctly, test an optional path. If writing improves but reasoning does not, do not call it learning. If confidence rises while errors persist, revise feedback before expansion. Repeat a novel case after 48-72 hours only when timing and follow-up consent allow.

Combining tools and lessons is not an established competitive advantage. Evidence needed: better blind-scored output or transfer than an equivalent-context general assistant, actual note use at review, repeat use on supported tasks and eventually purchasing. A reviewed scenario library and reliable evaluation are possible future assets, not a demonstrated moat.

## Assumptions and decision-changing evidence

| Assumption | Small test | Evidence that changes the decision |
| --- | --- | --- |
| Recent review creates sufficient urgency | Reconstruct five recent tasks and current alternatives | If three or more report no meaningful unresolved gap, narrow the trigger or reconsider the customer. |
| Practice helps enough to justify effort | Compare full versus shorter/optional practice with unassisted reasoning | Similar understanding with less friction favors optional practice; no advantage over general AI challenges the mechanism. |
| Repeat value supports personal or expensed payment | Count supported tasks, inspect prior buying behavior, then compare priced offers | One useful session with no second task argues against ten-review monthly packaging; approval barriers change the buying route. |
| Checkout is relevant to reachable PMs | Track recruitment task topics and sample-to-real-task relevance | If fewer than two of five have a relevant task, reconsider recruitment or propose a scope change explicitly. |
| Proposed demographic ranges locate the job | Include one relevant boundary participant | Stronger fit outside the ranges favors behavioral eligibility. |
| Company context can be used safely and practically | Ask actual employer constraints; test sample and authorized minimal context | If useful review consistently needs unavailable private data, revise first-use promise before adding integrations. |

Thresholds are discussion gates chosen for this small study, not statistical conclusions. The first three rows are the highest-priority assumptions.

## Onboarding and offer consistency

Proposed onboarding implications: start with sample or authorized pasted requirement, disclose checkout scope, ask the decision/review context, and let the PM edit facts and choose explanation depth. Deliver one meaningful gap with its source and assumption before prolonged learning. End with a revised requirement and editable/exportable note containing rationale, evidence, acceptance criteria and engineering questions. Persist only under the ownership/data rules already specified in the offer notes. These are requirements, not implemented capabilities.

| Offer element | Persona check |
| --- | --- |
| Customer | Consistent, with behavioral urgency taking priority over unvalidated demographics. |
| Pain | Same unresolved retry question; frequency and cost remain unknown. |
| Outcome | Same revision and note; writing, understanding, confidence and review utility measured independently. |
| Mechanism | Same bounded checkout loop; optional practice is a proposed experiment, not a silent change. |
| Buying context | Same free complete sample and tentative individual price; repeat-use and approval risks remain open. |
| Proof/guarantee | No first-party proof; proposed sample access is not yet delivered. |

One customer/scope tension deserves explicit wording. Proposed replacement for Product Offer section 1’s first sentence, for later approval: “PMs from non-engineering backgrounds who own an API-dependent SaaS requirement for an upcoming engineering review and need to resolve or explain an unfamiliar technical behavior; the first supported practice case is checkout retries.” Keep the next sentence labeling company size, tenure and tools as recruiting hypotheses. This makes supported scope visible without changing the product direction. The Offer file was not edited.

Archive verification: the unrelated original persona was copied byte-for-byte to `productos/archive/pre-pm-workbench-2026-09-08/original-customer-persona.txt` before editing; SHA-256 `C2EFCAB65A4C2349BA0D9CA37BDB5F213915EEC3C4D9F8DE489DC08AC89CDA12`. Its project claims were not reused. ProductOS remains gitignored, so its canonical persona and archive are local files; this supporting brief is in `docs/`.

Next ProductOS step: `studio-define-pricing`. Inspect and archive any unrelated pricing-template content before filling it. No later phase, outreach, payment collection or implementation was started.

## Additional reference: AgentSwarms

Added 8 September 2026 following the user’s suggestion. [AgentSwarms](https://agentswarms.fyi/) advertises browser-based runnable examples, side-panel lessons, editable templates and deliberately broken exercises. Its homepage describes a learning and proof-of-concept platform. These are provider descriptions; no signed-in lab, integration or source code was tested. [U, E]

Adaptation hypothesis: a PM learns by changing one decision and examining the consequence within the requirement they are preparing. This strengthens the existing practice mechanism without establishing customer demand or learning effectiveness. [I, A]

| Reference pattern | PM Workbench adaptation |
| --- | --- |
| Start with a runnable example | Open the sample checkout requirement with all simulation assumptions visible. |
| Explanation beside the activity | Put the short explanation beside the relevant requirement gap; offer depth on demand. |
| Modify and rerun | Let the PM change a supported retry choice or simulated response condition and compare outcomes. |
| Diagnose a deliberate failure | Present an authored case where the response is lost after the operation completes; ask what is known and which customer behavior needs revision. |
| Carry the experiment forward | Save the PM’s revised acceptance criteria and rationale in the decision note, with the simulation assumptions attached. |

Proposed exercise: predict the outcome → run the labelled simulation → change one supported condition → explain the difference → revise the requirement. This is an original learning activity to specify later, not a claim about the user’s payment system. Engineering review must verify any real-system assumptions. [I]

Retain the current primary persona and checkout-only first scenario. A broad agent curriculum, swarm builder, certification and framework notebooks do not address the immediate review-preparation job. Code reuse or embedding would require a separate assessment of licence, data handling and runtime fit; this reference does not select an implementation dependency. [I]

Test this interaction against the shorter explanation-first path already proposed above. Measure unassisted reasoning and the resulting requirement, alongside time and abandonment. Enjoying the experiment alone would not validate workplace value. Next ProductOS step remains `studio-define-pricing`.
