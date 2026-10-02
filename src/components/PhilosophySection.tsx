import React from 'react';
import { CompanyPhilosophy, ThemeColor } from '../types';
import { THEME_CONFIGS } from '../utils/theme';
import { Compass, Target, Award, Quote, CheckCircle2 } from 'lucide-react';
import fallbackCeoImg from '../assets/images/nishida_yukie_1789094122577.jpg';

interface PhilosophySectionProps {
  philosophy: CompanyPhilosophy;
  theme: ThemeColor;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({
  philosophy,
  theme,
}) => {
  const themeCfg = THEME_CONFIGS[theme] || THEME_CONFIGS.navy;

  return (
    <section id="philosophy" className={`py-24 ${themeCfg.sectionMainBg || 'bg-white'} text-slate-800 border-b ${themeCfg.borderColor || 'border-slate-200/80'} scroll-mt-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border ${themeCfg.badge}`}>
              <Compass className="w-3.5 h-3.5" />
              <span>PHILOSOPHY & MESSAGE</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${themeCfg.headingText || 'text-slate-900'} font-mincho`}>
              企業理念・代表メッセージ
            </h2>
            <p className={`${themeCfg.subheadingText || 'text-slate-600'} text-sm sm:text-base leading-relaxed`}>
              私たちは誠実さと高いプロフェッショナリズムを誇りに、人と社会の持続的な発展に貢献してまいります。
            </p>
          </div>
        </div>

        {/* Mission & Vision Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Mission Card */}
          <div className={`bg-white border ${themeCfg.borderColor || 'border-slate-200'} rounded-2xl p-8 sm:p-10 relative overflow-hidden shadow-xs hover:shadow-md transition-shadow`}>
            <div className={`w-12 h-12 rounded-xl ${themeCfg.secondaryBg} flex items-center justify-center mb-6 shadow-sm`}>
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className={`text-xs font-bold ${themeCfg.accentText} uppercase tracking-widest mb-2 font-sans`}>
              MISSION / 私たちの使命
            </div>
            <h3 className={`text-xl sm:text-2xl font-bold ${themeCfg.cardTitleText || 'text-slate-900'} mb-4 font-mincho leading-snug`}>
              {philosophy.missionTitle}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {philosophy.missionText}
            </p>
          </div>

          {/* Vision Card */}
          <div className={`bg-white border ${themeCfg.borderColor || 'border-slate-200'} rounded-2xl p-8 sm:p-10 relative overflow-hidden shadow-xs hover:shadow-md transition-shadow`}>
            <div className={`w-12 h-12 rounded-xl ${themeCfg.secondaryBg} flex items-center justify-center mb-6 shadow-sm`}>
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className={`text-xs font-bold ${themeCfg.accentText} uppercase tracking-widest mb-2 font-sans`}>
              VISION / 目指す未来
            </div>
            <h3 className={`text-xl sm:text-2xl font-bold ${themeCfg.cardTitleText || 'text-slate-900'} mb-4 font-mincho leading-snug`}>
              {philosophy.visionTitle}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {philosophy.visionText}
            </p>
          </div>

        </div>

        {/* Core Values / 5 Pillars */}
        {philosophy.values && philosophy.values.length > 0 && (
          <div className="mb-16">
            <h3 className={`text-lg font-bold ${themeCfg.cardTitleText || 'text-slate-900'} mb-6 flex items-center gap-2 font-mincho`}>
              <CheckCircle2 className={`w-5 h-5 ${themeCfg.accentText}`} />
              <span>行動指針・共有する価値観（行動規範）</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {philosophy.values.map((val, idx) => (
                <div
                  key={val.id || idx}
                  className={`p-6 rounded-xl border ${themeCfg.borderColor || 'border-slate-200'} bg-slate-50/70 hover:bg-white hover:shadow-sm transition-all`}
                >
                  <span className={`text-xs font-bold ${themeCfg.accentText} mb-2 block font-sans`}>
                    VALUE 0{idx + 1}
                  </span>
                  <h4 className={`text-base font-bold ${themeCfg.cardTitleText || 'text-slate-900'} mb-2`}>
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CEO Message Banner */}
        {philosophy.ceoMessage && (
          <div className={`rounded-3xl overflow-hidden ${
            theme === 'beige'
              ? 'bg-[#f4ebe1] border border-[#e4d6c4]'
              : 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800'
          } p-8 sm:p-12 lg:p-14 text-white shadow-xl relative`}>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Message Left Text */}
              <div className="lg:col-span-8 space-y-6">
                <div className={`flex items-center gap-2 ${theme === 'beige' ? 'text-[#9c7141]' : 'text-amber-300'} text-xs font-semibold tracking-wider uppercase`}>
                  <Quote className="w-4 h-4" />
                  <span>TOP MESSAGE</span>
                </div>

                <h3 className={`text-2xl sm:text-3xl font-bold ${theme === 'beige' ? 'text-[#2d2116]' : 'text-white'} font-mincho leading-snug`}>
                  {philosophy.ceoMessage.title}
                </h3>

                <div className={`text-sm sm:text-base ${theme === 'beige' ? 'text-[#5c4a3b]' : 'text-slate-300'} leading-relaxed space-y-4 whitespace-pre-line font-normal`}>
                  {philosophy.ceoMessage.text}
                </div>

                <div className={`pt-4 border-t ${theme === 'beige' ? 'border-[#e4d6c4]' : 'border-slate-800'} flex items-center justify-between`}>
                  <div>
                    <div className={`text-xs ${theme === 'beige' ? 'text-[#8a7662]' : 'text-slate-400'}`}>{philosophy.ceoMessage.authorTitle}</div>
                    <div className={`text-lg font-bold ${theme === 'beige' ? 'text-[#2d2116]' : 'text-white'} font-mincho`}>{philosophy.ceoMessage.authorName}</div>
                  </div>
                </div>
              </div>

              {/* CEO Portrait Right */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center">
                <div className={`w-56 sm:w-64 aspect-3/4 rounded-xl overflow-hidden border-2 shadow-2xl ${
                  theme === 'beige' ? 'border-[#dfcfba]' : 'border-slate-700'
                }`}>
                  <img
                    src={philosophy.ceoMessage.authorImageUrl || fallbackCeoImg}
                    alt={philosophy.ceoMessage.authorName}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== fallbackCeoImg) {
                        target.src = fallbackCeoImg;
                      }
                    }}
                  />
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
