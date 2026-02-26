import React from 'react';
import { HEALTH_MILESTONES } from '../utils/constants';
import { motion } from 'framer-motion';

interface Props {
  diffInSeconds: number;
  language: 'ar' | 'fr';
}

function CircularProgress({ percentage, label, icon: Icon, colorClass }: { key?: React.Key, percentage: number, label: string, icon: any, colorClass: string }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center group">
      <div className="relative w-24 h-24 flex items-center justify-center mb-3">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="6"
            fill="transparent"
          />
          {/* Progress circle */}
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            strokeLinecap="round"
            className={`${colorClass} transition-all duration-1000 ease-out`}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <Icon size={20} className={`${colorClass} mb-1 group-hover:scale-110 transition-transform`} />
          <span className="text-xs font-bold text-white font-mono">{Math.floor(percentage)}%</span>
        </div>
      </div>
      <span className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-wider max-w-[80px] leading-tight">{label}</span>
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

  const colors = ['text-emerald-400', 'text-blue-400', 'text-amber-400'];

  // Lung healing progress (0 to 100) based on 9 months (approx 270 days) for full cilia regrowth
  const lungHealingProgress = Math.min(100, (diffInSeconds / (270 * 24 * 3600)) * 100);

  return (
    <div className="space-y-6 pb-8">
      {/* Lung Visualization */}
      <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <h2 className="text-lg font-bold text-white mb-6 relative z-10 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
          {isAr ? 'تعافي الرئتين' : 'Guérison des poumons'}
        </h2>
        
        <div className="flex flex-col items-center relative z-10">
          <div className="relative w-40 h-40 mb-6">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-pink-500/5 rounded-full blur-xl"></div>
            
            {/* Dark/Damaged Lungs */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-slate-800">
              <path fill="currentColor" d="M45,20 C30,10 10,30 15,60 C20,90 40,90 45,70 C45,70 50,50 45,20 Z" />
              <path fill="currentColor" d="M55,20 C70,10 90,30 85,60 C80,90 60,90 55,70 C55,70 50,50 55,20 Z" />
              <path fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" d="M50,5 L50,30 M45,20 L55,20" />
            </svg>
            
            {/* Pink/Healthy Lungs (Overlay with clip-path based on progress) */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)] transition-all duration-1000" style={{ clipPath: `polygon(0 ${100 - lungHealingProgress}%, 100% ${100 - lungHealingProgress}%, 100% 100%, 0 100%)` }}>
              <path fill="currentColor" d="M45,20 C30,10 10,30 15,60 C20,90 40,90 45,70 C45,70 50,50 45,20 Z" />
              <path fill="currentColor" d="M55,20 C70,10 90,30 85,60 C80,90 60,90 55,70 C55,70 50,50 55,20 Z" />
              <path fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" d="M50,5 L50,30 M45,20 L55,20" />
            </svg>
            
            {/* Scanning Line Effect */}
            <motion.div 
              className="absolute left-0 right-0 h-0.5 bg-pink-400/50 shadow-[0_0_10px_rgba(236,72,153,0.8)]"
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 4, ease: "linear", repeat: Infinity }}
            />
          </div>
          
          <div className="text-center bg-slate-800/50 border border-white/5 px-6 py-3 rounded-2xl">
            <span className="text-3xl font-bold text-pink-400 font-mono">{Math.floor(lungHealingProgress)}%</span>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-bold">
              {isAr ? 'تجدد الأهداب' : 'Régénération des cils'}
            </p>
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl">
        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
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

      <div className="glass-panel p-6 rounded-3xl">
        <h2 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          {isAr ? 'الجدول الزمني للتعافي' : 'Chronologie de récupération'}
        </h2>
        <div className="space-y-8">
          {HEALTH_MILESTONES.map((milestone, index) => {
            const progress = Math.min(100, (diffInSeconds / milestone.durationInSeconds) * 100);
            const isCompleted = progress >= 100;
            const Icon = milestone.icon;
            const label = isAr ? milestone.label : milestone.labelFr;
            
            return (
              <div key={milestone.id} className="relative">
                {/* Connecting Line */}
                {index !== HEALTH_MILESTONES.length - 1 && (
                  <div className="absolute left-5 top-10 bottom-[-32px] w-px bg-white/5"></div>
                )}
                
                <div className="flex items-start gap-4">
                  <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${isCompleted ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 emerald-glow' : 'bg-slate-800 border border-white/5 text-slate-500'}`}>
                    <Icon size={18} />
                    {isCompleted && (
                      <div className="absolute inset-0 rounded-full border border-emerald-400 animate-ping opacity-20"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 pt-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-sm font-bold transition-colors ${isCompleted ? 'text-white' : 'text-slate-400'}`}>
                        {label}
                      </span>
                      <span className={`font-mono text-xs font-bold ${isCompleted ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {Math.floor(progress)}%
                      </span>
                    </div>
                    
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full rounded-full transition-all duration-1000 ${isCompleted ? 'bg-emerald-500 emerald-glow' : 'bg-slate-600'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
