import React, { useEffect, useState } from 'react';

interface SlideTransitionProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
  delay?: number;
  className?: string;
}

export function SlideTransition({ 
  children, 
  direction = 'right', 
  duration = 300,
  delay = 0,
  className = '' 
}: SlideTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getTransformClasses = () => {
    const baseClasses = `transition-all ease-out transform`;
    const durationClass = `duration-${duration}`;
    
    if (isVisible) {
      return `${baseClasses} ${durationClass} translate-x-0 translate-y-0 opacity-100 scale-100`;
    }

    switch (direction) {
      case 'left':
        return `${baseClasses} ${durationClass} -translate-x-8 opacity-0 scale-95`;
      case 'right':
        return `${baseClasses} ${durationClass} translate-x-8 opacity-0 scale-95`;
      case 'up':
        return `${baseClasses} ${durationClass} -translate-y-8 opacity-0 scale-95`;
      case 'down':
        return `${baseClasses} ${durationClass} translate-y-8 opacity-0 scale-95`;
      default:
        return `${baseClasses} ${durationClass} translate-x-8 opacity-0 scale-95`;
    }
  };

  return (
    <div className={`${getTransformClasses()} ${className}`}>
      {children}
    </div>
  );
}