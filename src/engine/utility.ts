/**
 * Pure Mathematical Engine for Utility Calculators
 */

export interface FuelCostResult {
  fuelRequired: number; // liters or gallons
  totalCost: number;
  costPerUnitDistance: number;
}

export function calculateFuelCost(
  distance: number,
  mileage: number, // km per liter or miles per gallon
  fuelPrice: number // price per unit volume
): FuelCostResult | null {
  if (distance <= 0 || mileage <= 0 || fuelPrice <= 0) return null;

  const fuelRequired = distance / mileage;
  const totalCost = fuelRequired * fuelPrice;
  const costPerUnitDistance = totalCost / distance;

  return {
    fuelRequired: Math.round(fuelRequired * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    costPerUnitDistance: Math.round(costPerUnitDistance * 100) / 100,
  };
}

export interface AgeDifferenceResult {
  olderPerson: 1 | 2 | 'same';
  years: number;
  months: number;
  days: number;
  totalDays: number;
}

export function calculateAgeDifference(p1DateStr: string, p2DateStr: string): AgeDifferenceResult | null {
  if (!p1DateStr || !p2DateStr) return null;
  const d1 = new Date(p1DateStr);
  const d2 = new Date(p2DateStr);

  if (isNaN(d1.getTime()) || !isNaN(d2.getTime()) === false) return null;

  if (d1.getTime() === d2.getTime()) {
    return {
      olderPerson: 'same',
      years: 0,
      months: 0,
      days: 0,
      totalDays: 0,
    };
  }

  const [older, younger, olderIndex] = d1 < d2 ? [d1, d2, 1 as const] : [d2, d1, 2 as const];

  let years = younger.getFullYear() - older.getFullYear();
  let months = younger.getMonth() - older.getMonth();
  let days = younger.getDate() - older.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonthDays = new Date(younger.getFullYear(), younger.getMonth(), 0).getDate();
    days += prevMonthDays;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.floor((younger.getTime() - older.getTime()) / (1000 * 60 * 60 * 24));

  return {
    olderPerson: olderIndex,
    years,
    months,
    days,
    totalDays,
  };
}

export interface TimeDurationResult {
  hours: number;
  minutes: number;
  seconds: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
}

export function calculateTimeDuration(startTime: string, endTime: string, crossMidnight: boolean = false): TimeDurationResult | null {
  if (!startTime || !endTime) return null;
  const [h1, m1, s1 = 0] = startTime.split(':').map(Number);
  const [h2, m2, s2 = 0] = endTime.split(':').map(Number);

  if (isNaN(h1) || isNaN(m1) || isNaN(h2) || isNaN(m2)) return null;

  let startSecs = h1 * 3600 + m1 * 60 + s1;
  let endSecs = h2 * 3600 + m2 * 60 + s2;

  if (endSecs < startSecs) {
    if (crossMidnight) {
      endSecs += 24 * 3600;
    } else {
      // Swap or treat as next day
      endSecs += 24 * 3600;
    }
  }

  const diffSecs = endSecs - startSecs;
  const hours = Math.floor(diffSecs / 3600);
  const minutes = Math.floor((diffSecs % 3600) / 60);
  const seconds = diffSecs % 60;

  return {
    hours,
    minutes,
    seconds,
    totalHours: Math.round((diffSecs / 3600) * 100) / 100,
    totalMinutes: Math.round((diffSecs / 60) * 100) / 100,
    totalSeconds: diffSecs,
  };
}

export interface GSTSplitResult {
  baseAmount: number;
  gstRate: number;
  totalTax: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalInvoice: number;
}

export function calculateGSTSplit(
  amount: number,
  gstRate: number,
  type: 'inclusive' | 'exclusive',
  taxType: 'intra' | 'inter' // intra = CGST+SGST (50/50), inter = IGST (100%)
): GSTSplitResult {
  let baseAmount = 0;
  let totalTax = 0;
  let totalInvoice = 0;

  if (type === 'exclusive') {
    baseAmount = amount;
    totalTax = amount * (gstRate / 100);
    totalInvoice = baseAmount + totalTax;
  } else {
    // Inclusive
    baseAmount = amount / (1 + gstRate / 100);
    totalTax = amount - baseAmount;
    totalInvoice = amount;
  }

  let cgst = 0;
  let sgst = 0;
  let igst = 0;

  if (taxType === 'intra') {
    cgst = totalTax / 2;
    sgst = totalTax / 2;
  } else {
    igst = totalTax;
  }

  return {
    baseAmount: Math.round(baseAmount * 100) / 100,
    gstRate,
    totalTax: Math.round(totalTax * 100) / 100,
    cgst: Math.round(cgst * 100) / 100,
    sgst: Math.round(sgst * 100) / 100,
    igst: Math.round(igst * 100) / 100,
    totalInvoice: Math.round(totalInvoice * 100) / 100,
  };
}
