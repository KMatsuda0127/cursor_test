import { loadConfig } from '@/utils/storage';
import { highlightWithConfig } from '@/utils/highlight';
import type { SpotlightConfig, ChromeMessage } from '@/types/spotlight';

let currentConfig: SpotlightConfig = {
  searchText: '',
  highlightColor: '#ffff00',
  isEnabled: false,
};

// 初期化
const initialize = async (): Promise<void> => {
  try {
    currentConfig = await loadConfig();
    if (currentConfig.isEnabled) {
      highlightWithConfig(currentConfig);
    }
  } catch (error) {
    console.error('Failed to initialize spotlight:', error);
  }
};

// メッセージリスナー
const handleMessage = async (message: ChromeMessage): Promise<void> => {
  if (message.type === 'UPDATE_CONFIG') {
    currentConfig = message.data as SpotlightConfig;
    highlightWithConfig(currentConfig);
  }
};

// ページの変更を監視
const observePageChanges = (): void => {
  const observer = new MutationObserver(() => {
    if (currentConfig.isEnabled && currentConfig.searchText) {
      highlightWithConfig(currentConfig);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
};

// メッセージリスナーを設定
if (typeof chrome !== 'undefined' && chrome.runtime) {
  chrome.runtime.onMessage.addListener(handleMessage);
}

// 初期化とページ監視を開始
initialize().then(() => {
  observePageChanges();
});
