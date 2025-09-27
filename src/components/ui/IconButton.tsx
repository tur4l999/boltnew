import React, { ReactNode } from 'react';
import { useApp } from '../../contexts/AppContext';

interface IconButtonProps {
  children: ReactNode;
  onClick?: () => void;
  label: string;
  className?: string;
}

export function IconButton({ children, onClick, label, className = '' }: IconButtonProps) {
  const { isDarkMode } = useApp();
  
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`w-10 h-10 rounded-xl border flex items-center justify-center text-base button-press comfort-hover focus-ring transition-all duration-200 ${
        isDarkMode 
          ? 'border-gray-600/40 bg-gray-700/30 hover:bg-gray-600/40 text-gray-200 hover:border-gray-500/60' 
          : 'border-gray-300/40 bg-gray-50/30 hover:bg-gray-100/40 text-gray-700 hover:border-gray-400/60'
      } ${className} backdrop-blur-sm shadow-sm hover:shadow-md`}
    >
      {children}
    </button>
  );
}