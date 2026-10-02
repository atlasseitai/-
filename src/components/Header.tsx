import React, { useState } from 'react';
import { CompanyData } from '../types';
import { THEME_CONFIGS } from '../utils/theme';
import { Building2, Phone, Mail, Menu, X, ArrowRight, Server } from 'lucide-react';
import fallbackLogoImg from '../assets/images/corporate_brand_icon_1789095307732.jpg';

interface HeaderProps {
  data: CompanyData;
  onOpenSakuraExport?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ data, onOpenSakuraExport }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = THEME_CONFIGS[data.theme] || THEME_CONFIGS.beige;

  const navLinks = [
    { label: '企業理念', href: '#philosophy' },
    { label: '事業内容', href: '#services' },
    { label: '提携ホテル', href: '#hotels' },
    { label: '会社概要', href: '#overview' },
    { label: 'お知らせ', href: '#news' },
    { label: '役員紹介', href: '#executives' },
    { label: 'アクセス', href: '#access' },
  ];

  return (
    <header className={`sticky top-0 z-40 ${theme.headerBg || 'bg-white/95'} backdrop-blur-md border-b ${theme.borderColor || 'border-slate-200/90'} shadow-xs transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Company Name */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-3 group">
              {data.header.logoUrl ? (
                <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-sm border border-slate-200/80 bg-white transition-transform group-hover:scale-105 shrink-0">
                  <img
                    src={data.header.logoUrl || fallbackLogoImg}
                    alt={data.header.companyName}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== fallbackLogoImg) {
                        target.src = fallbackLogoImg;
                      }
                    }}
                  />
                </div>
              ) : (
                <div className={`w-11 h-11 rounded-xl ${theme.primaryBg} text-white flex items-center justify-center shadow-md transition-transform group-hover:scale-105 shrink-0`}>
                  <Building2 className="w-6 h-6 text-white" />
                </div>
              )}
              <div>
                <span className={`font-bold text-lg sm:text-xl ${theme.headingText || 'text-slate-900'} tracking-tight block leading-snug`}>
                  {data.header.companyName}
                </span>
                <span className="text-[11px] font-medium text-slate-500 tracking-wider block font-sans">
                  {data.header.companyNameEn}
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors py-2 relative hover:after:w-full after:w-0 after:h-0.5 ${theme.navUnderline || 'after:bg-blue-600'} after:absolute after:bottom-0 after:left-0 after:transition-all`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right Contact CTA */}
          <div className="hidden sm:flex items-center gap-4">
            {data.header.phone && (
              <div className="text-right hidden xl:block">
                <div className="text-[10px] text-slate-500 font-medium">お電話でのお問い合わせ</div>
                <a
                  href={`tel:${data.header.phone}`}
                  className={`text-sm font-bold text-slate-900 hover:${theme.accentText} transition-colors flex items-center gap-1 font-sans`}
                >
                  <Phone className="w-3.5 h-3.5 text-slate-600" />
                  <span>{data.header.phone}</span>
                </a>
              </div>
            )}

            {onOpenSakuraExport && (
              <button
                onClick={onOpenSakuraExport}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 font-bold text-xs transition-colors cursor-pointer shadow-xs"
                title="さくらインターネット・WordPress公開用ZIPをダウンロード"
              >
                <Server className="w-3.5 h-3.5 text-amber-700" />
                <span className="hidden xl:inline">さくら・WP公開用ZIP</span>
                <span className="xl:hidden">WP公開</span>
              </button>
            )}

            <a
              href="#contact"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg ${theme.secondaryBg} font-semibold text-xs sm:text-sm shadow-sm transition-all hover:shadow-md cursor-pointer`}
            >
              <Mail className="w-4 h-4" />
              <span>{data.header.contactButtonText || 'お問い合わせ'}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {onOpenSakuraExport && (
              <button
                onClick={onOpenSakuraExport}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200 font-bold text-xs"
                title="WP公開ZIP"
              >
                <Server className="w-3.5 h-3.5 text-amber-700" />
                <span>WP公開</span>
              </button>
            )}

            <a
              href="#contact"
              className={`inline-flex items-center px-3 py-1.5 rounded-md ${theme.secondaryBg} font-semibold text-xs sm:hidden`}
            >
              お問い合わせ
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="メニューを開く"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            {data.header.phone && (
              <div className="px-3 py-1 flex items-center justify-between text-xs text-slate-600">
                <span>電話番号:</span>
                <a href={`tel:${data.header.phone}`} className="font-bold text-slate-900">
                  {data.header.phone}
                </a>
              </div>
            )}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg ${theme.secondaryBg} font-bold text-sm shadow-xs`}
            >
              <span>{data.header.contactButtonText || 'お問い合わせ・ご相談'}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
