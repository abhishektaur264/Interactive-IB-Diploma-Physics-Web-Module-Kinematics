import React, { useState } from 'react';
import { Cpu, Calculator, RotateCcw, CheckCircle2, AlertCircle, Sparkles, BookOpen } from 'lucide-react';
import MathView from '../MathView';
import { solveSuvat } from '../../utils/physicsCalculations';
import { playSound } from '../../utils/soundEffects';

const PRESET_PROBLEMS = [
  {
    name: 'Car Emergency Stop',
    description: 'A sports car travelling at 28 m/s brakes with deceleration of 7 m/s² to a stop.',
    values: { u: '28', v: '0', a: '-7', s: '', t: '' }
  },
  {
    name: 'Freefall from Stratosphere',
    description: 'Dropped from rest, accelerating under Earth gravity for 4.5 seconds.',
    values: { u: '0', a: '9.81', t: '4.5', s: '', v: '' }
  },
  {
    name: 'Bullet Penetration',
    description: 'A 350 m/s bullet embeds 0.12 m deep into a ballistic wooden block.',
    values: { u: '350', v: '0', s: '0.12', a: '', t: '' }
  },
  {
    name: 'Runway Takeoff',
    description: 'Aircraft starts from rest, accelerates at 2.2 m/s² over a 1200 m runway.',
    values: { u: '0', a: '2.2', s: '1200', v: '', t: '' }
  }
];

export const SuvatSolverLab = () => {
  const [inputs, setInputs] = useState({
    s: '',
    u: '0',
    v: '',
    a: '9.81',
    t: '3.0'
  });

  const [solution, setSolution] = useState(() => solveSuvat({ s: '', u: '0', v: '', a: '9.81', t: '3.0' }));

  const handleChange = (field, val) => {
    const nextInputs = { ...inputs, [field]: val };
    setInputs(nextInputs);
    const res = solveSuvat(nextInputs);
    setSolution(res);
  };

  const handleApplyPreset = (preset) => {
    playSound('click');
    setInputs(preset.values);
    const res = solveSuvat(preset.values);
    setSolution(res);
  };

  const handleClear = () => {
    playSound('click');
    const empty = { s: '', u: '', v: '', a: '', t: '' };
    setInputs(empty);
    setSolution(solveSuvat(empty));
  };

  return (
    <div className="my-8 rounded-2xl border border-violet-500/30 bg-slate-900/80 backdrop-blur-xl p-5 sm:p-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-violet-500/20 text-violet-400 border border-violet-500/40">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-100 flex items-center gap-2">
              Interactive SUVAT Kinematics Engine
            </h3>
            <p className="text-xs text-slate-400">
              Input any 3 variables to automatically synthesize the exact equations, calculus path, and numeric result.
            </p>
          </div>
        </div>

        <button
          onClick={handleClear}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Clear Inputs
        </button>
      </div>

      {/* Preset Problem Quick Selectors */}
      <div className="mt-4">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
          Try Classic IB Exam Scenarios:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {PRESET_PROBLEMS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(preset)}
              className="p-2.5 rounded-xl bg-slate-950/60 hover:bg-violet-950/30 border border-slate-800 hover:border-violet-500/40 text-left transition-all group"
            >
              <div className="font-semibold text-xs text-slate-200 group-hover:text-violet-300 flex items-center justify-between">
                <span>{preset.name}</span>
                <Sparkles className="w-3 h-3 text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                {preset.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* 5-Variable Interactive Input Grid */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Displacement s */}
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 focus-within:border-cyan-500 transition-colors">
          <label className="block text-xs font-mono text-cyan-400 font-semibold mb-1">
            Displacement (s)
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              placeholder="unknown"
              value={inputs.s}
              onChange={(e) => handleChange('s', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-cyan-400"
            />
            <span className="text-xs text-slate-400 font-mono">m</span>
          </div>
        </div>

        {/* Initial Velocity u */}
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 focus-within:border-blue-500 transition-colors">
          <label className="block text-xs font-mono text-blue-400 font-semibold mb-1">
            Initial Velocity (u)
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              placeholder="unknown"
              value={inputs.u}
              onChange={(e) => handleChange('u', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-blue-400"
            />
            <span className="text-xs text-slate-400 font-mono">m/s</span>
          </div>
        </div>

        {/* Final Velocity v */}
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 focus-within:border-emerald-500 transition-colors">
          <label className="block text-xs font-mono text-emerald-400 font-semibold mb-1">
            Final Velocity (v)
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              placeholder="unknown"
              value={inputs.v}
              onChange={(e) => handleChange('v', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-emerald-400"
            />
            <span className="text-xs text-slate-400 font-mono">m/s</span>
          </div>
        </div>

        {/* Acceleration a */}
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 focus-within:border-amber-500 transition-colors">
          <label className="block text-xs font-mono text-amber-400 font-semibold mb-1">
            Acceleration (a)
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              placeholder="unknown"
              value={inputs.a}
              onChange={(e) => handleChange('a', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-amber-400"
            />
            <span className="text-xs text-slate-400 font-mono">m/s²</span>
          </div>
        </div>

        {/* Time t */}
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 focus-within:border-violet-500 transition-colors col-span-2 sm:col-span-1">
          <label className="block text-xs font-mono text-violet-400 font-semibold mb-1">
            Time Duration (t)
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              placeholder="unknown"
              value={inputs.t}
              onChange={(e) => handleChange('t', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-violet-400"
            />
            <span className="text-xs text-slate-400 font-mono">s</span>
          </div>
        </div>
      </div>

      {/* Results & Derivations Display */}
      {solution.error ? (
        <div className="mt-6 p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-center gap-3 text-amber-200 text-sm">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
          <span>{solution.error}</span>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {/* Solution Summary Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-violet-950/40 to-slate-900 border border-violet-500/30">
            <div className="text-xs font-semibold text-violet-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-violet-400" /> Complete Solution Matrix:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-sm">
              <div className="p-2 rounded bg-slate-950/60 border border-cyan-500/30">
                <span className="text-[10px] text-cyan-400 block">Displacement s</span>
                <span className="font-bold text-white">{solution.result.s?.toFixed(2)} m</span>
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-blue-500/30">
                <span className="text-[10px] text-blue-400 block">Initial u</span>
                <span className="font-bold text-white">{solution.result.u?.toFixed(2)} m/s</span>
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-emerald-500/30">
                <span className="text-[10px] text-emerald-400 block">Final v</span>
                <span className="font-bold text-white">{solution.result.v?.toFixed(2)} m/s</span>
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-amber-500/30">
                <span className="text-[10px] text-amber-400 block">Acceleration a</span>
                <span className="font-bold text-white">{solution.result.a?.toFixed(2)} m/s²</span>
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-violet-500/30 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-violet-400 block">Time t</span>
                <span className="font-bold text-white">{solution.result.t?.toFixed(2)} s</span>
              </div>
            </div>
          </div>

          {/* Mathematical Step-by-Step Derivation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
              Step-by-Step Algebraic Derivation:
            </h4>
            {solution.steps?.map((step, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs sm:text-sm"
              >
                <div className="font-semibold text-slate-200 mb-1.5 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-violet-500/20 text-violet-300 font-mono text-xs flex items-center justify-center border border-violet-500/40">
                    {idx + 1}
                  </span>
                  <span>{step.name}</span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-center my-1.5">
                  <MathView math={step.formula} block={true} />
                </div>
                <div className="text-center font-mono text-violet-300 text-xs mt-1">
                  <MathView math={step.calculation} block={true} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SuvatSolverLab;
