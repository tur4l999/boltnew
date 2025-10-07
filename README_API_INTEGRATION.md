# 📚 Məktəb Mövzuları API İnteqrasiyası - Qısa Təlimat

Bu fayl sizə API-nin necə istifadə olunacağını qısa şəkildə izah edir.

## 🚀 Sürətli Başlanğıc

### 1️⃣ Environment Konfiqurasiyası

`.env` faylı yaradın (`.env.example`-dan kopyalayın):

```bash
cp .env.example .env
```

`.env` faylında API URL-inizi təyin edin:

```bash
VITE_API_BASE_URL=https://your-api-server.com
```

### 2️⃣ API Token Konfiqurasiyası

Login zamanı token-i saxlayın:

```typescript
// Login success olduqda
localStorage.setItem('auth_token', response.token);
```

### 3️⃣ Tətbiqi İşə Salın

```bash
npm install
npm run dev
```

## 📱 İstifadə

Tətbiq avtomatik olaraq:
- ✅ API-dan mövzuları çəkir
- ✅ Cache mexanizmi ilə performansı artırır
- ✅ Error handling ilə xətaları idarə edir
- ✅ Loading state göstərir

## 🔧 API URL Dəyişdirmək

`.env` faylında URL-i dəyişdirin və serveri yenidən başladın:

```bash
VITE_API_BASE_URL=https://new-api-url.com
```

## 📖 Ətraflı Məlumat

Daha ətraflı məlumat üçün `API_INTEGRATION_GUIDE.md` faylına baxın.

## 🔒 Təhlükəsizlik

- Token localStorage-da saxlanılır və avtomatik API-ya göndərilir
- HTTPS istifadə edin
- Token-i heç vaxt kodda hardcode etməyin

## 🆘 Problem Yaşayırsınız?

1. Console-da error yoxlayın
2. `.env` faylının düzgün olduğunu yoxlayın
3. API server-inin işləkdiyini yoxlayın
4. `API_INTEGRATION_GUIDE.md`-də troubleshooting bölməsinə baxın

## ✨ Xüsusiyyətlər

- 🌐 API inteqrasiyası
- 💾 Cache mexanizmi (30 dəqiqə)
- 🔄 Auto-refresh
- ⚡ Loading states
- ❌ Error handling
- 🔒 Secure authentication
- 📊 Progress tracking
- 🎯 Demo subjects support
- 🔗 Hierarchical structure support

---

**Hazırlaşdırma tarixi:** 2025-10-04  
**Versiya:** 1.0.0
