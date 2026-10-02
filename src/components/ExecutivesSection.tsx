import React from 'react';
import { ExecutiveMember, ThemeColor } from '../types';
import { THEME_CONFIGS } from '../utils/theme';
import { Users } from 'lucide-react';
import fallbackExecImg from '../assets/images/nishida_yukie_1789094122577.jpg';

interface ExecutivesSectionProps {
  executives: ExecutiveMember[];
  theme: ThemeColor;
}

export const ExecutivesSection: React.FC<ExecutivesSectionProps> = ({
  executives = [],
  theme,
}) => {
  const themeCfg = THEME_CONFIGS[theme] || THEME_CONFIGS.navy;

  return (
    <section id="executives" className={`py-24 ${themeCfg.sectionAltBg || 'bg-[#f4efe6]'} text-slate-800 border-b ${themeCfg.borderColor || 'border-slate-200/80'} scroll-mt-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border ${themeCfg.badge}`}>
              <Users className="w-3.5 h-3.5" />
              <span>LEADERSHIP & EXECUTIVES</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${themeCfg.headingText || 'text-slate-900'} font-mincho`}>
              役員・経営陣紹介
            </h2>
            <p className={`${themeCfg.subheadingText || 'text-slate-600'} text-sm sm:text-base leading-relaxed`}>
              確かな実績と情熱を持つリーダーシップが、誠実で持続可能な企業成長を牽引しています。
            </p>
          </div>
        </div>

        {/* Executives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {executives.map((member, idx) => (
            <div
              key={member.id || idx}
              className={`bg-white border ${themeCfg.borderColor || 'border-slate-200'} rounded-2xl overflow-hidden shadow-xs hover:shadow-lg ${themeCfg.cardBorderHover} transition-all flex flex-col`}
            >
              {/* Photo Area */}
              <div className="group relative aspect-4/3 overflow-hidden bg-slate-200">
                <img
                  src={member.imageUrl || fallbackExecImg}
                  alt={member.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== fallbackExecImg) {
                      target.src = fallbackExecImg;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none"></div>
              </div>

              {/* Info Body */}
              <div className="p-6 sm:p-7 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className={`text-xs font-bold ${themeCfg.accentText} tracking-wider uppercase block`}>
                    {member.role}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <h3 className={`text-xl font-bold ${themeCfg.cardTitleText || 'text-slate-900'} font-mincho`}>
                      {member.name}
                    </h3>
                    <span className="text-xs text-slate-500 font-sans">
                      {member.nameEn}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-200/60 font-normal">
                    {member.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
