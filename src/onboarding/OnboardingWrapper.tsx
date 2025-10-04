/**
 * Onboarding Wrapper Component
 * Manages onboarding flow state and routing logic
 * 
 * AZ: Onboarding axın idarəçiliyi və yönləndirmə
 * EN: Onboarding flow management and routing
 * RU: Управление потоком онбординга и маршрутизацией
 */

import React, { useState, useEffect } from 'react';
import { OnboardingScreen } from './OnboardingScreen';
import { getHasSeenOnboarding } from '../storage/onboardingStorage';

interface OnboardingWrapperProps {
  /** Children to render after onboarding / Onboardingdən sonra göstəriləcək məzmun */
  children: React.ReactNode;
  
  /** Current language / Cari dil */
  language?: 'az' | 'en' | 'ru';
  
  /** Dark mode / Qaranlıq rejim */
  isDark?: boolean;
  
  /** 
   * TEST MODE: Always show onboarding (ignore localStorage)
   * TEST REJIMI: Həmişə onboarding göstər (localStorage-ı nəzərə alma)
   * 
   * VACIB: Production-da bu FALSE olmalıdır!
   * IMPORTANT: Set to FALSE in production!
   * 
   * true = Hər dəfə onboarding göstərilir (test üçün)
   * false = 1 dəfə göstərilir (real istifadə)
   */
  testMode?: boolean;
  
  /** Loading component / Yükləmə komponenti */
  loadingComponent?: React.ReactNode;
}

/**
 * Onboarding Wrapper
 * Shows onboarding on first launch, then main app content
 * 
 * AZ: İlk açılışda onboarding, sonra əsas tətbiq
 */
export function OnboardingWrapper({
  children,
  language = 'az',
  isDark = false,
  testMode = false, // ← TEST REJIMI: Production-da FALSE edin!
  loadingComponent = <div className="min-h-screen flex items-center justify-center">Loading...</div>,
}: OnboardingWrapperProps) {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check onboarding status on mount
  // AZ: Komponent yükləndikdə onboarding statusunu yoxla
  useEffect(() => {
    async function checkOnboardingStatus() {
      try {
        // TEST MODE: Həmişə false qaytar (hər dəfə göstər)
        // PRODUCTION: localStorage-dan oxu (1 dəfə göstər)
        if (testMode) {
          console.log('🧪 TEST MODE: Onboarding hər dəfə göstəriləcək');
          setHasSeenOnboarding(false);
        } else {
          const hasSeen = await getHasSeenOnboarding();
          setHasSeenOnboarding(hasSeen);
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        setHasSeenOnboarding(false);
      } finally {
        setIsLoading(false);
      }
    }
    
    checkOnboardingStatus();
  }, [testMode]);

  // Handle onboarding completion
  // AZ: Onboarding tamamlanmasını idarə et
  const handleComplete = () => {
    // TEST MODE-da localStorage-a yazmırıq (növbəti dəfə yenə göstərilsin)
    // PRODUCTION-da yazırıq (1 dəfə göstərilsin)
    if (!testMode) {
      setHasSeenOnboarding(true);
    } else {
      console.log('🧪 TEST MODE: localStorage-a yazılmadı (növbəti dəfə yenə göstəriləcək)');
      setHasSeenOnboarding(true); // UI update üçün
    }
  };

  // Handle onboarding skip
  // AZ: Onboarding keçməni idarə et
  const handleSkip = () => {
    // TEST MODE-da localStorage-a yazmırıq
    // PRODUCTION-da yazırıq
    if (!testMode) {
      setHasSeenOnboarding(true);
    } else {
      console.log('🧪 TEST MODE: Skip edildi, amma növbəti dəfə yenə göstəriləcək');
      setHasSeenOnboarding(true); // UI update üçün
    }
  };

  // Show loading state
  // AZ: Yükləmə vəziyyətini göstər
  if (isLoading) {
    return <>{loadingComponent}</>;
  }

  // Show onboarding if not seen (or test mode)
  // AZ: Görünməyibsə (və ya test rejimi) onboarding göstər
  if (!hasSeenOnboarding) {
    return (
      <OnboardingScreen
        onComplete={handleComplete}
        onSkip={handleSkip}
        language={language}
        isDark={isDark}
      />
    );
  }

  // Show main app content
  // AZ: Əsas tətbiq məzmununu göstər
  return <>{children}</>;
}

/**
 * Create root navigator based on onboarding and auth state
 * AZ: Onboarding və auth vəziyyətinə əsasən kök naviqator yarat
 */
export function createRootNavigator(
  hasSeenOnboarding: boolean,
  isAuthenticated: boolean
): 'onboarding' | 'auth' | 'app' {
  if (!hasSeenOnboarding) {
    return 'onboarding';
  }
  
  if (!isAuthenticated) {
    return 'auth';
  }
  
  return 'app';
}
