import { ThemeColor } from '../types';

export interface ThemeClasses {
  name: string;
  badge: string;
  primaryBg: string;
  primaryHover: string;
  primaryText: string;
  secondaryBg: string;
  accentText: string;
  accentBg: string;
  heroGradient: string;
  cardBorderHover: string;
  navHighlight: string;
  pageBg: string;
  sectionMainBg: string;
  sectionAltBg: string;
  navUnderline: string;
  headerBg?: string;
  borderColor?: string;
  cardBg?: string;
  headingText?: string;
  subheadingText?: string;
  cardTitleText?: string;
}

export const THEME_CONFIGS: Record<ThemeColor, ThemeClasses> = {
  beige: {
    name: '上品なノーブルベージュ',
    badge: 'bg-[#fbf5ed] text-[#9c7141] border-[#e8dac9]',
    primaryBg: 'bg-[#9c7141]',
    primaryHover: 'hover:bg-[#855e34]',
    primaryText: 'text-[#9c7141]',
    secondaryBg: 'bg-[#9c7141] hover:bg-[#855e34] text-white',
    accentText: 'text-[#9c7141]',
    accentBg: 'bg-[#f5efe6]',
    heroGradient: 'from-[#2b221a] via-[#3d3126] to-[#5c4a3b]',
    cardBorderHover: 'hover:border-[#c4b197]',
    navHighlight: 'text-[#9c7141] font-semibold',
    pageBg: 'bg-[#faf7f2]',
    sectionMainBg: 'bg-[#faf7f2]',
    sectionAltBg: 'bg-[#f5efe6]',
    navUnderline: 'after:bg-[#9c7141]',
    headerBg: 'bg-[#faf7f2]/95',
    borderColor: 'border-[#ebe3d5]',
    cardBg: 'bg-white',
    headingText: 'text-[#8f6437]',
    subheadingText: 'text-[#736555]',
    cardTitleText: 'text-[#78532f]',
  },
  navy: {
    name: '王道コーポレートネイビー',
    badge: 'bg-blue-50 text-blue-800 border-blue-200',
    primaryBg: 'bg-slate-900',
    primaryHover: 'hover:bg-slate-800',
    primaryText: 'text-slate-900',
    secondaryBg: 'bg-blue-700 hover:bg-blue-800 text-white',
    accentText: 'text-blue-600',
    accentBg: 'bg-blue-50',
    heroGradient: 'from-slate-950 via-slate-900 to-blue-950',
    cardBorderHover: 'hover:border-blue-400',
    navHighlight: 'text-blue-600 font-semibold',
    pageBg: 'bg-slate-50',
    sectionMainBg: 'bg-white',
    sectionAltBg: 'bg-slate-50',
    navUnderline: 'after:bg-blue-600',
    headerBg: 'bg-white/95',
    borderColor: 'border-slate-200',
    cardBg: 'bg-white',
    headingText: 'text-slate-900',
    subheadingText: 'text-slate-600',
    cardTitleText: 'text-slate-900',
  },
  emerald: {
    name: 'フォレストグリーン & サステナブル',
    badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    primaryBg: 'bg-emerald-950',
    primaryHover: 'hover:bg-emerald-900',
    primaryText: 'text-emerald-950',
    secondaryBg: 'bg-emerald-700 hover:bg-emerald-800 text-white',
    accentText: 'text-emerald-600',
    accentBg: 'bg-emerald-50',
    heroGradient: 'from-stone-950 via-emerald-950 to-teal-950',
    cardBorderHover: 'hover:border-emerald-400',
    navHighlight: 'text-emerald-600 font-semibold',
    pageBg: 'bg-slate-50',
    sectionMainBg: 'bg-white',
    sectionAltBg: 'bg-slate-50',
    navUnderline: 'after:bg-emerald-600',
    headerBg: 'bg-white/95',
    borderColor: 'border-slate-200',
    cardBg: 'bg-white',
    headingText: 'text-emerald-950',
    subheadingText: 'text-emerald-800/80',
    cardTitleText: 'text-emerald-950',
  },
  charcoal: {
    name: 'プレステージ・チャコール＆ゴールド',
    badge: 'bg-amber-50 text-amber-900 border-amber-200',
    primaryBg: 'bg-neutral-900',
    primaryHover: 'hover:bg-neutral-800',
    primaryText: 'text-neutral-900',
    secondaryBg: 'bg-amber-700 hover:bg-amber-800 text-white',
    accentText: 'text-amber-600',
    accentBg: 'bg-amber-50',
    heroGradient: 'from-neutral-950 via-neutral-900 to-stone-950',
    cardBorderHover: 'hover:border-amber-400',
    navHighlight: 'text-amber-600 font-semibold',
    pageBg: 'bg-slate-50',
    sectionMainBg: 'bg-white',
    sectionAltBg: 'bg-slate-50',
    navUnderline: 'after:bg-amber-600',
    headerBg: 'bg-white/95',
    borderColor: 'border-slate-200',
    cardBg: 'bg-white',
    headingText: 'text-neutral-900',
    subheadingText: 'text-neutral-600',
    cardTitleText: 'text-neutral-900',
  },
  blue: {
    name: 'コバルトブルー & テクノロジー',
    badge: 'bg-sky-50 text-sky-800 border-sky-200',
    primaryBg: 'bg-sky-950',
    primaryHover: 'hover:bg-sky-900',
    primaryText: 'text-sky-950',
    secondaryBg: 'bg-sky-600 hover:bg-sky-700 text-white',
    accentText: 'text-sky-600',
    accentBg: 'bg-sky-50',
    heroGradient: 'from-slate-950 via-sky-950 to-blue-900',
    cardBorderHover: 'hover:border-sky-400',
    navHighlight: 'text-sky-600 font-semibold',
    pageBg: 'bg-slate-50',
    sectionMainBg: 'bg-white',
    sectionAltBg: 'bg-slate-50',
    navUnderline: 'after:bg-sky-600',
    headerBg: 'bg-white/95',
    borderColor: 'border-slate-200',
    cardBg: 'bg-white',
    headingText: 'text-sky-950',
    subheadingText: 'text-slate-600',
    cardTitleText: 'text-sky-950',
  },
  burgundy: {
    name: 'トラディショナル・ワインレッド',
    badge: 'bg-rose-50 text-rose-900 border-rose-200',
    primaryBg: 'bg-stone-900',
    primaryHover: 'hover:bg-stone-800',
    primaryText: 'text-rose-950',
    secondaryBg: 'bg-rose-800 hover:bg-rose-900 text-white',
    accentText: 'text-rose-700',
    accentBg: 'bg-rose-50',
    heroGradient: 'from-stone-950 via-rose-950 to-stone-900',
    cardBorderHover: 'hover:border-rose-400',
    navHighlight: 'text-rose-700 font-semibold',
    pageBg: 'bg-slate-50',
    sectionMainBg: 'bg-white',
    sectionAltBg: 'bg-slate-50',
    navUnderline: 'after:bg-rose-700',
    headerBg: 'bg-white/95',
    borderColor: 'border-slate-200',
    cardBg: 'bg-white',
    headingText: 'text-rose-950',
    subheadingText: 'text-stone-600',
    cardTitleText: 'text-rose-950',
  },
};
