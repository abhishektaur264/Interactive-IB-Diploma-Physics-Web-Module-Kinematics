import React from 'react';
import MathView from '../components/MathView';
import CalloutBox from '../components/CalloutBox';
import MotionGraphsLab from '../components/simulations/MotionGraphsLab';
import QuizCard from '../components/QuizCard';
import { QUIZ_QUESTIONS } from '../data/kinematicsContent';
import { Activity, GitCommit, CheckCircle, BarChart3, HelpCircle } from 'lucide-react';

export const MotionGraphsSection = ({ onMarkComplete, isCompleted }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-cyan-950/40 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-mono border border-emerald-500/30 mb-3">
            <Activity className="w-3.5 h-3.5" /> Topic 1.3 • Graphical Kinematics
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-100 mb-3">
            Motion Graphs Interpretation (s-t, v-t, a-t)
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Graphical analysis bridges the gap between algebraic formulas and real-world trajectories. The slope (gradient) and the area under curve reveal instantaneous physical states.
          </p>
        </div>
      </div>

      {/* Synchronized Simulation Lab */}
      <div>
        <MotionGraphsLab />
      </div>

      {/* Core Concept 1: The Gradient & Area Mathematical Rules */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="font-heading font-bold text-xl text-slate-100 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-emerald-400" />
          1. Geometric Transformations Between Motion Graphs
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          The mathematical operations of differentiation (calculating the gradient of the tangent) and integration (calculating the area bounded by the curve and the time axis) allow seamless translation between displacement, velocity, and acceleration graphs:
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-800 my-4">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-300 font-mono">
                <th className="p-3.5">Graph Type</th>
                <th className="p-3.5 text-cyan-400">Gradient (Slope) Represents</th>
                <th className="p-3.5 text-emerald-400">Area Under Curve Represents</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-900/40">
                <td className="p-3.5 font-semibold text-slate-200">Displacement-Time (<MathView math="s" />-<MathView math="t" />)</td>
                <td className="p-3.5">
                  <strong>Instantaneous Velocity</strong>: <MathView math="v = \frac{\mathrm{d}s}{\mathrm{d}t}" />
                </td>
                <td className="p-3.5 text-slate-500 font-mono">No direct physical meaning</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="p-3.5 font-semibold text-slate-200">Velocity-Time (<MathView math="v" />-<MathView math="t" />)</td>
                <td className="p-3.5">
                  <strong>Instantaneous Acceleration</strong>: <MathView math="a = \frac{\mathrm{d}v}{\mathrm{d}t}" />
                </td>
                <td className="p-3.5 font-semibold text-emerald-300">
                  <strong>Change in Displacement</strong>: <MathView math="\Delta s = \int v\,\mathrm{d}t" />
                </td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="p-3.5 font-semibold text-slate-200">Acceleration-Time (<MathView math="a" />-<MathView math="t" />)</td>
                <td className="p-3.5">Rate of change of acceleration (Jerk)</td>
                <td className="p-3.5 font-semibold text-amber-300">
                  <strong>Change in Velocity</strong>: <MathView math="\Delta v = v_2 - v_1 = \int a\,\mathrm{d}t" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <CalloutBox type="tip" title="Examiner Tip: Tangent Lines and Non-Linear Curves">
          <p>When asked to find instantaneous velocity on a curved <MathView math="s" />-<MathView math="t" /> graph:</p>
          <ol className="list-decimal list-inside space-y-1 my-2 text-xs sm:text-sm text-slate-300">
            <li>Draw a straight tangent line at the exact time coordinate specified.</li>
            <li>Extend the tangent line as far as possible across the grid to maximize triangle dimensions.</li>
            <li>Calculate <MathView math="\text{Gradient} = \frac{\Delta s}{\Delta t}" />. Examiners allow a <MathView math="\pm 5\%" /> tolerance margin.</li>
          </ol>
        </CalloutBox>
      </div>

      {/* Core Concept 2: Interpreting Curvature & Signatures */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="font-heading font-bold text-xl text-slate-100 flex items-center gap-2">
          <GitCommit className="w-5 h-5 text-cyan-400" />
          2. Curvature, Inflection Points & Direction Changes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="font-bold text-cyan-400 block mb-1">Horizontal Flat Line on s-t</span>
            <p className="text-slate-300">Gradient is zero (<MathView math="\frac{\mathrm{d}s}{\mathrm{d}t} = 0" />). The object is completely stationary (<MathView math="v = 0" />).</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="font-bold text-emerald-400 block mb-1">Linear Straight Slope on v-t</span>
            <p className="text-slate-300">Gradient is constant. The object experiences uniform acceleration (<MathView math="a = \text{const}" />).</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="font-bold text-amber-400 block mb-1">Axis Crossing (v = 0)</span>
            <p className="text-slate-300">The object momentarily halts and reverses its spatial direction of travel.</p>
          </div>
        </div>

        <CalloutBox type="misconception" title="Misconception: Area Under v-t Below the Horizontal Axis">
          <p>
            Area located below the time axis (<MathView math="v < 0" />) represents <strong>negative displacement</strong> (backward movement). To find total distance, add the absolute values of the areas. To find net displacement, subtract the negative area from the positive area:
          </p>
          <div className="space-y-1.5 my-2">
            <MathView math="\text{Net Displacement } s = \text{Area}_{\text{above}} - \text{Area}_{\text{below}}" block={true} />
            <MathView math="\text{Total Distance } d = \text{Area}_{\text{above}} + \text{Area}_{\text{below}}" block={true} />
          </div>
        </CalloutBox>
      </div>

      {/* Quizzes */}
      <div className="space-y-4">
        <h3 className="font-heading font-bold text-xl text-slate-100">
          Check Yourself: Motion Graphs Diagnostic
        </h3>
        {QUIZ_QUESTIONS.motion_graphs.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>

      {/* Completion Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-emerald-950/40 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h4 className="font-heading font-bold text-base text-slate-100">
            Completed Topic 1.3?
          </h4>
          <p className="text-xs text-slate-400">
            Mark this section as completed to update your progress tracker.
          </p>
        </div>
        <button
          onClick={() => onMarkComplete('motion_graphs')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
            isCompleted
              ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-900/30'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          {isCompleted ? 'Section Completed ✓' : 'Mark Topic 1.3 as Complete'}
        </button>
      </div>
    </div>
  );
};

export default MotionGraphsSection;
