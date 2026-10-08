import React, { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { SearchModal } from './components/common/SearchModal';
import { HistoryDrawer } from './components/common/HistoryDrawer';
import { FavoritesDrawer } from './components/common/FavoritesDrawer';
import { CookieConsent } from './components/common/CookieConsent';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { BlogIndexPage } from './pages/BlogIndexPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';

// Calculators & Wrapper
import { CalculatorWrapper } from './components/calculator/CalculatorWrapper';
import { CALCULATORS } from './data/calculatorsData';
import { BLOG_POSTS } from './data/blogData';
import {
  getHistory,
  clearHistory,
  getFavorites,
  toggleFavorite,
  recordVisitedCalculator,
} from './services/storage';

// All Calculator Views
import { EMICalculator } from './components/calculators/EMICalculator';
import { GSTCalculator } from './components/calculators/GSTCalculator';
import { DiscountCalculator } from './components/calculators/DiscountCalculator';
import { ProfitLossCalculator } from './components/calculators/ProfitLossCalculator';
import { PercentageCalculator } from './components/calculators/PercentageCalculator';
import { SimpleInterestCalculator } from './components/calculators/SimpleInterestCalculator';
import { CompoundInterestCalculator } from './components/calculators/CompoundInterestCalculator';
import { SIPCalculator } from './components/calculators/SIPCalculator';
import { FDCalculator } from './components/calculators/FDCalculator';
import { RDCalculator } from './components/calculators/RDCalculator';
import { LoanCalculator } from './components/calculators/LoanCalculator';
import { SalaryCalculator } from './components/calculators/SalaryCalculator';
import { BMICalculator } from './components/calculators/BMICalculator';
import { BMRCalculator } from './components/calculators/BMRCalculator';
import { CalorieCalculator } from './components/calculators/CalorieCalculator';
import { AgeCalculator } from './components/calculators/AgeCalculator';
import { DateDifferenceCalculator } from './components/calculators/DateDifferenceCalculator';
import { PregnancyDueDateCalculator } from './components/calculators/PregnancyDueDateCalculator';
import { UnitConverterCalculator } from './components/calculators/UnitConverterCalculator';
import { FuelCostCalculator } from './components/calculators/FuelCostCalculator';
import { AgeDifferenceCalculator } from './components/calculators/AgeDifferenceCalculator';
import { TimeDurationCalculator } from './components/calculators/TimeDurationCalculator';
import { GSTSplitCalculator } from './components/calculators/GSTSplitCalculator';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [searchOpen, setSearchOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(getFavorites());
  const [historyItems, setHistoryItems] = useState(getHistory());
  const [calcResetKey, setCalcResetKey] = useState(0);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleFavorite = (slug: string) => {
    const updated = toggleFavorite(slug);
    setFavorites([...updated]);
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistoryItems([]);
  };

  // Re-read history when drawer opens
  const handleOpenHistory = () => {
    setHistoryItems(getHistory());
    setHistoryOpen(true);
  };

  // Render specific calculator component based on slug
  const renderCalculatorComponent = (slug: string) => {
    switch (slug) {
      case 'emi':
        return <EMICalculator key={calcResetKey} />;
      case 'gst':
        return <GSTCalculator key={calcResetKey} />;
      case 'discount':
        return <DiscountCalculator key={calcResetKey} />;
      case 'profit-loss':
        return <ProfitLossCalculator key={calcResetKey} />;
      case 'percentage':
        return <PercentageCalculator key={calcResetKey} />;
      case 'simple-interest':
        return <SimpleInterestCalculator key={calcResetKey} />;
      case 'compound-interest':
        return <CompoundInterestCalculator key={calcResetKey} />;
      case 'sip':
        return <SIPCalculator key={calcResetKey} />;
      case 'fd':
        return <FDCalculator key={calcResetKey} />;
      case 'rd':
        return <RDCalculator key={calcResetKey} />;
      case 'loan':
        return <LoanCalculator key={calcResetKey} />;
      case 'salary':
        return <SalaryCalculator key={calcResetKey} />;
      case 'bmi':
        return <BMICalculator key={calcResetKey} />;
      case 'bmr':
        return <BMRCalculator key={calcResetKey} />;
      case 'calorie':
        return <CalorieCalculator key={calcResetKey} />;
      case 'age':
        return <AgeCalculator key={calcResetKey} />;
      case 'date-difference':
        return <DateDifferenceCalculator key={calcResetKey} />;
      case 'pregnancy-due-date':
        return <PregnancyDueDateCalculator key={calcResetKey} />;
      case 'length-converter':
      case 'weight-converter':
      case 'temperature-converter':
      case 'area-converter':
      case 'volume-converter':
      case 'time-converter':
      case 'speed-converter':
      case 'data-storage-converter':
        return <UnitConverterCalculator key={calcResetKey} type={slug as any} />;
      case 'fuel-cost':
        return <FuelCostCalculator key={calcResetKey} />;
      case 'age-difference':
        return <AgeDifferenceCalculator key={calcResetKey} />;
      case 'time-duration':
        return <TimeDurationCalculator key={calcResetKey} />;
      case 'gst-split':
        return <GSTSplitCalculator key={calcResetKey} />;
      default:
        return <div>Calculator not found</div>;
    }
  };

  // Route dispatcher
  const renderContent = () => {
    // 1. Home
    if (currentPath === '/' || currentPath === '') {
      return (
        <HomePage
          onNavigate={navigate}
          onOpenSearch={() => setSearchOpen(true)}
        />
      );
    }

    // 2. Categories
    if (currentPath === '/calculators') {
      return <CategoryPage initialCategory="all" onNavigate={navigate} />;
    }
    if (currentPath === '/finance') {
      return <CategoryPage initialCategory="finance" onNavigate={navigate} />;
    }
    if (currentPath === '/health') {
      return <CategoryPage initialCategory="health" onNavigate={navigate} />;
    }
    if (currentPath === '/converters') {
      return <CategoryPage initialCategory="converters" onNavigate={navigate} />;
    }
    if (currentPath === '/utility') {
      return <CategoryPage initialCategory="utility" onNavigate={navigate} />;
    }

    // 3. Calculator pages (/calculators/:slug)
    if (currentPath.startsWith('/calculators/')) {
      const slug = currentPath.replace('/calculators/', '').split('/')[0];
      const meta = CALCULATORS.find((c) => c.slug === slug);

      if (meta) {
        // Record visit
        recordVisitedCalculator(meta.slug);
        const isFav = favorites.includes(meta.slug);

        return (
          <CalculatorWrapper
            meta={meta}
            isFavorite={isFav}
            onToggleFavorite={() => handleToggleFavorite(meta.slug)}
            onReset={() => setCalcResetKey((k) => k + 1)}
            primaryResultToCopy="Calculated Result"
            onNavigate={navigate}
          >
            {renderCalculatorComponent(meta.slug)}
          </CalculatorWrapper>
        );
      }
    }

    // 4. Blog
    if (currentPath === '/blog') {
      return <BlogIndexPage onNavigate={navigate} />;
    }
    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '').split('/')[0];
      const post = BLOG_POSTS.find((p) => p.slug === slug);
      if (post) {
        return <BlogPostPage post={post} onNavigate={navigate} />;
      }
    }

    // 5. Static & Legal
    if (currentPath === '/about') {
      return <AboutPage />;
    }
    if (currentPath === '/contact') {
      return <ContactPage />;
    }
    if (currentPath === '/privacy-policy') {
      return <LegalPage type="privacy-policy" />;
    }
    if (currentPath === '/terms') {
      return <LegalPage type="terms" />;
    }
    if (currentPath === '/disclaimer') {
      return <LegalPage type="disclaimer" />;
    }

    // Fallback to Home
    return <HomePage onNavigate={navigate} onOpenSearch={() => setSearchOpen(true)} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Bar Contract Header */}
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenHistory={handleOpenHistory}
        onOpenFavorites={() => {
          setFavorites(getFavorites());
          setFavoritesOpen(true);
        }}
      />

      {/* Main Mainframe View */}
      <main className="flex-1">{renderContent()}</main>

      {/* Footer with Compliance & Links */}
      <Footer onNavigate={navigate} />

      {/* Global Drawers & Modals */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectCalculator={(slug) => navigate(`/calculators/${slug}`)}
      />

      <HistoryDrawer
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        history={historyItems}
        onClear={handleClearHistory}
        onNavigate={navigate}
      />

      <FavoritesDrawer
        isOpen={favoritesOpen}
        onClose={() => setFavoritesOpen(false)}
        favorites={favorites}
        onNavigate={navigate}
        onRemoveFavorite={handleToggleFavorite}
      />

      <CookieConsent />
    </div>
  );
}
