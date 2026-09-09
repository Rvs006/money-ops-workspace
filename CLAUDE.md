# CLAUDE.md

<!-- BEGIN PRODUCTOS -->
## This repo runs on ProductOS

- The product strategy system lives in `productos/` — checklists, templates, and skills. The strategy docs are the source of intent; don't guess at product decisions the docs already answer.
- The programme plan is `docs/PLAN.md`, when present (adopted at setup by `studio-setup`) — consult it before starting any phase work.
- The canonical product documents live in `docs/` at the repo root (`PRODUCT.md`, `DESIGN.md`, `PRD.md`, `ROADMAP.md`, `LAUNCHES.md`, `SECURITY-AUDIT.md`, …). ProductOS skills write them; they may sit alongside the repo's own docs.
- Build-loop plan files are `docs/ROADMAP.md` and `docs/REFACTOR.md` — never `docs/PLAN.md` (the programme plan, no checkboxes) and never `productos/*-CHECKLIST.md`.
- Full system orientation: `productos/AGENTS.md`.
<!-- END PRODUCTOS -->

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

## 5. Design Fidelity

**The design system is law. Reference `docs/DESIGN.md` for every frontend change.**

Before writing or changing any UI code:
- Read the relevant sections of `docs/DESIGN.md` — token YAML and component specs.
- Every color, font, size, spacing, and radius comes from a token. Never hardcode visual values.
- Reuse existing components before creating new ones. New components are built from the tokens.
- If a design need isn't covered by `docs/DESIGN.md`, flag the gap and ask - don't invent styling.

## 6. Secure by Default

**Insecure code that works is not done. These are not optional.**

- Never hardcode or commit secrets — environment variables only, and never behind a public prefix (`NEXT_PUBLIC_*`, `VITE_*`, `EXPO_PUBLIC_*` ship to every browser).
- Authorization lives server-side: check *ownership* of the resource, not just that someone is logged in. Client-side checks are UX, not security.
- Every database table gets access rules from day one — RLS policies scoped to the user in Supabase, auth-required rules in Firebase. A table without rules is public.
- Parameterized queries only — never build SQL from user input.
- Verify webhook signatures (Stripe, Clerk, GitHub) before trusting the payload.
- `service_role` and `sk_live_` keys never reach the client. The anon key / `pk_live_` are public by design — that's fine *because* the rules above hold.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, clarifying questions come before implementation rather than after mistakes, and no hardcoded style values appear in any diff.


## Money Ops: product and design direction

Reference inspected on 9 September 2026: https://money-ops-rvs006s-projects.vercel.app/
Active web prototype: `mockups/finance-native/App.web.js`.

### Product priority
- Insurance document understanding is the primary value proposition. Lead with policy upload, a short statement of what the reader extracts, and an honest supported-format/privacy note.
- Borrow the deployed app's hierarchy: upload first, a compact editable loan summary second, then a short result with optional explanations. Preserve the one-page experience.
- Prefer progressive disclosure to showing every financial field at once. Keep required details accessible, preserve calculations, and retain mandatory validation.
- Results lead with one plain-language takeaway, its key amount, and the reason. Put full assumptions, detailed figures and educational charts behind clearly named disclosures.
- Do not imply that uploaded policy text proves active cover or personal suitability. Preserve source evidence and user confirmation before applying extracted values.
- The local web reader currently supports text-based PDF assistance; do not copy the deployed Word/RTF claim until those formats actually work locally. Scanned-document OCR is not implemented.
- Backend, phone login and cloud accounts remain deferred. Never introduce simulated account controls or imply persistent storage for financial entries.

### Visual and interaction language
- Keep the approved flat blue scanner/rupee logo, automatic scan and hover-dot effect. No pause-logo button or crosshair cursor.
- Preserve Drawably, grey editable fields, and the right-side Light/Dark switch. Theme persistence is separate from financial-data persistence.
- Use `docs/DESIGN.md` tokens. Maintain crisp text and exact chart geometry; hand-drawn character belongs in frames, hatching and restrained annotations.
- The reference is a hierarchy and density guide, not permission to replace current financial logic with the deployed sample's simplified assumptions.
- Keep loan comparison, prepay-versus-invest and insurance available on one page without displaying all their detailed forms at once.
- Recharts supplies live chart geometry, Rough.js supplies seeded sketch accents, and Drawably supplies controls. Keep exact data available as text.
- Manim is an optional educational-media experiment, not the live chart engine. Prototype one insurance explanation before making a library of clips. Clearly label illustrative figures; do not pretend a pre-rendered clip uses live inputs.
- Never let animation delay keyboard input, conceal content, change scroll position during chart exploration or block touch scrolling. Respect reduced motion.
- Preserve the document-scroll override for Expo and the existing Lenis cleanup. Native touch scrolling must remain available.

### Evidence and verification
- Policy parsing, confirmed fields and findings must be distinguished. A sample policy must be clearly labelled and actually load usable evidence.
- Keep APR primary when loan amounts or terms differ. Do not rank unlike loans by shortest cost bar. Preserve buffer, fee, tax-assumption and EMI-mismatch checks.
- Use real amortization series, never interpolated endpoint curves. Label chart-only scenario changes when they do not update the recommendation.
- After changes, build in `mockups/finance-native` with `npm run build`; run `npm test` for financial/parser changes. Wait for export to finish before checking the preview.
- Verify browser scrolling, upload/manual fallback, disclosure controls, edited inputs, result updates, keyboard focus, both themes and narrow mobile layouts. Inspect console errors and chart labels for clipping.
- Report physical-device or live-service checks that were not performed. Do not claim backend readiness from frontend tests.

### Instruction-file ownership
`CLAUDE.md` is the canonical instruction file. `AGENTS.md` is a relative symbolic link to `CLAUDE.md`, so it remains valid when the repository moves or is cloned on macOS. Edit `CLAUDE.md` once; both tools read the same instructions. On Windows, enable Git symlink support and Windows Developer Mode when cloning; if the checkout contains plain link text instead, read `CLAUDE.md` directly.
