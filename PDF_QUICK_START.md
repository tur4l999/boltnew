# PDF Oxuyucu - Tez Başlanğıc

## 5 dəqiqədə işə sal

### 1. Paketləri yüklə

```bash
npm install zustand
```

### 2. Demo ekranı aç

Tətbiqə əlavə et:

```tsx
// App.tsx və ya routing faylında
import { SecurePdfScreen } from './components/screens/SecurePdfScreen';

// Route əlavə et
<Route path="/pdf-demo" element={<SecurePdfScreen />} />
```

### 3. Brauzerdə aç

```bash
npm run dev
# http://localhost:5173/pdf-demo
```

### 4. Nəyi görəcəksən?

✅ 2 ödənişli kitab siyahısı  
✅ Məlumatlandırıcı qeyd  
✅ "Oxu" düyməsi  

Kitaba tıkla → PDF oxuyucu açılacaq:

- ✨ Dinamik SVG vatermark (hər 60 saniyədə yenilənir)
- 🔍 Axtarış funksiyası (mock nəticələrlə)
- 📑 Səhifə naviqasiyası (next/prev, jump to page)
- 🔒 Screenshot xəbərdarlığı (PrintScreen basanda)
- 📱 Background blur (tab dəyişdirəndə)
- 🎨 Zoom in/out
- 📚 Thumbnail sidebar

### 5. Real API ilə işlət

`.env` faylı yarat:

```bash
VITE_PDF_API_URL=https://api.dda.az/api
VITE_USE_MOCK_PDF_API=false
```

Backend endpoints implement et (bax: `PDF_READER_README.md`):

- `POST /api/pdf/issue` - Signed URL al
- `POST /api/pdf/revoke` - Sessiyanı ləğv et
- `GET /api/pdf/search` - PDF-də axtar

## 🎯 Komponent istifadəsi

```tsx
import { PdfReader } from '@/modules/pdf';

function BookReadingScreen() {
  // İstifadəçi məlumatlarını context-dən al
  const { user } = useAuth();
  
  return (
    <PdfReader
      bookId="book-01"
      userId={user.id}
      userName={user.fullName}
      userPhone={user.phone}
      userEmail={user.email}
      language="az"
      onExit={() => navigate('/books')}
      showCopyrightNotice={true}
    />
  );
}
```

## 🔧 Konfiqurasiya

### Mock API-dan real API-ya keçid

`src/modules/pdf/api.ts`:

```typescript
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_PDF_API !== 'false';
```

### Vatermark tənzimləmələri

`src/modules/pdf/Watermark.tsx`:

```typescript
opacity={0.12}      // 0.08 - 0.18 aralığı
angle={14}          // 10 - 20 dərəcə
fontSize={12}       // 10 - 16 px
refreshInterval={60000}  // 60 saniyə
```

### Sessiya müddəti

Backend-də tənzimlə:

```typescript
const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 dəqiqə
```

## 🐛 Test et

### 1. Vatermark görünür?

Kitabı aç, səhifədə diagonal yazılar görməli:
```
DDA.az • Əli Məmmədov • +994501234567 • user_123/device_abc • 2024-10-07 • Page 1/240
```

### 2. Screenshot aşkarlanır?

`PrintScreen` düyməsinə bas → Console-da görməli:
```
[Security] Screenshot shortcut detected
```

### 3. Background blur?

Başqa tab-a keç → PDF blur olmalı  
Geri qayıt → Blur gizlənməli

### 4. Səhifə naviqasiyası?

- Next/Previous düymələr
- "5 / 240" düyməsinə tıkla → Modal aç
- Slider istifadə et
- Səhifə nömrəsi daxil et

### 5. Axtarış?

🔍 ikonu → Axtarış bar aç  
Mətn daxil et → Mock nəticələr görünməli  
Nəticəyə tıkla → Həmin səhifəyə keç

### 6. Zoom?

+ / - düymələr  
Vatermark zoom ilə adaptiv dəyişməli

### 7. Thumbnails?

☰ ikonu → Sidebar aç  
Səhifələr siyahısı görünməli  
Current səhifə highlight olunmalı

## 📱 React Native-ə keçid

### Paketlər

```bash
npx expo install expo-screen-capture expo-file-system expo-crypto react-native-svg
npm install react-native-pdf zustand axios
```

### PDF Viewer dəyişikliyi

`PdfReader.tsx`-də:

```tsx
// Əvvəlki (placeholder):
<div>Page {currentPage}</div>

// Yeni (real PDF):
import Pdf from 'react-native-pdf';

<Pdf
  source={{ uri: session.url }}
  page={currentPage}
  onPageChanged={(page) => store.setPage(page)}
  onLoadComplete={(numberOfPages) => {
    console.log(`Total pages: ${numberOfPages}`);
  }}
  onError={(error) => {
    console.error('PDF Error:', error);
    store.setError('Failed to load PDF');
  }}
  enablePaging={true}
  spacing={10}
  style={{ flex: 1 }}
/>
```

### Screenshot prevention

`guards.ts`-də:

```typescript
import * as ScreenCapture from 'expo-screen-capture';

export async function preventScreenCapture(): Promise<void> {
  await ScreenCapture.preventScreenCaptureAsync();
}

export function addScreenshotListener(callback: () => void) {
  const subscription = ScreenCapture.addScreenshotListener(() => {
    callback();
  });
  return () => subscription.remove();
}
```

### File System

`utils.ts`-də:

```typescript
import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';

export async function downloadFile(url: string, onProgress?: (progress: number) => void): Promise<string> {
  const fileUri = `${FileSystem.documentDirectory}book_${Date.now()}.pdf`;
  
  const downloadResumable = FileSystem.createDownloadResumable(
    url,
    fileUri,
    {},
    (downloadProgress) => {
      const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
      onProgress?.(progress * 100);
    }
  );
  
  const result = await downloadResumable.downloadAsync();
  return result?.uri || '';
}

export async function sha256(fileUri: string): Promise<string> {
  const fileContent = await FileSystem.readAsStringAsync(fileUri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    fileContent
  );
}
```

## 🎓 Backend implementasiya nümunəsi

### Node.js + Express + pdf-lib

```javascript
const express = require('express');
const { PDFDocument, rgb } = require('pdf-lib');
const AWS = require('aws-sdk');
const crypto = require('crypto');

const s3 = new AWS.S3();

app.post('/api/pdf/issue', async (req, res) => {
  const { bookId, userId, userName, userPhone } = req.body;
  
  // 1. Original PDF-i yüklə
  const originalPdfBytes = await s3.getObject({
    Bucket: 'dda-books',
    Key: `originals/${bookId}.pdf`,
  }).promise();
  
  // 2. PDF-i parse et
  const pdfDoc = await PDFDocument.load(originalPdfBytes.Body);
  const pages = pdfDoc.getPages();
  
  // 3. Hər səhifəyə watermark əlavə et
  pages.forEach((page, index) => {
    const { width, height } = page.getSize();
    const watermarkText = `DDA.az • ${userName} • ${userPhone} • ${userId} • ${new Date().toISOString()} • Page ${index + 1}`;
    
    page.drawText(watermarkText, {
      x: 50,
      y: height / 2,
      size: 12,
      color: rgb(0, 0, 0),
      opacity: 0.12,
      rotate: { angle: 14 },
    });
  });
  
  // 4. Watermarked PDF-i saxla
  const pdfBytes = await pdfDoc.save();
  const watermarkedKey = `watermarked/${userId}_${bookId}_${Date.now()}.pdf`;
  
  await s3.putObject({
    Bucket: 'dda-books',
    Key: watermarkedKey,
    Body: pdfBytes,
    ContentType: 'application/pdf',
  }).promise();
  
  // 5. Signed URL yarat (30 dəq)
  const url = s3.getSignedUrl('getObject', {
    Bucket: 'dda-books',
    Key: watermarkedKey,
    Expires: 30 * 60, // 30 minutes
  });
  
  // 6. Checksum hesabla
  const checksumSha256 = crypto
    .createHash('sha256')
    .update(pdfBytes)
    .digest('hex');
  
  // 7. Cavab
  res.json({
    success: true,
    data: {
      url,
      checksumSha256,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      totalPages: pages.length,
      bookTitle: 'Sürücülük Nəzəriyyəsi',
      bookId,
    },
  });
});
```

## ✅ Yoxlama siyahısı

- [ ] Zustand yüklənib
- [ ] Demo ekran açılır
- [ ] Vatermark görünür
- [ ] Screenshot detection işləyir (console log)
- [ ] Background blur işləyir
- [ ] Səhifə naviqasiyası (next/prev)
- [ ] Page picker modal
- [ ] Axtarış bar
- [ ] Zoom in/out
- [ ] Thumbnails sidebar
- [ ] AZ/EN dilləri
- [ ] Copyright notice modal
- [ ] Session expiry warning (mock)
- [ ] .env faylı yaradılıb

## 🚀 Production-a hazırlıq

1. ✅ Backend endpoints implement et
2. ✅ Real PDF-lər S3-ə yüklə
3. ✅ Server-side watermarking təmin et
4. ✅ Authentication əlavə et
5. ✅ Rate limiting
6. ✅ Audit logging
7. ✅ Error monitoring (Sentry)
8. ✅ Analytics (session duration, popular pages)
9. ✅ EAS Build (React Native)
10. ✅ Store submission (iOS/Android)

## 📞 Kömək lazımdır?

- 📖 Ətraflı: `PDF_READER_README.md`
- 🐛 Issues: GitHub
- 📧 Email: dev@dda.az