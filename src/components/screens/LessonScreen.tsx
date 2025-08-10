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
  
  const { moduleId } = currentScreen.params;
  const watermark = `UID-1234 · ${new Date().toLocaleString()}`;

  const lessonTabs = [
    { key: 'article', label: t.article },
    { key: 'video', label: t.video },
    { key: 'materials', label: t.materials },
    { key: 'questions', label: t.questions },
    { key: 'video3d', label: t.video3d },
    { key: 'contactTeacher', label: t.contactTeacher },
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
            <Card className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  id="offline"
                  type="checkbox"
                  checked={offlineDownload}
                  onChange={(e) => setOfflineDownload(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="offline" className="text-sm text-gray-700">
                  {t.download}
                </label>
              </div>
              <div className="text-xs text-gray-500">(demo)</div>
            </Card>
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
            <div className="font-bold mb-2 text-gray-900">PDF / şəkillər</div>
            <div className="text-sm text-gray-700">
              Materiallar siyahısı buraya düşəcək. (Demo)
            </div>
          </Card>
        );

      case 'questions':
        return <PracticeInline />;

      case 'video3d':
        return (
          <Card>
            <div className="font-bold mb-2 text-gray-900">3D Səhnə (Demo)</div>
            <div className="text-sm text-gray-700">
              3D səhnələrin video və ya interaktiv versiyası burada açılacaq.
            </div>
          </Card>
        );

      case 'contactTeacher':
        return (
          <Card>
            <div className="flex items-center gap-3 mb-3">
              <div className="text-emerald-600 text-xl">💬</div>
              <div>
                <div className="font-bold text-gray-900">Müəllimlə əlaqə</div>
                <div className="text-sm text-gray-500">
                  Sualınızı göndərin, cavab bildirişlə gələcək.
                </div>
              </div>
            </div>
            <textarea
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              placeholder="Sualınızı yazın..."
              className="w-full rounded-xl border border-gray-300 p-3 outline-none min-h-[80px] resize-vertical text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <div className="flex justify-end mt-2">
              <Button
                onClick={() => {
                  if (contactMessage.trim()) {
                    console.log('Sending message:', contactMessage);
                    setContactMessage('');
                  }
                }}
                disabled={!contactMessage.trim()}
                size="sm"
              >
                Göndər
              </Button>
            </div>
          </Card>
        );

      default:
        return null;
    }
  }

  return (
    <div className="p-3 pb-32">
      {/* Topic Chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-3 scrollbar-hide">
        {Array.from({ length: 27 }, (_, i) => (
          <button
            key={i}
            onClick={() => navigate('Lesson', { moduleId: `M${i + 1}` })}
            className={`px-3 py-2 rounded-lg whitespace-nowrap text-xs border min-h-[36px] ${
              moduleId === `M${i + 1}`
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-gray-100 text-gray-700 border-gray-300'
            }`}
          >
            M{i + 1}
          </button>
        ))}
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

      {/* Floating CTAs */}
      <div className="fixed left-0 right-0 bottom-20 z-40">
        <div className="max-w-md mx-auto px-3">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 grid grid-cols-2 gap-2 p-2">
            <Button onClick={() => navigate('Practice', { moduleId })}>
              {t.startTest}
            </Button>
            <Button 
              onClick={() => navigate('ExamConfig')}
              variant="secondary"
            >
              {t.goToExam}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}