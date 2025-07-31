import type { HighlightElement, SpotlightConfig } from '@/types/spotlight';

// ハイライトされた要素を追跡
const highlightedElements: HighlightElement[] = [];

// 既存のハイライトをクリア
export const clearHighlights = (): void => {
  // 既存のハイライト要素をすべて削除
  const existingHighlights = document.querySelectorAll('.spotlight-highlight');
  for (const highlight of existingHighlights) {
    if (highlight.parentNode) {
      const textNode = document.createTextNode(highlight.textContent || '');
      highlight.parentNode.replaceChild(textNode, highlight);
    }
  }
  highlightedElements.length = 0;
};

// テキストノードを検索してハイライト
export const highlightText = (searchText: string, color = '#ffff00'): void => {
  if (!searchText.trim()) {
    clearHighlights();
    return;
  }

  clearHighlights();

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        const text = node.textContent || '';
        return text.toLowerCase().includes(searchText.toLowerCase())
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    }
  );

  const textNodes: Text[] = [];
  let node = walker.nextNode();
  while (node !== null) {
    textNodes.push(node as Text);
    node = walker.nextNode();
  }

  for (const textNode of textNodes) {
    const text = textNode.textContent || '';
    const searchRegex = new RegExp(`(${searchText})`, 'gi');

    if (searchRegex.test(text)) {
      const parent = textNode.parentNode;
      if (parent && parent.nodeType === Node.ELEMENT_NODE) {
        const element = parent as HTMLElement;

        // 既にハイライトされている場合はスキップ
        if (element.querySelector('.spotlight-highlight')) {
          continue;
        }

        const highlightedText = text.replace(searchRegex, (match) => {
          const span = document.createElement('span');
          span.className = 'spotlight-highlight';
          span.style.backgroundColor = color;
          span.style.color = '#000000';
          span.style.padding = '1px 2px';
          span.style.borderRadius = '2px';
          span.textContent = match;
          return span.outerHTML;
        });

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = highlightedText;

        const fragment = document.createDocumentFragment();
        while (tempDiv.firstChild) {
          fragment.appendChild(tempDiv.firstChild);
        }

        parent.replaceChild(fragment, textNode);

        // ハイライトされた要素を追跡
        const highlightSpans = fragment.querySelectorAll(
          '.spotlight-highlight'
        );
        for (const span of highlightSpans) {
          highlightedElements.push({
            originalText: text,
            element,
            highlightSpan: span as HTMLSpanElement,
          });
        }
      }
    }
  }
};

// 設定に基づいてハイライトを実行
export const highlightWithConfig = (config: SpotlightConfig): void => {
  if (config.isEnabled && config.searchText) {
    highlightText(config.searchText, config.highlightColor);
  } else {
    clearHighlights();
  }
};
