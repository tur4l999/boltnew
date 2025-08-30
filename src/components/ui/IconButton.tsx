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
      className={`w-9 h-9 rounded-full border flex items-center justify-center text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 active:scale-95 ${
        isDarkMode 
          ? 'border-gray-600 bg-gray-800/70 hover:bg-gray-700 text-gray-200' 
          : 'border-gray-200 bg-white/70 hover:bg-gray-100 text-gray-700 backdrop-blur'
      } ${className}`}
    >
      {children}
    </button>
  );
}