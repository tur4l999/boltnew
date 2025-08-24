import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';

type ExamTabKey = 'byTickets' | 'byTopics' | 'exam';

export function ExamScreen() {
  const { isDarkMode, t } = useApp();
  const [activeTab, setActiveTab] = useState<ExamTabKey>('byTickets');

  return (
    <div className={`p-3 pb-20 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className={`rounded-xl overflow-hidden border mb-3 transition-colors duration-200 ${
        isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
      }`}>
        <div className="grid grid-cols-3">
          <button
            onClick={() => setActiveTab('byTickets')}
            className={`py-2 text-xs font-bold ${
              activeTab === 'byTickets'
                ? 'text-emerald-600 border-b-2 border-emerald-600'
                : 'text-gray-500'
            }`}
          >
            {t.byTickets ?? 'Biletlər üzrə'}
          </button>
          <button
            onClick={() => setActiveTab('byTopics')}
            className={`py-2 text-xs font-bold ${
              activeTab === 'byTopics'
                ? 'text-emerald-600 border-b-2 border-emerald-600'
                : 'text-gray-500'
            }`}
          >
            {t.byTopics ?? 'Mövzular üzrə'}
          </button>
          <button
            onClick={() => setActiveTab('exam')}
            className={`py-2 text-xs font-bold ${
              activeTab === 'exam'
                ? 'text-emerald-600 border-b-2 border-emerald-600'
                : 'text-gray-500'
            }`}
          >
            {t.exam}
          </button>
        </div>
      </div>

      {activeTab === 'byTickets' && (
        <div className="space-y-2">
          {Array.from({ length: 20 }, (_, idx) => (
            <div
              key={idx}
              className={`rounded-lg border p-3 text-sm flex items-center justify-between transition-colors duration-200 ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <div className="font-bold">Bilet {idx + 1}</div>
              <div className="text-gray-500">0/20</div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'byTopics' && (
        <div className="space-y-2">
          {Array.from({ length: 10 }, (_, idx) => (
            <div
              key={idx}
              className={`rounded-lg border p-3 text-sm flex items-center justify-between transition-colors duration-200 ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <div className="font-bold">Mövzu {idx + 1}</div>
              <div className="text-gray-500">0/20</div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'exam' && (
        <div className={`rounded-xl border p-4 text-sm transition-colors duration-200 ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="text-xs text-gray-500 mb-2">{t.examSimulator}</div>
          <div className="font-bold mb-2">Standart rejim • 20 sual • 20 dəq</div>
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg py-2 text-sm font-bold">
            {t.startExam}
          </button>
        </div>
      )}
    </div>
  );
}

