# Cərimələr Video Quraşdırılması

Bu faylda cərimələr bölməsi üçün video əlavə etmək qaydaları izah edilir.

## Video Qovluq Strukturu

Videolar `/public/videos/penalties/` qovluğunda yerləşdirilməlidir:

```
public/
  videos/
    penalties/
      road-signs-1.mp4
      road-signs-2.mp4
      vehicle-placement-1.mp4
      distance-rules-1.mp4
      distance-rules-2.mp4
      distance-rules-3.mp4
      towing-1.mp4
      cargo-transport-1.mp4
      cargo-transport-2.mp4
      driving-training-1.mp4
      residential-zone-1.mp4
```

## Video Əlavə Etmək

### 1. Videolar hazır olduqda:

1. Video fayllarını `/public/videos/penalties/` qovluğuna əlavə edin
2. `src/lib/videoLoader.ts` faylında `VIDEO_CONFIGS` massivini yeniləyin

### 2. Video konfiqurasiyasını yeniləmək:

`src/lib/videoLoader.ts` faylında:

```typescript
export const VIDEO_CONFIGS: VideoConfig[] = [
  {
    subTopicId: 'road-signs-violation',
    videoFiles: [
      'actual-video-name-1.mp4',  // Həqiqi video adları
      'actual-video-name-2.mp4'
    ]
  },
  // Digər konfiqurasiyalar...
];
```

### 3. Alt mövzular:

Hazırda mövcud alt mövzular:

- `road-signs-violation` - Yol nişanlarının tələblərinə riayət edilməməsi
- `vehicle-placement` - NV-nin yolların hərəkət hissələrində yerləşdirilməsi  
- `distance-rules` - Araməsafəsi
- `towing` - Yedəyə alma
- `cargo-transport` - Yük daşıma
- `driving-training` - Sürmə təlimi keçmə qaydalarının pozulması
- `residential-zone` - Yaşayış zonasında hərəkət etmə qaydalarının pozulması

### 4. Yeni alt mövzu əlavə etmək:

1. `src/lib/penalties.ts` faylında `AZ_PENALTIES` massivindəki penalty-nin `subTopics` siyahısına əlavə edin
2. `src/lib/videoLoader.ts` faylında `VIDEO_CONFIGS` massivina yeni konfiqurasiya əlavə edin

## Xüsusiyyətlər

- ✅ Hər alt mövzu üçün çoxlu video dəstəyi
- ✅ Video olmadıqda "tezliklə əlavə ediləcək" mesajı
- ✅ Video sayğacı (1/3, 2/3, vs.)
- ✅ Swipe ilə video dəyişdirmə
- ✅ Responsiv və gözəl UI
- ✅ Dark/Light mode dəstəyi
- ✅ Axtarış funksiyası

## Test etmək

Development server çalışdırın:
```bash
npm run dev
```

Cərimələr bölməsinə keçin və İXM 327.1 maddəsini açın.