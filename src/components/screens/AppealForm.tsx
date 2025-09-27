import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { FadeIn } from '../ui/FadeIn';
import type { AppealFormData } from '../../lib/types';

interface AppealFormProps {
  onSuccess: () => void;
}

export function AppealForm({ onSuccess }: AppealFormProps) {
  const { t, isDarkMode, submitAppeal } = useApp();
  const [formData, setFormData] = useState<AppealFormData>({
    questionId: '',
    questionText: '',
    userComment: ''
  });
  const [errors, setErrors] = useState<Partial<AppealFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock questions for demo purposes
  const mockQuestions = [
    { id: 'q1', text: 'Yol nişanları nə vaxt tətbiq edilir?' },
    { id: 'q2', text: 'Sürət məhdudiyyəti necə təyin edilir?' },
    { id: 'q3', text: 'Park etmək qadağandır nişanı nə deməkdir?' },
    { id: 'q4', text: 'Yol keçidində piyadalar üçün nə vaxt dayanmaq lazımdır?' },
    { id: 'q5', text: 'Dönüş nişanları necə istifadə edilir?' },
    { id: 'q6', text: 'Yol hərəkət qaydaları nə vaxt tətbiq edilir?' },
    { id: 'q7', text: 'Trafik işıqları necə işləyir?' },
    { id: 'q8', text: 'Yol xəttləri nə üçün lazımdır?' }
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<AppealFormData> = {};

    if (!formData.questionId) {
      newErrors.questionId = t.requiredField;
    }

    if (!formData.userComment) {
      newErrors.userComment = t.requiredField;
    } else if (formData.userComment.length < 10) {
      newErrors.userComment = t.minLength;
    } else if (formData.userComment.length > 500) {
      newErrors.userComment = t.maxLength;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const success = submitAppeal(formData);
      
      if (success) {
        setShowSuccess(true);
        setTimeout(() => {
          onSuccess();
        }, 2000);
      } else {
        // Handle error
        console.error('Failed to submit appeal');
      }
    } catch (error) {
      console.error('Error submitting appeal:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuestionSelect = (questionId: string) => {
    const question = mockQuestions.find(q => q.id === questionId);
    setFormData(prev => ({
      ...prev,
      questionId,
      questionText: question?.text || ''
    }));
    if (errors.questionId) {
      setErrors(prev => ({ ...prev, questionId: undefined }));
    }
  };

  const handleCommentChange = (value: string) => {
    setFormData(prev => ({ ...prev, userComment: value }));
    if (errors.userComment) {
      setErrors(prev => ({ ...prev, userComment: undefined }));
    }
  };

  if (showSuccess) {
    return (
      <FadeIn>
        <Card variant="glass" padding="lg" className="text-center">
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
    );
  }

  return (
    <FadeIn>
      <Card variant="elevated" padding="lg">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {t.appealFormTitle}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t.appealFormDesc}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Question Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                {t.selectQuestion}
              </label>
              <div className="space-y-2">
                {mockQuestions.map((question) => (
                  <button
                    key={question.id}
                    type="button"
                    onClick={() => handleQuestionSelect(question.id)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                      formData.questionId === question.id
                        ? isDarkMode
                          ? 'bg-emerald-600 text-white shadow-lg'
                          : 'bg-emerald-500 text-white shadow-lg'
                        : isDarkMode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        formData.questionId === question.id
                          ? 'border-white bg-white'
                          : isDarkMode
                            ? 'border-gray-500'
                            : 'border-gray-400'
                      }`}>
                        {formData.questionId === question.id && (
                          <div className="w-full h-full rounded-full bg-emerald-600"></div>
                        )}
                      </div>
                      <span className="text-sm">{question.text}</span>
                    </div>
                  </button>
                ))}
              </div>
              {errors.questionId && (
                <p className="text-red-500 text-xs mt-2">{errors.questionId}</p>
              )}
            </div>

            {/* Comment Input */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                {t.writeYourComment}
              </label>
              <textarea
                value={formData.userComment}
                onChange={(e) => handleCommentChange(e.target.value)}
                placeholder={t.writeYourComment}
                rows={6}
                className={`w-full p-4 rounded-xl border-2 transition-colors duration-200 resize-none ${
                  errors.userComment
                    ? 'border-red-500 focus:border-red-500'
                    : isDarkMode
                      ? 'border-gray-600 bg-gray-700 text-white focus:border-emerald-500'
                      : 'border-gray-300 bg-white text-gray-900 focus:border-emerald-500'
                } focus:outline-none focus:ring-4 focus:ring-emerald-500/20`}
              />
              <div className="flex justify-between items-center mt-2">
                {errors.userComment ? (
                  <p className="text-red-500 text-xs">{errors.userComment}</p>
                ) : (
                  <div></div>
                )}
                <p className={`text-xs ${
                  formData.userComment.length > 500 
                    ? 'text-red-500' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {formData.userComment.length}/500
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? t.appealSubmitted : t.submitAppeal}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </FadeIn>
  );
}