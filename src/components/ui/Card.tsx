import React, { ReactNode } from 'react';
import { useApp } from '../../contexts/AppContext';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  const { isDarkMode } = useApp();
  
  return (
    <div className={`rounded-2-5xl p-4 border transition-all duration-200 soft-shadow hover:shadow-lg ${
      isDarkMode 
        ? 'bg-gray-800/80 border-gray-700/70' 
        : 'bg-white/80 border-white/60 backdrop-blur-xl'
    } ${className}`}>
      {children}
    </div>
  );
}