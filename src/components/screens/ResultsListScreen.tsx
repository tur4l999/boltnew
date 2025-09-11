import React, { useState, useMemo } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { ChevronRight, Calendar, Award, TrendingUp, Filter } from 'lucide-react';

interface ExamResult {
  id: string;
  date: Date;
  type: 'tickets' | 'topics' | 'simulator' | 'final';
  score: number;
  total: number;
  duration: number; // in minutes
  passed: boolean;
  topics?: string[];
}

// Mock data for demonstration
const mockResults: ExamResult[] = [
  {
    id: '1',
    date: new Date('2025-09-10'),
    type: 'simulator',
    score: 28,
    total: 30,
    duration: 25,
    passed: true,
    topics: ['M1', 'M3', 'M5']
  },
  {
    id: '2',
    date: new Date('2025-09-09'),
    type: 'tickets',
    score: 18,
    total: 20,
    duration: 15,
    passed: true,
    topics: ['Bilet 5', 'Bilet 6']
  },
  {
    id: '3',
    date: new Date('2025-09-08'),
    type: 'topics',
    score: 22,
    total: 30,
    duration: 20,
    passed: false,
    topics: ['M8 - Nişanlar', 'M5 - Dairəvi hərəkət']
  },
  {
    id: '4',
    date: new Date('2025-09-07'),
    type: 'final',
    score: 38,
    total: 40,
    duration: 35,
    passed: true
  },
  {
    id: '5',
    date: new Date('2025-09-05'),
    type: 'simulator',
    score: 20,
    total: 30,
    duration: 28,
    passed: false,
    topics: ['M2', 'M4', 'M7']
  }
];

export function ResultsListScreen() {
  const { t, navigate, isDarkMode } = useApp();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const examTypes = {
    all: t.allResults,
    tickets: t.ticketsExam,
    topics: t.topicsExam,
    simulator: t.simulatorExam,
    final: t.finalExam
  };

  const dateFilters = {
    all: t.allDates,
    today: t.today,
    week: t.thisWeek,
    month: t.thisMonth
  };

  const filteredResults = useMemo(() => {
    return mockResults.filter(result => {
      // Type filter
      if (selectedType !== 'all' && result.type !== selectedType) {
        return false;
      }

      // Date filter
      if (selectedDate !== 'all') {
        const today = new Date();
        const resultDate = new Date(result.date);
        
        switch (selectedDate) {
          case 'today':
            return resultDate.toDateString() === today.toDateString();
          case 'week':
            const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            return resultDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
            return resultDate >= monthAgo;
          default:
            return true;
        }
      }

      return true;
    });
  }, [selectedType, selectedDate]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'tickets':
        return isDarkMode ? 'text-blue-400' : 'text-blue-600';
      case 'topics':
        return isDarkMode ? 'text-purple-400' : 'text-purple-600';
      case 'simulator':
        return isDarkMode ? 'text-orange-400' : 'text-orange-600';
      case 'final':
        return isDarkMode ? 'text-red-400' : 'text-red-600';
      default:
        return isDarkMode ? 'text-gray-400' : 'text-gray-600';
    }
  };

  const getScorePercentage = (score: number, total: number) => {
    return Math.round((score / total) * 100);
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('az-AZ', options);
  };

  const handleResultClick = (result: ExamResult) => {
    navigate('Results', { result });
  };

  return (
    <div className={`min-h-screen pb-24 transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Summary Cards */}
      <div className="p-3 grid grid-cols-2 gap-3 mb-3">
        <Card className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <Award className={`w-4 h-4 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {t.totalScore}
            </span>
          </div>
          <div className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            75%
          </div>
        </Card>
        
        <Card className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {t.thisWeek}
            </span>
          </div>
          <div className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            8 imtahan
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="px-3 mb-3">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
            isDarkMode 
              ? 'bg-gray-800 hover:bg-gray-700 text-gray-100' 
              : 'bg-white hover:bg-gray-50 text-gray-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span className="font-medium">{t.filters}</span>
          </div>
          <ChevronRight className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-90' : ''}`} />
        </button>

        {showFilters && (
          <div className={`mt-3 p-3 rounded-lg space-y-3 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            {/* Date Filter */}
            <div>
              <label className={`block text-xs font-medium mb-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {t.date}
              </label>
              <div className="flex gap-2 flex-wrap">
                {Object.entries(dateFilters).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedDate(key)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedDate === key
                        ? isDarkMode
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-600 text-white'
                        : isDarkMode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <label className={`block text-xs font-medium mb-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {t.examType}
              </label>
              <div className="flex gap-2 flex-wrap">
                {Object.entries(examTypes).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedType(key)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedType === key
                        ? isDarkMode
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-600 text-white'
                        : isDarkMode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
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
      </div>

      {/* Results List */}
      <div className="px-3 space-y-3">
        {filteredResults.length > 0 ? (
          filteredResults.map((result) => (
            <Card
              key={result.id}
              className="p-4 cursor-pointer hover:shadow-lg transition-all"
              onClick={() => handleResultClick(result)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className={`font-bold text-lg mb-1 ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    {examTypes[result.type]}
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Calendar className="w-3 h-3" />
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                      {formatDate(result.date)}
                    </span>
                    <span className={isDarkMode ? 'text-gray-600' : 'text-gray-300'}>•</span>
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                      {result.duration} {t.minutes}
                    </span>
                  </div>
                </div>
                <ChevronRight className={`w-5 h-5 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className={`text-2xl font-bold ${
                    result.passed
                      ? isDarkMode ? 'text-green-400' : 'text-green-600'
                      : isDarkMode ? 'text-red-400' : 'text-red-600'
                  }`}>
                    {result.score}/{result.total}
                  </span>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    ({getScorePercentage(result.score, result.total)}%)
                  </span>
                </div>
                <div className={`text-sm font-medium px-3 py-1 rounded-full ${
                  result.passed
                    ? isDarkMode 
                      ? 'bg-green-900/30 text-green-400' 
                      : 'bg-green-100 text-green-700'
                    : isDarkMode
                      ? 'bg-red-900/30 text-red-400'
                      : 'bg-red-100 text-red-700'
                }`}>
                  {result.passed ? t.passed : t.failed}
                </div>
              </div>

              {result.topics && result.topics.length > 0 && (
                <div className={`mt-3 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <span className="font-medium">{t.topics}:</span> {result.topics.join(', ')}
                </div>
              )}

              {/* Progress Bar */}
              <div className={`mt-3 h-2 rounded-full overflow-hidden ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                <div
                  className={`h-full transition-all ${
                    result.passed
                      ? isDarkMode ? 'bg-green-500' : 'bg-green-600'
                      : isDarkMode ? 'bg-red-500' : 'bg-red-600'
                  }`}
                  style={{ width: `${getScorePercentage(result.score, result.total)}%` }}
                />
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-8 text-center">
            <div className={`text-gray-400 ${isDarkMode ? 'text-gray-500' : ''}`}>
              {t.noResults}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}