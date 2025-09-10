import React, { useMemo, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
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
  const cartBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const imgRef = React.useRef<HTMLImageElement | null>(null);

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

    const upY = -40;
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
    <div className={`p-3 pb-24 min-h-full ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={goBack}
          className={`h-9 w-9 rounded-full flex items-center justify-center border shadow-sm transition-all duration-200 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-100 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-100'}`}
          aria-label="Geri"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="text-lg font-bold">{product.title}</h1>
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
          ref={imgRef}
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
          <Button
            disabled={isOutOfStock}
            onClick={() => {
              if (!isOutOfStock) {
                addToCart(product.id, qty);
                flyToCart(imgRef.current);
              }
            }}
          >
            {isOutOfStock ? 'Stokda yoxdur' : 'Səbətə at'}
          </Button>
        </div>
      </div>

      {/* Bestseller badge above details for first product */}
      {product.id === STORE_PRODUCTS[0]?.id && (
        <DetailBestsellerBadge hasDiscount={hasDiscount} />
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

function DetailBestsellerBadge({ hasDiscount }: { hasDiscount: boolean }) {
  const { isDarkMode } = useApp();
  const [hoursLeft, setHoursLeft] = useState<number | null>(null);
  React.useEffect(() => {
    const calc = () => {
      const now = new Date();
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);
      const diffMs = endOfDay.getTime() - now.getTime();
      const hrs = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60)));
      setHoursLeft(hrs);
    };
    calc();
    const id = setInterval(calc, 60 * 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="mt-3 flex items-center gap-2">
      {hasDiscount && typeof hoursLeft === 'number' && hoursLeft > 0 && (
        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md animate-pulse">
          {hoursLeft} saat
        </span>
      )}
      <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-md">Bestseller</span>
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
  const [text, setText] = useState('');
  const [stars, setStars] = useState(5);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const generateRandomName = (): string => {
    const firstNames = ['Aysel', 'Kamran', 'Elvin', 'Nigar', 'Ramil', 'Günel', 'Murad', 'Laman'];
    const lastNames = ['Mehdiyev', 'Quliyeva', 'İsmayılov', 'Həsənova', 'Aliyev', 'Mammadov', 'Hüseynli', 'Rzayev'];
    const f = firstNames[Math.floor(Math.random() * firstNames.length)];
    const l = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${f} ${l}`;
  };

  const maskName = (fullName: string): string => {
    const parts = fullName.split(' ');
    const masked = parts.map(p => p.length > 0 ? (p[0] + '*'.repeat(Math.max(0, p.length - 1))) : p);
    return masked.join(' ');
  };

  const add = () => {
    if (!text.trim()) return;
    const baseName = generateRandomName();
    const nameToShow = isAnonymous ? maskName(baseName) : baseName;
    setReviews([{ name: nameToShow, text: text.trim(), stars }, ...reviews]);
    setText('');
    setStars(5);
    setIsAnonymous(true);
    setShowForm(false);
  };

  return (
    <Card className={`mt-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold">Şərhlər</h3>
        <Button size="sm" onClick={() => setShowForm(v => !v)}>
          Rəy əlavə et
        </Button>
      </div>
      <div className="space-y-3 text-sm">
        {showForm && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <select value={stars} onChange={(e)=>setStars(Number(e.target.value))} className={`rounded-md border px-2 py-2 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}>
                {[5,4,3,2,1].map(s=>(<option key={s} value={s}>{s} ★</option>))}
              </select>
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input type="checkbox" checked={isAnonymous} onChange={(e)=>setIsAnonymous(e.target.checked)} />
                <span>Anonim</span>
              </label>
            </div>
            <textarea value={text} onChange={(e)=>setText(e.target.value)} placeholder="Rəyinizi yazın" rows={3} className={`w-full rounded-md border px-3 py-2 text-sm outline-none ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`} />
            <div className="flex justify-end">
              <Button onClick={add}>Göndər</Button>
            </div>
          </div>
        )}
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

