import { createDialKit, createDialRoot } from "dialkit/vanilla";
import "dialkit/vanilla/styles.css";
import "./styles.css";

const variants = [
  ["Baseline", "/assets/baseline.svg", "Current folded mark"],
  ["Poise", "/assets/poise.png", "Unequal forms held in balance"],
  ["Converge", "/assets/converge.png", "Separate decisions, one structure"],
  ["Keystone", "/assets/keystone.png", "A central decision holds the whole"],
];
const stage = document.querySelector("#stage");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
let current = Math.max(0, Math.min(3, (Number(new URLSearchParams(location.search).get("v")) || 2) - 1));
let mode = reduceMotion ? "static" : "dots";
let image, root, frame, raf = 0, last = 0, points = [], ripples = [], pointer = null;

const dial = createDialKit("Dot field", {
  dotSize: [1.4, 0.8, 5, 0.1], spacing: [3, 2, 10, 1], cursorRadius: [90, 30, 180, 1], cursorStrength: [600, 50, 1600, 10],
  springBack: [16, 2, 42, 1], rippleStrength: [900, 50, 2000, 10], rippleSpeed: [180, 40, 480, 1], duration: [600, 100, 1600, 10], renderWidth: [68, 45, 82, 1],
  speedMultiplier: { type: "select", options: ["1", "0.5", "0.25", "2"] },
}, { id: "money-ops-symbol-control-v2", persist: true });

function page() {
  const [name, file, note] = variants[current];
  return `<div class="shell"><header><strong>Money Ops</strong><span>Symbol prototypes</span></header><div class="study"><section class="context"><h1>${name}</h1><p>${note}. Move your pointer across it; click for a ripple.</p><div class="mode" role="group" aria-label="Render mode"><button data-mode="dots" class="active" ${reduceMotion ? "disabled" : ""}>Dots</button><button data-mode="static">Solid</button></div></section><section class="canvas-wrap"><img id="fallback" alt="${name} symbol"/><canvas id="mark-canvas" aria-label="Interactive ${name} symbol"></canvas><p id="loading">Loading symbol...</p></section><aside class="dial"><p>Interaction values</p><div id="dial-root"></div></aside></div><section class="utility"><div class="small"><span>Small icon</span><img id="small-mark" alt=""/></div><div><a id="download" download>Download original</a><button id="save">Save JSON config</button></div><p id="saved-status" aria-live="polite"></p></section></div><nav class="proto-picker" aria-label="Prototype variants"><span class="proto-picker-highlight" aria-hidden="true"></span>${variants.map(([n], i) => `<button class="proto-picker-item" ${i === current ? 'data-active aria-current="true"' : ''}>${n}</button>`).join("")}<span class="proto-picker-divider" aria-hidden="true"></span><button class="proto-picker-item proto-picker-replay" aria-label="Replay animation (R)" ${reduceMotion ? "disabled" : ""}>&#8635;</button></nav>`;
}

function mount() {
  cancelAnimationFrame(raf); root?.destroy?.(); mode = reduceMotion ? "static" : "dots"; points = []; ripples = []; pointer = null; image = undefined;
  stage.innerHTML = page();
  const img = document.querySelector("#fallback"), small = document.querySelector("#small-mark"), link = document.querySelector("#download");
  img.src = variants[current][1]; small.src = variants[current][1]; link.href = variants[current][1]; link.textContent = "Download original";
  img.onload = () => setup(img); img.onerror = () => { document.querySelector("#loading").textContent = "Image not found in public/assets."; };
  root = createDialRoot({ mode: "inline", target: document.querySelector("#dial-root"), theme: "light", defaultOpen: true });
  wire(); requestAnimationFrame(() => requestAnimationFrame(() => { document.querySelector(".proto-picker").dataset.ready = ""; moveHighlight(); }));
}

function setup(img) {
  image = img; cancelAnimationFrame(raf); points = []; ripples = [];
  const canvas = document.querySelector("#mark-canvas"), wrap = canvas.parentElement, rect = wrap.getBoundingClientRect(), dpr = devicePixelRatio || 1;
  canvas.width = Math.round(rect.width * dpr); canvas.height = Math.round(rect.height * dpr); canvas.style.width = `${rect.width}px`; canvas.style.height = `${rect.height}px`;
  const off = document.createElement("canvas"), size = 360, ox = off.getContext("2d", { willReadFrequently: true }); off.width = off.height = size;
  ox.fillStyle = "#fff"; ox.fillRect(0, 0, size, size);
  const scale = Math.min(size / img.naturalWidth, size / img.naturalHeight) * 0.92, iw = img.naturalWidth * scale, ih = img.naturalHeight * scale;
  ox.drawImage(img, (size - iw) / 2, (size - ih) / 2, iw, ih);
  const pixels = ox.getImageData(0, 0, size, size).data; let minX = size, minY = size, maxX = 0, maxY = 0;
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) { const i = (y * size + x) * 4, lum = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 765; if (pixels[i + 3] > 20 && lum < 0.5) { minX = Math.min(minX, x); minY = Math.min(minY, y); maxX = Math.max(maxX, x); maxY = Math.max(maxY, y); } }
  if (minX > maxX) { document.querySelector("#loading").textContent = "No dark pixels detected in this image."; return; }
  const v = values(), bounds = Math.max(maxX - minX, maxY - minY), display = Math.min(rect.width, rect.height) * (v.renderWidth / 100), outputScale = display / bounds, cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
  for (let y = minY; y <= maxY; y += v.spacing) for (let x = minX; x <= maxX; x += v.spacing) { const i = (Math.round(y) * size + Math.round(x)) * 4, lum = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 765; if (pixels[i + 3] > 20 && lum < 0.5) { const bx = rect.width / 2 + (x - cx) * outputScale, by = rect.height / 2 + (y - cy) * outputScale; points.push({ x: bx, y: by, bx, by, vx: 0, vy: 0 }); } }
  document.querySelector("#loading").hidden = true;
  if (reduceMotion) { canvas.hidden = true; document.querySelectorAll("[data-mode]").forEach(b=>b.classList.toggle("active",b.dataset.mode === "static")); return; }
  img.hidden = mode === "dots"; canvas.hidden = mode === "static"; if (mode === "static") return; last = performance.now(); raf = requestAnimationFrame(draw);
}

function values() { const v = dial.getValues(); return { ...v, speedMultiplier: Number(v.speedMultiplier) }; }
function draw(now) {
  const canvas = document.querySelector("#mark-canvas"); if (!canvas || canvas.hidden) { raf = 0; return; }
  const ctx = canvas.getContext("2d"), rect = canvas.getBoundingClientRect(), dpr = devicePixelRatio || 1, v = values(), dt = Math.min(0.033, (now - last) / 1000 || 0.016); last = now;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, rect.width, rect.height);
  for (const p of points) { let ax = (p.bx - p.x) * v.springBack, ay = (p.by - p.y) * v.springBack;
    if (pointer) { const dx = p.x - pointer.x, dy = p.y - pointer.y, d = Math.hypot(dx, dy) || 1; if (d < v.cursorRadius) { const force = (1 - d / v.cursorRadius) ** 3 * v.cursorStrength; ax += dx / d * force; ay += dy / d * force; } }
    for (const r of ripples) { const dx = p.x - r.x, dy = p.y - r.y, d = Math.hypot(dx, dy) || 1, edge = Math.abs(d - r.radius); if (edge < 18) { const force = (1 - edge / 18) * v.rippleStrength; ax += dx / d * force; ay += dy / d * force; } }
    p.vx = (p.vx + ax * dt) * 0.84; p.vy = (p.vy + ay * dt) * 0.84; p.x += p.vx * dt * 60 * v.speedMultiplier; p.y += p.vy * dt * 60 * v.speedMultiplier;
    ctx.beginPath(); ctx.arc(p.x, p.y, v.dotSize / 2, 0, Math.PI * 2); ctx.fillStyle = "#242a27"; ctx.fill();
  }
  ripples = ripples.filter((r) => { r.radius += v.rippleSpeed * dt * v.speedMultiplier; return now - r.born < v.duration / v.speedMultiplier; });
  raf = requestAnimationFrame(draw);
}

function ripple(x, y) { if (reduceMotion || mode === "static") return; ripples.push({ x, y, radius: 0, born: performance.now() }); if (!reduceMotion && !raf) { last = performance.now(); raf = requestAnimationFrame(draw); } }
function wire() {
  const canvas = document.querySelector("#mark-canvas");
  const locate = (e) => { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  canvas.addEventListener("pointermove", (e) => { pointer = locate(e); });
  canvas.addEventListener("pointerdown", (e) => { pointer = locate(e); ripple(pointer.x, pointer.y); canvas.setPointerCapture?.(e.pointerId); });
  ["pointerup", "pointercancel", "pointerleave"].forEach((name) => canvas.addEventListener(name, () => { pointer = null; }));
  document.querySelectorAll("[data-mode]").forEach((button) => button.addEventListener("click", () => { if (button.disabled) return; const dots = button.dataset.mode === "dots"; mode = dots ? "dots" : "static"; document.querySelector(".proto-picker-replay").disabled = !dots; document.querySelectorAll("[data-mode]").forEach((item) => item.classList.toggle("active", item === button)); document.querySelector("#fallback").hidden = dots; canvas.hidden = !dots; if (!dots) { cancelAnimationFrame(raf); raf = 0; } if (dots && !reduceMotion && !raf) { last = performance.now(); raf = requestAnimationFrame(draw); } }));
  document.querySelector("#save").onclick = () => { download("money-ops-dot-config.json", JSON.stringify({ variant: variants[current][0], interaction: values() }, null, 2), "application/json"); document.querySelector("#saved-status").textContent = "Settings downloaded."; };
  document.querySelector(".proto-picker-replay").onclick = () => ripple(document.querySelector("#mark-canvas").clientWidth / 2, document.querySelector("#mark-canvas").clientHeight / 2);
  document.querySelectorAll(".proto-picker-item:not(.proto-picker-replay)").forEach((button, i) => button.onclick = () => setActive(i));
}
function download(name, text, type) { const url = URL.createObjectURL(new Blob([text], { type })), a = Object.assign(document.createElement("a"), { href: url, download: name }); a.click(); setTimeout(() => URL.revokeObjectURL(url), 0); }
function moveHighlight() { const picker = document.querySelector(".proto-picker"), items = [...picker.querySelectorAll(".proto-picker-item:not(.proto-picker-replay)")], item = items[current], highlight = picker.querySelector(".proto-picker-highlight"); highlight.style.width = `${item.offsetWidth}px`; highlight.style.transform = `translateX(${item.offsetLeft}px)`; }
function setActive(index) { if (index < 0 || index >= variants.length) return; current = index; const url = new URL(location); url.searchParams.set("v", index + 1); history.replaceState(null, "", url); mount(); }
dial.subscribe(() => { if (image) setup(image); });
window.addEventListener("resize", () => { moveHighlight(); if (image) setup(image); });
document.addEventListener("keydown", (e) => { if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable || e.metaKey || e.ctrlKey || e.altKey) return; const number = Number(e.key); if (number >= 1 && number <= 4) setActive(number - 1); else if (e.key === "ArrowRight") setActive((current + 1) % 4); else if (e.key === "ArrowLeft") setActive((current + 3) % 4); else if (e.key.toLowerCase() === "r") ripple(document.querySelector("#mark-canvas").clientWidth / 2, document.querySelector("#mark-canvas").clientHeight / 2); });
mount();
