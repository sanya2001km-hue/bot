// screens/ProfileScreen.tsx
import React, { useState, useEffect } from 'react';
import { useTelegram } from '../components/TelegramProvider';

export const ProfileScreen: React.FC = () => {
  const { user } = useTelegram();
  const [balance, setBalance] = useState(0);
  const [orders, setOrders] = useState<any[]>([]);
  
  useEffect(() => {
    // Загрузка данных пользователя
    const mockOrders = [
      { id: 12345, game: 'PUBG Mobile', product: '120 UC', price: 151, status: 'completed', date: '08.12.2025 15:30' },
      { id: 12344, game: 'Steam', product: '1000 ₽', price: 1020, status: 'completed', date: '07.12.2025 12:15' },
      { id: 12343, game: 'Free Fire', product: '100 Diamonds', price: 89, status: 'completed', date: '06.12.2025 10:45' },
    ];
    setOrders(mockOrders);
  }, []);
  
  const totalSpent = orders.reduce((sum, order) => sum + order.price, 0);
  
  return (
    <div className="profile-screen">
      <div className="profile-header">
        <div className="profile-icon">👤</div>
        <div className="profile-info">
          <h2>МОЙ ПРОФИЛЬ</h2>
          <p className="user-id">User ID: {user?.id || '123456789'}</p>
          <p className="registration-date">📅 Регистрация: 01.12.2025</p>
        </div>
      </div>
      
      <div className="balance-section">
        <div className="balance-info">
          <span className="balance-label">💰 Баланс:</span>
          <span className="balance-amount">{balance} ₽</span>
        </div>
        <button className="balance-button">
          Пополнить
        </button>
      </div>
      
      <div className="stats-section">
        <h3>📊 Статистика:</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">{orders.length}</div>
            <div className="stat-label">Заказов</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{totalSpent} ₽</div>
            <div className="stat-label">Потрачено</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">⭐</div>
            <div className="stat-label">Постоянный клиент</div>
          </div>
        </div>
      </div>
      
      <div className="orders-section">
        <h3>📋 История заказов</h3>
        
        {orders.map((order) => (
          <div key={order.id} className="order-item">
            <div className="order-header">
              <span className="order-id">#{order.id}</span>
              <span className="order-status">✅</span>
            </div>
            <div className="order-details">
              <span className="order-game">{order.game}</span>
              <span className="order-product">{order.product}</span>
              <span className="order-price">{order.price} ₽</span>
            </div>
            <div className="order-date">{order.date}</div>
          </div>
        ))}
        
        {orders.length > 2 && (
          <button className="show-more-button">
            Показать еще
          </button>
        )}
      </div>
      
      <div className="settings-section">
        <h3>⚙️ Настройки</h3>
        <div className="settings-list">
          <button className="settings-item">
            <span>💬</span>
            <span>Поддержка (@fast_uc)</span>
          </button>
          <button className="settings-item">
            <span>❓</span>
            <span>FAQ и помощь</span>
          </button>
          <button className="settings-item">
            <span>🔔</span>
            <span>Уведомления</span>
          </button>
          <button className="settings-item">
            <span>📱</span>
            <span>Тема оформления</span>
          </button>
        </div>
      </div>
    </div>
  );
};