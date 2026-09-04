import React from 'react';
import { PRESETS } from '../../types/presets';
import { CheckCircle2, AlertOctagon, ShieldAlert, Sparkles } from 'lucide-react';

export const PresetSelector = ({ selectedPresetId, onSelectPreset }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 shadow-forensic space-y-2 transition-colors">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
        <span className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5 font-sans">
          <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          Quick Demo Presets
        </span>
        <span className="text-[10px] font-mono text-cyan-800 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-200 dark:border-cyan-800">
          Click to Swap
        </span>
      </div>

      <div className="space-y-2">
        {PRESETS.map((preset) => {
          const isSelected = selectedPresetId === preset.id;
          const isPass = preset.statusType === 'authentic';
          const isForged = preset.statusType === 'forged';
          const isAttack = preset.statusType === 'attack';

          return (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className={`w-full text-left p-2.5 rounded-lg border transition-all relative overflow-hidden ${
                isSelected
                  ? 'border-cyan-500 bg-cyan-50/70 dark:bg-cyan-950/40 shadow-sm ring-1 ring-cyan-500'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800/80'
              }`}
            >
              {/* Top Row: Name and Score Tag */}
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-1.5">
                  {isPass && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />}
                  {isForged && <AlertOctagon className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0" />}
                  {isAttack && <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />}
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">
                    {preset.shortName}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-mono font-black px-1.5 py-0.5 rounded border flex-shrink-0 ${
                    isPass
                      ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                      : isForged
                      ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-700'
                      : 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                  }`}
                >
                  {preset.trustScore}/100
                </span>
              </div>

              {/* Summary Description */}
              <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-tight mb-2 pl-5">
                {isPass && 'Valid ICAO MRZ checksums, microprint intact, ArcFace 98.4% live match.'}
                {isForged && 'Spliced Date of Birth (+2.1px shift), Verhoeff fail, Photoshop EXIF.'}
                {isAttack && '3D presentation attack detected (42.8Hz screen replay moiré grid).'}
              </p>

              {/* Status Badge */}
              <div className="flex items-center justify-between text-[9px] font-mono pl-5">
                <span className="text-slate-500 dark:text-slate-400">ID: {preset.documentNumber}</span>
                <span
                  className={`font-bold px-1.5 py-0.2 rounded uppercase ${
                    isPass
                      ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300'
                      : isForged
                      ? 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300'
                      : 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300'
                  }`}
                >
                  {preset.statusTag}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
