/** @jsxImportSource react */
import React, { useMemo, useState, useCallback } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { EmojiIcon } from '../ui/EmojiIcon';
import { SlideTransition } from '../ui/SlideTransition';

// Sample traffic signs data for Azerbaijan
const AZ_SIGNS = [
  {
    id: '1',
    category: 'Qadağan edən',
    title: 'Dayanmaq qadağandır',
    description: 'Bu ərazidə nəqliyyat vasitəsini dayanmaq qadağandır.',
    emoji: '🚫'
  },
  {
    id: '2',
    category: 'Xəbərdarlıq',
    title: 'Təhlükəli döngə',
    description: 'İrəlidə təhlükəli döngə var, sürəti azaldın.',
    emoji: '⚠️'
  },
  {
    id: '3',
    category: 'Göstərici',
    title: 'Piyada keçidi',
    description: 'Piyada keçidi ərazisi, sürücülər diqqətli olmalıdır.',
    emoji: '🚶'
  },
  {
    id: '4',
    category: 'Məcburi',
    title: 'Sağa dönmək məcburidir',
    description: 'Bu nişandan sonra yalnız sağa dönmək icazəlidir.',
    emoji: '➡️'
  },
];

export function SignsScreen() {
  const { isDarkMode, goBack, switchTab } = useApp();
  const [selectedSignId, setSelectedSignId] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const selectedSign = useMemo(() => AZ_SIGNS.find(s => s.id === selectedSignId) || null, [selectedSignId]);

  const norm = useCallback((s: string) => s.toLowerCase().trim(), []);
  const q = norm(query);
  const filteredSigns = useMemo(
    () => (q ? AZ_SIGNS.filter(s => 
      norm(s.title).includes(q) || 
      norm(s.description).includes(q) || 
      norm(s.category).includes(q)
    ) : AZ_SIGNS),
    [q, norm]
  );

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
                  placeholder="Yol nişanları axtarın..."
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
        {/* Signs Section */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className={`text-lg font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Yol Nişanları
            </h2>
          </div>

          <div className="space-y-2">
            {filteredSigns.map((sign, index) => (
              <SlideTransition key={sign.id} direction="up" delay={index * 30}>
                <Card 
                  variant="glass"
                  padding="md"
                  onClick={() => setSelectedSignId(prev => prev === sign.id ? null : sign.id)}
                  className={`group border-0 ${
                    isDarkMode 
                      ? 'bg-gray-800/50 hover:bg-gray-700/60' 
                      : 'bg-white/70 hover:bg-gray-50/80'
                  } transition-all duration-300 hover:shadow-lg ${
                    selectedSign?.id === sign.id ? 'shadow-lg' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex-shrink-0 text-3xl">
                        {sign.emoji}
                      </div>
                      <div className="flex-1">
                        <div className={`text-xs mb-1 ${
                          isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                        }`}>
                          {sign.category}
                        </div>
                        <h4 className={`font-semibold text-sm transition-colors duration-300 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {sign.title}
                        </h4>
                      </div>
                    </div>
                    <div className={`flex-shrink-0 transition-all duration-300 ${
                      selectedSign?.id === sign.id 
                        ? 'rotate-90 text-emerald-500' 
                        : 'group-hover:translate-x-1'
                    } ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <EmojiIcon emoji={selectedSign?.id === sign.id ? '▾' : '▸'} size={14} />
                    </div>
                  </div>
                  
                  {selectedSign?.id === sign.id && (
                    <div className={`mt-4 pt-4 border-t transition-all duration-500 ${
                      isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
                    }`}>
                      <div className={`text-sm leading-relaxed transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {sign.description}
                      </div>
                    </div>
                  )}
                </Card>
              </SlideTransition>
            ))}
            
            {filteredSigns.length === 0 && (
              <div className="text-center py-8">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'
                }`}>
                  <EmojiIcon emoji="🔍" size={20} />
                </div>
                <div className={`text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Heç nə tapılmadı
                </div>
                <div className={`text-xs ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  Axtarış şərtlərini dəyişin
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
