import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { FadeIn } from '../ui/FadeIn';
import { QuestionViewModal } from './QuestionViewModal';
import type { Appeal } from '../../lib/types';

interface AppealListProps {
  appeals: Appeal[];
}

export function AppealList({ appeals }: AppealListProps) {
  const { t, isDarkMode } = useApp();
  const [selectedAppeal, setSelectedAppeal] = useState<Appeal | null>(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return isDarkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-800';
      case 'under_review':
        return isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-800';
      case 'accepted':
        return isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-800';
      case 'rejected':
        return isDarkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-800';
      case 'resolved':
        return isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-800';
      default:
        return isDarkMode ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'under_review':
        return '🔍';
      case 'accepted':
        return '✅';
      case 'rejected':
        return '❌';
      case 'resolved':
        return '✅';
      default:
        return '📋';
    }
  };

  const getSourceLabel = (source: string, sourceId?: string) => {
    switch (source) {
      case 'ticket':
        return `${t.fromTicket} ${sourceId ? `#${sourceId}` : ''}`;
      case 'topic':
        return `${t.fromTopic} ${sourceId || ''}`;
      case 'simulator':
        return t.fromSimulator;
      default:
        return source;
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'ticket':
        return '🎫';
      case 'topic':
        return '📚';
      case 'simulator':
        return '🎮';
      default:
        return '❓';
    }
  };

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}.${month}.${year}`;
  };

  if (appeals.length === 0) {
    return (
      <FadeIn>
        <Card variant="glass" padding="lg" className="text-center">
          <div className="py-8">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t.noAppeals}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t.noAppealsDesc}
            </p>
          </div>
        </Card>
      </FadeIn>
    );
  }

  return (
    <div className="space-y-4">
      {appeals.map((appeal) => (
        <FadeIn key={appeal.id}>
          <Card 
            variant="elevated" 
            padding="md" 
            onClick={() => setSelectedAppeal(appeal)}
            className="cursor-pointer"
          >
            <div className="space-y-4">
              {/* Header with Source and Status */}
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm">{getSourceIcon(appeal.questionSource)}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {getSourceLabel(appeal.questionSource, appeal.questionSourceId)}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-2">
                    {appeal.questionText}
                  </h4>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ml-3 ${getStatusColor(appeal.status)}`}>
                  <span>{getStatusIcon(appeal.status)}</span>
                  <span>{t.appealStatuses[appeal.status as keyof typeof t.appealStatuses]}</span>
                </div>
              </div>

              {/* Question with Appeal Text */}
              <div className={`p-4 rounded-xl ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedAppeal(appeal);
                      setShowQuestionModal(true);
                    }}
                    className="text-xs"
                  >
                    {t.viewQuestion}
                  </Button>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Ünvanladığınız sual:
                  </span>
                </div>
                <p className="text-sm text-gray-800 dark:text-gray-200 mb-3">
                  {appeal.userComment}
                </p>
                {appeal.questionImageUrl && (
                  <div className="relative">
                    <img
                      src={appeal.questionImageUrl}
                      alt={t.questionImage}
                      className="w-full h-24 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute top-1 right-1 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                      {t.questionHasImage}
                    </div>
                  </div>
                )}
              </div>

              {/* Teacher Response Preview */}
              {appeal.adminResponse && (
                <div className={`p-3 rounded-xl ${
                  isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {t.teacherResponse}
                    </span>
                    {appeal.adminName && (
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        • {appeal.adminName}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                    {appeal.adminResponse}
                  </p>
                </div>
              )}

              {/* Footer with Dates */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <div>{t.submitDate}: {formatDate(appeal.submittedDate)}</div>
                  {appeal.reviewedDate && (
                    <div>{t.answerDate}: {formatDate(appeal.reviewedDate)}</div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedAppeal(appeal);
                  }}
                >
                  Detallar
                </Button>
              </div>
            </div>
          </Card>
        </FadeIn>
      ))}

      {/* Appeal Details Modal */}
      {selectedAppeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setSelectedAppeal(null)}
          />
          <FadeIn>
            <div className={`relative w-full max-w-3xl max-h-[95vh] overflow-hidden rounded-3xl shadow-2xl ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              {/* Header with Gradient */}
              <div className={`relative p-6 pb-4 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-gray-800 to-gray-700' 
                  : 'bg-gradient-to-r from-gray-50 to-gray-100'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${
                      isDarkMode ? 'bg-gray-700' : 'bg-white shadow-lg'
                    }`}>
                      {getSourceIcon(selectedAppeal.questionSource)}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {t.appealDetails}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {getSourceLabel(selectedAppeal.questionSource, selectedAppeal.questionSourceId)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedAppeal(null)}
                    className="w-10 h-10 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    ✕
                  </Button>
                </div>
              </div>

              {/* Content with Scroll */}
              <div className="overflow-y-auto max-h-[calc(95vh-120px)] p-6 space-y-6">
                {/* Status Card */}
                <div className={`p-4 rounded-2xl border-2 ${
                  selectedAppeal.status === 'accepted'
                    ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                    : selectedAppeal.status === 'rejected'
                    ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                    : selectedAppeal.status === 'under_review'
                    ? 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20'
                    : 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                        selectedAppeal.status === 'accepted'
                          ? 'bg-green-500 text-white'
                          : selectedAppeal.status === 'rejected'
                          ? 'bg-red-500 text-white'
                          : selectedAppeal.status === 'under_review'
                          ? 'bg-blue-500 text-white'
                          : 'bg-yellow-500 text-white'
                      }`}>
                        {getStatusIcon(selectedAppeal.status)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {t.appealStatuses[selectedAppeal.status as keyof typeof t.appealStatuses]}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {t.submitDate}: {formatDate(selectedAppeal.submittedDate)}
                        </p>
                      </div>
                    </div>
                    {selectedAppeal.reviewedDate && (
                      <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {t.answerDate}
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {formatDate(selectedAppeal.reviewedDate)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Question Card */}
                <div className={`p-6 rounded-2xl border-2 ${
                  isDarkMode 
                    ? 'border-gray-700 bg-gray-800/50' 
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Ünvanladığınız sual
                    </h3>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setShowQuestionModal(true)}
                      className="flex items-center gap-2"
                    >
                      <span>👁️</span>
                      {t.viewQuestion}
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {selectedAppeal.userComment}
                    </p>
                    {selectedAppeal.questionImageUrl && (
                      <div className="relative group">
                        <img
                          src={selectedAppeal.questionImageUrl}
                          alt={t.questionImage}
                          className="w-full max-h-48 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                          {t.questionHasImage}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Admin Response Card */}
                {selectedAppeal.adminResponse && (
                  <div className={`p-6 rounded-2xl border-2 ${
                    isDarkMode 
                      ? 'border-blue-700 bg-blue-900/20' 
                      : 'border-blue-200 bg-blue-50'
                  }`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                        isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
                      } text-white`}>
                        👨‍🏫
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {t.teacherResponse}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {selectedAppeal.adminName || 'Admin'} • {selectedAppeal.reviewedDate ? formatDate(selectedAppeal.reviewedDate) : ''}
                        </p>
                      </div>
                    </div>
                    <div className={`p-4 rounded-xl ${
                      isDarkMode ? 'bg-gray-800/50' : 'bg-white/80'
                    }`}>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {selectedAppeal.adminResponse}
                      </p>
                    </div>
                  </div>
                )}

              </div>

              {/* Footer */}
              <div className={`p-6 pt-4 border-t ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <div className="flex justify-end">
                  <Button
                    variant="secondary"
                    onClick={() => setSelectedAppeal(null)}
                    className="px-6"
                  >
                    {t.backToAppeals}
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      )}

      {/* Question View Modal */}
      {selectedAppeal && (
        <QuestionViewModal
          isOpen={showQuestionModal}
          onClose={() => setShowQuestionModal(false)}
          appeal={selectedAppeal}
        />
      )}
    </div>
  );
}