import JSZip from 'jszip';

export async function downloadSakuraDeploymentZip(onProgress?: (msg: string) => void): Promise<boolean> {
  onProgress?.('さくらインターネット公開用ZIPパッケージの取得を開始しています...');

  // Strategy 1: Direct pre-built ZIP download
  const directUrls = [
    './atlas-relaxation-sakura-wordpress.zip',
    '/atlas-relaxation-sakura-wordpress.zip',
    '/api/download-sakura-zip',
  ];

  for (const url of directUrls) {
    try {
      const resp = await fetch(url, { method: 'HEAD' });
      if (resp.ok) {
        onProgress?.('ZIPパッケージをダウンロードしています...');
        const a = document.createElement('a');
        a.href = url;
        a.download = 'atlas-relaxation-sakura-wordpress.zip';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        onProgress?.('ダウンロードが完了しました！');
        return true;
      }
    } catch {
      // Continue to next strategy
    }
  }

  // Strategy 2: Client-side JSZip packaging fallback
  try {
    onProgress?.('ブラウザ上で最新の公開用パッケージを生成中...');
    const zip = new JSZip();

    // Fetch index.html
    const indexHtml = await fetch('./index.html').then(r => r.text()).catch(() => '<!doctype html><html><head><meta charset="utf-8"><title>アトラスリラクゼーションサービス</title></head><body><div id="root"></div></body></html>');
    zip.file('index.html', indexHtml);

    // Fetch .htaccess
    const htaccess = await fetch('./.htaccess').then(r => r.text()).catch(() => `# Sakura Internet & WordPress .htaccess
AddDefaultCharset UTF-8
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  RewriteRule ^ index.html [L]
</IfModule>
<IfModule mod_headers.c>
  Header always unset X-Frame-Options
  Header always set Content-Security-Policy "frame-ancestors 'self' *"
</IfModule>
`);
    zip.file('.htaccess', htaccess);

    // Fetch README manual
    const readme = await fetch('./README_さくらインターネット_WordPress公開手順.txt').then(r => r.text()).catch(() => 'さくらインターネット ファイルマネージャーでZIP展開してください。');
    zip.file('README_さくらインターネット_WordPress公開手順.txt', readme);

    // Fetch WordPress embed snippet
    const wpSnippet = await fetch('./wordpress-embed-snippet.html').then(r => r.text()).catch(() => '<iframe src="/relaxation/" style="width:100%;height:100vh;min-height:850px;border:none;"></iframe>');
    zip.file('wordpress-embed-snippet.html', wpSnippet);

    onProgress?.('ZIPファイルを圧縮中...');
    const content = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
    
    const blobUrl = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = 'atlas-relaxation-sakura-wordpress.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);

    onProgress?.('ダウンロードが完了しました！');
    return true;
  } catch (err) {
    console.error('Failed to create client-side deployment zip:', err);
    onProgress?.('ダウンロードに失敗しました。');
    return false;
  }
}

export const SAKURA_WORDPRESS_STEPS = [
  {
    step: '1',
    title: 'さくらインターネットの管理画面にログイン',
    description: 'さくらインターネット「サーバーコントロールパネル」（https://secure.sakura.ad.jp/rs/cp/）にアクセスしてログインします。',
  },
  {
    step: '2',
    title: '「ファイルマネージャー」を開く',
    description: '左サイドバーメニューから「ファイルマネージャー」をクリックして起動します。',
  },
  {
    step: '3',
    title: '公開用フォルダを作成（例: relaxation）',
    description: 'WordPressが置かれている「/home/アカウント名/www/」内で、上部メニューの「フォルダ作成」を押し「relaxation」（または「company」など）を入力してフォルダを開きます。',
  },
  {
    step: '4',
    title: 'ZIPファイルをアップロード',
    description: '作成したフォルダ内で、上部メニューの「アップロード」を押し、ダウンロードした「atlas-relaxation-sakura-wordpress.zip」をアップロードします。',
  },
  {
    step: '5',
    title: '「リモートで解凍」を実行して完了！',
    description: 'さくらのファイルマネージャーでは「展開」ではなく「リモートで解凍」と表記されます。アップロードしたZIPファイルを選択して「右クリック」→「リモートで解凍」（または上部「操作」メニュー →「リモートで解凍」）を実行します。これで index.html や assets フォルダ、専用 .htaccess が配置され、https://あなたのドメイン/relaxation/ で即座に公開されます！',
  },
];

export const WORDPRESS_EMBED_HTML_SNIPPET = `<div class="atlas-app-embed" style="position: relative; width: 100%; min-height: 100vh; overflow: hidden; margin: 0 auto;">
  <iframe 
    src="/relaxation/" 
    style="width: 100%; height: 100vh; min-height: 850px; border: none; display: block;" 
    loading="lazy"
    title="アトラスリラクゼーションサービス合同会社"
  ></iframe>
</div>`;
