import React from 'react';
import { X, Bookmark, ArrowRight, Star } from 'lucide-react';
import { CALCULATORS } from '../../data/calculatorsData';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  onNavigate: (path: string) => void;
  onRemoveFavorite: (slug: string) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  onNavigate,
  onRemoveFavorite,
}) => {
  if (!isOpen) return null;

  const favoriteCalcs = CALCULATORS.filter((c) => favorites.includes(c.slug));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div
        className="fixed inset-y-0 right-0 flex max-w-full pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md border-l border-slate-200 bg-white p-6 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-amber-500 fill-amber-500/20" />
              <h3 className="text-base font-bold text-slate-900">Starred Calculators</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto py-4 space-y-2">
            {favoriteCalcs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center text-slate-400">
                <Bookmark className="h-10 w-10 text-slate-200 stroke-1 mb-2" />
                <p className="text-sm font-medium text-slate-500">No starred calculators yet</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Click the star icon on any calculator to pin your most frequently used tools here.
                </p>
              </div>
            ) : (
              favoriteCalcs.map((calc) => (
                <div
                  key={calc.id}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3 hover:bg-white hover:border-slate-200 hover:shadow-xs transition-all group"
                >
                  <button
                    onClick={() => {
                      onNavigate(`/calculators/${calc.slug}`);
                      onClose();
                    }}
                    className="flex-1 text-left min-w-0 pr-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900 group-hover:text-sky-600 transition-colors">
                        {calc.title}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{calc.shortDesc}</p>
                  </button>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onRemoveFavorite(calc.slug)}
                      className="p-1 text-amber-500 hover:text-slate-400 transition-colors"
                      title="Remove from favorites"
                    >
                      <Star className="h-4 w-4 fill-amber-500" />
                    </button>
                    <button
                      onClick={() => {
                        onNavigate(`/calculators/${calc.slug}`);
                        onClose();
                      }}
                      className="p-1 text-slate-400 hover:text-sky-600 group-hover:translate-x-0.5 transition-all"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center">
            Saved locally in browser storage
          </div>
        </div>
      </div>
    </div>
  );
};
