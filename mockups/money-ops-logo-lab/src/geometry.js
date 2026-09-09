export const DEFAULT_MARK = Object.freeze({
  color: "#304b3c",
  weight: 7,
  fold: 19,
  foldWeight: 4,
  openingScale: 1,
  openingWeight: 10,
});

const viewBox = "0 0 120 120";

function number(value, fallback) {
  return Number.isFinite(Number(value)) ? Number(value) : fallback;
}

export function normalizedMark(input = {}) {
  const mark = { ...DEFAULT_MARK, ...input };
  return {
    color: String(mark.color),
    weight: number(mark.weight, DEFAULT_MARK.weight),
    fold: number(mark.fold, DEFAULT_MARK.fold),
    foldWeight: number(mark.foldWeight, DEFAULT_MARK.foldWeight),
    openingScale: number(mark.openingScale, DEFAULT_MARK.openingScale),
    openingWeight: number(mark.openingWeight, DEFAULT_MARK.openingWeight),
  };
}

export function markSvg(input = {}, { title = "Money Ops", idPrefix = "money-ops-mark" } = {}) {
  const { color, weight, fold, foldWeight, openingScale, openingWeight } = normalizedMark(input);
  const inset = 3 + weight / 5;
  const right = 100 - inset;
  const bottom = 116 - inset;
  const left = inset;
  const top = inset;
  const lowerCut = 15;
  const foldEdge = right - fold;
  const openingTransform = `translate(50 60) scale(${openingScale}) translate(-50 -60)`;

  const maskId = `${idPrefix}-opening`;
  const titleId = `${idPrefix}-title`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none" role="img" aria-labelledby="${titleId}"><title id="${titleId}">${title}</title><mask id="${maskId}" maskUnits="userSpaceOnUse" x="0" y="0" width="120" height="120"><rect width="120" height="120" fill="white"/><path d="M 29 78 V 43 L 50 65 L 71 43 V 78" transform="${openingTransform}" stroke="black" stroke-width="${openingWeight}" stroke-linecap="round" stroke-linejoin="round"/><path d="M ${foldEdge} ${top} V ${top + fold} H ${right}" stroke="black" stroke-width="${foldWeight}" stroke-linejoin="round"/></mask><path mask="url(#${maskId})" transform="translate(10 2)" d="M ${left + 18} ${top} H ${foldEdge} L ${right} ${top + fold} V ${bottom - lowerCut} L ${right - lowerCut} ${bottom} H ${left + lowerCut} L ${left} ${bottom - lowerCut} V ${top + 18} Z" fill="${color}"/></svg>`;
}

export const MARK_VIEWBOX = viewBox;
