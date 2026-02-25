import React, { useState } from 'react';
import { CigaretteOff } from 'lucide-react';
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 flex flex-col items-center justify-center transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 border border-slate-100 dark:border-slate-800">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
            <CigaretteOff size={32} />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-slate-800 dark:text-white mb-2">
          {isAr ? 'بداية جديدة' : 'Nouveau Départ'}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-center mb-8">
          {isAr ? 'أدخل بياناتك لنبدأ رحلة الإقلاع عن التدخين' : 'Entrez vos données pour commencer votre voyage'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {isAr ? 'تاريخ ووقت الإقلاع' : "Date et heure d'arrêt"}
            </label>
            <input 
              type="datetime-local" 
              required
              value={quitDate}
              onChange={(e) => setQuitDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isAr ? 'سيجارة / يوم' : 'Cigarettes / jour'}
              </label>
              <input 
                type="number" 
                min="1"
                required
                value={cigarettesPerDay}
                onChange={(e) => setCigarettesPerDay(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isAr ? 'سيجارة / علبة' : 'Cigarettes / paquet'}
              </label>
              <input 
                type="number" 
                min="1"
                required
                value={cigarettesPerPack}
                onChange={(e) => setCigarettesPerPack(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {isAr ? 'العلامة التجارية (الجزائر)' : 'Marque (Algérie)'}
            </label>
            <select 
              value={selectedBrand}
              onChange={handleBrandChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            >
              {ALGERIAN_BRANDS.map(brand => (
                <option key={brand.name} value={brand.name}>{brand.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isAr ? 'سعر العلبة' : 'Prix du paquet'}
              </label>
              <input 
                type="number" 
                step="0.01"
                min="0"
                required
                value={pricePerPack}
                onChange={(e) => setPricePerPack(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isAr ? 'العملة' : 'Devise'}
              </label>
              <input 
                type="text" 
                required
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <button 
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-emerald-500/30"
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
                className="w-full bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold py-3.5 rounded-xl transition-colors border border-blue-100 dark:border-blue-900/50"
              >
                {isAr ? 'تصدير البيانات (JSON)' : 'Exporter les données (JSON)'}
              </button>
            )}
            {onCancel && (
              <button 
                type="button"
                onClick={onCancel}
                className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-3.5 rounded-xl transition-colors"
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
