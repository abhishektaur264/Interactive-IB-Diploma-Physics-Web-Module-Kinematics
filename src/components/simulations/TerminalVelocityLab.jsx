import React, { useState, useEffect, useRef } from 'react';
import { Wind, Play, RotateCcw, ArrowDown, ArrowUp, ShieldAlert, CheckCircle2 } from 'lucide-react';
import MathView from '../MathView';
import { calculateTerminalVelocityModel } from '../../utils/physicsCalculations';
import { playSound } from '../../utils/soundEffects';

export const TerminalVelocityLab = () => {
  const [mass, setMass] = useState(75); // kg
  const [parachuteOpenTime, setParachuteOpenTime] = useState(12); // seconds
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(null);

  const model = calculateTerminalVelocityModel({
    mass,
    parachuteOpenTime,
    cd: 1.0,
    area: 0.7,
    airDensity: 1.225
  });

  const maxSimTime = 25; // 25s simulation duration

  const togglePlay = () => {
    playSound('click');
    if (currentTime >= maxSimTime) {
      setCurrentTime(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    playSound('click');
    setIsPlaying(false);
    setCurrentTime(0);
  };

  useEffect(() => {
    if (!isPlaying) {
      lastTimeRef.current = null;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    const loop = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const dt = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      setCurrentTime((prev) => {
        const next = prev + dt;
        if (next >= maxSimTime) {
          setIsPlaying(false);
          return maxSimTime;
        }
        return next;
      });

      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, maxSimTime]);

  // Find active interpolated state
  const points = model.points;
  const activeIdx = Math.min(
    Math.floor((currentTime / 30) * points.length),
    points.length - 1
  );
  const curState = points[activeIdx] || points[0];

  const hasParachuteDeployed = currentTime >= parachuteOpenTime;

  // SVG Chart Dimensions
  const svgW = 460;
  const svgH = 180;
  const padL = 45;
  const padR = 20;
  const padT = 20;
  const padB = 30;

  const maxV = Math.max(model.vTermPre * 1.15, 65);

  const vPath = model.points
    .filter((p) => p.t <= maxSimTime)
    .map((p, idx) => {
      const x = padL + (p.t / maxSimTime) * (svgW - padL - padR);
      const y = padT + (1 - p.v / maxV) * (svgH - padT - padB);
      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');

  const currentDotX = padL + (currentTime / maxSimTime) * (svgW - padL - padR);
  const currentDotY = padT + (1 - curState.v / maxV) * (svgH - padT - padB);
  const chuteDeployX = padL + (parachuteOpenTime / maxSimTime) * (svgW - padL - padR);

  return (
    <div className="my-8 rounded-2xl border border-teal-500/30 bg-slate-900/80 backdrop-blur-xl p-5 sm:p-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/40">
            <Wind className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-100 flex items-center gap-2">
              Fluid Resistance & Terminal Velocity Dynamics
            </h3>
            <p className="text-xs text-slate-400">
              Equilibrium condition: <MathView math="F_{\text{net}} = W - F_d = mg - \frac{1}{2}\rho C_d A v^2 = 0 \implies v_t = \sqrt{\frac{2mg}{\rho C_d A}}" />
            </p>
          </div>
        </div>
      </div>

      {/* Main Simulation View: Left = Visual Free-Body Skydiver, Right = Velocity-Time Curve */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Visual Skydiver & Dynamic Free Body Diagram */}
        <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-slate-950/80 p-4 flex flex-col items-center justify-center min-h-[260px] relative overflow-hidden">
          {/* Parachute visual */}
          <div className={`transition-all duration-500 flex flex-col items-center ${hasParachuteDeployed ? 'opacity-100 scale-100 translate-y-0' : 'opacity-20 scale-75 -translate-y-4'}`}>
            <div className="w-24 h-10 rounded-t-full bg-gradient-to-r from-red-500 via-amber-400 to-emerald-500 border border-white/40 shadow-lg"></div>
            <div className="flex justify-between w-20 text-slate-500 text-[9px] -mt-1 font-mono">
              <span>\</span><span>|</span><span>/</span>
            </div>
          </div>

          {/* Skydiver Body */}
          <div className="relative my-2">
            <div className="w-8 h-10 rounded-full bg-indigo-600 border border-indigo-300 flex items-center justify-center text-xs font-bold text-white shadow-md">
              🧍
            </div>

            {/* Upward Drag Force Arrow */}
            <div
              className="absolute bottom-full left-1/2 -translate-x-1/2 flex flex-col items-center transition-all"
              style={{
                height: `${Math.min(curState.dragForce / 12, 70)}px`,
                minHeight: '14px'
              }}
            >
              <span className="text-[10px] font-mono text-teal-300 font-bold whitespace-nowrap -mt-4">
                F_d = {curState.dragForce.toFixed(0)} N
              </span>
              <ArrowUp className="w-4 h-4 text-teal-400 -mb-1 animate-pulse" />
              <div className="w-1 bg-teal-400 flex-1 rounded"></div>
            </div>

            {/* Downward Weight Force Arrow */}
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 flex flex-col items-center transition-all"
              style={{
                height: `${Math.min(curState.weight / 12, 70)}px`,
                minHeight: '20px'
              }}
            >
              <div className="w-1 bg-rose-400 flex-1 rounded"></div>
              <ArrowDown className="w-4 h-4 text-rose-400 -mt-1" />
              <span className="text-[10px] font-mono text-rose-300 font-bold whitespace-nowrap mt-1">
                W = {curState.weight.toFixed(0)} N
              </span>
            </div>
          </div>

          {/* Dynamic Force State Badge */}
          <div className="mt-8 text-center">
            <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-medium border ${
              Math.abs(curState.netForce) < 15
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                : curState.netForce > 0
                ? 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                : 'bg-indigo-950/60 text-indigo-300 border-indigo-500/40'
            }`}>
              {Math.abs(curState.netForce) < 15
                ? '⚖️ Terminal Equilibrium (a ≈ 0)'
                : curState.netForce > 0
                ? '⬇️ Accelerating Downward (W > Fd)'
                : '⬆️ Rapid Deceleration (Fd > W)'}
            </span>
          </div>
        </div>

        {/* Velocity vs Time Graph */}
        <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-950/80 p-4">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-teal-400">Velocity vs Time [v(t)] Profile</span>
            <span className="font-mono text-[11px] text-slate-400">
              Terminal Speed: {model.terminalSpeedKmh.toFixed(1)} km/h ({model.vTermPre.toFixed(1)} m/s)
            </span>
          </div>

          <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto overflow-visible">
            {/* Parachute Open Marker Line */}
            <line
              x1={chuteDeployX}
              y1={padT}
              x2={chuteDeployX}
              y2={svgH - padB}
              stroke="#f43f5e"
              strokeDasharray="3 3"
              strokeWidth="1.5"
            />
            <text
              x={chuteDeployX + 4}
              y={padT + 12}
              fill="#f43f5e"
              fontSize="9"
              fontFamily="Inter"
              fontWeight="bold"
            >
              Parachute Deploy
            </text>

            {/* Grid and Axes */}
            <line x1={padL} y1={padT} x2={padL} y2={svgH - padB} stroke="#334155" strokeWidth="1" />
            <line x1={padL} y1={svgH - padB} x2={svgW - padR} y2={svgH - padB} stroke="#334155" strokeWidth="1" />

            {/* Labels */}
            <text x={padL - 6} y={padT + 8} fill="#94a3b8" fontSize="9" textAnchor="end" fontFamily="JetBrains Mono">
              {maxV.toFixed(0)} m/s
            </text>
            <text x={padL - 6} y={svgH - padB} fill="#94a3b8" fontSize="9" textAnchor="end" fontFamily="JetBrains Mono">
              0
            </text>
            <text x={svgW - padR} y={svgH - padB + 16} fill="#94a3b8" fontSize="9" textAnchor="end" fontFamily="JetBrains Mono">
              {maxSimTime}s
            </text>

            {/* Asymptotic Terminal Speed Reference Line */}
            <line
              x1={padL}
              y1={padT + (1 - model.vTermPre / maxV) * (svgH - padT - padB)}
              x2={chuteDeployX}
              y2={padT + (1 - model.vTermPre / maxV) * (svgH - padT - padB)}
              stroke="#0d9488"
              strokeDasharray="2 2"
              strokeWidth="1"
            />

            {/* Velocity Path */}
            <path d={vPath} fill="none" stroke="#14b8a6" strokeWidth="2.5" />

            {/* Current Position Marker */}
            <line x1={currentDotX} y1={padT} x2={currentDotX} y2={svgH - padB} stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="3 3" />
            <circle
              cx={currentDotX}
              cy={currentDotY}
              r="5"
              fill="#14b8a6"
              stroke="#ffffff"
              strokeWidth="2"
            />
          </svg>

          {/* Telemetry Strip */}
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-mono">Current Speed</span>
              <span className="font-bold font-mono text-teal-300">
                {curState.v.toFixed(1)} m/s ({(curState.v * 3.6).toFixed(0)} km/h)
              </span>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-mono">Acceleration</span>
              <span className="font-bold font-mono text-amber-300">
                {curState.accel.toFixed(2)} m/s²
              </span>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-mono">Net Force</span>
              <span className="font-bold font-mono text-cyan-300">
                {curState.netForce.toFixed(0)} N
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Sliders */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300 font-medium">Skydiver Mass (m)</span>
            <span className="font-mono text-teal-300 font-bold">{mass} kg</span>
          </div>
          <input
            type="range"
            min="50"
            max="120"
            step="1"
            value={mass}
            onChange={(e) => setMass(parseInt(e.target.value))}
            className="w-full accent-teal-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300 font-medium">Parachute Deployment Time</span>
            <span className="font-mono text-rose-300 font-bold">{parachuteOpenTime} s</span>
          </div>
          <input
            type="range"
            min="5"
            max="20"
            step="1"
            value={parachuteOpenTime}
            onChange={(e) => setParachuteOpenTime(parseInt(e.target.value))}
            className="w-full accent-rose-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Playback Control Bar */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs sm:text-sm shadow-md active:scale-95 transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            {isPlaying ? 'Pause Fall' : 'Drop Skydiver'}
          </button>

          <button
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Time: {currentTime.toFixed(1)}s / {maxSimTime}s</span>
        </div>
      </div>
    </div>
  );
};

export default TerminalVelocityLab;
