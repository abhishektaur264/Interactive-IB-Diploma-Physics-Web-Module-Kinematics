import React from 'react';
import MathView from '../components/MathView';
import CalloutBox from '../components/CalloutBox';
import SuvatSolverLab from '../components/simulations/SuvatSolverLab';
import { Cpu, CheckCircle, Lightbulb, Compass, Zap } from 'lucide-react';

export const SuvatSolverSection = ({ onMarkComplete, isCompleted }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-violet-950/50 via-slate-900 to-indigo-950/40 border border-violet-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 text-xs font-mono border border-violet-500/30 mb-3">
            <Cpu className="w-3.5 h-3.5" /> Topic 1.6 • Interactive Problem Solving
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-100 mb-3">
            Interactive SUVAT Kinematics Solver
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            The SUVAT Decision Algorithm: Identify the 3 known variables, determine which variable is completely unmentioned, and immediately select the unique formula that omits it.
          </p>
        </div>
      </div>

      {/* Interactive Solver Lab */}
      <div>
        <SuvatSolverLab />
      </div>

      {/* Pedagogical Strategy: The 30-Second SUVAT Selection Protocol */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="font-heading font-bold text-xl text-slate-100 flex items-center gap-2">
          <Zap className="w-5 h-5 text-violet-400" />
          The 4-Step IB Kinematics Problem Protocol
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="flex items-center gap-2 font-bold text-violet-300 mb-1">
              <span className="w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center font-mono text-xs">1</span>
              Define Positive Coordinate Axis
            </div>
            <p className="text-slate-300">
              Draw a clear coordinate arrow (e.g. upward = <MathView math="+" />, forward = <MathView math="+" />). Assign positive and negative signs to all vectors consistently.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="flex items-center gap-2 font-bold text-violet-300 mb-1">
              <span className="w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center font-mono text-xs">2</span>
              Write Down SUVAT Given Table
            </div>
            <p className="text-slate-300">
              List all 5 symbols (<MathView math="s, u, v, a, t" />). Insert the 3 known numerical values with appropriate signs and identify the target unknown.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="flex items-center gap-2 font-bold text-violet-300 mb-1">
              <span className="w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center font-mono text-xs">3</span>
              Select Equation by Elimination
            </div>
            <p className="text-slate-300">
              Find the one variable that is <em>neither given nor asked for</em>, and choose the formula omitting that variable.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="flex items-center gap-2 font-bold text-violet-300 mb-1">
              <span className="w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center font-mono text-xs">4</span>
              Algebra First, Substitute Last
            </div>
            <p className="text-slate-300">
              IB mark schemes award explicit marks for symbolic algebraic rearrangement before numerical substitution.
            </p>
          </div>
        </div>

        <CalloutBox type="tip" title="Formula Elimination Guide">
          <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5">
            <li>• If <MathView math="s" /> is absent <MathView math="\to" /> use <MathView math="v = u + at" /></li>
            <li>• If <MathView math="a" /> is absent <MathView math="\to" /> use <MathView math="s = \frac{u+v}{2}t" /></li>
            <li>• If <MathView math="v" /> is absent <MathView math="\to" /> use <MathView math="s = ut + \frac{1}{2}at^2" /></li>
            <li>• If <MathView math="u" /> is absent <MathView math="\to" /> use <MathView math="s = vt - \frac{1}{2}at^2" /></li>
            <li>• If <MathView math="t" /> is absent <MathView math="\to" /> use <MathView math="v^2 = u^2 + 2as" /></li>
          </ul>
        </CalloutBox>
      </div>

      {/* Completion Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-violet-950/40 border border-violet-500/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h4 className="font-heading font-bold text-base text-slate-100">
            Completed Topic 1.6?
          </h4>
          <p className="text-xs text-slate-400">
            Mark this section as completed to update your progress.
          </p>
        </div>
        <button
          onClick={() => onMarkComplete('suvat_solver')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
            isCompleted
              ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 shadow-md shadow-violet-900/30'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          {isCompleted ? 'Section Completed ✓' : 'Mark Topic 1.6 as Complete'}
        </button>
      </div>
    </div>
  );
};

export default SuvatSolverSection;
