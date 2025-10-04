# 🚀 StackBlitz Quraşdırma Təlimatı

Bu layihə StackBlitz-də işləməyə tam hazırdır. API məlumatlarını konfiqurasiya etmək üçün aşağıdakı addımları izləyin.

## 📋 Quraşdırma Addımları

### 1️⃣ Layihəni Açın

StackBlitz-də layihə avtomatik olaraq açılacaq və dependency-lər quraşdırılacaq.

### 2️⃣ Environment Variables Konfiqurasiyası

StackBlitz-də environment variables əlavə etmək üçün:

1. **StackBlitz Terminal-da** aşağıdakı əmrləri icra edin:

```bash
# .env faylı yaradın (StackBlitz-də)
cat > .env << 'EOF'
VITE_API_BASE_URL=http://manager.test-domain.co
VITE_API_LANG=az
VITE_API_SUBJECTS_ENDPOINT=/api/schools/subjects/
VITE_API_AUTH_TYPE=Basic
VITE_API_AUTH_TOKEN=dHVyYWxxYXJheWV2OTlAZ21haWwuY29tOnR1cmFsMTIzISE=
VITE_API_CSRF_TOKEN=SwNfufsB411VAKAtIX7ubrN9fjQBxtWiMv5QNDEgCFzEdBXQlOKocucpWjD8V3ED
VITE_API_TIMEOUT=15000
VITE_CACHE_DURATION=1800000
VITE_DEBUG=false
EOF
```

2. **Və ya** Manual olaraq `.env` faylı yaradıb yuxarıdakı məlumatları əlavə edin.

### 3️⃣ Serveri Yenidən Başladın

Environment variables dəyişiklikləri tətbiq olunması üçün dev server-i yenidən başladın:

```bash
# Ctrl+C ilə serveri dayandırın, sonra yenidən başladın:
npm run dev
```

## 🌐 API CORS Problemi

StackBlitz-də API sorğuları zamanı CORS problemi yaşaya bilərsiniz. Bunu həll etmək üçün:

### Həll 1: Backend-də CORS Açın

Server tərəfdə CORS header-ləri əlavə edin:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, X-CSRFToken
```

### Həll 2: CORS Proxy İstifadə Edin

Geçici olaraq CORS proxy istifadə edə bilərsiniz:

```bash
# .env faylında URL-i dəyişin:
VITE_API_BASE_URL=https://cors-anywhere.herokuapp.com/http://manager.test-domain.co
```

**Qeyd:** Bu yalnız development üçündür, production-da istifadə etməyin!

### Həll 3: Demo Mode

CORS problemi varsa, tətbiq avtomatik olaraq demo mode-a keçir və static data göstərir.

## ✅ Yoxlama

Hər şey düzgün işləyirsə:

1. ✅ Tətbiq açılmalıdır
2. ✅ TopicsScreen-də mövzular göstərilməlidir (API-dan və ya fallback)
3. ✅ LessonScreen-də videolar oynanmalıdır
4. ✅ Loading və error states işləməlidir

## 🔍 Debug

Problem yaşayırsınızsa:

### Console-da Yoxlayın

Browser Console-u açın (F12) və axtarın:

```
API xətası: ...
Mövzular yüklənmədi: ...
```

### Network Tab-da Yoxlayın

Network tab-da API sorğularına baxın:
- Status: 200 OK olmalıdır
- Response: JSON data olmalıdır

### Environment Variables Yoxlayın

Terminal-da yoxlayın:

```bash
echo $VITE_API_BASE_URL
```

Əgər boşdursa, `.env` faylı düzgün yaradılmayıb.

## 📱 StackBlitz-də Mobil Görünüş

StackBlitz-də mobil görünüşü test etmək üçün:

1. Browser DevTools açın (F12)
2. Device Toolbar-ı açın (Ctrl+Shift+M)
3. iPhone və ya Android cihaz seçin

## 🚨 Məlum Problemlər

### Problem 1: Environment Variables İşləmir

**Həll:** Server-i yenidən başladın və browser cache-i təmizləyin.

### Problem 2: API Sorğuları Çalışmır

**Həll:** CORS problemi ola bilər. Yuxarıdakı həllərə baxın.

### Problem 3: Videolar Oynanmır

**Həll:** Video URL-lərin düzgün olduğunu yoxlayın və browser video formatını dəstəkləyir.

## 📞 Kömək Lazımdır?

- `API_INTEGRATION_GUIDE.md` - Ətraflı API təlimatı
- `README_API_INTEGRATION.md` - Qısa başlanğıc
- GitHub Issues

## 🎉 Hazırsınız!

Artıq StackBlitz-də tətbiqi test edə bilərsiniz. Uğurlar! 🚀
