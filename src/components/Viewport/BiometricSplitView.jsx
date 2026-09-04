import React, { useState, useEffect } from 'react';
import { Camera, ShieldCheck, AlertOctagon, UserCheck, Activity, Eye, Video } from 'lucide-react';
import { MOCK_PRESENTERS } from '../../utils/documentGenerators';

export const BiometricSplitView = ({ preset }) => {
  const presenter = MOCK_PRESENTERS[preset.id] || MOCK_PRESENTERS['preset-1'];
  const isAttack = preset.statusType === 'attack';
  const isSuspicious = preset.statusType === 'forged';
  const isAuthentic = preset.statusType === 'authentic';

  const [blinkTick, setBlinkTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlinkTick((prev) => prev + 1);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col bg-slate-900 text-white rounded-lg border border-slate-700 overflow-hidden shadow-forensic-lg">
      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-950 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-mono font-bold text-cyan-400 flex items-center gap-1">
            <Camera className="w-3.5 h-3.5" />
            PRESENTER BIOMETRIC CAMERA • 1080p 60FPS
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-slate-400">Model: ArcFace 512d + MiniFASNet</span>
          <span
            className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
              isAttack
                ? 'bg-rose-600 text-white animate-pulse'
                : isSuspicious
                ? 'bg-amber-500 text-slate-950 font-black'
                : 'bg-emerald-600 text-white'
            }`}
          >
            {isAttack ? '3D PRESENTATION ATTACK' : isSuspicious ? 'IDENTITY MISMATCH' : 'LIVE SUBJECT VERIFIED'}
          </span>
        </div>
      </div>

      {/* Camera Viewport Simulation */}
      <div className="relative flex-1 bg-slate-950 flex items-center justify-center overflow-hidden p-4">
        {/* Subtle camera scan lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

        {/* Presenter Portrait Graphic */}
        <div className="relative w-48 h-64 rounded-lg border-2 border-cyan-500/60 overflow-hidden bg-slate-900 flex items-center justify-center">
          {/* Avatar Graphic according to preset */}
          {preset.id === 'preset-1' && (
            <svg viewBox="0 0 120 150" className="w-full h-full bg-slate-800">
              <circle cx="60" cy="52" r="26" fill="#FBD5B5" />
              <path d="M34 44 C34 26 86 26 86 44 C86 52 82 58 76 60 C68 46 52 46 44 60 C38 58 34 52 34 44 Z" fill="#261C14" />
              <circle cx="51" cy="52" r="3" fill="#1E293B" />
              <circle cx="69" cy="52" r="3" fill="#1E293B" />
              <path d="M56 65 Q60 69 64 65" stroke="#BE123C" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M22 135 C24 96 96 96 98 135 Z" fill="#0E7490" />
              {/* Natural eye blink */}
              {blinkTick % 3 === 0 && (
                <path d="M48 52 L54 52 M66 52 L72 52" stroke="#1E293B" strokeWidth="2" />
              )}
            </svg>
          )}

          {preset.id === 'preset-2' && (
            <svg viewBox="0 0 120 150" className="w-full h-full bg-slate-800">
              <circle cx="60" cy="50" r="26" fill="#D99B72" />
              <path d="M36 44 C36 28 84 28 84 44 C84 56 80 62 74 64 C66 48 54 48 46 64 C40 62 36 56 36 44 Z" fill="#1F2937" />
              <circle cx="50" cy="50" r="3" fill="#0F172A" />
              <circle cx="70" cy="50" r="3" fill="#0F172A" />
              <path d="M22 135 C24 94 96 94 98 135 Z" fill="#334155" />
            </svg>
          )}

          {preset.id === 'preset-3' && (
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              {/* Synthetic portrait on electronic tablet */}
              <svg viewBox="0 0 120 150" className="w-full h-full filter brightness-110">
                <circle cx="60" cy="50" r="26" fill="#F3C6A5" />
                <path d="M36 44 C36 28 84 28 84 44 C84 56 80 62 74 64 C66 48 54 48 46 64 C40 62 36 56 36 44 Z" fill="#4B2C20" />
                <circle cx="50" cy="50" r="3" fill="#1E293B" />
                <circle cx="70" cy="50" r="3" fill="#1E293B" />
                <path d="M22 135 C24 96 96 96 98 135 Z" fill="#047857" />
              </svg>
              {/* Replay attack frame banner */}
              <div className="absolute top-2 left-2 right-2 bg-rose-600/90 text-white font-mono text-[8px] font-bold text-center py-0.5 rounded shadow">
                42.8Hz MOIRÉ SCREEN REPLAY
              </div>
              {/* Screen bezel reflection */}
              <div className="absolute inset-0 border-4 border-slate-700 pointer-events-none" />
            </div>
          )}

          {/* 3D Facial Mesh Landmark Wireframe (Procedural SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60">
            {/* Mesh points around face */}
            <circle cx="60" cy="52" r="2" fill="#06B6D4" />
            <circle cx="51" cy="46" r="1.5" fill="#06B6D4" />
            <circle cx="69" cy="46" r="1.5" fill="#06B6D4" />
            <circle cx="60" cy="62" r="1.5" fill="#06B6D4" />
            <circle cx="60" cy="74" r="1.5" fill="#06B6D4" />
            <polygon points="51,46 69,46 60,62" fill="none" stroke="#06B6D4" strokeWidth="0.5" strokeDasharray="1,1" />
            <polygon points="51,46 60,74 69,46" fill="none" stroke="#06B6D4" strokeWidth="0.5" strokeDasharray="1,1" />
          </svg>

          {/* Face Detection Bounding Box */}
          <div className="absolute inset-2 border border-cyan-400/80 rounded pointer-events-none flex items-start justify-between p-1">
            <span className="text-[7.5px] font-mono text-cyan-300 bg-cyan-950/80 px-1 rounded">
              FACE #1 [TRACKED]
            </span>
            <span className="text-[7.5px] font-mono text-emerald-400 bg-emerald-950/80 px-1 rounded">
              Conf: 99.7%
            </span>
          </div>
        </div>

        {/* Real-time Biometric Readout Overlays */}
        <div className="absolute bottom-3 left-4 right-4 grid grid-cols-3 gap-2 text-[10px] font-mono">
          <div className="bg-slate-900/90 border border-slate-700 rounded p-1.5 shadow-sm">
            <div className="text-slate-400 text-[8px] uppercase">ArcFace Similarity</div>
            <div className={`text-xs font-black ${isAuthentic ? 'text-emerald-400' : isAttack ? 'text-amber-400' : 'text-rose-400'}`}>
              {presenter.faceMatchScore}%
            </div>
            <div className="text-[8px] text-slate-500">Vector Dist: {isAuthentic ? '0.14' : '0.48'}</div>
          </div>

          <div className="bg-slate-900/90 border border-slate-700 rounded p-1.5 shadow-sm">
            <div className="text-slate-400 text-[8px] uppercase">3D Depth Variance</div>
            <div className={`text-xs font-black ${isAttack ? 'text-rose-400' : 'text-emerald-400'}`}>
              {presenter.depthVariance}
            </div>
            <div className="text-[8px] text-slate-500">Blinks: {presenter.blinkRate}</div>
          </div>

          <div className="bg-slate-900/90 border border-slate-700 rounded p-1.5 shadow-sm">
            <div className="text-slate-400 text-[8px] uppercase">Moiré / Device</div>
            <div className={`text-xs font-black ${isAttack ? 'text-rose-400' : 'text-emerald-400'}`}>
              {isAttack ? 'OLED Replay' : 'Natural Sensor'}
            </div>
            <div className="text-[8px] text-slate-500">{presenter.deviceDetected}</div>
          </div>
        </div>
      </div>

      {/* Footer Status Bar */}
      <div className="bg-slate-950 border-t border-slate-800 px-3 py-1.5 flex items-center justify-between text-[10px] font-mono">
        <span className="text-slate-400">Subject: <strong className="text-white">{presenter.name}</strong></span>
        <span className={isAttack ? 'text-rose-400 font-bold' : isAuthentic ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
          {isAttack ? 'BLOCKED BY 3D-PAD ENGINE' : isAuthentic ? 'PASSED BIOMETRIC CLEARANCE' : 'REQUIRES OFFICER INTERVIEW'}
        </span>
      </div>
    </div>
  );
};
