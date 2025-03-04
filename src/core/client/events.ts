/**
 * クライアント側イベント基盤
 */
import { Utils } from "../shared";

/**
 * サーバーにイベントを送信する
 * @param eventName イベント名
 * @param args 引数
 */
export const emitToServer = (eventName: string, ...args: any[]) => {
  emitNet(eventName, ...args);
};

/**
 * サーバーからのイベントを登録する
 * @param eventName イベント名
 * @param callback コールバック関数
 */
export const onServerEvent = (eventName: string, callback: (...args: any[]) => void) => {
  onNet(eventName, callback);
};

/**
 * NUIにメッセージを送信する
 * @param data 送信データ
 */
export const sendNuiMessage = (data: any) => {
  Utils.debugLog("Sending NUI message", data);

  try {
    const jsonData = JSON.stringify(data);
    Utils.debugLog("Stringified NUI message", jsonData);

    SendNuiMessage(jsonData);
    Utils.debugLog("NUI message sent successfully");
  } catch (error) {
    Utils.debugLog("Error sending NUI message", error);
  }
};

/**
 * NUIからのコールバックを登録する
 * @param eventName イベント名
 * @param callback コールバック関数
 */
export const registerNuiCallback = (eventName: string, callback: (data: any, cb: (data: any) => void) => void) => {
  RegisterNuiCallback(eventName, callback);
};
