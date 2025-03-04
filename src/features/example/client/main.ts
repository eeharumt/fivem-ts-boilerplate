/**
 * サンプル機能のクライアント側メイン処理
 */
import { Utils } from "../../../core/shared";
import { Types } from "../shared";
import * as Events from "./events";
import * as NUI from "./nui";

// サンプル機能の状態
let players: Types.Player[] = [];

/**
 * サンプル機能を初期化する
 */
export const initialize = () => {
  Utils.debugLog("Initializing example feature...");

  // イベントハンドラーの登録
  registerEventHandlers();

  // コマンドの登録
  registerCommands();

  Utils.debugLog("Example feature initialization completed");
};

/**
 * イベントハンドラーを登録する
 */
const registerEventHandlers = () => {
  // サーバーからのプレイヤー更新イベントを登録
  Events.onPlayersUpdated((updatedPlayers) => {
    Utils.debugLog("Received player data from server", JSON.stringify(updatedPlayers, null, 2));

    if (!updatedPlayers || !Array.isArray(updatedPlayers) || updatedPlayers.length === 0) {
      Utils.debugLog("No valid player data received");
      return;
    }

    players = updatedPlayers;

    // プレイヤーリストをコンソールに表示
    console.log("=== オンラインプレイヤー一覧 ===");
    players.forEach((player) => {
      console.log(`ID: ${player.id} | 名前: ${player.name} | CitizenID: ${player.citizenid}`);
    });
    console.log("==========================");
  });
};

/**
 * コマンドを登録する
 */
const registerCommands = () => {
  // NUIを表示するコマンド
  RegisterCommand(
    "show-example-ui",
    () => {
      Utils.debugLog("Showing example UI");

      // NUIの表示
      const isVisible = NUI.showExample();

      // NUIに初期設定を送信
      if (isVisible) {
        const settings: Types.ExampleSettings = {
          enabled: true,
          color: "#3498db",
          size: "medium",
        };

        NUI.sendInitExample(settings);
      }
    },
    false,
  );

  // NUIを非表示にするコマンド
  RegisterCommand(
    "hide-example-ui",
    () => {
      Utils.debugLog("Hiding example UI");

      // NUIの非表示
      NUI.hideExample();
    },
    false,
  );

  // メニューUIを表示するコマンド
  RegisterCommand(
    "show-menu-ui",
    () => {
      Utils.debugLog("Showing menu UI");

      // メニューUIの表示
      const isVisible = NUI.showMenu();

      // メニューUIに初期設定を送信
      if (isVisible) {
        const title = "プレイヤーメニュー";
        const items: Types.MenuItem[] = [
          {
            id: "player_info",
            label: "プレイヤー情報",
            description: "自分の情報を表示します",
          },
          {
            id: "inventory",
            label: "インベントリ",
            description: "所持品を確認します",
          },
          {
            id: "settings",
            label: "設定",
            description: "ゲーム設定を変更します",
          },
          {
            id: "logout",
            label: "ログアウト",
            description: "ゲームからログアウトします",
            disabled: true,
          },
        ];

        NUI.sendInitMenu(title, items);
      }
    },
    false,
  );

  // メニューUIを非表示にするコマンド
  RegisterCommand(
    "hide-menu-ui",
    () => {
      Utils.debugLog("Hiding menu UI");

      // メニューUIの非表示
      NUI.hideMenu();
    },
    false,
  );

  // すべてのUIを非表示にするコマンド
  RegisterCommand(
    "hide-all-ui",
    () => {
      Utils.debugLog("Hiding all UI");

      // すべてのUIを非表示
      NUI.hideAllUI();
    },
    false,
  );
};
