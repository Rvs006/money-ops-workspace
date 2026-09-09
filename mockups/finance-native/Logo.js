import React,{useId} from 'react';
import Svg,{Defs,Mask,Path,Rect} from 'react-native-svg';
import {t} from './theme';
// A folded policy document with an M-shaped transparent opening.
export default function Logo({size=40,color=t.green,...props}){
 const maskId=`money-ops-${useId().replace(/:/g,'')}`;
 return <Svg width={size} height={size} viewBox="-2 -2 120 120" accessibilityLabel="Money Ops logo" {...props}>
  <Defs><Mask id={maskId} maskUnits="userSpaceOnUse" x={0} y={0} width={116} height={116}>
   <Rect width={116} height={116} fill="white"/>
   <Path d="M37 78V43L58 65L79 43V78" fill="none" stroke="black" strokeWidth={10} strokeLinecap="round" strokeLinejoin="round"/>
   <Path d="M84.6 4.4V23.4H103.6" fill="none" stroke="black" strokeWidth={4} strokeLinejoin="round"/>
  </Mask></Defs>
  <Path mask={`url(#${maskId})`} d="M30.4 4.4H84.6L103.6 23.4V96.6L88.6 111.6H27.4L12.4 96.6V22.4Z" fill={color}/>
 </Svg>;
}


