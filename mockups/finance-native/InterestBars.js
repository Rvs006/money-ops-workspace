import React from 'react';
import {Pressable,StyleSheet,Text,View} from 'react-native';
import Svg,{Rect} from 'react-native-svg';
import {createLibrary,defineComponent,Renderer} from '@openuidev/react-lang';
import {z} from 'zod/v4';
import {t,ui} from './theme';

const money=(value)=>'₹'+Math.round(Math.max(0,value)).toLocaleString('en-IN');

function BarVisual({props}){
 const {label,value,maximum,detail,active}=props;
 const width=320,height=14;
 const fillWidth=maximum>0?Math.max(0,Math.min(width,(value/maximum)*width)):0;
 return <View style={styles.visual}>
  <View style={styles.topline}><Text style={[styles.label,active&&styles.activeText]}>{label}</Text><Text style={styles.amount}>{money(value)}</Text></View>
  <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" accessibilityElementsHidden>
   <Rect x="0" y="3" width={width} height="8" rx="4" fill={t.line}/>
   {fillWidth>0&&<Rect x="0" y="3" width={fillWidth} height="8" rx="4" fill={active?t.green:t.muted}/>} 
  </Svg>
  <Text style={styles.detail}>{detail}</Text>
 </View>;
}

const BarComponent=defineComponent({
 name:'BarVisual',
 description:'A compact native horizontal bar comparing remaining loan interest with exact numbers.',
 props:z.object({label:z.string(),value:z.number(),maximum:z.number(),detail:z.string(),active:z.boolean()}),
 component:BarVisual,
});
const barsLibrary=createLibrary({components:[BarComponent],root:'BarVisual'});

function program(row){return `root = BarVisual("${row.label}", ${row.value}, ${row.maximum}, "${row.detail}", ${row.active})`;}

function BarRow({row,onPress}){
 const output=<Renderer response={program(row)} library={barsLibrary} isStreaming={false} publishObservability={false}/>;
 if(!onPress)return <View style={styles.staticRow}>{output}</View>;
 return <Pressable accessibilityRole="button" accessibilityLabel={`${row.label}. ${money(row.value)} interest. ${row.detail}`} accessibilityState={{selected:row.active}} onPress={onPress} style={({pressed})=>[styles.choiceRow,row.active&&styles.choiceActive,pressed&&styles.pressed]}>{output}</Pressable>;
}

export function InterestBars({comparison,selected='shorter',onSelect}){
 const rows=[
  {key:'baseline',label:'No part-payment',value:comparison.baseline.interest,detail:`${money(comparison.emi)} EMI · ${comparison.baseline.months} payments`,active:false},
  {key:'shorter',label:'Finish earlier',value:comparison.shorter.interest,detail:`${money(comparison.shorter.months?comparison.emi:0)} EMI · ${comparison.shorter.months} payments`,active:selected==='shorter'},
  {key:'lower',label:'Lower EMI',value:comparison.lower.interest,detail:`${money(comparison.lower.emi)} EMI · ${comparison.lower.months} payments`,active:selected==='lower'},
 ];
 const maximum=Math.max(0,...rows.map((row)=>row.value));
 return <View style={styles.group}>{rows.map((row)=>{const complete={...row,maximum};return <BarRow key={row.key} row={complete} onPress={row.key==='baseline'?undefined:()=>onSelect?.(row.key)}/>;})}</View>;
}

export const __interestBarTestables={barsLibrary,program};

const styles=StyleSheet.create({
 group:{gap:ui.spacing.xs},staticRow:{paddingVertical:ui.spacing.sm,paddingHorizontal:ui.spacing.sm},choiceRow:{minHeight:ui.controls.height,paddingVertical:ui.spacing.sm,paddingHorizontal:ui.spacing.sm,borderRadius:ui.radius.small},choiceActive:{backgroundColor:t.wash},pressed:{opacity:.72},visual:{gap:ui.spacing.xxs},topline:{flexDirection:'row',alignItems:'baseline',justifyContent:'space-between',gap:ui.spacing.sm},label:{color:t.ink,fontSize:ui.type.body,fontWeight:ui.weight.medium},activeText:{fontWeight:ui.weight.bold},amount:{color:t.ink,fontSize:ui.type.body,fontWeight:ui.weight.bold,fontVariant:['tabular-nums']},detail:{color:t.muted,fontSize:ui.type.caption,lineHeight:ui.leading.caption}
});
