import React, { useState } from 'react';
import { calculateDateDifference } from '../../engine/health';

export const DateDifferenceCalculator: React.FC = () => {
  const [start, setStart] = useState<string>('2026-01-01');
  const [end, setEnd] = useState<string>('2026-12-31');

  const result = calculateDateDifference(start, end);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
          Date Span Range
        </h2>

        <div className="space-y-1.5">
          <label htmlFor="date-diff-start" className="text-xs font-semibold text-slate-700">Start Date</label>
          <input
            id="date-diff-start"
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="date-diff-end" className="text-xs font-semibold text-slate-700">End Date</label>
          <input
            id="date-diff-end"
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="lg:col-span-5 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-6 shadow-sm">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Duration Span
          </h3>

          {result ? (
            <div className="space-y-5">
              <div>
                <span className="text-xs text-slate-500 font-medium">Calendar Difference</span>
                <div className="mt-1 text-2xl font-extrabold text-sky-600 tabular-nums">
                  {result.years > 0 && `${result.years} Yrs, `}
                  {result.months} Months, {result.days} Days
                </div>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-slate-100 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Calendar Days</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {result.totalDays.toLocaleString()} days
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Working Business Days (Mon-Fri)</span>
                  <span className="font-semibold text-emerald-600 tabular-nums">
                    {result.businessDays.toLocaleString()} days
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Elapsed Hours</span>
                  <span className="font-semibold text-slate-700 tabular-nums">
                    {result.totalHours.toLocaleString()} hours
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-sm text-slate-500">
              Please choose two valid calendar dates.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
