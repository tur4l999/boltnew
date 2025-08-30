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

  const discountedSubtotal = useMemo(() => items.reduce((sum, p) => sum + getDiscountedPrice(p) * p.qty, 0), [items]);
  const originalSubtotal = useMemo(() => items.reduce((sum, p) => sum + p.price * p.qty, 0), [items]);
  const productDiscount = Math.max(0, originalSubtotal - discountedSubtotal);
  const pickupDiscount = deliveryMethod === 'pickup' ? items.reduce((sum, p) => sum + p.qty, 0) * 1 : 0; // 1 AZN per item
  const fee = deliveryMethod === 'locker' ? 2.5 : deliveryMethod === 'courier' ? (discountedSubtotal >= 20 ? 0 : 3) : deliveryMethod === 'post' ? (discountedSubtotal >= 20 ? 0 : 2) : 0;
  const total = Math.max(0, discountedSubtotal - pickupDiscount) + fee;

  return (
    <div className={`p-3 pb-24 min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="flex items-center gap-3 mb-3">
        <button onClick={goBack} className="text-sm opacity-75">← Geri</button>
        <h1 className="text-lg font-bold">Səbət</h1>
      </div>
      <div className={`mb-3 text-center`}>
        <span className={`rounded-md px-3 py-1 inline-block text-[11px] font-semibold text-white bg-red-600`}>20 AZN-dən yuxarı çatdırılma pulsuzdur</span>
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
            {deliveryMethod==='courier' && (
              <div className="text-[11px] opacity-70 mt-2">Qeyd: Bakı şəhəri daxili, 24-48 saat ərzində çatdırılma. Ətraflı məluamt üçün Operatorun mesajını gözləyin.</div>
            )}
            {deliveryMethod==='post' && (
              <div className="text-[11px] opacity-70 mt-2">Qeyd: Azərpoçt tərəfindən təxminən 3-7 iş günü ərzində çatdırılma edilir. Ətraflı məluamt üçün Operatorun mesajını gözləyin.</div>
            )}
            {deliveryMethod==='locker' && (
              <div className="text-[11px] opacity-70 mt-2">Sifariş verildikdən sonra 24-48 saat ərzində seçilən kargomat qutusuna yerləşdirilir. Qeyd: Ətraflı məluamt üçün operatorun mesajını gözləyin.</div>
            )}
            {deliveryMethod==='pickup' && (
              <div className="text-[11px] opacity-70 mt-2">Özün götür seçildikdə hər 1 məhsula görə 1 AZN endirim edilir. Öncədən razılaşdırılmış gün və saatda ünvana yaxınlaşaraq götürməlisiniz. Ətraflı məluamt üçün operatorun mesajını gözləyin.</div>
            )}
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
            <PromoCode />
          </Card>

          <Card className={`mt-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h3 className="font-bold mb-2">Qiymət xülasəsi</h3>
            <div className="text-sm space-y-2">
              <div className="flex items-center justify-between"><span>Məhsullar</span><span>{discountedSubtotal.toFixed(2)} ₼</span></div>
              <div className="flex items-center justify-between"><span>Endirim</span><span className="text-emerald-600">-{productDiscount.toFixed(2)} ₼</span></div>
              {pickupDiscount > 0 && (
                <div className="flex items-center justify-between"><span>Özün götür endirimi</span><span className="text-emerald-600">-{pickupDiscount.toFixed(2)} ₼</span></div>
              )}
              <div className="flex items-center justify-between"><span>Çatdırılma</span><span>{fee.toFixed(2)} ₼</span></div>
              <div className="flex items-center justify-between font-bold text-base"><span>Yekun</span><span>{total.toFixed(2)} ₼</span></div>
            </div>
            <Button className="w-full mt-3 py-3 text-base" onClick={() => {
              const addr = deliveryMethod==='locker' ? selectedLocker : deliveryMethod==='pickup' ? (pickupPoint || 'Özün götür') : address;
              const ok = payment==='balance'
                ? checkoutByBalance(addr, deliveryMethod as any)
                : checkoutByCard(addr, deliveryMethod as any);
              alert(ok ? 'Ödəniş uğurlu oldu' : 'Ödəniş mümkün olmadı');
            }}>Ödənişi tamamla</Button>
          </Card>
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
      className={`rounded-lg border px-3 py-3 text-center text-[15px] font-medium ${selected ? 'ring-2 ring-emerald-500' : ''} ${isDarkMode ? 'border-gray-700 bg-gray-800 hover:bg-gray-700' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
    >
      <div>{label}</div>
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

function PromoCode() {
  const { isDarkMode } = useApp();
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = React.useState('');
  return (
    <div className="mt-3">
      <button onClick={() => setOpen(v => !v)} className={`text-sm underline ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>{open ? 'Promo kodu gizlət' : 'Promo kod daxil et'}</button>
      {open && (
        <div className="mt-2 flex items-center gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="PROMO10"
            className={`flex-1 rounded-md border px-3 py-2 text-sm outline-none ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
          />
          <button className={`px-3 py-2 rounded-md border ${isDarkMode ? 'border-gray-700 bg-gray-800 text-gray-100' : 'border-gray-200 bg-white text-gray-900'}`}>Tətbiq et</button>
        </div>
      )}
    </div>
  );
}

