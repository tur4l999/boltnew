import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { ProductCard } from '../ui/ProductCard';
import { STORE_PRODUCTS } from '../../lib/products';

export function StoreScreen() {
  const { isDarkMode, navigate, addToCart } = useApp();
  const cartBtnRef = React.useRef<HTMLButtonElement | null>(null);

  const flyToCart = React.useCallback((sourceEl: HTMLElement | null) => {
    if (!sourceEl || !cartBtnRef.current) return;
    const sourceRect = sourceEl.getBoundingClientRect();
    const targetRect = cartBtnRef.current.getBoundingClientRect();

    const imgSrc = (sourceEl as HTMLImageElement).src || '';
    const ghost = document.createElement('img');
    ghost.src = imgSrc || '/DDA_logo.png';
    ghost.style.position = 'fixed';
    ghost.style.left = `${sourceRect.left + sourceRect.width / 2 - 16}px`;
    ghost.style.top = `${sourceRect.top + sourceRect.height / 2 - 16}px`;
    ghost.style.width = '32px';
    ghost.style.height = '32px';
    ghost.style.borderRadius = '6px';
    ghost.style.boxShadow = '0 6px 12px rgba(0,0,0,0.25)';
    ghost.style.zIndex = '9999';
    ghost.style.pointerEvents = 'none';
    document.body.appendChild(ghost);

    const deltaX = (targetRect.left + targetRect.width / 2) - (sourceRect.left + sourceRect.width / 2);
    const deltaY = (targetRect.top + targetRect.height / 2) - (sourceRect.top + sourceRect.height / 2);

    const upY = -40; // rise a bit first
    const anim = ghost.animate([
      { transform: 'translate(0px, 0px) scale(1)', opacity: 1 },
      { transform: `translate(0px, ${upY}px) scale(0.95)`, opacity: 0.95, offset: 0.35 },
      { transform: `translate(${deltaX}px, ${deltaY}px) scale(0.35)`, opacity: 0 }
    ], { duration: 600, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });

    anim.onfinish = () => {
      ghost.remove();
      cartBtnRef.current?.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(1.1)' },
        { transform: 'scale(1)' }
      ], { duration: 250, easing: 'ease-out' });
    };
  }, []);
  
  return (
    <div className={`p-3 pb-24 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="mb-3 text-center">
        <h1 className={`text-2xl font-bold mb-2 transition-colors duration-200 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>Onlayn mağaza</h1>
        <div className="mt-1 rounded-md px-3 py-1 inline-block text-xs font-semibold text-white bg-red-600 whitespace-nowrap">
          20 manatdan yuxarı çatdırılma pulsuzdur
        </div>
      </div>
      {/* Floating Cart button */}
      <button
        onClick={() => navigate('Cart')}
        ref={cartBtnRef}
        className="fixed z-40 rounded-full bg-emerald-600 text-white shadow-lg px-4 py-2 flex items-center gap-2"
        style={{
          right: 'calc(env(safe-area-inset-right, 0px) + 20px)',
          bottom: 'calc(env(safe-area-inset-bottom, 0px) + 84px)'
        }}
      >
        <ShoppingCart size={18} />
        <span>Səbətə bax</span>
      </button>

      <div className="grid grid-cols-2 gap-3">
        {STORE_PRODUCTS.map((p, idx) => (
          <ProductCard
            key={p.id}
            product={p}
            isBestseller={idx === 0}
            onClick={() => navigate('ProductDetail', { id: p.id })}
            onAddToCart={(el) => { addToCart(p.id, 1); flyToCart(el); }}
          />
        ))}
      </div>

      {/* Payment Methods */}
      <Card className={`mt-6 transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h3 className={`font-bold mb-3 text-center transition-colors duration-200 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>Ödəniş üsulları</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className={`p-3 border rounded-lg text-center transition-colors duration-200 ${
            isDarkMode 
              ? 'border-gray-600 hover:bg-gray-700' 
              : 'border-gray-200 hover:bg-gray-50'
          }`}>
            <div className="text-2xl mb-1">💳</div>
            <div className={`text-xs transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Kart</div>
          </div>
          <div className={`p-3 border rounded-lg text-center transition-colors duration-200 ${
            isDarkMode 
              ? 'border-gray-600 hover:bg-gray-700' 
              : 'border-gray-200 hover:bg-gray-50'
          }`}>
            <div className="text-2xl mb-1">📱</div>
            <div className={`text-xs transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Mobil</div>
          </div>
          <div className={`p-3 border rounded-lg text-center transition-colors duration-200 ${
            isDarkMode 
              ? 'border-gray-600 hover:bg-gray-700' 
              : 'border-gray-200 hover:bg-gray-50'
          }`}>
            <div className="text-2xl mb-1">🏦</div>
            <div className={`text-xs transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Bank</div>
          </div>
        </div>
      </Card>

      {/* Trust Indicators */}
      <div className="mt-4 text-center">
        <div className={`flex items-center justify-center gap-4 text-xs transition-colors duration-200 ${
          isDarkMode ? 'text-gray-500' : 'text-gray-500'
        }`}>
          <span className="flex items-center gap-1">
            🔒 Təhlükəsiz ödəniş
          </span>
          <span className="flex items-center gap-1">
            ⚡ Ani çatdırılma
          </span>
          <span className="flex items-center gap-1">
            🎯 7/24 dəstək
          </span>
        </div>
      </div>
    </div>
  );
}