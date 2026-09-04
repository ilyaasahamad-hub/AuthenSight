import React from 'react';
import { CheckCircle, AlertTriangle, ShieldX } from 'lucide-react';
import confetti from 'canvas-confetti';
import { forensicAudio } from '../../utils/audioSynthesizer';

export const ActionButtons = ({ onDecision }) => {
  const handleApprove = () => {
    forensicAudio.playBeepSuccess();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#059669', '#10B981', '#06B6D4'],
      });
    } catch (e) {}
    onDecision('APPROVED');
  };

  const handleReview = () => {
    forensicAudio.playAlertWarning();
    onDecision('SECONDARY_REVIEW');
  };

  const handleReject = () => {
    forensicAudio.playAlertWarning();
    onDecision('REJECTED_FORGERY');
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 shadow-forensic space-y-2 transition-colors">
      <div className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider font-sans border-b border-slate-100 dark:border-slate-800 pb-1.5 flex items-center justify-between">
        <span>Forensic Adjudication Action</span>
        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Node Officer Signoff</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {/* Clear & Approve (Jade Mint) */}
        <button
          onClick={handleApprove}
          className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs shadow-sm transition-all group"
        >
          <CheckCircle className="w-4 h-4 mb-1 group-hover:scale-110 transition-transform" />
          <span className="text-center leading-tight">Clear & Approve</span>
        </button>

        {/* Route to Secondary Review (Warm Ochre) */}
        <button
          onClick={handleReview}
          className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-xs shadow-sm transition-all group"
        >
          <AlertTriangle className="w-4 h-4 mb-1 group-hover:scale-110 transition-transform" />
          <span className="text-center leading-tight">Secondary Review</span>
        </button>

        {/* Reject & Log Forgery (Crimson Rose) */}
        <button
          onClick={handleReject}
          className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold text-xs shadow-sm transition-all group"
        >
          <ShieldX className="w-4 h-4 mb-1 group-hover:scale-110 transition-transform" />
          <span className="text-center leading-tight">Reject & Log</span>
        </button>
      </div>
    </div>
  );
};
