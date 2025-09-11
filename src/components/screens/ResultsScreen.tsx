import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export function ResultsScreen() {
  const { t, navigate, currentScreen, isDarkMode } = useApp();
  const { result } = currentScreen.params;
  const passed = result.score >= Math.ceil(result.total * 0.8);

  return (
    <div className={`p-3 pb-24 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Centered title */}
      <div className="text-center mb-4">
        <h1 className={`text-xl font-extrabold transition-colors duration-200 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>Bütün nəticələr</h1>
      </div>

      <Card className="mb-3 text-center">
        <div className={`text-xs transition-colors duration-200 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>{t.yourScore}</div>
        <div className={`text-3xl font-black mt-1 transition-colors duration-200 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>
          {result.score}/{result.total}
        </div>
        <div className={`mt-2 font-bold ${passed ? 'text-emerald-600' : 'text-red-600'}`}>
          {passed ? t.pass : t.fail}
        </div>
      </Card>

      {/* Filter section */}
      <Card className="mb-3">
        <div className={`font-bold mb-3 transition-colors duration-200 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>Filter</div>
        <div className="space-y-3">
          <div>
            <label className={`block text-xs font-medium mb-1 transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Tarix aralığı</label>
            <select className={`w-full px-3 py-2 rounded-lg border text-sm transition-colors duration-200 ${
              isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'
            }`}>
              <option>Son 7 gün</option>
              <option>Son ay</option>
              <option>Son 3 ay</option>
              <option>Bütün vaxt</option>
            </select>
          </div>
          <div>
            <label className={`block text-xs font-medium mb-1 transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>İmtahan növü</label>
            <select className={`w-full px-3 py-2 rounded-lg border text-sm transition-colors duration-200 ${
              isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'
            }`}>
              <option>Hamısı</option>
              <option>Simulyator</option>
              <option>Yekun imtahan</option>
              <option>Sürətli test</option>
            </select>
          </div>
        </div>
      </Card>
      
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className={`font-bold mb-1 transition-colors duration-200 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>{t.weakTopics}</div>
            <div className={`text-sm transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Mövzu: M8 (nişanlar), M5 (dairəvi), M12 (təhlükəsizlik)
            </div>
          </div>
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => navigate('Mistakes')}
            className="ml-3 whitespace-nowrap"
          >
            Ətraflı
          </Button>
        </div>
        <div className="flex gap-2 mt-4">
          <Button onClick={() => navigate('Mistakes')}>
            {t.learnFromMistakes}
          </Button>
          <Button onClick={() => navigate('ExamConfig')} variant="ghost">
            Yenidən
          </Button>
        </div>
      </Card>
    </div>
  );
}