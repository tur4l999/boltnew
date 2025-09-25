/** @jsxImportSource react */
import React, { useMemo, useState, useCallback } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { EmojiIcon } from '../ui/EmojiIcon';
import { SlideTransition } from '../ui/SlideTransition';
import { AZ_RULES } from '../../lib/rules';

type SignCategoryKey = 'prohibitory' | 'priority' | 'warning' | 'mandatory' | 'informational';

const SIGN_CATEGORIES: { 
  key: SignCategoryKey; 
  title: string; 
  description: string;
  emoji: string;
  color: string;
  bgGradient: string;
}[] = [
  { 
    key: 'prohibitory', 
    title: 'Qadağan nişanları', 
    description: 'Müəyyən hərəkətləri qadağan edən nişanlar',
    emoji: '🚫',
    color: 'text-red-600',
    bgGradient: 'from-red-50 to-red-100'
  },
  { 
    key: 'priority', 
    title: 'Üstünlük nişanları', 
    description: 'Yol hərəkətində üstünlüyü müəyyən edən nişanlar',
    emoji: '⭐',
    color: 'text-amber-600',
    bgGradient: 'from-amber-50 to-amber-100'
  },
  { 
    key: 'warning', 
    title: 'Xəbərdarlıq nişanları', 
    description: 'Qarşıda olan təhlükələr barədə məlumat verən nişanlar',
    emoji: '⚠️',
    color: 'text-orange-600',
    bgGradient: 'from-orange-50 to-orange-100'
  },
  { 
    key: 'mandatory', 
    title: 'Məcburi nişanlar', 
    description: 'Müəyyən hərəkətləri tələb edən nişanlar',
    emoji: '✅',
    color: 'text-blue-600',
    bgGradient: 'from-blue-50 to-blue-100'
  },
  { 
    key: 'informational', 
    title: 'Məlumat nişanları', 
    description: 'Yol şəraiti haqqında məlumat verən nişanlar',
    emoji: 'ℹ️',
    color: 'text-emerald-600',
    bgGradient: 'from-emerald-50 to-emerald-100'
  },
];

// Demo data for a few signs in each category
const SIGNS: Record<SignCategoryKey, { id: string; name: string; img: string; description: string }[]> = {
  prohibitory: [
    { id: 'p1', name: 'Dayanmaq qadağandır', img: '/signs/prohibitory/no-stopping.svg', description: 'Bu nişan altında dayanmaq qadağandır.' },
    { id: 'p2', name: 'Park etmək qadağandır', img: '/signs/prohibitory/no-parking.svg', description: 'Bu nişan altında park etmək qadağandır.' },
  ],
  priority: [
    { id: 'pr1', name: 'Baş yol', img: '/signs/priority/priority-road.svg', description: 'Bu yolda siz üstünlük hüququna maliksiniz.' },
  ],
  warning: [
    { id: 'w1', name: 'Sərt döngə', img: '/signs/warning/sharp-turn.svg', description: 'Qarşıda kəskin döngə var, sürəti azaldın.' },
  ],
  mandatory: [
    { id: 'm1', name: 'Sağa dönmək məcburidir', img: '/signs/mandatory/turn-right.svg', description: 'Bu istiqamətdə hərəkət məcburidir.' },
  ],
  informational: [
    { id: 'i1', name: 'Park yeri', img: '/signs/info/parking.svg', description: 'Park üçün icazəli yer.' },
  ],
};

// Demo road markings and vertical signs
const MARKINGS = [
  { id: 'mk1', name: 'Mərkəz xətti (1.1)', description: 'Zolaqları ayıran fasiləsiz xətt.' },
  { id: 'mk2', name: 'Kəsik xətt (1.5)', description: 'Zolaqlar arasında manevr üçün icazə.' },
];

const VERTICAL_SIGNS = [
  { id: 'vs1', name: 'Dayaq sütunu işarəsi', description: 'Yol kənarını göstərən vertikal işarə.' },
  { id: 'vs2', name: 'Maneə əks etdiricisi', description: 'Maneələrin kənarlarını göstərir.' },
];

export function RulesScreen() {
  const { isDarkMode, goBack, switchTab } = useApp();
  const [view, setView] = useState<'home' | 'signs' | 'markings' | 'vertical'>('home');
  const [activeSignCategory, setActiveSignCategory] = useState<SignCategoryKey>('prohibitory');
  const [selectedSignId, setSelectedSignId] = useState<string | null>(null);
  const [selectedRuleId, setSelectedRuleId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [signsStage, setSignsStage] = useState<'categories' | 'detail'>('categories');
  const [selectedCategory, setSelectedCategory] = useState<SignCategoryKey | null>(null);

  const currentSigns = useMemo(() => SIGNS[activeSignCategory] || [], [activeSignCategory]);
  const selectedSign = useMemo(() => currentSigns.find(s => s.id === selectedSignId) || null, [currentSigns, selectedSignId]);
  const selectedRule = useMemo(() => AZ_RULES.find(r => r.id === selectedRuleId) || null, [selectedRuleId]);

  const norm = useCallback((s: string) => s.toLowerCase().trim(), []);
  const q = norm(query);
  const filteredSigns = useMemo(
    () => (q ? currentSigns.filter(s => norm(s.name).includes(q) || norm(s.description).includes(q)) : currentSigns),
    [currentSigns, q, norm]
  );
  const filteredMarkings = useMemo(
    () => (q ? MARKINGS.filter(m => norm(m.name).includes(q) || norm(m.description).includes(q)) : MARKINGS),
    [q, norm]
  );
  const filteredVertical = useMemo(
    () => (q ? VERTICAL_SIGNS.filter(v => norm(v.name).includes(q) || norm(v.description).includes(q)) : VERTICAL_SIGNS),
    [q, norm]
  );
  const filteredRules = useMemo(
    () => (q ? AZ_RULES.filter(r => norm(r.title).includes(q) || norm(r.content).includes(q)) : AZ_RULES),
    [q, norm]
  );

  const handleImgError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    const target = e.currentTarget;
    target.onerror = null;
    target.src = '/image.png';
  };

  const handleBackClick = () => {
    try {
      if (switchTab) {
        switchTab('Home');
        return;
      }
    } catch (_) {}
    try { goBack(); } catch (_) { /* noop */ }
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      {/* Modern Header with Glass Effect */}
      <div className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gray-900/80 border-gray-700/50' 
          : 'bg-white/80 border-gray-200/50'
      }`}>
        <div className="px-4 py-4">
          <div className="flex items-center gap-4">
            {/* Modern Back Button */}
            <button 
              onClick={handleBackClick}
              className={`group relative flex items-center justify-center w-12 h-12 rounded-2xl border transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-700/50 text-gray-200' 
                  : 'bg-white/70 border-gray-200/50 hover:bg-gray-50 text-gray-700'
              } hover:scale-105 hover:shadow-lg backdrop-blur-sm`}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <EmojiIcon emoji="←" size={20} />
            </button>

            {/* Enhanced Search Bar */}
            <div className={`flex-1 relative group ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800/50 border-gray-700/50 focus-within:border-emerald-500/50' 
                  : 'bg-white/70 border-gray-200/50 focus-within:border-emerald-500/50'
              } backdrop-blur-sm focus-within:shadow-lg focus-within:scale-[1.02]`}>
                <EmojiIcon emoji="🔍" size={20} className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400 group-focus-within:text-emerald-400' : 'text-gray-500 group-focus-within:text-emerald-500'
                }`} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Qaydalar və nişanları axtarın..."
                  className={`flex-1 bg-transparent outline-none text-base placeholder:transition-colors duration-300 ${
                    isDarkMode 
                      ? 'text-gray-100 placeholder:text-gray-500' 
                      : 'text-gray-900 placeholder:text-gray-500'
                  }`}
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className={`p-1.5 rounded-xl transition-all duration-200 hover:scale-110 ${
                      isDarkMode 
                        ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
                    }`}
                  >
                    <EmojiIcon emoji="✕" size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-24 pt-6">
        {view === 'home' ? (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br transition-all duration-300 ${
                isDarkMode 
                  ? 'from-emerald-500/20 to-green-600/20 shadow-lg shadow-emerald-500/10' 
                  : 'from-emerald-500/10 to-green-600/10 shadow-lg shadow-emerald-500/5'
              }`}>
                <EmojiIcon emoji="📚" size={32} />
              </div>
              <div>
                <h1 className={`text-3xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Yol hərəkəti qaydaları
                </h1>
                <p className={`text-lg mt-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Azərbaycan Respublikasının yol hərəkəti qaydaları və nişanları
                </p>
              </div>
            </div>

            {/* Main Categories Grid */}
            <div className="grid grid-cols-1 gap-6">
              {/* Traffic Signs Card */}
              <Card 
                variant="glass" 
                padding="lg"
                onClick={() => { setView('signs'); setSignsStage('categories'); setSelectedCategory(null); }}
                className={`group overflow-hidden border-0 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-red-500/10 via-amber-500/10 to-emerald-500/10 hover:from-red-500/15 hover:via-amber-500/15 hover:to-emerald-500/15' 
                    : 'bg-gradient-to-br from-red-50/50 via-amber-50/50 to-emerald-50/50 hover:from-red-100/50 hover:via-amber-100/50 hover:to-emerald-100/50'
                } transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]`}
              >
                <div className="flex items-center gap-6">
                  <div className={`flex-shrink-0 w-20 h-20 rounded-3xl flex items-center justify-center ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-gray-700/50 to-gray-800/50' 
                      : 'bg-gradient-to-br from-white/50 to-gray-50/50'
                  } shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <EmojiIcon emoji="🛑" size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Yol nişanları
                    </h3>
                    <p className={`text-base transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Qadağan, üstünlük, xəbərdarlıq, məcburi və məlumat nişanları
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {['🚫', '⭐', '⚠️', '✅', 'ℹ️'].map((emoji, idx) => (
                        <div 
                          key={idx}
                          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 ${
                            isDarkMode 
                              ? 'bg-gray-700/30 group-hover:bg-gray-600/50' 
                              : 'bg-white/50 group-hover:bg-gray-100/70'
                          }`}
                          style={{ animationDelay: `${idx * 100}ms` }}
                        >
                          <EmojiIcon emoji={emoji} size={14} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`flex-shrink-0 transition-all duration-300 group-hover:translate-x-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <EmojiIcon emoji="›" size={24} />
                  </div>
                </div>
              </Card>

              {/* Road Markings Card */}
              <Card 
                variant="glass" 
                padding="lg"
                onClick={() => setView('markings')}
                className={`group overflow-hidden border-0 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-blue-500/10 to-indigo-500/10 hover:from-blue-500/15 hover:to-indigo-500/15' 
                    : 'bg-gradient-to-br from-blue-50/50 to-indigo-50/50 hover:from-blue-100/50 hover:to-indigo-100/50'
                } transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]`}
              >
                <div className="flex items-center gap-6">
                  <div className={`flex-shrink-0 w-20 h-20 rounded-3xl flex items-center justify-center ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-gray-700/50 to-gray-800/50' 
                      : 'bg-gradient-to-br from-white/50 to-gray-50/50'
                  } shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <EmojiIcon emoji="〰️" size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Nişanlanma xəttləri
                    </h3>
                    <p className={`text-base transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Yol üzərində çəkilən üfüqi nişanlanmalar və onların mənası
                    </p>
                  </div>
                  <div className={`flex-shrink-0 transition-all duration-300 group-hover:translate-x-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <EmojiIcon emoji="›" size={24} />
                  </div>
                </div>
              </Card>

              {/* Vertical Signs Card */}
              <Card 
                variant="glass" 
                padding="lg"
                onClick={() => setView('vertical')}
                className={`group overflow-hidden border-0 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 hover:from-purple-500/15 hover:to-pink-500/15' 
                    : 'bg-gradient-to-br from-purple-50/50 to-pink-50/50 hover:from-purple-100/50 hover:to-pink-100/50'
                } transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]`}
              >
                <div className="flex items-center gap-6">
                  <div className={`flex-shrink-0 w-20 h-20 rounded-3xl flex items-center justify-center ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-gray-700/50 to-gray-800/50' 
                      : 'bg-gradient-to-br from-white/50 to-gray-50/50'
                  } shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <EmojiIcon emoji="📶" size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Vertikal nişanlar
                    </h3>
                    <p className={`text-base transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Dayaq sütunları, əks etdiricilər və yol kənarı nişanlar
                    </p>
                  </div>
                  <div className={`flex-shrink-0 transition-all duration-300 group-hover:translate-x-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <EmojiIcon emoji="›" size={24} />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setView('home')} 
                className={`group flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-200 border border-gray-700/50' 
                    : 'bg-white/70 hover:bg-gray-50 text-gray-700 border border-gray-200/50'
                } backdrop-blur-sm hover:scale-105 hover:shadow-lg`}
              >
                <EmojiIcon emoji="←" size={16} />
                <span className="font-medium">Ana səhifə</span>
              </button>
              
              <div className={`text-right ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="text-sm uppercase tracking-wider font-semibold">
                  {view === 'signs' && (signsStage === 'categories' ? 'Nişanlar' : (SIGN_CATEGORIES.find(c => c.key === selectedCategory)?.title || 'Nişanlar'))}
                  {view === 'markings' && 'Nişanlanma xəttləri'}
                  {view === 'vertical' && 'Vertikal nişanlar'}
                </div>
              </div>
            </div>

            {view === 'signs' && (
              <div className="space-y-6">
                {signsStage === 'categories' ? (
                  <div className="grid grid-cols-1 gap-4">
                    {SIGN_CATEGORIES.map((cat, index) => (
                      <SlideTransition key={cat.key} direction="right" delay={index * 100}>
                        <Card
                          variant="glass"
                          padding="lg"
                          onClick={() => { 
                            setSelectedCategory(cat.key); 
                            setActiveSignCategory(cat.key); 
                            setSelectedSignId(null); 
                            setSignsStage('detail'); 
                          }}
                          className={`group overflow-hidden border-0 ${
                            isDarkMode 
                              ? `bg-gradient-to-br from-gray-800/50 to-gray-700/30 hover:from-gray-700/60 hover:to-gray-600/40` 
                              : `bg-gradient-to-br ${cat.bgGradient} hover:shadow-xl`
                          } transition-all duration-500 hover:scale-[1.02]`}
                        >
                          <div className="flex items-center gap-6">
                            <div className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center ${
                              isDarkMode 
                                ? 'bg-gray-700/50' 
                                : 'bg-white/70'
                            } shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                              <EmojiIcon emoji={cat.emoji} size={28} />
                            </div>
                            <div className="flex-1">
                              <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                                isDarkMode ? 'text-white' : cat.color
                              }`}>
                                {cat.title}
                              </h3>
                              <p className={`text-sm transition-colors duration-300 ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                              }`}>
                                {cat.description}
                              </p>
                            </div>
                            <div className={`flex-shrink-0 transition-all duration-300 group-hover:translate-x-1 ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              <EmojiIcon emoji="›" size={20} />
                            </div>
                          </div>
                        </Card>
                      </SlideTransition>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <button 
                      onClick={() => { setSignsStage('categories'); setSelectedSignId(null); }} 
                      className={`group flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-200 border border-gray-700/50' 
                          : 'bg-white/70 hover:bg-gray-50 text-gray-700 border border-gray-200/50'
                      } backdrop-blur-sm hover:scale-105 hover:shadow-lg`}
                    >
                      <EmojiIcon emoji="←" size={16} />
                      <span className="font-medium">Kateqoriyalar</span>
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {filteredSigns.map((s, idx) => (
                        <SlideTransition key={s.id} direction="right" delay={200 + idx * 50}>
                          <Card
                            variant="glass"
                            padding="lg"
                            onClick={() => setSelectedSignId(s.id)}
                            className={`group overflow-hidden border-0 ${
                              isDarkMode 
                                ? 'bg-gray-800/50 hover:bg-gray-700/60' 
                                : 'bg-white/70 hover:bg-gray-50/80'
                            } transition-all duration-500 hover:shadow-xl hover:scale-[1.02]`}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden ${
                                isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50/70'
                              } shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                <img 
                                  src={s.img} 
                                  alt={s.name} 
                                  className="w-12 h-12 object-contain" 
                                  onError={handleImgError} 
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className={`font-bold text-lg mb-1 transition-colors duration-300 ${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                  {s.name}
                                </h4>
                                <p className={`text-sm transition-colors duration-300 ${
                                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                }`}>
                                  Ətraflı məlumat üçün toxunun
                                </p>
                              </div>
                            </div>
                          </Card>
                        </SlideTransition>
                      ))}
                    </div>

                    {selectedSign && (
                      <SlideTransition direction="up" delay={0}>
                        <Card
                          variant="elevated"
                          padding="lg"
                          className={`border-0 ${
                            isDarkMode 
                              ? 'bg-gradient-to-br from-gray-800 to-gray-700 shadow-2xl shadow-gray-900/50' 
                              : 'bg-gradient-to-br from-white to-gray-50 shadow-2xl shadow-gray-900/10'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className={`text-xl font-bold ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              Nişan məlumatları
                            </h3>
                            <button 
                              onClick={() => setSelectedSignId(null)} 
                              className={`p-2 rounded-xl transition-all duration-200 hover:scale-110 ${
                                isDarkMode 
                                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50' 
                                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
                              }`}
                            >
                              <EmojiIcon emoji="✕" size={18} />
                            </button>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className={`flex-shrink-0 w-24 h-24 rounded-3xl overflow-hidden flex items-center justify-center ${
                              isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                            } shadow-lg`}>
                              <img 
                                src={selectedSign.img} 
                                alt={selectedSign.name} 
                                className="w-20 h-20 object-contain" 
                                onError={handleImgError} 
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className={`text-2xl font-bold mb-3 ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                {selectedSign.name}
                              </h4>
                              <p className={`text-base leading-relaxed ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                              }`}>
                                {selectedSign.description}
                              </p>
                            </div>
                          </div>
                        </Card>
                      </SlideTransition>
                    )}
                  </div>
                )}
              </div>
            )}

            {view === 'markings' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredMarkings.map((m, index) => (
                    <SlideTransition key={m.id} direction="right" delay={index * 100}>
                      <Card 
                        variant="glass" 
                        padding="lg"
                        className={`border-0 ${
                          isDarkMode 
                            ? 'bg-gray-800/50 hover:bg-gray-700/60' 
                            : 'bg-white/70 hover:bg-gray-50/80'
                        } transition-all duration-500 hover:shadow-xl hover:scale-[1.02]`}
                      >
                        <div className="space-y-3">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                            isDarkMode ? 'bg-blue-500/20' : 'bg-blue-50'
                          }`}>
                            <EmojiIcon emoji="〰️" size={20} />
                          </div>
                          <h4 className={`font-bold text-lg ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {m.name}
                          </h4>
                          <p className={`text-sm leading-relaxed ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {m.description}
                          </p>
                        </div>
                      </Card>
                    </SlideTransition>
                  ))}
                </div>
              </div>
            )}

            {view === 'vertical' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredVertical.map((v, index) => (
                    <SlideTransition key={v.id} direction="right" delay={index * 100}>
                      <Card 
                        variant="glass" 
                        padding="lg"
                        className={`border-0 ${
                          isDarkMode 
                            ? 'bg-gray-800/50 hover:bg-gray-700/60' 
                            : 'bg-white/70 hover:bg-gray-50/80'
                        } transition-all duration-500 hover:shadow-xl hover:scale-[1.02]`}
                      >
                        <div className="space-y-3">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                            isDarkMode ? 'bg-purple-500/20' : 'bg-purple-50'
                          }`}>
                            <EmojiIcon emoji="📶" size={20} />
                          </div>
                          <h4 className={`font-bold text-lg ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {v.name}
                          </h4>
                          <p className={`text-sm leading-relaxed ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {v.description}
                          </p>
                        </div>
                      </Card>
                    </SlideTransition>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Enhanced Rules Section */}
        <div className="mt-12 space-y-6">
          <div className="flex items-center gap-4">
            <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${
              isDarkMode 
                ? 'bg-gradient-to-br from-emerald-500/20 to-green-600/20' 
                : 'bg-gradient-to-br from-emerald-500/10 to-green-600/10'
            }`}>
              <EmojiIcon emoji="📋" size={20} />
            </div>
            <div>
              <h2 className={`text-2xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Azərbaycan yol hərəkəti qaydaları
              </h2>
              <p className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {filteredRules.length} maddə tapıldı
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {filteredRules.map((r, index) => (
              <SlideTransition key={r.id} direction="up" delay={index * 50}>
                <Card 
                  variant="glass"
                  padding="lg"
                  onClick={() => setSelectedRuleId(prev => prev === r.id ? null : r.id)}
                  className={`group border-0 ${
                    isDarkMode 
                      ? 'bg-gray-800/50 hover:bg-gray-700/60' 
                      : 'bg-white/70 hover:bg-gray-50/80'
                  } transition-all duration-500 hover:shadow-xl ${
                    selectedRule?.id === r.id ? 'scale-[1.02] shadow-xl' : 'hover:scale-[1.01]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
                        isDarkMode 
                          ? 'bg-emerald-500/20 text-emerald-400' 
                          : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {index + 1}
                      </div>
                      <h4 className={`font-bold text-lg transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {r.title}
                      </h4>
                    </div>
                    <div className={`flex-shrink-0 transition-all duration-300 ${
                      selectedRule?.id === r.id 
                        ? 'rotate-90 text-emerald-500' 
                        : 'group-hover:translate-x-1'
                    } ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <EmojiIcon emoji={selectedRule?.id === r.id ? '▾' : '▸'} size={18} />
                    </div>
                  </div>
                  
                  {selectedRule?.id === r.id && (
                    <div className={`mt-6 pt-6 border-t transition-all duration-500 ${
                      isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
                    }`}>
                      <div className={`text-base leading-relaxed transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {r.content}
                      </div>
                    </div>
                  )}
                </Card>
              </SlideTransition>
            ))}
            
            {filteredRules.length === 0 && (
              <div className="text-center py-12">
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'
                }`}>
                  <EmojiIcon emoji="🔍" size={32} />
                </div>
                <div className={`text-lg font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Heç nə tapılmadı
                </div>
                <div className={`text-sm ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  Axtarış şərtlərini dəyişdirərək yenidən cəhd edin
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}