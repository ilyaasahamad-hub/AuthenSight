import React from 'react';
import { Scan, Camera, UploadCloud } from 'lucide-react';

export const ModeTabs = ({ activeMode, setActiveMode }) => {
  const modes = [
    { id: 'flatbed', label: 'Flatbed Scanner', icon: Scan },
    { id: 'camera', label: 'Document Cam', icon: Camera },
    { id: 'upload', label: 'Upload File', icon: UploadCloud },
  ];

  return (
    <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isActive = activeMode === mode.id;
        return (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode.id)}
            className={`flex-1 flex flex-col items-center py-2 px-1 rounded-md text-xs font-medium transition-all ${
              isActive
                ? 'bg-white dark:bg-slate-900 text-cyan-800 dark:text-cyan-300 shadow-sm font-semibold border border-slate-200/80 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
            }`}
          >
            <Icon className={`w-4 h-4 mb-1 ${isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-500'}`} />
            <span className="text-[11px] leading-tight">{mode.label}</span>
          </button>
        );
      })}
    </div>
  );
};
