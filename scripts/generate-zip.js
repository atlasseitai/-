import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import JSZip from 'jszip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const outputZipPath = path.resolve(rootDir, 'public/atlas-relaxation-sakura-wordpress.zip');

async function buildZip() {
  if (!fs.existsSync(distDir)) {
    console.error('dist directory does not exist! Please run npm run build first.');
    process.exit(1);
  }

  const zip = new JSZip();

  function addFiles(currentDir, relativePrefix = '') {
    const items = fs.readdirSync(currentDir);
    for (const item of items) {
      // Skip the zip file itself if present
      if (item.endsWith('.zip')) continue;

      const fullPath = path.join(currentDir, item);
      const zipPath = relativePrefix ? `${relativePrefix}/${item}` : item;
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        addFiles(fullPath, zipPath);
      } else {
        const fileData = fs.readFileSync(fullPath);
        zip.file(zipPath, fileData);
      }
    }
  }

  console.log('Adding files from dist/ to ZIP...');
  addFiles(distDir);

  console.log('Generating ZIP buffer...');
  const buffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  fs.writeFileSync(outputZipPath, buffer);
  const sizeMb = (buffer.length / (1024 * 1024)).toFixed(2);
  console.log(`✓ Successfully generated ${outputZipPath} (${sizeMb} MB)`);

  // Also copy to dist if dist exists
  const distZipPath = path.resolve(distDir, 'atlas-relaxation-sakura-wordpress.zip');
  fs.writeFileSync(distZipPath, buffer);
  console.log(`✓ Copied to ${distZipPath}`);
}

buildZip().catch((err) => {
  console.error('Error generating zip:', err);
  process.exit(1);
});
