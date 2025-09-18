import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';

export function SettingsScreen() {
  const { goBack, language, setLanguage, theme, setTheme, balance, activePackage, isDarkMode } = useApp();
  const userName = "Tural Qarayev";
  const userEmail = "tural.qarayev@example.com";

  const themeOptions = [
    { value: 'light', label: '☀️ Gündüz', description: 'Açıq tema' },
    { value: 'dark', label: '🌜 Gecə', description: 'Qaranlıq tema' },
    { value: 'system', label: '📱 Cihaza uyğun', description: 'Sistem ayarına görə' }
  ];

  const languageOptions = [
    { value: 'az', label: '🇦🇿 Azərbaycan dili' },
    { value: 'ru', label: '🇷🇺 Русский язык' }
  ];

  const settingsItems = [
    {
      section: 'Hesabım',
      items: [
        { key: 'profile', label: 'Profil məlumatları', emoji: '👨‍💼', action: () => alert('Profil məlumatları (demo)') },
        { key: 'security', label: 'Təhlükəsizlik', emoji: '🔐', action: () => alert('Təhlükəsizlik (demo)') },
        { key: 'privacy', label: 'Məxfilik', emoji: '🛡️', action: () => alert('Məxfilik (demo)') },
        { key: 'notifications', label: 'Bildirişlər', emoji: '🔕', action: () => alert('Bildiriş ayarları (demo)') }
      ]
    },
    {
      section: 'Tətbiq',
      items: [
        { key: 'offline', label: 'Offline məzmun', emoji: '📲', action: () => alert('Offline məzmun (demo)') },
        { key: 'cache', label: 'Keş təmizlə', emoji: '🧹', action: () => alert('Keş təmizləndi (demo)') },
        { key: 'updates', label: 'Yeniləmələr', emoji: '🔁', action: () => alert('Yeniləmələr (demo)') }
      ]
    },
    {
      section: 'Dəstək',
      items: [
        { key: 'help', label: 'Kömək mərkəzi', emoji: '🆘', action: () => alert('Kömək mərkəzi (demo)') },
        { key: 'contact', label: 'Bizimlə əlaqə', emoji: '📞', action: () => alert('Əlaqə (demo)') },
        { key: 'feedback', label: 'Rəy bildirin', emoji: '🗨️', action: () => alert('Rəy bildirin (demo)') },
        { key: 'about', label: 'Haqqında', emoji: 'ℹ️', action: () => alert('DDA.az v1.0.0 (demo)') }
      ]
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-300 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
        : 'bg-gradient-to-br from-gray-50 via-white to-emerald-50'
    } pt-11`}>
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-10 right-10 w-40 h-40 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-emerald-500/5' : 'bg-emerald-400/10'
        }`}></div>
        <div className={`absolute bottom-20 left-10 w-32 h-32 rounded-full blur-2xl animate-pulse ${
          isDarkMode ? 'bg-blue-500/5' : 'bg-blue-400/10'
        }`} style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 p-4 pb-24">
        {/* Enhanced Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={goBack}
            className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ${
              isDarkMode 
                ? 'border-gray-600/50 bg-gray-800/80 hover:bg-gray-700/80 text-gray-200 backdrop-blur-sm' 
                : 'border-gray-300/50 bg-white/80 hover:bg-gray-50/80 text-gray-700 backdrop-blur-sm'
            }`}
          >
            <span className="text-lg">←</span>
          </button>
          <div>
            <h1 className={`text-2xl font-black transition-colors duration-200 bg-gradient-to-r ${
              isDarkMode ? 'from-emerald-400 to-green-400' : 'from-emerald-600 to-green-600'
            } bg-clip-text text-transparent`}>
              Parametrlər
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Hesab və tətbiq ayarları
            </p>
          </div>
        </div>

        {/* Enhanced Profile Card */}
        <Card variant="elevated" padding="lg" className="mb-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-500 text-white flex items-center justify-center font-black text-2xl shadow-xl">
                {userName.charAt(0).toUpperCase()}
              </div>
              {activePackage && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 text-xs leading-none grid place-items-center border-2 border-white shadow-lg animate-pulse">
                  <span className="font-bold">★</span>
                </div>
              )}
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-600 to-green-600 opacity-20 blur-lg scale-110"></div>
            </div>
            <div className="flex-1">
              <div className={`font-black text-xl mb-1 transition-colors duration-200 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>{userName}</div>
              <div className={`text-sm mb-3 transition-colors duration-200 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>{userEmail}</div>
              
              <div className="flex items-center gap-4">
                <div className={`px-3 py-1 rounded-full text-xs font-bold transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-emerald-900/30 text-emerald-300 border border-emerald-700/50' 
                    : 'bg-emerald-100 text-emerald-700 border border-emerald-200/50'
                }`}>
                  💰 {balance} AZN
                </div>
                {activePackage && (
                  <div className={`px-3 py-1 rounded-full text-xs font-bold transition-colors duration-200 ${
                    isDarkMode 
                      ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-700/50' 
                      : 'bg-yellow-100 text-yellow-700 border border-yellow-200/50'
                  }`}>
                    👑 {activePackage.name}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Enhanced Theme Settings */}
        <Card variant="elevated" padding="lg" className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-2xl">🎨</div>
            <h3 className={`font-black text-lg transition-colors duration-200 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>Tema</h3>
          </div>
          <div className="space-y-3">
            {themeOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                  theme === option.value
                    ? isDarkMode
                      ? 'border-emerald-500 bg-emerald-900/30 shadow-lg'
                      : 'border-emerald-500 bg-emerald-50 shadow-lg'
                    : isDarkMode
                      ? 'border-gray-600/50 bg-gray-700/30 hover:bg-gray-700/50 hover:border-gray-500'
                      : 'border-gray-300/50 bg-gray-50/50 hover:bg-gray-100/50 hover:border-gray-400'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  theme === option.value
                    ? 'border-emerald-500 bg-emerald-500'
                    : isDarkMode ? 'border-gray-500' : 'border-gray-400'
                }`}>
                  {theme === option.value && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <input
                  type="radio"
                  name="theme"
                  value={option.value}
                  checked={theme === option.value}
                  onChange={(e) => setTheme(e.target.value as any)}
                  className="sr-only"
                />
                <div className="flex-1">
                  <div className={`font-bold mb-1 transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>{option.label}</div>
                  <div className={`text-sm transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>{option.description}</div>
                </div>
              </label>
            ))}
          </div>
        </Card>

        {/* Enhanced Language Settings */}
        <Card variant="elevated" padding="lg" className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-2xl">🌐</div>
            <h3 className={`font-black text-lg transition-colors duration-200 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>Dil</h3>
          </div>
          <div className="space-y-3">
            {languageOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                  language === option.value
                    ? isDarkMode
                      ? 'border-emerald-500 bg-emerald-900/30 shadow-lg'
                      : 'border-emerald-500 bg-emerald-50 shadow-lg'
                    : isDarkMode
                      ? 'border-gray-600/50 bg-gray-700/30 hover:bg-gray-700/50 hover:border-gray-500'
                      : 'border-gray-300/50 bg-gray-50/50 hover:bg-gray-100/50 hover:border-gray-400'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  language === option.value
                    ? 'border-emerald-500 bg-emerald-500'
                    : isDarkMode ? 'border-gray-500' : 'border-gray-400'
                }`}>
                  {language === option.value && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <input
                  type="radio"
                  name="language"
                  value={option.value}
                  checked={language === option.value}
                  onChange={(e) => setLanguage(e.target.value as any)}
                  className="sr-only"
                />
                <div className={`font-bold transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>{option.label}</div>
              </label>
            ))}
          </div>
        </Card>

        {/* Enhanced Settings Sections */}
        {settingsItems.map((section) => (
          <div key={section.section} className="mb-6">
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="text-lg">⚙️</div>
              <h3 className={`font-black text-lg transition-colors duration-200 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>{section.section}</h3>
            </div>
            <Card variant="elevated" padding="sm">
              <div className="space-y-2">
                {section.items.map((item, index) => (
                  <button
                    key={item.key}
                    onClick={item.action}
                    className={`w-full p-4 flex items-center gap-4 text-left transition-all duration-300 rounded-2xl transform hover:scale-[1.02] group ${
                      isDarkMode 
                        ? 'hover:bg-gray-700/50 text-gray-200' 
                        : 'hover:bg-gray-50/80 text-gray-900'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-110 ${
                      isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100/80'
                    }`}>
                      {item.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-base">{item.label}</div>
                    </div>
                    <div className={`transition-all duration-300 text-xl group-hover:translate-x-1 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-400'
                    }`}>→</div>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        ))}

        {/* Enhanced Logout Button */}
        <Card variant="elevated" padding="md" className="mb-8">
          <button
            onClick={() => {
              if (confirm('Hesabdan çıxmaq istədiyinizə əminsiniz?')) {
                alert('Çıxış (demo)');
              }
            }}
            className="w-full p-4 flex items-center justify-center gap-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-all duration-300 font-bold text-lg transform hover:scale-[1.02] active:scale-[0.98] group"
          >
            <div className="w-10 h-10 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-110">
              🚪
            </div>
            Hesabdan çıx
          </button>
        </Card>
      </div>
    </div>
  );
}