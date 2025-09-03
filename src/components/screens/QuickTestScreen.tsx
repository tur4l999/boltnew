import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { SAMPLE_QUESTIONS } from '../../lib/data';
import { mistakesStore } from '../../lib/mistakesStore';

type AnswerStatus = 'correct' | 'wrong' | null;

export function QuickTestScreen() {
  const { isDarkMode, navigate } = useApp();

  // Prepare 20 questions for Ticket 1 (repeat SAMPLE_QUESTIONS if needed)
  const questions = useMemo(() => {
    const result = [] as typeof SAMPLE_QUESTIONS;
    let idx = 0;
    while (result.length < 20) {
      result.push(SAMPLE_QUESTIONS[idx % SAMPLE_QUESTIONS.length]);
      idx += 1;
    }
    return result.slice(0, 20);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(Array(20).fill(null));
  const [isLocked, setIsLocked] = useState<boolean[]>(Array(20).fill(false));
  const [answerStatuses, setAnswerStatuses] = useState<AnswerStatus[]>(Array(20).fill(null));
  const [showExplanation, setShowExplanation] = useState<boolean[]>(Array(20).fill(false));
  const [savedQuestions, setSavedQuestions] = useState<boolean[]>(Array(20).fill(false));

  // Problem report UI
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportText, setReportText] = useState('');

  // Simple timer (20:00) displayed on the right
  const [secondsLeft, setSecondsLeft] = useState(20 * 60);
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (secondsLeft % 60).toString().padStart(2, '0');

  // Swipe handlers
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
    touchEndX.current = null;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
  };
  const onTouchEnd = () => {
    if (touchStartX.current == null || touchEndX.current == null) return;
    const dx = touchEndX.current - touchStartX.current;
    const threshold = 40;
    if (dx < -threshold) {
      goNext();
    } else if (dx > threshold) {
      goPrev();
    }
  };

  const goNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(questions.length - 1, i + 1));
  }, [questions.length]);
  const goPrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }, []);

  const question = questions[currentIndex];

  // When user selects an option, auto-confirm and lock
  function selectAnswer(optionId: string) {
    if (isLocked[currentIndex]) return;
    const newSelected = [...selectedAnswers];
    newSelected[currentIndex] = optionId;
    setSelectedAnswers(newSelected);

    const isCorrect = optionId === question.correctOptionId;

    const newLocked = [...isLocked];
    newLocked[currentIndex] = true;
    setIsLocked(newLocked);

    const newStatuses = [...answerStatuses];
    newStatuses[currentIndex] = isCorrect ? 'correct' : 'wrong';
    setAnswerStatuses(newStatuses);

    const newShow = [...showExplanation];
    newShow[currentIndex] = !isCorrect; // show explanation automatically if wrong
    setShowExplanation(newShow);

    if (!isCorrect) {
      mistakesStore.add(question.id);
    }
  }

  function toggleSave() {
    const next = [...savedQuestions];
    next[currentIndex] = !next[currentIndex];
    setSavedQuestions(next);
  }

  const currentStatus = answerStatuses[currentIndex];
  const isAnswerLocked = isLocked[currentIndex];
  const selected = selectedAnswers[currentIndex];

  return (
    <div
      className={`p-3 pb-24 min-h-screen transition-colors duration-200 bg-gray-900 text-gray-100`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Top bar: back arrow (to tickets), centered title, right timer */}
      <div className="mb-2 grid grid-cols-3 items-center">
        <div className="flex items-center">
          <button
            onClick={() => navigate('Exam')}
            aria-label="Geri"
            className={`w-8 h-8 rounded-full grid place-items-center border border-gray-700 text-gray-300`}
          >
            ←
          </button>
        </div>
        <div className="text-center">
          <div className={`text-lg font-black text-gray-200`}>Bilet 1</div>
        </div>
        <div className="flex items-center justify-end">
          <div className="mr-4">
            <div className="px-3 py-1 rounded-lg bg-white text-black text-sm font-bold tracking-widest shadow-lg/50 shadow-black">
              {minutes}:{seconds}
            </div>
          </div>
        </div>
      </div>

      <Card className="bg-gray-900 border-gray-700 text-gray-100">
        {/* Question header with optional image and report button */}
        {question.imageUrl && (
          <div className="mb-3 relative">
            {/* Problem report toggle above the image, aligned right, popover overlays content */}
            <div className="flex justify-end mb-2 relative">
              <button
                onClick={() => setIsReportOpen((v) => !v)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shadow bg-gray-800/90 text-gray-200 border border-gray-700`}
                aria-label="Problem bildir"
              >
                ⚠️
              </button>
              {isReportOpen && (
                <div
                  className={`absolute top-10 right-0 z-20 w-64 p-3 rounded-xl shadow-lg bg-gray-800 border border-gray-700`}
                >
                  <div className={`text-xs font-bold mb-2 text-gray-200`}>
                    Sualla bağlı problem bildir
                  </div>
                  <textarea
                    value={reportText}
                    onChange={(e) => setReportText(e.target.value)}
                    placeholder="Mətni daxil edin..."
                    className={`w-full h-20 rounded-lg p-2 text-sm outline-none bg-gray-700 text-gray-200`}
                  />
                  <div className="mt-2 flex items-center gap-2 justify-end">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setReportText('');
                        setIsReportOpen(false);
                      }}
                    >
                      Ləğv et
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        setIsReportOpen(false);
                        setReportText('');
                        alert('Problem qeydə alındı (demo)');
                      }}
                    >
                      Göndər
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <img
              src={question.imageUrl}
              alt="Sual şəkli"
              className="w-full h-40 object-cover rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Question meta and text */}
        <div className="flex items-center justify-between mb-2">
          <div className={`text-[11px] text-gray-400`}>
            {currentIndex + 1}/20
          </div>
        </div>
        <div className={`font-bold mb-3 text-gray-100`}>{question.text}</div>

        {/* Options: auto-confirm on select */}
        <div className="space-y-2">
          {question.options.map((option) => {
            const isSelected = selected === option.id;
            const locked = isAnswerLocked;
            const isCorrectOption = locked && option.id === question.correctOptionId;
            const isWrongSelected = locked && isSelected && option.id !== question.correctOptionId;
            return (
              <label
                key={option.id}
                className={`flex items-center gap-3 p-3 rounded-xl border min-h-[44px] ${
                  locked ? 'cursor-default' : 'cursor-pointer'
                } ${
                  locked
                    ? isCorrectOption
                      ? 'border-emerald-500 bg-emerald-900/20'
                      : isWrongSelected
                        ? 'border-red-600 bg-red-900/20'
                        : 'border-gray-600 bg-gray-700'
                    : isSelected
                      ? 'border-emerald-500 bg-emerald-900/20'
                      : 'border-gray-600 bg-gray-700'
                }`}
              >
                <input
                  type="radio"
                  name={`answer-${currentIndex}`}
                  checked={isSelected}
                  disabled={locked}
                  onChange={() => selectAnswer(option.id)}
                  className="w-4 h-4 text-emerald-600"
                />
                <span className={`text-sm text-gray-200`}>{option.text}</span>
              </label>
            );
          })}
        </div>

        {/* Explanation toggle and content */}
        <div className="mt-3">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
              onClick={() => {
                const next = [...showExplanation];
                next[currentIndex] = !next[currentIndex];
                setShowExplanation(next);
              }}
            >
              İzah
            </Button>
            {isAnswerLocked && currentStatus === 'wrong' && (
              <div className={`text-xs font-semibold text-red-300`}>
                Doğru cavab: <span className="font-bold">{
                  question.options.find(o => o.id === question.correctOptionId)?.text
                }</span>
              </div>
            )}
          </div>
          {showExplanation[currentIndex] && (
            <div className={`text-sm mt-2 p-2 rounded-lg text-gray-200 bg-gray-700`}>
              {question.explanation}
            </div>
          )}
        </div>

        {/* Save and Ask Teacher actions */}
        <div className="mt-3 flex items-center gap-2">
          <Button
            size="sm"
            variant={savedQuestions[currentIndex] ? 'primary' : 'ghost'}
            className={savedQuestions[currentIndex] ? '' : 'border-gray-600 text-gray-300 hover:bg-gray-800'}
            onClick={toggleSave}
          >
            {savedQuestions[currentIndex] ? 'Yadda saxlandı' : 'Yadda saxla'}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
            onClick={() => navigate('TeacherContact', { questionId: question.id })}
          >
            Müəllimə yaz
          </Button>
        </div>
      </Card>

      {/* Numbers 1..20 grid (wrap into rows) */}
      <div className="mt-3">
        <div className="grid grid-cols-10 gap-1">
          {questions.map((_, i) => {
            const status = answerStatuses[i];
            const isCurrent = i === currentIndex;
            const base = 'w-6 h-6 rounded-md grid place-items-center text-[10px] font-bold border';
            const style = isCurrent
              ? 'bg-gray-600 text-gray-100 border-gray-500'
              : status === 'correct'
                ? 'bg-emerald-600 text-white border-emerald-700'
                : status === 'wrong'
                  ? 'bg-red-600 text-white border-red-700'
                  : 'bg-gray-800 text-gray-300 border-gray-700';
            return (
              <button
                key={i}
                className={`${base} ${style}`}
                onClick={() => setCurrentIndex(i)}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation buttons (optional) */}
      <div className="mt-3 flex items-center justify-between">
        <Button size="sm" variant="ghost" className="border-gray-600 text-gray-300 hover:bg-gray-800" onClick={goPrev} disabled={currentIndex === 0}>
          Geri
        </Button>
        <Button size="sm" variant="ghost" className="border-gray-600 text-gray-300 hover:bg-gray-800" onClick={goNext} disabled={currentIndex === questions.length - 1}>
          Sonrakı
        </Button>
      </div>
    </div>
  );
}

