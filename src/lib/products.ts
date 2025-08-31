import type { Product } from './types';

export type StoreProduct = Product & {
  images: string[];
  discountPercent?: number; // applies to max one product as per requirement
  rating?: number;
  reviewsCount?: number;
  stock?: number;
  author?: string;
  publisher?: string;
  language?: string;
  year?: number;
  externalUrl?: string;
};

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    id: 'p1',
    title: 'TEST-İMTAHAN ÇALIŞMALARI',
    price: 15,
    images: [
      '/image.png',
    ],
    description: 'Bütün kateqoriyalara aid test-imtahan çalışmaları.',
    rating: 4.9,
    reviewsCount: 81,
    stock: 40,
    author: 'DDA',
    publisher: 'DDA',
    language: 'AZ',
    year: 2025,
  },
  {
    id: 'p2',
    title: 'SÜRÜCÜLÜK VƏSİQƏSİ VƏSAİTİ',
    price: 10,
    images: [
      '/image copy.png',
    ],
    description: 'Sürücülük vəsiqəsi imtahanlarına hazırlıq üçün vəsait.',
    rating: 4.8,
    reviewsCount: 24,
    stock: 35,
    author: 'DDA',
    publisher: 'DDA',
    language: 'AZ',
    year: 2025,
  },
];

export function getDiscountedPrice(product: StoreProduct): number {
  if (!product.discountPercent) return product.price;
  return Math.round((product.price * (100 - product.discountPercent)) ) / 100;
}

