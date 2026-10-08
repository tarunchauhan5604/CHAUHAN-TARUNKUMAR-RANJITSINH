import React from 'react';
import { BlogPost } from '../types';
import { ArrowLeft, Calculator, Calendar, Clock, Share2, Check } from 'lucide-react';
import { AdPlaceholder } from '../components/common/AdPlaceholder';

interface BlogPostPageProps {
  post: BlogPost;
  onNavigate: (path: string) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, onNavigate }) => {
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      {/* Back button */}
      <button
        onClick={() => onNavigate('/blog')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Blog Articles</span>
      </button>

      {/* Header */}
      <div className="border-b border-slate-200 pb-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
          <span className="font-semibold text-sky-600">{post.category}</span>
          <span aria-hidden="true">·</span>
          <span>{post.publishedDate}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          {post.title}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          {post.excerpt}
        </p>

        <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="font-semibold text-slate-800">Daily Calculator Hub Editorial Team</span>
          </div>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
            <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
          </button>
        </div>
      </div>

      {/* Callout to interactive calculator if available */}
      {post.relatedCalculatorSlug && (
        <aside
          aria-label="Interactive calculator prompt"
          className="rounded-2xl border border-sky-200 bg-sky-50/60 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 text-white shrink-0">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Test Your Own Numbers Instantly</h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Use our interactive smart calculator with reverse solving.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate(`/calculators/${post.relatedCalculatorSlug}`)}
            className="px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition-colors whitespace-nowrap shadow-xs"
          >
            Open Interactive Tool →
          </button>
        </aside>
      )}

      {/* Article Body */}
      <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-4">
        {post.content.split('\n\n').map((block, idx) => {
          const trimmed = block.trim();
          if (trimmed.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-xl font-bold text-slate-900 mt-6 mb-2">
                {trimmed.replace('### ', '')}
              </h3>
            );
          }
          if (trimmed.startsWith('* ') || trimmed.startsWith('1. ') || trimmed.startsWith('2. ') || trimmed.startsWith('3. ')) {
            return (
              <div key={idx} className="pl-4 border-l-2 border-slate-200 py-1 space-y-1 my-3 text-slate-700">
                {trimmed.split('\n').map((line, lIdx) => (
                  <p key={lIdx} className="text-sm sm:text-base">
                    {line}
                  </p>
                ))}
              </div>
            );
          }
          if (trimmed.startsWith('$$')) {
            return (
              <div
                key={idx}
                className="my-4 rounded-xl bg-slate-900 text-sky-300 font-mono text-sm p-4 text-center overflow-x-auto"
              >
                {trimmed.replace(/\$\$/g, '')}
              </div>
            );
          }
          return <p key={idx}>{trimmed}</p>;
        })}
      </div>

      <AdPlaceholder slot="banner" />
    </article>
  );
};
