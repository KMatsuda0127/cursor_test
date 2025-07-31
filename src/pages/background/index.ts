// バックグラウンドスクリプト
// 拡張機能のライフサイクル管理

// 拡張機能がインストールされたとき
chrome.runtime.onInstalled.addListener(() => {
  console.log('Spotlight Extension installed');
});

// 拡張機能が更新されたとき
chrome.runtime.onStartup.addListener(() => {
  console.log('Spotlight Extension started');
});

// タブが更新されたとき
chrome.tabs.onUpdated.addListener((_tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    // コンテンツスクリプトが読み込まれたことを確認
    console.log('Tab updated:', tab.url);
  }
});
