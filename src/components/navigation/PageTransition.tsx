import React, { useEffect, useMemo, useState } from 'react';
import { useApp } from '../../contexts/AppContext';

interface PageTransitionProps {
  children: React.ReactNode;
  transitionKey: string;
}

export function PageTransition({ children, transitionKey }: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentKey, setCurrentKey] = useState(transitionKey);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Only animate transitions on Home screen
  const shouldAnimate = useMemo(() => {
    // transitionKey is built from `${screen}-${params}` in ScreenRenderer
    // Keep animation for Home; disable for all other screens
    return transitionKey.startsWith('Home-') || transitionKey === 'Home-undefined' || transitionKey === 'Home-null' || transitionKey === 'Home-{}';
  }, [transitionKey]);

  useEffect(() => {
    if (transitionKey !== currentKey) {
      if (shouldAnimate) {
        setIsAnimating(true);
        setIsVisible(false);
        
        setTimeout(() => {
          setCurrentKey(transitionKey);
          setIsVisible(true);
          setTimeout(() => setIsAnimating(false), 300);
        }, 150);
      } else {
        // No animation: swap immediately
        setIsAnimating(false);
        setCurrentKey(transitionKey);
        setIsVisible(true);
      }
    } else {
      setIsVisible(true);
    }
  }, [transitionKey, currentKey, shouldAnimate]);

  return (
    <div className="relative overflow-hidden">
      {/* Keçid animasiyası üçün arxa fon */}
      {isAnimating && shouldAnimate && (
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 opacity-10 animate-pulse z-10" />
      )}
      
      {/* Əsas məzmun */}
      <div
        className={`${shouldAnimate ? 'transition-all duration-300 ease-out transform' : ''} ${
          isVisible 
            ? 'translate-x-0 opacity-100 scale-100' 
            : shouldAnimate ? 'translate-x-4 opacity-0 scale-95' : ''
        }`}
      >
        {children}
      </div>
    </div>
  );
}