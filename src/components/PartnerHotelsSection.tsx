import React, { useState, useRef } from 'react';
import { PartnerHotel, ThemeColor } from '../types';
import { THEME_CONFIGS } from '../utils/theme';
import { 
  Building2, 
  Sparkles, 
  MapPin, 
  Edit3, 
  Plus, 
  Trash2, 
  Check, 
  ChevronUp, 
  ChevronDown, 
  Camera, 
  BedDouble, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { compressImageFile } from '../utils/imageUtils';
import fallbackHotelImg from '../assets/images/hotel_room_service_1788847555626.jpg';

interface PartnerHotelsSectionProps {
  hotels: PartnerHotel[];
  theme: ThemeColor;
  onEdit: () => void;
  onUpdateHotel?: (index: number, updated: Partial<PartnerHotel>) => void;
  onAddHotel?: (newHotel?: Partial<PartnerHotel>) => void;
  onDeleteHotel?: (index: number) => void;
  onReorderHotel?: (fromIndex: number, toIndex: number) => void;
  onUpdateHotelImage?: (index: number, newImageUrl: string) => void;
}

export const PartnerHotelsSection: React.FC<PartnerHotelsSectionProps> = ({
  hotels = [],
  theme,
  onEdit,
  onUpdateHotel,
  onAddHotel,
  onDeleteHotel,
  onReorderHotel,
  onUpdateHotelImage,
}) => {
  const themeCfg = THEME_CONFIGS[theme] || THEME_CONFIGS.navy;
  const [isInlineEditing, setIsInlineEditing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'national' | 'city' | 'onsen'>('all');
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const isEditing = isInlineEditing;

  const handleFileUpload = async (index: number, file: File) => {
    try {
      const compressed = await compressImageFile(file, 1200, 0.82);
      onUpdateHotelImage?.(index, compressed);
    } catch (err) {
      console.error('Failed to compress hotel image:', err);
    }
  };

  const filteredHotels = hotels.filter((hotel) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'national') return hotel.category.includes('全国') || hotel.area.includes('全国');
    if (selectedFilter === 'city') return hotel.category.includes('シティ') || hotel.category.includes('ビジネス') || hotel.category.includes('プレミアム');
    if (selectedFilter === 'onsen') return hotel.category.includes('温泉') || hotel.category.includes('旅館');
    return true;
  });

  return (
    <section id="hotels" className={`py-24 ${themeCfg.sectionMainBg || 'bg-[#faf7f2]'} text-slate-800 border-b ${themeCfg.borderColor || 'border-slate-200/80'} scroll-mt-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border ${themeCfg.badge}`}>
              <BedDouble className="w-3.5 h-3.5" />
              <span>PARTNER HOTELS & RESORTS</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${themeCfg.headingText || 'text-slate-900'} font-mincho`}>
              提携先ホテル・宿泊施設一覧
            </h2>
            <p className={`${themeCfg.subheadingText || 'text-slate-600'} text-sm sm:text-base leading-relaxed`}>
              全国展開の大手ホテルチェーンから丹沢名湯の老舗温泉旅館まで、確かなパートナーシップのもと上質な客室インルーム施術・館内リラクゼーションをお届けしています。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsInlineEditing(false)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>編集を完了する</span>
                </button>
                <button
                  type="button"
                  onClick={onEdit}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-300 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>モーダル編集</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsInlineEditing(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300 shadow-xs transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-700" />
                <span>提携ホテル一覧を編集</span>
              </button>
            )}
          </div>
        </div>

        {/* Editing Banner */}
        {isEditing && (
          <div className="mb-8 p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>提携ホテルの直接編集モード（ホテル名、種別、地域、説明、写真、提携内容を直接編集できます）</span>
              </div>
              <button
                type="button"
                onClick={() => onAddHotel?.({
                  name: '新規提携ホテル',
                  nameEn: 'NEW PARTNER HOTEL',
                  category: '提携ホテル',
                  area: 'エリア名',
                  description: '提携内容およびホテル様の特徴をご記入ください。',
                  serviceTypes: ['客室インルーム施術', 'ボディケア'],
                  imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
                })}
                className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg ${themeCfg.secondaryBg} text-xs font-bold shadow-xs transition-colors cursor-pointer`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>新しいホテルを追加</span>
              </button>
            </div>
          </div>
        )}

        {/* Filter Navigation (when not editing) */}
        {!isEditing && (
          <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-slate-200/80 pb-4">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedFilter === 'all'
                  ? `${themeCfg.primaryBg} text-white shadow-xs`
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              すべて ({hotels.length}件)
            </button>
            <button
              onClick={() => setSelectedFilter('national')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedFilter === 'national'
                  ? `${themeCfg.primaryBg} text-white shadow-xs`
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              全国チェーン
            </button>
            <button
              onClick={() => setSelectedFilter('city')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedFilter === 'city'
                  ? `${themeCfg.primaryBg} text-white shadow-xs`
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              シティ・ビジネス
            </button>
            <button
              onClick={() => setSelectedFilter('onsen')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedFilter === 'onsen'
                  ? `${themeCfg.primaryBg} text-white shadow-xs`
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              温泉旅館・リゾート
            </button>
          </div>
        )}

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(isEditing ? hotels : filteredHotels).map((hotel, idx) => {
            const rawIndex = hotels.findIndex((h) => h.id === hotel.id || h.name === hotel.name);
            const actualIdx = rawIndex !== -1 ? rawIndex : idx;

            return (
              <div
                key={hotel.id || idx}
                className={`bg-white border ${themeCfg.borderColor || 'border-slate-200/90'} rounded-2xl overflow-hidden shadow-xs hover:shadow-md ${themeCfg.cardBorderHover} transition-all flex flex-col group`}
              >
                {/* Hotel Image Card Top */}
                <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                  <img
                    src={hotel.imageUrl || fallbackHotelImg}
                    alt={hotel.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback image on error
                      const target = e.target as HTMLImageElement;
                      if (target.src !== fallbackHotelImg) {
                        target.src = fallbackHotelImg;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none"></div>

                  {/* Badges on Image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="px-2.5 py-1 rounded-md bg-slate-950/75 backdrop-blur-xs font-semibold text-[11px] border border-white/20">
                      {hotel.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-200 bg-slate-950/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{hotel.area}</span>
                    </span>
                  </div>

                  {/* Photo Change Button */}
                  <div className="absolute top-3 right-3 z-10">
                    <button
                      type="button"
                      onClick={() => fileInputRefs.current[actualIdx]?.click()}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-900 text-white text-[11px] font-medium border border-white/20 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-md"
                    >
                      <Camera className="w-3.5 h-3.5 text-amber-300" />
                      <span>写真を変更</span>
                    </button>
                  </div>

                  <input
                    ref={(el) => { fileInputRefs.current[actualIdx] = el; }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) handleFileUpload(actualIdx, e.target.files[0]);
                    }}
                  />
                </div>

                {/* Card Body */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  {isEditing ? (
                    /* EDITING FIELDS */
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b">
                        <span className={`text-xs font-bold ${themeCfg.accentText}`}>ホテル #{actualIdx + 1}</span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={actualIdx === 0}
                            onClick={() => onReorderHotel?.(actualIdx, actualIdx - 1)}
                            className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer"
                            title="上に移動"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            disabled={actualIdx === hotels.length - 1}
                            onClick={() => onReorderHotel?.(actualIdx, actualIdx + 1)}
                            className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer"
                            title="下に移動"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteHotel?.(actualIdx)}
                            className="p-1 text-rose-500 hover:text-rose-700 cursor-pointer ml-1"
                            title="このホテルを削除"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-1">ホテル名</label>
                        <input
                          type="text"
                          value={hotel.name}
                          onChange={(e) => onUpdateHotel?.(actualIdx, { name: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs font-bold border rounded-lg bg-slate-50"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-1">種別・カテゴリ</label>
                          <input
                            type="text"
                            value={hotel.category}
                            onChange={(e) => onUpdateHotel?.(actualIdx, { category: e.target.value })}
                            className="w-full px-2 py-1 text-xs border rounded-lg bg-slate-50"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-1">エリア</label>
                          <input
                            type="text"
                            value={hotel.area}
                            onChange={(e) => onUpdateHotel?.(actualIdx, { area: e.target.value })}
                            className="w-full px-2 py-1 text-xs border rounded-lg bg-slate-50"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-1">提携概要・紹介文</label>
                        <textarea
                          rows={3}
                          value={hotel.description}
                          onChange={(e) => onUpdateHotel?.(actualIdx, { description: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs border rounded-lg bg-slate-50"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-1">提供サービス（カンマ区切り）</label>
                        <input
                          type="text"
                          value={hotel.serviceTypes?.join(', ') || ''}
                          onChange={(e) => onUpdateHotel?.(actualIdx, { 
                            serviceTypes: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                          })}
                          placeholder="客室インルーム施術, ボディケア, アロマ"
                          className="w-full px-2 py-1 text-xs border rounded-lg bg-slate-50"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-1">画像URL (直接指定)</label>
                        <input
                          type="text"
                          value={hotel.imageUrl || ''}
                          onChange={(e) => onUpdateHotel?.(actualIdx, { imageUrl: e.target.value })}
                          placeholder="https://..."
                          className="w-full px-2 py-1 text-xs border rounded-lg bg-slate-50"
                        />
                      </div>
                    </div>
                  ) : (
                    /* VIEW MODE */
                    <>
                      <div className="space-y-2">
                        <div className="flex items-baseline justify-between gap-2">
                          <h3 className={`text-lg font-bold ${themeCfg.cardTitleText || 'text-slate-900'} font-mincho`}>
                            {hotel.name}
                          </h3>
                        </div>
                        {hotel.nameEn && (
                          <div className="text-[11px] font-medium text-slate-400 font-sans tracking-wide">
                            {hotel.nameEn}
                          </div>
                        )}
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-1">
                          {hotel.description}
                        </p>
                      </div>

                      {/* Service tags */}
                      {hotel.serviceTypes && hotel.serviceTypes.length > 0 && (
                        <div className="pt-3 border-t border-slate-100">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                            提携サービス内容
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {hotel.serviceTypes.map((type, tIdx) => (
                              <span
                                key={tIdx}
                                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200/80"
                              >
                                <CheckCircle2 className={`w-3 h-3 ${themeCfg.accentText}`} />
                                <span>{type}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Add Hotel Row in Edit Mode */}
        {isEditing && (
          <div className="mt-8 p-4 bg-white border border-slate-200 rounded-xl text-center">
            <button
              type="button"
              onClick={() => onAddHotel?.({
                name: '新しい提携先ホテル',
                nameEn: 'NEW PARTNER HOTEL',
                category: '提携ホテル',
                area: 'エリア名',
                description: '提携内容およびホテル様の特徴をご記入ください。',
                serviceTypes: ['客室インルーム施術', 'もみほぐし整体'],
                imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
              })}
              className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg ${theme === 'beige' ? 'bg-[#9c7141] hover:bg-[#855e34]' : 'bg-blue-600 hover:bg-blue-500'} text-white text-xs font-bold transition-all shadow-xs cursor-pointer`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>新しい提携ホテルを追加する</span>
            </button>
          </div>
        )}

        {/* Partnership Inquiry Callout */}
        <div className={`mt-16 p-8 sm:p-10 rounded-2xl ${
          theme === 'beige'
            ? 'bg-gradient-to-r from-[#fbf6ef] via-[#f7f0e5] to-[#f2e7d6] border border-[#e4d6c4] text-[#3d2f22] shadow-xs'
            : 'bg-gradient-to-r from-slate-900 to-blue-950 text-white shadow-xl'
        } flex flex-col md:flex-row items-center justify-between gap-6`}>
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <span className={`text-xs font-bold ${theme === 'beige' ? 'text-[#9c7141]' : 'text-blue-300'} tracking-wider uppercase`}>
              FOR HOTEL OWNERS & OPERATORS
            </span>
            <h3 className={`text-xl sm:text-2xl font-bold ${theme === 'beige' ? 'text-[#2d2116]' : 'text-white'} font-mincho`}>
              新規ホテル・宿泊施設様との業務提携のご案内
            </h3>
            <p className={`text-xs sm:text-sm ${theme === 'beige' ? 'text-[#675646]' : 'text-slate-300'} leading-relaxed font-normal`}>
              インルーム施術による付加価値向上と顧客満足度アップ、新たな収益モデルの構築をトータルサポート。厳格なマナー教育を受けたセラピストを派遣いたします。
            </p>
          </div>
          <a
            href="#contact"
            className={`shrink-0 px-6 py-3.5 rounded-lg ${
              theme === 'beige'
                ? 'bg-[#9c7141] hover:bg-[#855e34] text-white shadow-md'
                : 'bg-blue-500 hover:bg-blue-400 text-white shadow-lg'
            } font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2`}
          >
            <span>提携に関するお問い合わせ</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
