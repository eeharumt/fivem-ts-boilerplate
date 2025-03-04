/**
 * サーバー側エントリーポイント
 */
import { ResourceName } from "./core/shared/constants";
import { initCore } from "./core/server";
import { Utils } from "./core/shared";
import { initialize as initExample } from "./features/example/server";

// グローバル関数の型定義
declare function GetPlayerName(source: string | number): string;
declare const source: number; // FiveMの現在のソース

console.log(`[${ResourceName}] Server script started!`);

// サーバー側の初期化
const initServer = async () => {
  Utils.debugLog("Initializing server side...");

  // コア機能の初期化
  initCore();

  // 各機能の初期化
  await initExample();

  Utils.debugLog("Server side initialization completed");
};

// 初期化を実行
initServer().catch((error) => {
  console.error(`[${ResourceName}] Server initialization error:`, error);
});

// クライアントからのイベント登録
onNet(ResourceName + ":" + "clientLoaded", () => {
  const playerSource = source;
  const playerName = GetPlayerName(playerSource.toString());
  Utils.debugLog(`Player ${playerName} (${playerSource}) loaded`);

  // 接続したクライアントにメッセージを送信
  emitNet(ResourceName + ":" + "showMessage", playerSource, `Welcome, ${playerName}!`);
});
