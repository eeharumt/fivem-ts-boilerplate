/**
 * サンプル機能のサーバー側メイン処理
 */
import { Events } from "../shared/event";
import { emitToClient } from "../../../core/server/events";
import { Utils } from "../../../core/shared";
import { getPlayers } from "./database";

/**
 * サンプル機能を初期化する
 */
export const initialize = async () => {
  Utils.debugLog("Initializing server-side example feature...");

  // コマンドの登録
  registerCommands();

  Utils.debugLog("Server-side example feature initialization completed");
};

/**
 * コマンドを登録する
 */
const registerCommands = () => {
  // プレイヤー一覧を表示するコマンド
  RegisterCommand(
    "list-players",
    async (source: number) => {
      const playerId = source;
      console.log(playerId);
      // オンラインプレイヤーの取得
      const players = await getPlayers();

      Utils.debugLog(`Sending ${players.length} players to client ${playerId}`);
      emitToClient(Events.UPDATE_PLAYERS, playerId, players);
    },
    false,
  );
};
