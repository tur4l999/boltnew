#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Read design tokens
function readTokens() {
  try {
    const tokensPath = path.join(__dirname, '../design/tokens.json');
    return JSON.parse(fs.readFileSync(tokensPath, 'utf8'));
  } catch (error) {
    console.error('Error reading tokens.json:', error.message);
    process.exit(1);
  }
}

// Generate CSS from tokens
function generateCSS(tokens) {
  let css = '/* Design Tokens - Web CSS Variables */\n:root {\n';
  
  // Colors
  Object.entries(tokens.colors).forEach(([colorName, colorValue]) => {
    if (typeof colorValue === 'object' && colorValue !== null) {
      Object.entries(colorValue).forEach(([shade, value]) => {
        if (typeof value === 'string') {
          css += `  --color-${colorName}-${shade}: ${value};\n`;
        } else if (typeof value === 'object') {
          Object.entries(value).forEach(([subKey, subValue]) => {
            css += `  --color-${colorName}-${shade}-${subKey}: ${subValue};\n`;
          });
        }
      });
    } else {
      css += `  --color-${colorName}: ${colorValue};\n`;
    }
  });
  
  // Spacing
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    css += `  --spacing-${key}: ${value};\n`;
  });
  
  // Typography
  Object.entries(tokens.typography).forEach(([category, values]) => {
    Object.entries(values).forEach(([key, value]) => {
      css += `  --${category.replace('F', '-f')}-${key}: ${value};\n`;
    });
  });
  
  // Border Radius
  Object.entries(tokens.borderRadius).forEach(([key, value]) => {
    css += `  --border-radius-${key}: ${value};\n`;
  });
  
  // Shadows
  Object.entries(tokens.shadows).forEach(([key, value]) => {
    css += `  --shadow-${key}: ${value};\n`;
  });
  
  // Breakpoints
  Object.entries(tokens.breakpoints).forEach(([key, value]) => {
    css += `  --breakpoint-${key}: ${value};\n`;
  });
  
  css += '}\n\n';
  
  // Add utility classes
  css += `/* Utility Classes */
.text-primary { color: var(--color-semantic-text-primary); }
.text-secondary { color: var(--color-semantic-text-secondary); }
.text-muted { color: var(--color-semantic-text-muted); }
.bg-surface { background-color: var(--color-semantic-surface); }
.bg-background { background-color: var(--color-semantic-background); }
.border-default { border-color: var(--color-semantic-border); }
.rounded-md { border-radius: var(--border-radius-md); }
.rounded-lg { border-radius: var(--border-radius-lg); }
.rounded-xl { border-radius: var(--border-radius-xl); }
.shadow-sm { box-shadow: var(--shadow-sm); }
.shadow-md { box-shadow: var(--shadow-md); }
.shadow-lg { box-shadow: var(--shadow-lg); }`;
  
  return css;
}

// Generate React Native theme
function generateRNTheme(tokens) {
  const theme = {
    colors: tokens.colors,
    spacing: Object.fromEntries(
      Object.entries(tokens.spacing).map(([key, value]) => [
        key,
        parseInt(value.replace('px', ''))
      ])
    ),
    typography: {
      ...tokens.typography,
      fontSize: Object.fromEntries(
        Object.entries(tokens.typography.fontSize).map(([key, value]) => [
          key,
          parseInt(value.replace('px', ''))
        ])
      )
    },
    borderRadius: Object.fromEntries(
      Object.entries(tokens.borderRadius).map(([key, value]) => [
        key,
        value === '9999px' ? 9999 : parseInt(value.replace('px', ''))
      ])
    ),
    shadows: {
      sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      },
      md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
      },
      lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 6,
      },
      xl: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.1,
        shadowRadius: 25,
        elevation: 10,
      },
    },
    breakpoints: Object.fromEntries(
      Object.entries(tokens.breakpoints).map(([key, value]) => [
        key,
        parseInt(value.replace('px', ''))
      ])
    ),
  };
  
  return `// Design Tokens - React Native Theme
export const theme = ${JSON.stringify(theme, null, 2)} as const;

export type Theme = typeof theme;
export type ColorScale = keyof typeof theme.colors.primary;
export type SpacingScale = keyof typeof theme.spacing;
export type FontSize = keyof typeof theme.typography.fontSize;`;
}

// Create handoff package
async function createHandoffPackage() {
  console.log('🎨 Creating design handoff package...');
  
  const tokens = readTokens();
  
  // Generate files
  const css = generateCSS(tokens);
  const rnTheme = generateRNTheme(tokens);
  
  // Write generated files
  fs.writeFileSync(path.join(__dirname, '../design/styles.css'), css);
  fs.writeFileSync(path.join(__dirname, '../src/theme.ts'), rnTheme);
  
  // Create README
  const readme = `# Design Handoff Package

Bu paket layihənin design tokenləri və komponentlərini ehtiva edir.

## 📁 Struktur

- \`design/tokens.json\` - Əsas design tokenləri
- \`design/styles.css\` - Web üçün CSS dəyişənləri
- \`design/screens.csv\` - Ekranlar siyahısı
- \`design/components.csv\` - Komponentlər siyahısı
- \`design/assets.manifest.json\` - Asset siyahısı
- \`src/theme.ts\` - React Native üçün theme obyekti

## 🌐 Web İstifadəsi

\`\`\`css
/* CSS faylınıza import edin */
@import './design/styles.css';

/* CSS dəyişənlərini istifadə edin */
.my-component {
  background-color: var(--color-primary-500);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
}
\`\`\`

## 📱 React Native İstifadəsi

\`\`\`typescript
import { theme } from './src/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary[500],
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
});
\`\`\`

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

Bu fayllar avtomatik yaradılır. Dəyişiklik etmək üçün \`design/tokens.json\` faylını redaktə edin və \`npm run handoff\` əmrini işə salın.
`;
  
  fs.writeFileSync(path.join(__dirname, '../README.md'), readme);
  
  // Create ZIP package
  const output = fs.createWriteStream(path.join(__dirname, '../handoff.zip'));
  const archive = archiver('zip', { zlib: { level: 9 } });
  
  output.on('close', () => {
    console.log(`✅ Handoff package created: ${archive.pointer()} bytes`);
    console.log('📦 handoff.zip hazırdır!');
  });
  
  archive.on('error', (err) => {
    throw err;
  });
  
  archive.pipe(output);
  
  // Add files to archive
  archive.directory('design/', 'design/');
  archive.directory('assets/', 'assets/');
  archive.file('src/theme.ts', { name: 'src/theme.ts' });
  archive.file('README.md', { name: 'README.md' });
  
  archive.finalize();
}

// Run if called directly
if (require.main === module) {
  createHandoffPackage().catch(console.error);
}

module.exports = { createHandoffPackage };