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
  
  /** Force show onboarding (for testing) / Onboardingi məcburi göstər */
  forceShow?: boolean;
  
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
  forceShow = false,
  loadingComponent = <div className="min-h-screen flex items-center justify-center">Loading...</div>,
}: OnboardingWrapperProps) {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check onboarding status on mount
  // AZ: Komponent yükləndikdə onboarding statusunu yoxla
  useEffect(() => {
    async function checkOnboardingStatus() {
      try {
        const hasSeen = await getHasSeenOnboarding();
        setHasSeenOnboarding(hasSeen);
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        setHasSeenOnboarding(false);
      } finally {
        setIsLoading(false);
      }
    }
    
    checkOnboardingStatus();
  }, []);

  // Handle onboarding completion
  // AZ: Onboarding tamamlanmasını idarə et
  const handleComplete = () => {
    setHasSeenOnboarding(true);
  };

  // Handle onboarding skip
  // AZ: Onboarding keçməni idarə et
  const handleSkip = () => {
    setHasSeenOnboarding(true);
  };

  // Show loading state
  // AZ: Yükləmə vəziyyətini göstər
  if (isLoading) {
    return <>{loadingComponent}</>;
  }

  // Show onboarding if not seen (or forced)
  // AZ: Görünməyibsə (və ya məcburi) onboarding göstər
  if (!hasSeenOnboarding || forceShow) {
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
