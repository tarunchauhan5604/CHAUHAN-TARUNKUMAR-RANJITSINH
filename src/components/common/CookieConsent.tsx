import React, { useState, useEffect } from 'react';
import { hasCookieConsent, setCookieConsent } from '../../services/storage';

export const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if user already consented
    const consent = hasCookieConsent();
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!visible) return null;

  const handleAccept = () => {
    setCookieConsent(true);
    setVisible(false);
  };

  const handleDecline = () => {
    setCookieConsent(false);
    setVisible(false);
  };

  return (
    <aside
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-4 shadow-xl md:bottom-6 md:p-5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            We use essential local cookies to store your calculation history and preferences.
            By clicking &ldquo;Accept All&rdquo;, you agree to our{' '}
            <a href="/privacy-policy" className="text-sky-600 underline hover:text-sky-700">
              Privacy Policy
            </a>
            .
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleDecline}
            className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-1.5 text-xs font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-sm transition-colors whitespace-nowrap"
          >
            Accept All
          </button>
        </div>
      </div>
    </aside>
  );
};
