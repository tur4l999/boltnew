import React, { ReactNode, CSSProperties } from 'react';
import { useApp } from '../../contexts/AppContext';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  style?: CSSProperties;
}

export function Card({ 
  children, 
  className = '', 
  onClick,
  variant = 'default',
  padding = 'md',
  hover = true,
  style 
}: CardProps) {
  const { isDarkMode } = useApp();
  
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };
  
  const variantClasses = {
    default: isDarkMode 
      ? 'bg-gray-800/80 border-gray-700/50 text-gray-100' 
      : 'bg-white/80 border-gray-200/50 text-gray-900',
    elevated: isDarkMode
      ? 'bg-gray-800 border-gray-700 text-gray-100 shadow-xl'
      : 'bg-white border-gray-200 text-gray-900 shadow-xl',
    outlined: isDarkMode
      ? 'bg-transparent border-2 border-gray-600 text-gray-100'
      : 'bg-transparent border-2 border-gray-300 text-gray-900',
    glass: isDarkMode
      ? 'bg-gray-800/30 border-gray-600/50 text-gray-100 backdrop-blur-xl'
      : 'bg-white/30 border-gray-200/50 text-gray-900 backdrop-blur-xl'
  };
  
  const hoverClasses = hover ? (onClick ? 
    'hover:shadow-lg hover:scale-[1.02] cursor-pointer transform' : 
    'hover:shadow-md hover:scale-[1.01] transform'
  ) : '';
  
  return (
    <div 
      onClick={onClick} 
      style={style}
      className={`rounded-2xl border transition-all duration-300 group relative ${paddingClasses[padding]} ${variantClasses[variant]} ${hoverClasses} ${className}`}
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