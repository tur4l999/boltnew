import React, { useEffect, useState } from 'react';
import { useApp } from '../../contexts/AppContext';

interface PageTransitionProps {
  children: React.ReactNode;
  transitionKey: string;
}

export function PageTransition({ children, transitionKey }: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentKey, setCurrentKey] = useState(transitionKey);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (transitionKey !== currentKey) {
      setIsAnimating(true);
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentKey(transitionKey);
        setIsVisible(true);
        setTimeout(() => setIsAnimating(false), 300);
      }, 150);
    } else {
      setIsVisible(true);
    }
  }, [transitionKey, currentKey]);

  return (
    <div className="relative overflow-hidden">
      {/* Keçid animasiyası üçün arxa fon */}
      {isAnimating && (
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 opacity-10 animate-pulse z-10" />
      )}
      
      {/* Əsas məzmun */}
      <div
        className={`transition-all duration-300 ease-out transform ${
          isVisible 
            ? 'translate-x-0 opacity-100 scale-100' 
            : 'translate-x-4 opacity-0 scale-95'
        }`}
      >
        {children}
      </div>
    </div>
  );
}