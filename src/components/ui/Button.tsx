import React, { ReactNode } from 'react';
import { useApp } from '../../contexts/AppContext';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  loading?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export function Button({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  icon,
  fullWidth = false
}: ButtonProps) {
  const { isDarkMode } = useApp();
  const baseClasses = 'font-semibold rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 relative overflow-hidden group button-press comfort-hover high-contrast-text';
  
  const sizeClasses = {
    sm: 'px-4 py-2.5 text-sm min-h-[40px]',
    md: 'px-6 py-3.5 text-sm min-h-[48px]',
    lg: 'px-8 py-4 text-base min-h-[56px]',
    xl: 'px-10 py-5 text-lg min-h-[64px]'
  };
  
  const variantClasses = {
    primary: disabled || loading
      ? isDarkMode
        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl focus:ring-emerald-500/20',
    secondary: disabled || loading
      ? isDarkMode
        ? 'bg-gray-800 text-gray-600 cursor-not-allowed border-2 border-gray-700'
        : 'bg-gray-100 text-gray-500 cursor-not-allowed border-2 border-gray-200'
      : isDarkMode
        ? 'bg-gray-800/80 border-2 border-gray-600 text-gray-100 hover:bg-gray-700/80 hover:border-gray-500 focus:ring-gray-500/20 backdrop-blur-sm'
        : 'bg-white/80 border-2 border-gray-300 text-gray-900 hover:bg-gray-50/80 hover:border-gray-400 focus:ring-gray-500/20 backdrop-blur-sm shadow-md hover:shadow-lg',
    ghost: disabled || loading
      ? isDarkMode
        ? 'bg-transparent border-2 border-gray-700 text-gray-600 cursor-not-allowed'
        : 'bg-transparent border-2 border-gray-300 text-gray-500 cursor-not-allowed'
      : isDarkMode
        ? 'bg-transparent border-2 border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:border-gray-500 focus:ring-gray-500/20'
        : 'bg-transparent border-2 border-gray-300 text-gray-700 hover:bg-gray-50/50 hover:border-gray-400 focus:ring-gray-500/20',
    danger: disabled || loading
      ? isDarkMode
        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl focus:ring-red-500/20',
    success: disabled || loading
      ? isDarkMode
        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl focus:ring-green-500/20'
  };
  
  const isDisabled = disabled || loading;
  
  return (
    <button
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className} ${
        fullWidth ? 'w-full' : ''
      } ${
        !isDisabled ? 'transform hover:scale-[1.02] active:scale-[0.98]' : ''
      } ${isDarkMode ? 'focus:ring-offset-gray-900' : 'focus:ring-offset-white'}`}
    >
      {/* Hover overlay effect */}
      {!isDisabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
      
      <div className="relative flex items-center justify-center gap-2">
        {loading && (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        )}
        {!loading && icon && <span>{icon}</span>}
        <span>{children}</span>
      </div>
    </button>
  );
}