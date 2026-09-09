# Skills for the PM Workbench

Prepared 8 September 2026 from the installed ProductOS 1.5.0 and Compound Engineering 3.24.0 packages.

## Installation

Both plugins were already enabled in Codex. This project now contains a complete local ProductOS copy at `productos/`, including 35 skills, templates, and reference material. Root `AGENTS.md` and `CLAUDE.md` were copied from its setup templates. `.gitignore` excludes `productos/`; generated project documents can be tracked. All 118 package files were verified against the installed source.

No coached programme plan shipped with this package, so no `docs/PLAN.md` was created. ProductOS's default starting point is `productos/define/DEFINE-CHECKLIST.md`. This guide recommends skills; it does not mark any programme phase complete.

The local repository has no application source yet. The existing PM Job Coach is a live reference, and `PM-Capability-Platform-Blueprint.md` is an earlier proposal. The later Rome and bb discussion proposes a PM Workbench where a learner brings a PRD, reviews technical decisions, practises an unfamiliar concept, and saves a revised decision note. That proposed scope still needs a product brief and implementation plan.

## ProductOS: choose and specify the product

Start with `$studio-define-offer-builder` for the expanded workbench concept, using the conversation as input. The initial customer hypothesis is a PM from a non-engineering background preparing a specification for engineering review. Treat demand, pricing, and learning effectiveness as unvalidated.

| Skill | Use here |
| --- | --- |
| `$studio-define-offer-builder` | Clarify the customer, current pain, promised result, and mechanism for the PM Workbench. |
| `$studio-define-from-code` | Alternative Define entry when you want to document the existing resume coach first. It accepts a live app as evidence; distinguish observed features from proposed additions. |
| `$studio-define-customer-persona` | Identify a specific PM, their current workflow, and what would make them try this. |
| `$studio-define-product` | Synthesize the completed Define inputs into `docs/PRODUCT.md`. It is not a substitute for those inputs. |
| `$studio-design-identity-creator` | Decide the product's voice and visual direction using this brief. |
| `$studio-design-design-system` | Produce `docs/DESIGN.md` and its HTML style guide after the identity work. Apply the user's design instructions when interpreting references. |
| `$studio-design-magic-moment` | Define the first useful outcome: turn one vague requirement into a technical decision the PM understands. |
| `$studio-design-onboarding-flow` | Get a learner from a sample or pasted PRD to that first result with minimal setup. |
| `$studio-develop-prd-roadmap` | Turn the completed product and design inputs into `docs/PRD.md` and `docs/ROADMAP.md`. |

This is a shortlist, not a replacement for the phase checklists. They contain dependencies such as pricing and acquisition work. Use the existing conversation to avoid repeating intake questions that already have answers. Do not invent customer proof or a completed launch.

ProductOS is development tooling for this project. Its source materials remain local, and must not be copied into the customer-facing learning product or redistributed with the app. See `productos/LICENSE.md` for the supplied licence.

## Compound Engineering: decide, plan, scaffold, verify

| Skill | When to use it |
| --- | --- |
| `$ce-pov` | Evaluate whether this project should adopt Rome, extend bb, or use a small standalone implementation. It gives an adoption recommendation, not a scaffold. |
| `$ce-brainstorm` | Resolve remaining product scope. If ProductOS already settled the same questions, pass those documents onward instead of repeating discovery. |
| `$ce-prototype` | Test one uncertain interaction with a throwaway prototype, for example selecting a PRD finding and revising it while seeing an explanation. It is not the production scaffold. |
| `$ce-plan` | Produce the technical implementation plan: app structure, data ownership, saved jobs, review states, provider integration, and checks. It plans; it does not write the production app. |
| `$ce-work` | Execute the ready plan and build the actual scaffold and first working flow, with local verification. |
| `$ce-code-review` | Review implemented changes for defects, regressions, and missing checks. |
| `$ce-test-browser` | Exercise the changed routes and controls in the browser once the app runs. |
| `$ce-compound` | Preserve a verified, non-obvious lesson that future work would otherwise have to rediscover. Use selectively. |
| `$ce-setup` | Optional CE health/configuration check. CE is already installed; this is not an app generator. |

Recommended handoff: completed ProductOS brief and design → ProductOS PRD/roadmap → `$ce-plan` → `$ce-work` → review and browser verification.

ProductOS also offers `$studio-develop-mvp-build`, which executes its full roadmap. That is an alternative implementation controller. For the mixed workflow recommended here, let `$ce-work` own implementation and avoid having two controllers independently execute the same tasks.

CE uses `docs/` for its artifacts by default, including its plan and solution subdirectories. Pass the exact plan produced by `$ce-plan` to `$ce-work`. Keep `docs/PRD.md` as the product specification and `docs/ROADMAP.md` as the ProductOS roadmap. Do not turn the reserved programme file `docs/PLAN.md` into a coding checklist.

## Example prompts

First product action:

```text
$studio-define-offer-builder
Use our existing conversation and PM-Capability-Platform-Blueprint.md as context.
Define the expanded PM Workbench inspired by Rome and bb. It helps a PM from a
non-engineering background review a PRD, understand technical decisions,
practise one concept, and save a revised decision note. Reuse known answers;
label assumptions and validation gaps. Keep the ten-day buildathon in scope.
```

Before choosing the runtime:

```text
$ce-pov
Evaluate Rome as the runtime, a bb plugin, and a small standalone web app for
this PM Workbench. Consider the existing Lovable project, browser access for
nontechnical users, per-user data separation, deployment effort, and the
buildathon deadline. Give a recommendation grounded in the available source
and current documentation. Do not install or merge the runtimes during the review.
```

Once ProductOS has produced the prerequisite documents:

```text
$ce-plan
Use docs/PRODUCT.md, docs/DESIGN.md, docs/PRD.md, and docs/ROADMAP.md.
Plan the production scaffold and first complete flow: saved project, pasted
or sample PRD, technical findings, one practice exercise, revision, and saved
decision note. Distinguish simulated learning content from real agent output.
Include loading, failed-job recovery, data-access rules, and meaningful checks.
Use the agreed runtime decision. Keep later integrations outside this first slice.
```

Then invoke `$ce-work` with that plan's exact path to implement it. The installation in this session did not scaffold, deploy, or modify the live PM Job Coach.
