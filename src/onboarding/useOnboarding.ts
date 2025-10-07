/**
 * Onboarding Hook
 * Custom hook to manage onboarding state and navigation
 * 
 * AZ: Onboarding vəziyyət idarəçiliyi
 * EN: Onboarding state management
 * RU: Управление состоянием онбординга
 */

import { useState, useCallback, useRef } from 'react';
import { setHasSeenOnboarding } from '../storage/onboardingStorage';
import { getTotalSlides, isLastSlide } from './slides';

interface UseOnboardingReturn {
  currentIndex: number;
  isLast: boolean;
  isFirst: boolean;
  totalSlides: number;
  goToNext: () => void;
  goToPrevious: () => void;
  goToSlide: (index: number) => void;
  skip: () => Promise<void>;
  complete: () => Promise<void>;
  isNavigating: boolean;
}

interface UseOnboardingProps {
  onComplete?: () => void;
  onSkip?: () => void;
}

/**
 * Main onboarding hook
 * AZ: Əsas onboarding hook-u
 */
export function useOnboarding(props: UseOnboardingProps = {}): UseOnboardingReturn {
  const { onComplete, onSkip } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const navigationTimeoutRef = useRef<NodeJS.Timeout>();
  
  const totalSlides = getTotalSlides();
  const isLast = isLastSlide(currentIndex);
  const isFirst = currentIndex === 0;

  /**
   * Debounced navigation to prevent rapid taps
   * AZ: Sürətli toxunmaları əngəlləmək üçün debounce
   */
  const withDebounce = useCallback((action: () => void) => {
    if (isNavigating) return;
    
    setIsNavigating(true);
    action();
    
    // Reset navigation lock after animation
    navigationTimeoutRef.current = setTimeout(() => {
      setIsNavigating(false);
    }, 300);
  }, [isNavigating]);

  /**
   * Navigate to next slide
   * AZ: Növbəti slayda keç
   */
  const goToNext = useCallback(() => {
    withDebounce(() => {
      if (!isLast) {
        setCurrentIndex((prev) => Math.min(prev + 1, totalSlides - 1));
      }
    });
  }, [isLast, totalSlides, withDebounce]);

  /**
   * Navigate to previous slide
   * AZ: Əvvəlki slayda qayıt
   */
  const goToPrevious = useCallback(() => {
    withDebounce(() => {
      if (!isFirst) {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    });
  }, [isFirst, withDebounce]);

  /**
   * Jump to specific slide
   * AZ: Müəyyən slayda keç
   */
  const goToSlide = useCallback((index: number) => {
    withDebounce(() => {
      if (index >= 0 && index < totalSlides) {
        setCurrentIndex(index);
      }
    });
  }, [totalSlides, withDebounce]);

  /**
   * Skip onboarding
   * AZ: Onboardingi keç
   */
  const skip = useCallback(async () => {
    if (isNavigating) return;
    
    setIsNavigating(true);
    try {
      await setHasSeenOnboarding(true);
      onSkip?.();
    } catch (error) {
      console.error('Error skipping onboarding:', error);
    } finally {
      setIsNavigating(false);
    }
  }, [isNavigating, onSkip]);

  /**
   * Complete onboarding
   * AZ: Onboardingi tamamla
   */
  const complete = useCallback(async () => {
    if (isNavigating) return;
    
    setIsNavigating(true);
    try {
      await setHasSeenOnboarding(true);
      onComplete?.();
    } catch (error) {
      console.error('Error completing onboarding:', error);
    } finally {
      setIsNavigating(false);
    }
  }, [isNavigating, onComplete]);

  // Cleanup timeout on unmount
  // AZ: Komponent silinərkən timeout-u təmizlə
  useState(() => {
    return () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  });

  return {
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
  };
}
