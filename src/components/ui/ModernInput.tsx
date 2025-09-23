import React, { ReactNode, useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { EmojiIcon } from './Icon';
import { LucideIcon, Eye, EyeOff } from 'lucide-react';

interface ModernInputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  error?: string;
  success?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outlined' | 'underlined';
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  leftEmoji?: string;
  rightEmoji?: string;
  label?: string;
  helper?: string;
  required?: boolean;
  maxLength?: number;
  autoComplete?: string;
  autoFocus?: boolean;
}

export function ModernInput({
  type = 'text',
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  error,
  success = false,
  className = '',
  size = 'md',
  variant = 'default',
  rounded = 'xl',
  leftIcon,
  rightIcon,
  leftEmoji,
  rightEmoji,
  label,
  helper,
  required = false,
  maxLength,
  autoComplete,
  autoFocus = false
}: ModernInputProps) {
  const { isDarkMode } = useApp();
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const isPassword = type === 'password';
  const hasError = !!error;
  const hasLeftIcon = leftIcon || leftEmoji;
  const hasRightIcon = rightIcon || rightEmoji || isPassword;
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[36px]',
    md: 'px-4 py-3 text-sm min-h-[44px]',
    lg: 'px-6 py-4 text-base min-h-[52px]'
  };

  const roundedClasses = {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    xl: 'rounded-2xl',
    full: 'rounded-full'
  };

  const variantClasses = {
    default: hasError
      ? isDarkMode
        ? 'bg-gray-800/80 border-2 border-red-500/70 focus:border-red-400'
        : 'bg-white/80 border-2 border-red-500/70 focus:border-red-400'
      : success
        ? isDarkMode
          ? 'bg-gray-800/80 border-2 border-emerald-500/70 focus:border-emerald-400'
          : 'bg-white/80 border-2 border-emerald-500/70 focus:border-emerald-400'
        : isDarkMode
          ? 'bg-gray-800/80 border-2 border-gray-600 focus:border-emerald-500 hover:border-gray-500'
          : 'bg-white/80 border-2 border-gray-300 focus:border-emerald-500 hover:border-gray-400',
          
    filled: hasError
      ? isDarkMode
        ? 'bg-red-900/20 border-2 border-red-500/50 focus:border-red-400'
        : 'bg-red-50/80 border-2 border-red-200 focus:border-red-400'
      : success
        ? isDarkMode
          ? 'bg-emerald-900/20 border-2 border-emerald-500/50 focus:border-emerald-400'
          : 'bg-emerald-50/80 border-2 border-emerald-200 focus:border-emerald-400'
        : isDarkMode
          ? 'bg-gray-700/50 border-2 border-transparent focus:border-emerald-500 hover:bg-gray-700/70'
          : 'bg-gray-100/80 border-2 border-transparent focus:border-emerald-500 hover:bg-gray-200/80',
          
    outlined: hasError
      ? isDarkMode
        ? 'bg-transparent border-2 border-red-500/70 focus:border-red-400'
        : 'bg-transparent border-2 border-red-500/70 focus:border-red-400'
      : success
        ? isDarkMode
          ? 'bg-transparent border-2 border-emerald-500/70 focus:border-emerald-400'
          : 'bg-transparent border-2 border-emerald-500/70 focus:border-emerald-400'
        : isDarkMode
          ? 'bg-transparent border-2 border-gray-600 focus:border-emerald-500 hover:border-gray-500'
          : 'bg-transparent border-2 border-gray-300 focus:border-emerald-500 hover:border-gray-400',
          
    underlined: hasError
      ? isDarkMode
        ? 'bg-transparent border-0 border-b-2 border-red-500/70 focus:border-red-400 rounded-none'
        : 'bg-transparent border-0 border-b-2 border-red-500/70 focus:border-red-400 rounded-none'
      : success
        ? isDarkMode
          ? 'bg-transparent border-0 border-b-2 border-emerald-500/70 focus:border-emerald-400 rounded-none'
          : 'bg-transparent border-0 border-b-2 border-emerald-500/70 focus:border-emerald-400 rounded-none'
        : isDarkMode
          ? 'bg-transparent border-0 border-b-2 border-gray-600 focus:border-emerald-500 hover:border-gray-500 rounded-none'
          : 'bg-transparent border-0 border-b-2 border-gray-300 focus:border-emerald-500 hover:border-gray-400 rounded-none'
  };

  const textColorClasses = isDarkMode ? 'text-gray-100' : 'text-gray-900';
  const placeholderColorClasses = isDarkMode ? 'placeholder-gray-400' : 'placeholder-gray-500';
  const disabledClasses = disabled 
    ? isDarkMode
      ? 'cursor-not-allowed opacity-60 bg-gray-900/50'
      : 'cursor-not-allowed opacity-60 bg-gray-50'
    : '';

  const focusRingClasses = hasError
    ? 'focus:ring-4 focus:ring-red-500/20'
    : success
      ? 'focus:ring-4 focus:ring-emerald-500/20'
      : 'focus:ring-4 focus:ring-emerald-500/20';

  const handleFocus = () => {
    setFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setFocused(false);
    onBlur?.();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 20 : 18;

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {label && (
        <label className={`block text-sm font-semibold mb-2 transition-colors duration-200 ${
          hasError
            ? 'text-red-600 dark:text-red-400'
            : success
              ? 'text-emerald-600 dark:text-emerald-400'
              : focused
                ? 'text-emerald-600 dark:text-emerald-400'
                : isDarkMode
                  ? 'text-gray-300'
                  : 'text-gray-700'
        }`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative group">
        {/* Left Icon */}
        {hasLeftIcon && (
          <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
            focused
              ? hasError
                ? 'text-red-500'
                : success
                  ? 'text-emerald-500'
                  : 'text-emerald-500'
              : isDarkMode
                ? 'text-gray-400'
                : 'text-gray-500'
          }`}>
            {leftEmoji && <EmojiIcon emoji={leftEmoji} size="sm" />}
            {leftIcon && !leftEmoji && React.createElement(leftIcon, { size: iconSize, strokeWidth: 2 })}
          </div>
        )}

        {/* Input */}
        <input
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          maxLength={maxLength}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          className={`
            w-full outline-none transition-all duration-300 backdrop-blur-sm
            ${sizeClasses[size]}
            ${variant !== 'underlined' ? roundedClasses[rounded] : ''}
            ${variantClasses[variant]}
            ${textColorClasses}
            ${placeholderColorClasses}
            ${disabledClasses}
            ${focusRingClasses}
            ${hasLeftIcon ? 'pl-10' : ''}
            ${hasRightIcon ? 'pr-10' : ''}
          `}
        />

        {/* Right Icon */}
        {hasRightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isPassword ? (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`transition-colors duration-200 hover:scale-110 transform ${
                  focused
                    ? 'text-emerald-500'
                    : isDarkMode
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {showPassword ? <EyeOff size={iconSize} strokeWidth={2} /> : <Eye size={iconSize} strokeWidth={2} />}
              </button>
            ) : (
              <div className={`transition-colors duration-200 ${
                focused
                  ? hasError
                    ? 'text-red-500'
                    : success
                      ? 'text-emerald-500'
                      : 'text-emerald-500'
                  : isDarkMode
                    ? 'text-gray-400'
                    : 'text-gray-500'
              }`}>
                {rightEmoji && <EmojiIcon emoji={rightEmoji} size="sm" />}
                {rightIcon && !rightEmoji && React.createElement(rightIcon, { size: iconSize, strokeWidth: 2 })}
              </div>
            )}
          </div>
        )}

        {/* Focus ring effect */}
        {focused && !disabled && (
          <div className={`absolute inset-0 ${variant !== 'underlined' ? roundedClasses[rounded] : ''} ${
            hasError
              ? 'ring-2 ring-red-500/30'
              : success
                ? 'ring-2 ring-emerald-500/30'
                : 'ring-2 ring-emerald-500/30'
          } pointer-events-none`}></div>
        )}
      </div>

      {/* Helper Text / Error */}
      {(helper || error) && (
        <div className={`mt-2 text-sm transition-colors duration-200 ${
          hasError
            ? 'text-red-600 dark:text-red-400'
            : success
              ? 'text-emerald-600 dark:text-emerald-400'
              : isDarkMode
                ? 'text-gray-400'
                : 'text-gray-600'
        }`}>
          {error || helper}
        </div>
      )}

      {/* Character count */}
      {maxLength && value && (
        <div className={`mt-1 text-xs text-right transition-colors duration-200 ${
          value.length > maxLength * 0.8
            ? value.length >= maxLength
              ? 'text-red-500'
              : 'text-yellow-500'
            : isDarkMode
              ? 'text-gray-500'
              : 'text-gray-400'
        }`}>
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  );
}