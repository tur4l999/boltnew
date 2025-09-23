import React, { ReactNode } from 'react';
import { useApp } from '../../contexts/AppContext';
import { EmojiIcon } from './Icon';
import { LucideIcon } from 'lucide-react';

interface ModernButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  loading?: boolean;
  emoji?: string;
  icon?: LucideIcon;
  fullWidth?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  gradient?: boolean;
  glow?: boolean;
}

export function ModernButton({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  emoji,
  icon,
  fullWidth = false,
  rounded = 'xl',
  shadow = 'md',
  gradient = true,
  glow = false
}: ModernButtonProps) {
  const { isDarkMode } = useApp();
  
  const baseClasses = 'font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 relative overflow-hidden group transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:hover:scale-100';
  
  const sizeClasses = {
    xs: 'px-3 py-1.5 text-xs min-h-[28px] gap-1',
    sm: 'px-4 py-2 text-sm min-h-[36px] gap-2',
    md: 'px-6 py-3 text-sm min-h-[44px] gap-2',
    lg: 'px-8 py-4 text-base min-h-[52px] gap-3',
    xl: 'px-10 py-5 text-lg min-h-[60px] gap-3'
  };

  const roundedClasses = {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    xl: 'rounded-3xl',
    full: 'rounded-full'
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm hover:shadow-md',
    md: 'shadow-md hover:shadow-lg',
    lg: 'shadow-lg hover:shadow-xl',
    xl: 'shadow-xl hover:shadow-2xl'
  };
  
  const variantClasses = {
    primary: disabled || loading
      ? isDarkMode
        ? 'bg-gray-700 text-gray-500 cursor-not-allowed border-gray-600'
        : 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300'
      : gradient
        ? `bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white border-transparent focus:ring-emerald-500/30 ${glow ? 'shadow-emerald-500/25' : ''}`
        : isDarkMode
          ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 focus:ring-emerald-500/30'
          : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 focus:ring-emerald-500/30',
          
    secondary: disabled || loading
      ? isDarkMode
        ? 'bg-gray-800 text-gray-600 cursor-not-allowed border-gray-700'
        : 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
      : isDarkMode
        ? 'bg-gray-800/80 border-gray-600 text-gray-100 hover:bg-gray-700/80 hover:border-gray-500 focus:ring-gray-500/30 backdrop-blur-sm'
        : 'bg-white/90 border-gray-300 text-gray-900 hover:bg-gray-50/90 hover:border-gray-400 focus:ring-gray-500/30 backdrop-blur-sm',
        
    outline: disabled || loading
      ? isDarkMode
        ? 'bg-transparent border-gray-700 text-gray-600 cursor-not-allowed'
        : 'bg-transparent border-gray-300 text-gray-400 cursor-not-allowed'
      : isDarkMode
        ? 'bg-transparent border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 focus:ring-emerald-500/30'
        : 'bg-transparent border-emerald-500 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 focus:ring-emerald-500/30',
        
    ghost: disabled || loading
      ? isDarkMode
        ? 'bg-transparent text-gray-600 cursor-not-allowed'
        : 'bg-transparent text-gray-400 cursor-not-allowed'
      : isDarkMode
        ? 'bg-transparent text-gray-300 hover:bg-gray-800/50 focus:ring-gray-500/30'
        : 'bg-transparent text-gray-700 hover:bg-gray-100/50 focus:ring-gray-500/30',
        
    danger: disabled || loading
      ? isDarkMode
        ? 'bg-gray-700 text-gray-500 cursor-not-allowed border-gray-600'
        : 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300'
      : gradient
        ? `bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-transparent focus:ring-red-500/30 ${glow ? 'shadow-red-500/25' : ''}`
        : 'bg-red-600 hover:bg-red-700 text-white border-red-600 focus:ring-red-500/30',
        
    success: disabled || loading
      ? isDarkMode
        ? 'bg-gray-700 text-gray-500 cursor-not-allowed border-gray-600'
        : 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300'
      : gradient
        ? `bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-transparent focus:ring-green-500/30 ${glow ? 'shadow-green-500/25' : ''}`
        : 'bg-green-600 hover:bg-green-700 text-white border-green-600 focus:ring-green-500/30'
  };
  
  const isDisabled = disabled || loading;
  const hasIcon = emoji || icon;
  
  return (
    <button
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      className={`${baseClasses} ${sizeClasses[size]} ${roundedClasses[rounded]} ${shadowClasses[shadow]} ${variantClasses[variant]} ${className} ${
        fullWidth ? 'w-full' : ''
      } ${
        !isDisabled && glow ? 'hover:shadow-2xl' : ''
      } ${isDarkMode ? 'focus:ring-offset-gray-900' : 'focus:ring-offset-white'} flex items-center justify-center border`}
    >
      {/* Hover overlay effect */}
      {!isDisabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
      
      {/* Glow effect */}
      {!isDisabled && glow && (
        <div className={`absolute inset-0 ${roundedClasses[rounded]} blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-300 ${
          variant === 'primary' ? 'bg-emerald-500/50' :
          variant === 'danger' ? 'bg-red-500/50' :
          variant === 'success' ? 'bg-green-500/50' :
          'bg-gray-500/50'
        }`}></div>
      )}
      
      <div className="relative flex items-center justify-center">
        {loading && (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
        )}
        {!loading && hasIcon && (
          <div className="flex items-center justify-center">
            {emoji && <EmojiIcon emoji={emoji} size={size === 'xs' ? 'sm' : size === 'xl' ? 'lg' : 'md'} />}
            {icon && !emoji && React.createElement(icon, { 
              size: size === 'xs' ? 14 : size === 'sm' ? 16 : size === 'lg' ? 20 : size === 'xl' ? 24 : 18,
              strokeWidth: 2
            })}
          </div>
        )}
        <span className={hasIcon && !loading ? (size === 'xs' ? 'ml-1' : 'ml-2') : ''}>{children}</span>
      </div>
    </button>
  );
}