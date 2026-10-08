import React, { useState } from 'react';
import {
  UnitDefinition,
  lengthUnits,
  weightUnits,
  temperatureUnits,
  areaUnits,
  volumeUnits,
  timeUnits,
  speedUnits,
  dataStorageUnits,
  convertUnits,
} from '../../engine/converters';
import { parseNumeric, formatNumber } from '../../utils/formatters';
import { ArrowLeftRight } from 'lucide-react';

interface UnitConverterCalculatorProps {
  type:
    | 'length-converter'
    | 'weight-converter'
    | 'temperature-converter'
    | 'area-converter'
    | 'volume-converter'
    | 'time-converter'
    | 'speed-converter'
    | 'data-storage-converter';
}

export const UnitConverterCalculator: React.FC<UnitConverterCalculatorProps> = ({ type }) => {
  const getUnitList = (): UnitDefinition[] => {
    switch (type) {
      case 'length-converter':
        return lengthUnits;
      case 'weight-converter':
        return weightUnits;
      case 'temperature-converter':
        return temperatureUnits;
      case 'area-converter':
        return areaUnits;
      case 'volume-converter':
        return volumeUnits;
      case 'time-converter':
        return timeUnits;
      case 'speed-converter':
        return speedUnits;
      case 'data-storage-converter':
        return dataStorageUnits;
    }
  };

  const units = getUnitList();
  const [valueStr, setValueStr] = useState<string>('1');
  const [fromId, setFromId] = useState<string>(units[0]?.id || '');
  const [toId, setToId] = useState<string>(units[1]?.id || units[0]?.id || '');

  const val = parseNumeric(valueStr) || 0;
  const result = convertUnits(val, fromId, toId, units);

  const handleSwap = () => {
    const temp = fromId;
    setFromId(toId);
    setToId(temp);
  };

  const fromUnit = units.find((u) => u.id === fromId);
  const toUnit = units.find((u) => u.id === toId);

  // Quick comparison matrix for current unit
  const commonComparisons = units
    .filter((u) => u.id !== fromId)
    .slice(0, 6)
    .map((target) => ({
      name: target.name,
      symbol: target.symbol,
      val: convertUnits(val, fromId, target.id, units),
    }));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Converter Inputs */}
        <div className="lg:col-span-7 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
            Conversion Values
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="unit-convert-input" className="text-xs font-semibold text-slate-700">Enter Value</label>
              <input
                id="unit-convert-input"
                type="number"
                value={valueStr}
                onChange={(e) => setValueStr(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm tabular-nums focus:border-sky-500 focus:outline-none"
                placeholder="1"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="unit-convert-from" className="text-xs font-semibold text-slate-700">From Unit</label>
              <select
                id="unit-convert-from"
                value={fromId}
                onChange={(e) => setFromId(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-sky-500 focus:outline-none"
              >
                {units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-2">
            <button
              type="button"
              onClick={handleSwap}
              className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200 transition-colors shadow-xs"
              title="Swap units"
            >
              <ArrowLeftRight className="h-3.5 w-3.5" />
              <span>Swap</span>
            </button>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="unit-convert-to" className="text-xs font-semibold text-slate-700">To Unit</label>
            <select
              id="unit-convert-to"
              value={toId}
              onChange={(e) => setToId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-sky-500 focus:outline-none"
            >
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Result Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-6 shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
              Conversion Result
            </h3>

            <div className="space-y-4">
              <div>
                <span className="text-xs text-slate-500 font-medium">Converted Value</span>
                <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-sky-600 tabular-nums break-words">
                  {formatNumber(result, 6)}
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-700">
                  {toUnit?.name} ({toUnit?.symbol})
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
                1 {fromUnit?.symbol} ={' '}
                <span className="font-semibold text-slate-900 tabular-nums">
                  {formatNumber(convertUnits(1, fromId, toId, units), 6)} {toUnit?.symbol}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Equivalents Table */}
          {commonComparisons.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                Other Unit Equivalents for {val} {fromUnit?.symbol}
              </h4>
              <div className="divide-y divide-slate-100 text-xs">
                {commonComparisons.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-2">
                    <span className="text-slate-600">{item.name}</span>
                    <span className="font-semibold text-slate-900 tabular-nums">
                      {formatNumber(item.val, 4)} {item.symbol}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
