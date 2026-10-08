import React, { useState } from 'react';
import { calculateBMR, calculateCalories } from '../../engine/health';
import { parseNumeric } from '../../utils/formatters';

export const CalorieCalculator: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [ageStr, setAgeStr] = useState<string>('30');
  const [heightStr, setHeightStr] = useState<string>('178');
  const [weightStr, setWeightStr] = useState<string>('75');
  const [activity, setActivity] = useState<number>(1.55); // Moderate

  const age = parseNumeric(ageStr) || 0;
  const height = parseNumeric(heightStr) || 0;
  const weight = parseNumeric(weightStr) || 0;

  const bmr = calculateBMR(weight, height, age, gender);
  const targets = calculateCalories(bmr, activity);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
          Activity & Profile
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setGender('male')}
            className={`rounded-xl py-2 text-sm font-semibold border transition-all ${
              gender === 'male'
                ? 'border-sky-500 bg-sky-50 text-sky-700 ring-2 ring-sky-200'
                : 'border-slate-200 bg-white text-slate-600'
            }`}
          >
            Male
          </button>
          <button
            type="button"
            onClick={() => setGender('female')}
            className={`rounded-xl py-2 text-sm font-semibold border transition-all ${
              gender === 'female'
                ? 'border-sky-500 bg-sky-50 text-sky-700 ring-2 ring-sky-200'
                : 'border-slate-200 bg-white text-slate-600'
            }`}
          >
            Female
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label htmlFor="cal-age-years" className="text-xs font-semibold text-slate-700">Age</label>
            <input
              id="cal-age-years"
              type="number"
              value={ageStr}
              onChange={(e) => setAgeStr(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="cal-height-cm" className="text-xs font-semibold text-slate-700">Height (cm)</label>
            <input
              id="cal-height-cm"
              type="number"
              value={heightStr}
              onChange={(e) => setHeightStr(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="cal-weight-kg" className="text-xs font-semibold text-slate-700">Weight (kg)</label>
            <input
              id="cal-weight-kg"
              type="number"
              value={weightStr}
              onChange={(e) => setWeightStr(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="cal-activity-level" className="text-xs font-semibold text-slate-700">Daily Exercise / Activity Level</label>
          <select
            id="cal-activity-level"
            value={activity}
            onChange={(e) => setActivity(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-sky-500 focus:outline-none"
          >
            <option value={1.2}>Sedentary (Desk job, little to no exercise)</option>
            <option value={1.375}>Lightly Active (Light exercise 1-3 days/week)</option>
            <option value={1.55}>Moderately Active (Moderate exercise 3-5 days/week)</option>
            <option value={1.725}>Very Active (Hard training 6-7 days/week)</option>
            <option value={1.9}>Extra Active (Intense physical job or twice-daily workouts)</option>
          </select>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-6 shadow-sm">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Daily Caloric Needs (TDEE)
          </h3>

          <div className="space-y-4">
            <div>
              <span className="text-xs text-slate-500 font-medium">Maintenance Calories</span>
              <div className="mt-0.5 text-3xl font-extrabold text-sky-600 tabular-nums">
                {targets.maintenance.toLocaleString()}{' '}
                <span className="text-xs font-normal text-slate-500">kcal / day</span>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 text-emerald-900">
                <span>Healthy Fat Loss (-500 kcal)</span>
                <span className="font-bold tabular-nums">{targets.weightLoss.toLocaleString()} kcal</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-sky-50 text-sky-900">
                <span>Mild Fat Loss (-250 kcal)</span>
                <span className="font-bold tabular-nums">{targets.mildLoss.toLocaleString()} kcal</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-indigo-50 text-indigo-900">
                <span>Lean Muscle Gain (+250 kcal)</span>
                <span className="font-bold tabular-nums">{targets.mildGain.toLocaleString()} kcal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
