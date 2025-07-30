# Chrome拡張機能開発プロジェクト要件

## 技術スタック
- **フレームワーク**: React 19.1
- **言語**: TypeScript 5.4+
- **ビルドツール**: Vite 5.4+
- **テストフレームワーク**: Vitest
- **リンター・フォーマッター**: Biome 1.8+
- **パッケージマネージャー**: npm

## プロジェクト構造
```
chrome-extension/
├── src/
│   ├── components/          # Reactコンポーネント
│   ├── pages/              # 拡張機能のページ（popup, options, background）
│   ├── utils/              # ユーティリティ関数
│   ├── types/              # TypeScript型定義
│   └── assets/             # 静的ファイル（アイコン、画像など）
├── tests/                  # テストファイル
│   ├── components/         # コンポーネントテスト
│   ├── utils/              # ユーティリティテスト
│   └── __mocks__/          # モックファイル
├── public/                 # ビルド出力先
├── dist/                   # 本番ビルド出力
├── coverage/               # テストカバレッジレポート
├── manifest.json           # Chrome拡張機能マニフェスト
├── package.json
├── vite.config.ts
├── vitest.config.ts        # Vitest設定
├── biome.json
└── tsconfig.json
```

## 開発環境設定
- **Vite**: 高速な開発サーバーとビルド
- **TypeScript**: 型安全性の確保
- **Vitest**: 高速なテスト実行
- **Biome**: コードフォーマットとリント
- **Hot Reload**: 開発時の自動リロード

## Chrome拡張機能の基本構成
- **manifest.json**: 拡張機能の設定ファイル（Manifest V3対応）
- **Popup**: 拡張機能アイコンクリック時の表示
- **Background Script**: バックグラウンド処理（Service Worker）
- **Content Script**: ウェブページ内での実行
- **Options Page**: 設定ページ

## 開発アプローチ
### TDD（Test-Driven Development）
- **t-wadaさんのTDDアプローチ**に基づく開発
- **Red-Green-Refactor**サイクルの徹底
- テストファーストの開発スタイル
- 小さなステップでの段階的開発

### Kent Beckの開発哲学
- **Simple Design**: シンプルな設計を優先
- **YAGNI (You Aren't Gonna Need It)**: 必要になるまで実装しない
- **DRY (Don't Repeat Yourself)**: 重複を避ける
- **Clean Code**: 読みやすく保守しやすいコード
- **Refactoring**: 継続的なリファクタリング

## 開発ワークフロー
1. **テストファースト**: 機能要件をテストとして記述
2. **Red**: テストが失敗することを確認
3. **Green**: 最小限の実装でテストを通過
4. **Refactor**: コードを整理・改善
5. 開発サーバー起動（Vite）
6. コード編集（TypeScript + React 19）
7. テスト実行（Vitest）
8. 自動フォーマット（Biome）
9. ビルド（Vite）
10. Chrome拡張機能として読み込み

## 必要な依存関係
- `react@^19.1.0`, `react-dom@^19.1.0`
- `@types/react@^19.0.0`, `@types/react-dom@^19.0.0`
- `vite@^5.4.0`
- `@vitejs/plugin-react@^4.3.0`
- `vitest@^2.1.0`
- `@vitest/ui@^2.1.0`
- `@vitest/coverage-v8@^2.1.0`
- `@testing-library/react@^16.0.0`
- `@testing-library/jest-dom@^6.4.0`
- `@testing-library/user-event@^14.5.0`
- `jsdom@^24.0.0`
- `@biomejs/biome@^1.8.0`
- `typescript@^5.4.0`

## React 19の新機能対応
- **React Compiler**: 自動メモ化
- **Actions**: フォーム処理の改善
- **use()**: データフェッチングの改善
- **Document Metadata**: メタデータ管理の改善
- **Asset Loading**: アセット読み込みの最適化

## テスト設定
- **Vitest**: 高速なテスト実行
- **React Testing Library**: コンポーネントテスト
- **jsdom**: DOM環境のシミュレーション
- **カバレッジ**: V8カバレッジレポート
- **UI**: Vitest UI でのテスト実行

## ビルド設定
- 開発用: 高速な開発サーバー
- 本番用: 最適化されたビルド
- Chrome拡張機能用の出力形式
- React 19の新機能を活用した最適化

## TypeScript設定
- **target**: ES2022
- **module**: ESNext
- **lib**: ["ES2022", "DOM", "DOM.Iterable"]
- **strict**: true
- **jsx**: "react-jsx"

## npmスクリプト
- `npm run dev`: 開発サーバー起動
- `npm run build`: 本番ビルド
- `npm run preview`: ビルド結果のプレビュー
- `npm test`: テスト実行
- `npm run test:ui`: Vitest UIでテスト実行
- `npm run test:coverage`: カバレッジ付きテスト実行
- `npm run test:run`: テスト実行（ウォッチモードなし）
- `npm run lint`: Biomeによるリント
- `npm run format`: Biomeによるフォーマット 