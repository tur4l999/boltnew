import React, { useMemo } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Progress } from '../ui/Progress';

export function HomeScreen() {
  const { t, navigate } = useApp();
  
  const gridItems = [
    { key: 'video', label: t.videoLessons, action: () => navigate('Lesson', { moduleId: 'M8' }), emoji: '🎬' },
    { key: 'quick', label: t.quickTest, action: () => navigate('Practice'), emoji: '📝' },
    { key: 'topics', label: t.topics, action: () => navigate('Topics'), emoji: '📚' },
    { key: 'exam', label: t.exam, action: () => navigate('ExamConfig'), emoji: '🧪' },
    { key: 'mistakes', label: t.mistakes, action: () => navigate('Mistakes'), emoji: '⚠️' },
    { key: 'practical', label: 'Praktiki təcrübə', action: () => alert('Demo feature'), emoji: '💬' },
  ];
  
  const rows = useMemo(() => {
    const result = [];
    for (let i = 0; i < gridItems.length; i += 2) {
      result.push(gridItems.slice(i, i + 2));
    }
    return result;
  }, [gridItems]);

  return (
    <div className="p-3 pb-24">
      {/* Progress Card */}
      <Card className="mb-3">
        <div className="text-xs text-gray-500 mb-2">{t.progress}</div>
        <Progress value={42} />
        <div className="text-xs mt-2 text-gray-700">
          {t.continue} → <span className="font-bold">M8: Yol nişanları</span>
        </div>
      </Card>

      {/* Grid Layout */}
      <div className="space-y-2">
        {rows.map((row, idx) => (
          <div key={idx} className="grid grid-cols-2 gap-2">
            {row.map((item) => (
              <button
                key={item.key}
                onClick={item.action}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex items-center gap-3 hover:bg-gray-50 transition-colors min-h-[44px]"
              >
                <div className="w-10 h-10 rounded-lg bg-gray-50 text-emerald-600 flex items-center justify-center text-lg">
                  {item.emoji}
                </div>
                <div className="text-left font-bold text-gray-700 text-sm leading-tight">
                  {item.label}
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Tutorial Card */}
      <button
        onClick={() => alert("Tətbiqdən Necə İstifadə Edilir")}
        className="w-full h-36 rounded-2xl p-4 flex items-end justify-end mt-3 bg-gradient-to-br from-emerald-600 via-green-500 to-emerald-700 text-white font-black relative overflow-hidden"
      >
        <div className="absolute left-4 top-4 w-12 h-12 rounded-full bg-white/25 border border-white/35 flex items-center justify-center">
          <span className="text-white text-base">▶</span>
        </div>
        <span className="text-base">Tətbiqdən Necə İstifadə Edilir</span>
      </button>
    </div>
  );
}