import React, { useMemo, useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { VideoPlayer } from '../media/VideoPlayer';
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

  const lessonTabs = [
    { key: 'article', label: t.article },
    { key: 'video3d', label: '3D video' },
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
                      src="/image copy.png"
                      alt="Velosiped və moped qaydaları"
                      className={`max-w-full rounded-xl shadow-md ${isDarkMode ? 'border border-gray-700' : ''}`}
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
          <Card>
            <div className="font-bold mb-2 text-gray-900">3D Video (Demo)</div>
            <div className="text-sm text-gray-700">
              3D video məzmunu burada göstəriləcək.
            </div>
          </Card>
        );

      default:
        return null;
    }
  }

  return (
    <>
    <div className="p-3 pb-32">
      {/* Module Dropdown */}
      <div className="relative mb-3">
        <button
          onClick={() => setModuleDropdownOpen(!moduleDropdownOpen)}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-left flex items-center justify-between min-h-[44px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <span className="font-medium text-gray-900 flex-1 min-w-0 truncate">{displayTitle}</span>
          <span className={`transform transition-transform ${moduleDropdownOpen ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        <div className={`mt-2 px-1 text-base md:text-lg font-bold leading-snug ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
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

      {/* Internal Tabs */}
      <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide">
        {lessonTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-2 rounded-lg text-xs font-bold border whitespace-nowrap min-h-[36px] ${
              activeTab === tab.key
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-gray-100 text-gray-700 border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Main Action Buttons */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Button 
          onClick={() => navigate('Practice', { moduleId })}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          📝 Suallar
        </Button>
        <Button 
          onClick={() => alert('Başqa imtahan növü (demo)')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          🧪 İmtahana başla
        </Button>
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