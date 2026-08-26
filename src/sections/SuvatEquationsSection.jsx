import React, { useState } from 'react';
import MathView from '../components/MathView';
import CalloutBox from '../components/CalloutBox';
import WorkedExample from '../components/WorkedExample';
import QuizCard from '../components/QuizCard';
import { WORKED_EXAMPLES, QUIZ_QUESTIONS } from '../data/kinematicsContent';
import { TrendingUp, ChevronRight, CheckCircle, Flame, Layers } from 'lucide-react';
import { playSound } from '../utils/soundEffects';

export const SuvatEquationsSection = ({ onMarkComplete, isCompleted }) => {
  const [activeProofTab, setActiveProofTab] = useState(0);

  const PROOFS = [
    {
      title: '1. Equation 1: Final Velocity v = u + at',
      badge: 'Algebraic & Calculus Proof',
      content: `
By definition, acceleration is the time derivative of velocity:
$$a = \\frac{\\mathrm{d}v}{\\mathrm{d}t}$$

Separating variables and integrating both sides from initial velocity $u$ (at $t = 0$) to final velocity $v$ (at time $t$), assuming constant $a$:
$$\\int_{u}^{v} \\mathrm{d}v = \\int_{0}^{t} a \\,\\mathrm{d}t = a \\int_{0}^{t} \\mathrm{d}t$$
$$v - u = at \\implies v = u + at$$
      `
    },
    {
      title: '2. Equation 2: Average Velocity Displacement s = ½(u + v)t',
      badge: 'Geometric Trapezoid Proof',
      content: `
On a velocity-time ($v$-$t$) graph with uniform acceleration, the area under the linear curve between $t = 0$ and $t$ represents displacement $\\Delta s$.

The region forms a trapezoid with parallel vertical bases of height $u$ and $v$, and width $t$:
$$\\text{Area of Trapezoid} = \\frac{\\text{Base}_1 + \\text{Base}_2}{2} \\times \\text{Height}$$
$$s = \\left(\\frac{u + v}{2}\\right)t$$
      `
    },
    {
      title: '3. Equation 3: Displacement s = ut + ½at²',
      badge: 'Calculus / Substitution Proof',
      content: `
Substitute Equation 1 ($v = u + at$) into Equation 2:
$$s = \\frac{u + (u + at)}{2}t = \\frac{2u + at}{2}t$$
$$s = ut + \\frac{1}{2}at^2$$

Alternatively, by calculus integration:
$$s(t) = \\int_{0}^{t} v(t')\\,\\mathrm{d}t' = \\int_{0}^{t} (u + at')\\,\\mathrm{d}t' = \\left[ ut' + \\frac{1}{2}at'^2 \\right]_0^t = ut + \\frac{1}{2}at^2$$
      `
    },
    {
      title: '4. Equation 4: Timeless Relation v² = u² + 2as',
      badge: 'Chain Rule / Algebraic Elimination',
      content: `
From Equation 1, express time as $t = \\frac{v - u}{a}$ and substitute into Equation 2:
$$s = \\left(\\frac{u + v}{2}\\right)\\left(\\frac{v - u}{a}\\right) = \\frac{v^2 - u^2}{2a}$$

Multiplying both sides by $2a$ and rearranging yields the timeless kinematic formula:
$$2as = v^2 - u^2 \\implies v^2 = u^2 + 2as$$
      `
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Section Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/50 via-slate-900 to-indigo-950/40 border border-blue-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-mono border border-blue-500/30 mb-3">
            <TrendingUp className="w-3.5 h-3.5" /> Topic 1.2 • Uniform Acceleration
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-100 mb-3">
            Uniform Acceleration & Rigorous SUVAT Derivations
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            When acceleration is constant, the calculus differential equations integrate into the foundational SUVAT equations of motion.
          </p>
        </div>
      </div>

      {/* Core Concept 1: Definition of Acceleration */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="font-heading font-bold text-xl text-slate-100">
          1. Acceleration as a Vector Rate of Change
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Acceleration is defined as the rate at which velocity changes with respect to time. It is a vector quantity measured in SI units of meters per second squared (<MathView math="\text{m s}^{-2}" />):
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="text-xs font-mono text-slate-400 block mb-1">Average Acceleration</span>
            <MathView math="\vec{a}_{\text{avg}} = \\frac{\\Delta \\vec{v}}{\\Delta t} = \\frac{\\vec{v} - \\vec{u}}{t}" block={true} />
          </div>
          <div className="p-4 rounded-xl bg-slate-950/80 border border-blue-500/30 text-center">
            <span className="text-xs font-mono text-blue-400 block mb-1">Instantaneous Acceleration (Calculus)</span>
            <MathView math="\vec{a}(t) = \\frac{\\mathrm{d}\\vec{v}}{\\mathrm{d}t} = \\frac{\\mathrm{d}^2\\vec{s}}{\\mathrm{d}t^2}" block={true} />
          </div>
        </div>

        <CalloutBox type="misconception" title="Misconception: 'Deceleration always means negative acceleration'">
          <p>
            Whether negative acceleration causes an object to speed up or slow down depends entirely on the direction of velocity:
          </p>
          <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 mt-2">
            <li>• If <MathView math="\vec{v} > 0" /> and <MathView math="\vec{a} < 0" />, the body is <strong>slowing down</strong> (decelerating).</li>
            <li>• If <MathView math="\vec{v} < 0" /> and <MathView math="\vec{a} < 0" />, the body is <strong>speeding up in the negative direction</strong>!</li>
          </ul>
        </CalloutBox>
      </div>

      {/* Core Concept 2: Interactive Derivation Tabs */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-heading font-bold text-xl text-slate-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-400" />
              2. Rigorous Derivations of the 5 SUVAT Equations
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select any tab below to inspect the formal algebraic and calculus derivations.
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 pt-2 border-b border-slate-800">
          {PROOFS.map((proof, idx) => (
            <button
              key={idx}
              onClick={() => {
                playSound('click');
                setActiveProofTab(idx);
              }}
              className={`px-3.5 py-2 rounded-t-xl text-xs font-mono font-medium transition-all ${
                activeProofTab === idx
                  ? 'bg-blue-950/60 text-blue-300 border-t-2 border-blue-400 border-x border-slate-800'
                  : 'bg-slate-900/40 text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              Eq {idx + 1}
            </button>
          ))}
        </div>

        {/* Active Tab Derivation Content */}
        <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 animate-fadeIn">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-heading font-bold text-base text-slate-100">
              {PROOFS[activeProofTab].title}
            </h3>
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
              {PROOFS[activeProofTab].badge}
            </span>
          </div>

          <div className="text-slate-300 text-sm leading-relaxed space-y-3">
            <MathView math={PROOFS[activeProofTab].content} />
          </div>
        </div>

        <CalloutBox type="formula" title="IB Physics Data Booklet Formula Matrix" mathFormula="v = u + at \qquad s = \frac{u+v}{2}t \qquad s = ut + \frac{1}{2}at^2 \qquad s = vt - \frac{1}{2}at^2 \qquad v^2 = u^2 + 2as">
          <p>
            These equations form the complete set of kinematic relations for constant acceleration. Each equation omits exactly one of the 5 variables (<MathView math="s, u, v, a, t" />).
          </p>
        </CalloutBox>
      </div>

      {/* Free-Fall Gravitational Acceleration */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="font-heading font-bold text-xl text-slate-100 flex items-center gap-2">
          <Flame className="w-5 h-5 text-amber-400" />
          3. Free Fall in a Uniform Gravitational Field
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          In the absence of air resistance, all objects near Earth's surface accelerate downwards at the same constant rate, regardless of mass, composition, or shape. This standard acceleration due to gravity is denoted by <MathView math="g" />:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/30 text-center my-3">
          <MathView math="g = 9.81\text{ m s}^{-2} \quad (\approx 9.8\text{ m s}^{-2})" block={true} />
        </div>

        <CalloutBox type="tip" title="Examiner Tip: Coordinate Consistency in Vertical Motion">
          <p>
            If upward is chosen as positive (<MathView math="+y" />), then the gravitational acceleration must be written as <MathView math="a = -g = -9.81\text{ m s}^{-2}" />. At the peak of vertical flight, instantaneous velocity <MathView math="v = 0" />, but acceleration is <strong>still <MathView math="-9.81\text{ m s}^{-2}" /></strong>.
          </p>
        </CalloutBox>
      </div>

      {/* Worked Examples */}
      <div className="space-y-6">
        <h3 className="font-heading font-bold text-xl text-slate-100">
          Worked Examples: Master IB Paper 2 Calculations
        </h3>
        {WORKED_EXAMPLES.suvat_equations.map((example) => (
          <WorkedExample key={example.id} example={example} />
        ))}
      </div>

      {/* Quizzes */}
      <div className="space-y-4">
        <h3 className="font-heading font-bold text-xl text-slate-100">
          Check Yourself: SUVAT Mastery Quizzes
        </h3>
        {QUIZ_QUESTIONS.suvat_equations.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>

      {/* Section Completion Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-blue-950/40 border border-blue-500/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h4 className="font-heading font-bold text-base text-slate-100">
            Completed Topic 1.2?
          </h4>
          <p className="text-xs text-slate-400">
            Mark this section as completed to update your progress.
          </p>
        </div>
        <button
          onClick={() => onMarkComplete('suvat_equations')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
            isCompleted
              ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-900/30'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          {isCompleted ? 'Section Completed ✓' : 'Mark Topic 1.2 as Complete'}
        </button>
      </div>
    </div>
  );
};

export default SuvatEquationsSection;
