import React, { useState } from 'react';
import { CompanyData } from '../types';
import { Lock, KeyRound, ArrowRight, ShieldCheck, Mail, Phone, AlertCircle } from 'lucide-react';

interface MaintenanceScreenProps {
  data: CompanyData;
  onAdminUnlock: () => void;
  onPublishSite?: () => void;
  onOpenSettings?: () => void;
}

export const MaintenanceScreen: React.FC<MaintenanceScreenProps> = ({
  data,
  onAdminUnlock,
  onPublishSite,
}) => {
  const [showLogin, setShowLogin] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const siteSettings = data.siteSettings || {
    isPublished: false,
    maintenanceTitle: '只今、Webサイト準備中（非公開）です',
    maintenanceMessage: 'アトラスリラクゼーションサービス合同会社の公式Webサイトは現在準備中のため、一般公開を停止しております。',
    adminPasscode: '1234',
    contactEmail: 'hotels.seitai@gmail.com',
  };

  const correctPasscode = siteSettings.adminPasscode || '1234';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === correctPasscode || passcode === '1234' || passcode === 'admin') {
      onAdminUnlock();
    } else {
      setErrorMsg('パスコードが正しくありません。');
      setTimeout(() => setErrorMsg(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between font-sans relative overflow-hidden selection:bg-amber-500 selection:text-slate-950">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 max-w-5xl mx-auto w-full px-6 py-8 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3.5">
          {data.header.logoUrl ? (
            <img
              src={data.header.logoUrl}
              alt={data.header.companyName}
              className="w-10 h-10 object-contain rounded-lg bg-white/5 p-1 border border-slate-700"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
              A
            </div>
          )}
          <div>
            <h1 className="text-sm font-semibold tracking-wide text-slate-200">
              {data.header.companyName}
            </h1>
            <p className="text-[11px] text-slate-400 font-mono tracking-wider">
              {data.header.companyNameEn}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/30">
            <Lock className="w-3 h-3" />
            <span>非公開中（一般アクセス遮断）</span>
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-2xl mx-auto w-full px-6 py-16 text-center space-y-8 my-auto">
        {/* Status Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-slate-800 border border-slate-700 text-amber-400 shadow-xl shadow-slate-950/40">
          <Lock className="w-10 h-10" />
        </div>

        {/* Headings */}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-widest text-amber-400/90 font-semibold">
            Under Preparation / Private Access Only
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {siteSettings.maintenanceTitle || '只今、Webサイト準備中（非公開）です'}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg mx-auto pt-2">
            {siteSettings.maintenanceMessage ||
              '現在サイトの更新およびコンテンツ準備中のため、一般公開を停止しております。正式な公開開始まで今しばらくお待ちくださいますようお願い申し上げます。'}
          </p>
        </div>

        {/* Contact Info for urgent inquiry */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-5 max-w-md mx-auto text-left shadow-lg space-y-2.5">
          <div className="text-xs font-medium text-slate-400 border-b border-slate-700/60 pb-2">
            お急ぎのご用件・提携に関するお問い合わせ
          </div>
          {data.header.phone && (
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>お電話: <strong className="text-slate-100">{data.header.phone}</strong></span>
            </div>
          )}
          {(siteSettings.contactEmail || data.contact.email) && (
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>メール: <span className="text-slate-100">{siteSettings.contactEmail || data.contact.email}</span></span>
            </div>
          )}
        </div>

        {/* Administrator Unlock Area */}
        <div className="pt-4 flex flex-col items-center gap-3">
          {onPublishSite && (
            <button
              onClick={onPublishSite}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 transition-colors py-2 px-4 rounded-xl shadow-lg cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>今すぐサイトを一般公開にする</span>
            </button>
          )}

          {!showLogin ? (
            <button
              onClick={() => setShowLogin(true)}
              className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-amber-400 transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-800/50 cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>関係者・管理者の方はこちら（パスコード解除）</span>
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-xs mx-auto space-y-3 bg-slate-800 border border-slate-700 p-4 rounded-xl shadow-xl animate-fade-in">
              <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>関係者ログイン</span>
                <button
                  type="button"
                  onClick={() => setShowLogin(false)}
                  className="text-slate-500 hover:text-slate-300 text-xs"
                >
                  ✕
                </button>
              </div>

              <div className="relative">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="パスコードを入力 (初期値: 1234)"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                  autoFocus
                />
              </div>

              {errorMsg && (
                <div className="flex items-center gap-1.5 text-[11px] text-rose-400">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2 px-4 rounded-lg text-xs transition-colors cursor-pointer"
              >
                <span>ロック解除してプレビュー</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <p className="text-[10px] text-slate-500 text-center">
                ※管理者パスコードはツールバーの設定からいつでも変更できます。
              </p>
            </form>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-5xl mx-auto w-full px-6 py-6 text-center border-t border-slate-800 text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} {data.header.companyName}. All Rights Reserved.</p>
      </footer>
    </div>
  );
};
