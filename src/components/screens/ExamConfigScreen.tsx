import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export function ExamConfigScreen() {
  const { t, navigate } = useApp();
  const [examMode, setExamMode] = useState('mixed');
  const [questionCount, setQuestionCount] = useState(5);

  return (
    <div className="p-3 pb-24">
      <Card>
        <div className="font-bold mb-3 text-gray-900">{t.examSettings}</div>
        <div className="space-y-4">
          <div>
            <div className="text-xs text-gray-500 mb-2">{t.topic}</div>
            <div className="flex gap-2">
              <button
                onClick={() => setExamMode('mixed')}
                className={`px-3 py-2 rounded-lg text-sm border min-h-[36px] ${
                  examMode === 'mixed'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-gray-100 text-gray-700 border-gray-300'
                }`}
              >
                {t.mixed}
              </button>
              <button
                onClick={() => setExamMode('M8')}
                className={`px-3 py-2 rounded-lg text-sm border min-h-[36px] ${
                  examMode === 'M8'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-gray-100 text-gray-700 border-gray-300'
                }`}
              >
                M8
              </button>
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-2">{t.questionsCount}</div>
            <input
              type="range"
              min={3}
              max={20}
              value={questionCount}
              onChange={(e) => setQuestionCount(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-sm mt-1 text-gray-700">{questionCount}</div>
          </div>
          <Button 
            onClick={() => navigate('ExamRun', { config: { mode: examMode, questionsCount: questionCount } })}
            className="w-full"
          >
            {t.startExam}
          </Button>
        </div>
      </Card>
    </div>
  );
}