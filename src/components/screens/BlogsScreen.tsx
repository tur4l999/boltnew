import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { BlogDetailScreen } from './BlogDetailScreen';

type BlogItem = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  image?: string;
  viewCount: number;
  category: string;
};

type Category = {
  id: string;
  name: string;
  emoji: string;
  color: string;
};

const CATEGORIES: Category[] = [
  { id: 'all', name: 'Hamısı', emoji: '📚', color: 'gray' },
  { id: 'rules', name: 'Qaydalar', emoji: '⚖️', color: 'blue' },
  { id: 'exam', name: 'İmtahan', emoji: '📝', color: 'emerald' },
  { id: 'safety', name: 'Təhlükəsizlik', emoji: '🛡️', color: 'red' },
  { id: 'tips', name: 'Məsləhətlər', emoji: '💡', color: 'yellow' },
];

const SAMPLE_BLOGS: BlogItem[] = [
  {
    id: 'b1',
    title: 'Yol hərəkəti qaydalarında edilən son dəyişikliklər',
    excerpt: 'Yeni qaydalar və sürücülərin bilməli olduğu vacib nüanslar haqda ətraflı məlumat.',
    content: `2025-ci ildə yol hərəkəti qaydalarında vacib dəyişikliklər edilmişdir. Bu dəyişikliklər sürücülərin təhlükəsizliyini artırmaq və müasir standartlara uyğunlaşmaq məqsədi ilə həyata keçirilmişdir.

**Əsas dəyişikliklər:**

1. **Sürət limitləri** - Şəhər daxilində maksimum sürət 50 km/s-dan 60 km/s-a qaldırılmışdır.

2. **Telefon istifadəsi** - Sürmə zamanı əl ilə telefon istifadəsinə görə cərimə məbləği artırılmışdır.

3. **Təhlükəsizlik kəmərləri** - Arxa oturacaqda da təhlükəsizlik kəməri taxmaq məcburi edilmişdir.

4. **Elektromobillər** - Elektromobillər üçün xüsusi parking yerləri ayrılmışdır və onların pozulmasına görə ciddi cərimələr tətbiq edilir.

Bu qaydalar artıq qüvvədədir və bütün sürücülər onlara riayət etməlidirlər. Qaydaları pozanlara münasibətdə ciddi tədbirlər görüləcəkdir.`,
    date: '2025-01-15',
    tags: ['Qaydalar', 'Dəyişiklik', 'Təhlükəsizlik'],
    image: '/image.png',
    viewCount: 1247,
    category: 'rules',
  },
  {
    id: 'b2',
    title: 'İmtahana hazırlıq üçün 5 effektiv üsul',
    excerpt: 'Qısa müddətdə daha səmərəli hazırlıq aparmağın yolları və məşq üsulları.',
    content: `Sürücülük imtahanına hazırlıq çətin proses ola bilər, lakin doğru üsullarla bu prosesi asanlaşdırmaq mümkündür.

**5 Effektiv Hazırlıq Üsulu:**

**1. Düzenli məşq rejimi**
Hər gün ən azı 30 dəqiqə test həll edin. Sabit məşq yaddasda saxlanmanı gücləndirir.

**2. Səhvləri təhlil edin**
Hər səhvli cavabın səbəbini araşdırın və doğru variantı başa düşün.

**3. Müxtəlif test formalarını istifadə edin**
Yalnız mobil tətbiqdən deyil, müxtəlif mənbələrdən test həll edin.

**4. Praktiki bilik əldə edin**
Nəzəri bilikləri praktiki vəziyyətlərlə əlaqələndirin.

**5. Stres idarəetməsi**
İmtahan stresini azaltmaq üçün dərin nəfəs alma texnikalarını öyrənin.

Bu üsulları tətbiq etməklə imtahanda uğur qazanma şansınız əhəmiyyətli dərəcədə artacaq. Unutmayın ki, səbir və düzenli məşq uğurun açarıdır.`,
    date: '2025-01-05',
    tags: ['İmtahan', 'Hazırlıq', 'Məşq'],
    image: '/image copy.png',
    viewCount: 892,
    category: 'exam',
  },
  {
    id: 'b3',
    title: 'Sürücülər üçün qış mövsümünə hazırlaşma tövsiyələri',
    excerpt: 'Avtomobilin texniki baxışı, təkərlər və təhlükəsizlik qaydaları haqqında məlumat.',
    content: `Qış mövsümü sürücülər üçün xüsusi hazırlıq tələb edir. Təhlükəsiz sürmə üçün avtomobilinizi və özünüzü bu mövsümə hazırlayın.

**Texniki Hazırlıq:**

**Təkərlər və Şinlər**
- Qış şinlərinin derinliyi minimum 4 mm olmalıdır
- Şin təzyiqini yoxlayın (soyuqda təzyiq azalır)
- Zəncir və digər qış aksesuarlarını hazır saxlayın

**Mühərrik və Sistemlər**
- Antifriz səviyyəsini yoxlayın (-25°C-ə qədər davamlı olmalıdır)
- Akkumulyatoru test edin (soyuqda gücü azalır)
- Fərən və arxa şüşə isitmələrini yoxlayın

**Təhlükəsizlik Təchizatları**
- Buz kazıyıcı və qar fırçası
- İlk yardım çantası və fənər
- Ehtiyat battaniye və isti geyim

**Sürmə Texnikası:**
- Yavaş başlayın və tormoz basın
- Məsafəni 2 dəfə artırın
- Kəskin manevrlərdən çəkinin

Bu hazırlıqları etməklə qış mövsümündə təhlükəsiz və rahat sürə bilərsiniz.`,
    date: '2024-12-20',
    tags: ['Qış', 'Təhlükəsizlik', 'Təchizat'],
    image: '/DDA_logo.png',
    viewCount: 654,
    category: 'safety',
  },
];

export function BlogsScreen() {
  const { isDarkMode } = useApp();
  const [selectedBlog, setSelectedBlog] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter blogs based on search term and category
  const filteredBlogs = SAMPLE_BLOGS.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleBlogClick = (blogId: string) => {
    setSelectedBlog(blogId);
  };

  const handleNavigateBack = () => {
    setSelectedBlog(null);
  };

  const selectedBlogData = selectedBlog ? SAMPLE_BLOGS.find(b => b.id === selectedBlog) : null;

  // If a blog is selected, show the detail screen
  if (selectedBlogData) {
    return (
      <BlogDetailScreen
        blog={selectedBlogData}
        allBlogs={SAMPLE_BLOGS}
        onNavigateBack={handleNavigateBack}
        onNavigateToBlog={handleBlogClick}
      />
    );
  }


  return (
    <div className={`min-h-screen pb-24 transition-colors duration-300 ${
      isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      {/* Modern Header with Glassmorphism */}
      <div className={`sticky top-0 z-20 ${
        isDarkMode ? 'bg-gray-900/80' : 'bg-white/80'
      } backdrop-blur-xl border-b ${
        isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
      }`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} animate-fade-in-up`}>
                📰 Bloglar
              </h1>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} animate-fade-in-up`} style={{animationDelay: '0.1s'}}>
                Yekun imtahandan öncə gələcək məqalələr
              </p>
            </div>
            <div className={`px-3 py-2 rounded-full text-xs font-medium ${
              isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
            } animate-scale-in`}>
              {filteredBlogs.length} məqalə
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative animate-slide-in-right mb-4">
            <input
              type="text"
              placeholder="Bloglərdə axtar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-4 py-3 pl-12 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800/50 border-gray-700 text-gray-100 placeholder-gray-500' 
                  : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500'
              }`}
            />
            <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-lg ${
              isDarkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>
              🔍
            </div>
          </div>

          {/* Categories */}
          <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h3 className={`text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Kateqoriyalar
            </h3>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
              {CATEGORIES.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 hover:scale-105 animate-slide-in-right ${
                    selectedCategory === category.id
                      ? isDarkMode 
                        ? 'bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/50' 
                        : 'bg-emerald-50 text-emerald-600 border-2 border-emerald-200'
                      : isDarkMode 
                        ? 'bg-gray-800/50 text-gray-300 border border-gray-700 hover:bg-gray-700/50' 
                        : 'bg-white/50 text-gray-600 border border-gray-200 hover:bg-gray-100/50'
                  }`}
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  <span className="text-base">{category.emoji}</span>
                  {category.name}
                  {selectedCategory === category.id && (
                    <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                      isDarkMode ? 'bg-emerald-400/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {category.id === 'all' ? SAMPLE_BLOGS.length : SAMPLE_BLOGS.filter(b => b.category === category.id).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Blog Cards Container */}
      <div className="p-4">
        <div className="space-y-6">
          {filteredBlogs.map((blog, index) => (
            <Card
              key={blog.id}
              variant="glass"
              className="overflow-hidden hover-lift cursor-pointer transition-all duration-500 animate-fade-in-up"
              style={{animationDelay: `${index * 0.1}s`}}
              onClick={() => handleBlogClick(blog.id)}
            >
              {/* Blog Header */}
              <div className="flex gap-4 mb-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-emerald-500/20 hover-glow">
                  <img 
                    src={blog.image || '/DDA_logo.png'} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className={`font-bold text-lg mb-2 line-clamp-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    {blog.title}
                  </h2>
                  <p className={`text-sm mb-3 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {blog.excerpt}
                  </p>
                  
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs">
                    <span className={`flex items-center gap-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      📅 {new Date(blog.date).toLocaleDateString('az-AZ')}
                    </span>
                    <span className={`flex items-center gap-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      👁️ {blog.viewCount.toLocaleString()} baxış
                    </span>
                  </div>
                </div>
                
                {/* Read More Arrow */}
                <div className={`self-center p-2 rounded-xl transition-all duration-300 ${
                  isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                }`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 ${
                      isDarkMode 
                        ? 'bg-gray-700/50 text-gray-300 hover:bg-emerald-500/20 hover:text-emerald-400' 
                        : 'bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredBlogs.length === 0 && (
          <Card variant="glass" className="text-center py-12 animate-fade-in-up">
            <div>
              <div className="text-6xl mb-4">📭</div>
              <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Heç bir məqalə tapılmadı
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Axtarış termini dəyişdirərək yenidən cəhd edin
              </p>
            </div>
          </Card>
        )}

      </div>
    </div>
  );
}

