import React from 'react';
import MathView from '../components/MathView';
import CalloutBox from '../components/CalloutBox';
import ProjectileLab from '../components/simulations/ProjectileLab';
import WorkedExample from '../components/WorkedExample';
import QuizCard from '../components/QuizCard';
import { WORKED_EXAMPLES, QUIZ_QUESTIONS } from '../data/kinematicsContent';
import { Crosshair, CheckCircle, Target, Sparkles } from 'lucide-react';

export const ProjectileMotionSection = ({ onMarkComplete, isCompleted }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950/50 via-slate-900 to-purple-950/40 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-mono border border-indigo-500/30 mb-3">
            <Crosshair className="w-3.5 h-3.5" /> Topic 1.4 • 2D Kinematics
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-100 mb-3">
            2D Projectile Motion Laboratory
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Projectiles experience two simultaneous, orthogonal, and completely independent motions: uniform constant-velocity motion along the horizontal, and constant gravitational acceleration along the vertical.
          </p>
        </div>
      </div>

      {/* Interactive Projectile Lab */}
      <div>
        <ProjectileLab />
      </div>

      {/* Core Concept 1: The Principle of Orthogonal Independence */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="font-heading font-bold text-xl text-slate-100 flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-400" />
          1. Resolution into Orthogonal Components
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          When an object is launched with initial speed <MathView math="u" /> at an elevation angle <MathView math="\theta" /> above the horizontal, we immediately resolve its velocity into independent horizontal and vertical components:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
          {/* Horizontal Component Box */}
          <div className="p-4.5 rounded-xl bg-slate-950/80 border border-blue-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-blue-300">Horizontal Motion (x-axis)</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">a_x = 0</span>
            </div>
            <ul className="text-xs sm:text-sm text-slate-300 space-y-2">
              <li>• Initial speed: <MathView math="u_x = u \cos\theta" /></li>
              <li>• Velocity at any time <MathView math="t" />: <MathView math="v_x(t) = u_x = u \cos\theta" /> (constant)</li>
              <li>• Horizontal displacement: <MathView math="x(t) = u_x t = (u \cos\theta) t" /></li>
            </ul>
          </div>

          {/* Vertical Component Box */}
          <div className="p-4.5 rounded-xl bg-slate-950/80 border border-emerald-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-emerald-300">Vertical Motion (y-axis)</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">a_y = -g</span>
            </div>
            <ul className="text-xs sm:text-sm text-slate-300 space-y-2">
              <li>• Initial speed: <MathView math="u_y = u \sin\theta" /></li>
              <li>• Velocity at time <MathView math="t" />: <MathView math="v_y(t) = u_y - gt = u \sin\theta - gt" /></li>
              <li>• Vertical displacement: <MathView math="y(t) = h_0 + (u \sin\theta) t - \frac{1}{2}gt^2" /></li>
            </ul>
          </div>
        </div>

        <CalloutBox type="misconception" title="Misconception: 'At the apex, acceleration is zero'">
          At the top of the trajectory, the <strong>vertical velocity</strong> is momentarily zero (<MathView math="v_y = 0" />). However, the horizontal velocity remains <MathView math="v_x = u\cos\theta" />, and the vertical acceleration remains <MathView math="a_y = -9.81\text{ m s}^{-2}" />.
        </CalloutBox>
      </div>

      {/* Core Concept 2: Key Trajectory Derivations */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="font-heading font-bold text-xl text-slate-100">
          2. Analytical Derivations for Level Launches
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          For a symmetric launch from ground level (<MathView math="h_0 = 0" />) landing at the same vertical level (<MathView math="y = 0" />), the fundamental kinematic equations yield closed-form expressions:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3 text-xs sm:text-sm">
          {/* Flight Time */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
            <span className="font-bold text-indigo-400 block mb-1">Total Time of Flight (T)</span>
            <MathView math="T = \frac{2u \sin\theta}{g}" block={true} />
            <span className="text-[11px] text-slate-400">Set <MathView math="y = 0" /> in <MathView math="y = u_y t - \frac{1}{2}gt^2" /></span>
          </div>

          {/* Peak Height */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
            <span className="font-bold text-blue-400 block mb-1">Maximum Peak Height (H)</span>
            <MathView math="H_{\text{max}} = \frac{u^2 \sin^2\theta}{2g}" block={true} />
            <span className="text-[11px] text-slate-400">Set <MathView math="v_y = 0" /> in <MathView math="v_y^2 = u_y^2 - 2gH" /></span>
          </div>

          {/* Horizontal Range */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
            <span className="font-bold text-cyan-400 block mb-1">Horizontal Range (R)</span>
            <MathView math="R = \frac{u^2 \sin 2\theta}{g}" block={true} />
            <span className="text-[11px] text-slate-400">Substitute <MathView math="T" /> into <MathView math="x = u_x T" /> with trig identity</span>
          </div>
        </div>

        <CalloutBox type="formula" title="Maximum Range Launch Angle Derivation" mathFormula="R_{\text{max}} = \frac{u^2}{g} \quad \text{at } \theta = 45^\circ">
          <p>
            Because <MathView math="\sin(2\theta)" /> achieves its maximum value of <MathView math="1" /> when <MathView math="2\theta = 90^\circ" />, the maximum horizontal range on a flat horizontal plane in a vacuum is always achieved at <strong><MathView math="\theta = 45^\circ" /></strong>.
          </p>
          <p className="text-xs text-slate-300">
            Complementary launch angles (e.g. <MathView math="30^\circ" /> and <MathView math="60^\circ" />) yield identical horizontal ranges because <MathView math="\sin(2 \times 30^\circ) = \sin(60^\circ) = \sin(120^\circ) = \sin(2 \times 60^\circ)" />.
          </p>
        </CalloutBox>
      </div>

      {/* Worked Example */}
      <div>
        <h3 className="font-heading font-bold text-xl text-slate-100 mb-2">
          Step-by-Step Worked Exam Problem
        </h3>
        <WorkedExample example={WORKED_EXAMPLES.projectile_motion[0]} />
      </div>

      {/* Quizzes */}
      <div className="space-y-4">
        <h3 className="font-heading font-bold text-xl text-slate-100">
          Check Yourself: 2D Projectile Quizzes
        </h3>
        {QUIZ_QUESTIONS.projectile_motion.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>

      {/* Completion Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-indigo-500/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h4 className="font-heading font-bold text-base text-slate-100">
            Completed Topic 1.4?
          </h4>
          <p className="text-xs text-slate-400">
            Mark this section as completed to update your progress.
          </p>
        </div>
        <button
          onClick={() => onMarkComplete('projectile_motion')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
            isCompleted
              ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-900/30'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          {isCompleted ? 'Section Completed ✓' : 'Mark Topic 1.4 as Complete'}
        </button>
      </div>
    </div>
  );
};

export default ProjectileMotionSection;
