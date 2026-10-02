import React from 'react';
import { CompanyOverviewItem, ThemeColor } from '../types';
import { THEME_CONFIGS } from '../utils/theme';
import { Building, ShieldCheck } from 'lucide-react';

interface OverviewSectionProps {
  overview: CompanyOverviewItem[];
  theme: ThemeColor;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  overview,
  theme,
}) => {
  const themeCfg = THEME_CONFIGS[theme] || THEME_CONFIGS.navy;

  return (
    <section id="overview" className={`py-24 ${themeCfg.sectionAltBg || 'bg-[#f4efe6]'} text-slate-800 border-b ${themeCfg.borderColor || 'border-slate-200/80'} scroll-mt-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border ${themeCfg.badge}`}>
              <Building className="w-3.5 h-3.5" />
              <span>CORPORATE PROFILE</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${themeCfg.headingText || 'text-slate-900'} font-mincho`}>
              会社概要
            </h2>
            <p className={`${themeCfg.subheadingText || 'text-slate-600'} text-sm sm:text-base leading-relaxed`}>
              当社の基本情報・所在地・役員・取引銀行および許認可情報をご案内いたします。
            </p>
          </div>
        </div>

        {/* Corporate Profile Data Card */}
        <div className="bg-white/95 rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden backdrop-blur-xs">
          <div className="divide-y divide-slate-100">
            {overview.map((item, idx) => (
              <div
                key={item.id || idx}
                className="p-5 sm:px-8 sm:py-5.5 hover:bg-slate-50/50 transition-colors"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-start">
                  {/* Column 1: Label */}
                  <div className="md:col-span-3 lg:col-span-3 flex items-center">
                    <span className={`text-xs sm:text-sm font-bold ${themeCfg.cardTitleText || 'text-slate-700'}`}>
                      {item.label}
                    </span>
                  </div>

                  {/* Column 2: Value */}
                  <div className="md:col-span-9 lg:col-span-9 flex items-start justify-between gap-4">
                    <span className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-normal">
                      {item.value}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Assurance Footer Banner */}
        <div className={`mt-8 p-5 rounded-xl ${
          theme === 'beige'
            ? 'bg-[#faf6f0] border border-[#e8dacb] text-[#5c4a3b]'
            : 'bg-blue-50/60 border border-blue-100 text-slate-600'
        } flex flex-col sm:flex-row items-center justify-between gap-4 text-xs`}>
          <div className={`flex items-center gap-2.5 ${theme === 'beige' ? 'text-[#2d2116]' : 'text-blue-900'} font-semibold`}>
            <ShieldCheck className={`w-4 h-4 ${theme === 'beige' ? 'text-[#9c7141]' : 'text-blue-600'} shrink-0`} />
            <span>コンプライアンスおよび個人情報保護方針の徹底</span>
          </div>
          <p className={`${theme === 'beige' ? 'text-[#7d6c5b]' : 'text-slate-500'} text-[11px]`}>
            当社は関係法令を厳格に遵守し、健全かつ持続可能な企業経営を推進しております。
          </p>
        </div>

      </div>
    </section>
  );
};
