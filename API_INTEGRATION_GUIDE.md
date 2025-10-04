# Məktəb Mövzuları API İnteqrasiya Təlimatı

Bu sənəd **SchoolSubject API**-nin tətbiqə necə inteqrasiya olunduğunu və istifadə qaydalarını təsvir edir.

## 📋 İçindəkilər

1. [API Strukturu](#api-strukturu)
2. [Quraşdırma](#quraşdırma)
3. [Təhlükəsizlik](#təhlükəsizlik)
4. [İstifadə](#istifadə)
5. [Error Handling](#error-handling)
6. [Cache Mexanizmi](#cache-mexanizmi)
7. [Testing](#testing)

---

## API Strukturu

### SchoolSubject Interface

```typescript
interface SchoolSubject {
  id: string;              // UUID
  name: string;            // Mövzunun adı
  parent?: string | null;  // Ana mövzu UUID (nullable, hierarxiya üçün)
  description?: string | null; // Təsvir (nullable)
  is_demo: boolean;        // Demo mövzu (qeyri-tələbələr üçün)
  is_passed?: string;      // Keçilib-keçilməməsi (readonly)
  children?: SchoolSubject[]; // Alt mövzular (recursive)
  progress?: number;       // Tamamlanma faizi (0-100)
}
```

### API Endpoint

```
GET /api/school-subjects
```

**Response Format:**
```json
[
  {
    "id": "uuid-1",
    "name": "Ümumi müddəalar",
    "parent": null,
    "description": "Yol hərəkəti qaydalarının ümumi müddəaları",
    "is_demo": true,
    "is_passed": "false",
    "children": []
  },
  {
    "id": "uuid-2",
    "name": "Yol nişanları",
    "parent": "uuid-1",
    "description": "Yol nişanlarının növləri və tətbiqi",
    "is_demo": false,
    "is_passed": "true",
    "children": [...]
  }
]
```

---

## Quraşdırma

### 1. Environment Variables

`.env` faylı yaradın və aşağıdakı dəyərləri əlavə edin:

```bash
# .env
VITE_API_BASE_URL=https://your-api-server.com
VITE_API_TIMEOUT=10000
VITE_CACHE_DURATION=1800000
```

**Qeyd:** `.env` faylı `.gitignore`-da olmalıdır. `.env.example` faylından istifadə edin.

### 2. API Token Konfiqurasiyası

API token-i localStorage və ya sessionStorage-da saxlayın:

```javascript
// Login zamanı
localStorage.setItem('auth_token', 'your_jwt_token');

// Logout zamanı
localStorage.removeItem('auth_token');
```

Token avtomatik olaraq hər API sorğusuna əlavə olunur:

```typescript
Authorization: Bearer <token>
```

---

## Təhlükəsizlik

### 🔒 Təhlükəsizlik Tədbirləri

1. **HTTPS İstifadəsi:** Bütün API sorğuları HTTPS üzərindən göndərilməlidir.

2. **Token Autentifikasiyası:** JWT token istifadə edilir və həssas məlumatlar qorunur.

3. **XSS Protection:** 
   - İstifadəçi input-ları sanitize edilir
   - React avtomatik XSS-dən qoruyur (JSX)

4. **CSRF Protection:** 
   - SameSite cookie parametri istifadə edilir
   - Token-based auth CSRF-dən qoruyur

5. **Rate Limiting:** 
   - Server tərəfdə rate limiting tətbiq edilməlidir
   - Client tərəfdə cache mexanizmi limit yükü azaldır

6. **Input Validation:**
   - API cavabları validate edilir
   - TypeScript type checking istifadə olunur

7. **Error Messages:**
   - Həssas məlumatlar error mesajlarında göstərilmir
   - İstifadəçiyə anlaşılan mesajlar qaytarılır

### 🛡️ Best Practices

```typescript
// ✅ Düzgün: Token-i secure şəkildə saxlayın
const saveToken = (token: string) => {
  localStorage.setItem('auth_token', token);
};

// ❌ Səhv: Token-i kod içində hardcode etməyin
const API_TOKEN = 'hardcoded_token_here'; // ASLA BELƏ ETMEYIN!

// ✅ Düzgün: Environment variables istifadə edin
const API_URL = import.meta.env.VITE_API_BASE_URL;

// ❌ Səhv: API URL-i hardcode etməyin
const API_URL = 'https://api.example.com'; // Production üçün risk
```

---

## İstifadə

### React Component-də İstifadə

```typescript
import { useApp } from '../contexts/AppContext';

function MyComponent() {
  const {
    schoolSubjects,          // Mövzular siyahısı
    schoolSubjectsLoading,   // Yükləmə vəziyyəti
    schoolSubjectsError,     // Xəta mesajı
    refreshSchoolSubjects,   // Yenidən yükləmə
    isSubjectUnlocked,       // Mövzunun açıq olub-olmaması
    updateSubjectProgress    // Progress yeniləmə
  } = useApp();

  // Mövzuları göstərmək
  return (
    <div>
      {schoolSubjectsLoading && <LoadingSpinner />}
      {schoolSubjectsError && <ErrorMessage message={schoolSubjectsError} />}
      
      {schoolSubjects.map(subject => (
        <SubjectCard 
          key={subject.id}
          subject={subject}
          unlocked={isSubjectUnlocked(subject)}
        />
      ))}
    </div>
  );
}
```

### API Funksiyalarından Birbaşa İstifadə

```typescript
import { 
  fetchSchoolSubjects,
  buildSubjectHierarchy,
  flattenSubjectHierarchy,
  getSubjectById,
  getDemoSubjects,
  saveSubjectProgress
} from '../lib/api';

// Mövzuları çəkmək
const subjects = await fetchSchoolSubjects();

// Hierarxik struktur qurmaq
const hierarchical = buildSubjectHierarchy(subjects);

// Flat list-ə çevirmək
const flat = flattenSubjectHierarchy(hierarchical);

// ID-yə görə tapmaq
const subject = getSubjectById(subjects, 'uuid-123');

// Demo mövzuları filtreləmək
const demoSubjects = getDemoSubjects(subjects);

// Progress saxlamaq
saveSubjectProgress('uuid-123', 75);
```

---

## Error Handling

### Error Tipləri

```typescript
interface ApiError {
  message: string;   // İstifadəçiyə göstəriləcək mesaj
  status?: number;   // HTTP status kodu
  details?: any;     // Əlavə məlumat (debug üçün)
}
```

### Error Scenarios

| Səhv | Status | Mesaj |
|------|--------|-------|
| Network xətası | - | "İnternet bağlantısı yoxdur" |
| Timeout | - | "Sorğu vaxtı keçdi" |
| 401 | 401 | "İcazə rədd edildi. Yenidən giriş edin" |
| 403 | 403 | "Bu əməliyyat üçün icazəniz yoxdur" |
| 404 | 404 | "Mövzular tapılmadı" |
| 500+ | 500+ | "Server xətası. Daha sonra cəhd edin" |

### Error Handling Nümunəsi

```typescript
try {
  const subjects = await fetchSchoolSubjects();
  setSchoolSubjects(subjects);
} catch (error) {
  if (error instanceof Error) {
    // İstifadəçiyə göstər
    showErrorMessage(error.message);
    
    // Log et (monitoring üçün)
    console.error('API Error:', error);
    
    // Analytics-ə göndər (əgər varsa)
    trackError('school_subjects_fetch_failed', error);
  }
}
```

---

## Cache Mexanizmi

### Cache Konfiqurasiyası

```typescript
const CACHE_DURATION = 30 * 60 * 1000; // 30 dəqiqə
```

### Cache Funksiyaları

```typescript
// Cache-dən oxumaq
const cached = getCachedSubjects();

// Cache-ə yazmaq
setCachedSubjects(subjects);

// Cache-i təmizləmək
clearSubjectsCache();
```

### Cache Strategiyası

1. **İlk Yükləmə:** API-dan çəkilir və cache-lənir
2. **Sonrakı Yükləmələr:** Cache-dən oxunur (30 dəq içində)
3. **Cache Köhnəlirsə:** Avtomatik yenidən API-dan çəkilir
4. **Manual Refresh:** İstifadəçi "yenilə" düyməsinə basarsa

---

## Testing

### API Mock Data

Test üçün mock data:

```typescript
const mockSubjects: SchoolSubject[] = [
  {
    id: 'test-1',
    name: 'Test Mövzu 1',
    is_demo: true,
    progress: 50,
    children: []
  },
  {
    id: 'test-2',
    name: 'Test Mövzu 2',
    parent: 'test-1',
    is_demo: false,
    progress: 0,
    children: []
  }
];
```

### Unit Test Nümunəsi

```typescript
import { buildSubjectHierarchy, flattenSubjectHierarchy } from './api';

test('should build hierarchy correctly', () => {
  const flat = [
    { id: '1', name: 'Parent', children: [] },
    { id: '2', name: 'Child', parent: '1', children: [] }
  ];
  
  const hierarchy = buildSubjectHierarchy(flat);
  
  expect(hierarchy.length).toBe(1);
  expect(hierarchy[0].children?.length).toBe(1);
  expect(hierarchy[0].children?.[0].id).toBe('2');
});

test('should flatten hierarchy correctly', () => {
  const hierarchy = [
    {
      id: '1',
      name: 'Parent',
      children: [
        { id: '2', name: 'Child', children: [] }
      ]
    }
  ];
  
  const flat = flattenSubjectHierarchy(hierarchy);
  
  expect(flat.length).toBe(2);
  expect(flat[0].id).toBe('1');
  expect(flat[1].id).toBe('2');
});
```

---

## 🔧 Troubleshooting

### Problem: API cavab vermir

**Həll:**
1. Network bağlantısını yoxlayın
2. API URL-in düzgün olduğunu yoxlayın (.env)
3. CORS konfiqurasiyasını yoxlayın (server-side)
4. Token-in valid olduğunu yoxlayın

### Problem: Mövzular göstərilmir

**Həll:**
1. Console-da error yoxlayın
2. API response formatını yoxlayın
3. Cache-i təmizləyin: `clearSubjectsCache()`
4. Browser cache-i təmizləyin

### Problem: Performance problemi

**Həll:**
1. Cache duration-ı artırın
2. Pagination tətbiq edin
3. Virtual scrolling istifadə edin (çox data varsa)
4. API response-u optimize edin (lazımsız fieldləri silmək)

---

## 📞 Dəstək

API ilə bağlı suallarınız varsa:
- GitHub Issues: [Link]
- Email: support@example.com
- Documentation: [Link]

---

## 📝 Changelog

### v1.0.0 (2025-10-04)
- ✅ İlk release
- ✅ SchoolSubject API inteqrasiyası
- ✅ Cache mexanizmi
- ✅ Error handling
- ✅ Security measures
- ✅ Təhlükəsizlik və performans optimizasiyaları

---

**Müəllif:** Background Agent  
**Tarix:** 2025-10-04  
**Versiya:** 1.0.0
