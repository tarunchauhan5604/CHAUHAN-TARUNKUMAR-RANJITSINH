import React, { useState, useEffect } from 'react';
import { calculateSIP } from '../../engine/finance';
import { formatINR, parseNumeric } from '../../utils/formatters';
import { addHistoryItem } from '../../services/storage';

export const SIPCalculator: React.FC = () => {
  const [monthlyStr, setMonthlyStr] = useState<string>('5000');
  const [rateStr, setRateStr] = useState<string>('12');
  const [yearsStr, setYearsStr] = useState<string>('10');

  const monthly = parseNumeric(monthlyStr) || 0;
  const rate = parseNumeric(rateStr) || 0;
  const years = parseNumeric(yearsStr) || 0;

  const { futureValue, totalInvested, wealthGained } = calculateSIP(monthly, rate, years);

  useEffect(() => {
    if (monthly > 0 && rate > 0 && years > 0) {
      addHistoryItem({
        calculatorSlug: 'sip',
        calculatorTitle: 'SIP Calculator',
        primaryResult: `${formatINR(futureValue)} (Gains: ${formatINR(wealthGained)})`,
        summary: `₹${monthly}/mo at ${rate}% for ${years} yrs`,
      });
    }
  }, [monthly, rate, years, futureValue, wealthGained]);

  const investRatio = futureValue > 0 ? Math.round((totalInvested / futureValue) * 100) : 50;
  const gainRatio = 100 - investRatio;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
          Monthly SIP Investment
        </h2>

        <div className="space-y-1.5">
          <label htmlFor="sip-monthly-investment" className="text-xs font-semibold text-slate-700">Monthly Contribution (₹)</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-semibold">₹</span>
            <input
              id="sip-monthly-investment"
              type="number"
              value={monthlyStr}
              onChange={(e) => setMonthlyStr(e.target.value)}
              className="w-full rounded-xl border border-slate-200 pl-8 pr-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
              placeholder="e.g. 5000"
            />
          </div>
          <div className="flex gap-2 text-[11px] text-slate-400 pt-1">
            <button type="button" onClick={() => setMonthlyStr('1000')} className="hover:text-sky-600 underline">
              1K
            </button>
            <button type="button" onClick={() => setMonthlyStr('5000')} className="hover:text-sky-600 underline">
              5K
            </button>
            <button type="button" onClick={() => setMonthlyStr('10000')} className="hover:text-sky-600 underline">
              10K
            </button>
            <button type="button" onClick={() => setMonthlyStr('25000')} className="hover:text-sky-600 underline">
              25K
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="sip-expected-return-rate" className="text-xs font-semibold text-slate-700">Expected Annual Return Rate (% p.a.)</label>
          <div className="relative">
            <input
              id="sip-expected-return-rate"
              type="number"
              step="0.5"
              value={rateStr}
              onChange={(e) => setRateStr(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
              placeholder="e.g. 12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold">%</span>
          </div>
          <div className="flex gap-2 text-[11px] text-slate-400 pt-1">
            <button type="button" onClick={() => setRateStr('10')} className="hover:text-sky-600 underline">
              10% (Conservative)
            </button>
            <button type="button" onClick={() => setRateStr('12')} className="hover:text-sky-600 underline">
              12% (Balanced)
            </button>
            <button type="button" onClick={() => setRateStr('15')} className="hover:text-sky-600 underline">
              15% (Aggressive)
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="sip-time-period" className="text-xs font-semibold text-slate-700">Investment Horizon (Years)</label>
          <div className="relative">
            <input
              id="sip-time-period"
              type="number"
              value={yearsStr}
              onChange={(e) => setYearsStr(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
              placeholder="e.g. 10"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold">Years</span>
          </div>
          <div className="flex gap-2 text-[11px] text-slate-400 pt-1">
            <button type="button" onClick={() => setYearsStr('5')} className="hover:text-sky-600 underline">
              5 Yrs
            </button>
            <button type="button" onClick={() => setYearsStr('10')} className="hover:text-sky-600 underline">
              10 Yrs
            </button>
            <button type="button" onClick={() => setYearsStr('15')} className="hover:text-sky-600 underline">
              15 Yrs
            </button>
            <button type="button" onClick={() => setYearsStr('20')} className="hover:text-sky-600 underline">
              20 Yrs
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-6 shadow-sm">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Projected Wealth Creation
          </h3>

          <div className="space-y-5">
            <div>
              <span className="text-xs text-slate-500 font-medium">Estimated Future Corpus</span>
              <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-emerald-600 tabular-nums">
                {formatINR(futureValue)}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Invested Capital</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  {formatINR(totalInvested)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Compounding Wealth Gained</span>
                <span className="font-bold text-emerald-600 tabular-nums">
                  {formatINR(wealthGained)}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 flex">
                <div style={{ width: `${investRatio}%` }} className="bg-sky-500" />
                <div style={{ width: `${gainRatio}%` }} className="bg-emerald-500" />
              </div>
              <div className="mt-2 flex justify-between text-[11px] text-slate-400">
                <span>Invested ({investRatio}%)</span>
                <span>Gains ({gainRatio}%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
