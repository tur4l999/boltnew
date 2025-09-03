import React, { useMemo, useState } from 'react';
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

// Demo rules/articles
const AZ_RULES = [
  { id: 'r1', title: '1. Ümumi müddəalar', content: 'Yol hərəkəti qaydalarının ümumi prinsipləri...' },
  { id: 'r2', title: '2. Sürücünün vəzifələri', content: 'Sürücünün əsas vəzifələri və məsuliyyətləri...' },
  { id: 'r3', title: '3. Piyadaların vəzifələri', content: 'Piyadaların hərəkət qaydaları...' },
];

export function RulesScreen() {
  const { isDarkMode } = useApp();
  const [activeSection, setActiveSection] = useState<'signs' | 'markings' | 'vertical' | 'rules'>('signs');
  const [activeSignCategory, setActiveSignCategory] = useState<SignCategoryKey>('prohibitory');
  const [selectedSignId, setSelectedSignId] = useState<string | null>(null);
  const [selectedRuleId, setSelectedRuleId] = useState<string | null>(null);

  const currentSigns = useMemo(() => SIGNS[activeSignCategory] || [], [activeSignCategory]);
  const selectedSign = useMemo(() => currentSigns.find(s => s.id === selectedSignId) || null, [currentSigns, selectedSignId]);
  const selectedRule = useMemo(() => AZ_RULES.find(r => r.id === selectedRuleId) || null, [selectedRuleId]);

  return (
    <div className={`p-3 pb-24 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <Card className="mb-2">
        <div className="flex items-center justify-between mb-2">
          <div className={`text-xs uppercase tracking-wide font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Nişanlar</div>
          <div className={`h-px flex-1 ml-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
        </div>

        {/* Tabs for sections */}
        <div className="flex gap-2 mb-3">
          <button onClick={() => setActiveSection('signs')} className={`px-3 py-1 rounded-lg text-xs font-bold ${activeSection==='signs' ? 'bg-emerald-600 text-white' : (isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700')}`}>Nişanlar</button>
          <button onClick={() => setActiveSection('markings')} className={`px-3 py-1 rounded-lg text-xs font-bold ${activeSection==='markings' ? 'bg-emerald-600 text-white' : (isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700')}`}>Nişanlanma xəttləri</button>
          <button onClick={() => setActiveSection('vertical')} className={`px-3 py-1 rounded-lg text-xs font-bold ${activeSection==='vertical' ? 'bg-emerald-600 text-white' : (isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700')}`}>Vertikal nişanlar</button>
          <button onClick={() => setActiveSection('rules')} className={`px-3 py-1 rounded-lg text-xs font-bold ${activeSection==='rules' ? 'bg-emerald-600 text-white' : (isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700')}`}>Azərbaycan yol hərəkəti qaydaları</button>
        </div>

        {/* Content Area */}
        {activeSection === 'signs' && (
          <div>
            {/* Sign categories */}
            <div className="flex gap-2 overflow-x-auto pb-1 mb-2">
              {SIGN_CATEGORIES.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => { setActiveSignCategory(cat.key); setSelectedSignId(null); }}
                  className={`px-3 py-1 whitespace-nowrap rounded-lg text-xs font-medium border ${activeSignCategory===cat.key ? 'bg-emerald-600 text-white border-emerald-600' : (isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-700')}`}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            {/* Signs list */}
            <div className="grid grid-cols-2 gap-2">
              {currentSigns.map((s, idx) => (
                <SlideTransition key={s.id} direction="right" delay={200 + idx * 50}>
                  <button
                    onClick={() => setSelectedSignId(s.id)}
                    className={`rounded-xl border shadow-sm p-3 flex items-center gap-3 transition-colors min-h-[48px] ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-100' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-900'}`}
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <img src={s.img} alt={s.name} className="w-10 h-10 object-contain" />
                    </div>
                    <div className="text-left">
                      <div className={`font-bold text-sm ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{s.name}</div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Baxmaq üçün toxunun</div>
                    </div>
                  </button>
                </SlideTransition>
              ))}
            </div>

            {/* Sign detail */}
            {selectedSign && (
              <Card className="mt-2">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
                    <img src={selectedSign.img} alt={selectedSign.name} className="w-14 h-14 object-contain" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">{selectedSign.name}</div>
                    <div className="text-xs text-gray-600">{selectedSign.description}</div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}

        {activeSection === 'markings' && (
          <div>
            <div className="grid grid-cols-2 gap-2">
              {MARKINGS.map(m => (
                <Card key={m.id} className="p-3">
                  <div className="font-bold text-sm">{m.name}</div>
                  <div className="text-xs text-gray-600">{m.description}</div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'vertical' && (
          <div>
            <div className="grid grid-cols-2 gap-2">
              {VERTICAL_SIGNS.map(v => (
                <Card key={v.id} className="p-3">
                  <div className="font-bold text-sm">{v.name}</div>
                  <div className="text-xs text-gray-600">{v.description}</div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'rules' && (
          <div className="space-y-2">
            {AZ_RULES.map(r => (
              <Card key={r.id} onClick={() => setSelectedRuleId(r.id)}>
                <div className="font-bold text-sm">{r.title}</div>
                {selectedRule?.id === r.id && (
                  <div className="text-xs text-gray-600 mt-1">{r.content}</div>
                )}
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

