'use strict';

const assert=require('node:assert/strict');
const {compareLoan}=require('./loanMath');
const close=(actual,expected,tolerance=.01)=>assert.ok(Math.abs(actual-expected)<=tolerance,`Expected ${actual} to be within ${tolerance} of ${expected}`);

{
 const result=compareLoan({balance:120000,annualRate:12,months:12,prepayment:20000});
 close(result.emi,10661.8546414,.001);
 close(result.baseline.interest,7942.2556968,.001);
 close(result.shorter.interest,5534.1696143,.001);
 close(result.lower.emi,8884.8788678,.001);
 close(result.lower.interest,6618.546414,.001);
 close(result.savings,2408.0860826,.001);
 close(result.monthlyRelief,1776.9757736,.001);
 assert.equal(result.baseline.months,12);
 assert.equal(result.shorter.months,10);
 assert.equal(result.lower.months,12);
 assert.equal(result.shorter.balances.at(-1),0);
 close(result.shorter.balances.at(-2),9482.6513284,.001);
 assert.ok(result.shorter.balances.at(-2)*1.01<result.emi,'The last shorter-term payment is capped below the EMI.');
}

{
 const result=compareLoan({balance:120000,annualRate:0,months:12,prepayment:20000});
 close(result.emi,10000);
 close(result.baseline.interest,0);
 close(result.shorter.interest,0);
 close(result.lower.emi,8333.3333333,.001);
 assert.equal(result.shorter.months,10);
 assert.equal(result.lower.balances.at(-1),0);
}

{
 const result=compareLoan({balance:120000,annualRate:12,months:12,prepayment:120000});
 assert.equal(result.shorter.months,0);
 assert.equal(result.lower.months,0);
 assert.deepEqual(result.shorter.balances,[0]);
 assert.equal(result.lower.emi,0);
 close(result.savings,result.baseline.interest,.001);
}

{
 const result=compareLoan({balance:120000,annualRate:12,months:12,prepayment:0});
 close(result.savings,0,.000001);
 close(result.monthlyRelief,0,.000001);
 close(result.shorter.interest,result.baseline.interest,.000001);
 close(result.lower.emi,result.emi,.000001);
}

for(const balance of [1000,120000,1e7])for(const annualRate of [0,.01,12,40])for(const months of [1,12,360])for(const ratio of [0,.5,1]){
 const result=compareLoan({balance,annualRate,months,prepayment:balance*ratio});
 assert.equal(result.baseline.months,months,`Baseline term drifted for ${balance}/${annualRate}/${months}/${ratio}.`);
 assert.equal(result.baseline.balances.at(-1),0);
 assert.ok(result.shorter.months<=months);
 assert.ok(result.lower.months<=months);
 assert.equal(result.shorter.balances.at(-1),0);
 assert.equal(result.lower.balances.at(-1),0);
}

console.log('loanMath tests passed');
