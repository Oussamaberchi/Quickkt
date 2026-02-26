import React, { useState } from 'react';
import { CigaretteOff, ShieldCheck } from 'lucide-react';
import { UserData } from '../types';
import { ALGERIAN_BRANDS } from '../utils/constants';

interface Props {
  initialData: UserData | null;
  onSave: (data: UserData) => void;
  onCancel?: () => void;
  language: 'ar' | 'fr';
}

export function SetupScreen({ initialData, onSave, onCancel, language }: Props) {
  const [quitDate, setQuitDate] = useState(initialData?.quitDate ? new Date(initialData.quitDate).toISOString().slice(0, 16) : new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16));
  const [cigarettesPerDay, setCigarettesPerDay] = useState(initialData?.cigarettesPerDay?.toString() || '20');
  const [pricePerPack, setPricePerPack] = useState(initialData?.pricePerPack?.toString() || '350');
  const [cigarettesPerPack, setCigarettesPerPack] = useState(initialData?.cigarettesPerPack?.toString() || '20');
  const [currency, setCurrency] = useState(initialData?.currency || 'DZD');
  const [selectedBrand, setSelectedBrand] = useState(ALGERIAN_BRANDS[0].name);

  const isAr = language === 'ar';

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

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const brandName = e.target.value;
    setSelectedBrand(brandName);
    const brand = ALGERIAN_BRANDS.find(b => b.name === brandName);
    if (brand && brand.price > 0) {
      setPricePerPack(brand.price.toString());
      setCurrency('DZD');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -ml-20 -mt-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -mr-20 -mb-20"></div>

      <div className="w-full max-w-md glass-panel rounded-3xl p-8 relative z-10">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500 rounded-full blur-md opacity-50 animate-pulse"></div>
            <div className="w-16 h-16 bg-slate-900 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 relative z-10">
              <ShieldCheck size={32} />
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-white mb-2 tracking-tight">
          {isAr ? 'بداية جديدة' : 'Nouveau Départ'}
        </h1>
        <p className="text-slate-400 text-center mb-8 text-sm">
          {isAr ? 'أدخل بياناتك لنبدأ رحلة الإقلاع عن التدخين' : 'Entrez vos données pour commencer votre voyage'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
              {isAr ? 'تاريخ ووقت الإقلاع' : "Date et heure d'arrêt"}
            </label>
            <input 
              type="datetime-local" 
              required
              value={quitDate}
              onChange={(e) => setQuitDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-800/50 text-white focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 outline-none transition-all"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
                {isAr ? 'سيجارة / يوم' : 'Cigarettes / jour'}
              </label>
              <input 
                type="number" 
                min="1"
                required
                value={cigarettesPerDay}
                onChange={(e) => setCigarettesPerDay(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-800/50 text-white focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 outline-none transition-all font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
                {isAr ? 'سيجارة / علبة' : 'Cigarettes / paquet'}
              </label>
              <input 
                type="number" 
                min="1"
                required
                value={cigarettesPerPack}
                onChange={(e) => setCigarettesPerPack(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-800/50 text-white focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 outline-none transition-all font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
              {isAr ? 'العلامة التجارية (الجزائر)' : 'Marque (Algérie)'}
            </label>
            <select 
              value={selectedBrand}
              onChange={handleBrandChange}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-800/50 text-white focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 outline-none transition-all appearance-none"
            >
              {ALGERIAN_BRANDS.map(brand => (
                <option key={brand.name} value={brand.name} className="bg-slate-900">{brand.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
                {isAr ? 'سعر العلبة' : 'Prix du paquet'}
              </label>
              <input 
                type="number" 
                step="0.01"
                min="0"
                required
                value={pricePerPack}
                onChange={(e) => setPricePerPack(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-800/50 text-white focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 outline-none transition-all font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
                {isAr ? 'العملة' : 'Devise'}
              </label>
              <input 
                type="text" 
                required
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-800/50 text-white focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 outline-none transition-all font-mono uppercase"
              />
            </div>
          </div>

          <div className="pt-6 space-y-3">
            <button 
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 rounded-xl transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
            >
              {initialData ? (isAr ? 'حفظ التغييرات' : 'Enregistrer') : (isAr ? 'ابدأ الآن' : 'Commencer')}
            </button>
            {initialData && (
              <button 
                type="button"
                onClick={() => {
                  const dataStr = localStorage.getItem('quitSmokingState');
                  if (dataStr) {
                    const blob = new Blob([dataStr], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'quit-smoking-data.json';
                    a.click();
                    URL.revokeObjectURL(url);
                  }
                }}
                className="w-full bg-slate-800/50 hover:bg-slate-800 text-emerald-400 font-bold py-4 rounded-xl transition-colors border border-emerald-500/30"
              >
                {isAr ? 'تصدير البيانات (JSON)' : 'Exporter les données (JSON)'}
              </button>
            )}
            {onCancel && (
              <button 
                type="button"
                onClick={onCancel}
                className="w-full bg-slate-800/50 hover:bg-slate-800 text-slate-300 font-bold py-4 rounded-xl transition-colors border border-white/5"
              >
                {isAr ? 'إلغاء' : 'Annuler'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
