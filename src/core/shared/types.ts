/**
 * 共有型定義
 */


/**
 * プレイヤー情報
 */
export interface PlayerData {
  id: number;
  name: string;
  identifier: string;
}

/**
 * UIメッセージ
 */
export interface UIMessage<T = any> {
  type: string;
  payload: T;
}

/**
 * コマンドパラメータ
 */
export interface CommandParams {
  [key: string]: string | number | boolean;
}

/**
 * イベントハンドラー
 */
export type EventHandler<T = any> = (data: T) => void;

/**
 * コマンドハンドラー
 */
export type CommandHandler = (source: number, args: string[], raw: string) => void;
