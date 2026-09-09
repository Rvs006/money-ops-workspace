const TOPICS = [
  ['coverage', 'Cover mentioned', 'Matching passages only. Read exclusions and conditions before treating a benefit as covered.', /\b(cover(?:ed|age|s)?|insured|hospitali[sz]ation|inpatient)\b/i],
  ['exclusions', 'Limits and exclusions', 'A restriction can also appear elsewhere in the document.', /\b(exclu\w*|not covered|does not cover|not payable|except|deductible|co[- ]?pay|sub[- ]?limit)\b/i],
  ['waiting', 'Waiting periods and term', 'Check when cover starts, ends and becomes available.', /\b(wait(?:ing)?|renew\w*|expiry|expires|commenc\w*|policy period|policy year|term of|pre[- ]existing)\b/i],
  ['benefits', 'Other benefits', 'These passages may contain eligibility rules and benefit limits.', /\b(check[- ]?up|outpatient|OPD|wellness|ambulance|benefit|dental|maternity|preventive)\b/i],
  ['costs', 'Payments and charges', 'These are source passages, not a calculation of what you will pay.', /\b(premium|charge|fee|cost|deductible|co[- ]?pay|tax|GST)\b/i],
  ['claims', 'Claims and help', 'Use verified insurer contact details from your original document.', /\b(claim|cashless|reimburse\w*|helpline|contact|grievance|notify|notification)\b/i],
];

// Best effort only: free-form identity details can remain. Never claim anonymisation.
function redact(text) {
  return String(text)
    .split('\n').map(line => /\b(?:policy\s*(?:no\.?|number|#)|(?:insured|proposer|patient|customer|member|nominee)(?:\s+full)?\s*name|name\s+of\s+(?:insured|proposer|patient)|address|date\s+of\s+birth|dob)\s*[:#\-]/i.test(line) ? '[Personal detail removed]' : line)
    .join('\n')
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, '[Email removed]')
    .replace(/\b[A-Z]{5}\d{4}[A-Z]\b/gi, '[PAN removed]')
    .replace(/\b\d{4}[ -]\d{4}[ -]\d{4}\b/g, '[ID removed]')
    .replace(/(?<!\d)\d{12}(?!\d)/g, '[ID removed]')
    .replace(/(?<!\d)(?:\+91[ -]?)?[6-9]\d{4}[ -]?\d{5}(?!\d)/g, '[Phone removed]')
    .replace(/((?:phone|mobile|tel(?:ephone)?|helpline)\s*[:.]?\s*)(?:\+?\d[\d ()-]{7,}\d)/gi, '$1[Phone removed]');
}

function reviewPolicy(markdown) {
  const limit = 1000000;
  const original = String(markdown || '');
  const looksLikeInsurance = /\b(insurance|insurer|insured|policyholder|sum assured|sum insured|cashless|policy period|policy year)\b/i.test(original);
  // Keep entire paragraphs: cutting at a character can drop a condition or negation.
  const raw = original.split(/\n\s*\n/);
  const blocks = [];
  let consumed = 0;
  let heading = '';
  let omittedParagraphs = 0;
  raw.forEach((paragraph, index) => {
    consumed += paragraph.length + 2;
    if (consumed > limit) { omittedParagraphs++; return; }
    const text = redact(paragraph.trim());
    if (!text) return;
    const hashHeading = /^#{1,6}\s+(.+?)(?:\s+#+)?$/.exec(text);
    const boldHeading = text.length <= 120 ? /^\*\*([^\n]+)\*\*$/.exec(text) : null;
    if (!text.includes('\n') && (hashHeading || boldHeading)) {
      heading = (hashHeading || boldHeading)[1].trim();
      return;
    }
    blocks.push({ text: heading ? `${heading}\n${text}` : text, location: `Extracted paragraph ${index + 1}` });
  });
  const sections = TOPICS.map(([id, title, help, pattern]) => {
    const matches = looksLikeInsurance ? blocks.filter(block => pattern.test(block.text)) : [];
    return { id, title, help, excerpts: matches.slice(0, 6), omitted: Math.max(0, matches.length - 6), status: matches.length ? 'matching passages' : 'not found in extracted text' };
  });
  return {
    sections,
    looksLikeInsurance,
    omittedParagraphs,
    truncated: omittedParagraphs > 0,
    disclaimer: 'Keyword matches, not confirmed coverage. Missing text does not mean a benefit is excluded. Locations refer to extracted paragraphs, not original PDF pages.',
    privacyNote: 'Common identifiers were filtered. This is best-effort filtering, not complete anonymisation. Review before sharing.',
  };
}

module.exports = { reviewPolicy, redact };
