// Sample the rendered 3D view so dots inherit its color, perspective and scan motion.
export function projectedDots(host, source, values, paused, reduced) {
  const canvas=document.createElement('canvas'), sample=document.createElement('canvas');
  canvas.tabIndex=0;canvas.setAttribute('aria-label','Interactive logo dots. Move to repel, click for a ripple, or press R to replay. Drag to rotate.');
  canvas.style.cssText='display:block;width:100%;touch-action:pan-y';
  source.style.display='none';host.append(canvas);
  const ctx=canvas.getContext('2d'),sx=sample.getContext('2d',{willReadFrequently:true});
  let points=[],pointer=null,waves=[],size=0;
  const pos=e=>{const r=canvas.getBoundingClientRect();return{x:(e.clientX-r.left)*size/r.width,y:(e.clientY-r.top)*size/r.height};};
  canvas.onpointermove=e=>{pointer=pos(e);};canvas.onpointerleave=canvas.onpointercancel=()=>{pointer=null;};
  canvas.onpointerdown=e=>{if(!paused()&&!reduced)waves.push({...pos(e),age:0});};
  canvas.onpointerup=e=>{if(e.pointerType!=='mouse')pointer=null;};
  const replay=()=>{if(!paused()&&!reduced)waves.push({x:size/2,y:size/2,age:0});};
  canvas.onkeydown=e=>{if(['r','R','Enter',' '].includes(e.key)){e.preventDefault();replay();}};
  function draw(dt){
    const next=Math.max(1,Math.round(host.clientWidth)),v=values();
    if(next!==size){size=next;sample.width=sample.height=size;canvas.width=canvas.height=size*2;points=[];for(let y=0;y<size;y+=v.dotSpacing)for(let x=0;x<size;x+=v.dotSpacing)points.push({bx:x,by:y,x,y,vx:0,vy:0});}
    sx.clearRect(0,0,size,size);sx.drawImage(source,0,0,size,size);
    const pixels=sx.getImageData(0,0,size,size).data;
    ctx.setTransform(2,0,0,2,0,0);ctx.clearRect(0,0,size,size);
    for(const p of points){
      let tx=p.bx,ty=p.by;
      if(!paused()&&!reduced){
        if(pointer){const dx=p.bx-pointer.x,dy=p.by-pointer.y,d=Math.hypot(dx,dy)||1,f=Math.max(0,1-d/v.cursorRadius)**3*v.cursorStrength;tx+=dx/d*f;ty+=dy/d*f;}
        for(const w of waves){const dx=p.bx-w.x,dy=p.by-w.y,d=Math.hypot(dx,dy)||1;const f=Math.exp(-(((d-w.age*v.rippleSpeed)/v.rippleWidth)**2))*v.rippleStrength*Math.max(0,1-w.age/(v.rippleDuration/1000));tx+=dx/d*f;ty+=dy/d*f;}
        p.vx+=(v.springBack*(tx-p.x)-18*p.vx)*dt;p.vy+=(v.springBack*(ty-p.y)-18*p.vy)*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;
      }
      const i=(Math.floor(p.by)*size+Math.floor(p.bx))*4;
      if(pixels[i+3]<12)continue;
      ctx.fillStyle=`rgba(${pixels[i]},${pixels[i+1]},${pixels[i+2]},${pixels[i+3]/255})`;ctx.beginPath();ctx.arc(p.x,p.y,v.dotSize/2,0,Math.PI*2);ctx.fill();
    }
    if(!paused()&&!reduced)waves=waves.filter(w=>(w.age+=dt)<v.rippleDuration/1000);
  }
  return {canvas,draw,replay,destroy(){canvas.remove();}};
}
