# 🛡️ Təhlükəsizlik Tədbirləri - Sual-Cavab Sistemi

## 🎯 Məqsəd
Zərərli faylların və məzmunun qarşısını almaq üçün hərtərəfli təhlükəsizlik sistemi.

## 🔒 Tətbiq Edilən Təhlükəsizlik Tədbirləri

### 1. 📂 **Fayl Növü Validasiyası**

#### ✅ **İcazə Verilən Formatlar:**
- `image/jpeg` (.jpg, .jpeg)
- `image/png` (.png)
- `image/gif` (.gif)
- `image/webp` (.webp)

#### ❌ **Bloklanmış Təhlükəli Formatlar:**
```
.exe, .bat, .cmd, .scr, .pif, .com, .vbs, .js, .jar
.app, .deb, .dmg, .pkg, .rpm, .msi, .apk, .ipa
.php, .asp, .jsp, .cgi, .py, .rb, .pl, .sh, .ps1
.html, .htm, .svg, .xml, .swf, .dll, .sys, .bin
```

### 2. 🔍 **Magic Number Yoxlanışı**
Həqiqi fayl header-lərinin yoxlanılması:
- **JPEG**: `FF D8 FF`
- **PNG**: `89 50 4E 47`
- **GIF**: `47 49 46`
- **WebP**: `52 49 46 46`

### 3. 📏 **Ölçü Məhdudiyyətləri**
- **Maksimum**: 2MB (2,097,152 bayt)
- **Minimum**: 100 bayt (0 bayt faylları bloklanır)
- **Say limiti**: Maksimum 3 şəkil

### 4. 🧹 **Fayl Adı Təmizləməsi**
```typescript
const sanitizeFilename = (filename: string): string => {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_') // Xüsusi simvolları əvəz et
    .replace(/_{2,}/g, '_')           // Çoxlu alt xəttləri sil
    .substring(0, 50)                 // Uzunluğu məhdudlaşdır
    .toLowerCase();                   // Kiçik hərflərə çevir
};
```

### 5. 🕵️ **Şübhəli Məzmun Axtarışı**

#### Fayl Adında Şübhəli Pattern-lər:
```regex
/\.exe\./i, /\.bat\./i, /\.cmd\./i, /\.scr\./i
/script/i, /javascript/i, /vbscript/i, /onload/i, /onclick/i
/<script/i, /<?php/i, /<%/i, /\$\{/i, /#{/i
```

#### Fayl Məzmununda Axtarılan Təhlükəli Kodlar:
```
<script, <?php, <%, javascript:, vbscript:
data:text/html, data:application, eval(, document.write
```

### 6. 💬 **Mesaj Təmizləməsi**
Göndərilən mesajlarda:
```typescript
.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '[SCRIPT REMOVED]')
.replace(/javascript:/gi, '[JS REMOVED]')
.replace(/vbscript:/gi, '[VBS REMOVED]')
.replace(/data:text\/html/gi, '[HTML REMOVED]')
.substring(0, 1000) // Mesaj uzunluğu limiti
```

### 7. 🔄 **Çoxlu Validasiya Qatları**

#### **Qat 1**: Brauzer Level
- HTML `accept` atributu
- MIME type yoxlanışı

#### **Qat 2**: JavaScript Level  
- File extension yoxlanışı
- MIME və extension uyğunluğu
- Size və count limitləri

#### **Qat 3**: Binary Level
- File header (magic number) yoxlanışı
- Məzmun skanı
- Embedded script axtarışı

#### **Qat 4**: Advanced Security
- Duplicate detection
- Memory leak prevention
- Filename sanitization

### 8. ⚠️ **Xəta Idarəetməsi**

#### Təhlükəsizlik Xətaları:
```
🛡️ TƏHLÜKƏSIZLIK XƏBƏRDARLIGI

Aşağıdakı fayllar bloklandı:
• file.exe: Təhlükəli fayl növü bloklandı
• image.jpg.exe: Çoxlu uzantılı fayl qəbul edilmir
• script.png: Şübhəli fayl adı bloklandı

⚠️ Təhlükəsizlik üçün yalnız yoxlanılmış şəkil faylları qəbul edilir.
```

### 9. 🧼 **Memory Management**
```typescript
// Object URL təmizləməsi
onLoad={(e) => {
  setTimeout(() => URL.revokeObjectURL(e.currentTarget.src), 1000);
}}

// File input təmizləməsi
onClick={(e) => {
  e.currentTarget.value = '';
}}
```

## 🔐 **Təhlükəsizlik Səviyyələri**

### 🟢 **Minimal Risk** - İcazə verilir:
- Standart şəkil formatları
- Kiçik ölçülü fayllar
- Təmiz fayl adları
- Valid header-lər

### 🟡 **Orta Risk** - Xəbərdarlıq:
- Böyük fayllar (1-2MB)
- Uzun fayl adları
- Qeyri-standart extension-lar

### 🔴 **Yüksək Risk** - Bloklanır:
- Executable fayllar
- Script məzmunu
- Çoxlu extension-lar
- Şübhəli pattern-lər
- Invalid header-lər

## 📊 **Performans və Təhlükəsizlik Balansı**

### ⚡ **Optimizasiya:**
- Yalnız ilk 1KB oxunur header yoxlanışı üçün
- Async validation
- Memory efficient preview
- Automatic cleanup

### 🛡️ **Təhlükəsizlik:**
- Multi-layer validation
- Real-time scanning
- Comprehensive blocking
- User feedback

## 🚨 **Təcili Hallar**

### Şübhəli Fayl Aşkarlandıqda:
1. ❌ Fayl dərhal bloklanır
2. ⚠️ İstifadəçiyə xəbərdarlıq göstərilir
3. 🧹 File input təmizlənir
4. 📝 Console-da log qeyd edilir

### Təhlükəli Məzmun Aşkarlandıqda:
1. 🧹 Məzmun avtomatik təmizlənir
2. ⚠️ İstifadəçi məlumatlandırılır
3. ✅ Təmiz versiya göndərilir

## 🎯 **Nəticə**

Bu təhlükəsizlik sistemi:
- ✅ **Comprehensive** - Bütün attack vektorları əhatə edir
- ✅ **User-Friendly** - Aydın xəta mesajları
- ✅ **Performance** - Sürətli və efficient
- ✅ **Scalable** - Gələcək genişlənmələr üçün hazır

**Sistem production-level təhlükəsizlik standartlarına cavab verir!** 🛡️✨