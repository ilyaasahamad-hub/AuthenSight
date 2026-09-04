import React from 'react';
import {
  Shield,
  Activity,
  Cpu,
  Scan,
  UserCheck,
  FileDown,
  RefreshCw,
  Volume2,
  VolumeX,
  Sun,
  Moon,
} from 'lucide-react';
import { forensicAudio } from '../utils/audioSynthesizer';

export const TopNav = ({
  dpi = 300,
  isScanning,
  onTriggerScan,
  onOpenDossier,
  soundEnabled,
  setSoundEnabled,
  theme = 'dark',
  onToggleTheme,
}) => {
  const toggleSound = () => {
    forensicAudio.muted = soundEnabled;
    setSoundEnabled(!soundEnabled);
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-xs transition-colors">
      <div className="max-w-[1720px] mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Platform Title & Government Pill Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-600 to-cyan-900 flex items-center justify-center text-white shadow-sm border border-cyan-500/40">
            <Shield className="w-5 h-5 text-cyan-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
                AuthenSight <span className="font-medium text-slate-400 dark:text-slate-500">|</span> Document Forensic & Identity Scanner
              </h1>
              <span className="text-[10px] font-mono font-bold bg-cyan-50 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 px-2 py-0.5 rounded-full">
                MHA / Border Control Node
              </span>
              <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                SIH26188
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans flex items-center gap-2">
              <span>Automated Optical & Biometric Tamper Detection</span>
              <span>•</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-medium">Node ONLINE</span>
            </div>
          </div>
        </div>

        {/* Center: Live Telemetry Chips */}
        <div className="hidden xl:flex items-center gap-2">
          {/* Scanner Telemetry Chip */}
          <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-md px-2.5 py-1 flex items-center gap-1.5 text-xs font-mono text-slate-700 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-400 dark:text-slate-500">Scanner:</span>
            <span className="font-bold">Ready ({dpi} DPI)</span>
          </div>

          {/* Inference Chip */}
          <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-md px-2.5 py-1 flex items-center gap-1.5 text-xs font-mono text-slate-700 dark:text-slate-300">
            <Activity className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span className="text-slate-400 dark:text-slate-500">Inference:</span>
            <span className="font-bold">32ms</span>
          </div>

          {/* Tamper Model Chip */}
          <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-md px-2.5 py-1 flex items-center gap-1.5 text-xs font-mono text-slate-700 dark:text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span className="text-slate-400 dark:text-slate-500">Tamper Model:</span>
            <span className="font-bold">TruFor-v2</span>
          </div>

          {/* Biometric Chip */}
          <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-md px-2.5 py-1 flex items-center gap-1.5 text-xs font-mono text-slate-700 dark:text-slate-300">
            <UserCheck className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span className="text-slate-400 dark:text-slate-500">Biometric:</span>
            <span className="font-bold">ArcFace 512d</span>
          </div>
        </div>

        {/* Right: Actions (Theme Toggle, Audio, Inspector ID, Trigger Scan, Dossier Export) */}
        <div className="flex items-center gap-2">
          {/* Theme Switcher Toggle */}
          <button
            onClick={onToggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-1 text-xs font-mono"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-cyan-700" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Mute Optical Audio' : 'Unmute Optical Audio'}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Inspector Badge */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-700 dark:text-slate-300">
            <div className="w-6 h-6 rounded-full bg-cyan-700 text-white flex items-center justify-center font-bold text-[10px]">
              4091
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white leading-tight">INSP-4091</div>
              <div className="text-[9px] text-slate-500 dark:text-slate-400">Officer K. Sharma</div>
            </div>
          </div>

          {/* Trigger Scan CTA */}
          <button
            onClick={onTriggerScan}
            disabled={isScanning}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-bold text-xs shadow-sm transition-all text-white ${
              isScanning
                ? 'bg-cyan-800 opacity-90 cursor-not-allowed'
                : 'bg-cyan-700 hover:bg-cyan-800 active:scale-95 shadow-cyan-900/10'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Scanning...' : 'Trigger Scan'}</span>
          </button>

          {/* Export Audit Dossier (PDF) */}
          <button
            onClick={onOpenDossier}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors shadow-xs"
          >
            <FileDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <span className="hidden sm:inline">Export Audit Dossier</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
};
