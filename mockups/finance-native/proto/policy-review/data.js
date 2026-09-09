import {reviewPolicy} from '../../policyReview.cjs';
export const SAMPLE=`# Fictional health policy wording

This document is a demonstration, not an insurance contract.

## Hospital cover

Eligible inpatient hospital treatment is covered up to INR 5,00,000 per policy year, subject to the exclusions and waiting periods below.

## Exclusions

Routine outpatient consultations are not covered. Cosmetic treatment is excluded unless medically necessary following an accident.

## Waiting periods

A 30-day initial waiting period applies to illness. Accidental injuries are exempt from this initial waiting period. Pre-existing diseases have a 36-month waiting period.

## Benefits

One annual health checkup is available up to INR 2,000 after one completed policy year, at an approved centre.

## Costs

A 10 percent co-payment applies to each eligible claim. The premium and renewal date are stated in the individual policy schedule, which is not included here.

## Claims

For a planned cashless admission, seek pre-authorisation from the insurer at least 48 hours before admission. Contact details are not supplied in this fictional document.`;
export const sampleReview=reviewPolicy(SAMPLE);
export const noMatchReview={...sampleReview,sections:sampleReview.sections.map(section=>({...section,excerpts:[],omitted:0,status:'not found in extracted text'}))};
