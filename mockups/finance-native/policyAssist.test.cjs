const assert=require('node:assert/strict');
const {candidates,isClearTermLifePolicy}=require('./policyAssist.cjs');
const get=text=>Object.fromEntries(candidates(text).map(x=>[x.key,x.value]));
const life='Term life insurance\nSum assured: INR 50 lakh\nAnnual premium: INR 15,000\nPolicy term: 30 years';
assert.deepEqual(get(life),{cover:'5000000',premium:'15000',frequency:'annual',term:'30'});
assert.equal(get('Term life insurance\nSum assured: 500000 Sum assured: 1000000').cover,undefined);
assert.equal(get('Term life insurance\nAnnual premium: 1000 Monthly premium: 1000').premium,undefined);
assert.equal(get('Term life insurance\nAnnual premium: 15000. Another monthly benefit is payable.').frequency,'annual');
assert.deepEqual(get('Call 1234567890. This is an unlabelled quote.'),{});
const lateTermLife=`Term life insurance\n\n${'x'.repeat(999970)}\n\nSum assured: INR 50 lakh\nAnnual premium: INR 15,000\nPolicy term: 30 years`;
assert.deepEqual(get(lateTermLife),{});
const health='Health insurance\nSum insured: INR 5 lakh\nAnnual premium: INR 15,000\nCashless hospitalisation has a 30-day waiting period.';
assert.equal(isClearTermLifePolicy(health),false);
assert.deepEqual(get(health),{});
const mixed='Term life insurance rider with health insurance hospitalisation cover\nAnnual premium: INR 15,000\nSum assured: INR 50 lakh';
assert.equal(isClearTermLifePolicy(mixed),false);
assert.deepEqual(get(mixed),{});
for(const text of ['This is not life insurance','Insurance guide. Example term-life policy','Critical illness insurance. Death benefit is not provided']){
 assert.equal(isClearTermLifePolicy(text),false);
 assert.deepEqual(get(text),{});
}
async function verifyFixture(){
 const fs=require('node:fs');
 const {default:init,toMarkdownBytes}=await import('@firecrawl/anydoc-wasm');
 await init({module_or_path:fs.readFileSync('node_modules/@firecrawl/anydoc-wasm/anydoc_wasm_bg.wasm')});
 const text=toMarkdownBytes(fs.readFileSync('test-fixtures/term-life-assist.pdf'),'pdf');
 assert.equal(isClearTermLifePolicy(text),true);
 assert.deepEqual(get(text),{cover:'5000000',premium:'15000',frequency:'annual',term:'30',paymentTerm:'20',age:'30'});
 console.log('PDF assist parser: labelled term-life extraction, ambiguity, health-policy guard and fixture extraction passed.');
}
verifyFixture().catch(error=>{console.error(error);process.exitCode=1;});
