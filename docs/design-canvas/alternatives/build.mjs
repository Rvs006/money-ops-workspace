// Generates the Money Ops alternative-mockup artboards (.dc.html) from the app's own tokens.
// Sketch strokes come from rough.js (the same engine family Drawably uses); the mark is the approved SVG, paths verbatim.
import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';
const require = createRequire(import.meta.url);
const roughPkg = require('../../../mockups/finance-native/node_modules/roughjs');
const rough = roughPkg.default || roughPkg;
const G = rough.generator();

// Tokens lifted from mockups/finance-native/app.web.css
const T = { ink:'#182640', muted:'#50617b', blue:'#1947c7', paper:'#ffffff', wash:'#f1f5ff', line:'#bdcbea', field:'#e9e9e9', edge:'#c5c5c5', error:'#8a3028' };
const DK = { paper:'#191919', wash:'#252525', ink:'#f2f2f2', muted:'#b9b9b9', blue:'#a9c0ff', field:'#353535', edge:'#686868', onAction:'#151515' };
const FONT = "system-ui, -apple-system, 'Segoe UI', sans-serif";

const paths = (drawable, cap = 'round') => G.toPaths(drawable).map(p =>
  `<path d="${p.d}" fill="${p.fill || 'none'}" stroke="${p.stroke}" stroke-width="${p.strokeWidth}" stroke-linecap="${cap}" stroke-linejoin="round"></path>`).join('');
const overlay = (w, h, inner, extra = '') => `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true" style="position:absolute;left:0;top:0;overflow:visible;pointer-events:none;${extra}">${inner}</svg>`;
// Sketched rectangle outline, Drawably-like: 2px round stroke, mild roughness.
const sketchRect = (w, h, o = {}) => overlay(w, h, paths(G.rectangle(1, 1, w - 2, h - 2, { roughness: o.roughness ?? .4, bowing: .6, seed: o.seed ?? 3, stroke: o.stroke ?? T.blue, strokeWidth: o.sw ?? 2, fill: o.fill, fillStyle: o.fillStyle ?? 'hachure', hachureGap: o.gap ?? 6, fillWeight: o.fw ?? 1, hachureAngle: -41 })));
const sketchLine = (w, o = {}) => overlay(w, 4, paths(G.line(0, 2, w, 2, { roughness: o.roughness ?? .9, bowing: 1.2, seed: o.seed ?? 5, stroke: o.stroke ?? T.blue, strokeWidth: o.sw ?? 2 })));
const sketchCircle = (d, o = {}) => overlay(d, d, paths(G.ellipse(d / 2, d / 2, d - 3, d - 3, { roughness: o.roughness ?? .7, seed: o.seed ?? 11, stroke: o.stroke ?? T.blue, strokeWidth: o.sw ?? 2 })));
const hatch = (w, h, o = {}) => overlay(w, h, paths(G.rectangle(0, 0, w, h, { roughness: .35, seed: o.seed ?? 7, stroke: 'none', fill: o.fill ?? T.ink, fillStyle: 'hachure', hachureGap: o.gap ?? 5, fillWeight: 1, hachureAngle: -41 })));

const chevron = (rot = 0) => `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex:none;transform:rotate(${rot}deg)"><path d="M6 3.5 10.5 8 6 12.5"></path></svg>`;

// Approved mark. viewBox and every path are verbatim from public/money-ops-logo-static.svg; only fills are parameters.
const DOC_OUTER = 'm90.5 15.3h-31.9c-2.3 0-4.6 2-4.6 4.4v67.2c0 2.7 1.9 4.8 4.6 4.8h42c2.6 0 4.6-1.9 4.6-4.5v-56.9l-14.7-15z';
const DOC_INNER = 'm89.6 16.6h-30.9c-1.5 0-3.1 1.2-3.1 3.3v66.2c0 2.3 0.9 4.1 3.1 4.2h41.9c1.9 0 3.2-1.3 3.2-3.3v-56.2l-14.2-14.2z';
const DOC_FOLD = 'm89.6 16.3v11.5c0 1.5 1.3 2.9 2.9 2.9h11.4l-14.3-14.4z';
const RAIL = 'm112.2 60.4h-65.1c-0.6 0-1.3 0.5-1.3 1.2v6.6c0 0.8 0.6 1.1 1.2 1.1h65.2c0.6 0 1.2-0.4 1.2-1v-6.8c0-0.6-0.6-1.1-1.2-1.1z';
const RAIL_LINE = 'm45.9 63.2v3h67.5v-3h-67.5z';
const RUPEE = 'm68.2 22.9h2.6l0.5-1.1h-8.6l-0.5 1.3h1.6c1.7 0 2.8 0.5 3 1.5h-4.2l-0.8 1.6h5.1c-0.2 1.3-1.4 2-3.3 2h-1.2v1.6c1.6 1.9 3.3 3.8 4.8 6.5h2.2c-1.5-2.3-3-4.3-4.7-6.7 2.2 0 4.1-1.2 4.4-3.4h1.8l0.5-1.4h-2.3c-0.1-0.8-0.4-1.4-0.9-1.9z';
let logoN = 0;
function logo(w, v = {}) {
  const id = 'rail' + (++logoN);
  const c = { sheet:'#CEDDF5', doc:'#386ADA', fold:'#CEDDF5', rail:['#A9BFEE','#4E79DA','#254BBF'], railLine:'#F3F6FC', rupee:'#FFFFFF', ...v };
  const h = +(w * 1.1).toFixed(1);
  const body = v.sketch
    ? paths(G.path(DOC_INNER, { roughness: .5, bowing: .8, seed: 21, stroke: c.doc, strokeWidth: 1.1, fill: 'none' }))
    : `<path fill="${c.sheet}" d="${DOC_OUTER}"></path><path fill="${c.doc}" d="${DOC_INNER}"></path><path fill="${c.fold}" d="${DOC_FOLD}"></path>`;
  return `<svg width="${w}" height="${h}" viewBox="40 10 80 88" aria-hidden="true" style="display:block;flex:none"><defs><linearGradient id="${id}" x1="45.89" x2="113.4" y1="-3.793" y2="-3.793" gradientTransform="matrix(1 0 0 -1 0 61.85)" gradientUnits="userSpaceOnUse"><stop stop-color="${c.rail[0]}" offset=".075"></stop><stop stop-color="${c.rail[1]}" offset=".574"></stop><stop stop-color="${c.rail[2]}" offset=".916"></stop></linearGradient></defs>${body}<path fill="url(#${id})" d="${RAIL}"></path><path fill="${c.railLine}" d="${RAIL_LINE}"></path><path fill="${c.rupee}" d="${RUPEE}"></path></svg>`;
}

const doc = (title, w, h, bg, body, extraCss = '') => `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
  <style>
    body { margin: 0; font-family: ${FONT}; }
    a { color: ${T.blue}; text-decoration: none; } a:hover { color: ${T.ink}; }
    ${extraCss}
  </style>
</helmet>
<div style="width: ${w}px; min-height: ${h}px; background: ${bg}; color: ${T.ink}; font-size: 16px; line-height: 1.5; font-family: ${FONT}; box-sizing: border-box;">
${body}
</div>
</x-dc>
</body>
</html>
`;

// Shared pieces (exact app values: header 24/32 padding, logo 64x70.4, brand 24/700, nav 14/600, 48px rows)
const header = (c = T, opts = {}) => `
<header style="max-width: 1120px; margin: 0 auto; display: flex; align-items: center; gap: 24px; padding: 24px 32px;">
  <div style="display: flex; align-items: center; gap: 12px; font-weight: 700; font-size: 24px; color: ${c.ink};">${logo(64, opts.logo)}<span>Money Ops</span></div>
  <div style="margin-left: auto; display: flex; align-items: center; gap: 16px;">
    <span style="color: ${c.muted}; font-size: 14px;">Editable sample numbers</span>
    <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; min-width: 100px; min-height: 48px; padding: 8px; font-size: 14px; color: ${c.ink};"><span>${opts.dark ? 'Dark' : 'Light'}</span><span style="display: flex; align-items: center; width: 40px; height: 24px; padding: 4px; border-radius: 12px; background: ${c.edge}; box-sizing: border-box;"><span style="width: 16px; height: 16px; border-radius: 50%; background: ${c.ink}; transform: translateX(${opts.dark ? 16 : 0}px);"></span></span></div>
  </div>
</header>`;
const NAV = [['Understand term life', true], ['Compare loans', false], ['Prepay or invest', false]];
const nav = (c = T, o = {}) => `
<nav style="max-width: 1120px; margin: 0 auto; padding: 12px 32px; display: flex; align-items: center; gap: 32px;">
  ${NAV.map(([t, on]) => `<div style="position: relative; display: inline-flex; align-items: center; min-height: 48px; font-size: 14px; font-weight: ${on ? 750 : 600}; color: ${on ? c.ink : c.muted};">${t}${on && o.underline ? `<span style="position: absolute; left: 0; right: 0; bottom: 6px; height: 4px;">${sketchLine(o.underlineWidth || 136, { stroke: c.blue })}</span>` : ''}</div>`).join('')}
</nav>`;
const btn = (label, c = T, o = {}) => `<div style="position: relative; display: inline-flex; align-items: center; justify-content: center; min-height: 48px; padding: 12px 24px; border-radius: 12px; background: ${o.outline ? 'transparent' : c.blue}; color: ${o.outline ? c.blue : (o.onAction || c.paper)}; font-weight: 600; font-size: 16px; box-sizing: border-box; ${o.style || ''}">${o.w ? sketchRect(o.w, 48, { seed: o.seed ?? 4, stroke: c.blue, roughness: .35 }) : ''}<span style="position: relative;">${label}</span></div>`;
const disclosure = (label, c = T, open = false) => `<div style="display: flex; align-items: center; gap: 8px; min-height: 48px; padding: 12px 0; font-weight: 600; color: ${c.ink};">${chevron(open ? 90 : 0)}<span>${label}</span></div>`;
const fact = (label, value, c = T, big = 18) => `<div style="display: flex; align-items: baseline; justify-content: space-between; gap: 24px; padding: 8px 0; font-size: 14px;"><span style="color: ${c.muted};">${label}</span><strong style="font-size: ${big}px; font-weight: 700; text-align: right; font-variant-numeric: tabular-nums; color: ${c.ink};">${value}</strong></div>`;
const facts = (c = T) => [['Cover', '₹50,00,000'], ['Premium', '₹15,000 · annual'], ['Policy term', '30 years'], ['Premium payment term', 'Confirm in policy'], ['Next premium due', 'Not entered']].map(([l, v]) => fact(l, v, c)).join('');
const verdict = (c = T, size = 30, items = [['₹22,00,000', 'Potential coverage gap'], ['₹72,00,000', 'Illustrative cover target']]) => `<div style="display: flex; gap: 32px; flex-wrap: wrap;">${items.map(([n, l]) => `<div><strong style="display: block; font-size: ${size}px; font-weight: 700; line-height: 1.15; letter-spacing: -0.015em; color: ${c.blue}; font-variant-numeric: tabular-nums;">${n}</strong><span style="font-size: 14px; color: ${c.muted};">${l}</span></div>`).join('')}</div>`;
const field = (label, value, c = T, o = {}) => `<label style="display: grid; gap: 8px; font-size: 14px; font-weight: 600; min-width: 0; color: ${c.ink};"><span style="display: flex; align-items: baseline; justify-content: space-between; gap: 8px;">${label}<small style="font-size: 12px; font-weight: 400; color: ${c.muted};">${o.status || 'Required'}</small></span><span style="display: flex; align-items: center; min-height: 48px; padding: 12px; border-radius: 8px; background: ${c.field}; border: 1px solid ${c.edge}; font-size: 16px; font-weight: 400; color: ${o.placeholder ? c.muted : c.ink}; box-sizing: border-box;">${value}${o.select ? `<span style="margin-left: auto; color: ${c.ink};">${chevron(90)}</span>` : ''}</span></label>`;
const sketchField = (label, value, w, c = T, o = {}) => `<label style="display: grid; gap: 8px; font-size: 14px; font-weight: 600; min-width: 0; color: ${c.ink};"><span style="display: flex; align-items: baseline; justify-content: space-between; gap: 8px;">${label}<small style="font-size: 12px; font-weight: 400; color: ${c.muted};">${o.status || 'Required'}</small></span><span style="position: relative; display: flex; align-items: center; min-height: 48px; padding: 12px 14px; font-size: 16px; font-weight: 400; color: ${o.placeholder ? c.muted : c.ink}; box-sizing: border-box;">${sketchRect(w, 48, { seed: o.seed ?? 8, roughness: .3, sw: 1.5, stroke: c.blue })}<span style="position: relative;">${value}</span>${o.select ? `<span style="position: relative; margin-left: auto; color: ${c.blue};">${chevron(90)}</span>` : ''}</span></label>`;
const why = (c = T) => `<p style="margin: 0; font-size: 14px; color: ${c.muted};">Why: 12 × annual income + existing liabilities. This target excludes assets and inflation.</p>`;
const HEAD = 'Your cover is below this rule-of-thumb target.';
const SUB = 'From your entries. Confirm active cover with your insurer.';

// ---------- Main: current design, reproduced ----------
const main = doc('Current', 1440, 1280, T.paper, `
${header()}
${nav()}
<main style="max-width: 1120px; margin: 0 auto; padding: 32px;">
  <div style="display: grid; gap: 12px; margin-bottom: 24px;">
    <h1 style="margin: 0; font-size: 36px; line-height: 1.18; letter-spacing: -0.02em; font-weight: 650;">Make sense of your policy.</h1>
    <p style="margin: 0; color: ${T.muted};">Upload a term-life policy or enter the essentials.</p>
  </div>
  <section style="margin-top: 64px;">
    <div style="display: flex; gap: 16px; align-items: baseline; margin-bottom: 32px;"><span style="color: ${T.blue}; font-size: 14px; font-weight: 700;">01</span><h2 style="margin: 0; font-size: 24px; line-height: 1.3; font-weight: 650;">Your policy</h2></div>
    <div style="display: grid; gap: 16px; justify-items: start;">
      ${btn('Upload policy PDF')}
      <p style="margin: 0; font-size: 14px; color: ${T.muted};">Text PDF, up to 5 MB. Stays in this browser</p>
      ${disclosure('File support &amp; privacy')}
    </div>
    ${disclosure('Policy details')}
    <section style="margin-top: 32px; background: ${T.wash}; padding: 32px; border-radius: 12px; display: grid; gap: 24px;">
      <h3 style="margin: 0; font-size: 24px; line-height: 1.3; font-weight: 650; color: ${T.blue};">${HEAD}</h3>
      <p style="margin: 0;">${SUB}</p>
      <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 24px;">${facts()}</div>
      ${verdict()}
      ${why()}
      ${disclosure('Assumptions and checks')}
    </section>
  </section>
</main>`);

// ---------- Option A: Sketchbook (texture axis) ----------
const optionA = doc('Sketchbook', 1440, 1400, T.paper, `
${header()}
${nav(T, { underline: true, underlineWidth: 137 })}
<main style="max-width: 1120px; margin: 0 auto; padding: 32px;">
  <div style="display: grid; gap: 12px; margin-bottom: 24px;">
    <h1 style="margin: 0; font-size: 36px; line-height: 1.18; letter-spacing: -0.02em; font-weight: 650;">Make sense of your policy.</h1>
    <p style="margin: 0; color: ${T.muted};">Upload a term-life policy or enter the essentials.</p>
  </div>
  <section style="margin-top: 56px;">
    <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 24px;"><span style="position: relative; display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; color: ${T.blue}; font-size: 13px; font-weight: 700;">${sketchCircle(34)}<span style="position: relative;">01</span></span><h2 style="margin: 0; font-size: 24px; line-height: 1.3; font-weight: 650;">Your policy</h2></div>
    <div style="position: relative; min-height: 330px; padding: 24px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 32px; align-items: start; box-sizing: border-box;">
      ${sketchRect(1056, 330, { seed: 12 })}
      <div style="position: relative; display: grid; gap: 16px; justify-items: start;">
        ${btn('Upload policy PDF')}
        <p style="margin: 0; font-size: 14px; color: ${T.muted};">Text PDF, up to 5 MB. Stays in this browser</p>
        ${disclosure('File support &amp; privacy')}
        ${disclosure('Policy details', T, true)}
      </div>
      <div style="position: relative; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px;">
        ${sketchField('Sum assured (₹)', '5000000', 240, T, { seed: 31 })}
        ${sketchField('Policy term (years)', '30', 240, T, { seed: 32 })}
        ${sketchField('Premium amount (₹)', '15000', 240, T, { seed: 33 })}
        ${sketchField('Frequency', 'annual', 240, T, { seed: 34, select: true })}
        ${sketchField('Policyholder age', '30', 240, T, { seed: 35 })}
        ${sketchField('Next premium due date', 'dd/mm/yyyy', 240, T, { seed: 36, status: 'Optional', placeholder: true })}
      </div>
    </div>
    <section style="position: relative; min-height: 520px; margin-top: 32px; padding: 32px; display: grid; gap: 24px; align-content: start; box-sizing: border-box;">
      ${sketchRect(1056, 520, { seed: 19, fill: T.wash, fillStyle: 'solid' })}
      <h3 style="position: relative; margin: 0; font-size: 24px; line-height: 1.3; font-weight: 650; color: ${T.blue};">${HEAD}</h3>
      <p style="position: relative; margin: 0;">${SUB}</p>
      <div style="position: relative; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 32px;">
        ${[['Cover', '₹50,00,000', 41], ['Premium', '₹15,000 · annual', 42], ['Policy term', '30 years', 43], ['Premium payment term', 'Confirm in policy', 44], ['Next premium due', 'Not entered', 45]].map(([l, v, s]) => `<div style="position: relative;">${fact(l, v)}<span style="position: absolute; left: 0; right: 0; bottom: -2px; height: 4px;">${sketchLine(480, { stroke: T.line, sw: 1, seed: s, roughness: .6 })}</span></div>`).join('')}
      </div>
      <div style="position: relative; display: flex; gap: 32px; flex-wrap: wrap;">
        <div><strong style="position: relative; display: inline-block; padding: 2px 6px; margin: 0 -6px; font-size: 30px; font-weight: 700; line-height: 1.15; letter-spacing: -0.015em; color: ${T.blue}; font-variant-numeric: tabular-nums;"><span style="position: absolute; inset: 4px 0; opacity: .28;">${hatch(212, 30, { fill: T.blue, gap: 6, seed: 51 })}</span><span style="position: relative;">₹22,00,000</span></strong><span style="display: block; font-size: 14px; color: ${T.muted};">Potential coverage gap</span></div>
        <div><strong style="display: block; font-size: 30px; font-weight: 700; line-height: 1.15; letter-spacing: -0.015em; color: ${T.blue}; font-variant-numeric: tabular-nums; padding: 2px 0;">₹72,00,000</strong><span style="font-size: 14px; color: ${T.muted};">Illustrative cover target</span></div>
      </div>
      <div style="position: relative;">${why()}</div>
      <div style="position: relative;">${disclosure('Assumptions and checks')}</div>
    </section>
  </section>
</main>`);

// ---------- Option B: Ledger (density axis) ----------
const ledgerRow = (l, v, i, c = T) => `<div style="display: grid; grid-template-columns: 1fr auto; align-items: baseline; gap: 24px; padding: 10px 16px; border-radius: 8px; background: ${i % 2 ? 'transparent' : c.wash}; font-size: 14px;"><span style="color: ${c.muted};">${l}</span><strong style="font-size: 16px; font-weight: 700; font-variant-numeric: tabular-nums; color: ${c.ink};">${v}</strong></div>`;
const optionB = doc('Ledger', 1440, 1140, T.paper, `
${header()}
${nav()}
<main style="max-width: 1120px; margin: 0 auto; padding: 32px; display: grid; grid-template-columns: 260px minmax(0, 1fr); gap: 64px; align-items: start;">
  <aside style="display: grid; gap: 24px; padding-top: 8px;">
    ${[['01', 'Your policy', 'Cover, premium, term', true], ['02', 'True cost', 'Rates, fees, financing', false], ['03', 'Surplus funds', 'Buffer, prepay or invest', false]].map(([n, t, s, on]) => `<div style="display: grid; grid-template-columns: 44px 1fr; gap: 12px; align-items: baseline; color: ${on ? T.ink : T.muted};"><strong style="font-size: 30px; font-weight: 650; line-height: 1.15; font-variant-numeric: tabular-nums; color: ${on ? T.blue : T.line};">${n}</strong><div style="display: grid; gap: 2px;"><span style="font-size: 16px; font-weight: ${on ? 700 : 600};">${t}</span><span style="font-size: 12px; color: ${T.muted};">${s}</span></div></div>`).join('')}
  </aside>
  <div style="display: grid; gap: 16px; min-width: 0;">
    <h2 style="margin: 0 0 8px; font-size: 30px; line-height: 1.2; letter-spacing: -0.02em; font-weight: 650;">Your policy</h2>
    <div style="display: flex; align-items: center; gap: 24px; flex-wrap: wrap;">${btn('Upload policy PDF')}<span style="font-size: 14px; color: ${T.muted};">Text PDF, up to 5 MB. Stays in this browser</span></div>
    <div style="display: grid; gap: 0; margin-top: 8px;">
      ${[['Cover', '₹50,00,000'], ['Premium', '₹15,000 · annual'], ['Policy term', '30 years'], ['Policyholder age', '30'], ['Premium payment term', 'Confirm in policy'], ['Next premium due', 'Not entered'], ['Annual income', '₹6,00,000'], ['Existing liabilities', '₹0'], ['Income multiple · rule of thumb', '12 ×']].map(([l, v], i) => ledgerRow(l, v, i)).join('')}
    </div>
    <div style="display: grid; gap: 16px; padding: 24px 16px 0;">
      <h3 style="margin: 0; font-size: 24px; line-height: 1.3; font-weight: 650; color: ${T.blue};">${HEAD}</h3>
      ${verdict(T, 42)}
      ${why()}
      <div style="display: flex; gap: 32px; flex-wrap: wrap;">${disclosure('Assumptions and checks')}${disclosure('Edit policy details')}</div>
    </div>
  </div>
</main>`);

// ---------- Option C: Phone-first (scale axis) ----------
const optionC = doc('Phone', 390, 1040, T.paper, `
<div style="display: grid; grid-template-rows: auto 1fr auto; min-height: 1040px;">
  <header style="display: flex; align-items: center; gap: 8px; padding: 16px;">
    <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 18px;">${logo(48)}<span>Money Ops</span></div>
    <div style="margin-left: auto; display: flex; align-items: center; gap: 8px; min-height: 48px; font-size: 14px;"><span>Light</span><span style="display: flex; align-items: center; width: 40px; height: 24px; padding: 4px; border-radius: 12px; background: ${T.edge}; box-sizing: border-box;"><span style="width: 16px; height: 16px; border-radius: 50%; background: ${T.ink};"></span></span></div>
  </header>
  <main style="padding: 8px 16px 24px; display: grid; gap: 24px; align-content: start;">
    <div style="display: grid; gap: 12px; justify-items: center; text-align: center; padding-top: 8px;">
      ${logo(112)}
      <h1 style="margin: 8px 0 0; font-size: 30px; line-height: 1.18; letter-spacing: -0.02em; font-weight: 650;">Make sense of your policy.</h1>
      <p style="margin: 0; color: ${T.muted};">Upload a term-life policy or enter the essentials.</p>
    </div>
    <div style="display: grid; gap: 8px; justify-items: center;">
      ${btn('Upload policy PDF', T, { style: 'width: 100%;' })}
      <p style="margin: 0; font-size: 14px; color: ${T.muted};">Text PDF, up to 5 MB. Stays in this browser</p>
    </div>
    <section style="background: ${T.wash}; padding: 24px 20px; border-radius: 12px; display: grid; gap: 16px;">
      <h3 style="margin: 0; font-size: 22px; line-height: 1.3; font-weight: 650; color: ${T.blue};">${HEAD}</h3>
      ${verdict(T, 30)}
      <div style="display: grid;">${[['Cover', '₹50,00,000'], ['Premium', '₹15,000 · annual'], ['Policy term', '30 years']].map(([l, v]) => fact(l, v, T, 16)).join('')}</div>
      ${disclosure('Assumptions and checks')}
    </section>
  </main>
  <nav style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); padding: 8px 16px 12px; background: ${T.paper};">
    ${NAV.map(([t, on]) => `<span style="display: flex; align-items: center; justify-content: center; min-height: 44px; font-size: 12px; font-weight: ${on ? 750 : 600}; color: ${on ? T.ink : T.muted}; text-align: center;">${t}</span>`).join('')}
  </nav>
</div>`);

// ---------- Option D: Split workspace (layout axis) ----------
const optionD = doc('Split', 1440, 1140, T.paper, `
${header()}
${nav()}
<main style="max-width: 1120px; margin: 0 auto; padding: 32px; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 48px; align-items: start;">
  <section style="display: grid; gap: 24px; min-width: 0;">
    <div style="display: flex; gap: 16px; align-items: baseline;"><span style="color: ${T.blue}; font-size: 14px; font-weight: 700;">01</span><h2 style="margin: 0; font-size: 24px; line-height: 1.3; font-weight: 650;">Your policy</h2></div>
    <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">${btn('Upload policy PDF')}<span style="font-size: 14px; color: ${T.muted};">Text PDF, up to 5 MB. Stays in this browser</span></div>
    <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px;">
      ${field('Sum assured (₹)', '5000000')}
      ${field('Policy term (years)', '30')}
      ${field('Premium amount (₹)', '15000')}
      ${field('Frequency', 'annual', T, { select: true })}
      ${field('Policyholder age', '30')}
      ${field('Annual income (₹)', '600000', T, { status: 'Optional' })}
      ${field('Existing liabilities (₹)', '0', T, { status: 'Optional' })}
      ${field('Next premium due date', 'dd/mm/yyyy', T, { status: 'Optional', placeholder: true })}
    </div>
    ${disclosure('Insurer, nominee, riders and exclusions')}
    <p style="margin: 0; font-size: 14px; color: ${T.muted};">Every change updates the answer beside it. Nothing is stored.</p>
  </section>
  <section style="background: ${T.wash}; padding: 32px; border-radius: 12px; display: grid; gap: 24px; min-width: 0; position: sticky; top: 24px;">
    <h3 style="margin: 0; font-size: 24px; line-height: 1.3; font-weight: 650; color: ${T.blue};">${HEAD}</h3>
    ${verdict(T, 36)}
    <div style="display: grid; gap: 10px;">
      ${[['Cover you hold', 50, T.blue, false], ['Rule-of-thumb target', 72, T.ink, true]].map(([l, v, col, hatched]) => `<div style="display: grid; grid-template-columns: 150px 1fr 96px; align-items: center; gap: 12px; font-size: 12px; color: ${T.muted};"><span>${l}</span><span style="position: relative; height: 22px;"><span style="position: absolute; left: 0; top: 0; height: 22px; width: ${Math.round(v / 72 * 100)}%; background: ${hatched ? 'transparent' : col}; border-radius: 2px; overflow: hidden;">${hatched ? hatch(430, 22, { fill: T.ink, seed: 9 }) : ''}</span></span><strong style="font-size: 14px; color: ${T.ink}; font-variant-numeric: tabular-nums; text-align: right;">₹${v},00,000</strong></div>`).join('')}
    </div>
    <p style="margin: 0;">${SUB}</p>
    ${why()}
    <div style="display: grid;">${facts()}</div>
    ${disclosure('Assumptions and checks')}
  </section>
</main>`);

// ---------- Marks: the approved mark and explorations spun from its own geometry ----------
const tile = (bg, inner, caption, o = {}) => `<div style="display: grid; gap: 12px; justify-items: start; min-width: 0;"><div style="display: flex; align-items: ${o.align || 'center'}; justify-content: center; gap: 12px; width: 100%; height: ${o.h || 180}px; background: ${bg}; border-radius: 12px;">${inner}</div><span style="font-size: 12px; color: ${T.muted}; line-height: 1.5;">${caption}</span></div>`;
const MONO = { sheet: T.ink, doc: T.ink, fold: T.paper, rail: [T.ink, T.ink, T.ink], railLine: T.paper, rupee: T.paper };
const REV = { sheet: '#c9d6f5', doc: '#ffffff', fold: '#c9d6f5', rail: ['#a9c0ff', '#e2e9fb', '#a9c0ff'], railLine: T.blue, rupee: T.blue };
const marks = doc('Marks', 1240, 900, T.paper, `
<div style="padding: 40px 48px; display: grid; gap: 40px;">
  <div style="display: grid; gap: 8px;"><h2 style="margin: 0; font-size: 24px; line-height: 1.3; font-weight: 650;">The mark, and explorations from the same geometry</h2><p style="margin: 0; font-size: 14px; color: ${T.muted};">Approved flat scanner/rupee stays as it is. Everything below reuses its paths; only fills, weight and lockup change.</p></div>
  <div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 32px;">
    ${tile(T.paper, `${logo(128)}`, 'Approved · unchanged', { border: true })}
    ${tile(T.paper, `<div style="display: flex; align-items: center; gap: 12px; font-weight: 700; font-size: 24px;">${logo(64)}<span>Money Ops</span></div>`, 'Header lockup · current, 64 × 70.4 with 24/700', { border: true })}
    ${tile(T.paper, `<div style="display: grid; justify-items: center; gap: 12px; font-weight: 650; font-size: 20px; letter-spacing: -0.01em;">${logo(80)}<span>Money Ops</span></div>`, 'Stacked lockup · splash, app icon sheet', { border: true })}
    ${tile(T.paper, `<div style="display: flex; align-items: flex-end; gap: 20px;">${logo(16)}${logo(24)}${logo(32)}${logo(48)}</div>`, 'Small sizes · 16, 24, 32, 48. Rupee holds to 24; rail reads at 16', { border: true, align: 'center' })}
  </div>
  <div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 32px;">
    ${tile(T.paper, logo(128, MONO), 'Mono ink · single-colour print, stamps, PDF export', { border: true })}
    ${tile(T.blue, logo(128, REV), 'Reversed on action blue · buttons, OG image', {})}
    ${tile(DK.paper, logo(128), 'On ink · dark theme, approved colours hold', {})}
    ${tile(T.paper, logo(128, { sketch: true, doc: T.blue }), 'Drawably outline · pen sketch of the document, rail and rupee solid', { border: true })}
  </div>
  <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 32px;">
    ${tile(T.wash, `<div style="display: flex; align-items: center; gap: 12px; font-weight: 700; font-size: 20px;">${logo(40)}<span>Money Ops</span></div>`, 'On wash · result panels, waitlist header (40 × 44 with 20/700)', { h: 120 })}
    ${tile(DK.paper, `<div style="display: flex; align-items: center; gap: 12px; font-weight: 700; font-size: 24px; color: ${DK.ink};">${logo(64)}<span>Money Ops</span></div>`, 'Dark header lockup · ink text #f2f2f2, mark unchanged', { h: 120 })}
  </div>
</div>`);

// ---------- Controls: Drawably treatments side by side ----------
const col = (title, note, inner) => `<div style="display: grid; gap: 20px; align-content: start; min-width: 0;"><div style="display: grid; gap: 4px;"><h3 style="margin: 0; font-size: 18px; font-weight: 650;">${title}</h3><p style="margin: 0; font-size: 12px; color: ${T.muted}; line-height: 1.5;">${note}</p></div>${inner}</div>`;
const toggle = (on, sketch) => `<span style="position: relative; display: flex; align-items: center; width: 44px; height: 24px; padding: 4px; border-radius: 12px; background: ${sketch ? 'transparent' : T.edge}; box-sizing: border-box;">${sketch ? overlay(44, 24, paths(G.rectangle(1, 1, 42, 22, { roughness: .4, seed: 61, stroke: T.blue, strokeWidth: 1.5 }))) : ''}<span style="position: relative; width: 16px; height: 16px; border-radius: 50%; background: ${sketch ? T.blue : T.ink}; transform: translateX(${on ? 20 : 0}px);"></span></span>`;
const checkbox = (sketch, checked) => `<span style="position: relative; display: inline-flex; width: 22px; height: 22px; align-items: center; justify-content: center; border-radius: 4px; ${sketch ? '' : `border: 1px solid ${T.edge}; background: ${T.field};`}">${sketch ? overlay(22, 22, paths(G.rectangle(1, 1, 20, 20, { roughness: .5, seed: 62, stroke: T.blue, strokeWidth: 1.5 })) + (checked ? paths(G.path('M5 11 L9.5 15.5 L17 6.5', { roughness: .6, seed: 63, stroke: T.blue, strokeWidth: 2 })) : '')) : (checked ? `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="${T.ink}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5"></path></svg>` : '')}</span>`;
const range = (sketch) => `<span style="position: relative; display: block; height: 44px;">${sketch
  ? overlay(355, 44, paths(G.line(0, 22, 355, 22, { roughness: .8, bowing: 1, seed: 64, stroke: T.line, strokeWidth: 3 })) + paths(G.line(0, 22, 199, 22, { roughness: .8, bowing: 1, seed: 64, stroke: T.blue, strokeWidth: 3 })) + paths(G.ellipse(199, 22, 16, 16, { roughness: .5, seed: 65, stroke: T.blue, strokeWidth: 2, fill: T.paper, fillStyle: 'solid' })))
  : `<span style="position: absolute; left: 0; right: 0; top: 20px; height: 4px; border-radius: 2px; background: ${T.edge};"></span><span style="position: absolute; left: 0; width: 56%; top: 20px; height: 4px; border-radius: 2px; background: ${T.blue};"></span><span style="position: absolute; left: calc(56% - 8px); top: 14px; width: 16px; height: 16px; border-radius: 50%; background: ${T.blue};"></span>`}</span>`;
const controls = doc('Controls', 1240, 900, T.paper, `
<div style="padding: 40px 48px; display: grid; gap: 32px;">
  <div style="display: grid; gap: 8px;"><h2 style="margin: 0; font-size: 24px; line-height: 1.3; font-weight: 650;">Drawably control treatments</h2><p style="margin: 0; font-size: 14px; color: ${T.muted};">Same tokens, same 48px floor. Three ways the pen can show up in a financial form. Mix per role rather than choosing one column.</p></div>
  <div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 40px;">
    ${col('Current · grey box', 'Solid grey editable box, sketch only on buttons and cards. Reads as a form first.', `
      ${field('Sum assured (₹)', '5000000')}
      ${field('Frequency', 'annual', T, { select: true, status: 'Default · editable' })}
      <div style="display: grid; gap: 12px; font-size: 14px; font-weight: 600;"><span style="display: flex; justify-content: space-between;">Income multiple<strong style="color: ${T.blue}; font-variant-numeric: tabular-nums;">12 ×</strong></span>${range(false)}</div>
      <div style="display: flex; gap: 24px; align-items: center; font-size: 14px;"><span style="display: flex; gap: 8px; align-items: center;">${checkbox(false, true)} Use ₹50,00,000</span>${toggle(true, false)}</div>
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">${btn('Review my term-life cover')}<span style="color: ${T.blue}; font-weight: 600;">+ Add third offer</span></div>`)}
    ${col('Sketched box', 'Pen outline on paper, 1.5px, roughness .3. Lighter page, but the box must stay closed enough to read as a field.', `
      ${sketchField('Sum assured (₹)', '5000000', 355, T, { seed: 71 })}
      ${sketchField('Frequency', 'annual', 355, T, { seed: 72, select: true, status: 'Default · editable' })}
      <div style="display: grid; gap: 12px; font-size: 14px; font-weight: 600;"><span style="display: flex; justify-content: space-between;">Income multiple<strong style="color: ${T.blue}; font-variant-numeric: tabular-nums;">12 ×</strong></span>${range(true)}</div>
      <div style="display: flex; gap: 24px; align-items: center; font-size: 14px;"><span style="display: flex; gap: 8px; align-items: center;">${checkbox(true, true)} Use ₹50,00,000</span>${toggle(true, true)}</div>
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">${btn('Review my term-life cover', T, { outline: true, w: 244, seed: 73 })}<span style="color: ${T.blue}; font-weight: 600;">+ Add third offer</span></div>`)}
    ${col('Pen baseline', 'One drawn line under the value, no box. Quietest; needs the label above to carry the affordance.', `
      ${[['Sum assured (₹)', '5000000', 81, 'Required', false], ['Frequency', 'annual', 82, 'Default · editable', true]].map(([l, v, s, st, sel]) => `<label style="display: grid; gap: 8px; font-size: 14px; font-weight: 600;"><span style="display: flex; align-items: baseline; justify-content: space-between; gap: 8px;">${l}<small style="font-size: 12px; font-weight: 400; color: ${T.muted};">${st}</small></span><span style="position: relative; display: flex; align-items: center; min-height: 48px; padding: 12px 4px; font-size: 16px; font-weight: 400;">${v}${sel ? `<span style="margin-left: auto; color: ${T.blue};">${chevron(90)}</span>` : ''}<span style="position: absolute; left: 0; right: 0; bottom: 2px; height: 4px;">${sketchLine(355, { stroke: T.blue, sw: 1.5, seed: s, roughness: .7 })}</span></span></label>`).join('')}
      <div style="display: grid; gap: 12px; font-size: 14px; font-weight: 600;"><span style="display: flex; justify-content: space-between;">Income multiple<strong style="color: ${T.blue}; font-variant-numeric: tabular-nums;">12 ×</strong></span>${range(true)}</div>
      <div style="display: flex; gap: 24px; align-items: center; font-size: 14px;"><span style="display: flex; gap: 8px; align-items: center;">${checkbox(true, true)} Use ₹50,00,000</span>${toggle(true, true)}</div>
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;"><div style="position: relative; display: inline-flex; align-items: center; justify-content: center; min-height: 48px; padding: 12px 24px; color: ${T.ink}; font-weight: 600; box-sizing: border-box;"><span style="position: absolute; inset: 0; opacity: .35;">${hatch(244, 48, { fill: T.blue, gap: 6, seed: 83 })}</span>${sketchRect(244, 48, { seed: 84, roughness: .35 })}<span style="position: relative;">Review my term-life cover</span></div><span style="color: ${T.blue}; font-weight: 600;">+ Add third offer</span></div>`)}
  </div>
</div>`);

for (const [name, html] of [['Main', main], ['OptionA', optionA], ['OptionB', optionB], ['OptionC', optionC], ['OptionD', optionD], ['Marks', marks], ['Controls', controls]]) {
  writeFileSync(`${name}.dc.html`, html);
  console.log(name, html.length);
}
