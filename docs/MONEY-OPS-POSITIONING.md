# Money Ops: policy first, money decisions next

Updated 8 September 2026. Proposed positioning, not validated demand.

## The value proposition

**Understand your policy. Know your next money move.**

Start with the document already in the buyer's hand. Help them find cover limits, exclusions, waiting periods, benefits and the questions to ask. Put the loan comparison below so it becomes an optional next step. A buyer reviewing a policy should never need to enter loan details.

My view: a document summariser alone is too easy to substitute. The opportunity is a useful decision after the reading, with a source for each policy fact and a calculation for each money outcome.

## What AnyDoc contributes

[Firecrawl AnyDoc](https://github.com/firecrawl/anydoc) is MIT-licensed conversion infrastructure. Its [browser/WASM version](https://github.com/firecrawl/anydoc/blob/main/wasm/README.md) can convert supported files on the device. It supplies extracted text, not a policy interpretation, suitability assessment or personalised financial recommendation. It does not perform local OCR.

The implementation self-hosts AnyDoc 0.2.4, runs conversion in a worker, caps files at 5 MB and stops work after 20 seconds. No OCR service or hosted LLM receives the file. English public wording is the supported intake, with buyer details removed before selection. Common identifier masking is only an additional precaution. Do not claim complete anonymisation.

## Market check

| Reference | Verified capability | Implication for Money Ops |
| --- | --- | --- |
| [Policybazaar AI](https://ai.policybazaar.com/) | AI insurance advice, plan exploration and a Scan Policy PDF entry | PDF intake and an insurance chatbot are already in the market |
| [Ditto](https://joinditto.in/) | Plain-English policy explanations, expert advice, comparison and claim support | Easy explanations and human help are established expectations |
| [Adobe Acrobat AI Assistant](https://helpx.adobe.com/acrobat/using/get-ai-generated-answers.html) | Document answers with source citations and questions across PDFs | Citations alone will not distinguish the product |

This is a bounded public-site review. It is not a full competitor audit, and absence of a feature on these pages is not evidence that a competitor lacks it.

## A defensible direction to test

1. **A personal policy check, with evidence.** Reconcile the wording, schedule and endorsements. Show covered, conditional, excluded and unknown separately. Link every statement to the exact source and retain conflicting clauses. This needs a verified interpretation layer; the current reader only finds passages.
2. **Benefits people can actually use.** Extract an annual checkup's eligibility, limit, booking route and deadline. Do not invent the insurer's contact or a reminder date. Measure successful benefit use, not summaries generated.
3. **A money consequence after each finding.** After the user confirms a premium and the amount already reserved, compare the remaining surplus against loan options. For example, INR 2 lakh minus INR 70,000 reserve and INR 30,000 unfunded premium leaves INR 1 lakh to model. These are illustrative inputs, not an automatic reserve recommendation.
4. **Independence people can understand.** Test a user-paid review or subscription before lender/insurer commissions. Any commercial relationship must be disclosed; do not claim neutrality while secretly ranking by referral income. No price is validated yet.
5. **Privacy with an inspectable implementation.** Keep files local by default. Offer separate, explicit consent only if hosted OCR or expert review is introduced later. No silent upload or training use. Local conversion is a capability, not proof that every product risk has been solved.

The durable asset would be a tested Indian policy interpretation system, verified clause-to-action rules and correction evidence collected with consent. AnyDoc itself is open source and available to every competitor.

## Implemented in this pass

- Policy reader first, loan part-payment tool below, one page.
- Actual browser-side AnyDoc conversion for English PDF, Word and RTF wording.
- Six topic groups with matching source passages and extracted-paragraph references.
- A sample read through the same converter, clear/cancel controls and local PDF guide export.
- Honest missing-text, scan, encrypted-file and load/error states.

Not implemented: AI plain-language interpretation of arbitrary policies, OCR, multiple-document reconciliation, verified insurer contacts, claim advice, reminder scheduling, automated premium extraction or combined recommendations. The guide must not label a keyword match as confirmed cover.

## Validation before expanding

Invite ten people with public policy wording. Ask each to find a waiting period, an exclusion and a usable benefit, then explain the answer without help. Have an insurance specialist independently mark the relevant clauses and contradictions. Record completion, corrected misunderstandings, unsupported claims and time to evidence. A goal for the pilot is zero unsupported coverage statements; do not launch personalised interpretation until evaluation supports it.

Then offer the loan step without prompting and measure how many choose it and understand the trade-off. If almost nobody wants it, retain it as a separate tool rather than forcing a combined story. Test willingness to pay only after the reading reliably helps.
