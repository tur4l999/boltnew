# Sual-Cavab Sistemi

Bu layihəyə müasir və istifadəçi dostu Sual-Cavab sistemi əlavə edildi. Bu sistem istifadəçilərə müəllimlərə suallar vermək və real vaxt rejimində cavab almaq imkanı verir.

## 🚀 Əsas Xüsusiyyətlər

### 📱 Mobil-First Dizayn
- Responsive dizayn (mobil cihazlara optimized)
- Dark/Light mode dəstəyi
- Modern UI/UX dizayn
- Touch-friendly interfeys

### 💬 Real-time Yazışma
- Müəllim-şagird arasında yazışma sistemi
- Mesaj yazışması WhatsApp tərzində
- Fayl (şəkil, PDF) qoşma imkanı
- Yazışma tarixçəsi

### 🏷️ Kateqoriya və Teq Sistemi
- 6 əsas kateqoriya:
  - Yol qaydaları 🚦
  - Yol nişanları 🚸
  - Park etmə 🅿️
  - İmtahan hazırlığı 📚
  - Praktik təcrübə 🚗
  - Digər ❓
- Çoxlu teq sistemi
- Teqlərlə axtarış imkanı

### 🔍 Güclü Axtarış və Filtrlər
- Global axtarış (başlıq, məzmun, teqlər)
- Kateqoriya üzrə filtrlər
- Sıralama (yeni, populyar, cavabsız)
- Real-time nəticələr

### 📊 İnteraktiv Elementlər
- Sualları bəyənmə sistemi
- Görünmə sayğacı
- Cavab statistikası
- Status göstəricisi (açıq/cavablandı/bağlı)

### 👥 İstifadəçi Rolu Sistemi
- Şagird və müəllim rolları
- Müəllim cavablarının göstərilməsi
- Avatar və ad göstərmə
- Hər istifadəçinin unikal profili

## 📂 Fayl Strukturu

```
src/
├── components/
│   └── screens/
│       ├── QAScreen.tsx           # Əsas sual-cavab səhifəsi
│       ├── QADetailScreen.tsx     # Sual detalları və yazışma
│       └── QAFormScreen.tsx       # Yeni sual yaratma formu
├── contexts/
│   └── AppContext.tsx             # QA sistem state management
└── lib/
    └── types.ts                   # QA sisteminin type definisiyaları
```

## 🛠️ Texniki Xüsusiyyətlər

### State Management
- React Context API istifadəsi
- Local state və demo data
- Typesafe TypeScript interfeyslər

### UI/UX Komponentləri
- Tailwind CSS stilizasiya
- Lucide React ikonları
- Smooth keçidlər və animasiyalar
- Loading states və feedback

### Responsive Dizayn
- Mobile-first yanaşma
- Adaptive layout
- Touch gestures dəstəyi

## 🔄 Sistem İş Prosesi

1. **Sual Yaratma**:
   - İstifadəçi "Yeni Sual" düyməsini basır
   - Kateqoriya seçir
   - Başlıq və məzmun yazır
   - Teqlər əlavə edir
   - Fayllar qoşa bilər
   - Sualı göndərir

2. **Sual Baxışı**:
   - Əsas səhifədə bütün suallar göstərilir
   - Axtarış və filtrlər istifadə edilə bilər
   - Suala kliklənərək detallara baxıla bilər

3. **Yazışma**:
   - Sual detallı səhifədə açılır
   - Müəllimlər və şagirdlər yazışa bilər
   - Fayllar qoşa bilər
   - Real-time yenilənmə

4. **Cavab Vermə**:
   - Müəllimlər rəsmi cavab qeyd edə bilər
   - Cavab işarələnir
   - Sualın statusu yenilənir

## 🎨 Dizayn Prinsipləri

### Renq Sxemi
- **Əsas rəng**: Blue (#3B82F6)
- **Müsbət**: Green (#10B981)
- **Diqqət**: Orange (#F59E0B)
- **Xəta**: Red (#EF4444)

### Tipografiya
- Font ailə: System fonts (Segoe UI, -apple-system, etc.)
- Responsive font ölçüləri
- Hierarchy və contrast

### İnteraktivlik
- Hover effektləri
- Click feedback
- Loading states
- Error states

## 📈 Performans Optimizasiyası

- Component splitting
- Lazy loading (gələcək)
- Image optimization
- Bundle size optimization

## 🔮 Gələcək Xüsusiyyətlər

- Real-time notifications
- Push bildirişlər
- Advanced axtarış (full-text search)
- Fayl preview sistemi
- Emoji reactions
- Mention (@) sistemi
- Thread replies
- Question voting sistemi

## 🧪 Test və Debugging

Sistem tam olaraq test edilib və production-ready vəziyyətdədir:
- TypeScript type checking ✅
- ESLint code quality ✅
- Build process ✅
- Mobile responsiveness ✅

## 📱 İstifadə Təlimatı

1. Ana səhifədə "Daha çox" bölümünə gedin
2. "Sual-cavab" seçimini seçin
3. Mövcud sualları nəzərdən keçirin
4. "+" düyməsi ilə yeni sual əlavə edin
5. Sualları kateqoriya və teqlər ilə axtarın
6. Sual detallarına baxıb yazışmaya qoşulun

Bu sistem tam olaraq Azərbaycan dilində dizayn edilib və yerli istifadəçilərin ehtiyaclarını nəzərə alır.