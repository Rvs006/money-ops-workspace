---
version: alpha
name: Feather live-site reference
source: https://feather-insurance.com/
observed: 2026-09-08
method: browser screenshot and computed DOM styles
status: partial observed extraction; Context.dev tools unavailable in this session
colors:
  ink: "#26262E"
  surface: "#FFFFFF"
  body: "#3F3F47"
  secondary: "#696971"
  tertiary: "#32334B"
typography:
  hero: {fontFamily: Mona Sans, fontSize: 44px, fontWeight: 700, lineHeight: 56px}
  headline: {fontFamily: Mona Sans, fontSize: 24px, fontWeight: 700, lineHeight: 34px}
  body: {fontFamily: Lato, fontSize: 16px, fontWeight: 400, lineHeight: 24px}
  feature-title: {fontFamily: Lato, fontSize: 18px, fontWeight: 700, lineHeight: 24px}
  button: {fontFamily: Lato, fontSize: 16px, fontWeight: 700, lineHeight: 24px}
rounded:
  control: 8px
spacing:
  button-x: 24px
  locale-x: 12px
  locale-y: 10px
components:
  primary-action:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: 24px
---

## Brand & Style
Observed public insurance homepage. It explains the product in everyday language and uses domestic photography. Policy categories are recognisable by purpose. The cookie panel dimmed the captured hero, so the screenshot's apparent colours are not reliable tokens; values above come from computed styles.

## Colors
The principal action and headline ink are #26262E. Body copy uses #3F3F47, with #696971 on supporting descriptions. White surfaces and dark text provide the main contrast. No unmeasured accent palette is invented here.

## Typography
Mona Sans is declared for the hero and major headings. Lato carries body copy, navigation and controls. These names and sizes are read from live computed styles. They are source references, not new Money Ops dependencies.

## Layout & Spacing
The desktop hero has copy beside a rounded photograph. The body groups policy links into Health, Basics and Life, then offers an assessment route. Button horizontal padding is 24px, with an 8px corner radius. Navigation buttons use 24px vertical padding.

## Elevation & Depth
The observed composition relies on white space, photographs and grouped content. Do not infer the app's modal, shadow or motion tokens from the marketing page.

## Shapes
Primary controls use modest 8px radii. This is a useful control-scale reference for Money Ops, where compact fields and in-page disclosures matter more than large panels.

## Components
Primary-action uses dark ink and white type. Other observed patterns include expandable navigation, policy lists, an assessment entry, carousel controls, cookie preferences and country selection. Not every interaction state was exercised.

## Do's and Don'ts
- Borrow plain descriptions of what is covered and excluded.
- Keep policy conditions next to benefits and source wording one action away.
- Do not inherit German policy terms, claims or privacy statements into an Indian finance example.
- Do not copy customer reviews or imply partnership.
- Treat this as partial browser evidence until Context.dev can run.

Pending Context.dev pass: web-styleguide, web-fonts, get-brand, web-scrape-images and screenshots at desktop/mobile; structured extraction of components, token roles and motion values where the service exposes them.
