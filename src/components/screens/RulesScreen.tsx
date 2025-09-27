/** @jsxImportSource react */
import React, { useMemo, useState, useCallback } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { EmojiIcon } from '../ui/EmojiIcon';
import { SlideTransition } from '../ui/SlideTransition';
import { AZ_RULES } from '../../lib/rules';

export function RulesScreen() {
  const { isDarkMode, goBack, switchTab } = useApp();
  const [selectedRuleId, setSelectedRuleId] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const selectedRule = useMemo(() => AZ_RULES.find(r => r.id === selectedRuleId) || null, [selectedRuleId]);

  const norm = useCallback((s: string) => s.toLowerCase().trim(), []);
  const q = norm(query);
  const filteredRules = useMemo(
    () => (q ? AZ_RULES.filter(r => norm(r.title).includes(q) || norm(r.content).includes(q)) : AZ_RULES),
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
                  placeholder="Qaydalar axtarın..."
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
        {/* Compact Hero Section */}
        <div className="text-center space-y-2 mb-6">
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br transition-all duration-300 ${
            isDarkMode 
              ? 'from-emerald-500/20 to-green-600/20' 
              : 'from-emerald-500/10 to-green-600/10'
          }`}>
            <EmojiIcon emoji="📚" size={20} />
          </div>
          <div>
            <h1 className={`text-xl font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Yol hərəkəti qaydaları
            </h1>
            <p className={`text-sm mt-1 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Azərbaycan qaydaları
            </p>
          </div>
        </div>

        {/* Rules Section */}
        <div className="space-y-4">
          <div>
            <h2 className={`text-lg font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Maddələr
            </h2>
          </div>

          <div className="space-y-2">
            {filteredRules.map((r, index) => (
              <SlideTransition key={r.id} direction="up" delay={index * 30}>
                <Card 
                  variant="glass"
                  padding="md"
                  onClick={() => setSelectedRuleId(prev => prev === r.id ? null : r.id)}
                  className={`group border-0 ${
                    isDarkMode 
                      ? 'bg-gray-800/50 hover:bg-gray-700/60' 
                      : 'bg-white/70 hover:bg-gray-50/80'
                  } transition-all duration-300 hover:shadow-lg ${
                    selectedRule?.id === r.id ? 'shadow-lg' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                        isDarkMode 
                          ? 'bg-emerald-500/20 text-emerald-400' 
                          : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {index + 1}
                      </div>
                      <h4 className={`font-semibold text-sm transition-colors duration-300 ${
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
                      <EmojiIcon emoji={selectedRule?.id === r.id ? '▾' : '▸'} size={14} />
                    </div>
                  </div>
                  
                  {selectedRule?.id === r.id && (
                    <div className={`mt-4 pt-4 border-t transition-all duration-500 ${
                      isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
                    }`}>
                      <div className={`text-sm leading-relaxed transition-colors duration-300 ${
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