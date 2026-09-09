# Money Ops logo

The user selected an original folded-document mark with an M-shaped opening on 9 September 2026. The starting point is the app's policy reader: a document becomes something a person can understand and act on. I prefer a document-derived monogram to a coin or shield because it describes the actual entry point.

## Construction

- One solid silhouette, with a folded upper-right corner and clipped lower corners.
- The M and fold are transparent apertures, so the mark works on different surfaces.
- Use the existing primary green, `#304b3c`, or a single contrasting ink.
- Keep the mark bare. No enclosing decorative tile, glow, gradient or shadow.
- Preserve the complete silhouette and verify the opening at 16, 24 and 40 pixels.
- Platform app-icon files may have a square background, as required by their destination.

## Tuning

The isolated studio lives in `mockups/money-ops-logo-lab`. DialKit changes the document geometry and opening live. It is development tooling and is not imported into the financial app. Export the chosen SVG, PNG and settings JSON from the studio.

The app's `mockups/finance-native/Logo.js` implements the default geometry using `react-native-svg`. A unique mask ID keeps multiple instances independent. Its size and ink can be set without changing the paths.

Changing controls in the studio does not rewrite the app's logo. A chosen configuration must be deliberately applied to the native component and exported assets.

## Verification

The studio and Expo web builds passed. Browser checks covered three presets, all five geometry sliders, the color field, saved versions surviving reload, and successful SVG, PNG and JSON export feedback. The studio was inspected at desktop and 390px widths, and the mark was inspected at 16, 24, 40 and 1024 pixels. The app's web header renders the native SVG component. Native iOS and Android builds were not run.

The final design review checked the supplied anti-slop rules against this bounded logo change and studio. Corrected findings: generic outline construction, an M that read as mountains, a shifted mask, distorted PNG proportions, an unnecessary hero layout, repeated section labels, and inconsistent studio spacing. The result uses a bare single-color mark, transparent negative space, unique mask IDs, visible content, stationary hover states and the existing interface typography. The small marks remain complete, with room around all edges. Marketing-only rules for pricing, testimonials, photography, footer wordmarks and atmospheric heroes do not apply to this working tool.

`app.json` now references the white 1024px icon and the generated favicon. The transparent SVG and PNG remain available separately for use on other surfaces.
