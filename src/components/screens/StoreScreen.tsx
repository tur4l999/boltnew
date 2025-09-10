import React from 'react';
import { ShoppingCart, Search, SlidersHorizontal } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { ProductCard } from '../ui/ProductCard';
import { STORE_PRODUCTS } from '../../lib/products';

export function StoreScreen() {
  const { isDarkMode, navigate, addToCart } = useApp();
  const cartBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const [q, setQ] = React.useState('');
  const [minPrice, setMinPrice] = React.useState('');
  const [maxPrice, setMaxPrice] = React.useState('');
  const [inStockOnly, setInStockOnly] = React.useState(false);
  const [discountOnly, setDiscountOnly] = React.useState(false);
  const [minRating, setMinRating] = React.useState(0);
  const [language, setLanguage] = React.useState<'AZ' | 'RU' | ''>('');
  const [sort, setSort] = React.useState<'relevance' | 'priceAsc' | 'priceDesc' | 'ratingDesc' | 'titleAsc' | 'titleDesc'>('relevance');
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

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
  const filtered = React.useMemo(() => {
    return STORE_PRODUCTS
      .filter(p => !q || p.title.toLowerCase().includes(q.toLowerCase()))
      .filter(p => !inStockOnly || (p.stock ?? 0) > 0)
      .filter(p => !discountOnly || !!p.discountPercent)
      .filter(p => (p.rating ?? 0) >= (minRating || 0))
      .filter(p => !language || (p as any).language === language)
      .filter(p => (minPrice === '' || p.price >= Number(minPrice)))
      .filter(p => (maxPrice === '' || p.price <= Number(maxPrice)))
      .sort((a, b) => {
        if (sort === 'priceAsc') return (a.discountPercent ? a.price * (100 - a.discountPercent) : a.price) - (b.discountPercent ? b.price * (100 - b.discountPercent) : b.price);
        if (sort === 'priceDesc') return (b.discountPercent ? b.price * (100 - b.discountPercent) : b.price) - (a.discountPercent ? a.price * (100 - a.discountPercent) : a.price);
        if (sort === 'ratingDesc') return (b.rating ?? 0) - (a.rating ?? 0);
        if (sort === 'titleAsc') return a.title.localeCompare(b.title);
        if (sort === 'titleDesc') return b.title.localeCompare(a.title);
        return 0;
      });
  }, [q, inStockOnly, discountOnly, minRating, language, minPrice, maxPrice, sort]);

  return (
    <div className={`p-3 pb-24 min-h-full transition-colors duration-200 ${
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

      {/* Compact top bar: animated search, sort select, advanced toggle */}
      <div className={`flex items-center justify-between gap-2 rounded-xl border shadow-sm px-2 py-2 ${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur`}>
        <div className="flex items-center gap-2 min-w-0">
          <button
            aria-label="Axtarış"
            onClick={() => setIsSearchOpen(v => !v)}
            aria-expanded={isSearchOpen}
            className={`h-9 w-9 rounded-full flex items-center justify-center border transition-all duration-500 ease-out ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'} ${isSearchOpen ? 'order-2 rotate-0' : 'order-1 rotate-0'}`}
          >
            <Search size={16} />
          </button>
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Axtarış..."
            className={`${isDarkMode ? 'bg-gray-900 text-gray-100 border-gray-700' : 'bg-white text-gray-900 border-gray-300'} rounded-md border outline-none transition-all duration-500 ease-out overflow-hidden ${isSearchOpen ? 'order-1 w-40 opacity-100 px-3 py-2' : 'order-2 w-0 opacity-0 px-0 py-0 border-transparent'}`}
          />
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <select
            value={sort}
            onChange={e=>setSort(e.target.value as any)}
            className={`${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-gray-300 text-gray-900'} rounded-md border px-2 py-2 text-sm`}
          >
            <option value="relevance">Filter</option>
            <option value="priceAsc">Qiymət ↑</option>
            <option value="priceDesc">Qiymət ↓</option>
            <option value="titleAsc">A-Z</option>
            <option value="titleDesc">Z-A</option>
            <option value="ratingDesc">Reytinq</option>
          </select>
          <button
            onClick={() => setShowAdvanced(v => !v)}
            aria-label="Əlavə filter"
            className={`h-9 w-9 rounded-full flex items-center justify-center border transition-colors ${isDarkMode ? 'bg-emerald-700 border-emerald-600 text-white hover:bg-emerald-600' : 'bg-emerald-500 border-emerald-500 text-white hover:bg-emerald-600'}`}
          >
            <SlidersHorizontal size={16} />
          </button>
        </div>
      </div>

      {showAdvanced && (
        <Card className={`mt-2 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="mb-2 flex items-center justify-between">
            <div className="font-medium">Əlavə filterlər</div>
            <button
              onClick={() => { setQ(''); setMinPrice(''); setMaxPrice(''); setInStockOnly(false); setDiscountOnly(false); setMinRating(0); setLanguage(''); setSort('relevance'); }}
              className={`${isDarkMode ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'} rounded-md px-3 py-1.5 text-xs`}
            >
              Sıfırla
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <input type="number" min={0} value={minPrice} onChange={e=>setMinPrice(e.target.value)} placeholder="Min ₼" className={`${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-100' : 'bg-white border-gray-300 text-gray-900'} rounded-md border px-3 py-2 outline-none w-full`} />
              <input type="number" min={0} value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} placeholder="Max ₼" className={`${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-100' : 'bg-white border-gray-300 text-gray-900'} rounded-md border px-3 py-2 outline-none w-full`} />
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1">
                <input type="checkbox" checked={inStockOnly} onChange={e=>setInStockOnly(e.target.checked)} />
                <span>Stokda</span>
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" checked={discountOnly} onChange={e=>setDiscountOnly(e.target.checked)} />
                <span>Endirimli</span>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <select value={minRating} onChange={e=>setMinRating(Number(e.target.value))} className={`${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-100' : 'bg-white border-gray-300 text-gray-900'} rounded-md border px-2 py-2 w-full`}>
                <option value={0}>Reytinq: hamısı</option>
                <option value={3}>3★+</option>
                <option value={4}>4★+</option>
                <option value={5}>5★</option>
              </select>
              <select value={language} onChange={e=>setLanguage(e.target.value as any)} className={`${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-100' : 'bg-white border-gray-300 text-gray-900'} rounded-md border px-2 py-2 w-full`}>
                <option value="">Dil: hamısı</option>
                <option value="AZ">AZ</option>
                <option value="RU">RU</option>
              </select>
            </div>
          </div>
        </Card>
      )}

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

      <div className="grid grid-cols-2 gap-3 mt-3">
        {filtered.map((p, idx) => (
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