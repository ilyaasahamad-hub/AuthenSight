import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react';

export const TrustGauge = ({ score = 96, category = 'AUTHENTIC & CLEARED', statusType = 'authentic' }) => {
  const radius = 64;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const angle = (score / 100) * 240;
  const strokeDashoffset = circumference - (angle / 360) * circumference;

  const isAuthentic = statusType === 'authentic' || score >= 85;
  const isCaution = statusType === 'warning' || (score >= 50 && score < 85);
  const isDanger = statusType === 'forged' || statusType === 'attack' || score < 50;

  const strokeColor = isAuthentic
    ? '#10B981' // Neon Jade Mint
    : isCaution
    ? '#F59E0B' // Warm Ochre
    : '#FF2A5F'; // Crimson Rose

  const badgeStyle = isAuthentic
    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700/80'
    : isCaution
    ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700/80'
    : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-700/80';

  const StatusIcon = isAuthentic ? ShieldCheck : isCaution ? AlertTriangle : ShieldAlert;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3.5 shadow-forensic flex flex-col items-center transition-colors">
      <div className="w-full flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-2">
        <span className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider font-sans">
          Composite Trust Score
        </span>
        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">ISO/IEC 29109-5</span>
      </div>

      {/* SVG Circular Gauge */}
      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg className="w-full h-full -rotate-120 transform" viewBox="0 0 160 160">
          {/* Background track circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            className="stroke-slate-200 dark:stroke-slate-800"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (240 / 360) * circumference}
            strokeLinecap="round"
          />

          {/* Animated score arc */}
          <motion.circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            strokeLinecap="round"
            filter="drop-shadow(0 0 6px rgba(6, 182, 212, 0.4))"
          />
        </svg>

        {/* Center Score Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.div
            key={score}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-baseline"
          >
            <span
              className="text-4xl font-extrabold tracking-tight font-mono"
              style={{ color: strokeColor }}
            >
              {score}
            </span>
            <span className="text-sm font-bold text-slate-400 dark:text-slate-500 font-mono ml-0.5">/100</span>
          </motion.div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
            AI Confidence
          </span>
        </div>
      </div>

      {/* Classification Pill Badge */}
      <div
        className={`w-full mt-2 px-3 py-1.5 rounded-md border flex items-center justify-center gap-1.5 text-xs font-black tracking-wide ${badgeStyle}`}
      >
        <StatusIcon className="w-4 h-4 flex-shrink-0" />
        <span>{category}</span>
      </div>
    </div>
  );
};
