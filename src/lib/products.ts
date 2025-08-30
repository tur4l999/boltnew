import type { Product, ProductVariation } from './types';

export const products: Product[] = [
  {
    id: 'book1',
    title: 'Yol Hərəkəti Qaydaları',
    price: 12,
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Tam və ətraflı yol qaydaları kitabı'
  },
  {
    id: 'book2',
    title: 'Yol Nişanları Atlası',
    price: 8,
    image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Bütün yol nişanlarının izahı'
  },
  {
    id: 'book3',
    title: 'Sürücülük Təcrübəsi',
    price: 15,
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Praktiki sürücülük məsləhətləri'
  },
  {
    id: 'book4',
    title: 'İmtahan Hazırlığı',
    price: 10,
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'İmtahana hazırlıq üçün test kitabı'
  }
];

export const productVariations: Record<string, ProductVariation[]> = {
  book1: [
    { id: 'std', name: 'Standart' },
    { id: 'deluxe', name: 'Deluxe', priceDelta: 3 }
  ],
  book2: [
    { id: 'std', name: 'Standart' }
  ],
  book3: [
    { id: 'std', name: 'Standart' },
    { id: 'pro', name: 'Pro', priceDelta: 5 }
  ],
  book4: [
    { id: 'std', name: 'Standart' }
  ]
};

export const popularProductIds: string[] = ['book3', 'book1', 'book4', 'book2'];

