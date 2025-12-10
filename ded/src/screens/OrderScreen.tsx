// screens/OrderScreen.tsx
import React, { useState } from 'react';

interface OrderScreenProps {
  product: any;
  game: string;
  onSubmit: (data: any) => void;
}

export const OrderScreen: React.FC<OrderScreenProps> = ({ product, game, onSubmit }) => {
  const [playerId, setPlayerId] = useState('');
  const [steamLogin, setSteamLogin] = useState('');
  const [amount, setAmount] = useState('');
  
  const handleSubmit = () => {
    if (!product) return;
    
    let gameData = {};
    
    switch(game) {
      case 'pubg':
      case 'freefire':
      case 'mobilelegends':
        if (!playerId.trim()) {
          alert('Пожалуйста, введите Player ID');
          return;
        }
        gameData = { playerId };
        break;
      case 'steam':
        if (!steamLogin.trim() || !amount.trim()) {
          alert('Пожалуйста, заполните все поля');
          return;
        }
        gameData = { steamLogin, amount: parseFloat(amount) };
        break;
      default:
        gameData = { accountInfo: 'Автоматическая доставка' };
    }
    
    onSubmit({
      ...product,
      ...gameData,
      game,
    });
  };
  
  if (!product) {
    return (
      <div className="order-screen">
        <p>Товар не выбран</p>
      </div>
    );
  }
  
  const isSteam = game === 'steam';
  const isStars = game === 'stars';
  const commission = isSteam ? parseFloat(amount || '0') * 0.02 : 0;
  const total = isSteam ? (parseFloat(amount || '0') + commission) : product.price;
  
  return (
    <div className="order-screen">
      <h2>Оформление заказа</h2>
      
      <div className="order-summary">
        <div className="summary-item">
          <span className="summary-label">Игра:</span>
          <span className="summary-value">{game.toUpperCase()}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Товар:</span>
          <span className="summary-value">{product.name}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Сумма:</span>
          <span className="summary-value">{product.price} ₽</span>
        </div>
      </div>
      
      {!isStars && (
        <div className="input-section">
          {isSteam ? (
            <>
              <div className="input-group">
                <label>👤 Логин Steam:</label>
                <input
                  type="text"
                  value={steamLogin}
                  onChange={(e) => setSteamLogin(e.target.value)}
                  placeholder="Введите логин Steam..."
                  className="input-field"
                />
              </div>
              
              <div className="input-group">
                <label>💰 Сумма пополнения (₽):</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Минимум 50 ₽"
                  min="50"
                  className="input-field"
                />
                <small>Минимальная сумма: 50 ₽</small>
              </div>
              
              {amount && (
                <div className="commission-calc">
                  <h4>📊 Расчет:</h4>
                  <div className="calc-item">
                    <span>Сумма:</span>
                    <span>{parseFloat(amount)} ₽</span>
                  </div>
                  <div className="calc-item">
                    <span>Комиссия (2%):</span>
                    <span>+{commission.toFixed(0)} ₽</span>
                  </div>
                  <div className="calc-total">
                    <span>Итого:</span>
                    <span>{total.toFixed(0)} ₽</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="input-group">
                <label>🆔 Введите Player ID:</label>
                <input
                  type="text"
                  value={playerId}
                  onChange={(e) => setPlayerId(e.target.value)}
                  placeholder="Введите ID игрока..."
                  className="input-field"
                />
              </div>
              
              <div className="help-section">
                <h4>ℹ️ Где найти Player ID?</h4>
                <p>Откройте PUBG Mobile → Профиль → ID</p>
              </div>
            </>
          )}
        </div>
      )}
      
      {!isSteam && !isStars && (
        <div className="warning">
          <p>⚠️ Проверьте ID! После оплаты изменить данные нельзя</p>
        </div>
      )}
      
      {isStars && (
        <div className="stars-info">
          <p>⭐ Звезды зачисляются мгновенно на ваш аккаунт</p>
        </div>
      )}
      
      <div className="total-section">
        <div className="total-item">
          <span>💰 Итого к оплате:</span>
          <span className="total-amount">{isSteam ? total.toFixed(0) : product.price} ₽</span>
        </div>
      </div>
      
      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={(!isStars && !playerId && !steamLogin)}
      >
        Продолжить
      </button>
    </div>
  );
};