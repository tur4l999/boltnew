import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { PageTransition } from './PageTransition';
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
import { TransactionsScreen } from '../screens/TransactionsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { useEffect } from 'react';

export function ScreenRenderer() {
  const { currentScreen, currentTab } = useApp();
  
  // Keçid açarı yaradırıq
  const transitionKey = `${currentScreen.screen}-${JSON.stringify(currentScreen.params)}`;
  useEffect(() => {
    // Scroll to top on screen change
    const viewport = document.querySelector('.app-viewport');
    if (viewport) (viewport as HTMLElement).scrollTo({ top: 0, behavior: 'auto' });
    else window.scrollTo({ top: 0, behavior: 'auto' });
  }, [transitionKey]);
  
  // AI Chat screen - no header or navigation
  if (currentScreen.screen === 'AIChat') {
    return (
      <PageTransition transitionKey={transitionKey}>
        <AIChatScreen />
      </PageTransition>
    );
  }
  
  return (
    <PageTransition transitionKey={transitionKey}>
      {/* Tab screens */}
      {(currentScreen.screen === 'Home' || (currentTab === 'Home' && currentScreen.screen === 'Home')) && <HomeScreen />}
      {(currentScreen.screen === 'Topics' || (currentTab === 'Topics' && currentScreen.screen === 'Topics')) && <TopicsScreen />}
      {(currentScreen.screen === 'Store' || (currentTab === 'Store' && currentScreen.screen === 'Store')) && <StoreScreen />}
      {(currentScreen.screen === 'More' || (currentTab === 'More' && currentScreen.screen === 'More')) && <MoreScreen />}
      
      {/* Stack screens */}
      {currentScreen.screen === 'Lesson' && <LessonScreen />}
      {currentScreen.screen === 'Practice' && <PracticeScreen />}
      {currentScreen.screen === 'ExamConfig' && <ExamConfigScreen />}
      {currentScreen.screen === 'ExamRun' && <ExamRunScreen />}
      {currentScreen.screen === 'Results' && <ResultsScreen />}
      {currentScreen.screen === 'Mistakes' && <MistakesScreen />}
      {currentScreen.screen === 'TeacherContact' && <TeacherContactScreen />}
      {currentScreen.screen === 'Packages' && <PackagesScreen />}
      {currentScreen.screen === 'Transactions' && <TransactionsScreen />}
      {currentScreen.screen === 'Settings' && <SettingsScreen />}
      
      {/* Default */}
      {!['Home', 'Topics', 'Store', 'More', 'Lesson', 'Practice', 'ExamConfig', 'ExamRun', 'Results', 'Mistakes', 'TeacherContact', 'Packages', 'Transactions', 'Settings'].includes(currentScreen.screen) && <HomeScreen />}
    </PageTransition>
  );
}