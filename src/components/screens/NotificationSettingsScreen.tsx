import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Icon } from '../icons/Icon';

export function NotificationSettingsScreen() {
  const { goBack, isDarkMode } = useApp();
  
  // Simplified notification settings - one toggle per group
  const [notifications, setNotifications] = useState({
    channels: {
      push: true,
      email: true,
      sms: false
    },
    lessons: true,
    tests: true,
    practice: true,
    system: true,
    messages: true
  });

  const toggleNotification = (key: string) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const toggleChannel = (channel: string) => {
    setNotifications(prev => ({
      ...prev,
      channels: {
        ...prev.channels,
        [channel]: !prev.channels[channel as keyof typeof prev.channels]
      }
    }));
  };

  const notificationGroups = [
    {
      key: 'channels',
      title: 'Bildiriş Kanalları',
      icon: 'bell',
      color: 'blue',
      description: 'Bildirişlərin hansı kanallarla göndərilməsi',
      isChannelGroup: true,
      channels: [
        { key: 'push', label: 'Push', icon: 'smartphone' },
        { key: 'email', label: 'Email', icon: 'mail' },
        { key: 'sms', label: 'SMS', icon: 'message-square' }
      ]
    },
    {
      key: 'lessons',
      title: 'Dərslər',
      icon: 'video',
      color: 'purple',
      description: 'Yeni dərslər, onlayn dərslər və xatırlatmalar'
    },
    {
      key: 'tests',
      title: 'Test və İmtahanlar',
      icon: 'document',
      color: 'emerald',
      description: 'İmtahan xatırlatmaları və nəticələr'
    },
    {
      key: 'practice',
      title: 'Praktiki Təcrübə',
      icon: 'car',
      color: 'blue',
      description: 'Təcrübə xatırlatmaları və instruktor mesajları'
    },
    {
      key: 'system',
      title: 'Sistem',
      icon: 'settings',
      color: 'gray',
      description: 'Yeniləmələr, paket bitir tarixi, bonuslar və nailiyyətlər'
    },
    {
      key: 'messages',
      title: 'Mesajlar',
      icon: 'message-square',
      color: 'indigo',
      description: 'Dəstək, müəllim və apellyasiya cavabları'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { iconBg: string; iconText: string }> = {
      blue: {
        iconBg: isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100',
        iconText: isDarkMode ? 'text-blue-400' : 'text-blue-600'
      },
      purple: {
        iconBg: isDarkMode ? 'bg-purple-600/20' : 'bg-purple-100',
        iconText: isDarkMode ? 'text-purple-400' : 'text-purple-600'
      },
      emerald: {
        iconBg: isDarkMode ? 'bg-emerald-600/20' : 'bg-emerald-100',
        iconText: isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
      },
      gray: {
        iconBg: isDarkMode ? 'bg-gray-600/20' : 'bg-gray-100',
        iconText: isDarkMode ? 'text-gray-400' : 'text-gray-600'
      },
      indigo: {
        iconBg: isDarkMode ? 'bg-indigo-600/20' : 'bg-indigo-100',
        iconText: isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
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
          {notificationGroups.map((group, index) => {
            const colors = getColorClasses(group.color);
            const isEnabled = group.isChannelGroup 
              ? Object.values(notifications.channels).some(v => v)
              : notifications[group.key as keyof typeof notifications] as boolean;

            return (
              <Card 
                key={group.key} 
                variant="elevated" 
                padding="lg" 
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {group.isChannelGroup ? (
                  // Channel group - special handling
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors.iconBg}`}>
                        <Icon name={group.icon as any} size={20} className={colors.iconText} />
                      </div>
                      <div className="flex-1">
                        <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                          {group.title}
                        </h2>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {group.description}
                        </p>
                      </div>
                    </div>

                    {/* Channel toggles */}
                    <div className="space-y-3">
                      {group.channels?.map((channel) => {
                        const channelEnabled = notifications.channels[channel.key as keyof typeof notifications.channels];
                        return (
                          <div
                            key={channel.key}
                            className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                              channelEnabled
                                ? isDarkMode
                                  ? 'border-emerald-500/50 bg-emerald-900/20'
                                  : 'border-emerald-500/50 bg-emerald-50'
                                : isDarkMode
                                  ? 'border-gray-700 bg-gray-800/50'
                                  : 'border-gray-200 bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                  channelEnabled
                                    ? isDarkMode ? 'bg-emerald-600/20' : 'bg-emerald-100'
                                    : isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                                }`}>
                                  <Icon 
                                    name={channel.icon as any} 
                                    size={20} 
                                    className={channelEnabled 
                                      ? isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                                      : isDarkMode ? 'text-gray-500' : 'text-gray-400'
                                    }
                                  />
                                </div>
                                <div className={`font-bold text-lg ${
                                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                                }`}>
                                  {channel.label}
                                </div>
                              </div>
                              <button
                                onClick={() => toggleChannel(channel.key)}
                                className={`w-14 h-8 rounded-full transition-all duration-300 ${
                                  channelEnabled
                                    ? 'bg-emerald-600'
                                    : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                                }`}
                              >
                                <div className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 ${
                                  channelEnabled ? 'translate-x-7' : 'translate-x-1'
                                }`}></div>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  // Regular group - single toggle
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isEnabled
                          ? isDarkMode ? 'bg-emerald-600/20' : 'bg-emerald-100'
                          : colors.iconBg
                      }`}>
                        <Icon 
                          name={group.icon as any} 
                          size={24} 
                          className={isEnabled 
                            ? isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                            : colors.iconText
                          }
                        />
                      </div>
                      <div className="flex-1">
                        <h2 className={`font-bold text-lg mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                          {group.title}
                        </h2>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {group.description}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleNotification(group.key)}
                      className={`ml-4 w-14 h-8 rounded-full transition-all duration-300 flex-shrink-0 ${
                        isEnabled
                          ? 'bg-emerald-600'
                          : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 ${
                        isEnabled ? 'translate-x-7' : 'translate-x-1'
                      }`}></div>
                    </button>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card variant="elevated" padding="lg" className="mt-6 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          <h3 className={`font-bold text-base mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Tez əməliyyatlar
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setNotifications({
                  channels: { push: true, email: true, sms: true },
                  lessons: true,
                  tests: true,
                  practice: true,
                  system: true,
                  messages: true
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
                setNotifications({
                  channels: { push: false, email: false, sms: false },
                  lessons: false,
                  tests: false,
                  practice: false,
                  system: false,
                  messages: false
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
