/**
 * サーバー側イベント基盤
 */

/**
 * 特定のクライアントにイベントを送信する
 * @param eventName イベント名
 * @param playerId プレイヤーID
 * @param args 引数
 */
export const emitToClient = (eventName: string, playerId: number | string, ...args: any[]) => {
  emitNet(eventName, playerId, ...args);
};

/**
 * 全クライアントにイベントを送信する
 * @param eventName イベント名
 * @param args 引数
 */
export const emitToAllClients = (eventName: string, ...args: any[]) => {
  emitNet(eventName, -1, ...args);
};

/**
 * クライアントからのイベントを登録する
 * @param eventName イベント名
 * @param callback コールバック関数
 */
export const onClientEvent = (eventName: string, callback: (...args: any[]) => void) => {
  onNet(eventName, callback);
};
