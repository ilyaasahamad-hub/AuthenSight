import React from 'react';
import { FileText, Shield, CreditCard, Award, UserSquare } from 'lucide-react';
import { ID_TYPES } from '../../types/presets';

export const IDTypeSelector = ({ selectedType, onSelectType }) => {
  const getIcon = (id) => {
    switch (id) {
      case 'passport':
        return Shield;
      case 'aadhaar':
        return Award;
      case 'driving_license':
        return CreditCard;
      case 'voter_id':
        return UserSquare;
      default:
        return FileText;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 shadow-forensic space-y-2 transition-colors">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
        <span className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider font-sans">
          ID Document Standard
        </span>
        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">5 Registered</span>
      </div>

      <div className="grid grid-cols-1 gap-1.5">
        {ID_TYPES.map((type) => {
          const Icon = getIcon(type.id);
          const isSelected = selectedType === type.id;
          return (
            <button
              key={type.id}
              onClick={() => onSelectType(type.id)}
              className={`flex items-center justify-between p-2 rounded-md border text-left transition-all ${
                isSelected
                  ? 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-400 dark:border-cyan-600 text-cyan-900 dark:text-cyan-200 font-semibold shadow-xs'
                  : 'bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`p-1.5 rounded ${isSelected ? 'bg-cyan-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs">{type.name}</div>
                  <div className="text-[9px] font-mono text-slate-500 dark:text-slate-400">{type.standard}</div>
                </div>
              </div>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {type.code}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
