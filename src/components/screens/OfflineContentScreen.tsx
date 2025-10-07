import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Icon } from '../icons/Icon';

export function OfflineContentScreen() {
  const { goBack, isDarkMode } = useApp();
  const [wifiOnly, setWifiOnly] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(false);
  
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

  const totalStorage = 5.2; // GB
  const usedStorage = 0.197; // GB
  const usagePercentage = (usedStorage / totalStorage) * 100;

  return (
    <div className={`min-h-screen transition-all duration-300 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
        : 'bg-gradient-to-br from-gray-50 via-white to-cyan-50'
    } pt-11`}>
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-10 right-10 w-40 h-40 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-cyan-500/5' : 'bg-cyan-400/10'
        }`}></div>
      </div>

      <div className="relative z-10 p-4 pb-24">
        {/* Header */}
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
              Offline Məzmun
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              İnternetsiz istifadə üçün yükləmələr
            </p>
          </div>
        </div>

        {/* Storage Summary Card */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                isDarkMode ? 'bg-cyan-600/20' : 'bg-cyan-100'
              }`}>
                <Icon name="package" size={24} className={isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} />
              </div>
              <div>
                <h2 className={`font-bold text-lg ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Yaddaş İstifadəsi
                </h2>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {usedStorage.toFixed(2)} GB / {totalStorage} GB
                </p>
              </div>
            </div>
            <div className={`text-3xl font-black ${
              usagePercentage < 50 
                ? isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                : usagePercentage < 80
                  ? isDarkMode ? 'text-amber-400' : 'text-amber-600'
                  : isDarkMode ? 'text-red-400' : 'text-red-600'
            }`}>
              {usagePercentage.toFixed(1)}%
            </div>
          </div>

          {/* Progress Bar */}
          <div className={`w-full h-3 rounded-full overflow-hidden ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}>
            <div 
              className={`h-full transition-all duration-500 ${
                usagePercentage < 50 
                  ? 'bg-gradient-to-r from-emerald-500 to-green-500'
                  : usagePercentage < 80
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                    : 'bg-gradient-to-r from-red-500 to-pink-500'
              }`}
              style={{ width: `${usagePercentage}%` }}
            ></div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className={`p-3 rounded-xl text-center ${
              isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'
            }`}>
              <div className={`text-xl font-bold ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                {downloadedPacks.length}
              </div>
              <div className={`text-xs ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                Sual paketi
              </div>
            </div>
            <div className={`p-3 rounded-xl text-center ${
              isDarkMode ? 'bg-purple-900/20' : 'bg-purple-50'
            }`}>
              <div className={`text-xl font-bold ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                {downloadedVideos.length}
              </div>
              <div className={`text-xs ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                Video dərs
              </div>
            </div>
            <div className={`p-3 rounded-xl text-center ${
              isDarkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'
            }`}>
              <div className={`text-xl font-bold ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                {downloadedPacks.reduce((sum, p) => sum + p.questions, 0)}
              </div>
              <div className={`text-xs ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                Sual
              </div>
            </div>
          </div>
        </Card>

        {/* Downloaded Content */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isDarkMode ? 'bg-emerald-600/20' : 'bg-emerald-100'
              }`}>
                <Icon name="check" size={20} className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'} />
              </div>
              <h2 className={`font-bold text-lg ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Yüklənmiş Məzmun
              </h2>
            </div>
          </div>

          <div className="space-y-3">
            {/* Downloaded Packs */}
            {downloadedPacks.map(pack => (
              <div
                key={pack.id}
                className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.01] ${
                  isDarkMode 
                    ? 'border-emerald-700/30 bg-emerald-900/10' 
                    : 'border-emerald-300/50 bg-emerald-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isDarkMode ? 'bg-emerald-600/20' : 'bg-emerald-100'
                  }`}>
                    <Icon name="document" size={20} className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`font-bold text-sm mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      {pack.name}
                    </div>
                    <div className={`text-xs flex items-center gap-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <span className="flex items-center gap-1">
                        <Icon name="help-circle" size={12} />
                        {pack.questions} sual
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="package" size={12} />
                        {pack.size}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`"${pack.name}" paketini silmək istəyirsiniz?`)) {
                        alert('Paket silindi (demo)');
                      }
                    }}
                    className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                      isDarkMode
                        ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                        : 'bg-red-100 text-red-600 hover:bg-red-200'
                    }`}
                  >
                    <Icon name="trash" size={16} />
                  </button>
                </div>
              </div>
            ))}

            {/* Downloaded Videos */}
            {downloadedVideos.map(video => (
              <div
                key={video.id}
                className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.01] ${
                  isDarkMode 
                    ? 'border-purple-700/30 bg-purple-900/10' 
                    : 'border-purple-300/50 bg-purple-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isDarkMode ? 'bg-purple-600/20' : 'bg-purple-100'
                  }`}>
                    <Icon name="video" size={20} className={isDarkMode ? 'text-purple-400' : 'text-purple-600'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`font-bold text-sm mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      {video.name}
                    </div>
                    <div className={`text-xs flex items-center gap-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <span>{video.duration}</span>
                      <span>•</span>
                      <span>{video.size}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`"${video.name}" videosunu silmək istəyirsiniz?`)) {
                        alert('Video silindi (demo)');
                      }
                    }}
                    className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                      isDarkMode
                        ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                        : 'bg-red-100 text-red-600 hover:bg-red-200'
                    }`}
                  >
                    <Icon name="trash" size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Available to Download */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'
              }`}>
                <Icon name="download" size={20} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
              </div>
              <h2 className={`font-bold text-lg ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Yükləmək üçün hazır
              </h2>
            </div>
          </div>

          <div className="space-y-3">
            {availablePacks.map(pack => (
              <div
                key={pack.id}
                className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.01] ${
                  isDarkMode 
                    ? 'border-gray-700 bg-gray-800/50 hover:border-blue-700/50' 
                    : 'border-gray-200 bg-gray-50 hover:border-blue-300/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <Icon name="document" size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`font-bold text-sm mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      {pack.name}
                    </div>
                    <div className={`text-xs flex items-center gap-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <span className="flex items-center gap-1">
                        <Icon name="help-circle" size={12} />
                        {pack.questions} sual
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="package" size={12} />
                        {pack.size}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`"${pack.name}" yüklənir... (demo)`)}
                    className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all duration-300 hover:scale-105 ${
                      isDarkMode
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    <Icon name="download" size={14} />
                    Yüklə
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Settings */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-amber-600/20' : 'bg-amber-100'
            }`}>
              <Icon name="settings" size={20} className={isDarkMode ? 'text-amber-400' : 'text-amber-600'} />
            </div>
            <h2 className={`font-bold text-lg ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Yükləmə Ayarları
            </h2>
          </div>

          <div className="space-y-3">
            <div className={`p-4 rounded-xl ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon name="wifi" size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                  <div>
                    <div className={`font-bold text-sm ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      Yalnız WiFi ilə yüklə
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Mobil datanı qorumaq üçün
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setWifiOnly(!wifiOnly)}
                  className={`w-14 h-8 rounded-full transition-all duration-300 ${
                    wifiOnly ? 'bg-emerald-600' : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 ${
                    wifiOnly ? 'translate-x-7' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>
            </div>

            <div className={`p-4 rounded-xl ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon name="refresh-cw" size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                  <div>
                    <div className={`font-bold text-sm ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      Avtomatik yeniləmə
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Yeni məzmun avtomatik yüklənsin
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setAutoUpdate(!autoUpdate)}
                  className={`w-14 h-8 rounded-full transition-all duration-300 ${
                    autoUpdate ? 'bg-emerald-600' : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 ${
                    autoUpdate ? 'translate-x-7' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}