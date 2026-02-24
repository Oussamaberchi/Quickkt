import React, { useState, useEffect } from 'react';
import { Heart, DollarSign, Settings, Trash2, CigaretteOff } from 'lucide-react';

interface UserData {
  quitDate: string;
  cigarettesPerDay: number;
  pricePerPack: number;
  cigarettesPerPack: number;
  currency: string;
}

const HEALTH_MILESTONES = [
  { id: 1, label: 'ضغط الدم يعود لطبيعته', durationInSeconds: 20 * 60 },
  { id: 2, label: 'مستوى أول أكسيد الكربون يعود لطبيعته', durationInSeconds: 8 * 3600 },
  { id: 3, label: 'انخفاض خطر الإصابة بنوبة قلبية', durationInSeconds: 24 * 3600 },
  { id: 4, label: 'تحسن حاستي الشم والتذوق', durationInSeconds: 48 * 3600 },
  { id: 5, label: 'استرخاء الشعب الهوائية', durationInSeconds: 72 * 3600 },
  { id: 6, label: 'تحسن الدورة الدموية', durationInSeconds: 14 * 24 * 3600 },
  { id: 7, label: 'انخفاض السعال وضيق التنفس', durationInSeconds: 30 * 24 * 3600 },
  { id: 8, label: 'خطر أمراض القلب ينخفض للنصف', durationInSeconds: 365 * 24 * 3600 },
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

function Dashboard({ userData, now, onOpenSettings, onReset }: { userData: UserData, now: Date, onOpenSettings: () => void, onReset: () => void }) {
  const quitDate = new Date(userData.quitDate);
  const diffInSeconds = Math.max(0, Math.floor((now.getTime() - quitDate.getTime()) / 1000));
  
  const days = Math.floor(diffInSeconds / (3600 * 24));
  const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = diffInSeconds % 60;

  const cigarettesAvoided = Math.floor((diffInSeconds / (24 * 3600)) * userData.cigarettesPerDay);
  const moneySaved = ((cigarettesAvoided / userData.cigarettesPerPack) * userData.pricePerPack).toFixed(2);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-emerald-500 text-white pt-12 pb-6 px-6 rounded-b-[2.5rem] shadow-lg shadow-emerald-500/20 relative overflow-hidden">
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
        
        <div className="flex justify-between items-center mb-8 relative z-10">
          <h1 className="text-2xl font-bold">إحصائياتي</h1>
          <button onClick={onOpenSettings} className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
            <Settings size={20} />
          </button>
        </div>

        <div className="text-center relative z-10">
          <p className="text-emerald-100 text-sm font-medium mb-1">الوقت الخالي من التدخين</p>
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
      </div>

      <div className="px-6 -mt-6 relative z-20 space-y-4">
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

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-6">
            <Heart className="text-rose-500" size={24} />
            <h2 className="text-lg font-bold text-slate-800">التعافي الصحي</h2>
          </div>
          
          <div className="space-y-6">
            {HEALTH_MILESTONES.map(milestone => {
              const progress = Math.min(100, (diffInSeconds / milestone.durationInSeconds) * 100);
              const isCompleted = progress >= 100;
              
              return (
                <div key={milestone.id} className="relative">
                  <div className="flex justify-between text-sm mb-2">
                    <span className={`font-semibold ${isCompleted ? 'text-emerald-600' : 'text-slate-700'}`}>
                      {milestone.label}
                    </span>
                    <span className="text-slate-500 font-mono text-xs">{Math.floor(progress)}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
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

        <div className="pt-4">
          <button 
            onClick={onReset}
            className="w-full flex items-center justify-center gap-2 text-rose-500 bg-rose-50 hover:bg-rose-100 py-4 rounded-2xl font-bold transition-colors"
          >
            <Trash2 size={20} />
            إعادة تعيين البيانات
          </button>
        </div>
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
