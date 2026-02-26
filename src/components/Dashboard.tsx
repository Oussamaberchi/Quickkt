import React, { useState } from 'react';
import { Settings, Trash2, Home, Heart, MessageCircleHeart, Wind, Moon, Sun, Globe, Bot, BarChart2, Activity, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [activeTab, setActiveTab] = useState<'home' | 'health' | 'support' | 'coach' | 'analytics' | 'exercise'>('home');
  const [showCravingModal, setShowCravingModal] = useState(false);
  const [cravingIntensity, setCravingIntensity] = useState(5);
  const [selectedTrigger, setSelectedTrigger] = useState('');

  const isAr = language === 'ar';
  
  const handleLogCraving = () => {
    onLogCraving({
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      intensity: cravingIntensity,
      trigger: selectedTrigger,
      mood: ''
    });
    alert(isAr ? `تم تسجيل الرغبة بشدة ${cravingIntensity}` : `Envie enregistrée avec intensité ${cravingIntensity}`);
    setShowCravingModal(false);
    setCravingIntensity(5);
    setSelectedTrigger('');
  };

  const triggers = [
    { id: 'stress', label: isAr ? 'توتر' : 'Stress', emoji: '😫' },
    { id: 'coffee', label: isAr ? 'قهوة' : 'Café', emoji: '☕' },
    { id: 'social', label: isAr ? 'اجتماعي' : 'Social', emoji: '👥' },
    { id: 'boredom', label: isAr ? 'ملل' : 'Ennui', emoji: '🥱' },
    { id: 'alcohol', label: isAr ? 'كحول' : 'Alcool', emoji: '🍷' },
  ];

  const quitDate = new Date(userData.quitDate);
  const diffInSeconds = Math.max(0, Math.floor((now.getTime() - quitDate.getTime()) / 1000));
  
  const tabVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="min-h-screen bg-slate-900 pb-32 transition-colors text-slate-50 font-sans">
      {/* Header */}
      <div className="pt-10 pb-6 px-6 relative z-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-emerald-400 emerald-text-glow">
              QuickKT
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {isAr ? 'رحلتك نحو حياة خالية من التدخين' : 'Your journey to a smoke-free life'}
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={onToggleLanguage} className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors border border-white/5">
              <Globe size={18} className="text-slate-300" />
            </button>
            <button onClick={onOpenSettings} className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors border border-white/5">
              <Settings size={18} className="text-slate-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-6 relative z-20 space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {activeTab === 'home' && <HomeTab userData={userData} diffInSeconds={diffInSeconds} language={language} onLogCraving={onLogCraving} />}
            {activeTab === 'health' && <HealthTab diffInSeconds={diffInSeconds} language={language} />}
            {activeTab === 'support' && <SupportTab language={language} />}
            {activeTab === 'coach' && <AICoachTab chatHistory={chatHistory} onSendMessage={onSendMessage} language={language} />}
            {activeTab === 'analytics' && <AnalyticsTab cravings={cravings} language={language} />}
            {activeTab === 'exercise' && <ExerciseTab language={language} />}
          </motion.div>
        </AnimatePresence>

        {/* Reset Data Button (Only in Home bottom) */}
        {activeTab === 'home' && (
          <div className="pt-4 pb-8">
            <button 
              onClick={onReset}
              className="w-full flex items-center justify-center gap-2 text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 py-4 rounded-3xl font-bold transition-colors border border-rose-500/20"
            >
              <Trash2 size={20} />
              {isAr ? 'إعادة تعيين البيانات' : 'Réinitialiser les données'}
            </button>
          </div>
        )}
      </div>

      {/* Floating Bottom Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-[400px] glass-panel rounded-full px-2 py-3 flex justify-around items-center z-50">
        <button 
          onClick={() => setActiveTab('home')}
          className={`relative flex flex-col items-center gap-1 transition-all duration-300 w-14 ${activeTab === 'home' ? 'text-emerald-400 -translate-y-1' : 'text-slate-400 hover:text-slate-300'}`}
        >
          <Home size={22} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
          {activeTab === 'home' && <span className="absolute -bottom-2 w-1 h-1 bg-emerald-400 rounded-full" />}
        </button>
        <button 
          onClick={() => setActiveTab('health')}
          className={`relative flex flex-col items-center gap-1 transition-all duration-300 w-14 ${activeTab === 'health' ? 'text-emerald-400 -translate-y-1' : 'text-slate-400 hover:text-slate-300'}`}
        >
          <Heart size={22} strokeWidth={activeTab === 'health' ? 2.5 : 2} />
          {activeTab === 'health' && <span className="absolute -bottom-2 w-1 h-1 bg-emerald-400 rounded-full" />}
        </button>
        
        {/* Center Add Button */}
        <div className="relative -top-6">
          <button 
            onClick={() => setShowCravingModal(true)}
            className="w-14 h-14 bg-gradient-to-tr from-emerald-600 to-emerald-400 rounded-full flex items-center justify-center text-white emerald-glow hover:scale-105 transition-transform"
          >
            <Plus size={28} strokeWidth={2.5} />
          </button>
        </div>

        <button 
          onClick={() => setActiveTab('coach')}
          className={`relative flex flex-col items-center gap-1 transition-all duration-300 w-14 ${activeTab === 'coach' ? 'text-emerald-400 -translate-y-1' : 'text-slate-400 hover:text-slate-300'}`}
        >
          <Bot size={22} strokeWidth={activeTab === 'coach' ? 2.5 : 2} />
          {activeTab === 'coach' && <span className="absolute -bottom-2 w-1 h-1 bg-emerald-400 rounded-full" />}
        </button>
        <button 
          onClick={() => setActiveTab('analytics')}
          className={`relative flex flex-col items-center gap-1 transition-all duration-300 w-14 ${activeTab === 'analytics' ? 'text-emerald-400 -translate-y-1' : 'text-slate-400 hover:text-slate-300'}`}
        >
          <BarChart2 size={22} strokeWidth={activeTab === 'analytics' ? 2.5 : 2} />
          {activeTab === 'analytics' && <span className="absolute -bottom-2 w-1 h-1 bg-emerald-400 rounded-full" />}
        </button>
      </div>

      {/* Craving Modal */}
      <AnimatePresence>
        {showCravingModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 z-[60] flex items-center justify-center p-6 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-panel rounded-3xl p-6 w-full max-w-sm"
            >
              <h3 className="text-xl font-bold text-slate-50 mb-4 text-center">
                {isAr ? 'كيف تشعر اليوم؟' : "Comment vous sentez-vous aujourd'hui ?"}
              </h3>
              
              <div className="mb-8">
                <h4 className="text-sm font-medium text-slate-400 mb-4 text-center">
                  {isAr ? 'ما مدى شدة الرغبة؟' : "Quelle est l'intensité de l'envie ?"}
                </h4>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-emerald-400 font-bold">1</span>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value={cravingIntensity} 
                    onChange={(e) => setCravingIntensity(Number(e.target.value))}
                    className="w-2/3 accent-amber-500"
                  />
                  <span className="text-amber-500 font-bold">10</span>
                </div>
                <div className="text-center text-4xl font-bold text-amber-500 font-mono">
                  {cravingIntensity}
                </div>
              </div>
              
              <div className="mb-8">
                <h4 className="text-sm font-medium text-slate-400 mb-4 text-center">
                  {isAr ? 'ما هو المحفز؟' : 'Quel est le déclencheur ?'}
                </h4>
                <div className="flex flex-wrap justify-center gap-3">
                  {triggers.map(trigger => (
                    <button
                      key={trigger.id}
                      onClick={() => setSelectedTrigger(trigger.id)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all ${
                        selectedTrigger === trigger.id 
                          ? 'bg-emerald-500/20 border border-emerald-500/50 scale-110 emerald-glow' 
                          : 'bg-slate-800/50 border border-white/5 hover:bg-slate-700'
                      }`}
                    >
                      <span className="text-2xl">{trigger.emoji}</span>
                      <span className={`text-[10px] font-medium ${selectedTrigger === trigger.id ? 'text-emerald-400' : 'text-slate-400'}`}>
                        {trigger.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setShowCravingModal(false)}
                  className="flex-1 bg-slate-800 text-slate-300 py-4 rounded-full font-bold border border-white/10 hover:bg-slate-700 transition-colors"
                >
                  {isAr ? 'إلغاء' : 'Annuler'}
                </button>
                <button 
                  onClick={handleLogCraving}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-400 text-white py-4 rounded-full font-bold emerald-glow hover:scale-[1.02] transition-transform"
                >
                  {isAr ? 'حفظ' : 'Enregistrer'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
