import React from 'react';
import { useApp } from '../../contexts/AppContext';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient' | 'animated';
  showPercentage?: boolean;
  color?: 'emerald' | 'blue' | 'purple' | 'orange';
}

export function Progress({ 
  value, 
  max = 100, 
  className = '',
  size = 'md',
  variant = 'gradient',
  showPercentage = false,
  color = 'emerald'
}: ProgressProps) {
  const { isDarkMode } = useApp();
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };
  
  const colorClasses = {
    emerald: 'from-emerald-500 to-green-500',
    blue: 'from-blue-500 to-cyan-500',
    purple: 'from-purple-500 to-pink-500',
    orange: 'from-orange-500 to-red-500'
  };
  
  const getProgressClasses = () => {
    const baseClasses = `h-full transition-all duration-500 ease-out rounded-full`;
    
    switch (variant) {
      case 'gradient':
        return `${baseClasses} bg-gradient-to-r ${colorClasses[color]}`;
      case 'animated':
        return `${baseClasses} bg-gradient-to-r ${colorClasses[color]} animate-gradient bg-[length:200%_100%]`;
      default:
        return `${baseClasses} bg-${color}-600`;
    }
  };
  
  return (
    <div className="space-y-1">
      {showPercentage && (
        <div className="flex justify-between items-center">
          <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Progress
          </span>
          <span className={`text-xs font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      
      <div className={`w-full rounded-full overflow-hidden backdrop-blur-sm transition-all duration-300 relative ${sizeClasses[size]} ${
        isDarkMode 
          ? 'bg-gray-700/50 border border-gray-600/50' 
          : 'bg-gray-200/50 border border-gray-300/50'
      } ${className}`}>
        <div 
          className={getProgressClasses()}
          style={{ 
            width: `${percentage}%`,
            boxShadow: variant === 'animated' ? `0 0 10px rgba(34, 197, 94, 0.4)` : 'none'
          }}
        />
        
        {/* Shimmer effect for animated variant */}
        {variant === 'animated' && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        )}
      </div>
    </div>
  );
}