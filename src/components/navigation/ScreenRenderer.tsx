import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { HomeScreen } from '../screens/HomeScreen';
import { TopicsScreen } from '../screens/TopicsScreen';
import { LessonScreen } from '../screens/LessonScreen';
import { PracticeScreen } from '../screens/PracticeScreen';
import { ExamConfigScreen } from '../screens/ExamConfigScreen';
import { ExamRunScreen } from '../screens/ExamRunScreen';
import { ResultsScreen } from '../screens/ResultsScreen';
import { MistakesScreen } from '../screens/MistakesScreen';
import { StoreScreen } from '../screens/StoreScreen';
import { MoreScreen } from '../screens/MoreScreen';

export function ScreenRenderer() {
  const { currentScreen, currentTab } = useApp();
  
  // Tab screens
  if (currentScreen.screen === 'Home' || (currentTab === 'Home' && currentScreen.screen === 'Home')) {
    return <HomeScreen />;
  }
  if (currentScreen.screen === 'Topics' || (currentTab === 'Topics' && currentScreen.screen === 'Topics')) {
    return <TopicsScreen />;
  }
  if (currentScreen.screen === 'Store' || (currentTab === 'Store' && currentScreen.screen === 'Store')) {
    return <StoreScreen />;
  }
  
  // Stack screens
  switch (currentScreen.screen) {
    case 'Lesson':
      return <LessonScreen />;
    case 'Practice':
      return <PracticeScreen />;
    case 'ExamConfig':
      return <ExamConfigScreen />;
    case 'ExamRun':
      return <ExamRunScreen />;
    case 'Results':
      return <ResultsScreen />;
    case 'Mistakes':
      return <MistakesScreen />;
    case 'More':
      return <MoreScreen />;
    default:
      return <HomeScreen />;
  }
}