# Nick Pyl: document action and confirmation

Inspected 9 September 2026 for the Money Ops policy-reader prototype.

## Original resource

- [Original post, 2 September 2024](https://x.com/nickpylll/status/1830533429697392656): “document signature / mobile version”.
- [Author's Explorations portfolio](https://nickpyl.space/explorations): the first exploration opens a media viewer with the matching description, “Document signature / mobile version”. Verified in the browser.

The portfolio presents a video demonstration. No source repository, downloadable Figma file or reusable component package was linked in the inspected post or portfolio. This is a bounded finding, not a claim that no source exists elsewhere. No author assets or implementation code have been copied into Money Ops.

## What transfers to Money Ops

The reference holds a document summary in view, puts the primary action within reach, then gives the completed action a focused central state. The document mark and context connect the two states. Its blue surface, glass treatment, contract content and signature action belong to that demonstration.

For Money Ops, the comparable action is reading a source passage. A user can mark a passage as read, with a confirmation that reports only that action. It cannot imply that insurance cover is verified, that the policy is suitable, or that a document was signed.

## Prototype scope

Explore one interaction: moving between a policy topic, its source passages and a reading acknowledgement. Use the existing fictional policy, keyword-review logic, system typography and green/white tokens. Keep source paragraph references and missing-match explanations visible.

- Inline: existing document reader, unchanged, as the baseline.
- Sheet: a focused reading surface with topic navigation.
- Complete: document context followed by a passage-reading confirmation.

The exploration lives in `mockups/finance-native/proto/policy-review/`. It is not a production integration. The user's selection and rejected directions are pending; do not invent a selection.
