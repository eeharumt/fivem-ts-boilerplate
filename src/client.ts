/**
 * クライアント側エントリーポイント
 */
import { ResourceName } from "./core/shared/constants";
import { Events, initCore } from "./core/client";
import { Utils } from "./core/shared";
import { initialize as initExample } from "./features/example/client";

// クライアント側の初期化
const initClient = async () => {
  Utils.debugLog("Initializing client side...");

  // コア機能の初期化
  initCore();

  // 各機能の初期化
  initExample();

  // クライアントがロードされたことをサーバーに通知
  emitNet(ResourceName + ":" + "clientLoaded", GetPlayerServerId(PlayerId()));

  Utils.debugLog("Client side initialization completed!");
};

// 初期化を実行
initClient().catch((error) => {
  console.error(`[${ResourceName}] Client initialization error:`, error);
});

Events.onServerEvent(ResourceName + ":" + "showMessage", (message: string) => {
  Utils.debugLog("Server message:", message);
});

// UIからのコールバックを登録
RegisterNuiCallback(`${ResourceName}:buttonClicked`, (data: any, cb: (data: any) => void) => {
  Utils.debugLog("UI button clicked");
  emitNet(`${ResourceName}:uiAction`, data);
  cb({ status: "success" });
});
