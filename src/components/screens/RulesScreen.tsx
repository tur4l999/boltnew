import React, { useMemo, useState, useCallback } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { SlideTransition } from '../ui/SlideTransition';

type SignCategoryKey = 'prohibitory' | 'priority' | 'warning' | 'mandatory' | 'informational';

const SIGN_CATEGORIES: { key: SignCategoryKey; title: string }[] = [
  { key: 'prohibitory', title: 'Qadağan nişanları' },
  { key: 'priority', title: 'Üstünlük nişanları' },
  { key: 'warning', title: 'Xəbərdarlıq nişanları' },
  { key: 'mandatory', title: 'Məcburi nişanlar' },
  { key: 'informational', title: 'Məlumat nişanları' },
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

// AZ traffic rules topics (titles + brief summaries) – 26 items
const AZ_RULES = [
  { id: 'r1', title: 'Maddə 1. Əsas anlayışlar', content: 'Qanunda istifadə olunan terminlər izah edilir. “Yol”, “sürücü”, “piyada”, “nəqliyyat vasitəsi” kimi anlayışlar dəqiq tərif olunur. Bu terminlər digər maddələrin düzgün anlaşılması üçün baza yaradır.' },
  { id: 'r2', title: 'Maddə 2. Qanunun təyinatı', content: 'Yol hərəkəti sahəsində təhlükəsizlik və nizam-intizamı təmin etmək məqsədi açıqlanır. Qanun, bütün iştirakçılar üçün hüquqi çərçivə və davranış standartları müəyyənləşdirir.' },
  { id: 'r3', title: 'Maddə 3. Yol hərəkəti haqqında qanunvericilik', content: 'Tətbiq olunan normativ sənədlərin iyerarxiyası göstərilir. Standartlar, qaydalar və digər aktlarla qarşılıqlı əlaqə və üstünlük prinsipləri müəyyən edilir.' },
  { id: 'r4', title: 'Maddə 4. Dövlət orqanlarının vəzifələri', content: 'Yol hərəkətinə nəzarət, təşkil və təhlükəsizlik üzrə səlahiyyətlər sadalanır. Maarifləndirmə, statistika aparılması və infrastrukturun saxlanılması da bu səlahiyyətlərə daxildir.' },
  { id: 'r5', title: 'Maddə 5. Hüquqi şəxslərin vəzifələri', content: 'Daşımalarla məşğul olan və ya avtomobil parkı saxlayan təşkilatların öhdəlikləri müəyyən edilir. Texniki baxım, sürücülərin hazırlığı və təhlükəsizlik standartlarına əməl vacibdir.' },
  { id: 'r6', title: 'Maddə 6. Fiziki şəxslərin hüquq və vəzifələri', content: 'Sürücü, sərnişin və piyadaların hüquqları və öhdəlikləri açıqlanır. Hörmət, ehtiyat və təhlükəsizliyin prioritetliyi vurğulanır.' },
  { id: 'r7', title: 'Maddə 6-1. Beynəlxalq daşımalarda vəzifələr', content: 'Beynəlxalq sərnişin və yük daşımalarını təşkil edən və icra edənlər üçün əlavə tələblər göstərilir. Sənədləşmə, marşrut planlaşdırılması və təhlükəsizlik normaları əsasdır.' },
  { id: 'r8', title: 'Maddə 7. Yol hərəkətinin təşkili', content: 'Nişanların, işıqforların və nişanlanma xətlərinin tətbiqi qaydaları izah edilir. Hərəkət axınının fasiləsizliyi və təhlükəsizliyi üçün təşkilati tədbirlər göstərilir.' },
  { id: 'r9', title: 'Maddə 8. Başlanğıc və manevrlər', content: 'Hərəkətə başlama, dönmə, ötmə və zolaq dəyişmə zamanı davranış qaydaları verilir. Sürücü əvvəlcədən siqnal verir və təhlükəsizliyi təmin edir.' },
  { id: 'r10', title: 'Maddə 9. Dayanma və durma', content: 'Dayanma/durma yerləri və qadağaları sadalanır. Görünüşə mane olmamaq və hərəkətə təhlükə yaratmamaq əsas şərtdir.' },
  { id: 'r11', title: 'Maddə 10. Sürət rejimi', content: 'Müxtəlif yol şəraitləri üçün sürət məhdudiyyətləri müəyyən edilir. Havanın, yolun və nəqliyyat axınının vəziyyətinə uyğun sürət seçilməlidir.' },
  { id: 'r12', title: 'Maddə 11. Piyadaların hərəkəti', content: 'Piyadaların keçidlərdən istifadəsi və yolun təhlükəsiz keçilməsi qaydaları verilir. Sürücülərin piyadalara qarşı məsuliyyəti ayrıca vurğulanır.' },
  { id: 'r13', title: 'Maddə 12. Sərnişinlərin daşınması', content: 'Avtomobildə sərnişinlərin oturması, uşaq oturacaqları və təhlükəsizlik kəmərləri ilə bağlı tələblər. Sərnişinlərin düşmə/minmə zamanı təhlükəsizlik qaydaları göstərilir.' },
  { id: 'r14', title: 'Maddə 13. Yük daşınması', content: 'Yükün yerləşdirilməsi, bərkidilməsi və ölçü-kütlə məhdudiyyətləri izah olunur. Yük hərəkətə, görünüşə və stabilliyə mane olmamalıdır.' },
  { id: 'r15', title: 'Maddə 14. Xüsusi siqnalların tətbiqi', content: 'Xüsusi təyinatlı nəqliyyat vasitələrinin işıq və səs siqnallarından istifadəsi qaydaları. Digər sürücülərin belə vasitələrə üstünlük vermə öhdəliyi xatırladılır.' },
  { id: 'r16', title: 'Maddə 15. Dəmiryolu keçidləri', content: 'Keçidlərdən istifadə zamanı dayanma, görünüş və siqnalların tələbləri təsvir edilir. Qırmızı işıq və ya baryerlər zamanı keçid qadağandır.' },
  { id: 'r17', title: 'Maddə 16. Avtobus zolaqları və ictimai nəqliyyat', content: 'İctimai nəqliyyat üçün ayrılmış zolaqlardan istifadə qaydaları. Sürücülər bu zolaqlara məhdud hallarda daxil ola bilər.' },
  { id: 'r18', title: 'Maddə 17. Yol nişanları və nişanlanma', content: 'Yol nişanlarının və üfüqi/vertikal nişanlanmanın hüquqi qüvvəsi və üstünlüyü göstərilir. Ziddiyyət olduqda prioritet qaydası açıqlanır.' },
  { id: 'r19', title: 'Maddə 18. İşıqfor və tənzimləyici siqnalları', content: 'İşıqfor işıqlarının mənası və tənzimləyicinin jestlərinə tabe olmaq qaydaları izah olunur. Ziddiyyət olduqda tənzimləyici üstünlük təşkil edir.' },
  { id: 'r20', title: 'Maddə 19. Ötmə və qarşıdan gələn hərəkət', content: 'Ötmənin icazəli olduğu hallar, qadağalar və təhlükəsizlik şərtləri. Qarşıdan gələn nəqliyyatla qarşılaşmada davranış qaydaları qeyd edilir.' },
  { id: 'r21', title: 'Maddə 20. Fövqəladə dayanma və nişanlar', content: 'Qəza dayanacağı və fövqəladə işıq siqnalının tətbiqi qaydaları. Maneə barədə digər sürücülərin vaxtında xəbərdar edilməsi vacibdir.' },
  { id: 'r22', title: 'Maddə 21. Sərxoşluq və tibbi yoxlama', content: 'Spirtli içki və ya narkotik təsiri altında idarənin qadağan edilməsi. Tibbi müayinəyə göndərmə və hüquqi nəticələr izah olunur.' },
  { id: 'r23', title: 'Maddə 22. Velosiped və fərdi mikromobilite', content: 'Velosiped, skuter kimi vasitələrin hərəkət qaydaları və prioritetləri. Yolun kənarı və velosiped zolaqlarından istifadə tələbləri verilir.' },
  { id: 'r24', title: 'Maddə 23. Ekoloji tələblər', content: 'Zərərli tullantıların azaldılması, səs-küy və tüstü normativləri. Texniki baxımın vaxtında aparılması ekoloji təhlükəsizlik üçün vacibdir.' },
  { id: 'r25', title: 'Maddə 24. Qəzalar və hadisələrin rəsmiləşdirilməsi', content: 'Yol-nəqliyyat hadisəsi zamanı tərəflərin davranışı, ilkin yardım və polisin çağırılması qaydaları. Foto/video sənədləşdirmə və protokollaşdırma prinsipləri qeyd olunur.' },
  { id: 'r26', title: 'Maddə 25. Məsuliyyət və cərimələr', content: 'Qaydaların pozulmasına görə inzibati məsuliyyətin əsasları və sanksiyalar xatırladılır. Təhlükəsizliyin təmin olunması üçün profilaktik tədbirlər tövsiyə edilir.' },
];

export function RulesScreen() {
  const { isDarkMode, goBack, switchTab } = useApp();
  // Home with 3 entries; each opens its own sub-view
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
    // Top bar back: always to app main Home tab
    try {
      if (switchTab) {
        switchTab('Home');
        return;
      }
    } catch (_) {}
    // Fallback
    try { goBack(); } catch (_) { /* noop */ }
  };

  return (
    <div className={`p-3 pb-24 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Search / Filter */}
      <div className={`mb-3 sticky top-0 z-40 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="flex items-center gap-2 py-1">
          <button onClick={handleBackClick} className={`px-3 py-2 rounded-xl border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-700'}`}>←</button>
          <div className={`flex items-center gap-2 flex-1 px-3 py-2 rounded-xl border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>🔎</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Axtarış..."
              className={`flex-1 bg-transparent outline-none text-sm ${isDarkMode ? 'text-gray-100 placeholder-gray-500' : 'text-gray-900 placeholder-gray-500'}`}
            />
            {query && (
              <button
                aria-label="Təmizlə"
                onClick={() => setQuery('')}
                className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
              >✕</button>
            )}
          </div>
        </div>
      </div>

      {view === 'home' ? (
        <Card className="mb-3">
          <div className="grid grid-cols-1 gap-2">
            <button onClick={() => { setView('signs'); setSignsStage('categories'); setSelectedCategory(null); }} className={`w-full p-4 rounded-xl border flex items-center justify-between ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-100' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-900'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>🛑</div>
                <div className="text-left">
                  <div className="font-bold text-sm">Nişanlar</div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Qadağan, üstünlük, xəbərdarlıq və s.</div>
                </div>
              </div>
              <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>›</span>
            </button>
            <button onClick={() => setView('markings')} className={`w-full p-4 rounded-xl border flex items-center justify-between ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-100' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-900'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>〰️</div>
                <div className="text-left">
                  <div className="font-bold text-sm">Nişanlanma xəttləri</div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Yol üfüqi nişanlanmaları</div>
                </div>
              </div>
              <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>›</span>
            </button>
            <button onClick={() => setView('vertical')} className={`w-full p-4 rounded-xl border flex items-center justify-between ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-100' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-900'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>📶</div>
                <div className="text-left">
                  <div className="font-bold text-sm">Vertikal nişanlar</div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Dayaq sütunları, əks etdiricilər</div>
                </div>
              </div>
              <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>›</span>
            </button>
          </div>
        </Card>
      ) : (
        <Card className="mb-3">
          <div className="mb-2">
            <div className={`text-xs uppercase tracking-wide font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
              {view === 'signs' && (signsStage === 'categories' ? 'Nişanlar' : (SIGN_CATEGORIES.find(c => c.key === selectedCategory)?.title || 'Nişanlar'))}
              {view === 'markings' && 'Nişanlanma xəttləri'}
              {view === 'vertical' && 'Vertikal nişanlar'}
            </div>
          </div>

          {view === 'signs' && (
            <div>
              {signsStage === 'categories' ? (
                <div className="space-y-2">
                  <div className="mb-2">
                    <button onClick={() => setView('home')} className={`px-2 py-1 rounded-lg text-xs ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>← Geri</button>
                  </div>
                  {SIGN_CATEGORIES.map(cat => (
                    <button
                      key={cat.key}
                      onClick={() => { setSelectedCategory(cat.key); setActiveSignCategory(cat.key); setSelectedSignId(null); setSignsStage('detail'); }}
                      className={`w-full p-3 flex items-center justify-between rounded-xl border ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-100' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-900'}`}
                    >
                      <div className="text-sm font-medium">{cat.title}</div>
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>›</span>
                    </button>
                  ))}
                </div>
              ) : (
                <>
                  <div className="mb-2">
                    <button onClick={() => { setSignsStage('categories'); setSelectedSignId(null); }} className={`px-2 py-1 rounded-lg text-xs ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>← Geri</button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {filteredSigns.map((s, idx) => (
                      <SlideTransition key={s.id} direction="right" delay={200 + idx * 50}>
                        <button
                          onClick={() => setSelectedSignId(s.id)}
                          className={`rounded-xl border shadow-sm p-3 flex items-center gap-3 transition-colors min-h-[48px] ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-100' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-900'}`}
                        >
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <img src={s.img} alt={s.name} className="w-10 h-10 object-contain" onError={handleImgError} />
                          </div>
                          <div className="text-left">
                            <div className={`font-bold text-sm ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{s.name}</div>
                            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Baxmaq üçün toxunun</div>
                          </div>
                        </button>
                      </SlideTransition>
                    ))}
                  </div>

                  {selectedSign && (
                    <Card className="mt-2">
                      <div className="mb-2">
                        <button onClick={() => setSelectedSignId(null)} className={`px-2 py-1 rounded-lg text-xs ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>← Geri</button>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
                          <img src={selectedSign.img} alt={selectedSign.name} className="w-14 h-14 object-contain" onError={handleImgError} />
                        </div>
                        <div>
                          <div className="font-bold text-sm">{selectedSign.name}</div>
                          <div className="text-xs text-gray-600">{selectedSign.description}</div>
                        </div>
                      </div>
                    </Card>
                  )}
                </>
              )}
            </div>
          )}

          {view === 'markings' && (
            <div>
              <div className="mb-2">
                <button onClick={() => setView('home')} className={`px-2 py-1 rounded-lg text-xs ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>← Geri</button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {filteredMarkings.map(m => (
                  <Card key={m.id} className="p-3">
                    <div className="font-bold text-sm">{m.name}</div>
                    <div className="text-xs text-gray-600">{m.description}</div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {view === 'vertical' && (
            <div>
              <div className="mb-2">
                <button onClick={() => setView('home')} className={`px-2 py-1 rounded-lg text-xs ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>← Geri</button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {filteredVertical.map(v => (
                  <Card key={v.id} className="p-3">
                    <div className="font-bold text-sm">{v.name}</div>
                    <div className="text-xs text-gray-600">{v.description}</div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Rules list always below the sections */}
      <Card>
        <div className="flex items-center justify-between mb-2">
          <div className={`text-xs uppercase tracking-wide font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Azərbaycan yol hərəkəti qaydaları</div>
          <div className={`h-px flex-1 ml-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
        </div>
        <div className="space-y-2">
          {filteredRules.map(r => (
            <Card key={r.id} onClick={() => setSelectedRuleId(prev => prev === r.id ? null : r.id)}>
              <div className="flex items-center justify-between">
                <div className="font-bold text-sm">{r.title}</div>
                <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{selectedRule?.id === r.id ? '▾' : '▸'}</div>
              </div>
              {selectedRule?.id === r.id && (
                <div className="text-xs text-gray-600 mt-2 leading-relaxed">{r.content}</div>
              )}
            </Card>
          ))}
          {filteredRules.length === 0 && (
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Heç nə tapılmadı.</div>
          )}
        </div>
      </Card>
    </div>
  );
}

