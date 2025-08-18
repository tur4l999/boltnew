import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface Product {
  id: string;
  title: string;
  price: number;
}

export function StoreScreen() {
  const { t } = useApp();
  const [cart, setCart] = useState<Product[]>([]);
  
  const products: Product[] = [
    { id: 'p1', title: 'Qaydalar kitabı (AZ)', price: 19, image: '/public/images/books/yeni-book.jpg' },
    { id: 'p2', title: 'Test çalışmaları (AZ)', price: 24, image: '/public/images/books/talibov-suruculuk-rus-book.jpg' },
  ];

  function addToCart(product: Product) {
    setCart(prev => [...prev, product]);
  }

  function checkout() {
    alert('Ödəniş tamamlandı (demo)');
    setCart([]);
  }

  const total = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="p-3 pb-24">
      {products.map((product) => (
        <Card key={product.id} className="mb-3">
          <div className="flex items-center gap-4">
            <img 
              src={product.image} 
              alt={product.title}
              className="w-16 h-20 object-cover rounded-lg border border-gray-200"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="flex-1">
              <div className="font-bold text-gray-900 text-sm">{product.title}</div>
              <div className="text-lg font-bold text-gray-900 mt-1">{product.price} AZN</div>
            </div>
            <div>
              <Button onClick={() => addToCart(product)} size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                {t.addToCart}
              </Button>
            </div>
          </div>
        </Card>
      ))}
      
      <Card>
        <div className="flex items-center justify-between mb-3">
          <div className="font-bold text-gray-900">Toplam</div>
          <div className="text-lg text-gray-900">{total} AZN</div>
        </div>
        <Button onClick={checkout} disabled={!total} className="w-full">
          {t.checkout}
        </Button>
      </Card>
    </div>
  );
}