import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, HelpCircle, Eye, EyeOff, Layers } from 'lucide-react';
import MathView from './MathView';
import { playSound } from '../utils/soundEffects';

export const WorkedExample = ({ example }) => {
  const [revealedSteps, setRevealedSteps] = useState(1);
  const [showKeyTakeaway, setShowKeyTakeaway] = useState(false);

  const totalSteps = example.steps?.length || 0;

  const handleNextStep = () => {
    if (revealedSteps < totalSteps) {
      playSound('reveal');
      setRevealedSteps(prev => prev + 1);
    } else {
      playSound('correct');
      setShowKeyTakeaway(true);
    }
  };

  const handleToggleAll = () => {
    playSound('click');
    if (revealedSteps === totalSteps && showKeyTakeaway) {
      setRevealedSteps(1);
      setShowKeyTakeaway(false);
    } else {
      setRevealedSteps(totalSteps);
      setShowKeyTakeaway(true);
    }
  };

  return (
    <div className="my-6 rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-xl p-5 sm:p-6 shadow-xl transition-all hover:border-slate-600/80">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base sm:text-lg text-slate-100">
              {example.title}
            </h3>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              {example.difficulty}
            </span>
          </div>
        </div>

        <button
          onClick={handleToggleAll}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700 hover:text-white transition-colors"
        >
          {revealedSteps === totalSteps && showKeyTakeaway ? (
            <>
              <EyeOff className="w-3.5 h-3.5" /> Collapse Steps
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" /> Reveal All Steps
            </>
          )}
        </button>
      </div>

      {/* Question Text */}
      <div className="mt-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-slate-200 text-sm sm:text-base leading-relaxed">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1">
          Problem Statement
        </div>
        <MathView math={example.question} />
      </div>

      {/* Given Data Block */}
      {example.givens && (
        <div className="mt-3 p-3.5 rounded-lg bg-cyan-950/20 border border-cyan-500/20 text-xs sm:text-sm">
          <span className="font-semibold text-cyan-400 uppercase tracking-wider text-[11px] block mb-1">
            Givens & Coordinate Axes:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
            {example.givens.map((given, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <MathView math={given} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progressive Steps */}
      <div className="mt-5 space-y-4">
        {example.steps.map((step, index) => {
          const isVisible = index < revealedSteps;
          if (!isVisible) return null;

          return (
            <div
              key={step.stepNumber}
              className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-4 sm:p-4.5 animate-fadeIn transition-all"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/40">
                    {step.stepNumber}
                  </span>
                  <h4 className="font-semibold text-sm sm:text-base text-slate-100">
                    {step.title}
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  Step {step.stepNumber} of {totalSteps}
                </span>
              </div>

              <p className="text-sm text-slate-300 mb-2.5">
                <MathView math={step.instruction} />
              </p>

              {step.latexFormula && (
                <div className="p-2.5 my-2 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
                  <MathView math={step.latexFormula} block={true} />
                </div>
              )}

              {step.calculation && (
                <div className="p-3 my-2 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-center font-mono text-sm text-indigo-200">
                  <MathView math={step.calculation} block={true} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Next Step Action Button */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
        <div className="text-xs text-slate-400 font-mono">
          Showing {Math.min(revealedSteps, totalSteps)} of {totalSteps} steps
        </div>

        {revealedSteps < totalSteps && (
          <button
            onClick={handleNextStep}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium text-sm shadow-lg shadow-cyan-900/30 active:scale-95 transition-all"
          >
            Reveal Next Step ({revealedSteps + 1}/{totalSteps})
            <ChevronDown className="w-4 h-4" />
          </button>
        )}

        {revealedSteps >= totalSteps && !showKeyTakeaway && (
          <button
            onClick={() => {
              playSound('correct');
              setShowKeyTakeaway(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-sm shadow-lg shadow-emerald-900/30 active:scale-95 transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            Show Examiner Conclusion
          </button>
        )}
      </div>

      {/* Key Takeaway Box */}
      {showKeyTakeaway && example.keyTakeaway && (
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border border-emerald-500/30 animate-fadeIn">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <CheckCircle2 className="w-4 h-4" />
            Examiner Method Mark Takeaway
          </div>
          <p className="text-sm text-slate-200 leading-relaxed">
            <MathView math={example.keyTakeaway} />
          </p>
        </div>
      )}
    </div>
  );
};

export default WorkedExample;
