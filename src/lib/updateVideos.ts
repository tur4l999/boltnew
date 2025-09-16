// Utility to easily update video configurations
// Use this when you get the actual video file names from folders

import { updateVideoConfig } from './videoLoader';

// Example function to batch update all videos at once
export const updateAllPenaltyVideos = (videoMappings: Record<string, string[]>) => {
  Object.entries(videoMappings).forEach(([subTopicId, videoFiles]) => {
    updateVideoConfig(subTopicId, videoFiles);
  });
};

// Example usage:
// updateAllPenaltyVideos({
//   'road-signs-violation': ['road-sign-violation-1.mp4', 'road-sign-violation-2.mp4'],
//   'vehicle-placement': ['vehicle-placement-demo.mp4'],
//   'distance-rules': ['distance-rules-basic.mp4', 'distance-rules-advanced.mp4'],
//   // ... and so on
// });

// Function to update videos for a specific penalty sub-topic
export const updateSubTopicVideos = (subTopicId: string, videoFiles: string[], basePath?: string) => {
  updateVideoConfig(subTopicId, videoFiles, basePath);
  console.log(`Updated videos for ${subTopicId}:`, videoFiles);
};

// Available sub-topic IDs for reference:
export const AVAILABLE_SUB_TOPIC_IDS = [
  'road-signs-violation',
  'vehicle-placement', 
  'distance-rules',
  'towing',
  'cargo-transport',
  'driving-training',
  'residential-zone'
] as const;