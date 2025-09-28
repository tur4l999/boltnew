import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Search, Plus, Filter, TrendingUp, MessageCircle, Eye, Heart, Clock, Tag } from 'lucide-react';
import type { QAQuestion } from '../../lib/types';

export function QAScreen() {
  const { t, isDarkMode, navigate, qaQuestions, getQuestionsByCategory } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const categories = [
    { id: 'all', name: 'Hamısı', count: qaQuestions.length },
    { id: 'traffic-rules', name: 'Yol qaydaları', count: qaQuestions.filter(q => q.category === 'traffic-rules').length },
    { id: 'road-signs', name: 'Yol nişanları', count: qaQuestions.filter(q => q.category === 'road-signs').length },
    { id: 'parking', name: 'Park etmə', count: qaQuestions.filter(q => q.category === 'parking').length },
    { id: 'exam-prep', name: 'İmtahan hazırlığı', count: qaQuestions.filter(q => q.category === 'exam-prep').length },
    { id: 'practical', name: 'Praktik', count: qaQuestions.filter(q => q.category === 'practical').length },
    { id: 'other', name: 'Digər', count: qaQuestions.filter(q => q.category === 'other').length }
  ];

  const filteredQuestions = qaQuestions.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          q.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          q.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      case 'popular':
        return (b.viewCount + b.likeCount) - (a.viewCount + a.likeCount);
      case 'unanswered':
        if (a.status === 'open' && b.status !== 'open') return -1;
        if (b.status === 'open' && a.status !== 'open') return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (days > 0) return `${days} gün əvvəl`;
    if (hours > 0) return `${hours} saat əvvəl`;
    if (minutes > 0) return `${minutes} dəqiqə əvvəl`;
    return 'İndi';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'answered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'open':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'answered':
        return 'Cavablandı';
      case 'open':
        return 'Açıq';
      case 'closed':
        return 'Bağlandı';
      default:
        return status;
    }
  };

  return (
    <div className={`min-h-screen p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Sual-Cavab
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Müəllimlərə suallar verin və cavab alın
          </p>
        </div>
        <button
          onClick={() => navigate('QAForm')}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors shadow-lg"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 mb-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
          <input
            type="text"
            placeholder="Sualları axtarın..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border-0 ${
              isDarkMode 
                ? 'bg-gray-800 text-white placeholder-gray-400' 
                : 'bg-white text-gray-900 placeholder-gray-500'
            } shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none`}
          />
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto space-x-2 pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : isDarkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
              {category.count > 0 && (
                <span className={`ml-1 text-xs ${
                  selectedCategory === category.id ? 'text-blue-200' : 'text-gray-500'
                }`}>
                  ({category.count})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-2">
          <Filter size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`px-3 py-2 rounded-lg border-0 ${
              isDarkMode 
                ? 'bg-gray-800 text-white' 
                : 'bg-white text-gray-900'
            } shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm`}
          >
            <option value="recent">Ən yeni</option>
            <option value="popular">Ən populyar</option>
            <option value="unanswered">Cavabsız</option>
          </select>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {sortedQuestions.length === 0 ? (
          <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">Heç bir sual tapılmadı</p>
            <p className="text-sm mt-2">Axtarış kriteriyalarını dəyişin və ya yeni sual əlavə edin</p>
          </div>
        ) : (
          sortedQuestions.map((question) => (
            <div
              key={question.id}
              onClick={() => navigate('QADetail', { questionId: question.id })}
              className={`p-4 rounded-xl border cursor-pointer transition-all hover:shadow-lg ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              {/* Status and Category */}
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(question.status)}`}>
                  {getStatusText(question.status)}
                </span>
                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {categories.find(c => c.id === question.category)?.name}
                </span>
              </div>

              {/* Title */}
              <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {question.title}
              </h3>

              {/* Content Preview */}
              <p className={`text-sm mb-3 line-clamp-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {question.content}
              </p>

              {/* Tags */}
              {question.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {question.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                        isDarkMode 
                          ? 'bg-gray-700 text-gray-300' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <Tag size={10} className="mr-1" />
                      {tag}
                    </span>
                  ))}
                  {question.tags.length > 3 && (
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      +{question.tags.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Stats */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Eye size={14} />
                    <span>{question.viewCount}</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Heart size={14} className={question.isLiked ? 'text-red-500 fill-current' : ''} />
                    <span>{question.likeCount}</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <MessageCircle size={14} />
                    <span>{question.messages.length}</span>
                  </div>
                </div>
                <div className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Clock size={14} />
                  <span>{formatTimeAgo(question.updatedAt)}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Empty State for No Questions */}
      {qaQuestions.length === 0 && (
        <div className={`text-center py-16 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <MessageCircle size={64} className="mx-auto mb-6 opacity-30" />
          <h3 className="text-xl font-semibold mb-2">Hələ sual yoxdur</h3>
          <p className="mb-6">İlk sualı siz verin və cavab alın!</p>
          <button
            onClick={() => navigate('QAForm')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors"
          >
            İlk sualı ver
          </button>
        </div>
      )}
    </div>
  );
}