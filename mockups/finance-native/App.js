import React,{useState} from 'react';
import {StyleSheet,Text,View,Pressable,ScrollView,TextInput,Switch,useWindowDimensions} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider,SafeAreaView} from 'react-native-safe-area-context';
import Logo from './Logo';
import DocumentReview from './DocumentReview';
import {InterestBars} from './InterestBars';
import {t,ui} from './theme';
import {compareLoan} from './loanMath';
const Stack=createNativeStackNavigator();
const sp=ui.spacing;
const money=n=>'₹'+Math.round(n).toLocaleString('en-IN');
const numeric=v=>/^\d+(\.\d{1,2})?$/.test(String(v));
function TextButton({children,onPress,expanded,disabled=false}){return <Pressable accessibilityRole="button" accessibilityState={{expanded,disabled}} disabled={disabled} onPress={onPress} style={({pressed,hovered})=>[s.textButton,pressed&&s.pressed,hovered&&s.hover,disabled&&s.disabled]}><Text style={s.action}>{children}</Text></Pressable>}
function Field({label,value,setValue,error,large=false,hint}){const [blurred,setBlurred]=useState(false),[focused,setFocused]=useState(false);return <View style={s.field}><Text style={s.label}>{label}</Text><TextInput accessibilityLabel={label} value={value} onChangeText={v=>{setValue(v);setBlurred(false)}} onFocus={()=>setFocused(true)} onBlur={()=>{setFocused(false);setBlurred(true)}} keyboardType="decimal-pad" inputMode="decimal" autoComplete="off" style={[s.input,large&&s.largeInput,focused&&s.focus,blurred&&error&&s.invalid]}/>{blurred&&error?<Text accessibilityRole="alert" style={s.error}>{error}</Text>:hint?<Text style={s.small}>{hint}</Text>:null}</View>}
function Fold({title,summary,open,setOpen,children}){return <View style={s.fold}><Pressable accessibilityRole="button" accessibilityState={{expanded:open}} onPress={()=>setOpen(!open)} style={({pressed,hovered})=>[s.foldHead,pressed&&s.pressed,hovered&&s.hover]}><View style={s.grow}><Text style={s.label}>{title}</Text>{summary&&<Text style={s.small}>{summary}</Text>}</View><Text style={s.foldSymbol}>{open?'−':'+'}</Text></Pressable>{open&&<View style={s.foldBody}>{children}</View>}</View>}
function Home(){
 const {width}=useWindowDimensions(),wide=width>=ui.layout.breakpoint;
 const [loan,setLoan]=useState({balance:'120000',annualRate:'12',months:'12'}),[payment,setPayment]=useState('20000'),[selected,setSelected]=useState('shorter');
 const [details,setDetails]=useState(false),[budget,setBudget]=useState(false),[why,setWhy]=useState(false);
 const [documentKey,setDocumentKey]=useState(0);
 const [available,setAvailable]=useState('200000'),[reserve,setReserve]=useState('70000'),[funded,setFunded]=useState(false);
 const errors={balance:!numeric(loan.balance)||Number(loan.balance)<1000||Number(loan.balance)>10000000?'Use ₹1,000 to ₹1 crore.':null,annualRate:!numeric(loan.annualRate)||Number(loan.annualRate)>40?'Use a reducing rate from 0% to 40%.':null,months:!/^\d+$/.test(loan.months)||Number(loan.months)<1||Number(loan.months)>360?'Use 1 to 360 whole months.':null};
 const loanValid=!Object.values(errors).some(Boolean),paymentValid=numeric(payment)&&Number(payment)<=Number(loan.balance);
 const valid=loanValid&&paymentValid;
 const result=valid?compareLoan({balance:Number(loan.balance),annualRate:Number(loan.annualRate),months:Number(loan.months),prepayment:Number(payment)}):null;
 const chosen=result?.[selected];
 const budgetValid=[available,reserve].every(v=>numeric(v)&&Number(v)<=10000000);
 const remaining=Number(available)-Number(reserve)-(funded?0:30000);
 const reset=()=>{setLoan({balance:'120000',annualRate:'12',months:'12'});setPayment('20000');setSelected('shorter');setDetails(false);setBudget(false);setDocumentKey(k=>k+1);setWhy(false);setAvailable('200000');setReserve('70000');setFunded(false)};
 let headline='',reason='';
 if(result){
  if(result.shorter.months===0){headline='This clears the balance.';reason=`You avoid ${money(result.savings)} in future interest. Ask your lender for a final closure quote.`}
  else if(Number(payment)===0){headline='Try an amount above ₹0.';reason='Both options match your current repayment plan.'}
  else if(Number(loan.annualRate)===0){headline='At 0%, choose what suits your budget.';reason=selected==='shorter'?`Keep the EMI and finish in ${chosen.months} months.`:`Your EMI becomes ${money(result.lower.emi)}. There is no interest saving.`}
  else if(selected==='shorter'){headline=`Save ${money(result.savings)} in interest.`;reason=`Keep your ${money(result.emi)} EMI if it is comfortable. Finish ${Number(loan.months)-result.shorter.months} months earlier.`}
  else {headline=`Free up ${money(result.monthlyRelief)} each month.`;reason=`Your EMI becomes ${money(result.lower.emi)}. This costs ${money(Math.max(0,result.lower.interest-result.shorter.interest))} more interest than finishing earlier.`}
 }
 return <SafeAreaView style={s.safe}><StatusBar style="dark"/><ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled"><View style={s.page}>
  <View style={s.header}><Logo/><View style={s.grow}><Text style={s.brand}>Money Ops</Text><Text style={s.small}>Understand your cover. Plan your money.</Text></View></View>
  <DocumentReview key={documentKey}/><View style={s.titleRow}><Text accessibilityRole="header" style={s.title}>Now, look at your loan.</Text><Text style={s.small}>Sample loan · change any amount</Text></View>
  <View style={[s.work,wide&&s.workWide]}>
   <View style={[s.inputs,wide&&s.column]}>
    <View style={s.loanLine}><View style={s.grow}><Text style={s.label}>Personal loan</Text><Text style={s.small}>{loanValid?`${money(Number(loan.balance))} left · ${loan.annualRate}% · ${loan.months} months`:'Check your loan details below.'}</Text></View><TextButton expanded={details} onPress={()=>setDetails(!details)}>{details?'Close':'Edit'}</TextButton></View>
    {details&&<View style={s.loanFields}>{[['balance','Balance left (₹)'],['annualRate','Reducing rate (% p.a.)'],['months','Months left']].map(([key,label])=><Field key={key} label={label} value={loan[key]} setValue={v=>setLoan({...loan,[key]:v})} error={errors[key]}/>)}<Text style={s.small}>EMI is calculated from these details.</Text></View>}
    <Field label="I can pay now (₹)" value={payment} setValue={setPayment} large error={!paymentValid?`Enter ₹0 to ${loanValid?money(Number(loan.balance)):'your loan balance'}.`:null} hint="Keep your reserve and bills covered first."/>
    <Fold title="Work out my spare money" open={budget} setOpen={setBudget}>
     <Field label="Money available (₹)" value={available} setValue={setAvailable} error={!numeric(available)||Number(available)>10000000?'Use ₹0 to ₹1 crore.':null}/><Field label="Reserve to keep (₹)" value={reserve} setValue={setReserve} error={!numeric(reserve)||Number(reserve)>10000000?'Use ₹0 to ₹1 crore.':null}/><View style={s.switchRow}><View style={s.grow}><Text style={s.label}>Premium already funded?</Text><Text style={s.small}>₹30,000 sample premium</Text></View><Switch accessibilityLabel="Premium already funded" value={funded} onValueChange={setFunded} trackColor={{false:t.muted,true:t.green}} thumbColor={t.paper} style={s.switch}/></View>
     {budgetValid?<><Text style={s.label}>{remaining<0?`Short by ${money(-remaining)}`:`${money(remaining)} left for your plan`}</Text><Text style={s.small}>{remaining<0?'Cover these commitments before prepaying.':`${money(Number(available))} − ${money(Number(reserve))} reserve − ${money(funded?0:30000)} premium`}</Text>{remaining>0&&loanValid&&<TextButton onPress={()=>{setPayment(String(Math.min(remaining,Number(loan.balance))));setBudget(false)}}>Try {money(Math.min(remaining,Number(loan.balance)))} as my payment</TextButton>}{remaining>Number(loan.balance)&&loanValid&&<Text style={s.small}>{money(remaining-Number(loan.balance))} would remain after clearing this loan.</Text>}</>:<Text style={s.error}>Complete both amounts to calculate the balance.</Text>}
    </Fold>
   </View>
   <View style={[s.results,wide&&s.column]}>
    {result?<><View accessibilityLiveRegion="polite" style={s.answer}><Text accessibilityRole="header" style={s.answerTitle}>{headline}</Text><Text style={s.body}>{reason}</Text></View><View style={s.chartHeading}><Text style={s.label}>Interest still to pay</Text><Text style={s.small}>{result.baseline.interest===0?'All options have zero interest':'Shorter bar = less interest'}</Text></View><InterestBars comparison={result} selected={selected} onSelect={setSelected}/><Text style={s.small}>Tap an option to see what it changes.</Text><TextButton expanded={why} onPress={()=>setWhy(!why)}>{why?'Hide the calculation':'Why these numbers?'}</TextButton>{why&&<View style={s.explanation}><Text style={s.body}>After the part-payment, your balance is {money(Number(loan.balance)-Number(payment))}. Each month we add interest at {(Number(loan.annualRate)/12).toLocaleString('en-IN',{maximumFractionDigits:4})}%, then subtract the EMI until the balance reaches zero.</Text><Text style={s.small}>Figures are rounded for display. The final EMI may be smaller.</Text></View>}<Text style={s.assumption}>No fees, tax effects or rate changes included.</Text></>:<View style={s.answer}><Text style={s.answerTitle}>Let’s check the amounts.</Text><Text style={s.body}>Enter a valid loan and a part-payment within its balance to see your options.</Text></View>}
   </View>
  </View>
  <View style={s.footer}><Text style={s.small}>Files stay in your browser. Save only when you choose.</Text><TextButton onPress={reset}>Reset sample</TextButton></View>
 </View></ScrollView></SafeAreaView>;
}
export default function App(){return <SafeAreaProvider><NavigationContainer><Stack.Navigator screenOptions={{headerShown:false,animation:'none'}}><Stack.Screen name="Home" component={Home}/></Stack.Navigator></NavigationContainer></SafeAreaProvider>}
const s=StyleSheet.create({
 safe:{flex:1,backgroundColor:t.paper},scroll:{padding:sp.lg,alignItems:'center'},page:{width:'100%',maxWidth:ui.layout.wide,gap:sp.lg},header:{flexDirection:'row',alignItems:'center',gap:sp.sm},grow:{flex:1,minWidth:0},brand:{fontSize:ui.type.section,lineHeight:ui.leading.section,fontWeight:ui.weight.bold,color:t.ink},titleRow:{gap:sp.xs},title:{fontSize:ui.type.title,lineHeight:ui.leading.title,fontWeight:ui.weight.strong,color:t.ink},body:{fontSize:ui.type.body,lineHeight:ui.leading.body,color:t.muted},small:{fontSize:ui.type.small,lineHeight:ui.leading.small,color:t.muted},label:{fontSize:ui.type.body,lineHeight:ui.leading.body,fontWeight:ui.weight.strong,color:t.ink},work:{gap:sp.lg},workWide:{flexDirection:'row',gap:sp.xxl,alignItems:'flex-start'},column:{flex:1,minWidth:0},inputs:{gap:sp.lg},results:{gap:sp.sm},loanLine:{flexDirection:'row',alignItems:'center',gap:sp.xs},loanFields:{gap:sp.md,padding:sp.md,backgroundColor:t.wash,borderRadius:ui.radius.small},field:{gap:sp.xs},input:{minHeight:ui.controls.height,borderWidth:ui.controls.border,borderColor:t.muted,padding:sp.sm,borderRadius:ui.radius.small,fontSize:ui.type.lead,lineHeight:ui.leading.lead,color:t.ink,backgroundColor:t.paper,fontVariant:['tabular-nums']},largeInput:{fontSize:ui.type.title,lineHeight:ui.leading.title,fontWeight:ui.weight.strong},focus:{borderColor:t.green},invalid:{borderColor:t.error},error:{fontSize:ui.type.small,lineHeight:ui.leading.small,color:t.error},textButton:{minHeight:ui.controls.height,justifyContent:'center',paddingHorizontal:sp.xs,paddingVertical:sp.sm,alignSelf:'flex-start'},action:{fontSize:ui.type.small,lineHeight:ui.leading.small,fontWeight:ui.weight.strong,color:t.green},pressed:{opacity:.7},hover:{opacity:.85},disabled:{opacity:ui.controls.disabledOpacity},fold:{gap:sp.xs},foldHead:{flexDirection:'row',gap:sp.md,alignItems:'center',minHeight:ui.controls.height,paddingVertical:sp.xs},foldSymbol:{fontSize:ui.type.section,color:t.green},foldBody:{gap:sp.md,padding:sp.md,backgroundColor:t.wash,borderRadius:ui.radius.small},switchRow:{flexDirection:'row',gap:sp.md,alignItems:'center'},switch:{minHeight:ui.controls.height,minWidth:ui.controls.height},answer:{gap:sp.xs},answerTitle:{fontSize:ui.type.section,lineHeight:ui.leading.section,fontWeight:ui.weight.strong,color:t.ink},chartHeading:{gap:sp.xxs,marginTop:sp.sm},explanation:{gap:sp.sm,padding:sp.md,backgroundColor:t.wash,borderRadius:ui.radius.small},assumption:{fontSize:ui.type.caption,lineHeight:ui.leading.caption,color:t.muted},policyFact:{flexDirection:'row',gap:sp.sm},policyMark:{fontSize:ui.type.lead,color:t.green},excluded:{fontSize:ui.type.lead,color:t.error},footer:{flexDirection:'row',flexWrap:'wrap',gap:sp.md,alignItems:'center',justifyContent:'space-between',marginTop:sp.sm}
});
