import React, { useState } from 'react';
import { CALCULATORS } from '../data/calculatorsData';
import { CalculatorCategory } from '../types';
import { Search, ArrowRight, Sparkles } from 'lucide-react';
import { AdPlaceholder } from '../components/common/AdPlaceholder';

interface CategoryPageProps {
  initialCategory?: CalculatorCategory | 'all';
  onNavigate: (path: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  initialCategory = 'all',
  onNavigate,
}) => {
  const [selectedCat, setSelectedCat] = useState<CalculatorCategory | 'all'>(initialCategory);
  const [search, setSearch] = useState('');

  const filtered = CALCULATORS.filter((c) => {
    const matchesCat = selectedCat === 'all' || c.category === selectedCat;
    const q = search.toLowerCase().trim();
    const matchesQuery =
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.shortDesc.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  const getTitle = () => {
    switch (selectedCat) {
      case 'finance':
        return 'Finance & Loan Calculators';
      case 'health':
        return 'Health & Fitness Calculators';
      case 'converters':
        return 'Unit Conversion Tools';
      case 'utility':
        return 'Utility & Everyday Calculators';
      default:
        return 'All Calculators & Tools';
    }
  };

  const getDesc = () => {
    switch (selectedCat) {
      case 'finance':
        return 'Equated Monthly Installments (EMI), GST, SIP investments, banking deposits, and salary structures.';
      case 'health':
        return 'Body Mass Index (BMI), Basal Metabolic Rate (BMR), calorie targets, exact age, and gestational milestones.';
      case 'converters':
        return 'Accurate unit conversion across length, weight, temperature, area, volume, speed, and digital data storage.';
      case 'utility':
        return 'Travel fuel expenditure, age comparisons, duration timesheets, and GST invoice breakdowns.';
      default:
        return 'Browse our complete library of 30+ precision mathematical and unit calculators with real-time browser execution.';
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      {/* Category Header */}
      <div className="border-b border-slate-200 pb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          {getTitle()}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          {getDesc()}
        </p>

        {/* Filter Controls Bar */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Segmented Filter Buttons (Clean & unboxed per frontend design rules) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl max-w-fit">
            {[
              { id: 'all', label: 'All (30)' },
              { id: 'finance', label: 'Finance (12)' },
              { id: 'health', label: 'Health (6)' },
              { id: 'converters', label: 'Converters (8)' },
              { id: 'utility', label: 'Utility (4)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCat(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedCat === tab.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-72">
            <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter these tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Calculator Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500">
          No calculators found matching your filter criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((calc) => (
            <button
              key={calc.id}
              onClick={() => {
                onNavigate(`/calculators/${calc.slug}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 text-left transition-all hover:border-sky-400 hover:shadow-md group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {calc.category}
                  </span>
                  {calc.hasSmart3of4 && (
                    <span className="text-[10px] font-bold text-sky-700 bg-sky-50 border border-sky-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Sparkles className="h-2.5 w-2.5" /> Smart 3-of-4
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
                <span>Open Calculator</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Ad slot */}
      <AdPlaceholder slot="banner" />
    </div>
  );
};
