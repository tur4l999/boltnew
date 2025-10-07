/** @jsxImportSource react */
import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { FadeInUp } from '../ui/FadeInUp';
import { SlideTransition } from '../ui/SlideTransition';
import { EmojiIcon } from '../ui/EmojiIcon';

export function NotificationsScreen() {
  const { t, goBack, isDarkMode, navigate } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const [showMenu, setShowMenu] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['today', 'yesterday']));
  
  // Demo notification data with various types
  const notifications = [
    {
      id: '1',
      type: 'exam_result',
      title: 'İmtahan nəticəsi',
      message: 'Simulyator imtahanından 28/30 bal topladınız. Təbriklər!',
      timestamp: new Date('2025-10-04T10:30:00'),
      isRead: false,
      emoji: '🎉',
      action: () => navigate('Results'),
      color: 'emerald'
    },
    {
      id: '2',
      type: 'practice_reminder',
      title: 'Praktiki təcrübə xatırlatması',
      message: 'Sabah saat 14:00-da praktiki təcrübəniz var. Hazırlaşın!',
      timestamp: new Date('2025-10-04T09:45:00'),
      isRead: false,
      emoji: '🚗',
      action: () => navigate('DrivingPractice'),
      color: 'blue'
    },
    {
      id: '3',
      type: 'package_expiry',
      title: 'Paket bitir tarixi',
      message: 'Premium paketiniz 5 gün sonra bitəcək. Yeniləyin!',
      timestamp: new Date('2025-10-03T09:15:00'),
      isRead: false,
      emoji: '⏰',
      action: () => navigate('Packages'),
      color: 'amber'
    },
    {
      id: '4',
      type: 'appeal_response',
      title: 'Apellyasiya cavabı',
      message: 'Apellyasiyanız qəbul edildi və sual yeniləndi.',
      timestamp: new Date('2025-10-03T14:20:00'),
      isRead: true,
      emoji: '✅',
      action: () => navigate('Appeals'),
      color: 'green'
    },
    {
      id: '5',
      type: 'new_lesson',
      title: 'Yeni dərs əlavə edildi',
      message: 'M15: Park qaydaları mövzusunda yeni 3D video dərs əlavə edildi.',
      timestamp: new Date('2025-10-02T11:00:00'),
      isRead: true,
      emoji: '🎬',
      action: () => navigate('Lesson', { moduleId: 'M15', tab: 'video3d' }),
      color: 'purple'
    },
    {
      id: '6',
      type: 'achievement',
      title: 'Yeni nailiyyət!',
      message: '10 imtahan tamamladınız və "İmtahan ustası" nişanı qazandınız!',
      timestamp: new Date('2025-10-01T18:30:00'),
      isRead: true,
      emoji: '🏆',
      action: () => navigate('Settings'),
      color: 'yellow'
    },
    {
      id: '7',
      type: 'system',
      title: 'Sistem yeniləməsi',
      message: 'Tətbiq yeniləndi. Yeni funksiyalar və təkmilləşdirmələr əlavə edildi.',
      timestamp: new Date('2025-09-28T08:00:00'),
      isRead: true,
      emoji: '🔄',
      color: 'gray'
    },
    {
      id: '8',
      type: 'qa_response',
      title: 'Müəllim cavabı',
      message: 'Müəllim Səbinə sualınıza cavab verdi.',
      timestamp: new Date('2025-09-27T16:45:00'),
      isRead: true,
      emoji: '💬',
      action: () => navigate('QA'),
      color: 'indigo'
    },
    {
      id: '9',
      type: 'referral_bonus',
      title: 'Referal bonusu',
      message: 'Dostunuz Leyla qeydiyyatdan keçdi. 5 AZN bonus qazandınız!',
      timestamp: new Date('2025-09-25T12:30:00'),
      isRead: true,
      emoji: '🎁',
      action: () => navigate('ReferralList'),
      color: 'purple'
    }
  ];

  const filteredNotifications = activeTab === 'unread' 
    ? notifications.filter(n => !n.isRead) 
    : notifications;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Categorize notifications by date
  const categorizeNotifications = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date(today);
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    const categories: Record<string, typeof notifications> = {
      today: [],
      yesterday: [],
      thisWeek: [],
      thisMonth: [],
      older: []
    };

    filteredNotifications.forEach(notification => {
      const notifDate = new Date(notification.timestamp);
      const notifDay = new Date(notifDate.getFullYear(), notifDate.getMonth(), notifDate.getDate());

      if (notifDay.getTime() === today.getTime()) {
        categories.today.push(notification);
      } else if (notifDay.getTime() === yesterday.getTime()) {
        categories.yesterday.push(notification);
      } else if (notifDate >= weekAgo) {
        categories.thisWeek.push(notification);
      } else if (notifDate >= monthAgo) {
        categories.thisMonth.push(notification);
      } else {
        categories.older.push(notification);
      }
    });

    return categories;
  };

  const categories = categorizeNotifications();

  const categoryLabels = {
    today: 'Bugün',
    yesterday: 'Dünən',
    thisWeek: 'Bu həftə',
    thisMonth: 'Bu ay',
    older: 'Keçmiş'
  };

  const categoryIcons = {
    today: '📅',
    yesterday: '📆',
    thisWeek: '📋',
    thisMonth: '🗓️',
    older: '📜'
  };

  const toggleCategory = (categoryKey: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryKey)) {
      newExpanded.delete(categoryKey);
    } else {
      newExpanded.add(categoryKey);
    }
    setExpandedCategories(newExpanded);
  };

  const getColorClasses = (color: string, isRead: boolean) => {
    const opacity = isRead ? '20' : '30';
    const textOpacity = isRead ? '60' : '80';
    
    const colorMap: Record<string, { bg: string; text: string; icon: string }> = {
      emerald: {
        bg: isDarkMode ? `bg-emerald-900/${opacity}` : `bg-emerald-50`,
        text: isDarkMode ? `text-emerald-${textOpacity}` : 'text-emerald-700',
        icon: isDarkMode ? 'bg-emerald-800/50' : 'bg-emerald-100'
      },
      blue: {
        bg: isDarkMode ? `bg-blue-900/${opacity}` : `bg-blue-50`,
        text: isDarkMode ? `text-blue-${textOpacity}` : 'text-blue-700',
        icon: isDarkMode ? 'bg-blue-800/50' : 'bg-blue-100'
      },
      amber: {
        bg: isDarkMode ? `bg-amber-900/${opacity}` : `bg-amber-50`,
        text: isDarkMode ? `text-amber-${textOpacity}` : 'text-amber-700',
        icon: isDarkMode ? 'bg-amber-800/50' : 'bg-amber-100'
      },
      green: {
        bg: isDarkMode ? `bg-green-900/${opacity}` : `bg-green-50`,
        text: isDarkMode ? `text-green-${textOpacity}` : 'text-green-700',
        icon: isDarkMode ? 'bg-green-800/50' : 'bg-green-100'
      },
      purple: {
        bg: isDarkMode ? `bg-purple-900/${opacity}` : `bg-purple-50`,
        text: isDarkMode ? `text-purple-${textOpacity}` : 'text-purple-700',
        icon: isDarkMode ? 'bg-purple-800/50' : 'bg-purple-100'
      },
      yellow: {
        bg: isDarkMode ? `bg-yellow-900/${opacity}` : `bg-yellow-50`,
        text: isDarkMode ? `text-yellow-${textOpacity}` : 'text-yellow-700',
        icon: isDarkMode ? 'bg-yellow-800/50' : 'bg-yellow-100'
      },
      gray: {
        bg: isDarkMode ? `bg-gray-800/${opacity}` : `bg-gray-50`,
        text: isDarkMode ? `text-gray-${textOpacity}` : 'text-gray-700',
        icon: isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'
      },
      indigo: {
        bg: isDarkMode ? `bg-indigo-900/${opacity}` : `bg-indigo-50`,
        text: isDarkMode ? `text-indigo-${textOpacity}` : 'text-indigo-700',
        icon: isDarkMode ? 'bg-indigo-800/50' : 'bg-indigo-100'
      }
    };

    return colorMap[color] || colorMap.gray;
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
        : 'bg-gradient-to-br from-gray-50 via-white to-blue-50'
    }`}>
      {/* Header */}
      <div className={`sticky top-0 z-20 backdrop-blur-xl border-b-2 transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gray-800/90 border-gray-700/50' 
          : 'bg-white/90 border-gray-200/50'
      }`}>
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={goBack}
              className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                isDarkMode 
                  ? 'bg-gray-700/50 text-gray-100 hover:bg-gray-600/50' 
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              <span className="text-xl">←</span>
            </button>
            
            <div className="flex-1">
              <h1 className={`text-xl font-bold transition-colors duration-200 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                {t.notifications}
              </h1>
              {unreadCount > 0 && (
                <p className={`text-sm transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {unreadCount} oxunmamış bildiriş
                </p>
              )}
            </div>

            {/* Settings Menu Button */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                  isDarkMode 
                    ? 'bg-gray-700/50 text-gray-100 hover:bg-gray-600/50' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                } ${showMenu ? 'ring-2 ring-emerald-500' : ''}`}
              >
                <EmojiIcon emoji="⚙️" size={18} />
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <>
                  {/* Backdrop */}
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowMenu(false)}
                  />
                  
                  {/* Menu */}
                  <div className={`absolute right-0 mt-2 w-56 rounded-2xl shadow-2xl border-2 overflow-hidden z-50 transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    {/* Mark all as read */}
                    {unreadCount > 0 && (
                      <button
                        onClick={() => {
                          alert('Hamısı oxundu kimi işarələndi (demo)');
                          setShowMenu(false);
                        }}
                        className={`w-full px-4 py-3 flex items-center gap-3 transition-all duration-200 ${
                          isDarkMode 
                            ? 'hover:bg-gray-700 text-gray-200' 
                            : 'hover:bg-gray-50 text-gray-800'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          isDarkMode ? 'bg-emerald-700/50' : 'bg-emerald-100'
                        }`}>
                          <EmojiIcon emoji="✓" size={16} />
                        </div>
                        <span className="text-sm font-bold">Hamısını oxu</span>
                      </button>
                    )}

                    {/* Delete all notifications */}
                    {filteredNotifications.length > 0 && (
                      <button
                        onClick={() => {
                          if (confirm('Bütün bildirişləri silmək istədiyinizdən əminsiniz?')) {
                            alert('Bütün bildirişlər silindi (demo)');
                            setShowMenu(false);
                          }
                        }}
                        className={`w-full px-4 py-3 flex items-center gap-3 transition-all duration-200 ${
                          isDarkMode 
                            ? 'hover:bg-red-900/20 text-red-400' 
                            : 'hover:bg-red-50 text-red-600'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          isDarkMode ? 'bg-red-900/50' : 'bg-red-100'
                        }`}>
                          <EmojiIcon emoji="🗑️" size={16} />
                        </div>
                        <span className="text-sm font-bold">Hamısını sil</span>
                      </button>
                    )}

                    {/* Divider */}
                    <div className={`h-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />

                    {/* Notification settings */}
                    <button
                      onClick={() => {
                        navigate('NotificationSettings');
                        setShowMenu(false);
                      }}
                      className={`w-full px-4 py-3 flex items-center gap-3 transition-all duration-200 ${
                        isDarkMode 
                          ? 'hover:bg-gray-700 text-gray-200' 
                          : 'hover:bg-gray-50 text-gray-800'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'
                      }`}>
                        <EmojiIcon emoji="🔔" size={16} />
                      </div>
                      <span className="text-sm font-bold">Bildiriş ayarları</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                activeTab === 'all'
                  ? isDarkMode
                    ? 'bg-emerald-700 text-emerald-100 shadow-lg'
                    : 'bg-emerald-600 text-white shadow-lg'
                  : isDarkMode
                    ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Hamısı ({notifications.length})
            </button>
            <button
              onClick={() => setActiveTab('unread')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 relative ${
                activeTab === 'unread'
                  ? isDarkMode
                    ? 'bg-emerald-700 text-emerald-100 shadow-lg'
                    : 'bg-emerald-600 text-white shadow-lg'
                  : isDarkMode
                    ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Oxunmamış ({unreadCount})
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto p-4 pb-24">
        {filteredNotifications.length === 0 ? (
          // Empty state
          <FadeInUp delay={100}>
            <Card className={`p-8 text-center ${
              isDarkMode 
                ? 'bg-gray-800/80 border-gray-700/50' 
                : 'bg-white/80 border-gray-200/50'
            }`}>
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
                isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'
              }`}>
                <span className="text-4xl">🔔</span>
              </div>
              <h3 className={`text-lg font-bold mb-2 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                Bildiriş yoxdur
              </h3>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {activeTab === 'unread' 
                  ? 'Bütün bildirişlər oxunub' 
                  : 'Hələ heç bir bildiriş almamısınız'}
              </p>
            </Card>
          </FadeInUp>
        ) : (
          // Categorized notifications list
          <div className="space-y-4">
            {Object.entries(categories).map(([categoryKey, categoryNotifications], catIndex) => {
              if (categoryNotifications.length === 0) return null;
              
              const isExpanded = expandedCategories.has(categoryKey);
              const unreadInCategory = categoryNotifications.filter(n => !n.isRead).length;

              return (
                <div key={categoryKey} className="animate-fadeInUp" style={{ animationDelay: `${catIndex * 50}ms` }}>
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(categoryKey)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl mb-3 transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-gray-800/80 hover:bg-gray-700/80 border-2 border-gray-700'
                        : 'bg-white/80 hover:bg-gray-50 border-2 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isDarkMode ? 'bg-emerald-600/20' : 'bg-emerald-100'
                      }`}>
                        <span className="text-xl">{categoryIcons[categoryKey as keyof typeof categoryIcons]}</span>
                      </div>
                      <div className="text-left">
                        <div className={`font-black text-lg ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                          {categoryLabels[categoryKey as keyof typeof categoryLabels]}
                        </div>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {categoryNotifications.length} bildiriş
                          {unreadInCategory > 0 && ` • ${unreadInCategory} oxunmamış`}
                        </div>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2`}>
                      {unreadInCategory > 0 && (
                        <div className="w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                          {unreadInCategory}
                        </div>
                      )}
                      <div className={`text-2xl transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : 'rotate-0'
                      } ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        ↓
                      </div>
                    </div>
                  </button>

                  {/* Category Notifications */}
                  {isExpanded && (
                    <div className="space-y-3 ml-2">
                      {categoryNotifications.map((notification, index) => {
                        const colors = getColorClasses(notification.color, notification.isRead);
                        
                        return (
                          <SlideTransition key={notification.id} direction="right" delay={index * 30}>
                            <button
                              onClick={() => {
                                if (notification.action) {
                                  notification.action();
                                }
                              }}
                              className={`w-full text-left rounded-2xl border-2 p-4 transition-all duration-300 transform hover:shadow-lg group relative overflow-hidden ${
                                isDarkMode
                                  ? `${colors.bg} border-gray-700/50 hover:border-gray-600 hover:scale-[1.02]`
                                  : `${colors.bg} border-gray-200/50 hover:border-gray-300 hover:scale-[1.02]`
                              }`}
                            >
                              {/* Unread indicator */}
                              {!notification.isRead && (
                                <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
                              )}

                              <div className="flex gap-3">
                                {/* Icon */}
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 ${colors.icon}`}>
                                  <EmojiIcon emoji={notification.emoji} size={24} />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                  <div className={`text-sm font-bold mb-1 transition-colors duration-200 ${
                                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                                  } ${notification.isRead ? 'opacity-80' : ''}`}>
                                    {notification.title}
                                  </div>
                                  <div className={`text-sm mb-2 line-clamp-2 transition-colors duration-200 ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                  } ${notification.isRead ? 'opacity-70' : ''}`}>
                                    {notification.message}
                                  </div>
                                  <div className={`text-xs font-medium ${colors.text} flex items-center gap-2`}>
                                    <span>⏱</span>
                                    <span>{formatTimestamp(notification.timestamp)}</span>
                                  </div>
                                </div>

                                {/* Arrow indicator */}
                                {notification.action && (
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 ${
                                    isDarkMode ? 'bg-gray-700/30' : 'bg-gray-200/50'
                                  }`}>
                                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>→</span>
                                  </div>
                                )}
                              </div>
                            </button>
                          </SlideTransition>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Settings button at bottom */}
        {filteredNotifications.length > 0 && (
          <FadeInUp delay={300}>
            <button
              onClick={() => navigate('NotificationSettings')}
              className={`w-full mt-6 p-4 rounded-2xl border-2 flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-[1.02] ${
                isDarkMode
                  ? 'bg-gray-800/50 border-gray-700/50 text-gray-300 hover:bg-gray-700/50'
                  : 'bg-white/50 border-gray-200/50 text-gray-700 hover:bg-gray-100/50'
              }`}
            >
              <EmojiIcon emoji="⚙️" size={20} />
              <span className="text-sm font-bold">Bildiriş ayarları</span>
            </button>
          </FadeInUp>
        )}
      </div>
    </div>
  );
}
