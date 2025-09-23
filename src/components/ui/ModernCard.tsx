import React, { ReactNode } from 'react';
import { useApp } from '../../contexts/AppContext';

interface ModernCardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass' | 'gradient';
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  border?: boolean;
  hover?: boolean;
  glow?: boolean;
  gradient?: {
    from: string;
    to: string;
    direction?: 'r' | 'br' | 'b' | 'bl' | 'l' | 'tl' | 't' | 'tr';
  };
}

export function ModernCard({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  rounded = 'xl',
  shadow = 'md',
  border = false,
  hover = false,
  glow = false,
  gradient
}: ModernCardProps) {
  const { isDarkMode } = useApp();
  
  const baseClasses = 'transition-all duration-300 relative overflow-hidden';
  
  const paddingClasses = {
    none: '',
    xs: 'p-2',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };

  const roundedClasses = {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    xl: 'rounded-2xl',
    '2xl': 'rounded-3xl',
    '3xl': 'rounded-[2rem]'
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl'
  };

  const hoverClasses = hover ? 'hover:scale-[1.02] hover:shadow-xl cursor-pointer' : '';
  
  const variantClasses = {
    default: isDarkMode
      ? 'bg-gray-800/80 backdrop-blur-sm'
      : 'bg-white/80 backdrop-blur-sm',
      
    elevated: isDarkMode
      ? 'bg-gray-800/90 backdrop-blur-md shadow-2xl border border-gray-700/50'
      : 'bg-white/90 backdrop-blur-md shadow-2xl border border-gray-200/50',
      
    outlined: isDarkMode
      ? 'bg-transparent border-2 border-gray-700 hover:border-gray-600'
      : 'bg-transparent border-2 border-gray-200 hover:border-gray-300',
      
    glass: isDarkMode
      ? 'bg-gray-900/20 backdrop-blur-xl border border-gray-700/30 shadow-xl'
      : 'bg-white/20 backdrop-blur-xl border border-gray-200/30 shadow-xl',
      
    gradient: gradient
      ? `bg-gradient-to-${gradient.direction || 'br'} from-${gradient.from} to-${gradient.to} text-white shadow-xl`
      : isDarkMode
        ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50'
        : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200/50'
  };

  const borderClasses = border
    ? isDarkMode
      ? 'border border-gray-700/50'
      : 'border border-gray-200/50'
    : '';

  const glowClasses = glow && !isDarkMode
    ? 'shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/20'
    : '';

  return (
    <div
      className={`${baseClasses} ${paddingClasses[padding]} ${roundedClasses[rounded]} ${shadowClasses[shadow]} ${variantClasses[variant]} ${borderClasses} ${hoverClasses} ${glowClasses} ${className}`}
    >
      {/* Subtle inner glow effect */}
      {variant === 'glass' && (
        <div className={`absolute inset-0 ${roundedClasses[rounded]} bg-gradient-to-br from-white/5 to-transparent pointer-events-none`}></div>
      )}
      
      {/* Hover overlay */}
      {hover && (
        <div className={`absolute inset-0 ${roundedClasses[rounded]} bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}