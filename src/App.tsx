import React, { useState, useEffect } from 'react';
import { UserData, AppState, ChatMessage, CravingLog } from './types';
import { SetupScreen } from './components/SetupScreen';
import { Dashboard } from './components/Dashboard';

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    userData: null,
    cravings: [],
    chatHistory: [],
    theme: 'light',
    language: 'ar'
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [now, setNow] = useState(new Date());
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('quitSmokingState');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAppState(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error('Failed to parse saved data');
      }
    }
    setIsLoaded(true);

    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('quitSmokingState', JSON.stringify(appState));
      
      // Apply theme
      if (appState.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      // Apply language direction
      document.documentElement.dir = appState.language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = appState.language;
    }
  }, [appState, isLoaded]);

  const handleSaveData = (userData: UserData) => {
    setAppState(prev => ({ ...prev, userData }));
    setShowSettings(false);
  };

  const handleReset = () => {
    const message = appState.language === 'ar' 
      ? 'هل أنت متأكد من رغبتك في إعادة تعيين جميع البيانات؟' 
      : 'Êtes-vous sûr de vouloir réinitialiser toutes les données ?';
      
    if (window.confirm(message)) {
      setAppState(prev => ({ ...prev, userData: null, cravings: [], chatHistory: [] }));
    }
  };

  const toggleTheme = () => {
    setAppState(prev => ({ ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' }));
  };

  const toggleLanguage = () => {
    setAppState(prev => ({ ...prev, language: prev.language === 'ar' ? 'fr' : 'ar' }));
  };

  const handleSendMessage = (msg: ChatMessage) => {
    setAppState(prev => ({
      ...prev,
      chatHistory: [...(prev.chatHistory || []), msg]
    }));
  };

  const handleLogCraving = (craving: CravingLog) => {
    setAppState(prev => ({
      ...prev,
      cravings: [...(prev.cravings || []), craving]
    }));
  };

  if (!isLoaded) return null;

  if (!appState.userData || showSettings) {
    return (
      <SetupScreen 
        initialData={appState.userData} 
        onSave={handleSaveData} 
        onCancel={appState.userData ? () => setShowSettings(false) : undefined} 
        language={appState.language}
      />
    );
  }

  return (
    <Dashboard 
      userData={appState.userData} 
      now={now} 
      theme={appState.theme}
      language={appState.language}
      chatHistory={appState.chatHistory || []}
      cravings={appState.cravings || []}
      onOpenSettings={() => setShowSettings(true)} 
      onReset={handleReset}
      onToggleTheme={toggleTheme}
      onToggleLanguage={toggleLanguage}
      onSendMessage={handleSendMessage}
      onLogCraving={handleLogCraving}
    />
  );
}
