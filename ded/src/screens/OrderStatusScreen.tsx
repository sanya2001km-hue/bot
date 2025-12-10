// screens/OrderStatusScreen.tsx
import React, { useState, useEffect } from 'react';

interface OrderStatusScreenProps {
  order: any;
}

export const OrderStatusScreen: React.FC<OrderStatusScreenProps> = ({ order }) => {
  const [orderStatus, setOrderStatus] = useState('processing');
  const [timeLeft, setTimeLeft] = useState(1800); // 30 минут в секундах
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          setOrderStatus('completed');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const orderNumber = Math.floor(Math.random() * 10000) + 10000;
  
  return (
    <div className="status-screen">
      <div className="status-header">
        <div className="status-icon">✅</div>
        <h2>ЗАКАЗ ОПЛАЧЕН</h2>
      </div>
      
      <div className="status-details">
        <div className="order-number">
          📦 Заказ #{orderNumber}
        </div>
        
        <div className="status-info">
          <div className="status-item">
            <span className="status-label">⚙️ Статус:</span>
            <span className="status-value">
              {orderStatus === 'processing' ? 'В обработке' : 'Выполнен'}
            </span>
          </div>
          
          {orderStatus === 'processing' && (
            <div className="status-item">
              <span className="status-label">⏳ Ожидаемое время:</span>
              <span className="status-value">{formatTime(timeLeft)}</span>
            </div>
          )}
        </div>
        
        <div className="divider" />
        
        <div className="order-items">
          <h4>Детали заказа:</h4>
          
          <div className="item-detail">
            <span>🎮 Игра:</span>
            <span>{order?.game?.toUpperCase() || 'PUBG MOBILE'}</span>
          </div>
          
          <div className="item-detail">
            <span>💎 Товар:</span>
            <span>{order?.name || '120 UC'}</span>
          </div>
          
          {order?.playerId && (
            <div className="item-detail">
              <span>🆔 Player ID:</span>
              <span>{order.playerId}</span>
            </div>
          )}
          
          <div className="item-detail">
            <span>💰 Сумма:</span>
            <span>{order?.price || '151'} ₽</span>
          </div>
        </div>
        
        <div className="divider" />
        
        <div className="delivery-info">
          <p>📬 Уведомление придет в бот когда заказ будет выполнен</p>
          <p>💬 Проблемы? Напишите: @fast_uc</p>
        </div>
      </div>
      
      <div className="action-buttons">
        <button className="main-button">
          Отслеживать статус
        </button>
        <button className="secondary-button">
          Связаться с поддержкой
        </button>
      </div>
    </div>
  );
};