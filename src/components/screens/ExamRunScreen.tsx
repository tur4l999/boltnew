import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { SAMPLE_QUESTIONS } from '../../lib/data';
import { mistakesStore } from '../../lib/mistakesStore';
import { formatTime } from '../../lib/utils';

export function ExamRunScreen() {
  const { t, navigate, currentScreen } = useApp();
  const { config } = currentScreen.params;
  const [timeLeft, setTimeLeft] = useState(config.questionsCount * 30);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  const questions = SAMPLE_QUESTIONS.slice(0, Math.min(config.questionsCount, SAMPLE_QUESTIONS.length));
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

  function nextQuestion() {
    setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1));
  }

  function prevQuestion() {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  }

  function finishExam() {
    const score = questions.reduce((acc, q) => 
      acc + (answers[q.id] === q.correctOptionId ? 1 : 0), 0
    );
    
    // Save mistakes
    questions.forEach(q => {
      if (answers[q.id] !== q.correctOptionId) {
        mistakesStore.add(q.id);
      }
    });
    
    navigate('Results', { 
      result: { score, total: questions.length, timeSpent: (config.questionsCount * 30) - timeLeft }
    });
  }

  return (
    <div className="p-3 pb-24">
      <Card className="mb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span>⏱️</span>
            <span>{t.timeLeft}: {formatTime(timeLeft)}</span>
          </div>
          <div className="text-sm text-gray-700">
            {currentIndex + 1}/{questions.length}
          </div>
        </div>
      </Card>
      
      <Card>
        <div className="font-bold mb-3 text-gray-900">
          {currentQuestion.text}
        </div>
        {currentQuestion.imageUrl && (
          <img 
            src={currentQuestion.imageUrl} 
            alt="Question visual"
            className="w-full h-40 object-cover rounded-lg mb-3"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        )}
        <div className="space-y-2">
          {currentQuestion.options.map((option) => (
            <label
              key={option.id}
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer min-h-[44px] ${
                answers[currentQuestion.id] === option.id
                  ? 'border-emerald-600 bg-gray-50'
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
              <span className="text-sm text-gray-700">{option.text}</span>
            </label>
          ))}
        </div>
        
        <div className="flex items-center gap-2 mt-4">
          <Button
            onClick={prevQuestion}
            disabled={currentIndex === 0}
            variant="ghost"
          >
            {t.prev}
          </Button>
          
          {currentIndex < questions.length - 1 ? (
            <Button 
              onClick={nextQuestion} 
              disabled={!answers[currentQuestion.id]}
            >
              {t.next}
            </Button>
          ) : (
            <Button 
              onClick={finishExam} 
              disabled={!answers[currentQuestion.id]}
            >
              {t.finish}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}