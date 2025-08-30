import React from 'react';
import { Card } from './Card';
import { Button } from './Button';
import type { StoreProduct } from '../../lib/products';
import { getDiscountedPrice } from '../../lib/products';
import { useApp } from '../../contexts/AppContext';

interface ProductCardProps {
  product: StoreProduct;
  onClick?: () => void;
  onAddToCart?: () => void;
}

export function ProductCard({ product, onClick, onAddToCart }: ProductCardProps) {
  const { isDarkMode } = useApp();
  const hasDiscount = !!product.discountPercent;
  const discounted = getDiscountedPrice(product);

  return (
    <Card
      onClick={onClick}
      className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-3`}
    >
      <div className="relative">
        {hasDiscount && (
          <span className="absolute -top-2 -left-2 bg-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
            -{product.discountPercent}%
          </span>
        )}
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-32 object-cover rounded-lg mb-3"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-pink-600">{hasDiscount ? discounted : product.price} ₼</span>
          {hasDiscount && (
            <span className="text-xs line-through opacity-60">{product.price} ₼</span>
          )}
        </div>
        <h3 className={`${isDarkMode ? 'text-gray-100' : 'text-gray-900'} font-bold text-sm leading-tight line-clamp-2`}>
          {product.title}
        </h3>
        <div className="flex items-center gap-1 text-[10px] text-amber-500">
          {'★'.repeat(Math.round(product.rating ?? 4))}
          <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} ml-1`}>
            {(product.reviewsCount ?? 0)} rəylər
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span />
          <Button size="sm" className="text-xs px-3 py-1" onClick={onAddToCart}>
            Səbətə at
          </Button>
        </div>
      </div>
    </Card>
  );
}

