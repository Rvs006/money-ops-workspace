import React,{useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import Current from './Current.jsx';
import Guided from './Guided.jsx';
import Overview from './Overview.jsx';
import './flow.css';
import './picker.css';
const choices=[Current,Guided,Overview],names=['Current','Guided','Overview'];
function App(){
 const value=Number(new URLSearchParams(location.search).get('v'));
 const [index,setIndex]=useState(value>=1&&value<=3?value-1:0),[replay,setReplay]=useState(0);
 function select(i){setIndex(i);const u=new URL(location);u.searchParams.set('v',i+1);history.replaceState(null,'',u)}
 useEffect(()=>{const key=e=>{if(/^(INPUT|TEXTAREA|SELECT|IFRAME)$/.test(e.target.tagName)||e.target.isContentEditable||e.metaKey||e.ctrlKey||e.altKey)return; if(['1','2','3'].includes(e.key)){e.preventDefault();select(Number(e.key)-1)}else if(e.key==='ArrowRight'){e.preventDefault();select((index+1)%3)}else if(e.key==='ArrowLeft'){e.preventDefault();select((index+2)%3)}else if(e.key.toLowerCase()==='r'){setReplay(x=>x+1)}};document.addEventListener('keydown',key);return()=>document.removeEventListener('keydown',key)},[index]);
 const Variant=choices[index];
 return <><aside className="review-picker"><div><b>Compare the starting experience</b><span>Sample data · Keys 1–3 to switch</span></div><nav aria-label="Prototype variants">{names.map((n,i)=><button key={n} aria-current={index===i?'true':undefined} data-active={index===i?'':undefined} onClick={()=>select(i)}>{n}</button>)}</nav></aside><Variant key={index+'-'+replay}/></>;
}
createRoot(document.getElementById('root')).render(<App/>);
