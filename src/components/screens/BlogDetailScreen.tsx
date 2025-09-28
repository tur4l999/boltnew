import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';

type BlogItem = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  image?: string;
  viewCount: number;
};

type Comment = {
  id: string;
  author: string;
  content: string;
  date: string;
  likes: number;
};

interface BlogDetailScreenProps {
  blog: BlogItem;
  allBlogs: BlogItem[];
  onNavigateBack: () => void;
  onNavigateToBlog: (blogId: string) => void;
}

export function BlogDetailScreen({ blog, allBlogs, onNavigateBack, onNavigateToBlog }: BlogDetailScreenProps) {
  const { isDarkMode } = useApp();
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'Əli Məmmədov',
      content: 'Çox faydalı məqalə! Təşəkkür edirəm.',
      date: '2025-01-16',
      likes: 5,
    },
    {
      id: '2',
      author: 'Leyla Həsənova',
      content: 'Bu məlumatlar həqiqətən çox lazım idi. Çox sağ olun!',
      date: '2025-01-14',
      likes: 3,
    },
  ]);

  const relatedBlogs = allBlogs.filter(b => b.id !== blog.id).slice(0, 3);

  const formatContent = (content: string) => {
    return content
      .split('\n\n')
      .map((paragraph, index) => {
        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
          return (
            <h3 key={index} className={`font-bold text-xl mt-6 mb-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {paragraph.replace(/\*\*/g, '')}
            </h3>
          );
        }
        if (paragraph.includes('**')) {
          const parts = paragraph.split(/(\*\*.*?\*\*)/);
          return (
            <p key={index} className={`mb-4 leading-relaxed text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {parts.map((part, partIndex) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return <strong key={partIndex} className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{part.replace(/\*\*/g, '')}</strong>;
                }
                return part;
              })}
            </p>
          );
        }
        return (
          <p key={index} className={`mb-4 leading-relaxed text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {paragraph}
          </p>
        );
      });
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: 'İstifadəçi',
        content: newComment.trim(),
        date: new Date().toISOString().split('T')[0],
        likes: 0,
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link panoya kopyalandı!');
    }
  };

  return (
    <div className={`min-h-screen pb-24 transition-colors duration-300 ${
      isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      {/* Header with Back Button */}
      <div className={`sticky top-0 z-20 ${
        isDarkMode ? 'bg-gray-900/90' : 'bg-white/90'
      } backdrop-blur-xl border-b ${
        isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
      }`}>
        <div className="p-4">
          <button
            onClick={onNavigateBack}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            ← Bloglar səhifəsinə qayıt
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Main Blog Content */}
        <Card variant="glass" className="mb-6 animate-fade-in-up">
          {/* Blog Header */}
          <div className="mb-6">
            <div className="w-full h-48 rounded-2xl overflow-hidden mb-6 border-2 border-emerald-500/20">
              <img 
                src={blog.image || '/DDA_logo.png'} 
                alt={blog.title} 
                className="w-full h-full object-cover" 
              />
            </div>
            
            <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {blog.title}
            </h1>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4 text-sm">
                <span className={`flex items-center gap-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  📅 {new Date(blog.date).toLocaleDateString('az-AZ')}
                </span>
                <span className={`flex items-center gap-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  👁️ {blog.viewCount.toLocaleString()} baxış
                </span>
              </div>
              
              <button
                onClick={handleShare}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' 
                    : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                }`}
              >
                📤 Paylaş
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode 
                      ? 'bg-gray-700/50 text-gray-300' 
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Blog Content */}
          <div className="prose prose-lg max-w-none">
            {formatContent(blog.content)}
          </div>
        </Card>

        {/* Comments Section */}
        <Card variant="glass" className="mb-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            💬 Şərhlər ({comments.length})
          </h3>

          {/* Add Comment */}
          <div className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Şərhinizi yazın..."
              className={`w-full p-4 rounded-xl border resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800/50 border-gray-700 text-gray-100 placeholder-gray-500' 
                  : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500'
              }`}
              rows={3}
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isDarkMode 
                    ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 disabled:hover:bg-emerald-500/20' 
                    : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 disabled:hover:bg-emerald-50'
                }`}
              >
                📝 Şərh əlavə et
              </button>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment, index) => (
              <div
                key={comment.id}
                className={`p-4 rounded-xl border transition-all duration-300 animate-fade-in-up ${
                  isDarkMode 
                    ? 'bg-gray-800/30 border-gray-700/50' 
                    : 'bg-gray-50/50 border-gray-200/50'
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-medium text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    👤 {comment.author}
                  </span>
                  <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    {new Date(comment.date).toLocaleDateString('az-AZ')}
                  </span>
                </div>
                <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {comment.content}
                </p>
                <div className="flex items-center gap-3">
                  <button className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-all duration-300 hover:scale-105 ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10' 
                      : 'text-gray-500 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}>
                    ❤️ {comment.likes}
                  </button>
                  <button className={`text-xs px-2 py-1 rounded-lg transition-all duration-300 hover:scale-105 ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/30' 
                      : 'text-gray-500 hover:text-gray-600 hover:bg-gray-100'
                  }`}>
                    💬 Cavab ver
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Related Blogs */}
        <Card variant="glass" className="animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            📚 Digər Məqalələr
          </h3>
          <div className="space-y-4">
            {relatedBlogs.map((relatedBlog, index) => (
              <div
                key={relatedBlog.id}
                onClick={() => onNavigateToBlog(relatedBlog.id)}
                className={`flex gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300 hover:scale-[1.02] hover-lift animate-fade-in-up ${
                  isDarkMode 
                    ? 'bg-gray-800/30 border-gray-700/50 hover:bg-gray-700/50' 
                    : 'bg-gray-50/50 border-gray-200/50 hover:bg-gray-100/50'
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 border-emerald-500/20">
                  <img 
                    src={relatedBlog.image || '/DDA_logo.png'} 
                    alt={relatedBlog.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-semibold text-sm mb-2 line-clamp-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    {relatedBlog.title}
                  </h4>
                  <p className={`text-xs mb-2 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {relatedBlog.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs">
                    <span className={`flex items-center gap-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      📅 {new Date(relatedBlog.date).toLocaleDateString('az-AZ')}
                    </span>
                    <span className={`flex items-center gap-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      👁️ {relatedBlog.viewCount.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className={`self-center text-lg ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  →
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}