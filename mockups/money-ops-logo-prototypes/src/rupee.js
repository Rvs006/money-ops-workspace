import { sourceLogo } from './approved-logo.js';
import { createDialKit, createDialRoot } from 'dialkit/vanilla';
import 'dialkit/vanilla/styles.css';
import { drawablyButton } from 'drawably';
import 'drawably/style.css';
import './rupee.css';
import { createSculptedLogo } from './rupee-3d.js';


const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let paused = reduced.matches;
const dial = createDialKit('Scanner', {
  duration: [3, 1, 8, 0.1], travel: [28, 0, 32, 1],
  dotSize: [1.5, 0.7, 3, 0.1], dotSpacing: [3, 2, 6, 0.5],
  cursorRadius: [90,30,180,1], cursorStrength: [35,0,90,1], springBack: [90,30,180,5], rippleStrength: [30,0,90,1], rippleSpeed: [180,60,400,10], rippleWidth: [20,8,60,1], rippleDuration: [1600,400,3000,100],
}, { id: 'money-ops-source-v4', persist: true });
createDialRoot({ mode: 'inline', target: document.querySelector('#controls'), theme: 'light', defaultOpen: true });
// Custom outlined rupee, independent of installed fonts.
const rupee = '<path d="M-22-28H22M-22-14H22M-13-28C15-28 17 1-19 1L17 29" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>';
function svg(animated = true, id = 'logo') {
  const v=dial.getValues();
  return sourceLogo(animated&&!paused,v.duration,v.travel/3).replaceAll('SVGID_1_',id+'-gradient').replaceAll('scanner-rail',id+'-scan').replaceAll('approved-scan',id+'-motion');
}

let dots;
let dotMode = true;
let treatment = 'deep';
const picker = document.createElement('nav');
picker.setAttribute('aria-label', 'Logo treatment');
picker.innerHTML = '<button data-view="flat">Flat blue</button><button data-view="shallow">Isometric sheet</button><button data-view="deep">Isometric block</button>';
document.querySelector('header').append(picker);
picker.querySelectorAll('button').forEach(button => button.onclick = () => { treatment=button.dataset.view; render(); });
const replayButton=document.createElement('button');replayButton.textContent='Replay ripple';replayButton.onclick=()=>dots?.replay();document.querySelector('nav').append(replayButton);
const effectButton = document.createElement('button');
effectButton.id = 'dot-toggle'; effectButton.textContent = 'Show solid logo';
document.querySelector('nav').prepend(effectButton);
effectButton.onclick = () => { dotMode = !dotMode; render(); };
function render() {
  dots?.destroy();
  const preview = document.querySelector('#preview');
  preview.dataset.treatment = treatment;
  document.querySelector('header > p').textContent = treatment === 'flat' ? 'Original 2D artwork. Switch to isometric to see the same paths with depth.' : 'Move to scatter dots, click for a ripple, drag to rotate. Press R on the logo to replay.';
  preview.innerHTML = '<div id="depth" aria-hidden="true"></div><div id="front"></div>';
  document.querySelector('#front').innerHTML = svg();
  picker.querySelectorAll('[data-view]').forEach(button=>button.setAttribute('aria-pressed', String(button.dataset.view===treatment)));
  if (treatment !== 'flat' || dotMode) dots = createSculptedLogo(document.querySelector('#front'), () => dial.getValues(), () => paused, treatment === 'deep', reduced.matches, dotMode, treatment === 'flat');

  effectButton.textContent = dotMode ? 'Show solid logo' : 'Show dot effect';
  effectButton.disabled = reduced.matches;
  replayButton.disabled = !dotMode || paused || reduced.matches;
  document.querySelector('#sizes').innerHTML = [24,48,96].map(size => `<figure><div style="width:${size*80/88}px">${svg(false, 'size'+size)}</div><figcaption>${size}px high</figcaption></figure>`).join('');
  document.querySelector('#pause').textContent = paused ? 'Play' : 'Pause';
  document.querySelector('#pause').disabled = reduced.matches;
}
function download(name, content) {
  const url = URL.createObjectURL(new Blob([content], {type:'image/svg+xml'}));
  const link = Object.assign(document.createElement('a'), {href:url, download:name}); link.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
  document.querySelector('#status').textContent = `${name} downloaded.`;
}
dial.subscribe(render);
document.querySelector('#pause').onclick = () => { paused = !paused; document.querySelectorAll('#preview [class$="-scan"]').forEach(el=>el.style.animationPlayState=paused?'paused':'running'); document.querySelector('#pause').textContent=paused?'Play':'Pause'; replayButton.disabled=!dotMode||paused||reduced.matches; };
document.querySelector('#reset').onclick = () => { dial.resetValues(); render(); };
document.querySelector('#static').onclick = () => download('money-ops-rupee-static.svg',svg(false));
document.querySelector('#animated').onclick = () => download('money-ops-rupee-animated.svg',svg(true).replaceAll('animation-play-state:paused', 'animation-play-state:running'));
document.querySelector('#rupee').onclick = () => download('money-ops-rupee.svg',`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-32 -38 64 76"><g id="financial-detail" color="#1947c7">${rupee}</g></svg>`);
reduced.addEventListener('change',()=>{paused=reduced.matches;render();});
render();


document.querySelectorAll('nav button').forEach(button=>drawablyButton(button,{stroke:'#1947c7',fill:'#1947c7',paper:'#ffffff',roughness:0.7,boil:0.12}));
