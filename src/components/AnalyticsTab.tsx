import React from 'react';
import { CravingLog } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Activity, Calendar, TrendingUp, Grid } from 'lucide-react';
import { motion } from 'framer-motion';

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

  // Heatmap data processing (Hour vs Day)
  const days = isAr ? ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'] : ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  const heatmapData = Array(7).fill(0).map(() => Array(24).fill(0));
  
  cravings.forEach(log => {
    const date = new Date(log.timestamp);
    const day = date.getDay();
    const hour = date.getHours();
    heatmapData[day][hour]++;
  });

  const getHeatmapColor = (count: number) => {
    if (count === 0) return 'bg-slate-800/50 border border-white/5';
    if (count === 1) return 'bg-emerald-500/20 border border-emerald-500/30';
    if (count === 2) return 'bg-emerald-500/40 border border-emerald-500/50';
    if (count === 3) return 'bg-emerald-500/60 border border-emerald-500/70';
    return 'bg-emerald-500 emerald-glow';
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="grid grid-cols-2 gap-4">
        <motion.div whileHover={{ scale: 1.02 }} className="glass-panel p-5 rounded-3xl flex flex-col items-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mb-3 group-hover:emerald-glow transition-all">
            <Activity size={24} />
          </div>
          <span className="text-2xl font-bold text-white font-mono">{cravings.length}</span>
          <span className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-wider">
            {isAr ? 'إجمالي الرغبات' : 'Total des envies'}
          </span>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }} className="glass-panel p-5 rounded-3xl flex flex-col items-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mb-3 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all">
            <TrendingUp size={24} />
          </div>
          <span className="text-2xl font-bold text-white font-mono">{avgIntensity} <span className="text-sm text-slate-500">/ 10</span></span>
          <span className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-wider">
            {isAr ? 'متوسط الشدة' : 'Intensité moyenne'}
          </span>
        </motion.div>
      </div>

      <div className="glass-panel p-6 rounded-3xl">
        <h3 className="font-bold text-white mb-6 flex items-center gap-2">
          <Calendar className="text-emerald-400" size={20} />
          {isAr ? 'نمط الرغبات حسب اليوم' : "Modèle d'envies par jour"}
        </h3>
        
        {cravings.length > 0 ? (
          <div className="h-64 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(16, 185, 129, 0.1)' }}
                  contentStyle={{ backgroundColor: '#1E293B', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', color: '#F8FAFC' }}
                  itemStyle={{ color: '#10B981' }}
                />
                <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-40 flex items-center justify-center text-slate-500 text-sm text-center border border-dashed border-slate-700 rounded-2xl">
            {isAr ? 'لا توجد بيانات كافية لعرض الرسم البياني. قم بتسجيل رغباتك من الصفحة الرئيسية.' : "Pas assez de données pour afficher le graphique. Enregistrez vos envies depuis la page d'accueil."}
          </div>
        )}
      </div>

      <div className="glass-panel p-6 rounded-3xl">
        <h3 className="font-bold text-white mb-6 flex items-center gap-2">
          <Grid className="text-emerald-400" size={20} />
          {isAr ? 'خريطة الرغبات الحرارية (ساعة / يوم)' : "Carte thermique des envies (Heure / Jour)"}
        </h3>
        
        {cravings.length > 0 ? (
          <div className="overflow-x-auto pb-4 hide-scrollbar" dir="ltr">
            <div className="min-w-[600px]">
              <div className="flex mb-2">
                <div className="w-12"></div>
                {hours.map(hour => (
                  <div key={hour} className="flex-1 text-center text-[10px] text-slate-500 font-mono">
                    {hour % 3 === 0 ? hour : ''}
                  </div>
                ))}
              </div>
              
              {days.map((day, dayIdx) => (
                <div key={day} className="flex items-center mb-1">
                  <div className="w-12 text-xs text-slate-400 font-medium text-right pr-2">
                    {day}
                  </div>
                  {hours.map(hour => (
                    <div key={`${day}-${hour}`} className="flex-1 px-0.5">
                      <motion.div 
                        whileHover={{ scale: 1.2 }}
                        className={`h-4 rounded-sm transition-colors ${getHeatmapColor(heatmapData[dayIdx][hour])}`}
                        title={`${day} ${hour}:00 - ${heatmapData[dayIdx][hour]} ${isAr ? 'رغبات' : 'envies'}`}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-40 flex items-center justify-center text-slate-500 text-sm text-center border border-dashed border-slate-700 rounded-2xl">
            {isAr ? 'لا توجد بيانات كافية لعرض الخريطة الحرارية.' : "Pas assez de données pour afficher la carte thermique."}
          </div>
        )}
      </div>
    </div>
  );
}
