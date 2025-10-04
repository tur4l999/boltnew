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
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevIndexRef = useRef(currentIndex);

  // Track slide direction for animations
  // AZ: Animasiya üçün slayd istiqamətini izlə
  useEffect(() => {
    if (currentIndex !== prevIndexRef.current) {
      setIsTransitioning(true);
      
      if (currentIndex > prevIndexRef.current) {
        setSlideDirection('right');
      } else if (currentIndex < prevIndexRef.current) {
        setSlideDirection('left');
      }
      
      // Reset transition after animation completes
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
      }, onboardingAnimations.duration.normal);
      
      prevIndexRef.current = currentIndex;
      
      return () => clearTimeout(timeout);
    }
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
        transition: `background-color ${onboardingAnimations.duration.slow}ms ${onboardingAnimations.easing.easeOut}`,
      }}
    >
      {/* Top Navigation Bar */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-16 pb-4">
        {/* Back Button (visible from slide 2+) */}
        {!isFirst && (
          <button
            onClick={goToPrevious}
            disabled={isNavigating}
            className="p-2 rounded-full disabled:opacity-50"
            style={{
              minWidth: '44px',
              minHeight: '44px',
              color: isDark ? colors.textPrimary : colors.secondary,
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
              transition: `all ${onboardingAnimations.duration.fast}ms ${onboardingAnimations.easing.easeOut}`,
              transform: isNavigating ? 'scale(0.95)' : 'scale(1)',
            }}
            onMouseEnter={(e) => {
              if (!isNavigating) {
                e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isNavigating) {
                e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)';
                e.currentTarget.style.transform = 'scale(1)';
              }
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
            className="px-4 py-2 rounded-lg disabled:opacity-50"
            style={{
              minHeight: '44px',
              color: isDark ? colors.textSecondary : colors.textSecondary,
              fontSize: onboardingTypography.fontSize.body,
              fontWeight: onboardingTypography.fontWeight.medium,
              backgroundColor: 'transparent',
              transition: `all ${onboardingAnimations.duration.fast}ms ${onboardingAnimations.easing.easeOut}`,
              transform: isNavigating ? 'scale(0.95)' : 'scale(1)',
            }}
            onMouseEnter={(e) => {
              if (!isNavigating) {
                e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isNavigating) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
          >
            {t('onboarding.skip')}
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12 relative overflow-hidden">
        {/* Illustration - Modern slide animation */}
        <div
          className="w-full max-w-sm mb-12"
          style={{
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning
              ? slideDirection === 'right'
                ? 'translateX(60px) scale(0.95)'
                : 'translateX(-60px) scale(0.95)'
              : 'translateX(0) scale(1)',
            transition: `all ${onboardingAnimations.duration.normal}ms ${onboardingAnimations.easing.easeOut}`,
            filter: isTransitioning ? 'blur(4px)' : 'blur(0)',
          }}
        >
          {getIllustration(currentSlide.illustration, {
            className: 'w-full h-auto',
            isDark,
          })}
        </div>

        {/* Text Content - Staggered animation */}
        <div
          className="w-full max-w-md text-center"
          style={{
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning
              ? slideDirection === 'right'
                ? 'translateX(40px)'
                : 'translateX(-40px)'
              : 'translateX(0)',
            transition: `all ${onboardingAnimations.duration.normal}ms ${onboardingAnimations.easing.easeOut} ${onboardingAnimations.duration.fast}ms`,
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
            className="w-full rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: colors.primary,
              color: 'white',
              fontSize: onboardingTypography.fontSize.button,
              fontWeight: onboardingTypography.fontWeight.medium,
              padding: `${onboardingSpacing.base} ${onboardingSpacing.xl}`,
              minHeight: '56px',
              boxShadow: isNavigating 
                ? '0 2px 8px rgba(16, 185, 129, 0.15)' 
                : '0 8px 24px rgba(16, 185, 129, 0.35)',
              transform: isNavigating ? 'scale(0.98)' : 'scale(1)',
              transition: `all ${onboardingAnimations.duration.fast}ms ${onboardingAnimations.easing.spring}`,
            }}
            onMouseEnter={(e) => {
              if (!isNavigating) {
                e.currentTarget.style.transform = 'scale(1.02) translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(16, 185, 129, 0.45)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isNavigating) {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(16, 185, 129, 0.35)';
              }
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
