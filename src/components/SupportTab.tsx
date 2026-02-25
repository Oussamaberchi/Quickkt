import React from 'react';
import { MessageCircleHeart, Info } from 'lucide-react';
import { CRAVING_TIPS, CRAVING_TIPS_FR } from '../utils/constants';

export function SupportTab({ language }: { language: 'ar' | 'fr' }) {
  const isAr = language === 'ar';
  const tips = isAr ? CRAVING_TIPS : CRAVING_TIPS_FR;

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <MessageCircleHeart className="text-rose-500" size={24} />
          {isAr ? 'نصائح للتغلب على الرغبة' : "Conseils pour surmonter l'envie"}
        </h2>
        <ul className="space-y-3">
          {tips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-600 dark:text-slate-300 text-sm bg-slate-50 dark:bg-slate-800 p-3 rounded-xl transition-colors">
              <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center font-bold text-xs">
                {idx + 1}
              </span>
              <span className="pt-0.5">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <Info className="text-blue-500" size={24} />
          {isAr ? 'معلومات تهمك' : 'Informations importantes'}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
          {isAr 
            ? 'الرغبة الملحة في التدخين (Craving) عادة ما تستمر لمدة 3 إلى 5 دقائق فقط. إذا تمكنت من إشغال نفسك خلال هذه الدقائق، ستمر الرغبة بسلام.' 
            : "L'envie de fumer (Craving) ne dure généralement que 3 à 5 minutes. Si vous parvenez à vous occuper pendant ces minutes, l'envie passera en paix."}
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {isAr 
            ? 'تذكر أن الانتكاسة ليست فشلاً، بل هي جزء من رحلة التعلم. إذا تعثرت، ابدأ من جديد فوراً.' 
            : "N'oubliez pas qu'une rechute n'est pas un échec, mais fait partie du parcours d'apprentissage. Si vous trébuchez, recommencez immédiatement."}
        </p>
      </div>
    </div>
  );
}
