import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Activity,
  Ruler,
  ShieldCheck,
  Zap,
  Lock,
  ChevronRight,
  Star,
  CheckCircle,
} from 'lucide-react';
import { CALCULATORS } from '../data/calculatorsData';
import { CalculatorMeta } from '../types';
import { getRecentCalculatorSlugs, getFavorites } from '../services/storage';
import { AdPlaceholder } from '../components/common/AdPlaceholder';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenSearch }) => {
  const [heroSearch, setHeroSearch] = useState('');

  const recentSlugs = getRecentCalculatorSlugs();
  const favoriteSlugs = getFavorites();

  const recentCalcs = CALCULATORS.filter((c) => recentSlugs.includes(c.slug));
  const popularCalcs = CALCULATORS.filter((c) => c.isPopular);
  const financeCalcs = CALCULATORS.filter((c) => c.category === 'finance');
  const healthCalcs = CALCULATORS.filter((c) => c.category === 'health');
  const converterCalcs = CALCULATORS.filter((c) => c.category === 'converters');

  const filteredHero = heroSearch.trim()
    ? CALCULATORS.filter((c) => {
        const q = heroSearch.toLowerCase();
        return (
          c.title.toLowerCase().includes(q) ||
          c.shortDesc.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200/60 bg-gradient-to-b from-sky-50/60 via-white to-white py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 shadow-xs mb-6">
            <Sparkles className="h-3.5 w-3.5 text-sky-600" />
            <span>Smart Interdependent Calculators with Reverse Solving</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Daily Calculator Hub
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Smart Calculators for Everyday Life. Instant mathematical calculations for loans, taxes,
            health metrics, and unit conversions.
          </p>

          {/* Search Box */}
          <div className="relative mt-8 max-w-2xl mx-auto">
            <div className="flex items-center rounded-2xl border border-slate-300 bg-white p-2 shadow-lg transition-all focus-within:border-sky-500 focus-within:ring-4 focus-within:ring-sky-100">
              <Search className="h-5 w-5 text-slate-400 ml-3 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search 30+ calculators (e.g. EMI, loan, GST, BMI, age, fuel)..."
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                className="w-full bg-transparent text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:outline-none py-1.5"
              />
              {heroSearch ? (
                <button
                  onClick={() => setHeroSearch('')}
                  className="px-3 text-xs font-medium text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              ) : (
                <button
                  onClick={onOpenSearch}
                  className="hidden sm:inline-flex items-center rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-mono text-slate-500"
                >
                  ⌘K
                </button>
              )}
            </div>

            {/* Instant Filter Dropdown */}
            {filteredHero.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 z-30 max-h-80 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl text-left">
                {filteredHero.slice(0, 6).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => onNavigate(`/calculators/${c.slug}`)}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 hover:bg-sky-50 transition-colors group"
                  >
                    <div>
                      <span className="text-sm font-bold text-slate-900 group-hover:text-sky-600">
                        {c.title}
                      </span>
                      <p className="text-xs text-slate-500">{c.shortDesc}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-sky-600 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Categories Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-600">
            <span className="text-slate-400">Quick Jump:</span>
            <button
              onClick={() => onNavigate('/finance')}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-sky-300 hover:text-sky-600 shadow-2xs"
            >
              Finance (12)
            </button>
            <button
              onClick={() => onNavigate('/health')}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-sky-300 hover:text-sky-600 shadow-2xs"
            >
              Health & Body (6)
            </button>
            <button
              onClick={() => onNavigate('/converters')}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-sky-300 hover:text-sky-600 shadow-2xs"
            >
              Unit Converters (8)
            </button>
            <button
              onClick={() => onNavigate('/calculators')}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-sky-300 hover:text-sky-600 shadow-2xs"
            >
              Browse All 30 Tools →
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Recently Visited Calculators */}
        {recentCalcs.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Recently Used Calculators</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Stored locally for quick access
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentCalcs.map((calc) => (
                <button
                  key={calc.id}
                  onClick={() => onNavigate(`/calculators/${calc.slug}`)}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left transition-all hover:border-sky-400 hover:shadow-md group"
                >
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-600">
                      {calc.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors mt-1">
                      {calc.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 line-clamp-2">{calc.shortDesc}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs font-semibold text-sky-600 pt-3 border-t border-slate-100">
                    <span>Open Calculator</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Popular Calculators Showcase */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Popular Everyday Calculators</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Our most utilized smart calculation engines with real-time feedback
              </p>
            </div>
            <button
              onClick={() => onNavigate('/calculators')}
              className="text-xs sm:text-sm font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCalcs.map((calc) => (
              <button
                key={calc.id}
                onClick={() => onNavigate(`/calculators/${calc.slug}`)}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 text-left transition-all hover:border-sky-400 hover:shadow-md group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      {calc.category}
                    </span>
                    {calc.hasSmart3of4 && (
                      <span className="text-[10px] font-bold text-sky-700 bg-sky-50 border border-sky-100 px-2 py-0.5 rounded-full">
                        Smart 3-of-4
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors mt-2">
                    {calc.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {calc.shortDesc}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between text-xs font-semibold text-sky-600 pt-4 border-t border-slate-100">
                  <span>Calculate Now</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Ad Placeholder (Middle of Homepage) */}
        <AdPlaceholder slot="in-feed" />

        {/* Finance Calculators Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Finance & Loan Calculators</h2>
                <p className="text-xs text-slate-500">EMI, GST, SIP, Fixed Deposits & Salary breakdown</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('/finance')}
              className="text-xs sm:text-sm font-semibold text-sky-600 hover:text-sky-700"
            >
              See all 12 →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {financeCalcs.slice(0, 8).map((calc) => (
              <button
                key={calc.id}
                onClick={() => onNavigate(`/calculators/${calc.slug}`)}
                className="rounded-xl border border-slate-200 bg-white p-4 text-left hover:border-sky-300 hover:shadow-xs transition-all group flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {calc.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">{calc.shortDesc}</p>
                </div>
                <div className="mt-3 text-[11px] font-semibold text-sky-600 flex items-center justify-between">
                  <span>Open tool</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Health & Body Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Health & Fitness Calculators</h2>
                <p className="text-xs text-slate-500">BMI, BMR, Calorie targets, and Age calculation</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('/health')}
              className="text-xs sm:text-sm font-semibold text-sky-600 hover:text-sky-700"
            >
              See all 6 →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {healthCalcs.map((calc) => (
              <button
                key={calc.id}
                onClick={() => onNavigate(`/calculators/${calc.slug}`)}
                className="rounded-xl border border-slate-200 bg-white p-4 text-left hover:border-sky-300 hover:shadow-xs transition-all group flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {calc.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">{calc.shortDesc}</p>
                </div>
                <div className="mt-3 text-[11px] font-semibold text-sky-600 flex items-center justify-between">
                  <span>Open tool</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Unit Converters Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                <Ruler className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Unit Converters & Utilities</h2>
                <p className="text-xs text-slate-500">Length, weight, temperature, area, volume & data</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('/converters')}
              className="text-xs sm:text-sm font-semibold text-sky-600 hover:text-sky-700"
            >
              See all 8 →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {converterCalcs.map((calc) => (
              <button
                key={calc.id}
                onClick={() => onNavigate(`/calculators/${calc.slug}`)}
                className="rounded-xl border border-slate-200 bg-white p-4 text-left hover:border-sky-300 hover:shadow-xs transition-all group flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {calc.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">{calc.shortDesc}</p>
                </div>
                <div className="mt-3 text-[11px] font-semibold text-sky-600 flex items-center justify-between">
                  <span>Convert</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Why Daily Calculator Hub (Mechanism to outcome) */}
        <section className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why Daily Calculator Hub?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Built from first principles for fast, private, and mathematically verifiable calculations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Smart 3-of-4 Auto Solving</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                No rigid calculation modes. Enter any 3 interdependent fields, and our numerical engine
                solves the missing 4th variable in milliseconds with reducing-balance accuracy.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">100% Private & Browser-Native</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Zero telemetry or server round-trips. Your financial details, salary numbers, and personal
                dates stay inside your device. No login or registration required.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Standard Indian & Global Formats</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Full support for Indian currency formatting (₹ Lakhs & Crores), standard GST tax
                brackets (CGST/SGST/IGST), and WHO health metrics.
              </p>
            </div>
          </div>
        </section>

        {/* Global Hub FAQ */}
        <section className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xs">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 text-sm divide-y divide-slate-100">
            <div className="pt-4">
              <h3 className="font-bold text-slate-900">Are the calculations 100% free?</h3>
              <p className="mt-1 text-slate-600">
                Yes. Daily Calculator Hub is entirely free to use with no hidden subscription fees, paywalls, or account limits.
              </p>
            </div>
            <div className="pt-4">
              <h3 className="font-bold text-slate-900">Can I use this website offline?</h3>
              <p className="mt-1 text-slate-600">
                Yes. The application runs completely client-side in React with Progressive Web App (PWA) readiness, allowing offline execution once loaded.
              </p>
            </div>
            <div className="pt-4">
              <h3 className="font-bold text-slate-900">How is my calculation history stored?</h3>
              <p className="mt-1 text-slate-600">
                Your history and favorite tools are stored strictly in your browser&apos;s localStorage. We never store or transmit your calculations to any external servers.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
