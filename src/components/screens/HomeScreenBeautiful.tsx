/** @jsxImportSource react */
import React, { useMemo } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Progress } from '../ui/Progress';
import { FadeInUp } from '../ui/FadeInUp';
import { SlideTransition } from '../ui/SlideTransition';
import { ScaleIn } from '../ui/ScaleIn';
import { EmojiIcon } from '../ui/EmojiIcon';

export function HomeScreenBeautiful() {
  const { t, navigate, hasActivePackage, isDarkMode, activatePackageNow, activePackage } = useApp();
  
  // Featured Actions
  const featuredActions = [
    { 
      key: 'quickTest', 
      title: 'Sürətli Test', 
      subtitle: 'İndi başla',
      action: () => navigate('QuickTest', { ticket: 1 }), 
      emoji: '⚡', 
      gradient: 'beautiful-gradient-accent-blue',
      textColor: 'text-blue-50'
    },
    { 
      key: 'examSim', 
      title: 'Sınaq İmtahanı', 
      subtitle: 'Real imtahan',
      action: () => navigate('ExamConfig', { mode: 'simulator' }), 
      emoji: '🎯', 
      gradient: 'beautiful-gradient-primary',
      textColor: 'text-emerald-50'
    },
  ];

  // Main Categories
  const categories = [
    {
      title: 'Təhsil və Öyrənmə',
      items: [
        { key: 'video', title: 'Video Dərslər', subtitle: '24 dərs', emoji: '🎬', color: 'beautiful-gradient-accent-purple' },
        { key: 'live', title: 'Canlı Dərslər', subtitle: 'Müəllimlərlə', emoji: '👨‍🏫', color: 'beautiful-gradient-accent-orange' },
        { key: 'notes', title: 'Qeydlər', subtitle: 'Materiallar', emoji: '📝', color: 'beautiful-gradient-accent-blue' },
        { key: 'rules', title: 'Qaydalar', subtitle: 'Yol qaydaları', emoji: '📖', color: 'beautiful-gradient-secondary' },
      ]
    },
    {
      title: 'Test və Məşq',
      items: [
        { key: 'practice', title: 'Məşq Testləri', subtitle: '500+ sual', emoji: '📝', color: 'beautiful-gradient-accent-blue' },
        { key: 'exams', title: 'İmtahan Testləri', subtitle: 'Real format', emoji: '📋', color: 'beautiful-gradient-primary' },
        { key: 'results', title: 'Nəticələrim', subtitle: 'Statistika', emoji: '📊', color: 'beautiful-gradient-accent-purple' },
        { key: 'mistakes', title: 'Səhvlərim', subtitle: 'Təkmilləşdirmə', emoji: '🔍', color: 'beautiful-gradient-accent-orange' },
      ]
    },
    {
      title: 'Əlavə Məlumatlar',
      items: [
        { key: 'signs', title: 'Yol Nişanları', subtitle: '150+ nişan', emoji: '🛑', color: 'beautiful-gradient-accent-pink' },
        { key: 'fines', title: 'Cərimələr', subtitle: '2024 tarif', emoji: '💰', color: 'beautiful-gradient-accent-orange' },
      ]
    }
  ];

  return (
    <div className={`min-h-screen beautiful-container transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-950 via-gray-950 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-white to-emerald-50/20'
    }`}>
      
      {/* Beautiful Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full ${
          isDarkMode ? 'bg-emerald-500/5' : 'bg-emerald-400/10'
        } blur-3xl animate-float-beautiful`}></div>
        <div className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full ${
          isDarkMode ? 'bg-blue-500/5' : 'bg-blue-400/8'
        } blur-3xl animate-float-beautiful`} style={{ animationDelay: '3s' }}></div>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full ${
          isDarkMode ? 'bg-purple-500/3' : 'bg-purple-400/5'
        } blur-3xl animate-pulse-beautiful`}></div>
      </div>

      <div className="relative z-10 pb-24 pt-6 beautiful-space-y-xl">
        
        {/* Welcome Hero */}
        <ScaleIn delay={100}>
          <div className="text-center beautiful-space-y">
            <div className="beautiful-glass p-6 mx-auto max-w-sm">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl beautiful-gradient-primary flex items-center justify-center text-white text-2xl font-black shadow-lg beautiful-hover-glow">
                  T
                </div>
                <div className="text-left">
                  <div className="beautiful-caption beautiful-text-secondary">
                    {new Date().getHours() < 12 ? 'Sabahınız xeyir' : new Date().getHours() < 18 ? 'Gününüz xeyir' : 'Axşamınız xeyir'} 👋
                  </div>
                  <div className="beautiful-heading beautiful-text-primary">Tural</div>
                </div>
              </div>
              
              {hasActivePackage() && (
                <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-orange-600 border border-orange-200/50">
                  <EmojiIcon emoji="👑" size={16} />
                  <span className="beautiful-caption font-semibold">Premium Aktiv</span>
                </div>
              )}
            </div>
          </div>
        </ScaleIn>

        {/* Progress Section */}
        <FadeInUp delay={200}>
          <div className="beautiful-glass p-6 beautiful-hover-lift">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="beautiful-heading beautiful-text-primary mb-1">Hazırlıq Səviyyəniz</div>
                <div className="beautiful-caption beautiful-text-secondary">M8: Yol nişanları</div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-black beautiful-text-accent">42%</div>
                <div className="beautiful-caption beautiful-text-secondary">hazırdır</div>
              </div>
            </div>
            
            <div className="mb-6">
              <Progress value={42} variant="animated" className="h-4" />
            </div>
            
            <button 
              onClick={() => navigate('Lesson', { moduleId: 'M8' })}
              className="beautiful-button beautiful-button-primary w-full beautiful-ripple"
            >
              <EmojiIcon emoji="🚀" size={18} />
              Davam et
            </button>
          </div>
        </FadeInUp>

        {/* Featured Quick Actions */}
        <div className="beautiful-space-y">
          <div className="beautiful-heading beautiful-text-primary">Sürətli Başlanğıc</div>
          <div className="beautiful-grid beautiful-grid-2">
            {featuredActions.map((action, idx) => (
              <ScaleIn key={action.key} delay={300 + (idx * 100)}>
                <button
                  onClick={action.action}
                  className={`beautiful-card beautiful-card-interactive ${action.gradient} ${action.textColor} h-32 flex flex-col justify-between shadow-xl beautiful-ripple`}
                >
                  <div className="flex items-center justify-between">
                    <div className="beautiful-icon-container w-12 h-12 bg-white/20">
                      <EmojiIcon emoji={action.emoji} size={24} />
                    </div>
                    <div className="w-3 h-3 bg-white/30 rounded-full animate-pulse-beautiful"></div>
                  </div>
                  
                  <div className="text-left">
                    <div className="beautiful-subheading mb-1">{action.title}</div>
                    <div className="beautiful-caption opacity-80">{action.subtitle}</div>
                  </div>
                </button>
              </ScaleIn>
            ))}
          </div>
        </div>

        {/* Categories */}
        {categories.map((category, categoryIdx) => (
          <div key={category.title} className="beautiful-space-y">
            <div className="flex items-center justify-between">
              <div className="beautiful-heading beautiful-text-primary">{category.title}</div>
              <button className="beautiful-caption beautiful-text-accent hover:beautiful-text-primary transition-colors">
                Hamısı →
              </button>
            </div>
            
            <div className="beautiful-grid beautiful-grid-2">
              {category.items.map((item, idx) => (
                <SlideTransition key={item.key} direction="up" delay={400 + (categoryIdx * 200) + (idx * 100)}>
                  <div className="beautiful-surface beautiful-card beautiful-card-interactive beautiful-hover-lift">
                    <div className="flex items-center gap-4">
                      <div className={`beautiful-icon-container ${item.color} w-12 h-12 text-white shadow-md`}>
                        <EmojiIcon emoji={item.emoji} size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="beautiful-subheading beautiful-text-primary mb-1">{item.title}</div>
                        <div className="beautiful-caption beautiful-text-secondary">{item.subtitle}</div>
                      </div>
                    </div>
                  </div>
                </SlideTransition>
              ))}
            </div>
          </div>
        ))}

        {/* AI Assistant CTA */}
        <ScaleIn delay={800}>
          <div className="beautiful-glass p-6 beautiful-hover-glow">
            <div className="flex items-center gap-5">
              <div className="beautiful-icon-container w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-xl animate-glow-beautiful">
                <EmojiIcon emoji="🤖" size={28} />
              </div>
              <div className="flex-1">
                <div className="beautiful-heading beautiful-text-primary mb-1">AI Köməkçisi</div>
                <div className="beautiful-caption beautiful-text-secondary">Suallarınızı cavablandıraq</div>
              </div>
              <button 
                onClick={() => navigate('AIChat')}
                className="beautiful-button beautiful-button-secondary beautiful-ripple"
              >
                <EmojiIcon emoji="💬" size={16} />
                Danış
              </button>
            </div>
          </div>
        </ScaleIn>

        {/* Stats Overview */}
        <div className="beautiful-space-y">
          <div className="beautiful-heading beautiful-text-primary">Bu Həftə</div>
          <div className="beautiful-grid beautiful-grid-3">
            <div className="beautiful-surface p-4 text-center beautiful-hover-lift">
              <div className="text-2xl font-black beautiful-text-accent mb-2">15</div>
              <div className="beautiful-caption beautiful-text-secondary">Test</div>
            </div>
            <div className="beautiful-surface p-4 text-center beautiful-hover-lift">
              <div className="text-2xl font-black text-blue-600 mb-2">248</div>
              <div className="beautiful-caption beautiful-text-secondary">Düzgün</div>
            </div>
            <div className="beautiful-surface p-4 text-center beautiful-hover-lift">
              <div className="text-2xl font-black text-purple-600 mb-2">89%</div>
              <div className="beautiful-caption beautiful-text-secondary">Uğur</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}