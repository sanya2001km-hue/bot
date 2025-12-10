// screens/CategoryScreen.tsx
import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  quantity: string;
  icon: string;
}

interface CategoryScreenProps {
  game: string;
  onProductSelect: (product: Product) => void;
}

const gameProducts: Record<string, Product[]> = {
  pubg: [
    { id: 1, name: '60 UC', description: 'Базовый пакет', price: 76, oldPrice: 80, quantity: '60 UC', icon: '💎' },
    { id: 2, name: '120 UC', description: 'Популярный выбор', price: 151, oldPrice: 160, quantity: '120 UC', icon: '💎💎' },
    { id: 3, name: '325 UC', description: 'Выгодный набор', price: 380, oldPrice: 398, quantity: '325 UC', icon: '💎💎💎' },
    { id: 4, name: '660 UC', description: 'Большой пакет', price: 720, oldPrice: 750, quantity: '660 UC', icon: '💎💎💎💎' },
    { id: 5, name: '1800 UC', description: 'Максимальный набор', price: 1890, oldPrice: 2000, quantity: '1800 UC', icon: '💎💎💎💎💎' },
  ],
  steam: [
    { id: 6, name: '50 ₽', description: 'Минимальное пополнение', price: 50, quantity: '50 ₽ Steam', icon: '💳' },
    { id: 7, name: '100 ₽', description: 'Базовое пополнение', price: 100, quantity: '100 ₽ Steam', icon: '💳💳' },
    { id: 8, name: '500 ₽', description: 'Стандартный пакет', price: 500, quantity: '500 ₽ Steam', icon: '💳💳💳' },
    { id: 9, name: '1000 ₽', description: 'Выгодное пополнение', price: 1000, quantity: '1000 ₽ Steam', icon: '💳💳💳💳' },
  ],
  stars: [
    { id: 10, name: '50 Stars', description: '50 Telegram Stars', price: 99, quantity: '50 ⭐', icon: '⭐' },
    { id: 11, name: '100 Stars', description: '100 Telegram Stars', price: 189, quantity: '100 ⭐', icon: '⭐⭐' },
    { id: 12, name: '500 Stars', description: '500 Telegram Stars', price: 899, quantity: '500 ⭐', icon: '⭐⭐⭐' },
    { id: 13, name: '1000 Stars', description: '1000 Telegram Stars', price: 1699, quantity: '1000 ⭐', icon: '⭐⭐⭐⭐' },
  ],
  default: [
    { id: 14, name: 'Базовый набор', description: 'Игровая валюта', price: 100, quantity: 'Набор', icon: '🎮' },
  ]
};

const gameTitles: Record<string, string> = {
  pubg: 'PUBG MOBILE',
  steam: 'STEAM WALLET',
  stars: 'TELEGRAM STARS',
  freefire: 'FREE FIRE',
  mobilelegends: 'MOBILE LEGENDS',
  deltaforce: 'DELTA FORCE',
  genshin: 'GENSHIN IMPACT',
  honkai: 'HONKAI STAR RAIL',
};

export const CategoryScreen: React.FC<CategoryScreenProps> = ({ game, onProductSelect }) => {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    setProducts(gameProducts[game] || gameProducts.default);
  }, [game]);
  
  const gameTitle = gameTitles[game] || 'ИГРА';
  
  return (
    <div className="category-screen">
      <h2 className="category-title">{gameTitle}</h2>
      
      <div className="products-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-header">
              <div className="product-icon">{product.icon}</div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-quantity">{product.quantity}</div>
              </div>
            </div>
            
            <div className="product-price">
              {product.oldPrice && (
                <span className="old-price">{product.oldPrice} ₽</span>
              )}
              <span className="current-price">{product.price} ₽</span>
            </div>
            
            <button
              className="select-button"
              onClick={() => onProductSelect(product)}
            >
              Выбрать
            </button>
          </div>
        ))}
      </div>
      
      {game === 'pubg' && (
        <div className="additional-products">
          <h3>Другие товары PUBG</h3>
          <div className="tags">
            <span className="tag">🏆 Золото</span>
            <span className="tag">⭐ Популярность</span>
            <span className="tag">🚗 Порше</span>
            <span className="tag">👑 Прайм</span>
          </div>
        </div>
      )}
    </div>
  );
};