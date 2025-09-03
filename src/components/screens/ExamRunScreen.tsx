import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../contexts/AppContext';
// import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { SAMPLE_QUESTIONS } from '../../lib/data';
import { mistakesStore } from '../../lib/mistakesStore';
import { formatTime, showToast } from '../../lib/utils';

export function ExamRunScreen() {
  const { navigate, currentScreen, isDarkMode, goBack } = useApp();
  const { config } = currentScreen.params || {};
  const runMode: string | undefined = config?.mode;
  const isQuickTest = runMode === 'ticket';
  const questionCount: number = (config?.questionCount ?? config?.questionsCount) ?? 20;
  const ticketNumber: number | undefined = config?.ticketNumber ?? 1;
  const startInQuestion: boolean = config?.startInQuestion ?? false;
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15:00 format
  const [currentIndex, setCurrentIndex] = useState(0);
  // Selected option per question (not yet confirmed)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string | undefined>>({});
  // Outcome per question after confirmation: 'correct' | 'wrong'
  const [outcomes, setOutcomes] = useState<Record<string, 'correct' | 'wrong' | undefined>>({});
  const [view, setView] = useState<'grid' | 'question'>(startInQuestion ? 'question' : 'grid');
  // Center overlay state
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayText, setOverlayText] = useState<'Cavab doğrudur' | 'Cavab yanlışdır' | ''>('');
  const [finalState, setFinalState] = useState<'pass' | 'fail' | null>(null);
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});
  const touchStartXRef = useRef<number | null>(null);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportText, setReportText] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);

  function truncateText(text: string, maxChars: number): string {
    if (!text) return '';
    return text.length > maxChars ? text.slice(0, maxChars - 1) + '…' : text;
  }
  
  // Create questions by repeating sample questions to match desired count
  const questions = Array.from({ length: questionCount }, (_, i) => ({
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
      if (currentlySelected === optionId) {
        const updated = { ...prev };
        delete updated[currentQuestion.id];
        return updated;
      }
      return { ...prev, [currentQuestion.id]: optionId };
    });
    if (isQuickTest) {
      // Auto-confirm for quick test mode
      const isCorrect = optionId === currentQuestion.correctOptionId;
      const outcome: 'correct' | 'wrong' = isCorrect ? 'correct' : 'wrong';
      setOutcomes(prev => ({ ...prev, [currentQuestion.id]: outcome }));
      setOverlayText(isCorrect ? 'Cavab doğrudur' : 'Cavab yanlışdır');
      setShowOverlay(true);
      setTimeout(() => setShowOverlay(false), 500);
    }
  }

  function openQuestion(index: number) {
    setCurrentIndex(index);
    setView('question');
    // Do not keep previous temporary selections when opening a question
    setSelectedOptions({});
    setReportOpen(false);
    setReportText('');
    setShowExplanation(false);
  }

  function toggleBookmark(questionId: string) {
    setBookmarks(prev => ({ ...prev, [questionId]: !prev[questionId] }));
    const nowBookmarked = !bookmarks[questionId];
    showToast(nowBookmarked ? 'Sual yadda saxlanıldı' : 'Yadda saxlananlardan çıxarıldı');
  }

  function reportIssue(questionId: string) {
    showToast('Problem göndərildi. Təşəkkürlər!');
  }

  function askTeacher(questionId: string) {
    const q = questions.find(x => x.id === questionId);
    const draft = `Bilet ${ticketNumber ?? ''} • Sual ${currentIndex + 1}: ${q?.text}`;
    navigate('TeacherContact', { draftQuestion: draft });
  }

  function goPrev() {
    setCurrentIndex(idx => Math.max(0, idx - 1));
    setSelectedOptions({});
    setReportOpen(false);
    setReportText('');
    setShowExplanation(false);
  }

  function goNext() {
    setCurrentIndex(idx => Math.min(questions.length - 1, idx + 1));
    setSelectedOptions({});
    setReportOpen(false);
    setReportText('');
    setShowExplanation(false);
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
    if (!isCorrect) setShowExplanation(true);

    // Show overlay result in center for 0.5s then go back to grid
    setOverlayText(isCorrect ? 'Cavab doğrudur' : 'Cavab yanlışdır');
    setShowOverlay(true);
    setTimeout(() => {
      setShowOverlay(false);
      // Stay in question view for quicker navigation
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
  const isBookmarked = !!bookmarks[currentQuestion?.id];

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
            <Button onClick={() => navigate('Results', { result: { score: Object.values(outcomes).filter(v => v === 'correct').length, total: questions.length, timeSpent: (15 * 60) - timeLeft } })} className="w-full">Nəticələr</Button>
            <Button onClick={() => navigate('Lesson', { moduleId: 'M1' })} className="w-full" variant="ghost">Dərsə Başla</Button>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="flex items-center justify-between mb-4 text-white">
        <button
          onClick={goBack}
          className="px-4 py-2 rounded-xl bg-black text-white flex items-center gap-2"
          aria-label="Geriyə"
        >
          ←
        </button>
        <div className="text-base font-black">{ticketNumber ? `Bilet ${ticketNumber}` : ''}</div>
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
                <div className="w-full h-36">
                  <img
                    src={question.imageUrl}
                    alt={`Sual ${index + 1}`}
                    className="w-full h-full object-cover object-top block"
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
          <div
            className="mt-2 rounded-xl p-4 text-white"
            onTouchStart={(e) => { touchStartXRef.current = e.changedTouches[0].clientX; }}
            onTouchEnd={(e) => {
              const startX = touchStartXRef.current;
              const endX = e.changedTouches[0].clientX;
              if (startX == null) return;
              const deltaX = endX - startX;
              const threshold = 40;
              if (deltaX < -threshold) { goNext(); }
              else if (deltaX > threshold) { goPrev(); }
              touchStartXRef.current = null;
            }}
          >
            {currentQuestion.imageUrl && (
              <div className="relative mb-3">
                <img
                  src={currentQuestion.imageUrl}
                  alt="Question visual"
                  className="w-full h-40 object-cover rounded-lg"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <button
                  onClick={() => setReportOpen(v => !v)}
                  className="absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-bold bg-black/70 text-white hover:bg-black/80 border border-white/20"
                  aria-label="Sualla bağlı problem bildir"
                >
                  ⚠️
                </button>
              </div>
            )}
            {reportOpen && (
              <div className={`mb-3 p-3 rounded-xl border ${isDarkMode ? 'bg-gray-900/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                <div className="text-xs font-bold mb-2">Sualla bağlı problem bildir</div>
                <textarea
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  placeholder="Problemi təsvir edin..."
                  className={`w-full p-2 rounded-lg border text-sm outline-none ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'}`}
                  rows={3}
                />
                <div className="mt-2 flex items-center gap-2 justify-end">
                  <button
                    onClick={() => setReportOpen(false)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${isDarkMode ? 'border-gray-700 text-gray-200 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                  >
                    Bağla
                  </button>
                  <button
                    onClick={() => { showToast('Problem göndərildi. Təşəkkürlər!'); setReportOpen(false); setReportText(''); }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Göndər
                  </button>
                </div>
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
                  optionClasses = 'border-gray-500 bg-gray-800';
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

            {/* Explanation toggle */}
            <div className="mt-3 mb-2">
              <button
                onClick={() => setShowExplanation(v => !v)}
                className="px-3 py-2 rounded-xl border border-gray-700 text-white text-xs font-bold hover:bg-gray-800"
              >
                İzah
              </button>
            </div>

            {(showExplanation || (isConfirmed && currentOutcome === 'wrong')) && (
              <div className={`mt-2 p-3 rounded-xl border ${isDarkMode ? 'bg-gray-900/60 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                {currentOutcome === 'wrong' && (
                  <div className="text-sm font-bold mb-1 text-emerald-400">
                    Düzgün cavab: {currentQuestion.options.find(o => o.id === currentQuestion.correctOptionId)?.text}
                  </div>
                )}
                <div className="text-sm text-white/90">{currentQuestion.explanation}</div>
              </div>
            )}

            {/* Actions row */}
            <div className="mt-4 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleBookmark(currentQuestion.id)}
                  className={`px-3 py-2 rounded-xl border text-xs font-bold ${isBookmarked ? 'border-yellow-400 bg-yellow-900/30 text-yellow-200' : 'border-gray-700 text-white hover:bg-gray-800'}`}
                >
                  {isBookmarked ? '★ Yadda saxlanıldı' : '☆ Yadda saxla'}
                </button>
                <button
                  onClick={() => askTeacher(currentQuestion.id)}
                  className="px-3 py-2 rounded-xl border border-gray-700 text-white text-xs font-bold hover:bg-gray-800"
                >
                  👨‍🏫 Müəllimə soruş
                </button>
              </div>
              <div className="flex items-center gap-2">
                {!isQuickTest && (
                  <>
                    <Button variant="ghost" onClick={goPrev} disabled={currentIndex === 0}>← Geri</Button>
                    {!isConfirmed && selectedOptions[currentQuestion.id] && (
                      <Button onClick={confirmAnswer}>Təsdiq et</Button>
                    )}
                    <Button variant="ghost" onClick={goNext} disabled={currentIndex === questions.length - 1}>İrəli →</Button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Numeric navigation (only in question view) */}
          <div className="mt-4 grid grid-cols-8 gap-1">
            {questions.map((q, idx) => {
              const status = outcomes[q.id];
              const isActive = idx === currentIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setSelectedOptions({});
                  }}
                  className={`h-8 rounded-md text-xs font-bold transition-colors ${
                    isActive
                      ? 'bg-gray-600 text-white'
                      : status === 'correct'
                        ? 'bg-emerald-600 text-white'
                        : status === 'wrong'
                          ? 'bg-red-600 text-white'
                          : 'bg-transparent border border-gray-700 text-white'
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
            overlayText === 'Cavab doğrudur'
              ? 'bg-emerald-600 text-white'
              : 'bg-red-600 text-white'
          }`}>{overlayText}</div>
        )}
      </div>

      {/* Persistent timer bubble - top right for quick test */}
      <div className="fixed top-16 right-4 select-none z-50">
        <div className="px-3 py-1.5 rounded-lg bg-white text-black text-base font-bold tracking-widest shadow-lg/50 shadow-black">
          {formatTime(timeLeft)}
        </div>
      </div>
    </div>
  );
}