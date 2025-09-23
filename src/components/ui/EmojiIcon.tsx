import React from 'react';
import { Icon } from '../icons/Icon';
import { getIconFromEmoji } from '../../lib/emojiToIcon';

interface EmojiIconProps {
  emoji?: string;
  iconName?: string;
  size?: number | string;
  className?: string;
  color?: string;
  style?: React.CSSProperties;
  fallback?: React.ReactNode;
  showOriginalOnFallback?: boolean;
}

/**
 * EmojiIcon component that automatically converts emojis to custom vector icons
 * 
 * Usage:
 * <EmojiIcon emoji="🏠" size={24} />
 * <EmojiIcon iconName="home" size={24} />
 * <EmojiIcon emoji="🏠" fallback="Home" />
 */
export const EmojiIcon: React.FC<EmojiIconProps> = ({
  emoji,
  iconName,
  size = 24,
  className = '',
  color,
  style,
  fallback,
  showOriginalOnFallback = false,
}) => {
  // Determine which icon to use
  let targetIconName = iconName;
  
  if (!targetIconName && emoji) {
    targetIconName = getIconFromEmoji(emoji) || undefined;
  }
  
  // If we have a valid icon name, render the custom icon
  if (targetIconName) {
    return (
      <Icon
        name={targetIconName}
        size={size}
        className={className}
        color={color}
        style={style}
      />
    );
  }
  
  // Fallback behavior
  if (fallback) {
    return <>{fallback}</>;
  }
  
  if (showOriginalOnFallback && emoji) {
    return <span className={className} style={style}>{emoji}</span>;
  }
  
  // Default fallback - show the emoji or nothing
  return emoji ? <span className={className} style={style}>{emoji}</span> : null;
};

export default EmojiIcon;