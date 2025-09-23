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

export function VideoPlayer({ src, watermark, heightClass = 'h-48', is3D = false }: VideoPlayerProps) {
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
    <div className={`relative rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-900 via-black to-gray-800 ${
      is3D ? 'ring-1 ring-emerald-500/30' : ''
    }`}>
      {/* 3D Badge */}
      {is3D && (
        <div className="absolute top-2 left-2 z-20 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
          <span className="mr-1">🎬</span>
          3D
        </div>
      )}
      
      <video
        ref={videoRef}
        src={src}
        controls
        playsInline
        className={`w-full ${heightClass} object-cover rounded-xl`}
      />
      
      {/* Custom Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 rounded-b-xl">
        <div className="flex items-center gap-2 text-white text-xs">
          <span className="font-medium">{formatTime(currentTime)}</span>
          <div className="flex-1 bg-white/20 rounded-full h-1 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 to-green-400 transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-medium">{formatTime(duration)}</span>
        </div>
      </div>
      
      {/* Watermark */}
      <div className="absolute right-2 bottom-8 text-xs text-white/50 pointer-events-none select-none">
        {watermark}
      </div>
      
      {/* Enhanced Control Buttons */}
      <div className="absolute left-2 top-2 flex gap-1 z-10">
        <IconButton 
          label="10 saniyə geriyə" 
          onClick={skipBackward}
          className="bg-black/50 border-white/10 text-white hover:bg-black/70 backdrop-blur-sm shadow-md transition-all duration-200 w-8 h-8"
        >
          <span className="text-sm">⏪</span>
        </IconButton>
        <IconButton 
          label="10 saniyə irəliyə" 
          onClick={skipForward}
          className="bg-black/50 border-white/10 text-white hover:bg-black/70 backdrop-blur-sm shadow-md transition-all duration-200 w-8 h-8"
        >
          <span className="text-sm">⏩</span>
        </IconButton>
      </div>

      {/* Right side controls */}
      <div className="absolute right-2 top-2 flex gap-1 z-10">
        <IconButton 
          label="Tam ekran" 
          onClick={toggleFullscreen}
          className="bg-black/50 border-white/10 text-white hover:bg-black/70 backdrop-blur-sm shadow-md transition-all duration-200 w-8 h-8"
        >
          <span className="text-sm">⛶</span>
        </IconButton>
        <IconButton 
          label="Şəkil içində şəkil" 
          onClick={requestPictureInPicture}
          className="bg-black/50 border-white/10 text-white hover:bg-black/70 backdrop-blur-sm shadow-md transition-all duration-200 w-8 h-8"
        >
          <EmojiIcon emoji="🖼️" size={12} />
        </IconButton>
      </div>

      {/* Play/Pause overlay when video is paused */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-xl">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
            <span className="text-white text-xl ml-0.5">▶️</span>
          </div>
        </div>
      )}
    </div>
  );
}