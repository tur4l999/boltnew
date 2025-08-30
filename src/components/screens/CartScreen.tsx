import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export function CartScreen() {
  const {
    cartItems,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    deliveryMethod,
    setDeliveryMethod,
    pickupLocation,
    setPickupLocation,
    computeTotals,
    isDarkMode,
    navigate
  } = useApp();

  const totals = computeTotals();

  return (
    <div className={`p-3 pb-24 min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <h1 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Səbət</h1>

      {/* Items */}
      <div className="space-y-2">
        {cartItems.length === 0 && (
          <Card>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Səbətiniz boşdur.</div>
          </Card>
        )}
        {cartItems.map(item => (
          <Card key={item.id} className="p-2">
            <div className="flex gap-3">
              <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
              <div className="flex-1">
                <div className="text-sm font-bold">{item.title}</div>
                {item.variationName && <div className="text-xs opacity-70">{item.variationName}</div>}
                <div className="text-emerald-600 font-bold text-sm">{item.unitPrice} AZN</div>
                <div className="mt-1 flex items-center gap-2">
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button className="px-2" onClick={() => updateCartQuantity(item.id, item.quantity - 1)}>-</button>
                    <div className="px-3 text-sm">{item.quantity}</div>
                    <button className="px-2" onClick={() => updateCartQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="text-xs opacity-70" onClick={() => removeFromCart(item.id)}>Sil</button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Delivery selection */}
      <Card className="mt-3 p-3">
        <div className="text-sm font-bold mb-2">Çatdırılma növü</div>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => setDeliveryMethod('post')} className={`p-2 rounded-xl border text-sm ${deliveryMethod==='post' ? 'bg-emerald-600 text-white border-transparent' : 'border-gray-300'}`}>Poçtla</button>
          <button onClick={() => setDeliveryMethod('locker')} className={`p-2 rounded-xl border text-sm ${deliveryMethod==='locker' ? 'bg-emerald-600 text-white border-transparent' : 'border-gray-300'}`}>Kargomatla</button>
          <button onClick={() => setDeliveryMethod('courier')} className={`p-2 rounded-xl border text-sm ${deliveryMethod==='courier' ? 'bg-emerald-600 text-white border-transparent' : 'border-gray-300'}`}>Kuryerlə</button>
          <button onClick={() => setDeliveryMethod('pickup')} className={`p-2 rounded-xl border text-sm ${deliveryMethod==='pickup' ? 'bg-emerald-600 text-white border-transparent' : 'border-gray-300'}`}>Özün götür</button>
        </div>

        {deliveryMethod === 'pickup' && (
          <div className="mt-3">
            <div className="text-xs mb-1">Ünvan</div>
            <div className="flex gap-2">
              <button onClick={() => setPickupLocation('Bakıxanov Mall')} className={`px-3 py-1.5 rounded-full border text-xs ${pickupLocation==='Bakıxanov Mall' ? 'bg-gray-900 text-white border-transparent' : 'border-gray-300'}`}>Bakıxanov Mall</button>
              <button onClick={() => setPickupLocation('4 saylı DOST mərkəzi')} className={`px-3 py-1.5 rounded-full border text-xs ${pickupLocation==='4 saylı DOST mərkəzi' ? 'bg-gray-900 text-white border-transparent' : 'border-gray-300'}`}>4 saylı DOST mərkəzi</button>
            </div>
            <div className="text-xs opacity-70 mt-2">Özün götür seçimi ilə hər məhsula 1 AZN endirim.</div>
          </div>
        )}
      </Card>

      {/* Totals */}
      <Card className="mt-3 p-3">
        <div className="flex items-center justify-between text-sm"><span>Aralıq cəm</span><span className="font-bold">{totals.subTotal.toFixed(2)} AZN</span></div>
        <div className="flex items-center justify-between text-sm"><span>Çatdırılma</span><span className="font-bold">{totals.deliveryFee.toFixed(2)} AZN</span></div>
        {totals.pickupDiscount > 0 && (
          <div className="flex items-center justify-between text-sm"><span>Özün götür endirim</span><span className="font-bold text-emerald-600">-{totals.pickupDiscount.toFixed(2)} AZN</span></div>
        )}
        <div className="mt-2 flex items-center justify-between text-base font-black"><span>Yekun</span><span className="text-emerald-600">{totals.grandTotal.toFixed(2)} AZN</span></div>
      </Card>

      {/* Actions */}
      <div className="fixed bottom-16 left-0 right-0 z-30">
        <div className="max-w-md mx-auto px-3 py-2 flex gap-2">
          <Button variant="ghost" className="flex-1" onClick={() => navigate('Store')}>Alış-verişə davam</Button>
          <Button className="flex-1" onClick={() => { alert('Sifariş tamamlandı (demo)'); clearCart(); navigate('Store'); }}>Sifarişi təsdiqlə</Button>
        </div>
      </div>
    </div>
  );
}

