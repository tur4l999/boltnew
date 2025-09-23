import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { ModernCard } from '../ui/ModernCard';
import { ModernButton } from '../ui/ModernButton';
import { EmojiIcon } from '../ui/Icon';
import { emojiToIcon } from '../../lib/iconMapping';
import { 
  Home, BookOpen, TestTube, ShoppingBag, Plus, Star, Bell, Globe, 
  User, Settings, Car, Search, Calendar, Trophy, Target, Sparkles,
  ArrowLeft
} from 'lucide-react';

export function IconDemoScreen() {
  const { goBack, isDarkMode } = useApp();

  // Sample of emojis that have been replaced with modern icons
  const iconExamples = [
    { emoji: '🏠', description: 'Ana səhifə' },
    { emoji: '📚', description: 'Mövzular' },
    { emoji: '🧪', description: 'İmtahan' },
    { emoji: '🛍️', description: 'Mağaza' },
    { emoji: '⭐', description: 'Reytinq' },
    { emoji: '🔔', description: 'Bildirişlər' },
    { emoji: '🌐', description: 'Dil' },
    { emoji: '👤', description: 'Profil' },
    { emoji: '⚙️', description: 'Parametrlər' },
    { emoji: '🚗', description: 'Maşın' },
    { emoji: '🔍', description: 'Axtarış' },
    { emoji: '📅', description: 'Təqvim' },
    { emoji: '🏆', description: 'Mükafat' },
    { emoji: '🎯', description: 'Hədəf' },
    { emoji: '✨', description: 'Effekt' },
    { emoji: '➕', description: 'Əlavə et' }
  ];

  const buttonVariants = [
    { variant: 'primary' as const, label: 'Əsas düymə' },
    { variant: 'secondary' as const, label: 'İkincili düymə' },
    { variant: 'outline' as const, label: 'Kontur düyməsi' },
    { variant: 'ghost' as const, label: 'Şəffaf düymə' },
    { variant: 'success' as const, label: 'Uğur düyməsi' },
    { variant: 'danger' as const, label: 'Təhlükə düyməsi' }
  ];

  const cardVariants = [
    { variant: 'default' as const, title: 'Standart kart' },
    { variant: 'elevated' as const, title: 'Yüksək kart' },
    { variant: 'glass' as const, title: 'Şüşə effekti' },
    { variant: 'outlined' as const, title: 'Konturlu kart' }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 backdrop-blur-xl border-b transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gray-900/95 border-gray-700/50' 
          : 'bg-white/95 border-gray-200/50'
      }`}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <ModernButton
              variant="ghost"
              size="sm"
              icon={ArrowLeft}
              onClick={goBack}
            >
              Geri
            </ModernButton>
            <div>
              <h1 className={`text-2xl font-black transition-colors duration-200 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Modern İkonlar və UI Komponentləri
              </h1>
              <p className={`text-sm transition-colors duration-200 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Yenilənmiş dizayn elementlərinin nümayişi
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Icon Showcase */}
        <ModernCard variant="elevated" padding="lg" className="space-y-6">
          <h2 className={`text-xl font-bold transition-colors duration-200 ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            🎨 → Modern İkonlar
          </h2>
          <p className={`text-sm transition-colors duration-200 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Emoji-lər müasir Lucide ikonları ilə əvəz edilmişdir
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {iconExamples.map((example, index) => (
              <div
                key={index}
                className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                  isDarkMode
                    ? 'bg-gray-800/50 border-gray-700 hover:border-emerald-500/50'
                    : 'bg-white/50 border-gray-200 hover:border-emerald-500/50'
                }`}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{example.emoji}</span>
                    <span className="text-gray-400">→</span>
                    <EmojiIcon emoji={example.emoji} size="lg" className={
                      isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                    } />
                  </div>
                  <span className={`text-xs text-center font-medium transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {example.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ModernCard>

        {/* Button Showcase */}
        <ModernCard variant="elevated" padding="lg" className="space-y-6">
          <h2 className={`text-xl font-bold transition-colors duration-200 ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Müasir Düymələr
          </h2>
          
          <div className="space-y-4">
            {buttonVariants.map((btn, index) => (
              <div key={index} className="flex items-center gap-4 flex-wrap">
                <ModernButton
                  variant={btn.variant}
                  size="sm"
                  emoji="🎯"
                >
                  {btn.label} (Kiçik)
                </ModernButton>
                <ModernButton
                  variant={btn.variant}
                  size="md"
                  icon={Target}
                >
                  {btn.label} (Orta)
                </ModernButton>
                <ModernButton
                  variant={btn.variant}
                  size="lg"
                  icon={Sparkles}
                  glow={btn.variant === 'primary'}
                >
                  {btn.label} (Böyük)
                </ModernButton>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className={`text-lg font-semibold mb-4 transition-colors duration-200 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>
              Xüsusi Effektlər
            </h3>
            <div className="flex flex-wrap gap-4">
              <ModernButton variant="primary" glow gradient icon={Star}>
                Parlaq Effekt
              </ModernButton>
              <ModernButton variant="primary" loading>
                Yüklənir...
              </ModernButton>
              <ModernButton variant="outline" rounded="full" icon={Plus}>
                Dairəvi
              </ModernButton>
              <ModernButton variant="ghost" shadow="xl" icon={Settings}>
                Kölgəli
              </ModernButton>
            </div>
          </div>
        </ModernCard>

        {/* Card Showcase */}
        <ModernCard variant="elevated" padding="lg" className="space-y-6">
          <h2 className={`text-xl font-bold transition-colors duration-200 ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Müasir Kartlar
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cardVariants.map((card, index) => (
              <ModernCard
                key={index}
                variant={card.variant}
                padding="md"
                hover
                className="space-y-3"
              >
                <div className="flex items-center gap-3">
                  <EmojiIcon emoji="🎨" size="md" className="text-emerald-500" />
                  <h3 className={`font-semibold transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    {card.title}
                  </h3>
                </div>
                <p className={`text-sm transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Bu, {card.variant} variant kartının nümunəsidir. Müxtəlif stillərdə mövcuddur.
                </p>
                <ModernButton variant="outline" size="sm" fullWidth>
                  Ətraflı
                </ModernButton>
              </ModernCard>
            ))}
          </div>
        </ModernCard>

        {/* Features */}
        <ModernCard variant="glass" padding="lg" className="space-y-4">
          <h2 className={`text-xl font-bold transition-colors duration-200 ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            ✨ Yeniliklər
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <EmojiIcon emoji="🎯" size="md" className="text-emerald-500 mt-1" />
              <div>
                <h3 className={`font-semibold transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  Modern İkonlar
                </h3>
                <p className={`text-sm transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Bütün emojilər müasir Lucide ikonları ilə əvəz edildi
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <EmojiIcon emoji="🎨" size="md" className="text-blue-500 mt-1" />
              <div>
                <h3 className={`font-semibold transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  Yaxşılaşdırılmış UI/UX
                </h3>
                <p className={`text-sm transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Daha yaxşı animasiyalar və interaktiv elementlər
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <EmojiIcon emoji="⚡" size="md" className="text-yellow-500 mt-1" />
              <div>
                <h3 className={`font-semibold transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  Performans
                </h3>
                <p className={`text-sm transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Daha sürətli yüklənmə və işləmə
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <EmojiIcon emoji="🌟" size="md" className="text-purple-500 mt-1" />
              <div>
                <h3 className={`font-semibold transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  Müasir Dizayn
                </h3>
                <p className={`text-sm transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  2024-cü il dizayn trendlərinə uyğun
                </p>
              </div>
            </div>
          </div>
        </ModernCard>
      </div>
    </div>
  );
}