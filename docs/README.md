# Chrome拡張機能

React 19、TypeScript、Vite、Vitestを使用して構築されたChrome拡張機能です。

## 機能

- React 19.1の最新機能
- TypeScriptによる型安全性
- Viteによる高速な開発とビルド
- Vitestによるテストとカバレッジ
- Biomeによるリントとフォーマット
- t-wadaさんのTDDアプローチ
- Kent Beckの開発哲学

## 開発

### 前提条件

- Node.js 18+
- npm

### セットアップ

1. 依存関係をインストール:
```bash
npm install
```

2. 開発サーバーを起動:
```bash
npm run dev
```

3. テストを実行:
```bash
npm test
```

4. UIでテストを実行:
```bash
npm run test:ui
```

5. カバレッジ付きでテストを実行:
```bash
npm run test:coverage
```

6. コードをリント:
```bash
npm run lint
```

7. コードをフォーマット:
```bash
npm run format
```

8. 本番用にビルド:
```bash
npm run build
```

## プロジェクト構造

```
cursor_test/
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

## 開発アプローチ

このプロジェクトは以下に従います:

- **TDD（Test-Driven Development）** t-wadaさんのアプローチに基づく
- **Red-Green-Refactor**サイクル
- **Kent Beckの開発哲学**:
  - Simple Design（シンプルな設計）
  - YAGNI（You Aren't Gonna Need It）
  - DRY（Don't Repeat Yourself）
  - Clean Code（クリーンコード）
  - Continuous Refactoring（継続的なリファクタリング）

## Chrome拡張機能の構造

- **manifest.json**: 拡張機能設定（Manifest V3）
- **Popup**: 拡張機能アイコンクリック時の表示
- **Background Script**: バックグラウンド処理（Service Worker）
- **Content Script**: ウェブページ内での実行
- **Options Page**: 設定ページ

## スクリプト

- `npm run dev`: 開発サーバー起動
- `npm run build`: 本番用ビルド
- `npm run preview`: ビルド結果のプレビュー
- `npm test`: テスト実行
- `npm run test:ui`: UIでテスト実行
- `npm run test:coverage`: カバレッジ付きテスト実行
- `npm run test:run`: テスト実行（ウォッチモードなし）
- `npm run lint`: Biomeによるリント
- `npm run format`: Biomeによるフォーマット
- `npm run check`: Biomeによるチェックとフォーマット 