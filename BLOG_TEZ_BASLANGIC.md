# 🚀 Blog API İnteqrasiyası - Tez Başlanğıc

## Quraşdırma və İşə Salma

### 1. Asılılıqları Yükləyin
```bash
npm install
```

### 2. Ətraф Mühit Faylını Yoxlayın
`.env` faylı artıq yaradılıb və konfiqurasiya edilib:
```env
VITE_API_BASE_URL=http://manager.test-domain.co/az/api
VITE_USE_MOCK_BLOG_API=false
```

### 3. Tətbiqi İşə Salın

#### Development rejimi (test üçün)
```bash
npm run dev
```

#### Production build
```bash
npm run build
npm run preview
```

## Bloq Bölməsi

Tətbiqdə blog bölməsinə daxil olduqda:
1. ✅ Server-dən real bloglar yüklənir
2. ✅ Kateqoriyalar dinamik çəkilir
3. ✅ Axtarış funksiyası aktiv
4. ✅ Filtirləmə işləyir

## Test Rejimi

Mock data ilə test etmək üçün `.env` faylında:
```env
VITE_USE_MOCK_BLOG_API=true
```

## API Endpointləri

### Aktiv Endpointlər
- ✅ `GET /blog-categories/` - Kateqoriyalar
- ✅ `GET /blogs/` - Bloglar (filtrlənmiş)
- ✅ `POST /blog-reviews/` - Rəy yaratma (hazırdır)

### Nümunə İstifadə

```typescript
import { getBlogs, getBlogCategories } from './modules/blog';

// Bütün blogları çək
const blogsResponse = await getBlogs();
if (blogsResponse.success) {
  console.log(blogsResponse.data);
}

// Kateqoriya üzrə filtirlə
const filteredBlogs = await getBlogs({ category: 'qaydalar' });

// Axtarış
const searchResults = await getBlogs({ search: 'texniki' });
```

## Faylların Strukturu

```
src/
├── modules/
│   └── blog/
│       ├── types.ts      # TypeScript tipləri
│       ├── api.ts        # API funksiyaları
│       └── index.ts      # Export
└── components/
    └── screens/
        └── BlogsScreen.tsx  # Yenilənmiş komponent
```

## İzləmə və Debug

### Console-da log-lar
Brauzer console-unda görəcəksiniz:
- API çağırışları
- Xəta mesajları
- Analitika hadisələri

### Şəbəkə Tab-ı
Browser DevTools > Network tab-da:
- `/blog-categories/` sorğuları
- `/blogs/` sorğuları
- Cavab məlumatları

## Sürətli Problemlərin Həlli

### Problemlər Bloglar yüklənmir?

**Həll 1:** Şəbəkə bağlantısını yoxlayın
```bash
curl http://manager.test-domain.co/az/api/blogs/
```

**Həll 2:** `.env` faylını yoxlayın
```bash
cat .env | grep BLOG
```

**Həll 3:** Mock rejimə keçin
`.env` faylında:
```env
VITE_USE_MOCK_BLOG_API=true
```

### Problem: Build xətaları

**Həll:**
```bash
# Cache-i təmizləyin
rm -rf node_modules dist
npm install
npm run build
```

## Xüsusiyyətlər

### ✅ Hazır Xüsusiyyətlər
- Blog siyahısı
- Kateqoriya filtirləməsi
- Axtarış
- Blog detailları
- Loading vəziyyətləri
- Xəta idarəetməsi
- Dark mode

### 🔜 Gələcək Xüsusiyyətlər
- Blog rəyləri UI
- Paylaşma düymələri
- Favoritlər
- Offline cache

## Dəstək

Problemlə qarşılaşdınız?
1. BLOG_INTEQRASIYA_XULASESI.md oxuyun
2. BLOG_API_INTEGRATION.md (İngilis dilində) oxuyun
3. Console-da xəta mesajlarını yoxlayın
4. Şəbəkə tab-ında sorğuları yoxlayın

---

## ✨ Uğurlar!

Blog API inteqrasiyası tam işləyir və istifadəyə hazırdır!
