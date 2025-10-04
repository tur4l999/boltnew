import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { EmojiIcon } from '../ui/EmojiIcon';

export function NotificationSettingsScreen() {
  const { goBack, isDarkMode } = useApp();
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false,
    lessons: true,
    exams: true,
    results: true,
    promotions: false,
    updates: true,
    reminders: true,
    messages: true
  });

  const toggleNotification = (key: string) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  return (
    <div className={`min-h-screen transition-all duration-300 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
        : 'bg-gradient-to-br from-gray-50 via-white to-emerald-50'
    } pt-11`}>
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-10 right-10 w-40 h-40 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-blue-500/5' : 'bg-blue-400/10'
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
              isDarkMode ? 'from-blue-400 to-cyan-400' : 'from-blue-600 to-cyan-600'
            } bg-clip-text text-transparent`}>
              Bildirişlər
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Bildiriş ayarlarını idarə edin
            </p>
          </div>
        </div>

        {/* Notification Channels */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'
            }`}>
              <EmojiIcon emoji="📢" size={20} />
            </div>
            <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Bildiriş kanalları
            </h2>
          </div>

          <div className="space-y-3">
            <div className={`p-4 rounded-2xl border-2 ${
              isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">📱</div>
                  <div>
                    <div className="font-bold">Push bildirişləri</div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Mobil cihazda bildirişlər
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleNotification('push')}
                  className={`w-14 h-8 rounded-full transition-all duration-300 ${
                    notifications.push
                      ? 'bg-emerald-600'
                      : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 ${
                    notifications.push ? 'translate-x-7' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border-2 ${
              isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">📧</div>
                  <div>
                    <div className="font-bold">Email bildirişləri</div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      E-poçt vasitəsilə bildirişlər
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleNotification('email')}
                  className={`w-14 h-8 rounded-full transition-all duration-300 ${
                    notifications.email
                      ? 'bg-emerald-600'
                      : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 ${
                    notifications.email ? 'translate-x-7' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border-2 ${
              isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">💬</div>
                  <div>
                    <div className="font-bold">SMS bildirişləri</div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Telefona mesaj göndərilməsi
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleNotification('sms')}
                  className={`w-14 h-8 rounded-full transition-all duration-300 ${
                    notifications.sms
                      ? 'bg-emerald-600'
                      : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 ${
                    notifications.sms ? 'translate-x-7' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Content Notifications */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-emerald-600/20' : 'bg-emerald-100'
            }`}>
              <EmojiIcon emoji="📚" size={20} />
            </div>
            <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Məzmun bildirişləri
            </h2>
          </div>

          <div className="space-y-3">
            <div className={`p-4 rounded-2xl border-2 ${
              isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-bold mb-1">Dərs xatırlatmaları</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Planlaşdırılmış dərslər haqqında xatırlatma
                  </div>
                </div>
                <button
                  onClick={() => toggleNotification('lessons')}
                  className={`ml-4 w-14 h-8 rounded-full transition-all duration-300 flex-shrink-0 ${
                    notifications.lessons
                      ? 'bg-emerald-600'
                      : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 ${
                    notifications.lessons ? 'translate-x-7' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border-2 ${
              isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-bold mb-1">İmtahan bildirişləri</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Yeni imtahan və test bildirişləri
                  </div>
                </div>
                <button
                  onClick={() => toggleNotification('exams')}
                  className={`ml-4 w-14 h-8 rounded-full transition-all duration-300 flex-shrink-0 ${
                    notifications.exams
                      ? 'bg-emerald-600'
                      : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 ${
                    notifications.exams ? 'translate-x-7' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border-2 ${
              isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-bold mb-1">Nəticə bildirişləri</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Test və imtahan nəticələri hazır olduqda
                  </div>
                </div>
                <button
                  onClick={() => toggleNotification('results')}
                  className={`ml-4 w-14 h-8 rounded-full transition-all duration-300 flex-shrink-0 ${
                    notifications.results
                      ? 'bg-emerald-600'
                      : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 ${
                    notifications.results ? 'translate-x-7' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border-2 ${
              isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-bold mb-1">Xatırlatmalar</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Tətbiq istifadəsi və məşq xatırlatmaları
                  </div>
                </div>
                <button
                  onClick={() => toggleNotification('reminders')}
                  className={`ml-4 w-14 h-8 rounded-full transition-all duration-300 flex-shrink-0 ${
                    notifications.reminders
                      ? 'bg-emerald-600'
                      : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 ${
                    notifications.reminders ? 'translate-x-7' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Other Notifications */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-purple-600/20' : 'bg-purple-100'
            }`}>
              <EmojiIcon emoji="🎯" size={20} />
            </div>
            <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Digər bildirişlər
            </h2>
          </div>

          <div className="space-y-3">
            <div className={`p-4 rounded-2xl border-2 ${
              isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-bold mb-1">Kampaniya və endirimlər</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Xüsusi təkliflər və bonus imkanları
                  </div>
                </div>
                <button
                  onClick={() => toggleNotification('promotions')}
                  className={`ml-4 w-14 h-8 rounded-full transition-all duration-300 flex-shrink-0 ${
                    notifications.promotions
                      ? 'bg-emerald-600'
                      : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 ${
                    notifications.promotions ? 'translate-x-7' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border-2 ${
              isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-bold mb-1">Yeniləmələr</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Yeni funksiyalar və təkmilləşdirmələr
                  </div>
                </div>
                <button
                  onClick={() => toggleNotification('updates')}
                  className={`ml-4 w-14 h-8 rounded-full transition-all duration-300 flex-shrink-0 ${
                    notifications.updates
                      ? 'bg-emerald-600'
                      : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 ${
                    notifications.updates ? 'translate-x-7' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border-2 ${
              isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-bold mb-1">Mesajlar</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Dəstək və müəllim mesajları
                  </div>
                </div>
                <button
                  onClick={() => toggleNotification('messages')}
                  className={`ml-4 w-14 h-8 rounded-full transition-all duration-300 flex-shrink-0 ${
                    notifications.messages
                      ? 'bg-emerald-600'
                      : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 ${
                    notifications.messages ? 'translate-x-7' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setNotifications({
                  push: true, email: true, sms: true,
                  lessons: true, exams: true, results: true,
                  promotions: true, updates: true, reminders: true, messages: true
                });
                alert('✅ Bütün bildirişlər aktiv edildi');
              }}
              className={`p-4 rounded-2xl border-2 font-bold transition-all duration-300 hover:scale-[1.02] ${
                isDarkMode 
                  ? 'border-emerald-500/50 bg-emerald-900/20 hover:bg-emerald-900/30 text-emerald-300' 
                  : 'border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
              }`}
            >
              ✓ Hamısını aç
            </button>
            <button
              onClick={() => {
                setNotifications({
                  push: false, email: false, sms: false,
                  lessons: false, exams: false, results: false,
                  promotions: false, updates: false, reminders: false, messages: false
                });
                alert('🔕 Bütün bildirişlər deaktiv edildi');
              }}
              className={`p-4 rounded-2xl border-2 font-bold transition-all duration-300 hover:scale-[1.02] ${
                isDarkMode 
                  ? 'border-gray-700 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300' 
                  : 'border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              ✕ Hamısını bağla
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
