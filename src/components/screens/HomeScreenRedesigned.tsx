/** @jsxImportSource react */
import React, { useMemo } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Progress } from '../ui/Progress';
import { FadeInUp } from '../ui/FadeInUp';
import { SlideTransition } from '../ui/SlideTransition';
import { ScaleIn } from '../ui/ScaleIn';
import { EmojiIcon } from '../ui/EmojiIcon';

export function HomeScreenRedesigned() {
  const { t, navigate, hasActivePackage, isDarkMode, activatePackageNow, activePackage } = useApp();
  
  // Kategoriyalara ayırılmış item-lar daha yaxşı UX üçün
  const quickActions = [
    { key: 'quick', label: 'Sürətli Test', action: () => navigate('QuickTest', { ticket: 1 }), emoji: '⚡', color: 'from-blue-500 to-cyan-500', priority: 'high' },
    { key: 'examSimulator', label: 'Sınaq İmtahanı', action: () => navigate('ExamConfig', { mode: 'simulator' }), emoji: '🎯', color: 'from-emerald-500 to-green-500', priority: 'high' },
  ];

  const learningItems = [
    { key: 'video3d', label: 'Video Dərslər', action: () => navigate('Lesson', { moduleId: 'M8', tab: 'video3d' }), emoji: '🎬', color: 'from-purple-500 to-pink-500' },
    { key: 'onlineLesson', label: 'Canlı Dərslər', action: () => navigate('OnlineLessons'), emoji: '👨‍🏫', color: 'from-orange-500 to-red-500' },
    { key: 'notes', label: 'Qeydlər', action: () => navigate('Lesson', { moduleId: 'M8', tab: 'materials' }), emoji: '📝', color: 'from-indigo-500 to-blue-500' },
    { key: 'signs', label: 'Yol Nişanları', action: () => navigate('Signs'), emoji: '🛑', color: 'from-red-500 to-pink-500' },
  ];

  const practiceItems = [
    { key: 'tests', label: 'Test Məşqləri', action: () => navigate('Exam', { defaultTab: 'byTickets' }), emoji: '📄', color: 'from-teal-500 to-cyan-500' },
    { key: 'results', label: 'Nəticələrim', action: () => navigate('Results'), emoji: '📊', color: 'from-green-500 to-emerald-500' },
    { key: 'articles', label: 'Qaydalar', action: () => navigate('Rules'), emoji: '📜', color: 'from-amber-500 to-orange-500' },
    { key: 'fines', label: 'Cərimələr', action: () => navigate('Fines'), emoji: '💰', color: 'from-rose-500 to-red-500' },
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-950 via-gray-950 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-white to-emerald-50/50'
    }`}>
      
      {/* Modern Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl ${
          isDarkMode ? 'bg-emerald-500/5' : 'bg-emerald-400/10'
        } animate-float-gentle`}></div>
        <div className={`absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl ${
          isDarkMode ? 'bg-blue-500/5' : 'bg-blue-400/8'
        } animate-float-gentle`} style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="content-padding space-comfortable-lg pb-28 relative z-10">
        
        {/* Hero Section - User Greeting */}
        <ScaleIn delay={100}>
          <div className="text-center space-y-4 mb-8">
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl glass-comfort ${
              isDarkMode ? 'shadow-xl' : 'shadow-lg'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-green-600 flex items-center justify-center text-white text-xl font-black shadow-lg">
                T
              </div>
              <div className="text-left">
                <div className="text-xs text-comfort-secondary font-medium">Xoş gəlmisiniz</div>
                <div className="visual-hierarchy-2 text-comfort-primary">Tural Qarayev</div>
              </div>
            </div>
          </div>
        </ScaleIn>

        {/* Package Status */}
        {hasActivePackage() && (
          <FadeInUp delay={200}>
            <Card variant="glass" className="mb-6 p-5 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-emerald-500/20">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-green-600 flex items-center justify-center text-white text-2xl shadow-lg">
                  👑
                </div>
                <div className="flex-1">
                  <div className="visual-hierarchy-3 text-emerald-600 font-bold mb-1">
                    Premium Paket Aktiv
                  </div>
                  <div className="text-sm text-comfort-secondary">
                    Bitmə: {activePackage?.expiryDate.toLocaleDateString('az-AZ')}
                  </div>
                </div>
                <div className="px-4 py-2 bg-emerald-500/20 rounded-xl">
                  <div className="text-xs font-bold text-emerald-600">PRO</div>
                </div>
              </div>
            </Card>
          </FadeInUp>
        )}

        {/* Progress Section - Daha prominent */}
        <FadeInUp delay={300}>
          <Card variant="glass" className="mb-8 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="visual-hierarchy-2 text-comfort-primary mb-1">Hazırlıq Səviyyəniz</div>
                <div className="text-sm text-comfort-secondary">M8: Yol nişanları</div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-emerald-600">42%</div>
                <div className="text-xs text-comfort-secondary">tamamlandı</div>
              </div>
            </div>
            <Progress value={42} variant="animated" className="h-4 mb-4" />
            <button 
              onClick={() => navigate('Lesson', { moduleId: 'M8' })}
              className="w-full p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold button-press comfort-hover focus-ring shadow-lg"
            >
              Davam et →
            </button>
          </Card>
        </FadeInUp>

        {/* Quick Actions - Hero CTA-lar */}
        <div className="mb-8">
          <div className="visual-hierarchy-2 text-comfort-primary mb-4">Sürətli Başlanğıc</div>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, idx) => (
              <SlideTransition key={action.key} direction="up" delay={400 + (idx * 100)}>
                <button
                  onClick={action.action}
                  className={`h-32 rounded-3xl p-5 flex flex-col justify-between text-white font-bold shadow-xl hover:shadow-2xl button-press comfort-hover focus-ring group relative overflow-hidden bg-gradient-to-br ${action.color}`}
                  aria-label={action.label}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="flex items-center justify-between relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                      <EmojiIcon emoji={action.emoji} size={24} />
                    </div>
                    {action.priority === 'high' && (
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  
                  <div className="text-left relative z-10">
                    <div className="visual-hierarchy-3 leading-tight">{action.label}</div>
                  </div>
                </button>
              </SlideTransition>
            ))}
          </div>
        </div>

        {/* Learning Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <div className="visual-hierarchy-2 text-comfort-primary">Təhsil</div>
            <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
              Hamısına bax →
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {learningItems.map((item, idx) => (
              <SlideTransition key={item.key} direction="right" delay={500 + (idx * 80)}>
                <Card 
                  onClick={item.action}
                  className="p-4 group cursor-pointer hover:scale-[1.02] transition-all duration-300"
                  variant="glass"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md`}>
                      <EmojiIcon emoji={item.emoji} size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="visual-hierarchy-3 text-comfort-primary leading-tight">
                        {item.label}
                      </div>
                    </div>
                  </div>
                </Card>
              </SlideTransition>
            ))}
          </div>
        </div>

        {/* Practice Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <div className="visual-hierarchy-2 text-comfort-primary">Məşq & Test</div>
            <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
              Hamısına bax →
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {practiceItems.map((item, idx) => (
              <SlideTransition key={item.key} direction="left" delay={600 + (idx * 80)}>
                <Card 
                  onClick={item.action}
                  className="p-4 group cursor-pointer hover:scale-[1.02] transition-all duration-300"
                  variant="glass"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md`}>
                      <EmojiIcon emoji={item.emoji} size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="visual-hierarchy-3 text-comfort-primary leading-tight">
                        {item.label}
                      </div>
                    </div>
                  </div>
                </Card>
              </SlideTransition>
            ))}
          </div>
        </div>

        {/* Featured Tutorial Card */}
        <ScaleIn delay={700}>
          <Card 
            onClick={() => alert("Video dərslik: Tətbiqdən necə istifadə edilir")}
            className="p-6 cursor-pointer group hover:scale-[1.02] transition-all duration-300"
            variant="glass"
          >
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  ▶
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
                  HD
                </div>
              </div>
              <div className="flex-1">
                <div className="text-xs text-comfort-secondary font-medium mb-1">Video Dərslik</div>
                <div className="visual-hierarchy-2 text-comfort-primary mb-2">Tətbiqdən Necə İstifadə Edilir</div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-comfort-secondary">5 dəqiqə</div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <div className="text-xs text-emerald-600 font-medium">YENİ</div>
                  </div>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-indigo-600 group-hover:translate-x-2 transition-transform duration-300">
                →
              </div>
            </div>
          </Card>
        </ScaleIn>

        {/* Quick Stats */}
        <ScaleIn delay={800}>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Card variant="glass" className="p-4 text-center">
              <div className="text-2xl font-black text-emerald-600 mb-1">248</div>
              <div className="text-xs text-comfort-secondary">Düzgün cavab</div>
            </Card>
            <Card variant="glass" className="p-4 text-center">
              <div className="text-2xl font-black text-blue-600 mb-1">12</div>
              <div className="text-xs text-comfort-secondary">Test tamamlandı</div>
            </Card>
            <Card variant="glass" className="p-4 text-center">
              <div className="text-2xl font-black text-purple-600 mb-1">85%</div>
              <div className="text-xs text-comfort-secondary">Uğur dərəcəsi</div>
            </Card>
          </div>
        </ScaleIn>

        {/* Footer Actions */}
        <div className="space-y-3">
          <button 
            onClick={() => navigate('Packages')}
            className="w-full p-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold button-press comfort-hover focus-ring shadow-lg group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <EmojiIcon emoji="📦" size={20} />
                <span>Təlim Paketləri</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                →
              </div>
            </div>
          </button>
          
          <button 
            onClick={() => navigate('AIChat')}
            className="w-full p-4 rounded-2xl border-2 border-dashed border-gray-300 text-comfort-secondary font-medium hover:border-emerald-400 hover:text-emerald-600 button-press focus-ring transition-all duration-300 group"
          >
            <div className="flex items-center justify-center gap-3">
              <EmojiIcon emoji="🤖" size={20} />
              <span>AI Köməkçisi ilə danış</span>
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                ✨
              </div>
            </div>
          </button>
        </div>

      </div>
    </div>
  );
}