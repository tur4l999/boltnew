import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { SAMPLE_QUESTIONS } from '../../lib/data';
import { mistakesStore } from '../../lib/mistakesStore';
import { formatTime } from '../../lib/utils';

export function ExamRunScreen() {
  const { navigate, currentScreen, isDarkMode, goBack } = useApp();
  const { config } = currentScreen.params;
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15:00 format
  const [currentIndex, setCurrentIndex] = useState(0);
  // Selected option per question (not yet confirmed)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string | undefined>>({});
  // Outcome per question after confirmation: 'correct' | 'wrong'
  const [outcomes, setOutcomes] = useState<Record<string, 'correct' | 'wrong' | undefined>>({});
  const [view, setView] = useState<'grid' | 'question'>('grid');
  // Center overlay state
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayText, setOverlayText] = useState<'DOĞRU' | 'SƏHV' | ''>('');
  
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
    setSelectedOptions(prev => ({ ...prev, [currentQuestion.id]: optionId }));
  }

  function openQuestion(index: number) {
    setCurrentIndex(index);
    setView('question');
  }

  function finishExam() {
    const score = questions.reduce((acc, q) => acc + (outcomes[q.id] === 'correct' ? 1 : 0), 0);
    questions.forEach(q => {
      if (outcomes[q.id] !== 'correct') {
        mistakesStore.add(q.id);
      }
    });
    navigate('Results', {
      result: { score, total: questions.length, timeSpent: (15 * 60) - timeLeft }
    });
  }

  function confirmAnswer() {
    const selected = selectedOptions[currentQuestion.id];
    if (!selected) return;
    const isCorrect = selected === currentQuestion.correctOptionId;
    const outcome: 'correct' | 'wrong' = isCorrect ? 'correct' : 'wrong';
    setOutcomes(prev => ({ ...prev, [currentQuestion.id]: outcome }));

    // Show overlay result in center for 0.5s then go back to grid
    setOverlayText(isCorrect ? 'DOĞRU' : 'SƏHV');
    setShowOverlay(true);
    setTimeout(() => {
      setShowOverlay(false);
      setView('grid');
    }, 500);
  }

  const currentOutcome = outcomes[currentQuestion?.id];
  const isConfirmed = !!currentOutcome;

  return (
    <div className={`p-3 pb-24 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-900'
    } pt-11`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 text-white">
        {view === 'question' ? (
          <button
            onClick={() => setView('grid')}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
            aria-label="Geri"
          >
            ←
          </button>
        ) : (
          <div className="w-8 h-8"></div>
        )}
        <div className="text-center">
          <div className="text-sm">İmtahan simulyatoru</div>
        </div>
        <div className="w-8 h-8"></div>
      </div>

      {/* Questions Grid (opens question on tap) */}
      {view === 'grid' && (
        <div className="grid grid-cols-2 gap-3">
          {questions.map((question, index) => {
            const status = outcomes[question.id];
            const isCorrect = status === 'correct';
            const isWrong = status === 'wrong';
            return (
              <button
                key={question.id}
                onClick={() => openQuestion(index)}
                className={`relative rounded-xl overflow-hidden min-h-[200px] border ${
                  isCorrect
                    ? 'border-emerald-500'
                    : isWrong
                      ? 'border-red-500'
                      : 'border-transparent'
                }`}
              >
                <img
                  src={question.imageUrl}
                  alt={`Sual ${index + 1}`}
                  className="w-full h-32 object-cover"
                />
                <div className={`absolute inset-0 ${
                  isCorrect ? 'bg-emerald-500/30' : isWrong ? 'bg-red-500/30' : 'bg-black/40'
                }`}></div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="text-white text-xs leading-tight">
                    {question.text.length > 80 ? question.text.substring(0, 80) + '...' : question.text}
                  </div>
                </div>
                {status && (
                  <div className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center ${
                    status === 'correct' ? 'bg-emerald-500' : 'bg-red-500'
                  }`}>
                    <span className="text-white text-xs">{status === 'correct' ? '✓' : '✕'}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Question View */}
      {view === 'question' && currentQuestion && (
        <>
          <Card className="mt-2">
            {currentQuestion.imageUrl && (
              <img
                src={currentQuestion.imageUrl}
                alt="Question visual"
                className="w-full h-40 object-cover rounded-lg mb-3"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            )}
            <div className={`font-bold mb-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {currentIndex + 1}. {currentQuestion.text}
            </div>
            <div className="space-y-2">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOptions[currentQuestion.id] === option.id;
                // Determine color after confirmation
                let optionClasses = isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-white';
                if (isConfirmed) {
                  if (isSelected && currentOutcome === 'correct') {
                    optionClasses = isDarkMode ? 'border-emerald-500 bg-emerald-900/20' : 'border-emerald-600 bg-emerald-50';
                  } else if (isSelected && currentOutcome === 'wrong') {
                    optionClasses = isDarkMode ? 'border-red-500 bg-red-900/20' : 'border-red-600 bg-red-50';
                  }
                } else if (isSelected) {
                  optionClasses = isDarkMode ? 'border-emerald-500 bg-emerald-900/20' : 'border-emerald-600 bg-gray-50';
                }

                return (
                  <label
                    key={option.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer min-h-[44px] transition-colors duration-200 ${optionClasses}`}
                  >
                    <input
                      type="radio"
                      name="examAnswer"
                      checked={isSelected}
                      disabled={isConfirmed}
                      onChange={() => setAnswer(option.id)}
                      className="w-4 h-4 text-emerald-600"
                    />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{option.text}</span>
                  </label>
                );
              })}
            </div>

            {/* Confirm only; result is shown via overlay */}
            <div className="mt-4 flex items-center gap-2 justify-end">
              {!isConfirmed && (
                <Button onClick={confirmAnswer} disabled={!selectedOptions[currentQuestion.id]}>Təsdiq et</Button>
              )}
            </div>
          </Card>

          {/* Numeric navigation (only in question view) */}
          <div className="mt-4 grid grid-cols-5 gap-2">
            {questions.map((q, idx) => {
              const status = outcomes[q.id];
              const isActive = idx === currentIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-10 rounded-lg text-sm font-bold transition-colors ${
                    isActive
                      ? 'bg-emerald-600 text-white'
                      : status === 'correct'
                        ? 'bg-emerald-100 text-emerald-700'
                        : status === 'wrong'
                          ? 'bg-red-100 text-red-700'
                          : isDarkMode
                            ? 'bg-gray-800 text-gray-200'
                            : 'bg-white border border-gray-200 text-gray-700'
                  }`}
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
            overlayText === 'DOĞRU'
              ? 'bg-emerald-600 text-white'
              : 'bg-red-600 text-white'
          }`}>{overlayText}</div>
        )}
      </div>

      {/* Persistent timer bubble */}
      <div className="fixed bottom-4 right-4 select-none">
        <div className="px-4 py-2 rounded-xl bg-black text-white text-2xl font-bold tracking-widest shadow-lg/50 shadow-black">
          {formatTime(timeLeft)}
        </div>
      </div>
    </div>
  );
}