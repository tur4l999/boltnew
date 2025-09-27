/** @jsxImportSource react */
import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { PageTransition } from './PageTransition';
import { HomeScreen } from '../screens/HomeScreen';
import { TopicsScreen } from '../screens/TopicsScreen';
import { LessonScreen } from '../screens/LessonScreen';
import { PracticeScreen } from '../screens/PracticeScreen';
import { ExamConfigScreen } from '../screens/ExamConfigScreen';
import { ExamScreen } from '../screens/ExamScreen';
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
import { ExamIntroScreen } from '../screens/ExamIntroScreen';
import { ActivationScheduledScreen } from '../screens/ActivationScheduledScreen';
import { OnlineLessonsScreen } from '../screens/OnlineLessonsScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { RulesScreen } from '../screens/RulesScreen';
import { SignsScreen } from '../screens/SignsScreen';
import { CartScreen } from '../screens/CartScreen';
import { QuickTestScreen } from '../screens/QuickTestScreen';
import { BlogsScreen } from '../screens/BlogsScreen';
import { FinesScreen } from '../screens/FinesScreen';
import { DrivingPracticeScreen } from '../screens/DrivingPracticeScreen';

export function ScreenRenderer() {
  const { currentScreen, currentTab } = useApp();
  
  // Keçid açarı (yalnız ekran adı ilə) – parametrlər dəyişəndə təkrar animasiya olmasın
  const transitionKey = currentScreen.screen;
  
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
      {currentScreen.screen === 'QuickTest' && <QuickTestScreen />}
      {currentScreen.screen === 'Lesson' && <LessonScreen />}
      {currentScreen.screen === 'Practice' && <PracticeScreen />}
      {currentScreen.screen === 'OnlineLessons' && <OnlineLessonsScreen />}
      {currentScreen.screen === 'Exam' && <ExamScreen />}
      {currentScreen.screen === 'ExamConfig' && <ExamConfigScreen />}
      {currentScreen.screen === 'ExamIntro' && <ExamIntroScreen />}
      {currentScreen.screen === 'ExamRun' && <ExamRunScreen />}
      {currentScreen.screen === 'Results' && <ResultsScreen />}
      {currentScreen.screen === 'Mistakes' && <MistakesScreen />}
      {currentScreen.screen === 'TeacherContact' && <TeacherContactScreen />}
      {currentScreen.screen === 'Packages' && <PackagesScreen />}
      {currentScreen.screen === 'ActivationScheduled' && <ActivationScheduledScreen />}
      {currentScreen.screen === 'Transactions' && <TransactionsScreen />}
      {currentScreen.screen === 'Settings' && <SettingsScreen />}
      {currentScreen.screen === 'ProductDetail' && <ProductDetailScreen />}
      {currentScreen.screen === 'Rules' && <RulesScreen />}
      {currentScreen.screen === 'Signs' && <SignsScreen />}
      {currentScreen.screen === 'Cart' && <CartScreen />}
      {currentScreen.screen === 'Fines' && <FinesScreen />}
      {currentScreen.screen === 'Blogs' && <BlogsScreen />}
      {currentScreen.screen === 'DrivingPractice' && <DrivingPracticeScreen />}
      
      {/* Default */}
      {!['Home', 'Topics', 'Store', 'More', 'QuickTest', 'Lesson', 'Practice', 'OnlineLessons', 'Exam', 'ExamConfig', 'ExamIntro', 'ExamRun', 'Results', 'Mistakes', 'TeacherContact', 'Packages', 'ActivationScheduled', 'Transactions', 'Settings', 'ProductDetail', 'Cart', 'Rules', 'Signs', 'Blogs', 'Fines', 'DrivingPractice'].includes(currentScreen.screen) && <HomeScreen />}
    </PageTransition>
  );
}