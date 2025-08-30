import React, { useMemo, useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { STORE_PRODUCTS, getDiscountedPrice } from '../../lib/products';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { QuantityStepper } from '../ui/QuantityStepper';

export function CartScreen() {
  const { cart, updateCartQty, removeFromCart, checkoutByBalance, isDarkMode, goBack, deliveryMethod, setDeliveryMethod } = useApp();
  const [address, setAddress] = useState('Bakı, Nizami küç. 1');

  const items = cart.map(ci => {
    const p = STORE_PRODUCTS.find(x => x.id === ci.productId)!;
    return { ...p, qty: ci.qty };
  });

  const subtotal = useMemo(() => items.reduce((sum, p) => sum + getDiscountedPrice(p) * p.qty, 0), [items]);
  const fee = deliveryMethod === 'locker' ? 2.5 : deliveryMethod === 'courier' ? 5 : 3;
  const total = subtotal + fee;

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

          <Card className={`mt-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h3 className="font-bold mb-2">Çatdırılma üsulu</h3>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <DeliveryOption label="Kargomat" value="locker" selected={deliveryMethod==='locker'} onSelect={() => setDeliveryMethod('locker')} fee={2.5} />
              <DeliveryOption label="Kuryerlə" value="courier" selected={deliveryMethod==='courier'} onSelect={() => setDeliveryMethod('courier')} fee={5} />
              <DeliveryOption label="Poçtla" value="post" selected={deliveryMethod==='post'} onSelect={() => setDeliveryMethod('post')} fee={3} />
            </div>
          </Card>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm opacity-80">Məbləğ: {subtotal.toFixed(2)} ₼ • Çatdırılma: {fee.toFixed(2)} ₼</div>
            <div className="text-lg font-bold">Cəmi: {total.toFixed(2)} ₼</div>
            <Button onClick={() => {
              const ok = checkoutByBalance(address, deliveryMethod as any);
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

function DeliveryOption({ label, value, selected, onSelect, fee }: { label: string; value: string; selected: boolean; onSelect: () => void; fee: number; }) {
  const { isDarkMode } = useApp();
  return (
    <button
      onClick={onSelect}
      className={`rounded-lg border px-3 py-2 text-center ${selected ? 'ring-2 ring-emerald-500' : ''} ${isDarkMode ? 'border-gray-700 bg-gray-800 hover:bg-gray-700' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
    >
      <div className="font-medium">{label}</div>
      <div className="text-xs opacity-70">{fee.toFixed(2)} ₼</div>
    </button>
  );
}

