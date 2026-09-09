# Next steps through ProductOS

Current handoff: read `FINANCIAL-PRODUCT-REVISION.md` first. It supersedes the paid-test sequence with the workshop's acceptance-first approach and optional combined use. The original sequence below remains background; the next concrete deliverables are a short group-review PRD and an honestly labeled sample experience.

Prepared 2026-09-08. Companion to FINANCIAL-PRODUCT-INTAKE.md. This is a planning handoff, not the programme plan or executable build roadmap.

Update 2026-09-08: the founder selected a combined product. `validation-report.md` now defines the proposal and the immediate two-week discovery test. Product selection in the sequence below is complete; project home remains open. Complete that test before committing to the full specification. The earlier separate prototype briefs remain historical options, not the current combined MVP.

## Current state

ProductOS is installed under `productos/` inside the Git repository. Both root agent instruction files contain the PRODUCTOS block and `.gitignore` excludes the ProductOS source. Neither a shipped nor adopted programme plan exists. The default phase sequence therefore applies.

There is no application source or design system here. Existing offer/persona documents describe PM Workbench. Preserve them until the founder explicitly chooses whether the new product replaces that track or belongs in a separate project. No offer, launch, or validation milestone for these new ideas is complete.

## Sequence and completion evidence

| Step | Skill / action | Result and completion evidence |
| --- | --- | --- |
| 1 | Select product track and project home | One selected product, or two deliberately separate tracks; explicit handling of the existing PM Workbench documents |
| 2 | `studio-define-offer-builder` | Six-part offer using the captured brief, current category research, and labeled assumptions; write the selected project's template in place |
| 3 | `studio-define-customer-persona` | One recruiting hypothesis and a specific trigger, such as reviewing a health policy proposal or receiving a transfer offer |
| 4 | `studio-define-pricing` | A proposed launch price or explicit free pilot, with researched anchors and delivery-cost assumptions |
| 5 | `studio-launch` | Prepare the mini-launch ask; only send or publish with explicit authorization, then record actual replies separately from targets |
| 6 | `studio-define-product` | Produce `docs/PRODUCT.md` from the completed Define inputs, keeping absent proof visible |
| 7 | Product Planner intake reconciliation | Capture and validate `docs/VISION.md` against its template; reuse known answers and keep one canonical product specification |
| 8 | ProductOS Design checklist | Identity, `docs/DESIGN.md`, style guide, first useful outcome, onboarding, and acquisition work in checklist order |
| 9 | `emil-prototype` | Explore one uncertain result-screen interaction with three working variants using the agreed tokens; test each and ask the founder to choose |
| 10 | `studio-develop-prd-roadmap` | Generate `docs/PRD.md` and `docs/ROADMAP.md` from approved upstream inputs; include correctness and privacy tests |
| 11 | Implementation and verification | Build the smallest end-to-end flow, test against reviewed reference cases, exercise real controls, and run security/privacy checks before beta |

The table summarizes the handoff. Phase checklists remain the source of truth for detailed dependencies, including later relaunches. Product Planner's alternative `prd.md` / `product-roadmap.md` output convention must not create competing specifications alongside ProductOS's `PRD.md` / `ROADMAP.md`.

## Proposed prototype brief

Choose exactly one after product selection. These are exploration proposals, not implemented variants.

For insurance: explore the summary page along an interaction axis. **Reading summary** offers a short structured explanation with expandable evidence. **Evidence workspace** keeps the selected explanation beside its source excerpt. **Question-led summary** organizes the same extracted facts around buyer questions. All three must represent the same synthetic policy and its missing information, and support evidence inspection, export, and session reset. Tradeoffs are reading speed, source visibility, and navigation effort.

For LoanOptimizer: explore the refinance result. **Decision first** leads with the recommendation and expandable assumptions. **Cash-flow comparison** emphasizes payment schedules and the common comparison horizon. **Scenario controls** lets the borrower test fees, tenure, and monthly affordability. All variants must use the same deterministic results; no fabricated savings to make a screen attractive.

Before variant code, read the relevant design tokens and `emil-prototype`'s picker and craft references. Keep the prototype isolated from production code. Verify every variant in a browser at desktop and mobile sizes, including keyboard access, long content, incomplete input, and reduced motion. Record the chosen and rejected approaches after the founder selects one.

## First implementation slice after planning

Insurance: a synthetic policy → supported structured facts → evidence-linked summary → masked PDF → clear session. Introduce real document extraction only with measurable accuracy and the agreed privacy model.

LoanOptimizer: reviewed manual inputs → validated cash-flow engine → refinance comparison → visible explanation and assumptions. AI-written prose comes after reproducible calculations.

## Decisions required before a build-ready specification

- Which product and which project home?
- Initial country, insurance/loan category, language, and target user?
- For insurance, does privacy require device-only processing, and may the buyer view masked policy facts and explicitly save an export?
- Available time, budget, relevant domain reviewer, and target release outcome?
- Preferred platform and business model, or permission to propose them as assumptions?

The immediate next action is the combined-product validation test in `validation-report.md`. A privacy promise and a calculation guarantee should follow evidence from the first working slice, not precede it.
