import React, { useMemo, useState, useCallback } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { PENALTY_SECTIONS, type PenaltySection, type PenaltySubsection } from '../../lib/rules';
import { VideoPlayer } from '../media/VideoPlayer';
import { FadeInUp } from '../ui/FadeInUp';
import { SlideTransition } from '../ui/SlideTransition';

function PenaltyVideo({ src }: { src: string }) {
  const { isDarkMode } = useApp();
  
  return (
    <div className="mt-4">
      <div className={`rounded-2xl p-4 ${
        isDarkMode ? 'bg-gray-800/50 border border-gray-700/50' : 'bg-gray-100/50 border border-gray-200/50'
      }`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
            <span className="text-white text-sm">🎥</span>
          </div>
          <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Cərimə videosu
          </span>
        </div>
        <VideoPlayer src={src} watermark="DDA.az" heightClass="h-48" />
      </div>
    </div>
  );
}

function MultipleVideos({ sources }: { sources: string[] }) {
  const { isDarkMode } = useApp();
  const [activeVideo, setActiveVideo] = useState(0);

  const handleVideoChange = (index: number) => {
    setActiveVideo(index);
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    setActiveVideo(prev => {
      const next = direction === 'left' ? prev + 1 : prev - 1;
      if (next < 0) return sources.length - 1;
      if (next >= sources.length) return 0;
      return next;
    });
  };

  return (
    <div className="mt-4">
      <div className={`rounded-2xl p-4 ${
        isDarkMode ? 'bg-gray-800/50 border border-gray-700/50' : 'bg-gray-100/50 border border-gray-200/50'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-white text-sm">🎬</span>
            </div>
            <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              Video Kolleksiyası
            </span>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${
            isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'
          }`}>
            {sources.length} video
          </div>
        </div>

        <div className="space-y-4">
          {/* Video Player */}
          <div
            className="relative rounded-xl overflow-hidden"
            onTouchStart={(e) => (e.currentTarget as any)._x = e.touches[0].clientX}
            onTouchEnd={(e) => {
              const startX = (e.currentTarget as any)._x as number | undefined;
              if (typeof startX !== 'number') return;
              const delta = e.changedTouches[0].clientX - startX;
              if (Math.abs(delta) > 30) handleSwipe(delta < 0 ? 'left' : 'right');
            }}
          >
            <VideoPlayer src={sources[activeVideo]} watermark="DDA.az" heightClass="h-48" />
            
            {/* Video Counter */}
            <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {activeVideo + 1}/{sources.length}
            </div>
            
            {/* Navigation Dots */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
              {sources.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleVideoChange(idx)}
                  className={`h-2 w-8 rounded-full transition-all duration-300 ${
                    idx === activeVideo 
                      ? 'bg-gradient-to-r from-blue-400 to-purple-400 shadow-lg' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Video Thumbnails/Selector */}
          <div className="grid grid-cols-4 gap-3">
            {sources.map((src, index) => (
              <button
                key={index}
                onClick={() => handleVideoChange(index)}
                className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                  index === activeVideo
                    ? 'border-blue-400 shadow-lg shadow-blue-400/25' 
                    : isDarkMode
                      ? 'border-gray-600 hover:border-gray-500'
                      : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className={`w-full h-full flex flex-col items-center justify-center text-xs font-medium ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                }`}>
                  <span className="text-lg mb-1">🎥</span>
                  <span>Video {index + 1}</span>
                </div>
                {index === activeVideo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-blue-500/20 backdrop-blur-sm">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm">▶</span>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PenaltyContent({ content }: { content: string }) {
  const { isDarkMode } = useApp();
  
  const formatContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('•')) {
        // Bullet point with enhanced styling
        return (
          <div key={index} className="flex items-start gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 mt-2 flex-shrink-0"></div>
            <span className="flex-1">{line.substring(1).trim()}</span>
          </div>
        );
      } else if (line.includes(' - ') && (line.includes('manat') || line.includes('il'))) {
        // Fine amount with special highlighting
        const [violation, penalty] = line.split(' - ');
        return (
          <div key={index} className={`p-3 rounded-xl mb-2 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-700/30' 
              : 'bg-gradient-to-r from-red-50 to-orange-50 border border-red-200/50'
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-medium">{violation}</span>
              <span className={`font-bold px-3 py-1 rounded-full text-sm ${
                isDarkMode 
                  ? 'bg-red-600 text-white' 
                  : 'bg-red-500 text-white'
              }`}>
                {penalty}
              </span>
            </div>
          </div>
        );
      } else if (line.trim()) {
        // Regular content
        return (
          <div key={index} className="mb-2">
            {line}
          </div>
        );
      }
      return null;
    }).filter(Boolean);
  };
  
  return (
    <div className={`mt-3 text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
      {formatContent(content)}
    </div>
  );
}

function SubsectionItem({ subsection, isExpanded, onToggle }: {
  subsection: PenaltySubsection;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const { isDarkMode } = useApp();
  
  return (
    <div className={`rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-lg ${
      isDarkMode 
        ? 'bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-gray-600/50' 
        : 'bg-gradient-to-r from-white/70 to-gray-50/70 border-gray-300/50'
    }`}>
      <button
        onClick={onToggle}
        className="w-full text-left p-4 transition-all duration-300 hover:bg-black/5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
            }`}>
              <span className="text-sm">📌</span>
            </div>
            <h4 className={`font-medium text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              {subsection.title}
            </h4>
          </div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 ${
            isExpanded 
              ? isDarkMode ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white rotate-180' : 'bg-gradient-to-r from-blue-500 to-blue-400 text-white rotate-180'
              : isDarkMode ? 'bg-gray-700/80 text-gray-300 hover:bg-gray-600' : 'bg-gray-200/80 text-gray-600 hover:bg-gray-300'
          }`}>
            <span className="text-sm font-bold">▼</span>
          </div>
        </div>
      </button>
      
      {isExpanded && (
        <FadeInUp>
          <>
            <div className="px-4 pb-4">
              {subsection.content && <PenaltyContent content={subsection.content} />}
              {subsection.videoSources && subsection.videoSources.length > 1 ? (
                <MultipleVideos sources={subsection.videoSources} />
              ) : subsection.videoSrc ? (
                <PenaltyVideo src={subsection.videoSrc} />
              ) : subsection.videoSources && subsection.videoSources.length === 1 ? (
                <PenaltyVideo src={subsection.videoSources[0]} />
              ) : null}
            </div>
          </>
        </FadeInUp>
      )}
    </div>
  );
}

function SectionItem({ section, isExpanded, onToggle, expandedSubsections, onSubsectionToggle }: {
  section: PenaltySection;
  isExpanded: boolean;
  onToggle: () => void;
  expandedSubsections: Set<string>;
  onSubsectionToggle: (id: string) => void;
}) {
  const { isDarkMode } = useApp();
  
  // Different colors for different penalty types
  const getSectionColor = (sectionId: string) => {
    switch (sectionId) {
      case 'traffic_violations':
        return isDarkMode 
          ? 'from-red-900 to-red-800 border-red-700/50' 
          : 'from-red-50 to-red-100 border-red-200/50';
      case 'document_violations':
        return isDarkMode 
          ? 'from-blue-900 to-blue-800 border-blue-700/50' 
          : 'from-blue-50 to-blue-100 border-blue-200/50';
      case 'alcohol_violations':
        return isDarkMode 
          ? 'from-purple-900 to-purple-800 border-purple-700/50' 
          : 'from-purple-50 to-purple-100 border-purple-200/50';
      case 'pedestrian_violations':
        return isDarkMode 
          ? 'from-green-900 to-green-800 border-green-700/50' 
          : 'from-green-50 to-green-100 border-green-200/50';
      default:
        return isDarkMode 
          ? 'from-gray-800 to-gray-700 border-gray-600/50' 
          : 'from-gray-50 to-white border-gray-200/50';
    }
  };

  const getSectionIcon = (sectionId: string) => {
    switch (sectionId) {
      case 'traffic_violations': return '🚦';
      case 'document_violations': return '📄';
      case 'alcohol_violations': return '🍷';
      case 'pedestrian_violations': return '🚶';
      default: return '⚖️';
    }
  };

  const getSectionAccentColor = (sectionId: string) => {
    switch (sectionId) {
      case 'traffic_violations': return 'from-red-500 to-red-600';
      case 'document_violations': return 'from-blue-500 to-blue-600';
      case 'alcohol_violations': return 'from-purple-500 to-purple-600';
      case 'pedestrian_violations': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };
  
  return (
    <div className={`rounded-3xl overflow-hidden shadow-2xl border backdrop-blur-sm bg-gradient-to-br ${getSectionColor(section.id)} transition-all duration-300 hover:shadow-3xl hover:scale-[1.01]`}>
      <button
        onClick={onToggle}
        className="w-full text-left p-6 transition-all duration-300"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${getSectionAccentColor(section.id)} flex items-center justify-center shadow-lg`}>
              <span className="text-white text-2xl">{getSectionIcon(section.id)}</span>
            </div>
            <div className="flex-1 text-right pr-4">
              <h3 className={`font-bold text-lg mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                {section.title}
              </h3>
              {section.description && (
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {section.description}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            {section.subsections && (
              <div className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getSectionAccentColor(section.id)} text-white shadow-md`}>
                {section.subsections.length} alt bölmə
              </div>
            )}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 ${
              isExpanded 
                ? `bg-gradient-to-r ${getSectionAccentColor(section.id)} text-white rotate-180` 
                : isDarkMode ? 'bg-gray-700/80 text-gray-300 hover:bg-gray-600' : 'bg-gray-200/80 text-gray-600 hover:bg-gray-300'
            }`}>
              <span className="text-sm font-bold">▼</span>
            </div>
          </div>
        </div>
      </button>
      
      {isExpanded && (
        <FadeInUp>
          <>
            <div className="px-6 pb-6">
              {section.content && (
                <div className="mb-4">
                  <PenaltyContent content={section.content} />
                </div>
              )}
              {section.videoSources && section.videoSources.length > 1 ? (
                <div className="mb-4">
                  <MultipleVideos sources={section.videoSources} />
                </div>
              ) : section.videoSrc ? (
                <div className="mb-4">
                  <PenaltyVideo src={section.videoSrc} />
                </div>
              ) : section.videoSources && section.videoSources.length === 1 ? (
                <div className="mb-4">
                  <PenaltyVideo src={section.videoSources[0]} />
                </div>
              ) : null}
              
              {section.subsections && (
                <div className="space-y-3">
                  {section.subsections.map(subsection => (
                    <SubsectionItem
                      key={subsection.id}
                      subsection={subsection}
                      isExpanded={expandedSubsections.has(subsection.id)}
                      onToggle={() => onSubsectionToggle(subsection.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        </FadeInUp>
      )}
    </div>
  );
}

export function FinesScreen() {
  const { isDarkMode, goBack, switchTab } = useApp();
  const [query, setQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [expandedSubsections, setExpandedSubsections] = useState<Set<string>>(new Set());

  const norm = useCallback((s: string) => s.toLowerCase().trim(), []);
  const q = norm(query);

  const filteredSections = useMemo(() => {
    if (!q) return PENALTY_SECTIONS;
    
    return PENALTY_SECTIONS.filter(section => 
      norm(section.title).includes(q) ||
      norm(section.description || '').includes(q) ||
      norm(section.content || '').includes(q) ||
      (section.subsections?.some(sub => 
        norm(sub.title).includes(q) || norm(sub.content || '').includes(q)
      ))
    );
  }, [q, norm]);

  const handleSectionToggle = (sectionId: string) => {
    setExpandedSections((prev: Set<string>) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const handleSubsectionToggle = (subsectionId: string) => {
    setExpandedSubsections((prev: Set<string>) => {
      const newSet = new Set(prev);
      if (newSet.has(subsectionId)) {
        newSet.delete(subsectionId);
      } else {
        newSet.add(subsectionId);
      }
      return newSet;
    });
  };

  const handleBackClick = () => {
    try {
      if (switchTab) {
        switchTab('Home');
        return;
      }
    } catch (_) {}
    try { goBack(); } catch (_) {}
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      {/* Modern Header */}
      <FadeInUp delay={0}>
        <>
          <div className={`sticky top-0 z-40 backdrop-blur-xl border-b ${
            isDarkMode 
              ? 'bg-gray-900/90 border-gray-800' 
              : 'bg-white/90 border-gray-200'
          }`}>
            <div className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <button 
                  onClick={handleBackClick} 
                  className={`p-3 rounded-2xl border transition-all duration-300 hover:scale-105 shadow-lg ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600 text-gray-200 hover:from-gray-700 hover:to-gray-600 shadow-gray-800/50' 
                      : 'bg-gradient-to-r from-white to-gray-50 border-gray-200 text-gray-700 hover:from-gray-50 hover:to-white shadow-gray-200/50'
                  }`}
                >
                  <span className="text-lg">←</span>
                </button>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center shadow-lg">
                      <span className="text-white text-xl">⚖️</span>
                    </div>
                    <div>
                      <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        Cərimələr
                      </h1>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        İnzibati Xətalar Məcəlləsi
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="text-right">
                  <div className={`text-lg font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                    {filteredSections.length}
                  </div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Bölmə
                  </div>
                </div>
              </div>
              
              {/* Enhanced Search */}
              <div className={`relative rounded-2xl overflow-hidden shadow-lg ${
                isDarkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-white to-gray-50'
              }`}>
                <div className="flex items-center gap-3 p-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white text-lg">🔍</span>
                  </div>
                  <input
                    value={query}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                    placeholder="Cərimə növünü axtarın... (məs: sürət, işıqfor, sərxoş)"
                    className={`flex-1 bg-transparent outline-none text-sm font-medium ${
                      isDarkMode ? 'text-gray-100 placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
                    }`}
                  />
                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      className={`p-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                        isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span className="text-lg">✕</span>
                    </button>
                  )}
                </div>
                
                {/* Search suggestions */}
                {query && filteredSections.length > 0 && (
                  <div className={`border-t px-4 py-2 ${
                    isDarkMode ? 'border-gray-600 bg-gray-700/50' : 'border-gray-200 bg-gray-100/50'
                  }`}>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {filteredSections.length} nəticə tapıldı
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      </FadeInUp>

      {/* Main Content */}
      <div className="p-4 pb-32">
        {/* Penalty Sections */}
        <div className="space-y-3">
          {filteredSections.map((section: PenaltySection, index: number) => (
            <SlideTransition key={section.id} direction="right" delay={100 + (index * 50)}>
              <>
                <SectionItem
                  section={section}
                  isExpanded={expandedSections.has(section.id)}
                  onToggle={() => handleSectionToggle(section.id)}
                  expandedSubsections={expandedSubsections}
                  onSubsectionToggle={handleSubsectionToggle}
                />
              </>
            </SlideTransition>
          ))}
          
          {filteredSections.length === 0 && (
            <FadeInUp delay={200}>
              <>
                <Card className="text-center py-8">
                  <>
                    <div className="text-4xl mb-2">🔍</div>
                    <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Heç bir nəticə tapılmadı
                    </div>
                    <div className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      Axtarış şərtlərini dəyişib yenidən cəhd edin
                    </div>
                  </>
                </Card>
              </>
            </FadeInUp>
          )}
        </div>
      </div>
    </div>
  );
}

