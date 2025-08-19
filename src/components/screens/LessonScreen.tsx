import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { VideoPlayer } from '../media/VideoPlayer';
import { PracticeInline } from '../practice/PracticeInline';

export function LessonScreen() {
  const { t, navigate, currentScreen } = useApp();
  const [activeTab, setActiveTab] = useState('video');
  const [offlineDownload, setOfflineDownload] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [moduleDropdownOpen, setModuleDropdownOpen] = useState(false);
  
  const { moduleId } = currentScreen.params;
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
              <div className="flex items-center gap-1">
                <input
                  id="offline"
                  type="checkbox"
                  checked={offlineDownload}
                  onChange={(e) => setOfflineDownload(e.target.checked)}
                  className="w-3 h-3 text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="offline" className="text-xs text-gray-600">
                  📱 {t.download}
                </label>
              </div>
              <button
                onClick={() => alert('Digər istifadəçilərin sualları və müəllim cavabları (demo)')}
                className="flex items-center gap-1 px-2 py-1 text-xs bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors min-h-[28px]"
              >
                💬 Müəllimlə əlaqə
              </button>
              <button
                onClick={() => alert('Video şərhi əlavə edildi (demo)')}
                className="flex items-center gap-1 px-2 py-1 text-xs bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors min-h-[28px]"
              >
                💭 Şərh et
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
            <div className="font-bold mb-2 text-gray-900">Konspekt</div>
            <div className="text-sm text-gray-700">
              Dərs konspekti və əlavə materiallar buraya düşəcək. (Demo)
            </div>
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
    <div className="p-3 pb-32">
      {/* Module Dropdown */}
      <div className="relative mb-3">
        <button
          onClick={() => setModuleDropdownOpen(!moduleDropdownOpen)}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-left flex items-center justify-between min-h-[44px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <span className="font-medium text-gray-900">{moduleId}: Yol nişanları</span>
          <span className={`transform transition-transform ${moduleDropdownOpen ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        
        {moduleDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-y-auto z-10">
            {Array.from({ length: 27 }, (_, i) => (
              <button
                key={i}
                onClick={() => {
                  navigate('Lesson', { moduleId: `M${i + 1}` });
                  setModuleDropdownOpen(false);
                }}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 min-h-[44px] ${
                  moduleId === `M${i + 1}` ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-gray-700'
                }`}
              >
                M{i + 1}: Module {i + 1} — Traffic Rules & Safety
              </button>
            ))}
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
  );
}