# DDA.az Secure PDF Reader

Təhlükəsiz PDF oxuyucu mobil tətbiqi - React Native + Expo ilə hazırlanmış.

## 🔒 Təhlükəsizlik Xüsusiyyətləri

### Server-side Təhlükəsizlik
- **Watermarked PDF-lər**: Hər səhifədə görünən diagonal vatermark
- **Signed URL-lər**: Qısa müddətli (10-30 dəq) imzalı linklər
- **Fayl Bütövlüyü**: SHA256 checksum yoxlaması
- **Sessiya İdarəçiliyi**: Avtomatik vaxt bitməsi və ləğv etmə

### Client-side Təhlükəsizlik
- **Screenshot Qorunması**: `expo-screen-capture` ilə aşkarlama və qarşısını alma
- **Screen Recording Qorunması**: Ekran yazısı aşkarlaması və sessiya ləğvi
- **Dynamic Watermark**: SVG overlay ilə canlı vatermark
- **Background Blur**: App background-a keçəndə məzmunu gizlətmə
- **Root/Jailbreak Detection**: Təhlükəsiz olmayan cihazlarda bloklanma
- **File Integrity**: Fayl korlanması yoxlaması və avtomatik silinmə

## 📱 Xüsusiyyətlər

### PDF Oxuma
- **Səhifə-səhifə oxuma**: Smooth scroll və navigation
- **Zoom**: Pinch-to-zoom və double-tap (0.5x - 3.0x)
- **Page Navigation**: Thumbnail sidebar və page picker
- **Search**: Mətn axtarışı (local və ya server-side)
- **Dark Mode**: Sistem rejimi dəstəyi

### İstifadəçi İnterfeysi
- **Modern UI**: Clean və responsive dizayn
- **Localization**: AZ/EN dil dəstəyi
- **Accessibility**: Screen reader və keyboard navigation
- **Performance**: Virtualized lists və memoization

## 🛠 Quraşdırma

### Tələblər
- Node.js 18+
- Expo CLI
- React Native development environment
- iOS Simulator və ya Android Emulator

### Addımlar

1. **Repository klonlayın**
```bash
git clone <repository-url>
cd dda-secure-pdf-reader
```

2. **Dependencies quraşdırın**
```bash
npm install
```

3. **Environment variables**
```bash
cp .env.example .env
# .env faylını redaktə edin
```

4. **Development server başladın**
```bash
npm start
```

5. **Platform seçin**
```bash
# iOS
npm run ios

# Android
npm run android

# Web (development only)
npm run web
```

## 🏗 Layihə Strukturu

```
src/
├── modules/pdf/
│   ├── api.ts              # API layer
│   ├── PdfReader.tsx       # Əsas PDF oxuyucu
│   ├── Watermark.tsx       # SVG watermark komponenti
│   ├── usePdfStore.ts      # Zustand store
│   ├── guards.ts           # Təhlükəsizlik yoxlamaları
│   ├── utils.ts            # Utility funksiyalar
│   └── types.ts            # TypeScript tiplər
├── components/
│   ├── BlurOverlay.tsx     # Blur overlay komponenti
│   ├── PageThumbs.tsx      # Səhifə thumbnail-ları
│   ├── PagePicker.tsx      # Səhifə seçici modal
│   └── SearchBar.tsx       # Axtarış komponenti
└── styles/
    └── tokens.ts           # Dizayn tokenləri və lokalizasiya
```

## 🔧 Konfiqurasiya

### Environment Variables

```bash
# API Configuration
EXPO_PUBLIC_API_URL=https://api.dda.az
EXPO_PUBLIC_API_TOKEN=your_api_token_here
EXPO_PUBLIC_USE_MOCK_API=true

# Security Configuration
EXPO_PUBLIC_ENABLE_ROOT_DETECTION=true
EXPO_PUBLIC_ENABLE_SCREENSHOT_PROTECTION=true
EXPO_PUBLIC_SESSION_TIMEOUT_MINUTES=30
```

### EAS Build Configuration

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
```

## 📡 API Endpoints

### PDF Issue
```
POST /api/pdf/issue
Body: { bookId, userId, deviceId }
Response: { url, checksumSha256, expiresAt, totalPages }
```

### Session Revoke
```
POST /api/pdf/revoke
Body: { bookId, userId, deviceId, reason }
Response: { ok: true }
```

### Search (Optional)
```
GET /api/pdf/search?bookId=&q=&from=&to=
Response: [{ page: number, snippet: string }]
```

## 🧪 Test Ssenariləri

### Təhlükəsizlik Testləri
- [ ] Screenshot cəhdi → blur + warning + session revoke
- [ ] Screen recording cəhdi → blur + warning + session revoke
- [ ] App background → blur overlay
- [ ] Session expiry → automatic logout
- [ ] File corruption → automatic deletion + reload
- [ ] Root/jailbreak detection → access blocked

### Funksionallıq Testləri
- [ ] PDF yükləmə və göstərmə
- [ ] Səhifə naviqasiyası (thumbnails, picker, swipe)
- [ ] Zoom və pan əməliyyatları
- [ ] Axtarış funksionallığı
- [ ] Dark/light mode keçidi
- [ ] Localization (AZ/EN)

## 🚀 Production Deployment

### EAS Build
```bash
# Android
eas build --platform android --profile production

# iOS
eas build --platform ios --profile production
```

### Environment Setup
1. Production API endpoints konfiqurasiyası
2. SSL sertifikatları
3. Code signing (iOS)
4. Play Store/App Store metadata

## 🔍 Debugging

### Development Tools
- Flipper integration
- React Native Debugger
- Expo Dev Tools

### Logging
```typescript
// Security events
store.logSecurityEvent({
  type: 'screenshot',
  timestamp: new Date().toISOString(),
});

// Error tracking
console.error('PDF load error:', error);
```

## 📋 Known Limitations

### iOS
- Tam screenshot bloklanması mümkün deyil
- Background app switcher görüntüsü blur edilir
- Screen recording detection mövcuddur

### Android
- FLAG_SECURE istifadə edilir (uyğun cihazlarda)
- Root detection məhdud funksionallıq
- Custom ROM-larda fərqli davranış

## 🤝 Contributing

1. Fork repository
2. Feature branch yaradın (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 License

Bu layihə müəllif hüquqları ilə qorunur. DDA.az şirkətinin icazəsi olmadan istifadə edilə bilməz.

## 📞 Dəstək

- Email: support@dda.az
- Telefon: +994 XX XXX XX XX
- Website: https://dda.az

---

**Qeyd**: Bu demo versiyasıdır. Production istifadəsi üçün real API endpoints və təhlükəsizlik sertifikatları tələb olunur.