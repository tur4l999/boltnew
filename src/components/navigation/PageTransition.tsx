import React, { useEffect, useState } from 'react';
import { useApp } from '../../contexts/AppContext';

interface PageTransitionProps {
  children: React.ReactNode;
  transitionKey: string;
}

export function PageTransition({ children, transitionKey }: PageTransitionProps) {
  const { currentScreen } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [currentKey, setCurrentKey] = useState(transitionKey);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (transitionKey !== currentKey) {
      // Show immediately on tap
      setIsAnimating(false);
      setIsVisible(true);
      setCurrentKey(transitionKey);
    } else {
      setIsVisible(true);
    }
  }, [transitionKey, currentKey]);

  // Always reset scroll to top on page/screen change
  useEffect(() => {
    const container = document.getElementById('app-scroll-container');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'auto' });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [transitionKey]);

  const isHome = currentScreen.screen === 'Home';

  return (
    <div className="relative overflow-hidden">
      {/* Yalnız ana səhifədə xüsusi keçid effekti */}
      {isHome && isAnimating && (
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 opacity-10 animate-pulse z-10" />
      )}

      {/* Əsas məzmun */}
      <div
        className={
          isHome
            ? `transition-all duration-300 ease-out transform ${
                isVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-4 opacity-0 scale-95'
              }`
            : `transition-opacity duration-75 ${isVisible ? 'opacity-100' : 'opacity-0'}`
        }
      >
        {children}
      </div>
    </div>
  );
}