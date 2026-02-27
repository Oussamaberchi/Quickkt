import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Info, CheckCircle2 } from 'lucide-react';

interface Props {
  language: 'ar' | 'fr';
  sessionsCompleted: number;
  onSessionComplete: () => void;
}

export function ExerciseTab({ language, sessionsCompleted, onSessionComplete }: Props) {
  const [phase, setPhase] = useState<'idle' | 'inhale' | 'hold' | 'exhale' | 'done'>('idle');
  const [timeLeft, setTimeLeft] = useState(0);
  const [cycles, setCycles] = useState(0);
  const maxCycles = 4; // 4 cycles of 4-7-8

  const isAr = language === 'ar';

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (phase !== 'idle' && phase !== 'done' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(l => l - 1), 1000);
    } else if (timeLeft === 0 && phase !== 'idle' && phase !== 'done') {
      if (phase === 'inhale') { 
        setPhase('hold'); 
        setTimeLeft(7); 
        if (navigator.vibrate) navigator.vibrate(50);
      } else if (phase === 'hold') { 
        setPhase('exhale'); 
        setTimeLeft(8); 
        if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
      } else if (phase === 'exhale') { 
        if (cycles + 1 >= maxCycles) {
          setPhase('done');
          onSessionComplete();
          if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 100]);
        } else {
          setCycles(c => c + 1);
          setPhase('inhale'); 
          setTimeLeft(4); 
          if (navigator.vibrate) navigator.vibrate(50);
        }
      }
    }
    return () => clearTimeout(timer);
  }, [phase, timeLeft, cycles, maxCycles, onSessionComplete]);

  const startExercise = () => {
    setPhase('inhale');
    setTimeLeft(4);
    setCycles(0);
    if (navigator.vibrate) navigator.vibrate(50);
  };

  const stopExercise = () => {
    setPhase('idle');
    setTimeLeft(0);
    setCycles(0);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
        
        <div className="w-16 h-16 mx-auto bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-4 emerald-glow relative z-10">
          <Wind size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2 relative z-10">
          {isAr ? 'تمرين التنفس 4-7-8' : 'Respiration 4-7-8'}
        </h2>
        <p className="text-slate-400 text-sm relative z-10">
          {isAr ? 'يقلل التوتر والرغبة في التدخين فوراً' : 'Réduit le stress et l\'envie de fumer immédiatement'}
        </p>
      </div>

      {/* Exercise Area */}
      <div className="glass-panel p-8 rounded-3xl text-center relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {phase === 'done' ? (
            <motion.div 
              key="done"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="w-24 h-24 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-6 emerald-glow">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {isAr ? 'أحسنت!' : 'Bravo!'}
              </h3>
              <p className="text-slate-400 mb-8">
                {isAr ? 'لقد أكملت جلسة التنفس بنجاح.' : 'Vous avez terminé la session avec succès.'}
              </p>
              <button 
                onClick={stopExercise}
                className="bg-slate-800/50 hover:bg-slate-800 text-white px-8 py-3 rounded-full font-bold transition-colors border border-white/10"
              >
                {isAr ? 'العودة' : 'Retour'}
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="exercise"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col items-center"
            >
              {/* Breathing Circle */}
              <div className="relative w-64 h-64 mb-10 flex items-center justify-center">
                {/* Background static circle */}
                <div className="absolute inset-0 rounded-full border-2 border-white/5"></div>
                
                {/* Animated circle */}
                <motion.div 
                  className={`absolute inset-0 rounded-full border-4 border-emerald-400/50 shadow-[0_0_30px_rgba(16,185,129,0.3)] ${phase === 'idle' ? 'opacity-0' : 'opacity-100'}`}
                  animate={{
                    scale: phase === 'inhale' ? 1.5 : phase === 'hold' ? 1.5 : phase === 'exhale' ? 1 : 1,
                    borderColor: phase === 'hold' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(16, 185, 129, 0.5)',
                    boxShadow: phase === 'hold' ? '0 0 30px rgba(59, 130, 246, 0.3)' : '0 0 30px rgba(16, 185, 129, 0.3)'
                  }}
                  transition={{
                    duration: phase === 'inhale' ? 4 : phase === 'exhale' ? 8 : 0.5,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Inner content */}
                <div className="relative z-10 flex flex-col items-center justify-center w-full h-full rounded-full bg-slate-900/50 backdrop-blur-sm border border-white/10">
                  <span className="text-6xl font-bold text-white font-mono mb-2">
                    {phase === 'idle' ? (isAr ? 'جاهز؟' : 'Prêt?') : timeLeft}
                  </span>
                  <span className={`text-sm font-bold uppercase tracking-widest ${phase === 'hold' ? 'text-blue-400' : 'text-emerald-400'}`}>
                    {phase === 'idle' ? '' : 
                     phase === 'inhale' ? (isAr ? 'شهيق' : 'Inspirez') : 
                     phase === 'hold' ? (isAr ? 'احتفظ' : 'Retenez') : (isAr ? 'زفير' : 'Expirez')}
                  </span>
                </div>
              </div>

              {/* Controls */}
              {phase === 'idle' ? (
                <button 
                  onClick={startExercise} 
                  className="w-full max-w-[200px] bg-gradient-to-r from-emerald-600 to-emerald-400 text-white font-bold py-4 rounded-full transition-transform hover:scale-105 emerald-glow"
                >
                  {isAr ? 'ابدأ التمرين' : "Commencer"}
                </button>
              ) : (
                <div className="w-full flex flex-col items-center gap-6">
                  {/* Progress dots */}
                  <div className="flex gap-2">
                    {Array.from({ length: maxCycles }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${i < cycles ? 'bg-emerald-400' : i === cycles ? 'bg-emerald-400/50 animate-pulse' : 'bg-slate-700'}`}
                      />
                    ))}
                  </div>
                  <button 
                    onClick={stopExercise} 
                    className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
                  >
                    {isAr ? 'إيقاف التمرين' : "Arrêter l'exercice"}
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stats */}
      <div className="glass-panel p-6 rounded-3xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center">
            <Info size={20} />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">{isAr ? 'الجلسات المكتملة' : 'Sessions complétées'}</h3>
            <p className="text-slate-400 text-xs">{isAr ? 'إجمالي عدد مرات التنفس' : 'Nombre total de respirations'}</p>
          </div>
        </div>
        <div className="text-3xl font-bold text-white font-mono">
          {sessionsCompleted}
        </div>
      </div>
    </div>
  );
}
