import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { FadeIn } from '../ui/FadeIn';
import type { Appeal } from '../../lib/types';

interface QuestionViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  appeal: Appeal;
}

export function QuestionViewModal({ isOpen, onClose, appeal }: QuestionViewModalProps) {
  const { t, isDarkMode } = useApp();

  if (!isOpen) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <FadeIn>
        <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {t.questionDetails}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                ✕
              </Button>
            </div>

            <div className="space-y-6">
              {/* Question Source and ID */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {t.questionSource}
                  </h3>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <span className="text-lg">{getSourceIcon(appeal.questionSource)}</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {getSourceLabel(appeal.questionSource, appeal.questionSourceId)}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {t.questionId}
                  </h3>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <span className="text-gray-700 dark:text-gray-300 font-mono">
                      {appeal.questionId}
                    </span>
                  </div>
                </div>
              </div>

              {/* Question Text */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {t.questionText}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                  {appeal.questionText}
                </p>
              </div>

              {/* Question Image */}
              {appeal.questionImageUrl && (
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {t.questionImage}
                  </h3>
                  <div className="relative">
                    <img
                      src={appeal.questionImageUrl}
                      alt={t.questionImage}
                      className="w-full max-h-64 object-cover rounded-xl"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                      {t.viewQuestionImage}
                    </div>
                  </div>
                </div>
              )}

              {/* Question Options */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {t.questionOptions}
                </h3>
                <div className="space-y-2">
                  {appeal.questionOptions.map((option, index) => (
                    <div
                      key={option.id}
                      className={`p-3 rounded-xl border-2 transition-colors duration-200 ${
                        option.id === appeal.questionCorrectOptionId
                          ? isDarkMode
                            ? 'border-green-500 bg-green-900/20 text-green-300'
                            : 'border-green-500 bg-green-50 text-green-800'
                          : isDarkMode
                            ? 'border-gray-600 bg-gray-700 text-gray-300'
                            : 'border-gray-300 bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                          option.id === appeal.questionCorrectOptionId
                            ? isDarkMode
                              ? 'bg-green-500 text-white'
                              : 'bg-green-500 text-white'
                            : isDarkMode
                              ? 'bg-gray-600 text-gray-300'
                              : 'bg-gray-300 text-gray-700'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="flex-1">{option.text}</span>
                        {option.id === appeal.questionCorrectOptionId && (
                          <span className="text-sm font-medium">
                            ✓ {t.correctAnswer}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Question Explanation */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {t.questionExplanation}
                </h3>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <p className="text-gray-700 dark:text-gray-300">
                    {appeal.questionExplanation}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="secondary"
                  onClick={onClose}
                >
                  Bağla
                </Button>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}