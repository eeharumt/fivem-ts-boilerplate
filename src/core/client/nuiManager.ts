/**
 * クライアント側UI操作
 */
import { Utils } from "../shared";
import { sendNuiMessage } from "./events";

/**
 * UI識別子の型（文字列）
 */
export type UIId = string;

/**
 * UI設定インターフェース
 */
export interface UIOptions {
  focus?: boolean; // NUIフォーカスが必要かどうか
  cursor?: boolean; // カーソル表示が必要かどうか
  keepInput?: boolean; // キー入力を維持するかどうか
}

/**
 * NUI管理クラス
 */
class NUIManager {
  protected visibleState: Record<string, boolean> = {};
  protected activeUI: string | null = null;

  constructor() {}

  /**
   * NUIの表示/非表示を切り替える
   * @param uiId UI識別子
   * @param visible 表示するかどうか
   * @param options UI表示オプション
   */
  toggle(uiId: UIId, visible?: boolean, options: UIOptions = {}): boolean {
    Utils.debugLog(`NUI toggle: ${uiId}, visible=${visible}, options=${JSON.stringify(options)}`);

    // オプションのデフォルト値設定
    const focus = options.focus ?? true;
    const cursor = options.cursor ?? true;

    // 他のNUIが表示されている場合は非表示にする
    if (visible && this.activeUI && this.activeUI !== uiId) {
      this.visibleState[this.activeUI] = false;

      Utils.debugLog(`Hiding previous NUI: ${this.activeUI}`);

      // 以前のUIに非表示を通知
      sendNuiMessage({
        type: "setVisible",
        payload: {
          visible: false,
          uiId: this.activeUI,
        },
      });
    }

    // 表示状態を更新
    const newVisibleState = visible !== undefined ? visible : !this.visibleState[uiId];
    this.visibleState[uiId] = newVisibleState;

    Utils.debugLog(`Updated visibility for ${uiId}: ${newVisibleState}`);

    // アクティブなUIを更新
    this.activeUI = newVisibleState ? uiId : null;

    // カーソルとフォーカスの設定
    if (this.activeUI) {
      SetNuiFocus(focus, cursor);
    } else {
      SetNuiFocus(false, false);
    }

    Utils.debugLog(`SetNuiFocus: focus=${focus}, cursor=${cursor}`);

    // UIに表示状態を通知
    const message = {
      type: "setVisible",
      payload: {
        visible: newVisibleState,
        uiId,
      },
    };

    Utils.debugLog(`Sending NUI message: ${JSON.stringify(message)}`);
    sendNuiMessage(message);

    return newVisibleState;
  }

  /**
   * UIが表示されているかどうかを確認
   * @param uiId UI識別子
   */
  isVisible(uiId: UIId): boolean {
    return !!this.visibleState[uiId];
  }

  /**
   * 現在アクティブなUIを取得
   */
  getActiveUI(): string | null {
    return this.activeUI;
  }

  /**
   * すべてのNUIを非表示にする
   */
  hideAll(): void {
    // すべてのUIを非表示に
    Object.keys(this.visibleState).forEach((uiId) => {
      if (this.visibleState[uiId]) {
        this.visibleState[uiId] = false;

        // UIに非表示を通知
        sendNuiMessage({
          type: "setVisible",
          payload: {
            visible: false,
            uiId,
          },
        });
      }
    });

    // アクティブなUIをリセット
    this.activeUI = null;

    // カーソルを非表示
    SetNuiFocus(false, false);
  }

  /**
   * NUIにメッセージを送信
   * @param uiId UI識別子
   * @param type メッセージタイプ
   * @param payload データ
   */
  sendMessage(uiId: UIId, type: string, payload: any): void {
    sendNuiMessage({
      type,
      payload,
      uiId,
    });
  }
}

// シングルトンインスタンスの作成
const nuiManager = new NUIManager();

// 新しいUIマネージャーをエクスポート
export { nuiManager };
