# PM Workbench: offer decisions and validation

Prepared 8 September 2026. Supporting analysis for `productos/define/1. Product Offer.md`, not a substitute for PRODUCT.md, DESIGN.md, PRD.md, or ROADMAP.md. No implementation, customer interviews, or integrations were completed during this offer pass.

## Decision

Help a non-engineering SaaS PM prepare one requirement for engineering review and understand the decision behind it. Start with checkout retries. The larger workbench can later connect technical learning, saved project knowledge, and interview preparation.

Initial recruiting hypothesis: PMs with 1-5 years in product at 20-200-person SaaS companies, who have a review coming up and currently use a document editor, general AI, and engineer conversations. These boundaries are proposed for recruiting; they are not measured demographic findings. Recruit based on a recent concrete task, not a self-description of being bad at technology.

The existing PM Job Coach remains an adjacent career entry point. Its source and entitlements must be inspected before choosing an extension architecture. A standalone browser prototype is a fallback to assess, not an approved replacement for the live product.

## First useful outcome and scope

Sample or pasted short requirement → editable project facts and assumptions → up to three technical findings → cited explanation → one controlled exercise → revised requirement → saved/exported decision note.

The useful moment is when the PM recognizes that a timed-out response does not establish whether the operation completed, then writes a customer state and retry requirement that accounts for that uncertainty. A generated page alone does not establish understanding.

Include in the first release:

- A sample checkout requirement and pasted text input; pasted project context with an explicit source label.
- Foundation and practising-PM explanation depth, adjustable by the user rather than inferred solely from job title.
- One original deterministic checkout scenario with prediction, observation, reasoning, and a changed condition. Label it as simulated and make no real payments.
- A small expert-reviewed rubric. AI can explain results but cannot invent the scenario outcome.
- One external search provider, source excerpts and links, visible gaps, and a small authorized project-document collection.
- An editable decision note: requirement revision, rationale, evidence, assumptions, acceptance criteria, engineering questions, and simulation version.
- Saved progress, export, server-enforced ownership for private data, recoverable failures, and measurement of the complete flow.

The supported teaching scope is checkout retries. Other pasted requirements can receive clearly bounded review and sources, but must not trigger a fabricated bespoke simulation or imply equivalent validated coverage. Explain that limitation before the exercise.

Defer repository ingestion, code generation, PR delivery, production agents, automatic classroom generation, voice interviews, full curricula, a freeform canvas, team collaboration, multiple provider integrations, and broad competency scoring. Preserve genuine career stories separately from practice artifacts.

## Competitive evidence

Checked 8 September 2026. Provider claims below are not independently audited. Prices are displayed values, not promises about checkout totals or regional tax.

| Evidence | Implication |
| --- | --- |
| [ChatPRD](https://www.chatprd.ai/) reports 100,000+ PMs and 750,000+ documents; advertises requirements, coaching, and connected context. | A PRD writer with saved context has direct competition. These counts do not establish paid users. |
| [ChatPRD pricing](https://www.chatprd.ai/pricing) displays Pro $15/month billed $179/year, Teams $29/seat/month billed $349/year, and a free allowance of three limited chats. | A small individual subscription needs visible value beyond document generation. Do not quote the annual equivalent as a monthly cancellable price. |
| [Hello Interview Premium](https://www.hellointerview.com/premium) displays promotional $47 one-month and $79 one-year access, without auto-renewal, plus guided practice and a tutor. | Applied practice already exists. Interview learning is an adjacent market and does not establish PM workbench demand. |
| [Fei MCP announcement](https://autonomyai.io/product-updates/fei-studio-now-works-inside-claude-code-cursor-and-any-ai-agent/) describes editable plans, code diffs, and engineering-reviewed PRs, initially through early access. | Project-aware delivery is competitive territory. Access, terms, and compatibility remain untested. |
| [Cursor's June 2025 disclosure](https://cursor.com/blog/series-c) reported over $500 million ARR and $900 million raised at a $9.9 billion valuation. | Historical, self-reported evidence that integrated AI workflows can earn adoption; an adjacent developer product, not a forecast for this one. |
| [Jasper's July 2023 statement](https://www.jasper.ai/blog/july-11-important-update-from-ceo) announced discontinued roles and a sharper focus on marketing teams. | A documented retrenchment example. It does not prove Jasper shut down or that a foundation model caused the layoffs. |

Public pain signal: [a February 2026 PM discussion](https://www.reddit.com/r/ProductManagement/comments/1qwt1nl/advice_for_understanding_tech_as_a_nontechnical_pm/) describes lessons failing to feel applied. A [March 2025 discussion](https://www.reddit.com/r/ProductManagement/comments/1j3ghbk) asks specifically about APIs and architecture. These anecdotes justify interviews, not a market-size or willingness-to-pay claim.

Differentiation hypothesis: requirement-specific practice with an assessed explanation and a useful saved revision. The weakest point is adoption: a busy PM may only want the answer. General chat can reproduce much of the text, and competitors can add a quiz. The candidate durable value is a reviewed scenario library, reliable evaluation, and useful project history. None is a demonstrated moat today. More integrations would add work without settling this risk.

Other references retain their roles from the conversation: Rome/bb for persistent work surfaces; Vizuara/Wondering/OpenMAIC for teaching patterns; Fanout/escbash for active practice; Every and launch directories for discovery. This offer makes no new capability or availability claim about them and requires none as a dependency. Reverify any proposed integration before implementation.

## Retrieval decision

Keep project facts and external evidence in separate retrieval paths with source type, date/version, ownership, and supporting passages. Apply access restrictions before retrieval. External queries must omit private project text unless the user has authorized disclosure. Retrieved text is evidence, never executable instruction.

[Exa Search](https://exa.ai/docs/reference/search) supports domain controls and content retrieval. [Parallel Search settings](https://docs.parallel.ai/search/advanced-search-settings) expose source policies and excerpt controls. Both are plausible candidates. Start by testing Exa on 30 representative PM queries; use the same questions to compare Parallel before selecting a provider if access permits. Neither was called through an authenticated API in this session.

Candidate local retrieval: keyword and semantic search combined with Reciprocal Rank Fusion, then task-specific reranking. Tune against judged results before introducing many weights. Compare with provider-only search; the smaller system wins if it performs similarly. Preserve dissenting evidence, deduplicate repeated sources, and show unsupported assumptions. Saved preferences require explicit user approval and are context, not model training.

## Pricing hypotheses

Use a free, complete sample session with export during the pilot. Proposed paid test: £12/month for ten completed reviews, with visible caps and no automatic overage. Compare with a £9 one-off pack of five reviews if usage clusters around occasional review meetings. These are unapproved experimental prices; taxes and delivery costs need checking before sale. Avoid lifetime pricing for recurring search and model costs.

Ask five target PMs to choose between the offers after using the flow and explain the alternative they would stop paying for or using. Stated willingness is weak evidence. Later, an explicitly authorized paid pilot can test actual purchase behavior; no payment collection is authorized or implemented here.

Proposed variable-cost target: at most £0.25 per completed review, counting search, model calls, retries, and failures allocated across completions. Ten reviews at that cost consume £2.50 of a £12 price before tax, fees, hosting, support, and acquisition. This is a feasibility budget, not an observed margin.

## Validation and release decisions

Use the existing ten-day event window through 16 September, rather than resetting a fresh ten days on 8 September. Targets remain 100 genuine external users and five PM/founder feedback conversations; neither is achieved.

- 8-9 September: observe five target PMs with a recent requirement; ask what engineering challenged and inspect the old draft only with permission. Include a PM and an engineer in rubric/scenario review. Prepare recruitment material without sending it automatically.
- 10-12 September: proposed implementation period for one complete flow after prerequisite product/design work and a source/runtime check. Six ownership lanes: product/research, scenario accuracy, design, application, retrieval/evaluation, recruitment/QA. Each lane recruits and tests too. Feasibility remains dependent on available code and team capacity.
- 13-15 September: release a usable pilot, recruit toward the user target, observe failures, compare outputs with a baseline, and fix the largest completion problem. Confirm the buildathon definition of a user; report visitors, task starters, and activated users separately.
- 16 September: report observed counts, rubric outcomes, costs, and limitations. Preserve failures and contradictory feedback. Do not imply long-term learning was established in a week.

For a directional baseline comparison, recruit 12 PMs and counterbalance two matched cases between the workbench and a general assistant supplied with the same source material. Use blind PM/engineer scoring where possible; log hints and time. Small samples are formative, not statistical proof. Have participants attempt a novel case without assistance after the task and again after 48-72 hours if scheduling allows. Seek a later 30-day follow-up for retention and real review outcomes.

All thresholds below are proposed decision gates, not achieved metrics:

| Measure | Definition and initial target |
| --- | --- |
| Completion | Saved decision notes / eligible external task starts; target at least 60%, showing numerator and denominator. |
| Time to value | Median start-to-saved-note among completions at most 20 minutes; separately report abandonment and idle time. |
| Requirement quality | Five dimensions scored 0-2: state clarity, assumptions, failure handling, testability, rationale/evidence. Target median improvement at least 2/10; compare with baseline. |
| Learning transfer | Unassisted new-case reasoning scored separately from copied output; provisional target 8/12 identify uncertainty and safe retry requirements. Report baseline and hint use. |
| Citation support | Human audit of at least 30 factual claims; target at least 90% supported by the linked passage, no invented references. Flag consequential unsupported claims for correction. |
| Retrieval | Relevance of the top five passages on 30 queries, coverage of expert-required facts, and contradictory evidence retained; compare against provider-only retrieval. |
| Latency | P50/P95 time to first substantive finding; proposed P95 at most 30 seconds. Measure completed failures and timeout rate too. |
| Cost | Total variable spend / completed reviews, including unsuccessful runs; target at most £0.25, recorded with provider/model/version. |
| Return value | Users bringing a second requirement within seven days / users observed for a full seven days. Report eligible cohorts; do not fabricate a deadline-wide rate. |

If users prefer the generated answer but skip the exercise, test a shorter optional explanation and measure transfer again. If quality and transfer are no better than the baseline, revise the mechanism before expanding the curriculum. If repeat use is low but occasional value is clear, test packs instead of a subscription.

## Offer review and next steps

Wide Wedge: narrowed to a concrete review task; demographic boundaries still need evidence. Vague Pain: replaced by the ambiguous checkout requirement. Unmeasurable Outcome: replaced by one artifact plus scored reasoning. Feature-List Mechanism: replaced by the prediction-to-revision loop. Toothless Guarantee: proposed free complete session/export, subject to implementation. Hypothetical Proof: explicitly no first-party results. Story Break: research and learning both serve the same requirement. Frame Mismatch: initial individual purchase, not an enterprise procurement promise.

The offer is suitable for testing, but demand, learning benefit, price, and competitive advantage remain open. The six elements fit one story without passing off those gaps as solved.

Next ProductOS sequence:

1. `studio-define-customer-persona`: replace unrelated prefilled persona content only after preserving it; validate the recent-review trigger and buying context.
2. `studio-define-pricing`: fill the actual pricing worksheet from the experiment; inspect for unrelated source content first.
3. `studio-launch`: prepare the mini-launch and later record only genuine replies. Sending messages or publishing needs explicit authorization; the present task grants neither.
4. `studio-define-product`: synthesize the prerequisite Define documents and actual mini-launch status into PRODUCT.md. Do not mark Define complete without evidence.
5. Design checklist: identity, design system, magic moment, onboarding, acquisition, and the applicable preview launch. Follow the user's visual instructions when design starts.
6. `studio-develop-prd-roadmap`: generate PRD.md and ROADMAP.md from the completed product/design inputs.
7. Compound Engineering: use `ce-pov` for any unresolved runtime choice, then `ce-plan`, `ce-work`, review, and browser verification. CE owns implementation; no competing build controller runs alongside it.

No PRODUCT.md, DESIGN.md, PRD.md, or ROADMAP.md was improvised during this offer-only step. The full prior unrelated offer is archived inside the ignored ProductOS folder; its customer and deployment claims must never flow into this PM product.
