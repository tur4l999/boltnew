import React, { ReactNode } from 'react';

interface IconButtonProps {
  children: ReactNode;
  onClick?: () => void;
  label: string;
  className?: string;
}

export function IconButton({ children, onClick, label, className = '' }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`w-9 h-9 rounded-lg border border-gray-300 bg-gray-50 flex items-center justify-center text-base hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${className}`}
    >
      {children}
    </button>
  );
}