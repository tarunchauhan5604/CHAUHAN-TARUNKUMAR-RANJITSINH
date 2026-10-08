import React, { useState, useEffect } from 'react';
import { calculateAge, AgeResult } from '../../engine/health';
import { addHistoryItem } from '../../services/storage';

export const AgeCalculator: React.FC = () => {
  const [dob, setDob] = useState<string>('1998-05-15');
  const [asOf, setAsOf] = useState<string>(new Date().toISOString().split('T')[0]);

  const result: AgeResult | null = calculateAge(dob, asOf);

  useEffect(() => {
    if (result) {
      addHistoryItem({
        calculatorSlug: 'age',
        calculatorTitle: 'Age Calculator',
        primaryResult: `${result.years} Yrs, ${result.months} Mos, ${result.days} Days`,
        summary: `Born: ${dob}, Next birthday in ${result.daysUntilNextBirthday} days`,
      });
    }
  }, [dob, asOf, result?.years, result?.months, result?.days]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
          Select Dates
        </h2>

        <div className="space-y-1.5">
          <label htmlFor="age-dob" className="text-xs font-semibold text-slate-700">Date of Birth</label>
          <input
            id="age-dob"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="age-target-date" className="text-xs font-semibold text-slate-700">Calculate Age As Of</label>
          <input
            id="age-target-date"
            type="date"
            value={asOf}
            onChange={(e) => setAsOf(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="lg:col-span-5 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-6 shadow-sm">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Chronological Age
          </h3>

          {result ? (
            <div className="space-y-5">
              <div>
                <span className="text-xs text-slate-500 font-medium">Exact Age</span>
                <div className="mt-1 text-2xl sm:text-3xl font-extrabold text-sky-600 tabular-nums">
                  {result.years} <span className="text-base font-medium text-slate-600">Years</span>{' '}
                  {result.months} <span className="text-base font-medium text-slate-600">Months</span>{' '}
                  {result.days} <span className="text-base font-medium text-slate-600">Days</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Days Lived</span>
                  <span className="font-semibold text-slate-900 tabular-nums">
                    {result.totalDays.toLocaleString()} days
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Weeks Lived</span>
                  <span className="font-semibold text-slate-900 tabular-nums">
                    {result.totalWeeks.toLocaleString()} weeks
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-dashed border-slate-200 text-sky-700 font-medium">
                  <span>Next Birthday Countdown</span>
                  <span className="font-bold tabular-nums">
                    {result.daysUntilNextBirthday} days ({result.nextBirthdayDayOfWeek})
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-sm text-slate-500">
              Please choose a valid birth date in the past.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
