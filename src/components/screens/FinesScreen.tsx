import React, { useMemo, useState, useCallback } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { PENALTY_SECTIONS, type PenaltySection, type PenaltySubsection } from '../../lib/rules';
import { VideoPlayer } from '../media/VideoPlayer';
import { FadeInUp } from '../ui/FadeInUp';
import { SlideTransition } from '../ui/SlideTransition';

function PenaltyVideo({ src }: { src: string }) {
  return (
    <div className="mt-4">
      <VideoPlayer src={src} watermark="DDA.az" heightClass="h-48" />
    </div>
  );
}

function PenaltyContent({ content }: { content: string }) {
  const { isDarkMode } = useApp();
  
  const formattedContent = content.split('\n').map((line, index) => (
    <div key={index} className={`${line.startsWith('•') ? 'ml-4' : ''}`}>
      {line}
    </div>
  ));
  
  return (
    <div className={`mt-3 text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
      {formattedContent}
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
    <div className={`border-l-2 pl-4 ml-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
      <button
        onClick={onToggle}
        className={`w-full text-left p-3 rounded-lg transition-colors ${
          isDarkMode 
            ? 'hover:bg-gray-700 text-gray-200' 
            : 'hover:bg-gray-50 text-gray-800'
        }`}
      >
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm">{subsection.title}</h4>
          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {isExpanded ? '▾' : '▸'}
          </span>
        </div>
      </button>
      
      {isExpanded && (
        <FadeInUp>
          <>
            <div className="px-3 pb-3">
              {subsection.content && <PenaltyContent content={subsection.content} />}
              {subsection.videoSrc && <PenaltyVideo src={subsection.videoSrc} />}
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
  
  return (
    <Card className="overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left p-4 transition-colors hover:bg-opacity-80"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`font-bold text-base ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {section.title}
            </h3>
            {section.description && (
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {section.description}
              </p>
            )}
          </div>
          <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {section.subsections && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {section.subsections.length}
              </span>
            )}
            <span className="text-sm">{isExpanded ? '▾' : '▸'}</span>
          </div>
        </div>
      </button>
      
      {isExpanded && (
        <FadeInUp>
          <>
            <div className="px-4 pb-4">
              {section.content && <PenaltyContent content={section.content} />}
              {section.videoSrc && <PenaltyVideo src={section.videoSrc} />}
              
              {section.subsections && (
                <div className="mt-4 space-y-2">
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
    </Card>
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
    <div className={`p-3 pb-24 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <FadeInUp delay={0}>
        <>
          <div className={`mb-4 sticky top-0 z-40 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-3 py-2">
              <button 
                onClick={handleBackClick} 
                className={`p-3 rounded-xl border transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700' 
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                ←
              </button>
              
              <div className="flex-1">
                <h1 className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Cərimələr
                </h1>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Yol hərəkəti qaydalarının pozulmasına görə cərimələr
                </p>
              </div>
            </div>
            
            {/* Search */}
            <div className={`flex items-center gap-2 mt-2 px-4 py-3 rounded-xl border transition-colors ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <span className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>🔍</span>
              <input
                value={query}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                placeholder="Cərimə növünü axtarın..."
                className={`flex-1 bg-transparent outline-none text-sm ${
                  isDarkMode ? 'text-gray-100 placeholder-gray-500' : 'text-gray-900 placeholder-gray-500'
                }`}
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className={`p-1 rounded-md transition-colors ${
                    isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </>
      </FadeInUp>

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
  );
}

