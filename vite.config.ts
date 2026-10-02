import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import {defineConfig} from 'vite';

let buildTimeout: any = null;
function triggerBackgroundBuild() {
  if (buildTimeout) clearTimeout(buildTimeout);
  buildTimeout = setTimeout(() => {
    exec('npx vite build && node scripts/generate-zip.js', (err) => {
      if (err) console.error('Build error:', err);
      else console.log('✓ Production dist & ZIP rebuilt with current preview state');
    });
  }, 1200);
}

function previewSyncPlugin() {
  return {
    name: 'preview-sync-api',
    configureServer(server: any) {
      server.middlewares.use('/api/sync-preview-data', (req: any, res: any) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              const jsonPath = path.resolve(__dirname, 'src/data/savedPreviewData.json');
              fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf-8');

              // Also write directly to src/data/defaultCompanyData.ts so any build has this data baked into code
              const defaultTsPath = path.resolve(__dirname, 'src/data/defaultCompanyData.ts');
              const dataToSave = { ...data, version: 2026100101 };
              if (dataToSave.siteSettings) {
                dataToSave.siteSettings.isPublished = true;
              }
              const tsCode = `import { CompanyData } from "../types";\n\nexport const PUBLISHED_DATA_VERSION = 2026100101;\n\nexport const DEFAULT_COMPANY_DATA: CompanyData = ${JSON.stringify(dataToSave, null, 2)};\n`;
              fs.writeFileSync(defaultTsPath, tsCode, 'utf-8');

              triggerBackgroundBuild();
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, message: 'Saved to codebase and rebuilding production dist' }));
            } catch (err) {
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: String(err) }));
            }
          });
          return;
        }
        res.statusCode = 405;
        res.end();
      });

      server.middlewares.use('/api/download-sakura-zip', (_req: any, res: any) => {
        const zipPath = path.resolve(__dirname, 'public/atlas-relaxation-sakura-wordpress.zip');
        if (fs.existsSync(zipPath)) {
          const file = fs.readFileSync(zipPath);
          res.setHeader('Content-Type', 'application/zip');
          res.setHeader('Content-Disposition', 'attachment; filename="atlas-relaxation-sakura-wordpress.zip"');
          res.setHeader('Content-Length', file.length);
          res.end(file);
          return;
        }
        res.statusCode = 404;
        res.end('Zip not found');
      });
    },
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss(), previewSyncPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
