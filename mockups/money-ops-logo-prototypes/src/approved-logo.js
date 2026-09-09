import source from '../public/money-ops-approved.svg?raw';
export const bodyPath='m90.5 15.3h-31.9c-2.3 0-4.6 2-4.6 4.4v67.2c0 2.7 1.9 4.8 4.6 4.8h42c2.6 0 4.6-1.9 4.6-4.5v-56.9l-14.7-15z';
export const railPath='m112.2 60.4h-65.1c-0.6 0-1.3 0.5-1.3 1.2v6.6c0 0.8 0.6 1.1 1.2 1.1h65.2c0.6 0 1.2-0.4 1.2-1v-6.8c0-0.6-0.6-1.1-1.2-1.1z';
export function sourceLogo(animated=false,duration=3,travel=0){return source.replace('<g id="scanner-rail">', `<g id="scanner-rail" ${animated?'style="animation:approved-scan '+duration+'s ease-in-out infinite alternate"':''}>`).replace('</svg>', `<style>@keyframes approved-scan{from{transform:translateY(-${travel}px)}to{transform:translateY(${travel}px)}}@media(prefers-reduced-motion:reduce){#scanner-rail{animation:none}}</style></svg>`);}
