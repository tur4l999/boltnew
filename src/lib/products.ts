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
    stock: 10,
    discountPercent: 10,
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
    stock: 5,
    author: 'DDA',
    publisher: 'DDA',
    language: 'AZ',
    year: 2025,
  },
  // Additional priced products (2 more priced; total priced = 4)
  {
    id: 'p3',
    title: 'Yol Nişanları Cədvəli',
    price: 12,
    images: ['/book-1.svg'],
    description: 'Bütün yol nişanlarının izahlı cədvəli.',
    reviewsCount: 7,
    rating: 4.6,
    stock: 8,
  },
  {
    id: 'p4',
    title: 'Praktiki Sürücülük Tapşırıqları',
    price: 14,
    images: ['/book-2.svg'],
    description: 'Sürücülük vərdişlərini inkişaf etdirən tapşırıqlar.',
    reviewsCount: 11,
    rating: 4.5,
    stock: 6,
    discountPercent: 15,
  },
  // Out of stock items (6)
  {
    id: 'p5',
    title: 'İşarələrin Test Toplusu',
    price: 11,
    images: ['/book-1.svg'],
    description: 'İşarələrlə bağlı test sualları.',
    stock: 0,
  },
  {
    id: 'p6',
    title: 'Qaydaların Qısa Xülasəsi',
    price: 9,
    images: ['/book-2.svg'],
    description: 'Ən vacib qaydaların xülasəsi.',
    stock: 0,
  },
  {
    id: 'p7',
    title: 'Sual-Cavab: Yol Hərəkəti',
    price: 13,
    images: ['/book-1.svg'],
    description: 'Tez-tez verilən suallar üzrə izahlar.',
    stock: 0,
  },
  {
    id: 'p8',
    title: 'Təhlükəsizlik Qaydaları',
    price: 16,
    images: ['/book-2.svg'],
    description: 'Təhlükəsizlik üzrə geniş vəsait.',
    stock: 0,
  },
  {
    id: 'p9',
    title: 'Nəqliyyat Vasitələrinin Xüsusiyyətləri',
    price: 18,
    images: ['/book-1.svg'],
    description: 'Fərqli nəqliyyat vasitələrinə ümumi baxış.',
    stock: 0,
  },
  {
    id: 'p10',
    title: 'İmtahan Strategiyaları',
    price: 19,
    images: ['/book-2.svg'],
    description: 'İmtahana effektiv hazırlıq üçün strategiyalar.',
    stock: 0,
    
  },
];

export function getDiscountedPrice(product: StoreProduct): number {
  if (!product.discountPercent) return product.price;
  return Math.round((product.price * (100 - product.discountPercent)) ) / 100;
}

