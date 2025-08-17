import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export function ExamConfigScreen() {
  const { t, navigate } = useApp();
  const [examMode, setExamMode] = useState('mixed');
  const [questionCount, setQuestionCount] = useState(10);

  return (
    <div className="p-3 pb-24">
      <Card>
        <div className="font-bold mb-3 text-gray-900">{t.examSettings}</div>
        <div className="space-y-4">
          <Button 
            onClick={() => navigate('ExamRun', { config: { mode: 'mixed', questionsCount: 10 } })}
            className="w-full"
          >
            {t.startExam}
          </Button>
        </div>
      </Card>
    </div>
  );
}