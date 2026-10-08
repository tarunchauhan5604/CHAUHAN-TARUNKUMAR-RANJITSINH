import React, { useState } from 'react';
import { Search, History, Bookmark, Menu, X, Calculator } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  onOpenHistory: () => void;
  onOpenFavorites: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch,
  onOpenHistory,
  onOpenFavorites,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Calculators', path: '/calculators' },
    { label: 'Finance', path: '/finance' },
    { label: 'Health', path: '/health' },
    { label: 'Converters', path: '/converters' },
    { label: 'Blog', path: '/blog' },
  ];

  const handleLinkClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark (Single element) */}
        <a
          href="/"
          onClick={(e) => handleLinkClick('/', e)}
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900 hover:text-sky-600 transition-colors shrink-0"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white shadow-sm shadow-sky-200">
            <Calculator className="h-5 w-5" />
          </div>
          <span>Daily Calculator Hub</span>
        </a>

        {/* Zone 2: Navigation Links (Clean text) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          {navLinks.map((link) => {
            const isActive =
              link.path === '/' ? currentPath === '/' : currentPath.startsWith(link.path);
            return (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => handleLinkClick(link.path, e)}
                className={`transition-colors whitespace-nowrap hover:text-sky-600 ${
                  isActive ? 'text-sky-600 font-semibold' : 'text-slate-600'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-xs text-slate-500 hover:border-slate-300 hover:bg-slate-100 transition-colors"
            title="Search calculators (Press / or Ctrl+K)"
          >
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden sm:inline">Search calculators...</span>
            <kbd className="hidden lg:inline-flex items-center rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* History Button */}
          <button
            onClick={onOpenHistory}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Recent Calculations"
            aria-label="Recent calculations"
          >
            <History className="h-4.5 w-4.5" />
          </button>

          {/* Favorites Button */}
          <button
            onClick={onOpenFavorites}
            className="p-2 text-slate-500 hover:text-amber-500 hover:bg-slate-100 rounded-lg transition-colors"
            title="Starred Calculators"
            aria-label="Starred calculators"
          >
            <Bookmark className="h-4.5 w-4.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 md:hidden rounded-lg hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 pt-2 pb-6 md:hidden shadow-lg animate-fadeIn">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/' ? currentPath === '/' : currentPath.startsWith(link.path);
              return (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleLinkClick(link.path, e)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-sky-50 text-sky-600 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="pt-2 border-t border-slate-100 mt-2 flex items-center justify-between px-3 text-xs text-slate-500">
              <a
                href="/about"
                onClick={(e) => handleLinkClick('/about', e)}
                className="hover:text-slate-900"
              >
                About Us
              </a>
              <a
                href="/contact"
                onClick={(e) => handleLinkClick('/contact', e)}
                className="hover:text-slate-900"
              >
                Contact
              </a>
              <a
                href="/privacy-policy"
                onClick={(e) => handleLinkClick('/privacy-policy', e)}
                className="hover:text-slate-900"
              >
                Privacy
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
