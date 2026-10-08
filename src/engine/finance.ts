/**
 * Pure Mathematical Engine for Finance Calculators
 */

export interface EMISmartResult {
  p: number;
  r: number; // annual rate %
  n: number; // months
  emi: number;
  totalInterest: number;
  totalPayment: number;
  calculatedField: 'p' | 'r' | 'n' | 'emi' | null;
  isConsistent?: boolean;
  warning?: string;
}

export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

/**
 * Standard Reducing Balance EMI calculation
 * EMI = P * r * (1+r)^n / ((1+r)^n - 1)
 */
export function calculateDirectEMI(p: number, annualRate: number, months: number): number {
  if (p <= 0 || months <= 0) return 0;
  if (annualRate <= 0) return p / months;

  const r = annualRate / 12 / 100;
  const rn = Math.pow(1 + r, months);
  return (p * r * rn) / (rn - 1);
}

/**
 * Smart 3-of-4 EMI Solver
 */
export function solveSmartEMI(
  inputP: number | null,
  inputR: number | null, // Annual %
  inputN: number | null, // Months
  inputEMI: number | null
): EMISmartResult | null {
  const presentCount = [inputP, inputR, inputN, inputEMI].filter(
    (v) => v !== null && v > 0
  ).length;

  if (presentCount < 3) return null;

  // Case 1: All 4 provided -> Validate consistency
  if (inputP && inputR && inputN && inputEMI) {
    const expectedEMI = calculateDirectEMI(inputP, inputR, inputN);
    const diff = Math.abs(expectedEMI - inputEMI);
    const relativeDiff = diff / expectedEMI;
    const isConsistent = relativeDiff <= 0.015; // 1.5% tolerance

    const totalPayment = inputEMI * inputN;
    const totalInterest = Math.max(0, totalPayment - inputP);

    return {
      p: inputP,
      r: inputR,
      n: inputN,
      emi: inputEMI,
      totalInterest,
      totalPayment,
      calculatedField: null,
      isConsistent,
      warning: isConsistent
        ? undefined
        : `Values are mathematically inconsistent. With ₹${inputP.toLocaleString()} at ${inputR}% for ${inputN} months, EMI should be approximately ₹${Math.round(
            expectedEMI
          ).toLocaleString()}.`,
    };
  }

  // Case 2: P, R, N known -> Calculate EMI
  if (inputP && inputR && inputN && inputEMI === null) {
    const emi = calculateDirectEMI(inputP, inputR, inputN);
    const totalPayment = emi * inputN;
    const totalInterest = Math.max(0, totalPayment - inputP);
    return {
      p: inputP,
      r: inputR,
      n: inputN,
      emi,
      totalInterest,
      totalPayment,
      calculatedField: 'emi',
    };
  }

  // Case 3: EMI, R, N known -> Calculate Principal P
  // P = EMI * ((1+r)^n - 1) / (r * (1+r)^n)
  if (inputEMI && inputR && inputN && inputP === null) {
    let p = 0;
    if (inputR <= 0) {
      p = inputEMI * inputN;
    } else {
      const r = inputR / 12 / 100;
      const rn = Math.pow(1 + r, inputN);
      p = (inputEMI * (rn - 1)) / (r * rn);
    }
    const totalPayment = inputEMI * inputN;
    const totalInterest = Math.max(0, totalPayment - p);
    return {
      p,
      r: inputR,
      n: inputN,
      emi: inputEMI,
      totalInterest,
      totalPayment,
      calculatedField: 'p',
    };
  }

  // Case 4: P, R, EMI known -> Calculate Tenure N
  // n = ln(EMI / (EMI - P * r)) / ln(1 + r)
  if (inputP && inputR && inputEMI && inputN === null) {
    const r = inputR / 12 / 100;
    const minInterest = inputP * r;
    if (inputEMI <= minInterest) {
      return {
        p: inputP,
        r: inputR,
        n: 0,
        emi: inputEMI,
        totalInterest: 0,
        totalPayment: 0,
        calculatedField: 'n',
        warning: 'Monthly EMI must be greater than monthly interest to pay off the loan.',
      };
    }
    const n = Math.log(inputEMI / (inputEMI - inputP * r)) / Math.log(1 + r);
    const roundedN = Math.round(n * 10) / 10;
    const totalPayment = inputEMI * roundedN;
    const totalInterest = Math.max(0, totalPayment - inputP);
    return {
      p: inputP,
      r: inputR,
      n: roundedN,
      emi: inputEMI,
      totalInterest,
      totalPayment,
      calculatedField: 'n',
    };
  }

  // Case 5: P, N, EMI known -> Calculate Annual Rate R
  // Numerical root finding via bisection method
  if (inputP && inputN && inputEMI && inputR === null) {
    if (inputEMI * inputN <= inputP) {
      // 0% interest or negative
      return {
        p: inputP,
        r: 0,
        n: inputN,
        emi: inputEMI,
        totalInterest: 0,
        totalPayment: inputEMI * inputN,
        calculatedField: 'r',
      };
    }

    // Solve f(r) = P * r * (1+r)^n / ((1+r)^n - 1) - EMI = 0
    let low = 0.000001; // ~0%
    let high = 1.0; // 1200% annual
    let solvedMonthlyRate = 0;

    for (let iter = 0; iter < 100; iter++) {
      const mid = (low + high) / 2;
      const rn = Math.pow(1 + mid, inputN);
      const computedEMI = (inputP * mid * rn) / (rn - 1);

      if (Math.abs(computedEMI - inputEMI) < 0.0001) {
        solvedMonthlyRate = mid;
        break;
      }
      if (computedEMI < inputEMI) {
        low = mid;
      } else {
        high = mid;
      }
      solvedMonthlyRate = mid;
    }

    const annualRate = Math.round(solvedMonthlyRate * 12 * 100 * 100) / 100;
    const totalPayment = inputEMI * inputN;
    const totalInterest = Math.max(0, totalPayment - inputP);

    return {
      p: inputP,
      r: annualRate,
      n: inputN,
      emi: inputEMI,
      totalInterest,
      totalPayment,
      calculatedField: 'r',
    };
  }

  return null;
}

/**
 * Generate monthly amortization schedule (up to 360 months)
 */
export function generateAmortization(p: number, annualRate: number, months: number, emi: number): AmortizationRow[] {
  const schedule: AmortizationRow[] = [];
  const r = annualRate / 12 / 100;
  let balance = p;
  const maxRows = Math.min(Math.ceil(months), 120); // preview up to 120 months

  for (let m = 1; m <= maxRows && balance > 0; m++) {
    const interest = balance * r;
    const principal = Math.min(balance, emi - interest);
    balance = Math.max(0, balance - principal);

    schedule.push({
      month: m,
      payment: principal + interest,
      principal,
      interest,
      balance,
    });
  }

  return schedule;
}

/**
 * Smart 3-of-4 GST Solver
 * Amount (Base A), Rate% (r), GST Amount (G), Final Amount (F)
 */
export interface GSTSmartResult {
  amount: number;
  gstRate: number;
  gstAmount: number;
  finalAmount: number;
  calculatedField: 'amount' | 'gstRate' | 'gstAmount' | 'finalAmount' | null;
  isConsistent?: boolean;
  warning?: string;
}

export function solveSmartGST(
  amount: number | null,
  gstRate: number | null,
  gstAmount: number | null,
  finalAmount: number | null
): GSTSmartResult | null {
  const count = [amount, gstRate, gstAmount, finalAmount].filter(
    (v) => v !== null && v >= 0
  ).length;

  if (count < 3) return null;

  // All 4 present
  if (amount !== null && gstRate !== null && gstAmount !== null && finalAmount !== null) {
    const expectedGst = amount * (gstRate / 100);
    const expectedFinal = amount + expectedGst;
    const isConsistent =
      Math.abs(expectedGst - gstAmount) < 0.5 &&
      Math.abs(expectedFinal - finalAmount) < 0.5;

    return {
      amount,
      gstRate,
      gstAmount,
      finalAmount,
      calculatedField: null,
      isConsistent,
      warning: isConsistent
        ? undefined
        : `Values are mathematically inconsistent. ₹${amount} with ${gstRate}% GST should have ₹${expectedGst.toFixed(
            2
          )} GST and final amount ₹${expectedFinal.toFixed(2)}.`,
    };
  }

  // Missing Final Amount
  if (amount !== null && gstRate !== null && finalAmount === null) {
    const g = gstAmount !== null ? gstAmount : amount * (gstRate / 100);
    const f = amount + g;
    return {
      amount,
      gstRate,
      gstAmount: g,
      finalAmount: f,
      calculatedField: 'finalAmount',
    };
  }

  // Missing GST Amount
  if (amount !== null && finalAmount !== null && gstAmount === null) {
    const g = finalAmount - amount;
    const r = gstRate !== null ? gstRate : amount > 0 ? (g / amount) * 100 : 0;
    return {
      amount,
      gstRate: r,
      gstAmount: g,
      finalAmount,
      calculatedField: 'gstAmount',
    };
  }

  // Missing Base Amount
  if (finalAmount !== null && gstRate !== null && amount === null) {
    const a = finalAmount / (1 + gstRate / 100);
    const g = gstAmount !== null ? gstAmount : finalAmount - a;
    return {
      amount: a,
      gstRate,
      gstAmount: g,
      finalAmount,
      calculatedField: 'amount',
    };
  }

  // Missing GST Rate
  if (amount !== null && gstAmount !== null && gstRate === null) {
    const r = amount > 0 ? (gstAmount / amount) * 100 : 0;
    const f = finalAmount !== null ? finalAmount : amount + gstAmount;
    return {
      amount,
      gstRate: r,
      gstAmount,
      finalAmount: f,
      calculatedField: 'gstRate',
    };
  }

  // Missing Base Amount with GST Amount and Final Amount
  if (gstAmount !== null && finalAmount !== null && amount === null) {
    const a = finalAmount - gstAmount;
    const r = gstRate !== null ? gstRate : a > 0 ? (gstAmount / a) * 100 : 0;
    return {
      amount: a,
      gstRate: r,
      gstAmount,
      finalAmount,
      calculatedField: 'amount',
    };
  }

  return null;
}

/**
 * Smart 3-of-4 Discount Solver
 * Original Price (P), Discount% (d), Discount Amount (D), Final Price (F)
 */
export interface DiscountSmartResult {
  originalPrice: number;
  discountRate: number;
  discountAmount: number;
  finalPrice: number;
  calculatedField: 'originalPrice' | 'discountRate' | 'discountAmount' | 'finalPrice' | null;
  isConsistent?: boolean;
  warning?: string;
}

export function solveSmartDiscount(
  p: number | null,
  d: number | null,
  amt: number | null,
  finalP: number | null
): DiscountSmartResult | null {
  const count = [p, d, amt, finalP].filter((v) => v !== null && v >= 0).length;
  if (count < 3) return null;

  // All 4
  if (p !== null && d !== null && amt !== null && finalP !== null) {
    const expectedAmt = p * (d / 100);
    const expectedFinal = p - expectedAmt;
    const isConsistent =
      Math.abs(expectedAmt - amt) < 0.5 && Math.abs(expectedFinal - finalP) < 0.5;

    return {
      originalPrice: p,
      discountRate: d,
      discountAmount: amt,
      finalPrice: finalP,
      calculatedField: null,
      isConsistent,
      warning: isConsistent
        ? undefined
        : `Values are mathematically inconsistent. ₹${p} with ${d}% discount gives ₹${expectedAmt.toFixed(
            2
          )} off and final price ₹${expectedFinal.toFixed(2)}.`,
    };
  }

  // Missing Final Price
  if (p !== null && d !== null && finalP === null) {
    const discountAmt = amt !== null ? amt : p * (d / 100);
    const f = p - discountAmt;
    return {
      originalPrice: p,
      discountRate: d,
      discountAmount: discountAmt,
      finalPrice: Math.max(0, f),
      calculatedField: 'finalPrice',
    };
  }

  // Missing Discount Amount
  if (p !== null && finalP !== null && amt === null) {
    const discountAmt = p - finalP;
    const rate = d !== null ? d : p > 0 ? (discountAmt / p) * 100 : 0;
    return {
      originalPrice: p,
      discountRate: rate,
      discountAmount: discountAmt,
      finalPrice: finalP,
      calculatedField: 'discountAmount',
    };
  }

  // Missing Original Price
  if (finalP !== null && d !== null && p === null) {
    const orig = d < 100 ? finalP / (1 - d / 100) : finalP;
    const discountAmt = amt !== null ? amt : orig - finalP;
    return {
      originalPrice: orig,
      discountRate: d,
      discountAmount: discountAmt,
      finalPrice: finalP,
      calculatedField: 'originalPrice',
    };
  }

  // Missing Discount Rate
  if (p !== null && amt !== null && d === null) {
    const rate = p > 0 ? (amt / p) * 100 : 0;
    const f = finalP !== null ? finalP : p - amt;
    return {
      originalPrice: p,
      discountRate: rate,
      discountAmount: amt,
      finalPrice: f,
      calculatedField: 'discountRate',
    };
  }

  // Missing Original Price given amt and finalP
  if (amt !== null && finalP !== null && p === null) {
    const orig = finalP + amt;
    const rate = d !== null ? d : orig > 0 ? (amt / orig) * 100 : 0;
    return {
      originalPrice: orig,
      discountRate: rate,
      discountAmount: amt,
      finalPrice: finalP,
      calculatedField: 'originalPrice',
    };
  }

  return null;
}

/**
 * Smart 3-of-4 Profit & Loss Solver
 * Cost Price (CP), Selling Price (SP), Profit/Loss Amount (PL), Profit/Loss % (PL%)
 */
export interface ProfitLossSmartResult {
  costPrice: number;
  sellingPrice: number;
  plAmount: number;
  plPercent: number;
  isProfit: boolean;
  calculatedField: 'costPrice' | 'sellingPrice' | 'plAmount' | 'plPercent' | null;
  isConsistent?: boolean;
  warning?: string;
}

export function solveSmartProfitLoss(
  cp: number | null,
  sp: number | null,
  plAmt: number | null,
  plPct: number | null
): ProfitLossSmartResult | null {
  const count = [cp, sp, plAmt, plPct].filter((v) => v !== null).length;
  if (count < 3) return null;

  // All 4
  if (cp !== null && sp !== null && plAmt !== null && plPct !== null) {
    const expectedDiff = sp - cp;
    const expectedPct = cp > 0 ? (expectedDiff / cp) * 100 : 0;
    const isConsistent =
      Math.abs(expectedDiff - plAmt) < 0.5 && Math.abs(expectedPct - plPct) < 0.5;

    return {
      costPrice: cp,
      sellingPrice: sp,
      plAmount: plAmt,
      plPercent: plPct,
      isProfit: plAmt >= 0,
      calculatedField: null,
      isConsistent,
      warning: isConsistent
        ? undefined
        : `Values are mathematically inconsistent. CP ₹${cp} and SP ₹${sp} yield difference ₹${expectedDiff.toFixed(
            2
          )} (${expectedPct.toFixed(2)}%).`,
    };
  }

  // Missing PL %
  if (cp !== null && sp !== null && plPct === null) {
    const diff = plAmt !== null ? plAmt : sp - cp;
    const pct = cp > 0 ? (diff / cp) * 100 : 0;
    return {
      costPrice: cp,
      sellingPrice: sp,
      plAmount: diff,
      plPercent: pct,
      isProfit: diff >= 0,
      calculatedField: 'plPercent',
    };
  }

  // Missing PL Amount
  if (cp !== null && sp !== null && plAmt === null) {
    const diff = sp - cp;
    const pct = plPct !== null ? plPct : cp > 0 ? (diff / cp) * 100 : 0;
    return {
      costPrice: cp,
      sellingPrice: sp,
      plAmount: diff,
      plPercent: pct,
      isProfit: diff >= 0,
      calculatedField: 'plAmount',
    };
  }

  // Missing Selling Price
  if (cp !== null && sp === null) {
    if (plAmt !== null) {
      const s = cp + plAmt;
      const pct = plPct !== null ? plPct : cp > 0 ? (plAmt / cp) * 100 : 0;
      return {
        costPrice: cp,
        sellingPrice: s,
        plAmount: plAmt,
        plPercent: pct,
        isProfit: plAmt >= 0,
        calculatedField: 'sellingPrice',
      };
    } else if (plPct !== null) {
      const diff = cp * (plPct / 100);
      const s = cp + diff;
      return {
        costPrice: cp,
        sellingPrice: s,
        plAmount: diff,
        plPercent: plPct,
        isProfit: diff >= 0,
        calculatedField: 'sellingPrice',
      };
    }
  }

  // Missing Cost Price
  if (sp !== null && cp === null) {
    if (plAmt !== null) {
      const c = sp - plAmt;
      const pct = plPct !== null ? plPct : c > 0 ? (plAmt / c) * 100 : 0;
      return {
        costPrice: c,
        sellingPrice: sp,
        plAmount: plAmt,
        plPercent: pct,
        isProfit: plAmt >= 0,
        calculatedField: 'costPrice',
      };
    } else if (plPct !== null) {
      const c = sp / (1 + plPct / 100);
      const diff = sp - c;
      return {
        costPrice: c,
        sellingPrice: sp,
        plAmount: diff,
        plPercent: plPct,
        isProfit: diff >= 0,
        calculatedField: 'costPrice',
      };
    }
  }

  return null;
}

/**
 * Simple Interest: SI = (P * R * T) / 100
 */
export function calculateSimpleInterest(p: number, r: number, t: number) {
  const interest = (p * r * t) / 100;
  const total = p + interest;
  return { interest, total };
}

/**
 * Compound Interest: A = P * (1 + r / (100 * n))^(n * t)
 */
export function calculateCompoundInterest(
  p: number,
  r: number,
  t: number,
  frequency: number // 1: Annual, 2: Semi-Annual, 4: Quarterly, 12: Monthly
) {
  if (p <= 0) return { interest: 0, total: 0 };
  const ratePerPeriod = r / (100 * frequency);
  const totalPeriods = frequency * t;
  const total = p * Math.pow(1 + ratePerPeriod, totalPeriods);
  const interest = total - p;
  return { interest, total };
}

/**
 * Systematic Investment Plan (SIP)
 * FV = P * [((1 + i)^n - 1) / i] * (1 + i)
 * where i = annualRate / 12 / 100, n = months
 */
export function calculateSIP(monthlyInvest: number, annualRate: number, years: number) {
  const months = years * 12;
  const i = annualRate / 12 / 100;
  const totalInvested = monthlyInvest * months;

  if (i <= 0) {
    return {
      futureValue: totalInvested,
      totalInvested,
      wealthGained: 0,
    };
  }

  const fv = monthlyInvest * (((Math.pow(1 + i, months) - 1) / i) * (1 + i));
  const wealthGained = Math.max(0, fv - totalInvested);

  return {
    futureValue: fv,
    totalInvested,
    wealthGained,
  };
}

/**
 * Fixed Deposit (FD)
 * Indian standard quarterly compounding
 */
export function calculateFD(principal: number, annualRate: number, years: number) {
  return calculateCompoundInterest(principal, annualRate, years, 4);
}

/**
 * Recurring Deposit (RD)
 * Banking RD formula: Interest = P * n(n+1)/(2*12) * (r/100)
 */
export function calculateRD(monthlyDeposit: number, annualRate: number, months: number) {
  const totalDeposit = monthlyDeposit * months;
  const interest = monthlyDeposit * ((months * (months + 1)) / (2 * 12)) * (annualRate / 100);
  const maturityAmount = totalDeposit + interest;
  return {
    totalDeposit,
    interest,
    maturityAmount,
  };
}

/**
 * Salary Breakdown Calculator
 */
export function calculateSalary(grossMonthly: number) {
  const basic = grossMonthly * 0.5; // typical 50%
  const hra = basic * 0.4; // 40% of basic
  const specialAllowance = Math.max(0, grossMonthly - basic - hra);
  
  // Deductions
  const epf = Math.min(basic * 0.12, 1800); // Standard employee PF capped or 12%
  const professionalTax = 200; // standard monthly avg
  
  // Estimated annual tax TDS
  const annualGross = grossMonthly * 12;
  let annualTax = 0;
  if (annualGross > 700000) {
    annualTax = (annualGross - 700000) * 0.1;
  }
  const monthlyTds = annualTax / 12;

  const totalDeductions = epf + professionalTax + monthlyTds;
  const netSalary = Math.max(0, grossMonthly - totalDeductions);

  return {
    basic,
    hra,
    specialAllowance,
    epf,
    professionalTax,
    monthlyTds,
    totalDeductions,
    netSalary,
  };
}
