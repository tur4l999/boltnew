import React, { useMemo, useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Button } from '../ui/Button';

type ExamTabKey = 'byTickets' | 'byTopics' | 'exam';

export function ExamScreen() {
  const { isDarkMode, t, navigate } = useApp();
  const [activeTab, setActiveTab] = useState<ExamTabKey>('byTickets');
  const [expandedTopics, setExpandedTopics] = useState<Record<number, boolean>>({});

  const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  type Subtopic = { id: string; title: string; questionCount: number };
  type Topic = { id: number; title: string; questionCount: number; subtopics?: Subtopic[] };

  const topics: Topic[] = useMemo(() => {
    const items: Topic[] = [];
    for (let i = 1; i <= 27; i++) {
      const hasSubtopics = i === 2 || i === 3 || i === 27;
      if (hasSubtopics) {
        const subCount = i === 2 ? 2 : i === 3 ? 8 : 5;
        const subtopics: Subtopic[] = Array.from({ length: subCount }, (_, idx) => ({
          id: `${i}-${idx + 1}`,
          title: `Alt mövzu ${idx + 1}`,
          questionCount: randomInt(5, 20),
        }));
        const total = subtopics.reduce((sum, s) => sum + s.questionCount, 0);
        items.push({ id: i, title: `Mövzu ${i}`, questionCount: total, subtopics });
      } else {
        items.push({ id: i, title: `Mövzu ${i}`, questionCount: randomInt(8, 35) });
      }
    }
    return items;
  }, []);

  const toggleTopic = (id: number) => {
    setExpandedTopics((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={`p-3 pb-20 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className={`rounded-xl overflow-hidden border mb-3 transition-colors duration-200 ${
        isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
      }`}>
        <div className="grid grid-cols-3">
          <button
            onClick={() => setActiveTab('byTickets')}
            className={`py-2 text-xs font-bold ${
              activeTab === 'byTickets'
                ? 'text-emerald-600 border-b-2 border-emerald-600'
                : 'text-gray-500'
            }`}
          >
            {t.byTickets ?? 'Biletlər üzrə'}
          </button>
          <button
            onClick={() => setActiveTab('byTopics')}
            className={`py-2 text-xs font-bold ${
              activeTab === 'byTopics'
                ? 'text-emerald-600 border-b-2 border-emerald-600'
                : 'text-gray-500'
            }`}
          >
            {t.byTopics ?? 'Mövzular üzrə'}
          </button>
          <button
            onClick={() => setActiveTab('exam')}
            className={`py-2 text-xs font-bold ${
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
          {Array.from({ length: 20 }, (_, idx) => (
            <div
              key={idx}
              className={`rounded-lg border p-3 text-sm flex items-center justify-between transition-colors duration-200 ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <div className="font-bold">Bilet {idx + 1}</div>
              <div className="text-gray-500">0/20</div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'byTopics' && (
        <div className="space-y-2">
          {topics.map((topic) => {
            const hasSub = !!topic.subtopics && topic.subtopics.length > 0;
            const expanded = !!expandedTopics[topic.id];
            return (
              <div
                key={topic.id}
                className={`rounded-lg border transition-colors duration-200 ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => hasSub ? toggleTopic(topic.id) : undefined}
                  className="w-full p-3 text-sm flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    {hasSub && (
                      <span
                        className={`text-xs transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
                      >
                        ▸
                      </span>
                    )}
                    <div className="font-bold">{topic.title}</div>
                  </div>
                  <div className="text-gray-500">0/{topic.questionCount}</div>
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
                          <div className="text-gray-700 dark:text-gray-200">{st.title}</div>
                          <div className="text-gray-500">0/{st.questionCount}</div>
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
    </div>
  );
}

