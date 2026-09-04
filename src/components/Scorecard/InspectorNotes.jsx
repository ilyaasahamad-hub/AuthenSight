import React, { useState, useEffect } from 'react';
import { Bot, UserCheck, PenTool, Hash } from 'lucide-react';

export const InspectorNotes = ({ summary, caseId = 'CASE-2026-9041' }) => {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setNotes(summary || '');
  }, [summary]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 shadow-forensic space-y-2.5 transition-colors">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
        <span className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5 font-sans">
          <Bot className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          AI Diagnostic & Inspector Signoff
        </span>
        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
          <Hash className="w-3 h-3" />
          {caseId}
        </span>
      </div>

      {/* Auto-filled AI Summary */}
      <div>
        <label className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
          Auto-Generated Forensic Summary (TruFor-v2 + ArcFace):
        </label>
        <div className="p-2 rounded bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-[11px] leading-relaxed font-mono">
          {summary}
        </div>
      </div>

      {/* Editable Inspector Notes */}
      <div>
        <label className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
          <PenTool className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
          Officer Observations & Directives:
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Enter inspector audit comments or interview remarks..."
          className="w-full text-xs font-sans p-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500 outline-hidden resize-none"
        />
      </div>

      {/* Official Digital Signature Badge */}
      <div className="p-2 rounded bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-[10px] font-mono text-slate-700 dark:text-slate-300">
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-cyan-700 dark:text-cyan-400" />
          <div>
            <div className="font-bold text-slate-900 dark:text-white">INSP-4091 • Officer K. Sharma</div>
            <div className="text-[9px] text-slate-500 dark:text-slate-400">MHA Border Control Node • Terminal 3</div>
          </div>
        </div>
        <span className="bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-bold uppercase text-[9px] border border-emerald-300 dark:border-emerald-700">
          PKI Signed
        </span>
      </div>
    </div>
  );
};
