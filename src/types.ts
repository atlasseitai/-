export type ThemeColor = 'beige' | 'navy' | 'emerald' | 'charcoal' | 'blue' | 'burgundy';

export interface CompanyHeader {
  companyName: string;
  companyNameEn: string;
  tagline: string;
  phone: string;
  contactButtonText: string;
  logoUrl?: string;
}

export interface HeroStat {
  label: string;
  value: string;
  unit: string;
}

export interface CompanyHero {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  backgroundImageUrl: string;
  backgroundOpacity?: number; // 20 to 100
  stats?: HeroStat[];
}

export interface CorporateValue {
  title: string;
  description: string;
}

export interface CeoMessage {
  title: string;
  text: string;
  authorName: string;
  authorTitle: string;
  authorImageUrl: string;
}

export interface CompanyPhilosophy {
  missionTitle: string;
  missionText: string;
  visionTitle: string;
  visionText: string;
  values: CorporateValue[];
  ceoMessage: CeoMessage;
}

export interface ServiceItem {
  id: string;
  title: string;
  titleEn: string;
  tag: string;
  summary: string;
  description: string;
  iconName: string;
  imageUrl?: string;
  points: string[];
}

export interface CompanyOverviewItem {
  id: string;
  label: string;
  value: string;
}

export interface NewsItem {
  id: string;
  date: string;
  category: string;
  title: string;
  content: string;
}

export interface ExecutiveMember {
  id: string;
  role: string;
  name: string;
  nameEn: string;
  bio: string;
  imageUrl?: string;
}

export interface PartnerHotel {
  id: string;
  name: string;
  nameEn?: string;
  category: string;
  area: string;
  description: string;
  serviceTypes: string[];
  imageUrl?: string;
  websiteUrl?: string;
  roomCount?: string;
  note?: string;
}

export interface CompanyAccess {
  postalCode: string;
  address: string;
  accessGuide: string;
  googleMapsUrl: string;
  mapEmbedQuery: string;
  officeHours: string;
}

export interface CompanyContact {
  phone: string;
  email: string;
  hours: string;
  formTitle: string;
  formDescription: string;
  privacyNote: string;
}

export interface SiteSettings {
  isPublished: boolean; // true: 公開中, false: 非公開（準備中・関係者専用）
  maintenanceTitle?: string;
  maintenanceMessage?: string;
  adminPasscode?: string; // 関係者ログイン用パスコード（デフォルト: 1234）
  contactEmail?: string;
}

export interface CompanyData {
  theme: ThemeColor;
  version?: number;
  siteSettings?: SiteSettings;
  header: CompanyHeader;
  hero: CompanyHero;
  philosophy: CompanyPhilosophy;
  services: ServiceItem[];
  partnerHotels?: PartnerHotel[];
  overview: CompanyOverviewItem[];
  news: NewsItem[];
  executives: ExecutiveMember[];
  access: CompanyAccess;
  contact: CompanyContact;
}
