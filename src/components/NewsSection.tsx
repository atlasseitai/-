import React, { useState } from 'react';
import { NewsItem, ThemeColor } from '../types';
import { THEME_CONFIGS } from '../utils/theme';
import { Bell, ChevronDown, ChevronUp, Tag, ArrowRight } from 'lucide-react';

interface NewsSectionProps {
  news: NewsItem[];
  theme: ThemeColor;
}

export const NewsSection: React.FC<NewsSectionProps> = ({
  news,
  theme,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const themeCfg = THEME_CONFIGS[theme];

  const categories = ['all', ...Array.from(new Set(news.map((item) => item.category)))];

  const filteredNews = activeCategory === 'all'
    ? news
    : news.filter((item) => item.category === activeCategory);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section id="news" className={`py-24 ${themeCfg.sectionMainBg || 'bg-[#faf7f2]'} text-slate-800 border-b ${themeCfg.borderColor || 'border-slate-200/80'} scroll-mt-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border ${themeCfg.badge}`}>
              <Bell className="w-3.5 h-3.5" />
              <span>NEWS & PRESS RELEASES</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${themeCfg.headingText || 'text-slate-900'} font-mincho`}>
              お知らせ・ニュース
            </h2>
            <p className={`${themeCfg.subheadingText || 'text-slate-600'} text-sm sm:text-base leading-relaxed`}>
              当社の最新情報、プレスリリース、採用情報、活動実績などをお届けします。
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                activeCategory === cat
                  ? `${themeCfg.primaryBg} text-white shadow-xs`
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat === 'all' ? 'すべて' : cat}
            </button>
          ))}
        </div>

        {/* News List */}
        <div className={`bg-white border ${themeCfg.borderColor || 'border-slate-200'} rounded-2xl overflow-hidden shadow-xs divide-y ${themeCfg.borderColor || 'divide-slate-100'}`}>
          {filteredNews.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500">
              該当するお知らせはありません。
            </div>
          ) : (
            filteredNews.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <div key={item.id} className="transition-colors hover:bg-slate-50/70">
                  <div
                    onClick={() => toggleExpand(item.id)}
                    className="p-5 sm:px-8 sm:py-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex flex-wrap sm:flex-nowrap items-baseline sm:items-center gap-3 sm:gap-6 flex-grow">
                      {/* Date */}
                      <span className="text-xs font-semibold text-slate-500 font-sans tracking-wide shrink-0">
                        {item.date}
                      </span>

                      {/* Category Badge */}
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                        {item.category}
                      </span>

                      {/* Title */}
                      <h3 className={`text-sm sm:text-base font-bold ${themeCfg.cardTitleText || 'text-slate-900'} leading-snug`}>
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400 self-end sm:self-center shrink-0">
                      <span className="text-[11px] text-slate-500 hidden sm:inline">
                        {isExpanded ? '閉じる' : '詳細を見る'}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-700" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      )}
                    </div>
                  </div>

                  {/* Expandable Content Drawer */}
                  {isExpanded && (
                    <div className="px-5 sm:px-8 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line border-t border-slate-100 bg-slate-50/50">
                      <p className="max-w-4xl">{item.content}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
};
