// screens/MainScreen.tsx
import React from 'react';

interface MainScreenProps {
  onGameSelect: (game: string) => void;
}

const games = [
  { id: 'pubg', name: 'PUBG MOBILE', icon: '🎮' },
  { id: 'steam', name: 'STEAM', icon: '💳' },
  { id: 'stars', name: 'TELEGRAM STARS', icon: '⭐' },
  { id: 'freefire', name: 'FREE FIRE', icon: '🔥' },
  { id: 'mobilelegends', name: 'MOBILE LEGENDS', icon: '⚔️' },
  { id: 'deltaforce', name: 'DELTA FORCE', icon: '🎯' },
  { id: 'genshin', name: 'GENSHIN IMPACT', icon: '🌍' },
  { id: 'honkai', name: 'HONKAI STAR RAIL', icon: '🚀' },
];

export const MainScreen: React.FC<MainScreenProps> = ({ onGameSelect }) => {
  return (
    <div className="main-screen">
      <div className="welcome-message">
        <h2>🎮 Добро пожаловать в MITYA UC BOT 24/7!</h2>
        <p className="subtitle">Магазин игровой валюты и цифровых товаров</p>
      </div>
      
      <div className="games-grid">
        {games.map((game) => (
          <button
            key={game.id}
            className="game-card"
            onClick={() => onGameSelect(game.id)}
          >
            <div className="game-icon">{game.icon}</div>
            <span className="game-name">{game.name}</span>
          </button>
        ))}
      </div>
      
      <div className="info-section">
        <div className="info-item">
          <span className="info-icon">⚡️</span>
          <span>Работаем 24/7</span>
        </div>
        <div className="info-item">
          <span className="info-icon">💬</span>
          <span>Поддержка: @fast_uc</span>
        </div>
      </div>
    </div>
  );
};