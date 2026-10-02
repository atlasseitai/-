import React from 'react';
import { ServiceItem, ThemeColor } from '../types';
import { THEME_CONFIGS } from '../utils/theme';
import { 
  Briefcase, CheckCircle2,
  Building2, ShieldCheck, GraduationCap, HeartHandshake,
  Layers, BarChart3, Globe, Sparkles, Store, Users, ShoppingBag, Award
} from 'lucide-react';
import fallbackServiceImg from '../assets/images/salon_private_room_1788847542393.jpg';

interface ServicesSectionProps {
  services: ServiceItem[];
  theme: ThemeColor;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  theme,
}) => {
  const themeCfg = THEME_CONFIGS[theme] || THEME_CONFIGS.navy;

  const renderIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-white" };
    switch (iconName) {
      case 'Building2': return <Building2 {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'GraduationCap': return <GraduationCap {...props} />;
      case 'HeartHandshake': return <HeartHandshake {...props} />;
      case 'Store': return <Store {...props} />;
      case 'ShoppingBag': return <ShoppingBag {...props} />;
      case 'Users': return <Users {...props} />;
      case 'BarChart3': return <BarChart3 {...props} />;
      case 'Globe': return <Globe {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'Award': return <Award {...props} />;
      default: return <Layers {...props} />;
    }
  };

  return (
    <section id="services" className={`py-24 ${themeCfg.sectionMainBg || 'bg-white'} text-slate-800 border-b ${themeCfg.borderColor || 'border-slate-200/80'} scroll-mt-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border ${themeCfg.badge}`}>
              <Briefcase className="w-3.5 h-3.5" />
              <span>CORE BUSINESS & SERVICES</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${themeCfg.headingText || 'text-slate-900'} font-mincho`}>
              事業内容・サービス紹介
            </h2>
            <p className={`${themeCfg.subheadingText || 'text-slate-600'} text-sm sm:text-base leading-relaxed`}>
              お客様の多様なニーズと課題に応えるため、高い専門性と柔軟な実行力を備えた複数のコア事業を展開しております。
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((srv, idx) => (
            <div
              key={srv.id || idx}
              className={`bg-white border ${themeCfg.borderColor || 'border-slate-200'} rounded-2xl overflow-hidden shadow-xs hover:shadow-xl ${themeCfg.cardBorderHover} transition-all duration-300 flex flex-col group`}
            >
              {/* Image banner */}
              {srv.imageUrl ? (
                <div className="relative aspect-16/9 overflow-hidden bg-slate-900">
                  <img
                    src={srv.imageUrl || fallbackServiceImg}
                    alt={srv.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== fallbackServiceImg) {
                        target.src = fallbackServiceImg;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent pointer-events-none"></div>

                  {/* Badge & Number */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 z-10 pointer-events-none">
                    <span className="px-3 py-1 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-xs font-bold font-sans">
                      0{idx + 1}
                    </span>
                    {srv.tag && (
                      <span className={`px-3 py-1 rounded-md ${themeCfg.secondaryBg} text-xs font-semibold shadow-xs`}>
                        {srv.tag}
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                    <span className="text-[11px] font-medium text-slate-300 tracking-wider uppercase block font-sans">
                      {srv.titleEn}
                    </span>
                    <h3 className="text-xl font-bold text-white font-mincho">
                      {srv.title}
                    </h3>
                  </div>
                </div>
              ) : null}

              {/* Body */}
              <div className="p-7 sm:p-8 flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {!srv.imageUrl && (
                    <div className="flex items-center justify-between">
                      <span className={`w-9 h-9 rounded-lg ${themeCfg.secondaryBg} flex items-center justify-center shadow-xs`}>
                        {renderIcon(srv.iconName)}
                      </span>
                      {srv.tag && (
                        <span className={`px-2.5 py-0.5 rounded text-[11px] font-semibold ${themeCfg.badge}`}>
                          {srv.tag}
                        </span>
                      )}
                    </div>
                  )}

                  {!srv.imageUrl && (
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-sans">
                        {srv.titleEn}
                      </span>
                      <h3 className={`text-xl font-bold ${themeCfg.cardTitleText || 'text-slate-900'} font-mincho`}>
                        {srv.title}
                      </h3>
                    </div>
                  )}

                  <p className="text-sm font-semibold text-slate-700 leading-relaxed">
                    {srv.summary}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {srv.description}
                  </p>

                  {/* Bullet points */}
                  {srv.points && srv.points.length > 0 && (
                    <ul className="space-y-2 pt-2 border-t border-slate-100">
                      {srv.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                          <CheckCircle2 className={`w-4 h-4 ${themeCfg.accentText} shrink-0 mt-0.5`} />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
