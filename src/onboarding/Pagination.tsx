/**
 * Pagination Component
 * Animated pagination dots for onboarding carousel
 * 
 * AZ: Animasiyalı səhifələmə nöqtələri
 * EN: Animated pagination dots
 * RU: Анимированные точки пагинации
 */

import React from 'react';

interface PaginationProps {
  /** Total number of slides / Ümumi slayd sayı */
  total: number;
  
  /** Current active slide index / Aktiv slayd indeksi */
  activeIndex: number;
  
  /** Click handler for dot / Nöqtəyə klik */
  onDotClick?: (index: number) => void;
  
  /** Dark mode / Qaranlıq rejim */
  isDark?: boolean;
}

/**
 * Pagination Dots Component
 * Material-style with active dot enlargement
 * 
 * AZ: Material üslubunda böyüyən aktiv nöqtə
 */
export function Pagination({ total, activeIndex, onDotClick, isDark = false }: PaginationProps) {
  const dots = Array.from({ length: total }, (_, i) => i);
  
  const activeDotColor = isDark ? '#10B981' : '#10B981'; // Primary color
  const inactiveDotColor = isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)';
  
  return (
    <div 
      className="flex items-center justify-center gap-2"
      role="tablist"
      aria-label="Onboarding progress"
    >
      {dots.map((index) => {
        const isActive = index === activeIndex;
        
        return (
          <button
            key={index}
            onClick={() => onDotClick?.(index)}
            className="p-2 transition-all duration-300"
            style={{
              minWidth: '44px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            role="tab"
            aria-selected={isActive}
            aria-label={`Slide ${index + 1} of ${total}`}
          >
            <div
              className="rounded-full transition-all duration-300"
              style={{
                width: isActive ? '12px' : '8px',
                height: isActive ? '12px' : '8px',
                backgroundColor: isActive ? activeDotColor : inactiveDotColor,
                opacity: isActive ? 1 : 0.5,
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

/**
 * Alternative bar-style pagination (linear progress)
 * AZ: Xətti irəliləyiş göstəricisi
 */
interface ProgressBarProps {
  total: number;
  activeIndex: number;
  isDark?: boolean;
}

export function ProgressBar({ total, activeIndex, isDark = false }: ProgressBarProps) {
  const progress = ((activeIndex + 1) / total) * 100;
  
  const bgColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const fillColor = isDark ? '#10B981' : '#10B981';
  
  return (
    <div className="w-full max-w-xs mx-auto">
      <div
        className="h-1 rounded-full overflow-hidden"
        style={{ backgroundColor: bgColor }}
        role="progressbar"
        aria-valuenow={activeIndex + 1}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`Slide ${activeIndex + 1} of ${total}`}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            backgroundColor: fillColor,
          }}
        />
      </div>
      
      {/* Step indicator text */}
      <div 
        className="mt-2 text-center text-sm"
        style={{ 
          color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)',
        }}
      >
        {activeIndex + 1} / {total}
      </div>
    </div>
  );
}
