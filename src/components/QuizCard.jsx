import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Award, Lightbulb } from 'lucide-react';
import confetti from 'canvas-confetti';
import MathView from './MathView';
import { playSound } from '../utils/soundEffects';

export const QuizCard = ({ quiz, onComplete }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const isCorrect = selectedOption !== null && quiz.options.find(o => o.id === selectedOption)?.isCorrect;

  const handleSelect = (optionId) => {
    if (isSubmitted) return;
    playSound('click');
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsSubmitted(true);
    const correct = quiz.options.find(o => o.id === selectedOption)?.isCorrect;
    
    if (correct) {
      playSound('correct');
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#38bdf8', '#34d399', '#818cf8']
      });
      if (onComplete) onComplete(true);
    } else {
      playSound('wrong');
      if (onComplete) onComplete(false);
    }
  };

  const handleReset = () => {
    playSound('click');
    setSelectedOption(null);
    setIsSubmitted(false);
    setShowHint(false);
  };

  return (
    <div className="my-6 rounded-2xl border border-slate-700/60 bg-slate-900/70 backdrop-blur-xl p-5 sm:p-6 shadow-xl transition-all">
      {/* Quiz Header Badge */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <HelpCircle className="w-4 h-4" />
          </span>
          <span className="font-heading font-semibold text-sm text-slate-200">
            Check Yourself • Concept Check
          </span>
        </div>

        {isSubmitted && (
          <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-medium flex items-center gap-1.5 border ${
            isCorrect
              ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
              : 'bg-rose-950/60 text-rose-300 border-rose-500/40'
          }`}>
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Correct (+1)
              </>
            ) : (
              <>
                <XCircle className="w-3.5 h-3.5 text-rose-400" /> Incorrect
              </>
            )}
          </span>
        )}
      </div>

      {/* Question */}
      <div className="mt-4 text-sm sm:text-base font-medium text-slate-100 leading-relaxed">
        <MathView math={quiz.question} />
      </div>

      {/* Options List */}
      <div className="mt-4 space-y-2.5">
        {quiz.options.map((option) => {
          const isChosen = selectedOption === option.id;
          let optionStyles = 'border-slate-800 bg-slate-950/50 hover:bg-slate-800/50 text-slate-300';

          if (isSubmitted) {
            if (option.isCorrect) {
              optionStyles = 'border-emerald-500/60 bg-emerald-950/40 text-emerald-200 font-medium shadow-[0_0_15px_rgba(16,185,129,0.15)]';
            } else if (isChosen && !option.isCorrect) {
              optionStyles = 'border-rose-500/60 bg-rose-950/40 text-rose-200 font-medium';
            } else {
              optionStyles = 'border-slate-800/40 bg-slate-950/30 text-slate-500 opacity-60';
            }
          } else if (isChosen) {
            optionStyles = 'border-cyan-500 bg-cyan-950/30 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.15)]';
          }

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={isSubmitted}
              className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-start gap-3 text-sm cursor-pointer disabled:cursor-default ${optionStyles}`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-semibold shrink-0 mt-0.5 border ${
                isSubmitted && option.isCorrect
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                  : isSubmitted && isChosen && !option.isCorrect
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                  : isChosen
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}>
                {option.id.toUpperCase()}
              </span>

              <div className="flex-1">
                <MathView math={option.text} />
              </div>

              {isSubmitted && option.isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              )}
              {isSubmitted && isChosen && !option.isCorrect && (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex items-center justify-between gap-3 pt-3 border-t border-slate-800">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-medium text-sm shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Try Again
          </button>
        )}

        {quiz.examinerTip && (
          <button
            onClick={() => {
              playSound('click');
              setShowHint(!showHint);
            }}
            className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 transition-colors"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            {showHint ? 'Hide Examiner Insight' : 'View Examiner Insight'}
          </button>
        )}
      </div>

      {/* Explanation Box upon submit */}
      {isSubmitted && (
        <div className="mt-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed animate-fadeIn">
          <div className="font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
            <span>Pedagogical Analysis:</span>
          </div>
          <MathView math={quiz.explanation} />
        </div>
      )}

      {/* Hint / Examiner Tip */}
      {showHint && quiz.examinerTip && (
        <div className="mt-3 p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 animate-fadeIn">
          <span className="font-semibold text-amber-300 block mb-0.5">Examiner Strategy:</span>
          <MathView math={quiz.examinerTip} />
        </div>
      )}
    </div>
  );
};

export default QuizCard;
