import React, { useEffect, useState } from 'react';
import { UIId, VisibilityPayload } from './types';
import { ExamplePage, MenuPage } from './pages';

interface NUIMessage {
  type: string;
  payload: any;
  uiId?: string;
}

const App: React.FC = () => {
  // 各UIの表示状態
  const [visibleUIs, setVisibleUIs] = useState<Record<UIId, boolean>>({
    // 初期状態ではすべて非表示
    "example": false,
    "menu": false,
  });
  
  // 現在アクティブなUI
  const [activeUI, setActiveUI] = useState<UIId | null>(null);

  useEffect(() => {
    // NUIメッセージリスナーを登録
    window.addEventListener('message', handleMessage);
    
    // クリーンアップ
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // NUIメッセージハンドラー
  const handleMessage = (event: MessageEvent) => {
    const message = event.data as NUIMessage;
    
    // 表示状態の更新
    if (message.type === 'setVisible' && message.payload) {
      const visibilityPayload = message.payload as VisibilityPayload;
      const { visible, uiId } = visibilityPayload;
      
      // 表示状態を更新
      setVisibleUIs(prev => ({
        ...prev,
        [uiId]: visible
      }));
      
      // アクティブなUIを更新
      if (visible) {
        setActiveUI(uiId);
      } else if (activeUI === uiId) {
        setActiveUI(null);
      }
    }
  };

  // UIを閉じる関数
  const handleCloseUI = (uiId: UIId) => {
    
    // UIの表示状態を更新
    setVisibleUIs(prev => ({
      ...prev,
      [uiId]: false
    }));
    
    // アクティブなUIを更新
    if (activeUI === uiId) {
      setActiveUI(null);
    }
  };

  return (
    <>
      {/* サンプルUI */}
      <ExamplePage 
        visible={visibleUIs["example"]} 
        onClose={() => handleCloseUI("example")} 
      />
      
      {/* メニューUI */}
      <MenuPage 
        visible={visibleUIs["menu"]} 
        onClose={() => handleCloseUI("menu")}
      />
      
      {/* 他のUIコンポーネントをここに追加 */}
      {/* 例: <InventoryPage visible={visibleUIs[UIType.INVENTORY]} onClose={() => handleCloseUI(UIType.INVENTORY)} /> */}
    </>
  );
};

export default App; 