/**
 * サンプル機能の型定義
 */

/**
 * プレイヤー情報
 */
export interface Player {
  id: number;
  name: string;
  citizenid: string;
  // オプショナルプロパティとして他のフィールドを定義
  userId?: number | null;
  cid?: number | null;
  license?: string;
  money?: string;
  charinfo?: string | null;
  job?: string;
  gang?: string | null;
  position?: string;
  metadata?: string;
  inventory?: string | null;
  phone_number?: string | null;
  last_updated?: string;
  last_logged_out?: string | null;
  pincode?: number | null;
  e_core?: string | null;
  ganginfo?: string | null;
}

/**
 * サンプル設定
 */
export interface ExampleSettings {
  enabled: boolean;
  color: string;
  size: "small" | "medium" | "large";
}

/**
 * メニューアイテム
 */
export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  description?: string;
  disabled?: boolean;
}
