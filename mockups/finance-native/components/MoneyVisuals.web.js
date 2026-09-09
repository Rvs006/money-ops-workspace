import React,{useState,useMemo,useRef,useEffect} from 'react';
import {ResponsiveContainer,BarChart,Bar,XAxis,YAxis,LineChart,Line,ReferenceLine} from 'recharts';
import rough from 'roughjs';
import {compareLoan} from '../loanMath';
import {evaluateOffer} from '../mvpMath';
import {Disclosure,Slider} from './DecisionFields.web';
import './money-visuals.css';

const money=n=>'₹'+Math.round(n).toLocaleString('en-IN');
const short=n=>n>=100000?(n/100000).toFixed(1)+'L':n>=1000?Math.round(n/1000)+'k':Math.round(n);
function SketchBar({x,y,width,height,fill}){
 const ref=useRef(null);
 useEffect(()=>{const host=ref.current;if(!host||!width||!height)return;const node=rough.svg(host.ownerSVGElement).rectangle(x,y,width,height,{seed:7,roughness:.35,fill,fillStyle:'hachure',stroke:'none',hachureGap:5});host.replaceChildren(node);return()=>host.replaceChildren()},[x,y,width,height,fill]);
 return <g aria-hidden="true"><rect x={x} y={y} width={Math.max(0,width||0)} height={height} fill={fill} opacity=".12"/><g ref={ref}/></g>;
}
function Choices({label,value,onChange,items}){return <div className="visual-choices" role="group" aria-label={label}>{items.map(([id,text])=><button type="button" key={id} aria-pressed={value===id} onClick={()=>onChange(id)}>{text}</button>)}</div>}
function StoryDisclosure({title,children}){const[open,setOpen]=useState(false);return <Disclosure title={title} onToggle={e=>setOpen(e.currentTarget.open)}>{open?children:null}</Disclosure>}
function ChartFrame({label,children}){return <div className="money-chart" role="img" aria-label={label}><ResponsiveContainer width="100%" height="100%">{children}</ResponsiveContainer></div>}

export function CostStory({result}){
 const[stage,setStage]=useState('all');
 const data=result.offers.map(o=>({name:o.name,interest:o.interest,fees:stage==='all'?o.fees:0}));
 const max=Math.max(1,...result.offers.map(o=>o.cost))*1.08;
 return <StoryDisclosure title="See how fees change the comparison"><div className="money-visual"><h4>From interest to the full borrowing cost</h4><p className="small">Principal is excluded. Bar lengths share one scale; each offer covers its own full term.</p><Choices label="Loan cost layers" value={stage} onChange={setStage} items={[["interest","Interest only"],["all","Include all fees"]]}/><ChartFrame label="Interest and fees by offer. Exact amounts are listed below."><BarChart data={data} layout="vertical" margin={{left:0,right:16,top:12,bottom:0}}><XAxis type="number" domain={[0,max]} tickFormatter={short}/><YAxis type="category" dataKey="name" width={76} tickFormatter={v=>v.length>11?v.slice(0,10)+'…':v}/><Bar dataKey="interest" stackId="cost" fill="var(--blue)" isAnimationActive={false}/><Bar dataKey="fees" stackId="cost" fill="var(--ink)" shape={<SketchBar/>} isAnimationActive={false}/></BarChart></ChartFrame><p className="small">Blue: interest. Hatched: fees, GST and insurance.</p><div className="visual-readouts">{result.offers.map((o,i)=><div key={i}><strong>{o.name}</strong><span>{money(o.interest+(stage==='all'?o.fees:0))}</span><small>{stage==='all'?`Interest ${money(o.interest)} + fees ${money(o.fees)}`:'Interest before fees'}</small><small>{o.months} months · principal {money(o.amount)}</small></div>)}</div><p className="small">{result.rankingBasis==='apr'?'Amounts or terms differ: keep effective APR as the primary ranking. A shorter cost bar does not determine the recommendation.':'A lower interest bill can be outweighed by higher fees. Including fees restores the cost used by the recommendation.'}</p></div></StoryDisclosure>;
}

export function PrepayStory({result,balance}){
 const[mode,setMode]=useState(()=>result.selected===result.lower?'lower':'shorter'),[month,setMonth]=useState('0');
 const schedule=useMemo(()=>compareLoan({balance,annualRate:result.equivalentReducingRate,months:result.baseline.months,prepayment:result.prepayment}),[balance,result]);
 const data=useMemo(()=>Array.from({length:result.baseline.months+1},(_,i)=>({month:i,baseline:schedule.baseline.balances[i]||0,prepay:schedule[mode].balances[i]||0})),[schedule,mode,result]);
 const index=Math.min(Number(month),data.length-1),point=data[index];
 return <StoryDisclosure title="See what prepayment changes"><div className="money-visual"><h4>A smaller balance, then a different finish</h4><p className="small">{result.liquidityStatus==='unknown'?'Buffer not set: this illustration assumes no reserve. ':''}{result.emiMismatch?'Your entered EMI does not match this model. ':''}Principal prepaid: {money(result.prepayment)}. Fees: {money(result.fees)}. {result.rateType==='flat'?'Uses the same equivalent reducing-rate conversion as the result.':''}</p><Choices label="Repayment chart mode" value={mode} onChange={setMode} items={[["shorter","Keep EMI · finish earlier"],["lower","Lower EMI · keep term"]]}/><ChartFrame label="Outstanding balance by month for no prepayment and the selected prepayment scenario. Use the month slider for exact amounts."><LineChart data={data} margin={{left:0,right:12,top:12,bottom:0}}><XAxis dataKey="month" type="number" domain={[0,result.baseline.months]} label={{value:'Months',position:'insideBottomRight',offset:0}}/><YAxis tickFormatter={short} width={48} domain={[0,balance]}/><Line dataKey="baseline" stroke="var(--muted)" strokeDasharray="5 4" dot={false} isAnimationActive={false}/><Line dataKey="prepay" stroke="var(--blue)" strokeWidth={3} dot={false} isAnimationActive={false}/><ReferenceLine x={index} stroke="var(--ink)"/></LineChart></ChartFrame><Slider label="Inspect repayment month" value={index} min={0} max={result.baseline.months} step={1} suffix="" onChange={setMonth}/><div className="visual-readouts"><div><strong>No prepayment · dashed</strong><span>{money(point.baseline)}</span><small>Remaining at month {index}</small></div><div><strong>With prepayment · blue</strong><span>{money(point.prepay)}</span><small>Remaining at month {index}</small></div></div><p className="small">Modeled payoff: {schedule[mode].months} months, versus {result.baseline.months} without prepayment. This toggle explores repayment only; it does not change the recommendation. To change your decision scenario, edit the prepayment goal above and compare again. The liquidity checks still apply.</p></div></StoryDisclosure>;
}

export function RateStory({offer}){
 const[month,setMonth]=useState('1');
 const scenarios=useMemo(()=>{
  const common={...offer,loanType:'Personal loan',processingFee:0,insurance:0,otherFees:0,insuranceMode:'upfront'};
  const flat=evaluateOffer({...common,rateType:'flat'}),reducing=evaluateOffer({...common,rateType:'reducing'});
  const schedule=compareLoan({balance:offer.amount,annualRate:offer.annualRate,months:offer.months,prepayment:0});
  return {flat,reducing,data:Array.from({length:offer.months},(_,i)=>({month:i+1,flat:offer.amount*offer.annualRate/1200,reducing:schedule.baseline.balances[i]*offer.annualRate/1200}))};
 },[offer]);
 const index=Math.min(Number(month),offer.months),row=scenarios.data[index-1];
 return <StoryDisclosure title="Understand flat versus reducing interest"><div className="money-visual"><h4>Same quoted rate, different interest bills</h4><p className="small">Using {offer.name}: {money(offer.amount)}, {offer.annualRate}% p.a., {offer.months} months. This teaching comparison excludes fees and insurance and does not change your offer’s rate type.</p><ChartFrame label="Monthly interest: flat interest stays constant, reducing interest falls with the outstanding balance. Exact amounts follow the month slider."><LineChart data={scenarios.data} margin={{left:0,right:12,top:12,bottom:0}}><XAxis dataKey="month" type="number" domain={[1,offer.months]}/><YAxis tickFormatter={short} width={48}/><Line dataKey="flat" stroke="var(--ink)" strokeDasharray="5 4" dot={offer.months===1} isAnimationActive={false}/><Line dataKey="reducing" stroke="var(--blue)" strokeWidth={3} dot={offer.months===1} isAnimationActive={false}/><ReferenceLine x={index} stroke="var(--muted)"/></LineChart></ChartFrame><Slider label="Inspect interest month" value={index} min={1} max={offer.months} step={1} suffix="" onChange={setMonth}/><div className="visual-readouts"><div><strong>Flat · original principal</strong><span>{money(row.flat)}</span><small>Interest in month {index}</small><small>Full-term interest {money(scenarios.flat.interest)}</small><small>EMI {money(scenarios.flat.emi)}</small></div><div><strong>Reducing · unpaid balance</strong><span>{money(row.reducing)}</span><small>Interest in month {index}</small><small>Full-term interest {money(scenarios.reducing.interest)}</small><small>EMI {money(scenarios.reducing.emi)}</small></div></div><p className="small">The same percentage is applied to different balances. Compare effective APR, rather than treating a flat quote as equivalent to a reducing quote.</p></div></StoryDisclosure>;
}
