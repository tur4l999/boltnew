import React from 'react';
import { Card } from './Card';
import { Button } from './Button';
import type { StoreProduct } from '../../lib/products';
import { getDiscountedPrice } from '../../lib/products';
import { useApp } from '../../contexts/AppContext';

interface ProductCardProps {
  product: StoreProduct;
  onClick?: () => void;
  onAddToCart?: (sourceEl: HTMLElement | null) => void;
  isBestseller?: boolean;
}

export function ProductCard({ product, onClick, onAddToCart, isBestseller }: ProductCardProps) {
  const { isDarkMode } = useApp();
  const hasDiscount = !!product.discountPercent;
  const discounted = getDiscountedPrice(product);
  const imgRef = React.useRef<HTMLImageElement | null>(null);
  const isOutOfStock = product.stock !== undefined && product.stock <= 0;
  const [hoursLeft, setHoursLeft] = React.useState<number | null>(null);

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
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:shadow-xl h-full flex flex-col ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
          : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg'
      }`}
    >
      <div className="relative overflow-hidden">
        {/* Wishlist heart */}
        <button
          aria-label="Sevimlilərə əlavə et"
          className="absolute top-3 right-3 z-20 h-8 w-8 rounded-full bg-white/90 backdrop-blur border border-gray-300 flex items-center justify-center shadow-lg transition-all duration-200 hover:bg-white hover:scale-110"
          onClick={(e) => e.stopPropagation()}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-700 hover:text-red-500 transition-colors">
            <path fill="none" stroke="currentColor" strokeWidth="2" d="M12.1 8.64l-.1.1l-.11-.11a3.5 3.5 0 0 0-4.95 0a3.5 3.5 0 0 0 0 4.95l5.06 5.06l5.06-5.06a3.5 3.5 0 1 0-4.95-4.95Z"/>
          </svg>
        </button>

        {/* Badges */}
        {(hasDiscount || isBestseller) && (
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
            {hasDiscount && (
              <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                -{product.discountPercent}%
              </div>
            )}
            {hasDiscount && typeof hoursLeft === 'number' && hoursLeft > 0 && (
              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg animate-pulse">
                ⏰ {hoursLeft}s
              </div>
            )}
            {isBestseller && (
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                🏆 Bestseller
              </div>
            )}
          </div>
        )}

        {/* Image with overlay */}
        <div className="relative overflow-hidden">
          <img
            ref={imgRef}
            src={product.images[0]}
            alt={product.title}
            className="w-full h-32 sm:h-40 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
        </div>
      </div>
      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        {/* Price */}
        <div className={`flex items-center justify-between mb-2 ${isOutOfStock ? 'opacity-50' : ''}`}>
          <div className="flex items-baseline gap-1 sm:gap-2">
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
              {hasDiscount ? discounted : product.price} ₼
            </span>
            {hasDiscount && (
              <span className="text-xs sm:text-sm line-through text-gray-400">{product.price} ₼</span>
            )}
          </div>
          {isOutOfStock && (
            <span className="text-xs font-medium text-red-500 bg-red-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
              Stokda yox
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className={`font-semibold text-sm sm:text-base leading-tight mb-2 line-clamp-2 min-h-[2.5rem] ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>
          {product.title}
        </h3>

        {/* Rating and Reviews */}
        {!isOutOfStock && (
          <div className="flex items-center gap-1 mb-2 sm:mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className={`text-xs sm:text-sm ${
                    i < Math.round(product.rating ?? 4) 
                      ? 'text-yellow-400' 
                      : isDarkMode ? 'text-gray-600' : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className={`text-xs ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              ({product.reviewsCount ?? 0})
            </span>
          </div>
        )}

        {/* Add to Cart Button */}
        <div className="mt-auto">
          <button
            disabled={isOutOfStock}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(imgRef.current);
            }}
            className={`w-full py-2 sm:py-2.5 px-2 sm:px-4 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 ${
              isOutOfStock
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transform hover:scale-[1.02]'
            }`}
          >
            {isOutOfStock ? '❌ Stokda yox' : '🛒 Səbətə at'}
          </button>
        </div>
      </div>
    </div>
  );
}

