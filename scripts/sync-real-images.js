import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const savedDataPath = path.resolve(rootDir, 'src/data/savedPreviewData.json');
const rawData = JSON.parse(fs.readFileSync(savedDataPath, 'utf8'));

function extractBuffer(dataUri) {
  if (!dataUri || !dataUri.startsWith('data:')) return null;
  const match = dataUri.match(/^data:image\/[a-zA-Z0-9-+.]+;base64,(.+)$/);
  if (!match) return null;
  return Buffer.from(match[1], 'base64');
}

async function convertAndSave(buffer, destBase) {
  if (!buffer) return;
  // Ensure dest directory exists
  const destDir = path.dirname(destBase);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // Save as WebP
  await sharp(buffer).webp({ quality: 90 }).toFile(`${destBase}.webp`);
  // Save as JPG
  await sharp(buffer).jpeg({ quality: 90 }).toFile(`${destBase}.jpg`);
}

async function run() {
  console.log('Extracting real images from savedPreviewData.json...');

  // 1. Hero background
  const heroBuf = extractBuffer(rawData.hero?.backgroundImageUrl);
  if (heroBuf) {
    console.log('Processing Hero image...');
    await convertAndSave(heroBuf, path.resolve(rootDir, 'public/spa_hero'));
    await convertAndSave(heroBuf, path.resolve(rootDir, 'public/images/hero_bg'));
    // Overwrite asset fallback
    await sharp(heroBuf).jpeg({ quality: 90 }).toFile(
      path.resolve(rootDir, 'src/assets/images/spa_hero_luxury_1788847526615.jpg')
    );
  }

  // 2. CEO Nishida Yukie
  const ceoBuf = extractBuffer(rawData.philosophy?.ceoMessage?.authorImageUrl);
  if (ceoBuf) {
    console.log('Processing CEO (Nishida Yukie) image...');
    await convertAndSave(ceoBuf, path.resolve(rootDir, 'public/nishida_yukie'));
    await convertAndSave(ceoBuf, path.resolve(rootDir, 'public/images/nishida_yukie'));
    // Overwrite asset fallback
    await sharp(ceoBuf).jpeg({ quality: 90 }).toFile(
      path.resolve(rootDir, 'src/assets/images/nishida_yukie_1789094122577.jpg')
    );
  }

  // 3. Salon room (services[0])
  const salonBuf = extractBuffer(rawData.services?.[0]?.imageUrl);
  if (salonBuf) {
    console.log('Processing Salon room image...');
    await convertAndSave(salonBuf, path.resolve(rootDir, 'public/salon_room'));
    await convertAndSave(salonBuf, path.resolve(rootDir, 'public/images/salon_room'));
    // Overwrite asset fallback
    await sharp(salonBuf).jpeg({ quality: 90 }).toFile(
      path.resolve(rootDir, 'src/assets/images/salon_private_room_1788847542393.jpg')
    );
  }

  // 4. Hotel service (services[1])
  const hotelServiceBuf = extractBuffer(rawData.services?.[1]?.imageUrl);
  if (hotelServiceBuf) {
    console.log('Processing Hotel service image...');
    await convertAndSave(hotelServiceBuf, path.resolve(rootDir, 'public/hotel_service'));
    await convertAndSave(hotelServiceBuf, path.resolve(rootDir, 'public/images/hotel_service'));
    // Overwrite asset fallback
    await sharp(hotelServiceBuf).jpeg({ quality: 90 }).toFile(
      path.resolve(rootDir, 'src/assets/images/hotel_room_service_1788847555626.jpg')
    );
  }

  // 5. Menard (services[4])
  const menardBuf = extractBuffer(rawData.services?.[4]?.imageUrl);
  if (menardBuf) {
    console.log('Processing Menard service image...');
    await convertAndSave(menardBuf, path.resolve(rootDir, 'public/images/menard_service'));
  }

  // 6. Executives
  if (Array.isArray(rawData.executives)) {
    for (let i = 0; i < rawData.executives.length; i++) {
      const exec = rawData.executives[i];
      const buf = extractBuffer(exec.imageUrl);
      if (buf) {
        const safeName = i === 0 ? 'nishida_yukie' : 'takahashi_kentaro';
        console.log(`Processing Executive [${exec.name}] image...`);
        await convertAndSave(buf, path.resolve(rootDir, `public/images/${safeName}`));
      }
    }
  }

  // 7. Partner Hotels
  if (Array.isArray(rawData.partnerHotels)) {
    const hotelNames = [
      'hotel_livemax',
      'route_inn',
      'hotel_vista',
      'atsugi_urban',
      'hotel_tokai',
      'nanasawa_nanaogi'
    ];
    for (let i = 0; i < rawData.partnerHotels.length; i++) {
      const hotel = rawData.partnerHotels[i];
      const buf = extractBuffer(hotel.imageUrl);
      if (buf) {
        const safeName = hotelNames[i] || `hotel_${i}`;
        console.log(`Processing Partner Hotel [${hotel.name}] image...`);
        await convertAndSave(buf, path.resolve(rootDir, `public/hotels/${safeName}`));
      }
    }
  }

  // 8. Fix any root slashes in image paths to relative ./ in data
  function fixRelativePaths(data) {
    const cloned = JSON.parse(JSON.stringify(data));
    if (cloned.header?.logoUrl?.startsWith('/')) {
      cloned.header.logoUrl = '.' + cloned.header.logoUrl;
    }
    if (Array.isArray(cloned.services)) {
      cloned.services = cloned.services.map(s => {
        if (s.imageUrl?.startsWith('/')) {
          return { ...s, imageUrl: '.' + s.imageUrl };
        }
        return s;
      });
    }
    return cloned;
  }

  const updatedData = fixRelativePaths(rawData);
  fs.writeFileSync(savedDataPath, JSON.stringify(updatedData, null, 2), 'utf8');

  // Also update src/data/defaultCompanyData.ts
  const defaultTsPath = path.resolve(rootDir, 'src/data/defaultCompanyData.ts');
  const tsContent = `import { CompanyData } from "../types";\n\nexport const PUBLISHED_DATA_VERSION = 2026100101;\n\nexport const DEFAULT_COMPANY_DATA: CompanyData = ${JSON.stringify(updatedData, null, 2)};\n`;
  fs.writeFileSync(defaultTsPath, tsContent, 'utf8');

  console.log('✓ Successfully synchronized ALL real preview images into public/, src/assets/images/, and defaultCompanyData.ts!');
}

run().catch(err => {
  console.error('Error during image sync:', err);
  process.exit(1);
});
