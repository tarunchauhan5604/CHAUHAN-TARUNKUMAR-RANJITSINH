import { CalculationHistoryItem } from '../types';

const STORAGE_KEYS = {
  HISTORY: 'dch_calculation_history_v1',
  FAVORITES: 'dch_favorite_calculators_v1',
  RECENT_CALCULATORS: 'dch_recent_calculators_v1',
  COOKIE_CONSENT: 'dch_cookie_consent_v1',
};

export function getHistory(): CalculationHistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addHistoryItem(item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>): void {
  try {
    const current = getHistory();
    const newItem: CalculationHistoryItem = {
      ...item,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      timestamp: Date.now(),
    };
    const updated = [newItem, ...current.slice(0, 29)]; // keep 30
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
  } catch {
    // ignore
  }
}

export function getFavorites(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return raw ? JSON.parse(raw) : ['emi', 'gst', 'bmi', 'sip', 'age']; // default favorites
  } catch {
    return ['emi', 'gst', 'bmi', 'sip', 'age'];
  }
}

export function toggleFavorite(slug: string): string[] {
  try {
    const current = getFavorites();
    const exists = current.includes(slug);
    const updated = exists ? current.filter((s) => s !== slug) : [...current, slug];
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function getRecentCalculatorSlugs(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RECENT_CALCULATORS);
    return raw ? JSON.parse(raw) : ['emi', 'gst', 'discount', 'bmi'];
  } catch {
    return ['emi', 'gst', 'discount', 'bmi'];
  }
}

export function recordVisitedCalculator(slug: string): void {
  try {
    const current = getRecentCalculatorSlugs().filter((s) => s !== slug);
    const updated = [slug, ...current.slice(0, 7)]; // keep top 8
    localStorage.setItem(STORAGE_KEYS.RECENT_CALCULATORS, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

export function hasCookieConsent(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEYS.COOKIE_CONSENT) === 'accepted';
  } catch {
    return false;
  }
}

export function setCookieConsent(accepted: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEYS.COOKIE_CONSENT, accepted ? 'accepted' : 'declined');
  } catch {
    // ignore
  }
}
