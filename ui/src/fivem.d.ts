/**
 * FiveM関連の型定義
 */

interface Window {
  invokeNative?: (native: string, ...args: any[]) => void;
  GetParentResourceName?: () => string;
} 