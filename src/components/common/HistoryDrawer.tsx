import React from 'react';
import { X, Trash2, Clock, ArrowRight, Copy, Check } from 'lucide-react';
import { CalculationHistoryItem } from '../../types';
import { clearHistory } from '../../services/storage';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: CalculationHistoryItem[];
  onClear: () => void;
  onNavigate: (path: string) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onClear,
  onNavigate,
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (item: CalculationHistoryItem) => {
    navigator.clipboard.writeText(`${item.calculatorTitle}: ${item.primaryResult} (${item.summary})`);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' · ' + d.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div
        className="fixed inset-y-0 right-0 flex max-w-full pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md border-l border-slate-200 bg-white p-6 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-sky-600" />
              <h3 className="text-base font-bold text-slate-900">Calculation History</h3>
            </div>
            <div className="flex items-center gap-2">
              {history.length > 0 && (
                <button
                  onClick={onClear}
                  className="flex items-center gap-1 text-xs text-rose-500 hover:text-rose-700 px-2 py-1 rounded hover:bg-rose-50 transition-colors"
                  title="Clear all history"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Clear</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center text-slate-400">
                <Clock className="h-10 w-10 text-slate-200 stroke-1 mb-2" />
                <p className="text-sm font-medium text-slate-500">No calculations recorded yet</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Your calculations are stored locally in your browser for quick reference.
                </p>
              </div>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 text-left transition-all hover:border-slate-200 hover:bg-white hover:shadow-xs group"
                >
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        onNavigate(`/calculators/${item.calculatorSlug}`);
                        onClose();
                      }}
                      className="text-xs font-semibold text-sky-600 hover:underline flex items-center gap-1"
                    >
                      {item.calculatorTitle}
                      <ArrowRight className="h-3 w-3 inline opacity-70 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {formatTime(item.timestamp)}
                    </span>
                  </div>

                  <div className="mt-1.5 flex items-baseline justify-between">
                    <span className="text-sm font-bold text-slate-900 tabular-nums">
                      {item.primaryResult}
                    </span>
                    <button
                      onClick={() => handleCopy(item)}
                      className="text-slate-400 hover:text-slate-700 p-1 rounded hover:bg-slate-100 transition-colors"
                      title="Copy result"
                    >
                      {copiedId === item.id ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>

                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">{item.summary}</p>
                </div>
              ))
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center">
            Stored locally on your device · 100% private
          </div>
        </div>
      </div>
    </div>
  );
};
