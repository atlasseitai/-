import React, { useState } from 'react';
import { CompanyData, PartnerHotel } from '../types';
import { 
  X, Check, Save, Plus, Trash2, BedDouble, 
  ChevronUp, ChevronDown, ExternalLink, Image as ImageIcon, Upload 
} from 'lucide-react';
import { compressImageFile } from '../utils/imageUtils';

interface EditModalProps {
  initialSection: string;
  data: CompanyData;
  onSave: (updatedData: CompanyData) => void;
  onClose: () => void;
}

export const EditModal: React.FC<EditModalProps> = ({
  data,
  onSave,
  onClose,
}) => {
  const [hotels, setHotels] = useState<PartnerHotel[]>(() => 
    JSON.parse(JSON.stringify(data.partnerHotels || []))
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveCurrent = () => {
    onSave({
      ...data,
      partnerHotels: hotels,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleSaveAndClose = () => {
    onSave({
      ...data,
      partnerHotels: hotels,
    });
    onClose();
  };

  const handleClose = () => {
    onSave({
      ...data,
      partnerHotels: hotels,
    });
    onClose();
  };

  const updateHotel = <K extends keyof PartnerHotel>(index: number, field: K, val: PartnerHotel[K]) => {
    setHotels(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: val };
      return next;
    });
  };

  const addHotel = () => {
    const newHotel: PartnerHotel = {
      id: `hotel-${Date.now()}`,
      name: '新規提携ホテル',
      nameEn: 'NEW PARTNER HOTEL',
      category: 'シティホテル',
      area: '東京都港区',
      description: '提携内容およびホテル様の特徴をご記入ください。',
      serviceTypes: ['客室インルーム施術', 'ボディケア', 'アロマセラピー'],
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      roomCount: '全200室',
      note: '提携施設',
      websiteUrl: '',
    };
    setHotels(prev => [...prev, newHotel]);
  };

  const deleteHotel = (index: number) => {
    if (confirm('この提携先ホテルを削除しますか？')) {
      setHotels(prev => prev.filter((_, i) => i !== index));
    }
  };

  const moveHotel = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= hotels.length) return;
    setHotels(prev => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  };

  const handleImageFile = async (index: number, file: File) => {
    try {
      const compressed = await compressImageFile(file, 1000, 0.82);
      updateHotel(index, 'imageUrl', compressed);
    } catch (err) {
      console.error('Failed to compress image:', err);
    }
  };

  const quickPresets = [
    { label: '高級ホテル客室', url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80' },
    { label: 'シティアパートメント', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80' },
    { label: 'ラグジュアリースイート', url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80' },
    { label: '丹沢名湯和室', url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-fade-in">
        
        {/* Modal Top Header */}
        <div className="bg-slate-900 text-white p-5 px-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-sm">
              <BedDouble className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>提携先ホテル一覧の編集</span>
                <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700">
                  全{hotels.length}施設
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                提携先ホテル・宿泊施設の追加・編集・並び替え・写真変更を行えます
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {savedSuccess && (
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-bold animate-pulse">
                <Check className="w-4 h-4" /> 保存しました
              </span>
            )}

            <button
              type="button"
              onClick={handleSaveCurrent}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>変更を保存</span>
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              title="閉じる"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">登録済みホテル・宿泊施設</h3>
              <p className="text-xs text-slate-500">上へ/下へボタンで表示順序を調整できます</p>
            </div>
            <button
              type="button"
              onClick={addHotel}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>新しい提携先を追加</span>
            </button>
          </div>

          <div className="space-y-6">
            {hotels.map((hotel, idx) => (
              <div 
                key={hotel.id || idx} 
                className="p-5 sm:p-6 border border-slate-200 rounded-xl bg-slate-50 space-y-4 relative shadow-2xs"
              >
                {/* Row Header */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-slate-900 text-white text-xs font-bold font-mono">
                      #{idx + 1}
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {hotel.name || '名称未設定'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveHotel(idx, idx - 1)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-25 cursor-pointer rounded hover:bg-slate-200 transition-colors"
                      title="上に移動"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === hotels.length - 1}
                      onClick={() => moveHotel(idx, idx + 1)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-25 cursor-pointer rounded hover:bg-slate-200 transition-colors"
                      title="下に移動"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteHotel(idx)}
                      className="ml-2 inline-flex items-center gap-1 px-2.5 py-1 rounded text-rose-600 hover:bg-rose-50 text-xs font-semibold cursor-pointer transition-colors"
                      title="このホテルを削除"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>削除</span>
                    </button>
                  </div>
                </div>

                {/* Main Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">ホテル・施設名称</label>
                    <input
                      type="text"
                      value={hotel.name}
                      onChange={(e) => updateHotel(idx, 'name', e.target.value)}
                      placeholder="例: ホテルマイステイズプレミア赤坂"
                      className="w-full px-3 py-1.5 text-xs font-bold border border-slate-300 rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">英語表記 / アルファベット</label>
                    <input
                      type="text"
                      value={hotel.nameEn || ''}
                      onChange={(e) => updateHotel(idx, 'nameEn', e.target.value)}
                      placeholder="HOTEL MYSTAYS PREMIER AKASAKA"
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">種別・カテゴリ</label>
                    <input
                      type="text"
                      value={hotel.category}
                      onChange={(e) => updateHotel(idx, 'category', e.target.value)}
                      placeholder="例: シティホテル / 温泉旅館"
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">所在地・エリア</label>
                    <input
                      type="text"
                      value={hotel.area}
                      onChange={(e) => updateHotel(idx, 'area', e.target.value)}
                      placeholder="例: 東京都港区赤坂"
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">客室規模・部屋数</label>
                    <input
                      type="text"
                      value={hotel.roomCount || ''}
                      onChange={(e) => updateHotel(idx, 'roomCount', e.target.value)}
                      placeholder="例: 総客室数: 450室"
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">特記事項・注記バッジ</label>
                    <input
                      type="text"
                      value={hotel.note || ''}
                      onChange={(e) => updateHotel(idx, 'note', e.target.value)}
                      placeholder="例: 全国38店舗展開 / 創業大正七年"
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">公式サイトURL（任意）</label>
                    <input
                      type="text"
                      value={hotel.websiteUrl || ''}
                      onChange={(e) => updateHotel(idx, 'websiteUrl', e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">提携概要・紹介文</label>
                  <textarea
                    rows={2}
                    value={hotel.description}
                    onChange={(e) => updateHotel(idx, 'description', e.target.value)}
                    placeholder="提携内容やホテルの特色を記載"
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white leading-relaxed"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">提供サービス種別（カンマ区切り）</label>
                  <input
                    type="text"
                    value={(hotel.serviceTypes || []).join(', ')}
                    onChange={(e) => updateHotel(idx, 'serviceTypes', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
                    placeholder="客室インルーム施術, アロママッサージ, ボディケア"
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                  />
                </div>

                {/* Photo Upload & Preview */}
                <div className="space-y-1.5 pt-2 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-700">ホテル客室・施設写真</label>
                    {hotel.imageUrl && (
                      <button
                        type="button"
                        onClick={() => updateHotel(idx, 'imageUrl', '')}
                        className="text-[10px] text-rose-500 hover:text-rose-700 cursor-pointer"
                      >
                        写真を削除
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    {hotel.imageUrl ? (
                      <div className="relative w-20 h-16 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0 shadow-xs">
                        <img 
                          src={hotel.imageUrl} 
                          alt="Preview" 
                          className="w-full h-full object-cover object-center" 
                          referrerPolicy="no-referrer" 
                        />
                      </div>
                    ) : (
                      <div className="relative w-20 h-16 rounded-lg border border-dashed border-slate-300 bg-white shrink-0 flex flex-col items-center justify-center text-center p-1 text-slate-400">
                        <ImageIcon className="w-5 h-5 opacity-60 mb-0.5" />
                        <span className="text-[9px]">画像なし</span>
                      </div>
                    )}
                    <div className="flex-1 w-full space-y-2">
                      <input
                        type="text"
                        placeholder="https://..."
                        value={hotel.imageUrl || ''}
                        onChange={(e) => updateHotel(idx, 'imageUrl', e.target.value)}
                        className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded bg-white font-mono"
                      />
                      <div className="flex flex-wrap items-center gap-2">
                        <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 text-[11px] font-medium cursor-pointer transition-colors">
                          <Upload className="w-3.5 h-3.5 text-blue-600" />
                          <span>端末から写真を選択</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) handleImageFile(idx, e.target.files[0]);
                            }}
                          />
                        </label>
                        {quickPresets.map((opt, pIdx) => (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => updateHotel(idx, 'imageUrl', opt.url)}
                            className="px-2 py-1 rounded text-[10px] font-medium border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 cursor-pointer"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 px-6 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            キャンセルして閉じる
          </button>

          <button
            type="button"
            onClick={handleSaveAndClose}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>変更を保存して完了</span>
          </button>
        </div>

      </div>
    </div>
  );
};
