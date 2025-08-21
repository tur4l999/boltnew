// DDA.az Figma Plugin - Tam Versiya (Bütün Səhifələr)
figma.showUI(__html__, { width: 450, height: 700 });

// Tam design data - bütün səhifələr və vəziyyətlər
const designData = {
  colors: {
    primary: {
      50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 300: "#86efac", 400: "#4ade80",
      500: "#22c55e", 600: "#16a34a", 700: "#15803d", 800: "#166534", 900: "#14532d"
    },
    gray: {
      50: "#f9fafb", 100: "#f3f4f6", 200: "#e5e7eb", 300: "#d1d5db", 400: "#9ca3af",
      500: "#6b7280", 600: "#4b5563", 700: "#374151", 800: "#1f2937", 900: "#111827"
    },
    emerald: {
      50: "#ecfdf5", 100: "#d1fae5", 200: "#a7f3d0", 300: "#6ee7b7", 400: "#34d399",
      500: "#10b981", 600: "#059669", 700: "#047857", 800: "#065f46", 900: "#064e3b"
    },
    red: {
      50: "#fef2f2", 100: "#fee2e2", 200: "#fecaca", 300: "#fca5a5", 400: "#f87171",
      500: "#ef4444", 600: "#dc2626", 700: "#b91c1c", 800: "#991b1b", 900: "#7f1d1d"
    },
    blue: {
      50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd", 400: "#60a5fa",
      500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8", 800: "#1e40af", 900: "#1e3a8a"
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
  
  // Bütün səhifələr və vəziyyətlər
  screens: [
    // Authentication
    { name: "01. Login", width: 375, height: 812, category: "Auth" },
    
    // Main Flow - Paket yoxdur
    { name: "02. Home (No Package)", width: 375, height: 812, category: "Main" },
    { name: "03. Topics (Locked)", width: 375, height: 812, category: "Main" },
    { name: "04. Store", width: 375, height: 812, category: "Main" },
    { name: "05. More Menu", width: 375, height: 812, category: "Main" },
    
    // Package Flow
    { name: "06. Packages List", width: 375, height: 812, category: "Purchase" },
    { name: "07. Package Details", width: 375, height: 812, category: "Purchase" },
    { name: "08. Payment Methods", width: 375, height: 812, category: "Purchase" },
    { name: "09. Purchase Success", width: 375, height: 812, category: "Purchase" },
    
    // Main Flow - Paket var
    { name: "10. Home (With Package)", width: 375, height: 812, category: "Premium" },
    { name: "11. Topics (Unlocked)", width: 375, height: 812, category: "Premium" },
    
    // Learning Flow
    { name: "12. Lesson View", width: 375, height: 812, category: "Learning" },
    { name: "13. Video Player", width: 375, height: 812, category: "Learning" },
    { name: "14. Practice Questions", width: 375, height: 812, category: "Learning" },
    { name: "15. Teacher Contact", width: 375, height: 812, category: "Learning" },
    
    // Exam Flow
    { name: "16. Exam Config", width: 375, height: 812, category: "Exam" },
    { name: "17. Exam Running", width: 375, height: 812, category: "Exam" },
    { name: "18. Exam Results (Pass)", width: 375, height: 812, category: "Exam" },
    { name: "19. Exam Results (Fail)", width: 375, height: 812, category: "Exam" },
    { name: "20. Mistakes Review", width: 375, height: 812, category: "Exam" },
    
    // AI & Support
    { name: "21. AI Chat", width: 375, height: 812, category: "Support" },
    { name: "22. Chat History", width: 375, height: 812, category: "Support" },
    
    // Settings & Profile
    { name: "23. Settings", width: 375, height: 812, category: "Profile" },
    { name: "24. Profile Edit", width: 375, height: 812, category: "Profile" },
    { name: "25. Transactions", width: 375, height: 812, category: "Profile" },
    { name: "26. Balance Top-up", width: 375, height: 812, category: "Profile" },
    
    // Dark Mode Variants
    { name: "27. Home (Dark)", width: 375, height: 812, category: "Dark Mode" },
    { name: "28. Topics (Dark)", width: 375, height: 812, category: "Dark Mode" },
    { name: "29. Lesson (Dark)", width: 375, height: 812, category: "Dark Mode" },
    { name: "30. Settings (Dark)", width: 375, height: 812, category: "Dark Mode" }
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

// Bütün ekranları yarat
function createAllScreens() {
  console.log('📱 Bütün ekranlar yaradılır...');
  
  // Kateqoriyalara görə qruplaşdır
  const categories = {};
  designData.screens.forEach(screen => {
    if (!categories[screen.category]) {
      categories[screen.category] = [];
    }
    categories[screen.category].push(screen);
  });
  
  let currentY = 0;
  const categorySpacing = 100;
  const screenSpacing = 50;
  
  Object.entries(categories).forEach(([categoryName, screens]) => {
    // Kateqoriya başlığı
    const categoryTitle = figma.createText();
    categoryTitle.name = `📂 ${categoryName}`;
    categoryTitle.characters = categoryName.toUpperCase();
    categoryTitle.fontSize = 24;
    categoryTitle.fontName = { family: "Inter", style: "Bold" };
    categoryTitle.fills = [{ type: 'SOLID', color: hexToRgb('#1f2937') }];
    categoryTitle.x = 0;
    categoryTitle.y = currentY;
    figma.currentPage.appendChild(categoryTitle);
    
    currentY += 50;
    
    // Kateqoriyadakı ekranlar
    screens.forEach((screen, index) => {
      try {
        const frame = figma.createFrame();
        frame.name = screen.name;
        frame.resize(screen.width, screen.height);
        frame.x = index * (screen.width + screenSpacing);
        frame.y = currentY;
        
        // Background rəngi kateqoriyaya görə
        let bgColor = { r: 0.98, g: 0.98, b: 0.98 }; // Default
        
        switch (screen.category) {
          case 'Auth':
            bgColor = hexToRgb('#f0fdf4'); // Light green
            break;
          case 'Main':
            bgColor = hexToRgb('#f9fafb'); // Light gray
            break;
          case 'Purchase':
            bgColor = hexToRgb('#eff6ff'); // Light blue
            break;
          case 'Premium':
            bgColor = hexToRgb('#ecfdf5'); // Light emerald
            break;
          case 'Learning':
            bgColor = hexToRgb('#fef3c7'); // Light yellow
            break;
          case 'Exam':
            bgColor = hexToRgb('#fef2f2'); // Light red
            break;
          case 'Support':
            bgColor = hexToRgb('#f3e8ff'); // Light purple
            break;
          case 'Profile':
            bgColor = hexToRgb('#ecfdf5'); // Light emerald
            break;
          case 'Dark Mode':
            bgColor = hexToRgb('#111827'); // Dark
            break;
        }
        
        frame.fills = [{ type: 'SOLID', color: bgColor }];
        
        // Ekran adını frame içərisinə əlavə et
        const screenTitle = figma.createText();
        screenTitle.name = "Screen Title";
        screenTitle.characters = screen.name;
        screenTitle.fontSize = 16;
        screenTitle.fontName = { family: "Inter", style: "Medium" };
        screenTitle.fills = [{ 
          type: 'SOLID', 
          color: screen.category === 'Dark Mode' ? { r: 1, g: 1, b: 1 } : { r: 0.1, g: 0.1, b: 0.1 }
        }];
        screenTitle.x = 20;
        screenTitle.y = 20;
        
        frame.appendChild(screenTitle);
        figma.currentPage.appendChild(frame);
        
        console.log(`✅ Yaradıldı: ${screen.name}`);
      } catch (error) {
        console.log(`❌ Xəta: ${screen.name} - ${error.message}`);
      }
    });
    
    currentY += 900; // Növbəti kateqoriya üçün yer
  });
}

// Komponentlər yarat
function createComponents() {
  console.log('🧩 Komponentlər yaradılır...');
  
  const components = [
    { name: "Button/Primary", width: 120, height: 44, color: "#22c55e" },
    { name: "Button/Secondary", width: 120, height: 44, color: "#6b7280" },
    { name: "Card/Default", width: 200, height: 100, color: "#ffffff" },
    { name: "Header/Default", width: 375, height: 60, color: "#ffffff" },
    { name: "TabBar/Default", width: 375, height: 80, color: "#ffffff" }
  ];
  
  components.forEach((comp, index) => {
    try {
      const component = figma.createComponent();
      component.name = comp.name;
      component.resize(comp.width, comp.height);
      component.x = index * (comp.width + 20);
      component.y = -200; // Yuxarıda yerləşdir
      
      component.fills = [{ type: 'SOLID', color: hexToRgb(comp.color) }];
      
      // Komponent adını əlavə et
      const label = figma.createText();
      label.characters = comp.name.split('/')[1];
      label.fontSize = 12;
      label.fontName = { family: "Inter", style: "Medium" };
      label.fills = [{ type: 'SOLID', color: { r: 0.1, g: 0.1, b: 0.1 } }];
      label.x = 10;
      label.y = 10;
      
      component.appendChild(label);
      figma.currentPage.appendChild(component);
      
      console.log(`✅ Komponent: ${comp.name}`);
    } catch (error) {
      console.log(`❌ Komponent xətası: ${comp.name} - ${error.message}`);
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
    createAllScreens();
    figma.notify('📱 Bütün ekranlar yaradıldı!');
  }
  
  if (msg.type === 'create-components') {
    createComponents();
    figma.notify('🧩 Komponentlər yaradıldı!');
  }
  
  if (msg.type === 'create-all') {
    createColorStyles();
    setTimeout(() => createTextStyles(), 1000);
    setTimeout(() => createComponents(), 2000);
    setTimeout(() => createAllScreens(), 3000);
    figma.notify('🚀 Hər şey yaradıldı! (30 ekran)');
  }
  
  if (msg.type === 'close') {
    figma.closePlugin();
  }
};

console.log('🚀 DDA.az Figma Plugin hazır! (30 ekran dəstəyi)');