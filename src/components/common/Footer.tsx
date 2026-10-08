import React from 'react';
import { Calculator, ShieldCheck, HeartHandshake, FileText, Info, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 bg-white pt-12 pb-8 text-slate-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Mission */}
          <div className="lg:col-span-2">
            <a
              href="/"
              onClick={(e) => handleNav('/', e)}
              className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-600 text-white">
                <Calculator className="h-4.5 w-4.5" />
              </div>
              <span>Daily Calculator Hub</span>
            </a>
            <p className="mt-3 max-w-sm text-sm text-slate-500 leading-relaxed">
              Smart calculators for everyday life. Instant, reliable mathematical engines for
              personal finance, loan amortizations, health metrics, and unit conversions running
              locally in your browser.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
              <span>100% Client-Side Precision · No Data Transferred</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Calculators
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href="/finance"
                  onClick={(e) => handleNav('/finance', e)}
                  className="hover:text-sky-600 transition-colors"
                >
                  Finance Calculators
                </a>
              </li>
              <li>
                <a
                  href="/health"
                  onClick={(e) => handleNav('/health', e)}
                  className="hover:text-sky-600 transition-colors"
                >
                  Health & Fitness
                </a>
              </li>
              <li>
                <a
                  href="/converters"
                  onClick={(e) => handleNav('/converters', e)}
                  className="hover:text-sky-600 transition-colors"
                >
                  Unit Converters
                </a>
              </li>
              <li>
                <a
                  href="/calculators"
                  onClick={(e) => handleNav('/calculators', e)}
                  className="hover:text-sky-600 transition-colors"
                >
                  All 30+ Tools
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Tools */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Popular Tools
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href="/calculators/emi"
                  onClick={(e) => handleNav('/calculators/emi', e)}
                  className="hover:text-sky-600 transition-colors"
                >
                  Smart EMI Calculator
                </a>
              </li>
              <li>
                <a
                  href="/calculators/gst"
                  onClick={(e) => handleNav('/calculators/gst', e)}
                  className="hover:text-sky-600 transition-colors"
                >
                  GST & Reverse Calculator
                </a>
              </li>
              <li>
                <a
                  href="/calculators/sip"
                  onClick={(e) => handleNav('/calculators/sip', e)}
                  className="hover:text-sky-600 transition-colors"
                >
                  SIP Wealth Calculator
                </a>
              </li>
              <li>
                <a
                  href="/calculators/bmi"
                  onClick={(e) => handleNav('/calculators/bmi', e)}
                  className="hover:text-sky-600 transition-colors"
                >
                  WHO BMI & Weight Range
                </a>
              </li>
              <li>
                <a
                  href="/calculators/age"
                  onClick={(e) => handleNav('/calculators/age', e)}
                  className="hover:text-sky-600 transition-colors"
                >
                  Exact Age & Birthday
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Editorial */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Legal & Trust
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href="/about"
                  onClick={(e) => handleNav('/about', e)}
                  className="hover:text-sky-600 transition-colors"
                >
                  About Our Mission
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleNav('/contact', e)}
                  className="hover:text-sky-600 transition-colors"
                >
                  Contact Support
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  onClick={(e) => handleNav('/privacy-policy', e)}
                  className="hover:text-sky-600 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => handleNav('/terms', e)}
                  className="hover:text-sky-600 transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="/disclaimer"
                  onClick={(e) => handleNav('/disclaimer', e)}
                  className="hover:text-sky-600 transition-colors"
                >
                  Financial & Medical Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom divider and disclaimer */}
        <div className="mt-10 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Daily Calculator Hub. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Formulas verified against standard Indian banking & international mathematical conventions.
          </p>
        </div>
      </div>
    </footer>
  );
};
