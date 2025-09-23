import React, { useMemo, useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { VideoPlayer } from '../media/VideoPlayer';
import { EmojiIcon } from '../ui/EmojiIcon';
import { PracticeInline } from '../practice/PracticeInline';
import { MODULES } from '../../lib/data';

export function LessonScreen() {
  const { t, navigate, currentScreen, isModuleUnlocked, isDarkMode } = useApp();
  const [activeTab, setActiveTab] = useState<string>(
    (currentScreen.params && (currentScreen.params as any).tab) || 'video'
  );
  const [offlineDownload, setOfflineDownload] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [moduleDropdownOpen, setModuleDropdownOpen] = useState(false);
  const [showPurchasePopup, setShowPurchasePopup] = useState(false);
  const [requestedModuleId, setRequestedModuleId] = useState<string | null>(null);
  
  const { moduleId } = currentScreen.params;
  const modules = MODULES;
  const currentModule = useMemo(() => modules.find((m) => m.id === moduleId), [modules, moduleId]);
  const displayTitle = currentModule ? currentModule.title : moduleId;
  const watermark = `UID-1234 · ${new Date().toLocaleString()}`;
  
  const handleKonspektImgError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    const target = e.currentTarget;
    const url = new URL(target.src);
    const pathname = url.pathname || '';
    if (pathname.endsWith('/unnamed.jpg')) {
      target.src = '/unnamed.png';
      return;
    }
    target.onerror = null;
    target.src = '/image.png';
  };

  const lessonTabs = [
    { key: 'article', label: t.article },
    { key: 'video3d', label: t.video3d },
    { key: 'video', label: 'Video dərs' },
    { key: 'materials', label: 'Konspekt' },
  ];

  function renderTabContent() {
    switch (activeTab) {
      case 'video':
        return (
          <div className="space-y-3">
            <VideoPlayer 
              src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
              watermark={watermark} 
            />
            
            {/* Offline və əlaqə düymələri */}
            <div className="flex gap-1 items-center">
              <button
                onClick={() => setOfflineDownload(!offlineDownload)}
                className={`flex items-center gap-1 px-2 py-1 text-xs border border-gray-300 rounded-md hover:bg-gray-50 transition-colors min-h-[28px] ${
                  offlineDownload ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-white text-gray-600'
                }`}
              >
                📱 {t.download}
              </button>
              <button
                onClick={() => navigate('TeacherContact')}
                className="flex items-center gap-1 px-2 py-1 text-xs bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors min-h-[28px]"
              >
                💬 Sualını qeyd et
              </button>
            </div>
          </div>
        );

      case 'article':
        return (
          <Card>
            <div className="font-bold mb-2 text-gray-900">
              Maddə — Yol nişanlarının mənası
            </div>
            <div className="text-sm text-gray-700">
              Burada qanunun mətnindən parçalar göstəriləcək. (Demo kontent)
            </div>
          </Card>
        );

      case 'materials':
        return (
          <Card>
            <div className={`font-bold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Konspekt</div>
            {moduleId === 'M25' || moduleId === 'M8' ? (
              <div className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className="space-y-3">
                  <div>
                    <div className="font-semibold mb-1">I.</div>
                    <p>
                      Velosipedlər və mopedlər yalnız yolun sağ kənar zolağında, yol nişanları və ya yol nişanlanmasının tələblərinə riayət etməklə, mümkün qədər sağ tərəfdə bir cərgə ilə hərəkət etməlidirlər. Piyadalar üçün maneə yaratmamaq şərti ilə velosipedlərin yol çiyini ilə hərəkətinə icazə verilir. Velosiped dəstələri yolun hərəkət hissəsi ilə getdikləri vaxt hərəsi 10 velosipedçidən çox olmayan qruplardan ibarət olmalıdırlar. Nəqliyyat vasitələrinin ötməsini asanlaşdırmaq üçün dəstələrin arasındakı məsafə 80—100 metr olmalıdır.
                    </p>
                  </div>

                  <div className="my-3 flex justify-center">
                    <img
                      src="/unnamed.jpg"
                      alt="Velosiped və moped qaydaları"
                      className={`max-w-full rounded-xl shadow-md ${isDarkMode ? 'border border-gray-700' : ''}`}
                      onError={handleKonspektImgError}
                    />
                  </div>

                  <div>
                    <div className="font-semibold mb-1">II. Velosiped və moped sürücülərinə:</div>
                    <ol className="list-decimal pl-5 space-y-1">
                      <li>
                        sükanı tutmadan və ya təhlükəsizlik dəbilqələrindən istifadə qaydalarını pozmaqla hərəkət etmək;
                      </li>
                      <li>
                        velosipedin və mopedin uzunu və ya eni üzrə qabaritlərindən 0,5 metrdən artıq kənara çıxan və ya velosipedi, mopedi idarə etməyə mane olan yük aparmaq;
                      </li>
                      <li>
                        velosiped yolu olduğu halda, onun yanındakı yolla hərəkət etmək (yalnız velosipedçilərə şamil edilir);
                      </li>
                      <li>
                        tramvay hərəkəti olan yollarda və həmin istiqamətdə hərəkət üçün birdən artıq zolağı olan yollarda sola və ya geriyə dönmək;
                      </li>
                      <li> sərnişin daşımaq; </li>
                      <li> nasaz velosipeddən istifadə etmək; </li>
                      <li>
                        velosiped və ya mopedlə birgə istismar üçün nəzərdə tutulan qoşqunun yedəyə alınması istisna olmaqla, velosipedləri və mopedləri, eləcə də velosipedlərlə və mopedlərlə yedəyə almaq qadağandır.
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Dərs konspekti və əlavə materiallar buraya düşəcək. (Demo)
              </div>
            )}
          </Card>
        );

      case 'video3d':
        return (
          <div className="space-y-6">
            {/* Modern Video Card */}
            <div className={`rounded-3xl overflow-hidden shadow-2xl ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50' 
                : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200/50'
            }`}>
              {/* Video Header */}
              <div className="p-4 pb-2">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center">
                      <span className="text-white text-lg">🎬</span>
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        3D İnteraktiv Dərs
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Yüksək keyfiyyətli 3D animasiya
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="px-2 py-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full text-xs font-bold">
                      HD
                    </div>
                    <div className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs font-bold">
                      3D
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Player */}
              <div className="px-4">
                <VideoPlayer 
                  src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                  watermark={watermark}
                  heightClass="h-56"
                  is3D={true}
                />
              </div>

              {/* Video Footer with Actions */}
              <div className="p-4 pt-3">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    onClick={() => setOfflineDownload(!offlineDownload)}
                    className={`group flex items-center justify-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                      offlineDownload 
                        ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/25' 
                        : isDarkMode
                          ? 'bg-gray-700/50 text-gray-200 hover:bg-gray-600/50 border border-gray-600'
                          : 'bg-gray-100/50 text-gray-700 hover:bg-gray-200/50 border border-gray-200'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      offlineDownload ? 'bg-white/20' : isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                    }`}>
                      <span className="text-lg">{offlineDownload ? '✅' : '📱'}</span>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold">
                        {offlineDownload ? 'Yükləndi' : 'Offline Yüklə'}
                      </div>
                      <div className={`text-xs ${
                        offlineDownload ? 'text-white/80' : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {offlineDownload ? 'Hazırdır' : 'Sonra baxın'}
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => navigate('TeacherContact')}
                    className={`group flex items-center justify-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                      isDarkMode
                        ? 'bg-gray-700/50 text-gray-200 hover:bg-gray-600/50 border border-gray-600'
                        : 'bg-gray-100/50 text-gray-700 hover:bg-gray-200/50 border border-gray-200'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                    }`}>
                      <span className="text-lg">💬</span>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold">Sual Ver</div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Müəllimlə əlaqə
                      </div>
                    </div>
                  </button>
                </div>

                {/* Progress Section */}
                <div className={`p-4 rounded-2xl ${
                  isDarkMode 
                    ? 'bg-gray-700/30 border border-gray-600/50' 
                    : 'bg-gray-50/50 border border-gray-200/50'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center">
                        <span className="text-white text-xs">📈</span>
                      </div>
                      <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        Dərs İrəliləyişi
                      </span>
                    </div>
                    <span className={`text-sm font-bold text-emerald-500`}>
                      75%
                    </span>
                  </div>
                  
                  <div className={`w-full h-3 rounded-full overflow-hidden ${
                    isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                  }`}>
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 rounded-full relative overflow-hidden"
                      style={{ width: '75%' }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-2 text-xs">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                      Başlanğıc
                    </span>
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                      Tamamlandı
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-2xl text-center transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50' 
                  : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200/50 shadow-lg'
              }`}>
                <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white text-xl">🎯</span>
                </div>
                <h4 className={`text-sm font-bold mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  İnteraktiv Öyrənmə
                </h4>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Əlbəttə keçidiniz
                </p>
              </div>
              
              <div className={`p-4 rounded-2xl text-center transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50' 
                  : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200/50 shadow-lg'
              }`}>
                <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center">
                  <span className="text-white text-xl">🧠</span>
                </div>
                <h4 className={`text-sm font-bold mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Vizual Yaddaş
                </h4>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Asan öyrənmə
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <>
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Modern Header Section */}
      <div className={`sticky top-0 z-30 backdrop-blur-xl border-b ${
        isDarkMode 
          ? 'bg-gray-900/80 border-gray-800' 
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="p-4">
          <div className="relative">
            <button
              onClick={() => setModuleDropdownOpen(!moduleDropdownOpen)}
              className={`w-full px-5 py-4 rounded-2xl text-left flex items-center justify-between shadow-lg transition-all duration-300 hover:shadow-xl ${
                isDarkMode
                  ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-gray-100 hover:from-gray-700 hover:to-gray-600'
                  : 'bg-gradient-to-r from-white to-gray-50 text-gray-900 hover:from-gray-50 hover:to-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isDarkMode ? 'bg-emerald-500/20' : 'bg-emerald-100'
                }`}>
                  <span className="text-xl">📚</span>
                </div>
                <div>
                  <div className="font-bold text-lg">{displayTitle}</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Dərs Modulu
                  </div>
                </div>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                moduleDropdownOpen 
                  ? 'rotate-180 bg-emerald-500/20' 
                  : isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
              }`}>
                <span className="text-emerald-500">▼</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 pb-32">
        
          {moduleDropdownOpen && (
            <div className={`absolute top-full left-0 right-0 mt-2 rounded-2xl shadow-2xl max-h-60 overflow-y-auto z-40 border backdrop-blur-xl ${
              isDarkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-gray-200/50'
            }`}>
            {modules.map((m) => {
              const id = m.id;
              const unlocked = isModuleUnlocked(id);
              const isActive = moduleId === id;
              return (
                <button
                  key={id}
                  onClick={() => {
                    if (unlocked) {
                      navigate('Lesson', { moduleId: id });
                      setModuleDropdownOpen(false);
                    } else {
                      setRequestedModuleId(id);
                      setShowPurchasePopup(true);
                    }
                  }}
                  className={`w-full px-4 py-3 text-left border-b last:border-b-0 min-h-[44px] transition-colors ${
                    isDarkMode ? 'border-gray-700' : 'border-gray-100'
                  } ${
                    unlocked
                      ? isActive
                        ? isDarkMode
                          ? 'bg-emerald-900/20 text-emerald-300 font-medium'
                          : 'bg-emerald-50 text-emerald-700 font-medium'
                        : isDarkMode
                          ? 'text-gray-100 hover:bg-gray-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      : isDarkMode
                        ? 'text-gray-500 hover:bg-gray-800'
                        : 'text-gray-400 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex-1 min-w-0 truncate">{m.title}</span>
                    {!unlocked && <span className="text-sm flex-shrink-0">🔒</span>}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

        {/* Modern Tab Navigation */}
        <div className={`mb-6 p-2 rounded-2xl shadow-inner ${
          isDarkMode 
            ? 'bg-gray-800/50 backdrop-blur-sm' 
            : 'bg-white/50 backdrop-blur-sm border border-gray-200/50'
        }`}>
          <div className="grid grid-cols-4 gap-2">
            {lessonTabs.map((tab) => {
              const isActive = activeTab === tab.key;
              const is3DTab = tab.key === 'video3d';
              
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    isActive
                      ? is3DTab
                        ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/25'
                        : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                      : isDarkMode
                        ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/50'
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className={`text-xl ${isActive ? 'scale-110' : ''} transition-transform duration-300`}>
                      {tab.key === 'article' && '📖'}
                      {tab.key === 'video3d' && '🎬'}
                      {tab.key === 'video' && '📹'}
                      {tab.key === 'materials' && '📄'}
                    </div>
                    <span className="text-xs font-bold leading-tight text-center">
                      {tab.label}
                    </span>
                  </div>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute inset-0 bg-white/10 rounded-xl"></div>
                  )}
                  
                  {/* 3D Special indicator */}
                  {is3DTab && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

      {/* Tab Content */}
      {renderTabContent()}

        {/* Modern Action Buttons */}
        <div className="mt-8 space-y-4">
          {/* Primary Actions */}
          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={() => navigate('Practice', { moduleId })}
              className={`group relative overflow-hidden p-6 rounded-3xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl ${
                isDarkMode
                  ? 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-emerald-500/25'
                  : 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-emerald-500/25'
              }`}
            >
              <div className="flex items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-2xl">📝</span>
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold">Sualları Həll Et</div>
                  <div className="text-sm text-white/80">Test və tapşırıqlar</div>
                </div>
                <div className="ml-auto">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-white">→</span>
                  </div>
                </div>
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button
              onClick={() => alert('Başqa imtahan növü (demo)')}
              className={`group relative overflow-hidden p-6 rounded-3xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl ${
                isDarkMode
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-blue-500/25'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-blue-500/25'
              }`}
            >
              <div className="flex items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-2xl">🧪</span>
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold">İmtahana Başla</div>
                  <div className="text-sm text-white/80">Biliklərinizi yoxlayın</div>
                </div>
                <div className="ml-auto">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-white">→</span>
                  </div>
                </div>
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Secondary Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => alert('Favorilərə əlavə edildi')}
              className={`group p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                isDarkMode
                  ? 'bg-gray-800/50 border border-gray-700/50 text-gray-200 hover:bg-gray-700/50 backdrop-blur-sm'
                  : 'bg-white/50 border border-gray-200/50 text-gray-700 hover:bg-gray-100/50 shadow-lg backdrop-blur-sm'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <span className="text-lg group-hover:scale-110 transition-transform duration-200">⭐</span>
                </div>
                <span className="text-sm font-bold">Favorilər</span>
              </div>
            </button>
            
            <button
              onClick={() => alert('Paylaş seçimləri')}
              className={`group p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                isDarkMode
                  ? 'bg-gray-800/50 border border-gray-700/50 text-gray-200 hover:bg-gray-700/50 backdrop-blur-sm'
                  : 'bg-white/50 border border-gray-200/50 text-gray-700 hover:bg-gray-100/50 shadow-lg backdrop-blur-sm'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <span className="text-lg group-hover:scale-110 transition-transform duration-200">📤</span>
                </div>
                <span className="text-sm font-bold">Paylaş</span>
              </div>
            </button>
          </div>
        </div>
    </div>
    {showPurchasePopup && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50" onClick={() => setShowPurchasePopup(false)} />
        <div className={`relative z-10 w-[90%] max-w-sm rounded-2xl p-5 shadow-xl border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className={`text-base font-bold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Mövzu kilidlidir
          </div>
          <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm mb-4`}>
            Bu mövzunu açmaq üçün paket tələb olunur. Paket almaq istəyirsiniz?
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setShowPurchasePopup(false)}
              className={`px-4 py-2 rounded-xl font-bold min-h-[40px] border ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Bağla
            </button>
            <button
              onClick={() => {
                setShowPurchasePopup(false);
                navigate('Packages');
              }}
              className="px-4 py-2 rounded-xl font-bold min-h-[40px] bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Paket al
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}