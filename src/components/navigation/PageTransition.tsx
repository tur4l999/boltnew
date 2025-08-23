import React, { useEffect, useState } from 'react';
import { useApp } from '../../contexts/AppContext';

interface PageTransitionProps {
  children: React.ReactNode;
  transitionKey: string;
}

export function PageTransition({ children, transitionKey }: PageTransitionProps) {
  const [currentKey, setCurrentKey] = useState(transitionKey);
  const [shouldShow, setShouldShow] = useState(true);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    if (transitionKey !== currentKey) {
      // Switch content immediately, then fade it in once
      setCurrentKey(transitionKey);
      setShouldShow(false);
      // next tick to trigger CSS transition
      const id = requestAnimationFrame(() => {
        setShouldShow(true);
        setFadeIn(true);
      });
      return () => cancelAnimationFrame(id);
    }
  }, [transitionKey, currentKey]);

  return (
    <div className="relative overflow-hidden">
      <div
        key={currentKey}
        className={`transition-opacity duration-200 ease-out ${shouldShow && fadeIn ? 'opacity-100' : 'opacity-0'}`}
      >
        {children}
      </div>
    </div>
  );
}