# TypeScriptプラグインのテンプレート

## フォルダ構成例
```
typescript-template/
├── src/
│   ├── features/            # 機能モジュール
│   │   ├── feature1/        # 機能1
│   │   │   ├── client/
│   │   │   │   ├── events.ts     # クライアント側イベントハンドラ
│   │   │   │   ├── main.ts       # メイン処理
│   │   │   │   ├── nui.ts        # UI関連処理
│   │   │   │   └── index.ts      # 初期化・エクスポート
│   │   │   ├── server/
│   │   │   │   ├── events.ts     # サーバー側イベントハンドラ
│   │   │   │   ├── database.ts   # データベース操作
│   │   │   │   └── index.ts      # 初期化・エクスポート
│   │   │   └── shared/
│   │   │       ├── config.ts     # 機能固有の設定
│   │   │       ├── constants.ts  # 定数
│   │   │       ├── utils.ts      # ユーティリティ関数
│   │   │       └── types.ts      # 型定義
│   │   └── feature2/        # 機能2など...
│   │       ├── client/
│   │       ├── server/
│   │       └── shared/
│   ├── core/                # コア機能
│   │   ├── client/          # クライアント共通機能
│   │   │   ├── events.ts    # イベント基盤
│   │   │   ├── ui.ts        # UI操作
│   │   │   └── index.ts     # エントリーポイント
│   │   ├── server/          # サーバー共通機能
│   │   │   ├── events.ts    # イベント基盤
│   │   │   ├── database.ts  # DB接続管理
│   │   │   └── index.ts     # エントリーポイント
│   │   └── shared/          # 共有コード
│   │       ├── config.ts    # グローバル設定
│   │       ├── constants.ts # 定数
│   │       ├── utils.ts     # ユーティリティ関数
│   │       └── types.ts     # 共通型定義
│   ├── client.ts            # クライアントエントリー
│   └── server.ts            # サーバーエントリー
├── ui/                      # UI関連（React + Vite）
│   ├── src/                 # UIソースコード
│   │   ├── components/      # 再利用可能なコンポーネント
│   │   ├── pages/           # 画面単位のコンポーネント
│   │   │   ├── Home/
│   │   │   ├── Settings/
│   │   │   └── index.ts
│   │   ├── hooks/           # カスタムフック
│   │   │   ├── useNuiEvent.ts   # NUIイベントハンドリング
│   │   │   └── useNuiRequest.ts # サーバー通信
│   │   ├── store/           # 状態管理（Zustand/Redux等）
│   │   │   ├── slices/
│   │   │   └── index.ts
│   │   ├── utils/           # ユーティリティ関数
│   │   │   ├── fetchNui.ts  # NUI通信関数
│   │   │   └── misc.ts
│   │   ├── types/           # 型定義
│   │   │   └── index.ts
│   │   ├── styles/          # グローバルスタイル
│   │   │   ├── global.css
│   │   │   └── variables.css
│   │   ├── App.tsx          # メインコンポーネント
│   │   ├── main.tsx         # エントリーポイント
│   │   └── vite-env.d.ts    # Vite環境変数定義
│   ├── public/              # 静的ファイル
│   │   ├── assets/          # 画像やフォント
│   │   │   ├── images/
│   │   │   └── fonts/
│   │   ├── locales/         # 多言語対応ファイル
│   │   └── favicon.ico      # ファビコン
│   ├── index.html           # HTMLエントリーポイント
│   ├── package.json         # UI依存関係
│   ├── tsconfig.json        # TypeScript設定
│   ├── tailwind.config.js   # Tailwind CSS設定（使用する場合）
│   ├── postcss.config.js    # PostCSS設定（使用する場合）
│   ├── .eslintrc.js         # ESLint設定
│   └── vite.config.ts       # Vite設定
├── dist/                    # ビルド済みファイル
│   ├── client.js
│   ├── client.js.map
│   ├── server.js
│   └── server.js.map
├── builder/                 # ビルドスクリプト
│   ├── build.mjs            # メインビルドスクリプト
│   └── esbuild-wrapper.mjs  # esbuildラッパー
├── fxmanifest.lua           # FiveMリソースマニフェスト
├── tsconfig.json            # TypeScript共通設定
├── tsconfig.client.json     # クライアント用設定
├── tsconfig.server.json     # サーバー用設定
├── package.json             # 依存関係
└── README.md                # ドキュメント
```
