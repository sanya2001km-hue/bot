// screens/PaymentScreen.tsx
import React, { useState, useEffect } from 'react';
import { useTelegram } from '../components/TelegramProvider';

interface PaymentScreenProps {
  order: any;
  onSuccess: () => void;
}

const paymentMethods = [
  { id: 'stars', name: 'Telegram Stars', icon: '⭐', description: 'Встроенная оплата Telegram' },
  { id: 'card', name: 'Банковская карта', icon: '💳', description: 'Visa, Mastercard, МИР' },
  { id: 'sbp', name: 'СБП', icon: '🔗', description: 'Система быстрых платежей' },
  { id: 'crypto', name: 'Криптовалюта', icon: '₿', description: 'Bitcoin, USDT, Toncoin' },
];

export const PaymentScreen: React.FC<PaymentScreenProps> = ({ order, onSuccess }) => {
  const { webApp } = useTelegram();
  const [selectedMethod, setSelectedMethod] = useState('stars');
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    if (webApp?.MainButton) {
      webApp.MainButton.setText(`Оплатить ${order?.price || 0} ₽`);
      webApp.MainButton.show();
      
      const handlePayment = () => {
        processPayment();
      };
      
      webApp.MainButton.onClick(handlePayment);
      
      return () => {
        webApp.MainButton.offClick(handlePayment);
      };
    }
  }, [webApp, order, selectedMethod]);
  
  const processPayment = async () => {
    if (!order || isProcessing) return;
    
    setIsProcessing(true);
    
    try {
      if (selectedMethod === 'stars') {
        // Оплата через Telegram Stars
        const invoiceData = {
          title: `${order.game.toUpperCase()} - ${order.name}`,
          description: `Покупка ${order.quantity || order.name}`,
          payload: `order_${Date.now()}`,
          currency: 'XTR',
          prices: [
            { label: order.name, amount: order.price * 100 } // В копейках/центах
          ]
        };
        
        if (webApp?.openInvoice) {
          webApp.openInvoice('https://payment.invoice.link', (status) => {
            if (status === 'paid') {
              onSuccess();
            } else {
              alert('Оплата не прошла');
            }
            setIsProcessing(false);
          });
        } else {
          // Fallback для тестирования
          setTimeout(() => {
            onSuccess();
            setIsProcessing(false);
          }, 2000);
        }
      } else {
        // Для других методов оплаты - редирект или внешняя форма
        alert(`Оплата через ${paymentMethods.find(m => m.id === selectedMethod)?.name} в разработке`);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Ошибка при обработке платежа');
      setIsProcessing(false);
    }
  };
  
  if (!order) {
    return (
      <div className="payment-screen">
        <p>Нет данных заказа</p>
      </div>
    );
  }
  
  return (
    <div className="payment-screen">
      <h2>Подтверждение заказа</h2>
      
      <div className="order-details">
        <h3>✅ ПРОВЕРЬТЕ ДАННЫЕ:</h3>
        
        <div className="detail-item">
          <span className="detail-label">🎮 Игра:</span>
          <span className="detail-value">{order.game.toUpperCase()}</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">💎 Товар:</span>
          <span className="detail-value">{order.name}</span>
        </div>
        
        {order.playerId && (
          <div className="detail-item">
            <span className="detail-label">🆔 Player ID:</span>
            <span className="detail-value">{order.playerId}</span>
          </div>
        )}
        
        {order.steamLogin && (
          <>
            <div className="detail-item">
              <span className="detail-label">👤 Steam Login:</span>
              <span className="detail-value">{order.steamLogin}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">💰 Сумма:</span>
              <span className="detail-value">{order.amount} ₽</span>
            </div>
          </>
        )}
        
        <div className="divider" />
        
        <div className="total-payment">
          <span>💰 К оплате:</span>
          <span className="total-amount">{order.price} ₽</span>
        </div>
      </div>
      
      <div className="warning-section">
        <p>⚠️ После оплаты возврат невозможен!</p>
      </div>
      
      <div className="payment-methods">
        <h3>💳 Способ оплаты:</h3>
        
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`method-item ${selectedMethod === method.id ? 'selected' : ''}`}
            onClick={() => setSelectedMethod(method.id)}
          >
            <div className="method-icon">{method.icon}</div>
            <div className="method-info">
              <div className="method-name">{method.name}</div>
              <div className="method-description">{method.description}</div>
            </div>
            <div className="method-radio">
              {selectedMethod === method.id && '✓'}
            </div>
          </div>
        ))}
      </div>
      
      {isProcessing && (
        <div className="processing-overlay">
          <div className="processing-spinner"></div>
          <p>Обработка платежа...</p>
        </div>
      )}
    </div>
  );
};