/**
 * Onboarding Module Exports
 * Central export point for all onboarding functionality
 * 
 * AZ: Onboarding modulunun ixrac nöqtəsi
 * EN: Onboarding module exports
 * RU: Экспорты модуля онбординга
 */

// Components
export { OnboardingScreen, SwipeableOnboardingScreen } from './OnboardingScreen';
export { Pagination, ProgressBar } from './Pagination';
export * from './illustrations';

// Hooks
export { useOnboarding } from './useOnboarding';

// Storage
export {
  getHasSeenOnboarding,
  setHasSeenOnboarding,
  resetOnboarding,
  getOnboardingDebugInfo,
} from '../storage/onboardingStorage';

// Data
export { onboardingSlides, getTotalSlides, isLastSlide, isFirstSlide } from './slides';
export type { OnboardingSlide } from './slides';

// Theme
export {
  onboardingColors,
  onboardingTypography,
  onboardingSpacing,
  onboardingBorderRadius,
  onboardingShadows,
  onboardingAnimations,
  onboardingBreakpoints,
  touchTarget,
  getOnboardingColors,
} from './theme';

// i18n
export { onboardingTranslations, getOnboardingTranslation } from './i18n-onboarding';
