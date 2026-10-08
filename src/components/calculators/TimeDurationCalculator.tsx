import React, { useState } from 'react';
import { calculateTimeDuration } from '../../engine/utility';

export const TimeDurationCalculator: React.FC = () => {
  const [startTime, setStartTime] = useState<string>('09:15');
  const [endTime, setEndTime] = useState<string>('17:45');
  const [crossMidnight, setCrossMidnight] = useState<boolean>(false);

  const result = calculateTimeDuration(startTime, endTime, crossMidnight);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
          Timestamps
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="time-dur-start" className="text-xs font-semibold text-slate-700">Start Time</label>
            <input
              id="time-dur-start"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="time-dur-end" className="text-xs font-semibold text-slate-700">End Time</label>
            <input
              id="time-dur-end"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="crossMidnight"
            checked={crossMidnight}
            onChange={(e) => setCrossMidnight(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
          />
          <label htmlFor="crossMidnight" className="text-xs text-slate-700 font-medium">
            Overnight Shift (Ends the next calendar day)
          </label>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-6 shadow-sm">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Elapsed Duration
          </h3>

          {result ? (
            <div className="space-y-5">
              <div>
                <span className="text-xs text-slate-500 font-medium">Total Elapsed Time</span>
                <div className="mt-1 text-3xl font-extrabold text-sky-600 tabular-nums">
                  {result.hours} hrs {result.minutes} mins
                </div>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-slate-100 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Decimal Hours</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {result.totalHours} hrs
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Minutes</span>
                  <span className="font-semibold text-slate-900 tabular-nums">
                    {result.totalMinutes.toLocaleString()} mins
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Seconds</span>
                  <span className="font-mono text-xs text-slate-600 tabular-nums">
                    {result.totalSeconds.toLocaleString()} s
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-sm text-slate-500">
              Please enter valid start and end times.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
