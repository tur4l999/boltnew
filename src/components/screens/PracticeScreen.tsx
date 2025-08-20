import React from 'react';
import { PracticeInline } from '../practice/PracticeInline';

export function PracticeScreen() {
  const { isDarkMode } = useApp();
  
  return (
    <div className={`p-3 pb-24 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <PracticeInline />
    </div>
  );
}