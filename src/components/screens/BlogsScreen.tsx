import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { BlogDetailScreen } from './BlogDetailScreen';
import { getBlogs, getBlogCategories, logBlogEvent, type Blog, type BlogCategory } from '../../modules/blog';

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

const CATEGORY_EMOJIS: Record<string, string> = {
  'all': '📚',
  'rules': '⚖️',
  'qaydalar': '⚖️',
  'exam': '📝',
  'imtahan': '📝',
  'safety': '🛡️',
  'təhlükəsizlik': '🛡️',
  'tips': '💡',
  'məsləhətlər': '💡',
};

// Map API Blog to BlogItem for compatibility with existing UI
function mapBlogToItem(blog: Blog): BlogItem {
  return {
    id: blog.id,
    title: blog.title,
    excerpt: blog.small_description,
    content: blog.description,
    date: new Date(blog.created_at).toISOString().split('T')[0],
    tags: [], // We can extract from meta if needed
    image: blog.cover_image || undefined,
    viewCount: blog.review_count || 0,
    category: blog.category.slug || blog.category.id,
  };
}

export function BlogsScreen() {
  const { isDarkMode } = useApp();
  const [selectedBlog, setSelectedBlog] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  
  // API State
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([{ id: 'all', name: 'Hamısı', emoji: '📚', color: 'gray' }]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blogs and categories on mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch blogs and categories in parallel
        const [blogsResponse, categoriesResponse] = await Promise.all([
          getBlogs(),
          getBlogCategories(),
        ]);

        if (blogsResponse.success && blogsResponse.data) {
          const mappedBlogs = blogsResponse.data.map(mapBlogToItem);
          setBlogs(mappedBlogs);
        } else {
          setError(blogsResponse.error || 'Failed to load blogs');
        }

        if (categoriesResponse.success && categoriesResponse.data) {
          const mappedCategories: Category[] = [
            { id: 'all', name: 'Hamısı', emoji: '📚', color: 'gray' },
            ...categoriesResponse.data.map(cat => ({
              id: cat.slug || cat.id,
              name: cat.name,
              emoji: CATEGORY_EMOJIS[cat.slug?.toLowerCase() || ''] || '📂',
              color: 'gray',
            })),
          ];
          setCategories(mappedCategories);
        }
      } catch (err) {
        console.error('Error fetching blog data:', err);
        setError('Məlumatları yükləmək mümkün olmadı');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter blogs based on search term and category
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleBlogClick = (blogId: string) => {
    setSelectedBlog(blogId);
    // Log blog view event
    logBlogEvent(blogId, 'view');
  };

  const handleNavigateBack = () => {
    setSelectedBlog(null);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsCategoryDropdownOpen(false);
  };

  const getSelectedCategoryInfo = () => {
    return categories.find(cat => cat.id === selectedCategory) || categories[0];
  };

  const selectedBlogData = selectedBlog ? blogs.find(b => b.id === selectedBlog) : null;

  // If a blog is selected, show the detail screen
  if (selectedBlogData) {
    return (
      <BlogDetailScreen
        blog={selectedBlogData}
        allBlogs={blogs}
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

          {/* Categories Dropdown */}
          <div className="relative animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h3 className={`text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Kateqoriyalar
            </h3>
            <div className="relative">
              <button
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
                  isDarkMode 
                    ? 'bg-gray-800/50 border-gray-700 text-gray-100 hover:bg-gray-700/50' 
                    : 'bg-white/50 border-gray-200 text-gray-900 hover:bg-gray-100/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{getSelectedCategoryInfo().emoji}</span>
                  <span className="font-medium">{getSelectedCategoryInfo().name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {selectedCategory === 'all' ? blogs.length : blogs.filter(b => b.category === selectedCategory).length}
                  </span>
                </div>
                <svg 
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isCategoryDropdownOpen ? 'rotate-180' : ''
                  } ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isCategoryDropdownOpen && (
                <div className={`absolute top-full left-0 right-0 mt-2 z-30 rounded-xl border shadow-xl animate-fade-in-up ${
                  isDarkMode 
                    ? 'bg-gray-800/95 border-gray-700 backdrop-blur-xl' 
                    : 'bg-white/95 border-gray-200 backdrop-blur-xl'
                }`}>
                  <div className="p-2">
                    {categories.map((category, index) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[1.02] animate-slide-in-right ${
                          selectedCategory === category.id
                            ? isDarkMode 
                              ? 'bg-emerald-500/20 text-emerald-400' 
                              : 'bg-emerald-50 text-emerald-600'
                            : isDarkMode 
                              ? 'text-gray-300 hover:bg-gray-700/50' 
                              : 'text-gray-700 hover:bg-gray-100/50'
                        }`}
                        style={{animationDelay: `${index * 0.05}s`}}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-base">{category.emoji}</span>
                          <span>{category.name}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          selectedCategory === category.id
                            ? isDarkMode ? 'bg-emerald-400/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
                            : isDarkMode ? 'bg-gray-700/50 text-gray-400' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {category.id === 'all' ? blogs.length : blogs.filter(b => b.category === category.id).length}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Overlay to close dropdown when clicking outside */}
              {isCategoryDropdownOpen && (
                <div 
                  className="fixed inset-0 z-20" 
                  onClick={() => setIsCategoryDropdownOpen(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="p-4">
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} variant="glass" className="overflow-hidden animate-pulse">
                <div className="flex gap-4 mb-4">
                  <div className={`w-20 h-20 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
                  <div className="flex-1 space-y-3">
                    <div className={`h-4 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} w-3/4`} />
                    <div className={`h-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} w-full`} />
                    <div className={`h-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} w-2/3`} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="p-4">
          <Card variant="glass" className="text-center py-12 animate-fade-in-up">
            <div>
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Xəta baş verdi
              </h3>
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' 
                    : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                }`}
              >
                Yenidən cəhd edin
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* Blog Cards Container */}
      {!isLoading && !error && (
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
      )}
    </div>
  );
}

