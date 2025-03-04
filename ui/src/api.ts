/**
 * FiveM NUI通信用APIモジュール
 */
import { UIId } from './types';

// FiveM用の型拡張
declare global {
  interface Window {
    invokeNative?: any;
    GetParentResourceName?: () => string;
  }
}

// 開発モードかどうか判定（window.invokeNative関数の有無で判定）
const isDevelopment = !window.invokeNative;

// リソース名の取得
const getResourceName = () => {
  // 開発モードの場合はフォールバック値を使用
  if (isDevelopment) {
    return 'resource-placeholder'; // 開発モードでのプレースホルダー
  }
  
  // @ts-ignore - FiveM API
  return window.GetParentResourceName ? window.GetParentResourceName() : 'resource-placeholder';
};

/**
 * NUIメッセージを送信する
 * @param eventName イベント名
 * @param data データオブジェクト
 * @param uiId UI識別子
 * @returns レスポンスデータ（あれば）
 */
export const sendNuiMessage = async (
  eventName: string, 
  data: any = {}, 
  uiId: UIId = 'default'
) => {
  // リソース名
  const resourceName = getResourceName();
  
  // デバッグログ
  console.log(`API: NUIメッセージ送信 - ${eventName}`, { data, uiId, resourceName });
  
  try {
    const response = await fetch(`https://${resourceName}/${eventName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ ...data, uiId }),
    });
    
    const responseData = await response.json();
    console.log(`API: NUIメッセージ応答 - ${eventName}`, responseData);
    
    return responseData;
  } catch (error) {
    console.error('NUIメッセージ送信エラー:', error);
    
    // 開発モードであればモックレスポンスを返す
    if (isDevelopment) {
      console.log('開発モード: モックレスポンスを返します');
      return { status: 'ok', mockData: true };
    }
    
    return { error: true };
  }
}; 