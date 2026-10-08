import React, { useState } from 'react';
import { calculateFuelCost } from '../../engine/utility';
import { formatINR, parseNumeric } from '../../utils/formatters';

export const FuelCostCalculator: React.FC = () => {
  const [distanceStr, setDistanceStr] = useState<string>('350');
  const [mileageStr, setMileageStr] = useState<string>('18');
  const [fuelPriceStr, setFuelPriceStr] = useState<string>('96.72');

  const distance = parseNumeric(distanceStr) || 0;
  const mileage = parseNumeric(mileageStr) || 0;
  const fuelPrice = parseNumeric(fuelPriceStr) || 0;

  const result = calculateFuelCost(distance, mileage, fuelPrice);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
          Trip Parameters
        </h2>

        <div className="space-y-1.5">
          <label htmlFor="fuel-travel-distance" className="text-xs font-semibold text-slate-700">Trip Distance (Kilometers)</label>
          <div className="relative">
            <input
              id="fuel-travel-distance"
              type="number"
              value={distanceStr}
              onChange={(e) => setDistanceStr(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
              placeholder="e.g. 350"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold">km</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="fuel-vehicle-mileage" className="text-xs font-semibold text-slate-700">Vehicle Mileage / Fuel Efficiency (km / liter)</label>
          <div className="relative">
            <input
              id="fuel-vehicle-mileage"
              type="number"
              step="0.5"
              value={mileageStr}
              onChange={(e) => setMileageStr(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
              placeholder="e.g. 18"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold">km/L</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="fuel-unit-price" className="text-xs font-semibold text-slate-700">Fuel Price per Liter (₹)</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-semibold">₹</span>
            <input
              id="fuel-unit-price"
              type="number"
              step="0.1"
              value={fuelPriceStr}
              onChange={(e) => setFuelPriceStr(e.target.value)}
              className="w-full rounded-xl border border-slate-200 pl-8 pr-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
              placeholder="e.g. 96.72"
            />
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-6 shadow-sm">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Estimated Journey Expense
          </h3>

          {result ? (
            <div className="space-y-5">
              <div>
                <span className="text-xs text-slate-500 font-medium">Total Trip Fuel Cost</span>
                <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-sky-600 tabular-nums">
                  {formatINR(result.totalCost, true)}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Fuel Required</span>
                  <span className="font-semibold text-slate-900 tabular-nums">
                    {result.fuelRequired.toFixed(2)} Liters
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Running Cost</span>
                  <span className="font-semibold text-emerald-600 tabular-nums">
                    ₹{result.costPerUnitDistance.toFixed(2)} per km
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-sm text-slate-500">
              Please enter valid trip distance, mileage, and fuel price.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
