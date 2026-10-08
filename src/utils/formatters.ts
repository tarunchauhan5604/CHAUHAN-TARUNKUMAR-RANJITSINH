/**
 * Formats a number into Indian Rupee format (e.g. ₹1,50,000 or ₹1,50,000.50)
 */
export function formatINR(amount: number, showDecimals: boolean = false): string {
  if (isNaN(amount) || !isFinite(amount)) return '₹0';
  
  const absAmount = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';

  let formatted = '';
  if (showDecimals) {
    formatted = absAmount.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  } else {
    formatted = Math.round(absAmount).toLocaleString('en-IN');
  }

  return `${sign}₹${formatted}`;
}

/**
 * Standard number formatter with optional decimal places
 */
export function formatNumber(value: number, decimals: number = 2): string {
  if (isNaN(value) || !isFinite(value)) return '0';
  return value.toLocaleString('en-IN', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: Number.isInteger(value) ? 0 : Math.min(2, decimals),
  });
}

/**
 * Format percentage
 */
export function formatPercent(value: number, decimals: number = 2): string {
  if (isNaN(value) || !isFinite(value)) return '0%';
  return `${value.toLocaleString('en-IN', {
    maximumFractionDigits: decimals,
  })}%`;
}

/**
 * Safe parser for float inputs
 */
export function parseNumeric(val: string): number | null {
  if (!val || val.trim() === '') return null;
  const cleaned = val.replace(/,/g, '').trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}
