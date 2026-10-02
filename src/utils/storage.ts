import { CompanyData } from '../types';
import { PUBLISHED_DATA_VERSION } from '../data/defaultCompanyData';

const DB_NAME = 'atlas_corporate_storage_db_v7';
const DB_VERSION = 1;
const STORE_NAME = 'app_state';
const STATE_KEY = 'company_data';

export const PRIMARY_STORAGE_KEY = 'atlas_corporate_profile_v7';
export const LEGACY_STORAGE_KEYS = [
  'atlas_corporate_profile_v6',
  'atlas_corporate_profile_v5',
  'atlas_corporate_profile_v3',
  'atlas_corporate_profile_v2',
  'corporate_company_profile_data_v7',
  'corporate_company_profile_data_v6',
  'corporate_company_profile_data_v5',
  'corporate_company_profile_data_v4',
  'corporate_company_profile_data_v3',
  'corporate_company_profile_data_v2',
  'corporate_company_profile_data_v1',
];

/**
 * Open IndexedDB connection safely
 */
function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Save company data reliably to both IndexedDB (virtually unlimited capacity)
 * and localStorage (for synchronous fast reads), with graceful quota handling.
 */
export async function persistCompanyData(data: CompanyData): Promise<void> {
  const dataWithVersion = { ...data, version: PUBLISHED_DATA_VERSION };
  // 1. Save to IndexedDB (reliable, handles high-res images and large data)
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(dataWithVersion, STATE_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('[Storage] IndexedDB save error:', err);
  }

  // 2. Also save to localStorage
  try {
    const serialized = JSON.stringify(dataWithVersion);
    localStorage.setItem(PRIMARY_STORAGE_KEY, serialized);
  } catch (err: any) {
    console.warn('[Storage] localStorage standard save exceeded quota, trimming for cache:', err);
    // If quota exceeded, clean up old legacy keys to free space
    try {
      for (const k of LEGACY_STORAGE_KEYS) {
        localStorage.removeItem(k);
      }
      localStorage.setItem(PRIMARY_STORAGE_KEY, JSON.stringify(dataWithVersion));
    } catch {
      // If still exceeding, IndexedDB already has the full persistent copy!
      console.warn('[Storage] Full state persisted safely in IndexedDB.');
    }
  }
}

/**
 * Asynchronously load the most up-to-date data from IndexedDB
 */
export async function loadCompanyDataFromIndexedDB(): Promise<CompanyData | null> {
  try {
    const db = await openDatabase();
    return await new Promise<CompanyData | null>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(STATE_KEY);
      req.onsuccess = () => {
        const result = req.result;
        if (result && (!result.version || result.version < PUBLISHED_DATA_VERSION)) {
          // Outdated data from old app version, ignore so authoritative published data is used
          resolve(null);
          return;
        }
        resolve(result || null);
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

/**
 * Synchronously load data from localStorage for instant initial render
 */
export function loadCompanyDataSync(): CompanyData | null {
  if (typeof window === 'undefined' || !window.localStorage) return null;

  // Clean legacy cached keys on load
  try {
    for (const k of LEGACY_STORAGE_KEYS) {
      localStorage.removeItem(k);
    }
  } catch {}

  // Try primary key only
  const saved = localStorage.getItem(PRIMARY_STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (!parsed.version || parsed.version < PUBLISHED_DATA_VERSION) {
        // Purge outdated cache
        localStorage.removeItem(PRIMARY_STORAGE_KEY);
        return null;
      }
      return parsed;
    } catch (e) {
      console.warn('[Storage] Failed to parse primary localStorage data', e);
    }
  }

  return null;
}

/**
 * Clear all storage (both localStorage and IndexedDB)
 */
export async function clearAllStorage(): Promise<void> {
  try {
    localStorage.removeItem(PRIMARY_STORAGE_KEY);
    for (const k of LEGACY_STORAGE_KEYS) {
      localStorage.removeItem(k);
    }
  } catch (e) {
    console.warn('[Storage] Failed to clear localStorage', e);
  }

  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(STATE_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.warn('[Storage] Failed to clear IndexedDB', e);
  }
}
