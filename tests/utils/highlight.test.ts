import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  highlightText,
  clearHighlights,
  highlightWithConfig,
} from '@/utils/highlight';
import type { SpotlightConfig } from '@/types/spotlight';

// DOM環境のセットアップ
const setupDOM = () => {
  document.body.innerHTML = `
    <div>
      <p>This is a test paragraph with some text to highlight.</p>
      <span>Another element with test text.</span>
      <div>No matching text here.</div>
    </div>
  `;
};

const cleanupDOM = () => {
  document.body.innerHTML = '';
};

describe('Highlight Utils', () => {
  beforeEach(() => {
    setupDOM();
  });

  afterEach(() => {
    cleanupDOM();
  });

  describe('highlightText', () => {
    it('should highlight matching text with specified color', () => {
      highlightText('test', '#ffff00');

      const highlightedElements = document.querySelectorAll(
        '.spotlight-highlight'
      );
      expect(highlightedElements).toHaveLength(2);

      for (const element of highlightedElements) {
        expect(element).toHaveStyle('background-color: rgb(255, 255, 0)');
        expect(element.textContent).toBe('test');
      }
    });

    it('should clear existing highlights before adding new ones', () => {
      // 最初のハイライト
      highlightText('test', '#ffff00');
      expect(document.querySelectorAll('.spotlight-highlight')).toHaveLength(2);

      // 新しいハイライト
      highlightText('text', '#ff0000');
      const highlightedElements = document.querySelectorAll(
        '.spotlight-highlight'
      );
      expect(highlightedElements.length).toBeGreaterThan(0);

      // すべてのハイライト要素が新しい色になっていることを確認
      for (const element of highlightedElements) {
        expect(element).toHaveStyle('background-color: rgb(255, 0, 0)');
        expect(element.textContent).toBe('text');
      }
    });

    it('should clear highlights when search text is empty', () => {
      // 最初にハイライトを追加
      highlightText('test', '#ffff00');
      expect(document.querySelectorAll('.spotlight-highlight')).toHaveLength(2);

      // 空のテキストでハイライトをクリア
      highlightText('', '#ffff00');
      expect(document.querySelectorAll('.spotlight-highlight')).toHaveLength(0);
    });

    it('should be case insensitive', () => {
      highlightText('TEST', '#ffff00');

      const highlightedElements = document.querySelectorAll(
        '.spotlight-highlight'
      );
      expect(highlightedElements).toHaveLength(2);

      for (const element of highlightedElements) {
        expect(element.textContent?.toLowerCase()).toBe('test');
      }
    });
  });

  describe('clearHighlights', () => {
    it('should remove all highlighted elements', () => {
      highlightText('test', '#ffff00');
      expect(document.querySelectorAll('.spotlight-highlight')).toHaveLength(2);

      clearHighlights();
      expect(document.querySelectorAll('.spotlight-highlight')).toHaveLength(0);
    });

    it('should restore original text content', () => {
      const originalText = document.body.textContent;

      highlightText('test', '#ffff00');
      clearHighlights();

      expect(document.body.textContent).toBe(originalText);
    });
  });

  describe('highlightWithConfig', () => {
    it('should highlight when config is enabled and has search text', () => {
      const config: SpotlightConfig = {
        searchText: 'test',
        highlightColor: '#ffff00',
        isEnabled: true,
      };

      highlightWithConfig(config);

      const highlightedElements = document.querySelectorAll(
        '.spotlight-highlight'
      );
      expect(highlightedElements).toHaveLength(2);
    });

    it('should not highlight when config is disabled', () => {
      const config: SpotlightConfig = {
        searchText: 'test',
        highlightColor: '#ffff00',
        isEnabled: false,
      };

      highlightWithConfig(config);

      const highlightedElements = document.querySelectorAll(
        '.spotlight-highlight'
      );
      expect(highlightedElements).toHaveLength(0);
    });

    it('should not highlight when search text is empty', () => {
      const config: SpotlightConfig = {
        searchText: '',
        highlightColor: '#ffff00',
        isEnabled: true,
      };

      highlightWithConfig(config);

      const highlightedElements = document.querySelectorAll(
        '.spotlight-highlight'
      );
      expect(highlightedElements).toHaveLength(0);
    });

    it('should clear highlights when config is disabled', () => {
      // 最初にハイライトを追加
      const enabledConfig: SpotlightConfig = {
        searchText: 'test',
        highlightColor: '#ffff00',
        isEnabled: true,
      };
      highlightWithConfig(enabledConfig);
      expect(document.querySelectorAll('.spotlight-highlight')).toHaveLength(2);

      // 無効化してハイライトをクリア
      const disabledConfig: SpotlightConfig = {
        searchText: 'test',
        highlightColor: '#ffff00',
        isEnabled: false,
      };
      highlightWithConfig(disabledConfig);
      expect(document.querySelectorAll('.spotlight-highlight')).toHaveLength(0);
    });
  });
});
