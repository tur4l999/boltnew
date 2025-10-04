import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { EmojiIcon } from '../ui/EmojiIcon';

export function FeedbackScreen() {
  const { goBack, isDarkMode } = useApp();
  const [rating, setRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [feedback, setFeedback] = useState('');

  const categories = [
    { id: 'bug', label: 'Texniki problem', icon: '🐛', color: 'red' },
    { id: 'feature', label: 'Yeni funksiya təklifi', icon: '💡', color: 'yellow' },
    { id: 'content', label: 'Məzmun haqqında', icon: '📚', color: 'blue' },
    { id: 'ui', label: 'Dizayn və interfeys', icon: '🎨', color: 'purple' },
    { id: 'other', label: 'Digər', icon: '💬', color: 'gray' }
  ];

  const handleSubmit = () => {
    if (!rating) {
      alert('Zəhmət olmasa qiymət verin!');
      return;
    }
    if (!selectedCategory) {
      alert('Zəhmət olmasa kateqoriya seçin!');
      return;
    }
    if (!feedback.trim()) {
      alert('Zəhmət olmasa rəyinizi yazın!');
      return;
    }
    
    alert('✅ Rəyiniz uğurla göndərildi!\n\nFikir və təklifləriniz bizim üçün çox dəyərlidir. Təşəkkür edirik! 🙏');
    setRating(0);
    setSelectedCategory('');
    setFeedback('');
  };

  return (
    <div className={`min-h-screen transition-all duration-300 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
        : 'bg-gradient-to-br from-gray-50 via-white to-emerald-50'
    } pt-11`}>
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-10 right-10 w-40 h-40 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-yellow-500/5' : 'bg-yellow-400/10'
        }`}></div>
      </div>

      <div className="relative z-10 p-4 pb-24">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={goBack}
            className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ${
              isDarkMode 
                ? 'border-gray-600/50 bg-gray-800/80 hover:bg-gray-700/80 text-gray-200 backdrop-blur-sm' 
                : 'border-gray-300/50 bg-white/80 hover:bg-gray-50/80 text-gray-700 backdrop-blur-sm'
            }`}
          >
            <span className="text-lg">←</span>
          </button>
          <div>
            <h1 className={`text-2xl font-black transition-colors duration-200 bg-gradient-to-r ${
              isDarkMode ? 'from-yellow-400 to-orange-400' : 'from-yellow-600 to-orange-600'
            } bg-clip-text text-transparent`}>
              Rəy bildirin
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Fikir və təkliflərinizi paylaşın
            </p>
          </div>
        </div>

        {/* Intro */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp">
          <div className="text-center">
            <div className="text-5xl mb-4">💭</div>
            <h2 className={`font-black text-xl mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Sizin fikriniz bizim üçün dəyərlidir
            </h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Tətbiqi daha da yaxşılaşdırmaq üçün rəy və təkliflərinizi bizə çatdırın
            </p>
          </div>
        </Card>

        {/* Rating */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-yellow-600/20' : 'bg-yellow-100'
            }`}>
              <EmojiIcon emoji="⭐" size={20} />
            </div>
            <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Tətbiqi qiymətləndirin
            </h2>
          </div>

          <div className="flex justify-center gap-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-5xl transition-all duration-300 transform hover:scale-125 ${
                  star <= rating ? 'opacity-100' : 'opacity-30'
                }`}
              >
                ⭐
              </button>
            ))}
          </div>

          {rating > 0 && (
            <div className={`mt-4 text-center font-bold ${
              rating >= 4 
                ? isDarkMode ? 'text-emerald-300' : 'text-emerald-700'
                : isDarkMode ? 'text-yellow-300' : 'text-yellow-700'
            }`}>
              {rating === 5 && '🎉 Əla! Çox sağ olun!'}
              {rating === 4 && '😊 Çox yaxşı!'}
              {rating === 3 && '🙂 Yaxşı'}
              {rating === 2 && '😐 Orta'}
              {rating === 1 && '😔 Təssüflənək'}
            </div>
          )}
        </Card>

        {/* Category */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'
            }`}>
              <EmojiIcon emoji="📋" size={20} />
            </div>
            <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Kateqoriya seçin
            </h2>
          </div>

          <div className="space-y-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full p-4 rounded-2xl border-2 flex items-center gap-3 transition-all duration-300 ${
                  selectedCategory === category.id
                    ? isDarkMode
                      ? 'border-emerald-500 bg-emerald-900/20'
                      : 'border-emerald-500 bg-emerald-50'
                    : isDarkMode
                      ? 'border-gray-700 bg-gray-800/50 hover:bg-gray-700/50'
                      : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="text-2xl">{category.icon}</div>
                <div className="flex-1 text-left">
                  <div className={`font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    {category.label}
                  </div>
                </div>
                {selectedCategory === category.id && (
                  <div className="text-2xl text-emerald-500">✓</div>
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Feedback Text */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-purple-600/20' : 'bg-purple-100'
            }`}>
              <EmojiIcon emoji="✍️" size={20} />
            </div>
            <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Fikir və təklifləriniz
            </h2>
          </div>

          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Fikir və təkliflərinizi ətraflı yazın..."
            rows={6}
            className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 resize-none ${
              isDarkMode
                ? 'border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-500 focus:border-emerald-500'
                : 'border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-emerald-500'
            }`}
          />

          <div className={`mt-2 text-sm text-right ${
            feedback.length > 500 
              ? 'text-red-500' 
              : isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {feedback.length} / 500
          </div>
        </Card>

        {/* Submit Button */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
          <button
            onClick={handleSubmit}
            className={`w-full p-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] ${
              isDarkMode 
                ? 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white' 
                : 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white'
            } shadow-lg hover:shadow-xl`}
          >
            📤 Göndər
          </button>

          <div className={`mt-4 text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Rəyinizi göndərməklə{' '}
            <span className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}>
              Xidmət Şərtləri
            </span>
            ni qəbul etmiş olursunuz
          </div>
        </Card>

        {/* Stats */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '500ms' }}>
          <div className="text-center">
            <div className={`text-3xl font-black mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              1,234+
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              İstifadəçidən alınan rəylər
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className={`p-3 rounded-xl text-center ${isDarkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
              <div className={`text-2xl font-black ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                87%
              </div>
              <div className={`text-xs ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                Müsbət rəy
              </div>
            </div>
            <div className={`p-3 rounded-xl text-center ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
              <div className={`text-2xl font-black ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                4.6
              </div>
              <div className={`text-xs ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                Orta reytinq
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
