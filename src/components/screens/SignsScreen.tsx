/** @jsxImportSource react */
import React, { useMemo, useState, useCallback } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { EmojiIcon } from '../ui/EmojiIcon';
import { SlideTransition } from '../ui/SlideTransition';

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
const SIGNS: Record<SignCategoryKey, { id: string; name: string; img: string; description: string; details?: string }[]> = {
  prohibitory: [
    { 
      id: 'p1', 
      name: 'Dayanmaq qadağandır', 
      img: '/signs/prohibitory/no-stopping.svg', 
      description: 'Bu nişan altında dayanmaq qadağandır.',
      details: 'Bu nişan quraşdırıldığı yerdən sonra bütün nəqliyyat vasitələrinin dayanması qadağandır. Nişanın təsiri növbəti kəsişməyə qədər davam edir.'
    },
    { 
      id: 'p2', 
      name: 'Park etmək qadağandır', 
      img: '/signs/prohibitory/no-parking.svg', 
      description: 'Bu nişan altında park etmək qadağandır.',
      details: 'Nişan quraşdırıldığı yerdən sonra avtomobillərin 5 dəqiqədən artıq saxlanması qadağandır. Sərnişin düşürmə və yükləmə işlərinə icazə verilir.'
    },
    { 
      id: 'p3', 
      name: 'Sol dönmə qadağandır', 
      img: '/signs/prohibitory/no-left-turn.svg', 
      description: 'Bu nişan altında sola dönmək qadağandır.',
      details: 'Nişan yalnız sola dönməni qadağan edir, geri dönməni qadağan etmir. İctimai nəqliyyat vasitələrinə şamil olunmur.'
    },
  ],
  priority: [
    { 
      id: 'pr1', 
      name: 'Baş yol', 
      img: '/signs/priority/priority-road.svg', 
      description: 'Bu yolda siz üstünlük hüququna maliksiniz.',
      details: 'Baş yol nişanı quraşdırıldığı yolda hərəkət edən nəqliyyat vasitələrinin digər yollardan gələn vasitələr qarşısında üstünlük hüququna malik olduğunu bildirir.'
    },
    { 
      id: 'pr2', 
      name: 'Yol vermə', 
      img: '/signs/priority/give-way.svg', 
      description: 'Qarşıdan gələn nəqliyyata yol verməlisiniz.',
      details: 'Bu nişan qarşısında sürücü əsas yolda hərəkət edən nəqliyyat vasitələrinə yol verməlidir. Lazım gəldikdə tam dayanmalıdır.'
    },
  ],
  warning: [
    { 
      id: 'w1', 
      name: 'Sərt döngə', 
      img: '/signs/warning/sharp-turn.svg', 
      description: 'Qarşıda kəskin döngə var, sürəti azaldın.',
      details: 'Bu nişan qarşıda təhlükəli döngənin olduğunu xəbər verir. Sürəti əvvəlcədən azaltmaq və döngəyə hazırlaşmaq lazımdır.'
    },
    { 
      id: 'w2', 
      name: 'Uşaq bağçası', 
      img: '/signs/warning/children.svg', 
      description: 'Uşaq bağçası və ya məktəb yaxınlığı.',
      details: 'Bu ərazidə uşaqların yoldan keçmə ehtimalı yüksəkdir. Xüsusi ehtiyat və aşağı sürət tələb olunur.'
    },
  ],
  mandatory: [
    { 
      id: 'm1', 
      name: 'Sağa dönmək məcburidir', 
      img: '/signs/mandatory/turn-right.svg', 
      description: 'Bu istiqamətdə hərəkət məcburidir.',
      details: 'Nişan quraşdırıldığı yerdə yalnız sağa dönmək mümkündür. Düz getmək və ya sola dönmək qadağandır.'
    },
    { 
      id: 'm2', 
      name: 'Hərəkət istiqaməti', 
      img: '/signs/mandatory/straight-only.svg', 
      description: 'Yalnız düz istiqamətdə hərəkət etmək olar.',
      details: 'Bu nişan yalnız düz istiqamətdə hərəkəti icazə verir. Heç bir istiqamətə dönmək qadağandır.'
    },
  ],
  informational: [
    { 
      id: 'i1', 
      name: 'Park yeri', 
      img: '/signs/info/parking.svg', 
      description: 'Park üçün icazəli yer.',
      details: 'Bu nişan avtomobil park etmək üçün nəzərdə tutulmuş yeri göstərir. Ödənişli və ya pulsuz ola bilər.'
    },
    { 
      id: 'i2', 
      name: 'Yanacaq doldurma məntəqəsi', 
      img: '/signs/info/gas-station.svg', 
      description: 'Yaxınlıqda yanacaq doldurma məntəqəsi.',
      details: 'Bu nişan yaxınlıqda yanacaq doldurma məntəqəsinin olduğunu göstərir. Məsafə əlavə lövhə ilə göstərilə bilər.'
    },
  ],
};

// Demo road markings and vertical signs
const MARKINGS = [
  { 
    id: 'mk1', 
    name: 'Mərkəz xətti (1.1)', 
    description: 'Zolaqları ayıran fasiləsiz xətt.',
    details: 'Fasiləsiz ağ xətt əks istiqamətdə hərəkət edən nəqliyyat zolaqlarını ayırır. Bu xətti keçmək qadağandır.'
  },
  { 
    id: 'mk2', 
    name: 'Kəsik xətt (1.5)', 
    description: 'Zolaqlar arasında manevr üçün icazə.',
    details: 'Kəsik ağ xətt eyni istiqamətdə hərəkət edən zolaqları ayırır. Bu xətti keçərək zolaq dəyişmək olar.'
  },
  { 
    id: 'mk3', 
    name: 'Piyada keçidi', 
    description: 'Piyadaların yolu keçmək üçün nişanlanması.',
    details: 'Ağ zolaqlarla işarələnmiş sahə piyadaların təhlükəsiz yol keçməsi üçündür. Sürücülər piyadaya yol verməlidir.'
  },
];

const VERTICAL_SIGNS = [
  { 
    id: 'vs1', 
    name: 'Dayaq sütunu işarəsi', 
    description: 'Yol kənarını göstərən vertikal işarə.',
    details: 'Ağ və qara zolaqlarla rənglənmiş sütunlar yolun kənarını və istiqamətini göstərir. Xüsusən dumanlı havalarda faydalıdır.'
  },
  { 
    id: 'vs2', 
    name: 'Maneə əks etdiricisi', 
    description: 'Maneələrin kənarlarını göstərir.',
    details: 'Qırmızı və ağ əks etdirici lentlərlə örtülmüş maneələr gecə vaxtı görünürlüyü artırır və təhlükəsizliyi təmin edir.'
  },
  { 
    id: 'vs3', 
    name: 'Yol kənarı maneə', 
    description: 'Yol kənarındakı sabit maneələr.',
    details: 'Beton bloklar, metal qoruyucular və digər sabit maneələr yoldan çıxmanı qarşısını alır və həyatı qoruyur.'
  },
];

export function SignsScreen() {
  const { isDarkMode, goBack, switchTab } = useApp();
  const [view, setView] = useState<'home' | 'signs' | 'markings' | 'vertical'>('home');
  const [activeSignCategory, setActiveSignCategory] = useState<SignCategoryKey>('prohibitory');
  const [selectedSignId, setSelectedSignId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [signsStage, setSignsStage] = useState<'categories' | 'detail'>('categories');
  const [selectedCategory, setSelectedCategory] = useState<SignCategoryKey | null>(null);
  const [selectedMarkingId, setSelectedMarkingId] = useState<string | null>(null);
  const [selectedVerticalId, setSelectedVerticalId] = useState<string | null>(null);

  const currentSigns = useMemo(() => SIGNS[activeSignCategory] || [], [activeSignCategory]);
  const selectedSign = useMemo(() => currentSigns.find(s => s.id === selectedSignId) || null, [currentSigns, selectedSignId]);
  const selectedMarking = useMemo(() => MARKINGS.find(m => m.id === selectedMarkingId) || null, [selectedMarkingId]);
  const selectedVertical = useMemo(() => VERTICAL_SIGNS.find(v => v.id === selectedVerticalId) || null, [selectedVerticalId]);

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
                  placeholder="Nişanları axtarın..."
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

      <div className="px-3 pb-24 pt-4">
        {view === 'home' ? (
          <div className="space-y-6">
            {/* Compact Hero Section */}
            <div className="text-center space-y-2">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br transition-all duration-300 ${
                isDarkMode 
                  ? 'from-blue-500/20 to-indigo-600/20' 
                  : 'from-blue-500/10 to-indigo-600/10'
              }`}>
                <EmojiIcon emoji="🛑" size={20} />
              </div>
              <div>
                <h1 className={`text-xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Yol nişanları
                </h1>
                <p className={`text-sm mt-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Nişanlar və işarələr
                </p>
              </div>
            </div>

            {/* Main Categories Grid */}
            <div className="grid grid-cols-1 gap-3">
              {/* Traffic Signs Card */}
              <Card 
                variant="glass" 
                padding="md"
                onClick={() => { setView('signs'); setSignsStage('categories'); setSelectedCategory(null); }}
                className={`group overflow-hidden border-0 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-red-500/10 via-amber-500/10 to-emerald-500/10 hover:from-red-500/15 hover:via-amber-500/15 hover:to-emerald-500/15' 
                    : 'bg-gradient-to-br from-red-50/50 via-amber-50/50 to-emerald-50/50 hover:from-red-100/50 hover:via-amber-100/50 hover:to-emerald-100/50'
                } transition-all duration-300 hover:shadow-lg`}
              >
                <div className="flex items-center gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${
                    isDarkMode 
                      ? 'bg-gray-700/50' 
                      : 'bg-white/50'
                  } shadow-sm`}>
                    <EmojiIcon emoji="🛑" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-base font-bold mb-1 transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Yol nişanları
                    </h3>
                    <p className={`text-xs transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      5 kateqoriyada nişanlar
                    </p>
                  </div>
                  <div className={`flex-shrink-0 transition-all duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <EmojiIcon emoji="›" size={16} />
                  </div>
                </div>
              </Card>

              {/* Road Markings Card */}
              <Card 
                variant="glass" 
                padding="md"
                onClick={() => setView('markings')}
                className={`group overflow-hidden border-0 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-blue-500/10 to-indigo-500/10 hover:from-blue-500/15 hover:to-indigo-500/15' 
                    : 'bg-gradient-to-br from-blue-50/50 to-indigo-50/50 hover:from-blue-100/50 hover:to-indigo-100/50'
                } transition-all duration-300 hover:shadow-lg`}
              >
                <div className="flex items-center gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${
                    isDarkMode 
                      ? 'bg-gray-700/50' 
                      : 'bg-white/50'
                  } shadow-sm`}>
                    <EmojiIcon emoji="〰️" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-base font-bold mb-1 transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Nişanlanma xəttləri
                    </h3>
                    <p className={`text-xs transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Üfüqi nişanlanmalar
                    </p>
                  </div>
                  <div className={`flex-shrink-0 transition-all duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <EmojiIcon emoji="›" size={16} />
                  </div>
                </div>
              </Card>

              {/* Vertical Signs Card */}
              <Card 
                variant="glass" 
                padding="md"
                onClick={() => setView('vertical')}
                className={`group overflow-hidden border-0 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 hover:from-purple-500/15 hover:to-pink-500/15' 
                    : 'bg-gradient-to-br from-purple-50/50 to-pink-50/50 hover:from-purple-100/50 hover:to-pink-100/50'
                } transition-all duration-300 hover:shadow-lg`}
              >
                <div className="flex items-center gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${
                    isDarkMode 
                      ? 'bg-gray-700/50' 
                      : 'bg-white/50'
                  } shadow-sm`}>
                    <EmojiIcon emoji="📶" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-base font-bold mb-1 transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Vertikal nişanlar
                    </h3>
                    <p className={`text-xs transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Dayaq sütunları və əks etdiricilər
                    </p>
                  </div>
                  <div className={`flex-shrink-0 transition-all duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <EmojiIcon emoji="›" size={16} />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Section Header */}
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setView('home')} 
                className={`group flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-200 border border-gray-700/50' 
                    : 'bg-white/70 hover:bg-gray-50 text-gray-700 border border-gray-200/50'
                } backdrop-blur-sm`}
              >
                <EmojiIcon emoji="←" size={14} />
                <span className="font-medium text-sm">Geri</span>
              </button>
              
              <div className={`text-right ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <div className="text-xs uppercase tracking-wider font-semibold">
                  {view === 'signs' && (signsStage === 'categories' ? 'Nişanlar' : (SIGN_CATEGORIES.find(c => c.key === selectedCategory)?.title || 'Nişanlar'))}
                  {view === 'markings' && 'Xətlər'}
                  {view === 'vertical' && 'Vertikal'}
                </div>
              </div>
            </div>

            {view === 'signs' && (
              <div className="space-y-6">
                {signsStage === 'categories' ? (
                  <div className="grid grid-cols-1 gap-3">
                    {SIGN_CATEGORIES.map((cat, index) => (
                      <SlideTransition key={cat.key} direction="right" delay={index * 50}>
                        <Card
                          variant="glass"
                          padding="md"
                          onClick={() => { 
                            setSelectedCategory(cat.key); 
                            setActiveSignCategory(cat.key); 
                            setSelectedSignId(null); 
                            setSignsStage('detail'); 
                          }}
                          className={`group overflow-hidden border-0 ${
                            isDarkMode 
                              ? `bg-gradient-to-br from-gray-800/50 to-gray-700/30 hover:from-gray-700/60 hover:to-gray-600/40` 
                              : `bg-gradient-to-br ${cat.bgGradient} hover:shadow-lg`
                          } transition-all duration-300`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                              isDarkMode 
                                ? 'bg-gray-700/50' 
                                : 'bg-white/70'
                            } shadow-sm`}>
                              <EmojiIcon emoji={cat.emoji} size={18} />
                            </div>
                            <div className="flex-1">
                              <h3 className={`text-sm font-bold mb-1 transition-colors duration-300 ${
                                isDarkMode ? 'text-white' : cat.color
                              }`}>
                                {cat.title}
                              </h3>
                              <p className={`text-xs transition-colors duration-300 ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                {cat.description}
                              </p>
                            </div>
                            <div className={`flex-shrink-0 transition-all duration-300 ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              <EmojiIcon emoji="›" size={16} />
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
                          <div className="flex items-start gap-6">
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
                              <p className={`text-base leading-relaxed mb-4 ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                              }`}>
                                {selectedSign.description}
                              </p>
                              {selectedSign.details && (
                                <div className={`p-4 rounded-xl ${
                                  isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50/70'
                                }`}>
                                  <p className={`text-sm leading-relaxed ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                  }`}>
                                    {selectedSign.details}
                                  </p>
                                </div>
                              )}
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
                <div className="grid grid-cols-1 gap-4">
                  {filteredMarkings.map((m, index) => (
                    <SlideTransition key={m.id} direction="right" delay={index * 100}>
                      <Card 
                        variant="glass" 
                        padding="lg"
                        onClick={() => setSelectedMarkingId(prev => prev === m.id ? null : m.id)}
                        className={`border-0 ${
                          isDarkMode 
                            ? 'bg-gray-800/50 hover:bg-gray-700/60' 
                            : 'bg-white/70 hover:bg-gray-50/80'
                        } transition-all duration-500 hover:shadow-xl hover:scale-[1.02] ${
                          selectedMarking?.id === m.id ? 'scale-[1.02] shadow-xl' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                              isDarkMode ? 'bg-blue-500/20' : 'bg-blue-50'
                            }`}>
                              <EmojiIcon emoji="〰️" size={20} />
                            </div>
                            <div>
                              <h4 className={`font-bold text-lg ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                {m.name}
                              </h4>
                              <p className={`text-sm ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                              }`}>
                                {m.description}
                              </p>
                            </div>
                          </div>
                          <div className={`transition-all duration-300 ${
                            selectedMarking?.id === m.id 
                              ? 'rotate-90 text-emerald-500' 
                              : ''
                          } ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <EmojiIcon emoji={selectedMarking?.id === m.id ? '▾' : '▸'} size={18} />
                          </div>
                        </div>
                        
                        {selectedMarking?.id === m.id && (
                          <div className={`mt-6 pt-6 border-t transition-all duration-500 ${
                            isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
                          }`}>
                            <div className={`text-base leading-relaxed ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {m.details}
                            </div>
                          </div>
                        )}
                      </Card>
                    </SlideTransition>
                  ))}
                </div>
              </div>
            )}

            {view === 'vertical' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  {filteredVertical.map((v, index) => (
                    <SlideTransition key={v.id} direction="right" delay={index * 100}>
                      <Card 
                        variant="glass" 
                        padding="lg"
                        onClick={() => setSelectedVerticalId(prev => prev === v.id ? null : v.id)}
                        className={`border-0 ${
                          isDarkMode 
                            ? 'bg-gray-800/50 hover:bg-gray-700/60' 
                            : 'bg-white/70 hover:bg-gray-50/80'
                        } transition-all duration-500 hover:shadow-xl hover:scale-[1.02] ${
                          selectedVertical?.id === v.id ? 'scale-[1.02] shadow-xl' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                              isDarkMode ? 'bg-purple-500/20' : 'bg-purple-50'
                            }`}>
                              <EmojiIcon emoji="📶" size={20} />
                            </div>
                            <div>
                              <h4 className={`font-bold text-lg ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                {v.name}
                              </h4>
                              <p className={`text-sm ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                              }`}>
                                {v.description}
                              </p>
                            </div>
                          </div>
                          <div className={`transition-all duration-300 ${
                            selectedVertical?.id === v.id 
                              ? 'rotate-90 text-emerald-500' 
                              : ''
                          } ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <EmojiIcon emoji={selectedVertical?.id === v.id ? '▾' : '▸'} size={18} />
                          </div>
                        </div>
                        
                        {selectedVertical?.id === v.id && (
                          <div className={`mt-6 pt-6 border-t transition-all duration-500 ${
                            isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
                          }`}>
                            <div className={`text-base leading-relaxed ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {v.details}
                            </div>
                          </div>
                        )}
                      </Card>
                    </SlideTransition>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {((view === 'signs' && filteredSigns.length === 0) ||
              (view === 'markings' && filteredMarkings.length === 0) ||
              (view === 'vertical' && filteredVertical.length === 0)) && (
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
        )}
      </div>
    </div>
  );
}