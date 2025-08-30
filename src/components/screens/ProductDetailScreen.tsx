import React, { useMemo, useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { products, productVariations, popularProductIds } from '../../lib/products';
import type { Product } from '../../lib/types';

export function ProductDetailScreen() {
  const { currentScreen, isDarkMode, addToCart, navigate } = useApp();
  const productId: string | undefined = currentScreen.params?.productId;

  const product: Product | undefined = useMemo(() => products.find(p => p.id === productId), [productId]);
  const variations = product ? productVariations[product.id] ?? [] : [];
  const [selectedVarId, setSelectedVarId] = useState<string | undefined>(variations[0]?.id);
  const [qty, setQty] = useState<number>(1);

  if (!product) {
    return (
      <div className="p-3 pb-24">
        <Card>
          Məhsul tapılmadı.
        </Card>
      </div>
    );
  }

  const selectedVar = variations.find(v => v.id === selectedVarId);
  const unitPrice = product.price + (selectedVar?.priceDelta ?? 0);

  const others = popularProductIds
    .filter(id => id !== product.id)
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as Product[];

  return (
    <div className={`p-0 pb-24 min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="relative">
        <img src={product.image} alt={product.title} className="w-full h-56 object-cover" />
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
          <div className="text-white text-lg font-bold">{product.title}</div>
        </div>
      </div>

      <div className="p-3 space-y-3">
        {/* Variations */}
        {variations.length > 0 && (
          <Card className="p-3">
            <div className="text-sm font-bold mb-2">Seçim</div>
            <div className="flex gap-2 flex-wrap">
              {variations.map(v => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVarId(v.id)}
                  className={`px-3 py-1.5 rounded-full border text-sm ${selectedVarId === v.id
                    ? (isDarkMode ? 'bg-emerald-600 text-white border-transparent' : 'bg-emerald-600 text-white border-transparent')
                    : (isDarkMode ? 'border-gray-600 text-gray-200' : 'border-gray-300 text-gray-700')}`}
                >
                  {v.name}{v.priceDelta ? ` (+${v.priceDelta} AZN)` : ''}
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Description */}
        <Card className="p-3">
          <div className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{product.description}</div>
        </Card>

        {/* Popular Carousel (2-per-view) */}
        {others.length > 0 && (
          <div>
            <div className="px-1 text-sm font-bold mb-2">Çox satılanlar</div>
            <div className="overflow-x-auto no-scrollbar">
              <div className="flex gap-3 px-1" style={{ scrollSnapType: 'x mandatory' }}>
                {others.map(p => (
                  <div key={p.id} className="min-w-[calc(50%-12px)]" style={{ scrollSnapAlign: 'start' }}>
                    <Card className="p-2" >
                      <img src={p.image} alt={p.title} className="w-full h-24 object-cover rounded-lg" />
                      <div className="mt-2 text-xs font-bold truncate">{p.title}</div>
                      <div className="text-emerald-600 text-sm font-bold">{p.price} AZN</div>
                      <Button size="sm" className="w-full mt-1 text-xs" onClick={() => navigate('ProductDetail', { productId: p.id })}>Bax</Button>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Comments */}
        <Card className="p-3">
          <div className="text-sm font-bold mb-2">Şərhlər</div>
          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Hələ şərh yoxdur. İlk siz yazın!</div>
        </Card>
      </div>

      {/* Sticky bottom add-to-cart */}
      <div className={`fixed bottom-16 left-0 right-0 z-30 ${isDarkMode ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-md mx-auto px-3 py-2 flex items-center gap-3">
          <div className="flex items-baseline gap-1">
            <div className="text-xs">Qiymət</div>
            <div className="text-lg font-black text-emerald-600">{unitPrice} AZN</div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button className={`px-2 text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`} onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
              <div className={`px-3 text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{qty}</div>
              <button className={`px-2 text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`} onClick={() => setQty(qty + 1)}>+</button>
            </div>
            <Button
              onClick={() => {
                addToCart({ productId: product.id, title: product.title, unitPrice, image: product.image, variationId: selectedVar?.id, variationName: selectedVar?.name, quantity: qty });
                navigate('Cart');
              }}
            >
              Səbətə at
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

