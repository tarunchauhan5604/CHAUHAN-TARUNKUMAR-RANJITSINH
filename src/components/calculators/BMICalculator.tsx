import React, { useState, useEffect } from 'react';
import { calculateBMI, BMIResult } from '../../engine/health';
import { parseNumeric } from '../../utils/formatters';
import { addHistoryItem } from '../../services/storage';

export const BMICalculator: React.FC = () => {
  const [unitMode, setUnitMode] = useState<'metric' | 'imperial'>('metric');
  
  // Metric: cm and kg
  const [heightCmStr, setHeightCmStr] = useState<string>('175');
  const [weightKgStr, setWeightKgStr] = useState<string>('70');

  // Imperial: feet, inches, lbs
  const [heightFtStr, setHeightFtStr] = useState<string>('5');
  const [heightInStr, setHeightInStr] = useState<string>('9');
  const [weightLbsStr, setWeightLbsStr] = useState<string>('154');

  // Convert to metric for computation
  let effectiveHeightCm = 0;
  let effectiveWeightKg = 0;

  if (unitMode === 'metric') {
    effectiveHeightCm = parseNumeric(heightCmStr) || 0;
    effectiveWeightKg = parseNumeric(weightKgStr) || 0;
  } else {
    const ft = parseNumeric(heightFtStr) || 0;
    const inch = parseNumeric(heightInStr) || 0;
    const lbs = parseNumeric(weightLbsStr) || 0;
    effectiveHeightCm = (ft * 12 + inch) * 2.54;
    effectiveWeightKg = lbs * 0.453592;
  }

  const result: BMIResult = calculateBMI(effectiveWeightKg, effectiveHeightCm);

  useEffect(() => {
    if (result.bmi > 0) {
      addHistoryItem({
        calculatorSlug: 'bmi',
        calculatorTitle: 'BMI Calculator',
        primaryResult: `${result.bmi} (${result.category})`,
        summary: `Height: ${Math.round(effectiveHeightCm)} cm, Weight: ${Math.round(effectiveWeightKg)} kg`,
      });
    }
  }, [result.bmi, result.category]);

  const getStatusBg = () => {
    switch (result.statusColor) {
      case 'emerald':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'amber':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'rose':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      default:
        return 'text-sky-700 bg-sky-50 border-sky-200';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">Body Measurements</h2>
          <div className="flex rounded-lg bg-slate-100 p-0.5 text-xs font-medium">
            <button
              onClick={() => setUnitMode('metric')}
              className={`rounded-md px-3 py-1 transition-colors ${
                unitMode === 'metric' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Metric (cm/kg)
            </button>
            <button
              onClick={() => setUnitMode('imperial')}
              className={`rounded-md px-3 py-1 transition-colors ${
                unitMode === 'imperial' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Imperial (ft/lbs)
            </button>
          </div>
        </div>

        {unitMode === 'metric' ? (
          <>
            <div className="space-y-1.5">
              <label htmlFor="bmi-height-cm" className="text-xs font-semibold text-slate-700">Height (cm)</label>
              <div className="relative">
                <input
                  id="bmi-height-cm"
                  type="number"
                  value={heightCmStr}
                  onChange={(e) => setHeightCmStr(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
                  placeholder="e.g. 175"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold">cm</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="bmi-weight-kg" className="text-xs font-semibold text-slate-700">Weight (kg)</label>
              <div className="relative">
                <input
                  id="bmi-weight-kg"
                  type="number"
                  value={weightKgStr}
                  onChange={(e) => setWeightKgStr(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
                  placeholder="e.g. 70"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold">kg</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="bmi-height-feet" className="text-xs font-semibold text-slate-700">Height (Feet)</label>
                <input
                  id="bmi-height-feet"
                  type="number"
                  value={heightFtStr}
                  onChange={(e) => setHeightFtStr(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
                  placeholder="5"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="bmi-height-inches" className="text-xs font-semibold text-slate-700">Height (Inches)</label>
                <input
                  id="bmi-height-inches"
                  type="number"
                  value={heightInStr}
                  onChange={(e) => setHeightInStr(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
                  placeholder="9"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="bmi-weight-lbs" className="text-xs font-semibold text-slate-700">Weight (lbs)</label>
              <div className="relative">
                <input
                  id="bmi-weight-lbs"
                  type="number"
                  value={weightLbsStr}
                  onChange={(e) => setWeightLbsStr(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
                  placeholder="e.g. 154"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold">lbs</span>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="lg:col-span-5 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-6 shadow-sm">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
            BMI Health Score
          </h3>

          <div className="space-y-5">
            <div>
              <span className="text-xs text-slate-500 font-medium">Your Body Mass Index</span>
              <div className="mt-1 text-4xl sm:text-5xl font-extrabold text-slate-900 tabular-nums">
                {result.bmi > 0 ? result.bmi : '—'}
              </div>
              {result.bmi > 0 && (
                <div className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getStatusBg()}`}>
                  {result.category}
                </div>
              )}
            </div>

            {result.bmi > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-100 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">WHO Healthy Range</span>
                  <span className="font-semibold text-emerald-600">18.5 – 24.9 BMI</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Healthy Weight</span>
                  <span className="font-semibold text-slate-900 tabular-nums">
                    {result.healthyWeightMinKg} kg – {result.healthyWeightMaxKg} kg
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
