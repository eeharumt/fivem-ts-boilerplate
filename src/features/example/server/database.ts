/**
 * サンプル機能のサーバー側データベース操作
 */
import { oxmysql } from "@overextended/oxmysql";
import { Utils } from "../../../core/shared";
import { Types } from "../shared";

/**
 * プレイヤー一覧をデータベースから取得する
 * @returns プレイヤーリスト
 */
export const getPlayers = async (): Promise<Types.Player[]> => {
  try {
    const query = "SELECT id, citizenid, name, job FROM players";
    const players = await oxmysql.query<Types.Player[]>(query);
    return players || [];
  } catch (error) {
    Utils.debugLog("Error loading player data", error);
    return [];
  }
};
