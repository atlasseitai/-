/**
 * Utility to process and compress uploaded image files
 * Ensures image fits smoothly in browser state, IndexedDB, and localStorage
 */
export function compressImageFile(file: File, maxWidth = 1400, quality = 0.80): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Selected file is not an image'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = (e) => {
      const src = e.target?.result as string;
      if (!src) {
        reject(new Error('Failed to read image file'));
        return;
      }

      // If SVG or very small file, return directly
      if (file.type === 'image/svg+xml' || file.size < 60 * 1024) {
        resolve(src);
        return;
      }

      const img = new Image();
      img.onerror = () => resolve(src); // fallback to original data url
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth || height > maxWidth) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxWidth) / height);
            height = maxWidth;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(src);
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Try WebP first for optimal compression and clarity
        try {
          const webpData = canvas.toDataURL('image/webp', quality);
          if (webpData.startsWith('data:image/webp')) {
            // Check size; if still > 500KB, recompress slightly
            if (webpData.length > 500 * 1024) {
              const lighterWebp = canvas.toDataURL('image/webp', quality * 0.85);
              resolve(lighterWebp);
              return;
            }
            resolve(webpData);
            return;
          }
        } catch {
          // Fallback to JPEG
        }

        // Fallback to JPEG
        const jpegData = canvas.toDataURL('image/jpeg', quality);
        if (jpegData.length > 500 * 1024) {
          const lighterJpeg = canvas.toDataURL('image/jpeg', quality * 0.85);
          resolve(lighterJpeg);
          return;
        }
        resolve(jpegData);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  });
}
