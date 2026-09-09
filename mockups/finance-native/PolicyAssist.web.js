import React, { useRef, useState, useEffect } from 'react';
import { DrawablyButton as Button } from 'drawably/react';
import { Disclosure } from './components/DecisionFields.web';
import { candidates } from './policyAssist.cjs';
import { reviewPolicy } from './policyReview.cjs';
import { summarizePolicy } from './policySummary.cjs';
import './policy-summary.css';

function LazyDisclosure({ title, children }) {
  const [open, setOpen] = useState(false);
  return <Disclosure title={title} onToggle={event => setOpen(event.currentTarget.open)}>{open ? children : null}</Disclosure>;
}

function Excerpt({ text }) {
  const [full, setFull] = useState(false);
  const long = text.length > 1600;
  return <>
    <p className="policy-source-text">{long && !full ? text.slice(0, 1600) + '…' : text}</p>
    {long && <button type="button" className="quiet" aria-expanded={full} onClick={() => setFull(!full)}>
      {full ? 'Show shorter preview' : 'Preview shortened · show remaining source text'}
    </button>}
  </>;
}

function SummaryJson({ summary }) {
  return <pre tabIndex={0} aria-label="Policy summary JSON">{JSON.stringify(summary, null, 2)}</pre>;
}

function PolicySummary({ summary, review }) {
  return <section className="policy-summary" aria-labelledby="policy-summary-title">
    <div className="policy-summary-heading">
      <h3 id="policy-summary-title">Your policy, in brief</h3>
      <p className="small">{summary.title}</p>
    </div>
    <p className="small">Highlights from your document. Check the source wording before acting.</p>
    {summary.truncated && <p className="error" role="alert">Partial reading: this document exceeds the review limit. Check the full original policy.</p>}
    <dl className="policy-highlights">
      {summary.highlights.map(item => <div className="policy-highlight" key={item.id}>
        <dt>{item.label}</dt>
        <dd>
          <p>{item.text}</p>
          {item.sources.length > 0 && <LazyDisclosure title={`Source for ${item.label.toLowerCase()}`}>
            {item.sources.map((source, index) => <div className="policy-source" key={index}>
              <small>{source.location}</small>
              <Excerpt text={source.text} />
            </div>)}
          </LazyDisclosure>}
        </dd>
      </div>)}
    </dl>
    <LazyDisclosure title="Explore policy wording">
      <p className="small">{review.disclaimer}</p>
      {review.sections.map(section => <LazyDisclosure key={section.id} title={`${section.title} · ${section.excerpts.length ? `${section.excerpts.length} passages` : 'Not found'}`}>
        <p className="small">{section.help}</p>
        {section.excerpts.length ? section.excerpts.map((excerpt, index) => <div className="policy-source" key={index}>
          <small>{excerpt.location}</small><Excerpt text={excerpt.text} />
        </div>) : <p>Not found in extracted text. This does not mean the benefit is excluded.</p>}
        {section.omitted > 0 && <p className="small">{section.omitted} more matches are in the original document. This view shows the first six.</p>}
      </LazyDisclosure>)}
    </LazyDisclosure>
    <LazyDisclosure title="About this summary">
      <p>Prepared on this device using text-matching rules. It can miss details in tables or unfamiliar wording, and does not confirm active cover or suitability.</p>
      {summary.limitations.map((text, index) => <p className="small" key={index}>{text}</p>)}
      <p className="small">{review.privacyNote}</p>
      <LazyDisclosure title="Structured data (JSON)">
        <p className="small">These are the fields and sources used to prepare the highlights above.</p>
        <SummaryJson summary={summary} />
      </LazyDisclosure>
    </LazyDisclosure>
  </section>;
}

export default function PolicyAssist({ onApply }) {
  const job = useRef(null), input = useRef(null), sequence = useRef(0);
  const [busy, setBusy] = useState(false), [found, setFound] = useState([]);
  const [selected, setSelected] = useState({}), [message, setMessage] = useState('');
  const [result, setResult] = useState(null);
  const stop = () => {
    if (job.current) {
      clearTimeout(job.current.timer);
      job.current.worker.terminate();
      job.current = null;
    }
  };
  useEffect(() => () => { sequence.current++; stop(); }, []);
  const clear = () => {
    sequence.current++; stop(); setBusy(false); setFound([]); setSelected({});
    setMessage(''); setResult(null);
    if (input.current) input.current.value = '';
  };
  async function choose(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    clear();
    if (!file.name.toLowerCase().endsWith('.pdf') || !file.size || file.size > 5 * 1024 * 1024) {
      setMessage('Choose a text PDF between 1 byte and 5 MB.'); return;
    }
    setBusy(true);
    const version = sequence.current;
    try {
      const bytes = await file.arrayBuffer();
      if (version !== sequence.current) return;
      const worker = new Worker('/anydoc-worker.js', { type: 'module' });
      const finish = () => { stop(); setBusy(false); };
      const timer = setTimeout(() => { finish(); setMessage('Reading timed out. Try again or enter term-life details manually.'); }, 60000);
      job.current = { worker, timer };
      worker.onmessage = ({ data }) => {
        if (version !== sequence.current || data.ready) return;
        finish();
        if (data.error) {
          setMessage(data.error.code === 'needsOcr'
            ? 'This PDF is scanned. Choose a text PDF; OCR is not supported.'
            : data.error.code === 'encrypted'
              ? 'This PDF needs a password. Choose an unlocked copy.'
              : 'This PDF could not be read. Try an original text PDF.');
          return;
        }
        try {
          const text = data.markdown || '';
          const review = reviewPolicy(text), summary = summarizePolicy(text);
          setResult({ review, summary }); setFound(candidates(text));
          setMessage(review.looksLikeInsurance ? 'Your policy summary is ready.' : 'File read. We could not identify insurance wording.');
        } catch { setMessage('We could not organise this document. Try a shorter policy file.'); }
      };
      worker.onerror = () => {
        if (version !== sequence.current) return;
        finish(); setMessage('The local reader could not load. Please try again.');
      };
      worker.postMessage({ bytes, format: 'pdf' }, [bytes]);
    } catch {
      if (version !== sequence.current) return;
      stop(); setBusy(false); setMessage('The file could not be opened. Please choose it again.');
    }
  }
  return <div className="policy-assist">
    <div className="policy-upload-row">
      <Button type="button" boil={false} className={result ? 'quiet policy-upload' : 'primary policy-upload'} onClick={() => input.current?.click()} disabled={busy}>
        {result ? 'Read another PDF' : 'Upload policy PDF'}
      </Button>
      <p className="small">Text PDF · up to 5 MB · read on this device</p>
      {(busy || message) && <button type="button" className="quiet" onClick={clear}>{busy ? 'Cancel reading' : 'Clear document'}</button>}
    </div>
    <input ref={input} type="file" accept="application/pdf,.pdf" onChange={choose} aria-label="Upload policy PDF for local reading" hidden disabled={busy} />
    {!result && <Disclosure title="File support & privacy">
      <p>Text-based PDFs only, up to 1,000,000 characters of extracted text. Scanned pages need OCR, which this preview does not support.</p>
      <p>Your document stays in this browser session. Reading it does not confirm active cover. Calculator values are only applied after you check their sources.</p>
    </Disclosure>}
    {busy && <p className="policy-reading" role="status">Reading the PDF and preparing your highlights…</p>}
    {!!message && <p className="small" role="status">{message}</p>}
    {result && <PolicySummary summary={result.summary} review={result.review} />}
    {found.length > 0 && <Disclosure title="Use detected values in the term-life calculator">
      <p className="small">Check each value against its source, then select the values to apply.</p>
      {found.map(item => <label className="assist-candidate" key={item.key}>
        <span><input type="checkbox" checked={!!selected[item.key]} onChange={e => setSelected({ ...selected, [item.key]: e.target.checked })} />Use {item.label}: <strong>{item.value}</strong></span>
        <small>Source: {item.source}</small>
      </label>)}
      <Button type="button" boil={false} className="primary" disabled={!Object.values(selected).some(Boolean)} onClick={() => {
        if (selected.premium && !selected.frequency) { setMessage('Confirm the premium frequency too before applying its amount.'); return; }
        onApply(Object.fromEntries(found.filter(item => selected[item.key]).map(item => [item.key, item.value])));
        setMessage('Confirmed values applied to the term-life calculator.');
      }}>Apply confirmed values</Button>
    </Disclosure>}
  </div>;
}
