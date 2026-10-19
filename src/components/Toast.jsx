import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export const Toast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none animate-bounce-in">
      <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-md border ${
        isError
          ? 'bg-red-500/90 text-white border-red-400'
          : 'bg-[#1E293B]/95 dark:bg-[#0F172A]/95 text-white border-amber-500/40 shadow-glow-amber'
      }`}>
        {isError ? (
          <AlertCircle className="w-5 h-5 text-white shrink-0" />
        ) : (
          <div className="p-1 rounded-full bg-amber-500 text-slate-900">
            <CheckCircle2 className="w-4 h-4 stroke-[3]" />
          </div>
        )}
        <span className="text-sm font-semibold tracking-wide">{toast.message}</span>
      </div>
    </div>
  );
};
