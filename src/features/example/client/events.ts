/**
 * サンプル機能のクライアント側イベントハンドラ
 */
import { ResourceName } from "../../../core/shared/constants";
import { Events } from "../shared/event";
import { Events as CoreEvents } from "../../../core/client";
import { Types } from "../shared";

/**
 * サーバーからのプレイヤー更新イベントを登録する
 * @param callback コールバック関数
 */
export const onPlayersUpdated = (callback: (players: Types.Player[]) => void) => {
  CoreEvents.onServerEvent(ResourceName + ":" + Events.UPDATE_PLAYERS, callback);
};
