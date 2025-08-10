import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-xl p-4 border border-gray-200 shadow-sm ${className}`}>
      {children}
    </div>
  );
}