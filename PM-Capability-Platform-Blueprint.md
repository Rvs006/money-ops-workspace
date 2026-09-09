# PM Capability Platform: Product Blueprint

Prepared 8 September 2026. Working product direction: augment PM Job Coach into a learning and practice platform for product managers, with technical fluency as the first expansion.

**Product promise**

Understand the engineering behind your product, practise decisions appropriate to your role, and explain your reasoning clearly at work and in interviews.

The existing resume coach becomes a career entry point. A target role and the learner's experience help suggest a path; short exercises establish what they can actually demonstrate. Resume wording alone must not determine technical ability.

**The connected experience**

Profile and target role → short diagnostic → recommended concept → interactive scenario → explanation and feedback → revised attempt → saved practice evidence → next exercise or interview rehearsal.

A learner can enter through a resume review, an upcoming interview, or a work question. Everyone reaches the same competency and practice system. A resume is optional for learning.

The initial audience is aspiring and practising PMs from non-engineering backgrounds who need to collaborate with engineers. APM, PM, senior PM, and lead tracks are proposed learning bands, not universal hiring standards. Prior knowledge and demonstrated performance should override a default band.

**What the references contribute**

| Reference | Observed approach | Application to this platform |
| --- | --- | --- |
| [Eden](https://eden.so/help/getting-started/welcome-to-eden/) | Boards keep source material, drafts, and conversations together, with grid and canvas views. | Keep a learner's scenario, notes, explanation, and feedback together. Start with a structured workspace; consider freeform layout later. |
| [Hello Interview](https://www.hellointerview.com/practice/overview) | Guided practice sits alongside interview preparation content. | Let learners attempt a decision, receive feedback, and retry. Adapt the questions to PM responsibilities. |
| [System Design School](https://systemdesignschool.io/courses) | Fundamentals and domain knowledge provide a structured system-design curriculum. | Sequence concepts by prerequisites and teach the product consequences of technical choices. |
| [Klay](https://klaylearn.com/) | Indexed product material describes sequenced technical courses, reference terms, and labs. | Provide a clear path and an in-context technical glossary. Direct access also redirected to a coming-soon page during research, so current availability was not established consistently. |
| [Fanout Labs](https://fanout.sh/labs) | Labs expose controls for agent workflows, model routing, and document readiness. | Make assumptions and consequences inspectable in a small interactive exercise. |
| [escbash](https://www.escbash.com/) | Learners run commands on real machines and receive task checks. | Require learners to do something and verify the result. A browser simulation is sufficient for the first PM exercise; label it as a simulation. |

PM OS is treated here as the broader idea of a persistent PM work and learning space. The user did not identify one specific PM OS implementation. Reference products inform the learning design; their content, branding, and question banks are not reproduced.

**What a PM needs to know**

Define sufficient understanding through tasks. A learner should be able to explain the customer impact, ask useful questions of engineering, compare reasonable options, specify acceptance criteria, and describe how to monitor the result. The expected depth changes with responsibility and domain.

| Competency | Foundation / aspiring PM | Practising PM | Senior PM / lead |
| --- | --- | --- | --- |
| Product discovery and judgment | Identify the user, problem, and assumption. | Design a test and distinguish evidence from preference. | Resolve conflicting evidence and set direction across teams. |
| Engineering fluency | Explain a request, response, database, and failure in plain language. | Discuss retries, permissions, dependencies, consistency, and reliability when specifying a feature. | Compare migration options, shared infrastructure, technical debt, and operational risks with engineering leaders. |
| Data and experimentation | Read a funnel and define an event. | Specify metrics, event quality checks, experiments, and guardrails. | Challenge measurement validity and connect team metrics to business outcomes. |
| AI product judgment | Explain model uncertainty and distinguish generation from retrieval. | Define an evaluation set, fallback behaviour, latency needs, and review workflow. | Assess model/provider dependencies, operating costs, governance, and rollout decisions. |
| Delivery and collaboration | Write clear acceptance criteria and questions. | Negotiate scope, handle dependencies, and plan releases. | Sequence cross-team work and communicate risk and investment choices. |
| Strategy and commercial judgment | Connect a feature to a user need and business objective. | Weigh prioritisation, adoption, pricing hypotheses, and distribution. | Make portfolio and build-versus-buy decisions under uncertainty. |
| Career communication | Explain personal contribution accurately. | Defend a decision with evidence and trade-offs. | Communicate leadership scope and outcomes without overstating ownership. |

These are curriculum hypotheses to review with experienced PMs and engineers. They should not become a claim that one score establishes employability or seniority.

**The flagship experience: the PM Decision Lab**

Proposed first scenario: a checkout request times out. The customer retries, and the product risks performing the operation twice.

The simulated environment states its assumptions explicitly: a server may have processed a request even when the client did not receive its response, and the retry path can be configured with or without a server-enforced idempotency mechanism. The lab does not make real payments.

[Stripe's idempotent-request documentation](https://docs.stripe.com/api/idempotent_requests) provides a primary reference for a real implementation that recognises repeated requests and avoids performing the same operation twice. The lesson must distinguish that documented behaviour from the simplified scenario model.

The learner moves through this sequence:

1. See the customer complaint and a small request timeline.
2. Predict whether the original operation could have completed.
3. Run the timeout and retry scenario to inspect the outcome.
4. Choose a product response and explain the reasoning.
5. Study a short explanation tied to the error in their answer.
6. Change the decision and retry under a different condition.
7. Write acceptance criteria, a customer-facing state, and an operational check.
8. Save a one-page decision note as a labelled practice exercise.

The same scenario supports different depths:

| Learning band | Task |
| --- | --- |
| Foundation | Explain what a timeout means, recognise the uncertainty, and ask an engineer how duplicate operations are prevented. |
| Practising PM | Specify pending/success/failure states, safe retry expectations, recovery behaviour, and observable acceptance criteria. |
| Senior PM | Compare rollout and migration choices, discuss ownership across teams, and justify reliability and support trade-offs. |

Only Foundation and Practising PM variants belong in the initial beta. Senior depth is part of the expansion plan.

**Why this experience is specific to PMs**

The exercise culminates in a product decision and a communication artifact. Technical terms appear when they help explain the decision. Learners can inspect a request or response, but the primary assessment concerns reasoning, requirements, risk, and communication.

The visual signature is the working scenario: the request timeline, the learner's selected behaviour, and the resulting customer state. Movement occurs when a learner runs or changes the scenario. Content stays readable before and after every interaction, and reduced-motion users receive the same information.

The workspace should make the relationship between evidence and conclusions clear. Selecting feedback should reveal the relevant answer or scenario event. A transcript-like chat alone is insufficient for this interaction.

**How to augment the current platform**

| Current advertised capability | Proposed extension |
| --- | --- |
| Resume and target-job analysis | Offer a learning path alongside writing improvements. Distinguish missing resume evidence from an assessed learning gap. |
| Dashboard | Show the next recommended exercise, the last result, and an option to continue. |
| Story Bank | Maintain separate collections for verified personal experience and clearly labelled practice cases. |
| Rewritten bullets | Continue to require candidate-provided facts. Simulated outcomes must never become employment achievements. |
| Account and access plans | Preserve existing entitlements during development; consider a free first lab for acquisition. Review actual implementation before making access changes. |

The advertised resume/Story Bank features were visible on the live site's public interface. The analysis dashboard required a plan, so generation quality and backend implementation were not tested. The local workspace currently contains no application source files; this document is a proposal, not a deployed change.

**Buildathon release**

Ship one complete learning loop:

- A small profile form: current responsibilities, target role, technical comfort, and immediate goal.
- A five-question diagnostic tied only to the first scenario's competencies. Its result is a starting suggestion, not a broad capability score.
- One original, expert-reviewed interactive scenario with two depth variants.
- Short explanations, an in-context glossary, and source links.
- An authored feedback rubric and a constrained AI tutor for clarification and feedback wording.
- A retry with a changed scenario condition.
- A saved decision note and per-competency evidence on the dashboard.
- Analytics for starting, completing, retrying, and returning to the exercise.

Use a deterministic scenario model for outcomes. The AI explains those outcomes and asks questions; it does not invent simulation metrics or decide what happened. If AI feedback conflicts with the scenario or rubric, preserve the attempt and surface a recoverable error.

Three additional cases are candidates after the first works: a delayed order status update, a permission leak between workspaces, and an AI support answer that needs a fallback. They are not required for the first release.

Full course libraries, freeform canvas authoring, real cloud machines, company-specific interview packs, voice interviewing, social feeds, and complete PM work automation are later work. Resume enhancements should not delay the first usable lab.

**Feedback and evidence**

For each task, give concrete feedback on four dimensions: understanding of the system, product consequences, trade-off reasoning, and communication/acceptance criteria. Publish examples of an incomplete, adequate, and strong answer. Have a PM and an engineer review the rubric and sample responses before release.

A saved result contains the scenario version, learning band, attempt, assumptions, rubric feedback, hints used, and revision. Distinguish completion from demonstrated understanding. Immediate retry performance is a useful signal, but transfer to a new scenario and later recall provide better evidence of learning.

Keep the initial competency states simple: not assessed, needs practice, and demonstrated in this exercise. Never imply that finishing one case establishes general technical proficiency.

**Execution through 16 September**

| Date | Outcome |
| --- | --- |
| 8 September | Confirm the primary learner and first scenario; inspect the actual source project and review the scope with the team. |
| 9 September | Observe five target learners answering a rough scenario; finalise the rubric and interaction. Start the app extension. |
| 10 September | Complete the scenario engine and core screens; continue recruiting learners and PM/founder reviewers. |
| 11 September | Connect feedback, retry, saved results, and the dashboard. Test with external learners. |
| 12 September | Finish the complete loop, accessibility, error handling, and usage measurement. Freeze feature scope. |
| 13 September | Launch to recruited learners and observe completion. |
| 14–15 September | Recruit toward 100 unique external users, fix observed problems, and complete documentation of five PM/founder conversations. |
| 16 September | Stabilise, verify counts, and present what changed because of user evidence. |

Suggested ownership: product and learner outcomes; engineering accuracy and curriculum; experience design; application development and release; user research and quality; distribution and measurement. These are accountabilities, with shared recruitment and testing.

The engineering owner's early source inspection is a dependency. Until the existing code and entitlements are understood, the estimate for integration remains provisional.

**What to measure**

The buildathon activation event is one unique external learner submitting a decision and viewing feedback. Deduplicate repeat sessions and exclude internal/test accounts. Count lab completion separately from starts and page views.

Track the proportion who complete, revise after feedback, return, and succeed on a changed scenario. Keep assisted and unassisted attempts distinguishable. Use observed explanations and interviews to establish why scores change; do not call score increases proven skill improvement without checking transfer.

Acquisition can use the free first scenario as a concrete invitation: learn what to ask engineering when a checkout times out. Recruit through the PM cohort, career-switcher groups, PM communities, and colleagues. A directory listing is one acquisition channel, not a forecast of 100 users.

**Longer-term product**

Once the initial learning loop works, expand in this order: more technical product cases; a transparent competency map; data/AI/product judgment tracks; role-specific interview rehearsal; and a persistent workspace for real product decisions.

The learning history connects these areas. A learner who struggles with a reliability decision gets a relevant lesson, an unfamiliar follow-up case, and an interview question at the appropriate depth. Their career documents reflect real experience, while practice artifacts show what they studied and how they reasoned.

**Team pitch**

We are extending PM Job Coach into a practice platform for product managers. It helps people from non-engineering backgrounds understand the systems behind their products and make better decisions with engineers. Learners get a path matched to their role, practise realistic scenarios, receive specific feedback, and build a record of their learning. Our first release teaches one technical decision through an interactive checkout-failure lab.

**Connecting Vizuara, Wondering, and OpenMAIC**

Research update: 8 September 2026. The user confirmed that “openmaid” means OpenMAIC.

| Product | Verified contribution | Proposed relationship |
| --- | --- | --- |
| [Vizuara Mu](https://mu.vizuara.ai/) and [Pods](https://pods.vizuara.ai/) | Short AI lessons and visual explanations, with longer technical paths available. | Curate individual resources for the relevant competency. Start with attributed external links and clearly identify access requirements. |
| [Wondering](https://wondering.app/) | The inspected app offers personalised course creation, source inputs, learning maps, section reviews, challenges, saved items, and a learning assistant. | Use its learning sequence as a design reference. External use can be optional; no documented integration or progress API was found in this review. |
| [OpenMAIC](https://github.com/THU-MAIC/OpenMAIC) | Generates classroom content with quizzes, interactive scenes, and discussions; provides reusable SDK packages and exports. | Trial it as an authoring or classroom component behind a PM-specific experience. Self-hosting and SDK reuse are documented options; compatibility with the existing app still needs testing. |

The inspected [OpenMAIC licence](https://github.com/THU-MAIC/OpenMAIC/blob/main/LICENSE) is MIT. Preserve the required notices when reusing its code. Older forks may show a different licence. Hosting and model usage still have costs. Its README explicitly identifies the development persistence authentication as unsuitable for public multi-user isolation, so a shared deployment needs real account and document access controls.

No public API for Vizuara's learning content or progress was established. Vizuara also publishes DynaRoute, a separate model-routing product; its API does not establish access to Vizuara courses. Wondering was inspected through the existing browser session. No course was generated, source uploaded, purchase made, or API integration tested.

The product should own the learner's target, diagnostic, next task, PM-specific feedback, and evidence. A resource click records an opened link. A learner's completion tick records self-reported completion. Demonstrated understanding comes from an assessment inside this platform. These are different events and must remain distinguishable.

Proposed connection levels:

1. **Buildathon:** Selected external lesson links, an original explanation in the PM context, and a local exercise. Record provider, URL, topic, depth, access requirements, and review date. The core lab must work even when an external resource is unavailable.
2. **Small technical trial:** Use OpenMAIC to draft one lesson from team-authored materials. Have a PM and engineer review it, then test an export or SDK integration. Keep the existing lab as the release path while this trial runs.
3. **Later:** Integrate approved classroom content, account identity, and result events. Content embedding and third-party progress synchronisation need supported interfaces or provider agreement; a visible webpage alone does not establish either.

An AI-product example for expansion: a learner wants to ship a support assistant. Recommend the relevant section of [Vizuara's RAG micro-course](https://mu.vizuara.ai/learn/rag), then present an original case with an outdated policy and conflicting evidence. Ask the learner to specify the answer, escalation rule, evaluation examples, and release conditions. A beginner explains the failure; a practising PM writes acceptance criteria; a senior variant compares rollout and ownership choices. Save the decision as a practice case for later interview rehearsal.

This AI case is a candidate after the checkout lab, not an additional commitment for the buildathon. OpenMAIC can support teaching and discussion, while the platform's authored scenario and rubric determine the assessment. External courses remain optional depth. The reason to return is a useful PM decision, feedback on the reasoning, and a clear next exercise.
