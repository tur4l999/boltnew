import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { EmojiIcon } from '../ui/EmojiIcon';

export function OfflineContentScreen() {
  const { goBack, isDarkMode } = useApp();
  
  const downloadedPacks = [
    { id: 1, name: 'Yol hərəkəti qaydaları', size: '45 MB', questions: 150, downloaded: true },
    { id: 2, name: 'Yol nişanları', size: '32 MB', questions: 120, downloaded: true },
  ];

  const availablePacks = [
    { id: 3, name: 'Təhlükəsizlik qaydaları', size: '28 MB', questions: 100, downloaded: false },
    { id: 4, name: 'İlk tibbi yardım', size: '22 MB', questions: 80, downloaded: false },
    { id: 5, name: 'Avtomobil texnikası', size: '35 MB', questions: 110, downloaded: false },
  ];

  const downloadedVideos = [
    { id: 1, name: 'Park etmə texnikası', size: '120 MB', duration: '15 dəq', downloaded: true },
  ];

  return (
    <div className={`min-h-screen transition-all duration-300 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
        : 'bg-gradient-to-br from-gray-50 via-white to-emerald-50'
    } pt-11`}>
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-10 right-10 w-40 h-40 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-cyan-500/5' : 'bg-cyan-400/10'
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
              isDarkMode ? 'from-cyan-400 to-blue-400' : 'from-cyan-600 to-blue-600'
            } bg-clip-text text-transparent`}>
              Offline məzmun
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              İnternetsiz istifadə üçün yükləmələr
            </p>
          </div>
        </div>

        {/* Storage Info */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-cyan-600/20' : 'bg-cyan-100'
            }`}>
              <EmojiIcon emoji="💾" size={20} />
            </div>
            <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Yaddaş məlumatı
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
              <div className={`text-3xl font-black ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                197 MB
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                İstifadə edilən
              </div>
            </div>
            <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
              <div className={`text-3xl font-black ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                5.2 GB
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                Mövcud yer
              </div>
            </div>
          </div>

          <div className={`mt-4 p-3 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Yaddaş dolması
              </span>
              <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                3.7%
              </span>
            </div>
            <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div className="h-full bg-gradient-to-r from-emerald-500 to-green-500" style={{ width: '3.7%' }}></div>
            </div>
          </div>
        </Card>

        {/* Downloaded Question Packs */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-emerald-600/20' : 'bg-emerald-100'
            }`}>
              <EmojiIcon emoji="✓" size={20} />
            </div>
            <div className="flex-1">
              <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Yüklənmiş sual paketləri
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {downloadedPacks.length} paket
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {downloadedPacks.map(pack => (
              <div
                key={pack.id}
                className={`p-4 rounded-2xl border-2 ${
                  isDarkMode ? 'border-emerald-500/30 bg-emerald-900/10' : 'border-emerald-300/50 bg-emerald-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <div className="font-bold mb-1">{pack.name}</div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      📦 {pack.questions} sual • 💾 {pack.size}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`"${pack.name}" paketini silmək istəyirsiniz?`)) {
                        alert('Paket silindi (demo)');
                      }
                    }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-300 hover:scale-105 ${
                      isDarkMode
                        ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                        : 'bg-red-100 text-red-600 hover:bg-red-200'
                    }`}
                  >
                    🗑️ Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Available Question Packs */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'
            }`}>
              <EmojiIcon emoji="📥" size={20} />
            </div>
            <div className="flex-1">
              <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Mövcud sual paketləri
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Yükləmək üçün hazır
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {availablePacks.map(pack => (
              <div
                key={pack.id}
                className={`p-4 rounded-2xl border-2 ${
                  isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <div className="font-bold mb-1">{pack.name}</div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      📦 {pack.questions} sual • 💾 {pack.size}
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`"${pack.name}" yüklənir... (demo)`)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-300 hover:scale-105 ${
                      isDarkMode
                        ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30'
                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    }`}
                  >
                    ⬇️ Yüklə
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Downloaded Videos */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-purple-600/20' : 'bg-purple-100'
            }`}>
              <EmojiIcon emoji="🎥" size={20} />
            </div>
            <div className="flex-1">
              <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Yüklənmiş videolar
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {downloadedVideos.length} video
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {downloadedVideos.map(video => (
              <div
                key={video.id}
                className={`p-4 rounded-2xl border-2 ${
                  isDarkMode ? 'border-purple-500/30 bg-purple-900/10' : 'border-purple-300/50 bg-purple-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <div className="font-bold mb-1">{video.name}</div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      ⏱️ {video.duration} • 💾 {video.size}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`"${video.name}" videosunu silmək istəyirsiniz?`)) {
                        alert('Video silindi (demo)');
                      }
                    }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-300 hover:scale-105 ${
                      isDarkMode
                        ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                        : 'bg-red-100 text-red-600 hover:bg-red-200'
                    }`}
                  >
                    🗑️ Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Settings */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-yellow-600/20' : 'bg-yellow-100'
            }`}>
              <EmojiIcon emoji="⚙️" size={20} />
            </div>
            <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Yükləmə ayarları
            </h2>
          </div>

          <div className="space-y-3">
            <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold mb-1">Yalnız WiFi ilə yüklə</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Mobil datanı qorumaq üçün
                  </div>
                </div>
                <button className="w-14 h-8 rounded-full bg-emerald-600">
                  <div className="w-6 h-6 rounded-full bg-white translate-x-7 transition-transform duration-300"></div>
                </button>
              </div>
            </div>

            <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold mb-1">Avtomatik yeniləmə</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Yeni məzmun avtomatik yüklənsin
                  </div>
                </div>
                <button className={`w-14 h-8 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>
                  <div className="w-6 h-6 rounded-full bg-white translate-x-1 transition-transform duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
