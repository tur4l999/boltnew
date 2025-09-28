import React, { useState, ReactNode } from 'react';
import { useApp } from '../../contexts/AppContext';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'date';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  icon?: ReactNode;
  rightElement?: ReactNode;
  className?: string;
}

export function Input({
  type = 'text',
  value,
  onChange,
  placeholder,
  label,
  error,
  disabled = false,
  required = false,
  icon,
  rightElement,
  className = ''
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const { isDarkMode } = useApp();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className={`block text-sm font-semibold transition-colors duration-200 ${
          isDarkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative group">
        {icon && (
          <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-lg transition-colors duration-200 ${
            isFocused 
              ? 'text-emerald-500' 
              : isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {icon}
          </div>
        )}
        
        <input
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 ${
            icon ? 'pl-12' : ''
          } ${
            rightElement ? 'pr-12' : ''
          } ${
            error 
              ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' 
              : isDarkMode 
                ? 'bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400 hover:bg-gray-700/70' 
                : 'bg-gray-50/50 border-gray-300 text-gray-900 placeholder-gray-500 hover:bg-gray-50/80'
          } ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'group-hover:border-emerald-400'
          }`}
        />
        
        {rightElement && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            {rightElement}
          </div>
        )}
        
        {/* Subtle hover effect */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-green-500/5 opacity-0 transition-opacity duration-300 pointer-events-none ${
          !disabled && !error ? 'group-hover:opacity-100' : ''
        }`}></div>
      </div>
      
      {error && (
        <p className="text-sm text-red-500 font-medium flex items-center gap-2">
          <span>⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
}