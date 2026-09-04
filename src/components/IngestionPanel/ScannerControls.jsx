import React from 'react';
import { Sliders, SunMedium, MoveHorizontal } from 'lucide-react';

export const ScannerControls = ({
  dpi,
  setDpi,
  contrastBalance,
  setContrastBalance,
  edgeDewarping,
  setEdgeDewarping,
}) => {
  const dpiOptions = [150, 300, 600];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 shadow-forensic space-y-3 transition-colors">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
        <span className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5 font-sans">
          <Sliders className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          Scanner Parameters
        </span>
        <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          CIS Calibrated
        </span>
      </div>

      {/* Optical DPI Selector */}
      <div>
        <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1.5 block">
          Optical Resolution (DPI):
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {dpiOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setDpi(opt)}
              className={`py-1.5 px-2 rounded text-xs font-mono font-bold border transition-colors ${
                dpi === opt
                  ? 'bg-cyan-700 text-white border-cyan-800 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700'
              }`}
            >
              {opt} DPI
              {opt === 600 && <span className="block text-[8px] font-normal opacity-80">Ultra-Res</span>}
              {opt === 300 && <span className="block text-[8px] font-normal opacity-80">Standard</span>}
              {opt === 150 && <span className="block text-[8px] font-normal opacity-80">Draft</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Toggle Controls */}
      <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800">
        {/* Contrast Auto-Balance */}
        <div
          onClick={() => setContrastBalance(!contrastBalance)}
          className="flex items-center justify-between cursor-pointer p-1.5 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center gap-2">
            <SunMedium className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <div>
              <div className="text-xs font-medium text-slate-800 dark:text-slate-200">Contrast Auto-Balance</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Histogram normalization (±12%)</div>
            </div>
          </div>
          <div className={`w-8 h-4 rounded-full transition-colors relative ${contrastBalance ? 'bg-cyan-700' : 'bg-slate-300 dark:bg-slate-700'}`}>
            <div className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform ${contrastBalance ? 'right-0.5' : 'left-0.5'}`} />
          </div>
        </div>

        {/* Edge Dewarping */}
        <div
          onClick={() => setEdgeDewarping(!edgeDewarping)}
          className="flex items-center justify-between cursor-pointer p-1.5 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center gap-2">
            <MoveHorizontal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <div>
              <div className="text-xs font-medium text-slate-800 dark:text-slate-200">Edge Dewarping & Flatten</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Corrects perspective skew</div>
            </div>
          </div>
          <div className={`w-8 h-4 rounded-full transition-colors relative ${edgeDewarping ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
            <div className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform ${edgeDewarping ? 'right-0.5' : 'left-0.5'}`} />
          </div>
        </div>
      </div>
    </div>
  );
};
