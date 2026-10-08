import React, { useState, useEffect } from 'react';
import { solveSmartDiscount, DiscountSmartResult } from '../../engine/finance';
import { formatINR, parseNumeric } from '../../utils/formatters';
import { addHistoryItem } from '../../services/storage';
import { Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

export const DiscountCalculator: React.FC = () => {
  const [origStr, setOrigStr] = useState<string>('2499');
  const [rateStr, setRateStr] = useState<string>('25');
  const [amtStr, setAmtStr] = useState<string>('');
  const [finalStr, setFinalStr] = useState<string>('');

  const p = parseNumeric(origStr);
  const d = parseNumeric(rateStr);
  const amt = parseNumeric(amtStr);
  const finalP = parseNumeric(finalStr);

  const result: DiscountSmartResult | null = solveSmartDiscount(p, d, amt, finalP);

  useEffect(() => {
    if (result && result.calculatedField) {
      addHistoryItem({
        calculatorSlug: 'discount',
        calculatorTitle: 'Discount Calculator',
        primaryResult: `${formatINR(result.finalPrice)} (Saved ${formatINR(result.discountAmount)})`,
        summary: `Original: ${formatINR(result.originalPrice)}, ${result.discountRate}% off`,
      });
    }
  }, [result?.calculatedField, result?.finalPrice, result?.originalPrice]);

  const activeCount = [p, d, amt, finalP].filter((v) => v !== null && v >= 0).length;

  return (
    <div className="space-y-8">
      {/* Smart Helper Banner */}
      <div className="rounded-xl border border-sky-100 bg-sky-50/70 p-4 text-xs sm:text-sm text-sky-800 flex items-start gap-3">
        <Sparkles className="h-5 w-5 text-sky-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Smart Interdependent Solver:</span> Enter any 3 values
          (e.g. Final Price + Discount % to find Original Price, or Original + Savings to find the % off).
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
          <span>All 4 discount values are verified & consistent!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              Discount Inputs (Enter Any 3)
            </h2>
            <span className="text-xs text-slate-400 font-mono">{activeCount}/4 Filled</span>
          </div>

          {/* 1. Original Price */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="discount-original-price" className="text-xs font-semibold text-slate-700">1. Original Retail Price (₹)</label>
              {result?.calculatedField === 'originalPrice' && (
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
                id="discount-original-price"
                type="number"
                placeholder="e.g. 2499"
                value={
                  result?.calculatedField === 'originalPrice'
                    ? Math.round(result.originalPrice)
                    : origStr
                }
                onChange={(e) => setOrigStr(e.target.value)}
                readOnly={result?.calculatedField === 'originalPrice'}
                className={`w-full rounded-xl border pl-8 pr-4 py-2.5 text-sm tabular-nums transition-all focus:outline-none ${
                  result?.calculatedField === 'originalPrice'
                    ? 'border-sky-400 bg-sky-50/50 font-bold text-sky-900 ring-2 ring-sky-200'
                    : 'border-slate-200 bg-slate-50/40 text-slate-900 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100'
                }`}
              />
            </div>
            <div className="flex justify-end text-[11px] text-slate-400">
              <button
                type="button"
                onClick={() => setOrigStr('')}
                className="hover:text-slate-600"
              >
                Clear
              </button>
            </div>
          </div>

          {/* 2. Discount Rate % */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="discount-percentage-rate" className="text-xs font-semibold text-slate-700">2. Discount Rate (%)</label>
              {result?.calculatedField === 'discountRate' && (
                <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                  Auto-Calculated
                </span>
              )}
            </div>
            <div className="relative">
              <input
                id="discount-percentage-rate"
                type="number"
                step="0.5"
                placeholder="e.g. 25"
                value={
                  result?.calculatedField === 'discountRate'
                    ? result.discountRate.toFixed(2)
                    : rateStr
                }
                onChange={(e) => setRateStr(e.target.value)}
                readOnly={result?.calculatedField === 'discountRate'}
                className={`w-full rounded-xl border px-4 py-2.5 text-sm tabular-nums transition-all focus:outline-none ${
                  result?.calculatedField === 'discountRate'
                    ? 'border-sky-400 bg-sky-50/50 font-bold text-sky-900 ring-2 ring-sky-200'
                    : 'border-slate-200 bg-slate-50/40 text-slate-900 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100'
                }`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold">
                %
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[10, 15, 20, 25, 30, 40, 50].map((dVal) => (
                <button
                  key={dVal}
                  type="button"
                  onClick={() => setRateStr(dVal.toString())}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                    rateStr === dVal.toString()
                      ? 'bg-sky-600 text-white'
                      : 'border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {dVal}%
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

          {/* 3. Discount Amount */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="discount-saved-amount" className="text-xs font-semibold text-slate-700">3. Discount Amount Saved (₹)</label>
              {result?.calculatedField === 'discountAmount' && (
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
                id="discount-saved-amount"
                type="number"
                placeholder="Leave blank or enter"
                value={
                  result?.calculatedField === 'discountAmount'
                    ? Math.round(result.discountAmount)
                    : amtStr
                }
                onChange={(e) => setAmtStr(e.target.value)}
                readOnly={result?.calculatedField === 'discountAmount'}
                className={`w-full rounded-xl border pl-8 pr-4 py-2.5 text-sm tabular-nums transition-all focus:outline-none ${
                  result?.calculatedField === 'discountAmount'
                    ? 'border-sky-400 bg-sky-50/50 font-bold text-sky-900 ring-2 ring-sky-200'
                    : 'border-slate-200 bg-slate-50/40 text-slate-900 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100'
                }`}
              />
            </div>
            <div className="flex justify-end text-[11px] text-slate-400">
              <button
                type="button"
                onClick={() => setAmtStr('')}
                className="hover:text-slate-600"
              >
                Clear
              </button>
            </div>
          </div>

          {/* 4. Final Price */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="discount-final-price" className="text-xs font-semibold text-slate-700">4. Final Discounted Price (₹)</label>
              {result?.calculatedField === 'finalPrice' && (
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
                id="discount-final-price"
                type="number"
                placeholder="Leave blank or enter"
                value={
                  result?.calculatedField === 'finalPrice'
                    ? Math.round(result.finalPrice)
                    : finalStr
                }
                onChange={(e) => setFinalStr(e.target.value)}
                readOnly={result?.calculatedField === 'finalPrice'}
                className={`w-full rounded-xl border pl-8 pr-4 py-2.5 text-sm tabular-nums transition-all focus:outline-none ${
                  result?.calculatedField === 'finalPrice'
                    ? 'border-sky-400 bg-sky-50/50 font-bold text-sky-900 ring-2 ring-sky-200'
                    : 'border-slate-200 bg-slate-50/40 text-slate-900 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100'
                }`}
              />
            </div>
            <div className="flex justify-end text-[11px] text-slate-400">
              <button
                type="button"
                onClick={() => setFinalStr('')}
                className="hover:text-slate-600"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Right Result Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-6 shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
              Deal Summary
            </h3>

            {result ? (
              <div className="space-y-5">
                <div>
                  <span className="text-xs text-slate-500 font-medium">Final Price You Pay</span>
                  <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-emerald-600 tabular-nums">
                    {formatINR(result.finalPrice, true)}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Original Price</span>
                    <span className="font-semibold text-slate-900 line-through text-slate-400 tabular-nums">
                      {formatINR(result.originalPrice, true)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Discount Rate</span>
                    <span className="font-semibold text-slate-900 tabular-nums">
                      {result.discountRate.toFixed(1)}% OFF
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Money Saved</span>
                    <span className="font-bold text-emerald-600 tabular-nums">
                      {formatINR(result.discountAmount, true)}
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
