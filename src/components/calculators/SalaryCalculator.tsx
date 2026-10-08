import React, { useState } from 'react';
import { calculateSalary } from '../../engine/finance';
import { formatINR, parseNumeric } from '../../utils/formatters';

export const SalaryCalculator: React.FC = () => {
  const [grossStr, setGrossStr] = useState<string>('85000');
  const gross = parseNumeric(grossStr) || 0;

  const {
    basic,
    hra,
    specialAllowance,
    epf,
    professionalTax,
    monthlyTds,
    totalDeductions,
    netSalary,
  } = calculateSalary(gross);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
          Salary Inputs
        </h2>

        <div className="space-y-1.5">
          <label htmlFor="salary-gross-monthly" className="text-xs font-semibold text-slate-700">Gross Monthly Salary / CTC Component (₹)</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-semibold">₹</span>
            <input
              id="salary-gross-monthly"
              type="number"
              value={grossStr}
              onChange={(e) => setGrossStr(e.target.value)}
              className="w-full rounded-xl border border-slate-200 pl-8 pr-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
              placeholder="e.g. 85000"
            />
          </div>
          <div className="flex gap-2 text-[11px] text-slate-400 pt-1">
            <button type="button" onClick={() => setGrossStr('35000')} className="hover:text-sky-600 underline">
              ₹35,000
            </button>
            <button type="button" onClick={() => setGrossStr('60000')} className="hover:text-sky-600 underline">
              ₹60,000
            </button>
            <button type="button" onClick={() => setGrossStr('85000')} className="hover:text-sky-600 underline">
              ₹85,000
            </button>
            <button type="button" onClick={() => setGrossStr('150000')} className="hover:text-sky-600 underline">
              ₹1,50,000
            </button>
          </div>
        </div>

        {/* Breakdown table */}
        <div className="pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Estimated Earnings Breakdown
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 px-3 rounded-lg bg-slate-50">
              <span className="text-slate-600">Basic Salary (50%)</span>
              <span className="font-semibold text-slate-900 tabular-nums">{formatINR(basic)}</span>
            </div>
            <div className="flex justify-between py-1.5 px-3 rounded-lg bg-slate-50">
              <span className="text-slate-600">House Rent Allowance (HRA 40% of Basic)</span>
              <span className="font-semibold text-slate-900 tabular-nums">{formatINR(hra)}</span>
            </div>
            <div className="flex justify-between py-1.5 px-3 rounded-lg bg-slate-50">
              <span className="text-slate-600">Special Allowances</span>
              <span className="font-semibold text-slate-900 tabular-nums">{formatINR(specialAllowance)}</span>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-2">
            Monthly Statutory Deductions
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 px-3 rounded-lg bg-rose-50/50">
              <span className="text-slate-600">Employee Provident Fund (EPF)</span>
              <span className="font-semibold text-rose-700 tabular-nums">-{formatINR(epf)}</span>
            </div>
            <div className="flex justify-between py-1.5 px-3 rounded-lg bg-rose-50/50">
              <span className="text-slate-600">Professional Tax (PT)</span>
              <span className="font-semibold text-rose-700 tabular-nums">-{formatINR(professionalTax)}</span>
            </div>
            <div className="flex justify-between py-1.5 px-3 rounded-lg bg-rose-50/50">
              <span className="text-slate-600">Income Tax (TDS Estimate)</span>
              <span className="font-semibold text-rose-700 tabular-nums">-{formatINR(monthlyTds)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-6 shadow-sm">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
            In-Hand Take Home Pay
          </h3>

          <div className="space-y-5">
            <div>
              <span className="text-xs text-slate-500 font-medium">Net Monthly In-Hand Salary</span>
              <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-emerald-600 tabular-nums">
                {formatINR(netSalary)}
              </div>
              <p className="mt-1 text-xs text-slate-500">Credited directly to your bank account</p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Annual Gross CTC</span>
                <span className="font-semibold text-slate-900 tabular-nums">{formatINR(gross * 12)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Annual Take Home</span>
                <span className="font-bold text-slate-900 tabular-nums">{formatINR(netSalary * 12)}</span>
              </div>
              <div className="flex justify-between text-rose-600">
                <span>Total Monthly Deductions</span>
                <span className="font-semibold tabular-nums">-{formatINR(totalDeductions)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
