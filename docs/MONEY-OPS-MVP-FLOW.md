# Money Ops MVP flow: design-review scope

Decision recorded 9 September 2026 from the user's revised flow.

Money Ops helps people choose financial products and understand the consequences. Every completed decision should state an outcome, supporting amounts, assumptions and a next step.

## Navigation

Demo phone sign-up -> demo OTP -> demo quick-access setup -> Home.
Home -> Loans -> True Cost Comparison or Have Surplus Funds.
Home -> Insurance -> Understand your Insurance or Compare Insurance.
Credit Cards, Mutual Funds and Financial Dashboard are upcoming.

## Working review scope

- Approved flat blue scanner SVG with white rupee glyph and animated scan rail.
- Drawably controls and responsive product navigation.
- Loan cost comparison including flat/reducing rates, monthly repayments, upfront fees, insurance and total borrowing cost.
- Prepayment baseline, shorter tenure, lower EMI, fee effects and a hypothetical investment comparison over equal time and cashflow budgets.
- Existing local policy-wording reader with cited extracted paragraphs and a preliminary comparison worksheet.
- Explicitly simulated authentication. User confirmed demo-only on 9 September 2026.

## Calculation assumptions

Amounts use INR. Tenure is whole months. Fees entered are absolute rupees including any applicable taxes, paid upfront rather than financed. Rates stay constant through the model and payments are monthly. No tax deductions, missed payments, changing rates or lender-specific rounding are inferred.

Same loan type and same principal are required to select a cost winner. Unequal tenures are not hidden: a longer term may lower EMI while increasing total cost. Equal totals are a tie, not a winner.

For surplus decisions, keep the chosen reserve aside in both paths. Prepayment fees come from the remaining surplus. Compare investment balances at the original loan maturity, investing payment savings at each month end in the prepayment path. The user's annual investment assumption is net of fees/tax and converted to a monthly compound rate. Hypothetical outcomes do not establish investment suitability or guarantee returns.

## Production work still needed

Phone OTP provider and server-side sessions; secure device access with MPIN/biometric recovery rules; consent and retention design; validated insurance extraction and product-specific suitability rules; independent financial-model review; error monitoring and accessibility validation on physical devices.

## Reference basis

RBI's loan disclosure guidance uses all-in borrowing costs and Key Facts Statements: https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=9862
SEBI's investor guidance says to consider risk and that investment returns are not guaranteed: https://investor.sebi.gov.in/investment-thingsbeforeinv.html

## Corrected specification adopted

The9September attachment supersedes earlier insurance comparison and multi-screen navigation. Three tools share one page. Three loan offers maximum; Flow1 prepay intent deferred. APR/GST/financed premiums and same-horizon surplus analysis are implemented. Term life is information-only with manual review plus confirmed local text-PDF assist. Scanned OCR, statutory asset-specific taxation, real authentication and scheduled policy reminders remain outside this design-review implementation. The user's requested dot interaction is applied to the default-playing flat logo on hover/focus/touch.
