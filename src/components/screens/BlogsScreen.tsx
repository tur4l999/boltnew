import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';

type BlogItem = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  url?: string;
};

const SAMPLE_BLOGS: BlogItem[] = [
  {
    id: 'b1',
    title: 'Yol hərəkəti qaydalarında edilən son dəyişikliklər',
    excerpt: 'Yeni qaydalar və sürücülərin bilməli olduğu vacib nüanslar.',
    date: '2025-01-15',
    image: '/image.png',
    url: 'https://dda.az/blogs',
  },
  {
    id: 'b2',
    title: 'İmtahana hazırlıq üçün 5 effektiv üsul',
    excerpt: 'Qısa müddətdə daha səmərəli hazırlıq aparmağın yolları.',
    date: '2025-01-05',
    image: '/image copy.png',
    url: 'https://dda.az/blogs',
  },
  {
    id: 'b3',
    title: 'Sürücülər üçün qış mövsümünə hazırlaşma tövsiyələri',
    excerpt: 'Avtomobilin texniki baxışı, təkərlər və təhlükəsizlik qaydaları.',
    date: '2024-12-20',
    image: '/DDA_logo.png',
    url: 'https://dda.az/blogs',
  },
];

export function BlogsScreen() {
  const { isDarkMode } = useApp();

  return (
    <div className={`p-3 pb-24 min-h-full transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="mb-3">
        <h1 className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Bloglar</h1>
        <div className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Yekun imtahandan öncə gələcək məqalələr
        </div>
      </div>

      <div className="space-y-2">
        {SAMPLE_BLOGS.map((b) => (
          <a
            key={b.id}
            href={b.url}
            target="_blank"
            rel="noreferrer noopener"
            className={`block rounded-xl border overflow-hidden transition-colors ${
              isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex gap-3 p-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                <img src={b.image || '/DDA_logo.png'} alt={b.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`font-bold text-sm line-clamp-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{b.title}</div>
                <div className={`text-xs mt-1 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{b.excerpt}</div>
                <div className={`text-[11px] mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{new Date(b.date).toLocaleDateString('az-AZ')}</div>
              </div>
              <div className={`self-center text-lg ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>›</div>
            </div>
          </a>
        ))}
      </div>

      <Card className={`mt-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Daha çox məqaləni saytımızda oxuya bilərsiniz: dda.az/blogs
        </div>
      </Card>
    </div>
  );
}

