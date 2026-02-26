import React from 'react';
import { HEALTH_MILESTONES } from '../utils/constants';

interface Props {
  diffInSeconds: number;
  language: 'ar' | 'fr';
}

function CircularProgress({ percentage, label, icon: Icon, colorClass }: { key?: React.Key, percentage: number, label: string, icon: any, colorClass: string }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-slate-100 dark:text-slate-800"
          />
          {/* Progress circle */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${colorClass} transition-all duration-1000 ease-out`}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <Icon size={20} className={colorClass} />
          <span className="text-xs font-bold mt-1 text-slate-700 dark:text-slate-300">{Math.floor(percentage)}%</span>
        </div>
      </div>
      <span className="text-xs text-center mt-2 text-slate-500 dark:text-slate-400 font-medium max-w-[80px] leading-tight">{label}</span>
    </div>
  );
}

export function HealthTab({ diffInSeconds, language }: Props) {
  const isAr = language === 'ar';

  // Get the first 3 milestones for the circular rings
  const topMilestones = HEALTH_MILESTONES.slice(0, 3).map(m => ({
    ...m,
    progress: Math.min(100, (diffInSeconds / m.durationInSeconds) * 100),
    labelStr: isAr ? m.label : m.labelFr
  }));

  const colors = ['text-rose-500', 'text-blue-500', 'text-amber-500'];

  // Lung healing progress (0 to 100) based on 9 months (approx 270 days) for full cilia regrowth
  const lungHealingProgress = Math.min(100, (diffInSeconds / (270 * 24 * 3600)) * 100);

  return (
    <div className="space-y-4">
      {/* Lung Visualization */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
          {isAr ? 'تعافي الرئتين' : 'Guérison des poumons'}
        </h2>
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 mb-4">
            {/* Dark/Damaged Lungs */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-slate-800 dark:text-slate-700">
              <path fill="currentColor" d="M45,20 C30,10 10,30 15,60 C20,90 40,90 45,70 C45,70 50,50 45,20 Z" />
              <path fill="currentColor" d="M55,20 C70,10 90,30 85,60 C80,90 60,90 55,70 C55,70 50,50 55,20 Z" />
              <path fill="none" stroke="currentColor" strokeWidth="4" d="M50,5 L50,30 M45,20 L55,20" />
            </svg>
            
            {/* Pink/Healthy Lungs (Overlay with clip-path based on progress) */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-pink-400 transition-all duration-1000" style={{ clipPath: `polygon(0 ${100 - lungHealingProgress}%, 100% ${100 - lungHealingProgress}%, 100% 100%, 0 100%)` }}>
              <path fill="currentColor" d="M45,20 C30,10 10,30 15,60 C20,90 40,90 45,70 C45,70 50,50 45,20 Z" />
              <path fill="currentColor" d="M55,20 C70,10 90,30 85,60 C80,90 60,90 55,70 C55,70 50,50 55,20 Z" />
              <path fill="none" stroke="currentColor" strokeWidth="4" d="M50,5 L50,30 M45,20 L55,20" />
            </svg>
          </div>
          <div className="text-center">
            <span className="text-2xl font-bold text-pink-500">{Math.floor(lungHealingProgress)}%</span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {isAr ? 'تجدد أهداب الرئة وتنظيف الممرات الهوائية' : 'Régénération des cils pulmonaires et nettoyage des voies respiratoires'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
          {isAr ? 'التعافي السريع' : 'Récupération rapide'}
        </h2>
        <div className="flex justify-between items-start">
          {topMilestones.map((m, idx) => (
            <CircularProgress 
              key={m.id} 
              percentage={m.progress} 
              label={m.labelStr} 
              icon={m.icon} 
              colorClass={colors[idx % colors.length]} 
            />
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-6">
          {isAr ? 'الجدول الزمني للتعافي' : 'Chronologie de récupération'}
        </h2>
        <div className="space-y-6">
          {HEALTH_MILESTONES.map(milestone => {
            const progress = Math.min(100, (diffInSeconds / milestone.durationInSeconds) * 100);
            const isCompleted = progress >= 100;
            const Icon = milestone.icon;
            const label = isAr ? milestone.label : milestone.labelFr;
            
            return (
              <div key={milestone.id} className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-full transition-colors ${isCompleted ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'}`}>
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 flex justify-between text-sm">
                    <span className={`font-semibold transition-colors ${isCompleted ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>
                      {label}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 font-mono text-xs font-bold">{Math.floor(progress)}%</span>
                  </div>
                </div>
                <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden ml-11 transition-colors">
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
    </div>
  );
}
