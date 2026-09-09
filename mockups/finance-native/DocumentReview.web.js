import React,{useEffect,useRef,useState} from 'react';
import {View,Text,Pressable,StyleSheet} from 'react-native';
import {t,ui} from './theme';
import {reviewPolicy} from './policyReview.cjs';

const SAMPLE=String.raw`{\rtf1\ansi
\b Fictional health policy wording\b0\par
This document is a demonstration, not an insurance contract.\par
\b Hospital cover\b0\par
Eligible inpatient hospital treatment is covered up to INR 5,00,000 per policy year, subject to the exclusions and waiting periods below.\par
\b Exclusions\b0\par
Routine outpatient consultations are not covered. Cosmetic treatment is excluded unless medically necessary following an accident.\par
\b Waiting periods\b0\par
A 30-day initial waiting period applies to illness. Accidental injuries are exempt from this initial waiting period. Pre-existing diseases have a 36-month waiting period.\par
\b Benefits\b0\par
One annual health checkup is available up to INR 2,000 after one completed policy year, at an approved centre.\par
\b Costs\b0\par
A 10 percent co-payment applies to each eligible claim. The premium and renewal date are stated in the individual policy schedule, which is not included here.\par
\b Claims\b0\par
For a planned cashless admission, seek pre-authorisation from the insurer at least 48 hours before admission. Contact details are not supplied in this fictional document.\par
}`;
const LIMIT=5*1024*1024;
function Action({children,onPress,primary=false,disabled=false,expanded}){
 return <Pressable accessibilityRole="button" accessibilityState={{disabled,expanded}} disabled={disabled} onPress={onPress} style={({pressed})=>[s.action,primary&&s.primary,pressed&&s.pressed,disabled&&s.disabled]}><Text style={[s.actionText,primary&&s.primaryText]}>{children}</Text></Pressable>;
}
export default function DocumentReview({hideIntro=false}){
 const input=useRef(null),job=useRef(null),[busy,setBusy]=useState(false),[review,setReview]=useState(null),[error,setError]=useState(''),[open,setOpen]=useState(null),[sample,setSample]=useState(false),[exporting,setExporting]=useState(false);
 const clear=()=>{if(job.current){clearTimeout(job.current.timer);job.current.worker.terminate();job.current=null}setBusy(false);setReview(null);setError('');setOpen(null);setSample(false);if(input.current)input.current.value=''};
 useEffect(()=>()=>{if(job.current){clearTimeout(job.current.timer);job.current.worker.terminate()}},[]);
 const convert=async(bytes,format,isSample=false)=>{
  clear();setBusy(true);setSample(isSample);
  try{
   const worker=new Worker('/anydoc-worker.js',{type:'module'});
   const finish=()=>{clearTimeout(job.current?.timer);worker.terminate();job.current=null;setBusy(false)};
   const timer=setTimeout(()=>{finish();setError('The reader took too long to load. Check your connection and try again. Your file has not been uploaded.')},60000);
   job.current={worker,timer};
   worker.onmessage=({data})=>{
    if(data.ready){clearTimeout(job.current?.timer);if(job.current)job.current.timer=setTimeout(()=>{finish();setError('This document took too long to read. Try a smaller policy-wording file.')},20000);return}
    finish();
    if(data.error){const code=data.error.code;setError(code==='needsOcr'?'This PDF contains scanned pages. Choose a text-based policy PDF. Scans are not sent to an OCR service.':code==='encrypted'?'This file is password protected. Choose an unlocked copy of the public policy wording.':'We could not read this file. Try the insurer’s original PDF, Word or RTF wording.');return}
    try{const next=reviewPolicy(data.markdown);setReview(next)}catch{setError('We could not organise this document. Try a shorter English policy-wording file.')}
   };
   worker.onerror=()=>{finish();setError('The document reader could not load. Check your connection and try again. Your file has not been uploaded.')};
   worker.postMessage({bytes,format},[bytes]);
  }catch{setBusy(false);setError('Document reading is not available in this browser. Try a recent Chrome, Edge or Safari browser.')}
 };
 const choose=async(event)=>{
  const file=event.target.files?.[0];if(!file)return;
  const format=file.name.split('.').pop().toLowerCase();
  if(!['pdf','docx','doc','rtf'].includes(format)||!file.size||file.size>LIMIT){clear();setError('Choose a PDF, Word or RTF file between 1 byte and 5 MB.');return}
  try{await convert(await file.arrayBuffer(),format)}catch{clear();setError('The file could not be opened. Please choose it again.')}
 };
 const download=async()=>{
  setExporting(true);setError('');
  try{
   const {jsPDF}=await import('jspdf');const pdf=new jsPDF();
   const clean=value=>String(value).replace(/₹/g,'INR ').replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/[–—−]/g,'-').replace(/[^\x20-\x7E\n]/g,'?');
   let y=20;const line=(value,size=11)=>{pdf.setFontSize(size);for(const text of pdf.splitTextToSize(clean(value),174)){if(y>276){pdf.addPage();y=20}pdf.text(text,18,y);y+=6}y+=3};
   line('Money Ops | Policy reading guide',18);line(sample?'Fictional sample wording':'Policy wording reviewed locally');
   line('Matching passages, not a coverage decision. Read all conditions and confirm with your insurer. Paragraph numbers refer to extracted text, not original PDF pages.');
   line('Use public wording without personal details. Identifier filtering is incomplete; check this guide before sharing.');
   if(review.truncated)line('Partial reading: some paragraphs exceeded the reading limit. Check the original document.');
   if(!review.looksLikeInsurance)line('No clear insurance wording detected. This guide cannot establish cover.');
   for(const section of review.sections){line(section.title,14);line(section.help);if(section.omitted)line(`${section.omitted} additional matches not shown. Check the original document.`);if(!section.excerpts.length)line('No matching passage found. This does not mean the benefit is excluded.');for(const excerpt of section.excerpts){line(excerpt.location,10);line(excerpt.text)}}
   line('No document was sent to an extraction service. This downloaded copy stays wherever you save it.');pdf.save('money-ops-policy-guide.pdf');
  }catch{setError('The PDF could not be created. Your review is still available here.')}finally{setExporting(false)}
 };
 return <View style={s.section}>
  {!hideIntro&&<View style={s.intro}><Text accessibilityRole="header" aria-level={2} style={s.title}>Make sense of your policy.</Text><Text style={s.body}>Find cover limits, exclusions and benefits in your policy wording.</Text></View>}
  {!review&&!busy&&<View style={s.start}><Action primary onPress={()=>input.current?.click()}>Choose policy wording</Action><Text style={s.small}>English PDF, Word or RTF · up to 5 MB</Text><Text style={s.small}>Use the insurer’s public wording, without names or personal details. Your file stays in this browser.</Text><Action onPress={()=>convert(new TextEncoder().encode(SAMPLE).buffer,'rtf',true)}>Try a sample policy</Action></View>}
  {React.createElement('input',{ref:input,type:'file',accept:'.pdf,.docx,.doc,.rtf',onChange:choose,style:{display:'none'},'aria-label':'Choose policy wording file'})}
  {busy&&<View accessibilityLiveRegion="polite" style={s.start}><Text style={s.label}>Reading the document on your device…</Text><Text style={s.small}>The first read loads the document reader. Your file is not uploaded.</Text><Action onPress={clear}>Cancel</Action></View>}
  {!!error&&<Text accessibilityRole="alert" style={s.error}>{error}</Text>}
  {review&&<View style={s.review}>
   <View style={s.intro}><Text accessibilityRole="header" aria-level={2} style={s.sectionTitle}>{sample?'Your sample policy guide':'Your policy reading guide'}</Text><Text style={s.small}>Matching passages, not a coverage decision. Open a topic to check the exact wording.</Text></View>
   {!review.looksLikeInsurance&&<Text style={s.error}>We could not identify insurance wording. Try the insurer’s public policy document.</Text>}
   {review.truncated&&<Text style={s.error}>This is a partial reading. Some paragraphs exceeded the reading limit. Check the full original document.</Text>}
   {review.sections.map(section=><View key={section.id}>
    <Pressable accessibilityRole="button" accessibilityState={{expanded:open===section.id}} onPress={()=>setOpen(open===section.id?null:section.id)} style={s.topic}><View style={s.grow}><Text style={s.label}>{section.title}</Text><Text style={s.small}>{section.excerpts.length?`${section.excerpts.length} matching passage${section.excerpts.length===1?'':'s'}`:'Not found in this reading'}</Text></View><Text style={s.symbol}>{open===section.id?'−':'+'}</Text></Pressable>
    {open===section.id&&<View style={s.evidence}><Text style={s.body}>{section.help}</Text>{section.excerpts.length?section.excerpts.map((excerpt,index)=><View key={index} style={s.quote}><Text style={s.small}>{excerpt.location}</Text><Text selectable style={s.body}>{excerpt.text}</Text></View>):<Text style={s.body}>Ask your insurer for this information. No match does not mean “not covered”.</Text>}{section.omitted>0&&<Text style={s.small}>{section.omitted} further matches are not shown. Check the original document.</Text>}</View>}
   </View>)}
   <Text style={s.small}>English keyword matching can miss conditions or include unrelated text. Check the full wording, schedule and endorsements before deciding. Identifier filtering is incomplete; review before sharing.</Text>
   <View style={s.actions}><Action primary disabled={exporting} onPress={download}>{exporting?'Preparing PDF…':'Download guide as PDF'}</Action><Action onPress={clear}>Clear document</Action></View>
  </View>}
 </View>;
}
const sp=ui.spacing;
const s=StyleSheet.create({section:{gap:sp.lg,marginBottom:sp.xl},intro:{gap:sp.xs},title:{fontSize:ui.type.title,lineHeight:ui.leading.title,fontWeight:ui.weight.strong,color:t.ink},sectionTitle:{fontSize:ui.type.section,lineHeight:ui.leading.section,fontWeight:ui.weight.strong,color:t.ink},body:{fontSize:ui.type.body,lineHeight:ui.leading.body,color:t.ink},small:{fontSize:ui.type.small,lineHeight:ui.leading.small,color:t.muted},label:{fontSize:ui.type.body,lineHeight:ui.leading.body,fontWeight:ui.weight.strong,color:t.ink},start:{gap:sp.sm,maxWidth:ui.layout.reading},action:{minHeight:ui.controls.height,paddingHorizontal:sp.md,paddingVertical:sp.sm,justifyContent:'center',alignSelf:'flex-start',borderRadius:ui.radius.small},primary:{backgroundColor:t.green},actionText:{fontSize:ui.type.body,lineHeight:ui.leading.body,color:t.green,fontWeight:ui.weight.strong},primaryText:{color:t.paper},pressed:{opacity:.8},disabled:{opacity:ui.controls.disabledOpacity},error:{fontSize:ui.type.body,lineHeight:ui.leading.body,color:t.error},review:{gap:sp.sm,maxWidth:ui.layout.reading,width:'100%'},topic:{flexDirection:'row',alignItems:'center',gap:sp.md,paddingVertical:sp.sm,minHeight:ui.controls.height},grow:{flex:1,minWidth:0},symbol:{fontSize:ui.type.section,color:t.green},evidence:{padding:sp.md,gap:sp.md,backgroundColor:t.wash,borderRadius:ui.radius.small},quote:{gap:sp.xs},actions:{gap:sp.xs,alignItems:'flex-start'}});
