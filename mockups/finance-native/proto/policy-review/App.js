import React,{useState} from 'react';
import {SafeAreaView,ScrollView,StyleSheet,Text,View} from 'react-native';
import Logo from '../../Logo';
import {t,ui} from '../../theme';
import Inline from './Inline';
import Sheet from './Sheet';
import Complete from './Complete';
import Picker from './Picker';
import Controls from './Controls';
import './picker.css';
const variants=[['Inline',Inline],['Sheet',Sheet],['Complete',Complete]],sp=ui.spacing;
export default function App(){const query=typeof window==='undefined'?null:new URLSearchParams(window.location.search);const requested=Number(query?.get('v'));const initial=Number.isInteger(requested)&&requested>=1&&requested<=variants.length?requested-1:0;const [current,setCurrentState]=useState(initial),[nonce,setNonce]=useState(0);const setCurrent=index=>{setCurrentState(index);const url=new URL(window.location);url.searchParams.set('v',index+1);window.history.replaceState(null,'',url)};const [name,Variant]=variants[current];return <SafeAreaView style={s.safe}><ScrollView contentContainerStyle={s.scroll}><View style={s.page}><View style={s.header}><Logo/><View><Text style={s.brand}>Money Ops</Text><Text style={s.small}>Policy review prototype</Text></View></View><View key={`${name}-${nonce}`}><Variant/></View></View></ScrollView><Picker current={current} setCurrent={setCurrent} replay={()=>setNonce(n=>n+1)}/><Controls/></SafeAreaView>}
const s=StyleSheet.create({safe:{flex:1,backgroundColor:t.paper},scroll:{padding:sp.lg,alignItems:'center',minHeight:'100%'},page:{width:'100%',maxWidth:ui.layout.wide,gap:sp.lg,paddingTop:sp.xxl+sp.xxl+sp.sm,paddingBottom:sp.xxl},header:{flexDirection:'row',alignItems:'center',gap:sp.sm},brand:{fontSize:ui.type.section,lineHeight:ui.leading.section,fontWeight:ui.weight.bold,color:t.ink},small:{fontSize:ui.type.small,lineHeight:ui.leading.small,color:t.muted}});
