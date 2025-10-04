/**
 * Onboarding Slide Definitions
 * Content for each onboarding slide with i18n keys
 * 
 * AZ: Onboarding slaydlarının məzmunu
 * EN: Onboarding slides content
 * RU: Содержимое слайдов онбординга
 */

export interface OnboardingSlide {
  id: string;
  titleKey: string; // i18n key for title
  bodyKey: string;  // i18n key for body text
  illustration: 'learning' | 'exam' | 'packages' | 'start'; // SVG type
  backgroundColor?: string; // Optional custom background
}

/**
 * Define all onboarding slides
 * AZ: Bütün onboarding slaydları
 */
export const onboardingSlides: OnboardingSlide[] = [
  {
    id: 'slide-1',
    titleKey: 'onboarding.slide1.title',
    bodyKey: 'onboarding.slide1.body',
    illustration: 'learning',
    backgroundColor: '#F0FDF4', // Soft green
  },
  {
    id: 'slide-2',
    titleKey: 'onboarding.slide2.title',
    bodyKey: 'onboarding.slide2.body',
    illustration: 'exam',
    backgroundColor: '#EFF6FF', // Soft blue
  },
  {
    id: 'slide-3',
    titleKey: 'onboarding.slide3.title',
    bodyKey: 'onboarding.slide3.body',
    illustration: 'packages',
    backgroundColor: '#FEF3C7', // Soft yellow
  },
  {
    id: 'slide-4',
    titleKey: 'onboarding.slide4.title',
    bodyKey: 'onboarding.slide4.body',
    illustration: 'start',
    backgroundColor: '#F3E8FF', // Soft purple
  },
];

/**
 * Get total number of slides
 * AZ: Ümumi slayd sayı
 */
export const getTotalSlides = (): number => onboardingSlides.length;

/**
 * Check if current slide is last
 * AZ: Cari slayd sonuncudur?
 */
export const isLastSlide = (currentIndex: number): boolean => 
  currentIndex === onboardingSlides.length - 1;

/**
 * Check if current slide is first
 * AZ: Cari slayd birincidirsə?
 */
export const isFirstSlide = (currentIndex: number): boolean => currentIndex === 0;
