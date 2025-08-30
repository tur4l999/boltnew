import type { Product } from './types';

export type StoreProduct = Product & {
  images: string[];
  discountPercent?: number; // applies to max one product as per requirement
  rating?: number;
  reviewsCount?: number;
  stock?: number;
};

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    id: 'p1',
    title: 'Smartfon Honor X6c 6GB/256GB Moonlight White',
    price: 319,
    images: [
      'https://images.pexels.com/photos/507704/pexels-photo-507704.jpeg?auto=compress&cs=tinysrgb&w=640',
      'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=640',
    ],
    description: 'Güclü batareya, geniş yaddaş və zərif dizayn.',
    rating: 4.6,
    reviewsCount: 6,
    stock: 8,
  },
  {
    id: 'p2',
    title: 'Smartfon Apple iPhone 16 Pro Max 8GB/256GB',
    price: 3900,
    images: [
      'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=640',
      'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=960',
    ],
    description: 'Titan korpus, güclü kamera və Pro texnologiyalar.',
    rating: 4.9,
    reviewsCount: 81,
    stock: 3,
    discountPercent: 27, // only this product has discount
  },
  {
    id: 'p3',
    title: 'Orqanayzer GW-268',
    price: 39.9,
    images: [
      'https://images.pexels.com/photos/3735631/pexels-photo-3735631.jpeg?auto=compress&cs=tinysrgb&w=640',
    ],
    description: 'Kosmetik və aksesuarlar üçün 360° fırlanan orqanayzer.',
    rating: 4.7,
    reviewsCount: 5,
    stock: 14,
  },
  {
    id: 'p4',
    title: 'Yapışdırmalar dəsti IKEA Vinter 2020 (50 ədəd)',
    price: 16.4,
    images: [
      'https://images.pexels.com/photos/2734581/pexels-photo-2734581.jpeg?auto=compress&cs=tinysrgb&w=640',
    ],
    description: 'Dekorativ stikerlər dəsti. Yaradıcılıq üçün əladır.',
    rating: 4.4,
    reviewsCount: 12,
    stock: 30,
  },
];

export function getDiscountedPrice(product: StoreProduct): number {
  if (!product.discountPercent) return product.price;
  return Math.round((product.price * (100 - product.discountPercent)) ) / 100;
}

