/** @jsxImportSource react */
import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { EmojiIcon } from '../ui/EmojiIcon';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export function QAFormScreen() {
  const { isDarkMode, goBack } = useApp();
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Question submitted:', question);
    goBack();
  };

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
              Yeni Sual
            </h1>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <Card variant="glass" padding="lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Sualınız
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Sualınızı yazın..."
                rows={6}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800/50 border-gray-700/50 text-gray-100 placeholder:text-gray-500' 
                    : 'bg-white/70 border-gray-200/50 text-gray-900 placeholder:text-gray-500'
                } focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20`}
                required
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              disabled={!question.trim()}
              className="w-full"
            >
              Göndər
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
