import { createDialKit, createDialRoot } from "dialkit/vanilla";
import "dialkit/vanilla/styles.css";
import { DEFAULT_MARK, markSvg, normalizedMark } from "./geometry.js";
import "./styles.css";

const app = document.querySelector("#app");

app.innerHTML = `
  <header class="masthead"><h1 id="studio-title">Money Ops icon studio</h1><p>A policy document, opened into an M.</p></header>
  <main class="studio" aria-labelledby="studio-title">
    <section class="preview" aria-label="Logo previews">
      <div class="presets" aria-label="Mark presets"><button type="button" data-preset="standard">Standard</button><button type="button" data-preset="compact">Compact</button><button type="button" data-preset="open">Open aperture</button></div>
      <div class="mark-stage"><div id="large-mark" class="large-mark" aria-label="Large Money Ops logo preview"></div></div>
      <div class="preview-strip"><span>Actual size</span><div class="sizes">${[16,24,40].map(size=>`<figure><div id="preview-${size}" class="mark-size size-${size}"></div><figcaption>${size} px</figcaption></figure>`).join('')}</div></div>
    </section>
    <aside class="dial-shell" aria-label="Tune the logo"><h2>Tune the mark</h2><p>Adjust the shape and compare it at small sizes.</p><div id="dial-root"></div><p class="hint">Your settings stay in this browser. Use Versions to keep alternatives.</p></aside>
    <footer class="exports"><div class="export-actions"><button type="button" data-export="svg">Download SVG</button><button type="button" data-export="png">Download PNG</button><button type="button" data-export="json">Download JSON</button></div><p id="export-status" aria-live="polite">PNG: 1024 x 1024, transparent background.</p></footer>
  </main>
`;

const config = {
  color: DEFAULT_MARK.color,
  silhouette: { weight: [DEFAULT_MARK.weight, 3, 14, 1], fold: [DEFAULT_MARK.fold, 12, 28, 1] },
  aperture: { scale: [DEFAULT_MARK.openingScale, 0.76, 1.22, 0.01], weight: [DEFAULT_MARK.openingWeight, 6, 16, 1] },
  fold: { cutWeight: [DEFAULT_MARK.foldWeight, 2, 8, 1] },
};

const dial = createDialKit("Money Ops mark", config, {
  id: "money-ops-mark",
  persist: true,
  defaultCollapsed: false,
  shortcuts: { "aperture.scale": { key: "o", mode: "fine" } },
});

createDialRoot({ mode: "inline", target: document.querySelector("#dial-root"), theme: "light", defaultOpen: true });

function currentMark(values = dial.getValues()) {
  return normalizedMark({
    color: values.color,
    weight: values.silhouette.weight,
    fold: values.silhouette.fold,
    openingScale: values.aperture.scale,
    openingWeight: values.aperture.weight,
    foldWeight: values.fold.cutWeight,
  });
}

function render(values) {
  const mark = currentMark(values);
  document.querySelector("#large-mark").innerHTML = markSvg(mark, { idPrefix: "large" });
  [16, 24, 40].forEach((size) => { document.querySelector(`#preview-${size}`).innerHTML = markSvg(mark, { idPrefix: `preview-${size}` }); });
}

dial.subscribe(render);

const presets = {
  standard: DEFAULT_MARK,
  compact: { ...DEFAULT_MARK, weight: 10, fold: 16, openingScale: 0.84, openingWeight: 9 },
  open: { ...DEFAULT_MARK, weight: 5, fold: 23, openingScale: 1.14, openingWeight: 12, foldWeight: 5 },
};

function applyMark(mark) {
  dial.setValues({ color: mark.color, silhouette: { weight: mark.weight, fold: mark.fold }, aperture: { scale: mark.openingScale, weight: mark.openingWeight }, fold: { cutWeight: mark.foldWeight } });
}

document.querySelectorAll("[data-preset]").forEach((button) => {
  button.addEventListener("click", () => applyMark(presets[button.dataset.preset]));
});

function download(name, data, type) {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}

async function exportPng(mark) {
  const source = markSvg(mark, { idPrefix: "png" });
  const image = new Image();
  const sourceUrl = URL.createObjectURL(new Blob([source], { type: "image/svg+xml" }));
  await new Promise((resolve, reject) => { image.onload = resolve; image.onerror = reject; image.src = sourceUrl; });
  const canvas = document.createElement("canvas");
  canvas.width = 1024; canvas.height = 1024;
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, 1024, 1024);
  context.drawImage(image, 96, 96, 832, 832);
  URL.revokeObjectURL(sourceUrl);
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) throw new Error("The browser could not create the PNG.");
  download("money-ops-mark-1024.png", blob, "image/png");
}

document.querySelectorAll("[data-export]").forEach((button) => {
  button.addEventListener("click", async () => {
    const mark = currentMark();
    const status = document.querySelector("#export-status");
    try {
      if (button.dataset.export === "svg") download("money-ops-mark.svg", markSvg(mark), "image/svg+xml");
      if (button.dataset.export === "json") download("money-ops-mark.json", JSON.stringify(mark, null, 2), "application/json");
      if (button.dataset.export === "png") await exportPng(mark);
      status.textContent = `${button.textContent.replace("Download ", "")} exported.`;
    } catch (error) { status.textContent = `Export failed: ${error.message}`; }
  });
});
