import React, { useState, useEffect } from 'react';
import { DollarSign, CigaretteOff, Clock, Lightbulb, Target, Award, PlusCircle, TrendingUp, Activity } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
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

export function HomeTab({ userData, diffInSeconds, language }: Props) {
  const [quoteOfDay, setQuoteOfDay] = useState('');
  const isAr = language === 'ar';

  useEffect(() => {
    const quotes = isAr ? MOTIVATIONAL_QUOTES : MOTIVATIONAL_QUOTES_FR;
    setQuoteOfDay(quotes[Math.floor(Math.random() * quotes.length)]);
  }, [isAr]);

  const days = Math.floor(diffInSeconds / (3600 * 24));
  const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = diffInSeconds % 60;

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
    const d = seconds / (24 * 3600);
    if (d < 1) return { level: 1, title: isAr ? 'مبتدئ' : 'Novice', next: 1, progress: d * 100 };
    if (d < 7) return { level: 2, title: isAr ? 'متدرب' : 'Apprenti', next: 7, progress: (d / 7) * 100 };
    if (d < 30) return { level: 3, title: isAr ? 'محارب' : 'Guerrier', next: 30, progress: (d / 30) * 100 };
    if (d < 90) return { level: 4, title: isAr ? 'بطل' : 'Héros', next: 90, progress: (d / 90) * 100 };
    if (d < 365) return { level: 5, title: isAr ? 'أسطورة' : 'Légende', next: 365, progress: (d / 365) * 100 };
    return { level: 6, title: isAr ? 'معلم' : 'Maître', next: d + 1, progress: 100 };
  };

  const rpgStats = calculateLevel(diffInSeconds);

  // Calculate progress for the circular timer (e.g., progress towards next day)
  const progressPercentage = ((diffInSeconds % (24 * 3600)) / (24 * 3600)) * 100;
  const strokeDasharray = 2 * Math.PI * 120; // radius 120
  const strokeDashoffset = strokeDasharray - (progressPercentage / 100) * strokeDasharray;

  return (
    <div className="space-y-6 pb-8">
      {/* Hero Section: SmokeFreeTimer */}
      <div className="relative flex flex-col items-center justify-center py-8">
        <div className="relative w-72 h-72 flex items-center justify-center">
          {/* Background Glow */}
          <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-3xl"></div>
          
          {/* SVG Circular Progress */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 260 260">
            <defs>
              <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="100%" stopColor="#34D399" />
              </linearGradient>
            </defs>
            {/* Background Track */}
            <circle 
              cx="130" cy="130" r="120" 
              fill="none" 
              stroke="rgba(255,255,255,0.05)" 
              strokeWidth="8" 
            />
            {/* Progress Track */}
            <motion.circle 
              cx="130" cy="130" r="120" 
              fill="none" 
              stroke="url(#emeraldGradient)" 
              strokeWidth="8" 
              strokeLinecap="round"
              initial={{ strokeDashoffset: strokeDasharray }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ strokeDasharray }}
            />
          </svg>

          {/* Timer Content */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <span className="text-6xl font-bold font-mono text-white emerald-text-glow tracking-tighter">
              {days}
            </span>
            <span className="text-sm text-emerald-400 font-medium tracking-widest uppercase mt-1">
              {isAr ? 'أيام بدون تدخين' : 'Jours sans fumer'}
            </span>
            <div className="flex items-center gap-2 mt-4 text-slate-300 font-mono text-lg">
              <span>{hours.toString().padStart(2, '0')}</span>:
              <span>{minutes.toString().padStart(2, '0')}</span>:
              <span className="text-emerald-400">{seconds.toString().padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        {/* Subtitle with pulsing dot */}
        <div className="mt-6 flex items-center gap-2 text-sm text-slate-400 bg-slate-800/50 px-4 py-2 rounded-full border border-white/5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          {isAr ? 'رئتيك تتعافى الآن' : 'Your lungs are healing'}
        </div>
      </div>

      {/* Next Milestone Countdown */}
      <div className="glass-panel p-5 rounded-3xl flex items-center justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -mr-8 -mt-8"></div>
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            {isAr ? 'الهدف القادم' : 'Prochain objectif'}
          </h3>
          <p className="text-white font-bold">
            {isAr ? `الوصول إلى ${rpgStats.next} أيام` : `Atteindre ${rpgStats.next} jours`}
          </p>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-blue-400 font-mono">
            {Math.max(0, rpgStats.next - days)} {isAr ? 'أيام' : 'jours'}
          </div>
          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
            {isAr ? 'متبقية' : 'restants'}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div whileHover={{ scale: 1.02 }} className="glass-panel p-5 rounded-3xl flex flex-col items-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mb-3 group-hover:emerald-glow transition-all">
            <DollarSign size={24} />
          </div>
          <span className="text-2xl font-bold text-white font-mono">{moneySaved}</span>
          <span className="text-xs text-slate-400 font-medium mt-1">
            {userData.currency} {isAr ? 'تم توفيرها' : 'économisés'}
          </span>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }} className="glass-panel p-5 rounded-3xl flex flex-col items-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mb-3 group-hover:emerald-glow transition-all">
            <CigaretteOff size={24} />
          </div>
          <span className="text-2xl font-bold text-white font-mono">
            <AnimatedCounter value={cigarettesAvoided} />
          </span>
          <span className="text-xs text-slate-400 font-medium mt-1">
            {isAr ? 'سيجارة تم تجنبها' : 'cigarettes évitées'}
          </span>
        </motion.div>
      </div>

      {/* Life Regained */}
      <motion.div whileHover={{ scale: 1.02 }} className="glass-panel p-5 rounded-3xl flex items-center gap-4 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center shrink-0 group-hover:emerald-glow transition-all">
          <Activity size={28} />
        </div>
        <div>
          <h3 className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">
            {isAr ? 'الوقت المسترد للحياة' : 'Temps de vie regagné'}
          </h3>
          <p className="text-xl font-bold text-white">
            {lifeRegainedDays > 0 ? `${lifeRegainedDays} ${isAr ? 'يوم و' : 'j et'} ` : ''}
            {lifeRegainedHours} {isAr ? 'ساعة' : 'h'}
          </p>
        </div>
      </motion.div>

      {/* RPG Leveling System */}
      <div className="glass-panel p-5 rounded-3xl">
        <div className="flex justify-between items-end mb-3">
          <div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              {isAr ? 'المستوى' : 'Niveau'} {rpgStats.level}
            </span>
            <h3 className="font-bold text-white text-lg mt-1">
              {rpgStats.title}
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {isAr ? 'الهدف القادم:' : 'Prochain:'} <span className="text-white font-mono">{rpgStats.next}</span> {isAr ? 'يوم' : 'j'}
          </span>
        </div>
        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5">
          <motion.div 
            className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 emerald-glow"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, rpgStats.progress)}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Badges Section */}
      <div className="glass-panel p-5 rounded-3xl">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-bold text-white flex items-center gap-2">
            <Award className="text-emerald-400" size={20} />
            {isAr ? 'الإنجازات' : 'Réalisations'}
          </h3>
          <button 
            onClick={() => {
              confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#10B981', '#34D399', '#059669']
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
            className="text-[10px] bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-full font-bold border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors uppercase tracking-wider"
          >
            {isAr ? 'مشاركة' : 'Partager'}
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x hide-scrollbar">
          {badges.map((badge, idx) => (
            <motion.div 
              key={badge.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center gap-3 min-w-[70px] snap-center"
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center relative ${badge.achieved ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 emerald-glow' : 'bg-slate-800/50 text-slate-600 border border-white/5 opacity-50 grayscale'}`}>
                <Award size={24} />
                {badge.achieved && (
                  <div className="absolute inset-0 rounded-full border border-emerald-400 animate-ping opacity-20"></div>
                )}
              </div>
              <span className={`text-[10px] font-bold text-center uppercase tracking-wider ${badge.achieved ? 'text-slate-300' : 'text-slate-600'}`}>
                {badge.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quote */}
      <div className="glass-panel p-6 rounded-3xl text-center relative overflow-hidden">
        <div className="absolute -top-4 -left-4 text-emerald-500/10 rotate-12">
          <Lightbulb size={80} />
        </div>
        <p className="text-sm font-medium text-slate-300 italic relative z-10 leading-relaxed">
          "{quoteOfDay}"
        </p>
      </div>

    </div>
  );
}
