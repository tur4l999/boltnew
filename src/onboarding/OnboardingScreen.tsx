/**
 * Onboarding Screen Component
 * Main onboarding carousel with slides, navigation, and animations
 * 
 * AZ: Əsas onboarding karusel ekranı
 * EN: Main onboarding carousel screen
 * RU: Основной экран карусели онбординга
 */

import React, { useState, useRef, useEffect } from 'react';
import { useOnboarding } from './useOnboarding';
import { onboardingSlides } from './slides';
import { Pagination } from './Pagination';
import { getIllustration } from './illustrations';
import { getOnboardingTranslation } from './i18n-onboarding';
import { getOnboardingColors, onboardingTypography, onboardingSpacing, onboardingAnimations } from './theme';
import { ChevronLeft } from 'lucide-react';

interface OnboardingScreenProps {
  /** Callback when onboarding is completed / Tamamlandıqda çağırılır */
  onComplete: () => void;
  
  /** Callback when onboarding is skipped / Keçiləndə çağırılır */
  onSkip?: () => void;
  
  /** Current language / Cari dil */
  language?: 'az' | 'en' | 'ru';
  
  /** Dark mode / Qaranlıq rejim */
  isDark?: boolean;
}

/**
 * Main Onboarding Screen
 * AZ: Əsas onboarding ekranı
 */
export function OnboardingScreen({
  onComplete,
  onSkip,
  language = 'az',
  isDark = false,
}: OnboardingScreenProps) {
  const {
    currentIndex,
    isLast,
    isFirst,
    totalSlides,
    goToNext,
    goToPrevious,
    goToSlide,
    skip,
    complete,
    isNavigating,
  } = useOnboarding({
    onComplete,
    onSkip,
  });

  const colors = getOnboardingColors(isDark);
  const currentSlide = onboardingSlides[currentIndex];
  const [slideKey, setSlideKey] = useState(0);

  // Trigger re-render with fade on every slide change
  // AZ: Hər slayd dəyişəndə yenidən render et və fade et
  useEffect(() => {
    setSlideKey(prev => prev + 1);
  }, [currentIndex]);

  // Translation helper
  // AZ: Tərcümə köməkçisi
  const t = (key: string) => getOnboardingTranslation(language, key);

  // Handle skip
  // AZ: Keçməni idarə et
  const handleSkip = async () => {
    await skip();
  };

  // Handle next/complete
  // AZ: Sonrakı/tamamlanı idarə et
  const handleNext = async () => {
    if (isLast) {
      await complete();
    } else {
      goToNext();
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        backgroundColor: isDark ? colors.background : currentSlide.backgroundColor || colors.background,
        transition: 'background-color 500ms ease-in-out',
      }}
    >
      {/* CSS Animation keyframes */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
      {/* Top Navigation Bar */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-16 pb-4">
        {/* Back Button (visible from slide 2+) */}
        {!isFirst && (
          <button
            onClick={goToPrevious}
            disabled={isNavigating}
            className="p-2 rounded-full disabled:opacity-50 transition-opacity duration-200"
            style={{
              minWidth: '44px',
              minHeight: '44px',
              color: isDark ? colors.textPrimary : colors.secondary,
            }}
            aria-label={t('onboarding.back')}
          >
            <ChevronLeft size={24} />
          </button>
        )}
        
        <div className="flex-1" />
        
        {/* Skip Button (hidden on last slide) */}
        {!isLast && (
          <button
            onClick={handleSkip}
            disabled={isNavigating}
            className="px-4 py-2 rounded-lg disabled:opacity-50 transition-opacity duration-200"
            style={{
              minHeight: '44px',
              color: isDark ? colors.textSecondary : colors.textSecondary,
              fontSize: onboardingTypography.fontSize.body,
              fontWeight: onboardingTypography.fontWeight.medium,
            }}
          >
            {t('onboarding.skip')}
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        {/* Illustration - Fade in with key change */}
        <div
          key={`illustration-${slideKey}`}
          className="w-full max-w-sm mb-12 animate-fadeIn"
          style={{
            animation: 'fadeIn 600ms ease-in-out',
          }}
        >
          {getIllustration(currentSlide.illustration, {
            className: 'w-full h-auto',
            isDark,
          })}
        </div>

        {/* Text Content - Fade in with key change */}
        <div
          key={`text-${slideKey}`}
          className="w-full max-w-md text-center animate-fadeIn"
          style={{
            animation: 'fadeIn 600ms ease-in-out',
          }}
        >
          {/* Title */}
          <h1
            className="mb-4 font-semibold leading-tight"
            style={{
              fontSize: onboardingTypography.fontSize.headline,
              color: isDark ? colors.textPrimary : colors.secondary,
              fontWeight: onboardingTypography.fontWeight.semibold,
            }}
          >
            {t(currentSlide.titleKey)}
          </h1>

          {/* Body Text */}
          <p
            className="leading-relaxed"
            style={{
              fontSize: onboardingTypography.fontSize.body,
              color: isDark ? colors.textSecondary : colors.textSecondary,
              lineHeight: onboardingTypography.lineHeight.relaxed,
            }}
          >
            {t(currentSlide.bodyKey)}
          </p>
        </div>
      </div>

      {/* Bottom Section: Pagination + CTA */}
      <div className="pb-12 px-6 space-y-8">
        {/* Pagination Dots */}
        <Pagination
          total={totalSlides}
          activeIndex={currentIndex}
          onDotClick={goToSlide}
          isDark={isDark}
        />

        {/* Next / Get Started Button */}
        <div className="w-full max-w-md mx-auto">
          <button
            onClick={handleNext}
            disabled={isNavigating}
            className="w-full rounded-2xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: colors.primary,
              color: 'white',
              fontSize: onboardingTypography.fontSize.button,
              fontWeight: onboardingTypography.fontWeight.medium,
              padding: `${onboardingSpacing.base} ${onboardingSpacing.xl}`,
              minHeight: '56px',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)',
            }}
          >
            {isLast ? t('onboarding.getStarted') : t('onboarding.next')}
          </button>
        </div>
      </div>

      {/* Keyboard Navigation Support */}
      <div
        className="sr-only"
        role="region"
        aria-live="polite"
        aria-label={`Slide ${currentIndex + 1} of ${totalSlides}`}
      >
        {t(currentSlide.titleKey)}
      </div>
    </div>
  );
}

/**
 * Alternative: Swipeable version for touch devices
 * AZ: Toxunma cihazları üçün sürüşdürülə bilən versiya
 */
export function SwipeableOnboardingScreen(props: OnboardingScreenProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const {
    currentIndex,
    goToNext,
    goToPrevious,
    isLast,
    isFirst,
  } = useOnboarding({
    onComplete: props.onComplete,
    onSkip: props.onSkip,
  });

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && !isLast) {
      goToNext();
    }
    if (isRightSwipe && !isFirst) {
      goToPrevious();
    }
  };

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <OnboardingScreen {...props} />
    </div>
  );
}
