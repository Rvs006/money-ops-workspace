'use strict';
const MAX_EXTRACTED_CHARS=1000000;
const moneyAmount=s=>{const match=s.replace(/,/g,'').match(/(?:INR|Rs\.?|₹)?\s*(\d+(?:\.\d+)?)\s*(crore|lakh|lac)?/i);return match?String(Number(match[1])*(/^crore$/i.test(match[2])?10000000:/^(lakh|lac)$/i.test(match[2])?100000:1)):null};
function extractedPrefix(text){
 const paragraphs=String(text||'').split(/\n\s*\n/);
 const kept=[];
 let consumed=0;
 for(const paragraph of paragraphs){
  consumed+=paragraph.length+2;
  if(consumed>MAX_EXTRACTED_CHARS)break;
  kept.push(paragraph);
 }
 return kept.join('\n\n');
}
function isClearTermLifePolicy(text){
 const value=extractedPrefix(text);
 const hasTermLifeIdentity=/\bterm[- ]life(?:\s+(?:insurance|policy|plan|cover))?\b|\blife insurance policy\b/i.test(value);
 const hasHealthEvidence=/\b(health insurance|critical illness|medical expense|hospitali[sz]ation|inpatient|outpatient|cashless|co[- ]?pay|waiting period|sum insured)\b/i.test(value);
 const hasNegatedLifeEvidence=/\b(?:not|no|without)\s+(?:a\s+)?(?:term[- ]life|life insurance)\b|\bdeath benefit\s+(?:is\s+)?not\s+(?:provided|payable|available)\b/i.test(value);
 const hasHypotheticalEvidence=/\b(?:insurance guide|example\s+(?:term[- ]life|life insurance)|illustrative\s+(?:term[- ]life|life insurance)|hypothetical\s+(?:term[- ]life|life insurance))\b/i.test(value);
 return hasTermLifeIdentity&&!hasHealthEvidence&&!hasNegatedLifeEvidence&&!hasHypotheticalEvidence;
}
function candidates(text){
 const reviewText=extractedPrefix(text);
 if(!isClearTermLifePolicy(reviewText))return [];
 const lines=reviewText.split(/\n/).map(s=>s.replace(/[*_#|]/g,' ').replace(/\s+/g,' ').trim()).filter(Boolean);
 const rules=[['cover','Sum assured',/(?:sum assured|life cover|death benefit)\s*[:\-]?\s*((?:(?:INR|Rs\.?|₹)\s*)?\d[\d,.]*\s*(?:crore|lakh|lac)?)/i,moneyAmount],['premium','Premium',/(?:annual|yearly|monthly)\s+premium\s*[:\-]?\s*((?:(?:INR|Rs\.?|₹)\s*)?\d[\d,.]*)/i,moneyAmount],['term','Policy term',/policy term\s*[:\-]?\s*(\d+)\s*years?/i,s=>s],['paymentTerm','Premium payment term',/premium (?:payment|paying) term\s*[:\-]?\s*(\d+)\s*years?/i,s=>s],['age','Policyholder age',/(?:policyholder age|age of (?:the )?life assured)\s*[:\-]?\s*(\d+)/i,s=>s]];
 const found=[];
 for(const [key,label,pattern,parse] of rules){const matches=lines.flatMap(line=>[...line.matchAll(new RegExp(pattern.source,'ig'))].map(match=>({line,match})));const unique=[...new Set(matches.map(x=>parse(x.match[1])))];if(unique.length!==1||!unique[0])continue;if(key==='premium'&&new Set(matches.map(x=>/monthly/i.test(x.match[0])?'monthly':'annual')).size>1)continue;found.push({key,label,value:unique[0],source:matches[0].line.slice(0,320)});if(key==='premium')found.push({key:'frequency',label:'Premium frequency',value:/monthly/i.test(matches[0].match[0])?'monthly':'annual',source:matches[0].line.slice(0,320)});}
 return found;
}

module.exports={candidates,isClearTermLifePolicy};
