# 🔧 Blog CORS Problemi və Həlli

## Problem

Browser-də aşağıdakı xəta alırsınız:
```
Xəta baş verdi
Failed to fetch
```

Bu **CORS (Cross-Origin Resource Sharing)** problemidir. Browser təhlükəsizlik səbəbilə başqa domenə sorğu göndərməyə icazə vermir.

## ✅ Həll 1: Mock Mode (Tövsiyə edilir)

Mock mode-da lokal test məlumatları istifadə olunur və CORS problemi olmur.

### Aktivləşdirmə

`.env` faylında:
```env
VITE_USE_MOCK_BLOG_API=true
```

### Restart edin
```bash
# Dev server-i dayandırın (Ctrl+C)
# Yenidən başladın
npm run dev
```

**Mock mode-da:**
- ✅ 3 nümunə blog görünür
- ✅ 3 kateqoriya mövcuddur
- ✅ Bütün funksiyalar işləyir
- ✅ CORS problemi yoxdur

## ✅ Həll 2: Vite Proxy (Real API üçün)

Real server məlumatlarından istifadə etmək üçün proxy konfiqurasiyası əlavə edilib.

### Konfigurasiya

`.env` faylında:
```env
VITE_API_BASE_URL=/api
VITE_USE_MOCK_BLOG_API=false
```

### Restart edin
```bash
npm run dev
```

**Proxy necə işləyir:**
- Browser `/api/blogs/` sorğusu göndərir
- Vite onu `http://manager.test-domain.co/az/api/blogs/` ünvanına yönləndirir
- CORS problemi olmur (eyni origin kimi görünür)

## ✅ Həll 3: CORS Headers (Server tərəfdə)

Production-da server aşağıdakı header-ləri göndərməlidir:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Accept
```

Bu server administratoru tərəfindən edilməlidir.

## 🔍 Cari Konfiqurasiya

İndi tətbiq **Mock Mode**-da işləyir:
- `.env` faylında `VITE_USE_MOCK_BLOG_API=true`
- CORS problemi yoxdur
- 3 nümunə blog görünür
- Bütün funksiyalar işləyir

## 📋 Test Etmək Üçün

1. **Server-i restart edin:**
```bash
# Əgər dev server işləyirsə, dayandırın (Ctrl+C)
npm run dev
```

2. **Browser-i yeniləyin:**
   - Səhifəni tam yeniləyin (Ctrl+Shift+R və ya Cmd+Shift+R)

3. **Konsolu yoxlayın:**
   - F12 → Console tab
   - Xəta mesajları varmı baxın

## 🎯 Real API-ya Keçmək

Real server məlumatlarından istifadə etmək üçün:

1. `.env` faylında dəyişiklik edin:
```env
VITE_API_BASE_URL=/api
VITE_USE_MOCK_BLOG_API=false
```

2. Server-i restart edin:
```bash
npm run dev
```

3. Browser-də test edin

**Qeyd:** Real API işləməsi üçün:
- Server işləməlidir
- Şəbəkə bağlantısı olmalıdır
- CORS header-ləri düzgün konfiqurasiya edilməlidir

## 🚀 Tövsiyələr

### Development üçün:
✅ Mock mode istifadə edin (`VITE_USE_MOCK_BLOG_API=true`)
- Sürətli development
- CORS problemi yoxdur
- İnternet bağlantısı lazım deyil

### Production üçün:
✅ Real API istifadə edin (`VITE_USE_MOCK_BLOG_API=false`)
- Real məlumatlar
- Server CORS header-lərini göndərməlidir
- və ya proxy/CDN istifadə edin

## 📝 Mock Məlumatlar

Mock mode-da olan nümunə bloglar:
1. **Yol hərəkəti qaydalarında edilən son dəyişikliklər**
2. **İmtahana hazırlıq üçün 5 effektiv üsul**
3. **Sürücülər üçün qış mövsümünə hazırlaşma tövsiyələri**

Kateqoriyalar:
1. Qaydalar (5 blog)
2. İmtahan (3 blog)
3. Təhlükəsizlik (4 blog)

---

## ✨ Hazır!

Server-i restart etdikdən sonra bloglar görünməlidir. Əgər hələ də problem varsa:
1. Browser cache-i təmizləyin
2. Konsol log-larına baxın
3. `.env` faylını yoxlayın
