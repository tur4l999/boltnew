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
            {/* Enhanced Video Player with 3D styling */}
            <div className="relative">
              <VideoPlayer 
                src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                watermark={watermark}
                heightClass="h-72 md:h-80"
                is3D={true}
              />
              
              {/* Video Info Card */}
              <div className={`mt-4 p-4 rounded-2xl border backdrop-blur-sm ${
                isDarkMode 
                  ? 'bg-gray-800/50 border-gray-700/50 text-gray-100' 
                  : 'bg-white/50 border-gray-200/50 text-gray-900'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      3D İnteraktiv Video Dərs
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Yüksək keyfiyyətli 3D animasiya ilə hazırlanmış interaktiv dərs materialı
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full text-xs font-bold">
                      HD
                    </div>
                    <div className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs font-bold">
                      3D
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modern Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setOfflineDownload(!offlineDownload)}
                className={`group relative overflow-hidden px-6 py-4 rounded-2xl border transition-all duration-300 transform hover:scale-[1.02] ${
                  offlineDownload 
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/25' 
                    : isDarkMode
                      ? 'bg-gray-800/80 border-gray-600 text-gray-200 hover:bg-gray-700/80 hover:border-gray-500'
                      : 'bg-white/80 border-gray-300 text-gray-700 hover:bg-gray-50/80 hover:border-gray-400 shadow-md hover:shadow-lg'
                }`}
              >
                <div className="flex items-center justify-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    offlineDownload 
                      ? 'bg-white/20' 
                      : isDarkMode 
                        ? 'bg-gray-700' 
                        : 'bg-gray-100'
                  }`}>
                    <span className="text-xl">
                      {offlineDownload ? '✅' : '📱'}
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-sm">
                      {offlineDownload ? 'Yükləndi' : 'Offline Yüklə'}
                    </div>
                    <div className={`text-xs ${
                      offlineDownload 
                        ? 'text-white/80' 
                        : isDarkMode 
                          ? 'text-gray-400' 
                          : 'text-gray-500'
                    }`}>
                      {offlineDownload ? 'İnternetsizcə baxın' : 'Sonra baxmaq üçün'}
                    </div>
                  </div>
                </div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button
                onClick={() => navigate('TeacherContact')}
                className={`group relative overflow-hidden px-6 py-4 rounded-2xl border transition-all duration-300 transform hover:scale-[1.02] ${
                  isDarkMode
                    ? 'bg-gray-800/80 border-gray-600 text-gray-200 hover:bg-gray-700/80 hover:border-gray-500'
                    : 'bg-white/80 border-gray-300 text-gray-700 hover:bg-gray-50/80 hover:border-gray-400 shadow-md hover:shadow-lg'
                }`}
              >
                <div className="flex items-center justify-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <span className="text-xl">💬</span>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-sm">Sual Ver</div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Müəllimlə əlaqə
                    </div>
                  </div>
                </div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Learning Progress */}
            <div className={`p-5 rounded-2xl border ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50' 
                : 'bg-gradient-to-br from-gray-50/50 to-white/50 border-gray-200/50'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className={`font-bold text-base ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Dərs İrəliləyişi
                </h4>
                <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  75%
                </span>
              </div>
              
              <div className={`w-full h-3 rounded-full overflow-hidden ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                <div 
                  className="h-full bg-gradient-to-r from-emerald-400 to-green-400 transition-all duration-500 rounded-full relative"
                  style={{ width: '75%' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                </div>
              </div>
              
              <div className="flex justify-between mt-3 text-xs">
                <span className={`font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Başlanğıc
                </span>
                <span className={`font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Tamamlandı
                </span>
              </div>
            </div>

            {/* Features Showcase */}
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-4 rounded-xl border text-center ${
                isDarkMode 
                  ? 'bg-gray-800/30 border-gray-700/50' 
                  : 'bg-white/30 border-gray-200/50'
              }`}>
                <div className="text-2xl mb-2">🎯</div>
                <div className={`text-sm font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  İnteraktiv
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Əlbəttə keçidin
                </div>
              </div>
              
              <div className={`p-4 rounded-xl border text-center ${
                isDarkMode 
                  ? 'bg-gray-800/30 border-gray-700/50' 
                  : 'bg-white/30 border-gray-200/50'
              }`}>
                <div className="text-2xl mb-2">🧠</div>
                <div className={`text-sm font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  Asan Öyrənmə
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Vizual yaddaş
                </div>
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
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      <div className="p-3 pb-32 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-500 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-10 w-24 h-24 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-20 w-20 h-20 bg-purple-500 rounded-full blur-3xl"></div>
        </div>
      {/* Enhanced Module Dropdown */}
      <div className="relative mb-6 z-20">
        <button
          onClick={() => setModuleDropdownOpen(!moduleDropdownOpen)}
          className={`w-full px-6 py-4 rounded-2xl text-left flex items-center justify-between min-h-[52px] transition-all duration-300 transform hover:scale-[1.01] focus:outline-none focus:ring-4 shadow-lg ${
            isDarkMode
              ? 'bg-gray-800/80 border border-gray-700/50 text-gray-100 focus:ring-emerald-500/20 backdrop-blur-sm hover:bg-gray-700/80'
              : 'bg-white/80 border border-gray-200/50 text-gray-900 focus:ring-emerald-500/20 backdrop-blur-sm hover:bg-gray-50/80 shadow-emerald-500/10'
          }`}
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isDarkMode ? 'bg-emerald-600/20' : 'bg-emerald-100'
            }`}>
              <span className="text-lg">📚</span>
            </div>
            <span className="font-bold truncate text-base">{displayTitle}</span>
          </div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            moduleDropdownOpen ? 'rotate-180 bg-emerald-500/20' : 'bg-gray-100'
          } ${isDarkMode && !moduleDropdownOpen ? 'bg-gray-700' : ''}`}>
            <span className={`text-sm ${moduleDropdownOpen ? 'text-emerald-600' : isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              ▼
            </span>
          </div>
        </button>
        
        <div className={`mt-3 px-2 text-lg font-black leading-tight ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          {currentModule ? currentModule.title : ''}
        </div>
        
        {moduleDropdownOpen && (
          <div className={`absolute top-full left-0 right-0 mt-1 rounded-xl shadow-lg max-h-60 overflow-y-auto z-10 border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
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

      {/* Enhanced Modern Tabs */}
      <div className={`p-1 rounded-2xl mb-6 overflow-x-auto scrollbar-hide ${
        isDarkMode 
          ? 'bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm' 
          : 'bg-white/50 border border-gray-200/50 backdrop-blur-sm shadow-sm'
      }`}>
        <div className="flex gap-1">
          {lessonTabs.map((tab) => {
            const isActive = activeTab === tab.key;
            const is3DTab = tab.key === 'video3d';
            
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-4 py-3 rounded-xl text-sm font-bold whitespace-nowrap min-h-[44px] transition-all duration-300 transform hover:scale-[1.02] ${
                  isActive
                    ? is3DTab
                      ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/25'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                    : isDarkMode
                      ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-700/50'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/50'
                }`}
              >
                {/* Tab icon based on type */}
                <div className="flex items-center gap-2">
                  <span className="text-base">
                    {tab.key === 'article' && '📖'}
                    {tab.key === 'video3d' && '🎬'}
                    {tab.key === 'video' && '📹'}
                    {tab.key === 'materials' && '📄'}
                  </span>
                  <span>{tab.label}</span>
                </div>
                
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl"></div>
                )}
                
                {/* Special 3D indicator */}
                {is3DTab && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Enhanced Main Action Buttons */}
      <div className="mt-8 space-y-4">
        {/* Primary Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button 
            onClick={() => navigate('Practice', { moduleId })}
            variant="primary"
            size="lg"
            className="group relative overflow-hidden"
            fullWidth
            icon={<span className="text-lg group-hover:scale-110 transition-transform duration-200">📝</span>}
          >
            <span className="relative z-10">Sualları Həll Et</span>
          </Button>
          
          <Button 
            onClick={() => alert('Başqa imtahan növü (demo)')}
            variant="success"
            size="lg"
            className="group relative overflow-hidden"
            fullWidth
            icon={<span className="text-lg group-hover:scale-110 transition-transform duration-200">🧪</span>}
          >
            <span className="relative z-10">İmtahana Başla</span>
          </Button>
        </div>

        {/* Secondary Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => alert('Favorilərə əlavə edildi')}
            className={`group px-4 py-3 rounded-2xl border transition-all duration-300 transform hover:scale-[1.02] ${
              isDarkMode
                ? 'bg-gray-800/50 border-gray-700/50 text-gray-200 hover:bg-gray-700/50'
                : 'bg-white/50 border-gray-200/50 text-gray-700 hover:bg-gray-50/50 shadow-sm hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg group-hover:scale-110 transition-transform duration-200">⭐</span>
              <span className="text-sm font-bold">Favorilər</span>
            </div>
          </button>
          
          <button
            onClick={() => alert('Paylaş seçimləri')}
            className={`group px-4 py-3 rounded-2xl border transition-all duration-300 transform hover:scale-[1.02] ${
              isDarkMode
                ? 'bg-gray-800/50 border-gray-700/50 text-gray-200 hover:bg-gray-700/50'
                : 'bg-white/50 border-gray-200/50 text-gray-700 hover:bg-gray-50/50 shadow-sm hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg group-hover:scale-110 transition-transform duration-200">📤</span>
              <span className="text-sm font-bold">Paylaş</span>
            </div>
          </button>
        </div>
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