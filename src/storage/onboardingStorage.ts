/**
 * Onboarding Storage Module
 * AsyncStorage wrapper for web (using localStorage)
 * Manages onboarding completion state
 * 
 * AZ: Onboarding vəziyyətinin saxlanması
 * EN: Onboarding state persistence
 * RU: Хранение состояния онбординга
 */

const ONBOARDING_KEY = 'dda_hasSeenOnboarding';

/**
 * Check if user has seen onboarding
 * AZ: İstifadəçi onboardingi görübmü?
 */
export async function getHasSeenOnboarding(): Promise<boolean> {
  try {
    const value = localStorage.getItem(ONBOARDING_KEY);
    return value === 'true';
  } catch (error) {
    console.error('Error reading onboarding state:', error);
    return false;
  }
}

/**
 * Mark onboarding as seen
 * AZ: Onboardingi "görülmüş" olaraq qeyd et
 */
export async function setHasSeenOnboarding(value: boolean): Promise<void> {
  try {
    localStorage.setItem(ONBOARDING_KEY, value.toString());
  } catch (error) {
    console.error('Error saving onboarding state:', error);
  }
}

/**
 * Reset onboarding state (for QA/testing)
 * AZ: Onboarding vəziyyətini sıfırla (test üçün)
 */
export async function resetOnboarding(): Promise<void> {
  try {
    localStorage.removeItem(ONBOARDING_KEY);
  } catch (error) {
    console.error('Error resetting onboarding state:', error);
  }
}

/**
 * Get all onboarding-related keys (for debugging)
 * AZ: Bütün onboarding açarlarını əldə et
 */
export function getOnboardingDebugInfo(): { key: string; value: string | null } {
  return {
    key: ONBOARDING_KEY,
    value: localStorage.getItem(ONBOARDING_KEY),
  };
}
