import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { FadeIn } from '../ui/FadeIn';
import { AppealForm } from './AppealForm';
import { AppealList } from './AppealList';
import type { Appeal } from '../../lib/types';

export function AppealsScreen() {
  const { t, isDarkMode, appeals } = useApp();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const statusCounts = {
    all: appeals.length,
    pending: appeals.filter(a => a.status === 'pending').length,
    under_review: appeals.filter(a => a.status === 'under_review').length,
    accepted: appeals.filter(a => a.status === 'accepted').length,
    rejected: appeals.filter(a => a.status === 'rejected').length,
    resolved: appeals.filter(a => a.status === 'resolved').length,
  };

  const filteredAppeals = selectedStatus === 'all' 
    ? appeals 
    : appeals.filter(appeal => appeal.status === selectedStatus);

  return (
    <FadeIn className="min-h-screen">
      <div className={`min-h-screen transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        {/* Header */}
        <div className={`sticky top-0 z-30 backdrop-blur-xl border-b transition-colors duration-200 ${
          isDarkMode 
            ? 'bg-gray-900/80 border-gray-700/50' 
            : 'bg-white/80 border-gray-200/50'
        }`}>
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t.appeals}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {t.appealFormDesc}
            </p>
          </div>
        </div>


        {/* Content */}
        <div className="px-6 pb-6">
          <div className="space-y-6">
            {/* Status Filter */}
            <Card variant="glass" padding="md">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {t.appealStatus}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(statusCounts).map(([status, count]) => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        selectedStatus === status
                          ? isDarkMode
                            ? 'bg-emerald-600 text-white shadow-lg'
                            : 'bg-emerald-500 text-white shadow-lg'
                          : isDarkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>
                          {status === 'all' ? 'Hamısı' : t.appealStatuses[status as keyof typeof t.appealStatuses]}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          selectedStatus === status
                            ? 'bg-white/20'
                            : isDarkMode
                              ? 'bg-gray-600'
                              : 'bg-gray-200'
                        }`}>
                          {count}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Appeals List */}
            <AppealList appeals={filteredAppeals} />
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
