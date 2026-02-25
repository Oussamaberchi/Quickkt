import React from 'react';
import { CravingLog } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Activity, Calendar, TrendingUp } from 'lucide-react';

interface Props {
  cravings: CravingLog[];
  language: 'ar' | 'fr';
}

export function AnalyticsTab({ cravings, language }: Props) {
  const isAr = language === 'ar';

  // Process data for charts
  const cravingsByDay = cravings.reduce((acc, log) => {
    const date = new Date(log.timestamp).toLocaleDateString(isAr ? 'ar-DZ' : 'fr-FR', { weekday: 'short' });
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.keys(cravingsByDay).map(date => ({
    name: date,
    count: cravingsByDay[date]
  }));

  const avgIntensity = cravings.length > 0 
    ? (cravings.reduce((sum, log) => sum + log.intensity, 0) / cravings.length).toFixed(1)
    : '0';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center transition-colors">
          <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mb-2">
            <Activity size={20} />
          </div>
          <span className="text-xl font-bold text-slate-800 dark:text-white">{cravings.length}</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {isAr ? 'إجمالي الرغبات' : 'Total des envies'}
          </span>
        </div>
        
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center transition-colors">
          <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mb-2">
            <TrendingUp size={20} />
          </div>
          <span className="text-xl font-bold text-slate-800 dark:text-white">{avgIntensity} / 10</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {isAr ? 'متوسط الشدة' : 'Intensité moyenne'}
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
        <h3 className="font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
          <Calendar className="text-blue-500" size={20} />
          {isAr ? 'نمط الرغبات حسب اليوم' : "Modèle d'envies par jour"}
        </h3>
        
        {cravings.length > 0 ? (
          <div className="h-64 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(16, 185, 129, 0.1)' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-40 flex items-center justify-center text-slate-400 text-sm text-center">
            {isAr ? 'لا توجد بيانات كافية لعرض الرسم البياني. قم بتسجيل رغباتك من الصفحة الرئيسية.' : "Pas assez de données pour afficher le graphique. Enregistrez vos envies depuis la page d'accueil."}
          </div>
        )}
      </div>
    </div>
  );
}
