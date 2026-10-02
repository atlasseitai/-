import React from 'react';
import { CompanyAccess, ThemeColor } from '../types';
import { THEME_CONFIGS } from '../utils/theme';
import { MapPin, Clock, Train, ExternalLink } from 'lucide-react';

interface AccessSectionProps {
  access: CompanyAccess;
  theme: ThemeColor;
}

export const AccessSection: React.FC<AccessSectionProps> = ({
  access,
  theme,
}) => {
  const themeCfg = THEME_CONFIGS[theme] || THEME_CONFIGS.navy;

  return (
    <section id="access" className={`py-24 ${themeCfg.sectionMainBg || 'bg-[#faf7f2]'} text-slate-800 border-b ${themeCfg.borderColor || 'border-slate-200/80'} scroll-mt-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border ${themeCfg.badge}`}>
              <MapPin className="w-3.5 h-3.5" />
              <span>LOCATION & ACCESS</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${themeCfg.headingText || 'text-slate-900'} font-mincho`}>
              アクセス・所在地
            </h2>
            <p className={`${themeCfg.subheadingText || 'text-slate-600'} text-sm sm:text-base leading-relaxed`}>
              本社オフィスへの交通アクセスおよび営業時間をご案内いたします。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Address details card (5 cols) */}
          <div className={`lg:col-span-5 bg-white border ${themeCfg.borderColor || 'border-slate-200'} rounded-2xl p-7 sm:p-9 shadow-xs flex flex-col justify-between space-y-6`}>
            <div className="space-y-6">
              
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block font-sans">
                  HEADQUARTERS
                </span>
                <div className={`text-xs ${themeCfg.accentText} font-bold`}>{access.postalCode}</div>
                <h3 className={`text-lg sm:text-xl font-bold ${themeCfg.cardTitleText || 'text-slate-900'} leading-snug`}>
                  {access.address}
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 border-t border-slate-100 pt-5">
                <div className="flex items-start gap-3">
                  <Train className={`w-4 h-4 ${themeCfg.accentText} shrink-0 mt-0.5`} />
                  <div>
                    <span className="font-bold text-slate-800 block mb-0.5">交通アクセス</span>
                    <span>{access.accessGuide}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className={`w-4 h-4 ${themeCfg.accentText} shrink-0 mt-0.5`} />
                  <div>
                    <span className="font-bold text-slate-800 block mb-0.5">営業時間</span>
                    <span>{access.officeHours}</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-slate-100">
              <a
                href={access.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(access.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg ${themeCfg.primaryBg} text-white text-xs font-bold transition-colors cursor-pointer shadow-xs`}
              >
                <span>Google マップでルートを確認</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Right: Map Visual Container (7 cols) */}
          <div className={`lg:col-span-7 bg-slate-200 border ${themeCfg.borderColor || 'border-slate-200'} rounded-2xl overflow-hidden shadow-xs min-h-[340px] relative flex items-center justify-center`}>
            {/* Embedded Google Maps iframe or Interactive visual placeholder */}
            <iframe
              title="Google Map Access"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(access.address || '丸の内トラストタワー本館')}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              className="w-full h-full min-h-[360px] border-0"
              loading="lazy"
            ></iframe>
          </div>

        </div>

      </div>
    </section>
  );
};
