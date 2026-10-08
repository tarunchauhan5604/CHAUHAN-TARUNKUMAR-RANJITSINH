import React from 'react';
import { Calculator, ShieldCheck, Cpu, Zap, HeartHandshake, CheckCircle } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      <div className="border-b border-slate-200 pb-8 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          About Daily Calculator Hub
        </h1>
        <p className="mt-2 text-base text-slate-600 max-w-2xl leading-relaxed">
          Smart calculators for everyday life. Re-imagining routine financial, health, and unit
          math as intuitive, instant, and privacy-preserving tools.
        </p>
      </div>

      {/* Origin Story */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Our Motivation</h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Most online calculators in the web ecosystem haven&apos;t evolved in fifteen years. They are
          overcrowded with intrusive ads, force users into rigid single-mode buttons (&ldquo;Calculate
          Loan&rdquo; vs &ldquo;Calculate Tenure&rdquo;), and send sensitive financial data back and forth to
          remote servers.
        </p>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          We built <strong>Daily Calculator Hub</strong> with a fundamental design principle:
          interdependent mathematical variables should be solved fluidly. If a calculation has 4
          mathematically bonded terms, entering any 3 should instantly reveal the 4th, with zero
          friction.
        </p>
      </section>

      {/* Core Principles Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700 mb-3">
            <Zap className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Instant Execution</h3>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed">
            Every calculation runs entirely in your local browser runtime. Numerical root-finding
            and bisection algorithms converge in microseconds.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 mb-3">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Mathematical Rigor</h3>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed">
            All formulas strictly follow standardized reducing-balance banking conventions, World
            Health Organization clinical thresholds, and official SI metric standards.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 mb-3">
            <Cpu className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Complete Privacy</h3>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed">
            No telemetry, no remote user tracking, and no server-side logging of your salary or
            personal dates. Everything is kept inside your device.
          </p>
        </div>
      </section>

      {/* Verification standards */}
      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Our Verification Process</h2>
        <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
          <li className="flex items-start gap-2.5">
            <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
            <span>
              <strong>Financial Amortization:</strong> Tested against actual benchmark loan schedules
              from State Bank of India, HDFC, and ICICI Bank.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
            <span>
              <strong>Goods & Services Tax (GST):</strong> Validated against Indian Central Board of
              Indirect Taxes and Customs (CBIC) statutory rules.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
            <span>
              <strong>Health & Fitness:</strong> Programmed with peer-reviewed Mifflin-St Jeor
              formulas and official WHO guidelines.
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
};
