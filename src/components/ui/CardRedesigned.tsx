import React, { ReactNode } from 'react';
import { useApp } from '../../contexts/AppContext';

interface CardRedesignedProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'glass' | 'elevated' | 'outlined' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  glow?: boolean;
}

export function CardRedesigned({ 
  children, 
  className = '', 
  onClick,
  variant = 'default',
  size = 'md',
  hover = true,
  glow = false
}: CardRedesignedProps) {
  const { isDarkMode } = useApp();
  
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };
  
  const variantClasses = {
    default: 'surface-comfort',
    glass: 'glass-modern',
    elevated: isDarkMode
      ? 'bg-gray-800/90 border border-gray-700/50 shadow-2xl'
      : 'bg-white border border-gray-200/50 shadow-2xl',
    outlined: isDarkMode
      ? 'bg-transparent border-2 border-gray-600/60 text-gray-100'
      : 'bg-transparent border-2 border-gray-300/60 text-gray-900',
    gradient: isDarkMode
      ? 'bg-gradient-to-br from-gray-800/80 to-slate-800/80 border border-gray-700/50'
      : 'bg-gradient-to-br from-white/80 to-gray-50/80 border border-gray-200/50'
  };
  
  const interactionClasses = hover && onClick ? 'interactive-modern card-modern-hover cursor-pointer' : 
                             hover ? 'card-modern-hover' : '';
  
  const glowClass = glow ? 'animate-glow-modern' : '';
  
  return (
    <div 
      onClick={onClick} 
      className={`card-modern ${sizeClasses[size]} ${variantClasses[variant]} ${interactionClasses} ${glowClass} ${className} group`}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {/* Hover Effect Overlay */}
      {hover && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}