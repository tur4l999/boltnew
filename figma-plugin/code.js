// Figma Plugin - DDA.az Design Exporter
figma.showUI(__html__, { width: 400, height: 600 });

// Design tokens from your app
const designTokens = {
  colors: {
    primary: {
      50: "#f0fdf4",
      100: "#dcfce7",
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
      800: "#166534",
      900: "#14532d"
    },
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827"
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    "2xl": 24,
    "3xl": 32,
    "4xl": 40,
    "5xl": 48
  },
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    "2xl": 20,
    full: 9999
  }
};

// Screen components data
const screens = [
  {
    name: "Login",
    width: 375,
    height: 812,
    components: ["LoginForm", "SocialButtons", "Logo"]
  },
  {
    name: "Home",
    width: 375,
    height: 812,
    components: ["Header", "ProgressCard", "ActionGrid", "TabBar"]
  },
  {
    name: "Topics",
    width: 375,
    height: 812,
    components: ["Header", "SearchBar", "ModuleList", "TabBar"]
  },
  {
    name: "Lesson",
    width: 375,
    height: 812,
    components: ["Header", "VideoPlayer", "TabNavigation", "Content"]
  },
  {
    name: "Exam",
    width: 375,
    height: 812,
    components: ["Timer", "QuestionCard", "AnswerOptions", "Navigation"]
  },
  {
    name: "Store",
    width: 375,
    height: 812,
    components: ["Header", "ProductGrid", "PaymentMethods", "TabBar"]
  }
];

// Create color styles
function createColorStyles() {
  Object.entries(designTokens.colors).forEach(([colorName, shades]) => {
    if (typeof shades === 'object') {
      Object.entries(shades).forEach(([shade, hex]) => {
        const style = figma.createPaintStyle();
        style.name = `Colors/${colorName}/${shade}`;
        style.paints = [{
          type: 'SOLID',
          color: hexToRgb(hex)
        }];
      });
    }
  });
}

// Create text styles
function createTextStyles() {
  const textStyles = [
    { name: "Heading/H1", fontSize: 24, fontWeight: 700 },
    { name: "Heading/H2", fontSize: 20, fontWeight: 600 },
    { name: "Heading/H3", fontSize: 18, fontWeight: 600 },
    { name: "Body/Large", fontSize: 16, fontWeight: 400 },
    { name: "Body/Medium", fontSize: 14, fontWeight: 400 },
    { name: "Body/Small", fontSize: 12, fontWeight: 400 },
    { name: "Button/Primary", fontSize: 14, fontWeight: 600 },
    { name: "Caption", fontSize: 11, fontWeight: 400 }
  ];

  textStyles.forEach(style => {
    const textStyle = figma.createTextStyle();
    textStyle.name = style.name;
    textStyle.fontSize = style.fontSize;
    textStyle.fontName = { family: "Inter", style: "Regular" };
  });
}

// Create component frames
function createScreenFrames() {
  screens.forEach((screen, index) => {
    const frame = figma.createFrame();
    frame.name = screen.name;
    frame.resize(screen.width, screen.height);
    frame.x = index * (screen.width + 50);
    frame.y = 0;
    
    // Add background
    frame.fills = [{
      type: 'SOLID',
      color: hexToRgb('#f9fafb')
    }];
    
    // Add to current page
    figma.currentPage.appendChild(frame);
    
    // Create components for this screen
    createScreenComponents(frame, screen);
  });
}

// Create individual components
function createScreenComponents(parentFrame, screenData) {
  let yOffset = 0;
  
  screenData.components.forEach(componentName => {
    const component = createComponent(componentName, parentFrame.width);
    component.y = yOffset;
    parentFrame.appendChild(component);
    yOffset += component.height + 16;
  });
}

// Create specific components
function createComponent(name, width) {
  switch (name) {
    case "Header":
      return createHeader(width);
    case "LoginForm":
      return createLoginForm(width);
    case "ActionGrid":
      return createActionGrid(width);
    case "TabBar":
      return createTabBar(width);
    default:
      return createPlaceholder(name, width);
  }
}

function createHeader(width) {
  const header = figma.createFrame();
  header.name = "Header";
  header.resize(width, 60);
  header.fills = [{
    type: 'SOLID',
    color: { r: 1, g: 1, b: 1 }
  }];
  
  // Add title
  const title = figma.createText();
  title.characters = "DDA.az";
  title.fontSize = 18;
  title.x = 16;
  title.y = 20;
  header.appendChild(title);
  
  return header;
}

function createLoginForm(width) {
  const form = figma.createFrame();
  form.name = "Login Form";
  form.resize(width - 32, 300);
  form.x = 16;
  form.fills = [{
    type: 'SOLID',
    color: { r: 1, g: 1, b: 1 }
  }];
  form.cornerRadius = 12;
  
  return form;
}

function createActionGrid(width) {
  const grid = figma.createFrame();
  grid.name = "Action Grid";
  grid.resize(width - 32, 200);
  grid.x = 16;
  grid.fills = [{
    type: 'SOLID',
    color: { r: 0.98, g: 0.98, b: 0.98 }
  }];
  
  return grid;
}

function createTabBar(width) {
  const tabBar = figma.createFrame();
  tabBar.name = "Tab Bar";
  tabBar.resize(width, 80);
  tabBar.fills = [{
    type: 'SOLID',
    color: { r: 1, g: 1, b: 1 }
  }];
  
  return tabBar;
}

function createPlaceholder(name, width) {
  const placeholder = figma.createFrame();
  placeholder.name = name;
  placeholder.resize(width - 32, 100);
  placeholder.x = 16;
  placeholder.fills = [{
    type: 'SOLID',
    color: { r: 0.95, g: 0.95, b: 0.95 }
  }];
  placeholder.cornerRadius = 8;
  
  return placeholder;
}

// Utility functions
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : { r: 0, g: 0, b: 0 };
}

// Message handling
figma.ui.onmessage = msg => {
  if (msg.type === 'create-design-system') {
    createColorStyles();
    createTextStyles();
    figma.notify('Design system created!');
  }
  
  if (msg.type === 'create-screens') {
    createScreenFrames();
    figma.notify('Screens created!');
  }
  
  if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};