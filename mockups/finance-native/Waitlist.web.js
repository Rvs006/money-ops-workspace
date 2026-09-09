import React, { useEffect, useState } from "react";
import HoverLogo from "./HoverLogo.web";
import "./waitlist.css";

const paperformId = process.env.EXPO_PUBLIC_PAPERFORM_ID;

export default function Waitlist() {
  const [previewAvailable, setPreviewAvailable] = useState(true);

  useEffect(() => {
    document.documentElement.dataset.theme = "light";
    document.title = "Money Ops · Join the waitlist";
  }, []);

  useEffect(() => {
    if (!paperformId) return undefined;
    const source = "https://paperform.co/__embed.min.js";
    const existing = document.querySelector(`script[src="${source}"]`);
    if (existing) return undefined;
    const script = document.createElement("script");
    script.src = source;
    script.async = true;
    document.body.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <main className="waitlist-page">
      <section className="waitlist-hero" aria-labelledby="waitlist-title">
        <header className="waitlist-header">
          <a className="waitlist-brand" href="#waitlist-title" aria-label="Money Ops">
            <HoverLogo />
            <span>Money Ops</span>
          </a>
          <a className="waitlist-product-link" href="?app=1">
            Open the prototype
          </a>
        </header>

        <div className="waitlist-intro">
          <h1 id="waitlist-title">Understand your cover.<br />Know what to check next.</h1>
          <p className="waitlist-lead">
            Bring your policy details into focus. Check the source, understand
            what needs a closer look, and make your next money decision with clarity.
          </p>

          <section className="waitlist-signup" aria-labelledby="waitlist-signup-title">
            <h2 id="waitlist-signup-title">Join the waitlist</h2>
            {paperformId ? (
              <div
                className="waitlist-paperform"
                data-paperform-id={paperformId}
                title="Join the Money Ops waitlist"
              />
            ) : (
              <p className="waitlist-form-pending">
                Signups open soon.
              </p>
            )}
            {paperformId && (
              <a
                className="waitlist-paperform-fallback"
                href={`https://${encodeURIComponent(paperformId)}.paperform.co`}
              >
                Open the signup form
              </a>
            )}
            <p className="waitlist-form-note">Get an email when Money Ops is ready to try.</p>
          </section>
        </div>
      </section>

      <section className="waitlist-preview" aria-label="Money Ops app preview">
        {previewAvailable ? (
          <img
            className="waitlist-preview-image"
            src="/money-ops-hand-angled-v3.png"
            alt="A hand holding an angled iPhone displaying the Money Ops policy reader against a soft colour band"
            width={1536}
            height={1024}
            onError={() => setPreviewAvailable(false)}
          />
        ) : (
          <p className="waitlist-preview-missing">
            A product preview will be available here shortly.
          </p>
        )}
      </section>

      <footer className="waitlist-footer">
        <span>Money Ops</span>
        <p className="waitlist-capability-note">App preview. Text PDFs only; scanned documents are not supported. Confirm extracted details: they do not establish active cover or suitability.</p>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </main>
  );
}
