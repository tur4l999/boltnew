# GitHub Pages Deployment Guide

Bu faylda layihənin GitHub Pages-ə avtomatik deployment prosesi izah edilir.

## Problemin həlli

GitHub Pages-də React aplikasiyaları üçün iki əsas problem var:
1. **Asset path problemi**: React Router istifadə edən aplikasiyalar üçün düzgün base path lazımdır
2. **SPA routing problemi**: GitHub Pages Jekyll istifadə edir və client-side routing-i dəstəkləmir

## Edilən düzəlişlər

### 1. Vite konfiqurasiyası (`vite.config.ts`)
```typescript
const base = command === 'build' && mode === 'production' 
  ? '/boltnew/'  // GitHub Pages üçün repository adı
  : './'         // Local development üçün
```

### 2. GitHub Actions workflow (`.github/workflows/deploy.yml`)
- `npm run build` əvəzinə `npm run build:github` istifadə edilir
- Bu production mode-da `/boltnew/` base path-i təmin edir

### 3. SPA routing həlli
- `public/404.html`: Bütün 404 error-ları index.html-ə yönləndirir
- `index.html`: URL-də olan routing parametrlərini parse edir
- `.nojekyll` faylı: Jekyll processing-ini söndürür

## İstifadə qaydaları

### Avtomatik deployment
```bash
npm run deploy
```
Bu əmr:
1. Dependencies quraşdırır (əgər yoxdursa)
2. Production build yaradır
3. Dəyişiklikləri commit edir
4. GitHub-a push edir

### Manual deployment
```bash
npm run build:github
git add .
git commit -m "Update site"
git push origin main
```

## Faydalar

1. **Avtomatik**: Hər commit avtomatik olaraq deploy olur
2. **SPA dəstəyi**: React Router düzgün işləyir
3. **Asset loading**: Bütün CSS/JS fayllar düzgün yüklənir
4. **CI/CD pipeline**: GitHub Actions avtomatik build edir

## Məsləhətlər

- Hər dəyişiklikdən sonra `npm run deploy` işlədin
- GitHub Pages update olmaq üçün 1-2 dəqiqə gözləyin
- Link: https://tur4l999.github.io/boltnew/

## Troubleshooting

Əgər sayt hələ də boş görünürsə:
1. **GitHub Pages Source konfiqurasiyası**:
   - GitHub repository-yə gedin: https://github.com/tur4l999/boltnew
   - Settings > Pages > Source seçin
   - **ÖNƏMLİ**: "Deploy from a branch" seçin
   - Branch: `gh-pages` və folder: `/ (root)` seçin
   - Save düyməsinə basın

2. **Manual deployment (gh-pages branch)**:
   ```bash
   npm run build:github
   npx gh-pages -d dist -m "Deploy to GitHub Pages"
   ```

3. **GitHub Actions deployment**:
   - Actions tab-da deploy workflow-nun uğurla bitdiyini yoxlayın
   - Əgər GitHub Actions istifadə edirsinizsə, Source-u "GitHub Actions" olaraq təyin edin

4. **Browser cache-ni təmizləyin** (Ctrl+F5)

## Deployment Metodları

### Metod 1: gh-pages branch (Hal-hazırda aktiv)
```bash
npm run build:github
npx gh-pages -d dist
```
- ✅ Sürətli
- ✅ Sadə
- ✅ Local-dan birbaşa deploy

### Metod 2: GitHub Actions (Gələcək üçün)
- Settings > Pages > Source > "GitHub Actions" seçin
- Hər main branch push-dan sonra avtomatik deploy
- `.github/workflows/deploy.yml` workflow faylı artıq hazırdır