import React from 'react';
import { ShoppingCart, Search, SlidersHorizontal } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { ProductCard } from '../ui/ProductCard';
import { STORE_PRODUCTS } from '../../lib/products';
import { EmojiIcon } from '../ui/EmojiIcon';

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
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Modern Hero Section */}
      <div className={`relative overflow-hidden ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-emerald-900' 
          : 'bg-gradient-to-br from-emerald-50 via-white to-emerald-100'
      }`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative px-4 py-6">
          <div className="text-center">
            <h1 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-200 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Keyfiyyətli kitablar və <br />
              <span className="text-emerald-500">öyrənmə materialları</span>
            </h1>
            
            {/* Promotional Banner */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg mt-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-semibold">20₼+ sifarişlər üçün pulsuz çatdırılma</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-24">
        {/* Modern Search and Filter Section */}
        <div className="mb-6 -mt-8 relative z-10 px-1">
          <div className={`backdrop-blur-xl rounded-2xl border shadow-xl p-3 sm:p-4 ${
            isDarkMode 
              ? 'bg-gray-800/90 border-gray-700/50' 
              : 'bg-white/90 border-gray-200/50'
          }`}>
            {/* Search Bar */}
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <input
                type="text"
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Kitab, müəllif və ya açar söz axtar..."
                className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${
                  isDarkMode 
                    ? 'bg-gray-900/50 border-gray-600 text-gray-100 placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                }`}
              />
              {q && (
                <button
                  onClick={() => setQ('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Search Controls */}
            <div className="flex items-center gap-2">
              <select
                value={sort}
                onChange={e=>setSort(e.target.value as any)}
                className={`flex-1 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-100' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="relevance">Sırala</option>
                <option value="priceAsc">Qiymət: Artan</option>
                <option value="priceDesc">Qiymət: Azalan</option>
                <option value="titleAsc">Ad: A-Z</option>
                <option value="titleDesc">Ad: Z-A</option>
                <option value="ratingDesc">Ən yaxşı reytinq</option>
              </select>
              
              <button
                onClick={() => setShowAdvanced(v => !v)}
                className={`p-3 rounded-lg border transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center ${
                  showAdvanced
                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-md'
                    : isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <SlidersHorizontal size={18} />
              </button>
            </div>
          </div>
        </div>

        {showAdvanced && (
          <div className={`mb-6 backdrop-blur-xl rounded-2xl border shadow-xl p-4 transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800/90 border-gray-700/50' 
              : 'bg-white/90 border-gray-200/50'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Ətraflı filterlər
              </h3>
              <button
                onClick={() => { setQ(''); setMinPrice(''); setMaxPrice(''); setInStockOnly(false); setDiscountOnly(false); setMinRating(0); setLanguage(''); setSort('relevance'); }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                🔄 Hamısını sıfırla
              </button>
            </div>
          
            <div className="space-y-4">
              {/* Quick Filter Chips */}
              <div>
                <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  🔍 Sürətli filterlər
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setInStockOnly(!inStockOnly)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      inStockOnly
                        ? 'bg-emerald-500 text-white shadow-md'
                        : isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    📦 Stokda var
                  </button>
                  <button
                    onClick={() => setDiscountOnly(!discountOnly)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      discountOnly
                        ? 'bg-pink-500 text-white shadow-md'
                        : isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🏷️ Endirimli
                  </button>
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  💰 Qiymət aralığı
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className={`absolute left-2 top-1/2 -translate-y-1/2 text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Min</span>
                    <input 
                      type="number" 
                      min={0} 
                      value={minPrice} 
                      onChange={e=>setMinPrice(e.target.value)} 
                      placeholder="0" 
                      className={`w-full pl-10 pr-8 py-2 text-center rounded-lg border transition-colors text-sm ${
                        isDarkMode 
                          ? 'bg-gray-900/50 border-gray-600 text-gray-100 placeholder-gray-400' 
                          : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                      }`} 
                    />
                    <span className={`absolute right-2 top-1/2 -translate-y-1/2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>₼</span>
                  </div>
                  
                  <div className={`px-2 py-1 rounded text-xs font-medium ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                    ilə
                  </div>
                  
                  <div className="relative flex-1">
                    <span className={`absolute left-2 top-1/2 -translate-y-1/2 text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Max</span>
                    <input 
                      type="number" 
                      min={0} 
                      value={maxPrice} 
                      onChange={e=>setMaxPrice(e.target.value)} 
                      placeholder="∞" 
                      className={`w-full pl-10 pr-8 py-2 text-center rounded-lg border transition-colors text-sm ${
                        isDarkMode 
                          ? 'bg-gray-900/50 border-gray-600 text-gray-100 placeholder-gray-400' 
                          : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                      }`} 
                    />
                    <span className={`absolute right-2 top-1/2 -translate-y-1/2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>₼</span>
                  </div>
                </div>
              </div>

              {/* Rating and Language */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    ⭐ Minimum reytinq
                  </label>
                  <select 
                    value={minRating} 
                    onChange={e=>setMinRating(Number(e.target.value))} 
                    className={`w-full px-3 py-2 rounded-lg border transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-900/50 border-gray-600 text-gray-100' 
                        : 'bg-gray-50 border-gray-200 text-gray-900'
                    }`}
                  >
                    <option value={0}>Hamısı</option>
                    <option value={3}>3★ və yuxarı</option>
                    <option value={4}>4★ və yuxarı</option>
                    <option value={5}>Yalnız 5★</option>
                  </select>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    🌐 Dil
                  </label>
                  <select 
                    value={language} 
                    onChange={e=>setLanguage(e.target.value as any)} 
                    className={`w-full px-3 py-2 rounded-lg border transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-900/50 border-gray-600 text-gray-100' 
                        : 'bg-gray-50 border-gray-200 text-gray-900'
                    }`}
                  >
                    <option value="">Bütün dillər</option>
                    <option value="AZ">Azərbaycan dili</option>
                    <option value="RU">Rus dili</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modern Floating Cart button */}
        <button
          onClick={() => navigate('Cart')}
          ref={cartBtnRef}
          className="fixed z-40 group bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-2xl rounded-2xl px-4 py-3 flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
          style={{
            right: 'calc(env(safe-area-inset-right, 0px) + 20px)',
            bottom: 'calc(env(safe-area-inset-bottom, 0px) + 84px)'
          }}
        >
          <div className="relative">
            <ShoppingCart size={20} className="transition-transform group-hover:scale-110" />
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              3
            </div>
          </div>
          <span className="font-medium">Səbət</span>
        </button>

        {/* Results Summary */}
        {filtered.length > 0 && (
          <div className="mb-4">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <span className="font-medium text-emerald-500">{filtered.length}</span> məhsul tapıldı
              {q && <span> "<span className="font-medium">{q}</span>" üçün</span>}
            </p>
          </div>
        )}

        {/* Modern Product Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8">
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

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Heç bir məhsul tapılmadı
            </h3>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              Axtarış kriteriyalarınızı dəyişdirməyi cəhd edin
            </p>
            <button
              onClick={() => { setQ(''); setMinPrice(''); setMaxPrice(''); setInStockOnly(false); setDiscountOnly(false); setMinRating(0); setLanguage(''); setSort('relevance'); }}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors"
            >
              Filterləri sıfırla
            </button>
          </div>
        )}

        {/* Professional Payment & Trust Section */}
        <div className={`mt-6 rounded-xl border shadow-sm ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-gray-50/80 border-gray-200/50'
        }`}>
          <div className="px-4 py-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
              {/* Compact Payment Method */}
              <div className="flex items-center gap-2">
                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Ödəniş:</span>
                <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                  isDarkMode ? 'bg-gray-700/30 text-gray-300' : 'bg-gray-100 text-gray-600'
                }`}>
                  💳 Kart
                </div>
              </div>

              {/* Enhanced Trust Badges */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-6">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-emerald-500/20' : 'bg-emerald-50'
                  }`}>
                    <span className="text-emerald-500 text-sm">🔒</span>
                  </div>
                  <div>
                    <div className={`text-xs font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      Təhlükəsiz ödəniş
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      SSL şifrələmə
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-blue-500/20' : 'bg-blue-50'
                  }`}>
                    <span className="text-blue-500 text-sm">⚡</span>
                  </div>
                  <div>
                    <div className={`text-xs font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      Sürətli çatdırılma
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      1-2 iş günü
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-purple-500/20' : 'bg-purple-50'
                  }`}>
                    <span className="text-purple-500 text-sm">🎯</span>
                  </div>
                  <div>
                    <div className={`text-xs font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      24/7 dəstək
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Həmişə əlçatan
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}