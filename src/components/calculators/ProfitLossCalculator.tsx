import React, { useState, useEffect } from 'react';
import { solveSmartProfitLoss, ProfitLossSmartResult } from '../../engine/finance';
import { formatINR, parseNumeric } from '../../utils/formatters';
import { addHistoryItem } from '../../services/storage';
import { Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

export const ProfitLossCalculator: React.FC = () => {
  const [cpStr, setCpStr] = useState<string>('5000');
  const [spStr, setSpStr] = useState<string>('6500');
  const [plAmtStr, setPlAmtStr] = useState<string>('');
  const [plPctStr, setPlPctStr] = useState<string>('');

  const cp = parseNumeric(cpStr);
  const sp = parseNumeric(spStr);
  const plAmt = parseNumeric(plAmtStr);
  const plPct = parseNumeric(plPctStr);

  const result: ProfitLossSmartResult | null = solveSmartProfitLoss(cp, sp, plAmt, plPct);

  useEffect(() => {
    if (result && result.calculatedField) {
      addHistoryItem({
        calculatorSlug: 'profit-loss',
        calculatorTitle: 'Profit & Loss Calculator',
        primaryResult: `${result.isProfit ? 'Profit' : 'Loss'}: ${formatINR(Math.abs(result.plAmount))} (${result.plPercent.toFixed(1)}%)`,
        summary: `CP: ${formatINR(result.costPrice)}, SP: ${formatINR(result.sellingPrice)}`,
      });
    }
  }, [result?.calculatedField, result?.plAmount, result?.sellingPrice]);

  const activeCount = [cp, sp, plAmt, plPct].filter((v) => v !== null).length;

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-sky-100 bg-sky-50/70 p-4 text-xs sm:text-sm text-sky-800 flex items-start gap-3">
        <Sparkles className="h-5 w-5 text-sky-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Smart Interdependent Solver:</span> Enter any 3 of the 4
          values (Cost Price, Selling Price, Net Profit/Loss, Margin %). Missing values are solved
          instantly.
        </div>
      </div>

      {result?.warning && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs sm:text-sm text-amber-800 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>{result.warning}</div>
        </div>
      )}

      {result?.isConsistent && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs sm:text-sm text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>All 4 values are mathematically verified & consistent!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              Trade Parameters (Enter Any 3)
            </h2>
            <span className="text-xs text-slate-400 font-mono">{activeCount}/4 Filled</span>
          </div>

          {/* 1. Cost Price */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="pl-cost-price" className="text-xs font-semibold text-slate-700">1. Cost Price (CP) (₹)</label>
              {result?.calculatedField === 'costPrice' && (
                <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                  Auto-Calculated
                </span>
              )}
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-semibold">
                ₹
              </span>
              <input
                id="pl-cost-price"
                type="number"
                placeholder="e.g. 5000"
                value={result?.calculatedField === 'costPrice' ? Math.round(result.costPrice) : cpStr}
                onChange={(e) => setCpStr(e.target.value)}
                readOnly={result?.calculatedField === 'costPrice'}
                className={`w-full rounded-xl border pl-8 pr-4 py-2.5 text-sm tabular-nums transition-all focus:outline-none ${
                  result?.calculatedField === 'costPrice'
                    ? 'border-sky-400 bg-sky-50/50 font-bold text-sky-900 ring-2 ring-sky-200'
                    : 'border-slate-200 bg-slate-50/40 text-slate-900 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100'
                }`}
              />
            </div>
          </div>

          {/* 2. Selling Price */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="pl-selling-price" className="text-xs font-semibold text-slate-700">2. Selling Price (SP) (₹)</label>
              {result?.calculatedField === 'sellingPrice' && (
                <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                  Auto-Calculated
                </span>
              )}
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-semibold">
                ₹
              </span>
              <input
                id="pl-selling-price"
                type="number"
                placeholder="e.g. 6500"
                value={result?.calculatedField === 'sellingPrice' ? Math.round(result.sellingPrice) : spStr}
                onChange={(e) => setSpStr(e.target.value)}
                readOnly={result?.calculatedField === 'sellingPrice'}
                className={`w-full rounded-xl border pl-8 pr-4 py-2.5 text-sm tabular-nums transition-all focus:outline-none ${
                  result?.calculatedField === 'sellingPrice'
                    ? 'border-sky-400 bg-sky-50/50 font-bold text-sky-900 ring-2 ring-sky-200'
                    : 'border-slate-200 bg-slate-50/40 text-slate-900 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100'
                }`}
              />
            </div>
          </div>

          {/* 3. Profit / Loss Amount */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="pl-profit-loss-amount" className="text-xs font-semibold text-slate-700">3. Profit / Loss Amount (₹)</label>
              {result?.calculatedField === 'plAmount' && (
                <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                  Auto-Calculated
                </span>
              )}
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-semibold">
                ₹
              </span>
              <input
                id="pl-profit-loss-amount"
                type="number"
                placeholder="Positive = profit, Negative = loss"
                value={result?.calculatedField === 'plAmount' ? Math.round(result.plAmount) : plAmtStr}
                onChange={(e) => setPlAmtStr(e.target.value)}
                readOnly={result?.calculatedField === 'plAmount'}
                className={`w-full rounded-xl border pl-8 pr-4 py-2.5 text-sm tabular-nums transition-all focus:outline-none ${
                  result?.calculatedField === 'plAmount'
                    ? 'border-sky-400 bg-sky-50/50 font-bold text-sky-900 ring-2 ring-sky-200'
                    : 'border-slate-200 bg-slate-50/40 text-slate-900 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100'
                }`}
              />
            </div>
          </div>

          {/* 4. Profit / Loss % */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="pl-profit-loss-percent" className="text-xs font-semibold text-slate-700">4. Profit / Loss Rate (%)</label>
              {result?.calculatedField === 'plPercent' && (
                <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                  Auto-Calculated
                </span>
              )}
            </div>
            <div className="relative">
              <input
                id="pl-profit-loss-percent"
                type="number"
                step="0.1"
                placeholder="e.g. 30"
                value={result?.calculatedField === 'plPercent' ? result.plPercent.toFixed(2) : plPctStr}
                onChange={(e) => setPlPctStr(e.target.value)}
                readOnly={result?.calculatedField === 'plPercent'}
                className={`w-full rounded-xl border px-4 py-2.5 text-sm tabular-nums transition-all focus:outline-none ${
                  result?.calculatedField === 'plPercent'
                    ? 'border-sky-400 bg-sky-50/50 font-bold text-sky-900 ring-2 ring-sky-200'
                    : 'border-slate-200 bg-slate-50/40 text-slate-900 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100'
                }`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold">
                %
              </span>
            </div>
          </div>
        </div>

        {/* Right Result Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-6 shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
              P&L Analysis
            </h3>

            {result ? (
              <div className="space-y-5">
                <div>
                  <span className="text-xs text-slate-500 font-medium">Outcome</span>
                  <div
                    className={`mt-1 text-3xl sm:text-4xl font-extrabold tabular-nums ${
                      result.isProfit ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {result.isProfit ? '+' : '-'}
                    {formatINR(Math.abs(result.plAmount), true)}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-700">
                    {result.plPercent.toFixed(2)}% {result.isProfit ? 'Profit Margin' : 'Loss'}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Cost Price (CP)</span>
                    <span className="font-semibold text-slate-900 tabular-nums">
                      {formatINR(result.costPrice, true)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Selling Price (SP)</span>
                    <span className="font-semibold text-slate-900 tabular-nums">
                      {formatINR(result.sellingPrice, true)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-sm text-slate-500">
                Please enter any 3 values to calculate the remaining value.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
