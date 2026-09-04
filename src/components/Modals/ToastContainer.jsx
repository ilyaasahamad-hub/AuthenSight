import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertOctagon, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer = ({ toasts = [], onDismiss }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const isSuccess = toast.type === 'success';
          const isError = toast.type === 'error';
          const isWarning = toast.type === 'warning';

          const Icon = isSuccess
            ? CheckCircle2
            : isError
            ? AlertOctagon
            : isWarning
            ? AlertTriangle
            : Info;

          const borderStyle = isSuccess
            ? 'border-emerald-300 bg-white text-emerald-950 shadow-lg'
            : isError
            ? 'border-rose-300 bg-white text-rose-950 shadow-lg'
            : isWarning
            ? 'border-amber-300 bg-white text-amber-950 shadow-lg'
            : 'border-cyan-300 bg-white text-cyan-950 shadow-lg';

          const iconColor = isSuccess
            ? 'text-emerald-600'
            : isError
            ? 'text-rose-600'
            : isWarning
            ? 'text-amber-600'
            : 'text-cyan-600';

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`p-3 rounded-lg border flex items-start gap-2.5 pointer-events-auto text-xs ${borderStyle}`}
            >
              <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${iconColor}`} />
              <div className="flex-1">
                <div className="font-bold font-sans">{toast.title}</div>
                <div className="text-[11px] text-slate-600 font-mono mt-0.5">{toast.message}</div>
              </div>
              <button
                onClick={() => onDismiss(toast.id)}
                className="text-slate-400 hover:text-slate-700 p-0.5 rounded"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
