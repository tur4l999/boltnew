import React, { ReactNode } from 'react';
import { useApp } from '../../contexts/AppContext';

interface ButtonRedesignedProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  loading?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
  glow?: boolean;
}

export function ButtonRedesigned({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  icon,
  fullWidth = false,
  glow = false
}: ButtonRedesignedProps) {
  const { isDarkMode } = useApp();
  
  const baseClasses = `button-modern relative overflow-hidden group ${
    fullWidth ? 'w-full' : ''
  } ${glow ? 'animate-glow-modern' : ''}`;
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm min-h-[40px]',
    md: 'px-6 py-3 text-base min-h-[48px]',
    lg: 'px-8 py-4 text-lg min-h-[56px]',
    xl: 'px-10 py-5 text-xl min-h-[64px]'
  };
  
  const variantClasses = {
    primary: disabled || loading
      ? isDarkMode
        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg',
    
    secondary: disabled || loading
      ? isDarkMode
        ? 'bg-gray-800 text-gray-600 cursor-not-allowed border border-gray-700'
        : 'bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-200'
      : 'glass-modern text-primary border-2',
    
    ghost: disabled || loading
      ? 'bg-transparent text-gray-500 cursor-not-allowed'
      : 'bg-transparent text-primary hover:bg-gray-100/50 dark:hover:bg-gray-800/50',
    
    danger: disabled || loading
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg',
    
    success: disabled || loading
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg',
    
    gradient: disabled || loading
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg'
  };
  
  const isDisabled = disabled || loading;
  
  return (
    <button
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      aria-disabled={isDisabled}
    >
      {/* Shine Effect */}
      {!isDisabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
      )}
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center gap-3">
        {loading && (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        )}
        {!loading && icon && <span className="group-hover:scale-110 transition-transform duration-200">{icon}</span>}
        <span className="font-semibold">{children}</span>
      </div>
    </button>
  );
}