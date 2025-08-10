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
    { id: 'p1', title: 'Qaydalar kitabı (AZ)', price: 19 },
    { id: 'p2', title: 'Test çalışmaları (AZ)', price: 24 },
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
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-gray-900">{product.title}</div>
              <div className="text-sm text-gray-500">{product.price} AZN</div>
            </div>
            <Button onClick={() => addToCart(product)} size="sm">
              {t.addToCart}
            </Button>
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