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
  console.error('[ERROR] FIGMA_API_TOKEN və FIGMA_FILE_KEY environment variables lazımdır');
  console.log('');
  console.log('[SETUP] Quraşdırma:');
  console.log('1. Figma → Settings → Personal Access Tokens');
  console.log('2. Token yaradın və .env faylına əlavə edin');
  console.log('3. Figma faylının URL-indən key götürün');
  console.log('');
  process.exit(1);
}

// Figma API client (native fetch istifadə edərək)
class FigmaAPI {
  constructor(token) {
    this.token = token;
    this.baseURL = 'https://api.figma.com/v1';
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
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
    } catch (error) {
      console.error('[ERROR] Figma API xətası:', error.message);
      throw error;
    }
  }

  // Fayl məlumatlarını al
  async getFile(fileKey) {
    return this.request(`/files/${fileKey}`);
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

  // Design system strukturunu yarat
  generateDesignSystem() {
    return {
      colors: this.generateColorSystem(),
      typography: this.generateTypographySystem(),
      spacing: this.generateSpacingSystem(),
      components: this.generateComponents(),
      screens: this.generateScreens()
    };
  }

  generateColorSystem() {
    const colorSystem = {};
    
    Object.entries(this.tokens.colors).forEach(([colorName, shades]) => {
      if (typeof shades === 'object' && shades !== null) {
        colorSystem[colorName] = {};
        Object.entries(shades).forEach(([shade, hex]) => {
          colorSystem[colorName][shade] = {
            name: `Colors/${colorName}/${shade}`,
            value: hex,
            type: 'color'
          };
        });
      }
    });

    return colorSystem;
  }

  generateTypographySystem() {
    const typography = {};
    
    Object.entries(this.tokens.typography.fontSize).forEach(([size, value]) => {
      typography[size] = {
        name: `Typography/${size}`,
        fontSize: parseInt(value),
        fontFamily: this.tokens.typography.fontFamily.primary,
        type: 'text'
      };
    });

    return typography;
  }

  generateSpacingSystem() {
    const spacing = {};
    
    Object.entries(this.tokens.spacing).forEach(([size, value]) => {
      spacing[size] = {
        name: `Spacing/${size}`,
        value: `${value}px`,
        type: 'spacing'
      };
    });

    return spacing;
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
          fontSize: this.tokens.typography.fontSize.sm,
          minHeight: '44px'
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
      },

      // TabBar komponenti
      TabBar: {
        name: 'TabBar',
        variants: [
          { name: 'Default', props: {} }
        ],
        styles: {
          height: '80px',
          backgroundColor: this.tokens.colors.semantic.surface,
          borderTop: `1px solid ${this.tokens.colors.semantic.border}`
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
        layout: 'vertical',
        description: 'User authentication screen'
      },
      {
        name: 'Home',
        width: 375,
        height: 812,
        components: ['Header', 'ProgressCard', 'ActionGrid', 'TabBar'],
        layout: 'vertical',
        description: 'Main dashboard with user progress'
      },
      {
        name: 'Topics',
        width: 375,
        height: 812,
        components: ['Header', 'SearchBar', 'ModuleList', 'TabBar'],
        layout: 'vertical',
        description: 'Learning topics and modules'
      },
      {
        name: 'Lesson',
        width: 375,
        height: 812,
        components: ['Header', 'VideoPlayer', 'TabNavigation', 'Content'],
        layout: 'vertical',
        description: 'Video lesson with materials'
      },
      {
        name: 'Exam',
        width: 375,
        height: 812,
        components: ['Timer', 'QuestionCard', 'AnswerOptions', 'Navigation'],
        layout: 'vertical',
        description: 'Exam simulation interface'
      },
      {
        name: 'Store',
        width: 375,
        height: 812,
        components: ['Header', 'ProductGrid', 'PaymentMethods', 'TabBar'],
        layout: 'vertical',
        description: 'Digital store for books and materials'
      }
    ];
  }
}

// Əsas sinxronlaşdırma funksiyası
async function syncToFigma() {
  console.log('[START] DDA.az -> Figma sinxronlaşdırması başlayır...');
  
  try {
    const figma = new FigmaAPI(FIGMA_API_TOKEN);
    const generator = new ComponentGenerator(tokens);

    // 1. Figma faylını yoxla
    console.log('[INFO] Figma faylı yoxlanılır...');
    const fileData = await figma.getFile(FIGMA_FILE_KEY);
    console.log(`[SUCCESS] Fayl tapıldı: ${fileData.name}`);

    // 2. Design system yarat
    console.log('[DESIGN] Design system yaradılır...');
    const designSystem = generator.generateDesignSystem();
    console.log('[SUCCESS] Design system hazırlandı');

    // 3. Metadata faylını yarat
    const metadata = {
      timestamp: new Date().toISOString(),
      figmaFile: {
        key: FIGMA_FILE_KEY,
        name: fileData.name,
        url: `https://figma.com/file/${FIGMA_FILE_KEY}`
      },
      designSystem: designSystem,
      stats: {
        colors: Object.keys(designSystem.colors).length,
        typography: Object.keys(designSystem.typography).length,
        components: Object.keys(designSystem.components).length,
        screens: designSystem.screens.length
      }
    };

    // 4. Export faylını yarat
    const exportPath = path.join(__dirname, '../figma-export.json');
    fs.writeFileSync(exportPath, JSON.stringify(metadata, null, 2));

    console.log('');
    console.log('[COMPLETE] Sinxronlaşdırma tamamlandı!');
    console.log('');
    console.log('[STATS] Statistika:');
    console.log(`   [COLORS] Rənglər: ${metadata.stats.colors}`);
    console.log(`   [TYPOGRAPHY] Typography: ${metadata.stats.typography}`);
    console.log(`   [COMPONENTS] Komponentlər: ${metadata.stats.components}`);
    console.log(`   [SCREENS] Ekranlar: ${metadata.stats.screens}`);
    console.log('');
    console.log('[FILES] Fayllar:');
    console.log(`   [FILE] Metadata: figma-export.json`);
    console.log(`   [LINK] Figma: ${metadata.figmaFile.url}`);
    console.log('');
    console.log('[NEXT] Növbəti addım: Figma plugin istifadə edin');

  } catch (error) {
    console.error('[ERROR] Xəta:', error.message);
    
    if (error.message.includes('401')) {
      console.log('[HINT] Həll: Figma token-ini yoxlayın');
    } else if (error.message.includes('404')) {
      console.log('[HINT] Həll: Figma file key-ini yoxlayın');
    }
    
    process.exit(1);
  }
}

// Skripti işə sal
if (require.main === module) {
  syncToFigma();
}

module.exports = { syncToFigma, FigmaAPI, ComponentGenerator };