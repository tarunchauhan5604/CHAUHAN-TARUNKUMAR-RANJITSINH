import React, { useState } from 'react';
import { calculatePregnancyDueDate } from '../../engine/health';
import { AlertTriangle, Heart } from 'lucide-react';

export const PregnancyDueDateCalculator: React.FC = () => {
  const [lmp, setLmp] = useState<string>('2026-05-01');
  const [cycle, setCycle] = useState<number>(28);

  const result = calculatePregnancyDueDate(lmp, cycle);

  return (
    <div className="space-y-6">
      {/* Informational & Medical Disclaimer Banner */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs sm:text-sm text-amber-800 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong>Medical Notice:</strong> This tool provides approximate estimations based on
          standard clinical guidelines (Naegele&apos;s Rule) for general informational planning only.
          It does not substitute for medical examination, ultrasound, or professional obstetrician advice.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
            Cycle Details
          </h2>

          <div className="space-y-1.5">
            <label htmlFor="preg-lmp-date" className="text-xs font-semibold text-slate-700">
              First Day of Last Menstrual Period (LMP)
            </label>
            <input
              id="preg-lmp-date"
              type="date"
              value={lmp}
              onChange={(e) => setLmp(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="preg-cycle-length" className="text-xs font-semibold text-slate-700">
              Average Menstrual Cycle Length (Days)
            </label>
            <input
              id="preg-cycle-length"
              type="number"
              min="21"
              max="40"
              value={cycle}
              onChange={(e) => setCycle(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
            />
            <span className="text-[11px] text-slate-400">Default standard cycle is 28 days</span>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-6 shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-1.5">
              <Heart className="h-4 w-4 text-rose-500 fill-rose-500/20" /> Estimated Timeline
            </h3>

            {result ? (
              <div className="space-y-5">
                <div>
                  <span className="text-xs text-slate-500 font-medium">Estimated Due Date</span>
                  <div className="mt-1 text-2xl sm:text-3xl font-extrabold text-rose-600">
                    {result.dueDate}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Estimated Conception</span>
                    <span className="font-semibold text-slate-900">{result.conceptionDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Current Gestational Age</span>
                    <span className="font-semibold text-slate-900 tabular-nums">
                      {result.currentWeeks} weeks, {result.currentDays} days
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Trimester</span>
                    <span className="font-bold text-sky-600">
                      Trimester {result.trimester} of 3
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-dashed border-slate-200">
                    <span className="text-slate-500">Days Remaining</span>
                    <span className="font-bold text-slate-900 tabular-nums">
                      ~{result.daysRemaining} days
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-sm text-slate-500">
                Please enter a valid LMP date.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
