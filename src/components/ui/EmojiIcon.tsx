/** @jsxImportSource react */
import React from 'react';

interface EmojiIconProps {
  emoji: string;
  size?: number;
  className?: string;
}

export function EmojiIcon({ emoji, size = 24, className = '' }: EmojiIconProps) {
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
