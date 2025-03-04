/**
 * 共有ユーティリティ関数
 */
import { Config } from "./config";
import { ResourceName } from "./constants";

/**
 * デバッグログを出力する（英語のみ対応）
 * @param message メッセージ（英語のみ）
 * @param data 追加データ
 */
export const debugLog = (message: string, ...data: any[]) => {
  if (Config.DEBUG) {
    // Use only ASCII characters for logging to avoid encoding issues
    const prefix = `[${ResourceName}]`;
    if (data.length > 0) {
      console.log(prefix, message, ...data);
    } else {
      console.log(prefix, message);
    }
  }
};

/**
 * 指定したミリ秒待機する
 * @param ms 待機ミリ秒
 * @returns Promise
 */
export const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * オブジェクトが空かどうかをチェックする
 * @param obj チェック対象オブジェクト
 * @returns 空の場合はtrue
 */
export const isEmptyObject = (obj: Record<string, any>): boolean => {
  return Object.keys(obj).length === 0;
};

/**
 * 配列をチャンクに分割する
 * @param array 分割する配列
 * @param size チャンクサイズ
 * @returns 分割された配列
 */
export const chunkArray = <T>(array: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

/**
 * ランダムなIDを生成する
 * @param length IDの長さ
 * @returns ランダムID
 */
export const generateRandomId = (length: number = 8): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
