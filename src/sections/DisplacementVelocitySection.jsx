import React from 'react';
import MathView from '../components/MathView';
import CalloutBox from '../components/CalloutBox';
import WorkedExample from '../components/WorkedExample';
import QuizCard from '../components/QuizCard';
import { WORKED_EXAMPLES, QUIZ_QUESTIONS } from '../data/kinematicsContent';
import { Compass, MoveRight, Clock, CheckCircle } from 'lucide-react';

export const DisplacementVelocitySection = ({ onMarkComplete, isCompleted }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Section Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/50 via-slate-900 to-blue-950/40 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-mono border border-cyan-500/30 mb-3">
            <Compass className="w-3.5 h-3.5" /> Topic 1.1 • Foundations
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-100 mb-3">
            Displacement, Distance & Velocity Vectors
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Kinematics is the branch of classical mechanics that describes the motion of points, bodies, and systems of bodies without considering the forces that cause them to move.
          </p>
        </div>
      </div>

      {/* Core Concept 1: Position Vectors & Coordinate Frames */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="font-heading font-bold text-xl text-slate-100 flex items-center gap-2">
          <MoveRight className="w-5 h-5 text-cyan-400" />
          1. Position Vectors and Coordinate Frames
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          To quantify motion, we establish an origin <MathView math="O" /> and an orthogonal coordinate frame. The position vector <MathView math="\vec{r}(t)" /> specifies the spatial location of a particle at time <MathView math="t" /> relative to this fixed reference point:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center my-3">
          <MathView math="\vec{r}(t) = x(t)\,\hat{i} + y(t)\,\hat{j} + z(t)\,\hat{k}" block={true} />
        </div>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          When an object moves from an initial position <MathView math="\vec{r}_1 = \vec{r}(t_1)" /> to a final position <MathView math="\vec{r}_2 = \vec{r}(t_2)" />, the change in position is termed the <strong>displacement vector</strong>:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center my-3">
          <MathView math="\Delta \vec{s} = \Delta \vec{r} = \vec{r}_2 - \vec{r}_1 = (x_2 - x_1)\,\hat{i} + (y_2 - y_1)\,\hat{j}" block={true} />
        </div>

        <CalloutBox type="definition" title="Displacement (IB Official Definition)" mathFormula="\Delta \vec{s} = \vec{r}_{\text{final}} - \vec{r}_{\text{initial}}">
          <p>
            <strong>Displacement</strong> is the change in position of an object. It is a vector quantity equal to the straight-line distance directed from the starting point to the finishing point.
          </p>
        </CalloutBox>
      </div>

      {/* Core Concept 2: Scalar vs Vector Distinction Matrix */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="font-heading font-bold text-xl text-slate-100">
          2. Distance vs. Displacement & Speed vs. Velocity
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          In physics, everyday terms have exact, unambiguous mathematical definitions. The distinction between scalar path lengths and vector state changes is a frequent source of marks in IB examinations.
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-800 my-4">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-300 font-mono">
                <th className="p-3.5">Property</th>
                <th className="p-3.5 text-cyan-400">Distance (Scalar)</th>
                <th className="p-3.5 text-emerald-400">Displacement (Vector)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-900/40">
                <td className="p-3.5 font-semibold text-slate-200">Nature</td>
                <td className="p-3.5">Magnitude only (<MathView math="d \ge 0" />)</td>
                <td className="p-3.5">Magnitude & Spatial Direction</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="p-3.5 font-semibold text-slate-200">Definition</td>
                <td className="p-3.5">Total length of actual path traversed</td>
                <td className="p-3.5">Shortest vector from origin to terminus</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="p-3.5 font-semibold text-slate-200">Closed Loop Path</td>
                <td className="p-3.5"><MathView math="d = \oint \mathrm{d}s > 0" /></td>
                <td className="p-3.5 font-mono text-emerald-300"><MathView math="\Delta \vec{s} = 0" /></td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="p-3.5 font-semibold text-slate-200">Rate Equivalent</td>
                <td className="p-3.5">Speed: <MathView math="\text{Speed} = \frac{\text{Distance}}{\Delta t}" /></td>
                <td className="p-3.5">Velocity: <MathView math="\vec{v} = \frac{\Delta \vec{s}}{\Delta t}" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <CalloutBox type="misconception" title="Misconception: 'Distance is always equal to the magnitude of displacement'" mathFormula="d_{\text{total}} \ge |\Delta \vec{s}|">
          <p>
            This is <strong>only true</strong> if the body moves strictly in a straight line without changing direction. If an object turns or reverses, the total distance traveled is strictly greater than the magnitude of displacement.
          </p>
        </CalloutBox>
      </div>

      {/* Core Concept 3: Average vs Instantaneous Rates */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="font-heading font-bold text-xl text-slate-100 flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-400" />
          3. Average vs. Instantaneous Velocity
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          While <strong>average velocity</strong> describes the net displacement achieved over an extended macroscopic time interval <MathView math="\Delta t" />, <strong>instantaneous velocity</strong> is the exact physical rate of change of position at a single infinitesimal instant <MathView math="t" />:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="text-xs font-mono text-slate-400 block mb-1">Average Velocity</span>
            <MathView math="\vec{v}_{\text{avg}} = \frac{\Delta \vec{s}}{\Delta t} = \frac{\vec{s}(t_2) - \vec{s}(t_1)}{t_2 - t_1}" block={true} />
          </div>
          <div className="p-4 rounded-xl bg-slate-950/80 border border-indigo-500/30 text-center">
            <span className="text-xs font-mono text-indigo-400 block mb-1">Instantaneous Velocity (Calculus)</span>
            <MathView math="\vec{v}(t) = \lim_{\Delta t \to 0} \frac{\Delta \vec{s}}{\Delta t} = \frac{\mathrm{d}\vec{s}}{\mathrm{d}t}" block={true} />
          </div>
        </div>

        <CalloutBox type="tip" title="IB Exam Strategy: Velocity Vector Sign Convention">
          In 1D problems, a negative velocity (<MathView math="v < 0" />) indicates motion in the negative coordinate direction (e.g. moving left or downward), whereas speed is always non-negative (<MathView math="|v| \ge 0" />).
        </CalloutBox>
      </div>

      {/* Worked Example */}
      <div>
        <h3 className="font-heading font-bold text-lg text-slate-100 mb-2">
          Step-by-Step Worked Problem Walk-Through
        </h3>
        <WorkedExample example={WORKED_EXAMPLES.displacement_velocity[0]} />
      </div>

      {/* Quizzes */}
      <div className="space-y-4">
        <h3 className="font-heading font-bold text-lg text-slate-100">
          Check Yourself: Concept Diagnostic Quizzes
        </h3>
        {QUIZ_QUESTIONS.displacement_velocity.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>

      {/* Section Completion Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-cyan-950/40 border border-cyan-500/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h4 className="font-heading font-bold text-base text-slate-100">
            Completed Topic 1.1?
          </h4>
          <p className="text-xs text-slate-400">
            Mark this section as completed to track your IB Diploma Physics study progress.
          </p>
        </div>
        <button
          onClick={() => onMarkComplete('displacement_velocity')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
            isCompleted
              ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 shadow-md shadow-cyan-900/30'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          {isCompleted ? 'Section Completed ✓' : 'Mark Topic 1.1 as Complete'}
        </button>
      </div>
    </div>
  );
};

export default DisplacementVelocitySection;
