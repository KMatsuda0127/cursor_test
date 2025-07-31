// スポットライト機能の型定義
export interface SpotlightConfig {
  searchText: string;
  highlightColor: string;
  isEnabled: boolean;
}

export interface HighlightElement {
  originalText: string;
  element: HTMLElement;
  highlightSpan: HTMLSpanElement;
}

export interface StorageData {
  spotlightConfig: SpotlightConfig;
}

// Chrome拡張機能のメッセージ型
export interface ChromeMessage {
  type: 'UPDATE_CONFIG' | 'GET_CONFIG' | 'HIGHLIGHT_TEXT';
  data?: SpotlightConfig;
}
