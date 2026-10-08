import React, { useState, useEffect } from 'react';
import { calculateCompoundInterest } from '../../engine/finance';
import { formatINR, parseNumeric } from '../../utils/formatters';
import { addHistoryItem } from '../../services/storage';

export const CompoundInterestCalculator: React.FC = () => {
  const [pStr, setPStr] = useState<string>('100000');
  const [rStr, setRStr] = useState<string>('8');
  const [tStr, setTStr] = useState<string>('5');
  const [freq, setFreq] = useState<number>(4); // default quarterly

  const p = parseNumeric(pStr) || 0;
  const r = parseNumeric(rStr) || 0;
  const t = parseNumeric(tStr) || 0;

  const { interest, total } = calculateCompoundInterest(p, r, t, freq);

  useEffect(() => {
    if (p > 0 && r > 0 && t > 0) {
      addHistoryItem({
        calculatorSlug: 'compound-interest',
        calculatorTitle: 'Compound Interest Calculator',
        primaryResult: `${formatINR(total)} (Interest: ${formatINR(interest)})`,
        summary: `Principal: ${formatINR(p)}, Rate: ${r}%, ${t} yrs`,
      });
    }
  }, [p, r, t, freq, total, interest]);

  const pRatio = total > 0 ? Math.round((p / total) * 100) : 50;
  const iRatio = 100 - pRatio;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
          Investment Parameters
        </h2>

        <div className="space-y-1.5">
          <label htmlFor="ci-principal-amount" className="text-xs font-semibold text-slate-700">Initial Principal (₹)</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-semibold">₹</span>
            <input
              id="ci-principal-amount"
              type="number"
              value={pStr}
              onChange={(e) => setPStr(e.target.value)}
              className="w-full rounded-xl border border-slate-200 pl-8 pr-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
              placeholder="e.g. 100000"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="ci-annual-rate" className="text-xs font-semibold text-slate-700">Annual Interest Rate (% p.a.)</label>
          <div className="relative">
            <input
              id="ci-annual-rate"
              type="number"
              step="0.1"
              value={rStr}
              onChange={(e) => setRStr(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
              placeholder="e.g. 8"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold">%</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="ci-time-tenure" className="text-xs font-semibold text-slate-700">Investment Horizon (Years)</label>
          <div className="relative">
            <input
              id="ci-time-tenure"
              type="number"
              step="0.5"
              value={tStr}
              onChange={(e) => setTStr(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
              placeholder="e.g. 5"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold">Years</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="ci-compounding-frequency" className="text-xs font-semibold text-slate-700">Compounding Frequency</label>
          <select
            id="ci-compounding-frequency"
            value={freq}
            onChange={(e) => setFreq(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-sky-500 focus:outline-none"
          >
            <option value={1}>Annually (1x / year)</option>
            <option value={2}>Semi-Annually (2x / year)</option>
            <option value={4}>Quarterly (4x / year — Standard Bank FD)</option>
            <option value={12}>Monthly (12x / year)</option>
            <option value={365}>Daily (365x / year)</option>
          </select>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-6 shadow-sm">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Compounded Value
          </h3>
          <div className="space-y-5">
            <div>
              <span className="text-xs text-slate-500 font-medium">Future Accumulated Value</span>
              <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-sky-600 tabular-nums">
                {formatINR(total, true)}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Initial Principal</span>
                <span className="font-semibold text-slate-900 tabular-nums">{formatINR(p, true)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Interest Earned</span>
                <span className="font-bold text-emerald-600 tabular-nums">{formatINR(interest, true)}</span>
              </div>
            </div>

            {/* Proportion Bar */}
            <div className="pt-2">
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 flex">
                <div style={{ width: `${pRatio}%` }} className="bg-sky-500" />
                <div style={{ width: `${iRatio}%` }} className="bg-emerald-500" />
              </div>
              <div className="mt-2 flex justify-between text-[11px] text-slate-400">
                <span>Principal ({pRatio}%)</span>
                <span>Interest ({iRatio}%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
