import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { EmojiIcon } from '../ui/EmojiIcon';

export function PrivacyScreen() {
  const { goBack, isDarkMode } = useApp();
  const [settings, setSettings] = useState({
    dataCollection: true,
    analytics: false,
    personalization: true,
    thirdPartySharing: false,
    marketingEmails: false,
    profileVisibility: 'private'
  });

  const toggleSetting = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  return (
    <div className={`min-h-screen transition-all duration-300 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
        : 'bg-gradient-to-br from-gray-50 via-white to-emerald-50'
    } pt-11`}>
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-10 right-10 w-40 h-40 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-purple-500/5' : 'bg-purple-400/10'
        }`}></div>
      </div>

      <div className="relative z-10 p-4 pb-24">
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
              isDarkMode ? 'from-purple-400 to-pink-400' : 'from-purple-600 to-pink-600'
            } bg-clip-text text-transparent`}>
              Məxfilik
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Məlumat paylaşımını idarə edin
            </p>
          </div>
        </div>

        {/* Data Collection */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-purple-600/20' : 'bg-purple-100'
            }`}>
              <EmojiIcon emoji="📊" size={20} />
            </div>
            <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Məlumat toplanması
            </h2>
          </div>

          <div className="space-y-3">
            <div className={`p-4 rounded-2xl border-2 ${
              isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <div className="font-bold mb-1">İstifadə statistikası</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Tətbiqdən necə istifadə etdiyinizi görmək üçün anonim məlumat toplanması
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting('dataCollection')}
                  className={`ml-4 w-14 h-8 rounded-full transition-all duration-300 flex-shrink-0 ${
                    settings.dataCollection
                      ? 'bg-emerald-600'
                      : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 ${
                    settings.dataCollection ? 'translate-x-7' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border-2 ${
              isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <div className="font-bold mb-1">Analitika</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Xidmətin keyfiyyətini yaxşılaşdırmaq üçün analitik məlumatların paylaşılması
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting('analytics')}
                  className={`ml-4 w-14 h-8 rounded-full transition-all duration-300 flex-shrink-0 ${
                    settings.analytics
                      ? 'bg-emerald-600'
                      : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 ${
                    settings.analytics ? 'translate-x-7' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border-2 ${
              isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <div className="font-bold mb-1">Fərdiləşdirmə</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Sizə uyğun məzmun və tövsiyələr göstərmək üçün məlumat istifadəsi
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting('personalization')}
                  className={`ml-4 w-14 h-8 rounded-full transition-all duration-300 flex-shrink-0 ${
                    settings.personalization
                      ? 'bg-emerald-600'
                      : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 ${
                    settings.personalization ? 'translate-x-7' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Account Visibility */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-emerald-600/20' : 'bg-emerald-100'
            }`}>
              <EmojiIcon emoji="👁️" size={20} />
            </div>
            <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Profil görünməsi
            </h2>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setSettings(prev => ({ ...prev, profileVisibility: 'public' }))}
              className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all duration-300 ${
                settings.profileVisibility === 'public'
                  ? isDarkMode
                    ? 'border-emerald-500 bg-emerald-900/20'
                    : 'border-emerald-500 bg-emerald-50'
                  : isDarkMode
                    ? 'border-gray-700 bg-gray-800/50 hover:bg-gray-700/50'
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div>
                <div className="font-bold mb-1">Açıq</div>
                <div className={`text-sm text-left ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Hər kəs profilinizi görə bilər
                </div>
              </div>
              {settings.profileVisibility === 'public' && <div className="text-2xl">✓</div>}
            </button>

            <button
              onClick={() => setSettings(prev => ({ ...prev, profileVisibility: 'private' }))}
              className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all duration-300 ${
                settings.profileVisibility === 'private'
                  ? isDarkMode
                    ? 'border-emerald-500 bg-emerald-900/20'
                    : 'border-emerald-500 bg-emerald-50'
                  : isDarkMode
                    ? 'border-gray-700 bg-gray-800/50 hover:bg-gray-700/50'
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div>
                <div className="font-bold mb-1">Məxfi</div>
                <div className={`text-sm text-left ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Yalnız siz profilinizi görə bilərsiniz
                </div>
              </div>
              {settings.profileVisibility === 'private' && <div className="text-2xl">✓</div>}
            </button>
          </div>
        </Card>

        {/* Data Export & Delete */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-yellow-600/20' : 'bg-yellow-100'
            }`}>
              <EmojiIcon emoji="📦" size={20} />
            </div>
            <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Məlumatlarınız
            </h2>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                if (confirm('Bütün məlumatlarınız silinəcək! Bu əməliyyat geri qaytarıla bilməz. Davam etmək istəyirsiniz?')) {
                  alert('Hesab silmə sorğusu göndərildi (demo)');
                }
              }}
              className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all duration-300 hover:scale-[1.02] ${
                isDarkMode 
                  ? 'border-red-500/50 bg-red-900/20 hover:bg-red-900/30 text-red-300' 
                  : 'border-red-300 bg-red-50 hover:bg-red-100 text-red-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">🗑️</div>
                <div className="text-left">
                  <div className="font-bold">Hesabı sil</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Bütün məlumatlarınızı qalıcı olaraq silin
                  </div>
                </div>
              </div>
              <div className="text-2xl">→</div>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
