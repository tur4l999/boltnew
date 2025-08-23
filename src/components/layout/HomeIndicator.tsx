import React from 'react';
import { useApp } from '../../contexts/AppContext';

export function HomeIndicator() {
  const { isDarkMode } = useApp();
  return (
    <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: 4 }}>
      <div className={`${isDarkMode ? 'bg-white/60' : 'bg-black/20'} rounded-full`} style={{ width: 134, height: 5 }} />
    </div>
  );
}