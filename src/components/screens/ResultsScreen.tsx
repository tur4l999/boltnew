import React, { useState, useMemo } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
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
    return new Intl.DateTimeFormat('az-AZ', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
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
      case 'tickets': return '📄';
      case 'topics': return '📚';
      case 'simulator': return '🧪';
      case 'final': return '📋';
      default: return '📝';
    }
  };

  return (
    <div className={`p-4 pb-24 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Statistics Header */}
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Overall Pass Percentage */}
          <Card className="p-4 text-center">
            <div className={`text-xs mb-1 transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Ümumi keçmə faizi
            </div>
            <div className={`text-3xl font-black transition-colors duration-200 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              {statistics.overallPassPercentage}%
            </div>
          </Card>

          {/* This Week Exam Count */}
          <Card className="p-4 text-center">
            <div className={`text-xs mb-1 transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Bu həftə
            </div>
            <div className={`text-3xl font-black transition-colors duration-200 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              {statistics.thisWeekExamCount} imtahan
            </div>
          </Card>
        </div>
      </div>

      {/* Filter Button */}
      <div className="mb-4">
        <button
          onClick={() => setFiltersVisible(!filtersVisible)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-colors duration-200 ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700 text-gray-100 hover:bg-gray-700'
              : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50'
          }`}
        >
          <span className="font-medium">Filterlər</span>
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${filtersVisible ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Collapsible Filters */}
      {filtersVisible && (
        <div className="mb-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          {/* Exam Type Filter */}
          <div>
            <div className={`text-sm font-medium mb-3 transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              İmtahan növü
            </div>
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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedType === key
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : isDarkMode
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Date Filter */}
          <div>
            <div className={`text-sm font-medium mb-3 transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Tarix
            </div>
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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedDateFilter === key
                      ? 'bg-emerald-600 text-white shadow-lg scale-105'
                      : isDarkMode
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results List */}
      {filteredResults.length === 0 ? (
        <Card className="text-center py-8">
          <div className={`text-4xl mb-3`}>📊</div>
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
            const progressColor = result.passed ? 'emerald' : 'red';
            
            return (
              <Card key={result.id} className="p-0 overflow-hidden">
                {/* Header with exam type and status */}
                <div className="flex items-center justify-between p-4 pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      {getTypeIcon(result.type)}
                    </div>
                    <div>
                      <div className={`font-semibold text-base transition-colors duration-200 ${
                        isDarkMode ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        {getTypeLabel(result.type)}
                      </div>
                      <div className={`text-sm transition-colors duration-200 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {new Intl.DateTimeFormat('az-AZ', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        }).format(new Date(result.date))}
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1.5 rounded-full text-sm font-bold ${
                    result.passed
                      ? 'bg-emerald-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}>
                    {result.passed ? 'Keçdi' : 'Keçmədi'}
                  </div>
                </div>

                {/* Score and Progress */}
                <div className="px-4 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`text-2xl font-bold transition-colors duration-200 ${
                      result.passed ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {result.score}/{result.total}
                    </div>
                    <div className={`text-xl font-bold transition-colors duration-200 ${
                      result.passed ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {percentage}%
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className={`w-full h-2 rounded-full mb-3 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        result.passed ? 'bg-emerald-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  {/* Additional Info */}
                  <div className="flex items-center justify-between text-sm">
                    <div className={`transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Təlim mövzuları: {result.weakTopics.length > 0 ? result.weakTopics.join(', ') : 'Yoxdur'}
                    </div>
                    <div className={`transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {formatTime(result.timeSpent)}
                    </div>
                  </div>
                  
                  {/* Details */}
                  {result.details?.ticketNumber && (
                    <div className={`text-xs mt-2 transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Bilet #{result.details.ticketNumber}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}