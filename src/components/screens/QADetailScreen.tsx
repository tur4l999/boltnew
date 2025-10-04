/** @jsxImportSource react */
import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { EmojiIcon } from '../ui/EmojiIcon';

export function QADetailScreen() {
  const { isDarkMode, goBack } = useApp();

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      {/* Header */}
      <div className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gray-900/80 border-gray-700/50' 
          : 'bg-white/80 border-gray-200/50'
      }`}>
        <div className="px-4 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => goBack()}
              className={`group relative flex items-center justify-center w-12 h-12 rounded-2xl border transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-700/50 text-gray-200' 
                  : 'bg-white/70 border-gray-200/50 hover:bg-gray-50 text-gray-700'
              } hover:scale-105 hover:shadow-lg backdrop-blur-sm`}
            >
              <EmojiIcon emoji="←" size={20} />
            </button>
            <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Sual Detalları
            </h1>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <Card variant="glass" padding="lg">
          <div className="text-center">
            <EmojiIcon emoji="💬" size={48} className="mx-auto mb-4" />
            <h2 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Sual Detalları
            </h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Bu bölmə hazırlanır
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
