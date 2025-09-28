import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { EmojiIcon } from '../ui/EmojiIcon';

export function SettingsScreen() {
  const { goBack, language, setLanguage, theme, setTheme, balance, simulatorBalance, activePackage, isDarkMode } = useApp();
  const [themeExpanded, setThemeExpanded] = useState(false);
  const [languageExpanded, setLanguageExpanded] = useState(false);
  const [referralCode] = useState('DDA2025TURAL'); // Demo referral code
  const userName = "Tural Qarayev";
  const userEmail = "tural.qarayev@example.com";

  const themeOptions = [
    { value: 'light', label: <><EmojiIcon emoji="☀️" size={16} className="inline-block mr-2" />Gündüz</>, description: 'Açıq tema' },
    { value: 'dark', label: <><EmojiIcon emoji="🌙" size={16} className="inline-block mr-2" />Gecə</>, description: 'Qaranlıq tema' },
    { value: 'system', label: <><EmojiIcon emoji="📱" size={16} className="inline-block mr-2" />Cihaza uyğun</>, description: 'Sistem ayarına görə' }
  ];

  const languageOptions = [
    { value: 'az', label: '🇦🇿 Azərbaycan dili' },
    { value: 'ru', label: '🇷🇺 Русский язык' }
  ];

  const settingsItems = [
    {
      section: 'Hesabım',
      items: [
        { key: 'profile', label: 'Profil məlumatları', emoji: '👤', action: () => alert('Profil məlumatları (demo)') },
        { key: 'security', label: 'Təhlükəsizlik', emoji: '🔒', action: () => alert('Təhlükəsizlik (demo)') },
        { key: 'privacy', label: 'Məxfilik', emoji: '🛡️', action: () => alert('Məxfilik (demo)') },
        { key: 'notifications', label: 'Bildirişlər', emoji: '🔔', action: () => alert('Bildiriş ayarları (demo)') }
      ]
    },
    {
      section: 'Tətbiq',
      items: [
        { key: 'offline', label: 'Offline məzmun', emoji: '📱', action: () => alert('Offline məzmun (demo)') },
        { key: 'cache', label: 'Keş təmizlə', emoji: '🗑️', action: () => alert('Keş təmizləndi (demo)') },
        { key: 'updates', label: 'Yeniləmələr', emoji: '🔄', action: () => alert('Yeniləmələr (demo)') }
      ]
    },
    {
      section: 'Dəstək',
      items: [
        { key: 'help', label: 'Kömək mərkəzi', emoji: '❓', action: () => alert('Kömək mərkəzi (demo)') },
        { key: 'contact', label: 'Bizimlə əlaqə', emoji: '📞', action: () => alert('Əlaqə (demo)') },
        { key: 'feedback', label: 'Rəy bildirin', emoji: '💬', action: () => alert('Rəy bildirin (demo)') },
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

        {/* Enhanced Profile Card with Modern Animations */}
        <Card variant="elevated" padding="lg" className="mb-8 animate-fadeInUp hover-lift" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-500 text-white flex items-center justify-center font-black text-2xl shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                {userName.charAt(0).toUpperCase()}
              </div>
              {activePackage && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 text-xs leading-none grid place-items-center border-2 border-white shadow-lg animate-bounce-subtle">
                  <span className="font-bold">★</span>
                </div>
              )}
              {/* Enhanced glow effect with animation */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-600 to-green-600 opacity-20 blur-lg scale-110 group-hover:opacity-30 group-hover:scale-125 transition-all duration-300"></div>
            </div>
            <div className="flex-1">
              <div className={`font-black text-xl mb-1 transition-all duration-200 bg-gradient-to-r ${
                isDarkMode ? 'from-gray-100 to-gray-300' : 'from-gray-900 to-gray-700'
              } bg-clip-text text-transparent`}>
                {userName}
              </div>
              <div className={`text-sm mb-3 transition-colors duration-200 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>{userEmail}</div>
              
              <div className="flex items-center gap-2 flex-wrap">
                <div className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-emerald-900/30 text-emerald-300 border border-emerald-700/50 hover:bg-emerald-900/50 hover:shadow-lg' 
                    : 'bg-emerald-100 text-emerald-700 border border-emerald-200/50 hover:bg-emerald-200 hover:shadow-lg'
                }`}>
                  💰 {balance} AZN
                </div>
                <div className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-blue-900/30 text-blue-300 border border-blue-700/50 hover:bg-blue-900/50 hover:shadow-lg' 
                    : 'bg-blue-100 text-blue-700 border border-blue-200/50 hover:bg-blue-200 hover:shadow-lg'
                }`}>
                  🧪 {simulatorBalance} Simulyator
                </div>
                {activePackage && (
                  <div className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 hover:scale-105 animate-glow ${
                    isDarkMode 
                      ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-700/50 hover:bg-yellow-900/50' 
                      : 'bg-yellow-100 text-yellow-700 border border-yellow-200/50 hover:bg-yellow-200'
                  }`}>
                    👑 {activePackage.name}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Collapsible Theme Settings */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          <button
            onClick={() => setThemeExpanded(!themeExpanded)}
            className="w-full flex items-center justify-between gap-3 text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl"><EmojiIcon emoji="🎨" size={24} /></div>
              <div>
                <h3 className={`font-black text-lg transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>Tema</h3>
                <p className={`text-sm transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {theme === 'light' ? 'Gündüz rejimi' : theme === 'dark' ? 'Gecə rejimi' : 'Sistem ayarı'}
                </p>
              </div>
            </div>
            <div className={`text-xl transition-transform duration-300 ${
              themeExpanded ? 'rotate-180' : 'rotate-0'
            } ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} group-hover:scale-110`}>
              ↓
            </div>
          </button>
          
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
            themeExpanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}>
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
          </div>
        </Card>

        {/* Collapsible Language Settings */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
          <button
            onClick={() => setLanguageExpanded(!languageExpanded)}
            className="w-full flex items-center justify-between gap-3 text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">🌐</div>
              <div>
                <h3 className={`font-black text-lg transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>Dil</h3>
                <p className={`text-sm transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {language === 'az' ? 'Azərbaycan dili' : 'Русский язык'}
                </p>
              </div>
            </div>
            <div className={`text-xl transition-transform duration-300 ${
              languageExpanded ? 'rotate-180' : 'rotate-0'
            } ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} group-hover:scale-110`}>
              ↓
            </div>
          </button>
          
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
            languageExpanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}>
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
          </div>
        </Card>

        {/* Referral Section */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '500ms' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="text-2xl">🎁</div>
            <h3 className={`font-black text-lg transition-colors duration-200 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>Referal proqram</h3>
          </div>
          
          <div className={`p-4 rounded-2xl border-2 mb-4 ${
            isDarkMode 
              ? 'border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20' 
              : 'border-purple-300/50 bg-gradient-to-r from-purple-50 to-pink-50'
          }`}>
            <div className={`text-sm mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
              Sizin referal kodunuz
            </div>
            <div className="flex items-center gap-3">
              <div className={`flex-1 px-4 py-2 rounded-xl border font-mono text-lg font-bold ${
                isDarkMode 
                  ? 'border-purple-500/50 bg-purple-900/30 text-purple-200' 
                  : 'border-purple-300 bg-purple-100 text-purple-800'
              }`}>
                {referralCode}
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(referralCode);
                  alert('Referal kod kopyalandı!');
                }}
                className={`px-4 py-2 rounded-xl border font-bold transition-all duration-300 transform hover:scale-105 ${
                  isDarkMode 
                    ? 'border-purple-500 bg-purple-600 hover:bg-purple-700 text-white' 
                    : 'border-purple-500 bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                📋 Kopyala
              </button>
            </div>
          </div>
          
          <div className={`p-4 rounded-2xl ${
            isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
          }`}>
            <div className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              🎯 Dostlarınızı dəvət edin və hər biri üçün bonus qazanın!
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className={`text-center p-3 rounded-xl ${
                isDarkMode ? 'bg-emerald-900/30' : 'bg-emerald-100'
              }`}>
                <div className={`text-xl font-bold ${
                  isDarkMode ? 'text-emerald-300' : 'text-emerald-700'
                }`}>0</div>
                <div className={`text-xs ${
                  isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                }`}>Dəvət edilən</div>
              </div>
              <div className={`text-center p-3 rounded-xl ${
                isDarkMode ? 'bg-yellow-900/30' : 'bg-yellow-100'
              }`}>
                <div className={`text-xl font-bold ${
                  isDarkMode ? 'text-yellow-300' : 'text-yellow-700'
                }`}>0 AZN</div>
                <div className={`text-xs ${
                  isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                }`}>Qazanılan bonus</div>
              </div>
            </div>
            
            <button
              onClick={() => alert('Referal proqram haqqında ətraflı məlumat (demo)')}
              className={`w-full mt-4 p-3 rounded-xl border font-bold transition-all duration-300 transform hover:scale-[1.02] ${
                isDarkMode 
                  ? 'border-purple-500/50 bg-purple-900/30 hover:bg-purple-900/50 text-purple-300' 
                  : 'border-purple-300 bg-purple-50 hover:bg-purple-100 text-purple-700'
              }`}
            >
              📖 Proqram haqqında ətraflı
            </button>
          </div>
        </Card>

        {/* Enhanced Settings Sections with Modern Animations */}
        {settingsItems.map((section, sectionIndex) => (
          <div 
            key={section.section} 
            className="mb-8 animate-fadeInUp"
            style={{ animationDelay: `${(sectionIndex + 4) * 100}ms` }}
          >
            <div className="flex items-center gap-4 mb-6 px-2">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                isDarkMode ? 'bg-gradient-to-br from-emerald-600/20 to-green-600/20' : 'bg-gradient-to-br from-emerald-100 to-green-100'
              }`}>
                <EmojiIcon emoji="⚙️" size={20} />
              </div>
              <h3 className={`font-black text-xl transition-colors duration-200 bg-gradient-to-r ${
                isDarkMode ? 'from-gray-100 to-gray-300' : 'from-gray-800 to-gray-600'
              } bg-clip-text text-transparent`}>
                {section.section}
              </h3>
            </div>
            <Card variant="elevated" padding="sm" className="overflow-hidden">
              <div className="space-y-1">
                {section.items.map((item, index) => (
                  <button
                    key={item.key}
                    onClick={item.action}
                    className={`w-full p-5 flex items-center gap-5 text-left transition-all duration-300 rounded-2xl transform hover:scale-[1.01] active:scale-[0.99] group relative overflow-hidden ${
                      isDarkMode 
                        ? 'hover:bg-gradient-to-r hover:from-gray-700/30 hover:to-gray-600/30 text-gray-200' 
                        : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 text-gray-900'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Hover gradient effect */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-emerald-600/5 via-transparent to-blue-600/5' 
                        : 'bg-gradient-to-r from-emerald-400/5 via-transparent to-blue-400/5'
                    }`}></div>
                    
                    <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                      isDarkMode 
                        ? 'bg-gradient-to-br from-gray-700/60 to-gray-600/60 group-hover:from-gray-600/80 group-hover:to-gray-500/80' 
                        : 'bg-gradient-to-br from-gray-100 to-gray-200/80 group-hover:from-gray-200 group-hover:to-gray-300/80'
                    } shadow-lg group-hover:shadow-xl`}>
                      <EmojiIcon emoji={item.emoji} size={22} />
                    </div>
                    <div className="flex-1 relative">
                      <div className="font-bold text-lg group-hover:translate-x-1 transition-transform duration-300">
                        {item.label}
                      </div>
                      <div className={`text-sm mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Ətraflı məlumat və ayarlar
                      </div>
                    </div>
                    <div className={`relative transition-all duration-300 text-2xl group-hover:translate-x-2 group-hover:scale-110 ${
                      isDarkMode ? 'text-gray-400 group-hover:text-emerald-400' : 'text-gray-400 group-hover:text-emerald-600'
                    }`}>
                      →
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        ))}

        {/* Enhanced Logout Button with Modern Design */}
        <Card variant="elevated" padding="md" className="mb-8 animate-fadeInUp" style={{ animationDelay: '600ms' }}>
          <button
            onClick={() => {
              if (confirm('Hesabdan çıxmaq istədiyinizə əminsiniz?')) {
                alert('Çıxış (demo)');
              }
            }}
            className={`w-full p-5 flex items-center justify-center gap-4 rounded-2xl transition-all duration-300 font-bold text-lg transform hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden ${
              isDarkMode 
                ? 'text-red-400 hover:bg-gradient-to-r hover:from-red-900/30 hover:to-pink-900/30 border-2 border-red-500/30 hover:border-red-400/50' 
                : 'text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 border-2 border-red-300/30 hover:border-red-400/50'
            }`}
          >
            {/* Animated background effect */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-red-600/10 via-transparent to-pink-600/10' 
                : 'bg-gradient-to-r from-red-400/10 via-transparent to-pink-400/10'
            }`}></div>
            
            <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-red-900/40 to-pink-900/40 group-hover:from-red-800/60 group-hover:to-pink-800/60' 
                : 'bg-gradient-to-br from-red-100 to-pink-100 group-hover:from-red-200 group-hover:to-pink-200'
            } shadow-lg group-hover:shadow-xl`}>
              🚪
            </div>
            <span className="relative group-hover:translate-x-1 transition-transform duration-300">
              Hesabdan çıx
            </span>
            
            {/* Subtle shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            </div>
          </button>
        </Card>
      </div>
    </div>
  );
}