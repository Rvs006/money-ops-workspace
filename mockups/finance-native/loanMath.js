'use strict';

const EPSILON=1e-7;

function monthlyPayment(principal,monthlyRate,months){
 if(principal<=0)return 0;
 if(monthlyRate===0)return principal/months;
 return principal*monthlyRate/-Math.expm1(-months*Math.log1p(monthlyRate));
}

function amortize(principal,monthlyRate,payment,maxMonths){
 let balance=principal;
 let interest=0;
 const balances=[principal];
 let paidMonths=0;
 const cap=Math.max(maxMonths+2,2);
 const tolerance=Math.max(EPSILON,principal*1e-11);
 while(balance>tolerance&&paidMonths<cap){
  const monthInterest=balance*monthlyRate;
  const due=balance+monthInterest;
  const actualPayment=Math.min(payment,due);
  interest+=monthInterest;
  balance=due-actualPayment;
  if(balance<=tolerance)balance=0;
  balances.push(balance);
  paidMonths+=1;
 }
 if(balance>EPSILON)throw new Error('Loan did not amortize within the expected term.');
 return {interest,months:paidMonths,balances};
}

function compareLoan({balance,annualRate,months,prepayment}){
 const principal=Number(balance);
 const rate=Number(annualRate);
 const term=Number(months);
 const partPayment=Number(prepayment);
 if(!Number.isFinite(principal)||!Number.isFinite(rate)||!Number.isFinite(term)||!Number.isFinite(partPayment))throw new TypeError('Loan inputs must be finite numbers.');
 const monthlyRate=rate/1200;
 const emi=monthlyPayment(principal,monthlyRate,term);
 const baseline=amortize(principal,monthlyRate,emi,term);
 const reducedPrincipal=Math.max(0,principal-partPayment);
 const shorter=amortize(reducedPrincipal,monthlyRate,emi,term);
 const lowerEmi=monthlyPayment(reducedPrincipal,monthlyRate,term);
 const lower=amortize(reducedPrincipal,monthlyRate,lowerEmi,term);
 return {emi,baseline,shorter,lower:{emi:lowerEmi,...lower},savings:baseline.interest-shorter.interest,monthlyRelief:emi-lowerEmi};
}

module.exports={compareLoan};
