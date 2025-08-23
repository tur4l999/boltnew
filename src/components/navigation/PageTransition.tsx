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
        setTimeout(() => setIsAnimating(false), 200);
      }, 100);
    } else {
      setIsVisible(true);
    }
  }, [transitionKey, currentKey]);

  return (
    <div className="relative overflow-hidden">
      {/* Əsas məzmun */}
      <div
        className={`transition-opacity duration-200 ease-out ${
          isVisible 
            ? 'opacity-100' 
            : 'opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}