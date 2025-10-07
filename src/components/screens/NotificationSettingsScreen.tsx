import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Icon } from '../icons/Icon';

export function NotificationSettingsScreen() {
  const { goBack, isDarkMode } = useApp();
  
  // Grouped notification settings
  const [notificationGroups, setNotificationGroups] = useState({
    channels: {
      push: true,
      email: true,
      sms: false
    },
    lessons: {
      newLesson: true,
      onlineLesson: true,
      lessonReminder: true
    },
    tests: {
      examReminder: true,
      testReminder: true,
      results: true
    },
    practice: {
      practiceReminder: true,
      instructorMessage: true
    },
    system: {
      updates: true,
      promotions: false,
      referralBonus: true,
      packageExpiry: true,
      achievements: true
    },
    messages: {
      supportMessages: true,
      teacherResponse: true,
      appealResponse: true
    }
  });

  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(['channels', 'lessons', 'tests'])
  );

  const toggleGroup = (groupKey: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupKey)) {
      newExpanded.delete(groupKey);
    } else {
      newExpanded.add(groupKey);
    }
    setExpandedGroups(newExpanded);
  };

  const toggleNotification = (group: string, key: string) => {
    setNotificationGroups(prev => {
      const currentGroup = prev[group as keyof typeof prev] as Record<string, boolean>;
      return {
        ...prev,
        [group]: {
          ...currentGroup,
          [key]: !currentGroup[key]
        }
      };
    });
  };

  const toggleAllInGroup = (group: string, value: boolean) => {
    const groupKeys = Object.keys(notificationGroups[group as keyof typeof notificationGroups]);
    const newGroupSettings = {} as any;
    groupKeys.forEach(key => {
      newGroupSettings[key] = value;
    });
    
    setNotificationGroups(prev => ({
      ...prev,
      [group]: newGroupSettings
    }));
  };

  const groupConfigs = {
    channels: {
      title: 'Bildiriş Kanalları',
      icon: 'bell',
      color: 'blue',
      items: {
        push: { label: 'Push bildirişləri', description: 'Mobil cihazda bildirişlər' },
        email: { label: 'Email bildirişləri', description: 'E-poçt vasitəsilə bildirişlər' },
        sms: { label: 'SMS bildirişləri', description: 'Telefona mesaj göndərilməsi' }
      }
    },
    lessons: {
      title: 'Dərslər',
      icon: 'video',
      color: 'purple',
      items: {
        newLesson: { label: 'Yeni dərs', description: 'Yeni dərs əlavə edildikdə' },
        onlineLesson: { label: 'Onlayn dərs', description: 'Onlayn dərs başlayanda' },
        lessonReminder: { label: 'Dərs xatırlatması', description: 'Planlaşdırılmış dərslər haqqında' }
      }
    },
    tests: {
      title: 'Test və İmtahanlar',
      icon: 'document',
      color: 'emerald',
      items: {
        examReminder: { label: 'İmtahan xatırlatması', description: 'Gələcək imtahanlar haqqında' },
        testReminder: { label: 'Test xatırlatması', description: 'Tamamlanmamış testlər haqqında' },
        results: { label: 'Nəticələr', description: 'İmtahan və test nəticələri hazır olduqda' }
      }
    },
    practice: {
      title: 'Praktiki Təcrübə',
      icon: 'car',
      color: 'blue',
      items: {
        practiceReminder: { label: 'Təcrübə xatırlatması', description: 'Praktiki təcrübə günü' },
        instructorMessage: { label: 'İnstruktor mesajı', description: 'İnstruktordan bildirişlər' }
      }
    },
    system: {
      title: 'Sistem Bildirişləri',
      icon: 'settings',
      color: 'gray',
      items: {
        updates: { label: 'Yeniləmələr', description: 'Yeni funksiyalar və təkmilləşdirmələr' },
        promotions: { label: 'Kampaniyalar', description: 'Xüsusi təkliflər və endirimlər' },
        referralBonus: { label: 'Referal bonusu', description: 'Dəvət edilən dostlar üçün bonuslar' },
        packageExpiry: { label: 'Paket bitir tarixi', description: 'Paketiniz bitəndə xəbərdarlıq' },
        achievements: { label: 'Nailiyyətlər', description: 'Yeni nailiyyət qazandıqda' }
      }
    },
    messages: {
      title: 'Mesajlar',
      icon: 'message-square',
      color: 'indigo',
      items: {
        supportMessages: { label: 'Dəstək mesajları', description: 'Dəstək komandası cavabları' },
        teacherResponse: { label: 'Müəllim cavabı', description: 'Suallarınıza müəllim cavabları' },
        appealResponse: { label: 'Apellyasiya cavabı', description: 'Apellyasiya nəticələri' }
      }
    }
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { iconBg: string; iconText: string; border: string; bg: string }> = {
      blue: {
        iconBg: isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100',
        iconText: isDarkMode ? 'text-blue-400' : 'text-blue-600',
        border: isDarkMode ? 'border-blue-700/50' : 'border-blue-200/50',
        bg: isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'
      },
      purple: {
        iconBg: isDarkMode ? 'bg-purple-600/20' : 'bg-purple-100',
        iconText: isDarkMode ? 'text-purple-400' : 'text-purple-600',
        border: isDarkMode ? 'border-purple-700/50' : 'border-purple-200/50',
        bg: isDarkMode ? 'bg-purple-900/20' : 'bg-purple-50'
      },
      emerald: {
        iconBg: isDarkMode ? 'bg-emerald-600/20' : 'bg-emerald-100',
        iconText: isDarkMode ? 'text-emerald-400' : 'text-emerald-600',
        border: isDarkMode ? 'border-emerald-700/50' : 'border-emerald-200/50',
        bg: isDarkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'
      },
      gray: {
        iconBg: isDarkMode ? 'bg-gray-600/20' : 'bg-gray-100',
        iconText: isDarkMode ? 'text-gray-400' : 'text-gray-600',
        border: isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50',
        bg: isDarkMode ? 'bg-gray-800/20' : 'bg-gray-50'
      },
      indigo: {
        iconBg: isDarkMode ? 'bg-indigo-600/20' : 'bg-indigo-100',
        iconText: isDarkMode ? 'text-indigo-400' : 'text-indigo-600',
        border: isDarkMode ? 'border-indigo-700/50' : 'border-indigo-200/50',
        bg: isDarkMode ? 'bg-indigo-900/20' : 'bg-indigo-50'
      }
    };
    return colorMap[color] || colorMap.gray;
  };

  return (
    <div className={`min-h-screen transition-all duration-300 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
        : 'bg-gradient-to-br from-gray-50 via-white to-emerald-50'
    } pt-11`}>
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-10 right-10 w-40 h-40 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-blue-500/5' : 'bg-blue-400/10'
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
              isDarkMode ? 'from-blue-400 to-cyan-400' : 'from-blue-600 to-cyan-600'
            } bg-clip-text text-transparent`}>
              Bildiriş Ayarları
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Bildiriş növlərini idarə edin
            </p>
          </div>
        </div>

        {/* Notification Groups */}
        <div className="space-y-4">
          {Object.entries(groupConfigs).map(([groupKey, config], index) => {
            const isExpanded = expandedGroups.has(groupKey);
            const groupSettings = notificationGroups[groupKey as keyof typeof notificationGroups];
            const allEnabled = Object.values(groupSettings).every(v => v);
            const someEnabled = Object.values(groupSettings).some(v => v);
            const colors = getColorClasses(config.color);

            return (
              <Card 
                key={groupKey} 
                variant="elevated" 
                padding="md" 
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Group Header */}
                <button
                  onClick={() => toggleGroup(groupKey)}
                  className="w-full flex items-center justify-between mb-3"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors.iconBg}`}>
                      <Icon name={config.icon as any} size={20} className={colors.iconText} />
                    </div>
                    <div className="text-left">
                      <h2 className={`font-bold text-base ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        {config.title}
                      </h2>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {Object.keys(config.items).length} bildiriş növü
                        {someEnabled && ` • ${Object.values(groupSettings).filter(v => v).length} aktiv`}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {someEnabled && (
                      <div className={`w-2 h-2 rounded-full ${allEnabled ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                    )}
                    <div className={`text-xl transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : 'rotate-0'
                    } ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      ↓
                    </div>
                  </div>
                </button>

                {/* Group Quick Actions */}
                {isExpanded && (
                  <div className="mb-4 flex gap-2">
                    <button
                      onClick={() => toggleAllInGroup(groupKey, true)}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all duration-300 ${
                        isDarkMode
                          ? 'bg-emerald-900/30 hover:bg-emerald-900/40 text-emerald-300'
                          : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700'
                      }`}
                    >
                      ✓ Hamısını aç
                    </button>
                    <button
                      onClick={() => toggleAllInGroup(groupKey, false)}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all duration-300 ${
                        isDarkMode
                          ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      ✕ Hamısını bağla
                    </button>
                  </div>
                )}

                {/* Group Items */}
                {isExpanded && (
                  <div className="space-y-2">
                    {Object.entries(config.items).map(([itemKey, itemConfig]) => (
                      <div
                        key={itemKey}
                        className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                          groupSettings[itemKey as keyof typeof groupSettings]
                            ? `${colors.border} ${colors.bg}`
                            : isDarkMode
                              ? 'border-gray-700 bg-gray-800/50'
                              : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className={`font-bold text-sm mb-1 ${
                              isDarkMode ? 'text-gray-100' : 'text-gray-900'
                            }`}>
                              {itemConfig.label}
                            </div>
                            <div className={`text-xs ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {itemConfig.description}
                            </div>
                          </div>
                          <button
                            onClick={() => toggleNotification(groupKey, itemKey)}
                            className={`ml-3 w-12 h-7 rounded-full transition-all duration-300 flex-shrink-0 ${
                              groupSettings[itemKey as keyof typeof groupSettings]
                                ? 'bg-emerald-600'
                                : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-300 ${
                              groupSettings[itemKey as keyof typeof groupSettings] ? 'translate-x-6' : 'translate-x-1'
                            }`}></div>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Global Quick Actions */}
        <Card variant="elevated" padding="lg" className="mt-6 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          <h3 className={`font-bold text-base mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Tez əməliyyatlar
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                Object.keys(notificationGroups).forEach(group => {
                  toggleAllInGroup(group, true);
                });
                alert('✅ Bütün bildirişlər aktiv edildi');
              }}
              className={`p-4 rounded-2xl border-2 font-bold transition-all duration-300 hover:scale-[1.02] ${
                isDarkMode 
                  ? 'border-emerald-500/50 bg-emerald-900/20 hover:bg-emerald-900/30 text-emerald-300' 
                  : 'border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
              }`}
            >
              ✓ Hamısını aç
            </button>
            <button
              onClick={() => {
                Object.keys(notificationGroups).forEach(group => {
                  toggleAllInGroup(group, false);
                });
                alert('🔕 Bütün bildirişlər deaktiv edildi');
              }}
              className={`p-4 rounded-2xl border-2 font-bold transition-all duration-300 hover:scale-[1.02] ${
                isDarkMode 
                  ? 'border-gray-700 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300' 
                  : 'border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              ✕ Hamısını bağla
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
