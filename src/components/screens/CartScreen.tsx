import React, { useMemo, useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { STORE_PRODUCTS, getDiscountedPrice } from '../../lib/products';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { QuantityStepper } from '../ui/QuantityStepper';

export function CartScreen() {
  const { cart, updateCartQty, removeFromCart, checkoutByBalance, checkoutByCard, isDarkMode, goBack, deliveryMethod, setDeliveryMethod } = useApp();
  const [address, setAddress] = useState('');
  const [postIndex, setPostIndex] = useState('');
  const [lockerQuery, setLockerQuery] = useState('');
  const [selectedLocker, setSelectedLocker] = useState<string>('');
  const [pickupPoint, setPickupPoint] = useState<'bmh' | 'dost' | ''>('');
  const [payment, setPayment] = useState<'balance' | 'card'>('balance');

  const items = cart.map(ci => {
    const p = STORE_PRODUCTS.find(x => x.id === ci.productId)!;
    return { ...p, qty: ci.qty };
  });

  const subtotal = useMemo(() => items.reduce((sum, p) => sum + getDiscountedPrice(p) * p.qty, 0), [items]);
  const fee = deliveryMethod === 'locker' ? 2.5 : deliveryMethod === 'courier' ? 5 : deliveryMethod === 'post' ? 3 : 0;
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

          <Card className={`mt-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h3 className="font-bold mb-2">Çatdırılma üsulu</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <DeliveryOption label="Kargomat" value="locker" selected={deliveryMethod==='locker'} onSelect={() => setDeliveryMethod('locker')} fee={2.5} />
              <DeliveryOption label="Kuryerlə" value="courier" selected={deliveryMethod==='courier'} onSelect={() => setDeliveryMethod('courier')} fee={5} />
              <DeliveryOption label="Poçtla" value="post" selected={deliveryMethod==='post'} onSelect={() => setDeliveryMethod('post')} fee={3} />
              <DeliveryOption label="Özün götür" value="pickup" selected={deliveryMethod==='pickup'} onSelect={() => setDeliveryMethod('pickup')} fee={0} />
            </div>
          </Card>

          {deliveryMethod === 'locker' && (
            <Card className={`mt-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className="font-bold mb-2">Kargomat seç</h3>
              <input
                className={`w-full rounded-md border px-3 py-2 text-sm mb-2 outline-none ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                value={lockerQuery}
                onChange={(e) => setLockerQuery(e.target.value)}
                placeholder="Kargomat axtar..."
              />
              <LockerList query={lockerQuery} selected={selectedLocker} onSelect={setSelectedLocker} />
            </Card>
          )}

          {(deliveryMethod === 'courier' || deliveryMethod === 'post') && (
            <Card className={`mt-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className="font-bold mb-2">Çatdırılma ünvanı</h3>
              {deliveryMethod === 'post' && (
                <input
                  className={`w-full rounded-md border px-3 py-2 text-sm mb-2 outline-none ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                  value={postIndex}
                  onChange={(e) => setPostIndex(e.target.value)}
                  placeholder="Poçt indeksi"
                />
              )}
              <input
                className={`w-full rounded-md border px-3 py-2 text-sm outline-none ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ünvanınızı yazın"
              />
            </Card>
          )}

          {deliveryMethod === 'pickup' && (
            <Card className={`mt-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className="font-bold mb-2">Özün götür məntəqəsi</h3>
              <div className="flex flex-col gap-2">
                <PickOption label="Bakıxanov Mall yaxınlığı" selected={pickupPoint==='bmh'} onSelect={() => setPickupPoint('bmh')} />
                <PickOption label="4 saylı DOST mərkəzinin yaxınlığı" selected={pickupPoint==='dost'} onSelect={() => setPickupPoint('dost')} />
              </div>
            </Card>
          )}

          <Card className={`mt-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h3 className="font-bold mb-2">Ödəniş üsulu</h3>
            <div className="flex gap-2 text-sm">
              <button onClick={() => setPayment('balance')} className={`px-3 py-2 rounded-lg border ${payment==='balance' ? 'ring-2 ring-emerald-500' : ''} ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>Balans</button>
              <button onClick={() => setPayment('card')} className={`px-3 py-2 rounded-lg border ${payment==='card' ? 'ring-2 ring-emerald-500' : ''} ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>Kart</button>
            </div>
          </Card>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm opacity-80">Məbləğ: {subtotal.toFixed(2)} ₼ • Çatdırılma: {fee.toFixed(2)} ₼</div>
            <div className="text-lg font-bold">Cəmi: {total.toFixed(2)} ₼</div>
            <Button onClick={() => {
              const addr = deliveryMethod==='locker' ? selectedLocker : deliveryMethod==='pickup' ? (pickupPoint || 'Özün götür') : address;
              const ok = payment==='balance'
                ? checkoutByBalance(addr, deliveryMethod as any)
                : checkoutByCard(addr, deliveryMethod as any);
              alert(ok ? 'Ödəniş uğurlu oldu' : 'Ödəniş mümkün olmadı');
            }}>
              Ödənişi tamamla
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

function LockerList({ query, selected, onSelect }: { query: string; selected: string; onSelect: (id: string) => void; }) {
  const lockers = [
    { id: 'l1', name: 'Kargomat • Nərimanov m/s' },
    { id: 'l2', name: 'Kargomat • Gənclik Mall' },
    { id: 'l3', name: 'Kargomat • 28 May' },
    { id: 'l4', name: 'Kargomat • Yasamal ASAN' },
    { id: 'l5', name: 'Kargomat • Xalqlar Dostluğu' },
    { id: 'l6', name: 'Kargomat • Memar Əcəmi Mall' },
    { id: 'l7', name: 'Kargomat • Neftçilər m/s' },
    { id: 'l8', name: 'Kargomat • İçərişəhər' },
    { id: 'l9', name: 'Kargomat • Nizami küç.' },
    { id: 'l10', name: 'Kargomat • Elmlər Akademiyası' },
    { id: 'l11', name: 'Kargomat • Həzi Aslanov' },
  ];
  const list = lockers.filter(l => l.name.toLowerCase().includes(query.toLowerCase())).slice(0, 10);
  return (
    <div className="max-h-40 overflow-auto divide-y divide-gray-200/20">
      {list.map(l => (
        <label key={l.id} className="flex items-center gap-2 py-2 cursor-pointer">
          <input type="radio" name="locker" checked={selected===l.id} onChange={() => onSelect(l.id)} />
          <span className="text-sm">{l.name}</span>
        </label>
      ))}
      {list.length === 0 && <div className="text-xs opacity-60 py-2">Nəticə tapılmadı</div>}
    </div>
  );
}

function PickOption({ label, selected, onSelect }: { label: string; selected: boolean; onSelect: () => void; }) {
  const { isDarkMode } = useApp();
  return (
    <button onClick={onSelect} className={`rounded-lg border px-3 py-2 text-left ${selected ? 'ring-2 ring-emerald-500' : ''} ${isDarkMode ? 'border-gray-700 bg-gray-800 hover:bg-gray-700' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
      {label}
    </button>
  );
}

