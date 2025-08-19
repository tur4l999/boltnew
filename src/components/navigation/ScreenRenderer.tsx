import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Header } from '../layout/Header';
import { TabBar } from '../layout/TabBar';
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
import { TeacherContactScreen } from '../screens/TeacherContactScreen';
import { PackagesScreen } from '../screens/PackagesScreen';
import { AIChatScreen } from '../screens/AIChatScreen';

export function ScreenRenderer() {
  const { currentScreen, currentTab } = useApp();
  
  // AI Chat screen - no header or navigation
  if (currentScreen.screen === 'AIChat') {
    return <AIChatScreen />;
  }
  
  // All other screens with header and navigation
  return (
    <>
      <Header />
      <MainContent />
      <TabBar />
    </>
  );
}

function MainContent() {
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
  if (currentScreen.screen === 'More' || (currentTab === 'More' && currentScreen.screen === 'More')) {
    return <MoreScreen />;
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
    case 'TeacherContact':
      return <TeacherContactScreen />;
    case 'Packages':
      return <PackagesScreen />;
    default:
      return <HomeScreen />;
  }
}