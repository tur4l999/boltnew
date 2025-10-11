import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
// import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { SAMPLE_QUESTIONS } from '../../lib/data';
import { mistakesStore } from '../../lib/mistakesStore';
import { formatTime } from '../../lib/utils';
import { AppealSubmitModal } from './AppealSubmitModal';
import { QuestionImageWatermark } from '../ui/QuestionImageWatermark';

export function ExamRunScreen() {
  const { navigate, currentScreen, isDarkMode, goBack, addExamResult } = useApp();
  const { config } = currentScreen.params;
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15:00 format
  const [currentIndex, setCurrentIndex] = useState(0);
  // Selected option per question (not yet confirmed)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string | undefined>>({});
  // Outcome per question after confirmation: 'correct' | 'wrong'
  const [outcomes, setOutcomes] = useState<Record<string, 'correct' | 'wrong' | undefined>>({});
  // Store user answers for each question
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [view, setView] = useState<'grid' | 'question'>('grid');
  // Center overlay state
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayText, setOverlayText] = useState<'Cavab doğrudur' | 'Cavab yanlışdır' | ''>('');
  const [finalState, setFinalState] = useState<'pass' | 'fail' | null>(null);
  const [showAppealModal, setShowAppealModal] = useState(false);

  function truncateText(text: string, maxChars: number): string {
    if (!text) return '';
    return text.length > maxChars ? text.slice(0, maxChars - 1) + '…' : text;
  }
  
  // Create 10 questions by repeating sample questions
  const questions = Array.from({ length: 10 }, (_, i) => ({
    ...SAMPLE_QUESTIONS[i % SAMPLE_QUESTIONS.length],
    id: `q${i + 1}`,
    imageUrl: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800'
  }));
  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          finishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function setAnswer(optionId: string) {
    setSelectedOptions(prev => {
      const currentlySelected = prev[currentQuestion.id];
      // Toggle off if the same option is clicked again
      if (currentlySelected === optionId) {
        const updated = { ...prev };
        delete updated[currentQuestion.id];
        return updated;
      }
      return { ...prev, [currentQuestion.id]: optionId };
    });
  }

  function openQuestion(index: number) {
    setCurrentIndex(index);
    setView('question');
    // Do not keep previous temporary selections when opening a question
    setSelectedOptions({});
  }

  function finishExam() {
    const score = questions.reduce((acc, q) => acc + (outcomes[q.id] === 'correct' ? 1 : 0), 0);
    const total = questions.length;
    const timeSpent = (15 * 60) - timeLeft;
    const weakTopics: string[] = [];
    
    questions.forEach(q => {
      if (outcomes[q.id] !== 'correct') {
        mistakesStore.add(q.id);
        // Extract module from question moduleId
        if (q.moduleId && !weakTopics.includes(q.moduleId)) {
          weakTopics.push(q.moduleId);
        }
      }
    });

    // Determine exam type based on config
    let examType: 'simulator' | 'final' | 'tickets' | 'topics' = 'simulator';
    if (config?.mode === 'final') {
      examType = 'final';
    } else if (config?.ticket) {
      examType = 'tickets';
    } else if (config?.moduleId) {
      examType = 'topics';
    }

    // Save result to context
    addExamResult(
      examType, 
      score, 
      total, 
      timeSpent, 
      weakTopics,
      {
        ticketNumber: config?.ticket,
        moduleId: config?.moduleId,
        questions: questions.map(q => q.id),
        userAnswers
      }
    );

    navigate('Results', {
      result: { score, total, timeSpent, weakTopics }
    });
  }

  function confirmAnswer() {
    const selected = selectedOptions[currentQuestion.id];
    if (!selected) return;
    const isCorrect = selected === currentQuestion.correctOptionId;
    const outcome: 'correct' | 'wrong' = isCorrect ? 'correct' : 'wrong';
    setOutcomes(prev => ({ ...prev, [currentQuestion.id]: outcome }));
    setUserAnswers(prev => ({ ...prev, [currentQuestion.id]: selected }));

    // Show overlay result in center for 0.5s then go back to grid
    setOverlayText(isCorrect ? 'Cavab doğrudur' : 'Cavab yanlışdır');
    setShowOverlay(true);
    setTimeout(() => {
      setShowOverlay(false);
      // If exam not finished, go back to grid; full-screen state may take over
      setView('grid');
    }, 500);

    // After setting outcome, compute totals and check pass/fail conditions
    setTimeout(() => {
      const totalCorrect = Object.values({ ...outcomes, [currentQuestion.id]: outcome }).filter(v => v === 'correct').length;
      const totalWrong = Object.values({ ...outcomes, [currentQuestion.id]: outcome }).filter(v => v === 'wrong').length;
      if (totalWrong >= 2) {
        setFinalState('fail');
      } else if (totalCorrect >= 9) {
        setFinalState('pass');
      }
    }, 0);
  }

  const currentOutcome = outcomes[currentQuestion?.id];
  const isConfirmed = !!currentOutcome;

  return (
    <div className={`p-3 pb-24 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-900'
    } pt-11`}>
      {/* Full-screen pass/fail overlay */}
      {finalState && (
        <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center text-white ${finalState === 'pass' ? 'bg-emerald-600' : 'bg-red-600'}`}>
          <div className="text-2xl font-black mb-6">
            {finalState === 'pass' ? 'İmtahandan keçdiniz' : 'İmtahandan kəsildiniz'}
          </div>
          <div className="w-full max-w-xs space-y-2 px-4">
            <Button onClick={() => window.location.reload()} className="w-full" variant="secondary">Yenidən Başla</Button>
            <Button onClick={finishExam} className="w-full">Nəticələr</Button>
            <Button onClick={() => navigate('Lesson', { moduleId: 'M1' })} className="w-full" variant="ghost">Dərsə Başla</Button>
          </div>
        </div>
      )}
      {/* Header with back button and dynamic ticket title */}
      <div className="flex items-center justify-between mb-4 text-white">
        {view === 'question' ? (
          <button
            onClick={() => setView('grid')}
            className="px-4 py-2 rounded-xl bg-black text-white flex items-center gap-2"
            aria-label="Geriyə"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="block"
            >
              <path d="M9 15l-3-3 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 12h7a4 4 0 000-8H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm font-bold">Geriyə</span>
          </button>
        ) : (
          <div className="w-8 h-8"></div>
        )}
        <div className="text-center text-lg font-black">
          {config?.ticket ? `Bilet ${config.ticket}` : ''}
        </div>
        <div className="w-8 h-8"></div>
      </div>

      {/* Questions Grid (opens question on tap) */}
      {view === 'grid' && (
        <div className="grid grid-cols-2 gap-3">
          {questions.map((question, index) => {
            const status = outcomes[question.id];
            const answered = !!status;
            return (
              <button
                key={question.id}
                onClick={() => !answered && openQuestion(index)}
                disabled={answered}
                className={`relative rounded-xl overflow-hidden border text-left p-0 flex flex-col items-stretch justify-start ${answered ? (status === 'correct' ? 'bg-emerald-600' : 'bg-red-600') : 'bg-white'} shadow-sm ${
                  'border-gray-300'
                } ${answered ? 'cursor-default' : ''}`}
                style={answered ? { boxShadow: status === 'correct' ? '0 6px 18px rgba(16, 185, 129, 0.35)' : '0 6px 18px rgba(239, 68, 68, 0.35)' } : undefined}
              >
                {/* removed placeholder layer to ensure image sits at very top */}
                {/* no overlay on answered; keep content as-is */}
                <div className="w-full h-36 relative">
                  <img
                    src={question.imageUrl}
                    alt={`Sual ${index + 1}`}
                    className="w-full h-full object-cover object-top block"
                  />
                  <QuestionImageWatermark
                    questionId={question.id}
                    userName="DDA User"
                    userPhone="+994XXXXXXXXX"
                  />
                </div>
                <div className={`px-3 py-2 mt-1 ${answered ? 'text-white' : 'text-gray-900'} text-xs leading-tight`}>
                  <div>{truncateText(question.text, 80)}</div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Question View */}
      {view === 'question' && currentQuestion && (
        <>
          {/* Question container without white background */}
          <div className="mt-2 rounded-xl p-4 text-white">
            {currentQuestion.imageUrl && (
              <div className="relative w-full h-40 mb-3 rounded-lg overflow-hidden">
                <img
                  src={currentQuestion.imageUrl}
                  alt="Question visual"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <QuestionImageWatermark
                  questionId={currentQuestion.id}
                  userName="DDA User"
                  userPhone="+994XXXXXXXXX"
                />
              </div>
            )}
            <div className={`font-bold mb-3 text-white`}>
              {currentIndex + 1}. {currentQuestion.text}
            </div>
            <div className="space-y-2">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOptions[currentQuestion.id] === option.id;
                // Transparent option styles for dark background
                let optionClasses = 'border-gray-700 bg-transparent';
                if (isConfirmed) {
                  if (isSelected && currentOutcome === 'correct') {
                    optionClasses = 'border-emerald-500 bg-emerald-900/30';
                  } else if (isSelected && currentOutcome === 'wrong') {
                    optionClasses = 'border-red-500 bg-red-900/30';
                  }
                } else if (isSelected) {
                  optionClasses = 'border-sky-500 bg-sky-900/30';
                }

                return (
                  <label
                    key={option.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border ${isConfirmed ? 'cursor-default' : 'cursor-pointer'} min-h-[44px] transition-colors duration-200 ${optionClasses}`}
                  >
                    <input
                      type="radio"
                      name="examAnswer"
                      checked={isSelected}
                      disabled={isConfirmed}
                      onChange={() => setAnswer(option.id)}
                      className="w-4 h-4 text-emerald-600"
                    />
                    <span className={`text-sm text-white`}>{option.text}</span>
                  </label>
                );
              })}
            </div>

            {/* Actions row: Appeal button and Confirm button */}
            <div className="mt-4 flex items-center gap-2 justify-between">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowAppealModal(true)}
                className="text-white border-white/30 hover:bg-white/10"
              >
                📮 Apellyasiya
              </Button>
              {!isConfirmed && selectedOptions[currentQuestion.id] && (
                <Button onClick={confirmAnswer}>Təsdiq et</Button>
              )}
            </div>
          </div>

          {/* Numeric navigation (only in question view) */}
          <div className="mt-4 grid grid-cols-5 gap-2">
            {questions.map((q, idx) => {
              const status = outcomes[q.id];
              const isActive = idx === currentIndex;
              const answered = !!status;
              return (
                <button
                  key={q.id}
                  onClick={() => {
                    if (!answered) {
                      setCurrentIndex(idx);
                      // Clear temporary selection when switching to a different question
                      setSelectedOptions({});
                    }
                  }}
                  disabled={answered}
                  className={`h-10 rounded-lg text-sm font-bold transition-colors ${
                    isActive
                      ? 'bg-gray-600 text-white' /* changed active color to gray */
                      : status === 'correct'
                        ? 'bg-emerald-600 text-white'
                        : status === 'wrong'
                          ? 'bg-red-600 text-white'
                          : 'bg-transparent border border-gray-700 text-white'
                  } ${answered ? 'cursor-default' : ''}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Center result overlay */}
      <div className={`fixed inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-150 ${showOverlay ? 'opacity-100' : 'opacity-0'}`}>
        {showOverlay && (
          <div className={`px-6 py-3 rounded-2xl text-2xl font-black ${
            overlayText === 'Cavab doğrudur'
              ? 'bg-emerald-600 text-white'
              : 'bg-red-600 text-white'
          }`}>{overlayText}</div>
        )}
      </div>

      {/* Persistent timer bubble below notch, centered (moved slightly lower) */}
      <div className="fixed top-16 left-1/2 -translate-x-1/2 select-none z-50">
        <div className="px-4 py-1.5 rounded-lg bg-white text-black text-xl font-bold tracking-widest shadow-lg/50 shadow-black">
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Appeal Submit Modal */}
      <AppealSubmitModal
        isOpen={showAppealModal}
        onClose={() => setShowAppealModal(false)}
        question={{
          id: currentQuestion.id,
          text: currentQuestion.text,
          imageUrl: currentQuestion.imageUrl,
          source: config?.ticket ? 'ticket' : config?.moduleId ? 'topic' : 'simulator',
          sourceId: config?.ticket?.toString() || config?.moduleId
        }}
      />
    </div>
  );
}