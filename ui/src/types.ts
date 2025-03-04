/**
 * UI関連の型定義
 */

/**
 * UI識別子の型定義
 * クライアント側のnuiManager.tsと一致させる
 */
export type UIId = string;

/**
 * NUIメッセージの型定義
 */
export interface NUIMessage<T = any> {
  type: string;
  payload: T;
  uiId?: UIId;
}

/**
 * 表示状態メッセージペイロード
 */
export interface VisibilityPayload {
  visible: boolean;
  uiId: UIId;
}

/**
 * UI表示オプション
 * クライアント側のnuiManager.tsと一致
 */
export interface UIOptions {
  focus?: boolean;  // NUIフォーカスが必要かどうか
  cursor?: boolean; // カーソル表示が必要かどうか
  keepInput?: boolean; // キー入力を維持するかどうか
}

/**
 * サンプル設定
 */
export interface ExampleSettings {
  enabled: boolean;
  color: string;
  size: 'small' | 'medium' | 'large';
}

/**
 * メニュー項目
 */
export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  description?: string;
  disabled?: boolean;
} 