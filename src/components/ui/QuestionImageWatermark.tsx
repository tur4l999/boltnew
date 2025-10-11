/**
 * Question Image Watermark Component
 * Displays unobtrusive repeating watermark overlay on question images
 */

import React from 'react';

interface QuestionImageWatermarkProps {
  userName?: string;
  userPhone?: string;
  questionId?: string;
  className?: string;
  opacity?: number;
  fontSize?: number;
}

export const QuestionImageWatermark: React.FC<QuestionImageWatermarkProps> = ({
  userName = 'DDA User',
  userPhone = '',
  questionId = '',
  className = '',
  opacity = 0.15,
  fontSize = 10,
}) => {
  const timestamp = new Date().toLocaleTimeString('az-AZ', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  // Create watermark text
  const watermarkText = `DDA • ${userName}`;
  const secondLine = userPhone ? `${userPhone} • ${timestamp}` : timestamp;
  
  // Pattern spacing - compact for images
  const spacing = 120;
  const patternWidth = spacing * 2.5;
  const patternHeight = spacing * 2;
  const angle = 15;
  
  // Hidden watermark for tracking
  const hiddenOpacity = 0.02;
  const hiddenFontSize = 5;
  const hiddenId = `${userPhone}:${questionId}:${Date.now()}`;
  
  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
      style={{
        zIndex: 10,
      }}
    >
      {/* Visible watermark */}
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        <defs>
          <pattern
            id={`question-watermark-${questionId || 'default'}`}
            x="0"
            y="0"
            width={patternWidth}
            height={patternHeight}
            patternUnits="userSpaceOnUse"
          >
            {/* Watermark group 1 */}
            <g transform={`rotate(${angle} ${spacing * 0.5} ${spacing * 0.5})`}>
              <text
                x={spacing * 0.5}
                y={spacing * 0.5}
                fill="white"
                fontSize={fontSize}
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight="600"
                opacity={opacity}
                className="select-none"
              >
                {watermarkText}
              </text>
              <text
                x={spacing * 0.5}
                y={spacing * 0.5 + fontSize + 3}
                fill="white"
                fontSize={fontSize - 1}
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight="500"
                opacity={opacity * 0.9}
                className="select-none"
              >
                {secondLine}
              </text>
            </g>
            
            {/* Watermark group 2 */}
            <g transform={`rotate(${angle} ${spacing * 1.8} ${spacing * 1.2})`}>
              <text
                x={spacing * 1.8}
                y={spacing * 1.2}
                fill="white"
                fontSize={fontSize}
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight="600"
                opacity={opacity}
                className="select-none"
              >
                {watermarkText}
              </text>
              <text
                x={spacing * 1.8}
                y={spacing * 1.2 + fontSize + 3}
                fill="white"
                fontSize={fontSize - 1}
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight="500"
                opacity={opacity * 0.9}
                className="select-none"
              >
                {secondLine}
              </text>
            </g>
            
            {/* Watermark group 3 */}
            <g transform={`rotate(${angle} ${spacing * 0.2} ${spacing * 1.5})`}>
              <text
                x={spacing * 0.2}
                y={spacing * 1.5}
                fill="white"
                fontSize={fontSize}
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight="600"
                opacity={opacity}
                className="select-none"
              >
                {watermarkText}
              </text>
              <text
                x={spacing * 0.2}
                y={spacing * 1.5 + fontSize + 3}
                fill="white"
                fontSize={fontSize - 1}
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight="500"
                opacity={opacity * 0.9}
                className="select-none"
              >
                {secondLine}
              </text>
            </g>
          </pattern>
        </defs>
        
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill={`url(#question-watermark-${questionId || 'default'})`}
          className="select-none pointer-events-none"
        />
      </svg>
      
      {/* Hidden tracking watermark */}
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        <defs>
          <pattern
            id={`hidden-watermark-${questionId || 'default'}`}
            x="0"
            y="0"
            width={80}
            height={80}
            patternUnits="userSpaceOnUse"
          >
            <text
              x={10}
              y={15}
              fill="#000000"
              fontSize={hiddenFontSize}
              fontFamily="monospace"
              opacity={hiddenOpacity}
              className="select-none"
            >
              {hiddenId}
            </text>
            <text
              x={40}
              y={50}
              fill="#ffffff"
              fontSize={hiddenFontSize}
              fontFamily="monospace"
              opacity={hiddenOpacity}
              className="select-none"
            >
              {userPhone}
            </text>
          </pattern>
        </defs>
        
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill={`url(#hidden-watermark-${questionId || 'default'})`}
          className="select-none pointer-events-none"
          style={{ mixBlendMode: 'overlay' }}
        />
      </svg>
    </div>
  );
};

export default QuestionImageWatermark;
