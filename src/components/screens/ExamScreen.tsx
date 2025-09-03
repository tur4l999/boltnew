import React, { useMemo, useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Button } from '../ui/Button';
import { EXAM_TOPICS } from '../../lib/data';

type ExamTabKey = 'byTickets' | 'byTopics' | 'exam';

export function ExamScreen() {
  const { isDarkMode, t, navigate, hasActivePackage } = useApp();
  const [activeTab, setActiveTab] = useState<ExamTabKey>('byTickets');
  const [expandedTopics, setExpandedTopics] = useState<Record<number, boolean>>({});
  const [showPurchasePopup, setShowPurchasePopup] = useState(false);

  const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  type Subtopic = { id: string; title: string; questionCount: number };
  type Topic = { id: number; title: string; questionCount: number; subtopics?: Subtopic[] };

  const topics: Topic[] = useMemo(() => {
    return EXAM_TOPICS.map((t) => {
      if (t.subtopics && t.subtopics.length > 0) {
        const subtopics: Subtopic[] = t.subtopics.map((st, idx) => ({
          id: `${t.id}-${idx + 1}`,
          title: st,
          questionCount: randomInt(5, 20),
        }));
        const total = subtopics.reduce((sum, s) => sum + s.questionCount, 0);
        return { id: t.id, title: t.title, questionCount: total, subtopics };
      }
      return { id: t.id, title: t.title, questionCount: randomInt(8, 35) };
    });
  }, []);

  const toggleTopic = (id: number) => {
    setExpandedTopics((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={`p-3 pb-24 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className={`mb-2 text-sm font-bold text-center ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
        Testlər
      </div>
      <div className={`rounded-xl overflow-hidden border mb-3 transition-colors duration-200 ${
        isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
      }`}>
        <div className="grid grid-cols-3">
          <button
            onClick={() => setActiveTab('byTickets')}
            className={`py-2 text-sm font-bold ${
              activeTab === 'byTickets'
                ? 'text-emerald-600 border-b-2 border-emerald-600'
                : 'text-gray-500'
            }`}
          >
            {t.byTickets ?? 'Biletlər üzrə'}
          </button>
          <button
            onClick={() => setActiveTab('byTopics')}
            className={`py-2 text-sm font-bold ${
              activeTab === 'byTopics'
                ? 'text-emerald-600 border-b-2 border-emerald-600'
                : 'text-gray-500'
            }`}
          >
            {t.byTopics ?? 'Mövzular üzrə'}
          </button>
          <button
            onClick={() => setActiveTab('exam')}
            className={`py-2 text-sm font-bold ${
              activeTab === 'exam'
                ? 'text-emerald-600 border-b-2 border-emerald-600'
                : 'text-gray-500'
            }`}
          >
            {t.exam}
          </button>
        </div>
      </div>

      {activeTab === 'byTickets' && (
        <div className="space-y-2">
          {Array.from({ length: 20 }, (_, idx) => {
            const unlocked = hasActivePackage() || idx < 5;
            return (
              <div
                key={idx}
                onClick={() => { if (!unlocked) setShowPurchasePopup(true); }}
                className={!unlocked ? 'cursor-pointer' : ''}
              >
                <div
                  className={`rounded-lg border p-3 text-sm flex items-center justify-between transition-colors duration-200 ${
                    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  } ${!unlocked ? 'opacity-60' : ''}`}
                >
                  <div className="font-bold flex items-center gap-2">
                    {!unlocked && (
                      <span className="text-gray-400 text-base animate-pulse">🔒</span>
                    )}
                    <span>Bilet {idx + 1}</span>
                  </div>
                  <div className="text-gray-500">{unlocked ? '0/20' : 'Kilidli'}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'byTopics' && (
        <div className="space-y-2">
          {topics.map((topic) => {
            const hasSub = !!topic.subtopics && topic.subtopics.length > 0;
            const unlocked = hasActivePackage() || topic.id === 8 || topic.id === 11;
            const expanded = unlocked && !!expandedTopics[topic.id];
            return (
              <div
                key={topic.id}
                className={`rounded-lg border transition-colors duration-200 ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } ${!unlocked ? 'opacity-60' : ''}`}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (!unlocked) { setShowPurchasePopup(true); return; }
                    if (hasSub) { toggleTopic(topic.id); }
                  }}
                  className="w-full p-3 text-sm flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {hasSub && (
                      <span
                        className={`text-xs transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
                      >
                        ▸
                      </span>
                    )}
                    <div className="font-bold truncate flex items-center gap-2">
                      {!unlocked && (
                        <span className="text-gray-400 text-base animate-pulse">🔒</span>
                      )}
                      <span className="truncate">{topic.title}</span>
                    </div>
                  </div>
                  <div className="text-gray-500">{unlocked ? `0/${topic.questionCount}` : 'Kilidli'}</div>
                </button>
                {hasSub && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="px-3 pb-3 pt-0 space-y-1">
                      {topic.subtopics!.map((st, idx) => (
                        <div
                          key={st.id}
                          className={`rounded-md border px-2 py-2 text-xs flex items-center justify-between ${
                            isDarkMode ? 'bg-gray-900/50 border-gray-700' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="text-gray-700 dark:text-gray-200 truncate flex items-center gap-2">
                            {!unlocked && (
                              <span className="text-gray-400">🔒</span>
                            )}
                            <span className="truncate">{st.title}</span>
                          </div>
                          <div className="text-gray-500">{unlocked ? `0/${st.questionCount}` : 'Kilidli'}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'exam' && (
        <div className={`rounded-xl border p-4 text-sm transition-colors duration-200 ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="text-xs text-gray-500 mb-3">{t.examSimulator}</div>
          <div className="space-y-3">
            <Button 
              onClick={() => navigate('ExamConfig', { mode: 'simulator' })}
              className="w-full"
            >
              🧪 İmtahan simulyatoru
            </Button>
            <Button 
              onClick={() => navigate('ExamConfig', { mode: 'final' })}
              className="w-full"
              variant="secondary"
            >
              📋 Yekun imtahan
            </Button>
          </div>
        </div>
      )}

      {showPurchasePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowPurchasePopup(false)} />
          <div className={`relative z-10 w-[90%] max-w-sm rounded-2xl p-5 shadow-xl border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className={`text-base font-bold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Məzmun kilidlidir
            </div>
            <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm mb-4`}>
              Bu bölməni açmaq üçün paket tələb olunur. Paket almaq istəyirsiniz?
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
    </div>
  );
}

