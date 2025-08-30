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
    title: 'Talıbov: Qaydalar – Sürücülük vəsiqəsi üçün vəsait',
    price: 18,
    images: [
      'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=640',
      'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=640',
    ],
    description: 'Yol hərəkəti qaydaları üzrə strukturlaşdırılmış izahlar və illüstrasiyalar.',
    rating: 4.8,
    reviewsCount: 24,
    stock: 20,
    author: 'Talıbov',
    publisher: 'DDA',
    language: 'AZ',
    year: 2023,
    externalUrl: 'https://dda.az/shop/talibov-qaydalar-suculuk-vesiqesi-kitabi-almaq',
  },
  {
    id: 'p2',
    title: 'İmtahan testləri: Yol hərəkəti qaydaları',
    price: 22,
    images: [
      'https://images.pexels.com/photos/1059334/pexels-photo-1059334.jpeg?auto=compress&cs=tinysrgb&w=640',
      'https://images.pexels.com/photos/33283/stack-of-books-vintage-books-book-books.jpg?auto=compress&cs=tinysrgb&w=640',
    ],
    description: 'Qanunvericiliyə uyğunlaşdırılmış imtahan sualları və cavab açarları.',
    rating: 4.9,
    reviewsCount: 81,
    stock: 12,
    discountPercent: 27, // only this product has discount
    author: 'Müəlliflər qrupu',
    publisher: 'DDA',
    language: 'AZ/RU',
    year: 2024,
    externalUrl: 'https://dda.az/shop/ekzamenacionnye-testy-po-pravilam-dorozhnogo-dvizh',
  },
  {
    id: 'p3',
    title: 'Yol hərəkətinin təşkili və təhlükəsizliyi',
    price: 28.5,
    images: [
      'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=640',
    ],
    description: 'Hərəkətin təşkili, təhlükəsizlik prinsipləri və praktiki nümunələr.',
    rating: 4.7,
    reviewsCount: 5,
    stock: 14,
    author: 'Ekspert müəlliflər',
    publisher: 'DDA',
    language: 'AZ',
    year: 2022,
    externalUrl: 'https://dda.az/shop/yol-hereketinin-teskili-ve-hereket-tehlukesizliyin',
  },
  {
    id: 'p4',
    title: 'İllüstrasiyalı yol hərəkəti qaydaları',
    price: 25,
    images: [
      'https://images.pexels.com/photos/409821/pexels-photo-409821.jpeg?auto=compress&cs=tinysrgb&w=640',
    ],
    description: 'Qaydaların şəkilli izahı ilə öyrənməyi asanlaşdıran nəşr.',
    rating: 4.4,
    reviewsCount: 12,
    stock: 30,
    author: 'Redaksiya heyəti',
    publisher: 'DDA',
    language: 'RU/AZ',
    year: 2021,
    externalUrl: 'https://dda.az/shop/pravila-dorozhnogo-dvizheniya-c-illyustraciyami',
  },
];

export function getDiscountedPrice(product: StoreProduct): number {
  if (!product.discountPercent) return product.price;
  return Math.round((product.price * (100 - product.discountPercent)) ) / 100;
}

