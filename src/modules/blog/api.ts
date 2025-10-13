/**
 * Blog API Layer
 * Handles blog categories, blogs, and reviews
 */

import type {
  Blog,
  BlogCategory,
  BlogReview,
  BlogReviewCreateRequest,
  ApiResponse,
  PaginatedResponse,
  BlogListParams,
} from './types';

// Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://manager.test-domain.co/az/api';
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_BLOG_API === 'true';

// Debug logging
console.log('='.repeat(60));
console.log('🚀 BLOG API KONFIQURASIYA');
console.log('='.repeat(60));
console.log('API_BASE_URL:', API_BASE_URL);
console.log('USE_MOCK_API:', USE_MOCK_API);
console.log('env.VITE_USE_MOCK_BLOG_API:', import.meta.env.VITE_USE_MOCK_BLOG_API);
console.log('env.VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
console.log('='.repeat(60));
if (USE_MOCK_API) {
  console.warn('⚠️ DIQQƏT: MOCK MODE AKTIV - DEFAULT BLOGLAR GÖRÜNÜR!');
  console.warn('Real bloglar üçün: VITE_USE_MOCK_BLOG_API=false olmalıdır');
} else {
  console.log('✅ REAL API MODE - Serverdən məlumatlar çəkiləcək');
  console.log('✅ Server URL:', API_BASE_URL);
}
console.log('='.repeat(60));

/**
 * Mock data for development
 */
const MOCK_CATEGORIES: BlogCategory[] = [
  {
    id: '1',
    name: 'Qaydalar',
    slug: 'rules',
    blog_count: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'İmtahan',
    slug: 'exam',
    blog_count: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Təhlükəsizlik',
    slug: 'safety',
    blog_count: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const MOCK_BLOGS: Blog[] = [
  {
    id: 'b1',
    slug: 'yol-hereketi-qaydalarinda-deyisiklikler',
    title: 'Yol hərəkəti qaydalarında edilən son dəyişikliklər',
    cover_image: '/image.png',
    small_description: 'Yeni qaydalar və sürücülərin bilməli olduğu vacib nüanslar haqda ətraflı məlumat.',
    description: `2025-ci ildə yol hərəkəti qaydalarında vacib dəyişikliklər edilmişdir. Bu dəyişikliklər sürücülərin təhlükəsizliyini artırmaq və müasir standartlara uyğunlaşmaq məqsədi ilə həyata keçirilmişdir.

**Əsas dəyişikliklər:**

1. **Sürət limitləri** - Şəhər daxilində maksimum sürət 50 km/s-dan 60 km/s-a qaldırılmışdır.

2. **Telefon istifadəsi** - Sürmə zamanı əl ilə telefon istifadəsinə görə cərimə məbləği artırılmışdır.

3. **Təhlükəsizlik kəmərləri** - Arxa oturacaqda da təhlükəsizlik kəməri taxmaq məcburi edilmişdir.

4. **Elektromobillər** - Elektromobillər üçün xüsusi parking yerləri ayrılmışdır və onların pozulmasına görə ciddi cərimələr tətbiq edilir.

Bu qaydalar artıq qüvvədədir və bütün sürücülər onlara riayət etməlidirlər.`,
    meta_title: 'Yol hərəkəti qaydalarında dəyişikliklər 2025',
    meta_description: 'Yeni yol hərəkəti qaydaları və sürücülərin bilməli olduğu dəyişikliklər',
    category: MOCK_CATEGORIES[0],
    review_count: 12,
    created_at: '2025-01-15T10:00:00Z',
    updated_at: '2025-01-15T10:00:00Z',
  },
  {
    id: 'b2',
    slug: 'imtahana-hazirliq-usullari',
    title: 'İmtahana hazırlıq üçün 5 effektiv üsul',
    cover_image: '/image copy.png',
    small_description: 'Qısa müddətdə daha səmərəli hazırlıq aparmağın yolları və məşq üsulları.',
    description: `Sürücülük imtahanına hazırlıq çətin proses ola bilər, lakin doğru üsullarla bu prosesi asanlaşdırmaq mümkündür.

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
İmtahan stresini azaltmaq üçün dərin nəfəs alma texnikalarını öyrənin.`,
    meta_title: 'İmtahana effektiv hazırlıq üsulları',
    meta_description: 'Sürücülük imtahanına necə hazırlaşmaq lazımdır',
    category: MOCK_CATEGORIES[1],
    review_count: 8,
    created_at: '2025-01-05T09:00:00Z',
    updated_at: '2025-01-05T09:00:00Z',
  },
  {
    id: 'b3',
    slug: 'qis-movsumune-hazirliq',
    title: 'Sürücülər üçün qış mövsümünə hazırlaşma tövsiyələri',
    cover_image: '/DDA_logo.png',
    small_description: 'Avtomobilin texniki baxışı, təkərlər və təhlükəsizlik qaydaları haqqında məlumat.',
    description: `Qış mövsümü sürücülər üçün xüsusi hazırlıq tələb edir. Təhlükəsiz sürmə üçün avtomobilinizi və özünüzü bu mövsümə hazırlayın.

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
- Kəskin manevrlərdən çəkinin`,
    meta_title: 'Qış mövsümünə hazırlıq tövsiyələri',
    meta_description: 'Qışda avtomobil sürmək üçün nə bilmək lazımdır',
    category: MOCK_CATEGORIES[2],
    review_count: 5,
    created_at: '2024-12-20T08:00:00Z',
    updated_at: '2024-12-20T08:00:00Z',
  },
];

/**
 * Get all blog categories
 * GET /blog-categories/
 */
export async function getBlogCategories(): Promise<ApiResponse<BlogCategory[]>> {
  if (USE_MOCK_API) {
    console.log('[Blog API] Using MOCK data for categories');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: MOCK_CATEGORIES,
        });
      }, 500);
    });
  }

  console.log('[Blog API] Fetching categories from:', `${API_BASE_URL}/blog-categories/`);
  
  try {
    const response = await fetch(`${API_BASE_URL}/blog-categories/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    console.log('[Blog API] Categories response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[Blog API] Categories data:', data);

    // Handle paginated response
    if (data.results) {
      return {
        success: true,
        data: data.results,
      };
    }

    return {
      success: true,
      data: Array.isArray(data) ? data : [],
    };
  } catch (error) {
    console.error('[Blog API] Failed to fetch blog categories:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch blog categories',
    };
  }
}

/**
 * Get all blogs with optional filters
 * GET /blogs/
 */
export async function getBlogs(params?: BlogListParams): Promise<ApiResponse<Blog[]>> {
  if (USE_MOCK_API) {
    console.log('[Blog API] Using MOCK data for blogs');
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredBlogs = [...MOCK_BLOGS];

        // Filter by category
        if (params?.category) {
          filteredBlogs = filteredBlogs.filter(blog => blog.category.slug === params.category);
        }

        // Filter by search
        if (params?.search) {
          const searchLower = params.search.toLowerCase();
          filteredBlogs = filteredBlogs.filter(blog =>
            blog.title.toLowerCase().includes(searchLower) ||
            blog.small_description.toLowerCase().includes(searchLower) ||
            blog.description.toLowerCase().includes(searchLower)
          );
        }

        // Sort by ordering
        if (params?.ordering) {
          if (params.ordering === '-created_at') {
            filteredBlogs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          } else if (params.ordering === 'created_at') {
            filteredBlogs.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
          }
        }

        resolve({
          success: true,
          data: filteredBlogs,
        });
      }, 800);
    });
  }

  try {
    // Build query parameters
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.ordering) queryParams.append('ordering', params.ordering);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());

    const url = `${API_BASE_URL}/blogs/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    console.log('[Blog API] Fetching blogs from:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    console.log('[Blog API] Blogs response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[Blog API] Blogs data:', data);

    // Handle both paginated and non-paginated responses
    if (Array.isArray(data)) {
      return {
        success: true,
        data,
      };
    } else if (data.results) {
      return {
        success: true,
        data: data.results,
      };
    } else {
      return {
        success: true,
        data: [],
      };
    }
  } catch (error) {
    console.error('[Blog API] Failed to fetch blogs:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch blogs',
    };
  }
}

/**
 * Get a single blog by ID
 * GET /blogs/{id}/
 */
export async function getBlogById(id: string): Promise<ApiResponse<Blog>> {
  if (USE_MOCK_API) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const blog = MOCK_BLOGS.find(b => b.id === id);
        if (blog) {
          resolve({
            success: true,
            data: blog,
          });
        } else {
          resolve({
            success: false,
            error: 'Blog not found',
          });
        }
      }, 500);
    });
  }

  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Failed to fetch blog:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch blog',
    };
  }
}

/**
 * Create a blog review
 * POST /blog-reviews/
 */
export async function createBlogReview(
  review: BlogReviewCreateRequest
): Promise<ApiResponse<BlogReview>> {
  if (USE_MOCK_API) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockReview: BlogReview = {
          id: `review-${Date.now()}`,
          user_detail: {
            id: `user-${Date.now()}`,
            email: review.user_detail.email,
            username: review.user_detail.username,
            first_name: review.user_detail.first_name,
            last_name: review.user_detail.last_name,
            father_name: review.user_detail.father_name,
            is_email_verified: review.user_detail.is_email_verified,
            profile: review.user_detail.profile,
          },
          blog: review.blog,
          message: review.message,
          is_approved: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        resolve({
          success: true,
          data: mockReview,
          message: 'Review submitted successfully',
        });
      }, 1000);
    });
  }

  try {
    const response = await fetch(`${API_BASE_URL}/blog-reviews/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      success: true,
      data,
      message: 'Review submitted successfully',
    };
  } catch (error) {
    console.error('Failed to create blog review:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create blog review',
    };
  }
}

/**
 * Log analytics event for blogs
 */
export async function logBlogEvent(
  blogId: string,
  event: 'view' | 'share' | 'like' | 'comment',
  metadata?: Record<string, any>
): Promise<void> {
  if (USE_MOCK_API) {
    console.log('[Mock API] Blog Event:', { blogId, event, metadata });
    return;
  }

  try {
    await fetch(`${API_BASE_URL}/blog-analytics/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        blogId,
        event,
        timestamp: new Date().toISOString(),
        metadata,
      }),
    });
  } catch (error) {
    console.error('Failed to log blog event:', error);
  }
}
