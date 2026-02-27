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

function OrganRecovery({ progress, title, subtitle, color, glowColor, svgPaths }: { progress: number, title: string, subtitle: string, color: string, glowColor: string, svgPaths: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center relative z-10 p-2">
      <div className="relative w-24 h-24 mb-4">
        {/* Background Glow */}
        <div className={`absolute inset-0 ${glowColor} rounded-full blur-xl opacity-30`}></div>
        
        {/* Dark/Damaged Organ */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-slate-800">
          {svgPaths}
        </svg>
        
        {/* Healthy Organ (Overlay with clip-path based on progress) */}
        <svg viewBox="0 0 100 100" className={`absolute inset-0 w-full h-full ${color} transition-all duration-1000 drop-shadow-[0_0_10px_currentColor]`} style={{ clipPath: `polygon(0 ${100 - progress}%, 100% ${100 - progress}%, 100% 100%, 0 100%)` }}>
          {svgPaths}
        </svg>
        
        {/* Scanning Line Effect */}
        <motion.div 
          className={`absolute left-0 right-0 h-0.5 ${color} opacity-50`}
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 4, ease: "linear", repeat: Infinity }}
        />
      </div>
      
      <div className="text-center bg-slate-800/30 border border-white/5 px-4 py-2 rounded-2xl w-full">
        <span className={`text-xl font-bold ${color} font-mono`}>{Math.floor(progress)}%</span>
        <p className="text-[10px] text-slate-300 mt-1 uppercase tracking-wider font-bold leading-tight">
          {title}
        </p>
        <p className="text-[8px] text-slate-500 mt-0.5">{subtitle}</p>
      </div>
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

  // Organ healing progress (0 to 100)
  const lungProgress = Math.min(100, (diffInSeconds / (270 * 24 * 3600)) * 100); // 9 months
  const heartProgress = Math.min(100, (diffInSeconds / (365 * 24 * 3600)) * 100); // 1 year
  const arteriesProgress = Math.min(100, (diffInSeconds / (90 * 24 * 3600)) * 100); // 3 months
  const brainProgress = Math.min(100, (diffInSeconds / (30 * 24 * 3600)) * 100); // 1 month

  return (
    <div className="space-y-6 pb-8">
      {/* Organs Visualization */}
      <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <h2 className="text-lg font-bold text-white mb-6 relative z-10 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
          {isAr ? 'استشفاء الأعضاء' : 'Récupération des organes'}
        </h2>
        
        <div className="grid grid-cols-2 gap-4 relative z-10">
          <OrganRecovery 
            progress={lungProgress}
            title={isAr ? 'الرئتين' : 'Poumons'}
            subtitle={isAr ? 'تجدد الأهداب' : 'Régénération des cils'}
            color="text-pink-400"
            glowColor="bg-pink-500"
            svgPaths={
              <>
                <path fill="currentColor" d="M45,20 C30,10 10,30 15,60 C20,90 40,90 45,70 C45,70 50,50 45,20 Z" />
                <path fill="currentColor" d="M55,20 C70,10 90,30 85,60 C80,90 60,90 55,70 C55,70 50,50 55,20 Z" />
                <path fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" d="M50,5 L50,30 M45,20 L55,20" />
              </>
            }
          />
          <OrganRecovery 
            progress={heartProgress}
            title={isAr ? 'القلب' : 'Cœur'}
            subtitle={isAr ? 'انخفاض خطر النوبات' : 'Risque de crise réduit'}
            color="text-rose-500"
            glowColor="bg-rose-500"
            svgPaths={
              <path fill="currentColor" d="M50,30 C50,30 45,20 35,20 C20,20 20,35 20,45 C20,60 50,85 50,85 C50,85 80,60 80,45 C80,35 80,20 65,20 C55,20 50,30 50,30 Z" />
            }
          />
          <OrganRecovery 
            progress={arteriesProgress}
            title={isAr ? 'الشرايين' : 'Artères'}
            subtitle={isAr ? 'تحسن الدورة الدموية' : 'Circulation améliorée'}
            color="text-blue-400"
            glowColor="bg-blue-500"
            svgPaths={
              <>
                <path fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" d="M30,20 Q40,50 30,80 M50,20 Q60,50 50,80 M70,20 Q80,50 70,80" />
                <circle cx="35" cy="50" r="4" fill="currentColor" />
                <circle cx="55" cy="30" r="4" fill="currentColor" />
                <circle cx="75" cy="60" r="4" fill="currentColor" />
              </>
            }
          />
          <OrganRecovery 
            progress={brainProgress}
            title={isAr ? 'الدماغ' : 'Cerveau'}
            subtitle={isAr ? 'توازن المستقبلات' : 'Équilibre des récepteurs'}
            color="text-purple-400"
            glowColor="bg-purple-500"
            svgPaths={
              <>
                <path fill="currentColor" d="M50,20 C30,20 20,35 20,50 C20,65 30,70 40,75 C45,80 55,80 60,75 C70,70 80,65 80,50 C80,35 70,20 50,20 Z" />
                <path fill="none" stroke="#1e293b" strokeWidth="2" d="M30,40 Q40,30 50,40 T70,40 M30,50 Q40,40 50,50 T70,50 M35,60 Q45,50 55,60" />
              </>
            }
          />
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
