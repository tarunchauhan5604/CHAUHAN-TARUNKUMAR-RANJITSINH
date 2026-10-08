import React, { useState } from 'react';
import {
  Star,
  Share2,
  Copy,
  Check,
  RotateCcw,
  HelpCircle,
  Calculator,
  ChevronDown,
  ChevronRight,
  Info,
} from 'lucide-react';
import { CalculatorMeta } from '../../types';
import { AdPlaceholder } from '../common/AdPlaceholder';
import { CALCULATORS } from '../../data/calculatorsData';

interface CalculatorWrapperProps {
  meta: CalculatorMeta;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onReset: () => void;
  primaryResultToCopy?: string;
  copySummary?: string;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

export const CalculatorWrapper: React.FC<CalculatorWrapperProps> = ({
  meta,
  isFavorite,
  onToggleFavorite,
  onReset,
  primaryResultToCopy,
  copySummary,
  onNavigate,
  children,
}) => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleCopy = () => {
    if (!primaryResultToCopy) return;
    const textToCopy = copySummary
      ? `${meta.title}: ${primaryResultToCopy}\n${copySummary}\nCalculated with Daily Calculator Hub`
      : `${meta.title}: ${primaryResultToCopy}\nCalculated with Daily Calculator Hub`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const shareData = {
      title: `${meta.title} – Daily Calculator Hub`,
      text: `Calculate ${meta.title} instantly with smart auto-solving:`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Share cancelled or not supported
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  const relatedCalcs = CALCULATORS.filter((c) => meta.relatedSlugs?.includes(c.slug));

  return (
    <article className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs text-slate-500">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/');
          }}
          className="hover:text-slate-900 transition-colors"
        >
          Home
        </a>
        <span>/</span>
        <a
          href={`/${meta.category}`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(`/${meta.category}`);
          }}
          className="capitalize hover:text-slate-900 transition-colors"
        >
          {meta.category}
        </a>
        <span>/</span>
        <span className="font-semibold text-slate-800">{meta.title}</span>
      </nav>

      {/* Calculator Header & Controls */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              {meta.title}
            </h1>
            <button
              onClick={onToggleFavorite}
              className={`p-1.5 rounded-lg border transition-all ${
                isFavorite
                  ? 'border-amber-300 bg-amber-50 text-amber-500 shadow-xs'
                  : 'border-slate-200 bg-white text-slate-400 hover:text-amber-500 hover:border-amber-200'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star className={`h-4 w-4 ${isFavorite ? 'fill-amber-400 text-amber-500' : ''}`} />
            </button>
          </div>
          <p className="mt-2 max-w-2xl text-sm sm:text-base text-slate-600 leading-relaxed">
            {meta.shortDesc}
          </p>

          {/* Smart 3-of-4 Feature Note */}
          {meta.hasSmart3of4 && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-700 border border-sky-100">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500"></span>
              <span>
                <strong>Smart 3-of-4 System:</strong> Enter any 3 values to calculate the remaining 4th value automatically.
              </span>
            </div>
          )}
        </div>

        {/* Global Calculator Actions */}
        <div className="flex items-center gap-2 shrink-0 self-start">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-xs"
            title="Reset inputs to defaults"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>

          {primaryResultToCopy && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-xs"
              title="Copy primary result"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Result'}</span>
            </button>
          )}

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-sky-700 transition-colors shadow-xs"
            title="Share calculator"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>{shared ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Tool Body */}
      <div className="mb-12">{children}</div>

      {/* Top Banner Ad Placeholder */}
      <AdPlaceholder slot="banner" />

      {/* Formula & Mathematical Explanation */}
      <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2.5 mb-3">
          <Calculator className="h-5 w-5 text-sky-600" />
          <h2 className="text-lg font-bold text-slate-900">How It Is Calculated: Formula & Logic</h2>
        </div>
        <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 font-mono text-sm text-slate-800 my-4 overflow-x-auto">
          <code>{meta.formula}</code>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">{meta.formulaExplanation}</p>
      </section>

      {/* Frequently Asked Questions */}
      {meta.faqs && meta.faqs.length > 0 && (
        <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2.5 mb-4">
            <HelpCircle className="h-5 w-5 text-sky-600" />
            <h2 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {meta.faqs.map((faq, idx) => (
              <div key={idx} className="py-3.5">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="flex w-full items-center justify-between text-left text-sm font-semibold text-slate-900 hover:text-sky-600 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform ${
                      openFaqIndex === idx ? 'rotate-180 text-sky-600' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === idx && (
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed animate-fadeIn">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Calculators */}
      {relatedCalcs.length > 0 && (
        <section className="mb-8">
          <h2 className="text-base font-bold text-slate-900 mb-4">Related Calculators</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedCalcs.map((calc) => (
              <button
                key={calc.id}
                onClick={() => {
                  onNavigate(`/calculators/${calc.slug}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 text-left transition-all hover:border-sky-300 hover:shadow-sm"
              >
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {calc.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">{calc.shortDesc}</p>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] font-medium text-sky-600">
                  <span className="capitalize text-slate-400">{calc.category}</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Calculate <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
