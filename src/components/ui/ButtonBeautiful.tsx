import React, { ReactNode } from 'react';
import { useApp } from '../../contexts/AppContext';

interface ButtonBeautifulProps {
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
  ripple?: boolean;
}

export function ButtonBeautiful({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  icon,
  fullWidth = false,
  glow = false,
  ripple = true
}: ButtonBeautifulProps) {
  const { isDarkMode } = useApp();
  
  const baseClasses = `beautiful-button beautiful-focus ${
    fullWidth ? 'w-full' : ''
  } ${ripple ? 'beautiful-ripple' : ''} ${glow ? 'animate-glow-beautiful' : ''}`;
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm min-h-[36px]',
    md: 'px-6 py-3 text-base min-h-[48px]',
    lg: 'px-8 py-4 text-lg min-h-[56px]',
    xl: 'px-10 py-5 text-xl min-h-[64px]'
  };
  
  const variantClasses = {
    primary: disabled || loading
      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
      : 'beautiful-button-primary',
    
    secondary: disabled || loading
      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
      : 'beautiful-button-secondary',
    
    ghost: disabled || loading
      ? 'bg-transparent text-gray-400 cursor-not-allowed'
      : 'bg-transparent beautiful-text-primary hover:bg-gray-100/50 dark:hover:bg-gray-800/50',
    
    danger: disabled || loading
      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
      : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg beautiful-hover-lift',
    
    success: disabled || loading
      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
      : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg beautiful-hover-lift',
    
    gradient: disabled || loading
      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
      : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg beautiful-hover-lift'
  };
  
  const isDisabled = disabled || loading;
  
  return (
    <button
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      aria-disabled={isDisabled}
    >
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center gap-3">
        {loading && (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        )}
        {!loading && icon && (
          <span className="transition-transform duration-200 group-hover:scale-110">{icon}</span>
        )}
        <span className="font-semibold">{children}</span>
      </div>
    </button>
  );
}