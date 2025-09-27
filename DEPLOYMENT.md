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
1. GitHub repository Settings > Pages > Source = "GitHub Actions" olduğunu yoxlayın
2. Actions tab-da deploy workflow-nun uğurla bitdiyini yoxlayın
3. Browser cache-ni təmizləyin (Ctrl+F5)