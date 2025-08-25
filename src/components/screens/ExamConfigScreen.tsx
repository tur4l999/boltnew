import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export function ExamConfigScreen() {
  const { t, navigate, isDarkMode } = useApp();

  return (
    <div className={`p-3 pb-24 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <Card>
        <div className="space-y-3">
          <Button 
            onClick={() => navigate('ExamRun', { config: { mode: 'simulator', questionsCount: 10 } })}
            className="w-full rounded-full"
            size="lg"
          >
            ✏️ imtahan simulyatoru
          </Button>
          <Button 
            onClick={() => navigate('ExamRun', { config: { mode: 'final', questionsCount: 20 } })}
            className="w-full"
            variant="secondary"
          >
            📋 Yekun imtahan
          </Button>
        </div>
      </Card>
    </div>
  );
}