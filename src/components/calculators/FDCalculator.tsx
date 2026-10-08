import React, { useState, useEffect } from 'react';
import { calculateFD } from '../../engine/finance';
import { formatINR, parseNumeric } from '../../utils/formatters';
import { addHistoryItem } from '../../services/storage';

export const FDCalculator: React.FC = () => {
  const [pStr, setPStr] = useState<string>('500000');
  const [rStr, setRStr] = useState<string>('7.1');
  const [tStr, setTStr] = useState<string>('3');

  const p = parseNumeric(pStr) || 0;
  const r = parseNumeric(rStr) || 0;
  const t = parseNumeric(tStr) || 0;

  const { total: maturity, interest } = calculateFD(p, r, t);

  useEffect(() => {
    if (p > 0 && r > 0 && t > 0) {
      addHistoryItem({
        calculatorSlug: 'fd',
        calculatorTitle: 'FD Calculator',
        primaryResult: `${formatINR(maturity)} (Interest: ${formatINR(interest)})`,
        summary: `Deposit: ${formatINR(p)}, Rate: ${r}% for ${t} yrs`,
      });
    }
  }, [p, r, t, maturity, interest]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
          Fixed Deposit Terms
        </h2>

        <div className="space-y-1.5">
          <label htmlFor="fd-deposit-amount" className="text-xs font-semibold text-slate-700">Total Fixed Deposit (₹)</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-semibold">₹</span>
            <input
              id="fd-deposit-amount"
              type="number"
              value={pStr}
              onChange={(e) => setPStr(e.target.value)}
              className="w-full rounded-xl border border-slate-200 pl-8 pr-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
              placeholder="e.g. 500000"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="fd-interest-rate" className="text-xs font-semibold text-slate-700">Bank Interest Rate (% p.a.)</label>
          <div className="relative">
            <input
              id="fd-interest-rate"
              type="number"
              step="0.05"
              value={rStr}
              onChange={(e) => setRStr(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
              placeholder="e.g. 7.1"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold">%</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="fd-tenure-duration" className="text-xs font-semibold text-slate-700">Tenure (Years)</label>
          <div className="relative">
            <input
              id="fd-tenure-duration"
              type="number"
              step="0.5"
              value={tStr}
              onChange={(e) => setTStr(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
              placeholder="e.g. 3"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold">Years</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-6 shadow-sm">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
            FD Maturity Proceeds
          </h3>

          <div className="space-y-5">
            <div>
              <span className="text-xs text-slate-500 font-medium">Maturity Amount (Quarterly Compounded)</span>
              <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-sky-600 tabular-nums">
                {formatINR(maturity, true)}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Principal Deposited</span>
                <span className="font-semibold text-slate-900 tabular-nums">{formatINR(p, true)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Interest Earned</span>
                <span className="font-bold text-emerald-600 tabular-nums">{formatINR(interest, true)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
