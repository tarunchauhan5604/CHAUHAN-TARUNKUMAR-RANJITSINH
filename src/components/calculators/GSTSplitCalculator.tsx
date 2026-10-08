import React, { useState } from 'react';
import { calculateGSTSplit } from '../../engine/utility';
import { formatINR, parseNumeric } from '../../utils/formatters';

export const GSTSplitCalculator: React.FC = () => {
  const [amountStr, setAmountStr] = useState<string>('50000');
  const [rate, setRate] = useState<number>(18);
  const [taxMode, setTaxMode] = useState<'exclusive' | 'inclusive'>('exclusive');
  const [supplyType, setSupplyType] = useState<'intra' | 'inter'>('intra');

  const amount = parseNumeric(amountStr) || 0;
  const result = calculateGSTSplit(amount, rate, taxMode, supplyType);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
          Tax Invoice Specifications
        </h2>

        <div className="space-y-1.5">
          <label htmlFor="gst-split-amount" className="text-xs font-semibold text-slate-700">Invoice Amount (₹)</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-semibold">₹</span>
            <input
              id="gst-split-amount"
              type="number"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
              className="w-full rounded-xl border border-slate-200 pl-8 pr-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
              placeholder="e.g. 50000"
            />
          </div>
        </div>

        {/* Exclusive vs Inclusive mode */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Tax Application</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setTaxMode('exclusive')}
              className={`rounded-xl py-2.5 text-xs font-semibold border transition-all ${
                taxMode === 'exclusive'
                  ? 'border-sky-500 bg-sky-50 text-sky-700 ring-2 ring-sky-200'
                  : 'border-slate-200 bg-white text-slate-600'
              }`}
            >
              GST Exclusive (Tax Added On Top)
            </button>
            <button
              type="button"
              onClick={() => setTaxMode('inclusive')}
              className={`rounded-xl py-2.5 text-xs font-semibold border transition-all ${
                taxMode === 'inclusive'
                  ? 'border-sky-500 bg-sky-50 text-sky-700 ring-2 ring-sky-200'
                  : 'border-slate-200 bg-white text-slate-600'
              }`}
            >
              GST Inclusive (Already in Price)
            </button>
          </div>
        </div>

        {/* GST Slab */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">GST Rate Slab</label>
          <div className="flex flex-wrap gap-2">
            {[5, 12, 18, 28].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setRate(s)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  rate === s
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {s}% Slab
              </button>
            ))}
          </div>
        </div>

        {/* Intra-State vs Inter-State */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Transaction Jurisdiction</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSupplyType('intra')}
              className={`rounded-xl py-2 text-xs font-semibold border transition-all ${
                supplyType === 'intra'
                  ? 'border-sky-500 bg-sky-50 text-sky-700 ring-2 ring-sky-200'
                  : 'border-slate-200 bg-white text-slate-600'
              }`}
            >
              Intra-State (CGST 50% + SGST 50%)
            </button>
            <button
              type="button"
              onClick={() => setSupplyType('inter')}
              className={`rounded-xl py-2 text-xs font-semibold border transition-all ${
                supplyType === 'inter'
                  ? 'border-sky-500 bg-sky-50 text-sky-700 ring-2 ring-sky-200'
                  : 'border-slate-200 bg-white text-slate-600'
              }`}
            >
              Inter-State (IGST 100%)
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-6 shadow-sm">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Invoice Tax Component Breakdown
          </h3>

          <div className="space-y-5">
            <div>
              <span className="text-xs text-slate-500 font-medium">Total Billed Gross Value</span>
              <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-sky-600 tabular-nums">
                {formatINR(result.totalInvoice, true)}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Base Net Value</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  {formatINR(result.baseAmount, true)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Tax ({result.gstRate}%)</span>
                <span className="font-bold text-amber-600 tabular-nums">
                  {formatINR(result.totalTax, true)}
                </span>
              </div>

              {supplyType === 'intra' ? (
                <>
                  <div className="flex justify-between text-xs text-slate-600 pt-2 border-t border-dashed border-slate-200">
                    <span>Central GST (CGST {result.gstRate / 2}%)</span>
                    <span className="font-mono tabular-nums">{formatINR(result.cgst, true)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>State GST (SGST {result.gstRate / 2}%)</span>
                    <span className="font-mono tabular-nums">{formatINR(result.sgst, true)}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between text-xs text-slate-600 pt-2 border-t border-dashed border-slate-200">
                  <span>Integrated GST (IGST {result.gstRate}%)</span>
                  <span className="font-mono tabular-nums">{formatINR(result.igst, true)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
