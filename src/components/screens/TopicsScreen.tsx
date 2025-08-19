import React, { useState, useMemo } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Progress } from '../ui/Progress';
import { MODULES } from '../../lib/data';

export function TopicsScreen() {
  const { t, navigate } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredModules = useMemo(
    () => MODULES.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery]
  );

  return (
    <div className="p-3 pb-24">
      {/* Package Notification - Small */}
      <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
          <span className="text-blue-600 text-xs">📦</span>
        </div>
        <div className="flex-1">
          <div className="text-blue-900 text-xs font-medium">
            Aktiv paketiniz yoxdur
          </div>
        </div>
        <button
          onClick={() => navigate('Packages')}
          className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium hover:bg-blue-700 transition-colors min-h-[24px]"
        >
          Paket al
        </button>
      </div>

      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={t.filterByTopic}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none text-sm min-h-[44px] mb-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
      />
      <div className="space-y-2">
        {filteredModules.map((module) => (
          <Card key={module.id}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-bold text-gray-900 text-sm">{module.title}</div>
                <div className="text-xs text-gray-500">
                  {t.progress}: {module.progress}%
                </div>
              </div>
              <Button 
                onClick={() => navigate('Lesson', { moduleId: module.id })}
                size="sm"
              >
                {t.startLesson}
              </Button>
            </div>
            <Progress value={module.progress} />
          </Card>
        ))}
      </div>
    </div>
  );
}