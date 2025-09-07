import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useApp } from '../../contexts/AppContext';
// removed Card to avoid forced light backgrounds; using custom dark container
import { Button } from '../ui/Button';
import { VideoPlayer } from '../media/VideoPlayer';
import { SlideTransition } from '../ui/SlideTransition';
import { SAMPLE_QUESTIONS } from '../../lib/data';
import { mistakesStore } from '../../lib/mistakesStore';

type AnswerStatus = 'correct' | 'wrong' | null;

export function QuickTestScreen() {
  const { navigate, currentScreen, t } = useApp();
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [slideDir, setSlideDir] = useState<'left' | 'right'>('right');

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
  const [isExplanationOpen, setIsExplanationOpen] = useState<boolean>(false);
  const [explanationTab, setExplanationTab] = useState<'image' | 'video'>('image');

  // Problem report UI
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportText, setReportText] = useState('');

  // Simple timer (20:00) displayed on the right
  const [secondsLeft, setSecondsLeft] = useState(20 * 60);
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prevSeconds: number) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
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
    setSlideDir('right');
    setCurrentIndex((i: number) => Math.min(questions.length - 1, i + 1));
  }, [questions.length]);
  const goPrev = useCallback(() => {
    setSlideDir('left');
    setCurrentIndex((i: number) => Math.max(0, i - 1));
  }, []);

  const question = questions[currentIndex];
  const ticketNumber = (currentScreen?.params?.ticket as number) || 1;

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
    newShow[currentIndex] = !isCorrect; // legacy inline panel control
    setShowExplanation(newShow);
    if (!isCorrect) {
      // Open overlay centered over the question visual
      setExplanationTab(question.videoUrl ? 'video' : 'image');
      setIsExplanationOpen(true);
    }

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
      {/* Top bar: exit chip, centered title, right timer */}
      <div className="mb-4 grid grid-cols-3 items-center">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowExitConfirm(true)}
            className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold"
          >
            İmtahanı bitir
          </button>
        </div>
        <div className="text-center">
          <div className={`text-lg font-black text-gray-200`}>Bilet {ticketNumber}</div>
        </div>
        <div className="flex items-center justify-end">
          <div className="mr-4">
            <div className="px-3 py-1 rounded-lg bg-white text-black text-sm font-bold tracking-widest shadow-lg/50 shadow-black">
              {minutes}:{seconds}
            </div>
          </div>
        </div>
      </div>

      {/* Exit confirmation modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowExitConfirm(false)} />
          <div className="relative z-10 w-[90%] max-w-sm rounded-2xl p-5 shadow-xl border bg-gray-900 border-gray-700 text-gray-100">
            <div className="text-base font-bold mb-3">İmtahanı bitirmək istədiyinizdən əminsiniz?</div>
            <div className="flex items-center justify-end gap-2">
              <Button variant="ghost" className="border-gray-600 text-white hover:bg-gray-800" onClick={() => setShowExitConfirm(false)}>Bağla</Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => navigate('Exam')}>Bəli</Button>
            </div>
          </div>
        </div>
      )}

      <SlideTransition direction={slideDir} key={currentIndex}>
        <div className="rounded-xl overflow-hidden border shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02] bg-gray-900 border-gray-700 text-gray-100">
          {/* Image should complete the top frame */}
          {question.imageUrl && (
            <img
              src={question.imageUrl}
              alt="Sual şəkli"
              className="w-full h-48 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}

          <div className="p-4">
            {/* Question meta and text */}
            <div className="flex items-center justify-between mb-2">
              <div className={`text-[11px] text-gray-400`}>
                {currentIndex + 1}/20
              </div>
              <div className={`text-[11px] text-gray-400`}>
                ID {200 + (ticketNumber - 1) * 20 + (currentIndex + 1)}
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
                  className="border-gray-600 text-white hover:bg-gray-800"
                  onClick={() => {
                    setExplanationTab(question.videoUrl ? 'video' : 'image');
                    setIsExplanationOpen(true);
                  }}
                >
                  {t.explanation}
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

            {/* Save and Ask Teacher actions + report button on the right of "Müəllimə yaz" */}
            <div className="mt-3 flex items-center gap-2">
              <Button
                size="sm"
                variant={savedQuestions[currentIndex] ? 'primary' : 'ghost'}
                className={savedQuestions[currentIndex] ? 'text-white' : 'border-gray-600 text-white hover:bg-gray-800'}
                onClick={toggleSave}
              >
                {savedQuestions[currentIndex] ? 'Yadda saxlandı' : 'Yadda saxla'}
              </Button>
              <div className="relative flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="border-gray-600 text-white hover:bg-gray-800"
                  onClick={() => navigate('TeacherContact', { questionId: question.id })}
                >
                  Müəllimə yaz
                </Button>
                <button
                  onClick={() => setIsReportOpen((v) => !v)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shadow bg-gray-800/90 text-gray-200 border border-gray-700`}
                  aria-label="Problem bildir"
                >
                  ▲
                </button>
                {isReportOpen && (
                  <div
                    className={`absolute bottom-10 right-0 z-20 w-64 p-3 rounded-xl shadow-lg bg-gray-800 border border-gray-700`}
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
            </div>
          </div>
        </div>
      </SlideTransition>

      {/* Explanation overlay modal */}
      {isExplanationOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-10">
          <div className="absolute inset-0 bg-black/70" onClick={() => setIsExplanationOpen(false)} />
          <div className="relative z-10 w-[92%] max-w-md rounded-2xl overflow-hidden border bg-gray-900 border-gray-700 text-gray-100 shadow-2xl">
            {/* Tabs */}
            <div className="flex items-center justify-between px-3 pt-3">
              <div className="flex gap-1 rounded-lg p-1 bg-gray-800 border border-gray-700">
                <button
                  className={`px-3 py-1 text-sm font-bold rounded-md ${explanationTab === 'image' ? 'bg-gray-700 text-white' : 'text-gray-300'}`}
                  onClick={() => setExplanationTab('image')}
                >
                  {t.explanationImage ?? 'Şəkil'}
                </button>
                <button
                  className={`px-3 py-1 text-sm font-bold rounded-md ${explanationTab === 'video' ? 'bg-gray-700 text-white' : 'text-gray-300'} ${!question.videoUrl ? 'opacity-40 cursor-not-allowed' : ''}`}
                  onClick={() => question.videoUrl && setExplanationTab('video')}
                >
                  {t.explanationVideo ?? 'Video'}
                </button>
              </div>
              <button
                className="px-3 py-1 rounded-lg text-sm font-bold bg-gray-800 border border-gray-700 hover:bg-gray-700"
                onClick={() => setIsExplanationOpen(false)}
              >
                {t.close ?? 'Bağla'}
              </button>
            </div>

            {/* Content */}
            <div className="p-3">
              {explanationTab === 'image' && (
                <div>
                  {question.imageUrl ? (
                    <img
                      src={question.imageUrl}
                      alt="Sual şəkli"
                      className="w-full h-56 object-cover rounded-lg border border-gray-700"
                    />
                  ) : (
                    <div className="w-full h-56 grid place-items-center rounded-lg border border-gray-700 bg-gray-800 text-gray-400 text-sm">
                      Şəkil yoxdur
                    </div>
                  )}
                </div>
              )}
              {explanationTab === 'video' && (
                <div>
                  {question.videoUrl ? (
                    <VideoPlayer src={question.videoUrl} watermark="dda.az" />
                  ) : (
                    <div className="w-full h-56 grid place-items-center rounded-lg border border-gray-700 bg-gray-800 text-gray-400 text-sm">
                      Video yoxdur
                    </div>
                  )}
                </div>
              )}

              {/* Text explanation */}
              <div className="mt-3 text-sm p-2 rounded-lg text-gray-200 bg-gray-800 border border-gray-700">
                {question.explanation}
              </div>
            </div>
          </div>
        </div>
      )}

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
        <Button size="sm" variant="ghost" className="border-gray-600 text-white hover:bg-gray-800" onClick={goPrev} disabled={currentIndex === 0}>
          Geri
        </Button>
        <Button size="sm" variant="ghost" className="border-gray-600 text-white hover:bg-gray-800" onClick={goNext} disabled={currentIndex === questions.length - 1}>
          Sonrakı
        </Button>
      </div>
    </div>
  );
}

