import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Icon } from '../icons/Icon';

export function NotificationSettingsScreen() {
  const { goBack, isDarkMode } = useApp();
  
  // Simplified and combined notification settings
  const [notifications, setNotifications] = useState({
    channels: {
      push: true,
      email: true,
      sms: false
    },
    education: true,      // Dərslər + Praktiki Təcrübə
    exams: true,          // Test və İmtahanlar + Nəticələr
    communication: true,  // Mesajlar (müəllim, dəstək, apellyasiya)
    system: true         // Sistem (yeniləmə, bonus, paket)
  });

  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({
    channels: false,
    types: false
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

  const toggleDropdown = (key: string) => {
    setOpenDropdowns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const channels = [
    { key: 'push', label: 'Push bildirişləri', icon: 'smartphone', description: 'Mobil cihazda bildirişlər' },
    { key: 'email', label: 'Email bildirişləri', icon: 'mail', description: 'E-poçt vasitəsilə' },
    { key: 'sms', label: 'SMS bildirişləri', icon: 'message-square', description: 'Telefona mesaj' }
  ];

  const notificationTypes = [
    {
      key: 'education',
      title: 'Təhsil və Təcrübə',
      icon: 'video',
      color: 'purple',
      description: 'Dərslər, onlayn dərslər, praktiki təcrübə və xatırlatmalar'
    },
    {
      key: 'exams',
      title: 'İmtahan və Nəticələr',
      icon: 'document',
      color: 'emerald',
      description: 'Test, imtahan xatırlatmaları və nəticələr'
    },
    {
      key: 'communication',
      title: 'Mesajlaşma',
      icon: 'message-square',
      color: 'indigo',
      description: 'Müəllim cavabları, dəstək və apellyasiya mesajları'
    },
    {
      key: 'system',
      title: 'Sistem Bildirişləri',
      icon: 'settings',
      color: 'gray',
      description: 'Yeniləmələr, bonuslar, paket və nailiyyətlər'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { iconBg: string; iconText: string }> = {
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

  const anyChannelEnabled = Object.values(notifications.channels).some(v => v);
  const enabledTypesCount = notificationTypes.filter(type => notifications[type.key as keyof typeof notifications] as boolean).length;

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

        {/* Bildiriş Kanalları */}
        <Card variant="elevated" padding="lg" className="mb-4 animate-fadeInUp">
          <button
            onClick={() => toggleDropdown('channels')}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                anyChannelEnabled
                  ? isDarkMode ? 'bg-emerald-600/20' : 'bg-emerald-100'
                  : isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'
              }`}>
                <Icon 
                  name="bell" 
                  size={24} 
                  className={anyChannelEnabled 
                    ? isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                    : isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }
                />
              </div>
              <div className="flex-1 text-left">
                <h2 className={`font-bold text-lg mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Bildiriş Kanalları
                </h2>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Push, Email və SMS bildirişləri
                  {anyChannelEnabled && (
                    <span className={`ml-2 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      • {Object.values(notifications.channels).filter(v => v).length} aktiv
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className={`text-2xl transition-transform duration-300 ${
              openDropdowns.channels ? 'rotate-180' : 'rotate-0'
            } ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              ↓
            </div>
          </button>

          {/* Channels dropdown */}
          {openDropdowns.channels && (
            <div className="mt-4 space-y-3 animate-fadeInUp">
              {channels.map((channel) => {
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
                        <div>
                          <div className={`font-bold text-base ${
                            isDarkMode ? 'text-gray-100' : 'text-gray-900'
                          }`}>
                            {channel.label}
                          </div>
                          <div className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {channel.description}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleChannel(channel.key)}
                        className={`ml-3 w-14 h-8 rounded-full flex-shrink-0 transition-all duration-300 ${
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
          )}
        </Card>

        {/* Bildiriş Növü */}
        <Card variant="elevated" padding="lg" className="mb-4 animate-fadeInUp" style={{ animationDelay: '50ms' }}>
          <button
            onClick={() => toggleDropdown('types')}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                enabledTypesCount > 0
                  ? isDarkMode ? 'bg-emerald-600/20' : 'bg-emerald-100'
                  : isDarkMode ? 'bg-purple-600/20' : 'bg-purple-100'
              }`}>
                <Icon 
                  name="settings" 
                  size={24} 
                  className={enabledTypesCount > 0
                    ? isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                    : isDarkMode ? 'text-purple-400' : 'text-purple-600'
                  }
                />
              </div>
              <div className="flex-1 text-left">
                <h2 className={`font-bold text-lg mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Bildiriş Növü
                </h2>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Təhsil, imtahan, mesaj və sistem bildirişləri
                  {enabledTypesCount > 0 && (
                    <span className={`ml-2 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      • {enabledTypesCount} aktiv
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className={`text-2xl transition-transform duration-300 ${
              openDropdowns.types ? 'rotate-180' : 'rotate-0'
            } ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              ↓
            </div>
          </button>

          {/* Types dropdown */}
          {openDropdowns.types && (
            <div className="mt-4 space-y-3 animate-fadeInUp">
              {notificationTypes.map((type) => {
                const colors = getColorClasses(type.color);
                const typeEnabled = notifications[type.key as keyof typeof notifications] as boolean;
                return (
                  <div
                    key={type.key}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                      typeEnabled
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
                          typeEnabled
                            ? isDarkMode ? 'bg-emerald-600/20' : 'bg-emerald-100'
                            : colors.iconBg
                        }`}>
                          <Icon 
                            name={type.icon as any} 
                            size={20} 
                            className={typeEnabled 
                              ? isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                              : colors.iconText
                            }
                          />
                        </div>
                        <div className="flex-1">
                          <div className={`font-bold text-base ${
                            isDarkMode ? 'text-gray-100' : 'text-gray-900'
                          }`}>
                            {type.title}
                          </div>
                          <div className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {type.description}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleNotification(type.key)}
                        className={`ml-3 w-14 h-8 rounded-full flex-shrink-0 transition-all duration-300 ${
                          typeEnabled
                            ? 'bg-emerald-600'
                            : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 ${
                          typeEnabled ? 'translate-x-7' : 'translate-x-1'
                        }`}></div>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        {/* Quick Actions */}
        <Card variant="elevated" padding="lg" className="mt-6 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          <h3 className={`font-bold text-base mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Tez əməliyyatlar
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setNotifications({
                  channels: { push: true, email: true, sms: true },
                  education: true,
                  exams: true,
                  communication: true,
                  system: true
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
                  education: false,
                  exams: false,
                  communication: false,
                  system: false
                });
                setOpenDropdowns({ channels: false, types: false });
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