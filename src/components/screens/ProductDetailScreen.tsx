import React, { useMemo, useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { STORE_PRODUCTS, getDiscountedPrice, type StoreProduct } from '../../lib/products';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export function ProductDetailScreen() {
  const { currentScreen, goBack, isDarkMode } = useApp();
  const productId: string | undefined = currentScreen.params?.id;
  const product: StoreProduct | undefined = useMemo(
    () => STORE_PRODUCTS.find(p => p.id === productId) ?? STORE_PRODUCTS[0],
    [productId]
  );

  const [activeIndex, setActiveIndex] = useState(0);

  if (!product) return null;

  const hasDiscount = !!product.discountPercent;
  const discounted = getDiscountedPrice(product);

  const handleSwipe = (direction: 'left' | 'right') => {
    setActiveIndex(prev => {
      const next = direction === 'left' ? prev + 1 : prev - 1;
      if (next < 0) return product.images.length - 1;
      if (next >= product.images.length) return 0;
      return next;
    });
  };

  return (
    <div className={`p-3 pb-24 min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="flex items-center gap-3 mb-3">
        <button onClick={goBack} className="text-sm opacity-75">← Geri</button>
        <h1 className="text-lg font-bold">{product.title}</h1>
      </div>

      {/* Gallery with swipe */}
      <div
        className="relative overflow-hidden rounded-xl"
        onTouchStart={(e) => (e.currentTarget as any)._x = e.touches[0].clientX}
        onTouchEnd={(e) => {
          const startX = (e.currentTarget as any)._x as number | undefined;
          if (typeof startX !== 'number') return;
          const delta = e.changedTouches[0].clientX - startX;
          if (Math.abs(delta) > 30) handleSwipe(delta < 0 ? 'left' : 'right');
        }}
      >
        <img
          src={product.images[activeIndex]}
          alt={product.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
          {product.images.map((_, idx) => (
            <span key={idx} className={`h-1.5 w-6 rounded-full ${idx === activeIndex ? 'bg-white' : 'bg-white/40'}`} />
          ))}
        </div>
      </div>

      {/* Price and CTA */}
      <div className="mt-4 flex items-center justify-between">
        <div>
          {hasDiscount ? (
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-pink-600">{discounted} ₼</span>
              <span className="text-sm line-through opacity-60">{product.price} ₼</span>
            </div>
          ) : (
            <span className="text-2xl font-bold text-emerald-600">{product.price} ₼</span>
          )}
          <div className="text-xs mt-1 text-amber-500">★ {product.rating ?? 4.5} ({product.reviewsCount ?? 0} rəy)</div>
        </div>
        <Button onClick={() => alert('Demo: satın alma')}>Al</Button>
      </div>

      {/* Details */}
      <Card className={`mt-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h3 className="font-bold mb-2">Ətraflı məlumat</h3>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>{product.description}</p>
      </Card>

      {/* Reviews (static demo) */}
      <Card className={`mt-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h3 className="font-bold mb-2">Rəylər</h3>
        <div className="space-y-3 text-sm">
          <div>
            <div className="font-medium">Aysel</div>
            <div className="text-amber-500 text-xs">★★★★★</div>
            <p className="opacity-80">Məhsul çox keyfiyyətlidir, tövsiyə edirəm.</p>
          </div>
          <div>
            <div className="font-medium">Kamran</div>
            <div className="text-amber-500 text-xs">★★★★☆</div>
            <p className="opacity-80">Qiymətinə görə yaxşı seçimdir.</p>
          </div>
        </div>
      </Card>

      {/* Recommended carousel (2 per view) */}
      <RecommendedCarousel currentId={product.id} />
    </div>
  );
}

function RecommendedCarousel({ currentId }: { currentId: string }) {
  const { isDarkMode, navigate } = useApp();
  const items = STORE_PRODUCTS.filter(p => p.id !== currentId);
  const [offset, setOffset] = useState(0); // item index offset

  const visible = items.slice(offset, offset + 2);

  const onSwipe = (dir: 'left' | 'right') => {
    setOffset(prev => {
      const maxOffset = Math.max(0, items.length - 2);
      if (dir === 'left') return Math.min(prev + 1, maxOffset);
      return Math.max(prev - 1, 0);
    });
  };

  return (
    <div className="mt-4">
      <h3 className="font-bold mb-2">Tövsiyyə olunanlar</h3>
      <div
        className="flex gap-3 overflow-hidden"
        onTouchStart={(e) => (e.currentTarget as any)._x = e.touches[0].clientX}
        onTouchEnd={(e) => {
          const startX = (e.currentTarget as any)._x as number | undefined;
          if (typeof startX !== 'number') return;
          const delta = e.changedTouches[0].clientX - startX;
          if (Math.abs(delta) > 30) onSwipe(delta < 0 ? 'left' : 'right');
        }}
      >
        {visible.map(p => (
          <div key={p.id} className="min-w-0 basis-1/2">
            <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-3`}>
              <img src={p.images[0]} alt={p.title} className="w-full h-24 object-cover rounded-md" />
              <div className="mt-2 text-sm font-medium line-clamp-2">{p.title}</div>
              <div className="text-pink-600 font-bold">{getDiscountedPrice(p)} ₼</div>
              <button className="text-xs opacity-70 mt-1" onClick={() => navigate('ProductDetail', { id: p.id })}>Bax</button>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

