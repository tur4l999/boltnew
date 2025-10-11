import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { EmojiIcon } from '../ui/EmojiIcon';

export function UpdatesScreen() {
  const { goBack, isDarkMode } = useApp();

  const updateHistory = [
    {
      version: 'v1.0.0',
      date: '04 Okt 2025',
      current: true,
      features: [
        'Yeni modern dizayn',
        'Sürətli performans',
        'Offline dəstəyi',
        'AI çat köməkçisi',
        'Şəkillərə gizli watermark əlavə edildi'
      ]
    },
    {
      version: 'v0.9.5',
      date: '15 Sen 2025',
      current: false,
      features: [
        'Bug düzəlişləri',
        'İmtahan sistemi təkmilləşdirilməsi',
        'Qaranlıq tema yaxşılaşdırıldı'
      ]
    },
    {
      version: 'v0.9.0',
      date: '01 Avq 2025',
      current: false,
      features: [
        'Video dərs sistemi',
        'Sürücülük simulyatoru',
        'İnteraktiv yol nişanları'
      ]
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-300 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
        : 'bg-gradient-to-br from-gray-50 via-white to-emerald-50'
    } pt-11`}>
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-10 right-10 w-40 h-40 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-green-500/5' : 'bg-green-400/10'
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
              isDarkMode ? 'from-green-400 to-emerald-400' : 'from-green-600 to-emerald-600'
            } bg-clip-text text-transparent`}>
              Yeniləmələr
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Tətbiq versiyası və yeniliklər
            </p>
          </div>
        </div>

        {/* Current Version */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp">
          <div className={`p-6 rounded-3xl text-center ${
            isDarkMode 
              ? 'bg-gradient-to-br from-emerald-900/30 to-green-900/30 border-2 border-emerald-500/30' 
              : 'bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200'
          }`}>
            <div className="text-6xl mb-4">🎉</div>
            <div className={`text-4xl font-black mb-2 ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
              v1.0.0
            </div>
            <div className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Cari versiya
            </div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
              isDarkMode ? 'bg-emerald-600' : 'bg-emerald-600'
            } text-white font-bold`}>
              ✓ Ən son versiya quraşdırılıb
            </div>
          </div>
        </Card>

        {/* Auto Update Setting */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'
            }`}>
              <EmojiIcon emoji="🔄" size={20} />
            </div>
            <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Yeniləmə ayarları
            </h2>
          </div>

          <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold mb-1">Avtomatik yeniləmə</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Yeni versiyalar avtomatik quraşdırılsın
                </div>
              </div>
              <button className="w-14 h-8 rounded-full bg-emerald-600">
                <div className="w-6 h-6 rounded-full bg-white translate-x-7 transition-transform duration-300"></div>
              </button>
            </div>
          </div>

          <button
            onClick={() => alert('Yeniləmələr yoxlanılır... (demo)')}
            className={`w-full mt-4 p-4 rounded-2xl border-2 font-bold transition-all duration-300 hover:scale-[1.02] ${
              isDarkMode 
                ? 'border-emerald-500/50 bg-emerald-900/20 hover:bg-emerald-900/30 text-emerald-300' 
                : 'border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
            }`}
          >
            🔍 Yeniləməni yoxla
          </button>
        </Card>

        {/* Update History */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-purple-600/20' : 'bg-purple-100'
            }`}>
              <EmojiIcon emoji="📋" size={20} />
            </div>
            <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Yeniləmə tarixçəsi
            </h2>
          </div>

          <div className="space-y-4">
            {updateHistory.map((update, index) => (
              <div
                key={update.version}
                className={`p-5 rounded-2xl border-2 ${
                  update.current
                    ? isDarkMode
                      ? 'border-emerald-500/50 bg-emerald-900/20'
                      : 'border-emerald-500/50 bg-emerald-50'
                    : isDarkMode
                      ? 'border-gray-700 bg-gray-800/50'
                      : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-lg">{update.version}</span>
                      {update.current && (
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          isDarkMode ? 'bg-emerald-600 text-white' : 'bg-emerald-600 text-white'
                        }`}>
                          Cari
                        </span>
                      )}
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      📅 {update.date}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className={`text-sm font-bold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Yeniliklər:
                  </div>
                  {update.features.map((feature, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                    >
                      <span className="text-emerald-500">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Roadmap */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-yellow-600/20' : 'bg-yellow-100'
            }`}>
              <EmojiIcon emoji="🗺️" size={20} />
            </div>
            <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Gələcək yeniliklər
            </h2>
          </div>

          <div className="space-y-3">
            <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
              <div className="flex items-start gap-3">
                <div className="text-2xl">🎮</div>
                <div>
                  <div className="font-bold mb-1">VR Simulyator</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Virtual reallıq ilə sürücülük təcrübəsi
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
              <div className="flex items-start gap-3">
                <div className="text-2xl">🤖</div>
                <div>
                  <div className="font-bold mb-1">AI Müəllim</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Süni intellekt əsaslı fərdi təlim
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
              <div className="flex items-start gap-3">
                <div className="text-2xl">👥</div>
                <div>
                  <div className="font-bold mb-1">Canlı Dərslər</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Müəllimlə canlı video dərs imkanı
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
