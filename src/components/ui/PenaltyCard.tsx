import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from './Card';
import { VideoPlayer } from '../media/VideoPlayer';
import { Penalty, PenaltySubTopic } from '../../lib/penalties';

interface SubTopicVideoPlayerProps {
  subTopic: PenaltySubTopic;
}

function SubTopicVideoPlayer({ subTopic }: SubTopicVideoPlayerProps) {
  const { isDarkMode } = useApp();
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  if (subTopic.videoSources.length === 0) {
    return (
      <div className={`p-4 rounded-lg border-2 border-dashed ${
        isDarkMode ? 'border-gray-600 bg-gray-800/50' : 'border-gray-300 bg-gray-100/50'
      }`}>
        <div className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <div className="text-2xl mb-2">📹</div>
          <div className="text-sm">Video tezliklə əlavə ediləcək</div>
        </div>
      </div>
    );
  }

  const handleSwipe = (direction: 'left' | 'right') => {
    setActiveVideoIndex(prev => {
      const next = direction === 'left' ? prev + 1 : prev - 1;
      if (next < 0) return subTopic.videoSources.length - 1;
      if (next >= subTopic.videoSources.length) return 0;
      return next;
    });
  };

  return (
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
      <VideoPlayer 
        src={subTopic.videoSources[activeVideoIndex]} 
        watermark="DDA.az" 
        heightClass="h-48" 
      />
      {subTopic.videoSources.length > 1 && (
        <>
          <div className={`absolute top-2 right-2 text-[11px] px-2 py-1 rounded-md ${
            isDarkMode ? 'bg-black/60 text-gray-100' : 'bg-black/40 text-white'
          }`}>
            {activeVideoIndex + 1}/{subTopic.videoSources.length}
          </div>
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {subTopic.videoSources.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveVideoIndex(idx)}
                className={`h-1.5 w-6 rounded-full transition-all ${
                  idx === activeVideoIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

interface SubTopicCardProps {
  subTopic: PenaltySubTopic;
  isExpanded: boolean;
  onToggle: () => void;
}

function SubTopicCard({ subTopic, isExpanded, onToggle }: SubTopicCardProps) {
  const { isDarkMode } = useApp();

  return (
    <Card className="ml-4 border-l-4 border-l-blue-500">
      <>
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between text-left"
        >
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${
            subTopic.videoSources.length > 0 
              ? 'bg-green-500' 
              : isDarkMode ? 'bg-gray-600' : 'bg-gray-400'
          }`} />
          <span className="text-sm font-medium">{subTopic.title}</span>
        </div>
        <div className={`transform transition-transform duration-200 ${
          isExpanded ? 'rotate-90' : ''
        } ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          ▶
        </div>
        </button>
        
        {isExpanded && (
          <div className="mt-4 space-y-3 animate-in slide-in-from-top-2 duration-300">
            <SubTopicVideoPlayer subTopic={subTopic} />
          </div>
        )}
      </>
    </Card>
  );
}

interface PenaltyCardProps {
  penalty: Penalty;
  isExpanded: boolean;
  onToggle: () => void;
}

export function PenaltyCard({ penalty, isExpanded, onToggle }: PenaltyCardProps) {
  const { isDarkMode } = useApp();
  const [expandedSubTopics, setExpandedSubTopics] = useState<Set<string>>(new Set());

  const toggleSubTopic = (subTopicId: string) => {
    setExpandedSubTopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(subTopicId)) {
        newSet.delete(subTopicId);
      } else {
        newSet.add(subTopicId);
      }
      return newSet;
    });
  };

  return (
    <Card className="overflow-hidden">
      <>
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between text-left group"
        >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-bold px-2 py-1 rounded ${
              isDarkMode 
                ? 'bg-red-900/50 text-red-300 border border-red-800' 
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              {penalty.articleNumber}
            </span>
            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {penalty.subTopics.length} alt mövzu
            </span>
          </div>
          <div className="font-semibold text-sm mb-1">{penalty.title}</div>
          <div className={`text-xs font-medium ${
            isDarkMode ? 'text-orange-400' : 'text-orange-600'
          }`}>
            {penalty.amount}
          </div>
        </div>
        <div className={`transform transition-all duration-200 ${
          isExpanded ? 'rotate-180' : ''
        } ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} group-hover:scale-110`}>
          ▼
        </div>
        </button>

        {isExpanded && (
          <div className="mt-4 space-y-4 animate-in slide-in-from-top-4 duration-300">
            <div className={`text-xs leading-relaxed p-3 rounded-lg ${
              isDarkMode ? 'bg-gray-800/50 text-gray-300' : 'bg-gray-100/50 text-gray-600'
            }`}>
              {penalty.content}
            </div>

            <div>
              <div className={`text-xs font-semibold mb-3 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Alt mövzular:
              </div>
              <div className="space-y-2">
                {penalty.subTopics.map(subTopic => (
                  <SubTopicCard
                    key={subTopic.id}
                    subTopic={subTopic}
                    isExpanded={expandedSubTopics.has(subTopic.id)}
                    onToggle={() => toggleSubTopic(subTopic.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    </Card>
  );
}