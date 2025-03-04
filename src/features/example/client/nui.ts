/**
 * サンプル機能のクライアント側NUI関連処理
 */
import { Events, NUI } from "../../../core/client";
import { Utils } from "../../../core/shared";
import { Types } from "../shared";

/**
 * NUIにサンプル機能を初期化するメッセージを送信する
 * @param settings 初期設定
 */
export const sendInitExample = (settings: Types.ExampleSettings) => {
  NUI.nuiManager.sendMessage("example", "initExample", settings);
};

/**
 * NUIにメニューを初期化するメッセージを送信する
 * @param title メニュータイトル
 * @param items メニューアイテム
 */
export const sendInitMenu = (title: string, items: Types.MenuItem[]) => {
  NUI.nuiManager.sendMessage("menu", "initMenu", { title, items });
};

export const showExample = () => {
  return NUI.nuiManager.toggle("example", true);
};

export const showMenu = () => {
  return NUI.nuiManager.toggle("menu", true);
};

export const hideExample = () => {
  return NUI.nuiManager.toggle("example", false);
};

export const hideMenu = () => {
  return NUI.nuiManager.toggle("menu", false);
};
/**
 * NUIコールバックを登録する
 */
export const registerNUICallbacks = () => {
  // UIを閉じるコールバック
  Events.registerNuiCallback("closeUI", (data, cb) => {
    Utils.debugLog("Received close UI request from NUI", data);

    // UIを閉じる
    if (data.uiType === "example") {
      NUI.nuiManager.toggle("example", false);
    } else if (data.uiType === "menu") {
      NUI.nuiManager.toggle("menu", false);
    } else {
      NUI.nuiManager.toggle("default", false);
    }

    // コールバックを呼び出す
    cb({ status: "ok" });
  });
};

export const hideAllUI = () => {
  NUI.nuiManager.hideAll();
};

// 初期化時にNUIコールバックを登録
registerNUICallbacks();
