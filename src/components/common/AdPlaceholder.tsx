import React from 'react';

interface AdPlaceholderProps {
  slot: 'banner' | 'in-feed' | 'sidebar';
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ slot, className = '' }) => {
  const getDimensions = () => {
    switch (slot) {
      case 'banner':
        return 'min-h-[100px] w-full max-w-4xl';
      case 'sidebar':
        return 'min-h-[250px] w-full max-w-xs';
      case 'in-feed':
        return 'min-h-[120px] w-full';
    }
  };

  return (
    <div
      className={`my-6 mx-auto flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/70 p-4 text-center transition-colors ${getDimensions()} ${className}`}
      aria-label="Advertisement placeholder"
    >
      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        Advertisement
      </span>
      <p className="mt-1 text-xs text-slate-400">
        Sponsored content space prepared for Google AdSense
      </p>
    </div>
  );
};
