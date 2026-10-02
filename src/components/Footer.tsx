import React from 'react';
import { CompanyHeader, CompanyAccess, ThemeColor } from '../types';
import { THEME_CONFIGS } from '../utils/theme';
import { Building2, ArrowUp, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  header: CompanyHeader;
  access: CompanyAccess;
  theme?: ThemeColor;
}

export const Footer: React.FC<FooterProps> = ({ header, access, theme = 'beige' }) => {
  const themeCfg = THEME_CONFIGS[theme] || THEME_CONFIGS.beige;
  const isBeige = theme === 'beige';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: '企業理念', href: '#philosophy' },
    { label: '事業内容', href: '#services' },
    { label: '提携ホテル', href: '#hotels' },
    { label: '会社概要', href: '#overview' },
    { label: 'お知らせ', href: '#news' },
    { label: '役員紹介', href: '#executives' },
    { label: 'アクセス', href: '#access' },
    { label: 'お問い合わせ', href: '#contact' },
  ];

  return (
    <footer className={`${isBeige ? 'bg-[#f4efe6] text-[#6d5e4f] border-[#e2d5c3]' : 'bg-slate-950 text-slate-400 border-slate-800'} text-xs border-t`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand & Tagline (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              {header.logoUrl ? (
                <div className={`w-10 h-10 rounded-xl overflow-hidden shadow-xs border ${isBeige ? 'border-[#dfcfba]' : 'border-slate-700'} bg-white shrink-0`}>
                  <img
                    src={header.logoUrl}
                    alt={header.companyName}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <div className={`w-10 h-10 rounded-xl ${themeCfg.primaryBg} text-white flex items-center justify-center shadow-xs shrink-0`}>
                  <Building2 className="w-5 h-5" />
                </div>
              )}
              <div>
                <span className={`font-bold text-base ${isBeige ? 'text-[#2d2116]' : 'text-white'} block`}>
                  {header.companyName}
                </span>
                <span className={`text-[10px] ${isBeige ? 'text-[#8a7662]' : 'text-slate-400'} tracking-wider font-sans block`}>
                  {header.companyNameEn}
                </span>
              </div>
            </div>

            <p className={`text-xs ${isBeige ? 'text-[#675646]' : 'text-slate-400'} leading-relaxed max-w-md`}>
              {header.tagline}
            </p>

            <div className={`pt-2 space-y-1.5 ${isBeige ? 'text-[#675646]' : 'text-slate-400'} font-normal`}>
              <div className="flex items-start gap-2">
                <MapPin className={`w-3.5 h-3.5 ${themeCfg.accentText} shrink-0 mt-0.5`} />
                <span>{access.postalCode} {access.address}</span>
              </div>
              {header.phone && (
                <div className="flex items-center gap-2">
                  <Phone className={`w-3.5 h-3.5 ${themeCfg.accentText} shrink-0`} />
                  <span>
                    電話番号:{' '}
                    <a
                      href={`tel:${header.phone.replace(/[^0-9]/g, '')}`}
                      className={`font-semibold ${isBeige ? 'text-[#2d2116] hover:text-[#9c7141]' : 'text-white hover:text-blue-400'} transition-colors`}
                    >
                      {header.phone}
                    </a>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className={`font-bold text-sm ${isBeige ? 'text-[#2d2116]' : 'text-white'}`}>
              サイトメニュー
            </h4>
            <ul className={`space-y-2 ${isBeige ? 'text-[#675646]' : 'text-slate-400'}`}>
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={`${isBeige ? 'hover:text-[#9c7141]' : 'hover:text-white'} transition-colors`}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Secondary Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className={`font-bold text-sm ${isBeige ? 'text-[#2d2116]' : 'text-white'}`}>
              企業情報・ご案内
            </h4>
            <ul className={`space-y-2 ${isBeige ? 'text-[#675646]' : 'text-slate-400'}`}>
              {navLinks.slice(4).map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={`${isBeige ? 'hover:text-[#9c7141]' : 'hover:text-white'} transition-colors`}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a href="#contact" className={`${themeCfg.accentText} hover:underline`}>
                  プライバシーポリシー
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className={`mt-12 pt-8 border-t ${isBeige ? 'border-[#e2d5c3] text-[#8a7662]' : 'border-slate-800/80 text-slate-500'} flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]`}>
          <div className="flex flex-wrap items-center gap-4">
            <p>© {new Date().getFullYear()} {header.companyNameEn || header.companyName}. All Rights Reserved.</p>
          </div>

          <button
            onClick={scrollToTop}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${isBeige ? 'bg-white hover:bg-[#faf7f2] text-[#675646] hover:text-[#2d2116] border border-[#e2d5c3] shadow-xs' : 'text-slate-400 hover:text-white'} transition-colors cursor-pointer`}
          >
            <span>ページトップへ戻る</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
