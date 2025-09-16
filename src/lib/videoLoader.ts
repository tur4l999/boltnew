// Video loader utility for penalty sub-topics
export interface VideoConfig {
  subTopicId: string;
  videoFiles: string[];
  basePath?: string;
}

// Default base path for penalty videos
const DEFAULT_VIDEO_BASE_PATH = '/videos/penalties/';

// Video configurations for each sub-topic
// You can update this with actual video file names when they're available
export const VIDEO_CONFIGS: VideoConfig[] = [
  {
    subTopicId: 'road-signs-violation',
    videoFiles: [
      'road-signs-1.mp4',
      'road-signs-2.mp4'
    ]
  },
  {
    subTopicId: 'vehicle-placement',
    videoFiles: [
      'vehicle-placement-1.mp4'
    ]
  },
  {
    subTopicId: 'distance-rules',
    videoFiles: [
      'distance-rules-1.mp4',
      'distance-rules-2.mp4',
      'distance-rules-3.mp4'
    ]
  },
  {
    subTopicId: 'towing',
    videoFiles: [
      'towing-1.mp4'
    ]
  },
  {
    subTopicId: 'cargo-transport',
    videoFiles: [
      'cargo-transport-1.mp4',
      'cargo-transport-2.mp4'
    ]
  },
  {
    subTopicId: 'driving-training',
    videoFiles: [
      'driving-training-1.mp4'
    ]
  },
  {
    subTopicId: 'residential-zone',
    videoFiles: [
      'residential-zone-1.mp4'
    ]
  }
];

// Function to get video sources for a sub-topic
export const getVideoSourcesForSubTopic = (subTopicId: string, basePath: string = DEFAULT_VIDEO_BASE_PATH): string[] => {
  const config = VIDEO_CONFIGS.find(c => c.subTopicId === subTopicId);
  if (!config) {
    return [];
  }

  const actualBasePath = config.basePath || basePath;
  return config.videoFiles.map(filename => `${actualBasePath}${filename}`);
};

// Function to update video configuration for a sub-topic
export const updateVideoConfig = (subTopicId: string, videoFiles: string[], basePath?: string) => {
  const existingIndex = VIDEO_CONFIGS.findIndex(c => c.subTopicId === subTopicId);
  const newConfig: VideoConfig = {
    subTopicId,
    videoFiles,
    basePath
  };

  if (existingIndex >= 0) {
    VIDEO_CONFIGS[existingIndex] = newConfig;
  } else {
    VIDEO_CONFIGS.push(newConfig);
  }
};

// Function to check if video file exists (for development/testing)
export const checkVideoExists = async (videoUrl: string): Promise<boolean> => {
  try {
    const response = await fetch(videoUrl, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

// Function to get all configured sub-topic IDs
export const getConfiguredSubTopicIds = (): string[] => {
  return VIDEO_CONFIGS.map(config => config.subTopicId);
};