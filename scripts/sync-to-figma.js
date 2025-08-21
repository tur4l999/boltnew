#!/usr/bin/env node

/**
 * DDA.az Design Token Sync Script
 * Bu skript design tokenləri Figma ilə sinxronlaşdırır
 */

const fs = require('fs');
const path = require('path');

// Design tokens faylını oxu
const tokensPath = path.join(__dirname, '../design/tokens.json');
const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

// Figma API konfiqurasiyası
const FIGMA_API_TOKEN = process.env.FIGMA_API_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;

if (!FIGMA_API_TOKEN || !FIGMA_FILE_KEY) {
  console.error('❌ FIGMA_API_TOKEN və FIGMA_FILE_KEY environment variables lazımdır');
  process.exit(1);
}

// Figma API client
class FigmaAPI {
  constructor(token) {
    this.token = token;
    this.baseURL = 'https://api.figma.com/v1';
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'X-Figma-Token': this.token,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Rəng stillərini yarat
  async createColorStyles(fileKey, colors) {
    const styles = [];
    
    Object.entries(colors).forEach(([colorName, shades]) => {
      if (typeof shades === 'object') {
        Object.entries(shades).forEach(([shade, hex]) => {
          styles.push({
            name: `Colors/${colorName}/${shade}`,
            styleType: 'FILL',
            fills: [{
              type: 'SOLID',
              color: this.hexToRgb(hex)
            }]
          });
        });
      }
    });

    return this.request(`/files/${fileKey}/styles`, {
      method: 'POST',
      body: JSON.stringify({ styles })
    });
  }

  // Typography stillərini yarat
  async createTextStyles(fileKey, typography) {
    const styles = [];
    
    Object.entries(typography.fontSize).forEach(([size, value]) => {
      styles.push({
        name: `Typography/${size}`,
        styleType: 'TEXT',
        fontSize: parseInt(value),
        fontName: {
          family: typography.fontFamily.primary.split(',')[0].trim(),
          style: 'Regular'
        }
      });
    });

    return this.request(`/files/${fileKey}/styles`, {
      method: 'POST',
      body: JSON.stringify({ styles })
    });
  }

  // Hex rəngi RGB-yə çevir
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255
    } : { r: 0, g: 0, b: 0 };
  }
}

// Komponent metadata yaradıcısı
class ComponentGenerator {
  constructor(tokens) {
    this.tokens = tokens;
  }

  // Komponent strukturunu yarat
  generateComponents() {
    return {
      // Button komponenti
      Button: {
        name: 'Button',
        variants: [
          { name: 'Primary', props: { variant: 'primary', size: 'md' } },
          { name: 'Secondary', props: { variant: 'secondary', size: 'md' } },
          { name: 'Small', props: { variant: 'primary', size: 'sm' } },
          { name: 'Large', props: { variant: 'primary', size: 'lg' } }
        ],
        styles: {
          borderRadius: this.tokens.borderRadius.lg,
          padding: `${this.tokens.spacing.md}px ${this.tokens.spacing.lg}px`,
          fontSize: this.tokens.typography.fontSize.sm
        }
      },

      // Card komponenti
      Card: {
        name: 'Card',
        variants: [
          { name: 'Default', props: {} },
          { name: 'Elevated', props: { shadow: 'lg' } }
        ],
        styles: {
          borderRadius: this.tokens.borderRadius.xl,
          padding: this.tokens.spacing.lg,
          backgroundColor: this.tokens.colors.semantic.surface,
          boxShadow: this.tokens.shadows.sm
        }
      },

      // Header komponenti
      Header: {
        name: 'Header',
        variants: [
          { name: 'Default', props: {} },
          { name: 'With Back Button', props: { showBack: true } }
        ],
        styles: {
          height: '60px',
          padding: `0 ${this.tokens.spacing.lg}px`,
          backgroundColor: this.tokens.colors.semantic.surface,
          borderBottom: `1px solid ${this.tokens.colors.semantic.border}`
        }
      }
    };
  }

  // Ekran layoutlarını yarat
  generateScreens() {
    return [
      {
        name: 'Login',
        width: 375,
        height: 812,
        components: ['Logo', 'LoginForm', 'SocialButtons'],
        layout: 'vertical'
      },
      {
        name: 'Home',
        width: 375,
        height: 812,
        components: ['Header', 'ProgressCard', 'ActionGrid', 'TabBar'],
        layout: 'vertical'
      },
      {
        name: 'Topics',
        width: 375,
        height: 812,
        components: ['Header', 'SearchBar', 'ModuleList', 'TabBar'],
        layout: 'vertical'
      },
      {
        name: 'Lesson',
        width: 375,
        height: 812,
        components: ['Header', 'VideoPlayer', 'TabNavigation', 'Content'],
        layout: 'vertical'
      },
      {
        name: 'Exam',
        width: 375,
        height: 812,
        components: ['Timer', 'QuestionCard', 'AnswerOptions', 'Navigation'],
        layout: 'vertical'
      }
    ];
  }
}

// Əsas sinxronlaşdırma funksiyası
async function syncToFigma() {
  console.log('🚀 DDA.az → Figma sinxronlaşdırması başlayır...');
  
  try {
    const figma = new FigmaAPI(FIGMA_API_TOKEN);
    const generator = new ComponentGenerator(tokens);

    // 1. Rəng stillərini yarat
    console.log('🎨 Rəng stilləri yaradılır...');
    await figma.createColorStyles(FIGMA_FILE_KEY, tokens.colors);
    console.log('✅ Rəng stilləri yaradıldı');

    // 2. Typography stillərini yarat
    console.log('📝 Typography stilləri yaradılır...');
    await figma.createTextStyles(FIGMA_FILE_KEY, tokens.typography);
    console.log('✅ Typography stilləri yaradıldı');

    // 3. Komponentləri yarat
    console.log('🧩 Komponentlər yaradılır...');
    const components = generator.generateComponents();
    console.log(`✅ ${Object.keys(components).length} komponent hazırlandı`);

    // 4. Ekranları yarat
    console.log('📱 Ekranlar yaradılır...');
    const screens = generator.generateScreens();
    console.log(`✅ ${screens.length} ekran hazırlandı`);

    // 5. Metadata faylını yarat
    const metadata = {
      timestamp: new Date().toISOString(),
      tokens: tokens,
      components: components,
      screens: screens,
      figmaFileKey: FIGMA_FILE_KEY
    };

    fs.writeFileSync(
      path.join(__dirname, '../figma-export.json'),
      JSON.stringify(metadata, null, 2)
    );

    console.log('🎉 Sinxronlaşdırma tamamlandı!');
    console.log(`📁 Metadata: figma-export.json`);
    console.log(`🔗 Figma: https://figma.com/file/${FIGMA_FILE_KEY}`);

  } catch (error) {
    console.error('❌ Xəta:', error.message);
    process.exit(1);
  }
}

// Skripti işə sal
if (require.main === module) {
  syncToFigma();
}

module.exports = { syncToFigma, FigmaAPI, ComponentGenerator };