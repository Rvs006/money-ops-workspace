---
version: alpha
name: Pleo live-site reference
source: https://www.pleo.io/en
observed: 2026-09-08
method: browser screenshot and computed DOM styles
status: partial observed extraction; Context.dev tools unavailable in this session
colors:
  ink: "#131414"
  on-dark: "#FAFCFC"
  muted: "#575B5B"
  accent: "#FEB6FE"
  secondary-text: "#6B7070"
  pale-surface: "#EEF4F4"
typography:
  hero: {fontFamily: Pleo Scandi Gellix Headline, fontSize: 58px, fontWeight: 400, lineHeight: 60px}
  headline: {fontFamily: Pleo Scandi Gellix Headline, fontSize: 26px, fontWeight: 400, lineHeight: 31.2px}
  hero-body: {fontFamily: Pleo Scandi Gellix Text, fontSize: 26px, fontWeight: 400, lineHeight: 31.2px}
  body-large: {fontFamily: Pleo Scandi Gellix Text, fontSize: 20px, fontWeight: 400, lineHeight: 26.6px}
  control: {fontFamily: Pleo Scandi Gellix Text, fontSize: 16px, fontWeight: 400, lineHeight: 16px}
  body: {fontFamily: Pleo Scandi Gellix Text, fontSize: 16px, fontWeight: 400, lineHeight: 21.28px}
rounded:
  capsule: 99999px
  square: 0px
spacing:
  control-y: 8px
  control-x: 16px
  large-control-x: 24px
components:
  primary-action:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.capsule}"
    padding: 16px
---

## Brand & Style
A public marketing page, not the authenticated product. The inspected desktop frame uses full-bleed moving photographic media, overlaid navigation, a large left-aligned statement and a visible product in the image. These are observed homepage treatments, not proof of an internal app design system.

## Colors
Measured computed RGB values converted directly to the hexes above. Primary calls to action use a light pink fill with near-black text. Hero copy is almost white. Later text uses near-black and muted grey. Transparent computed backgrounds indicate inheritance or underlying media; they are not white surface measurements.

## Typography
Two named custom families split headline and reading roles. The declared fallback stack includes Inter, platform sans fonts, Helvetica and Arial. Computed fontFamily reports a CSS declaration, not proof of the exact face rasterised. Font files and reuse rights were not downloaded or verified.

## Layout & Spacing
Observed navigation controls have 8px by 16px padding, some links 8px by 12px. CTA horizontal padding is 16px or 24px depending on context. The hero combines product photography and text in one large frame. Dimensions are observations at one desktop viewport, not a complete breakpoint specification.

## Elevation & Depth
Photography supplies depth. The observed primary CTA has a flat solid fill. Do not infer a complete shadow scale from this page.

## Shapes
Capsule controls dominate the header and audience selector. Some lower actions compute to square corners. These values should be recorded as source details, not copied indiscriminately into Money Ops.

## Components
Primary-action follows the recorded accent/ink pair and capsule radius. Other observed patterns: expandable navigation, audience selector, customer carousel, integrations list and locale selector. Their hidden, disabled, focus and mobile states have not all been sampled.

## Do's and Don'ts
- Borrow strong hierarchy and concise action wording for Money Ops.
- Keep the actual decision as the focal artifact; do not add a marketing hero to the calculator.
- Do not reuse Pleo logos, customer claims or custom font files.
- Do not call this a Context.dev extraction or a complete all-site token inventory.

Pending Context.dev pass: web-styleguide, web-fonts, get-brand, web-scrape-images and screenshots at desktop/mobile. Keep raw tool responses beside this reference and reconcile verified differences.
