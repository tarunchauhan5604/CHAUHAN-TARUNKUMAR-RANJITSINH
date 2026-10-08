export type CalculatorCategory = 'finance' | 'health' | 'converters' | 'utility';

export interface CalculatorMeta {
  id: string;
  slug: string;
  title: string;
  category: CalculatorCategory;
  shortDesc: string;
  iconName: string;
  isPopular?: boolean;
  hasSmart3of4?: boolean;
  formula: string;
  formulaExplanation: string;
  faqs: { question: string; answer: string }[];
  relatedSlugs: string[];
}

export interface CalculationHistoryItem {
  id: string;
  calculatorSlug: string;
  calculatorTitle: string;
  timestamp: number;
  summary: string;
  primaryResult: string;
  details?: Record<string, string>;
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  publishedDate: string;
  excerpt: string;
  content: string;
  relatedCalculatorSlug?: string;
}
