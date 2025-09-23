// Emoji to Icon mapping utility
export const emojiToIconMap: Record<string, string> = {
  // Navigation emojis
  '🏠': 'home',
  '📚': 'books',
  '🧪': 'test-tube',
  '🛍️': 'shopping-bag',
  '➕': 'plus',
  
  // Interface emojis
  '🔔': 'bell',
  '🤖': 'robot',
  '🌐': 'globe',
  '👋': 'wave',
  '⭐': 'star',
  '★': 'star',
  
  // Content emojis
  '🎬': 'video',
  '📝': 'document',
  '👨‍🏫': 'teacher',
  '🗒️': 'notes',
  '📊': 'chart',
  '📄': 'document',
  '📜': 'scroll',
  '💸': 'money',
  '📦': 'package',
  '🎓': 'trophy',
  '🛠️': 'settings',
  '📮': 'contact',
  '📰': 'document',
  '📋': 'document',
  
  // Action emojis
  '✅': 'check',
  '❌': 'x',
  '✕': 'close',
  '🔎': 'search',
  
  // Theme emojis
  '☀️': 'sun',
  '🌙': 'moon',
  '📱': 'phone',
  
  // System emojis
  '🎨': 'palette',
  '🚀': 'rocket',
  '⚡': 'bolt',
  '🎯': 'target',
  
  // Payment & Store emojis
  '💳': 'credit-card',
  '🏦': 'bank',
  '🔒': 'lock',
  '💰': 'wallet',
  
  // Settings emojis
  '👤': 'user',
  '🛡️': 'shield',
  '🗑️': 'trash',
  '🔄': 'refresh',
  '❓': 'question',
  '📞': 'contact',
  '💬': 'chat',
  'ℹ️': 'info',
  '⚙️': 'settings',
  '🆘': 'help',
  
  // Additional emojis
  '⚠️': 'warning',
  '🏆': 'trophy',
  '🚗': 'car',
  '🖼️': 'image',
  '☰': 'menu',
  '🔥': 'bolt',
  '✨': 'star',
  '💪': 'bolt',
  '🎉': 'star',
  '🎊': 'star',
  '🌟': 'star',
  '🎪': 'star',
  '🎭': 'star',
  '🎵': 'bell',
  '🎶': 'bell',
  '🎤': 'bell',
  '🎧': 'bell',
  '🎼': 'bell',
  '🎹': 'bell',
  '🥇': 'trophy',
  '🏅': 'trophy',
  '🎖️': 'trophy',
  '🥉': 'trophy',
  '🥈': 'trophy',
  '📶': 'bolt',
  '🛑': 'warning',
  '〰️': 'wave',
};

/**
 * Convert emoji to icon name
 */
export const getIconFromEmoji = (emoji: string): string | null => {
  return emojiToIconMap[emoji] || null;
};

/**
 * Check if emoji has an icon equivalent
 */
export const hasIconForEmoji = (emoji: string): boolean => {
  return emoji in emojiToIconMap;
};

/**
 * Get all supported emojis
 */
export const getSupportedEmojis = (): string[] => {
  return Object.keys(emojiToIconMap);
};

/**
 * Replace emoji with icon name in text
 */
export const replaceEmojiWithIcon = (text: string): string => {
  let result = text;
  Object.entries(emojiToIconMap).forEach(([emoji, iconName]) => {
    result = result.replace(new RegExp(emoji, 'g'), `{icon:${iconName}}`);
  });
  return result;
};

export default emojiToIconMap;