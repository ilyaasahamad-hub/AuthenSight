import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export const LiveOCROverlay = ({ boxes = [], isScanning = false, showOCR = true }) => {
  const [selectedBox, setSelectedBox] = useState(null);

  if (!showOCR || !boxes || boxes.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {boxes.map((box, idx) => {
        const isTampered = box.tampered;
        return (
          <motion.div
            key={box.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.08, duration: 0.3 }}
            style={{
              left: `${box.x}%`,
              top: `${box.y}%`,
              width: `${box.w}%`,
              height: `${box.h}%`,
            }}
            className={`absolute pointer-events-auto cursor-pointer rounded transition-all duration-200 ${
              isTampered
                ? 'border-2 border-dashed border-rose-500 bg-rose-500/15 hover:bg-rose-500/30'
                : 'border border-cyan-500/70 bg-cyan-500/10 hover:bg-cyan-500/25'
            }`}
            onClick={() => setSelectedBox(selectedBox?.id === box.id ? null : box)}
          >
            {/* Tag Badge */}
            <div
              className={`absolute -top-3.5 left-0 px-1 py-0.2 rounded text-[7.5px] font-mono font-bold flex items-center gap-1 shadow-xs ${
                isTampered
                  ? 'bg-rose-600 text-white'
                  : 'bg-cyan-700 text-white'
              }`}
            >
              {isTampered ? <AlertTriangle className="w-2.5 h-2.5" /> : null}
              <span>{box.label}</span>
              <span className="opacity-80">({box.confidence})</span>
            </div>

            {/* Click / Hover Inspector Popover */}
            {selectedBox?.id === box.id && (
              <div className="absolute z-50 bottom-full mb-2 left-0 min-w-[200px] bg-white border border-slate-300 rounded-lg p-2.5 shadow-forensic-lg text-slate-900 pointer-events-auto">
                <div className="flex items-center justify-between border-b border-slate-100 pb-1 mb-1.5">
                  <span className="text-[10px] font-bold text-slate-700 uppercase font-sans">
                    OCR Field Analysis
                  </span>
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                      isTampered
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {isTampered ? 'ANOMALY FLAGGED' : 'VERIFIED'}
                  </span>
                </div>
                <div className="space-y-1 font-mono text-[10px]">
                  <div>
                    <span className="text-slate-400">Extracted:</span>{' '}
                    <span className="font-bold text-slate-900">{box.text}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Confidence:</span>{' '}
                    <span className="font-bold text-cyan-700">{box.confidence}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Font Engine:</span>{' '}
                    <span className="text-slate-700">
                      {isTampered ? 'Arial Substituted (Splice)' : 'Official ISP OCR-B / Monospace'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Kerning Match:</span>{' '}
                    <span className={isTampered ? 'text-rose-600 font-bold' : 'text-emerald-700'}>
                      {isTampered ? '+2.1px Baseline Offset' : '< 0.02mm Variance'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
