import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function ExerciseTab({ language }: { language: 'ar' | 'fr' }) {
  const [phase, setPhase] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle');
  const [timeLeft, setTimeLeft] = useState(0);
  const [activeTab, setActiveTab] = useState<'breathing' | 'surfing' | 'bubble'>('breathing');
  const [bubbles, setBubbles] = useState(Array(20).fill(false));

  const isAr = language === 'ar';

  const popBubble = (index: number) => {
    if (bubbles[index]) return;
    const newBubbles = [...bubbles];
    newBubbles[index] = true;
    setBubbles(newBubbles);
    
    // Haptic feedback if supported
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    // Reset if all popped
    if (newBubbles.every(b => b)) {
      setTimeout(() => setBubbles(Array(20).fill(false)), 1000);
    }
  };

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
    <div className="space-y-4">
      <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-2xl">
        <button 
          onClick={() => setActiveTab('breathing')}
          className={`flex-1 py-2 rounded-xl text-sm font-bold transition-colors ${activeTab === 'breathing' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
        >
          {isAr ? 'التنفس' : 'Respiration'}
        </button>
        <button 
          onClick={() => setActiveTab('surfing')}
          className={`flex-1 py-2 rounded-xl text-sm font-bold transition-colors ${activeTab === 'surfing' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
        >
          {isAr ? 'ركوب الموجة' : 'Surfer sur l\'envie'}
        </button>
        <button 
          onClick={() => setActiveTab('bubble')}
          className={`flex-1 py-2 rounded-xl text-sm font-bold transition-colors ${activeTab === 'bubble' ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
        >
          {isAr ? 'فرقعة' : 'Bulles'}
        </button>
      </div>

      {activeTab === 'breathing' && (
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
      )}

      {activeTab === 'surfing' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 text-center transition-colors">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
            {isAr ? 'ركوب موجة الرغبة' : 'Surfer sur la vague de l\'envie'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
            {isAr ? 'تخيل الرغبة كموجة في المحيط. إنها ترتفع، تصل للقمة، ثم تتكسر وتتلاشى. راقبها دون أن تستسلم لها.' : 'Imaginez l\'envie comme une vague dans l\'océan. Elle monte, atteint son sommet, puis se brise et s\'estompe. Observez-la sans y céder.'}
          </p>
          
          <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-blue-50 dark:bg-blue-900/20 mb-8 flex items-end">
            <motion.div 
              className="w-full bg-blue-400 dark:bg-blue-600 opacity-50"
              animate={{ 
                height: ['20%', '80%', '10%'],
                borderRadius: ['100% 100% 0 0', '40% 60% 0 0', '100% 100% 0 0']
              }}
              transition={{ 
                duration: 15, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-0 w-full bg-blue-500 dark:bg-blue-500 opacity-60"
              animate={{ 
                height: ['10%', '60%', '5%'],
                borderRadius: ['100% 100% 0 0', '60% 40% 0 0', '100% 100% 0 0']
              }}
              transition={{ 
                duration: 12, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-blue-800 dark:text-blue-200 font-bold text-lg opacity-80 mix-blend-overlay">
                {isAr ? 'الموجة تمر...' : 'La vague passe...'}
              </span>
            </div>
          </div>
          
          <div className="text-sm text-slate-600 dark:text-slate-300 space-y-3 text-right" dir={isAr ? 'rtl' : 'ltr'}>
            <p>🌊 {isAr ? 'الرغبة تستمر عادة من 3 إلى 5 دقائق فقط.' : 'L\'envie ne dure généralement que 3 à 5 minutes.'}</p>
            <p>🏄‍♂️ {isAr ? 'لا تحاربها، فقط راقبها وهي تتلاشى.' : 'Ne la combattez pas, regardez-la simplement s\'estomper.'}</p>
          </div>
        </div>
      )}

      {activeTab === 'bubble' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 text-center transition-colors">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
            {isAr ? 'فرقعة الفقاعات' : 'Éclater les bulles'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
            {isAr ? 'شتت انتباهك وفرقع هذه الفقاعات حتى تزول الرغبة.' : 'Distrayez-vous et éclatez ces bulles jusqu\'à ce que l\'envie passe.'}
          </p>
          
          <div className="grid grid-cols-4 gap-3 max-w-[240px] mx-auto mb-6">
            {bubbles.map((popped, idx) => (
              <motion.button
                key={idx}
                onClick={() => popBubble(idx)}
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm transition-colors ${
                  popped 
                    ? 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700' 
                    : 'bg-gradient-to-br from-purple-300 to-purple-500 hover:from-purple-400 hover:to-purple-600 cursor-pointer shadow-md shadow-purple-500/20'
                }`}
                whileTap={!popped ? { scale: 0.8 } : {}}
              >
                {popped && <span className="text-slate-300 dark:text-slate-600 text-xs">×</span>}
              </motion.button>
            ))}
          </div>
          
          <button 
            onClick={() => setBubbles(Array(20).fill(false))}
            className="text-sm text-purple-600 dark:text-purple-400 font-bold hover:underline"
          >
            {isAr ? 'إعادة تعيين' : 'Réinitialiser'}
          </button>
        </div>
      )}
    </div>
  );
}
