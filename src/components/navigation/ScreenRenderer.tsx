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
import { ResultDetailScreen } from '../screens/ResultDetailScreen';
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
import { AppealsScreen } from '../screens/AppealsScreen';
import { CertificateApplicationScreen } from '../screens/CertificateApplicationScreen';
import { ApplicationFormScreen } from '../screens/ApplicationFormScreen';
import { QAScreen } from '../screens/QAScreen';
import { QADetailScreen } from '../screens/QADetailScreen';
import { QAFormScreen } from '../screens/QAFormScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SecurityScreen } from '../screens/SecurityScreen';
import { PrivacyScreen } from '../screens/PrivacyScreen';
import { NotificationSettingsScreen } from '../screens/NotificationSettingsScreen';
import { OfflineContentScreen } from '../screens/OfflineContentScreen';
import { UpdatesScreen } from '../screens/UpdatesScreen';
import { HelpCenterScreen } from '../screens/HelpCenterScreen';
import { ContactScreen } from '../screens/ContactScreen';
import { FeedbackScreen } from '../screens/FeedbackScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { ReferralListScreen } from '../screens/ReferralListScreen';
import { SecurePdfScreen } from '../screens/SecurePdfScreen';

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
      {currentScreen.screen === 'ResultDetail' && <ResultDetailScreen />}
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
      {currentScreen.screen === 'Appeals' && <AppealsScreen />}
      {currentScreen.screen === 'CertificateApplication' && <CertificateApplicationScreen />}
      {currentScreen.screen === 'ApplicationForm' && <ApplicationFormScreen selectedTypes={currentScreen.params.selectedTypes || []} />}
      {currentScreen.screen === 'QA' && <QAScreen />}
      {currentScreen.screen === 'QADetail' && <QADetailScreen />}
      {currentScreen.screen === 'QAForm' && <QAFormScreen />}
      {currentScreen.screen === 'Notifications' && <NotificationsScreen />}
      {currentScreen.screen === 'Profile' && <ProfileScreen />}
      {currentScreen.screen === 'Security' && <SecurityScreen />}
      {currentScreen.screen === 'Privacy' && <PrivacyScreen />}
      {currentScreen.screen === 'NotificationSettings' && <NotificationSettingsScreen />}
      {currentScreen.screen === 'OfflineContent' && <OfflineContentScreen />}
      {currentScreen.screen === 'Updates' && <UpdatesScreen />}
      {currentScreen.screen === 'HelpCenter' && <HelpCenterScreen />}
      {currentScreen.screen === 'Contact' && <ContactScreen />}
      {currentScreen.screen === 'Feedback' && <FeedbackScreen />}
      {currentScreen.screen === 'About' && <AboutScreen />}
      {currentScreen.screen === 'ReferralList' && <ReferralListScreen />}
      {currentScreen.screen === 'SecurePdf' && <SecurePdfScreen />}
      
      {/* Default */}
      {!['Home', 'Topics', 'Store', 'More', 'QuickTest', 'Lesson', 'Practice', 'OnlineLessons', 'Exam', 'ExamConfig', 'ExamIntro', 'ExamRun', 'Results', 'ResultDetail', 'Mistakes', 'TeacherContact', 'Packages', 'ActivationScheduled', 'Transactions', 'Settings', 'ProductDetail', 'Cart', 'Rules', 'Signs', 'Blogs', 'Fines', 'DrivingPractice', 'Appeals', 'CertificateApplication', 'ApplicationForm', 'QA', 'QADetail', 'QAForm', 'Notifications', 'Profile', 'Security', 'Privacy', 'NotificationSettings', 'OfflineContent', 'Updates', 'HelpCenter', 'Contact', 'Feedback', 'About', 'ReferralList', 'SecurePdf'].includes(currentScreen.screen) && <HomeScreen />}
    </PageTransition>
  );
}