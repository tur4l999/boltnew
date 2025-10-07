/**
 * Onboarding Theme Tokens
 * Design tokens for onboarding flow with light/dark mode support
 * 
 * AZ: Onboarding dizayn tokenləri
 * EN: Onboarding design tokens
 * RU: Токены дизайна онбординга
 */

/**
 * Color system for onboarding
 * AZ: Rəng sistemi
 */
export const onboardingColors = {
  light: {
    primary: '#10B981',      // Emerald/mint
    secondary: '#111827',    // Near-black text
    accent: '#06B6D4',       // Cyan
    background: '#F9FAFB',   // Light gray
    surface: '#FFFFFF',      // White
    textPrimary: '#111827',  // Near-black
    textSecondary: '#6B7280', // Gray
    textMuted: '#9CA3AF',    // Light gray
    border: '#E5E7EB',       // Border gray
    shadow: 'rgba(0, 0, 0, 0.1)',
    
    // Slide-specific backgrounds
    slide1Bg: '#F0FDF4',     // Soft green
    slide2Bg: '#EFF6FF',     // Soft blue
    slide3Bg: '#FEF3C7',     // Soft yellow
    slide4Bg: '#F3E8FF',     // Soft purple
  },
  
  dark: {
    primary: '#10B981',      // Emerald (same)
    secondary: '#F9FAFB',    // Light text
    accent: '#06B6D4',       // Cyan (same)
    background: '#0B1220',   // Dark background
    surface: '#1F2937',      // Dark surface
    textPrimary: '#F9FAFB',  // Light text
    textSecondary: '#9CA3AF', // Gray
    textMuted: '#6B7280',    // Darker gray
    border: '#374151',       // Dark border
    shadow: 'rgba(0, 0, 0, 0.4)',
    
    // Slide-specific backgrounds (darker variants)
    slide1Bg: '#064E3B',     // Dark green
    slide2Bg: '#1E3A8A',     // Dark blue
    slide3Bg: '#78350F',     // Dark yellow
    slide4Bg: '#581C87',     // Dark purple
  },
};

/**
 * Typography scale
 * AZ: Tipografiya miqyası
 */
export const onboardingTypography = {
  fontSize: {
    headline: '32px',        // 32pt for main headlines
    headlineMobile: '28px',  // 28pt for smaller screens
    body: '16px',            // 16pt for body text
    bodyLarge: '18px',       // 18pt for larger body
    button: '16px',          // 16pt for buttons
    caption: '14px',         // 14pt for captions
  },
  
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
  
  fontFamily: {
    primary: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
};

/**
 * Spacing scale (matches one-hand reach guidelines)
 * AZ: Boşluq miqyası
 */
export const onboardingSpacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  base: '16px',      // Base unit
  lg: '20px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '40px',
  '4xl': '48px',
  '5xl': '64px',
  '6xl': '80px',
};

/**
 * Border radius tokens
 * AZ: Künc radiusu
 */
export const onboardingBorderRadius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  full: '9999px',
};

/**
 * Shadow tokens
 * AZ: Kölgə effektləri
 */
export const onboardingShadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

/**
 * Animation durations
 * AZ: Animasiya müddətləri
 */
export const onboardingAnimations = {
  duration: {
    fast: 150,     // 150ms
    normal: 300,   // 300ms
    slow: 500,     // 500ms
  },
  
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Bouncy spring
  },
};

/**
 * Breakpoints for responsive design
 * AZ: Responsiv dizayn üçün kəsmə nöqtələri
 */
export const onboardingBreakpoints = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
};

/**
 * Touch target minimum size (accessibility)
 * AZ: Minimum toxunma hədəfi ölçüsü
 */
export const touchTarget = {
  minHeight: '44px',
  minWidth: '44px',
};

/**
 * Get theme colors based on mode
 * AZ: Rejimə əsasən rəngləri əldə et
 */
export function getOnboardingColors(isDark: boolean) {
  return isDark ? onboardingColors.dark : onboardingColors.light;
}
