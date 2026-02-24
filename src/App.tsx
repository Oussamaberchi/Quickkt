import React, { useState, useEffect } from 'react';
import { Heart, DollarSign, Settings, Trash2, CigaretteOff, Activity, Wind, Lightbulb, Home, ShieldCheck, Award, MessageCircleHeart, Smile, Info, Clock } from 'lucide-react';

interface UserData {
  quitDate: string;
  cigarettesPerDay: number;
  pricePerPack: number;
  cigarettesPerPack: number;
  currency: string;
}

const HEALTH_MILESTONES = [
  { id: 1, label: 'ضغط الدم يعود لطبيعته', durationInSeconds: 20 * 60, icon: Heart },
  { id: 2, label: 'مستوى أول أكسيد الكربون يعود لطبيعته', durationInSeconds: 8 * 3600, icon: Wind },
  { id: 3, label: 'انخفاض خطر الإصابة بنوبة قلبية', durationInSeconds: 24 * 3600, icon: Activity },
  { id: 4, label: 'تحسن حاستي الشم والتذوق', durationInSeconds: 48 * 3600, icon: Smile },
  { id: 5, label: 'استرخاء الشعب الهوائية', durationInSeconds: 72 * 3600, icon: Wind },
  { id: 6, label: 'تحسن الدورة الدموية', durationInSeconds: 14 * 24 * 3600, icon: Activity },
  { id: 7, label: 'انخفاض السعال وضيق التنفس', durationInSeconds: 30 * 24 * 3600, icon: Wind },
  { id: 8, label: 'خطر أمراض القلب ينخفض للنصف', durationInSeconds: 365 * 24 * 3600, icon: Heart },
  { id: 9, label: 'خطر السكتة الدماغية يعود لطبيعته', durationInSeconds: 5 * 365 * 24 * 3600, icon: ShieldCheck },
  { id: 10, label: 'خطر سرطان الرئة ينخفض للنصف', durationInSeconds: 10 * 365 * 24 * 3600, icon: Award },
];

const MOTIVATIONAL_QUOTES = [
  "كل رغبة في التدخين تستمر لبضع دقائق فقط، يمكنك تجاوزها!",
  "أنت أقوى من أي عادة.",
  "كل يوم بدون تدخين هو انتصار لصحتك.",
  "جسدك يشكرك الآن على كل لحظة تقضيها بدون تدخين.",
  "تذكر لماذا بدأت هذه الرحلة.",
  "الرغبة الملحة ستمر، سواء دخنت أم لا. اختر ألا تدخن.",
  "الاستثمار في صحتك هو أفضل استثمار ستقوم به على الإطلاق."
];

const CRAVING_TIPS = [
  "اشرب كوباً كبيراً من الماء ببطء.",
  "قم بممارسة تمرين التنفس العميق.",
  "اخرج للمشي قليلاً في الهواء الطلق.",
  "اتصل بصديق أو شخص داعم.",
  "اغسل أسنانك لتشعر بالانتعاش.",
  "مضغ علكة خالية من السكر.",
  "اشغل يديك بشيء آخر (كرة ضغط، قلم)."
];

function SetupScreen({ initialData, onSave, onCancel }: { initialData: UserData | null, onSave: (data: UserData) => void, onCancel?: () => void }) {
  const [quitDate, setQuitDate] = useState(initialData?.quitDate ? new Date(initialData.quitDate).toISOString().slice(0, 16) : new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16));
  const [cigarettesPerDay, setCigarettesPerDay] = useState(initialData?.cigarettesPerDay?.toString() || '20');
  const [pricePerPack, setPricePerPack] = useState(initialData?.pricePerPack?.toString() || '5');
  const [cigarettesPerPack, setCigarettesPerPack] = useState(initialData?.cigarettesPerPack?.toString() || '20');
  const [currency, setCurrency] = useState(initialData?.currency || 'دولار');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      quitDate: new Date(quitDate).toISOString(),
      cigarettesPerDay: Number(cigarettesPerDay),
      pricePerPack: Number(pricePerPack),
      cigarettesPerPack: Number(cigarettesPerPack),
      currency
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
            <CigaretteOff size={32} />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-slate-800 mb-2">بداية جديدة</h1>
        <p className="text-slate-500 text-center mb-8">أدخل بياناتك لنبدأ رحلة الإقلاع عن التدخين</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">تاريخ ووقت الإقلاع</label>
            <input 
              type="datetime-local" 
              required
              value={quitDate}
              onChange={(e) => setQuitDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">سيجارة / يوم</label>
              <input 
                type="number" 
                min="1"
                required
                value={cigarettesPerDay}
                onChange={(e) => setCigarettesPerDay(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">سيجارة / علبة</label>
              <input 
                type="number" 
                min="1"
                required
                value={cigarettesPerPack}
                onChange={(e) => setCigarettesPerPack(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">سعر العلبة</label>
              <input 
                type="number" 
                step="0.01"
                min="0"
                required
                value={pricePerPack}
                onChange={(e) => setPricePerPack(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">العملة</label>
              <input 
                type="text" 
                required
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <button 
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-emerald-500/30"
            >
              {initialData ? 'حفظ التغييرات' : 'ابدأ الآن'}
            </button>
            {onCancel && (
              <button 
                type="button"
                onClick={onCancel}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-xl transition-colors"
              >
                إلغاء
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function BreathingExercise() {
  const [phase, setPhase] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle');
  const [timeLeft, setTimeLeft] = useState(0);

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
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-center">
      <h2 className="text-xl font-bold text-slate-800 mb-2">تمرين التنفس 4-7-8</h2>
      <p className="text-slate-500 text-sm mb-8">يساعد هذا التمرين على الاسترخاء وتقليل الرغبة الملحة في التدخين بسرعة.</p>
      
      <div className="relative w-56 h-56 mx-auto mb-10 flex items-center justify-center">
        <div className={`absolute inset-0 rounded-full border-4 border-emerald-100 transition-transform duration-1000 ${
          phase === 'inhale' ? 'scale-125 bg-emerald-50' : 
          phase === 'hold' ? 'scale-125 bg-emerald-100' : 
          phase === 'exhale' ? 'scale-90 bg-emerald-50' : 'bg-slate-50'
        }`}></div>
        <div className="relative z-10 flex flex-col items-center">
          <span className="text-5xl font-bold text-emerald-600 mb-2">
            {phase === 'idle' ? 'جاهز؟' : timeLeft}
          </span>
          <span className="text-base font-bold text-emerald-800">
            {phase === 'idle' ? '' : 
             phase === 'inhale' ? 'شهيق من الأنف...' : 
             phase === 'hold' ? 'احتفظ بالهواء...' : 'زفير من الفم...'}
          </span>
        </div>
      </div>

      {phase === 'idle' ? (
        <button onClick={startExercise} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl transition-colors shadow-lg shadow-emerald-500/30">
          ابدأ التمرين
        </button>
      ) : (
        <button onClick={stopExercise} className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold py-4 rounded-2xl transition-colors">
          إيقاف التمرين
        </button>
      )}
    </div>
  );
}

function Dashboard({ userData, now, onOpenSettings, onReset }: { userData: UserData, now: Date, onOpenSettings: () => void, onReset: () => void }) {
  const [activeTab, setActiveTab] = useState<'home' | 'health' | 'support' | 'exercise'>('home');
  const [quoteOfDay, setQuoteOfDay] = useState(MOTIVATIONAL_QUOTES[0]);

  useEffect(() => {
    // Random quote on load
    setQuoteOfDay(MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]);
  }, []);

  const quitDate = new Date(userData.quitDate);
  const diffInSeconds = Math.max(0, Math.floor((now.getTime() - quitDate.getTime()) / 1000));
  
  const days = Math.floor(diffInSeconds / (3600 * 24));
  const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = diffInSeconds % 60;

  const cigarettesAvoided = Math.floor((diffInSeconds / (24 * 3600)) * userData.cigarettesPerDay);
  const moneySaved = ((cigarettesAvoided / userData.cigarettesPerPack) * userData.pricePerPack).toFixed(2);
  const lifeRegainedMinutes = cigarettesAvoided * 11; // Approx 11 minutes of life regained per cigarette
  const lifeRegainedDays = Math.floor(lifeRegainedMinutes / (24 * 60));
  const lifeRegainedHours = Math.floor((lifeRegainedMinutes % (24 * 60)) / 60);

  return (
    <div className="min-h-screen bg-slate-50 pb-28">
      {/* Header */}
      <div className={`bg-emerald-500 text-white transition-all duration-300 relative overflow-hidden ${activeTab === 'home' ? 'pt-12 pb-8 px-6 rounded-b-[2.5rem] shadow-lg shadow-emerald-500/20' : 'pt-10 pb-6 px-6 rounded-b-3xl'}`}>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grad)" />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <div className="flex justify-between items-center relative z-10">
          <h1 className="text-2xl font-bold">
            {activeTab === 'home' && 'إحصائياتي'}
            {activeTab === 'health' && 'التعافي الصحي'}
            {activeTab === 'support' && 'الدعم النفسي'}
            {activeTab === 'exercise' && 'تمارين الاسترخاء'}
          </h1>
          <button onClick={onOpenSettings} className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
            <Settings size={20} />
          </button>
        </div>

        {activeTab === 'home' && (
          <div className="text-center relative z-10 mt-8">
            <p className="text-emerald-100 text-sm font-medium mb-2">الوقت الخالي من التدخين</p>
            <div className="flex justify-center items-end gap-2 text-white" dir="ltr">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold">{days}</span>
                <span className="text-xs opacity-80">يوم</span>
              </div>
              <span className="text-2xl font-bold pb-4 opacity-50">:</span>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold">{hours.toString().padStart(2, '0')}</span>
                <span className="text-xs opacity-80">ساعة</span>
              </div>
              <span className="text-2xl font-bold pb-4 opacity-50">:</span>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold">{minutes.toString().padStart(2, '0')}</span>
                <span className="text-xs opacity-80">دقيقة</span>
              </div>
              <span className="text-2xl font-bold pb-4 opacity-50">:</span>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold">{seconds.toString().padStart(2, '0')}</span>
                <span className="text-xs opacity-80">ثانية</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className={`px-6 relative z-20 space-y-4 ${activeTab === 'home' ? '-mt-6' : 'mt-6'}`}>
        
        {/* Home Tab */}
        {activeTab === 'home' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3">
                  <DollarSign size={24} />
                </div>
                <span className="text-2xl font-bold text-slate-800">{moneySaved}</span>
                <span className="text-sm text-slate-500 font-medium">{userData.currency} تم توفيرها</span>
              </div>
              
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
                  <CigaretteOff size={24} />
                </div>
                <span className="text-2xl font-bold text-slate-800">{cigarettesAvoided}</span>
                <span className="text-sm text-slate-500 font-medium">سيجارة تم تجنبها</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex items-center gap-4">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center shrink-0">
                <Clock size={28} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-500 mb-1">الوقت المسترد للحياة</h3>
                <p className="text-lg font-bold text-slate-800">
                  {lifeRegainedDays > 0 ? `${lifeRegainedDays} يوم و ` : ''}
                  {lifeRegainedHours} ساعة
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-md">
              <div className="flex items-start gap-3">
                <Lightbulb className="shrink-0 text-emerald-200" size={24} />
                <div>
                  <h3 className="font-bold mb-1">إلهام اليوم</h3>
                  <p className="text-emerald-50 text-sm leading-relaxed">{quoteOfDay}</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Health Tab */}
        {activeTab === 'health' && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-500 mb-6">شاهد كيف يتعافى جسمك بمرور الوقت منذ آخر سيجارة.</p>
            <div className="space-y-6">
              {HEALTH_MILESTONES.map(milestone => {
                const progress = Math.min(100, (diffInSeconds / milestone.durationInSeconds) * 100);
                const isCompleted = progress >= 100;
                const Icon = milestone.icon;
                
                return (
                  <div key={milestone.id} className="relative">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-full ${isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                        <Icon size={16} />
                      </div>
                      <div className="flex-1 flex justify-between text-sm">
                        <span className={`font-semibold ${isCompleted ? 'text-emerald-700' : 'text-slate-700'}`}>
                          {milestone.label}
                        </span>
                        <span className="text-slate-500 font-mono text-xs font-bold">{Math.floor(progress)}%</span>
                      </div>
                    </div>
                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden ml-11">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${isCompleted ? 'bg-emerald-500' : 'bg-blue-500'}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Support Tab */}
        {activeTab === 'support' && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <MessageCircleHeart className="text-rose-500" size={24} />
                نصائح للتغلب على الرغبة
              </h2>
              <ul className="space-y-3">
                {CRAVING_TIPS.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm bg-slate-50 p-3 rounded-xl">
                    <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-xs">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Info className="text-blue-500" size={24} />
                معلومات تهمك
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                الرغبة الملحة في التدخين (Craving) عادة ما تستمر لمدة 3 إلى 5 دقائق فقط. إذا تمكنت من إشغال نفسك خلال هذه الدقائق، ستمر الرغبة بسلام.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                تذكر أن الانتكاسة ليست فشلاً، بل هي جزء من رحلة التعلم. إذا تعثرت، ابدأ من جديد فوراً.
              </p>
            </div>
          </div>
        )}

        {/* Exercise Tab */}
        {activeTab === 'exercise' && (
          <BreathingExercise />
        )}

        {/* Reset Data Button (Only in Settings/Home bottom) */}
        {activeTab === 'home' && (
          <div className="pt-4">
            <button 
              onClick={onReset}
              className="w-full flex items-center justify-center gap-2 text-rose-500 bg-rose-50 hover:bg-rose-100 py-4 rounded-2xl font-bold transition-colors"
            >
              <Trash2 size={20} />
              إعادة تعيين البيانات
            </button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 px-6 py-4 flex justify-between items-center z-50 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">الرئيسية</span>
        </button>
        <button 
          onClick={() => setActiveTab('health')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'health' ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Heart size={24} strokeWidth={activeTab === 'health' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">الصحة</span>
        </button>
        <button 
          onClick={() => setActiveTab('support')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'support' ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <MessageCircleHeart size={24} strokeWidth={activeTab === 'support' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">الدعم</span>
        </button>
        <button 
          onClick={() => setActiveTab('exercise')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'exercise' ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Wind size={24} strokeWidth={activeTab === 'exercise' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">تمارين</span>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [now, setNow] = useState(new Date());
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('quitSmokingData');
    if (saved) {
      try {
        setUserData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved data');
      }
    }
    setIsLoaded(true);

    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSaveData = (data: UserData) => {
    setUserData(data);
    localStorage.setItem('quitSmokingData', JSON.stringify(data));
    setShowSettings(false);
  };

  const handleReset = () => {
    if (window.confirm('هل أنت متأكد من رغبتك في إعادة تعيين جميع البيانات؟')) {
      setUserData(null);
      localStorage.removeItem('quitSmokingData');
    }
  };

  if (!isLoaded) return null;

  if (!userData || showSettings) {
    return (
      <SetupScreen 
        initialData={userData} 
        onSave={handleSaveData} 
        onCancel={userData ? () => setShowSettings(false) : undefined} 
      />
    );
  }

  return (
    <Dashboard 
      userData={userData} 
      now={now} 
      onOpenSettings={() => setShowSettings(true)} 
      onReset={handleReset}
    />
  );
}
