import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { CALCULATORS } from '../../data/calculatorsData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCalculator: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectCalculator,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open search modal via parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  // Search logic supporting keywords
  const results = CALCULATORS.filter((calc) => {
    if (!normalizedQuery) return true;
    const matchTitle = calc.title.toLowerCase().includes(normalizedQuery);
    const matchDesc = calc.shortDesc.toLowerCase().includes(normalizedQuery);
    const matchCat = calc.category.toLowerCase().includes(normalizedQuery);
    const matchSlug = calc.slug.toLowerCase().includes(normalizedQuery);

    // Common synonyms
    let synonymMatch = false;
    if (normalizedQuery === 'loan' && ['emi', 'loan', 'simple-interest', 'salary'].includes(calc.id)) synonymMatch = true;
    if (normalizedQuery === 'tax' && ['gst', 'gst-split', 'salary'].includes(calc.id)) synonymMatch = true;
    if (normalizedQuery === 'weight' && ['bmi', 'weight-converter', 'calorie'].includes(calc.id)) synonymMatch = true;
    if (normalizedQuery === 'car' && ['emi', 'fuel-cost', 'speed-converter'].includes(calc.id)) synonymMatch = true;
    if (normalizedQuery === 'interest' && ['emi', 'simple-interest', 'compound-interest', 'fd', 'rd'].includes(calc.id)) synonymMatch = true;

    return matchTitle || matchDesc || matchCat || matchSlug || synonymMatch;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/40 p-4 pt-16 sm:pt-24 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-slate-200 px-4 py-3.5">
          <Search className="h-5 w-5 text-slate-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by name, category, or keyword (e.g. loan, GST, BMI, fuel)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 text-xs font-medium text-slate-400 hover:text-slate-600 px-2 py-1 rounded bg-slate-100"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500">
              No calculators matching &ldquo;{query}&rdquo;. Try &ldquo;loan&rdquo;, &ldquo;tax&rdquo;, or &ldquo;BMI&rdquo;.
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {query ? `Found ${results.length} Tools` : 'Popular & Suggested Calculators'}
              </div>
              {results.slice(0, 10).map((calc) => (
                <button
                  key={calc.id}
                  onClick={() => {
                    onSelectCalculator(calc.slug);
                    onClose();
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-slate-100/80 group"
                >
                  <div className="min-w-0 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900 group-hover:text-sky-600 transition-colors">
                        {calc.title}
                      </span>
                      {calc.hasSmart3of4 && (
                        <span className="text-[10px] text-sky-600 font-medium bg-sky-50 px-1.5 py-0.5 rounded border border-sky-100">
                          Smart 3-of-4
                        </span>
                      )}
                    </div>
                    <p className="truncate text-xs text-slate-500 mt-0.5">{calc.shortDesc}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] text-slate-400 capitalize">{calc.category}</span>
                    <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-sky-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-4 py-2.5 text-[11px] text-slate-400">
          <span>Search across all 30 calculators instantly</span>
          <span className="flex items-center gap-1">
            <CornerDownLeft className="h-3 w-3" /> Select to open
          </span>
        </div>
      </div>
    </div>
  );
};
