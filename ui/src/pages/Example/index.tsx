import React, { useEffect, useState } from 'react';
import { sendNuiMessage } from '../../api';
import { ExampleSettings } from '../../types';

interface ExampleProps {
  visible: boolean;
  onClose?: () => void;
}

const ExamplePage: React.FC<ExampleProps> = ({ visible, onClose }) => {
  const [message, setMessage] = useState<string>('FiveM TypeScriptプラグインへようこそ！');
  const [settings, setSettings] = useState<ExampleSettings>({
    enabled: false,
    color: '#3498db',
    size: 'medium'
  });

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
    if (uiType && uiType !== "example") return;
    
    if (type === "initExample" && payload) {
      setSettings(payload);
      setMessage('設定が更新されました！');
    }
  };

  // 閉じるボタンクリックハンドラー
  const handleCloseClick = () => {
    console.log('Example: 閉じるボタンがクリックされました');
    
    // NUIメッセージを送信
    sendNuiMessage("closeUI", { uiType: "example" }, "example")
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

  // UIの表示状態が変更されたときのデバッグログ
  useEffect(() => {
    console.log('Example: 表示状態が変更されましaた', { visible });
  }, [visible]);

  // UIが非表示の場合は何も表示しない
  if (!visible) {
    return null;
  }

  // サイズに基づいてスタイルを調整
  const getContainerStyle = () => {
    const baseStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      margin: '0 auto',
      textAlign: 'center' as const,
      position: 'absolute' as const,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    };
    
    switch (settings.size) {
      case 'small':
        return { ...baseStyle, maxWidth: '300px' };
      case 'large':
        return { ...baseStyle, maxWidth: '500px' };
      default:
        return { ...baseStyle, maxWidth: '400px' };
    }
  };

  return (
    <div style={getContainerStyle()}>
      <h2 style={{ margin: '0 0 15px', color: settings.color }}>サンプルUI</h2>
      <p style={{ margin: '0 0 20px' }}>{message}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <p>設定:</p>
          <ul style={{ textAlign: 'left' }}>
            <li>有効: {settings.enabled ? 'はい' : 'いいえ'}</li>
            <li>色: {settings.color}</li>
            <li>サイズ: {settings.size}</li>
          </ul>
        </div>
        <button
          onClick={handleCloseClick}
          style={{
            backgroundColor: '#e74c3c',
            border: 'none',
            color: 'white',
            padding: '10px 20px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            borderRadius: '4px',
            cursor: 'pointer',
            alignSelf: 'flex-end',
            height: 'fit-content'
          }}
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

export default ExamplePage; 