import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { FadeIn } from '../ui/FadeIn';
import type { AppealFormData } from '../../lib/types';

interface AppealSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: {
    id: string;
    text: string;
    imageUrl?: string;
    source: 'ticket' | 'topic' | 'simulator';
    sourceId?: string;
  };
}

export function AppealSubmitModal({ isOpen, onClose, question }: AppealSubmitModalProps) {
  const { t, isDarkMode, submitAppeal } = useApp();
  const [userComment, setUserComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userComment.trim()) {
      setError(t.requiredField);
      return;
    }

    if (userComment.length < 10) {
      setError(t.minLength);
      return;
    }

    if (userComment.length > 500) {
      setError(t.maxLength);
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const formData: AppealFormData = {
        questionId: question.id,
        questionText: question.text,
        questionImageUrl: question.imageUrl,
        questionSource: question.source,
        questionSourceId: question.sourceId,
        userComment: userComment.trim()
      };

      const success = submitAppeal(formData);
      
      if (success) {
        setShowSuccess(true);
        setTimeout(() => {
          onClose();
          setUserComment('');
          setShowSuccess(false);
        }, 2000);
      } else {
        setError(t.appealSubmittedError);
      }
    } catch (error) {
      setError(t.appealSubmittedError);
    } finally {
      setIsSubmitting(false);
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

  if (!isOpen) return null;

  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <FadeIn>
          <Card variant="elevated" padding="lg" className="text-center max-w-md w-full">
            <div className="py-8">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {t.appealSuccessTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t.appealSuccessDesc}
              </p>
              <div className="flex justify-center">
                <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          </Card>
        </FadeIn>
      </div>
    );
  }

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
                {t.submitAppealForQuestion}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                ✕
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Question Info */}
              <div className="space-y-4">
                {/* Question Source */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {t.questionSource}
                  </h3>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <span className="text-lg">{getSourceIcon(question.source)}</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {getSourceLabel(question.source, question.sourceId)}
                    </span>
                  </div>
                </div>

              {/* Question with Image */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {t.questionText}
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    {question.text}
                  </p>
                  {question.imageUrl && (
                    <div className="relative">
                      <img
                        src={question.imageUrl}
                        alt={t.questionImage}
                        className="w-full max-h-48 object-cover rounded-lg"
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
              </div>

              {/* Comment Input */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Ünvanladığınız sual:
                </label>
                <textarea
                  value={userComment}
                  onChange={(e) => {
                    setUserComment(e.target.value);
                    setError('');
                  }}
                  placeholder="Sualınızı yazın..."
                  rows={4}
                  className={`w-full p-4 rounded-xl border-2 transition-colors duration-200 resize-none ${
                    error
                      ? 'border-red-500 focus:border-red-500'
                      : isDarkMode
                        ? 'border-gray-600 bg-gray-700 text-white focus:border-emerald-500'
                        : 'border-gray-300 bg-white text-gray-900 focus:border-emerald-500'
                  } focus:outline-none focus:ring-4 focus:ring-emerald-500/20`}
                />
                <div className="flex justify-between items-center mt-2">
                  {error ? (
                    <p className="text-red-500 text-xs">{error}</p>
                  ) : (
                    <div></div>
                  )}
                  <p className={`text-xs ${
                    userComment.length > 500 
                      ? 'text-red-500' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {userComment.length}/500
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                  className="flex-1"
                >
                  Ləğv et
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? t.appealSubmitted : t.submitAppeal}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}