import React, { ReactNode } from 'react';
import { useApp } from '../../contexts/AppContext';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
}

export function Card({ 
  children, 
  className = '', 
  onClick,
  variant = 'default',
  padding = 'md',
  hover = true 
}: CardProps) {
  const { isDarkMode } = useApp();
  
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };
  
  const variantClasses = {
    default: `comfort-surface text-comfort-primary ${
      isDarkMode 
        ? 'shadow-xl' 
        : 'shadow-lg'
    }`,
    elevated: isDarkMode
      ? 'bg-gray-800/90 border-gray-700/30 text-gray-100 shadow-2xl'
      : 'bg-white border-gray-200/30 text-gray-900 shadow-2xl',
    outlined: isDarkMode
      ? 'bg-transparent border-2 border-gray-600/60 text-gray-100 hover:border-gray-500'
      : 'bg-transparent border-2 border-gray-300/60 text-gray-900 hover:border-gray-400',
    glass: 'glass-comfort text-comfort-primary'
  };
  
  const hoverClasses = hover ? (onClick ? 
    'comfort-hover cursor-pointer transform focus-ring' : 
    'comfort-hover transform'
  ) : '';
  
  return (
    <div 
      onClick={onClick} 
      className={`rounded-2xl border transition-all duration-300 group relative ${paddingClasses[padding]} ${variantClasses[variant]} ${hoverClasses} ${className}`}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {/* Subtle hover effect overlay */}
      {hover && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}