import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Activity, CheckCircle2 } from 'lucide-react';

export const ScanlineLaser = ({ isScanning, scanProgress = 0, scanPhase = '' }) => {
  if (!isScanning) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden rounded-lg">
      {/* High-Tech Optical Sensor Scan Sweep */}
      <motion.div
        style={{ top: `${scanProgress}%` }}
        transition={{ ease: 'linear', duration: 0.1 }}
        className="absolute left-0 right-0 h-16 -translate-y-1/2 flex flex-col justify-end"
      >
        {/* Trailing electric cyan gradient glow */}
        <div className="w-full h-14 bg-gradient-to-b from-transparent via-cyan-400/25 to-cyan-400/80" />
        
        {/* Core razor-sharp laser line */}
        <div className="w-full h-[3.5px] bg-cyan-200 shadow-[0_0_16px_4px_#06B6D4,0_0_32px_8px_rgba(6,182,212,0.7)] flex items-center justify-between px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#22D3EE] animate-ping" />
          <div className="text-[10px] font-mono font-black tracking-widest text-slate-950 bg-cyan-300 px-2.5 py-0.5 rounded shadow-md border border-cyan-100 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-pulse" />
            <span>OPTICAL CIS SENSOR ACTIVE • {Math.round(scanProgress)}%</span>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#22D3EE] animate-ping" />
        </div>

        {/* Forward subtle reflection */}
        <div className="w-full h-4 bg-gradient-to-b from-cyan-400/30 to-transparent" />
      </motion.div>

      {/* Center Viewport Scanning HUD Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-slate-950/40 backdrop-blur-[2px]">
        <div className="bg-slate-900/95 border-2 border-cyan-500 text-white rounded-xl p-4 shadow-2xl max-w-sm w-full mx-auto space-y-3 pointer-events-auto">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-700/80 pb-2">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400 animate-spin" />
              <span className="text-xs font-mono font-black text-cyan-300 tracking-wider">
                AUTHENSIGHT FORENSIC SCAN ENGINE
              </span>
            </div>
            <span className="text-xs font-mono font-extrabold text-cyan-400">
              {Math.round(scanProgress)}%
            </span>
          </div>

          {/* Progress Bar with Electric Cyan glow */}
          <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-700">
            <div
              style={{ width: `${scanProgress}%` }}
              className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-cyan-300 rounded-full shadow-[0_0_12px_#06B6D4] transition-all duration-100 ease-out"
            />
          </div>

          {/* Current Phase Readout */}
          <div className="text-[11px] font-mono text-slate-300 flex items-center gap-2 bg-slate-950/80 p-2 rounded border border-slate-800">
            <Activity className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 animate-pulse" />
            <span className="truncate">{scanPhase || 'Analyzing optical spectrum...'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
