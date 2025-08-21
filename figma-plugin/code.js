// DDA.az Figma Plugin - Sadə Versiya
figma.showUI(__html__, { width: 400, height: 600 });

// Plugin data - bu məlumatlar koddan gəlir
const designData = {
  colors: {
    primary: {
      50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 300: "#86efac", 400: "#4ade80",
      500: "#22c55e", 600: "#16a34a", 700: "#15803d", 800: "#166534", 900: "#14532d"
    },
    gray: {
      50: "#f9fafb", 100: "#f3f4f6", 200: "#e5e7eb", 300: "#d1d5db", 400: "#9ca3af",
      500: "#6b7280", 600: "#4b5563", 700: "#374151", 800: "#1f2937", 900: "#111827"
    }
  },
  typography: {
    h1: { size: 24, weight: 700 },
    h2: { size: 20, weight: 600 },
    h3: { size: 18, weight: 600 },
    body: { size: 16, weight: 400 },
    small: { size: 14, weight: 400 },
    caption: { size: 12, weight: 400 }
  },
  screens: [
    { name: "Login", width: 375, height: 812 },
    { name: "Home", width: 375, height: 812 },
    { name: "Topics", width: 375, height: 812 },
    { name: "Lesson", width: 375, height: 812 },
    { name: "Exam", width: 375, height: 812 },
    { name: "Store", width: 375, height: 812 }
  ]
};

// Rəng stilləri yarat
function createColorStyles() {
  console.log('🎨 Rəng stilləri yaradılır...');
  
  Object.entries(designData.colors).forEach(([colorName, shades]) => {
    Object.entries(shades).forEach(([shade, hex]) => {
      try {
        const style = figma.createPaintStyle();
        style.name = `Colors/${colorName}/${shade}`;
        style.paints = [{
          type: 'SOLID',
          color: hexToRgb(hex)
        }];
        console.log(`✅ Yaradıldı: ${style.name}`);
      } catch (error) {
        console.log(`❌ Xəta: ${colorName}/${shade} - ${error.message}`);
      }
    });
  });
}

// Text stilləri yarat
function createTextStyles() {
  console.log('📝 Text stilləri yaradılır...');
  
  Object.entries(designData.typography).forEach(([name, props]) => {
    try {
      const style = figma.createTextStyle();
      style.name = `Typography/${name}`;
      style.fontSize = props.size;
      style.fontName = { family: "Inter", style: "Regular" };
      console.log(`✅ Yaradıldı: ${style.name}`);
    } catch (error) {
      console.log(`❌ Xəta: ${name} - ${error.message}`);
    }
  });
}

// Ekran frame-ləri yarat
function createScreenFrames() {
  console.log('📱 Ekranlar yaradılır...');
  
  designData.screens.forEach((screen, index) => {
    try {
      const frame = figma.createFrame();
      frame.name = screen.name;
      frame.resize(screen.width, screen.height);
      frame.x = index * (screen.width + 50);
      frame.y = 0;
      
      // Background
      frame.fills = [{
        type: 'SOLID',
        color: { r: 0.98, g: 0.98, b: 0.98 }
      }];
      
      figma.currentPage.appendChild(frame);
      console.log(`✅ Yaradıldı: ${screen.name}`);
    } catch (error) {
      console.log(`❌ Xəta: ${screen.name} - ${error.message}`);
    }
  });
}

// Hex-i RGB-yə çevir
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : { r: 0, g: 0, b: 0 };
}

// UI mesajları
figma.ui.onmessage = msg => {
  console.log('📨 Mesaj alındı:', msg.type);
  
  if (msg.type === 'create-colors') {
    createColorStyles();
    figma.notify('🎨 Rəng stilləri yaradıldı!');
  }
  
  if (msg.type === 'create-typography') {
    createTextStyles();
    figma.notify('📝 Text stilləri yaradıldı!');
  }
  
  if (msg.type === 'create-screens') {
    createScreenFrames();
    figma.notify('📱 Ekranlar yaradıldı!');
  }
  
  if (msg.type === 'create-all') {
    createColorStyles();
    setTimeout(() => createTextStyles(), 1000);
    setTimeout(() => createScreenFrames(), 2000);
    figma.notify('🚀 Hər şey yaradıldı!');
  }
  
  if (msg.type === 'close') {
    figma.closePlugin();
  }
};

console.log('🚀 DDA.az Figma Plugin hazır!');