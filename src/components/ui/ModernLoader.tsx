import React from 'react';
import { useApp } from '../../contexts/AppContext';

interface ModernLoaderProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars' | 'ring';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  className?: string;
  text?: string;
}

export function ModernLoader({
  size = 'md',
  variant = 'spinner',
  color = 'primary',
  className = '',
  text
}: ModernLoaderProps) {
  const { isDarkMode } = useApp();

  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    primary: 'text-emerald-500',
    secondary: isDarkMode ? 'text-gray-400' : 'text-gray-600',
    success: 'text-green-500',
    danger: 'text-red-500',
    warning: 'text-yellow-500'
  };

  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const renderSpinner = () => (
    <div className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`}>
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );

  const renderDots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${size === 'xs' ? 'w-1 h-1' : size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-4 h-4' : size === 'xl' ? 'w-6 h-6' : 'w-3 h-3'} ${colorClasses[color]} rounded-full animate-bounce`}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <div className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-pulse bg-current opacity-75`} />
  );

  const renderBars = () => (
    <div className="flex space-x-1 items-end">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={`${size === 'xs' ? 'w-1' : size === 'sm' ? 'w-1.5' : size === 'lg' ? 'w-3' : size === 'xl' ? 'w-4' : 'w-2'} ${colorClasses[color]} bg-current animate-pulse`}
          style={{
            height: size === 'xs' ? '8px' : size === 'sm' ? '12px' : size === 'lg' ? '24px' : size === 'xl' ? '32px' : '16px',
            animationDelay: `${i * 0.15}s`,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  );

  const renderRing = () => (
    <div className={`${sizeClasses[size]} relative`}>
      <div className={`absolute inset-0 ${colorClasses[color]} rounded-full border-2 border-current border-t-transparent animate-spin`} />
      <div className={`absolute inset-2 ${colorClasses[color]} rounded-full border border-current border-t-transparent animate-spin`} style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
    </div>
  );

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      case 'bars':
        return renderBars();
      case 'ring':
        return renderRing();
      default:
        return renderSpinner();
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      {renderLoader()}
      {text && (
        <div className={`${textSizeClasses[size]} ${colorClasses[color]} font-medium animate-pulse`}>
          {text}
        </div>
      )}
    </div>
  );
}

// Full screen overlay loader
interface ModernOverlayLoaderProps extends ModernLoaderProps {
  visible: boolean;
  backdrop?: boolean;
  blur?: boolean;
}

export function ModernOverlayLoader({
  visible,
  backdrop = true,
  blur = true,
  ...loaderProps
}: ModernOverlayLoaderProps) {
  const { isDarkMode } = useApp();

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
      backdrop
        ? isDarkMode
          ? 'bg-gray-900/80'
          : 'bg-white/80'
        : 'bg-transparent'
    } ${blur ? 'backdrop-blur-sm' : ''}`}>
      <div className={`${
        backdrop
          ? isDarkMode
            ? 'bg-gray-800/90 backdrop-blur-xl border border-gray-700/50'
            : 'bg-white/90 backdrop-blur-xl border border-gray-200/50'
          : ''
      } rounded-3xl p-8 shadow-2xl`}>
        <ModernLoader {...loaderProps} />
      </div>
    </div>
  );
}