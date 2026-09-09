# Policy-first implementation review

8 September 2026. Published at https://money-ops-rvs006s-projects.vercel.app/

| Before | After | Why |
| --- | --- | --- |
| Loan is the first interaction | Policy-wording input first; loan remains below | Matches the revised value proposition |
| Fictional policy text only | AnyDoc worker reads real local files | Gives a usable document feature |
| No file export | Downloadable PDF reading guide | User can keep the evidence |
| Headings counted as matches | Heading context attached to a body passage | Avoids inflated evidence counts |

Verified: production web export; loan and policy unit checks; actual AnyDoc RTF conversion; browser sample; local RTF and text PDF selection; live Vercel DOCX selection; malformed PDF rejection; source expansion; clear; PDF download (12,432-byte fixture guide saved successfully); 320px layout and desktop layout. Live deployment marked Ready by Vercel. Source and web ZIPs pass integrity checks.

The supplied design rules were rechecked by category: typography, palette, surfaces, spacing, alignment, clipping, signature, responsive layout, icon treatment, motion, control behaviour and truthful content. The existing bare mark and system tokens remain. No decorative card grid, gradient, glow, invented score, fake logo, moving button or hidden-on-load text added. All policy topic controls expand real content or a missing-information explanation.

Limits: keyword guide only, English public policy wording without personal identifiers, no hosted OCR or LLM, no guaranteed anonymisation, no native document-reader implementation. Loan tools remain independent. Browser development build emits an existing accessibilityElementsHidden warning from the native navigation stack; production reader logs showed no errors during the checked flows. Specialist evaluation is required before personalised policy interpretation.
