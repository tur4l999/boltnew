import React from 'react';
import { getIconByEmoji, getIconProps, iconSizes } from '../../lib/iconMapping';
import { LucideIcon } from 'lucide-react';

interface IconProps {
  emoji?: string;
  icon?: LucideIcon;
  size?: keyof typeof iconSizes;
  className?: string;
  strokeWidth?: number;
}

export function Icon({ 
  emoji, 
  icon, 
  size = 'md', 
  className = '', 
  strokeWidth = 2 
}: IconProps) {
  // Use provided icon or get icon from emoji
  const IconComponent = icon || (emoji ? getIconByEmoji(emoji) : null);
  
  if (!IconComponent) {
    // Fallback to emoji if no icon found
    return <span className={`inline-flex items-center justify-center ${className}`}>{emoji}</span>;
  }

  const iconProps = getIconProps(size, className);
  
  return (
    <IconComponent 
      size={iconProps.size}
      className={iconProps.className}
      strokeWidth={strokeWidth}
    />
  );
}

// Convenience components for common use cases
interface EmojiIconProps {
  emoji: string;
  size?: keyof typeof iconSizes;
  className?: string;
  strokeWidth?: number;
}

export function EmojiIcon({ emoji, size = 'md', className = '', strokeWidth = 2 }: EmojiIconProps) {
  return <Icon emoji={emoji} size={size} className={className} strokeWidth={strokeWidth} />;
}

// Enhanced Icon Button that uses modern icons
interface ModernIconButtonProps {
  emoji?: string;
  icon?: LucideIcon;
  onClick?: () => void;
  label: string;
  size?: keyof typeof iconSizes;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
}

export function ModernIconButton({ 
  emoji, 
  icon,
  onClick, 
  label, 
  size = 'md',
  className = '',
  variant = 'default',
  disabled = false
}: ModernIconButtonProps) {
  const baseClasses = 'rounded-lg border flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 transform hover:scale-105 active:scale-95';
  
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm', 
    md: 'w-9 h-9 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-20 h-20 text-2xl'
  };

  const variantClasses = {
    default: disabled 
      ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
      : 'border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700 hover:border-gray-400',
    primary: disabled
      ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
      : 'border-emerald-500 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 hover:border-emerald-600 shadow-sm hover:shadow-md',
    secondary: disabled
      ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
      : 'border-blue-500 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:border-blue-600 shadow-sm hover:shadow-md',
    ghost: disabled
      ? 'border-transparent bg-transparent text-gray-400 cursor-not-allowed'
      : 'border-transparent bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-800'
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-label={label}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className} ${
        disabled ? '' : 'hover:shadow-lg'
      }`}
    >
      <Icon emoji={emoji} icon={icon} size={size} strokeWidth={2} />
    </button>
  );
}