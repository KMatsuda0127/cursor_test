import type { SpotlightConfig, StorageData } from '@/types/spotlight';

const STORAGE_KEY = 'spotlightConfig';

// デフォルト設定
export const DEFAULT_CONFIG: SpotlightConfig = {
  searchText: '',
  highlightColor: '#ffff00',
  isEnabled: false,
};

// 設定を保存
export const saveConfig = async (config: SpotlightConfig): Promise<void> => {
  const storageData: StorageData = {
    spotlightConfig: config,
  };

  if (typeof chrome !== 'undefined' && chrome.storage) {
    await chrome.storage.local.set(storageData);
  } else {
    // フォールバック: localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }
};

// 設定を取得
export const loadConfig = async (): Promise<SpotlightConfig> => {
  if (typeof chrome !== 'undefined' && chrome.storage) {
    const result = await chrome.storage.local.get(STORAGE_KEY);
    return result[STORAGE_KEY] || DEFAULT_CONFIG;
  }
  // フォールバック: localStorage
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : DEFAULT_CONFIG;
};

// 設定をリセット
export const resetConfig = async (): Promise<void> => {
  await saveConfig(DEFAULT_CONFIG);
};
