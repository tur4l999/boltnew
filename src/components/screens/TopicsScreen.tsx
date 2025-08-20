import React, { useState, useMemo } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Progress } from '../ui/Progress';
import { MODULES } from '../../lib/data';

export function TopicsScreen() {
  const { t, navigate, isModuleUnlocked, hasActivePackage } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredModules = useMemo(
    () => MODULES.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery]
  );

  const handleModuleClick = (module: any) => {
    if (isModuleUnlocked(module.id)) {
      navigate('Lesson', { moduleId: module.id });
    } else {
      alert('Bu mövzu üçün aktiv paket lazımdır. Paket almaq üçün mağazaya keçin.');
    }
  };

  return (
    <>
    <div className="p-3 pb-24">
      {/* Package Status */}
      {!hasActivePackage() && (
        <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <span className="text-blue-600 text-xs">📦</span>
          </div>
          <div className="flex-1">
            <div className="text-blue-900 text-xs font-medium">
              Paket alın və bütün təlimləri açın
            </div>
          </div>
          <button
            onClick={() => navigate('Packages')}
            className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium hover:bg-blue-700 transition-colors min-h-[24px]"
          >
            Paket al
          </button>
        </div>
      )}

      {hasActivePackage() && (
        <div className="mb-3 p-3 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <span className="text-emerald-600 text-xs">🔓</span>
          </div>
          <div className="flex-1">
            <div className="text-emerald-900 text-xs font-medium">
              Bütün təlimlər açıq - {useApp().activePackage?.name}
            </div>
            <div className="text-emerald-700 text-xs">
              Bitmə tarixi: {useApp().activePackage?.expiryDate.toLocaleDateString('az-AZ')}
            </div>
          </div>
          <div className="text-emerald-600 text-sm">
            ✨
          </div>
        </div>
      )}

      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={t.filterByTopic}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none text-sm min-h-[44px] mb-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
      />
      <div className="space-y-2">
        {filteredModules.map((module) => (
          <Card key={module.id} className={!isModuleUnlocked(module.id) ? 'opacity-60' : ''}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {!isModuleUnlocked(module.id) && (
                  <span className="text-gray-400 text-lg">🔒</span>
                )}
                <div>
                <div className="font-bold text-gray-900 text-sm">{module.title}</div>
                <div className="text-xs text-gray-500">
                  {t.progress}: {module.progress}%
                </div>
                </div>
              </div>
              <Button 
                onClick={() => handleModuleClick(module)}
                disabled={!isModuleUnlocked(module.id)}
                size="sm"
              >
                {isModuleUnlocked(module.id) ? t.startLesson : 'Kilidli'}
              </Button>
            </div>
            <Progress value={isModuleUnlocked(module.id) ? module.progress : 0} />
          </Card>
        ))}
      </div>
    </div>
    </>
  );
}