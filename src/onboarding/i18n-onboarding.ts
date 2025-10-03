/**
 * Onboarding i18n Translations
 * Multi-language support for onboarding flow (AZ/EN/RU)
 * 
 * AZ: Onboarding tərcümələri
 * EN: Onboarding translations
 * RU: Переводы онбординга
 */

export const onboardingTranslations = {
  az: {
    onboarding: {
      skip: 'Keç',
      next: 'Sonrakı',
      back: 'Geri',
      start: 'Başlayaq',
      getStarted: 'İrəli gedək',
      
      // Slide 1: 3D Learning
      slide1: {
        title: '3D videolarla real öyrənmə',
        body: 'Qaydaları vizual səhnələrlə yadda saxla və asan mənimsə. Hər bir qaydanı 3D formatda göstəririk.',
      },
      
      // Slide 2: Exam Simulator
      slide2: {
        title: 'İmtahan simulyatoru',
        body: '10 sual, 15 dəqiqə — rəsmi imtahan formatı. Real imtahan şəraitində özünü yoxla.',
      },
      
      // Slide 3: Packages
      slide3: {
        title: 'Paketini seç',
        body: 'Sadə, Standart, Premium-Plus — ehtiyacına uyğun paketi seç və təhsilinə başla.',
      },
      
      // Slide 4: Get Started
      slide4: {
        title: 'Başlayaq!',
        body: 'İrəlilə və ilk sınağını indi et. Uğurlar diləyirik!',
      },
    },
  },
  
  en: {
    onboarding: {
      skip: 'Skip',
      next: 'Next',
      back: 'Back',
      start: 'Get Started',
      getStarted: 'Let\'s Begin',
      
      // Slide 1: 3D Learning
      slide1: {
        title: 'Real learning with 3D videos',
        body: 'Memorize rules with visual scenes and learn easily. We show every rule in 3D format.',
      },
      
      // Slide 2: Exam Simulator
      slide2: {
        title: 'Exam simulator',
        body: '10 questions, 15 minutes — official exam format. Test yourself in real exam conditions.',
      },
      
      // Slide 3: Packages
      slide3: {
        title: 'Choose your package',
        body: 'Simple, Standard, Premium-Plus — choose the package that suits your needs and start learning.',
      },
      
      // Slide 4: Get Started
      slide4: {
        title: 'Let\'s get started!',
        body: 'Move forward and take your first test now. We wish you success!',
      },
    },
  },
  
  ru: {
    onboarding: {
      skip: 'Пропустить',
      next: 'Далее',
      back: 'Назад',
      start: 'Начать',
      getStarted: 'Приступим',
      
      // Slide 1: 3D Learning
      slide1: {
        title: 'Реальное обучение с 3D видео',
        body: 'Запоминайте правила с визуальными сценами и легко усваивайте. Мы показываем каждое правило в 3D формате.',
      },
      
      // Slide 2: Exam Simulator
      slide2: {
        title: 'Симулятор экзамена',
        body: '10 вопросов, 15 минут — официальный формат экзамена. Проверьте себя в реальных условиях экзамена.',
      },
      
      // Slide 3: Packages
      slide3: {
        title: 'Выберите свой пакет',
        body: 'Простой, Стандарт, Премиум-Плюс — выберите пакет, который соответствует вашим потребностям, и начните обучение.',
      },
      
      // Slide 4: Get Started
      slide4: {
        title: 'Давайте начнем!',
        body: 'Двигайтесь вперед и сдайте свой первый тест прямо сейчас. Желаем успехов!',
      },
    },
  },
};

/**
 * Get onboarding translation by key
 * AZ: Açara görə onboarding tərcüməsini əldə et
 */
export function getOnboardingTranslation(
  language: 'az' | 'en' | 'ru',
  key: string
): string {
  const keys = key.split('.');
  let value: any = onboardingTranslations[language];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}
