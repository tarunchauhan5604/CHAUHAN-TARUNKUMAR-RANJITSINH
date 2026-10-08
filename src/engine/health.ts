/**
 * Pure Mathematical Engine for Health & Date Calculators
 */

export interface BMIResult {
  bmi: number;
  category: string;
  healthyWeightMinKg: number;
  healthyWeightMaxKg: number;
  prime: number; // BMI / 25
  statusColor: 'emerald' | 'amber' | 'rose' | 'sky';
}

export function calculateBMI(weightKg: number, heightCm: number): BMIResult {
  if (weightKg <= 0 || heightCm <= 0) {
    return {
      bmi: 0,
      category: 'Invalid input',
      healthyWeightMinKg: 0,
      healthyWeightMaxKg: 0,
      prime: 0,
      statusColor: 'sky',
    };
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const roundedBMI = Math.round(bmi * 10) / 10;

  const minHealthy = 18.5 * heightM * heightM;
  const maxHealthy = 24.9 * heightM * heightM;

  let category = 'Normal weight';
  let statusColor: 'emerald' | 'amber' | 'rose' | 'sky' = 'emerald';

  if (bmi < 18.5) {
    category = 'Underweight';
    statusColor = 'sky';
  } else if (bmi <= 24.9) {
    category = 'Healthy / Normal';
    statusColor = 'emerald';
  } else if (bmi <= 29.9) {
    category = 'Overweight';
    statusColor = 'amber';
  } else {
    category = 'Obese';
    statusColor = 'rose';
  }

  return {
    bmi: roundedBMI,
    category,
    healthyWeightMinKg: Math.round(minHealthy * 10) / 10,
    healthyWeightMaxKg: Math.round(maxHealthy * 10) / 10,
    prime: Math.round((bmi / 25) * 100) / 100,
    statusColor,
  };
}

export interface BMRResult {
  bmr: number;
}

/**
 * Mifflin-St Jeor Formula
 */
export function calculateBMR(
  weightKg: number,
  heightCm: number,
  ageYears: number,
  gender: 'male' | 'female'
): number {
  if (weightKg <= 0 || heightCm <= 0 || ageYears <= 0) return 0;
  
  const base = 10 * weightKg + 6.25 * heightCm - 5 * ageYears;
  return gender === 'male' ? Math.round(base + 5) : Math.round(base - 161);
}

export interface CalorieNeeds {
  maintenance: number;
  mildLoss: number; // -250 kcal
  weightLoss: number; // -500 kcal
  mildGain: number; // +250 kcal
  weightGain: number; // +500 kcal
}

export function calculateCalories(bmr: number, activityLevel: number): CalorieNeeds {
  const maintenance = Math.round(bmr * activityLevel);
  return {
    maintenance,
    mildLoss: Math.max(1200, maintenance - 250),
    weightLoss: Math.max(1200, maintenance - 500),
    mildGain: maintenance + 250,
    weightGain: maintenance + 500,
  };
}

export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  daysUntilNextBirthday: number;
  nextBirthdayDayOfWeek: string;
}

export function calculateAge(birthDateStr: string, asOfDateStr?: string): AgeResult | null {
  if (!birthDateStr) return null;
  const birth = new Date(birthDateStr);
  const target = asOfDateStr ? new Date(asOfDateStr) : new Date();

  if (isNaN(birth.getTime()) || isNaN(target.getTime()) || birth > target) {
    return null;
  }

  let years = target.getFullYear() - birth.getFullYear();
  let months = target.getMonth() - birth.getMonth();
  let days = target.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;
    // Days in previous month
    const prevMonthLastDay = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
    days += prevMonthLastDay;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const diffTime = target.getTime() - birth.getTime();
  const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);

  // Next birthday calculation
  const currentYear = target.getFullYear();
  let nextBday = new Date(currentYear, birth.getMonth(), birth.getDate());
  if (nextBday < target) {
    nextBday = new Date(currentYear + 1, birth.getMonth(), birth.getDate());
  }

  const daysUntilNext = Math.ceil((nextBday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const nextDayName = daysOfWeek[nextBday.getDay()];

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    daysUntilNextBirthday: Math.max(0, daysUntilNext),
    nextBirthdayDayOfWeek: nextDayName,
  };
}

export interface DateDiffResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  businessDays: number;
  totalHours: number;
}

export function calculateDateDifference(startDateStr: string, endDateStr: string): DateDiffResult | null {
  if (!startDateStr || !endDateStr) return null;
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

  const [earlier, later] = start <= end ? [start, end] : [end, start];

  let years = later.getFullYear() - earlier.getFullYear();
  let months = later.getMonth() - earlier.getMonth();
  let days = later.getDate() - earlier.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonthDays = new Date(later.getFullYear(), later.getMonth(), 0).getDate();
    days += prevMonthDays;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const diffMs = later.getTime() - earlier.getTime();
  const totalDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  const totalHours = totalDays * 24;

  // Calculate business days (Monday-Friday)
  let businessDays = 0;
  const cur = new Date(earlier);
  while (cur < later) {
    const day = cur.getDay();
    if (day !== 0 && day !== 6) {
      businessDays++;
    }
    cur.setDate(cur.getDate() + 1);
  }

  return {
    years,
    months,
    days,
    totalDays,
    businessDays,
    totalHours,
  };
}

export interface PregnancyResult {
  dueDate: string;
  conceptionDate: string;
  currentWeeks: number;
  currentDays: number;
  trimester: 1 | 2 | 3;
  daysRemaining: number;
}

export function calculatePregnancyDueDate(lmpDateStr: string, cycleLengthDays: number = 28): PregnancyResult | null {
  if (!lmpDateStr) return null;
  const lmp = new Date(lmpDateStr);
  if (isNaN(lmp.getTime())) return null;

  // Naegele's rule adjusted for cycle length (280 days + (cycle - 28))
  const offsetDays = 280 + (cycleLengthDays - 28);
  const due = new Date(lmp.getTime() + offsetDays * 24 * 60 * 60 * 1000);
  const conception = new Date(lmp.getTime() + (14 + (cycleLengthDays - 28)) * 24 * 60 * 60 * 1000);

  const today = new Date();
  const elapsedMs = today.getTime() - lmp.getTime();
  const elapsedDays = Math.max(0, Math.floor(elapsedMs / (1000 * 60 * 60 * 24)));
  const currentWeeks = Math.floor(elapsedDays / 7);
  const currentDays = elapsedDays % 7;

  let trimester: 1 | 2 | 3 = 1;
  if (currentWeeks >= 27) trimester = 3;
  else if (currentWeeks >= 13) trimester = 2;

  const daysRemaining = Math.max(0, Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  return {
    dueDate: due.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    conceptionDate: conception.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    currentWeeks,
    currentDays,
    trimester,
    daysRemaining,
  };
}
