/**
 * 共有定数
 */
export const ResourceName = GetCurrentResourceName();

/**
 * イベント名
 */
export enum Events {
  // クライアント -> サーバー
  CLIENT_LOADED = "clientLoaded",
  COMMAND_EXECUTED = "commandExecuted",
  UI_ACTION = "uiAction",

  // サーバー -> クライアント
  SHOW_MESSAGE = "showMessage",
  UPDATE_DATA = "updateData",

  // NUI関連
  NUI_BUTTON_CLICKED = "buttonClicked",
  NUI_FORM_SUBMITTED = "formSubmitted",
}

/**
 * UIメッセージタイプ
 */
export enum UIMessageTypes {
  SET_VISIBLE = "setVisible",
  UPDATE_MESSAGE = "updateMessage",
  UPDATE_DATA = "updateData",
  SHOW_NOTIFICATION = "showNotification",
}

/**
 * 通知タイプ
 */
export enum NotificationType {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warning",
}
