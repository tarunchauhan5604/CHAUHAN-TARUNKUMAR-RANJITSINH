import React, { useState, useEffect } from 'react';
import { calculateRD } from '../../engine/finance';
import { formatINR, parseNumeric } from '../../utils/formatters';
import { addHistoryItem } from '../../services/storage';

export const RDCalculator: React.FC = () => {
  const [monthlyStr, setMonthlyStr] = useState<string>('5000');
  const [rStr, setRStr] = useState<string>('6.8');
  const [monthsStr, setMonthsStr] = useState<string>('36');

  const monthly = parseNumeric(monthlyStr) || 0;
  const r = parseNumeric(rStr) || 0;
  const months = parseNumeric(monthsStr) || 0;

  const { totalDeposit, interest, maturityAmount } = calculateRD(monthly, r, months);

  useEffect(() => {
    if (monthly > 0 && r > 0 && months > 0) {
      addHistoryItem({
        calculatorSlug: 'rd',
        calculatorTitle: 'RD Calculator',
        primaryResult: `${formatINR(maturityAmount)} (Interest: ${formatINR(interest)})`,
        summary: `₹${monthly}/mo at ${r}% for ${months} mos`,
      });
    }
  }, [monthly, r, months, maturityAmount, interest]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
          Recurring Deposit Parameters
        </h2>

        <div className="space-y-1.5">
          <label htmlFor="rd-monthly-deposit" className="text-xs font-semibold text-slate-700">Monthly Deposit Amount (₹)</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-semibold">₹</span>
            <input
              id="rd-monthly-deposit"
              type="number"
              value={monthlyStr}
              onChange={(e) => setMonthlyStr(e.target.value)}
              className="w-full rounded-xl border border-slate-200 pl-8 pr-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
              placeholder="e.g. 5000"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="rd-interest-rate" className="text-xs font-semibold text-slate-700">Bank Interest Rate (% p.a.)</label>
          <div className="relative">
            <input
              id="rd-interest-rate"
              type="number"
              step="0.1"
              value={rStr}
              onChange={(e) => setRStr(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
              placeholder="e.g. 6.8"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold">%</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="rd-tenure-months" className="text-xs font-semibold text-slate-700">Tenure (Total Months)</label>
          <div className="relative">
            <input
              id="rd-tenure-months"
              type="number"
              value={monthsStr}
              onChange={(e) => setMonthsStr(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
              placeholder="e.g. 36"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold">Months</span>
          </div>
          <div className="flex gap-2 text-[11px] text-slate-400 pt-1">
            <button type="button" onClick={() => setMonthsStr('12')} className="hover:text-sky-600 underline">
              12m (1 yr)
            </button>
            <button type="button" onClick={() => setMonthsStr('24')} className="hover:text-sky-600 underline">
              24m (2 yrs)
            </button>
            <button type="button" onClick={() => setMonthsStr('36')} className="hover:text-sky-600 underline">
              36m (3 yrs)
            </button>
            <button type="button" onClick={() => setMonthsStr('60')} className="hover:text-sky-600 underline">
              60m (5 yrs)
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-6 shadow-sm">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
            RD Maturity Estimate
          </h3>

          <div className="space-y-5">
            <div>
              <span className="text-xs text-slate-500 font-medium">Total Maturity Payout</span>
              <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-sky-600 tabular-nums">
                {formatINR(maturityAmount, true)}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Cumulative Deposits</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  {formatINR(totalDeposit, true)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Guaranteed Interest</span>
                <span className="font-bold text-emerald-600 tabular-nums">
                  {formatINR(interest, true)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
