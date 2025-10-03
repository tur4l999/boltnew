import React, { useState, useMemo } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { EmojiIcon } from '../ui/EmojiIcon';
import type { ExamType, StoredExamResult } from '../../lib/types';

type DateFilter = 'all' | 'today' | 'thisWeek' | 'thisMonth' | 'lastMonth';

export function ResultsScreen() {
  const { t, navigate, currentScreen, isDarkMode, examResults } = useApp();
  const { result } = currentScreen.params;
  
  // State for filters
  const [selectedType, setSelectedType] = useState<ExamType | 'all'>('all');
  const [selectedDateFilter, setSelectedDateFilter] = useState<DateFilter>('all');
  const [filtersVisible, setFiltersVisible] = useState(false);

  // If this is a single result view (coming from exam completion)
  if (result) {
    const passed = result.score >= Math.ceil(result.total * 0.8);
    return (
      <div className={`p-3 pb-24 min-h-screen transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
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
        
        <Card>
          <div className={`font-bold mb-2 transition-colors duration-200 ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>{t.weakTopics}</div>
          <div className={`text-sm mb-3 transition-colors duration-200 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {result.weakTopics?.join(', ') || 'Yoxdur'}
          </div>
          <div className="flex gap-2">
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

  // Calculate statistics
  const statistics = useMemo(() => {
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    
    const thisWeekResults = examResults.filter(result => 
      new Date(result.date) >= weekStart
    );
    
    const totalPassed = examResults.filter(result => result.passed).length;
    const overallPassPercentage = examResults.length > 0 
      ? Math.round((totalPassed / examResults.length) * 100) 
      : 0;
    
    return {
      overallPassPercentage,
      thisWeekExamCount: thisWeekResults.length
    };
  }, [examResults]);

  // Filter results based on selected filters
  const filteredResults = useMemo(() => {
    let filtered = examResults;

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(result => result.type === selectedType);
    }

    // Filter by date
    if (selectedDateFilter !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      filtered = filtered.filter(result => {
        const resultDate = new Date(result.date);
        
        switch (selectedDateFilter) {
          case 'today':
            return resultDate >= today;
          case 'thisWeek':
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - today.getDay());
            return resultDate >= weekStart;
          case 'thisMonth':
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            return resultDate >= monthStart;
          case 'lastMonth':
            const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
            return resultDate >= lastMonthStart && resultDate <= lastMonthEnd;
          default:
            return true;
        }
      });
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [examResults, selectedType, selectedDateFilter]);

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}.${month}.${year}`;
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTypeLabel = (type: ExamType) => {
    switch (type) {
      case 'tickets': return t.examTypes.tickets;
      case 'topics': return t.examTypes.topics;
      case 'simulator': return t.examTypes.simulator;
      case 'final': return t.examTypes.final;
      default: return type;
    }
  };

  const getTypeIcon = (type: ExamType) => {
    switch (type) {
      case 'tickets': return <EmojiIcon emoji="📄" size={16} />;
      case 'topics': return <EmojiIcon emoji="📚" size={16} />;
      case 'simulator': return <EmojiIcon emoji="🧪" size={16} />;
      case 'final': return <EmojiIcon emoji="📋" size={16} />;
      default: return <EmojiIcon emoji="📝" size={16} />;
    }
  };

  return (
    <div className={`px-4 pt-6 pb-24 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Page Title */}
      <div className="mb-6">
        <h1 className={`text-2xl font-bold mb-2 transition-colors duration-200 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>
          Nəticələrim
        </h1>
        <p className={`text-sm transition-colors duration-200 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          İmtahan nəticələrinizi və statistikanızı izləyin
        </p>
      </div>

      {/* Statistics Header */}
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Overall Pass Percentage */}
          <div className={`rounded-3xl p-5 text-center shadow-lg transition-all duration-200 hover:shadow-xl ${
            isDarkMode 
              ? 'bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600' 
              : 'bg-gradient-to-br from-white to-gray-50 border border-gray-100'
          }`}>
            <div className={`text-sm font-semibold mb-2 transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Ümumi keçmə faizi
            </div>
            <div className={`text-3xl font-black transition-colors duration-200 ${
              statistics.overallPassPercentage >= 80 
                ? 'text-emerald-600' 
                : statistics.overallPassPercentage >= 60 
                  ? 'text-yellow-600' 
                  : 'text-red-600'
            }`}>
              {statistics.overallPassPercentage}%
            </div>
          </div>

          {/* This Week Exam Count */}
          <div className={`rounded-3xl p-5 text-center shadow-lg transition-all duration-200 hover:shadow-xl ${
            isDarkMode 
              ? 'bg-gradient-to-br from-blue-900 to-blue-800 border border-blue-700' 
              : 'bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200'
          }`}>
            <div className={`text-sm font-semibold mb-2 transition-colors duration-200 ${
              isDarkMode ? 'text-blue-300' : 'text-blue-700'
            }`}>
              Bu həftə
            </div>
            <div className={`text-3xl font-black transition-colors duration-200 ${
              isDarkMode ? 'text-blue-200' : 'text-blue-800'
            }`}>
              {statistics.thisWeekExamCount}
            </div>
            <div className={`text-xs font-medium mt-1 transition-colors duration-200 ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>
              imtahan
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="mb-6">
        <button
          onClick={() => setFiltersVisible(!filtersVisible)}
          className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl shadow-md transition-all duration-200 hover:shadow-lg ${
            isDarkMode
              ? 'bg-gray-800 text-gray-100 hover:bg-gray-700 border border-gray-700'
              : 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <span className="font-semibold">Filterlər</span>
          </div>
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${filtersVisible ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Collapsible Filters */}
        {filtersVisible && (
          <div className={`mt-4 p-5 rounded-2xl space-y-4 shadow-inner transition-all duration-300 ${
            isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
          }`}>
            {/* Date Filter */}
            <div>
              <h3 className={`text-sm font-semibold mb-3 transition-colors duration-200 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                Tarix
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'all', label: 'Bütün tarixlər' },
                  { key: 'today', label: 'Bu gün' },
                  { key: 'thisWeek', label: 'Bu həftə' },
                  { key: 'thisMonth', label: 'Bu ay' },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setSelectedDateFilter(key as DateFilter)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                      selectedDateFilter === key
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                        : isDarkMode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Exam Type Categories */}
            <div>
              <h3 className={`text-sm font-semibold mb-3 transition-colors duration-200 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                İmtahan növü
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'all', label: 'Hamısı' },
                  { key: 'tickets', label: 'Biletlər üzrə' },
                  { key: 'topics', label: 'Mövzular üzrə' },
                  { key: 'simulator', label: 'Simulyator İmtahanı' },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setSelectedType(key as ExamType | 'all')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                      selectedType === key
                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg'
                        : isDarkMode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results List */}
      {filteredResults.length === 0 ? (
        <Card className="text-center py-8">
          <div className={`text-4xl mb-3`}><EmojiIcon emoji="📊" size={32} /></div>
          <div className={`font-medium mb-2 transition-colors duration-200 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {t.noResults}
          </div>
          <div className={`text-sm mb-4 transition-colors duration-200 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {t.tryTakingExam}
          </div>
          <Button onClick={() => navigate('ExamConfig')}>
            {t.goToExam}
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredResults.map((result) => {
            const percentage = Math.round((result.score / result.total) * 100);
            const examDate = new Date(result.date);
            
            return (
              <button 
                key={result.id} 
                onClick={() => navigate('ResultDetail', { result })}
                className={`w-full text-left rounded-3xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600' 
                    : 'bg-gradient-to-br from-white to-gray-50 border border-gray-100'
                }`}>
                {/* Header with Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-md ${
                      result.passed 
                        ? isDarkMode ? 'bg-emerald-900/50 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                        : isDarkMode ? 'bg-red-900/50 text-red-400' : 'bg-red-100 text-red-700'
                    }`}>
                      {getTypeIcon(result.type)}
                    </div>
                    <div>
                      {/* Main Info - Ticket/Topic Number */}
                      <h3 className={`font-bold text-lg transition-colors duration-200 ${
                        isDarkMode ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        {result.type === 'simulator' 
                          ? getTypeLabel(result.type)
                          : result.details?.ticketNumber 
                            ? `Bilet ${result.details.ticketNumber}`
                            : result.details?.moduleId 
                              ? `${result.details.moduleId} mövzu`
                              : getTypeLabel(result.type)
                        }
                      </h3>
                      <div className={`text-sm font-medium transition-colors duration-200 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {examDate.toLocaleDateString('az-AZ', {
                          day: '2-digit',
                          month: '2-digit',
                          year: '2-digit'
                        }).replace(/\//g, '.')} • {Math.floor(result.timeSpent / 60)} dəqiqə
                      </div>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-2xl text-sm font-bold shadow-md ${
                    result.passed
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white'
                      : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                  }`}>
                    {result.passed ? 'Keçdi' : 'Keçmədi'}
                  </div>
                </div>

                {/* Score Display */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-3xl font-black transition-colors duration-200 ${
                      result.passed ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {result.score}
                    </span>
                    <span className={`text-lg font-medium transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      /{result.total}
                    </span>
                  </div>
                  <div className={`text-2xl font-bold transition-colors duration-200 ${
                    result.passed ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {percentage}%
                  </div>
                </div>

                {/* Progress Bar */}
                <div className={`w-full h-3 rounded-full mb-4 shadow-inner ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  <div
                    className={`h-3 rounded-full transition-all duration-700 ease-out shadow-sm ${
                      result.passed 
                        ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' 
                        : 'bg-gradient-to-r from-red-400 to-red-600'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                {/* Additional Info */}
                <div className="flex items-center justify-between">
                  <div className={`text-sm font-medium transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {result.weakTopics.length > 0 
                      ? `Təlim mövzuları: ${result.weakTopics.join(', ')}`
                      : 'Təlim mövzuları: Yoxdur'
                    }
                  </div>
                  {result.type !== 'simulator' && (
                    <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {getTypeLabel(result.type)}
                    </div>
                  )}
                </div>

                {/* Click indicator */}
                <div className="flex items-center justify-center mt-4 pt-4 border-t border-gray-600/30">
                  <div className={`text-sm font-medium flex items-center gap-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <span>Detallara bax</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}