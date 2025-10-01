# StackBlitz Deployment

## StackBlitz-də Proyekti Açmaq

### Metod 1: GitHub-dan birbaşa import
StackBlitz-də bu linki açın:
```
https://stackblitz.com/github/tur4l999/boltnew
```

### Metod 2: StackBlitz Editor
1. [StackBlitz.com](https://stackblitz.com) saytına daxil olun
2. "Import from GitHub" düyməsinə basın
3. Repository URL daxil edin: `https://github.com/tur4l999/boltnew`
4. "Import" düyməsinə basın

## Qeydlər

- StackBlitz avtomatik olaraq `npm install` və `npm run dev` əmrlərini işə salacaq
- `.stackblitzrc` faylı mühit dəyişənlərini təyin edir
- Proyekt avtomatik olaraq relative path (`./`) ilə build olunacaq

## Demo Links

- **GitHub Pages**: https://tur4l999.github.io/boltnew/
- **StackBlitz**: https://stackblitz.com/github/tur4l999/boltnew

## Fərqlər

| Mühit | Base Path | Build Əmri | Router Basename |
|-------|-----------|------------|-----------------|
| GitHub Pages | `/boltnew/` | `npm run build:github` | `/boltnew` |
| StackBlitz | `./` | `npm run build` | `` (empty) |
| Local Dev | `./` | `npm run dev` | `` (empty) |
