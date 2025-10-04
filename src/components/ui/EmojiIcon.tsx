/** @jsxImportSource react */
import React from 'react';
import { Icon } from '../icons/Icon';
import { getIconFromEmoji } from '../../lib/emojiToIcon';

interface EmojiIconProps {
  emoji: string;
  size?: number;
  className?: string;
  forceEmoji?: boolean; // Force display as emoji even if icon exists
}

export function EmojiIcon({ emoji, size = 24, className = '', forceEmoji = false }: EmojiIconProps) {
  // Check if this emoji has a corresponding icon
  const iconName = getIconFromEmoji(emoji);
  
  // Use icon component if mapping exists and not forced to show emoji
  if (iconName && !forceEmoji) {
    return (
      <Icon 
        name={iconName} 
        size={size} 
        className={className}
        color="currentColor"
      />
    );
  }
  
  // Otherwise, display as emoji
  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      style={{ fontSize: `${size}px`, lineHeight: 1 }}
      role="img"
      aria-label={emoji}
    >
      {emoji}
    </span>
  );
}
