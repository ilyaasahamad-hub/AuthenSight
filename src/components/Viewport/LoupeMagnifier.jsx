import React from 'react';

export const LoupeMagnifier = ({
  enabled = true,
  mousePos = { x: 0, y: 0 },
  containerRect = null,
  preset,
}) => {
  if (!enabled || !containerRect || mousePos.x < 0 || mousePos.y < 0) return null;

  const LOUPE_SIZE = 190;
  const ZOOM_FACTOR = 4;

  // Relative percentage within container
  const relX = (mousePos.x / containerRect.width) * 100;
  const relY = (mousePos.y / containerRect.height) * 100;

  // Loupe circle position centered on mouse
  const loupeLeft = mousePos.x - LOUPE_SIZE / 2;
  const loupeTop = mousePos.y - LOUPE_SIZE / 2;

  // Background offset for 4x zoom
  const bgOffsetX = -mousePos.x * ZOOM_FACTOR + LOUPE_SIZE / 2;
  const bgOffsetY = -mousePos.y * ZOOM_FACTOR + LOUPE_SIZE / 2;

  const isForged = preset.statusType === 'forged';
  const isCustom = Boolean(preset.customImageUrl);

  return (
    <div
      style={{
        left: `${loupeLeft}px`,
        top: `${loupeTop}px`,
        width: `${LOUPE_SIZE}px`,
        height: `${LOUPE_SIZE}px`,
      }}
      className="absolute pointer-events-none z-50 rounded-full border-2 border-cyan-400 bg-slate-900 shadow-2xl overflow-hidden loupe-lens"
    >
      {/* Magnified Sub-Pixel Content Canvas */}
      <div
        style={{
          width: `${containerRect.width * ZOOM_FACTOR}px`,
          height: `${containerRect.height * ZOOM_FACTOR}px`,
          transform: `translate(${bgOffsetX}px, ${bgOffsetY}px)`,
          transformOrigin: '0 0',
        }}
        className="relative bg-slate-950"
      >
        {isCustom ? (
          /* Render magnified uploaded image */
          <img
            src={preset.customImageUrl}
            alt="Magnified Upload"
            className="w-full h-full object-contain"
          />
        ) : (
          /* Procedural Microprint & Guilloché patterns for presets */
          <>
            <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
              <pattern id="loupe-guilloche" width="40" height="20" patternUnits="userSpaceOnUse">
                <path d="M0,10 C10,0 10,20 20,10 C30,0 30,20 40,10" fill="none" stroke="#0E7490" strokeWidth="0.8" />
                <path d="M0,5 Q20,15 40,5" fill="none" stroke="#D97706" strokeWidth="0.5" />
              </pattern>
              <pattern id="loupe-halftone" width="4" height="4" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="0.6" fill="#475569" opacity="0.3" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#loupe-guilloche)" />
              <rect width="100%" height="100%" fill="url(#loupe-halftone)" />
            </svg>

            {/* Dense Microtext Bands */}
            <div className="absolute inset-0 flex flex-col justify-around opacity-40 font-mono text-[7px] text-cyan-400 tracking-wider overflow-hidden">
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="whitespace-nowrap">
                  REPUBLIC OF INDIA • भारत गणराज्य • SECURITY PRINTING & MINTING CORP • ICAO 9303 SECURE INK • 
                </div>
              ))}
            </div>

            {/* Tamper splice warning in loupe */}
            {isForged && relX > 30 && relX < 65 && relY > 30 && relY < 55 && (
              <div className="absolute top-[35%] left-[32%] w-60 h-24 border-2 border-rose-500 bg-rose-500/30 flex flex-col items-center justify-center">
                <span className="text-[11px] font-bold text-rose-300 bg-rose-950/90 px-1 rounded font-mono border border-rose-500">
                  [SUB-PIXEL SPLICE DETECTED]
                </span>
                <span className="text-[9px] text-rose-200 font-mono mt-0.5">
                  Font anti-aliasing mismatch: Arial resampled
                </span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Optical Loupe Reticle & Crosshairs */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-full h-[1px] bg-cyan-400/50" />
        <div className="h-full w-[1px] bg-cyan-400/50 absolute" />
        <div className="w-8 h-8 rounded-full border border-cyan-400/70" />
      </div>

      {/* Header Telemetry Badge */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-950/90 text-white font-mono text-[8px] font-bold px-2 py-0.5 rounded-full shadow-md border border-cyan-500/40 flex items-center gap-1">
        <span className="text-cyan-400">4.0X OPTICAL</span>
        <span className="text-slate-500">|</span>
        <span>X:{Math.round(mousePos.x)} Y:{Math.round(mousePos.y)}</span>
      </div>

      {/* Footer Micro-Scale Bar (0.5 mm) */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-slate-900/90 border border-slate-700 text-cyan-300 rounded px-1.5 py-0.5 flex items-center gap-1 text-[7px] font-mono shadow-xs">
        <div className="w-6 h-1 border-b border-l border-r border-cyan-400" />
        <span>0.5 mm</span>
      </div>
    </div>
  );
};
