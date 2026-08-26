import React, { useState } from 'react';
import MathView from '../components/MathView';
import CalloutBox from '../components/CalloutBox';
import QuizCard from '../components/QuizCard';
import { FORMULA_BOOKLET_KINEMATICS } from '../data/kinematicsContent';
import { Award, CheckCircle, HelpCircle, RotateCcw, Sparkles, Printer, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/soundEffects';

const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag_1',
    question: 'A vehicle starts from rest and accelerates uniformly at 3.0 m s⁻² for 6.0 s, then continues at constant speed for 10.0 s. What is the total distance traveled during the 16.0 s motion?',
    options: [
      { id: 'a', text: '54 m', isCorrect: false },
      { id: 'b', text: '180 m', isCorrect: false },
      { id: 'c', text: '234 m', isCorrect: true },
      { id: 'd', text: '288 m', isCorrect: false }
    ],
    explanation: 'Phase 1: $s_1 = ut + \\frac{1}{2}at^2 = 0 + \\frac{1}{2}(3)(6)^2 = 54\\text{ m}$. Speed reached is $v = u + at = 0 + (3)(6) = 18\\text{ m s}^{-1}$. Phase 2: $s_2 = v \\times t_2 = 18 \\times 10 = 180\\text{ m}$. Total distance $s = 54 + 180 = 234\\text{ m}$.',
    examinerTip: 'Break multi-stage problems into discrete intervals. The final velocity of phase 1 becomes the initial velocity of phase 2.'
  },
  {
    id: 'diag_2',
    question: 'A projectile is launched from ground level with speed 40.0 m/s at 30.0° to the horizontal. Taking g = 9.81 m s⁻², what is the total horizontal range in a vacuum?',
    options: [
      { id: 'a', text: '141.2 m', isCorrect: true },
      { id: 'b', text: '81.5 m', isCorrect: false },
      { id: 'c', text: '163.1 m', isCorrect: false },
      { id: 'd', text: '20.4 m', isCorrect: false }
    ],
    explanation: 'Using the level range formula: $R = \\frac{u^2 \\sin 2\\theta}{g} = \\frac{(40.0)^2 \\sin(60.0^\\circ)}{9.81} = \\frac{1600 \\times 0.8660}{9.81} = 141.2\\text{ m}$.',
    examinerTip: 'Ensure your calculator is in DEGREE mode for trigonometry.'
  },
  {
    id: 'diag_3',
    question: 'The displacement of an object as a function of time is given by s(t) = 4t² - 3t + 2. What is its acceleration at t = 3.0 s?',
    options: [
      { id: 'a', text: '21 m s⁻²', isCorrect: false },
      { id: 'b', text: '8.0 m s⁻²', isCorrect: true },
      { id: 'c', text: '24 m s⁻²', isCorrect: false },
      { id: 'd', text: '0 m s⁻²', isCorrect: false }
    ],
    explanation: 'Velocity $v(t) = \\frac{\\mathrm{d}s}{\\mathrm{d}t} = 8t - 3$. Acceleration $a(t) = \\frac{\\mathrm{d}v}{\\mathrm{d}t} = 8.0\\text{ m s}^{-2}$ (constant for all $t$).',
    examinerTip: 'Take the second derivative with respect to time.'
  }
];

export const ExamReviewSection = ({ onMarkComplete, isCompleted }) => {
  const [completedScores, setCompletedScores] = useState({});

  const handleQuizResult = (quizId, isCorrect) => {
    setCompletedScores(prev => ({ ...prev, [quizId]: isCorrect }));
  };

  const totalScore = Object.values(completedScores).filter(Boolean).length;
  const totalAttempted = Object.keys(completedScores).length;

  const handlePrint = () => {
    playSound('click');
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/50 via-slate-900 to-rose-950/40 border border-amber-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-mono border border-amber-500/30 mb-3">
            <Award className="w-3.5 h-3.5" /> Topic 1.7 • Summative Review
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-100 mb-3">
            Chapter Review & Diagnostic Assessment
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Consolidate your mastery of kinematics with examiner tips, diagnostic scoring, and the complete IB Physics Data Booklet reference.
          </p>
        </div>
      </div>

      {/* Diagnostic Exam Block */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h2 className="font-heading font-bold text-xl text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Diagnostic IB Exam Challenge
            </h2>
            <p className="text-xs text-slate-400">
              Test yourself under exam conditions to verify your conceptual command.
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-amber-300">
            Score: {totalScore} / {DIAGNOSTIC_QUESTIONS.length}
          </div>
        </div>

        <div className="space-y-4 pt-2">
          {DIAGNOSTIC_QUESTIONS.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              onComplete={(isCorrect) => handleQuizResult(quiz.id, isCorrect)}
            />
          ))}
        </div>
      </div>

      {/* Complete Printable Formula Cheat Sheet */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h2 className="font-heading font-bold text-xl text-slate-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              Complete Kinematics Formula Summary Sheet
            </h2>
            <p className="text-xs text-slate-400">
              Official IB Physics data booklet relationships and constraints.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium transition-colors no-print"
          >
            <Printer className="w-4 h-4 text-cyan-400" />
            Print / Save PDF
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
          {FORMULA_BOOKLET_KINEMATICS.map((f, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between gap-2"
            >
              <div>
                <span className="font-semibold text-xs text-slate-300 block mb-1">{f.name}</span>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 font-mono text-sm text-center">
                  <MathView math={f.formula} block={true} />
                </div>
              </div>
              <div className="text-[11px] text-slate-400">
                <span className="font-medium text-slate-300">Conditions: </span>
                <MathView math={f.conditions} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completion Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-amber-950/40 border border-amber-500/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h4 className="font-heading font-bold text-base text-slate-100">
            Finished Entire Chapter 1?
          </h4>
          <p className="text-xs text-slate-400">
            Congratulations on completing the IB Physics Kinematics interactive micro-learning module!
          </p>
        </div>
        <button
          onClick={() => {
            playSound('correct');
            confetti({
              particleCount: 120,
              spread: 90,
              origin: { y: 0.5 }
            });
            onMarkComplete('exam_review');
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
            isCompleted
              ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-gradient-to-r from-amber-500 to-rose-600 text-white hover:from-amber-400 hover:to-rose-500 shadow-md shadow-amber-900/30'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          {isCompleted ? 'All Topics Mastered! 🏆' : 'Mark All Topics as Complete'}
        </button>
      </div>
    </div>
  );
};

export default ExamReviewSection;
