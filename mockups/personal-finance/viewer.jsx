import React, {useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {evaluate} from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import Alpine from 'alpinejs';
import source from './prototype.mdx?raw';
import './viewer.css';
function Prototype({children,initialScreenId}) {
 const [screen,setScreen]=useState(initialScreenId);
 const screens=React.Children.toArray(children).filter(c=>c.props?.html);
 const current=screens.find(c=>c.props.id===screen)||screens[0];
 const ref=useRef(null);
 useEffect(()=>{const el=ref.current;el.innerHTML=current.props.html;Alpine.initTree(el);const navigate=e=>{const button=e.target.closest('[data-goto]');if(button)setScreen(button.dataset.goto)};el.addEventListener('click',navigate);return()=>{el.removeEventListener('click',navigate);Alpine.destroyTree(el)}},[current.props.id]);
 return <><div className="review">Review mockup · Sample data only <span>Loans + insurance + spare money</span></div><div ref={ref} className="screen"/><footer className="review">Source: prototype.mdx · Changes appear when the file is saved.</footer></>;
}
const {default:Content}=await evaluate(source,{...runtime});
createRoot(document.getElementById('root')).render(<Content components={{Prototype,PrototypeScreen:()=>null,PrototypeTransition:()=>null}}/>);
