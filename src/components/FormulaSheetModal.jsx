import React, { useState } from 'react';
import { X, BookOpen, Copy, Check, Sparkles } from 'lucide-react';
import MathView from './MathView';
import { FORMULA_BOOKLET_KINEMATICS } from '../data/kinematicsContent';
import { playSound } from '../utils/soundEffects';

export const FormulaSheetModal = ({ isOpen, onClose }) => {
  const [copiedIdx, setCopiedIdx] = useState(null);

  if (!isOpen) return null;

  const handleCopy = (latex, idx) => {
    playSound('click');
    navigator.clipboard.writeText(latex);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-cyan-500/30 bg-slate-900 shadow-2xl p-5 sm:p-6 flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg text-slate-100">
                IB Physics Data Booklet: Kinematics (Section A.1)
              </h2>
              <p className="text-xs text-slate-400">
                Official formulas, definitions, and application constraints.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulas List */}
        <div className="mt-5 space-y-4 flex-1">
          {FORMULA_BOOKLET_KINEMATICS.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-800 bg-slate-950/70 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-slate-200">{item.name}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 font-mono text-base inline-block">
                  <MathView math={item.formula} />
                </div>

                <div className="text-xs text-slate-400">
                  <span className="font-medium text-slate-300">Variables: </span>
                  <MathView math={item.variables} />
                </div>

                <div className="text-[11px] text-amber-300/80 bg-amber-950/20 px-2 py-0.5 rounded border border-amber-500/20 inline-block">
                  <MathView math={item.conditions} />
                </div>
              </div>

              {/* Copy LaTeX button */}
              <button
                onClick={() => handleCopy(item.formula, idx)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 border border-slate-700 flex items-center gap-1.5 shrink-0 transition-colors"
                title="Copy LaTeX source code"
              >
                {copiedIdx === idx ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy LaTeX
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-400 shrink-0">
          Source: International Baccalaureate Organization • Physics Guide (First Assessment 2025/2026)
        </div>
      </div>
    </div>
  );
};

export default FormulaSheetModal;
