import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { 
  ArrowLeft, 
  Send, 
  CheckCircle,
  User
} from 'lucide-react';

export function QAFormScreen() {
  const { t, isDarkMode, navigate, goBack, startNewChat, qaTeachers } = useApp();
  const [subject, setSubject] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const categories = [
    { id: 'traffic-rules', name: 'Yol qaydaları', icon: '🚦', description: 'Yol hərəkəti qaydaları və tənzimlənməsi' },
    { id: 'road-signs', name: 'Yol nişanları', icon: '🚸', description: 'Yol nişanları və onların mənası' },
    { id: 'parking', name: 'Park etmə', icon: '🅿️', description: 'Park etmə qaydaları və məhdudiyyətlər' },
    { id: 'exam-prep', name: 'İmtahan hazırlığı', icon: '📚', description: 'İmtahan strategiyaları və məsləhətlər' },
    { id: 'practical', name: 'Praktik', icon: '🚗', description: 'Sürücülük təcrübəsi və praktiki məsləhətlər' },
    { id: 'other', name: 'Digər', icon: '❓', description: 'Digər suallar və ümumi məsləhətlər' }
  ];

  const handleSubmit = async () => {
    if (!subject.trim() || !selectedCategory) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const chatId = startNewChat(subject.trim(), selectedCategory, selectedTeacher || undefined);
      
      if (chatId) {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        
        // Show success message for 1 second then navigate to chat
        setTimeout(() => {
          navigate('QADetail', { chatId });
        }, 1000);
      } else {
        setIsSubmitting(false);
        alert('Yazışma başladılmadı. Yenidən cəhd edin.');
      }
    } catch (error) {
      setIsSubmitting(false);
      alert('Xəta baş verdi. Yenidən cəhd edin.');
    }
  };

  const isFormValid = subject.trim() && selectedCategory;

  if (submitSuccess) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className={`text-center p-8 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg max-w-iphone16 w-full`}>
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
          </div>
          <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Yazışma Başladıldı!
          </h2>
          <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Yazışmaya yönləndirilirsiniz...
          </p>
          <div className="w-8 h-1 bg-green-500 rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 p-4 border-b ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={goBack}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <ArrowLeft size={20} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
            </button>
            <div>
              <h1 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Yeni Yazışma
              </h1>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Müəllimlə yazışma başladın
              </p>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              isFormValid && !isSubmitting
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                : isDarkMode 
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                <span>Başladılır...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Send size={16} />
                <span>Başlat</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="p-4 space-y-6 pb-8">
        {/* Subject */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Mövzu *
          </label>
          <input
            type="text"
            placeholder="Sual mövzusunu yazın..."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            maxLength={100}
            className={`w-full px-4 py-3 rounded-xl border-0 ${
              isDarkMode 
                ? 'bg-gray-800 text-white placeholder-gray-400' 
                : 'bg-white text-gray-900 placeholder-gray-500'
            } shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none`}
          />
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Məsələn: "Şəhər daxilində sürət məhdudiyyəti"
          </p>
        </div>

        {/* Category Selection */}
        <div>
          <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Kateqoriya seçin *
          </label>
          <div className="grid grid-cols-1 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  selectedCategory === category.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : isDarkMode
                    ? 'border-gray-700 bg-gray-800 hover:border-gray-600'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <span className={`font-medium block ${
                      selectedCategory === category.id 
                        ? 'text-blue-700 dark:text-blue-300' 
                        : isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {category.name}
                    </span>
                    <p className={`text-sm ${
                      selectedCategory === category.id 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {category.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Teacher Selection (Optional) */}
        <div>
          <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Müəllim seçin (istəyə görə)
          </label>
          <div className="space-y-2">
            <button
              onClick={() => setSelectedTeacher('')}
              className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                selectedTeacher === ''
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                  : isDarkMode
                  ? 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <span className={`font-medium block ${
                    selectedTeacher === '' 
                      ? 'text-blue-700 dark:text-blue-300' 
                      : isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Avtomatik təyin et
                  </span>
                  <p className={`text-sm ${
                    selectedTeacher === '' 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Uyğun müəllim avtomatik təyin ediləcək
                  </p>
                </div>
              </div>
            </button>
            
            {qaTeachers.map((teacher) => (
              <button
                key={teacher.id}
                onClick={() => setSelectedTeacher(teacher.id)}
                className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                  selectedTeacher === teacher.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : isDarkMode
                    ? 'border-gray-700 bg-gray-800 hover:border-gray-600'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <span className="text-2xl">{teacher.avatar}</span>
                    {teacher.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    )}
                  </div>
                  <div>
                    <span className={`font-medium block ${
                      selectedTeacher === teacher.id 
                        ? 'text-blue-700 dark:text-blue-300' 
                        : isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {teacher.name}
                    </span>
                    <p className={`text-sm ${
                      selectedTeacher === teacher.id 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {teacher.isOnline ? 'Onlayn' : 'Oflayn'}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
          <div className="text-center">
            <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>
              💬 Yazışma başladıldıqdan sonra
            </h4>
            <p className={`text-sm ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`}>
              Sualınızı birbaşa müəllimlə yazışa biləcəksiniz. Fayllar qoşa bilər və real vaxt rejimində cavab ala bilərsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
