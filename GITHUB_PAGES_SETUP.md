# GitHub Pages Setup Guide

## Problem
GitHub Pages PR merge-dən sonra düzgün deploy olmur.

## Solution
Bu problem həll edildi! İndi aşağıdakı yollar ilə deploy edə bilərsiniz:

### 1. Automatic Deployment (Recommended)
- PR merge etdikdə avtomatik deploy olacaq
- GitHub Actions workflow PR merge-dən sonra işə düşəcək

### 2. Manual Deployment
PR merge-dən sonra site görünmürsə, bu komandları işlədin:

```bash
# Force deployment
npm run force-deploy

# Və ya
./scripts/force-deploy.sh
```

### 3. GitHub Actions Manual Trigger
1. GitHub repository-də "Actions" tab-ına gedin
2. "Deploy to GitHub Pages" workflow-unu tapın
3. "Run workflow" düyməsini basın

## GitHub Pages Settings
Repository settings-də aşağıdakı konfiqurasiya olmalıdır:

1. **Settings** → **Pages**
2. **Source**: GitHub Actions
3. **Branch**: main

## Troubleshooting

### Site görünmürsə:
1. `npm run force-deploy` işlədin
2. GitHub Actions-da deployment status-u yoxlayın
3. 2-3 dəqiqə gözləyin

### PR merge-dən sonra problem varsa:
1. GitHub Actions-da "Deploy to GitHub Pages" workflow-unu yoxlayın
2. Əgər işə düşməyibsə, manual trigger edin
3. Və ya `npm run force-deploy` işlədin

## Files Changed
- `.github/workflows/deploy.yml` - PR merge trigger əlavə edildi
- `scripts/force-deploy.sh` - Manual deployment script
- `package.json` - `force-deploy` script əlavə edildi