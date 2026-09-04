import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle2 } from 'lucide-react';

export const EdgeDetectionOverlay = ({ enabled = true, isScanning = false }) => {
  const [corners, setCorners] = useState({
    tl: { x: 4, y: 4 },
    tr: { x: 96, y: 4 },
    br: { x: 96, y: 96 },
    bl: { x: 4, y: 96 },
  });

  const [activeCorner, setActiveCorner] = useState(null);

  if (!enabled) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {/* SVG Auto-crop polygon boundary line */}
      <svg className="w-full h-full absolute inset-0">
        <defs>
          <linearGradient id="edge-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
        <motion.polygon
          points={`${corners.tl.x}%,${corners.tl.y}% ${corners.tr.x}%,${corners.tr.y}% ${corners.br.x}%,${corners.br.y}% ${corners.bl.x}%,${corners.bl.y}%`}
          fill="rgba(16, 185, 129, 0.02)"
          stroke="url(#edge-grad)"
          strokeWidth="2"
          strokeDasharray="6 4"
          animate={isScanning ? { strokeDashoffset: [0, -40] } : {}}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        />
      </svg>

      {/* 4 Draggable Corner Target Pins (Bright Lime / Emerald #10B981) */}
      {[
        { id: 'tl', pos: corners.tl, label: 'TL (4, 4)' },
        { id: 'tr', pos: corners.tr, label: 'TR (96, 4)' },
        { id: 'br', pos: corners.br, label: 'BR (96, 96)' },
        { id: 'bl', pos: corners.bl, label: 'BL (4, 96)' },
      ].map((pin) => (
        <div
          key={pin.id}
          style={{ left: `${pin.pos.x}%`, top: `${pin.pos.y}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-crosshair group"
        >
          {/* Target Bracket Pin */}
          <div className="relative flex items-center justify-center">
            {/* Outer pulsating ring */}
            <div className="w-7 h-7 rounded-full border-2 border-emerald-500 bg-emerald-50/70 flex items-center justify-center shadow-md transition-transform group-hover:scale-125 group-active:scale-95">
              <div className="w-2 h-2 rounded-full bg-emerald-600 shadow-sm" />
            </div>

            {/* Corner brackets */}
            <div className="absolute -inset-1 border-t-2 border-l-2 border-emerald-500 w-3 h-3 -top-1 -left-1 pointer-events-none" />
            <div className="absolute -inset-1 border-b-2 border-r-2 border-emerald-500 w-3 h-3 -bottom-1 -right-1 pointer-events-none" />

            {/* Coordinate Tooltip */}
            <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-mono px-1.5 py-0.5 rounded shadow whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
              {pin.label}
            </div>
          </div>
        </div>
      ))}

      {/* Auto-Dewarp Status Badge */}
      <div className="absolute bottom-2 left-2 bg-white/95 border border-emerald-300 rounded px-2 py-1 shadow-sm flex items-center gap-1.5 text-[10px] font-mono text-emerald-800 pointer-events-auto">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        <span>Auto-Crop Locked • Keystoning: 0.0°</span>
      </div>
    </div>
  );
};
