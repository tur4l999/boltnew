import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { EmojiIcon } from '../ui/EmojiIcon';

export function SecurityScreen() {
  const { goBack, isDarkMode } = useApp();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  const activeSessions = [
    { device: 'iPhone 14 Pro', location: 'Bakı, Azərbaycan', lastActive: 'İndi aktiv', current: true },
    { device: 'iPad Air', location: 'Bakı, Azərbaycan', lastActive: '2 saat əvvəl', current: false },
  ];

  return (
    <div className={`min-h-screen transition-all duration-300 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
        : 'bg-gradient-to-br from-gray-50 via-white to-emerald-50'
    } pt-11`}>
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-10 right-10 w-40 h-40 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-red-500/5' : 'bg-red-400/10'
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
              isDarkMode ? 'from-red-400 to-pink-400' : 'from-red-600 to-pink-600'
            } bg-clip-text text-transparent`}>
              Təhlükəsizlik
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Hesabınızı qoruyun
            </p>
          </div>
        </div>

        {/* Password Section */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-red-600/20' : 'bg-red-100'
            }`}>
              <EmojiIcon emoji="🔒" size={20} />
            </div>
            <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Şifrə
            </h2>
          </div>

          <button
            onClick={() => alert('Şifrə dəyişdirmə formu (demo)')}
            className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all duration-300 hover:scale-[1.02] ${
              isDarkMode 
                ? 'border-gray-700 bg-gray-800/50 hover:bg-gray-700/50 text-gray-200' 
                : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-900'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-2xl">🔑</div>
              <div className="text-left">
                <div className="font-bold">Şifrəni dəyişdir</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Son dəyişiklik: 30 gün əvvəl
                </div>
              </div>
            </div>
            <div className="text-2xl">→</div>
          </button>
        </Card>

        {/* Two Factor Authentication */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-emerald-600/20' : 'bg-emerald-100'
            }`}>
              <EmojiIcon emoji="🛡️" size={20} />
            </div>
            <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              İki faktorlu autentifikasiya
            </h2>
          </div>

          <div className={`p-4 rounded-2xl border-2 mb-4 ${
            twoFactorEnabled
              ? isDarkMode
                ? 'border-emerald-500/50 bg-emerald-900/20'
                : 'border-emerald-500/50 bg-emerald-50'
              : isDarkMode
                ? 'border-gray-700 bg-gray-800/50'
                : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-bold mb-1">SMS təsdiqləmə</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {twoFactorEnabled ? '✓ Aktiv' : 'Deaktiv'}
                </div>
              </div>
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`w-14 h-8 rounded-full transition-all duration-300 ${
                  twoFactorEnabled
                    ? 'bg-emerald-600'
                    : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                }`}
              >
                <div className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 ${
                  twoFactorEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}></div>
              </button>
            </div>
            {twoFactorEnabled && (
              <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-emerald-900/30' : 'bg-emerald-100'}`}>
                <div className={`text-sm ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                  📱 Təsdiqləmə kodu: +994 XX XXX XX 23
                </div>
              </div>
            )}
          </div>

          <div className={`p-4 rounded-2xl border-2 ${
            isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold mb-1">Biometrik autentifikasiya</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Face ID / Touch ID
                </div>
              </div>
              <button
                onClick={() => setBiometricEnabled(!biometricEnabled)}
                className={`w-14 h-8 rounded-full transition-all duration-300 ${
                  biometricEnabled
                    ? 'bg-emerald-600'
                    : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                }`}
              >
                <div className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 ${
                  biometricEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}></div>
              </button>
            </div>
          </div>
        </Card>

        {/* Active Sessions */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'
            }`}>
              <EmojiIcon emoji="📱" size={20} />
            </div>
            <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Aktiv cihazlar
            </h2>
          </div>

          <div className="space-y-3">
            {activeSessions.map((session, index) => (
              <div
                key={index}
                className={`p-4 rounded-2xl border-2 ${
                  session.current
                    ? isDarkMode
                      ? 'border-emerald-500/50 bg-emerald-900/20'
                      : 'border-emerald-500/50 bg-emerald-50'
                    : isDarkMode
                      ? 'border-gray-700 bg-gray-800/50'
                      : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-bold flex items-center gap-2">
                      {session.device}
                      {session.current && (
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          isDarkMode ? 'bg-emerald-600 text-white' : 'bg-emerald-600 text-white'
                        }`}>
                          Cari
                        </span>
                      )}
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      📍 {session.location}
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      🕐 {session.lastActive}
                    </div>
                  </div>
                  {!session.current && (
                    <button
                      onClick={() => alert('Sessiya sonlandırıldı')}
                      className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-300 hover:scale-105 ${
                        isDarkMode
                          ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                          : 'bg-red-100 text-red-600 hover:bg-red-200'
                      }`}
                    >
                      Sonlandır
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Security Tips */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-yellow-600/20' : 'bg-yellow-100'
            }`}>
              <EmojiIcon emoji="💡" size={20} />
            </div>
            <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Təhlükəsizlik məsləhətləri
            </h2>
          </div>

          <div className="space-y-3">
            <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
              <div className="flex items-start gap-3">
                <div className="text-2xl">✅</div>
                <div>
                  <div className="font-bold mb-1">Güclü şifrə istifadə edin</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Ən azı 8 simvol, böyük və kiçik hərflər, rəqəmlər və xüsusi simvollar
                  </div>
                </div>
              </div>
            </div>
            <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
              <div className="flex items-start gap-3">
                <div className="text-2xl">✅</div>
                <div>
                  <div className="font-bold mb-1">İki faktorlu autentifikasiyanı aktiv edin</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Hesabınıza əlavə təhlükəsizlik təbəqəsi əlavə edin
                  </div>
                </div>
              </div>
            </div>
            <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
              <div className="flex items-start gap-3">
                <div className="text-2xl">✅</div>
                <div>
                  <div className="font-bold mb-1">Aktiv sessiyaları yoxlayın</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Tanımadığınız cihazları dərhal sonlandırın
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
