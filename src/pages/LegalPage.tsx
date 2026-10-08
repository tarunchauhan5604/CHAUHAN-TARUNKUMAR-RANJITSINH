import React from 'react';
import { ShieldCheck, FileText, AlertTriangle } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy-policy' | 'terms' | 'disclaimer';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  if (type === 'privacy-policy') {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
        <div className="border-b border-slate-200 pb-6">
          <div className="flex items-center gap-2 text-sky-600 mb-2">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Legal & Transparency</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Privacy Policy</h1>
          <p className="mt-2 text-xs text-slate-400">Last updated: October 2026</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">1. Overview & Commitment</h2>
          <p>
            At <strong>Daily Calculator Hub</strong>, we respect your privacy. All primary
            calculations (such as loan amounts, salary inputs, body weight, and dates) run directly in
            your web browser using client-side JavaScript. We do not transmit or store your numeric
            inputs on our application servers.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">2. Local Storage Usage</h2>
          <p>
            We use browser <code>localStorage</code> solely to preserve user conveniences, including:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Your recent calculation history for quick copy/recall.</li>
            <li>Your list of starred/favorited calculator tools.</li>
            <li>Your preference for the cookie consent banner.</li>
          </ul>
          <p>
            You can purge this data at any moment by clicking the &ldquo;Clear&rdquo; button in the History
            panel or clearing your browser site cache.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">3. Third-Party Advertisers & Cookies</h2>
          <p>
            Daily Calculator Hub may show advertisements provided by third-party advertising partners,
            including Google AdSense. Third-party vendors use cookies (such as the DoubleClick cookie) to
            serve ads based on a user&apos;s prior visits to this website or other websites on the Internet.
          </p>
          <p>
            Users may opt out of personalized advertising by visiting Google&apos;s Ads Settings (
            <code>www.aboutads.info</code>).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">4. Contact Information</h2>
          <p>
            If you have questions regarding this Privacy Policy, please reach us at{' '}
            <span className="font-mono text-sky-600">privacy@dailycalculatorhub.com</span>.
          </p>
        </section>
      </div>
    );
  }

  if (type === 'terms') {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
        <div className="border-b border-slate-200 pb-6">
          <div className="flex items-center gap-2 text-sky-600 mb-2">
            <FileText className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-wider">User Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Terms and Conditions</h1>
          <p className="mt-2 text-xs text-slate-400">Last updated: October 2026</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing and using <strong>Daily Calculator Hub</strong>, you accept and agree to be bound
            by these terms and conditions. If you do not agree to these terms, please refrain from using
            our website.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">2. Permitted Use</h2>
          <p>
            This website and its calculation engines are provided free of charge for personal,
            educational, and standard commercial planning purposes. You agree not to attempt to disrupt
            the service or overload infrastructure through automated scraping or malicious execution.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">3. Intellectual Property</h2>
          <p>
            The website design, proprietary solving algorithms, blog articles, and branding are the
            intellectual property of Daily Calculator Hub. Mathematical formulas themselves reside in the
            public domain.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-amber-600 mb-2">
          <AlertTriangle className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Legal Disclaimer</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Financial & Medical Disclaimer
        </h1>
        <p className="mt-2 text-xs text-slate-400">Last updated: October 2026</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">1. General Informational Purpose</h2>
        <p>
          All content, calculations, amortization schedules, and health estimates on{' '}
          <strong>Daily Calculator Hub</strong> are generated for general educational and illustrative
          purposes only. While we make every endeavor to ensure mathematical precision, no guarantee of
          fitness for a specific statutory purpose is implied.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">2. Financial Calculation Disclaimer</h2>
        <p>
          Loan EMIs, interest totals, and tax breakdowns may vary slightly depending on individual bank
          rounding rules, interest compounding conventions (e.g. 365 vs 360-day calendar year), processing
          fees, and statutory changes in Goods & Services Tax (GST) laws. Always consult your financial
          advisor or loan officer before entering binding credit agreements.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">3. Health & Medical Disclaimer</h2>
        <p>
          Health calculators (such as BMI, BMR, Calorie targets, and Pregnancy Due Date) do not provide
          clinical diagnostic advice or obstetric determinations. Always consult a licensed medical
          professional or obstetrician for personal health diagnosis and prenatal care.
        </p>
      </section>
    </div>
  );
};
