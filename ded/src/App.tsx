// App.tsx - Главный компонент приложения
import React, { useEffect, useState } from 'react';
import { TelegramProvider, useTelegram } from './components/TelegramProvider';
import { MainScreen } from './screens/MainScreen';
import { CategoryScreen } from './screens/CategoryScreen';
import { OrderScreen } from './screens/OrderScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { PaymentScreen } from './screens/PaymentScreen';
import { OrderStatusScreen } from './screens/OrderStatusScreen';
import './styles/global.css';

const AppContent: React.FC = () => {
  const { webApp } = useTelegram();
  const [currentScreen, setCurrentScreen] = useState<'main' | 'category' | 'order' | 'payment' | 'profile' | 'status'>('main');
  const [selectedGame, setSelectedGame] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [orderData, setOrderData] = useState<any>(null);
  
  useEffect(() => {
    if (webApp) {
      webApp.expand();
      webApp.enableClosingConfirmation();
      
      // Настраиваем кнопку "Назад"
      const handleBackButton = () => {
        switch(currentScreen) {
          case 'category':
            setCurrentScreen('main');
            break;
          case 'order':
            setCurrentScreen('category');
            break;
          case 'payment':
            setCurrentScreen('order');
            break;
          case 'profile':
          case 'status':
            setCurrentScreen('main');
            break;
        }
      };
      
      webApp.BackButton.show();
      webApp.BackButton.onClick(handleBackButton);
      
      return () => {
        webApp.BackButton.offClick(handleBackButton);
      };
    }
  }, [webApp, currentScreen]);
  
  const handleGameSelect = (game: string) => {
    setSelectedGame(game);
    setCurrentScreen('category');
  };
  
  const handleProductSelect = (product: any) => {
    setSelectedProduct(product);
    setCurrentScreen('order');
  };
  
  const handleOrderSubmit = (data: any) => {
    setOrderData({ ...data, product: selectedProduct, game: selectedGame });
    setCurrentScreen('payment');
  };
  
  const handlePaymentSuccess = () => {
    setCurrentScreen('status');
  };
  
  const renderScreen = () => {
    switch(currentScreen) {
      case 'main':
        return <MainScreen onGameSelect={handleGameSelect} />;
      case 'category':
        return <CategoryScreen game={selectedGame} onProductSelect={handleProductSelect} />;
      case 'order':
        return <OrderScreen product={selectedProduct} game={selectedGame} onSubmit={handleOrderSubmit} />;
      case 'payment':
        return <PaymentScreen order={orderData} onSuccess={handlePaymentSuccess} />;
      case 'status':
        return <OrderStatusScreen order={orderData} />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <MainScreen onGameSelect={handleGameSelect} />;
    }
  };
  
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          {currentScreen !== 'main' && (
            <button 
              className="back-button"
              onClick={() => {
                switch(currentScreen) {
                  case 'category': setCurrentScreen('main'); break;
                  case 'order': setCurrentScreen('category'); break;
                  case 'payment': setCurrentScreen('order'); break;
                  case 'profile':
                  case 'status': setCurrentScreen('main'); break;
                }
              }}
            >
              ←
            </button>
          )}
          <h1 className="app-title">MITYA UC BOT</h1>
        </div>
      </header>
      <main className="app-main">
        {renderScreen()}
      </main>
      <footer className="app-footer">
        <button 
          className="footer-button"
          onClick={() => setCurrentScreen('main')}
        >
          🏠 Главная
        </button>
        <button 
          className="footer-button"
          onClick={() => setCurrentScreen('profile')}
        >
          👤 Профиль
        </button>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <TelegramProvider>
      <AppContent />
    </TelegramProvider>
  );
};

export default App;