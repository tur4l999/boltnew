# Secure PDF Reader Module - DDA.az

Təhlükəsiz PDF oxuyucu sistemi - 2 ödənişli kitab üçün maksimum məzmun qoruması

## 🎯 Məqsəd

Bu modul DDA.az mobil tətbiqinə premium kitabların təhlükəsiz oxunması üçün nəzərdə tutulub. Əsas məqsədlər:

- **Məzmun sızması qarşısının alınması**: Çoxqatlı təhlükəsizlik mexanizmləri
- **Fərdi identifikasiya**: Hər səhifədə dinamik vatermark
- **İstifadəçi təcrübəsi**: Sürətli naviqasiya, axtarış, səhifə seçimi
- **Monitorinq**: Təhlükəsizlik pozuntularının aşkarlanması və qaydaya alınması

## 🏗️ Arxitektura

```
src/modules/pdf/
├── PdfReader.tsx           # Əsas oxuyucu komponenti
├── Watermark.tsx           # SVG vatermark overlay
├── api.ts                  # API layer (issue, revoke, search)
├── usePdfStore.ts          # Zustand state idarəetməsi
├── guards.ts               # Təhlükəsizlik qoruyucuları
├── utils.ts                # Utility funksiyalar
├── types.ts                # TypeScript type tərifləri
├── i18n.ts                 # AZ/EN lokalizasiya
├── index.ts                # Export barrel
└── components/
    ├── BlurOverlay.tsx     # Blur ekranı (background/security)
    ├── PagePicker.tsx      # Səhifə seçimi modal
    ├── SearchBar.tsx       # Axtarış interfeysi
    └── PageThumbs.tsx      # Səhifə thumbnail sidebar
```

## 📦 Tələblər

### Web (Hazırki implementasiya)

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "zustand": "^4.x.x"
  }
}
```

### React Native + Expo (Tövsiyyə olunan)

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-native": "^0.7x",
    "expo": "~50.x",
    "expo-screen-capture": "~6.x",
    "expo-file-system": "~16.x",
    "expo-crypto": "~13.x",
    "react-native-pdf": "^6.x",
    "react-native-svg": "^14.x",
    "zustand": "^4.x",
    "axios": "^1.x"
  },
  "devDependencies": {
    "react-native-jailbreak-detection": "^1.x" // Optional
  }
}
```

## 🚀 Quraşdırma

### 1. Paketlərin yüklənməsi

```bash
# Web üçün
npm install zustand

# React Native üçün
npm install zustand axios
npx expo install expo-screen-capture expo-file-system expo-crypto react-native-svg
npm install react-native-pdf
```

### 2. Modulun əlavə edilməsi

Layihəyə `src/modules/pdf/` qovluğunu əlavə edin (artıq hazırdır).

### 3. İstifadə

```tsx
import { PdfReader } from '@/modules/pdf';

function MyScreen() {
  return (
    <PdfReader
      bookId="book-01"
      userId="user_123"
      userName="Əli Məmmədov"
      userPhone="+994501234567"
      userEmail="ali@example.com"
      language="az"
      onExit={() => navigation.goBack()}
      showCopyrightNotice={true}
    />
  );
}
```

## 🔒 Təhlükəsizlik Xüsusiyyətləri

### 1. Server-side Watermarking

**Backend endpoint (implement edin):**

```typescript
// POST /api/pdf/issue
interface IssueRequest {
  bookId: string;
  userId: string;
  deviceId: string;
  userName: string;
  userPhone: string;
  userEmail: string;
}

interface IssueResponse {
  url: string;              // S3/Cloud Storage signed URL
  checksumSha256: string;   // Fayl integrity
  expiresAt: string;        // ISO timestamp (10-30 dəq)
  totalPages: number;
  bookTitle: string;
}
```

**Server-də edilməli:**
- PDF-ə hər səhifəyə vatermark əlavə et (pdf-lib, Ghostscript)
- Görünən diagonal text: `DDA.az | {name} | {phone} | {userId}/{deviceId} | {timestamp} | Page {n}`
- Invisible text layer kimi UID yerləşdir
- Extract/copy disabled PDF yarad
- Qısa müddətli signed URL (10-30 dəq)
- SHA256 checksum hesabla

### 2. Client-side Overlay

- SVG diagonal repeating pattern
- 10-15% opacity
- Hər 60 saniyədə timestamp yenilə (canlı görünüş)
- Zoom/scroll ilə uyğunlaşma

### 3. Screenshot/Recording Qarşısı

**Web:**
- PrintScreen key detection
- Visibility change monitoring
- Right-click (context menu) qarşısı
- User-select: none CSS

**React Native:**
```typescript
import * as ScreenCapture from 'expo-screen-capture';

// Prevent screenshots
await ScreenCapture.preventScreenCaptureAsync();

// Listen for screenshot events
const subscription = ScreenCapture.addScreenshotListener(() => {
  // Revoke session, show warning
  handleSecurityViolation('screenshot');
});
```

**Android:**
```typescript
// Native FLAG_SECURE implementation
// expo-screen-capture handles this automatically on Android
```

**iOS:**
- Tam qarşısı mümkün deyil
- Detection + warning + session revoke
- Blur overlay göstər

### 4. Background Protection

**React Native:**
```typescript
import { AppState } from 'react-native';

AppState.addEventListener('change', (nextState) => {
  if (nextState === 'background') {
    // Blur content for app switcher
    setShowBlur(true);
  }
});
```

### 5. Root/Jailbreak Detection

```typescript
// Optional: react-native-jailbreak-detection
import JailMonkey from 'jail-monkey';

if (JailMonkey.isJailBroken()) {
  // Block reading
  showJailbreakWarning();
}
```

### 6. File Integrity

```typescript
import * as Crypto from 'expo-crypto';

const checksum = await Crypto.digestStringAsync(
  Crypto.CryptoDigestAlgorithm.SHA256,
  fileContent
);

if (checksum !== expectedChecksum) {
  // File tampered, delete and reload
  await FileSystem.deleteAsync(fileUri);
  showIntegrityError();
}
```

## 📱 Platform Fərqləri

### iOS vs Android

| Xüsusiyyət | iOS | Android |
|-----------|-----|---------|
| Screenshot qarşısı | ❌ Detection only | ✅ FLAG_SECURE |
| Recording qarşısı | ⚠️ Detection + blur | ✅ Native block |
| Background blur | ✅ AppState | ✅ AppState |
| Jailbreak/Root detection | ✅ Available | ✅ Available |
| Copy/paste qarşısı | ✅ CSS/Native | ✅ CSS/Native |

### Web vs Mobile

| Xüsusiyyət | Web | React Native |
|-----------|-----|-------------|
| Screenshot detection | ⚠️ Limited | ✅ Native |
| File encryption | ❌ localStorage | ✅ FileSystem |
| Device fingerprint | ⚠️ Browser-based | ✅ expo-device |
| Offline cache | ⚠️ IndexedDB | ✅ Secure storage |

## 🎨 UI Komponentləri

### PdfReader (Main)

```tsx
<PdfReader
  bookId="book-01"
  userId="user_123"
  userName="Əli Məmmədov"
  userPhone="+994501234567"
  userEmail="ali@example.com"
  language="az" // 'az' | 'en'
  onExit={() => {}}
  showCopyrightNotice={true}
/>
```

### Watermark

```tsx
<AdaptiveWatermark
  config={{
    userName: "Əli Məmmədov",
    userPhone: "+994501234567",
    userId: "user_123",
    deviceId: "device_abc",
    currentPage: 5,
    totalPages: 240,
    opacity: 0.12,
    angle: 14,
    fontSize: 12,
  }}
  zoomLevel={1.5}
  refreshInterval={60000} // 60 seconds
/>
```

### PagePicker

```tsx
<PagePicker
  visible={true}
  currentPage={5}
  totalPages={240}
  onPageSelect={(page) => setPage(page)}
  onClose={() => setShowPicker(false)}
  language="az"
/>
```

### SearchBar

```tsx
<SearchBar
  visible={true}
  onSearch={(query) => performSearch(query)}
  onResultClick={(page) => goToPage(page)}
  onClose={() => setShowSearch(false)}
  results={searchResults}
  isSearching={false}
  language="az"
/>
```

## 🔧 API Endpoints

Backend-də implement edin:

### 1. Issue Secured PDF

```http
POST /api/pdf/issue
Content-Type: application/json
Authorization: Bearer {token}

{
  "bookId": "book-01",
  "userId": "user_123",
  "deviceId": "device_abc",
  "userName": "Əli Məmmədov",
  "userPhone": "+994501234567",
  "userEmail": "ali@example.com"
}

Response:
{
  "success": true,
  "data": {
    "url": "https://s3.../book-01.pdf?signature=...",
    "checksumSha256": "abc123...",
    "expiresAt": "2024-10-07T14:30:00Z",
    "totalPages": 240,
    "bookTitle": "Sürücülük Nəzəriyyəsi",
    "bookId": "book-01"
  }
}
```

### 2. Revoke Session

```http
POST /api/pdf/revoke
Content-Type: application/json

{
  "bookId": "book-01",
  "userId": "user_123",
  "deviceId": "device_abc",
  "reason": "capture", // 'capture' | 'expiry' | 'integrity' | 'user_request' | 'jailbreak'
  "metadata": {
    "timestamp": "2024-10-07T12:00:00Z"
  }
}

Response:
{
  "success": true,
  "data": { "ok": true },
  "message": "Session revoked successfully"
}
```

### 3. Search in PDF

```http
GET /api/pdf/search?bookId=book-01&q=təhlükəsizlik&from=1&to=100

Response:
{
  "success": true,
  "data": [
    {
      "page": 15,
      "snippet": "...Yol hərəkəti təhlükəsizlik qaydaları...",
      "matchCount": 2
    },
    {
      "page": 42,
      "snippet": "...təhlükəsizlik tələblərinə əməl...",
      "matchCount": 1
    }
  ]
}
```

## 🧪 Test Ssenariləri

### 1. Vatermark Testi
- [ ] Vatermark görünür və oxunaqlıdır
- [ ] Zoom ilə opacity/fontSize adaptiv dəyişir
- [ ] Hər 60 saniyədə timestamp yenilənir
- [ ] Scroll/zoom ilə birlikdə hərəkət edir

### 2. Sessiya İdarəsi
- [ ] Signed URL vaxtı bitəndə oxu bağlanır
- [ ] Yeniləmə düyməsi işləyir
- [ ] 5 dəq qalmış warning göstərilir

### 3. Integrity
- [ ] Checksum yanlış olarsa fayl silinir
- [ ] Yenidən yükləmə təklifi göstərilir

### 4. Screenshot Detection
- [ ] PrintScreen key aşkarlanır (web)
- [ ] expo-screen-capture işləyir (RN)
- [ ] Blur + warning + session revoke

### 5. Background Protection
- [ ] App background-a keçəndə blur göstərilir
- [ ] Foreground-a qayıdanda blur gizlənir

### 6. Navigation
- [ ] Səhifə seçimi (slider + input) işləyir
- [ ] Thumbnail naviqasiya problemsiz
- [ ] Axtarış nəticələri düzgün göstərilir
- [ ] Next/Previous düymələr

### 7. Jailbreak/Root
- [ ] Root/jailbreak mühitində oxu bloklanır
- [ ] İzahlı mesaj göstərilir

### 8. Lokalizasiya
- [ ] AZ/EN arası keçid
- [ ] Bütün stringlər tərcümə olunub

## 🎯 React Native Migration Addımları

Hazırki web implementasiyasını React Native-ə keçirmək üçün:

### 1. PDF Viewer

**Web (hazırki):**
```tsx
// Placeholder div
<div>Page {currentPage}</div>
```

**React Native:**
```tsx
import Pdf from 'react-native-pdf';

<Pdf
  source={{ uri: session.url }}
  page={currentPage}
  onPageChanged={(page) => setPage(page)}
  onError={(error) => setError(error)}
  enablePaging={true}
  style={{ flex: 1 }}
/>
```

### 2. Screenshot Prevention

**guards.ts-də dəyiş:**
```typescript
import * as ScreenCapture from 'expo-screen-capture';

export async function preventScreenCapture(): Promise<void> {
  await ScreenCapture.preventScreenCaptureAsync();
}

export function addScreenshotListener(callback: () => void): () => void {
  const subscription = ScreenCapture.addScreenshotListener(callback);
  return () => subscription.remove();
}
```

### 3. File System

**utils.ts-də dəyiş:**
```typescript
import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';

export async function downloadFile(url: string): Promise<string> {
  const fileUri = `${FileSystem.documentDirectory}temp.pdf`;
  
  const result = await FileSystem.downloadAsync(url, fileUri);
  return result.uri;
}

export async function sha256(fileUri: string): Promise<string> {
  const content = await FileSystem.readAsStringAsync(fileUri);
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    content
  );
}
```

### 4. Device ID

```typescript
import * as Device from 'expo-device';

export function getDeviceId(): string {
  return Device.osBuildId || Device.osInternalBuildId || 'unknown';
}
```

### 5. Background Protection

```typescript
import { AppState, AppStateStatus } from 'react-native';

export function setupBackgroundProtection(
  onBackground: () => void,
  onForeground: () => void
): () => void {
  const subscription = AppState.addEventListener('change', (state: AppStateStatus) => {
    if (state === 'background') {
      onBackground();
    } else if (state === 'active') {
      onForeground();
    }
  });
  
  return () => subscription.remove();
}
```

## 🔐 Təhlükəsizlik Best Practices

### 1. Server-side
- PDF-ə server-də watermark əlavə et (müştəri manipulasiyasına davamlı)
- Qısa müddətli signed URLs (10-30 dəq)
- User/device bazlı rate limiting
- Audit log (kim, nə vaxt, hansı səhifə)
- PDF encrypted at rest

### 2. Client-side
- Certificate pinning (HTTPS)
- Code obfuscation (ProGuard/R8 for Android)
- Root/Jailbreak detection
- Screenshot monitoring
- No export/share options
- Secure storage only

### 3. Monitoring
- Security events log
- Unusual activity detection
- Session abuse patterns
- Multiple device checks
- Geographic anomalies

## 📊 Analytics & Monitoring

Log events backend-ə göndər:

```typescript
await logPdfEvent(bookId, 'open', {
  userId,
  deviceId,
  timestamp: new Date().toISOString(),
});

await logPdfEvent(bookId, 'page_view', {
  page: currentPage,
  duration: 5000, // ms
});

await logPdfEvent(bookId, 'security_violation', {
  reason: 'screenshot',
  page: currentPage,
});

await logPdfEvent(bookId, 'close', {
  totalPages: totalPages,
  lastPage: currentPage,
  sessionDuration: 600000, // ms
});
```

## 🌍 Environment Variables

`.env` faylı:

```bash
# API Configuration
VITE_PDF_API_URL=https://api.dda.az/api
VITE_USE_MOCK_PDF_API=false

# Security
VITE_PDF_SESSION_DURATION=1800000  # 30 min in ms
VITE_SCREENSHOT_WARNING_ENABLED=true
VITE_JAILBREAK_DETECTION_ENABLED=true

# Watermark
VITE_WATERMARK_OPACITY=0.12
VITE_WATERMARK_ANGLE=14
VITE_WATERMARK_REFRESH_INTERVAL=60000  # 60 sec
```

## 🐛 Troubleshooting

### Problem: Watermark görünmür

**Həll:**
- SVG fill color-un contrast-ı yoxla
- opacity çox aşağı ola bilər (artır 0.15-ə)
- z-index-i yoxla (9999 olmalı)

### Problem: Screenshot hələ işləyir

**Həll:**
- Web-də tam qarşı mümkün deyil (detection only)
- React Native-də `expo-screen-capture` yoxla
- Android-də FLAG_SECURE enabled olmalı
- iOS-də detection + session revoke strategiya

### Problem: Session tez-tez bitir

**Həll:**
- Backend-də expiry duration artır
- Auto-renewal implement et
- Session extension endpoint əlavə et

### Problem: PDF yüklənmir

**Həll:**
- Signed URL-un expire olmadığını yoxla
- CORS headers backend-də düzgün
- Network connectivity yoxla
- Checksum validation səhvini debug et

## 📝 Hüquqi Qeyd

Bu implementasiya **hardening** strategiya istifadə edir, tam DRM deyil. Məqsəd:
- Casual piracy qarşısı
- Deterrence (çəkindirmə)
- Audit trail (iz qalması)
- Monitoring

100% qorunma mümkün deyil, lakin rəqabətli səviyyədə çəkindiricidir.

## 📞 Dəstək

Suallar üçün:
- GitHub Issues
- DDA.az development team
- Email: dev@dda.az

## 📄 License

DDA.az proprietary - internal use only

---

**Version:** 1.0.0  
**Last Updated:** 2025-10-07  
**Author:** DDA.az Development Team