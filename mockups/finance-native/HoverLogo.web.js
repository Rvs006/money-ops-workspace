import React,{useEffect,useRef,useState} from 'react';
import './hover-logo.css';

// Both faces come from the approved SVG; the document and rupee never move.
export default function HoverLogo({paused=false}){
 const host=useRef(null),canvas=useRef(null),pointer=useRef(null),waves=useRef([]);
 const [active,setActive]=useState(false),[ready,setReady]=useState(false),[reduced,setReduced]=useState(false);
 useEffect(()=>{const query=matchMedia('(prefers-reduced-motion: reduce)');const change=()=>setReduced(query.matches);change();query.addEventListener('change',change);return()=>query.removeEventListener('change',change)},[]);
 useEffect(()=>{
  if(!active||paused||reduced){setReady(false);return}
  let cancelled=false,frame=0,urls=[];
  const load=async markup=>{const url=URL.createObjectURL(new Blob([markup],{type:'image/svg+xml'}));urls.push(url);const img=new Image();img.src=url;await img.decode();return img};
  async function start(){
   try{
    const response=await fetch('/money-ops-logo-static.svg');if(!response.ok)return;
    const markup=await response.text();if(cancelled)return;
    const doc=new DOMParser().parseFromString(markup,'image/svg+xml');
    const svg=doc.documentElement,rail=svg.querySelector('#scanner-rail');
    if(!rail)return;
    rail.removeAttribute('style');
    const railDoc=svg.cloneNode(true);
    for(const child of [...railDoc.children])if(!['style','defs','linearGradient'].includes(child.tagName)&&child.id!=='scanner-rail')child.remove();
    rail.remove();
    for(const root of [svg,railDoc]){root.setAttribute('width','160');root.setAttribute('height','176')}
    const serializer=new XMLSerializer();
    const [base,scan]=await Promise.all([load(serializer.serializeToString(svg)),load(serializer.serializeToString(railDoc))]);
    if(cancelled){urls.forEach(url=>URL.revokeObjectURL(url));return;}
    const output=canvas.current,ctx=output.getContext('2d');
    const sample=document.createElement('canvas');sample.width=160;sample.height=176;const sampleCtx=sample.getContext('2d',{willReadFrequently:true});
    output.width=192;output.height=208;
    const dots=[];for(let y=0;y<176;y+=3.2)for(let x=0;x<160;x+=3.2)dots.push({x,y,px:x,py:y,vx:0,vy:0});
    let last=performance.now(),time=0;waves.current=[];setReady(true);
    function draw(now){
     if(cancelled)return;
     const dt=Math.min(.03,(now-last)/1000);last=now;time+=dt;
     sampleCtx.clearRect(0,0,160,176);sampleCtx.drawImage(base,0,0,160,176);sampleCtx.drawImage(scan,0,Math.sin(time*Math.PI/3)*18,160,176);
     const pixels=sampleCtx.getImageData(0,0,160,176).data;ctx.clearRect(0,0,192,208);
     for(const p of dots){
      let tx=p.x,ty=p.y;
      if(pointer.current){const dx=p.x-pointer.current.x,dy=p.y-pointer.current.y,d=Math.hypot(dx,dy)||1,f=Math.pow(Math.max(0,1-d/65),2)*16;tx+=dx/d*f;ty+=dy/d*f}
      for(const wave of waves.current){const dx=p.x-wave.x,dy=p.y-wave.y,d=Math.hypot(dx,dy)||1,f=Math.exp(-Math.pow((d-wave.age*100)/14,2))*12*(1-wave.age/1.5);tx+=dx/d*f;ty+=dy/d*f}
      p.vx+=(95*(tx-p.px)-18*p.vx)*dt;p.vy+=(95*(ty-p.py)-18*p.vy)*dt;p.px+=p.vx*dt;p.py+=p.vy*dt;
      const i=(Math.floor(p.y)*160+Math.floor(p.x))*4;if(pixels[i+3]<20)continue;
      ctx.fillStyle=`rgba(${pixels[i]},${pixels[i+1]},${pixels[i+2]},${pixels[i+3]/255})`;ctx.beginPath();ctx.arc(p.px+16,p.py+16,1.15,0,Math.PI*2);ctx.fill();
     }
     waves.current=waves.current.filter(w=>(w.age+=dt)<1.5);frame=requestAnimationFrame(draw);
    }
    frame=requestAnimationFrame(draw);
   }catch{setReady(false)}
  }
  start();return()=>{cancelled=true;cancelAnimationFrame(frame);urls.forEach(url=>URL.revokeObjectURL(url))};
 },[active,paused,reduced]);
 const locate=e=>{const r=host.current.getBoundingClientRect();return{x:(e.clientX-r.left)*160/r.width,y:(e.clientY-r.top)*176/r.height}};
 const ripple=()=>{if(!paused&&!reduced){setActive(true);waves.current.push({...pointer.current||{x:80,y:88},age:0})}};
 return <span ref={host} className={`hover-logo ${ready?'hover-logo--dots':''}`} role="img" tabIndex={0} aria-label="Money Ops scanner. Hover or focus for dots; click or press Enter for a ripple."
 onPointerEnter={()=>setActive(true)} onPointerMove={e=>{pointer.current=locate(e)}} onPointerLeave={()=>{pointer.current=null;setActive(false)}} onPointerCancel={()=>{pointer.current=null;setActive(false)}} onPointerDown={e=>{pointer.current=locate(e);ripple()}} onFocus={()=>setActive(true)} onBlur={()=>{pointer.current=null;setActive(false)}} onKeyDown={e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();ripple()}}}>
 <img src={paused||reduced?'/money-ops-logo-static.svg':'/money-ops-logo.svg'} alt="" draggable="false"/><canvas ref={canvas} aria-hidden="true"/>
 </span>
}
