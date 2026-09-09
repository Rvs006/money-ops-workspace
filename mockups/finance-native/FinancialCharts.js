import React,{useMemo,useState} from 'react';
import {Pressable,StyleSheet,Text,View} from 'react-native';
import Svg,{Circle,Line,Path,Text as SvgText} from 'react-native-svg';
import {createLibrary,defineComponent,Renderer} from '@openuidev/react-lang';
import {z} from 'zod/v4';
import {t,ui} from './theme';
import {compareLoan} from './loanMath';

const rupees=(value)=>'₹'+Math.round(Math.max(0,value)).toLocaleString('en-IN');
const tone={reserve:t.chartReserve,premium:t.chartPremium,spare:t.green,baseline:t.chartBaseline};

function arc(cx,cy,r,start,end){
 const point=(angle)=>({x:cx+r*Math.cos(angle),y:cy+r*Math.sin(angle)});
 const a=point(start),b=point(end),large=end-start>Math.PI?1:0;
 return `M ${a.x} ${a.y} A ${r} ${r} 0 ${large} 1 ${b.x} ${b.y}`;
}

function AllocationVisual({props}){
 const {amount,reserve,premium}=props;
 const [picked,setPicked]=useState('spare');
 const total=Math.max(0,amount);
 const safeReserve=Math.min(Math.max(0,reserve),total);
 const safePremium=Math.min(Math.max(0,premium),Math.max(0,total-safeReserve));
 const spare=Math.max(0,total-safeReserve-safePremium);
 const deficit=Math.max(0,Math.max(0,reserve)+Math.max(0,premium)-total);
 const parts=[{key:'reserve',label:'Keep aside',value:safeReserve,color:tone.reserve},{key:'premium',label:'Insurance due',value:safePremium,color:tone.premium},{key:'spare',label:'Available to plan',value:spare,color:tone.spare}].filter((part)=>part.value>0);
 const selected=parts.find((part)=>part.key===picked)||parts[0];
 const selectedKey=selected?.key;
 let cursor=-Math.PI/2;
 const segments=parts.map((part)=>{const span=total?part.value/total*Math.PI*2:0;const next=cursor+span;const path=arc(95,95,75,cursor,next);cursor=next;return {...part,path};});
 return <View style={styles.chart}>
  {deficit>0?<View style={styles.deficit}><Text style={styles.deficitTitle}>Short by {rupees(deficit)}</Text><Text style={styles.deficitText}>These commitments are more than the available amount.</Text><View style={styles.commitments}><Text style={styles.commitmentLabel}>Keep aside</Text><Text style={styles.commitmentValue}>{rupees(Math.max(0,reserve))}</Text><Text style={styles.commitmentLabel}>Insurance due</Text><Text style={styles.commitmentValue}>{rupees(Math.max(0,premium))}</Text><Text style={styles.commitmentLabel}>Available now</Text><Text style={styles.commitmentValue}>{rupees(total)}</Text></View></View>:<><View style={styles.chartTop}>
   <Svg width={190} height={190} viewBox="0 0 190 190" accessibilityElementsHidden>
    <Circle cx="95" cy="95" r="75" stroke={t.wash} strokeWidth="18" fill="none"/>
    {segments.map((part)=>(part.value===total?<Circle key={part.key} cx="95" cy="95" r="75" stroke={part.color} strokeWidth="18" fill="none"/>:<Path key={part.key} d={part.path} stroke={part.color} strokeWidth="18" strokeLinecap="butt" fill="none"/>))}
   </Svg>
   <View pointerEvents="none" style={styles.donutCentre}><Text style={styles.centreValue}>{selected?rupees(selected.value):rupees(total)}</Text><Text style={styles.centreLabel}>{selected?selected.label:'Available'}</Text></View>
  </View><Text style={styles.chartCaption}>{parts.length?'Tap a row to explore the split.':'Add an amount to build your plan.'}</Text><View>{parts.map((part)=><Pressable key={part.key} accessibilityRole="button" accessibilityLabel={`${part.label}, ${rupees(part.value)}`} accessibilityState={{selected:selectedKey===part.key}} onPress={()=>setPicked(part.key)} style={({pressed})=>[styles.legend, selectedKey===part.key&&styles.legendSelected,pressed&&styles.pressed]}><View style={[styles.legendDot,{backgroundColor:part.color}]}/><Text style={styles.legendLabel}>{part.label}</Text><Text style={styles.legendValue}>{rupees(part.value)}</Text></Pressable>)}</View></>}
 </View>;
}

const compactMoney=(value)=>{if(value>=100000)return `₹${(value/100000).toFixed(value%100000?1:0)}L`;if(value>=1000)return `₹${Math.round(value/1000)}k`;return `₹${Math.round(value)}`;};

function LoanVisual({props}){
 const {balance,annualRate,months,prepayment,mode}=props;
 const comparison=useMemo(()=>compareLoan({balance,annualRate,months,prepayment}),[balance,annualRate,months,prepayment]);
 const active=mode==='lower'?comparison.lower:comparison.shorter;
 const [width,setWidth]=useState(360);
 const height=ui.chart.height,left=ui.spacing.xxl,right=ui.spacing.md,top=ui.spacing.md,bottom=ui.spacing.xl;
 const max=Math.max(1,balance),plotMonths=Math.max(1,comparison.baseline.months),plotWidth=width-left-right,plotHeight=height-top-bottom;
 const toPoint=(value,index)=>({x:left+(index/plotMonths)*plotWidth,y:top+(1-value/max)*plotHeight});
 const linePath=(values)=>values.map((value,index)=>{const point=toPoint(value,index);return `${index?'L':'M'} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;}).join(' ');
 const yMarks=[0,max/2,max],monthMarks=[0,Math.round(plotMonths/3),Math.round(plotMonths*2/3),plotMonths].filter((value,index,all)=>all.indexOf(value)===index);
 const activeName=active.months===0?'Paid off now':mode==='lower'?'Lower EMI':'Keep EMI';
 return <View style={styles.loanChart} onLayout={event=>setWidth(Math.max(160,event.nativeEvent.layout.width-ui.spacing.xxs*2))} accessible accessibilityLabel={`${activeName} option clears the loan in ${active.months} months. Without part-payment it takes ${comparison.baseline.months} months.`}>
  <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} accessibilityElementsHidden>
   {yMarks.map((value)=><React.Fragment key={value}><Line x1={left} y1={toPoint(value,0).y} x2={width-right} y2={toPoint(value,0).y} stroke={t.line} strokeWidth="1"/><SvgText x={left-8} y={toPoint(value,0).y+4} fill={t.muted} fontSize={ui.type.caption} textAnchor="end">{compactMoney(value)}</SvgText></React.Fragment>)}
   {monthMarks.map((month)=><SvgText key={month} x={toPoint(0,month).x} y={height-10} fill={t.muted} fontSize={ui.type.caption} textAnchor="middle">{month}</SvgText>)}
   <Path d={linePath(comparison.baseline.balances)} stroke={t.muted} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="7 5" fill="none"/>
   <Path d={linePath(active.balances)} stroke={t.green} strokeWidth="4" strokeLinecap="round" fill="none"/>
   <Circle cx={toPoint(active.balances.at(-1),active.months).x} cy={toPoint(active.balances.at(-1),active.months).y} r="4" fill={t.green}/>
  </Svg>
  <View style={styles.loanLegend}><View style={styles.loanLegendItem}><View style={[styles.lineSample,{backgroundColor:t.green}]}/><Text style={styles.loanLegendText}>{activeName}: {active.months} months</Text></View><View style={styles.loanLegendItem}><View style={[styles.lineSample,styles.dashedSample]}/><Text style={styles.loanLegendText}>Without part-payment: {comparison.baseline.months} months</Text></View></View>
  <Text style={styles.axis}>Months from now</Text>
 </View>;
}

const AllocationComponent=defineComponent({
 name:'AllocationVisual',
 description:'A native financial allocation donut with an accessible, selectable numeric legend.',
 props:z.object({amount:z.number(),reserve:z.number(),premium:z.number()}),
 component:AllocationVisual,
});
const LoanComponent=defineComponent({
 name:'LoanVisual',
 description:'A native line chart comparing balances with and without a part-payment.',
 props:z.object({balance:z.number(),annualRate:z.number(),months:z.number(),prepayment:z.number(),mode:z.enum(['shorter','lower'])}),
 component:LoanVisual,
});
const allocationLibrary=createLibrary({components:[AllocationComponent],root:'AllocationVisual'});
const loanLibrary=createLibrary({components:[LoanComponent],root:'LoanVisual'});

export function AllocationChart({amount=200000,reserve=70000,premium=30000}){
 const source=`root = AllocationVisual(${Number(amount)||0}, ${Number(reserve)||0}, ${Number(premium)||0})`;
 return <Renderer response={source} library={allocationLibrary} isStreaming={false} publishObservability={false}/>;
}

export function LoanChart({balance=120000,annualRate=12,months=12,prepayment=20000,mode='shorter'}={}){const source=`root = LoanVisual(${Number(balance)}, ${Number(annualRate)}, ${Number(months)}, ${Number(prepayment)}, "${mode==='lower'?'lower':'shorter'}")`;return <Renderer response={source} library={loanLibrary} isStreaming={false} publishObservability={false}/>;}

export const __financialChartTestables={allocationLibrary,loanLibrary};

const styles=StyleSheet.create({
 chart:{marginVertical:t.gap,padding:t.gap,backgroundColor:t.wash,borderRadius:t.radius},chartTop:{height:190,alignItems:'center',justifyContent:'center'},donutCentre:{position:'absolute',alignItems:'center',maxWidth:125},centreValue:{color:t.ink,fontSize:18,fontWeight:'700',fontVariant:['tabular-nums']},centreLabel:{color:t.muted,fontSize:11,textAlign:'center',marginTop:2},chartCaption:{color:t.muted,fontSize:13,lineHeight:18,marginBottom:10},legend:{minHeight:t.touch,flexDirection:'row',alignItems:'center',paddingHorizontal:10,borderRadius:8},legendSelected:{backgroundColor:t.paper},legendDot:{width:10,height:10,borderRadius:5,marginRight:10},legendLabel:{color:t.ink,fontSize:14,flex:1},legendValue:{color:t.ink,fontSize:14,fontWeight:'700',fontVariant:['tabular-nums']},pressed:{opacity:.72},deficit:{gap:4},deficitTitle:{color:t.error,fontSize:16,fontWeight:'700'},deficitText:{color:t.muted,fontSize:13,lineHeight:18},commitments:{marginTop:8,flexDirection:'row',flexWrap:'wrap',rowGap:5},commitmentLabel:{width:'62%',color:t.muted,fontSize:13},commitmentValue:{width:'38%',color:t.ink,fontWeight:'700',fontVariant:['tabular-nums'],textAlign:'right'},loanChart:{marginVertical:t.gap,paddingVertical:16,paddingHorizontal:4,backgroundColor:t.wash,borderRadius:t.radius},loanLegend:{gap:7,paddingHorizontal:12,marginTop:2},loanLegendItem:{flexDirection:'row',alignItems:'center',gap:8},lineSample:{height:3,width:22,borderRadius:2},dashedSample:{backgroundColor:t.muted},loanLegendText:{color:t.muted,fontSize:ui.type.caption,flexShrink:1},axis:{color:t.muted,fontSize:11,textAlign:'right',marginTop:7,paddingRight:12}
});
