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
    return new Intl.DateTimeFormat('az-AZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
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
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      • ID: {appeal.questionId}
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

              {/* Question Preview with View Button */}
              <div className={`p-4 rounded-xl ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Ünvanladığınız sual:
                  </span>
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
                </div>
                <p className="text-sm text-gray-800 dark:text-gray-200 mb-3 line-clamp-2">
                  {appeal.questionText}
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

              {/* Your Appeal */}
              <div>
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.yourAppeal}:
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {appeal.userComment}
                </p>
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
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedAppeal(null)}
          />
          <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t.appealDetails}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedAppeal(null)}
                >
                  ✕
                </Button>
              </div>

              {/* Content */}
              <div className="space-y-6">
                {/* Question Source */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {t.questionSource}
                  </h3>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <span className="text-lg">{getSourceIcon(selectedAppeal.questionSource)}</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {getSourceLabel(selectedAppeal.questionSource, selectedAppeal.questionSourceId)}
                    </span>
                  </div>
                </div>

                {/* Question with View Button */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Ünvanladığınız sual:
                    </h3>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setShowQuestionModal(true);
                      }}
                    >
                      {t.viewQuestion}
                    </Button>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      {selectedAppeal.questionText}
                    </p>
                    {selectedAppeal.questionImageUrl && (
                      <div className="relative">
                        <img
                          src={selectedAppeal.questionImageUrl}
                          alt={t.questionImage}
                          className="w-full max-h-32 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                          {t.viewQuestionImage}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* User Comment */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {t.appealComment}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                    {selectedAppeal.userComment}
                  </p>
                </div>

                {/* Status and Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      {t.appealStatus}
                    </h4>
                    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${getStatusColor(selectedAppeal.status)}`}>
                      <span>{getStatusIcon(selectedAppeal.status)}</span>
                      <span>{t.appealStatuses[selectedAppeal.status as keyof typeof t.appealStatuses]}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      {t.submitDate}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(selectedAppeal.submittedDate)}
                    </p>
                  </div>
                </div>

                {/* Admin Response */}
                {selectedAppeal.adminResponse && (
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {t.adminResponse}
                    </h3>
                    <div className={`p-4 rounded-xl ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {selectedAppeal.adminName || 'Admin'}
                        </span>
                        {selectedAppeal.reviewedDate && (
                          <span className="text-sm text-gray-400 dark:text-gray-500">
                            • {formatDate(selectedAppeal.reviewedDate)}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {selectedAppeal.adminResponse}
                      </p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="secondary"
                    onClick={() => setSelectedAppeal(null)}
                  >
                    {t.backToAppeals}
                  </Button>
                </div>
              </div>
            </div>
          </div>
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