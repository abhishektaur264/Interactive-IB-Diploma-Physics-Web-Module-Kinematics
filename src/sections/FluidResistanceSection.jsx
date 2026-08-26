import React from 'react';
import MathView from '../components/MathView';
import CalloutBox from '../components/CalloutBox';
import TerminalVelocityLab from '../components/simulations/TerminalVelocityLab';
import QuizCard from '../components/QuizCard';
import { QUIZ_QUESTIONS } from '../data/kinematicsContent';
import { Wind, ShieldAlert, CheckCircle, Flame, Layers } from 'lucide-react';

export const FluidResistanceSection = ({ onMarkComplete, isCompleted }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-950/50 via-slate-900 to-cyan-950/40 border border-teal-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 text-xs font-mono border border-teal-500/30 mb-3">
            <Wind className="w-3.5 h-3.5" /> Topic 1.5 • Fluid Resistance & Drag
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-100 mb-3">
            Fluid Resistance & Terminal Velocity Dynamics
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            In realistic atmospheres, moving bodies collide with fluid particles, generating an opposing drag force that grows with speed until dynamic translational equilibrium is achieved.
          </p>
        </div>
      </div>

      {/* Interactive Simulation Lab */}
      <div>
        <TerminalVelocityLab />
      </div>

      {/* Core Concept 1: The Physics of Drag Forces */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="font-heading font-bold text-xl text-slate-100 flex items-center gap-2">
          <Wind className="w-5 h-5 text-teal-400" />
          1. Drag Force Regimes (Linear vs. Quadratic)
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          The mathematical relationship between speed and resistive fluid drag depends on fluid viscosity, object geometry, and flow regime:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
          {/* Stokes Drag */}
          <div className="p-4.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="font-bold text-sm text-teal-300 block mb-1">
              Stokes' Law (Low Speed / Laminar Flow)
            </span>
            <p className="text-xs text-slate-400 mb-2">
              Applies to tiny spheres moving slowly in viscous fluids (e.g. oil drop experiment):
            </p>
            <div className="p-2 rounded bg-slate-900 border border-slate-800 text-center my-1">
              <MathView math="F_d = 6\pi \eta r v \implies F_d \propto v" block={true} />
            </div>
          </div>

          {/* Quadratic Drag */}
          <div className="p-4.5 rounded-xl bg-slate-950/80 border border-teal-500/30">
            <span className="font-bold text-sm text-teal-300 block mb-1">
              Quadratic Drag (High Speed / Turbulent Flow)
            </span>
            <p className="text-xs text-slate-400 mb-2">
              Applies to skydivers, vehicles, and standard macroscopic projectiles in air:
            </p>
            <div className="p-2 rounded bg-slate-900 border border-teal-500/20 text-center my-1">
              <MathView math="F_d = \frac{1}{2} \rho C_d A v^2 \implies F_d \propto v^2" block={true} />
            </div>
          </div>
        </div>

        <CalloutBox type="definition" title="Terminal Velocity (IB Definition)" mathFormula="F_{\text{net}} = mg - F_d = 0 \implies a = 0\text{ m s}^{-2}">
          <p>
            <strong>Terminal velocity</strong> is the constant maximum speed attained by a falling body through a fluid medium when the upward drag force equals the downward weight.
          </p>
        </CalloutBox>
      </div>

      {/* Core Concept 2: Mathematical Derivation of Terminal Velocity */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="font-heading font-bold text-xl text-slate-100 flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          2. Analytical Derivation of Terminal Speed
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Applying Newton's Second Law to a falling mass <MathView math="m" /> in the presence of quadratic air resistance:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center my-2 space-y-2">
          <MathView math="F_{\text{net}} = m a = m g - \frac{1}{2}\rho C_d A v^2" block={true} />
          <MathView math="\text{At terminal velocity } v = v_t, \quad a = 0 \implies mg = \frac{1}{2}\rho C_d A v_t^2" block={true} />
          <div className="pt-2 border-t border-slate-800 text-teal-300 font-mono text-base">
            <MathView math="v_t = \sqrt{\frac{2mg}{\rho C_d A}}" block={true} />
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          <strong>Key Physical Insights from the Formula:</strong>
          <br />• Heavier objects with identical shape have higher terminal velocity (<MathView math="v_t \propto \sqrt{m}" />).
          <br />• Increasing cross-sectional area (e.g. opening a parachute from <MathView math="0.7\text{ m}^2" /> to <MathView math="25\text{ m}^2" />) reduces terminal velocity dramatically (<MathView math="v_t \propto 1/\sqrt{A}" />).
        </p>

        <CalloutBox type="misconception" title="Misconception: 'Heavier objects fall faster in a vacuum'">
          In a <strong>vacuum</strong> (zero air resistance), all objects accelerate at exactly <MathView math="g = 9.81\text{ m s}^{-2}" /> regardless of mass. Mass only affects terminal speed when <strong>air resistance is present</strong> because a larger gravitational force requires a higher speed before the drag force matches it!
        </CalloutBox>
      </div>

      {/* Quizzes */}
      <div className="space-y-4">
        <h3 className="font-heading font-bold text-xl text-slate-100">
          Check Yourself: Fluid Resistance Quizzes
        </h3>
        {QUIZ_QUESTIONS.fluid_resistance.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>

      {/* Completion Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-teal-950/40 border border-teal-500/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h4 className="font-heading font-bold text-base text-slate-100">
            Completed Topic 1.5?
          </h4>
          <p className="text-xs text-slate-400">
            Mark this section as completed to update your progress.
          </p>
        </div>
        <button
          onClick={() => onMarkComplete('fluid_resistance')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
            isCompleted
              ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:from-teal-500 hover:to-cyan-500 shadow-md shadow-teal-900/30'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          {isCompleted ? 'Section Completed ✓' : 'Mark Topic 1.5 as Complete'}
        </button>
      </div>
    </div>
  );
};

export default FluidResistanceSection;
