import React, { useEffect, useState } from 'react';

interface FadeInUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function FadeInUp({ 
  children, 
  delay = 0, 
  duration = 500,
  className = '' 
}: FadeInUpProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all ease-out transform ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-6 opacity-0'
      } ${className}`}
      style={{ 
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {children}
    </div>
  );
}