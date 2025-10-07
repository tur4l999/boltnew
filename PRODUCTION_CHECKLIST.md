# ✅ Production Checklist - Onboarding

## 🎯 Production-a çıxarkən bu addımları izləyin

---

## 1️⃣ Test Rejimini Söndürün

### Fayl: `src/App.tsx`

**İNDİ (Test):**
```tsx
<OnboardingWrapper 
  testMode={true}  // ← Bunu dəyişdirin!
>
```

**PRODUCTION:**
```tsx
<OnboardingWrapper 
  testMode={false}  // ← Bunu edin
>
```

**VƏ YA (tövsiyə edilir):**
```tsx
<OnboardingWrapper 
  // testMode prop-unu tamamilə silin
>
```

---

## 2️⃣ Build Edin

```bash
npm run build
```

**Yoxlayın:** Build uğurla keçməlidir, error olmamalı.

---

## 3️⃣ Local Test

```bash
npm run preview
```

**Test edin:**

1. ✅ Açın → Onboarding göstərilir
2. ✅ "Get Started" basın
3. ✅ Login/Home ekranına gedir
4. ✅ Browser console açın:
   - Yazdırın: `localStorage.getItem('dda_hasSeenOnboarding')`
   - Cavab: `"true"` olmalı
5. ✅ Səhifəni yeniləyin (F5)
6. ✅ Onboarding keçilməli (Login/Home göstərilməli)

**Əgər onboarding hələ də hər dəfə göstərilirsə:**
- ❌ `testMode={true}` hələ aktivdir
- Addım 1-ə qayıdın

---

## 4️⃣ Console Yoxlaması

Browser console-da bu mesajları **GÖRMƏMƏLISIZ:**

```
🧪 TEST MODE: Onboarding hər dəfə göstəriləcək
🧪 TEST MODE: localStorage-a yazılmadı
```

Əgər görürsünüzsə → `testMode` hələ `true`-dur!

---

## 5️⃣ localStorage Yoxlaması

Browser DevTools-da:
1. F12 → **Application** tab
2. **Local Storage** → Sitenizi seçin
3. **Key**: `dda_hasSeenOnboarding`
4. **Value**: `"true"` olmalı (onboarding tamamlandıqdan sonra)

---

## 6️⃣ Deploy

```bash
npm run deploy
# və ya
npm run deploy:gh-pages
```

---

## 7️⃣ Production Test (Canlı Site-da)

Deploy edildikdən sonra:

1. ✅ Canlı site-ı açın (təmiz browser / incognito)
2. ✅ Onboarding göstərilir
3. ✅ "Get Started" basın
4. ✅ localStorage-a yazılır
5. ✅ Səhifəni yeniləyin
6. ✅ Onboarding keçilir ✅

---

## 📊 Müqayisə: Test vs Production

| Xüsusiyyət | Test Rejimi | Production |
|------------|-------------|------------|
| testMode | `true` | `false` (və ya yoxdur) |
| Onboarding | Hər dəfə | 1 dəfə |
| localStorage | Yazılmır | Yazılır |
| Console 🧪 | Var | Yoxdur |
| İstifadəçi | Developer | Real user |

---

## ⚠️ Ən Çox Edilən Səhvlər

### ❌ Səhv 1: testMode unutmaq
```tsx
testMode={true}  // ← Hələ də true!
```
**Həll:** `false` edin və ya silin

### ❌ Səhv 2: Build etməmək
Kod dəyişdirdiniz amma build etmədiniz
**Həll:** `npm run build`

### ❌ Səhv 3: Cache
Browser cache köhnə versiyası göstərir
**Həll:** Hard refresh (Ctrl+Shift+R) və ya incognito

---

## ✅ Final Checklist

Hamısını yoxlayın:

- [ ] `src/App.tsx`-da `testMode={false}` (və ya silinib)
- [ ] `npm run build` uğurla keçir
- [ ] Local test: 1-ci dəfə onboarding göstərilir
- [ ] Local test: 2-ci dəfə onboarding keçilir
- [ ] Console-da 🧪 mesajları yoxdur
- [ ] localStorage-da `dda_hasSeenOnboarding=true` yazılır
- [ ] Deploy edilib
- [ ] Production-da test edilib

---

## 🎉 Hazırsınız!

Əgər bütün checklistlər ✅-dirsə, production-a çıxa bilərsiniz!

**Uğurlar! 🚀**

---

## 🔄 Geri Test Rejiminə Qayıtmaq

Əgər yenidən test etmək istəsəniz:

```tsx
// src/App.tsx
testMode={true}  // ← Yenidən true edin
```

Və `npm run build` edin.

---

## 📞 Kömək

Problem olsa:
1. Bu checklistə əməl edin
2. Console error-larını yoxlayın
3. localStorage-u yoxlayın (DevTools)
4. `TEST_MODE_INSTRUCTIONS.md`-ə baxın
