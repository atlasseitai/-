import React from 'react';
import { CompanyHero, ThemeColor } from '../types';
import { THEME_CONFIGS } from '../utils/theme';
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import fallbackHeroImg from '../assets/images/spa_hero_luxury_1788847526615.jpg';

interface HeroSectionProps {
  hero: CompanyHero;
  theme: ThemeColor;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ hero, theme }) => {
  const themeCfg = THEME_CONFIGS[theme] || THEME_CONFIGS.navy;
  const opacityVal = Math.min(100, Math.max(20, hero.backgroundOpacity ?? 90));

  return (
    <section className="relative min-h-[85vh] sm:min-h-[88vh] flex flex-col justify-between overflow-hidden bg-slate-950">
      
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={hero.backgroundImageUrl || fallbackHeroImg}
          alt="Atlas Company Overview"
          style={{ opacity: opacityVal / 100 }}
          className="w-full h-full object-cover object-center transform scale-102 transition-all duration-700 select-none"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== fallbackHeroImg) {
              target.src = fallbackHeroImg;
            }
          }}
        />

        {/* Ambient Darkened Gradient Overlay */}
        <div className={`absolute inset-0 ${
          theme === 'beige'
            ? 'bg-gradient-to-r from-[#241c16]/85 via-[#241c16]/50 via-50% to-transparent'
            : 'bg-gradient-to-r from-slate-950/80 via-slate-950/40 via-45% to-transparent'
        }`}></div>

        {/* Gentle bottom dock to stats bar */}
        <div className={`absolute inset-x-0 bottom-0 h-24 ${
          theme === 'beige'
            ? 'bg-gradient-to-t from-[#241c16]/50 to-transparent'
            : 'bg-gradient-to-t from-slate-950/60 to-transparent'
        }`}></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 sm:pt-28 sm:pb-32 flex-grow flex items-center">
        <div className="max-w-3xl space-y-6">
          
          {/* Eyebrow badge */}
          {hero.eyebrow && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-amber-100 text-xs font-semibold backdrop-blur-sm tracking-wider uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{hero.eyebrow}</span>
            </div>
          )}

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.2] whitespace-pre-line font-mincho drop-shadow-md">
            {hero.headline}
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl drop-shadow-xs">
            {hero.subheadline}
          </p>

          {/* CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href="#services"
              className={`inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl ${
                theme === 'beige'
                  ? 'bg-[#9c7141] hover:bg-[#855e34] text-white shadow-[#9c7141]/30'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/30'
              } text-sm font-bold shadow-lg transition-all hover:scale-105 active:scale-95`}
            >
              <span>事業内容を見る</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#hotels"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/30 backdrop-blur-md transition-all hover:scale-105"
            >
              <span>提携ホテル一覧</span>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-sm font-semibold border border-amber-400/30 backdrop-blur-md transition-all hover:scale-105"
            >
              <span>お問い合わせ</span>
            </a>
          </div>
        </div>
      </div>

      {/* Floating Bottom Stats Bar */}
      {hero.stats && hero.stats.length > 0 && (
        <div className="relative z-10 border-t border-white/10 bg-slate-950/70 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {hero.stats.map((stat, idx) => (
                <div key={stat.id || idx} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold text-white font-mincho tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
