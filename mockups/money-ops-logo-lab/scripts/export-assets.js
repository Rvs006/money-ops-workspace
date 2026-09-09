import { mkdir, writeFile } from "node:fs/promises";
import { Resvg } from "@resvg/resvg-js";
import { DEFAULT_MARK, markSvg } from "../src/geometry.js";

const output = new URL("../assets/", import.meta.url);
await mkdir(output, { recursive: true });
const svg = markSvg(DEFAULT_MARK, { idPrefix: "export" });
await writeFile(new URL("money-ops-mark.svg", output), svg);
await writeFile(new URL("money-ops-mark.json", output), JSON.stringify(DEFAULT_MARK, null, 2));
const paddedSvg = svg.replace('viewBox="0 0 120 120"', 'viewBox="-14 -14 148 148"');

function render(name, width, background, source = paddedSvg) {
  const png = new Resvg(source, { fitTo: { mode: "width", value: width }, background }).render().asPng();
  return writeFile(new URL(name, output), png);
}

await Promise.all([
  render("money-ops-mark-1024.png", 1024),
  render("money-ops-mark-1024-white.png", 1024, "#ffffff"),
  render("money-ops-favicon-48.png", 48, undefined, svg),
]);
