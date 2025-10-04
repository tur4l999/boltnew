/** @jsxImportSource react */
import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { EmojiIcon } from '../ui/EmojiIcon';

interface BlogDetailScreenProps {
  blog: {
    id: string;
    title: string;
    content: string;
    date: string;
    tags: string[];
    image?: string;
    viewCount: number;
    category: string;
  };
  onBack: () => void;
}

export function BlogDetailScreen({ blog, onBack }: BlogDetailScreenProps) {
  const { isDarkMode } = useApp();

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      {/* Header */}
      <div className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gray-900/80 border-gray-700/50' 
          : 'bg-white/80 border-gray-200/50'
      }`}>
        <div className="px-4 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className={`group relative flex items-center justify-center w-12 h-12 rounded-2xl border transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-700/50 text-gray-200' 
                  : 'bg-white/70 border-gray-200/50 hover:bg-gray-50 text-gray-700'
              } hover:scale-105 hover:shadow-lg backdrop-blur-sm`}
            >
              <EmojiIcon emoji="←" size={20} />
            </button>
            <h1 className={`text-xl font-bold truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Blog
            </h1>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <Card variant="glass" padding="lg">
          {/* Image */}
          {blog.image && (
            <div className="mb-6 rounded-xl overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
            </div>
          )}

          {/* Title */}
          <h1 className={`text-2xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {blog.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200/10">
            <div className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <EmojiIcon emoji="📅" size={14} className="inline mr-1" />
              {blog.date}
            </div>
            <div className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <EmojiIcon emoji="👁️" size={14} className="inline mr-1" />
              {blog.viewCount} baxış
            </div>
          </div>

          {/* Content */}
          <div className={`prose prose-sm max-w-none mb-6 ${
            isDarkMode ? 'prose-invert' : ''
          }`}>
            <div className={`text-base leading-relaxed whitespace-pre-wrap ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {blog.content}
            </div>
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-200/10">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode
                      ? 'bg-gray-700/50 text-gray-300'
                      : 'bg-gray-100/50 text-gray-700'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
