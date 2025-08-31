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
}

export function ProductCard({ product, onClick, onAddToCart }: ProductCardProps) {
  const { isDarkMode } = useApp();
  const hasDiscount = !!product.discountPercent;
  const discounted = getDiscountedPrice(product);
  const imgRef = React.useRef<HTMLImageElement | null>(null);
  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  return (
    <Card
      onClick={onClick}
      className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-3 h-full flex flex-col`}
    >
      <div className="relative">
        {/* Wishlist heart */}
        <button
          aria-label="Sevimlilərə əlavə et"
          className="absolute top-1.5 right-1.5 z-10 h-7 w-7 rounded-full bg-white/90 border border-gray-300 flex items-center justify-center shadow-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-900">
            <path fill="none" stroke="currentColor" strokeWidth="2" d="M12.1 8.64l-.1.1l-.11-.11a3.5 3.5 0 0 0-4.95 0a3.5 3.5 0 0 0 0 4.95l5.06 5.06l5.06-5.06a3.5 3.5 0 1 0-4.95-4.95Z"/>
          </svg>
        </button>
        {hasDiscount && (
          <span className="absolute -top-2 -left-2 bg-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
            -{product.discountPercent}%
          </span>
        )}
        <img
          ref={imgRef}
          src={product.images[0]}
          alt={product.title}
          className="w-full h-28 object-cover rounded-lg mb-3"
        />
      </div>
      <div className="space-y-2 flex flex-col min-h-[150px]">
        <div className={`flex items-baseline gap-2 h-5 ${isOutOfStock ? 'invisible' : ''}`}>
          <span className="text-lg font-bold text-pink-600">{hasDiscount ? discounted : product.price} ₼</span>
          {hasDiscount && (
            <span className="text-xs line-through opacity-60">{product.price} ₼</span>
          )}
        </div>
        <h3 className={`${isDarkMode ? 'text-gray-100' : 'text-gray-900'} font-bold text-sm leading-tight line-clamp-2`}>
          {product.title}
        </h3>
        <div className={`flex items-center gap-1 text-[10px] text-amber-500 h-4 ${isOutOfStock ? 'invisible' : ''}`}>
          {'★'.repeat(Math.round(product.rating ?? 4))}
          <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} ml-1`}>
            {(product.reviewsCount ?? 0)} rəylər
          </span>
        </div>
        <div className="mt-auto pt-2 pb-1 flex items-center justify-between">
          <span />
          <Button
            size="sm"
            className="text-xs px-3 py-1"
            disabled={isOutOfStock}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(imgRef.current);
            }}
          >
            {isOutOfStock ? 'Stokda yoxdur' : 'Səbətə at'}
          </Button>
        </div>
      </div>
    </Card>
  );
}

