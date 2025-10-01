# Troubleshooting Guide

## Problem: Proyekt GitHub Pages və ya StackBlitz-də görünmür

### Həll Edildi ✅

#### Nə edildi:

1. **Vite konfiqurasiyası düzəldildi** (`vite.config.ts`)
   - GitHub Pages üçün `/boltnew/` base path
   - StackBlitz və local üçün `./` relative path
   - Mühit avtomatik aşkar edilir

2. **React Router basename dinamik edildi** (`src/main.tsx`)
   - GitHub Pages-də: `basename="/boltnew"`
   - StackBlitz/Local-da: `basename=""`
   - Hostname əsasında avtomatik seçilir

3. **StackBlitz konfiqurasiyası əlavə edildi**
   - `.stackblitzrc` faylı yaradıldı
   - `stackblitz.json` faylı yaradıldı
   - `STACKBLITZ=true` environment variable təyin edilir

4. **Build script-ləri əlavə edildi**
   - `npm run build:github` - GitHub Pages üçün
   - `npm run build:stackblitz` - StackBlitz üçün
   - `npm run preview:stackblitz` - StackBlitz preview

### Deployment Statusu

#### GitHub Pages
- **URL**: https://tur4l999.github.io/boltnew/
- **Status**: Deployment in progress
- **Auto-deploy**: Hər main branch push-dan sonra (2-3 dəqiqə)

#### StackBlitz
- **URL**: https://stackblitz.com/github/tur4l999/boltnew
- **Status**: Hazır (import etmək kifayətdir)

### Yoxlama

1. **GitHub Pages deployment yoxla**:
   ```bash
   # GitHub Actions səhifəsinə bax
   https://github.com/tur4l999/boltnew/actions
   ```

2. **Build yerli olaraq test et**:
   ```bash
   # GitHub Pages build
   npm run build:github
   
   # StackBlitz build
   npm run build:stackblitz
   
   # Preview
   npm run preview:github
   ```

3. **Browser Console yoxla**:
   - F12 ilə Developer Tools aç
   - Console-da səhv var?
   - Network tab-da 404 səhvləri var?

### Gələcək Problemlər

#### Problem: "404 Not Found" GitHub Pages-də
**Həll**:
- `.nojekyll` faylının olduğundan əmin ol
- `404.html` faylının SPA routing üçün düzgün konfiqurasiya edildiyindən əmin ol
- GitHub repo settings-də Pages-in aktivləşdiyindən əmin ol (Settings > Pages)

#### Problem: Ağ səhifə StackBlitz-də
**Həll**:
- Browser console-u yoxla
- Base path-ın `./ ` olduğundan əmin ol
- `STACKBLITZ=true` environment variable təyin edildiyindən əmin ol

#### Problem: Assets yüklənmir (CSS, JS)
**Həll**:
- `vite.config.ts`-də `base` konfiqurasiyasını yoxla
- Build output-da asset path-ları yoxla (`dist/index.html`)
- GitHub Pages üçün path `/boltnew/assets/...` olmalıdır
- StackBlitz üçün path `./assets/...` olmalıdır

### Debug Script-ləri

```bash
# Build output-u yoxla
npm run build:github
cat dist/index.html | grep -E "(script|link)"

# StackBlitz build output-u yoxla
npm run build:stackblitz
cat dist/index.html | grep -E "(script|link)"

# GitHub Actions log-larını yoxla
gh run list --limit 5
gh run view <run-id>
```

### Əlaqə və Dəstək

Əgər problem davam edərsə:
1. GitHub Actions workflow log-larını yoxlayın
2. Browser Developer Console-da səhvləri yoxlayın
3. `dist/` qovluğunun düzgün build edildiyindən əmin olun

---

**Son yeniləmə**: 2025-10-01
**Status**: Həll edildi ✅
