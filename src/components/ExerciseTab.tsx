import React, { useState, useEffect } from 'react';

export function ExerciseTab({ language }: { language: 'ar' | 'fr' }) {
  const [phase, setPhase] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle');
  const [timeLeft, setTimeLeft] = useState(0);

  const isAr = language === 'ar';

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (phase !== 'idle' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(l => l - 1), 1000);
    } else if (timeLeft === 0) {
      if (phase === 'inhale') { setPhase('hold'); setTimeLeft(7); }
      else if (phase === 'hold') { setPhase('exhale'); setTimeLeft(8); }
      else if (phase === 'exhale') { setPhase('inhale'); setTimeLeft(4); }
    }
    return () => clearTimeout(timer);
  }, [phase, timeLeft]);

  const startExercise = () => {
    setPhase('inhale');
    setTimeLeft(4);
  };

  const stopExercise = () => {
    setPhase('idle');
    setTimeLeft(0);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 text-center transition-colors">
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
        {isAr ? 'تمرين التنفس 4-7-8' : 'Exercice de respiration 4-7-8'}
      </h2>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
        {isAr ? 'يساعد هذا التمرين على الاسترخاء وتقليل الرغبة الملحة في التدخين بسرعة.' : "Cet exercice aide à se détendre et à réduire rapidement l'envie de fumer."}
      </p>
      
      <div className="relative w-56 h-56 mx-auto mb-10 flex items-center justify-center">
        <div className={`absolute inset-0 rounded-full border-4 border-emerald-100 dark:border-emerald-900/50 transition-transform duration-1000 ${
          phase === 'inhale' ? 'scale-125 bg-emerald-50 dark:bg-emerald-900/20' : 
          phase === 'hold' ? 'scale-125 bg-emerald-100 dark:bg-emerald-900/40' : 
          phase === 'exhale' ? 'scale-90 bg-emerald-50 dark:bg-emerald-900/20' : 'bg-slate-50 dark:bg-slate-800'
        }`}></div>
        <div className="relative z-10 flex flex-col items-center">
          <span className="text-5xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
            {phase === 'idle' ? (isAr ? 'جاهز؟' : 'Prêt?') : timeLeft}
          </span>
          <span className="text-base font-bold text-emerald-800 dark:text-emerald-300">
            {phase === 'idle' ? '' : 
             phase === 'inhale' ? (isAr ? 'شهيق من الأنف...' : 'Inspirez par le nez...') : 
             phase === 'hold' ? (isAr ? 'احتفظ بالهواء...' : 'Retenez votre souffle...') : (isAr ? 'زفير من الفم...' : 'Expirez par la bouche...')}
          </span>
        </div>
      </div>

      {phase === 'idle' ? (
        <button onClick={startExercise} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl transition-colors shadow-lg shadow-emerald-500/30">
          {isAr ? 'ابدأ التمرين' : "Commencer l'exercice"}
        </button>
      ) : (
        <button onClick={stopExercise} className="w-full bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-rose-600 dark:text-rose-400 font-bold py-4 rounded-2xl transition-colors">
          {isAr ? 'إيقاف التمرين' : "Arrêter l'exercice"}
        </button>
      )}
    </div>
  );
}
