import React, { useState, useEffect } from 'react';
import { solveSmartGST, GSTSmartResult } from '../../engine/finance';
import { formatINR, parseNumeric } from '../../utils/formatters';
import { addHistoryItem } from '../../services/storage';
import { Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

export const GSTCalculator: React.FC = () => {
  const [amountStr, setAmountStr] = useState<string>('10000');
  const [rateStr, setRateStr] = useState<string>('18');
  const [gstAmountStr, setGstAmountStr] = useState<string>('');
  const [finalAmountStr, setFinalAmountStr] = useState<string>('');

  const a = parseNumeric(amountStr);
  const r = parseNumeric(rateStr);
  const g = parseNumeric(gstAmountStr);
  const f = parseNumeric(finalAmountStr);

  const result: GSTSmartResult | null = solveSmartGST(a, r, g, f);

  useEffect(() => {
    if (result && result.calculatedField) {
      addHistoryItem({
        calculatorSlug: 'gst',
        calculatorTitle: 'GST Calculator',
        primaryResult: `${formatINR(result.finalAmount)}`,
        summary: `Base: ${formatINR(result.amount)}, GST ${result.gstRate}%: ${formatINR(result.gstAmount)}`,
      });
    }
  }, [result?.calculatedField, result?.finalAmount, result?.amount]);

  const activeInputsCount = [a, r, g, f].filter((v) => v !== null && v >= 0).length;

  return (
    <div className="space-y-8">
      {/* Smart Helper Banner */}
      <div className="rounded-xl border border-sky-100 bg-sky-50/70 p-4 text-xs sm:text-sm text-sky-800 flex items-start gap-3">
        <Sparkles className="h-5 w-5 text-sky-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Smart Interdependent Solver:</span> Enter any 3 values
          below (e.g. Net Amount + Final Bill + Tax, or Base + Slab Rate). The 4th missing variable is
          auto-calculated immediately.
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
          <span>All 4 values are verified and mathematically consistent!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              GST Parameters (Enter Any 3)
            </h2>
            <span className="text-xs text-slate-400 font-mono">{activeInputsCount}/4 Filled</span>
          </div>

          {/* 1. Base Amount */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="gst-base-amount" className="text-xs font-semibold text-slate-700">1. Base / Net Amount (₹)</label>
              {result?.calculatedField === 'amount' && (
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
                id="gst-base-amount"
                type="number"
                placeholder="e.g. 10000"
                value={result?.calculatedField === 'amount' ? Math.round(result.amount) : amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
                readOnly={result?.calculatedField === 'amount'}
                className={`w-full rounded-xl border pl-8 pr-4 py-2.5 text-sm tabular-nums transition-all focus:outline-none ${
                  result?.calculatedField === 'amount'
                    ? 'border-sky-400 bg-sky-50/50 font-bold text-sky-900 ring-2 ring-sky-200'
                    : 'border-slate-200 bg-slate-50/40 text-slate-900 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100'
                }`}
              />
            </div>
            <div className="flex justify-end text-[11px] text-slate-400">
              <button
                type="button"
                onClick={() => setAmountStr('')}
                className="hover:text-slate-600"
              >
                Clear
              </button>
            </div>
          </div>

          {/* 2. GST Rate % */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="gst-slab-rate" className="text-xs font-semibold text-slate-700">2. GST Rate (%)</label>
              {result?.calculatedField === 'gstRate' && (
                <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                  Auto-Calculated
                </span>
              )}
            </div>
            <div className="relative">
              <input
                id="gst-slab-rate"
                type="number"
                step="0.1"
                placeholder="e.g. 18"
                value={
                  result?.calculatedField === 'gstRate'
                    ? result.gstRate.toFixed(2)
                    : rateStr
                }
                onChange={(e) => setRateStr(e.target.value)}
                readOnly={result?.calculatedField === 'gstRate'}
                className={`w-full rounded-xl border px-4 py-2.5 text-sm tabular-nums transition-all focus:outline-none ${
                  result?.calculatedField === 'gstRate'
                    ? 'border-sky-400 bg-sky-50/50 font-bold text-sky-900 ring-2 ring-sky-200'
                    : 'border-slate-200 bg-slate-50/40 text-slate-900 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100'
                }`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold">
                %
              </span>
            </div>
            {/* Quick Slabs */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[0, 5, 12, 18, 28].map((slab) => (
                <button
                  key={slab}
                  type="button"
                  onClick={() => setRateStr(slab.toString())}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                    rateStr === slab.toString()
                      ? 'bg-sky-600 text-white'
                      : 'border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {slab}%
                </button>
              ))}
              <button
                type="button"
                onClick={() => setRateStr('')}
                className="ml-auto text-[11px] text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            </div>
          </div>

          {/* 3. GST Amount */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="gst-tax-amount" className="text-xs font-semibold text-slate-700">3. GST Tax Amount (₹)</label>
              {result?.calculatedField === 'gstAmount' && (
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
                id="gst-tax-amount"
                type="number"
                placeholder="Leave blank or enter"
                value={
                  result?.calculatedField === 'gstAmount'
                    ? Math.round(result.gstAmount)
                    : gstAmountStr
                }
                onChange={(e) => setGstAmountStr(e.target.value)}
                readOnly={result?.calculatedField === 'gstAmount'}
                className={`w-full rounded-xl border pl-8 pr-4 py-2.5 text-sm tabular-nums transition-all focus:outline-none ${
                  result?.calculatedField === 'gstAmount'
                    ? 'border-sky-400 bg-sky-50/50 font-bold text-sky-900 ring-2 ring-sky-200'
                    : 'border-slate-200 bg-slate-50/40 text-slate-900 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100'
                }`}
              />
            </div>
            <div className="flex justify-end text-[11px] text-slate-400">
              <button
                type="button"
                onClick={() => setGstAmountStr('')}
                className="hover:text-slate-600"
              >
                Clear
              </button>
            </div>
          </div>

          {/* 4. Final Amount */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="gst-final-amount" className="text-xs font-semibold text-slate-700">4. Final Gross Amount (₹)</label>
              {result?.calculatedField === 'finalAmount' && (
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
                id="gst-final-amount"
                type="number"
                placeholder="Leave blank or enter"
                value={
                  result?.calculatedField === 'finalAmount'
                    ? Math.round(result.finalAmount)
                    : finalAmountStr
                }
                onChange={(e) => setFinalAmountStr(e.target.value)}
                readOnly={result?.calculatedField === 'finalAmount'}
                className={`w-full rounded-xl border pl-8 pr-4 py-2.5 text-sm tabular-nums transition-all focus:outline-none ${
                  result?.calculatedField === 'finalAmount'
                    ? 'border-sky-400 bg-sky-50/50 font-bold text-sky-900 ring-2 ring-sky-200'
                    : 'border-slate-200 bg-slate-50/40 text-slate-900 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100'
                }`}
              />
            </div>
            <div className="flex justify-end text-[11px] text-slate-400">
              <button
                type="button"
                onClick={() => setFinalAmountStr('')}
                className="hover:text-slate-600"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Right Result Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-6 shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
              GST Invoice Summary
            </h3>

            {result ? (
              <div className="space-y-5">
                <div>
                  <span className="text-xs text-slate-500 font-medium">Final Gross Amount</span>
                  <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-sky-600 tabular-nums">
                    {formatINR(result.finalAmount, true)}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Base Net Price</span>
                    <span className="font-semibold text-slate-900 tabular-nums">
                      {formatINR(result.amount, true)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">GST Slab Rate</span>
                    <span className="font-semibold text-slate-900 tabular-nums">
                      {result.gstRate.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total GST Tax</span>
                    <span className="font-bold text-amber-600 tabular-nums">
                      {formatINR(result.gstAmount, true)}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-dashed border-slate-200 text-xs text-slate-500 flex justify-between">
                    <span>CGST (50%)</span>
                    <span className="font-mono tabular-nums">{formatINR(result.gstAmount / 2, true)}</span>
                  </div>
                  <div className="text-xs text-slate-500 flex justify-between">
                    <span>SGST (50%)</span>
                    <span className="font-mono tabular-nums">{formatINR(result.gstAmount / 2, true)}</span>
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
