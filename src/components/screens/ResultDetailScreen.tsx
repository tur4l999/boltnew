import React, { useState, useMemo, useRef } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { EmojiIcon } from '../ui/EmojiIcon';
import { VideoPlayer } from '../media/VideoPlayer';
import { QuestionImageWatermark } from '../ui/QuestionImageWatermark';
import { AppealSubmitModal } from './AppealSubmitModal';
import { SAMPLE_QUESTIONS } from '../../lib/data';
import type { StoredExamResult, Question } from '../../lib/types';

export function ResultDetailScreen() {
  const { t, navigate, currentScreen, isDarkMode, goBack } = useApp();
  const { result } = currentScreen.params as { result: StoredExamResult };
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState<boolean[]>([]);
  const [showAppealModal, setShowAppealModal] = useState(false);
  const [showTeacherQuestionModal, setShowTeacherQuestionModal] = useState(false);
  const [teacherQuestionText, setTeacherQuestionText] = useState('');
  
  // Image preview state
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const previewImgRef = useRef<HTMLImageElement | null>(null);
  const previewContainerRef = useRef<HTMLDivElement | null>(null);
  const lastTouch = useRef<{ x: number; y: number } | null>(null);

  // Get the questions for this exam result
  const examQuestions = useMemo(() => {
    if (!result?.details?.questions) {
      // Fallback to sample questions if no stored questions
      return Array.from({ length: result.total }, (_, i) => ({
        ...SAMPLE_QUESTIONS[i % SAMPLE_QUESTIONS.length],
        id: `q${i + 1}`,
      }));
    }
    
    // Map stored question IDs to actual questions
    return result.details.questions.map((questionId, index) => {
      const sampleQuestion = SAMPLE_QUESTIONS.find(q => q.id === questionId) || 
                            SAMPLE_QUESTIONS[index % SAMPLE_QUESTIONS.length];
      return {
        ...sampleQuestion,
        id: questionId,
      };
    });
  }, [result]);

  // Get user answers from stored result or simulate if not available
  const userAnswers = useMemo(() => {
    // Use stored user answers if available
    if (result.details?.userAnswers) {
      return result.details.userAnswers;
    }
    
    // Fallback: simulate user answers based on the result
    const answers: Record<string, string> = {};
    const correctCount = result.score;
    
    examQuestions.forEach((question, index) => {
      // Simulate which questions were answered correctly
      const isCorrect = index < correctCount;
      if (isCorrect) {
        answers[question.id] = question.correctOptionId;
      } else {
        // Pick a wrong answer
        const wrongOptions = question.options.filter(opt => opt.id !== question.correctOptionId);
        answers[question.id] = wrongOptions[0]?.id || question.options[0].id;
      }
    });
    
    return answers;
  }, [examQuestions, result]);

  const currentQuestion = examQuestions[currentQuestionIndex];
  const userAnswer = userAnswers[currentQuestion?.id];
  const isCorrect = userAnswer === currentQuestion?.correctOptionId;
  const correctOption = currentQuestion?.options.find(opt => opt.id === currentQuestion.correctOptionId);
  const userSelectedOption = currentQuestion?.options.find(opt => opt.id === userAnswer);

  const toggleExplanation = (index: number) => {
    const newShowExplanation = [...showExplanation];
    newShowExplanation[index] = !newShowExplanation[index];
    setShowExplanation(newShowExplanation);
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const getResultTypeLabel = () => {
    switch (result.type) {
      case 'tickets': return result.details?.ticketNumber ? `Bilet ${result.details.ticketNumber}` : 'Biletlər üzrə';
      case 'topics': return result.details?.moduleId ? `${result.details.moduleId} mövzu` : 'Mövzular üzrə';
      case 'simulator': return 'Simulyator İmtahanı';
      case 'final': return 'Final İmtahanı';
      default: return 'İmtahan';
    }
  };

  // Image preview functions
  const openImagePreview = () => {
    if (!currentQuestion.imageUrl) return;
    setIsImagePreviewOpen(true);
    setZoomScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const closeImagePreview = () => {
    setIsImagePreviewOpen(false);
    setZoomScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const onPreviewWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.2 : 0.2;
    setZoomScale(prev => Math.max(1, Math.min(5, prev + delta)));
  };

  const onPreviewTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const onPreviewTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && lastTouch.current && zoomScale > 1) {
      const dx = e.touches[0].clientX - lastTouch.current.x;
      const dy = e.touches[0].clientY - lastTouch.current.y;
      setOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  if (!result || !currentQuestion) {
    return (
      <div className={`p-4 min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Card className="text-center py-8">
          <div className="text-4xl mb-3"><EmojiIcon emoji="❌" size={32} /></div>
          <div className="font-medium mb-4">Nəticə tapılmadı</div>
          <Button onClick={() => navigate('Results')}>Geri qayıt</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 px-4 py-3 border-b transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-gray-900/95 backdrop-blur-sm border-gray-700' 
          : 'bg-white/95 backdrop-blur-sm border-gray-200'
      }`}>
        <div className="flex items-center justify-between">
          <button
            onClick={goBack}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors duration-200 ${
              isDarkMode 
                ? 'text-gray-300 hover:bg-gray-800' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Geri</span>
          </button>
          
          <div className="text-center">
            <h1 className={`font-bold transition-colors duration-200 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              {getResultTypeLabel()}
            </h1>
            <p className={`text-sm transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {result.score}/{result.total} • {result.passed ? 'Keçdi' : 'Keçmədi'}
            </p>
          </div>

          <div className={`px-3 py-1 rounded-xl text-sm font-bold ${
            result.passed 
              ? 'bg-emerald-100 text-emerald-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {Math.round((result.score / result.total) * 100)}%
          </div>
        </div>
      </div>

      {/* Question Navigation Grid */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-10 gap-2 mb-4">
          {examQuestions.map((question, index) => {
            const questionUserAnswer = userAnswers[question.id];
            const questionIsCorrect = questionUserAnswer === question.correctOptionId;
            const isCurrent = index === currentQuestionIndex;
            
            return (
              <button
                key={question.id}
                onClick={() => goToQuestion(index)}
                className={`aspect-square rounded-lg text-sm font-bold transition-all duration-200 ${
                  isCurrent
                    ? isDarkMode 
                      ? 'bg-blue-600 text-white ring-2 ring-blue-400' 
                      : 'bg-blue-600 text-white ring-2 ring-blue-400'
                    : questionIsCorrect
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                      : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Question Detail */}
      <div className="px-4 pb-6">
        <Card className="mb-4">
          {/* Question Image/Video */}
          {currentQuestion.imageUrl && (
            <div className="mb-4 relative rounded-lg overflow-hidden cursor-zoom-in" onClick={openImagePreview}>
              <img
                src={currentQuestion.imageUrl}
                alt="Sual şəkli"
                className="w-full h-48 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <QuestionImageWatermark
                questionId={currentQuestion.id}
                userName="DDA User"
                userPhone="+994XXXXXXXXX"
              />
            </div>
          )}

          {/* Question Text */}
          <div className={`font-bold text-lg mb-4 transition-colors duration-200 ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            {currentQuestionIndex + 1}. {currentQuestion.text}
          </div>

          {/* Answer Options */}
          <div className="space-y-3 mb-4">
            {currentQuestion.options.map((option) => {
              const isUserSelected = option.id === userAnswer;
              const isCorrectOption = option.id === currentQuestion.correctOptionId;
              
              let optionStyle = '';
              if (isCorrectOption) {
                optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800';
                if (isDarkMode) {
                  optionStyle = 'border-emerald-500 bg-emerald-900/30 text-emerald-300';
                }
              } else if (isUserSelected && !isCorrect) {
                optionStyle = 'border-red-500 bg-red-50 text-red-800';
                if (isDarkMode) {
                  optionStyle = 'border-red-500 bg-red-900/30 text-red-300';
                }
              } else {
                optionStyle = isDarkMode 
                  ? 'border-gray-600 bg-gray-700 text-gray-300' 
                  : 'border-gray-200 bg-gray-50 text-gray-700';
              }

              return (
                <div
                  key={option.id}
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-colors duration-200 ${optionStyle}`}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {isCorrectOption ? (
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    ) : isUserSelected && !isCorrect ? (
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    ) : (
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        isDarkMode ? 'border-gray-500' : 'border-gray-300'
                      }`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{option.text}</div>
                    {isCorrectOption && (
                      <div className="text-sm mt-1 font-semibold text-emerald-600">
                        Doğru cavab
                      </div>
                    )}
                    {isUserSelected && !isCorrect && (
                      <div className="text-sm mt-1 font-semibold text-red-600">
                        Sizin cavabınız
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>


          {/* Explanation Section */}
          <div className="border-t pt-4">
            <button
              onClick={() => toggleExplanation(currentQuestionIndex)}
              className={`flex items-center gap-2 w-full p-3 rounded-xl transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <EmojiIcon emoji="💡" size={20} />
              <span className="font-medium">İzah</span>
              <svg 
                className={`w-5 h-5 ml-auto transition-transform duration-200 ${
                  showExplanation[currentQuestionIndex] ? 'rotate-180' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showExplanation[currentQuestionIndex] && (
              <div className="mt-4 space-y-4">
                {/* Text Explanation */}
                <div className={`p-4 rounded-xl ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <div className={`text-sm leading-relaxed ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    {currentQuestion.explanation}
                  </div>
                </div>

                {/* Video Explanation */}
                {currentQuestion.videoUrl && (
                  <div className="space-y-2">
                    <div className={`font-medium flex items-center gap-2 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      <EmojiIcon emoji="🎥" size={16} />
                      Video İzah
                    </div>
                    <div className="rounded-xl overflow-hidden">
                      <VideoPlayer 
                        src={currentQuestion.videoUrl} 
                        watermark="DDA" 
                        heightClass="h-48"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons - Teacher Question & Appeal */}
          <div className="border-t pt-4 mt-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setShowTeacherQuestionModal(true)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <span className="flex items-center gap-2">
                    <EmojiIcon emoji="👨‍🏫" size={16} />
                    Müəllimə sual
                  </span>
                </Button>
                
                <Button
                  onClick={() => setShowAppealModal(true)}
                  variant="ghost"
                  className={`flex-1 flex items-center justify-center gap-2 ${
                    isDarkMode 
                      ? 'border-orange-600 text-orange-400 hover:bg-orange-900/20' 
                      : 'border-orange-500 text-orange-600 hover:bg-orange-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <EmojiIcon emoji="📮" size={16} />
                    Apellyasiya
                  </span>
                </Button>
              </div>
              
              <div className={`text-xs text-center ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Sualınızı və ya etirazınızı bildirin
              </div>
            </div>
          </div>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            onClick={() => goToQuestion(Math.max(0, currentQuestionIndex - 1))}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Əvvəlki
          </Button>

          <div className={`text-sm font-medium ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {currentQuestionIndex + 1} / {examQuestions.length}
          </div>

          <Button
            variant="ghost"
            onClick={() => goToQuestion(Math.min(examQuestions.length - 1, currentQuestionIndex + 1))}
            disabled={currentQuestionIndex === examQuestions.length - 1}
            className="flex items-center gap-2"
          >
            Növbəti
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Teacher Question Modal */}
      {showTeacherQuestionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowTeacherQuestionModal(false)} />
          <div className={`relative z-10 w-full max-w-md rounded-2xl p-6 shadow-xl transition-colors duration-200 ${
            isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className={`text-lg font-bold mb-4 transition-colors duration-200 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Müəllimə sual
            </div>
            
            <div className={`text-sm mb-4 transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Bu sual haqqında müəllimə sualınızı yazın:
            </div>

            {/* Question Context */}
            <div className={`p-3 rounded-lg mb-4 text-sm ${
              isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'
            }`}>
              <strong>Sual:</strong> {currentQuestion?.text}
            </div>

            <textarea
              value={teacherQuestionText}
              onChange={(e) => setTeacherQuestionText(e.target.value)}
              placeholder="Sualınızı buraya yazın..."
              className={`w-full h-32 p-3 rounded-xl border resize-none transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />

            <div className="flex items-center gap-3 mt-4">
              <Button
                variant="ghost"
                onClick={() => {
                  setShowTeacherQuestionModal(false);
                  setTeacherQuestionText('');
                }}
                className="flex-1"
              >
                Ləğv et
              </Button>
              <Button
                onClick={() => {
                  // Here you would implement the actual submission logic
                  console.log('Teacher question submitted:', {
                    questionId: currentQuestion?.id,
                    questionText: currentQuestion?.text,
                    userQuestion: teacherQuestionText,
                    resultId: result.id
                  });
                  
                  // Show success message or navigate to teacher contact
                  navigate('TeacherContact', { 
                    questionId: currentQuestion?.id,
                    prefilledMessage: `Sual: ${currentQuestion?.text}\n\nMənim sualım: ${teacherQuestionText}`
                  });
                  
                  setShowTeacherQuestionModal(false);
                  setTeacherQuestionText('');
                }}
                disabled={!teacherQuestionText.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Göndər
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {isImagePreviewOpen && currentQuestion.imageUrl && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/80" onClick={closeImagePreview} />
          <div
            ref={previewContainerRef}
            className="absolute inset-0 flex items-center justify-center"
            onWheel={onPreviewWheel}
            onTouchStart={onPreviewTouchStart}
            onTouchMove={onPreviewTouchMove}
          >
            <div className="relative max-w-[95vw] max-h-[90vh]">
              <div className="relative">
                <img
                  ref={previewImgRef}
                  src={currentQuestion.imageUrl}
                  alt="Sual şəkli"
                  className="select-none"
                  style={{
                    transform: `scale(${zoomScale}) translate(${offset.x / zoomScale}px, ${offset.y / zoomScale}px)`,
                    transformOrigin: 'center center',
                    maxWidth: '95vw',
                    maxHeight: '90vh',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                  draggable={false}
                />
                <QuestionImageWatermark
                  questionId={currentQuestion.id}
                  userName="DDA User"
                  userPhone="+994XXXXXXXXX"
                />
              </div>
              <button
                onClick={closeImagePreview}
                className="absolute -top-10 right-0 px-3 py-1 rounded-full text-sm font-bold bg-gray-800 text-gray-200 border border-gray-700"
              >
                Bağla
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Appeal Submit Modal */}
      <AppealSubmitModal
        isOpen={showAppealModal}
        onClose={() => setShowAppealModal(false)}
        question={{
          id: currentQuestion?.id || '',
          text: currentQuestion?.text || '',
          imageUrl: currentQuestion?.imageUrl,
          source: result.type === 'tickets' ? 'ticket' : result.type === 'topics' ? 'topic' : 'simulator',
          sourceId: result.details?.ticketNumber?.toString() || result.details?.moduleId
        }}
      />
    </div>
  );
}