import React from 'react';
import { MessageCircleHeart, Info, ShieldCheck, HeartPulse } from 'lucide-react';
import { CRAVING_TIPS, CRAVING_TIPS_FR } from '../utils/constants';

export function SupportTab({ language }: { language: 'ar' | 'fr' }) {
  const isAr = language === 'ar';
  const tips = isAr ? CRAVING_TIPS : CRAVING_TIPS_FR;

  return (
    <div className="space-y-6 pb-8">
      <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 emerald-glow">
            <ShieldCheck size={20} />
          </div>
          {isAr ? 'نصائح للتغلب على الرغبة' : "Conseils pour surmonter l'envie"}
        </h2>
        <ul className="space-y-3 relative z-10">
          {tips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-4 text-slate-300 text-sm bg-slate-800/50 border border-white/5 p-4 rounded-2xl hover:bg-slate-800 transition-colors group">
              <span className="flex-shrink-0 w-8 h-8 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center font-bold text-xs group-hover:emerald-glow transition-all">
                {idx + 1}
              </span>
              <span className="pt-1 leading-relaxed">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <HeartPulse size={20} />
          </div>
          {isAr ? 'معلومات طبية تهمك' : 'Informations médicales importantes'}
        </h2>
        <div className="space-y-4 relative z-10">
          <div className="bg-slate-800/50 border border-white/5 p-5 rounded-2xl">
            <p className="text-sm text-slate-300 leading-relaxed">
              {isAr 
                ? 'الرغبة الملحة في التدخين (Craving) عادة ما تستمر لمدة 3 إلى 5 دقائق فقط. إذا تمكنت من إشغال نفسك خلال هذه الدقائق، ستمر الرغبة بسلام.' 
                : "L'envie de fumer (Craving) ne dure généralement que 3 à 5 minutes. Si vous parvenez à vous occuper pendant ces minutes, l'envie passera en paix."}
            </p>
          </div>
          <div className="bg-slate-800/50 border border-white/5 p-5 rounded-2xl">
            <p className="text-sm text-slate-300 leading-relaxed">
              {isAr 
                ? 'تذكر أن الانتكاسة ليست فشلاً، بل هي جزء من رحلة التعلم. إذا تعثرت، ابدأ من جديد فوراً.' 
                : "N'oubliez pas qu'une rechute n'est pas un échec, mais fait partie du parcours d'apprentissage. Si vous trébuchez, recommencez immédiatement."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
