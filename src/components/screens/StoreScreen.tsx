import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { ProductCard } from '../ui/ProductCard';
import { STORE_PRODUCTS } from '../../lib/products';

export function StoreScreen() {
  const { isDarkMode, navigate } = useApp();
  
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
        className="fixed bottom-28 right-5 z-40 rounded-full bg-emerald-600 text-white shadow-lg px-4 py-2 flex items-center gap-2"
      >
        <ShoppingCart size={18} />
        <span>Səbətə bax</span>
      </button>

      <div className="grid grid-cols-2 gap-3">
        {STORE_PRODUCTS.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onClick={() => navigate('ProductDetail', { id: p.id })}
            onAddToCart={() => alert('Demo: səbətə əlavə edildi')}
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