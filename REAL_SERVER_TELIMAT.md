# 🚀 REAL SERVERDƏN MƏLUMAT ÇƏKMƏK

## ✅ KONFİQURASİYA EDİLDİ!

İndi tətbiq **real serverdən** məlumat çəkəcək!

---

## 🔧 NƏ DEYİŞDİRDİM?

### 1. `.env` Faylı Yeniləndi
```env
VITE_API_BASE_URL=/api              # Proxy istifadə edir
VITE_USE_MOCK_BLOG_API=false        # Mock mode deaktiv
```

### 2. Vite Proxy (Artıq konfiqurasiya edilib)
```javascript
proxy: {
  '/api': {
    target: 'http://manager.test-domain.co',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '/az/api')
  }
}
```

**Proxy necə işləyir:**
- Browser → `/api/blogs/`
- Vite Proxy → `http://manager.test-domain.co/az/api/blogs/`
- CORS problemi YOX! ✅

### 3. Debug Log-ları Əlavə Edildi
Console-da görəcəksiniz:
- API konfiqurasiyası
- Hər sorğunun URL-i
- Response status
- Məlumatlar

---

## 🚀 SERVER-İ RESTART EDİN

**ÇOX VACİBDİR:** Environment dəyişənləri yalnız server başlayanda oxunur!

```bash
# 1. Dev server-i dayandırın
Ctrl+C

# 2. Yenidən başladın
npm run dev

# 3. Browser-i tam yeniləyin
Ctrl+Shift+R  (və ya Cmd+Shift+R)
```

---

## 🔍 YOXLAMA

### 1. Console Log-larına Baxın (F12)

**Görməlisiniz:**
```javascript
[Blog API] Configuration: {
  API_BASE_URL: "/api",
  USE_MOCK_API: false,  ← Bu "false" olmalıdır!
  ...
}
```

**Sonra:**
```javascript
[Blog API] Fetching categories from: /api/blog-categories/
[Blog API] Categories response status: 200
[Blog API] Categories data: { count: 2, results: [...] }
```

```javascript
[Blog API] Fetching blogs from: /api/blogs/
[Blog API] Blogs response status: 200
[Blog API] Blogs data: { count: 4, results: [...] }
```

### 2. Network Tab-ında Yoxlayın

F12 → **Network** tab:
- `/api/blog-categories/` - Status: 200 ✅
- `/api/blogs/` - Status: 200 ✅

---

## 🎉 NƏTİCƏ

İndi blog səhifəsində **real serverdən** gələn bloglar görünəcək:

Real server-dən:
- ✅ 2 kateqoriya (Texniki baxış, Qaydalar)
- ✅ 4 blog yazısı
- ✅ Real şəkillər
- ✅ Real məlumatlar

---

## ⚠️ PROBLEMLƏR

### Problem 1: "Failed to fetch"

**Səbəb:** Server işləmir və ya Vite restart edilməyib

**Həll:**
```bash
# Server-i mütləq restart edin
Ctrl+C
npm run dev
```

### Problem 2: Console-da USE_MOCK_API: true

**Səbəb:** `.env` dəyişikliyi oxunmayıb

**Həll:**
```bash
# Cache təmizləyin
rm -rf node_modules/.vite
npm run dev
```

### Problem 3: CORS xətası

**Səbəb:** Proxy işləmir

**Həll:**
```bash
# vite.config.ts-də proxy konfiqurasiyasını yoxlayın
cat vite.config.ts | grep -A 7 "proxy:"
```

### Problem 4: Network-də 404 və ya 500

**Səbəb:** Backend server işləmir

**Həll:**
```bash
# Terminal-da test edin:
curl http://manager.test-domain.co/az/api/blogs/
```

---

## 📊 Debug Məlumatları

### Bütün Log-ları Görmək Üçün

Console-da (F12) filter edin:
```
[Blog API]
```

Görəcəksiniz:
1. ✅ Configuration
2. ✅ Fetching categories from...
3. ✅ Categories response status: 200
4. ✅ Categories data: {...}
5. ✅ Fetching blogs from...
6. ✅ Blogs response status: 200
7. ✅ Blogs data: {...}

---

## 🔄 Mock Mode-a Qayıtmaq

Əgər yenidən mock data istəyirsinizsə:

`.env` faylında:
```env
VITE_USE_MOCK_BLOG_API=true
```

Və restart edin:
```bash
npm run dev
```

---

## ✅ XÜLASƏ

1. ✅ `.env` faylı yeniləndi (USE_MOCK_API=false)
2. ✅ Proxy konfiqurasiya edilib (CORS yox)
3. ✅ Debug log-ları əlavə edilib
4. ✅ Server restart lazımdır: **`npm run dev`**

**Server-i restart edin və real məlumatlar görünəcək!** 🎉

---

## 📞 Yardım

Əgər problem varsa, Console screenshot-u göndərin:
1. F12 → Console tab
2. Filter: `[Blog API]`
3. Screenshot çəkin

Bu məlumatlar problemin tapılmasına kömək edəcək.

---

**İndi server-i restart edin və real blogları görün!** 🚀
