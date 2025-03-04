import React, { useEffect, useState } from 'react';
import { sendNuiMessage } from '../../api';
import { MenuItem } from '../../types';

interface MenuPageProps {
  visible: boolean;
  onClose?: () => void;
}

const MenuPage: React.FC<MenuPageProps> = ({ visible, onClose }) => {
  const [title, setTitle] = useState<string>('メニュー');
  const [items, setItems] = useState<MenuItem[]>([
    { id: 'item1', label: 'アイテム 1', description: 'アイテム1の説明文' },
    { id: 'item2', label: 'アイテム 2', description: 'アイテム2の説明文' },
    { id: 'item3', label: 'アイテム 3', description: 'アイテム3の説明文', disabled: true },
  ]);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

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
    const { type, payload, uiType } = event.data;
    
    // このコンポーネントに関係ないメッセージは無視
    if (uiType && uiType !== "menu") return;
    
    if (type === "initMenu" && payload) {
      if (payload.title) setTitle(payload.title);
      if (payload.items) setItems(payload.items);
    }
  };

  // メニューアイテムクリックハンドラー
  const handleItemClick = (item: MenuItem) => {
    if (item.disabled) return;
    
    sendNuiMessage("menuItemSelected", { itemId: item.id }, "menu");
  };

  // 閉じるボタンクリックハンドラー
  const handleCloseClick = () => {
    console.log('Menu: 閉じるボタンがクリックされました');
    
    // NUIメッセージを送信
    sendNuiMessage("closeUI", { uiType: "menu" }, "menu")
      .then(response => {
        console.log('closeUI応答:', response);
        
        // 親コンポーネントに閉じるイベントを通知（存在する場合）
        if (onClose) {
          console.log('親コンポーネントの閉じるコールバックを呼び出します');
          onClose();
        }
      })
      .catch(error => {
        console.error('closeUIエラー:', error);
      });
  };

  // UIが非表示の場合は何も表示しない
  if (!visible) {
    return null;
  }

  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      width: '350px',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        paddingBottom: '10px'
      }}>
        <h2 style={{ margin: 0, fontSize: '18px' }}>{title}</h2>
        <button
          onClick={handleCloseClick}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '18px',
            padding: '5px',
          }}
        >
          ✕
        </button>
      </div>
      
      <div>
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            onMouseEnter={() => setHoveredItemId(item.id)}
            onMouseLeave={() => setHoveredItemId(null)}
            style={{
              padding: '12px 15px',
              margin: '8px 0',
              backgroundColor: item.disabled 
                ? 'rgba(100, 100, 100, 0.3)' 
                : hoveredItemId === item.id 
                  ? 'rgba(70, 70, 70, 0.9)' 
                  : 'rgba(50, 50, 50, 0.7)',
              borderRadius: '4px',
              cursor: item.disabled ? 'not-allowed' : 'pointer',
              opacity: item.disabled ? 0.6 : 1,
              transition: 'background-color 0.2s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {item.icon && (
                <span style={{ marginRight: '10px' }}>{item.icon}</span>
              )}
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '3px' }}>{item.label}</div>
                {item.description && (
                  <div style={{ fontSize: '12px', color: '#aaa' }}>{item.description}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage; 