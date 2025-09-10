/** @jsxImportSource react */
import React, { useMemo, useState, useCallback } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { AZ_RULES } from '../../lib/rules';
import { VideoPlayer } from '../media/VideoPlayer';

function RuleVideos({ sources }: { sources: string[] }) {
  const { isDarkMode } = useApp();
  const [active, setActive] = useState(0);

  const handleSwipe = (direction: 'left' | 'right') => {
    setActive(prev => {
      const next = direction === 'left' ? prev + 1 : prev - 1;
      if (next < 0) return sources.length - 1;
      if (next >= sources.length) return 0;
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
      <VideoPlayer src={sources[active]} watermark="DDA.az" heightClass="h-48" />
      <div className={`absolute top-2 right-2 text-[11px] px-2 py-1 rounded-md ${isDarkMode ? 'bg-black/60 text-gray-100' : 'bg-black/40 text-white'}`}>
        {active + 1}/{sources.length}
      </div>
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
        {sources.map((_, idx) => (
          <span key={idx} className={`h-1.5 w-6 rounded-full ${idx === active ? 'bg-white' : 'bg-white/40'}`} />
        ))}
      </div>
    </div>
  );
}

export function FinesScreen() {
  const { isDarkMode, goBack, switchTab } = useApp();
  const [query, setQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('r26');

  const norm = useCallback((s: string) => s.toLowerCase().trim(), []);
  const q = norm(query);

  const filteredRules = useMemo(
    () => (q ? AZ_RULES.filter(r => norm(r.title).includes(q) || norm(r.content).includes(q)) : AZ_RULES),
    [q, norm]
  );

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
    <div className={`p-3 pb-24 min-h-full transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Search / Header */}
      <div className={`mb-3 sticky top-0 z-40 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="flex items-center gap-2 py-1">
          <button onClick={handleBackClick} className={`px-3 py-2 rounded-xl border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-700'}`}>←</button>
          <div className={`flex items-center gap-2 flex-1 px-3 py-2 rounded-xl border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>🔎</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Axtarış... (məs: cərimə, məsuliyyət)"
              className={`flex-1 bg-transparent outline-none text-sm ${isDarkMode ? 'text-gray-100 placeholder-gray-500' : 'text-gray-900 placeholder-gray-500'}`}
            />
            {query && (
              <button
                aria-label="Təmizlə"
                onClick={() => setQuery('')}
                className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
              >✕</button>
            )}
          </div>
        </div>
      </div>

      {/* Video content will be inside each rule item below */}

      {/* Rules (reused) */}
      <Card>
        <div className="flex items-center justify-between mb-2">
          <div className={`text-xs uppercase tracking-wide font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Azərbaycan yol hərəkəti qaydaları</div>
          <div className={`h-px flex-1 ml-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
        </div>
        <div className="space-y-2">
          {filteredRules.map(r => (
            <Card key={r.id} onClick={() => setExpandedId(prev => prev === r.id ? null : r.id)}>
              <div className="flex items-center justify-between">
                <div className="font-bold text-sm">{r.title}</div>
                <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{expandedId === r.id ? '▾' : '▸'}</div>
              </div>
              {expandedId === r.id && (
                <div className="mt-2 space-y-3">
                  <div className="text-xs text-gray-600 leading-relaxed">{r.content}</div>
                  {/* Example: for demo, attach 1 or multiple videos depending on rule id */}
                  {r.id === 'r1' ? (
                    <RuleVideos sources={[
                      'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
                      'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
                      'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
                    ]} />
                  ) : r.id === 'r26' ? (
                    <RuleVideos sources={[
                      'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
                      'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
                    ]} />
                  ) : (
                    <RuleVideos sources={[
                      'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
                    ]} />
                  )}
                </div>
              )}
            </Card>
          ))}
          {filteredRules.length === 0 && (
            <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Heç nə tapılmadı.</div>
          )}
        </div>
      </Card>
    </div>
  );
}

