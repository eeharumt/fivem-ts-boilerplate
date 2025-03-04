/**
 * サーバー側コア機能のエントリーポイント
 */
import { ResourceName } from "../shared/constants";
import * as Events from "./events";

// コア機能の初期化
const initCore = () => {
  console.log(`[${ResourceName}] Initializing server core features...`);

  // 初期化時の処理をここに追加

  console.log(`[${ResourceName}] Server core features initialization completed`);
};

// エクスポート
export { Events, initCore };
