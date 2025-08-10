# Design Handoff Package

Bu paket layihənin design tokenləri və komponentlərini ehtiva edir.

## 📁 Struktur

- `design/tokens.json` - Əsas design tokenləri
- `design/styles.css` - Web üçün CSS dəyişənləri
- `design/screens.csv` - Ekranlar siyahısı
- `design/components.csv` - Komponentlər siyahısı
- `design/assets.manifest.json` - Asset siyahısı
- `src/theme.ts` - React Native üçün theme obyekti

## 🌐 Web İstifadəsi

```css
/* CSS faylınıza import edin */
@import './design/styles.css';

/* CSS dəyişənlərini istifadə edin */
.my-component {
  background-color: var(--color-primary-500);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
}
```

## 📱 React Native İstifadəsi

```typescript
import { theme } from './src/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary[500],
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
});
```

## 🎨 Rəng Sistemi

- **Primary**: Əsas brand rəngləri
- **Gray**: Neytral rənglər
- **Emerald**: Müsbət aksiyalar
- **Red**: Xəta və xəbərdarlıq
- **Semantic**: Kontekstual rənglər

## 📏 Spacing Sistemi

8px əsaslı spacing sistemi:
- xs: 4px, sm: 8px, md: 12px, lg: 16px, xl: 20px

## 🔤 Typography

- Font ölçüləri: xs (12px) - 4xl (36px)
- Font çəkiləri: normal, medium, semibold, bold, black
- Line height: tight (1.2), normal (1.5), relaxed (1.75)

## 📱 Responsive

- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+

---

Bu fayllar avtomatik yaradılır. Dəyişiklik etmək üçün `design/tokens.json` faylını redaktə edin və `npm run handoff` əmrini işə salın.