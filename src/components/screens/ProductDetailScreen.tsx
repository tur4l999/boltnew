import React, { useMemo, useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { STORE_PRODUCTS, getDiscountedPrice, type StoreProduct } from '../../lib/products';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { QuantityStepper } from '../ui/QuantityStepper';

export function ProductDetailScreen() {
  const { currentScreen, goBack, isDarkMode, addToCart, navigate } = useApp();
  const productId: string | undefined = currentScreen.params?.id;
  const product: StoreProduct | undefined = useMemo(
    () => STORE_PRODUCTS.find(p => p.id === productId) ?? STORE_PRODUCTS[0],
    [productId]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const hasDiscount = !!product.discountPercent;
  const discounted = getDiscountedPrice(product);
  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

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
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          {!isOutOfStock && (
            hasDiscount ? (
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-pink-600">{discounted} ₼</span>
                <span className="text-sm line-through opacity-60">{product.price} ₼</span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-emerald-600">{product.price} ₼</span>
            )
          )}
          {!isOutOfStock && (
            <div className="text-xs mt-1 flex items-center gap-2">
              <div className="flex items-center text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => {
                  const rating = product.rating ?? 0;
                  const isFull = rating >= i + 1;
                  const isHalf = !isFull && rating > i && rating < i + 1;
                  return (
                    <span key={i} className="inline-block w-3.5 text-[12px] leading-none">
                      {isFull ? '★' : isHalf ? '☆' : '☆'}
                    </span>
                  );
                })}
              </div>
              <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {product.rating ?? 0} ({product.reviewsCount ?? 0} rəy)
              </span>
            </div>
          )}
          {isOutOfStock && (
            <div className="text-red-600 font-semibold">Stokda yoxdur</div>
          )}
        </div>
        <div className="flex items-center gap-3">
          {!isOutOfStock && <QuantityStepper value={qty} onChange={setQty} />}
          <Button disabled={isOutOfStock} onClick={() => { if (!isOutOfStock) { addToCart(product.id, qty); navigate('Cart'); } }}>{isOutOfStock ? 'Stokda yoxdur' : 'Səbətə at'}</Button>
        </div>
      </div>

      {/* Bestseller badge above details for first product */}
      {product.id === STORE_PRODUCTS[0]?.id && (
        <div className="mt-3">
          <span className="inline-block bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-md">Bestseller</span>
        </div>
      )}

      {/* Details */}
      <Card className={`mt-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h3 className="font-bold mb-2">Ətraflı məlumat</h3>
        <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} space-y-1`}>
          <p>{product.description}</p>
          {product.author && <p><span className="opacity-70">Müəllif:</span> {product.author}</p>}
          {product.publisher && <p><span className="opacity-70">Nəşriyyat:</span> {product.publisher}</p>}
          {product.language && <p><span className="opacity-70">Dil:</span> {product.language}</p>}
          {product.year && <p><span className="opacity-70">İl:</span> {product.year}</p>}
          {product.externalUrl && (
            <p>
              <a className="text-blue-500 underline" href={product.externalUrl} target="_blank" rel="noreferrer">Mənbə səhifə</a>
            </p>
          )}
        </div>
      </Card>

      {/* Extra Description */}
      {product.longDescription && (
        <Card className={`mt-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className="font-bold mb-2">Təsvir</h3>
          <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <p>{product.longDescription}</p>
          </div>
        </Card>
      )}

      {/* Reviews with add form */}
      <ReviewsCard />

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
        className="flex gap-3 overflow-x-auto no-scrollbar"
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

function ReviewsCard() {
  const { isDarkMode } = useApp();
  const [reviews, setReviews] = useState<{name: string; text: string; stars: number}[]>([
    { name: 'Aysel', text: 'Məhsul çox keyfiyyətlidir, tövsiyə edirəm.', stars: 5},
    { name: 'Kamran', text: 'Qiymətinə görə yaxşı seçimdir.', stars: 4},
  ]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [stars, setStars] = useState(5);
  const add = () => {
    if (!name || !text) return;
    setReviews([{ name, text, stars }, ...reviews]);
    setName('');
    setText('');
    setStars(5);
  };
  return (
    <Card className={`mt-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <h3 className="font-bold mb-2">Rəylər</h3>
      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Adınız" className={`flex-1 rounded-md border px-3 py-2 text-sm outline-none ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`} />
          <select value={stars} onChange={(e)=>setStars(Number(e.target.value))} className={`rounded-md border px-2 py-2 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}>
            {[5,4,3,2,1].map(s=>(<option key={s} value={s}>{s} ★</option>))}
          </select>
        </div>
        <textarea value={text} onChange={(e)=>setText(e.target.value)} placeholder="Rəyinizi yazın" rows={3} className={`w-full rounded-md border px-3 py-2 text-sm outline-none ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`} />
        <div className="flex justify-end">
          <Button onClick={add}>Rəyi əlavə et</Button>
        </div>
        <div className="divide-y divide-gray-200/20">
          {reviews.map((r, idx) => (
            <div key={idx} className="py-2">
              <div className="font-medium flex items-center gap-2">
                {r.name}
                <span className="text-amber-500 text-xs">{'★'.repeat(r.stars)}</span>
              </div>
              <p className="opacity-80">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

