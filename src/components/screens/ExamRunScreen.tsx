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
  const [overlayText, setOverlayText] = useState<'Cavab doğrudur' | 'Cavab yanlışdır' | ''>('');
  
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
    setOverlayText(isCorrect ? 'Cavab doğrudur' : 'Cavab yanlışdır');
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
      {/* Header with back button */}
      <div className="flex items-center justify-between mb-4 text-white">
        {view === 'question' ? (
          <button
            onClick={() => setView('grid')}
            className="px-2.5 py-1.5 rounded-lg bg-black text-white flex items-center justify-center"
            aria-label="Geri"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="block"
            >
              <path d="M9 15l-3-3 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 12h7a4 4 0 000-8H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ) : (
          <div className="w-8 h-8"></div>
        )}
        <div className="text-center"></div>
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
                className={`relative rounded-xl overflow-hidden border text-left bg-white ${
                  'border-gray-300'
                } ${answered ? 'cursor-default' : ''}`}
              >
                {/* colored background when answered */}
                {answered && (
                  <div className={`absolute inset-0 ${status === 'correct' ? 'bg-emerald-500/30' : 'bg-red-500/30'}`}></div>
                )}
                <div className="w-full h-28 bg-white">
                  <img
                    src={question.imageUrl}
                    alt={`Sual ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={`px-3 py-2 bg-white text-gray-900 text-xs leading-tight`}>
                  <div className="truncate-fade">
                    {question.text}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Question View */}
      {view === 'question' && currentQuestion && (
        <>
          {/* Force white card background regardless of theme to match mock */}
          <Card className="mt-2 bg-white text-gray-900 border-gray-200">
            {currentQuestion.imageUrl && (
              <img
                src={currentQuestion.imageUrl}
                alt="Question visual"
                className="w-full h-40 object-cover rounded-lg mb-3"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            )}
            <div className={`font-bold mb-3 text-gray-900`}>
              {currentIndex + 1}. {currentQuestion.text}
            </div>
            <div className="space-y-2">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOptions[currentQuestion.id] === option.id;
                // Base: white option regardless of theme
                let optionClasses = 'border-gray-300 bg-white';
                if (isConfirmed) {
                  if (isSelected && currentOutcome === 'correct') {
                    optionClasses = 'border-emerald-600 bg-emerald-50';
                  } else if (isSelected && currentOutcome === 'wrong') {
                    optionClasses = 'border-red-600 bg-red-50';
                  }
                } else if (isSelected) {
                  optionClasses = 'border-sky-600 bg-sky-50';
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
                    <span className={`text-sm text-gray-800`}>{option.text}</span>
                  </label>
                );
              })}
            </div>

            {/* Actions row: only Confirm on the right */}
            <div className="mt-4 flex items-center gap-2 justify-end">
              {!isConfirmed && selectedOptions[currentQuestion.id] && (
                <Button onClick={confirmAnswer}>Təsdiq et</Button>
              )}
            </div>
          </Card>

          {/* Numeric navigation (only in question view) */}
          <div className="mt-4 grid grid-cols-5 gap-2">
            {questions.map((q, idx) => {
              const status = outcomes[q.id];
              const isActive = idx === currentIndex;
              const answered = !!status;
              return (
                <button
                  key={q.id}
                  onClick={() => !answered && setCurrentIndex(idx)}
                  disabled={answered}
                  className={`h-10 rounded-lg text-sm font-bold transition-colors ${
                    isActive
                      ? 'bg-sky-600 text-white' /* distinct active color */
                      : status === 'correct'
                        ? 'bg-emerald-600 text-white'
                        : status === 'wrong'
                          ? 'bg-red-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-700'
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

      {/* Persistent timer bubble below notch, centered */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 select-none z-50">
        <div className="px-4 py-1.5 rounded-lg bg-white text-black text-xl font-bold tracking-widest shadow-lg/50 shadow-black">
          {formatTime(timeLeft)}
        </div>
      </div>
    </div>
  );
}