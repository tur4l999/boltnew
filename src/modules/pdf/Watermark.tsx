import React, { useMemo, useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Text as SvgText, G, Defs, Pattern, Rect } from 'react-native-svg';
import { WatermarkProps } from './types';
import { generateWatermarkText, calculateWatermarkPositions } from './utils';

interface WatermarkComponentProps extends WatermarkProps {
  containerWidth?: number;
  containerHeight?: number;
  isDarkMode?: boolean;
  isVisible?: boolean;
}

const Watermark: React.FC<WatermarkComponentProps> = ({
  userName,
  phone,
  userId,
  deviceId,
  timestamp,
  page,
  totalPages,
  opacity = 0.12,
  containerWidth,
  containerHeight,
  isDarkMode = false,
  isVisible = true,
}) => {
  const [dimensions, setDimensions] = useState({
    width: containerWidth || Dimensions.get('window').width,
    height: containerHeight || Dimensions.get('window').height,
  });

  const [currentTime, setCurrentTime] = useState(new Date().toISOString());

  // Update timestamp every 60 seconds for "live" watermark
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toISOString());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Update dimensions when container size changes
  useEffect(() => {
    if (containerWidth && containerHeight) {
      setDimensions({ width: containerWidth, height: containerHeight });
    }
  }, [containerWidth, containerHeight]);

  const watermarkData = useMemo(() => {
    const text = generateWatermarkText(
      userName,
      phone,
      userId,
      deviceId,
      page,
      totalPages
    );

    // Estimate text dimensions (approximate)
    const fontSize = 14;
    const textWidth = text.length * fontSize * 0.6;
    const textHeight = fontSize * 1.2;

    const positions = calculateWatermarkPositions(
      dimensions.width,
      dimensions.height,
      textWidth,
      textHeight,
      180 // spacing between watermarks
    );

    return {
      text,
      fontSize,
      textWidth,
      textHeight,
      positions,
    };
  }, [userName, phone, userId, deviceId, page, totalPages, dimensions, currentTime]);

  if (!isVisible) {
    return null;
  }

  const watermarkColor = isDarkMode ? '#ffffff' : '#000000';
  const rotation = -15; // Diagonal angle

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none', // Allow touch events to pass through
        zIndex: 1000,
      }}
    >
      <Svg
        width={dimensions.width}
        height={dimensions.height}
        style={{ position: 'absolute' }}
      >
        <Defs>
          <Pattern
            id="watermarkPattern"
            x="0"
            y="0"
            width="180"
            height="180"
            patternUnits="userSpaceOnUse"
          >
            <SvgText
              x="90"
              y="90"
              fontSize={watermarkData.fontSize}
              fill={watermarkColor}
              opacity={opacity}
              textAnchor="middle"
              transform={`rotate(${rotation} 90 90)`}
              fontFamily="System"
              fontWeight="400"
            >
              {watermarkData.text}
            </SvgText>
          </Pattern>
        </Defs>
        
        <Rect
          width="100%"
          height="100%"
          fill="url(#watermarkPattern)"
        />
      </Svg>

      {/* Additional scattered watermarks for better coverage */}
      <Svg
        width={dimensions.width}
        height={dimensions.height}
        style={{ position: 'absolute' }}
      >
        {watermarkData.positions.map((position, index) => (
          <G key={index}>
            <SvgText
              x={position.x}
              y={position.y}
              fontSize={watermarkData.fontSize}
              fill={watermarkColor}
              opacity={opacity * 0.8}
              textAnchor="start"
              transform={`rotate(${rotation} ${position.x} ${position.y})`}
              fontFamily="System"
              fontWeight="300"
            >
              {watermarkData.text}
            </SvgText>
          </G>
        ))}
      </Svg>
    </View>
  );
};

// Memoized version for performance
export default React.memo(Watermark, (prevProps, nextProps) => {
  // Only re-render if essential props change
  return (
    prevProps.userName === nextProps.userName &&
    prevProps.phone === nextProps.phone &&
    prevProps.userId === nextProps.userId &&
    prevProps.deviceId === nextProps.deviceId &&
    prevProps.page === nextProps.page &&
    prevProps.totalPages === nextProps.totalPages &&
    prevProps.opacity === nextProps.opacity &&
    prevProps.containerWidth === nextProps.containerWidth &&
    prevProps.containerHeight === nextProps.containerHeight &&
    prevProps.isDarkMode === nextProps.isDarkMode &&
    prevProps.isVisible === nextProps.isVisible
  );
});

// Alternative simpler watermark for better performance on older devices
export const SimpleWatermark: React.FC<WatermarkComponentProps> = ({
  userName,
  phone,
  userId,
  deviceId,
  page,
  totalPages,
  opacity = 0.1,
  containerWidth,
  containerHeight,
  isDarkMode = false,
  isVisible = true,
}) => {
  const [dimensions, setDimensions] = useState({
    width: containerWidth || Dimensions.get('window').width,
    height: containerHeight || Dimensions.get('window').height,
  });

  useEffect(() => {
    if (containerWidth && containerHeight) {
      setDimensions({ width: containerWidth, height: containerHeight });
    }
  }, [containerWidth, containerHeight]);

  const watermarkText = useMemo(() => {
    return generateWatermarkText(userName, phone, userId, deviceId, page, totalPages);
  }, [userName, phone, userId, deviceId, page, totalPages]);

  if (!isVisible) {
    return null;
  }

  const watermarkColor = isDarkMode ? '#ffffff' : '#000000';

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 1000,
      }}
    >
      <Svg width={dimensions.width} height={dimensions.height}>
        {/* Center watermark */}
        <SvgText
          x={dimensions.width / 2}
          y={dimensions.height / 2}
          fontSize="16"
          fill={watermarkColor}
          opacity={opacity}
          textAnchor="middle"
          transform={`rotate(-15 ${dimensions.width / 2} ${dimensions.height / 2})`}
          fontFamily="System"
        >
          {watermarkText}
        </SvgText>
        
        {/* Corner watermarks */}
        <SvgText
          x={dimensions.width * 0.25}
          y={dimensions.height * 0.25}
          fontSize="12"
          fill={watermarkColor}
          opacity={opacity * 0.7}
          textAnchor="middle"
          transform={`rotate(-15 ${dimensions.width * 0.25} ${dimensions.height * 0.25})`}
          fontFamily="System"
        >
          {watermarkText}
        </SvgText>
        
        <SvgText
          x={dimensions.width * 0.75}
          y={dimensions.height * 0.75}
          fontSize="12"
          fill={watermarkColor}
          opacity={opacity * 0.7}
          textAnchor="middle"
          transform={`rotate(-15 ${dimensions.width * 0.75} ${dimensions.height * 0.75})`}
          fontFamily="System"
        >
          {watermarkText}
        </SvgText>
      </Svg>
    </View>
  );
};