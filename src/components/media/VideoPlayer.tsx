import React, { useRef, useState, useEffect } from 'react';
import { IconButton } from '../ui/IconButton';
import { EmojiIcon } from '../ui/EmojiIcon';
import { useApp } from '../../contexts/AppContext';

interface VideoPlayerProps {
  src: string;
  watermark: string;
  heightClass?: string;
  is3D?: boolean;
}

export function VideoPlayer({ src, watermark, heightClass = 'h-64', is3D = false }: VideoPlayerProps) {
  const { isDarkMode } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
    }
  };
  
  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        videoRef.current.duration || videoRef.current.currentTime + 10,
        videoRef.current.currentTime + 10
      );
    }
  };
  
  const requestPictureInPicture = () => {
    if (videoRef.current && 'pictureInPictureEnabled' in document) {
      videoRef.current.requestPictureInPicture?.();
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen?.();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen?.();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
      setCurrentTime(video.currentTime);
    };

    const updateDuration = () => {
      setDuration(video.duration);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 via-black to-gray-800 ${
      is3D ? 'ring-2 ring-emerald-500/30 shadow-emerald-500/20' : ''
    }`}>
      {/* 3D Badge */}
      {is3D && (
        <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
          <span className="mr-1">🎬</span>
          3D Video Dərs
        </div>
      )}
      
      <video
        ref={videoRef}
        src={src}
        controls
        playsInline
        className={`w-full ${heightClass} object-cover rounded-3xl`}
      />
      
      {/* Custom Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 rounded-b-3xl">
        <div className="flex items-center gap-3 text-white text-sm mb-2">
          <span className="font-medium">{formatTime(currentTime)}</span>
          <div className="flex-1 bg-white/20 rounded-full h-1.5 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 to-green-400 transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-medium">{formatTime(duration)}</span>
        </div>
      </div>
      
      {/* Watermark */}
      <div className="absolute right-4 bottom-16 text-xs text-white/50 pointer-events-none select-none font-medium">
        {watermark}
      </div>
      
      {/* Enhanced Control Buttons */}
      <div className="absolute left-4 top-4 flex gap-2 z-10">
        <IconButton 
          label="10 saniyə geriyə" 
          onClick={skipBackward}
          className="bg-black/60 border-white/10 text-white hover:bg-black/80 hover:scale-110 backdrop-blur-sm shadow-lg transition-all duration-200"
        >
          <span className="text-lg">⏪</span>
        </IconButton>
        <IconButton 
          label="10 saniyə irəliyə" 
          onClick={skipForward}
          className="bg-black/60 border-white/10 text-white hover:bg-black/80 hover:scale-110 backdrop-blur-sm shadow-lg transition-all duration-200"
        >
          <span className="text-lg">⏩</span>
        </IconButton>
      </div>

      {/* Right side controls */}
      <div className="absolute right-4 top-4 flex gap-2 z-10">
        <IconButton 
          label="Tam ekran" 
          onClick={toggleFullscreen}
          className="bg-black/60 border-white/10 text-white hover:bg-black/80 hover:scale-110 backdrop-blur-sm shadow-lg transition-all duration-200"
        >
          <span className="text-lg">⛶</span>
        </IconButton>
        <IconButton 
          label="Şəkil içində şəkil" 
          onClick={requestPictureInPicture}
          className="bg-black/60 border-white/10 text-white hover:bg-black/80 hover:scale-110 backdrop-blur-sm shadow-lg transition-all duration-200"
        >
          <EmojiIcon emoji="🖼️" size={16} />
        </IconButton>
      </div>

      {/* Play/Pause overlay when video is paused */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-3xl">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-2xl">
            <span className="text-white text-3xl ml-1">▶️</span>
          </div>
        </div>
      )}
    </div>
  );
}