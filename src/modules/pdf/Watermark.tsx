/**
 * Dynamic SVG Watermark Overlay Component
 * Displays diagonal repeating watermark with user identification
 */

import React, { useEffect, useState } from 'react';
import type { WatermarkConfig } from './types';
import { createWatermarkText } from './utils';

interface WatermarkProps {
  config: WatermarkConfig;
  refreshInterval?: number; // milliseconds (default: 60000 = 1 min)
  className?: string;
}

export const Watermark: React.FC<WatermarkProps> = ({
  config,
  refreshInterval = 60000,
  className = '',
}) => {
  const [timestamp, setTimestamp] = useState(Date.now());
  
  // Refresh timestamp periodically for "live" effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(Date.now());
    }, refreshInterval);
    
    return () => clearInterval(interval);
  }, [refreshInterval]);
  
  const {
    opacity = 0.12,
    angle = 14,
    fontSize = 12,
  } = config;
  
  // Create watermark text
  const watermarkText = createWatermarkText({
    ...config,
    currentPage: config.currentPage,
    totalPages: config.totalPages,
  });
  
  // Add timestamp to make it dynamic
  const dynamicText = `${watermarkText} • ${new Date(timestamp).toLocaleTimeString()}`;
  
  // Calculate pattern spacing
  const spacing = 200; // pixels between watermarks
  const patternWidth = spacing * 2;
  const patternHeight = spacing * 2;
  
  return (
    <div
      className={`watermark-overlay ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        userSelect: 'none',
        overflow: 'hidden',
        zIndex: 9999,
      }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <defs>
          <pattern
            id={`watermark-pattern-${config.currentPage}`}
            x="0"
            y="0"
            width={patternWidth}
            height={patternHeight}
            patternUnits="userSpaceOnUse"
          >
            {/* First diagonal text */}
            <text
              x={spacing / 2}
              y={spacing / 2}
              transform={`rotate(${angle} ${spacing / 2} ${spacing / 2})`}
              fill="currentColor"
              fontSize={fontSize}
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="500"
              opacity={opacity}
              style={{
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            >
              {dynamicText}
            </text>
            
            {/* Second diagonal text (offset) */}
            <text
              x={spacing / 2 + patternWidth / 2}
              y={spacing / 2 + patternHeight / 2}
              transform={`rotate(${angle} ${spacing / 2 + patternWidth / 2} ${spacing / 2 + patternHeight / 2})`}
              fill="currentColor"
              fontSize={fontSize}
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="500"
              opacity={opacity}
              style={{
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            >
              {dynamicText}
            </text>
          </pattern>
        </defs>
        
        {/* Apply pattern to full viewport */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill={`url(#watermark-pattern-${config.currentPage})`}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
      </svg>
    </div>
  );
};

/**
 * Adaptive watermark that adjusts opacity based on zoom level
 */
export const AdaptiveWatermark: React.FC<WatermarkProps & { zoomLevel?: number }> = ({
  zoomLevel = 1.0,
  config,
  ...props
}) => {
  // Adjust opacity and font size based on zoom
  const adaptiveConfig = {
    ...config,
    opacity: Math.max(0.08, Math.min(0.18, (config.opacity || 0.12) / zoomLevel)),
    fontSize: Math.max(10, Math.min(16, (config.fontSize || 12) * Math.sqrt(zoomLevel))),
  };
  
  return <Watermark config={adaptiveConfig} {...props} />;
};

export default Watermark;