# Xəta Həlli Təlimatları

## Xəta:
```
Failed to resolve import "../screens/SignsScreen"
```

## Həll:

### 1. Git pull edin
```bash
cd /home/tur4l999/boltnew
git pull origin cursor/fix-import-resolution-error-in-vite-9b74
```

### 2. Əgər git pull işləməsə, faylları manual olaraq əlavə edin:

#### Yaradılan Fayllar:

**src/components/screens/** folder-ində:
- SignsScreen.tsx
- AppealsScreen.tsx  
- CertificateApplicationScreen.tsx
- DrivingPracticeScreen.tsx
- QAScreen.tsx
- QADetailScreen.tsx
- QAFormScreen.tsx
- AppealSubmitModal.tsx
- BlogDetailScreen.tsx

**src/components/ui/** folder-ində:
- EmojiIcon.tsx

### 3. Dev server-i restart edin
```bash
# Ctrl+C ilə dayandırın (əgər işləyirsə)
# Sonra yenidən başladın
npm run dev
```

### 4. Browser cache təmizləyin
- Ctrl + Shift + R (hard refresh)
- Və ya DevTools açıb "Disable cache" seçin

### 5. node_modules yenidən quraşdırın (əgər lazım olarsa)
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Yoxlama:

Aşağıdakı komanda ilə faylların olduğunu yoxlayın:
```bash
ls -la src/components/screens/ | grep -E "(Signs|Appeals|QA|Driving)"
```

Əgər fayllar görünmürsə və ya hələ də problem varsa, mənə deyin və faylların content-ini göndərərəm ki, manual yaradasınız.
