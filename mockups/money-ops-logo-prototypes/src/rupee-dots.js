// Samples the actual SVG so the interactive field follows the exported geometry.
export function createDotLogo(host, source, values, isPaused) {
  let frame, dead = false, pointer = null, points = [], waves = [], elapsed = 0, last = 0;
  const doc = new DOMParser().parseFromString(source, 'image/svg+xml');
  doc.querySelectorAll('[class$="-scan"]').forEach(el => el.remove());
  const width = Number(doc.documentElement.getAttribute('viewBox').split(' ')[2]);
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-label', 'Interactive dotted scanner and rupee logo. Move pointer to scatter; click or press Enter for a ripple.');
  canvas.tabIndex = 0;
  canvas.style.cssText = 'width:100%;height:auto;display:block;touch-action:pan-y';
  const img = new Image();
  const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(doc)], {type:'image/svg+xml'}));
  img.onload = () => {
    URL.revokeObjectURL(url); if (dead) return;
    const off = document.createElement('canvas'); off.width = width; off.height = 260;
    const ctx = off.getContext('2d', {willReadFrequently:true}); ctx.drawImage(img,0,0,width,260);
    const pixels = ctx.getImageData(0,0,width,260).data, spacing = values().dotSpacing;
    for(let y=0;y<260;y+=spacing) for(let x=0;x<width;x+=spacing) {
      const solid = pixels[(Math.floor(y)*width+Math.floor(x))*4+3]>120;
      const cap = ((x>=10&&x<=32)||(x>=208&&x<=230))&&y>=80&&y<=240;
      if(solid||cap) points.push({x,y,bx:x,by:y,vx:0,vy:0,solid,cap});
    }
    canvas.width = width*2; canvas.height=520;
    host.replaceChildren(canvas); frame=requestAnimationFrame(draw);
  };
  img.onerror = () => URL.revokeObjectURL(url);
  img.src=url;
  const locate = e => { return {x:e.offsetX*width/canvas.clientWidth,y:e.offsetY*260/canvas.clientHeight}; };
  canvas.onpointermove=e=>{pointer=locate(e);};
  canvas.onpointerleave=canvas.onpointercancel=()=>{pointer=null;};
  canvas.onpointerdown=e=>{const p=locate(e);waves.push({...p,age:0});};
  canvas.onpointerup=e=>{if(e.pointerType!=='mouse')pointer=null;};
  canvas.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();waves.push({x:width/2,y:130,age:0});}};
  function draw(now) {
    if(dead)return;
    const dt=Math.min((now-last)/1000||0.016,0.033);last=now;
    const v=values(), paused=isPaused(); if(!paused)elapsed+=dt;
    const scan=184-Math.cos(elapsed*Math.PI/v.duration)*v.travel;
    const ctx=canvas.getContext('2d');ctx.setTransform(2,0,0,2,0,0);ctx.clearRect(0,0,width,260);ctx.fillStyle='#1947c7';
    for(const p of points){
      let tx=p.bx,ty=p.by;
      if(pointer&&!paused&&p.by>125){const dx=p.bx-pointer.x,dy=p.by-pointer.y,d=Math.hypot(dx,dy)||1;const force=Math.max(0,1-d/v.cursorRadius)**3*v.cursorStrength;tx+=dx/d*force;ty+=dy/d*force;}
      if(!paused&&p.by>125)for(const w of waves){const dx=p.bx-w.x,dy=p.by-w.y,d=Math.hypot(dx,dy)||1;const force=Math.exp(-(((d-w.age*v.rippleSpeed)/18)**2))*v.rippleStrength*Math.max(0,1-w.age/2);tx+=dx/d*force;ty+=dy/d*force;}
      if(!paused){p.vx+=(v.springBack*(tx-p.x)-18*p.vx)*dt;p.vy+=(v.springBack*(ty-p.y)-18*p.vy)*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;}
      const hole=p.bx>=31&&p.bx<=209&&Math.abs(p.by-scan)<v.lineWidth/2;
      const cap=p.cap&&Math.abs(p.by-scan)<v.lineWidth/2+3;
      if((p.solid&&!hole)||cap){ctx.beginPath();ctx.arc(p.x,p.y,v.dotSize/2,0,Math.PI*2);ctx.fill();}
    }
    if(!paused)waves=waves.filter(w=>(w.age+=dt)<2);
    frame=requestAnimationFrame(draw);
  }
  return {destroy(){dead=true;cancelAnimationFrame(frame);URL.revokeObjectURL(url);}};
}
