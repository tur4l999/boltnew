# İkon Ardıcıllığı Yeniləməsi

## Məsələ
Apellyasiya funksionallığı üçün müxtəlif yerlərdə fərqli ikonlar istifadə olunurdu:
- Ana səhifədə: `📮` 
- Digər yerlərdə: `📝`

## Həll
Bütün apellyasiya ikonları ana səhifədəki `📮` ikonu ilə eyniləşdirildi.

## Dəyişdirilən Fayllar

### 1. `src/components/screens/ResultDetailScreen.tsx`
```tsx
// Əvvəl:
<EmojiIcon emoji="📝" size={16} />
Apellyasiya

// İndi:
<EmojiIcon emoji="📮" size={16} />
Apellyasiya
```

### 2. `src/components/screens/ExamRunScreen.tsx`
```tsx
// Əvvəl:
📝 Apellyasiya

// İndi:
📮 Apellyasiya
```

### 3. `src/components/screens/MoreScreen.tsx`
```tsx
// Əvvəl:
{ key: 'appeal', label: 'Apellyasiyalarım', emoji: '📝', action: () => navigate('Appeals') }

// İndi:
{ key: 'appeal', label: 'Apellyasiyalarım', emoji: '📮', action: () => navigate('Appeals') }
```

### 4. `src/components/screens/AppealList.tsx`
```tsx
// Əvvəl:
<div className="text-6xl mb-4">📝</div>

// İndi:
<div className="text-6xl mb-4">📮</div>
```

## Nəticə
İndi bütün apellyasiya funksionallığı eyni `📮` ikonunu istifadə edir:

- ✅ Ana səhifə - Apellyasiyalar
- ✅ More səhifəsi - Apellyasiyalarım  
- ✅ İmtahan zamanı - Apellyasiya düyməsi
- ✅ Nəticə detallı səhifəsi - Apellyasiya düyməsi
- ✅ Apellyasiya siyahısı - Boş vəziyyət ikonu

## Gələcək Diqqət Nöqtəsi
Bundan sonra yeni apellyasiya funksionallığı əlavə edərkən həmişə `📮` ikonunu istifadə etməlidir.

## Digər İkon Ardıcıllıqları
Bu prinsip digər funksionallıqlar üçün də tətbiq edilməlidir:
- Bütün sual-cavab ikonları eyni olmalıdır
- Bütün imtahan ikonları eyni olmalıdır  
- Bütün dərs ikonları eyni olmalıdır
- və s.