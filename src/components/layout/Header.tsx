import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { IconButton } from '../ui/IconButton';
import { showToast } from '../../lib/utils';

export function Header() {
  const { t, language, setLanguage } = useApp();
  const userName = "Tural Qarayev";
  
  return (
    <div className="sticky top-0 z-30">
      <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="px-4 py-2 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-500 text-white flex items-center justify-center font-bold text-sm">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 leading-tight">
            <div className="text-xs text-gray-500">DDA.az</div>
            <div className="text-sm font-bold text-gray-900">
              {t.hello}, {userName} 👋
            </div>
          </div>
          <IconButton
            onClick={() => showToast('📣 Push (demo): Bu gün 15 dəq məşq et!')}
            label={t.notifications}
          >
            🔔
          </IconButton>
          <IconButton
            onClick={() => showToast('🤖 AI köməkçi (demo)')}
            label={t.assistant}
          >
            🤖
          </IconButton>
          <IconButton 
            onClick={() => setLanguage(language === 'az' ? 'ru' : 'az')} 
            label={t.language}
          >
            🌐
          </IconButton>
        </div>
      </div>
    </div>
  );
}