/**
 * クライアント側コア機能のエントリーポイント
 */
import { ResourceName } from "../shared/constants";
import * as Events from "./events";
import * as NUI from "./nuiManager";

// コア機能の初期化
const initCore = () => {
  console.log(`[${ResourceName}] Initializing client core features...`);

  // 初期化時の処理をここに追加

  console.log(`[${ResourceName}] Client core features initialization completed`);
};

// エクスポート
export { Events, NUI, initCore };
