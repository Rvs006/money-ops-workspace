import React,{useEffect,useRef,useState} from 'react';
import {evaluate} from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import source from './prototype.mdx?raw';
const {default:Content}=await evaluate(source,{...runtime});
function Pages({children,initial}) {
 const screens=React.Children.toArray(children).filter(c=>c.props?.html);
 const [id,setId]=useState(initial);
 const ref=useRef(null),first=useRef(true);
 const current=screens.find(s=>s.props.id===id)||screens[0];
 useEffect(()=>{
  const el=ref.current;
  el.innerHTML=current.props.html;
  const go=e=>{const b=e.target.closest('[data-goto]');if(b&&screens.some(s=>s.props.id===b.dataset.goto)){setId(b.dataset.goto)}};
  el.addEventListener('click',go);
  if(!first.current){const h=el.querySelector('h1');h?.setAttribute('tabindex','-1');h?.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'})}
  first.current=false;
  return()=>el.removeEventListener('click',go);
 },[current.props.html]);
 return <div ref={ref}/>;
}
export default function Flow({initial}){return <Content components={{Prototype:p=><Pages {...p} initial={initial}/>,PrototypeScreen:()=>null,PrototypeTransition:()=>null}}/>}
