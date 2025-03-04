# FiveM TypeScriptボイラープレート

## 概要

このプロジェクトは、FiveMでTypeScriptを使用したプラグイン開発のためのボイラープレートです。以下の特徴があります：

- TypeScriptによるクライアント/サーバーコード開発
- esbuildによる高速バンドル
- React + Viteを使用したNUI（UI）
- モジュール化された機能指向のディレクトリ構造
- QBCore Framework対応
- oxmysqlによるデータベース連携
- Jestによる単体テスト環境

## ディレクトリ構造

```
fivem-typescript-boilerplate/
├── src/                     # ソースコード
│   ├── features/            # 機能モジュール
│   │   └── [機能名]/          # 各機能
│   │       ├── client/      # クライアント側実装
│   │       ├── server/      # サーバー側実装
│   │       └── shared/      # 共有コード
│   ├── core/                # コア機能
│   │   ├── client/          # クライアント共通機能
│   │   ├── server/          # サーバー共通機能 
│   │   └── shared/          # 共有コード
│   ├── client.ts            # クライアントエントリーポイント
│   └── server.ts            # サーバーエントリーポイント
├── ui/                      # UI（React + Vite）
│   ├── src/                 # UIソースコード
│   ├── public/              # 静的ファイル
│   └── dist/                # ビルド済みUI
├── dist/                    # ビルド出力ディレクトリ
├── builder/                 # ビルドスクリプト
├── fxmanifest.lua           # FiveMリソースマニフェスト
├── jest.config.js           # Jestの設定ファイル
└── tsconfig関連ファイル        # TypeScript設定
```

## ボイラープレートの使用方法

### 1. リポジトリのクローン

```bash
git clone https://github.com/yourusername/fivem-typescript-boilerplate.git my-plugin-name
cd my-plugin-name
```

### 2. Gitリポジトリの初期化

```bash
# 既存のGit履歴を削除
rm -rf .git

# 新しいGitリポジトリを初期化
git init
git add .
git commit -m "Initial commit from boilerplate"
```

### 3. プロジェクト情報の更新

以下のファイルを編集して、プロジェクト情報を更新してください：

- `package.json`: name, version, description, author, repository
- `ui/package.json`: name, version
- `fxmanifest.lua`: name, description, author, version
- `LICENSE`: 著作権情報

### 4. 依存関係のインストール

```bash
# メインプロジェクトの依存関係
pnpm install

# UIの依存関係
cd ui
pnpm install
cd ..
```

## セットアップ方法

### 前提条件
- Node.js v16以上
- pnpm v8以上
- FiveM Server

### インストール手順

1. プラグインディレクトリに移動
```bash
cd resources/[plugins]/[プラグイン名]
```

2. 依存関係のインストール
```bash
# メインプロジェクトの依存関係
pnpm install

# UIの依存関係
cd ui
pnpm install
cd ..
```

3. 開発モードでの実行
```bash
# クライアントスクリプトの監視（型チェック）
pnpm dev:client

# サーバースクリプトの監視（型チェック）
pnpm dev:server

# すべてのスクリプトのビルド監視
pnpm dev

# UIの開発サーバー起動
pnpm dev:ui
```

4. 本番用ビルド
```bash
# 全体ビルド
pnpm build

# UIのみビルド
pnpm build:ui
```

## 開発フロー

1. TypeScriptコードを編集する
2. 自動ビルドによりJavaScriptが生成される
3. FiveMコンソールで `refresh; restart [リソース名]` を実行してリソースを再起動する

## 機能拡張

新機能を追加する場合は、`src/features/` ディレクトリに新しいモジュールを作成します：

```
src/features/[新機能名]/
├── client/
│   ├── events.ts     # クライアント側イベント
│   ├── main.ts       # メイン処理
│   └── index.ts      # 初期化・エクスポート
├── server/
│   ├── events.ts     # サーバー側イベント
│   ├── database.ts   # DB操作
│   └── index.ts      # 初期化・エクスポート
└── shared/
    ├── config.ts     # 設定
    ├── constants.ts  # 定数
    └── types.ts      # 型定義
```

## UI開発

このテンプレートでは、React + TypeScript + Viteを使用したモダンなUI開発環境を提供しています。

### UIディレクトリ構造

```
ui/
├── src/                     # UIソースコード
│   ├── components/          # 再利用可能なコンポーネント
│   ├── pages/               # 画面コンポーネント
│   ├── api.ts               # NUI通信用API
│   ├── types.ts             # 型定義
│   ├── fivem.d.ts           # FiveM型定義
│   ├── App.tsx              # メインアプリケーション
│   └── main.tsx             # エントリーポイント
├── public/                  # 静的ファイル
├── dist/                    # ビルド済みUI
├── index.html               # HTMLテンプレート
├── package.json             # 依存関係
├── vite.config.ts           # Vite設定
└── tsconfig.json            # TypeScript設定
```

### NUIとゲーム間の通信

FiveMのNUI（UI）とゲーム間の通信は以下のように行います：

#### ゲームからUIへのデータ送信

```typescript
// クライアント側（src/features/example/client/main.ts）
SendNUIMessage({
  type: 'UPDATE_DATA',
  payload: { 
    someData: 'value'
  },
  uiId: 'default' // UIのID
});
```

#### UIからゲームへのデータ送信

```typescript
// UI側（ui/src/api.ts）
import { UIType } from './types';

export const sendNuiMessage = async (
  eventName: string, 
  data: any = {}, 
  uiId = UIType.DEFAULT
) => {
  // リソース名を取得
  const resourceName = window.GetParentResourceName?.() || 'typescript-test';
  
  try {
    const response = await fetch(`https://${resourceName}/${eventName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ ...data, uiId }),
    });
    
    return await response.json();
  } catch (error) {
    console.error('NUIメッセージ送信エラー:', error);
    return { error: true };
  }
};
```

#### NUIコールバックの登録（クライアント側）

```typescript
// クライアント側（src/features/example/client/main.ts）
RegisterNuiCallback('exampleAction', (data, cb) => {
  // データ処理
  console.log('UIからデータを受信:', data);
  
  // UIへの応答
  cb({ status: 'success' });
});
```

### UI表示の制御

```typescript
// クライアント側（src/features/example/client/main.ts）
// UI表示
SetNuiFocus(true, true); // (キーボード入力, マウス入力)

// UI非表示
SetNuiFocus(false, false);
```

### 開発時のUIデバッグ

開発中は、Viteの開発サーバーを使用してUIを独立して開発できます：

```bash
cd ui
pnpm dev
```

これにより、`http://localhost:3000` でUIにアクセスできます。api.tsには開発モード検出機能が組み込まれており、FiveM環境外でも動作します：

```typescript
// ui/src/api.ts
// 開発モードかどうか判定（window.invokeNative関数の有無で判定）
const isDevelopment = !window.invokeNative;

// 開発モードの場合はモックレスポンスを返す
if (isDevelopment) {
  console.log('開発モード: モックレスポンスを返します');
  return { status: 'ok', mockData: true };
}
```

## デバッグ

- サーバーコンソールとクライアントコンソールでデバッグメッセージを確認できます
- NUIデバッグは開発者ツール（F8）で行います
- TypeScriptの型チェックはエディタと `pnpm typecheck` コマンドで行います

## 依存関係

- qbx_core: QBCore Framework
- oxmysql: データベース操作
- その他の依存パッケージはpackage.jsonを参照

## カスタマイズ

このボイラープレートは、以下の点でカスタマイズ可能です：

1. **依存関係の変更**: QBCore以外のフレームワークを使用する場合は、`fxmanifest.lua`の依存関係を変更してください。
2. **データベース接続**: oxmysql以外のデータベースを使用する場合は、対応するパッケージをインストールし、接続コードを変更してください。
3. **UIフレームワーク**: React以外のフレームワークを使用する場合は、`ui`ディレクトリの設定を変更してください。

## 貢献

バグ報告や機能リクエストは、GitHubのIssueで受け付けています。プルリクエストも歓迎します。

## ライセンス

MIT

---

**注意**: このボイラープレートを使用する前に、`package.json`、`fxmanifest.lua`、`LICENSE`ファイルの情報を更新してください。
