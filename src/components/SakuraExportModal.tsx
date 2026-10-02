import React, { useState } from 'react';
import { 
  X, 
  Download, 
  CheckCircle2, 
  Server, 
  Globe, 
  Copy, 
  Check, 
  FileCode, 
  FolderArchive, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { 
  downloadSakuraDeploymentZip, 
  SAKURA_WORDPRESS_STEPS, 
  WORDPRESS_EMBED_HTML_SNIPPET 
} from '../utils/sakuraExporter';

interface SakuraExportModalProps {
  onClose: () => void;
  onToast: (msg: string) => void;
}

export const SakuraExportModal: React.FC<SakuraExportModalProps> = ({ onClose, onToast }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'sakura' | 'wordpress' | 'files'>('sakura');

  const handleDownload = async () => {
    setIsDownloading(true);
    setStatusText('ZIPパッケージを準備中...');
    try {
      const ok = await downloadSakuraDeploymentZip((msg) => setStatusText(msg));
      if (ok) {
        setDownloadSuccess(true);
        onToast('ZIPパッケージのダウンロードを開始しました！');
        setTimeout(() => setDownloadSuccess(false), 4000);
      } else {
        onToast('ダウンロードに失敗しました。再試行してください。');
      }
    } catch {
      onToast('ダウンロード処理中にエラーが発生しました');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(WORDPRESS_EMBED_HTML_SNIPPET);
    setCopiedCode(true);
    onToast('WordPress埋め込みHTMLコードをクリップボードにコピーしました');
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 text-white px-6 py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg text-white">
                  さくらインターネット × WordPress 公開パッケージ
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-stone-950">
                  さくらサーバー・WordPress対応
                </span>
              </div>
              <p className="text-xs text-stone-300 mt-0.5">
                さくらインターネットの「ファイルマネージャー」でそのままアップロード・即時公開できます
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="閉じる"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Hero Box: One-Click Download */}
        <div className="bg-gradient-to-b from-amber-50/80 to-white border-b border-amber-100/80 p-5 sm:p-6 shrink-0">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>現在プレビュー中の実写写真（代表・サロン・ホテル・背景等）をそのまま完全収録</span>
              </div>
              <h4 className="font-bold text-slate-900 text-base sm:text-lg mt-1">
                公開用ZIPファイル（atlas-relaxation-sakura-wordpress.zip）
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                プレビュー表示通りの本物写真・HTML・CSS・JS・専用.htaccess・WordPress埋め込みコードをすべてパッケージ化
              </p>
            </div>

            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer shrink-0 ${
                downloadSuccess
                  ? 'bg-emerald-600 text-white shadow-emerald-200'
                  : 'bg-stone-900 hover:bg-stone-800 text-white hover:shadow-lg active:scale-98'
              }`}
            >
              {isDownloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{statusText || '生成中...'}</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                  <span>ダウンロード完了！</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 text-amber-400" />
                  <span>ZIPをダウンロード (約6MB・実写収録版)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50 shrink-0">
          <button
            onClick={() => setActiveTab('sakura')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'sakura'
                ? 'border-amber-600 text-amber-900 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>さくらファイルマネージャー設置手順</span>
          </button>
          <button
            onClick={() => setActiveTab('wordpress')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'wordpress'
                ? 'border-amber-600 text-amber-900 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>WordPress連携方法</span>
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'files'
                ? 'border-amber-600 text-amber-900 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FolderArchive className="w-4 h-4" />
            <span>同梱ファイル一覧</span>
          </button>
        </div>

        {/* Tab Content (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow bg-white">
          
          {/* TAB 1: Sakura File Manager Steps */}
          {activeTab === 'sakura' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 text-xs text-amber-950 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong className="text-amber-900 text-sm">【重要】さくらの項目名は「展開」ではなく『リモートで解凍』です</strong><br />
                  さくらインターネットのファイルマネージャー上では、「展開」という言葉ではなく<strong>「リモートで解凍」</strong>というメニュー名で表示されます。一覧でZIPファイルを選択し、右クリックまたは上部の「操作」メニューから<strong>「リモートで解凍」</strong>をお選びください。
                </div>
              </div>

              {/* Steps list */}
              <div className="space-y-3">
                {SAKURA_WORDPRESS_STEPS.map((item) => (
                  <div 
                    key={item.step} 
                    className="flex items-start gap-3.5 p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-stone-900 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                      {item.step}
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 text-sm">{item.title}</h5>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Fallback Option */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-xs sm:text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>「リモートで解凍」が見当たらない・うまくいかない場合の解決策（PCで解凍）</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  サーバー側で解凍機能を使わなくても、<strong>パソコン側で先に解凍したファイルを丸ごとアップロード</strong>すれば、確実に設置・公開が完了します。
                </p>
                <div className="bg-white rounded-lg p-3 text-xs text-stone-700 space-y-2 border border-stone-200">
                  <div className="font-semibold text-stone-900">手順：</div>
                  <ol className="list-decimal list-inside space-y-1.5 text-stone-600 pl-0.5">
                    <li>ダウンロードしたZIPファイルをパソコン上で右クリックし<strong>「すべて展開」</strong>（Macはダブルクリック）。</li>
                    <li>展開されたフォルダの中に <code className="font-mono bg-stone-100 px-1.5 py-0.5 rounded text-stone-800">index.html</code>、<code className="font-mono bg-stone-100 px-1.5 py-0.5 rounded text-stone-800">assets</code>、<code className="font-mono bg-stone-100 px-1.5 py-0.5 rounded text-stone-800">images</code>、<code className="font-mono bg-stone-100 px-1.5 py-0.5 rounded text-stone-800">hotels</code>、<code className="font-mono bg-stone-100 px-1.5 py-0.5 rounded text-stone-800">.htaccess</code> が並んでいます。</li>
                    <li>さくらのファイルマネージャーで作成したフォルダ（例: <code className="font-mono bg-stone-100 px-1.5 py-0.5 rounded text-stone-800">relaxation</code>）を開き、これらの中身ファイルをそのままドラッグ＆ドロップ（またはファイル追加）でアップロードします。</li>
                  </ol>
                  <p className="text-[11px] text-emerald-700 font-semibold pt-1">
                    ✓ サーバー上での解凍作業が一切不要になるため、最も確実で安全な方法です。
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/70 text-xs text-amber-900 space-y-2">
                <div className="font-bold flex items-center gap-1.5 text-amber-950">
                  <Zap className="w-4 h-4 text-amber-600" />
                  <span>公開後のURL例</span>
                </div>
                <p className="text-slate-700">
                  「relaxation」というフォルダ名で設置した場合：<br />
                  <code className="px-2 py-1 rounded-md bg-white border border-amber-300 font-mono font-bold text-amber-950 block mt-1">
                    https://あなたのWordPressドメイン/relaxation/
                  </code>
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: WordPress Integration */}
          {activeTab === 'wordpress' && (
            <div className="space-y-5">
              {/* Pattern A */}
              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs">
                    パターン A（おすすめ・最も確実）
                  </span>
                  <span className="text-xs text-slate-500 font-medium">所要時間: 1分</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                  WordPressのメニューバーにリンクを追加する
                </h4>
                <ol className="text-xs text-slate-600 space-y-1.5 list-decimal list-inside pl-1 leading-relaxed">
                  <li>WordPress管理画面「外観」→「メニュー」を開きます。</li>
                  <li>左側の「カスタムリンク」をクリックして開きます。</li>
                  <li>URLに「<code className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-300 text-slate-800">/relaxation/</code>」を入力します。</li>
                  <li>リンク文字列に「サロン案内」または「会社概要」と入力し、「メニューに追加」を押します。</li>
                  <li>「メニューを保存」をクリックして完了です。</li>
                </ol>
              </div>

              {/* Pattern B */}
              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 font-bold text-xs">
                    パターン B
                  </span>
                  <span className="text-xs text-slate-500 font-medium">固定ページへの直接埋め込み</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                  WordPressの固定ページ（投稿）の中に本アプリを表示する
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  WordPressのブロックエディタで「カスタムHTML」ブロックを追加し、以下のコードを貼り付けて公開してください。
                </p>

                <div className="relative">
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-[11px] font-mono overflow-x-auto leading-relaxed border border-slate-800">
                    {WORDPRESS_EMBED_HTML_SNIPPET}
                  </pre>
                  <button
                    onClick={handleCopySnippet}
                    className="absolute top-2.5 right-2.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-600 shadow-xs"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>コピー済み</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>コードをコピー</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Bundled Files */}
          {activeTab === 'files' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                ダウンロードされるZIP（<code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">atlas-relaxation-sakura-wordpress.zip</code>）には以下のファイルがすべて含まれています:
              </p>

              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs divide-y divide-slate-200">
                <div className="p-3 bg-slate-50 font-bold text-slate-700 grid grid-cols-12 gap-2">
                  <span className="col-span-4">ファイル名</span>
                  <span className="col-span-8">内容・役割</span>
                </div>
                <div className="p-3 grid grid-cols-12 gap-2 items-center">
                  <span className="col-span-4 font-mono font-bold text-blue-700">index.html</span>
                  <span className="col-span-8 text-slate-600">Webサイト本体。相対パス設定済みでどの階層でも正常表示されます。</span>
                </div>
                <div className="p-3 grid grid-cols-12 gap-2 items-center bg-slate-50/50">
                  <span className="col-span-4 font-mono font-bold text-amber-700">.htaccess</span>
                  <span className="col-span-8 text-slate-600">さくらインターネット用Apache設定。WordPressとのリライト競合防止、高速キャッシュ、iframe埋め込み許可を設定済み。</span>
                </div>
                <div className="p-3 grid grid-cols-12 gap-2 items-center">
                  <span className="col-span-4 font-mono font-bold text-emerald-700">assets/</span>
                  <span className="col-span-8 text-slate-600">最適化されたJavaScript、Tailwind CSS、および高精細写真画像群。</span>
                </div>
                <div className="p-3 grid grid-cols-12 gap-2 items-center bg-slate-50/50">
                  <span className="col-span-4 font-mono font-bold text-slate-700">README_さくらインターネット...</span>
                  <span className="col-span-8 text-slate-600">さくらファイルマネージャー操作マニュアル（テキスト版）。</span>
                </div>
                <div className="p-3 grid grid-cols-12 gap-2 items-center">
                  <span className="col-span-4 font-mono font-bold text-slate-700">wordpress-embed-snippet.html</span>
                  <span className="col-span-8 text-slate-600">WordPress固定ページ用コピー＆ペーストコード。</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500">
            ※ZIPファイルを解凍せずにそのままさくらインターネットのファイルマネージャーへアップロードしてください。
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ZIPを保存</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              閉じる
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
