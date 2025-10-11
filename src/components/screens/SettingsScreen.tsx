import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { EmojiIcon } from '../ui/EmojiIcon';
import { Icon } from '../icons/Icon';

export function SettingsScreen() {
  const { goBack, navigate, language, setLanguage, theme, setTheme, balance, simulatorBalance, drivingLessons, activePackage, isDarkMode } = useApp();
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [referralCode] = useState('DDA2025TURAL'); // Demo referral code
  const userName = "Tural Qarayev";
  const userEmail = "tural.qarayev@example.com";
  const schoolName = "DDA"; // School/organization name

  const themeOptions = [
    { value: 'light', label: <><EmojiIcon emoji="☀️" size={16} className="inline-block mr-2" />Gündüz</>, description: 'Açıq tema' },
    { value: 'dark', label: <><EmojiIcon emoji="🌙" size={16} className="inline-block mr-2" />Gecə</>, description: 'Qaranlıq tema' },
    { value: 'system', label: <><EmojiIcon emoji="📱" size={16} className="inline-block mr-2" />Cihaza uyğun</>, description: 'Sistem ayarına görə' }
  ];

  const languageOptions = [
    { value: 'az', label: '🇦🇿 Azərbaycan dili' },
    { value: 'ru', label: '🇷🇺 Русский язык' }
  ];

  const handleResetOnboarding = async () => {
    if (confirm('Onboarding ekranlarını yenidən görmək istəyirsiniz?')) {
      const { resetOnboarding } = await import('../../onboarding');
      await resetOnboarding();
      alert('Onboarding sıfırlandı! Tətbiqi yenidən açın.');
      window.location.reload();
    }
  };

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
        { key: 'resetOnboarding', label: 'Onboarding sıfırla', icon: 'refresh-cw', description: 'Giriş ekranlarını yenidən göstər', action: handleResetOnboarding },
        { key: 'updates', label: 'Versiya', icon: 'info', description: 'Tətbiq versiyası: 2.5.1', action: null }
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
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
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
          
          {/* Tema və Dil düymələri */}
          <div className="flex items-center gap-2 relative">
            {/* Tema menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setThemeMenuOpen(!themeMenuOpen);
                  setLanguageMenuOpen(false);
                }}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
                title="Tema"
              >
                <Icon name="palette" size={18} />
              </button>
              
              {themeMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setThemeMenuOpen(false)}
                  />
                  <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-2xl border-2 overflow-hidden z-50 ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    {themeOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setTheme(option.value as any);
                          setThemeMenuOpen(false);
                        }}
                        className={`w-full px-3 py-2.5 flex items-center gap-2 transition-all duration-200 ${
                          theme === option.value
                            ? isDarkMode
                              ? 'bg-emerald-700 text-emerald-100'
                              : 'bg-emerald-600 text-white'
                            : isDarkMode
                              ? 'hover:bg-gray-700 text-gray-200'
                              : 'hover:bg-gray-50 text-gray-800'
                        }`}
                      >
                        <span className="text-base">{option.label}</span>
                        {theme === option.value && <span className="ml-auto">✓</span>}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            
            {/* Dil menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setLanguageMenuOpen(!languageMenuOpen);
                  setThemeMenuOpen(false);
                }}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
                title="Dil"
              >
                <Icon name="globe" size={18} />
              </button>
              
              {languageMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setLanguageMenuOpen(false)}
                  />
                  <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-2xl border-2 overflow-hidden z-50 ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    {languageOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setLanguage(option.value as any);
                          setLanguageMenuOpen(false);
                        }}
                        className={`w-full px-3 py-2.5 flex items-center gap-2 transition-all duration-200 ${
                          language === option.value
                            ? isDarkMode
                              ? 'bg-emerald-700 text-emerald-100'
                              : 'bg-emerald-600 text-white'
                            : isDarkMode
                              ? 'hover:bg-gray-700 text-gray-200'
                              : 'hover:bg-gray-50 text-gray-800'
                        }`}
                      >
                        <span className="text-sm">{option.label}</span>
                        {language === option.value && <span className="ml-auto">✓</span>}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
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
              <button
                onClick={() => navigate('SchoolInfo')}
                className={`text-xs mb-1 transition-all duration-200 hover:underline inline-flex items-center gap-1 ${
                  isDarkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'
                }`}
              >
                Məktəb/Kurs: {schoolName} <span className="text-[10px]">→</span>
              </button>
              <div className={`text-sm mb-3 transition-colors duration-200 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>{userEmail}</div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-1.5 ${
                  isDarkMode 
                    ? 'bg-emerald-900/30 text-emerald-300 border border-emerald-700/50 hover:bg-emerald-900/50 hover:shadow-lg' 
                    : 'bg-emerald-100 text-emerald-700 border border-emerald-200/50 hover:bg-emerald-200 hover:shadow-lg'
                }`}>
                  <Icon name="dollar-sign" size={14} />
                  <span>{balance} AZN</span>
                </div>
                <div className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-1.5 ${
                  isDarkMode 
                    ? 'bg-blue-900/30 text-blue-300 border border-blue-700/50 hover:bg-blue-900/50 hover:shadow-lg' 
                    : 'bg-blue-100 text-blue-700 border border-blue-200/50 hover:bg-blue-200 hover:shadow-lg'
                }`}>
                  <Icon name="clipboard-check" size={14} />
                  <span>{simulatorBalance} Bilet</span>
                </div>
                <div className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-1.5 ${
                  isDarkMode 
                    ? 'bg-orange-900/30 text-orange-300 border border-orange-700/50 hover:bg-orange-900/50 hover:shadow-lg' 
                    : 'bg-orange-100 text-orange-700 border border-orange-200/50 hover:bg-orange-200 hover:shadow-lg'
                }`}>
                  <Icon name="navigation" size={14} />
                  <span>{drivingLessons} Sürmə</span>
                </div>
                {activePackage && (
                  <div className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-300 hover:scale-105 animate-glow flex items-center justify-center gap-1.5 ${
                    isDarkMode 
                      ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-700/50 hover:bg-yellow-900/50' 
                      : 'bg-yellow-100 text-yellow-700 border border-yellow-200/50 hover:bg-yellow-200'
                  }`}>
                    <Icon name="crown" size={14} />
                    <span>{activePackage.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Referral Section */}
        <Card variant="elevated" padding="md" className="mb-4 animate-fadeInUp" style={{ animationDelay: '500ms' }}>
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20' : 'bg-gradient-to-br from-purple-100 to-pink-100'
            }`}>
              <Icon name="gift" size={18} className={isDarkMode ? 'text-purple-400' : 'text-purple-600'} />
            </div>
            <h3 className={`font-bold text-base transition-colors duration-200 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>Referal proqram</h3>
          </div>
          
          {/* 1. Əvvəlcə statistika */}
          <div className={`p-4 rounded-2xl mb-4 ${
            isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
          }`}>
            <div className={`text-sm mb-3 flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <Icon name="target" size={16} className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'} />
              Dostlarınızı dəvət edin və hər biri üçün bonus qazanın!
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
                className={`px-4 py-2 rounded-xl border font-bold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                  isDarkMode 
                    ? 'border-purple-500 bg-purple-600 hover:bg-purple-700 text-white' 
                    : 'border-purple-500 bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                <Icon name="copy" size={16} /> Kopyala
              </button>
            </div>
          </div>
          
          <div className={`mt-4 p-4 rounded-2xl ${
            isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
          }`}>
            
            <button
              onClick={() => alert('Referal proqram haqqında ətraflı məlumat (demo)')}
              className={`w-full mt-4 p-3 rounded-xl border font-bold transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 ${
                isDarkMode 
                  ? 'border-purple-500/50 bg-purple-900/30 hover:bg-purple-900/50 text-purple-300' 
                  : 'border-purple-300 bg-purple-50 hover:bg-purple-100 text-purple-700'
              }`}
            >
              <Icon name="book-open" size={18} /> Proqram haqqında ətraflı
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
                    onClick={item.action || undefined}
                    disabled={!item.action}
                    className={`w-full p-3 flex items-center gap-3 text-left transition-all duration-300 rounded-xl transform group relative overflow-hidden ${
                      item.action 
                        ? `hover:scale-[1.01] active:scale-[0.99] cursor-pointer ${
                            isDarkMode 
                              ? 'hover:bg-gradient-to-r hover:from-gray-700/30 hover:to-gray-600/30 text-gray-200' 
                              : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 text-gray-900'
                          }`
                        : `cursor-default ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Hover gradient effect */}
                    {item.action && (
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        isDarkMode 
                          ? 'bg-gradient-to-r from-emerald-600/5 via-transparent to-blue-600/5' 
                          : 'bg-gradient-to-r from-emerald-400/5 via-transparent to-blue-400/5'
                      }`}></div>
                    )}
                    
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
              <Icon name="log-out" size={20} className={isDarkMode ? 'text-red-400' : 'text-red-600'} />
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