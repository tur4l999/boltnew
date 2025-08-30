import React, { useMemo, useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { STORE_PRODUCTS, getDiscountedPrice } from '../../lib/products';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { QuantityStepper } from '../ui/QuantityStepper';

export function CartScreen() {
  const { cart, updateCartQty, removeFromCart, checkoutByBalance, isDarkMode, goBack } = useApp();
  const [address, setAddress] = useState('Bakı, Nizami küç. 1');

  const items = cart.map(ci => {
    const p = STORE_PRODUCTS.find(x => x.id === ci.productId)!;
    return { ...p, qty: ci.qty };
  });

  const total = useMemo(() => items.reduce((sum, p) => sum + getDiscountedPrice(p) * p.qty, 0), [items]);

  return (
    <div className={`p-3 pb-24 min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="flex items-center gap-3 mb-3">
        <button onClick={goBack} className="text-sm opacity-75">← Geri</button>
        <h1 className="text-lg font-bold">Səbət</h1>
      </div>
      {items.length === 0 ? (
        <div className="opacity-70 text-sm">Səbət boşdur.</div>
      ) : (
        <>
          <div className="space-y-3">
            {items.map(p => (
              <Card key={p.id} className={`p-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex gap-3">
                  <img src={p.images[0]} alt={p.title} className="w-16 h-20 object-cover rounded" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium line-clamp-2">{p.title}</div>
                    <div className="text-pink-600 font-bold">{getDiscountedPrice(p)} ₼</div>
                    <div className="mt-2 flex items-center justify-between">
                      <QuantityStepper value={p.qty} onChange={(v) => updateCartQty(p.id, v)} />
                      <button className="text-xs opacity-70" onClick={() => removeFromCart(p.id)}>Sil</button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className={`mt-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h3 className="font-bold mb-2">Çatdırılma ünvanı</h3>
            <input
              className={`w-full rounded-md border px-3 py-2 text-sm outline-none ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Ünvanınızı yazın"
            />
          </Card>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-lg font-bold">Cəmi: {total.toFixed(2)} ₼</div>
            <Button onClick={() => {
              const ok = checkoutByBalance(address);
              alert(ok ? 'Ödəniş uğurlu oldu (balansdan)' : 'Ödəniş mümkün olmadı (balans kifayət deyil?)');
            }}>
              Balansla al
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

