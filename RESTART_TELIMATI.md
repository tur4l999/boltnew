# 🚨 TƏCİLİ: SERVER RESTART TƏLİMATI

## Problem

Siz deyirsiniz ki, hələ də **default bloglar** görünür (mock data).

Bu o deməkdir ki, **dev server restart edilməyib** və ya **browser cache təmizlənməyib**.

---

## ✅ HƏLL - 4 SADƏ ADDIM

### 1️⃣ Dev Server-i TAMAMILƏ Dayandırın

Terminalda işləyən `npm run dev` prosesini **mütləq** dayandırın:

```bash
Ctrl + C
```

**və ya terminalı bağlayın və yenisini açın.**

### 2️⃣ Cache-i Təmizləyin

```bash
rm -rf node_modules/.vite
rm -rf dist
```

### 3️⃣ Server-i Yenidən Başladın

```bash
npm run dev
```

**ÇAĞIRIN:** Terminal-da `npm run dev` yazmaq lazımdır!

### 4️⃣ Browser-i TAM Yeniləyin

```bash
Ctrl + Shift + R     # Windows/Linux
Cmd + Shift + R      # Mac
```

**və ya browser-i tamamilə bağlayıb yenidən açın.**

---

## 🔍 YOXLAMA - Console

Browser-də **F12** basın → **Console** tab

### Görməlisiniz:

```
============================================================
🚀 BLOG API KONFIQURASIYA
============================================================
API_BASE_URL: /api
USE_MOCK_API: false
env.VITE_USE_MOCK_BLOG_API: false
env.VITE_API_BASE_URL: /api
============================================================
✅ REAL API MODE - Serverdən məlumatlar çəkiləcək
✅ Server URL: /api
============================================================
```

### ❌ Əgər görürsünüzsə:

```
⚠️ DIQQƏT: MOCK MODE AKTIV - DEFAULT BLOGLAR GÖRÜNÜR!
```

**Bu o deməkdir ki:**
- Server restart edilməyib
- və ya .env faylı oxunmayıb

---

## 🔴 ƏSAS PROBLEM

**Environment variables (VITE_USE_MOCK_BLOG_API) yalnız server başlayanda oxunur!**

Ona görə **mütləq**:
1. Server dayandırın (`Ctrl+C`)
2. Server başladın (`npm run dev`)
3. Browser cache təmizləyin (`Ctrl+Shift+R`)

---

## 📊 REAL SERVERDƏN GƏLƏN BLOGLAR

Console-da görməlisiniz:

```javascript
[Blog API] Fetching blogs from: /api/blogs/
[Blog API] Blogs response status: 200
[Blog API] Blogs data: {
  count: 4,
  results: [
    {
      id: "6d339fa3-de8f-48a7-8ce3-6f28552ffedb",
      title: "Asdadadsdas",          ← Real server
      ...
    },
    {
      title: "Şüşələrinin tündləşdirilməsi",  ← Real server
      ...
    }
  ]
}
```

**ƏN VACIB:** `count: 4` olmalıdır (real serverdə 4 blog var)

---

## 🚫 DEFAULT BLOGLAR (Bunlar görünməməlidir)

Əgər hələ də bu blogları görürsünüzsə, **server restart edilməyib**:

- ❌ "Yol hərəkəti qaydalarında edilən son dəyişikliklər"
- ❌ "İmtahana hazırlıq üçün 5 effektiv üsul"
- ❌ "Sürücülər üçün qış mövsümünə hazırlaşma tövsiyələri"

Bu 3 blog **mock data**-dır və görünməməlidir!

---

## ✅ REAL BLOGLAR (Bunlar görünməlidir)

Serverdən gələn real bloglar:

- ✅ "Asdadadsdas"
- ✅ "Şüşələrinin tündləşdirilməsi"
- ✅ "Texniki baxış"
- ✅ və s. (cəmi 4 blog)

---

## 🔧 TAM RESTART

Əgər hələ də işləmirsə:

```bash
# 1. Terminal-da dev server-i dayandırın
Ctrl+C

# 2. Cache təmizləyin
rm -rf node_modules/.vite
rm -rf dist

# 3. node_modules-u yenidən quraşdırın (lazım olsa)
npm install

# 4. Yenidən başladın
npm run dev

# 5. Browser-i TAM yeniləyin
Ctrl+Shift+R

# 6. və ya browser-i bağlayıb yenidən açın
```

---

## 📱 Network Tab Yoxlama

Browser-də **F12** → **Network** tab:

Görməlisiniz:
```
GET /api/blogs/              Status: 200 ✅
GET /api/blog-categories/    Status: 200 ✅
```

Response Preview-də:
```json
{
  "count": 4,  ← Real serverdə 4 blog var
  "results": [...]
}
```

---

## ⚠️ ÇOX VACİB!

1. **Server mütləq restart olmalıdır** - `npm run dev`
2. **Browser cache təmizlənməlidir** - `Ctrl+Shift+R`
3. **Console-da yoxlayın** - `USE_MOCK_API: false` görməlisiniz
4. **Network-də yoxlayın** - `/api/blogs/` Status: 200 ✅

---

**İNDİ DEV SERVER-İ RESTART EDİN VƏ BROWSER CACHE TƏMİZLƏYİN!** 🚀

Bu addımları etdikdən sonra mütləq real bloglar görünəcək! ✅
