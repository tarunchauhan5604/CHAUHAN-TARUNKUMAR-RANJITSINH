import React, { useState } from 'react';
import { calculateAgeDifference } from '../../engine/utility';

export const AgeDifferenceCalculator: React.FC = () => {
  const [d1, setD1] = useState<string>('1995-04-10');
  const [d2, setD2] = useState<string>('1998-11-25');

  const result = calculateAgeDifference(d1, d2);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
          Compare Birthdays
        </h2>

        <div className="space-y-1.5">
          <label htmlFor="age-diff-person1" className="text-xs font-semibold text-slate-700">Person 1 Date of Birth</label>
          <input
            id="age-diff-person1"
            type="date"
            value={d1}
            onChange={(e) => setD1(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="age-diff-person2" className="text-xs font-semibold text-slate-700">Person 2 Date of Birth</label>
          <input
            id="age-diff-person2"
            type="date"
            value={d2}
            onChange={(e) => setD2(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="lg:col-span-5 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-6 shadow-sm">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Age Comparison
          </h3>

          {result ? (
            <div className="space-y-5">
              <div>
                <span className="text-xs text-slate-500 font-medium">Exact Age Gap</span>
                <div className="mt-1 text-2xl sm:text-3xl font-extrabold text-sky-600 tabular-nums">
                  {result.years} <span className="text-sm font-normal text-slate-600">Years</span>{' '}
                  {result.months} <span className="text-sm font-normal text-slate-600">Months</span>{' '}
                  {result.days} <span className="text-sm font-normal text-slate-600">Days</span>
                </div>
                <div className="mt-2 text-xs font-semibold text-slate-700">
                  {result.olderPerson === 'same'
                    ? 'Both persons were born on the exact same day!'
                    : `Person ${result.olderPerson} is older by ${result.totalDays.toLocaleString()} calendar days.`}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
                Total gap in days: <span className="font-bold text-slate-900">{result.totalDays.toLocaleString()}</span> days
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-sm text-slate-500">
              Please enter valid birth dates for both individuals.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
