import React, { useState } from 'react';
import { Settings, Trash2, Home, Heart, MessageCircleHeart, Wind, Moon, Sun, Globe, Bot, BarChart2 } from 'lucide-react';
import { UserData, ChatMessage, CravingLog } from '../types';
import { HomeTab } from './HomeTab';
import { HealthTab } from './HealthTab';
import { SupportTab } from './SupportTab';
import { ExerciseTab } from './ExerciseTab';
import { AICoachTab } from './AICoachTab';
import { AnalyticsTab } from './AnalyticsTab';

interface Props {
  userData: UserData;
  now: Date;
  theme: 'light' | 'dark';
  language: 'ar' | 'fr';
  chatHistory: ChatMessage[];
  cravings: CravingLog[];
  onOpenSettings: () => void;
  onReset: () => void;
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
  onSendMessage: (msg: ChatMessage) => void;
  onLogCraving: (craving: CravingLog) => void;
}

export function Dashboard({ 
  userData, now, theme, language, chatHistory, cravings,
  onOpenSettings, onReset, onToggleTheme, onToggleLanguage, onSendMessage, onLogCraving
}: Props) {
  const [activeTab, setActiveTab] = useState<'home' | 'health' | 'support' | 'coach' | 'analytics'>('home');

  const isAr = language === 'ar';
  const quitDate = new Date(userData.quitDate);
  const diffInSeconds = Math.max(0, Math.floor((now.getTime() - quitDate.getTime()) / 1000));
  
  const days = Math.floor(diffInSeconds / (3600 * 24));
  const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = diffInSeconds % 60;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-28 transition-colors">
      {/* Header */}
      <div className={`bg-emerald-500 dark:bg-emerald-700 text-white transition-all duration-300 relative overflow-hidden ${activeTab === 'home' ? 'pt-12 pb-8 px-6 rounded-b-[2.5rem] shadow-lg shadow-emerald-500/20 dark:shadow-emerald-900/50' : 'pt-10 pb-6 px-6 rounded-b-3xl'}`}>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grad)" />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <div className="flex justify-between items-center relative z-10">
          <h1 className="text-2xl font-bold">
            {activeTab === 'home' && (isAr ? 'إحصائياتي' : 'Mes Statistiques')}
            {activeTab === 'health' && (isAr ? 'التعافي الصحي' : 'Récupération')}
            {activeTab === 'support' && (isAr ? 'الدعم النفسي' : 'Soutien')}
            {activeTab === 'coach' && (isAr ? 'المدرب الذكي' : 'Coach IA')}
            {activeTab === 'analytics' && (isAr ? 'التحليلات' : 'Analytique')}
          </h1>
          <div className="flex gap-2">
            <button onClick={onToggleLanguage} className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
              <Globe size={20} />
            </button>
            <button onClick={onToggleTheme} className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button onClick={onOpenSettings} className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </div>

        {activeTab === 'home' && (
          <div className="text-center relative z-10 mt-8">
            <p className="text-emerald-100 dark:text-emerald-200 text-sm font-medium mb-2">
              {isAr ? 'الوقت الخالي من التدخين' : 'Temps sans fumer'}
            </p>
            <div className="flex justify-center items-end gap-2 text-white" dir="ltr">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold">{days}</span>
                <span className="text-xs opacity-80">{isAr ? 'يوم' : 'j'}</span>
              </div>
              <span className="text-2xl font-bold pb-4 opacity-50">:</span>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold">{hours.toString().padStart(2, '0')}</span>
                <span className="text-xs opacity-80">{isAr ? 'ساعة' : 'h'}</span>
              </div>
              <span className="text-2xl font-bold pb-4 opacity-50">:</span>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold">{minutes.toString().padStart(2, '0')}</span>
                <span className="text-xs opacity-80">{isAr ? 'دقيقة' : 'm'}</span>
              </div>
              <span className="text-2xl font-bold pb-4 opacity-50">:</span>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold">{seconds.toString().padStart(2, '0')}</span>
                <span className="text-xs opacity-80">{isAr ? 'ثانية' : 's'}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className={`px-6 relative z-20 space-y-4 ${activeTab === 'home' ? '-mt-6' : 'mt-6'}`}>
        {activeTab === 'home' && <HomeTab userData={userData} diffInSeconds={diffInSeconds} language={language} onLogCraving={onLogCraving} />}
        {activeTab === 'health' && <HealthTab diffInSeconds={diffInSeconds} language={language} />}
        {activeTab === 'support' && <SupportTab language={language} />}
        {activeTab === 'coach' && <AICoachTab chatHistory={chatHistory} onSendMessage={onSendMessage} language={language} />}
        {activeTab === 'analytics' && <AnalyticsTab cravings={cravings} language={language} />}

        {/* Reset Data Button (Only in Home bottom) */}
        {activeTab === 'home' && (
          <div className="pt-4">
            <button 
              onClick={onReset}
              className="w-full flex items-center justify-center gap-2 text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/40 py-4 rounded-2xl font-bold transition-colors"
            >
              <Trash2 size={20} />
              {isAr ? 'إعادة تعيين البيانات' : 'Réinitialiser les données'}
            </button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-4 flex justify-around items-center z-50 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.5)] transition-colors">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 transition-colors w-16 ${activeTab === 'home' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
        >
          <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">{isAr ? 'الرئيسية' : 'Accueil'}</span>
        </button>
        <button 
          onClick={() => setActiveTab('health')}
          className={`flex flex-col items-center gap-1 transition-colors w-16 ${activeTab === 'health' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
        >
          <Heart size={24} strokeWidth={activeTab === 'health' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">{isAr ? 'الصحة' : 'Santé'}</span>
        </button>
        <button 
          onClick={() => setActiveTab('coach')}
          className={`flex flex-col items-center gap-1 transition-colors w-16 ${activeTab === 'coach' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
        >
          <Bot size={24} strokeWidth={activeTab === 'coach' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">{isAr ? 'المدرب' : 'Coach'}</span>
        </button>
        <button 
          onClick={() => setActiveTab('analytics')}
          className={`flex flex-col items-center gap-1 transition-colors w-16 ${activeTab === 'analytics' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
        >
          <BarChart2 size={24} strokeWidth={activeTab === 'analytics' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">{isAr ? 'تحليلات' : 'Stats'}</span>
        </button>
        <button 
          onClick={() => setActiveTab('support')}
          className={`flex flex-col items-center gap-1 transition-colors w-16 ${activeTab === 'support' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
        >
          <MessageCircleHeart size={24} strokeWidth={activeTab === 'support' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">{isAr ? 'الدعم' : 'Soutien'}</span>
        </button>
      </div>
    </div>
  );
}
