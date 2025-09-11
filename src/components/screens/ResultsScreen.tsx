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
    <div className={`p-3 pb-24 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className={`mb-4 transition-colors duration-200 ${
        isDarkMode ? 'text-gray-100' : 'text-gray-900'
      }`}>
        <h1 className="text-xl font-bold">{t.allResults}</h1>
      </div>

      {/* Filters */}
      <div className="mb-4 space-y-3">
        {/* Type Filter */}
        <Card className="p-3">
          <div className={`text-sm font-medium mb-2 transition-colors duration-200 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {t.filterByType}
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: t.examTypes.all },
              { key: 'tickets', label: t.examTypes.tickets },
              { key: 'topics', label: t.examTypes.topics },
              { key: 'simulator', label: t.examTypes.simulator },
              { key: 'final', label: t.examTypes.final },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSelectedType(key as ExamType | 'all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200 ${
                  selectedType === key
                    ? 'bg-emerald-600 text-white'
                    : isDarkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </Card>

        {/* Date Filter */}
        <Card className="p-3">
          <div className={`text-sm font-medium mb-2 transition-colors duration-200 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {t.filterByDate}
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: t.dateFilters.all },
              { key: 'today', label: t.dateFilters.today },
              { key: 'thisWeek', label: t.dateFilters.thisWeek },
              { key: 'thisMonth', label: t.dateFilters.thisMonth },
              { key: 'lastMonth', label: t.dateFilters.lastMonth },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSelectedDateFilter(key as DateFilter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200 ${
                  selectedDateFilter === key
                    ? 'bg-blue-600 text-white'
                    : isDarkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </Card>
      </div>

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
        <div className="space-y-3">
          {filteredResults.map((result) => (
            <Card key={result.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getTypeIcon(result.type)}</span>
                  <div>
                    <div className={`font-medium transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {getTypeLabel(result.type)}
                    </div>
                    <div className={`text-xs transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {formatDate(result.date)}
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                  result.passed
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {result.passed ? t.pass : t.fail}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-3">
                <div className="text-center">
                  <div className={`text-2xl font-bold transition-colors duration-200 ${
                    result.passed ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {result.score}/{result.total}
                  </div>
                  <div className={`text-xs transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {t.score}
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-medium transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {formatTime(result.timeSpent)}
                  </div>
                  <div className={`text-xs transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {t.timeSpent}
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-medium transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {Math.round((result.score / result.total) * 100)}%
                  </div>
                  <div className={`text-xs transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Faiz
                  </div>
                </div>
              </div>

              {result.weakTopics.length > 0 && (
                <div className={`text-sm transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <span className="font-medium">{t.weakTopics}:</span> {result.weakTopics.join(', ')}
                </div>
              )}

              {result.details?.ticketNumber && (
                <div className={`text-xs mt-2 transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Bilet #{result.details.ticketNumber}
                </div>
              )}

              {result.details?.moduleId && (
                <div className={`text-xs mt-2 transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Mövzu: {result.details.moduleId}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}