# React Native Migration Guide

Web implementasiyasından React Native + Expo-ya keçid üçün dəqiq addımlar.

## 🎯 Məqsəd

Hazırki web-based implementasiyanı tam funksional React Native tətbiqinə çevirmək.

## 📦 1. Paketlərin quraşdırılması

```bash
# Core dependencies
npx expo install expo-screen-capture expo-file-system expo-crypto
npx expo install expo-device expo-constants react-native-svg

# PDF viewer
npm install react-native-pdf

# State management
npm install zustand

# HTTP client
npm install axios

# Optional: Security
npm install jail-monkey  # Root/Jailbreak detection
```

## 🔧 2. Faylların dəyişdirilməsi

### guards.ts - Screenshot və Background Protection

```typescript
/**
 * guards.ts - React Native version
 */
import * as ScreenCapture from 'expo-screen-capture';
import { AppState, AppStateStatus } from 'react-native';
import * as FileSystem from 'expo-file-system';
// Optional
// import JailMonkey from 'jail-monkey';

/**
 * Prevent screenshots (Android: FLAG_SECURE, iOS: limited)
 */
export async function preventScreenCapture(): Promise<void> {
  try {
    await ScreenCapture.preventScreenCaptureAsync();
  } catch (error) {
    console.warn('Screenshot prevention failed:', error);
  }
}

/**
 * Allow screenshots (cleanup)
 */
export async function allowScreenCapture(): Promise<void> {
  try {
    await ScreenCapture.allowScreenCaptureAsync();
  } catch (error) {
    console.warn('Allow screenshot failed:', error);
  }
}

/**
 * Add screenshot listener
 */
export function addScreenshotListener(callback: () => void): () => void {
  const subscription = ScreenCapture.addScreenshotListener(() => {
    console.warn('[Security] Screenshot detected!');
    callback();
  });
  
  return () => subscription.remove();
}

/**
 * Background protection
 */
export function setupBackgroundProtection(
  onBackground: () => void,
  onForeground: () => void
): () => void {
  const subscription = AppState.addEventListener(
    'change',
    (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        onBackground();
      } else if (nextAppState === 'active') {
        onForeground();
      }
    }
  );
  
  return () => subscription.remove();
}

/**
 * Check if device is jailbroken/rooted
 */
export async function checkJailbreak(): Promise<boolean> {
  // Option 1: Using jail-monkey
  // import JailMonkey from 'jail-monkey';
  // return JailMonkey.isJailBroken();
  
  // Option 2: Manual checks
  try {
    // Android root detection
    const rootFiles = [
      '/system/app/Superuser.apk',
      '/sbin/su',
      '/system/bin/su',
      '/system/xbin/su',
    ];
    
    for (const file of rootFiles) {
      const info = await FileSystem.getInfoAsync(file);
      if (info.exists) return true;
    }
    
    // iOS jailbreak detection
    const jailbreakFiles = [
      '/Applications/Cydia.app',
      '/Library/MobileSubstrate/MobileSubstrate.dylib',
      '/bin/bash',
      '/usr/sbin/sshd',
      '/etc/apt',
    ];
    
    for (const file of jailbreakFiles) {
      const info = await FileSystem.getInfoAsync(file);
      if (info.exists) return true;
    }
    
    return false;
  } catch {
    return false;
  }
}

/**
 * Clear secure cache
 */
export async function clearSecureCache(bookId: string): Promise<void> {
  const fileUri = `${FileSystem.documentDirectory}pdf_${bookId}.pdf`;
  
  try {
    await FileSystem.deleteAsync(fileUri, { idempotent: true });
  } catch (error) {
    console.error('Failed to clear cache:', error);
  }
}

// Remove web-specific functions
// (startScreenshotMonitoring with keyboard detection)
```

### utils.ts - File System və Crypto

```typescript
/**
 * utils.ts - React Native version
 */
import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';
import * as Device from 'expo-device';

/**
 * SHA-256 hash (React Native)
 */
export async function sha256(data: string | ArrayBuffer): Promise<string> {
  if (data instanceof ArrayBuffer) {
    // Convert ArrayBuffer to base64 string
    const bytes = new Uint8Array(data);
    let binary = '';
    bytes.forEach((b) => binary += String.fromCharCode(b));
    const base64 = btoa(binary);
    
    return await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      base64
    );
  }
  
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    data
  );
}

/**
 * SHA-256 hash of file
 */
export async function sha256File(fileUri: string): Promise<string> {
  const base64 = await FileSystem.readAsStringAsync(fileUri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    base64
  );
}

/**
 * Download file with progress
 */
export async function downloadFile(
  url: string,
  onProgress?: (progress: number) => void
): Promise<string> {
  const fileUri = `${FileSystem.documentDirectory}temp_${Date.now()}.pdf`;
  
  const downloadResumable = FileSystem.createDownloadResumable(
    url,
    fileUri,
    {},
    (downloadProgress) => {
      const progress =
        downloadProgress.totalBytesWritten /
        downloadProgress.totalBytesExpectedToWrite;
      
      onProgress?.(progress * 100);
    }
  );
  
  const result = await downloadResumable.downloadAsync();
  
  if (!result) {
    throw new Error('Download failed');
  }
  
  return result.uri;
}

/**
 * Get device ID
 */
export function getDeviceId(): string {
  return Device.osBuildId || Device.osInternalBuildId || 'unknown';
}

/**
 * Generate device fingerprint
 */
export function getDeviceFingerprint(): string {
  return [
    Device.brand,
    Device.manufacturer,
    Device.modelName,
    Device.osName,
    Device.osVersion,
    Device.platformApiLevel,
  ].filter(Boolean).join('|');
}

// Keep all other utility functions (debounce, formatTime, etc.)
// ...existing code...
```

### PdfReader.tsx - PDF Viewer Integration

```tsx
/**
 * PdfReader.tsx - React Native version
 */
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import Pdf from 'react-native-pdf';
import { usePdfStore } from './usePdfStore';
// ...existing imports...

export const PdfReader: React.FC<PdfReaderProps> = ({ ...props }) => {
  // ...existing state and setup...
  
  const pdfRef = useRef<Pdf>(null);
  const [pdfDimensions, setPdfDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });
  
  // Handle orientation changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setPdfDimensions({
        width: window.width,
        height: window.height,
      });
    });
    
    return () => subscription?.remove();
  }, []);
  
  // ...existing code...
  
  return (
    <View style={styles.container}>
      {/* Header - convert to React Native components */}
      <View style={styles.header}>
        <Text style={styles.title}>{store.session?.bookTitle}</Text>
        <Text style={styles.pageInfo}>
          {t('page', language)} {store.currentPage} {t('of', language)} {store.totalPages}
        </Text>
      </View>
      
      {/* PDF Viewer */}
      <View style={styles.pdfContainer}>
        <Pdf
          ref={pdfRef}
          source={{ uri: store.session?.url || '' }}
          page={store.currentPage}
          scale={store.zoomLevel}
          onLoadComplete={(numberOfPages, path) => {
            console.log('PDF loaded:', numberOfPages, 'pages');
            // Update total pages if needed
          }}
          onPageChanged={(page, numberOfPages) => {
            store.setPage(page);
          }}
          onError={(error) => {
            console.error('PDF Error:', error);
            store.setError(t('loadError', language));
          }}
          onLoadProgress={(percent) => {
            console.log(`Loading: ${percent}%`);
          }}
          enablePaging={true}
          spacing={10}
          horizontal={false}
          style={styles.pdf}
          trustAllCerts={false}
          // Android specific
          enableAntialiasing={true}
          // iOS specific
          fitPolicy={Platform.OS === 'ios' ? 0 : undefined}
        />
        
        {/* Watermark Overlay (stil layer) */}
        <AdaptiveWatermark
          config={{
            userName: props.userName,
            userPhone: props.userPhone,
            userId: props.userId,
            deviceId,
            currentPage: store.currentPage,
            totalPages: store.totalPages,
          }}
          zoomLevel={store.zoomLevel}
        />
      </View>
      
      {/* Navigation Controls - convert to React Native */}
      {/* ...existing controls converted to TouchableOpacity, etc... */}
      
      {/* Modals and Overlays */}
      {/* ...existing modals... */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f2937',
  },
  header: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  pageInfo: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  pdfContainer: {
    flex: 1,
    position: 'relative',
  },
  pdf: {
    flex: 1,
    backgroundColor: '#1f2937',
  },
});
```

### Watermark.tsx - React Native SVG

```tsx
/**
 * Watermark.tsx - React Native version
 */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, Pattern, Rect, Text as SvgText } from 'react-native-svg';
import type { WatermarkConfig } from './types';
import { createWatermarkText } from './utils';

export const Watermark: React.FC<WatermarkProps> = ({
  config,
  refreshInterval = 60000,
  className,
}) => {
  const [timestamp, setTimestamp] = useState(Date.now());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(Date.now());
    }, refreshInterval);
    
    return () => clearInterval(interval);
  }, [refreshInterval]);
  
  const {
    opacity = 0.12,
    angle = 14,
    fontSize = 12,
  } = config;
  
  const watermarkText = createWatermarkText({
    ...config,
    currentPage: config.currentPage,
    totalPages: config.totalPages,
  });
  
  const dynamicText = `${watermarkText} • ${new Date(timestamp).toLocaleTimeString()}`;
  
  const spacing = 200;
  const patternWidth = spacing * 2;
  const patternHeight = spacing * 2;
  
  return (
    <View style={[styles.overlay, StyleSheet.absoluteFill]} pointerEvents="none">
      <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
        <Defs>
          <Pattern
            id={`watermark-pattern-${config.currentPage}`}
            x="0"
            y="0"
            width={patternWidth}
            height={patternHeight}
            patternUnits="userSpaceOnUse"
          >
            <SvgText
              x={spacing / 2}
              y={spacing / 2}
              fill="currentColor"
              fontSize={fontSize}
              fontFamily="system"
              fontWeight="500"
              opacity={opacity}
              rotation={angle}
              origin={`${spacing / 2}, ${spacing / 2}`}
            >
              {dynamicText}
            </SvgText>
            
            <SvgText
              x={spacing / 2 + patternWidth / 2}
              y={spacing / 2 + patternHeight / 2}
              fill="currentColor"
              fontSize={fontSize}
              fontFamily="system"
              fontWeight="500"
              opacity={opacity}
              rotation={angle}
              origin={`${spacing / 2 + patternWidth / 2}, ${spacing / 2 + patternHeight / 2}`}
            >
              {dynamicText}
            </SvgText>
          </Pattern>
        </Defs>
        
        <Rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill={`url(#watermark-pattern-${config.currentPage})`}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
});
```

## 🎨 3. UI Components Migration

### BlurOverlay.tsx → React Native Modal

```tsx
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const BlurOverlay: React.FC<BlurOverlayProps> = ({
  visible,
  reason = 'background',
  onDismiss,
  language = 'az',
}) => {
  const { title, message, canDismiss, icon } = getMessage();
  
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={canDismiss ? onDismiss : undefined}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.icon}>{icon}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          
          {!canDismiss && (
            <TouchableOpacity
              style={styles.button}
              onPress={onDismiss}
            >
              <Text style={styles.buttonText}>
                {t('exit', language)}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 32,
    maxWidth: 400,
    alignItems: 'center',
  },
  // ...other styles...
});
```

### PagePicker, SearchBar, PageThumbs

Hər biri oxşar şəkildə React Native-ə konvert et:
- `div` → `View`
- `button` → `TouchableOpacity`
- `input` → `TextInput`
- `style={}` → `style={styles.x}`
- CSS → `StyleSheet.create({})`

## 📱 4. Platform-specific kod

### app.json / app.config.js

```json
{
  "expo": {
    "name": "DDA.az",
    "slug": "dda-az",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "bundleIdentifier": "az.dda.app",
      "supportsTablet": false,
      "infoPlist": {
        "NSPhotoLibraryUsageDescription": "App does not access photo library"
      }
    },
    "android": {
      "package": "az.dda.app",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "permissions": [
        "INTERNET"
      ]
    },
    "plugins": [
      [
        "expo-screen-capture",
        {
          "preventScreenCapture": true
        }
      ]
    ]
  }
}
```

### Android: FLAG_SECURE

Avtomatik `expo-screen-capture` ilə. Əlavə konfiqurasiya lazım deyil.

### iOS: Limited protection

iOS-da tam screenshot qarşısı yoxdur. Strategy:
1. Detection (ScreenCapture.addScreenshotListener)
2. Blur overlay göstər
3. Session revoke
4. Warning modal

## 🧪 5. Test

```bash
# iOS simulator
npx expo run:ios

# Android emulator
npx expo run:android

# Real device
npx expo start
# Scan QR code with Expo Go
```

### Test checklist:

- [ ] PDF yüklənir və görünür
- [ ] Vatermark overlay görünür
- [ ] Screenshot detection (Android: blocked, iOS: detected)
- [ ] Background blur (app switcher)
- [ ] Page navigation
- [ ] Search functionality
- [ ] Zoom in/out
- [ ] Session expiry
- [ ] Root/Jailbreak detection

## 📦 6. Build

### Development build

```bash
# iOS
eas build --profile development --platform ios

# Android
eas build --profile development --platform android
```

### Production build

```bash
# iOS
eas build --profile production --platform ios

# Android
eas build --profile production --platform android
```

### Submit to stores

```bash
eas submit --platform ios
eas submit --platform android
```

## ⚠️ Fərqlər və Məhdudiyyətlər

| Feature | Web | React Native |
|---------|-----|--------------|
| Screenshot prevention | ⚠️ Limited | ✅ Full (Android) / Detection (iOS) |
| PDF rendering | ❌ Placeholder | ✅ react-native-pdf |
| File encryption | ❌ localStorage | ✅ Secure FileSystem |
| Device ID | ⚠️ Fingerprint | ✅ Native |
| Background blur | ✅ Page Visibility | ✅ AppState |
| Offline cache | ⚠️ Limited | ✅ Full support |

## 🚀 Next Steps

1. ✅ Migrate all components
2. ✅ Test on real devices
3. ✅ Backend PDF watermarking
4. ✅ Code obfuscation (ProGuard/R8)
5. ✅ Certificate pinning
6. ✅ Analytics integration
7. ✅ Crash reporting (Sentry)
8. ✅ App Store submission

## 📞 Support

Issues: GitHub  
Docs: PDF_READER_README.md  
Email: dev@dda.az