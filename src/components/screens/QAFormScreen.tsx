import React, { useState, useRef } from 'react';
import { useApp } from '../../contexts/AppContext';
import { 
  ArrowLeft, 
  Send, 
  Paperclip, 
  X, 
  Image, 
  FileText, 
  Tag as TagIcon,
  HelpCircle,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

export function QAFormScreen() {
  const { t, isDarkMode, navigate, goBack, submitQuestion } = useApp();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { id: 'traffic-rules', name: 'Yol qaydaları', icon: '🚦', description: 'Yol hərəkəti qaydaları və tənzimlənməsi' },
    { id: 'road-signs', name: 'Yol nişanları', icon: '🚸', description: 'Yol nişanları və onların mənası' },
    { id: 'parking', name: 'Park etmə', icon: '🅿️', description: 'Park etmə qaydaları və məhdudiyyətlər' },
    { id: 'exam-prep', name: 'İmtahan hazırlığı', icon: '📚', description: 'İmtahan strategiyaları və məsləhətlər' },
    { id: 'practical', name: 'Praktik', icon: '🚗', description: 'Sürücülük təcrübəsi və praktiki məsləhətlər' },
    { id: 'other', name: 'Digər', icon: '❓', description: 'Digər suallar və ümumi məsləhətlər' }
  ];

  const suggestedTags = [
    'sürət', 'məhdudiyyət', 'nişan', 'yol', 'şəhər', 'magistral', 
    'park', 'qadağa', 'icazə', 'prioritet', 'piyada', 'keçid',
    'imtahan', 'həyəcan', 'hazırlıq', 'praktik', 'təcrübə'
  ];

  const handleAddTag = (tagValue: string) => {
    const trimmedTag = tagValue.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 5) {
      setTags([...tags, trimmedTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/') || file.type === 'application/pdf';
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      return isValidType && isValidSize;
    });
    
    setAttachments([...attachments, ...validFiles].slice(0, 3)); // Max 3 files
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !selectedCategory) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const success = submitQuestion(title.trim(), content.trim(), selectedCategory, tags, attachments);
      
      if (success) {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        
        // Show success message for 2 seconds then go back
        setTimeout(() => {
          goBack();
        }, 2000);
      } else {
        setIsSubmitting(false);
        alert('Sual göndərilmədi. Yenidən cəhd edin.');
      }
    } catch (error) {
      setIsSubmitting(false);
      alert('Xəta baş verdi. Yenidən cəhd edin.');
    }
  };

  const isFormValid = title.trim() && content.trim() && selectedCategory;

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image size={16} className="text-blue-500" />;
    } else if (file.type === 'application/pdf') {
      return <FileText size={16} className="text-red-500" />;
    }
    return <FileText size={16} className="text-gray-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  if (submitSuccess) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className={`text-center p-8 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg max-w-sm w-full`}>
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
          </div>
          <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Sual Göndərildi!
          </h2>
          <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Sualınız müəllimlərə çatdırıldı. Tezliklə cavab alacaqsınız.
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
                Yeni Sual
              </h1>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Müəllimlərə sual göndərin
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
                <span>Göndərilir...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Send size={16} />
                <span>Göndər</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="p-4 space-y-6 pb-8">
        {/* Category Selection */}
        <div>
          <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Kateqoriya seçin *
          </label>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  selectedCategory === category.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : isDarkMode
                    ? 'border-gray-700 bg-gray-800 hover:border-gray-600'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-lg">{category.icon}</span>
                  <span className={`font-medium text-sm ${
                    selectedCategory === category.id 
                      ? 'text-blue-700 dark:text-blue-300' 
                      : isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {category.name}
                  </span>
                </div>
                <p className={`text-xs ${
                  selectedCategory === category.id 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {category.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Sual başlığı *
          </label>
          <input
            type="text"
            placeholder="Qısa və aydın başlıq yazın..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            className={`w-full px-4 py-3 rounded-xl border-0 ${
              isDarkMode 
                ? 'bg-gray-800 text-white placeholder-gray-400' 
                : 'bg-white text-gray-900 placeholder-gray-500'
            } shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none`}
          />
          <div className="flex justify-between items-center mt-1">
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Aydın və spesifik başlıq yazın
            </p>
            <span className={`text-xs ${
              title.length > 80 ? 'text-red-500' : isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {title.length}/100
            </span>
          </div>
        </div>

        {/* Content */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Sual məzmunu *
          </label>
          <textarea
            placeholder="Sualınızı ətraflı izah edin. Konkret məlumatlar verin..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={1000}
            rows={6}
            className={`w-full px-4 py-3 rounded-xl border-0 resize-none ${
              isDarkMode 
                ? 'bg-gray-800 text-white placeholder-gray-400' 
                : 'bg-white text-gray-900 placeholder-gray-500'
            } shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none`}
          />
          <div className="flex justify-between items-center mt-1">
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Ətraflı məlumat verin ki, daha yaxşı cavab ala biləsiniz
            </p>
            <span className={`text-xs ${
              content.length > 800 ? 'text-red-500' : isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {content.length}/1000
            </span>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Teqlər (maksimum 5)
          </label>
          
          {/* Current Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                    isDarkMode 
                      ? 'bg-blue-900 text-blue-200' 
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  <TagIcon size={12} className="mr-1" />
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Tag Input */}
          {tags.length < 5 && (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Teq əlavə edin..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag(newTag);
                  }
                }}
                className={`w-full px-4 py-2 rounded-lg border-0 ${
                  isDarkMode 
                    ? 'bg-gray-800 text-white placeholder-gray-400' 
                    : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                } focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              />
              
              {/* Suggested Tags */}
              <div>
                <p className={`text-xs mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Təklif olunan teqlər:
                </p>
                <div className="flex flex-wrap gap-1">
                  {suggestedTags
                    .filter(tag => !tags.includes(tag))
                    .slice(0, 8)
                    .map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleAddTag(tag)}
                      className={`px-2 py-1 rounded-md text-xs transition-colors ${
                        isDarkMode 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Attachments */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Fayllar (şəkil və ya PDF, maksimum 3 fayl)
          </label>
          
          {/* Current Attachments */}
          {attachments.length > 0 && (
            <div className="space-y-2 mb-3">
              {attachments.map((file, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                  }`}
                >
                  {getFileIcon(file)}
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {file.name}
                    </p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveAttachment(index)}
                    className={`p-1 rounded-full transition-colors ${
                      isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-500'
                    }`}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add Files Button */}
          {attachments.length < 3 && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`w-full p-4 border-2 border-dashed rounded-xl transition-all ${
                isDarkMode 
                  ? 'border-gray-700 hover:border-gray-600 bg-gray-800/50' 
                  : 'border-gray-300 hover:border-gray-400 bg-gray-50'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <Paperclip size={24} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Fayl əlavə et
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  PNG, JPG, PDF (max 5MB)
                </p>
              </div>
            </button>
          )}
        </div>

        {/* Tips */}
        <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
          <div className="flex items-start space-x-3">
            <HelpCircle size={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className={`font-medium text-sm mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                Yaxşı sual vermək üçün məsləhətlər:
              </h4>
              <ul className={`text-xs space-y-1 ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                <li>• Spesifik və aydın başlıq yazın</li>
                <li>• Kontekst və ətraflı məlumat verin</li>
                <li>• Əgər mümkünsə, şəkil əlavə edin</li>
                <li>• Uyğun teqlər istifadə edin</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        multiple
        accept="image/*,application/pdf"
        onChange={handleFileSelect}
      />
    </div>
  );
}