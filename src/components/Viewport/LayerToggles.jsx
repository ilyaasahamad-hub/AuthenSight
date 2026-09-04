import React from 'react';
import { Layers, Activity, Flame, Sparkles } from 'lucide-react';

export const LayerToggles = ({ activeLayer, setActiveLayer }) => {
  const layers = [
    {
      id: 'standard',
      label: 'Standard Optical Scan',
      icon: Layers,
      color: 'text-cyan-600 dark:text-cyan-400',
      activeBg: 'bg-cyan-700 text-white border-cyan-800',
      badge: 'RGB 300 DPI',
    },
    {
      id: 'ela',
      label: 'ELA Discontinuity',
      icon: Activity,
      color: 'text-fuchsia-600 dark:text-fuchsia-400',
      activeBg: 'bg-fuchsia-700 text-white border-fuchsia-800',
      badge: '8-Bit DCT',
    },
    {
      id: 'heatmap',
      label: 'Grad-CAM Heatmap',
      icon: Flame,
      color: 'text-rose-600 dark:text-rose-400',
      activeBg: 'bg-rose-700 text-white border-rose-800',
      badge: 'TruFor-v2',
    },
    {
      id: 'uv',
      label: 'UV / Hologram',
      icon: Sparkles,
      color: 'text-emerald-600 dark:text-emerald-400',
      activeBg: 'bg-emerald-700 text-white border-emerald-800',
      badge: '365nm UV',
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100/90 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg transition-colors">
      <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase px-2 flex items-center gap-1">
        <Layers className="w-3.5 h-3.5" />
        Layers:
      </span>
      <div className="flex flex-wrap items-center gap-1.5 flex-1">
        {layers.map((layer) => {
          const Icon = layer.icon;
          const isActive = activeLayer === layer.id;
          return (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(layer.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
                isActive
                  ? `${layer.activeBg} shadow-sm font-semibold`
                  : 'bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : layer.color}`} />
              <span>{layer.label}</span>
              <span
                className={`text-[9px] font-mono px-1 py-0.2 rounded ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400'
                }`}
              >
                {layer.badge}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
