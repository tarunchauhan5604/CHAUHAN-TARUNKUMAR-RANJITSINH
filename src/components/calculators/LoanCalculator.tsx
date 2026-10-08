import React, { useState } from 'react';
import { calculateDirectEMI, generateAmortization } from '../../engine/finance';
import { formatINR, parseNumeric } from '../../utils/formatters';

export const LoanCalculator: React.FC = () => {
  const [pStr, setPStr] = useState<string>('1500000');
  const [rateStr, setRateStr] = useState<string>('9.2');
  const [tenureYearsStr, setTenureYearsStr] = useState<string>('10');

  const p = parseNumeric(pStr) || 0;
  const rate = parseNumeric(rateStr) || 0;
  const years = parseNumeric(tenureYearsStr) || 0;
  const months = years * 12;

  const emi = calculateDirectEMI(p, rate, months);
  const totalPayment = emi * months;
  const totalInterest = Math.max(0, totalPayment - p);

  const schedule = p > 0 && months > 0 ? generateAmortization(p, rate, months, emi) : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
          General Loan Terms
        </h2>

        <div className="space-y-1.5">
          <label htmlFor="loan-total-amount" className="text-xs font-semibold text-slate-700">Total Borrowed Amount (₹)</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-semibold">₹</span>
            <input
              id="loan-total-amount"
              type="number"
              value={pStr}
              onChange={(e) => setPStr(e.target.value)}
              className="w-full rounded-xl border border-slate-200 pl-8 pr-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
              placeholder="e.g. 1500000"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="loan-interest-rate" className="text-xs font-semibold text-slate-700">Annual Interest Rate (%)</label>
          <div className="relative">
            <input
              id="loan-interest-rate"
              type="number"
              step="0.1"
              value={rateStr}
              onChange={(e) => setRateStr(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
              placeholder="e.g. 9.2"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold">%</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="loan-tenure-years" className="text-xs font-semibold text-slate-700">Loan Tenure (Years)</label>
          <div className="relative">
            <input
              id="loan-tenure-years"
              type="number"
              value={tenureYearsStr}
              onChange={(e) => setTenureYearsStr(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
              placeholder="e.g. 10"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold">Years</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-6 shadow-sm">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Repayment Obligations
          </h3>

          <div className="space-y-5">
            <div>
              <span className="text-xs text-slate-500 font-medium">Monthly Installment</span>
              <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-sky-600 tabular-nums">
                {formatINR(emi)}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Principal Amount</span>
                <span className="font-semibold text-slate-900 tabular-nums">{formatINR(p)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Cumulative Interest</span>
                <span className="font-bold text-amber-600 tabular-nums">{formatINR(totalInterest)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-dashed border-slate-200">
                <span className="text-slate-700 font-semibold">Total Repayment</span>
                <span className="font-bold text-slate-900 tabular-nums">{formatINR(totalPayment)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Amortization schedule mini table */}
        {schedule.length > 0 && (
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Initial 12-Month Repayment Preview
            </h4>
            <div className="max-h-48 overflow-y-auto">
              <table className="w-full text-left text-[11px] tabular-nums font-mono">
                <thead>
                  <tr className="border-b text-slate-400">
                    <th className="py-1">Mo</th>
                    <th className="py-1">Principal</th>
                    <th className="py-1">Interest</th>
                    <th className="py-1 text-right">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {schedule.slice(0, 12).map((s) => (
                    <tr key={s.month}>
                      <td className="py-1">{s.month}</td>
                      <td className="py-1">₹{Math.round(s.principal).toLocaleString()}</td>
                      <td className="py-1 text-amber-600">₹{Math.round(s.interest).toLocaleString()}</td>
                      <td className="py-1 text-right font-medium">₹{Math.round(s.balance).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
