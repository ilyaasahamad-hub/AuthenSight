import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertOctagon,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Binary,
  Type,
  ScanFace,
  FileSearch,
} from 'lucide-react';

export const ValidationCards = ({ checks }) => {
  const [expanded, setExpanded] = useState({
    checksum: true,
    typography: true,
    biometric: true,
    metadata: true,
  });

  const toggle = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const cards = [
    {
      key: 'checksum',
      data: checks?.checksum,
      icon: Binary,
      label: 'Checksum & MRZ Analysis',
    },
    {
      key: 'typography',
      data: checks?.typography,
      icon: Type,
      label: 'Typography & Layout Integrity',
    },
    {
      key: 'biometric',
      data: checks?.biometric,
      icon: ScanFace,
      label: 'Face Match & 3D Liveness',
    },
    {
      key: 'metadata',
      data: checks?.metadata,
      icon: FileSearch,
      label: 'Metadata & Quantization',
    },
  ];

  return (
    <div className="space-y-2.5">
      {cards.map((card) => {
        const item = card.data;
        if (!item) return null;

        const isPass = item.status === 'pass';
        const isWarning = item.status === 'warning';
        const isFail = item.status === 'fail';

        const Icon = card.icon;
        const isExp = expanded[card.key];

        const badgeStyle = isPass
          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700/80'
          : isWarning
          ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700/80'
          : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-700/80';

        const borderStyle = isPass
          ? 'border-emerald-200/80 dark:border-emerald-900/50 hover:border-emerald-400'
          : isWarning
          ? 'border-amber-200 dark:border-amber-900/50 hover:border-amber-400'
          : 'border-rose-300 dark:border-rose-900/50 hover:border-rose-400';

        return (
          <div
            key={card.key}
            className={`bg-white dark:bg-slate-900 border rounded-lg overflow-hidden shadow-xs transition-all ${borderStyle}`}
          >
            {/* Card Header */}
            <div
              onClick={() => toggle(card.key)}
              className="p-3 flex items-center justify-between cursor-pointer hover:bg-slate-50/70 dark:hover:bg-slate-800/60 select-none"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`p-1.5 rounded ${
                    isPass
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                      : isWarning
                      ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400'
                      : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">
                    {item.title}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">{item.subtitle}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-mono font-black px-2 py-0.5 rounded border uppercase ${badgeStyle}`}
                >
                  {isPass ? 'CLEARED' : isWarning ? 'REVIEW' : 'FAILED'} ({item.score})
                </span>
                {isExp ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </div>
            </div>

            {/* Expanded Itemized Checklist */}
            {isExp && (
              <div className="px-3 pb-3 pt-1 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-xs font-sans space-y-2">
                <div className="space-y-1.5">
                  {item.details.map((det, idx) => (
                    <div
                      key={idx}
                      className="flex items-start justify-between gap-2 p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-[11px]"
                    >
                      <div className="flex items-center gap-1.5">
                        {det.pass ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        ) : (
                          <AlertOctagon className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 flex-shrink-0" />
                        )}
                        <span className="text-slate-700 dark:text-slate-300 font-medium">{det.label}</span>
                      </div>
                      <span
                        className={`font-mono text-[10px] font-bold ${
                          det.pass ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                        }`}
                      >
                        {det.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Natural Language Explanation Box */}
                <div className="p-2 bg-slate-100 dark:bg-slate-800/80 rounded text-[10px] text-slate-600 dark:text-slate-300 leading-relaxed font-mono">
                  <span className="font-bold text-slate-800 dark:text-slate-100">AI Diagnostic:</span> {item.explanation}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
