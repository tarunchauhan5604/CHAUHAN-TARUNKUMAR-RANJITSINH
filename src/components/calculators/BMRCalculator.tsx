import React, { useState } from 'react';
import { calculateBMR } from '../../engine/health';
import { parseNumeric } from '../../utils/formatters';

export const BMRCalculator: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [ageStr, setAgeStr] = useState<string>('28');
  const [heightStr, setHeightStr] = useState<string>('175');
  const [weightStr, setWeightStr] = useState<string>('72');

  const age = parseNumeric(ageStr) || 0;
  const height = parseNumeric(heightStr) || 0;
  const weight = parseNumeric(weightStr) || 0;

  const bmr = calculateBMR(weight, height, age, gender);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
          Personal Stats
        </h2>

        {/* Gender selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Biological Sex</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setGender('male')}
              className={`rounded-xl py-2.5 text-sm font-semibold border transition-all ${
                gender === 'male'
                  ? 'border-sky-500 bg-sky-50 text-sky-700 ring-2 ring-sky-200'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              Male
            </button>
            <button
              type="button"
              onClick={() => setGender('female')}
              className={`rounded-xl py-2.5 text-sm font-semibold border transition-all ${
                gender === 'female'
                  ? 'border-sky-500 bg-sky-50 text-sky-700 ring-2 ring-sky-200'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              Female
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="bmr-age-years" className="text-xs font-semibold text-slate-700">Age (Years)</label>
            <input
              id="bmr-age-years"
              type="number"
              value={ageStr}
              onChange={(e) => setAgeStr(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
              placeholder="e.g. 28"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="bmr-height-cm" className="text-xs font-semibold text-slate-700">Height (cm)</label>
            <input
              id="bmr-height-cm"
              type="number"
              value={heightStr}
              onChange={(e) => setHeightStr(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
              placeholder="e.g. 175"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="bmr-weight-kg" className="text-xs font-semibold text-slate-700">Weight (kg)</label>
            <input
              id="bmr-weight-kg"
              type="number"
              value={weightStr}
              onChange={(e) => setWeightStr(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
              placeholder="e.g. 72"
            />
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-6 shadow-sm">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Basal Metabolic Rate
          </h3>

          <div className="space-y-5">
            <div>
              <span className="text-xs text-slate-500 font-medium">Daily Basal Energy Burn</span>
              <div className="mt-1 text-4xl sm:text-5xl font-extrabold text-sky-600 tabular-nums">
                {bmr > 0 ? `${bmr.toLocaleString()}` : '—'}
                <span className="text-sm font-normal text-slate-500 ml-1.5">kcal / day</span>
              </div>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                This is the baseline energy expenditure your body burns strictly at complete rest to keep lungs, brain, heart, and liver functioning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
