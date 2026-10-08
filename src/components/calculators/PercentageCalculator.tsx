import React, { useState } from 'react';
import { parseNumeric, formatNumber } from '../../utils/formatters';
import { addHistoryItem } from '../../services/storage';

export const PercentageCalculator: React.FC = () => {
  // Mode 1: What is X% of Y?
  const [m1X, setM1X] = useState<string>('15');
  const [m1Y, setM1Y] = useState<string>('2400');

  // Mode 2: X is what percentage of Y?
  const [m2X, setM2X] = useState<string>('450');
  const [m2Y, setM2Y] = useState<string>('1800');

  // Mode 3: Percentage Change from X to Y
  const [m3X, setM3X] = useState<string>('1200');
  const [m3Y, setM3Y] = useState<string>('1500');

  // Calculations
  const n1X = parseNumeric(m1X);
  const n1Y = parseNumeric(m1Y);
  const res1 = n1X !== null && n1Y !== null ? (n1X / 100) * n1Y : null;

  const n2X = parseNumeric(m2X);
  const n2Y = parseNumeric(m2Y);
  const res2 = n2X !== null && n2Y !== null && n2Y !== 0 ? (n2X / n2Y) * 100 : null;

  const n3X = parseNumeric(m3X);
  const n3Y = parseNumeric(m3Y);
  const res3 =
    n3X !== null && n3Y !== null && n3X !== 0 ? ((n3Y - n3X) / Math.abs(n3X)) * 100 : null;

  return (
    <div className="space-y-8">
      {/* Three intuitive calculation cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: What is X% of Y? */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div>
            <div className="inline-block text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md mb-3">
              Case 1: Direct Percentage
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-4">What is X% of Y?</h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="pct-x-rate" className="text-xs font-semibold text-slate-600">Percentage (X %)</label>
                <input
                  id="pct-x-rate"
                  type="number"
                  value={m1X}
                  onChange={(e) => setM1X(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
                  placeholder="e.g. 15"
                />
              </div>
              <div>
                <label htmlFor="pct-y-base" className="text-xs font-semibold text-slate-600">Of Total Value (Y)</label>
                <input
                  id="pct-y-base"
                  type="number"
                  value={m1Y}
                  onChange={(e) => setM1Y(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
                  placeholder="e.g. 2400"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 bg-slate-50/70 -mx-6 -mb-6 p-6 rounded-b-2xl">
            <span className="text-xs text-slate-500 font-medium">Result:</span>
            <div className="text-2xl font-extrabold text-sky-600 tabular-nums mt-0.5">
              {res1 !== null ? formatNumber(res1, 2) : '—'}
            </div>
            {res1 !== null && (
              <p className="text-xs text-slate-500 mt-1">
                {m1X}% of {m1Y} is {formatNumber(res1, 2)}
              </p>
            )}
          </div>
        </div>

        {/* Card 2: X is what % of Y? */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div>
            <div className="inline-block text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md mb-3">
              Case 2: Proportion Share
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-4">X is what % of Y?</h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="pct-part-value" className="text-xs font-semibold text-slate-600">Part Value (X)</label>
                <input
                  id="pct-part-value"
                  type="number"
                  value={m2X}
                  onChange={(e) => setM2X(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm tabular-nums focus:border-indigo-500 focus:outline-none"
                  placeholder="e.g. 450"
                />
              </div>
              <div>
                <label htmlFor="pct-whole-total" className="text-xs font-semibold text-slate-600">Whole / Total (Y)</label>
                <input
                  id="pct-whole-total"
                  type="number"
                  value={m2Y}
                  onChange={(e) => setM2Y(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm tabular-nums focus:border-indigo-500 focus:outline-none"
                  placeholder="e.g. 1800"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 bg-slate-50/70 -mx-6 -mb-6 p-6 rounded-b-2xl">
            <span className="text-xs text-slate-500 font-medium">Result:</span>
            <div className="text-2xl font-extrabold text-indigo-600 tabular-nums mt-0.5">
              {res2 !== null ? `${formatNumber(res2, 2)}%` : '—'}
            </div>
            {res2 !== null && (
              <p className="text-xs text-slate-500 mt-1">
                {m2X} represents {formatNumber(res2, 2)}% of {m2Y}
              </p>
            )}
          </div>
        </div>

        {/* Card 3: Percentage Increase / Decrease */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div>
            <div className="inline-block text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md mb-3">
              Case 3: Growth / Decline
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-4">% Increase or Decrease</h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="pct-initial-value" className="text-xs font-semibold text-slate-600">Initial Value (From X)</label>
                <input
                  id="pct-initial-value"
                  type="number"
                  value={m3X}
                  onChange={(e) => setM3X(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm tabular-nums focus:border-emerald-500 focus:outline-none"
                  placeholder="e.g. 1200"
                />
              </div>
              <div>
                <label htmlFor="pct-final-value" className="text-xs font-semibold text-slate-600">Final Value (To Y)</label>
                <input
                  id="pct-final-value"
                  type="number"
                  value={m3Y}
                  onChange={(e) => setM3Y(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm tabular-nums focus:border-emerald-500 focus:outline-none"
                  placeholder="e.g. 1500"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 bg-slate-50/70 -mx-6 -mb-6 p-6 rounded-b-2xl">
            <span className="text-xs text-slate-500 font-medium">Result:</span>
            <div
              className={`text-2xl font-extrabold tabular-nums mt-0.5 ${
                res3 !== null && res3 >= 0 ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {res3 !== null ? `${res3 >= 0 ? '+' : ''}${formatNumber(res3, 2)}%` : '—'}
            </div>
            {res3 !== null && (
              <p className="text-xs text-slate-500 mt-1">
                {res3 >= 0 ? 'Increase' : 'Decrease'} of {formatNumber(Math.abs(res3), 2)}%
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
