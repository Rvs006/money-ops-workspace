import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {t,ui} from './theme';
export default function DocumentReview(){return <View style={s.section}><Text style={s.title}>Make sense of your policy.</Text><Text style={s.body}>Document reading is available in the Money Ops web app. Open the web version to read policy wording locally and download your guide.</Text><Text style={s.body}>You can use the loan comparison below on this device.</Text></View>}
const s=StyleSheet.create({section:{gap:ui.spacing.md},title:{fontSize:ui.type.title,lineHeight:ui.leading.title,color:t.ink,fontWeight:ui.weight.strong},body:{fontSize:ui.type.body,lineHeight:ui.leading.body,color:t.muted}});
