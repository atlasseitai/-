import React, { useState, useEffect } from 'react';
import { CompanyData, ThemeColor, PartnerHotel, ExecutiveMember, CompanyHero, SiteSettings } from './types';
import { DEFAULT_COMPANY_DATA } from './data/defaultCompanyData';
import { MaintenanceScreen } from './components/MaintenanceScreen';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PhilosophySection } from './components/PhilosophySection';
import { ServicesSection } from './components/ServicesSection';
import { PartnerHotelsSection } from './components/PartnerHotelsSection';
import { OverviewSection } from './components/OverviewSection';
import { NewsSection } from './components/NewsSection';
import { ExecutivesSection } from './components/ExecutivesSection';
import { AccessSection } from './components/AccessSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { EditModal } from './components/EditModal';
import { THEME_CONFIGS } from './utils/theme';
import { CheckCircle2, Lock } from 'lucide-react';
import { 
  persistCompanyData, 
  loadCompanyDataSync, 
  loadCompanyDataFromIndexedDB,
  clearAllStorage
} from './utils/storage';

function sanitizeWithBundledImages(data: CompanyData): CompanyData {
  const result: CompanyData = { ...data };

  // Header Logo
  if (!result.header?.logoUrl) {
    result.header = { ...result.header, logoUrl: DEFAULT_COMPANY_DATA.header.logoUrl };
  }

  // Hero Background
  if (!result.hero?.backgroundImageUrl) {
    result.hero = { ...result.hero, backgroundImageUrl: DEFAULT_COMPANY_DATA.hero.backgroundImageUrl };
  }

  // CEO Message
  if (result.philosophy?.ceoMessage && !result.philosophy.ceoMessage.authorImageUrl) {
    result.philosophy = {
      ...result.philosophy,
      ceoMessage: {
        ...result.philosophy.ceoMessage,
        authorImageUrl: DEFAULT_COMPANY_DATA.philosophy.ceoMessage.authorImageUrl,
      },
    };
  }

  // Services
  if (Array.isArray(result.services)) {
    result.services = result.services.map((srv, idx) => {
      const defaultImg = DEFAULT_COMPANY_DATA.services[idx]?.imageUrl;
      if (!srv.imageUrl && defaultImg) {
        return { ...srv, imageUrl: defaultImg };
      }
      return srv;
    });
  }

  // Executives
  if (Array.isArray(result.executives)) {
    result.executives = result.executives.map((exec, idx) => {
      let updatedExec = { ...exec };
      const defaultImg = DEFAULT_COMPANY_DATA.executives[idx]?.imageUrl;
      if (!updatedExec.imageUrl && defaultImg) {
        updatedExec.imageUrl = defaultImg;
      }
      if (updatedExec.name && updatedExec.name.replace(/\s+/g, '') === '高橋健太郎') {
        updatedExec.name = '西田 健一';
        updatedExec.nameEn = 'Kenichi Nishida';
      }
      return updatedExec;
    });
  }

  // Partner Hotels
  if (Array.isArray(result.partnerHotels)) {
    result.partnerHotels = result.partnerHotels.map((hotel, idx) => {
      const defaultImg = DEFAULT_COMPANY_DATA.partnerHotels?.[idx]?.imageUrl;
      if (!hotel.imageUrl && defaultImg) {
        return { ...hotel, imageUrl: defaultImg };
      }
      return hotel;
    });
  }

  return result;
}

export default function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showGlobalToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Load data synchronously on first render
  const [companyData, setCompanyData] = useState<CompanyData>(() => {
    try {
      const saved = loadCompanyDataSync();
      if (saved && saved.header && saved.hero && saved.services) {
        if (!saved.siteSettings || saved.siteSettings.isPublished === false) {
          saved.siteSettings = {
            ...(saved.siteSettings || DEFAULT_COMPANY_DATA.siteSettings),
            isPublished: true,
          };
        }
        if (!saved.theme) saved.theme = 'beige';
        if (!saved.partnerHotels || !Array.isArray(saved.partnerHotels) || saved.partnerHotels.length === 0) {
          saved.partnerHotels = DEFAULT_COMPANY_DATA.partnerHotels;
        }
        if (saved.hero) {
          if (saved.hero.backgroundOpacity === undefined || saved.hero.backgroundOpacity <= 65) {
            saved.hero.backgroundOpacity = 90;
          }
          saved.hero.stats = [];
        }
        if (!saved.header.phone || saved.header.phone === '03-5800-1234') {
          saved.header.phone = '080-7741-1887';
        }
        if (saved.contact && (!saved.contact.phone || saved.contact.phone === '03-5800-1234')) {
          saved.contact.phone = '080-7741-1887';
        }
        if (Array.isArray(saved.overview)) {
          saved.overview = saved.overview.map(item => {
            if (item.label === '電話番号' && item.value.includes('03-5800-1234')) {
              return { ...item, value: '080-7741-1887（代表）' };
            }
            return item;
          });
        }
        return sanitizeWithBundledImages(saved);
      }
    } catch (e) {
      console.warn('Failed to load local company profile data:', e);
    }
    return DEFAULT_COMPANY_DATA;
  });

  const [activeEditSection, setActiveEditSection] = useState<string | null>(null);

  // Asynchronously hydrate from IndexedDB to restore high-resolution photos and offline changes
  useEffect(() => {
    loadCompanyDataFromIndexedDB().then((indexedData) => {
      if (indexedData && indexedData.header && indexedData.hero) {
        if (!indexedData.siteSettings || indexedData.siteSettings.isPublished === false) {
          indexedData.siteSettings = {
            ...(indexedData.siteSettings || DEFAULT_COMPANY_DATA.siteSettings),
            isPublished: true,
          };
        }
        if (!indexedData.header.phone || indexedData.header.phone === '03-5800-1234') {
          indexedData.header.phone = '080-7741-1887';
        }
        if (indexedData.contact && (!indexedData.contact.phone || indexedData.contact.phone === '03-5800-1234')) {
          indexedData.contact.phone = '080-7741-1887';
        }
        if (Array.isArray(indexedData.overview)) {
          indexedData.overview = indexedData.overview.map(item => {
            if (item.label === '電話番号' && item.value.includes('03-5800-1234')) {
              return { ...item, value: '080-7741-1887（代表）' };
            }
            return item;
          });
        }
        setCompanyData((prev) => {
          const merged = {
            ...prev,
            ...indexedData,
            hero: {
              ...prev.hero,
              ...indexedData.hero,
              backgroundOpacity: indexedData.hero.backgroundOpacity ?? prev.hero.backgroundOpacity ?? 90,
              stats: [],
            },
          };
          return sanitizeWithBundledImages(merged);
        });
      }
    });
  }, []);

  // Auto-save to both IndexedDB (virtually unlimited quota) and localStorage whenever companyData changes
  useEffect(() => {
    persistCompanyData(companyData);

    // In development/preview environment, auto-sync preview state to codebase
    if (companyData && companyData.header && companyData.hero) {
      try {
        fetch('/api/sync-preview-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(companyData),
        }).catch(() => {});
      } catch {
        // Ignore in environments where /api/sync-preview-data is not available
      }
    }
  }, [companyData]);

  const handlePublishCurrentPreview = async () => {
    try {
      showGlobalToast('プレビューの写真・内容を本番公開用データに固定保存中...');
      const res = await fetch('/api/sync-preview-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(companyData),
      });
      if (res.ok) {
        showGlobalToast('⭐ プレビューの全写真を本番公開用データとして固定保存しました！');
      } else {
        showGlobalToast('⭐ プレビュー状態を保存しました');
      }
    } catch {
      showGlobalToast('⭐ プレビュー状態を保存しました');
    }
  };

  // Synchronize document title with company name
  useEffect(() => {
    if (companyData.header?.companyName) {
      document.title = `${companyData.header.companyName} | 会社紹介`;
    }
  }, [companyData.header?.companyName]);

  const handleUpdateData = (updatedData: CompanyData) => {
    setCompanyData(updatedData);
    showGlobalToast('変更を正常に保存しました');
  };

  const handleUpdateCeoImage = (newImageUrl: string) => {
    setCompanyData((prev) => {
      const updated = { ...prev };
      if (updated.philosophy?.ceoMessage) {
        updated.philosophy = {
          ...updated.philosophy,
          ceoMessage: {
            ...updated.philosophy.ceoMessage,
            authorImageUrl: newImageUrl,
          },
        };
      }
      if (Array.isArray(updated.executives)) {
        updated.executives = updated.executives.map((exec) =>
          exec.id === 'exec-1' || exec.name === '西田 ゆきえ'
            ? { ...exec, imageUrl: newImageUrl }
            : exec
        );
      }
      return updated;
    });
    showGlobalToast('代表者写真を保存しました');
  };

  const handleUpdateHeroImage = (newImageUrl: string, opacity?: number) => {
    setCompanyData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        backgroundImageUrl: newImageUrl,
        backgroundOpacity: opacity !== undefined ? opacity : (prev.hero.backgroundOpacity ?? 90),
      },
    }));
    showGlobalToast('背景写真を保存しました');
  };

  const handleUpdateHero = (updated: Partial<CompanyHero>) => {
    setCompanyData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        ...updated,
      },
    }));
  };

  const handleUpdatePartnerHotel = (index: number, updated: Partial<PartnerHotel>) => {
    setCompanyData((prev) => {
      const hotels = [...(prev.partnerHotels || DEFAULT_COMPANY_DATA.partnerHotels || [])];
      hotels[index] = { ...hotels[index], ...updated };
      return { ...prev, partnerHotels: hotels };
    });
  };

  const handleAddPartnerHotel = (newHotel?: Partial<PartnerHotel>) => {
    setCompanyData((prev) => {
      const hotels = [...(prev.partnerHotels || DEFAULT_COMPANY_DATA.partnerHotels || [])];
      const created: PartnerHotel = {
        id: `hotel-${Date.now()}`,
        name: newHotel?.name || '新規提携ホテル',
        nameEn: newHotel?.nameEn || 'NEW PARTNER HOTEL',
        category: newHotel?.category || '提携ホテル',
        area: newHotel?.area || 'エリア名',
        description: newHotel?.description || '提携内容およびホテル様の特徴をご記入ください。',
        serviceTypes: newHotel?.serviceTypes || ['客室インルーム施術', 'ボディケア'],
        imageUrl: newHotel?.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      };
      return { ...prev, partnerHotels: [...hotels, created] };
    });
  };

  const handleDeletePartnerHotel = (index: number) => {
    setCompanyData((prev) => {
      const hotels = [...(prev.partnerHotels || DEFAULT_COMPANY_DATA.partnerHotels || [])];
      return {
        ...prev,
        partnerHotels: hotels.filter((_, idx) => idx !== index),
      };
    });
  };

  const handleReorderPartnerHotel = (fromIndex: number, toIndex: number) => {
    setCompanyData((prev) => {
      const hotels = [...(prev.partnerHotels || DEFAULT_COMPANY_DATA.partnerHotels || [])];
      if (toIndex < 0 || toIndex >= hotels.length) return prev;
      const [moved] = hotels.splice(fromIndex, 1);
      hotels.splice(toIndex, 0, moved);
      return {
        ...prev,
        partnerHotels: hotels,
      };
    });
  };

  const handleUpdateHotelImage = (index: number, newImageUrl: string) => {
    handleUpdatePartnerHotel(index, { imageUrl: newImageUrl });
    showGlobalToast('提携ホテル写真を保存しました');
  };

  const handleUpdateServiceImage = (index: number, newImageUrl: string) => {
    setCompanyData((prev) => ({
      ...prev,
      services: prev.services.map((srv, idx) =>
        idx === index ? { ...srv, imageUrl: newImageUrl } : srv
      ),
    }));
    showGlobalToast('事業写真を保存しました');
  };

  const handleUpdateExecutiveImage = (index: number, newImageUrl: string) => {
    setCompanyData((prev) => {
      const updatedExecutives = prev.executives.map((exec, idx) =>
        idx === index ? { ...exec, imageUrl: newImageUrl } : exec
      );
      const isCeo = index === 0 || prev.executives[index]?.name === '西田 ゆきえ';
      const updatedPhilosophy = isCeo && prev.philosophy?.ceoMessage
        ? {
            ...prev.philosophy,
            ceoMessage: {
              ...prev.philosophy.ceoMessage,
              authorImageUrl: newImageUrl,
            },
          }
        : prev.philosophy;

      return {
        ...prev,
        philosophy: updatedPhilosophy,
        executives: updatedExecutives,
      };
    });
    showGlobalToast('役員写真を保存しました');
  };

  const handleUpdateExecutiveMember = (index: number, updated: Partial<ExecutiveMember>) => {
    setCompanyData((prev) => {
      const list = [...prev.executives];
      list[index] = { ...list[index], ...updated };

      // Keep Philosophy CEO message in sync if CEO is edited
      const isCeo = index === 0 || list[index]?.name === '西田 ゆきえ';
      const updatedPhilosophy = isCeo && prev.philosophy?.ceoMessage
        ? {
            ...prev.philosophy,
            ceoMessage: {
              ...prev.philosophy.ceoMessage,
              authorName: updated.name || prev.philosophy.ceoMessage.authorName,
              authorImageUrl: updated.imageUrl || prev.philosophy.ceoMessage.authorImageUrl,
            },
          }
        : prev.philosophy;

      return {
        ...prev,
        philosophy: updatedPhilosophy,
        executives: list,
      };
    });
  };

  const handleAddExecutiveMember = (newMember?: Partial<ExecutiveMember>) => {
    setCompanyData((prev) => ({
      ...prev,
      executives: [
        ...prev.executives,
        {
          id: `exec-${Date.now()}`,
          role: newMember?.role || '新規役員',
          name: newMember?.name || '役員氏名',
          nameEn: newMember?.nameEn || 'EXECUTIVE NAME',
          bio: newMember?.bio || '略歴や担当領域の紹介文を記載してください。',
          imageUrl: newMember?.imageUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
        },
      ],
    }));
  };

  const handleDeleteExecutiveMember = (index: number) => {
    setCompanyData((prev) => ({
      ...prev,
      executives: prev.executives.filter((_, idx) => idx !== index),
    }));
  };

  const handleReorderExecutiveMember = (fromIndex: number, toIndex: number) => {
    setCompanyData((prev) => {
      if (toIndex < 0 || toIndex >= prev.executives.length) return prev;
      const list = [...prev.executives];
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      return {
        ...prev,
        executives: list,
      };
    });
  };

  const handleUpdateOverviewItem = (index: number, field: 'label' | 'value', value: string) => {
    setCompanyData((prev) => ({
      ...prev,
      overview: prev.overview.map((item, idx) =>
        idx === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleAddOverviewItem = (newItem?: { label: string; value: string }) => {
    setCompanyData((prev) => ({
      ...prev,
      overview: [
        ...prev.overview,
        {
          id: `ov-${Date.now()}`,
          label: newItem?.label || '新しい項目',
          value: newItem?.value || '',
        },
      ],
    }));
  };

  const handleDeleteOverviewItem = (index: number) => {
    setCompanyData((prev) => ({
      ...prev,
      overview: prev.overview.filter((_, idx) => idx !== index),
    }));
  };

  const handleReorderOverviewItem = (fromIndex: number, toIndex: number) => {
    setCompanyData((prev) => {
      if (toIndex < 0 || toIndex >= prev.overview.length) return prev;
      const list = [...prev.overview];
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      return {
        ...prev,
        overview: list,
      };
    });
  };

  const handleResetData = () => {
    clearAllStorage();
    setCompanyData(DEFAULT_COMPANY_DATA);
    showGlobalToast('初期データにリセットしました');
  };

  const handleChangeTheme = (theme: ThemeColor) => {
    setCompanyData(prev => ({ ...prev, theme }));
  };

  const isInIframe = typeof window !== 'undefined' && window.self !== window.top;

  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('atlas_admin_unlocked') === 'true';
    } catch {
      return false;
    }
  });

  const handleAdminUnlock = () => {
    setIsAdminUnlocked(true);
    try {
      sessionStorage.setItem('atlas_admin_unlocked', 'true');
    } catch {}
    showGlobalToast('関係者アクセスを認証しました');
  };

  const handleAdminLock = () => {
    setIsAdminUnlocked(false);
    try {
      sessionStorage.removeItem('atlas_admin_unlocked');
    } catch {}
    showGlobalToast('サイトを非公開（準備中画面）でロックしました');
  };

  const handleUpdateSiteSettings = (newSettings: SiteSettings) => {
    setCompanyData((prev) => ({
      ...prev,
      siteSettings: newSettings,
    }));
    showGlobalToast(
      newSettings.isPublished
        ? 'サイトを「公開中」に設定しました'
        : 'サイトを「非公開（準備中）」に設定しました'
    );
  };

  const isPublished = companyData.siteSettings?.isPublished !== false;

  // 外部からのアクセス時（iframe外 かつ パスコード未認証時）に非公開設定なら準備中画面で完全遮断
  if (!isPublished && !isInIframe && !isAdminUnlocked) {
    return (
      <MaintenanceScreen
        data={companyData}
        onAdminUnlock={handleAdminUnlock}
        onPublishSite={() =>
          handleUpdateSiteSettings({
            ...(companyData.siteSettings || DEFAULT_COMPANY_DATA.siteSettings),
            isPublished: true,
          })
        }
      />
    );
  }

  const themeCfg = THEME_CONFIGS[companyData.theme] || THEME_CONFIGS.beige;

  return (
    <div className={`min-h-screen flex flex-col ${themeCfg.pageBg || 'bg-slate-50'} text-slate-800 antialiased font-sans transition-colors duration-300`}>
      {/* Private Mode Banner (Visible to admin/previewer when site is unpublished) */}
      {!isPublished && (
        <aside aria-label="非公開モードステータス" className="bg-rose-950 text-rose-100 border-b border-rose-800/80 px-4 py-2 text-xs shadow-md">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-rose-900 border border-rose-700 text-rose-300 font-bold flex items-center gap-1.5 shrink-0">
                <Lock className="w-3 h-3 text-rose-400" />
                <span>非公開モード作動中</span>
              </span>
              <span className="text-slate-200">
                外部（スマートフォンや一般来訪者）は「準備中・非公開画面」で遮断されています。現在【{isInIframe ? 'AI Studioプレビュー' : '関係者認証'}】として表示しています。
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleUpdateSiteSettings({ ...(companyData.siteSettings || { isPublished: true }), isPublished: true })}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-xs"
              >
                一般公開する
              </button>
              {!isInIframe && (
                <button
                  onClick={handleAdminLock}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors cursor-pointer"
                  title="認証を解除して準備中画面に戻る"
                >
                  非公開画面に戻る
                </button>
              )}
            </div>
          </div>
        </aside>
      )}

      {/* Corporate Sticky Header */}
      <Header
        data={companyData}
      />

      <main className="flex-grow">
        {/* Hero Section with Key Metrics */}
        <HeroSection
          hero={companyData.hero}
          theme={companyData.theme}
        />

        {/* Corporate Philosophy & CEO Message */}
        <PhilosophySection
          philosophy={companyData.philosophy}
          theme={companyData.theme}
        />

        {/* Business Domains & Services */}
        <ServicesSection
          services={companyData.services}
          theme={companyData.theme}
        />

        {/* Partner Hotels & Accommodations (Only editable section) */}
        <PartnerHotelsSection
          hotels={companyData.partnerHotels || DEFAULT_COMPANY_DATA.partnerHotels || []}
          theme={companyData.theme}
          onEdit={() => setActiveEditSection('hotels')}
          onUpdateHotel={handleUpdatePartnerHotel}
          onAddHotel={handleAddPartnerHotel}
          onDeleteHotel={handleDeletePartnerHotel}
          onReorderHotel={handleReorderPartnerHotel}
          onUpdateHotelImage={handleUpdateHotelImage}
        />

        {/* Corporate Overview Specification Table */}
        <OverviewSection
          overview={companyData.overview}
          theme={companyData.theme}
        />

        {/* News & Announcements */}
        <NewsSection
          news={companyData.news}
          theme={companyData.theme}
        />

        {/* Executive Leadership */}
        <ExecutivesSection
          executives={companyData.executives}
          theme={companyData.theme}
        />

        {/* Location & Access */}
        <AccessSection
          access={companyData.access}
          theme={companyData.theme}
        />

        {/* Contact & Inquiries */}
        <ContactSection
          contact={companyData.contact}
          theme={companyData.theme}
        />
      </main>

      {/* 11. Corporate Footer */}
      <Footer
        header={companyData.header}
        access={companyData.access}
        theme={companyData.theme}
      />

      {/* 12. Modal Section Editor */}
      {activeEditSection && (
        <EditModal
          initialSection={activeEditSection}
          data={companyData}
          onSave={(updated) => {
            handleUpdateData(updated);
          }}
          onClose={() => setActiveEditSection(null)}
        />
      )}

      {/* Floating Save Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900/95 text-white text-xs font-bold shadow-2xl backdrop-blur-md border border-slate-700/80 animate-fade-in pointer-events-none">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
