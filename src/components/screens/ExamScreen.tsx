import React, { useMemo, useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Button } from '../ui/Button';
import { EmojiIcon } from '../ui/EmojiIcon';
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
    <div className={`p-4 pb-24 min-h-screen transition-all duration-300 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
        : 'bg-gradient-to-br from-gray-50 via-white to-emerald-50'
    }`}>
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-10 right-10 w-32 h-32 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-purple-500/5' : 'bg-purple-400/10'
        }`}></div>
        <div className={`absolute bottom-20 left-10 w-24 h-24 rounded-full blur-2xl animate-pulse ${
          isDarkMode ? 'bg-blue-500/5' : 'bg-blue-400/10'
        }`} style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10">
        <div className={`mb-6 text-center ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          <h1 className="text-2xl font-black mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t.tests}
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Bilet və mövzu üzrə testlərlə hazırlaşın
          </p>
        </div>

        <div className={`rounded-2xl overflow-hidden border-2 mb-6 transition-all duration-300 backdrop-blur-sm ${
          isDarkMode 
            ? 'border-gray-700/50 bg-gray-800/80 shadow-xl' 
            : 'border-gray-200/50 bg-white/80 shadow-xl'
        }`}>
          <div className="grid grid-cols-3">
            <button
              onClick={() => setActiveTab('byTickets')}
              className={`py-4 px-2 text-sm font-bold transition-all duration-300 relative group ${
                activeTab === 'byTickets'
                  ? 'text-emerald-600'
                  : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {activeTab === 'byTickets' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
              )}
              <div className="relative z-10 flex flex-col items-center">
                <div className="text-lg mb-1"><EmojiIcon emoji="📄" size={18} className="text-blue-600" /></div>
                {t.byTickets ?? 'Biletlər üzrə'}
              </div>
            </button>
            <button
              onClick={() => setActiveTab('byTopics')}
              className={`py-4 px-2 text-sm font-bold transition-all duration-300 relative group ${
                activeTab === 'byTopics'
                  ? 'text-emerald-600'
                  : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {activeTab === 'byTopics' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
              )}
              <div className="relative z-10 flex flex-col items-center">
                <div className="text-lg mb-1"><EmojiIcon emoji="📚" size={18} className="text-purple-600" /></div>
                {t.byTopics ?? 'Mövzular üzrə'}
              </div>
            </button>
            <button
              onClick={() => setActiveTab('exam')}
              className={`py-4 px-2 text-sm font-bold transition-all duration-300 relative group ${
                activeTab === 'exam'
                  ? 'text-emerald-600'
                  : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {activeTab === 'exam' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
              )}
              <div className="relative z-10 flex flex-col items-center">
                <div className="text-lg mb-1"><EmojiIcon emoji="🧪" size={18} className="text-orange-600" /></div>
                {t.exam}
              </div>
            </button>
          </div>
        </div>

      {activeTab === 'byTickets' && (
        <div className="space-y-3">
          {Array.from({ length: 20 }, (_, idx) => {
            const unlocked = hasActivePackage() || idx < 5;
            return (
              <button
                key={idx}
                onClick={() => {
                  if (!unlocked) { setShowPurchasePopup(true); return; }
                  navigate('QuickTest', { ticket: idx + 1 });
                }}
                className={`w-full text-left rounded-2xl border-2 p-4 text-sm flex items-center justify-between transition-all duration-300 transform hover:scale-[1.02] group ${
                  isDarkMode 
                    ? 'bg-gray-800/80 border-gray-700/50 backdrop-blur-sm' 
                    : 'bg-white/80 border-gray-200/50 backdrop-blur-sm'
                } ${
                  !unlocked 
                    ? 'opacity-60 cursor-pointer' 
                    : 'hover:shadow-lg hover:border-emerald-500/50'
                }`}
              >
                <div className="font-bold flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg transition-all duration-300 ${
                    unlocked 
                      ? 'bg-gradient-to-br from-emerald-500 to-green-500 text-white group-hover:scale-110' 
                      : isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    {!unlocked ? (
                      <span className="text-gray-400 animate-pulse">🔒</span>
                    ) : (
                      <span className="font-black">{idx + 1}</span>
                    )}
                  </div>
                  <div>
                    <div className={`font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      Bilet {idx + 1}
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      20 sual
                    </div>
                  </div>
                </div>
                <div className={`flex items-center gap-2 ${
                  unlocked 
                    ? isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    : 'text-gray-500'
                }`}>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {unlocked ? '0/20' : 'Kilidli'}
                    </div>
                    {unlocked && (
                      <div className="text-xs opacity-75">
                        0% tamamlandı
                      </div>
                    )}
                  </div>
                  <div className="text-lg">
                    {unlocked ? '→' : '🔒'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {activeTab === 'byTopics' && (
        <div className="space-y-3">
          {topics.map((topic) => {
            const hasSub = !!topic.subtopics && topic.subtopics.length > 0;
            const unlocked = hasActivePackage() || topic.id === 8 || topic.id === 11;
            const expanded = unlocked && !!expandedTopics[topic.id];
            return (
              <div
                key={topic.id}
                className={`rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm ${
                  isDarkMode 
                    ? 'bg-gray-800/80 border-gray-700/50' 
                    : 'bg-white/80 border-gray-200/50'
                } ${!unlocked ? 'opacity-60' : 'hover:shadow-lg hover:border-emerald-500/50'}`}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (!unlocked) { setShowPurchasePopup(true); return; }
                    if (hasSub) { toggleTopic(topic.id); }
                  }}
                  className="w-full p-4 text-sm flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg transition-all duration-300 ${
                      unlocked 
                        ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white group-hover:scale-110' 
                        : isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      {!unlocked ? (
                        <span className="text-gray-400 animate-pulse">🔒</span>
                      ) : hasSub ? (
                        <span className={`transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}>
                          📁
                        </span>
                      ) : (
                        '📄'
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className={`font-bold truncate ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        {topic.title}
                      </div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {topic.questionCount} sual{hasSub ? ' • Alt mövzular var' : ''}
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 ${
                    unlocked 
                      ? isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      : 'text-gray-500'
                  }`}>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {unlocked ? `0/${topic.questionCount}` : 'Kilidli'}
                      </div>
                      {unlocked && (
                        <div className="text-xs opacity-75">
                          0% tamamlandı
                        </div>
                      )}
                    </div>
                    <div className="text-lg">
                      {!unlocked ? '🔒' : hasSub ? (expanded ? '▼' : '▶') : '→'}
                    </div>
                  </div>
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
        <div className="space-y-6">
          {/* İmtahan Simulyatoru */}
          <div className={`rounded-2xl border-2 p-6 text-sm transition-all duration-300 backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-gray-800/80 border-gray-700/50 shadow-xl' 
              : 'bg-white/80 border-gray-200/50 shadow-xl'
          }`}>
            <div className="text-center mb-6">
              <div className="text-4xl mb-3"><EmojiIcon emoji="🧪" size={32} className="text-orange-600" /></div>
              <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                {t.examSimulator}
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Real imtahan şəraitində özünüzü sınayın
              </p>
            </div>
            
            <div className="space-y-4">
              <Button 
                onClick={() => navigate('ExamConfig', { mode: 'simulator' })}
                fullWidth
                size="lg"
                variant="primary"
              >
                İmtahan simulyatoru
              </Button>
            </div>

            {/* İpucu */}
            <div className={`mt-6 p-4 rounded-xl ${
              isDarkMode ? 'bg-blue-900/20 border border-blue-700/50' : 'bg-blue-50 border border-blue-200/50'
            }`}>
              <div className="flex items-start gap-3">
                <div className="text-2xl"><EmojiIcon emoji="💡" size={20} /></div>
                <div>
                  <div className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-blue-200' : 'text-blue-900'}`}>
                    Məsləhət
                  </div>
                  <div className={`text-xs ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                    İmtahan simulyatoru real imtahan şəraitini tam təqlid edir. Əvvəlcə bütün mövzuları öyrənin.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Yekun İmtahan */}
          <div className={`rounded-2xl border-2 p-6 text-sm transition-all duration-300 backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-gray-800/80 border-gray-700/50 shadow-xl' 
              : 'bg-white/80 border-gray-200/50 shadow-xl'
          }`}>
            <div className="text-center mb-6">
              <div className="text-4xl mb-3"><EmojiIcon emoji="📋" size={32} className="text-emerald-600" /></div>
              <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Yekun İmtahan
              </h3>
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Bütün mövzuları bitirdikdən sonra yekun imtahan verə bilərsiniz
              </p>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                isDarkMode ? 'bg-amber-900/30 text-amber-400 border border-amber-700/50' : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                <EmojiIcon emoji="⏳" size={12} />
                Tüm mövzuları tamamlayın
              </div>
            </div>
            
            <div className="space-y-4">
              <Button 
                onClick={() => navigate('ExamConfig', { mode: 'final' })}
                fullWidth
                size="lg"
                variant="secondary"
                disabled={true}
              >
                Yekun imtahan
              </Button>
            </div>
          </div>
        </div>
      )}

      {showPurchasePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowPurchasePopup(false)} />
          <div className={`relative z-10 w-full max-w-sm rounded-3xl p-6 shadow-2xl border-2 backdrop-blur-xl animate-scale-in ${
            isDarkMode 
              ? 'bg-gray-800/90 border-gray-700/50' 
              : 'bg-white/90 border-gray-200/50'
          }`}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-2xl">
                🔒
              </div>
              <div className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Məzmun kilidlidir
              </div>
              <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed`}>
                Bu bölməni açmaq üçün paket tələb olunur. Premium funksiyalara çıxış əldə edin.
              </div>
            </div>
            
            <div className="space-y-3">
              <Button
                onClick={() => {
                  setShowPurchasePopup(false);
                  navigate('Packages');
                }}
                fullWidth
                size="lg"
                icon="🛍️"
                variant="primary"
              >
                Paket al
              </Button>
              <Button
                onClick={() => setShowPurchasePopup(false)}
                fullWidth
                variant="ghost"
              >
                Bağla
              </Button>
            </div>
            
            <div className={`mt-4 p-3 rounded-xl ${
              isDarkMode ? 'bg-emerald-900/20 border border-emerald-700/50' : 'bg-emerald-50 border border-emerald-200/50'
            }`}>
              <div className="flex items-center gap-2">
                <span className="text-lg">✨</span>
                <div className={`text-xs ${isDarkMode ? 'text-emerald-200' : 'text-emerald-800'}`}>
                  Premium üzvlər bütün testlərə çıxış əldə edirlər
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

