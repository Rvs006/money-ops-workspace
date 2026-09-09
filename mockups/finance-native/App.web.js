import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { DrawablyCard as Card } from "drawably/react";
import {
  Action,
  Field,
  Slider,
  Fact,
  RateField,
  TermField,
  FeeField,
  Disclosure,
} from "./components/DecisionFields.web";
import "drawably/style.css";
import "./app.web.css";
import "./workspace-ux.css";
import HoverLogo from "./HoverLogo.web";
import Waitlist from "./Waitlist.web";
import PolicyAssist from "./PolicyAssist.web";
import {
  CostStory,
  PrepayStory,
  RateStory,
} from "./components/MoneyVisuals.web";
import { compareOffers, evaluateSurplus, evaluateTermLife } from "./mvpMath";
const money = (n) => "₹" + Math.round(n || 0).toLocaleString("en-IN");
const pct = (n) => (Number(n) || 0).toFixed(2) + "%";
const types = [
  "Personal loan",
  "Home loan",
  "Auto loan",
  "Gold loan",
  "Business loan",
];
const newOffer = (name = "Offer C") => ({
  name,
  loanType: "Personal loan",
  amount: "500000",
  annualRate: "11",
  rateType: "reducing",
  tenure: "36",
  tenureUnit: "months",
  processingFee: "1",
  processingFeeType: "percent",
  gstRate: "18",
  insurance: "0",
  insuranceFinanced: false,
  otherFees: "0",
});
export function MoneyOpsApp() {
  const [policyFieldsOpen, setPolicyFieldsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("insurance");
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("money-ops-theme") === "dark"
        ? "dark"
        : "light";
    } catch {
      return "light";
    }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("money-ops-theme", theme);
    } catch {}
  }, [theme]);
  const [profile, setProfile] = useState({
    taxSlab: "20",
    income: "",
    dependents: "",
    liabilities: "",
    monthlyExpenses: "",
  });
  const [offers, setOffers] = useState([
      newOffer("Offer A"),
      { ...newOffer("Offer B"), annualRate: "10.5", processingFee: "2" },
    ]),
    [comparison, setComparison] = useState(null),
    [offerError, setOfferError] = useState("");
  const [surplus, setSurplus] = useState({
      loanType: "Personal loan",
      balance: "500000",
      annualRate: "11",
      rateType: "reducing",
      rateNature: "fixed",
      tenure: "36",
      tenureUnit: "months",
      currentEmi: "",
      surplus: "100000",
      prepaymentFee: "0",
      feeType: "flat",
      otherFees: "0",
      investmentRate: "7",
      investmentPreset: "fd",
      mode: "tenure",
      emergencyBuffer: "",
      bufferMonths: "6",
      annualLoanTaxBenefit: "0",
    }),
    [surplusResult, setSurplusResult] = useState(null),
    [surplusError, setSurplusError] = useState("");
  const [policy, setPolicy] = useState({
      cover: "5000000",
      premium: "15000",
      frequency: "annual",
      term: "30",
      paymentTerm: "",
      age: "30",
      insurer: "",
      nominee: "",
      riders: "",
      exclusions: "",
      renewalDate: "",
      incomeMultiple: "12",
    }),
    [policyReviewed, setPolicyReviewed] = useState(false),
    [policyError, setPolicyError] = useState("");
  useEffect(() => {
    document.title = "Money Ops · One money workspace";
  }, []);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let lenis;
    const configure = () => {
      lenis?.destroy();
      lenis = preference.matches
        ? undefined
        : new Lenis({
            autoRaf: true,
            anchors: true,
            syncTouch: false,
            lerp: 0.12,
          });
    };
    configure();
    preference.addEventListener("change", configure);
    return () => {
      preference.removeEventListener("change", configure);
      lenis?.destroy();
    };
  }, []);
  useEffect(() => {
    if (comparison) focusResult("loan-result");
  }, [comparison]);
  useEffect(() => {
    if (surplusResult) focusResult("surplus-result");
  }, [surplusResult]);
  useEffect(() => {
    if (policyReviewed) focusResult("policy-result");
  }, [policyReviewed]);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const sections = [...document.querySelectorAll(".decision-section")];
      const current =
        sections.filter((el) => el.getBoundingClientRect().top <= 160).at(-1) ||
        sections[0];
      if (current) setActiveSection(current.id);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    return () => {
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);
  const navigateSection = (e) => {
    const hash = e.currentTarget.hash;
    const target = document.querySelector(hash);
    const opensProfile = target?.id === "profile-details";
    if (!opensProfile && e.detail !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    if (target) {
      if (opensProfile) setProfileOpen(true);
      target.scrollIntoView({ behavior: "instant", block: "start" });
      requestAnimationFrame(() => target.focus({ preventScroll: true }));
      history.replaceState(null, "", hash);
    }
  };
  const setP = (k, v) => {
    setProfile((p) => ({ ...p, [k]: v }));
    setSurplusResult(null);
    setPolicyReviewed(false);
  };
  const setS = (k, v) => {
    setSurplus((s) => ({
      ...s,
      [k]: v,
      ...(k === "loanType" && v === "Home loan"
        ? { rateType: "reducing" }
        : {}),
      ...((k === "loanType" &&
        v === "Home loan" &&
        s.rateNature === "floating") ||
      (k === "rateNature" && v === "floating" && s.loanType === "Home loan")
        ? { prepaymentFee: "0" }
        : {}),
    }));
    setSurplusResult(null);
  };
  const setO = (i, k, v) => {
    setOffers((a) =>
      a.map((o, j) =>
        i === j
          ? {
              ...o,
              [k]: v,
              ...(k === "loanType" && v === "Home loan"
                ? { rateType: "reducing" }
                : {}),
            }
          : o,
      ),
    );
    setComparison(null);
  };
  const months = (o) => Number(o.tenure) * (o.tenureUnit === "years" ? 12 : 1);
  const compare = () => {
    try {
      setComparison(
        compareOffers(
          offers.map((o) => ({
            ...o,
            amount: Number(o.amount),
            annualRate: Number(o.annualRate),
            months: months(o),
            processingFee: Number(o.processingFee),
            insuranceMode: o.insuranceFinanced ? "financed" : "upfront",
            gstRate: Number(o.gstRate),
            insurance: Number(o.insurance || 0),
            otherFees: Number(o.otherFees || 0),
          })),
        ),
      );
      setOfferError("");
    } catch (e) {
      setOfferError(e.message);
      setComparison(null);
    }
  };
  const assessSurplus = () => {
    try {
      validateProfile(profile);
      setSurplusResult(
        evaluateSurplus({
          ...surplus,
          balance: Number(surplus.balance),
          annualRate: Number(surplus.annualRate),
          months: months(surplus),
          surplus: Number(surplus.surplus),
          prepaymentFee: Number(surplus.prepaymentFee),
          prepaymentFeeType: surplus.feeType,
          otherFees: Number(surplus.otherFees || 0),
          investmentRate: Number(surplus.investmentRate),
          taxSlab: Number(profile.taxSlab),
          monthlyExpenses:
            profile.monthlyExpenses === ""
              ? undefined
              : Number(profile.monthlyExpenses),
          reserve:
            surplus.emergencyBuffer === ""
              ? undefined
              : Number(surplus.emergencyBuffer),
          bufferMonths: Number(surplus.bufferMonths),
          loanTaxBenefitEligible: Number(surplus.annualLoanTaxBenefit) > 0,
          annualLoanTaxBenefit: Number(surplus.annualLoanTaxBenefit),
          currentEMI:
            surplus.currentEmi === "" ? undefined : Number(surplus.currentEmi),
        }),
      );
      setSurplusError("");
    } catch (e) {
      setSurplusError(e.message);
      setSurplusResult(null);
    }
  };
  const foreclosure = Number(surplus.surplus) >= Number(surplus.balance);
  const updatePolicy = (k, v) => {
    setPolicy((p) => ({ ...p, [k]: v }));
    if (k !== "incomeMultiple") setPolicyReviewed(false);
    setPolicyError("");
  };
  const reviewPolicy = () => {
    try {
      validateProfile(profile);
      evaluateTermLife({
        cover: policy.cover,
        premium: policy.premium,
        premiumFrequency: policy.frequency,
        age: policy.age,
        policyTerm: policy.term,
        annualIncome: profile.income || undefined,
        liabilities: profile.liabilities || 0,
        dependents: profile.dependents || 0,
        dueDate: policy.renewalDate || undefined,
      });
      if (
        !Number.isInteger(Number(policy.age)) ||
        !Number.isInteger(Number(policy.term)) ||
        Number(policy.age) + Number(policy.term) > 120
      )
        throw new Error(
          "Use a whole-number age and policy term ending by age 120.",
        );
      if (
        policy.paymentTerm &&
        (!Number.isInteger(Number(policy.paymentTerm)) ||
          Number(policy.paymentTerm) < 1 ||
          Number(policy.paymentTerm) > Number(policy.term))
      )
        throw new Error(
          "Premium payment term must be a whole number of years within the policy term.",
        );
      setPolicyError("");
      setPolicyReviewed(true);
      setPolicyFieldsOpen(false);
    } catch (e) {
      setPolicyError(e.message);
      setPolicyReviewed(false);
    }
  };
  const income = Number(profile.income),
    liabilities = Number(profile.liabilities || 0),
    target = income * Number(policy.incomeMultiple) + liabilities,
    gap = Math.max(0, target - Number(policy.cover));
  const sectionLabel = {
    insurance: "Read policy",
    compare: "Compare loans",
    surplus: "Prepay or invest",
  }[activeSection];
  return (
    <div className="money-app onepage" id="top" tabIndex={-1}>
      <header className="app-header">
        <div className="brand">
          <HoverLogo />
          <a href="#top">Money Ops</a>
        </div>
        <div className="header-tools">
          <span className="preview-label">Editable sample numbers</span>
          <button
            type="button"
            className="theme-toggle"
            role="switch"
            aria-checked={theme === "dark"}
            aria-label="Dark mode"
            onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
          >
            <span aria-hidden="true">
              {theme === "light" ? "Light" : "Dark"}
            </span>
            <span className="theme-switch-track" aria-hidden="true">
              <span />
            </span>
          </button>
        </div>
      </header>
      <nav className="app-nav" aria-label="Money decisions">
        <a
          href="#insurance"
          data-label="Read policy"
          aria-current={activeSection === "insurance" ? "location" : undefined}
          onClick={navigateSection}
        >
          Read policy
        </a>
        <a
          href="#compare"
          data-label="Compare loans"
          aria-current={activeSection === "compare" ? "location" : undefined}
          onClick={navigateSection}
        >
          Compare loans
        </a>
        <a
          href="#surplus"
          data-label="Prepay or invest"
          aria-current={activeSection === "surplus" ? "location" : undefined}
          onClick={navigateSection}
        >
          Prepay or invest
        </a>
      </nav>
      <main className="workspace">
        <nav className="workspace-trail" aria-label="Current location">
          <a href="#top" onClick={navigateSection}>Workspace</a>
          <span aria-hidden="true">/</span>
          <a href={`#${activeSection}`} onClick={navigateSection} aria-current="location">
            {sectionLabel}
          </a>
        </nav>
        <div className="page-title">
          <h1>Make sense of your policy.</h1>
          <p className="muted">
            Upload a policy for the key points in plain English.
          </p>
        </div>
        <section id="insurance" tabIndex={-1} className="decision-section">
          <div className="section-heading">
            <span className="section-index">01</span>
            <div>
              <h2>Your policy</h2>
            </div>
          </div>
          <div>
            <PolicyAssist
              onApply={(patch) => {
                const map = {
                  policyTerm: "term",
                  premiumPaymentTerm: "paymentTerm",
                  nextPremiumDate: "renewalDate",
                  waitingPeriod: "exclusions",
                };
                setPolicy((p) => ({
                  ...p,
                  ...Object.fromEntries(
                    Object.entries(patch).map(([k, v]) => [
                      map[k] || k,
                      String(v),
                    ]),
                  ),
                }));
                setPolicyReviewed(false);
                setPolicyFieldsOpen(true);
              }}
            />
          </div>
          <Disclosure title="Term-life calculator details" open={policyFieldsOpen} onToggle={e => setPolicyFieldsOpen(e.currentTarget.open)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              reviewPolicy();
            }}
          >
            <div className="insurance-fields">
              <section>
                <h3>The cover you hold</h3>
                <Field
                  label="Policy type"
                  value="Term life"
                  options={["Term life"]}
                  disabled
                  status="L"
                  onChange={() => {}}
                />
                <Field
                  label="Sum assured (₹)"
                  min={1}
                  value={policy.cover}
                  onChange={(v) => {
                    setPolicy((p) => ({ ...p, cover: v }));
                    setPolicyReviewed(false);
                  }}
                />
                <div className="term-fields">
                  <Field
                    label="Premium amount (₹)"
                    min={1}
                    value={policy.premium}
                    onChange={(v) => updatePolicy("premium", v)}
                  />
                  <Field
                    label="Frequency"
                    value={policy.frequency}
                    options={["annual", "monthly"]}
                    onChange={(v) => updatePolicy("frequency", v)}
                  />
                </div>
                <div className="fields-grid">
                  <Field
                    label="Policy term (years)"
                    min={1}
                    max={80}
                    step={1}
                    value={policy.term}
                    onChange={(v) => updatePolicy("term", v)}
                  />
                  <Field
                    label="Policyholder age"
                    min={18}
                    max={100}
                    step={1}
                    value={policy.age}
                    onChange={(v) => updatePolicy("age", v)}
                  />
                </div>
              </section>
              <section>
                <h3>Policy details</h3>
                <Field
                  label="Premium payment term (years)"
                  status="O"
                  min={1}
                  max={80}
                  step={1}
                  value={policy.paymentTerm}
                  placeholder="e.g., 20"
                  onChange={(v) => updatePolicy("paymentTerm", v)}
                />
                {[
                  ["insurer", "Insurer"],
                  ["nominee", "Nominee"],
                  ["riders", "Riders / add-ons"],
                  ["exclusions", "Waiting periods / exclusions"],
                ].map(([k, label]) => (
                  <Field
                    key={k}
                    label={label}
                    type="text"
                    status="O"
                    value={policy[k]}
                    placeholder={
                      k === "insurer"
                        ? "e.g., name on your policy"
                        : k === "nominee"
                          ? "e.g., spouse or parent"
                          : k === "riders"
                            ? "e.g., waiver of premium"
                            : "e.g., waiting period wording"
                    }
                    onChange={(v) => updatePolicy(k, v)}
                  />
                ))}
                <Field
                  label="Next premium due date"
                  status="O"
                  type="date"
                  value={policy.renewalDate}
                  onChange={(v) => updatePolicy("renewalDate", v)}
                  hint="Shows an on-page due-date flag. No reminder is scheduled."
                />
              </section>
            </div>
            <Action type="submit" className="primary">
              Review my term-life cover
            </Action>
          </form>
          </Disclosure>
          {policyError && (
            <p className="error" role="alert">
              {policyError}
            </p>
          )}
          {policyReviewed && (
            <section
              id="policy-result"
              tabIndex={-1}
              className="recommendation"
              aria-live="polite"
            >
              <h3>
                {!income
                  ? "Add annual income to check adequacy."
                  : gap > 0
                    ? "Your cover is below this rule-of-thumb target."
                    : "Your cover meets this rule-of-thumb target."}
              </h3>
              <p>From your entries. Confirm active cover with your insurer.</p>
              <div className="policy-facts">
                <Fact label="Cover" value={money(Number(policy.cover))} />
                <Fact
                  label="Premium"
                  value={money(Number(policy.premium)) + " · " + policy.frequency}
                />
                <Fact label="Policy term" value={policy.term + " years"} />
                <Fact
                  label="Premium payment term"
                  value={policy.paymentTerm ? policy.paymentTerm + " years" : "Confirm in policy"}
                />
                <Fact label="Next premium due" value={policy.renewalDate || "Not entered"} />
              </div>
              {income > 0 ? (
                <>
                  <div className="verdict-delta">
                    <div>
                      <strong>{money(gap)}</strong>
                      <span>Potential coverage gap</span>
                    </div>
                    <div>
                      <strong>{money(target)}</strong>
                      <span>Illustrative cover target</span>
                    </div>
                  </div>
                  <p className="small">
                    Why: {policy.incomeMultiple} × annual income + existing
                    liabilities. This target excludes assets and inflation.
                  </p>
                </>
              ) : (
                <p className="small">
                  <a href="#profile-details" onClick={navigateSection}>Add income in Your details</a> to check adequacy.
                </p>
              )}
              <Disclosure title="Assumptions and checks">
              <Slider
                label="Income multiple · rule of thumb"
                value={policy.incomeMultiple}
                min={10}
                max={15}
                step={1}
                suffix="×"
                onChange={(v) => updatePolicy("incomeMultiple", v)}
              />
              <div className="gap-list">
                <p>
                  {profile.dependents
                    ? `Dependents entered: ${profile.dependents}. Budget their needs separately.`
                    : "Add dependents for a fuller review."}
                </p>
                <p>
                  Age {policy.age} with a {policy.term}-year term ends around age {Number(policy.age) + Number(policy.term)}.
                </p>
                <p>
                  {policy.nominee
                    ? "Nominee recorded: " + policy.nominee
                    : "Gap to check: nominee details are missing."}
                </p>
                <p>
                  {policy.exclusions
                    ? "Waiting periods / exclusions: " + policy.exclusions
                    : "Gap to check: waiting periods and exclusions have not been confirmed."}
                </p>
                <p>
                  {policy.riders
                    ? "Riders: " + policy.riders
                    : "No riders entered. Check whether any additional benefits are attached."}
                </p>
                <p>
                  {policy.renewalDate
                    ? `Next premium date: ${policy.renewalDate}. ${new Date(policy.renewalDate + "T23:59:59") < new Date() ? "This date has passed. Confirm payment and policy status with the insurer." : "Check the insurer’s grace period and keep the premium funded."}`
                    : "Add a premium due date to flag upcoming or overdue payments. No lapse status can be inferred without it."}
                </p>
              </div>
              {policy.paymentTerm &&
                Number(policy.paymentTerm) > Number(policy.term) && (
                  <p className="error">
                    Check the payment term: it is longer than the policy term
                    you entered.
                  </p>
                )}
              <p className="small">
                No insurer or product recommendation. Check the wording and insurer.
              </p>
              </Disclosure>
            </section>
          )}
        </section>
        <section id="profile-details" tabIndex={-1} className="shared-profile" aria-label="Your details">
          <Disclosure
            open={profileOpen}
            onToggle={(e) => setProfileOpen(e.currentTarget.open)}
            title={<><span>Your details</span><small>Used by calculators. Not needed to read a policy.</small></>}
          >
            <div className="fields-grid">
              <Field
                label="Tax slab (%)"
                status="D"
                min={0}
                max={50}
                value={profile.taxSlab}
                onChange={(v) => setP("taxSlab", v)}
                hint="20% example. Investment tax can differ."
              />
              <Field
                label="Monthly essential expenses (₹)"
                status="O"
                value={profile.monthlyExpenses}
                placeholder="e.g., 45000"
                onChange={(v) => setP("monthlyExpenses", v)}
                hint="Used when no buffer amount is entered."
              />
              {[
                ["income", "Annual income (₹)"],
                ["dependents", "Number of dependents"],
                ["liabilities", "Existing liabilities (₹)"],
              ].map(([k, label]) => (
                <Field
                  key={k}
                  label={label}
                  status="O"
                  step={k === "dependents" ? 1 : "any"}
                  value={profile[k]}
                  placeholder={
                    k === "income"
                      ? "e.g., 900000"
                      : k === "dependents"
                        ? "e.g., 2"
                        : "e.g., 1500000"
                  }
                  onChange={(v) => setP(k, v)}
                />
              ))}
            </div>
          </Disclosure>
        </section>
        <section id="compare" tabIndex={-1} className="decision-section">
          <div className="section-heading">
            <span className="section-index">02</span>
            <div>
              <h2>True cost comparison</h2>
              <p>Compare rates, fees and financing.</p>
            </div>
          </div>
          <Disclosure title="Edit loan offers and compare">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              compare();
            }}
          >
            <div className={"offer-grid offers-" + offers.length}>
              {offers.map((o, i) => (
                <Card boil={false} roughness={0.4} className="offer" key={i}>
                  <div className="offer-heading">
                    <h3>Offer {String.fromCharCode(65 + i)}</h3>
                    {offers.length > 2 && (
                      <button
                        type="button"
                        className="quiet"
                        onClick={() => {
                          setOffers((a) => a.filter((_, j) => i !== j));
                          setComparison(null);
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <Field
                    label="Offer name"
                    type="text"
                    value={o.name}
                    onChange={(v) => setO(i, "name", v)}
                  />
                  <Field
                    label="Loan type"
                    value={o.loanType}
                    options={types}
                    onChange={(v) => setO(i, "loanType", v)}
                  />
                  <Field
                    label="Sanctioned principal (₹)"
                    value={o.amount}
                    min={1}
                    onChange={(v) => setO(i, "amount", v)}
                  />
                  <Field
                    label="Interest (% p.a.)"
                    value={o.annualRate}
                    onChange={(v) => setO(i, "annualRate", v)}
                  />
                  <RateField
                    loanType={o.loanType}
                    value={o.rateType}
                    set={(v) => setO(i, "rateType", v)}
                  />
                  <TermField
                    value={o.tenure}
                    unit={o.tenureUnit}
                    setValue={(v) => setO(i, "tenure", v)}
                    setUnit={(v) => setO(i, "tenureUnit", v)}
                  />
                  <FeeField
                    label="Processing fee"
                    value={o.processingFee}
                    basis={o.processingFeeType}
                    setValue={(v) => setO(i, "processingFee", v)}
                    setBasis={(v) => setO(i, "processingFeeType", v)}
                  />
                  <Slider
                    label="GST applied to processing fee"
                    value={o.gstRate}
                    max={28}
                    step={1}
                    onChange={(v) => setO(i, "gstRate", v)}
                  />
                  <Disclosure title="Extra fees">
                    <Field
                      label="Loan-protection premium (₹)"
                      status="O"
                      value={o.insurance}
                      onChange={(v) => setO(i, "insurance", v)}
                    />
                    {Number(o.insurance) > 0 && (
                      <Field
                        label="Premium payment"
                        status="D"
                        value={o.insuranceFinanced ? "financed" : "upfront"}
                        onChange={(v) =>
                          setO(i, "insuranceFinanced", v === "financed")
                        }
                        options={[
                          { value: "upfront", label: "Pay upfront" },
                          {
                            value: "financed",
                            label: "Add to loan · accrues interest",
                          },
                        ]}
                      />
                    )}
                    <Field
                      label="Other fees incl. taxes (₹)"
                      status="O"
                      value={o.otherFees}
                      onChange={(v) => setO(i, "otherFees", v)}
                      hint="Legal, valuation, stamp duty and MODT combined."
                    />
                  </Disclosure>
                </Card>
              ))}
            </div>
            <div className="form-actions">
              <Action type="submit" className="primary">
                Compare true costs
              </Action>
              {offers.length < 3 && (
                <button
                  type="button"
                  className="quiet"
                  onClick={() => {
                    setOffers((a) => [...a, newOffer()]);
                    setComparison(null);
                  }}
                >
                  + Add third offer
                </button>
              )}
            </div>
            <p className="small">
              Full-tenure comparison. Planned prepayment is deferred to a later
              version.
            </p>
          </form>
          </Disclosure>
          {offerError && (
            <p className="error" role="alert">
              {offerError}
            </p>
          )}
          {comparison && (
            <OfferResults
              result={comparison}
              offers={offers}
              setO={setO}
              compare={compare}
            />
          )}
        </section>
        <section id="surplus" tabIndex={-1} className="decision-section">
          <div className="section-heading">
            <span className="section-index">03</span>
            <div>
              <h2>Have surplus funds?</h2>
              <p>
                Keep a buffer, then compare your options.
              </p>
            </div>
          </div>
          <Disclosure title="Surplus details">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              assessSurplus();
            }}
          >
            <div className="surplus-form">
              <section>
                <h3>Your loan today</h3>
                <Field
                  label="Loan type"
                  value={surplus.loanType}
                  options={types}
                  onChange={(v) => setS("loanType", v)}
                />
                <div className="fields-grid">
                  <Field
                    label="Outstanding balance (₹)"
                    value={surplus.balance}
                    min={1}
                    onChange={(v) => setS("balance", v)}
                  />
                  <Field
                    label="Interest (% p.a.)"
                    value={surplus.annualRate}
                    onChange={(v) => setS("annualRate", v)}
                  />
                </div>
                <RateField
                  loanType={surplus.loanType}
                  value={surplus.rateType}
                  set={(v) => setS("rateType", v)}
                />
                {surplus.rateType === "flat" && (
                  <p className="small">
                    Flat conversion assumes the remaining amount and tenure
                    describe the remaining flat payment schedule. Check these
                    against your lender statement.
                  </p>
                )}
                <Field
                  label="Rate arrangement"
                  status="D"
                  value={surplus.rateNature}
                  onChange={(v) => setS("rateNature", v)}
                  options={["fixed", "floating"]}
                />
                <TermField
                  label="Remaining tenure"
                  value={surplus.tenure}
                  unit={surplus.tenureUnit}
                  setValue={(v) => setS("tenure", v)}
                  setUnit={(v) => setS("tenureUnit", v)}
                />
                <Field
                  label="Current EMI (₹)"
                  status="O"
                  value={surplus.currentEmi}
                  placeholder="e.g., 16400"
                  onChange={(v) => setS("currentEmi", v)}
                  hint="If supplied, we check it against the loan details."
                />
              </section>
              <section>
                <h3>Your surplus plan</h3>
                <Field
                  label="Surplus amount (₹)"
                  min={1}
                  value={surplus.surplus}
                  onChange={(v) => setS("surplus", v)}
                />
                <p className="path-note">
                  {foreclosure
                    ? "Foreclosure path · enough surplus to cover principal before fees and buffer."
                    : "Part-payment path · choose a smaller EMI or an earlier finish."}
                </p>
                {!foreclosure && (
                  <Field
                    label="Prepayment goal"
                    status="D"
                    value={surplus.mode}
                    onChange={(v) => setS("mode", v)}
                    options={[
                      { value: "tenure", label: "Reduce tenure · keep EMI" },
                      { value: "emi", label: "Reduce EMI · keep tenure" },
                    ]}
                  />
                )}
                <FeeField
                  label={foreclosure ? "Foreclosure fee" : "Part-payment fee"}
                  value={surplus.prepaymentFee}
                  basis={surplus.feeType}
                  setValue={(v) => setS("prepaymentFee", v)}
                  setBasis={(v) => setS("feeType", v)}
                />
                {surplus.loanType === "Home loan" &&
                  surplus.rateNature === "floating" && (
                    <p className="small">
                      Floating-rate home-loan prepayment fee defaults to nil for
                      eligible individual non-business loans. Confirm the
                      lender’s terms.
                    </p>
                  )}
                <Field
                  label="Other fees (₹)"
                  status="O"
                  value={surplus.otherFees}
                  onChange={(v) => setS("otherFees", v)}
                />
                <Field
                  label="Emergency buffer to retain (₹)"
                  status="O"
                  value={surplus.emergencyBuffer}
                  placeholder="e.g., 270000"
                  onChange={(v) => setS("emergencyBuffer", v)}
                  hint={<><a href="#profile-details" onClick={navigateSection}>Add monthly expenses in Your details</a> to estimate this. Without either, liquidity is unverified.</>}
                />
                <Slider
                  label="Buffer months when estimated"
                  value={surplus.bufferMonths}
                  min={3}
                  max={6}
                  step={1}
                  suffix=" months"
                  onChange={(v) => setS("bufferMonths", v)}
                />
              </section>
            </div>
            <div className="assumption-workbench">
              <h3>Investment inputs</h3>
              <Field
                label="Illustrative return preset"
                value={surplus.investmentPreset}
                status="D"
                options={[
                  { value: "fd", label: "FD · 7% example" },
                  { value: "debt", label: "Debt · 8% example" },
                  { value: "equity", label: "Equity · 11% example" },
                ]}
                onChange={(v) => {
                  setSurplus((s) => ({
                    ...s,
                    investmentPreset: v,
                    investmentRate: { fd: "7", debt: "8", equity: "11" }[v],
                  }));
                  setSurplusResult(null);
                }}
              />
              <Slider
                label="Expected annual return before tax"
                value={surplus.investmentRate}
                min={-10}
                max={25}
                onChange={(v) => setS("investmentRate", v)}
              />
              <p className="small">
                Illustrative only. Tax uses your editable slab; equity and debt-fund rules can differ.
              </p>
              <Disclosure title="Loan tax benefit">
                <Slider
                  label="Confirmed annual loan-interest tax saving"
                  value={surplus.annualLoanTaxBenefit}
                  min={0}
                  max={100000}
                  step={1000}
                  suffix=" ₹"
                  onChange={(v) => setS("annualLoanTaxBenefit", v)}
                />
                <p className="small">
                  Default ₹0. Enter a benefit only if you have confirmed eligibility under section 24(b) or 80C.
                </p>
              </Disclosure>
            </div>
            <Action type="submit" className="primary">
              Compare all four scenarios
            </Action>
          </form>
          </Disclosure>
          {surplusError && (
            <p className="error" role="alert">
              {surplusError}
            </p>
          )}
          {surplusResult && (
            <SurplusResults
              result={surplusResult}
              foreclosure={foreclosure}
              balance={Number(surplus.balance)}
            />
          )}
        </section>
        <footer className="workspace-footer">
          <p>
            Coming later: credit cards, mutual funds and a financial dashboard.
          </p>
          <p>
            Money Ops prototype · Your entries stay in this browser session.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default function App() {
  const isProductRoute =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("app") === "1";
  return isProductRoute ? <MoneyOpsApp /> : <Waitlist />;
}
function OfferResults({ result }) {
  const winner =
      result.winnerIndex === null ? null : result.offers[result.winnerIndex],
    apr = result.rankingBasis === "apr",
    tied = apr ? Math.abs(result.aprDelta) < 0.01 : Math.abs(result.saving) < 1;
  return (
    <section
      id="loan-result"
      tabIndex={-1}
      className="recommendation"
      aria-live="polite"
    >
      <h3>
        {!winner
          ? "Compare the same loan type before ranking."
          : tied
            ? "These offers are effectively tied."
            : winner.name +
              (apr
                ? " has the lower effective APR."
                : " has the lower borrowing cost.")}
      </h3>
      <p>
        {!winner
          ? "The figures are shown, but the loans serve different needs."
          : apr
            ? "Amounts or tenures differ, so effective APR is the primary comparison."
            : "The offers share a principal and tenure, so borrowing cost is directly comparable."}
      </p>
      {winner && (
        <div className="verdict-delta">
          <div>
            <strong>
              {apr
                ? Number(result.aprDelta).toFixed(2) + " pp"
                : money(Math.abs(result.saving))}
            </strong>
            <span>
              {apr
                ? "APR difference to next offer"
                : "Less borrowing cost than next offer"}
            </span>
          </div>
          <div>
            <strong>
              {apr ? money(Math.abs(result.saving)) : pct(result.savingPercent)}
            </strong>
            <span>
              {apr
                ? result.saving < 0
                  ? "Higher cost per lakh despite lower APR"
                  : "Lower cost per lakh"
                : "Reduction in borrowing cost"}
            </span>
          </div>
        </div>
      )}
      <Disclosure title="View offer detail, assumptions and charts">
        <div className="results-grid">
          {result.offers.map((o, i) => (
            <div key={i}>
              <h3>{o.name}</h3>
              <Fact label="Monthly EMI" value={money(o.emi)} />
              <Fact label="Total interest" value={money(o.interest)} />
              <Fact label="Net disbursal" value={money(o.netDisbursal)} />
              <Fact label="Total borrowing cost" value={money(o.cost)} />
              <Fact label="Effective APR · XIRR" value={pct(o.effectiveAPR)} />
              <Fact label="Cost per lakh" value={money(o.costPerLakh)} />
              <Fact label="Full term" value={o.months + " months"} />
              {o.rateType === "flat" && (
                <Fact
                  label="Equivalent reducing rate"
                  value={pct(o.equivalentReducingRate)}
                />
              )}
            </div>
          ))}
        </div>
        <CostStory result={result} />
        <RateStory offer={result.offers[0]} />
        <p className="small">
          Assumptions: monthly payments from today, full tenure and unchanged
          rates. GST applies only to processing fees; other fees are entered
          inclusive of tax.
        </p>
      </Disclosure>
    </section>
  );
}
function SurplusResults({ result, foreclosure, balance }) {
  const r = result,
    head = {
      reserve: "Protect your buffer before prepaying.",
      review: "Confirm these details before acting.",
      tie: "You are in the crossover band.",
      invest: "Investing leads on the return assumption.",
      prepay: "Prepayment has the stronger estimated return.",
    }[r.recommendation],
    reason =
      r.liquidityStatus === "unknown"
        ? "Liquidity is unverified. Enter monthly essentials or an explicit emergency buffer before relying on a recommendation."
        : r.emiMismatch
          ? "The entered EMI differs from the loan model by more than 1%. Reconcile the lender statement first."
          : r.foreclosureShortfall > 0
            ? "Fees and the protected buffer leave " +
              money(r.foreclosureShortfall) +
              " short of full foreclosure."
            : r.recommendation === "reserve"
              ? "Your surplus does not leave deployable money after the protected buffer and fees."
              : r.recommendation === "tie"
                ? "The post-tax return and loan cost are within one percentage point."
                : r.recommendation === "invest" && r.fees > 0 && r.rateGap <= 0
                  ? "Prepayment fees outweigh the modeled interest benefit."
                  : "The post-tax loan cost is " +
                    pct(r.postTaxLoanRate) +
                    " and the illustrative post-tax return is " +
                    pct(r.postTaxInvestmentRate) +
                    ".";
  return (
    <section
      id="surplus-result"
      tabIndex={-1}
      className="recommendation"
      aria-live="polite"
    >
      <h3>{head}</h3>
      <p>Why: {reason}</p>
      <div className="verdict-delta">
        <div>
          <strong>{money(Math.abs(r.investment.advantage))}</strong>
          <span>
            {r.investment.advantage >= 0
              ? "Projected extra end wealth from investing"
              : "Projected extra end wealth from prepaying"}
          </span>
        </div>
        <div>
          <strong>{Math.abs(r.rateGap).toFixed(2)} pp</strong>
          <span>Post-tax return / loan-cost difference</span>
        </div>
      </div>
      <p className="small">
        {r.liquidityStatus === "unknown"
          ? "Buffer is not set; the figures assume no reserve."
          : "Reserve protected: " + money(r.reserve) + "."}{" "}
        Deployable in this illustration: {money(r.available)}.{" "}
        {r.emiMismatch
          ? "EMI discrepancy: " + money(Math.abs(r.emiDifference)) + "."
          : ""}
      </p>
      <p className="small">
        Investments can underperform or lose value. The projected wealth figure
        applies only after the buffer and input checks above are satisfied.
      </p>
      <Disclosure title="View four scenarios, assumptions and chart">
        <div className="scenario-grid">
          <div>
            <h4>No prepayment</h4>
            <Fact
              label="Total payable to loan end"
              value={money(r.baseline.total)}
            />
            <Fact label="Monthly EMI" value={money(r.emi)} />
            <Fact label="Months left" value={r.baseline.months} />
          </div>
          <div>
            <h4>
              {foreclosure
                ? r.foreclosureShortfall > 0
                  ? "Closure not affordable"
                  : "Foreclose the loan"
                : "Prepay · reduce tenure"}
            </h4>
            <Fact
              label="Total incl. prepay & fees"
              value={money(r.shorter.total)}
            />
            <Fact label="Net loan saving" value={money(r.shorter.saving)} />
            <Fact label="Months saved" value={r.shorter.monthsSaved} />
          </div>
          <div>
            <h4>
              {foreclosure
                ? r.foreclosureShortfall > 0
                  ? "Loan remains open"
                  : "After full closure"
                : "Prepay · reduce EMI"}
            </h4>
            <Fact label="New EMI" value={money(r.lower.emi)} />
            <Fact
              label="Monthly cash freed"
              value={money(r.lower.monthlyFreed)}
            />
            <Fact label="Net loan saving" value={money(r.lower.saving)} />
          </div>
          <div>
            <h4>Invest instead</h4>
            <Fact
              label="Projected post-tax end wealth"
              value={money(r.investment.futureValue)}
            />
            <Fact label="Same horizon" value={r.baseline.months + " months"} />
            <Fact
              label="Prepay then invest freed EMI"
              value={money(r.investment.prepayFutureValue)}
            />
          </div>
        </div>
        <PrepayStory result={r} balance={balance} />
        <p className="small">
          End wealth compares equal starting cash and monthly budgets, reinvesting freed payments. The
          crossover band is ±1 percentage point, not a promise of equivalent
          outcomes. Tax treatment is simplified; no benefit is inferred from
          your slab or loan type alone.
        </p>
      </Disclosure>
    </section>
  );
}

function validateProfile(p) {
  if (
    p.taxSlab.trim() === "" ||
    !Number.isFinite(Number(p.taxSlab)) ||
    Number(p.taxSlab) < 0 ||
    Number(p.taxSlab) > 50
  )
    throw new Error("Enter a tax slab from 0% to 50% in your shared profile.");
  for (const [k, label] of [
    ["income", "Annual income"],
    ["monthlyExpenses", "Monthly expenses"],
    ["liabilities", "Existing liabilities"],
  ])
    if (p[k] !== "" && (!Number.isFinite(Number(p[k])) || Number(p[k]) < 0))
      throw new Error(
        label + " must be a non-negative amount in your shared profile.",
      );
  if (
    p.dependents !== "" &&
    (!Number.isInteger(Number(p.dependents)) ||
      Number(p.dependents) < 0 ||
      Number(p.dependents) > 30)
  )
    throw new Error(
      "Dependents must be a whole number from 0 to 30 in your shared profile.",
    );
}

function focusResult(id) {
  requestAnimationFrame(() => {
    const result = document.getElementById(id);
    if (result) {
      result.focus({ preventScroll: true });
      result.scrollIntoView({ block: "start", behavior: "auto" });
    }
  });
}
