# 🌐 DDA.az Secure PDF Reader - Web Demo

Bu StackBlitz-də işləyən **web demo versiyasıdır**. Real mobil tətbiq React Native + Expo ilə hazırlanmışdır.

## 🚀 Demo-nu Görmək Üçün

1. **PDF Demo-ya keçin**: `/pdf-demo` URL-inə daxil olun və ya əsas səhifədəki "📚 PDF Demo" düyməsinə klikləyin
2. **Kitab seçin**: Demo kitablardan birini seçin
3. **Təhlükəsizlik xüsusiyyətlərini test edin**

## 🔒 Web Demo-da Test Edilə Bilən Xüsusiyyətlər

### ✅ İşləyən Xüsusiyyətlər:
- **PDF Viewer Interface**: Mock PDF səhifələri ilə
- **Dynamic Watermark**: SVG overlay ilə canlı vatermark (60 saniyədə bir yenilənir)
- **Page Navigation**: Səhifə-səhifə keçid, thumbnails, page picker
- **Search Functionality**: Mock axtarış nəticələri
- **Zoom Controls**: In/out zoom (0.5x - 3x)
- **Session Timer**: 25 dəqiqəlik sessiya sayğacı
- **Security Overlay**: Təhlükəsizlik pozuntusu modal-ları
- **Dark/Light Mode**: Sistem rejimi dəstəyi
- **Responsive Design**: Mobil və desktop uyğun

### 🧪 Təhlükəsizlik Testləri:
- **Screenshot Detection**: `Cmd+Shift+3/4` (Mac) və ya `PrtScr` (Windows) basın
- **Right-click Protection**: Sağ klik qadağandır
- **Session Expiry**: 25 dəqiqə sonra avtomatik logout
- **Security Violations**: Müxtəlif təhlükəsizlik pozuntuları simulyasiyası

## 📱 Real Mobil Tətbiq vs Web Demo

| Xüsusiyyət | Real Mobil App | Web Demo |
|------------|----------------|----------|
| **PDF Rendering** | react-native-pdf | Mock səhifələr |
| **Screenshot Protection** | expo-screen-capture + native | Keyboard event simulation |
| **Screen Recording** | Native detection | Simulyasiya |
| **Background Blur** | AppState listeners | Simulyasiya |
| **Root Detection** | Device security checks | Simulyasiya |
| **File Integrity** | SHA256 + secure storage | Simulyasiya |
| **Watermark** | SVG overlay (real) | SVG overlay (real) |
| **Session Management** | Real API calls | Mock timer |

## 🎯 Demo Təlimatları

### Kitab Açmaq:
1. Ana səhifədə kitablardan birini seçin
2. Təsdiq modal-ında "OK" basın
3. PDF oxuyucu açılacaq

### Təhlükəsizlik Testləri:
- **Screenshot**: `Cmd+Shift+3` və ya `PrtScr` basın → Security overlay görünəcək
- **Search**: 🔍 düyməsinə basın və axtarış edin
- **Page Navigation**: 📄 düyməsi ilə səhifə seçin
- **Thumbnails**: 📋 düyməsi ilə səhifə siyahısına baxın

### Zoom və Navigation:
- **Zoom**: Alt hissədəki +/- düymələri
- **Page Change**: "Əvvəlki" / "Növbəti" düymələri
- **Quick Navigation**: Thumbnails və ya page picker istifadə edin

## 🔧 Texniki Detallar

### Fayllar:
- `src/components/SecurePdfReader.tsx` - Əsas PDF oxuyucu komponenti
- `src/components/SecurePdfReader.css` - Styling
- `src/App.tsx` - Demo routing və integration
- `src/App.css` - Ana tətbiq styling

### Xüsusiyyətlər:
- **React Hooks**: useState, useEffect, useRef
- **SVG Watermarks**: Dynamic pattern generation
- **CSS Variables**: Dark/light mode dəstəyi
- **Responsive Design**: Mobile-first approach
- **Keyboard Events**: Security simulation
- **Mock Data**: Realistic demo content

## 📋 Real Implementation Fərqləri

Real React Native tətbiqində:

1. **PDF Rendering**: `react-native-pdf` ilə real PDF faylları
2. **Security**: Native platform API-ları
3. **File System**: `expo-file-system` ilə secure storage
4. **Crypto**: `expo-crypto` ilə SHA256 verification
5. **Device Info**: `react-native-device-info` ilə device fingerprinting
6. **Background Detection**: `AppState` listeners
7. **Screenshot Protection**: `expo-screen-capture` native API

## 🚀 Production Deployment

Real mobil tətbiq üçün:

```bash
# React Native + Expo project
npm install
expo start

# EAS Build
eas build --platform android
eas build --platform ios
```

## 📞 Əlaqə

Bu demo real DDA.az təhlükəsiz PDF oxuyucu tətbiqinin web versiyasıdır. 

**Real mobil tətbiq daha güclü təhlükəsizlik xüsusiyyətlərinə malikdir:**
- Native screenshot/recording protection
- Device security validation
- Encrypted file storage
- Real-time session monitoring
- Server-side watermarking
- Advanced threat detection

---

**Qeyd**: Bu yalnız demo məqsədləri üçündür. Production istifadəsi üçün real React Native + Expo tətbiqi istifadə edin.