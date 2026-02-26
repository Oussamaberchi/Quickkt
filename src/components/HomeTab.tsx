import React, { useState, useEffect } from 'react';
import { DollarSign, CigaretteOff, Clock, Lightbulb, Target, Award, PlusCircle, TrendingUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserData, CravingLog } from '../types';
import { MOTIVATIONAL_QUOTES, MOTIVATIONAL_QUOTES_FR } from '../utils/constants';

interface Props {
  userData: UserData;
  diffInSeconds: number;
  language: 'ar' | 'fr';
  onLogCraving: (craving: CravingLog) => void;
}

function AnimatedCounter({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const duration = 1000;
    const incrementTime = Math.abs(Math.floor(duration / end));
    
    const timer = setInterval(() => {
      start += 1;
      setDisplayValue(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{displayValue}</span>;
}

export function HomeTab({ userData, diffInSeconds, language, onLogCraving }: Props) {
  const [quoteOfDay, setQuoteOfDay] = useState('');
  const [showCravingModal, setShowCravingModal] = useState(false);
  const [cravingIntensity, setCravingIntensity] = useState(5);
  const isAr = language === 'ar';

  useEffect(() => {
    const quotes = isAr ? MOTIVATIONAL_QUOTES : MOTIVATIONAL_QUOTES_FR;
    setQuoteOfDay(quotes[Math.floor(Math.random() * quotes.length)]);
  }, [isAr]);

  const cigarettesAvoided = Math.floor((diffInSeconds / (24 * 3600)) * userData.cigarettesPerDay);
  const moneySaved = ((cigarettesAvoided / userData.cigarettesPerPack) * userData.pricePerPack).toFixed(2);
  const lifeRegainedMinutes = cigarettesAvoided * 11; // Approx 11 minutes of life regained per cigarette
  const lifeRegainedDays = Math.floor(lifeRegainedMinutes / (24 * 60));
  const lifeRegainedHours = Math.floor((lifeRegainedMinutes % (24 * 60)) / 60);

  const badges = [
    { id: '24h', label: isAr ? '24 ساعة' : '24 heures', achieved: diffInSeconds >= 24 * 3600 },
    { id: '1w', label: isAr ? 'أسبوع' : '1 semaine', achieved: diffInSeconds >= 7 * 24 * 3600 },
    { id: '1m', label: isAr ? 'شهر' : '1 mois', achieved: diffInSeconds >= 30 * 24 * 3600 },
    { id: '3m', label: isAr ? '3 أشهر' : '3 mois', achieved: diffInSeconds >= 90 * 24 * 3600 },
    { id: '1y', label: isAr ? 'سنة' : '1 an', achieved: diffInSeconds >= 365 * 24 * 3600 },
  ];

  // RPG Leveling System
  const calculateLevel = (seconds: number) => {
    const days = seconds / (24 * 3600);
    if (days < 1) return { level: 1, title: isAr ? 'مبتدئ' : 'Novice', next: 1, progress: days * 100 };
    if (days < 7) return { level: 2, title: isAr ? 'متدرب' : 'Apprenti', next: 7, progress: (days / 7) * 100 };
    if (days < 30) return { level: 3, title: isAr ? 'محارب' : 'Guerrier', next: 30, progress: (days / 30) * 100 };
    if (days < 90) return { level: 4, title: isAr ? 'بطل' : 'Héros', next: 90, progress: (days / 90) * 100 };
    if (days < 365) return { level: 5, title: isAr ? 'أسطورة' : 'Légende', next: 365, progress: (days / 365) * 100 };
    return { level: 6, title: isAr ? 'معلم' : 'Maître', next: days + 1, progress: 100 };
  };

  const rpgStats = calculateLevel(diffInSeconds);

  const [selectedTrigger, setSelectedTrigger] = useState('');

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

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center transition-colors">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-3">
            <DollarSign size={24} />
          </div>
          <span className="text-2xl font-bold text-slate-800 dark:text-white">{moneySaved}</span>
          <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            {userData.currency} {isAr ? 'تم توفيرها' : 'économisés'}
          </span>
        </div>
        
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center transition-colors">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-3">
            <CigaretteOff size={24} />
          </div>
          <span className="text-2xl font-bold text-slate-800 dark:text-white">
            <AnimatedCounter value={cigarettesAvoided} />
          </span>
          <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            {isAr ? 'سيجارة تم تجنبها' : 'cigarettes évitées'}
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4 transition-colors">
        <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center shrink-0">
          <Clock size={28} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
            {isAr ? 'الوقت المسترد للحياة' : 'Temps de vie regagné'}
          </h3>
          <p className="text-lg font-bold text-slate-800 dark:text-white">
            {lifeRegainedDays > 0 ? `${lifeRegainedDays} ${isAr ? 'يوم و' : 'jours et'} ` : ''}
            {lifeRegainedHours} {isAr ? 'ساعة' : 'heures'}
          </p>
        </div>
      </div>

      {/* RPG Leveling System */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
        <div className="flex justify-between items-end mb-2">
          <div>
            <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
              {isAr ? 'المستوى' : 'Niveau'} {rpgStats.level}
            </span>
            <h3 className="font-bold text-slate-800 dark:text-white text-lg">
              {rpgStats.title}
            </h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {isAr ? 'الهدف القادم:' : 'Prochain:'} {rpgStats.next} {isAr ? 'يوم' : 'jours'}
          </span>
        </div>
        <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-1000 bg-gradient-to-r from-amber-400 to-amber-600"
            style={{ width: `${Math.min(100, rpgStats.progress)}%` }}
          />
        </div>
      </div>

      {/* Badges Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Award className="text-amber-500" size={20} />
            {isAr ? 'الإنجازات' : 'Réalisations'}
          </h3>
          <button 
            onClick={() => {
              confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
              });
              const text = isAr 
                ? `أنا فخور بأنني لم أدخن منذ ${diffInSeconds >= 24 * 3600 ? Math.floor(diffInSeconds / (24 * 3600)) + ' يوم' : Math.floor(diffInSeconds / 3600) + ' ساعة'}! 🎉`
                : `Je suis fier de ne pas avoir fumé depuis ${diffInSeconds >= 24 * 3600 ? Math.floor(diffInSeconds / (24 * 3600)) + ' jours' : Math.floor(diffInSeconds / 3600) + ' heures'}! 🎉`;
              if (navigator.share) {
                navigator.share({ title: 'Quit Smoking Streak', text });
              } else {
                alert(text);
              }
            }}
            className="text-xs bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-full font-bold"
          >
            {isAr ? 'مشاركة' : 'Partager'}
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
          {badges.map(badge => (
            <div key={badge.id} className="flex flex-col items-center gap-2 min-w-[60px] snap-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${badge.achieved ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600'}`}>
                <Award size={24} />
              </div>
              <span className={`text-[10px] font-bold text-center ${badge.achieved ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-500'}`}>
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Craving Logger Button */}
      <button 
        onClick={() => setShowCravingModal(true)}
        className="w-full bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-rose-600 dark:text-rose-400 font-bold py-4 rounded-3xl transition-colors flex items-center justify-center gap-2 border border-rose-100 dark:border-rose-900/50"
      >
        <PlusCircle size={20} />
        {isAr ? 'تسجيل رغبة ملحة (Craving)' : 'Enregistrer une envie (Craving)'}
      </button>

      {/* Craving Modal */}
      {showCravingModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 text-center">
              {isAr ? 'ما مدى شدة الرغبة؟' : "Quelle est l'intensité de l'envie ?"}
            </h3>
            <div className="flex justify-between items-center mb-6">
              <span className="text-emerald-500 font-bold">1</span>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={cravingIntensity} 
                onChange={(e) => setCravingIntensity(Number(e.target.value))}
                className="w-2/3 accent-rose-500"
              />
              <span className="text-rose-500 font-bold">10</span>
            </div>
            <div className="text-center text-3xl font-bold text-rose-500 mb-6">
              {cravingIntensity}
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 text-center">
                {isAr ? 'ما هو المحفز؟' : 'Quel est le déclencheur ?'}
              </h4>
              <div className="flex flex-wrap justify-center gap-2">
                {triggers.map(trigger => (
                  <button
                    key={trigger.id}
                    onClick={() => setSelectedTrigger(trigger.id)}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-1 ${
                      selectedTrigger === trigger.id 
                        ? 'bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 border-2 border-rose-500' 
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-2 border-transparent'
                    }`}
                  >
                    <span>{trigger.emoji}</span>
                    <span>{trigger.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowCravingModal(false)}
                className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 py-3 rounded-xl font-bold"
              >
                {isAr ? 'إلغاء' : 'Annuler'}
              </button>
              <button 
                onClick={handleLogCraving}
                className="flex-1 bg-rose-500 text-white py-3 rounded-xl font-bold shadow-lg shadow-rose-500/30"
              >
                {isAr ? 'حفظ' : 'Enregistrer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mood Tracker */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
        <h3 className="font-bold text-slate-800 dark:text-white mb-4 text-center">
          {isAr ? 'كيف تشعر اليوم؟' : "Comment vous sentez-vous aujourd'hui ?"}
        </h3>
        <div className="flex justify-between px-2">
          {[
            { emoji: '😢', label: isAr ? 'حزين' : 'Triste', value: 'sad' },
            { emoji: '😠', label: isAr ? 'غاضب' : 'En colère', value: 'angry' },
            { emoji: '😐', label: isAr ? 'عادي' : 'Neutre', value: 'neutral' },
            { emoji: '🙂', label: isAr ? 'جيد' : 'Bien', value: 'good' },
            { emoji: '🤩', label: isAr ? 'ممتاز' : 'Super', value: 'great' }
          ].map(mood => (
            <button 
              key={mood.value}
              onClick={() => alert(isAr ? `تم تسجيل مزاجك: ${mood.label}` : `Humeur enregistrée : ${mood.label}`)}
              className="flex flex-col items-center gap-2 hover:scale-110 transition-transform"
            >
              <span className="text-3xl">{mood.emoji}</span>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">{mood.label}</span>
            </button>
          ))}
        </div>
      </div>

      {userData.savingsGoal && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Target className="text-amber-500" size={20} />
              <h3 className="font-bold text-slate-800 dark:text-white">{userData.savingsGoal.name}</h3>
            </div>
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
              {moneySaved} / {userData.savingsGoal.amount} {userData.currency}
            </span>
          </div>
          <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-1000 bg-amber-500"
              style={{ width: `${Math.min(100, (Number(moneySaved) / userData.savingsGoal.amount) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Investment Projection */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
        <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp className="text-blue-500" size={20} />
          {isAr ? 'توقعات التوفير' : 'Prévisions d\'économies'}
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: isAr ? 'سنة' : '1 an', multiplier: 365 },
            { label: isAr ? '5 سنوات' : '5 ans', multiplier: 365 * 5 },
            { label: isAr ? '10 سنوات' : '10 ans', multiplier: 365 * 10 }
          ].map((period, idx) => {
            const projectedSavings = ((userData.cigarettesPerDay / userData.cigarettesPerPack) * userData.pricePerPack * period.multiplier).toFixed(0);
            return (
              <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl text-center">
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">{period.label}</div>
                <div className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                  {projectedSavings} {userData.currency}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-800 rounded-3xl p-6 text-white shadow-md transition-colors">
        <div className="flex items-start gap-3">
          <Lightbulb className="shrink-0 text-emerald-200" size={24} />
          <div>
            <h3 className="font-bold mb-1">{isAr ? 'إلهام اليوم' : 'Inspiration du jour'}</h3>
            <p className="text-emerald-50 text-sm leading-relaxed">{quoteOfDay}</p>
          </div>
        </div>
      </div>
    </>
  );
}
