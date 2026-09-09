'use strict';

const {reviewPolicy,redact}=require('./policyReview.cjs');
const MAX_EXTRACTED_CHARS=1000000;

function reviewedBlocks(markdown){
 const blocks=[];let consumed=0;
 String(markdown||'').split(/\n\s*\n/).forEach((paragraph,index)=>{
  consumed+=paragraph.length+2;
  if(consumed>MAX_EXTRACTED_CHARS)return;
  const text=redact(paragraph.trim());
  if(text)blocks.push({text,location:`Extracted paragraph ${index+1}`});
 });
 return blocks;
}
function focusedSentence(text,pattern){
 const value=String(text||'');
 const match=value.search(pattern);
 if(match<0)return '';
 let start=0;
 for(let index=match-1;index>=0;index--)if(/[|\n!?]/.test(value[index])||(value[index]==='.'&&/\s+[A-Z#*]/.test(value.slice(index+1)))){start=index+1;break;}
 let end=value.length;
 for(let index=match;index<value.length;index++)if(/[|\n!?]/.test(value[index])||(value[index]==='.'&&(/\s+[A-Z#*]/.test(value.slice(index+1))||index===value.length-1))){end=index+1;break;}
 const first=value.slice(start,end).replace(/\s+/g,' ').trim();
 if(!first||first.length>260)return '';
 const after=value.slice(end);
 const next=/^\s*([^.!?\n|]+[.!?])/.exec(after)?.[1]?.trim()||'';
 return next&&/\b(subject to|provided|unless|except|however|not applicable|only if)\b/i.test(next)&&first.length+next.length+1<=320?`${first} ${next}`:first;
}
function sourceSentence(items,pattern){
 const item=items.find(value=>pattern.test(value.text));
 const value=item?item.text.replace(/\s+/g,' ').trim():'';
 const sentenceCount=(value.match(/[.!?](?=\s+[A-Z]|$)/g)||[]).length;
 return value.length<=320&&sentenceCount<=2?value:focusedSentence(item?.text,pattern);
}
function labelledAmounts(items,pattern){
 const values=[];
 for(const item of items){
  for(const match of item.text.matchAll(pattern)){const before=match[0].slice(0,match[0].length-match[1].length);const currency=/(INR|Rs\.?|₹)\s*$/i.exec(before)?.[1];values.push({value:`${currency?`${currency} `:''}${match[1].replace(/[.,]+$/,'').replace(/\s+/g,' ').trim()}`,source:item});}
 }
 return values;
}
function unique(values){return [...new Set(values.map(value=>value.value.replace(/[\s,]/g,'').toLowerCase()))];}
function nearbyValues(items,pattern){
 const values=[];
 for(const item of items)for(const match of item.text.matchAll(pattern)){const value=match.slice(1).find(Boolean);if(value)values.push(value.replace(/\s+/g,' ').trim());}
 return [...new Set(values)];
}
function scheduleValue(items,pattern){
 for(const item of items){
  if(!/(plan details|premium details|date of commencement|plan variant)/i.test(item.text))continue;
  const match=pattern.exec(item.text);
  if(match&&/\b(example|illustrative)\b/i.test(item.text.slice(Math.max(0,match.index-160),match.index+match[0].length+160)))continue;
  if(match)return {value:match[1].replace(/\s+/g,' ').trim(),source:{...item,matchIndex:match.index}};
 }
 return null;
}
function sourceExcerpt(item,id){
 if(item.text.length<=1800)return {text:item.text,location:item.location};
 const pattern={cover:/sum (?:insured|assured)|cover(?:age)? limit/i,premium:/premium/i,'annualised-premium':/annualised premium/i,'policy-term':/policy term/i,'payment-frequency':/premium payment mode|premium payment term/i,'plan-variant':/plan variant/i,maternity:/maternity cover/i,waiting:/waiting period/i,exclusions:/not covered|does not cover|not payable|exclusion/i,'cost-share':/co[- ]?pay|deductible/i,claims:/cashless|claim|reimburse|pre-authori[sz]ation/i}[id]||/.*/;
 const index=item.matchIndex??Math.max(0,item.text.search(pattern));
 const start=Math.max(0,index-300),end=Math.min(item.text.length,start+1800);
 return {text:`${start?'…':''}${item.text.slice(start,end)}${end<item.text.length?'…':''}`,location:item.location,excerpt:true};
}
function fact(id,label,text,status,items){
 const uniqueItems=[...new Map(items.map(item=>[`${item.location}:${item.matchIndex??''}`,item])).values()];
 const omitted=uniqueItems.length-3;
 return {id,label,text:omitted>0?`${text} More matching passages are available in the source.`:text,status,sources:uniqueItems.slice(0,3).map(item=>sourceExcerpt(item,id))};
}
function documentType(text){
 const health=/\b(health insurance|hospitali[sz]ation|inpatient|outpatient|cashless|co[- ]?pay|waiting period|sum insured)\b/i.test(text);
 const termLife=/\b(term[- ]life|life insurance|life assured|life insured|death benefit|sum assured)\b/i.test(text)&&!/(not a life insurance policy|illustrative[^.\n]{0,40}term[- ]life|sample[^.\n]{0,40}term[- ]life|example[^.\n]{0,40}term[- ]life)/i.test(text);
 if(health&&termLife)return 'unknown';
 if(health)return 'health';
 if(termLife)return 'term-life';
 return 'unknown';
}

function summarizePolicy(markdown){
 const review=reviewPolicy(markdown);
 const blocks=review.looksLikeInsurance?reviewedBlocks(markdown):[];
 const coverage=blocks.filter(item=>/\b(sum insured|sum assured|cover(?:ed|age|s)?|hospitali[sz]ation|inpatient)\b/i.test(item.text));
 const exclusions=blocks.filter(item=>/\b(exclu\w*|not covered|does not cover|not payable|except)\b/i.test(item.text));
 const waiting=blocks.filter(item=>/\b(wait(?:ing)?|pre[- ]?existing|renew\w*|expiry|commenc\w*)\b/i.test(item.text));
 const costs=blocks.filter(item=>/\b(annual|yearly|monthly)\s+premium\b/i.test(item.text));
 const claims=blocks.filter(item=>/\b(claim|cashless|reimburse\w*|pre-authori[sz]ation|notify)\b/i.test(item.text));
 const raw=String(markdown||'').slice(0,MAX_EXTRACTED_CHARS);
 const deathBenefit=scheduleValue(blocks,/sum assured on death\s+as\s+([\d,.]+)/i);
 const policyTerm=scheduleValue(blocks,/policy term\s*(?:\(in years\))?\s*(\d+)/i);
 const paymentTerm=scheduleValue(blocks,/premium payment term \(in\s*(\d+)/i);
 const paymentMode=scheduleValue(blocks,/premium payment mode\s+(monthly|annual|yearly|quarterly|semi-annual)/i);
 const annualisedPremium=scheduleValue(blocks,/annualised premium\s+([\d,.]+)/i);
 const modalPremium=scheduleValue(blocks,/premium payable as per\s+([\d,.]+)\s+premium payment mode selected/i);
 const planVariant=scheduleValue(blocks,/plan variant\s+(regular cover|regular|[^\d|\n]{2,40})/i);
 const maternity=scheduleValue(blocks,/maternity cover\s+(no|yes)\b/i);
 const explicitHealth=/\bhealth insurance\b/i.test(raw);
 const type=deathBenefit&&policyTerm?'term-life':explicitHealth?'health':documentType(raw);
 const coverAmounts=labelledAmounts(blocks,/(?:base[ \t]+)?sum (?:insured|assured)[ \t]*(?:is|:|-)[ \t]*((?:(?:INR|Rs\.?|₹)[ \t]*)?\d[\d,.]*[ \t]*(?:crore|lakh|lac)?)/ig);
 const premiumAmounts=labelledAmounts(blocks,/(?:annual|yearly|monthly)[ \t]+premium[ \t]*(?:is|:|-)?[ \t]*((?:(?:INR|Rs\.?|₹)[ \t]*)?\d[\d,.]*)/ig);
 const premiumFrequencies=new Set(premiumAmounts.map(value=>/monthly\s+premium/i.test(value.source.text)?'monthly':'annual'));
 const sharePattern=/\b(deductible|co[- ]?pay(?:ment)?|cost share)\b/i;
 const waitPattern=/\b(wait(?:ing)?|pre[- ]?existing)\b/i;
 const exclusionPattern=/\b(exclu\w*|not covered|does not cover|not payable|except)\b/i;
 const claimPattern=/\b(claim|cashless|reimburse\w*|pre-authori[sz]ation)\b/i;
 const unsafeCover=/\b(example|illustrative|previous polic|migrated polic|maximum|up to)\b/i;
 const safeCoverAmounts=coverAmounts.filter(value=>!unsafeCover.test(value.source.text));
 const cover=deathBenefit
  ? fact('cover','Cover or sum insured',`The schedule states a sum assured on death of ₹${deathBenefit.value}.`,'found',[deathBenefit.source])
  : safeCoverAmounts.length===0
  ? coverAmounts.length
   ? fact('cover','Cover or sum insured','A labelled cover amount appears in an example, historical, maximum or table context. Check the source before relying on it.','check',coverAmounts.map(value=>value.source))
   : fact('cover','Cover or sum insured','Not found in the reviewed text.','not-found',coverage)
  : unique(safeCoverAmounts).length>1
   ? fact('cover','Cover or sum insured','Conflicting cover amounts were found. Check the source before using an amount.','check',safeCoverAmounts.map(value=>value.source))
   : fact('cover','Cover or sum insured',`The document states ${safeCoverAmounts[0].value} for ${/sum assured/i.test(safeCoverAmounts[0].source.text)?'sum assured':'sum insured or cover limit'}.`,'found',[safeCoverAmounts[0].source]);
 const premium=modalPremium&&paymentMode
  ? fact('premium','Premium due',`The schedule lists a ${paymentMode.value.toLowerCase()} premium of ₹${modalPremium.value}${/including applicable taxes/i.test(modalPremium.source.text)?', including applicable taxes':''}.${annualisedPremium?` It separately lists an annualised premium of ₹${annualisedPremium.value}.`:''}`,'found',[modalPremium.source,...(annualisedPremium?[annualisedPremium.source]:[])])
  : annualisedPremium
   ? fact('premium','Annualised premium',`The schedule lists an annualised premium of ₹${annualisedPremium.value}.`,'found',[annualisedPremium.source])
  : premiumAmounts.length===0
  ? fact('premium','Premium','No labelled annual, yearly or monthly premium was found in the reviewed text.','not-found',costs)
  : unique(premiumAmounts).length>1||premiumFrequencies.size>1
   ? fact('premium','Premium','Conflicting labelled premium amounts or frequencies were found. Check the source before using an amount.','check',premiumAmounts.map(value=>value.source))
   : fact('premium','Premium',`The document states a labelled premium of ${premiumAmounts[0].value}.`,'found',[premiumAmounts[0].source]);
 const waitingText=sourceSentence(waiting,/\bwaiting(?: period)?\b/i);
 const exclusionText=sourceSentence(exclusions,/\b(not covered|does not cover|not payable|exclusions? (?:apply|include|are))\b/i);
 const shareSources=blocks.filter(item=>sharePattern.test(item.text));
 const shareText=sourceSentence(shareSources,sharePattern);
 const claimSources=claims.filter(item=>claimPattern.test(item.text));
 const safeClaimSources=claimSources.filter(item=>!/\b(example|illustrative|sample|not covered|excluded)\b/i.test(item.text));
 const claimText=sourceSentence(safeClaimSources,/\b(cashless|reimburse\w*|pre-authori[sz]ation)\b/i);
 const passageText=(value,items)=>value?['found',value]:items.length?['check','A matching passage is available, but it is too long to summarize safely. Check the source.']:['not-found','Not found in the reviewed text.'];
 let [waitingStatus,waitingSummary]=passageText(waitingText,waiting.filter(item=>waitPattern.test(item.text)));
 let [exclusionStatus,exclusionSummary]=passageText(exclusionText,exclusions.filter(item=>exclusionPattern.test(item.text)));
 const [shareStatus,shareSummary]=passageText(shareText,shareSources);
 let [claimStatus,claimSummary]=passageText(claimText,claimSources);
 const noWaiting=waiting.flatMap(item=>[...item.text.matchAll(/\bno waiting period(?: of)?\s*(\d+\s*(?:days?|months?|years?))\s+applies\b/ig)].map(match=>match[1]));
 if(noWaiting.length){waitingStatus='check';waitingSummary=`The wording states that no waiting period of ${noWaiting[0]} applies. Check the source for its scope.`;}
 const waitingValues=nearbyValues(waiting,/(?:waiting(?: period)?[^\d.\n]{0,30}(\d+\s*(?:days?|months?|years?))|(\d+\s*(?:days?|months?|years?))[^.\n]{0,40}waiting)/ig).map(value=>value||'').filter(Boolean);
 if(!noWaiting.length&&waitingStatus==='check'&&waitingValues.length)waitingSummary=`The wording lists waiting periods of ${waitingValues.slice(0,3).join(', ')}. Check the source for who and what each applies to.`;
 const excludedTopics=[...new Set(exclusions.flatMap(item=>['pre-existing conditions','maternity','outpatient care','dental care','cosmetic treatment'].filter(topic=>new RegExp(`${topic.replace(' ','[- ]')}[^.\n]{0,160}(?:not covered|(?<!not )excluded)|(?:not covered|(?<!not )excluded)[^.\n]{0,160}${topic.replace(' ','[- ]')}`,'i').test(item.text))))];
 if(exclusionStatus==='check'&&excludedTopics.length)exclusionSummary=`The wording has an exclusion or limit for ${excludedTopics.slice(0,3).join(', ')}. Check the stated conditions in the source.`;
 if(claimStatus==='check'&&claimSources.some(item=>/\bcashless\b/i.test(item.text)))claimSummary='The wording mentions cashless claim handling. Check the source for the stated process.';
 const waitingHighlight=fact('waiting','Waiting periods',waitingSummary,waitingStatus,waiting);
 const exclusionsHighlight=fact('exclusions','Exclusions',exclusionSummary,exclusionStatus,exclusions);
 const shareHighlight=fact('cost-share','Cost share',shareSummary,shareStatus,shareSources);
 const claimsHighlight=fact('claims','Claims',claimSummary,claimStatus,claims);
 const highlights=[cover,premium];
 if(type==='term-life'){
  if(policyTerm)highlights.push(fact('policy-term','Policy term',`The schedule lists a policy term of ${policyTerm.value} years.`,'found',[policyTerm.source]));
  if(paymentMode||paymentTerm)highlights.push(fact('payment-frequency','Premium payment',paymentMode?`The schedule lists a ${paymentMode.value.toLowerCase()} premium payment mode.`:`The schedule lists a premium payment term of ${paymentTerm.value} years.`,'found',[...(paymentMode?[paymentMode.source]:[]),...(paymentTerm?[paymentTerm.source]:[])]));
  if(planVariant)highlights.push(fact('plan-variant','Plan variant',`The schedule lists ${planVariant.value.trim()}.`,'found',[planVariant.source]));
  if(maternity)highlights.push(fact('maternity','Maternity cover',`The schedule lists maternity cover as ${maternity.value.toLowerCase()}.`,'found',[maternity.source]));
  highlights.push(...[waitingHighlight,exclusionsHighlight].filter(highlight=>highlight.status!=='not-found'));
 }else highlights.push(waitingHighlight,exclusionsHighlight,shareHighlight,claimsHighlight);
 const limitations=['This local keyword summary does not confirm active cover or personal suitability.'];
 if(type==='unknown')limitations.push('The document type could not be identified confidently from the reviewed text.');
 if(!review.looksLikeInsurance)limitations.push('No clear insurance wording was identified in the reviewed text.');
 if(review.truncated)limitations.push('Only the first 1,000,000 extracted characters were reviewed; later paragraphs were not summarized.');
 return {schemaVersion:1,documentType:type,title:type==='health'?'Health policy summary':type==='term-life'?'Term-life policy summary':'Policy summary',highlights,limitations,truncated:review.truncated};
}

module.exports={summarizePolicy};
