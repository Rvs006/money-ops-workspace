import { projectedDots } from './projected-dots.js';
import * as THREE from 'three';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { sourceLogo } from './approved-logo.js';

export function createSculptedLogo(host, values, paused, deep, reduced, dotMode=false, flat=false) {
  const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setClearColor(0xffffff,0);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.VSMShadowMap;
  renderer.domElement.setAttribute('aria-label','The supplied Money Ops icon extruded in 3D. Drag to rotate.');host.replaceChildren(renderer.domElement);
  const scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(-140,140,140,-140,1,1500);
  camera.position.set(...(flat?[0,0,500]:[320,220,450]));camera.lookAt(0,0,0);
  const controls=new OrbitControls(camera,renderer.domElement);controls.enablePan=false;controls.enableZoom=false;controls.enabled=!flat;
  const light=new THREE.DirectionalLight(0xffffff,2);light.position.set(-180,300,400);light.castShadow=true;light.shadow.mapSize.set(1024,1024);Object.assign(light.shadow.camera,{left:-200,right:200,top:200,bottom:-200,near:1,far:1200});light.shadow.radius=5;light.shadow.blurSamples=12;light.shadow.normalBias=.5;scene.add(light,new THREE.HemisphereLight(0xffffff,0x7892c9,2));
  const floorMat=new THREE.ShadowMaterial({opacity:flat?0:.12});const floor=new THREE.Mesh(new THREE.PlaneGeometry(900,900),floorMat);floor.rotation.x=-Math.PI/2;floor.position.y=-116;floor.receiveShadow=true;scene.add(floor);
  const model=new THREE.Group();model.scale.set(3,-3,3);model.position.set(-240,160,0);scene.add(model);
  const rail=new THREE.Group();model.add(rail);
  const parsed=new SVGLoader().parse(sourceLogo().replace('fill:url(#SVGID_1_)','fill:#779ce7'));
  const materials=[],depth=flat?.1:deep?8:3;
  let z=0,first=true;
  for(const path of parsed.paths){
    const cls=path.userData.node.getAttribute('class');const isRail=cls==='cls-7'||cls==='cls-8';
    const color=path.color.clone();const face=new THREE.MeshBasicMaterial({color});
    const side=new THREE.MeshStandardMaterial({color:color.clone().multiplyScalar(.68),roughness:.8});materials.push(face,side);
    for(const shape of SVGLoader.createShapes(path)){
      const thickness=first?depth:isRail?(flat?.1:1.8):.08;
      const geometry=new THREE.ExtrudeGeometry(shape,{depth:thickness,bevelEnabled:false,curveSegments:32});const mesh=new THREE.Mesh(geometry,[face,side]);
      mesh.position.z=first?-depth:isRail?(cls==='cls-8'?2.0:0.15):z;
      mesh.castShadow=!flat; (isRail?rail:model).add(mesh);
    }
    first=false;z+=.12;
  }
  const effect=dotMode?projectedDots(host,renderer.domElement,values,paused,reduced):null;
  if(effect){controls.disconnect();controls.connect(effect.canvas);}
  let frame,last=0,time=0;
  function resize(){const w=host.clientWidth;renderer.setSize(w,w);}const ro=new ResizeObserver(resize);ro.observe(host);resize();
  function draw(now){const dt=Math.min((now-last)/1000||.016,.033);last=now;if(!paused()&&!reduced)time+=dt;rail.position.y=-Math.cos(time*Math.PI/values().duration)*values().travel/3;renderer.render(scene,camera);effect?.draw(dt);frame=requestAnimationFrame(draw);}frame=requestAnimationFrame(draw);
  return {replay(){effect?.replay();},destroy(){effect?.destroy();cancelAnimationFrame(frame);ro.disconnect();controls.dispose();scene.traverse(o=>o.geometry?.dispose());materials.forEach(m=>m.dispose());floorMat.dispose();renderer.dispose();}};
}
