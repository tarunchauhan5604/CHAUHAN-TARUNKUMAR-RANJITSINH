import React, { useState, useEffect } from 'react';
import { solveSmartEMI, generateAmortization, EMISmartResult } from '../../engine/finance';
import { formatINR, formatNumber, parseNumeric } from '../../utils/formatters';
import { addHistoryItem } from '../../services/storage';
import { AlertCircle, CheckCircle2, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

export const EMICalculator: React.FC = () => {
  // Inputs as strings so user can clear any field
  const [amountStr, setAmountStr] = useState<string>('2500000');
  const [rateStr, setRateStr] = useState<string>('8.5');
  const [tenureYearsStr, setTenureYearsStr] = useState<string>('20');
  const [emiStr, setEmiStr] = useState<string>('');
  const [showAmortization, setShowAmortization] = useState(false);

  // Parsed values
  const p = parseNumeric(amountStr);
  const r = parseNumeric(rateStr);
  const tenureYears = parseNumeric(tenureYearsStr);
  const n = tenureYears !== null ? tenureYears * 12 : null;
  const emi = parseNumeric(emiStr);

  // Compute smart 3-of-4 result
  const result: EMISmartResult | null = solveSmartEMI(p, r, n, emi);

  // Record history on valid calculation
  useEffect(() => {
    if (result && result.calculatedField) {
      const summary = `P: ${formatINR(result.p)}, Rate: ${result.r}%, Tenure: ${(result.n / 12).toFixed(1)} yrs`;
      addHistoryItem({
        calculatorSlug: 'emi',
        calculatorTitle: 'EMI Calculator',
        primaryResult: `${formatINR(result.emi)} / mo`,
        summary,
      });
    }
  }, [result?.calculatedField, result?.emi, result?.p]);

  const activeInputsCount = [p, r, n, emi].filter((v) => v !== null && v > 0).length;

  const handleReset = () => {
    setAmountStr('2500000');
    setRateStr('8.5');
    setTenureYearsStr('20');
    setEmiStr('');
  };

  const schedule =
    result && result.emi > 0 && result.p > 0
      ? generateAmortization(result.p, result.r, result.n, result.emi)
      : [];

  const principalRatio =
    result && result.totalPayment > 0
      ? Math.round((result.p / result.totalPayment) * 100)
      : 50;
  const interestRatio = 100 - principalRatio;

  return (
    <div className="space-y-8">
      {/* Smart Helper Banner */}
      <div className="rounded-xl border border-sky-100 bg-sky-50/70 p-4 text-xs sm:text-sm text-sky-800 flex items-start gap-3">
        <Sparkles className="h-5 w-5 text-sky-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Smart Interdependent Solver:</span> Enter any 3 of the 4
          values below. The missing 4th field is automatically solved in real-time. If you fill all 4,
          mathematical consistency will be audited.
        </div>
      </div>

      {result?.warning && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs sm:text-sm text-amber-800 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>{result.warning}</div>
        </div>
      )}

      {result?.isConsistent && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs sm:text-sm text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>All 4 values are mathematically verified & consistent!</span>
        </div>
      )}

      {/* Main Grid: Inputs vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              Loan Parameters (Enter Any 3)
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              {activeInputsCount}/4 Filled
            </span>
          </div>

          {/* 1. Loan Amount P */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="emi-loan-amount" className="text-xs font-semibold text-slate-700">1. Loan Amount (₹)</label>
              {result?.calculatedField === 'p' && (
                <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                  Auto-Calculated
                </span>
              )}
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-semibold">
                ₹
              </span>
              <input
                id="emi-loan-amount"
                type="number"
                placeholder="e.g. 2500000"
                value={result?.calculatedField === 'p' ? Math.round(result.p) : amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
                readOnly={result?.calculatedField === 'p'}
                className={`w-full rounded-xl border pl-8 pr-4 py-2.5 text-sm tabular-nums transition-all focus:outline-none ${
                  result?.calculatedField === 'p'
                    ? 'border-sky-400 bg-sky-50/50 font-bold text-sky-900 ring-2 ring-sky-200'
                    : 'border-slate-200 bg-slate-50/40 text-slate-900 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100'
                }`}
              />
            </div>
            <div className="flex gap-2 text-[11px] text-slate-400">
              <button
                type="button"
                onClick={() => setAmountStr('1000000')}
                className="hover:text-sky-600 underline"
              >
                10L
              </button>
              <button
                type="button"
                onClick={() => setAmountStr('2500000')}
                className="hover:text-sky-600 underline"
              >
                25L
              </button>
              <button
                type="button"
                onClick={() => setAmountStr('5000000')}
                className="hover:text-sky-600 underline"
              >
                50L
              </button>
              <button
                type="button"
                onClick={() => setAmountStr('')}
                className="ml-auto text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            </div>
          </div>

          {/* 2. Interest Rate R */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="emi-interest-rate" className="text-xs font-semibold text-slate-700">
                2. Annual Interest Rate (% p.a.)
              </label>
              {result?.calculatedField === 'r' && (
                <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                  Auto-Calculated
                </span>
              )}
            </div>
            <div className="relative">
              <input
                id="emi-interest-rate"
                type="number"
                step="0.05"
                placeholder="e.g. 8.5"
                value={result?.calculatedField === 'r' ? result.r : rateStr}
                onChange={(e) => setRateStr(e.target.value)}
                readOnly={result?.calculatedField === 'r'}
                className={`w-full rounded-xl border px-4 py-2.5 text-sm tabular-nums transition-all focus:outline-none ${
                  result?.calculatedField === 'r'
                    ? 'border-sky-400 bg-sky-50/50 font-bold text-sky-900 ring-2 ring-sky-200'
                    : 'border-slate-200 bg-slate-50/40 text-slate-900 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100'
                }`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold">
                %
              </span>
            </div>
            <div className="flex gap-2 text-[11px] text-slate-400">
              <button
                type="button"
                onClick={() => setRateStr('7.5')}
                className="hover:text-sky-600 underline"
              >
                7.5%
              </button>
              <button
                type="button"
                onClick={() => setRateStr('8.5')}
                className="hover:text-sky-600 underline"
              >
                8.5%
              </button>
              <button
                type="button"
                onClick={() => setRateStr('9.5')}
                className="hover:text-sky-600 underline"
              >
                9.5%
              </button>
              <button
                type="button"
                onClick={() => setRateStr('')}
                className="ml-auto text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            </div>
          </div>

          {/* 3. Loan Tenure N */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="emi-loan-tenure" className="text-xs font-semibold text-slate-700">3. Loan Tenure (Years)</label>
              {result?.calculatedField === 'n' && (
                <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                  Auto-Calculated ({result.n} Mos)
                </span>
              )}
            </div>
            <div className="relative">
              <input
                id="emi-loan-tenure"
                type="number"
                step="0.5"
                placeholder="e.g. 20"
                value={
                  result?.calculatedField === 'n'
                    ? (result.n / 12).toFixed(1)
                    : tenureYearsStr
                }
                onChange={(e) => setTenureYearsStr(e.target.value)}
                readOnly={result?.calculatedField === 'n'}
                className={`w-full rounded-xl border px-4 py-2.5 text-sm tabular-nums transition-all focus:outline-none ${
                  result?.calculatedField === 'n'
                    ? 'border-sky-400 bg-sky-50/50 font-bold text-sky-900 ring-2 ring-sky-200'
                    : 'border-slate-200 bg-slate-50/40 text-slate-900 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100'
                }`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold">
                Years
              </span>
            </div>
            <div className="flex gap-2 text-[11px] text-slate-400">
              <button
                type="button"
                onClick={() => setTenureYearsStr('5')}
                className="hover:text-sky-600 underline"
              >
                5 Yrs
              </button>
              <button
                type="button"
                onClick={() => setTenureYearsStr('15')}
                className="hover:text-sky-600 underline"
              >
                15 Yrs
              </button>
              <button
                type="button"
                onClick={() => setTenureYearsStr('20')}
                className="hover:text-sky-600 underline"
              >
                20 Yrs
              </button>
              <button
                type="button"
                onClick={() => setTenureYearsStr('')}
                className="ml-auto text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            </div>
          </div>

          {/* 4. EMI */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="emi-monthly-installment" className="text-xs font-semibold text-slate-700">4. Monthly EMI (₹)</label>
              {result?.calculatedField === 'emi' && (
                <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                  Auto-Calculated
                </span>
              )}
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-semibold">
                ₹
              </span>
              <input
                id="emi-monthly-installment"
                type="number"
                placeholder="Leave blank or enter to solve others"
                value={result?.calculatedField === 'emi' ? Math.round(result.emi) : emiStr}
                onChange={(e) => setEmiStr(e.target.value)}
                readOnly={result?.calculatedField === 'emi'}
                className={`w-full rounded-xl border pl-8 pr-4 py-2.5 text-sm tabular-nums transition-all focus:outline-none ${
                  result?.calculatedField === 'emi'
                    ? 'border-sky-400 bg-sky-50/50 font-bold text-sky-900 ring-2 ring-sky-200'
                    : 'border-slate-200 bg-slate-50/40 text-slate-900 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100'
                }`}
              />
            </div>
            <div className="flex justify-end text-[11px] text-slate-400">
              <button
                type="button"
                onClick={() => setEmiStr('')}
                className="text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Right Result Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-6 shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
              Calculation Breakdown
            </h3>

            {result ? (
              <div className="space-y-6">
                <div>
                  <span className="text-xs text-slate-500 font-medium">Monthly Installment (EMI)</span>
                  <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-sky-600 tabular-nums">
                    {formatINR(result.emi)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div>
                    <span className="text-xs text-slate-500">Principal Amount</span>
                    <p className="mt-1 text-base font-bold text-slate-800 tabular-nums">
                      {formatINR(result.p)}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500">Total Interest Due</span>
                    <p className="mt-1 text-base font-bold text-amber-600 tabular-nums">
                      {formatINR(result.totalInterest)}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                    <span>Total Payment (P + I)</span>
                    <span className="font-bold text-slate-900">{formatINR(result.totalPayment)}</span>
                  </div>
                  {/* Visual Proportion Bar */}
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 flex">
                    <div
                      style={{ width: `${principalRatio}%` }}
                      className="bg-sky-500 transition-all duration-300"
                      title={`Principal: ${principalRatio}%`}
                    />
                    <div
                      style={{ width: `${interestRatio}%` }}
                      className="bg-amber-400 transition-all duration-300"
                      title={`Interest: ${interestRatio}%`}
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-sky-500"></span> Principal ({principalRatio}%)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-amber-400"></span> Interest ({interestRatio}%)
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-sm text-slate-500">
                Please enter any 3 values to calculate the remaining value.
              </div>
            )}
          </div>

          {/* Amortization Schedule Preview Button */}
          {schedule.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <button
                onClick={() => setShowAmortization(!showAmortization)}
                className="flex w-full items-center justify-between text-xs font-semibold text-slate-800 hover:text-sky-600"
              >
                <span>View Monthly Amortization Schedule ({schedule.length} months)</span>
                {showAmortization ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              {showAmortization && (
                <div className="mt-4 max-h-60 overflow-y-auto text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-slate-50 text-[10px] text-slate-500 uppercase border-b border-slate-200">
                      <tr>
                        <th className="py-1.5 px-2">Month</th>
                        <th className="py-1.5 px-2">Principal</th>
                        <th className="py-1.5 px-2">Interest</th>
                        <th className="py-1.5 px-2 text-right">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono text-[11px] tabular-nums">
                      {schedule.map((row) => (
                        <tr key={row.month} className="hover:bg-slate-50">
                          <td className="py-1.5 px-2 text-slate-500">{row.month}</td>
                          <td className="py-1.5 px-2 text-slate-800">₹{Math.round(row.principal).toLocaleString()}</td>
                          <td className="py-1.5 px-2 text-amber-600">₹{Math.round(row.interest).toLocaleString()}</td>
                          <td className="py-1.5 px-2 text-right text-slate-900 font-semibold">
                            ₹{Math.round(row.balance).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
