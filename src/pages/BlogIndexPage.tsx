import React from 'react';
import { BLOG_POSTS } from '../data/blogData';
import { BookOpen, ArrowRight, Clock, Calendar } from 'lucide-react';
import { AdPlaceholder } from '../components/common/AdPlaceholder';

interface BlogIndexPageProps {
  onNavigate: (path: string) => void;
}

export const BlogIndexPage: React.FC<BlogIndexPageProps> = ({ onNavigate }) => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      <div className="border-b border-slate-200 pb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 mb-4">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Educational Guides & Mathematical Insights</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Financial & Mathematical Learning Hub
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
          Clear, practical explanations of reducing balance loan interest, GST mathematics,
          compounding wealth principles, and clinical health indicators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.slug}
            onClick={() => {
              onNavigate(`/blog/${post.slug}`);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-sky-300 hover:shadow-md cursor-pointer group"
          >
            <div>
              {/* Zero-Pill Metadata Discipline */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                <span className="font-semibold text-sky-600">{post.category}</span>
                <span aria-hidden="true">·</span>
                <span>{post.publishedDate}</span>
                <span aria-hidden="true">·</span>
                <span>{post.readTime}</span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                {post.title}
              </h2>
              <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs font-semibold text-sky-600 pt-4 border-t border-slate-100">
              <span>Read Full Article</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </article>
        ))}
      </div>

      <AdPlaceholder slot="banner" />
    </div>
  );
};
