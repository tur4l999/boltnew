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
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [view, setView] = useState<'grid' | 'question'>('grid');
  
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
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));
  }

  function openQuestion(index: number) {
    setCurrentIndex(index);
    setView('question');
  }

  function finishExam() {
    const score = questions.reduce((acc, q) => acc + (answers[q.id] === q.correctOptionId ? 1 : 0), 0);
    questions.forEach(q => {
      if (answers[q.id] !== q.correctOptionId) {
        mistakesStore.add(q.id);
      }
    });
    navigate('Results', {
      result: { score, total: questions.length, timeSpent: (15 * 60) - timeLeft }
    });
  }

  function confirmAndProceed() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishExam();
    }
  }

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
          <div className="text-lg font-bold">{formatTime(timeLeft)}</div>
        </div>
        <div className="w-8 h-8"></div>
      </div>

      {/* Questions Grid (opens question on tap) */}
      {view === 'grid' && (
        <div className="grid grid-cols-2 gap-3">
          {questions.map((question, index) => (
            <button
              key={question.id}
              onClick={() => openQuestion(index)}
              className={`relative rounded-xl overflow-hidden min-h-[200px] ${
                answers[question.id] ? 'opacity-60' : ''
              }`}
            >
              <img
                src={question.imageUrl}
                alt={`Sual ${index + 1}`}
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="text-white text-xs leading-tight">
                  {question.text.length > 80 ? question.text.substring(0, 80) + '...' : question.text}
                </div>
              </div>
              {answers[question.id] && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </button>
          ))}
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
              {currentQuestion.options.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer min-h-[44px] transition-colors duration-200 ${
                    answers[currentQuestion.id] === option.id
                      ? isDarkMode
                        ? 'border-emerald-500 bg-emerald-900/20'
                        : 'border-emerald-600 bg-gray-50'
                      : isDarkMode
                        ? 'border-gray-600 bg-gray-700'
                        : 'border-gray-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="examAnswer"
                    checked={answers[currentQuestion.id] === option.id}
                    onChange={() => setAnswer(option.id)}
                    className="w-4 h-4 text-emerald-600"
                  />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{option.text}</span>
                </label>
              ))}
            </div>

            {/* Confirm button appears after selecting an answer */}
            {answers[currentQuestion.id] && (
              <div className="mt-4 flex justify-end">
                <Button onClick={confirmAndProceed}>Təsdiq et</Button>
              </div>
            )}
          </Card>

          {/* Numeric navigation (only in question view) */}
          <div className="mt-4 grid grid-cols-5 gap-2">
            {questions.map((q, idx) => {
              const isAnswered = !!answers[q.id];
              const isActive = idx === currentIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-10 rounded-lg text-sm font-bold transition-colors ${
                    isActive
                      ? 'bg-emerald-600 text-white'
                      : isAnswered
                        ? 'bg-emerald-100 text-emerald-700'
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
    </div>
  );
}