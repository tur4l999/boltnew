# 🧪 Test Rejimi Təlimatları / Test Mode Instructions

## VACIB: Production-a çıxarkən oxuyun!

---

## 🎯 Hal-hazırda (Test Rejimi)

**Onboarding hər dəfə göstərilir** ✅

`src/App.tsx` faylında:
```tsx
<OnboardingWrapper 
  language={language as 'az' | 'en' | 'ru'}
  isDark={isDarkMode}
  testMode={true}  // ← TEST REJIMI AKTIV
>
```

### Nə baş verir:
- ✅ Hər səhifə yeniləndikdə onboarding göstərilir
- ✅ Skip və ya Get Started-ə basanda localStorage-a yazılmır
- ✅ Növbəti dəfə açanda yenə onboarding göstərilir
- ✅ Test və inkişaf üçün ideal

### Console-da görəcəksiniz:
```
🧪 TEST MODE: Onboarding hər dəfə göstəriləcək
🧪 TEST MODE: localStorage-a yazılmadı (növbəti dəfə yenə göstəriləcək)
```

---

## 🚀 Production-a Çıxarkən (Real İstifadə)

**Onboarding yalnız 1 dəfə göstərilməlidir** ✅

### Addım 1: testMode-u söndürün

`src/App.tsx` faylında dəyişiklik edin:

```tsx
<OnboardingWrapper 
  language={language as 'az' | 'en' | 'ru'}
  isDark={isDarkMode}
  testMode={false}  // ← PRODUCTION: false edin!
>
```

**VƏ YA** tam silin (default false-dur):

```tsx
<OnboardingWrapper 
  language={language as 'az' | 'en' | 'ru'}
  isDark={isDarkMode}
  // testMode prop-u yoxdursa, avtomatik false olur
>
```

### Addım 2: Build və deploy

```bash
npm run build
npm run deploy
```

### Nə baş verir:
- ✅ İstifadəçi ilk dəfə açanda onboarding göstərilir
- ✅ Skip və ya Get Started-ə basanda localStorage-a yazılır
- ✅ Növbəti dəfə açanda onboarding keçilir
- ✅ Birbaşa Login/Home ekranına gedir

---

## 🔄 Test Rejimi ↔ Production Arasında Keçid

### Test rejimi üçün:
```tsx
testMode={true}   // Hər dəfə göstər
```

### Production üçün:
```tsx
testMode={false}  // 1 dəfə göstər
// və ya
// testMode yazmayın (default false-dur)
```

---

## 📊 Müqayisə Cədvəli

| Xüsusiyyət | testMode={true} | testMode={false} |
|------------|-----------------|------------------|
| Onboarding göstərilməsi | Hər dəfə | 1 dəfə |
| localStorage yazılır? | Xeyr | Bəli |
| Növbəti açılışda | Yenə göstərilir | Keçilir |
| İstifadə məqsədi | Test / İnkişaf | Production / Real |
| Console mesajları | 🧪 TEST MODE | - |

---

## 🧪 Test Edərkən

### Onboarding-i yenidən görmək üçün:

**Variant 1:** Sadəcə səhifəni yeniləyin (F5)
- testMode={true} olanda işləyir

**Variant 2:** Settings-dən sıfırlayın
- Parametrlər → Onboarding sıfırla

**Variant 3:** localStorage-ı silin
- DevTools → Application → Local Storage
- `dda_hasSeenOnboarding` açarını silin

---

## ⚠️ Vacib Qeydlər

### Production-a çıxarkən unutmayın:

1. ✅ `testMode={false}` edin (və ya silin)
2. ✅ Build edin: `npm run build`
3. ✅ Test edin: Açın, onboarding keçin, yenidən açın (keçilməli)
4. ✅ Deploy edin

### Əgər unutsanız nə olar?

Production-da `testMode={true}` qalarsa:
- ❌ Hər dəfə onboarding göstəriləcək
- ❌ İstifadəçilər hər açışda onboarding görəcək
- ❌ Kasıb UX (pis istifadəçi təcrübəsi)

### Yoxlama:

Console-da bu mesajları görməməlisiniz (production-da):
```
🧪 TEST MODE: ...
```

Əgər görürsünüzsə → `testMode={false}` edin!

---

## 🎯 Sürətli Bələdçi

### İndi test edirsinizsə:
```tsx
testMode={true}  ✅ Qalsın
```

### Production-a çıxırıqsa:
```tsx
testMode={false}  ✅ Dəyişdirin
```

---

## 📝 Kod Nümunələri

### Test üçün (hal-hazırkı):
```tsx
// src/App.tsx
<OnboardingWrapper 
  language={language as 'az' | 'en' | 'ru'}
  isDark={isDarkMode}
  testMode={true}  // ← Hər dəfə göstər
>
  {children}
</OnboardingWrapper>
```

### Production üçün:
```tsx
// src/App.tsx
<OnboardingWrapper 
  language={language as 'az' | 'en' | 'ru'}
  isDark={isDarkMode}
  testMode={false}  // ← 1 dəfə göstər
>
  {children}
</OnboardingWrapper>
```

### Və ya (daha təmiz):
```tsx
// src/App.tsx
<OnboardingWrapper 
  language={language as 'az' | 'en' | 'ru'}
  isDark={isDarkMode}
  // testMode yazmayın - default false olur
>
  {children}
</OnboardingWrapper>
```

---

## 🔍 Debug

### testMode-un vəziyyətini yoxlamaq:

```tsx
// OnboardingWrapper komponenti içində
console.log('Test mode:', testMode);
```

### localStorage-u yoxlamaq:

```tsx
// Browser console-da
localStorage.getItem('dda_hasSeenOnboarding');
// null = hələ görmeyib
// "true" = görüb
```

---

## ✅ Checklist: Production-a Çıxarkən

- [ ] `testMode={false}` və ya tamamilə silinib?
- [ ] Build uğurla keçir? (`npm run build`)
- [ ] Test edilib: ilk açılış → onboarding göstərilir
- [ ] Test edilib: 2-ci açılış → onboarding keçilir
- [ ] Console-da 🧪 TEST MODE mesajları yoxdur
- [ ] localStorage-da `dda_hasSeenOnboarding=true` yazılır
- [ ] Deploy edilib

---

**Hazırsan? Production-a get! 🚀**

Hal-hazırda test rejimində qalmaq istəyirsənsə, heç nə dəyişdirmə. `testMode={true}` qalsın! ✅
