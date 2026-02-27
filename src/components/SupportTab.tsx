import React from 'react';
import { ShieldCheck, AlertTriangle, Clock, CheckCircle2, Flame, Wind, Moon } from 'lucide-react';

export function SupportTab({ language }: { language: 'ar' | 'fr' }) {
  const isAr = language === 'ar';

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
        
        <div className="w-16 h-16 mx-auto bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-4 emerald-glow relative z-10">
          <ShieldCheck size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2 relative z-10">
          {isAr ? 'خطة الـ 24 ساعة' : 'Plan des 24 Heures'}
        </h2>
        <p className="text-slate-400 text-sm relative z-10">
          {isAr ? 'يومك الأول كـ "غير مدخن"' : 'Votre premier jour en tant que "non-fumeur"'}
        </p>
      </div>

      {/* The Truth */}
      <div className="glass-panel p-6 rounded-3xl border border-amber-500/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <AlertTriangle className="text-amber-500" size={20} />
          {isAr ? 'الحقيقة التي يجب أن تؤمن بها' : 'La vérité à croire'}
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed italic">
          {isAr 
            ? '"أنت لا تستمتع بالتدخين. أنت فقط تخفف من أعراض الانسحاب التي سببها التدخين نفسه. السيجارة لا تعطيك متعة - بل تعيدك للحالة الطبيعية التي كان عليها جسمك قبل أن يدخن."'
            : '"Vous ne profitez pas de fumer. Vous ne faites que soulager les symptômes de sevrage causés par le tabagisme lui-même. La cigarette ne vous donne aucun plaisir - elle vous ramène à l\'état normal de votre corps avant de fumer."'}
        </p>
      </div>

      {/* Before Sleep */}
      <div className="glass-panel p-6 rounded-3xl">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Moon className="text-indigo-400" size={20} />
          {isAr ? 'الآن - قبل النوم (30 دقيقة)' : 'Maintenant - Avant de dormir (30 min)'}
        </h3>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={18} />
            <div>
              <span className="font-bold text-slate-200 block text-sm mb-1">{isAr ? 'تخلص من كل شيء' : 'Débarrassez-vous de tout'}</span>
              <span className="text-slate-400 text-xs leading-relaxed">
                {isAr ? 'ارمِ آخر علبة سجائر، الولاعات، المنفضة. اغسل الملابس التي تفوح منها رائحة الدخان.' : 'Jetez le dernier paquet, les briquets, le cendrier. Lavez les vêtements qui sentent la fumée.'}
              </span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={18} />
            <div>
              <span className="font-bold text-slate-200 block text-sm mb-1">{isAr ? 'اكتب على ورقة كبيرة' : 'Écrivez sur un grand papier'}</span>
              <div className="bg-slate-800/50 p-3 rounded-xl border border-white/5 mt-2">
                <p className="text-emerald-400 text-sm font-mono text-center">
                  {isAr ? 'أنا غير مدخن.' : 'Je suis non-fumeur.'}<br/>
                  {isAr ? 'السيجارة لا تعطيني شيئاً، بل تسرق مني كل شيء.' : 'La cigarette ne me donne rien, elle me vole tout.'}
                </p>
              </div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={18} />
            <div>
              <span className="font-bold text-slate-200 block text-sm mb-1">{isAr ? 'جهز أدوات البقاء' : 'Préparez vos outils de survie'}</span>
              <span className="text-slate-400 text-xs leading-relaxed">
                {isAr ? 'علكة نعناع قوية، ماء بارد، وتطبيق التتبع الخاص بك.' : 'Chewing-gum à la menthe forte, eau froide, et votre application de suivi.'}
              </span>
            </div>
          </li>
        </ul>
      </div>

      {/* Danger Zones */}
      <div className="glass-panel p-6 rounded-3xl">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Flame className="text-rose-400" size={20} />
          {isAr ? 'أوقات الخطر والحلول الفورية' : 'Zones de danger et solutions'}
        </h3>
        <div className="space-y-3">
          {[
            { time: isAr ? 'بعد الأكل' : 'Après manger', danger: isAr ? 'قوية جداً' : 'Très forte', solution: isAr ? 'شاي + مشي 3 دقائق' : 'Thé + marche 3 min' },
            { time: isAr ? 'التوتر' : 'Stress', danger: isAr ? 'متوسطة' : 'Moyenne', solution: isAr ? 'تنفس 4-7-8' : 'Respiration 4-7-8' },
            { time: isAr ? 'الملل' : 'Ennui', danger: isAr ? 'خفيفة' : 'Légère', solution: isAr ? 'لعبة على الهاتف' : 'Jeu sur téléphone' },
            { time: isAr ? 'مع المدخنين' : 'Avec fumeurs', danger: isAr ? 'قوية' : 'Forte', solution: isAr ? 'اترك المكان فوراً' : 'Quittez les lieux' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between bg-slate-800/50 p-3 rounded-xl border border-white/5">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-200">{item.time}</span>
                <span className="text-[10px] text-rose-400">{item.danger}</span>
              </div>
              <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg">
                {item.solution}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Non-Negotiables */}
      <div className="glass-panel p-6 rounded-3xl">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <ShieldCheck className="text-blue-400" size={20} />
          {isAr ? 'قواعد عدم الانهيار' : 'Règles non négociables'}
        </h3>
        <div className="grid gap-3">
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-white/5">
            <span className="font-bold text-rose-400 block text-sm mb-1">1. NOPE (Not One Puff Ever)</span>
            <span className="text-slate-400 text-xs leading-relaxed">
              {isAr ? 'حتى "سحبة واحدة" ترجعك للبداية. النيكوتين يُعيد إدمانك فوراً.' : 'Même "une seule bouffée" vous ramène au début. La nicotine vous rend immédiatement accro.'}
            </span>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-white/5">
            <span className="font-bold text-blue-400 block text-sm mb-1">2. {isAr ? 'الهروب الطارئ' : 'Évasion d\'urgence'}</span>
            <span className="text-slate-400 text-xs leading-relaxed">
              {isAr ? 'إذا شعرت أنك ستنهار - اترك المكان فوراً. اذهب لمكان يمنع فيه التدخين.' : 'Si vous sentez que vous allez craquer - quittez l\'endroit immédiatement. Allez dans un endroit non-fumeur.'}
            </span>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-white/5">
            <span className="font-bold text-emerald-400 block text-sm mb-1">3. {isAr ? 'قاعدة 3 دقائق' : 'Règle des 3 minutes'}</span>
            <span className="text-slate-400 text-xs leading-relaxed">
              {isAr ? 'كل رغبة تستمر 3 دقائق فقط. اشتغل على أي شيء 3 دقائق، ستختفي.' : 'Chaque envie ne dure que 3 minutes. Occupez-vous pendant 3 minutes, elle disparaîtra.'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
