import { Heart, Activity, Wind, Smile, ShieldCheck, Award } from 'lucide-react';

export const HEALTH_MILESTONES = [
  { id: 1, label: 'ضغط الدم يعود لطبيعته', labelFr: 'La tension artérielle redevient normale', durationInSeconds: 20 * 60, icon: Heart },
  { id: 2, label: 'مستوى أول أكسيد الكربون يعود لطبيعته', labelFr: 'Le monoxyde de carbone redevient normal', durationInSeconds: 8 * 3600, icon: Wind },
  { id: 3, label: 'انخفاض خطر الإصابة بنوبة قلبية', labelFr: 'Risque de crise cardiaque réduit', durationInSeconds: 24 * 3600, icon: Activity },
  { id: 4, label: 'تحسن حاستي الشم والتذوق', labelFr: "Amélioration de l'odorat et du goût", durationInSeconds: 48 * 3600, icon: Smile },
  { id: 5, label: 'استرخاء الشعب الهوائية', labelFr: 'Les bronches se relâchent', durationInSeconds: 72 * 3600, icon: Wind },
  { id: 6, label: 'تحسن الدورة الدموية', labelFr: 'Amélioration de la circulation sanguine', durationInSeconds: 14 * 24 * 3600, icon: Activity },
  { id: 7, label: 'انخفاض السعال وضيق التنفس', labelFr: "Diminution de la toux et de l'essoufflement", durationInSeconds: 30 * 24 * 3600, icon: Wind },
  { id: 8, label: 'خطر أمراض القلب ينخفض للنصف', labelFr: 'Risque de maladie cardiaque réduit de moitié', durationInSeconds: 365 * 24 * 3600, icon: Heart },
  { id: 9, label: 'خطر السكتة الدماغية يعود لطبيعته', labelFr: "Risque d'AVC redevient normal", durationInSeconds: 5 * 365 * 24 * 3600, icon: ShieldCheck },
  { id: 10, label: 'خطر سرطان الرئة ينخفض للنصف', labelFr: 'Risque de cancer du poumon réduit de moitié', durationInSeconds: 10 * 365 * 24 * 3600, icon: Award },
];

export const MOTIVATIONAL_QUOTES = [
  "أنا غير مدخن. هذا هو قراري. أنا حر.",
  "السيجارة لا تعطيني شيئاً، بل تسرق مني كل شيء.",
  "كل رغبة تستمر 3 دقائق فقط. اشتغل على أي شيء 3 دقائق، ستختفي.",
  "أنا لا أحاول الإقلاع، أنا غير مدخن.",
  "الاستثمار في صحتك هو أفضل استثمار ستقوم به على الإطلاق.",
  "حتى سحبة واحدة ترجعك للبداية. لا سيجارة واحدة أبداً.",
  "الرغبة الملحة ستمر، سواء دخنت أم لا. اختر ألا تدخن."
];

export const MOTIVATIONAL_QUOTES_FR = [
  "Je suis non-fumeur. C'est ma décision. Je suis libre.",
  "La cigarette ne me donne rien, elle me vole tout.",
  "Chaque envie ne dure que 3 minutes. Occupez-vous pendant 3 minutes, elle disparaîtra.",
  "Je n'essaie pas d'arrêter, je suis non-fumeur.",
  "Investir dans votre santé est le meilleur investissement que vous ferez jamais.",
  "Même une seule bouffée vous ramène au début. Pas une seule cigarette, jamais.",
  "L'envie passera, que vous fumiez ou non. Choisissez de ne pas fumer."
];

export const CRAVING_TIPS = [
  "اشرب كوباً كبيراً من الماء ببطء.",
  "قم بممارسة تمرين التنفس العميق.",
  "اخرج للمشي قليلاً في الهواء الطلق.",
  "اتصل بصديق أو شخص داعم.",
  "اغسل أسنانك لتشعر بالانتعاش.",
  "مضغ علكة خالية من السكر.",
  "اشغل يديك بشيء آخر (كرة ضغط، قلم)."
];

export const CRAVING_TIPS_FR = [
  "Buvez un grand verre d'eau lentement.",
  "Faites un exercice de respiration profonde.",
  "Sortez pour une petite marche en plein air.",
  "Appelez un ami ou une personne de soutien.",
  "Brossez-vous les dents pour vous sentir frais.",
  "Mâchez un chewing-gum sans sucre.",
  "Occupez vos mains avec autre chose (balle anti-stress, stylo)."
];

export const ALGERIAN_BRANDS = [
  { name: 'Marlboro Rouge', price: 350 },
  { name: 'Marlboro Gold', price: 350 },
  { name: 'Gauloises Blondes', price: 300 },
  { name: 'Winston', price: 300 },
  { name: 'L&M', price: 250 },
  { name: 'Rym', price: 150 },
  { name: 'Nassim', price: 150 },
  { name: 'Afras', price: 150 },
  { name: 'Custom / مخصص', price: 0 }
];
