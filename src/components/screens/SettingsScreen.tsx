import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { EmojiIcon } from '../ui/EmojiIcon';
import { Icon } from '../icons/Icon';

export function SettingsScreen() {
  const { goBack, navigate, language, setLanguage, theme, setTheme, balance, simulatorBalance, activePackage, isDarkMode } = useApp();
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
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
      sectionIcon: 'user',
      items: [
        { key: 'profile', label: 'Profil məlumatları', icon: 'user', description: 'Ad, soyad, email və şəxsi məlumatlar', action: () => navigate('Profile') },
        { key: 'security', label: 'Təhlükəsizlik', icon: 'lock', description: 'Şifrə dəyişikliyi və təhlükəsizlik ayarları', action: () => navigate('Security') },
        { key: 'privacy', label: 'Məxfilik', icon: 'shield', description: 'Məlumat paylaşımı və məxfilik parametrləri', action: () => navigate('Privacy') },
        { key: 'notifications', label: 'Bildirişlər', icon: 'bell', description: 'Push bildirişlər və email ayarları', action: () => navigate('NotificationSettings') }
      ]
    },
    {
      section: 'Tətbiq',
      sectionIcon: 'smartphone',
      items: [
        { key: 'offline', label: 'Offline məzmun', icon: 'download', description: 'İnternetsizdə istifadə üçün yükləmələr', action: () => navigate('OfflineContent') },
        { key: 'cache', label: 'Keş təmizlə', icon: 'trash-2', description: 'Yaddaş təmizliyi və optimallaşdırma', action: () => {
          if (confirm('Tətbiqin keş məlumatları silinəcək. Davam etmək istəyirsiniz?')) {
            alert('✅ Keş təmizləndi!\n\n📦 Azad edildi: ~45 MB\n🚀 Tətbiq performansı yaxşılaşdırıldı\n\nTətbiq daha sürətli işləyəcək.');
          }
        } },
        { key: 'updates', label: 'Yeniləmələr', icon: 'refresh-cw', description: 'Avtomatik yeniləmə və versiya məlumatı', action: () => navigate('Updates') }
      ]
    },
    {
      section: 'Dəstək',
      sectionIcon: 'life-buoy',
      items: [
        { key: 'help', label: 'Kömək mərkəzi', icon: 'help-circle', description: 'Tez-tez verilən suallar və istifadə təlimatı', action: () => navigate('HelpCenter') },
        { key: 'contact', label: 'Bizimlə əlaqə', icon: 'phone', description: 'Dəstək komandası ilə əlaqə qurun', action: () => navigate('Contact') },
        { key: 'feedback', label: 'Rəy bildirin', icon: 'message-square', description: 'Təklifinizi və fikirlərinizi paylaşın', action: () => navigate('Feedback') },
        { key: 'about', label: 'Haqqında', icon: 'info', description: 'Tətbiq versiyası və hüquqi məlumatlar', action: () => navigate('About') }
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
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={goBack}
            className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ${
              isDarkMode 
                ? 'border-gray-600/50 bg-gray-800/80 hover:bg-gray-700/80 text-gray-200 backdrop-blur-sm' 
                : 'border-gray-300/50 bg-white/80 hover:bg-gray-50/80 text-gray-700 backdrop-blur-sm'
            }`}
          >
            <span className="text-lg">←</span>
          </button>
          <div>
            <h1 className={`text-xl font-black transition-colors duration-200 bg-gradient-to-r ${
              isDarkMode ? 'from-emerald-400 to-green-400' : 'from-emerald-600 to-green-600'
            } bg-clip-text text-transparent`}>
              Parametrlər
            </h1>
          </div>
        </div>

        {/* Enhanced Profile Card with Modern Animations */}
        <Card variant="elevated" padding="md" className="mb-6 animate-fadeInUp hover-lift" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-500 text-white flex items-center justify-center font-black text-xl shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                {userName.charAt(0).toUpperCase()}
              </div>
              {activePackage && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 text-[10px] leading-none grid place-items-center border-2 border-white shadow-lg animate-bounce-subtle">
                  <span className="font-bold">★</span>
                </div>
              )}
              {/* Enhanced glow effect with animation */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-600 to-green-600 opacity-20 blur-lg scale-110 group-hover:opacity-30 group-hover:scale-125 transition-all duration-300"></div>
            </div>
            <div className="flex-1">
              <div className={`font-bold text-lg mb-1 transition-all duration-200 bg-gradient-to-r ${
                isDarkMode ? 'from-gray-100 to-gray-300' : 'from-gray-900 to-gray-700'
              } bg-clip-text text-transparent`}>
                {userName}
              </div>
              <div className={`text-sm mb-3 transition-colors duration-200 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>{userEmail}</div>
              
              <div className="flex items-center gap-2 flex-wrap">
                <div className={`px-2 py-1 rounded-full text-xs font-bold transition-all duration-300 hover:scale-105 ${
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
        <Card variant="elevated" padding="md" className="mb-4 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          <button
            onClick={() => setThemeMenuOpen(!themeMenuOpen)}
            className="w-full flex items-center justify-between gap-3 text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="text-xl"><EmojiIcon emoji="🎨" size={20} /></div>
              <div>
                <h3 className={`font-bold text-base transition-colors duration-200 ${
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
              themeMenuOpen ? 'rotate-180' : 'rotate-0'
            } ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              ↓
            </div>
          </button>
          
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
            themeMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}>
            <div className="space-y-3">
              {themeOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-4 p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
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
                    <div className={`text-xs transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </Card>

        {/* Collapsible Language Settings */}
        <Card variant="elevated" padding="md" className="mb-4 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
          <button
            onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
            className="w-full flex items-center justify-between gap-3 text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="text-xl">🌐</div>
              <div>
                <h3 className={`font-bold text-base transition-colors duration-200 ${
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
              languageMenuOpen ? 'rotate-180' : 'rotate-0'
            } ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              ↓
            </div>
          </button>
          
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
            languageMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}>
            <div className="space-y-3">
              {languageOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-4 p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
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
        <Card variant="elevated" padding="md" className="mb-4 animate-fadeInUp" style={{ animationDelay: '500ms' }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="text-xl">🎁</div>
            <h3 className={`font-bold text-base transition-colors duration-200 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>Referal proqram</h3>
          </div>
          
          {/* 1. Əvvəlcə statistika */}
          <div className={`p-4 rounded-2xl mb-4 ${
            isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
          }`}>
            <div className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              🎯 Dostlarınızı dəvət edin və hər biri üçün bonus qazanın!
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => navigate('ReferralList')}
                className={`text-center p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                  isDarkMode ? 'bg-emerald-900/30 hover:bg-emerald-900/40' : 'bg-emerald-100 hover:bg-emerald-200'
                }`}
              >
                <div className={`text-xl font-bold ${
                  isDarkMode ? 'text-emerald-300' : 'text-emerald-700'
                }`}>5</div>
                <div className={`text-xs ${
                  isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                }`}>Dəvət edilən</div>
              </button>
              <button
                onClick={() => navigate('ReferralList')}
                className={`text-center p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                  isDarkMode ? 'bg-yellow-900/30 hover:bg-yellow-900/40' : 'bg-yellow-100 hover:bg-yellow-200'
                }`}
              >
                <div className={`text-xl font-bold ${
                  isDarkMode ? 'text-yellow-300' : 'text-yellow-700'
                }`}>80 AZN</div>
                <div className={`text-xs ${
                  isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                }`}>Qazanılan bonus</div>
              </button>
            </div>
          </div>
          
          {/* 2. Sonra referal kodu */}
          <div className={`p-4 rounded-2xl ${
            isDarkMode 
              ? 'border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-2' 
              : 'border-purple-300/50 bg-gradient-to-r from-purple-50 to-pink-50 border-2'
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
          
          <div className={`mt-4 p-4 rounded-2xl ${
            isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
          }`}>
            
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
            <div className="flex items-center gap-3 mb-4 px-1">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isDarkMode ? 'bg-gradient-to-br from-emerald-600/20 to-green-600/20' : 'bg-gradient-to-br from-emerald-100 to-green-100'
              }`}>
                <Icon 
                  name={section.sectionIcon as any} 
                  size={20}
                  className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}
                />
              </div>
              <h3 className={`font-bold text-base transition-colors duration-200 bg-gradient-to-r ${
                isDarkMode ? 'from-gray-100 to-gray-300' : 'from-gray-800 to-gray-600'
              } bg-clip-text text-transparent`}>
                {section.section}
              </h3>
            </div>
            <Card variant="elevated" padding="xs" className="overflow-hidden">
              <div className="space-y-1">
                {section.items.map((item, index) => (
                  <button
                    key={item.key}
                    onClick={item.action}
                    className={`w-full p-3 flex items-center gap-3 text-left transition-all duration-300 rounded-xl transform hover:scale-[1.01] active:scale-[0.99] group relative overflow-hidden ${
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
                    
                    <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gradient-to-br from-gray-700/60 to-gray-600/60 group-hover:from-gray-600/80 group-hover:to-gray-500/80' 
                        : 'bg-gradient-to-br from-gray-100 to-gray-200/80 group-hover:from-gray-200 group-hover:to-gray-300/80'
                    } shadow-lg group-hover:shadow-xl`}>
                      <Icon 
                        name={item.icon as any} 
                        size={18}
                        className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}
                      />
                    </div>
                    <div className="flex-1 relative">
                      <div className="font-bold text-sm mb-1">
                        {item.label}
                      </div>
                      <div className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {item.description}
                      </div>
                    </div>
                    <div className={`relative transition-all duration-300 text-2xl ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-400'
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
        <Card variant="elevated" padding="sm" className="mb-6 animate-fadeInUp" style={{ animationDelay: '600ms' }}>
          <button
            onClick={() => {
              if (confirm('Hesabdan çıxmaq istədiyinizə əminsiniz?')) {
                alert('Çıxış (demo)');
              }
            }}
            className={`w-full p-3 flex items-center justify-center gap-3 rounded-xl transition-all duration-300 font-bold text-sm transform hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden ${
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
            
            <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-red-900/40 to-pink-900/40 group-hover:from-red-800/60 group-hover:to-pink-800/60' 
                : 'bg-gradient-to-br from-red-100 to-pink-100 group-hover:from-red-200 group-hover:to-pink-200'
            } shadow-lg group-hover:shadow-xl`}>
              🚪
            </div>
            <span className="relative">
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