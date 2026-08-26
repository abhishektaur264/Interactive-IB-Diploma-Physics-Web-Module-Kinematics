import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Activity, Info, FastForward } from 'lucide-react';
import MathView from '../MathView';
import { MOTION_PRESETS } from '../../utils/physicsCalculations';
import { playSound } from '../../utils/soundEffects';

export const MotionGraphsLab = () => {
  const [selectedPresetKey, setSelectedPresetKey] = useState('multiphase_journey');
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const animationRef = useRef(null);
  const lastTimestampRef = useRef(null);

  const preset = MOTION_PRESETS[selectedPresetKey];
  const maxTime = preset.totalTime;

  // Handle Play/Pause
  const togglePlay = () => {
    playSound('click');
    if (currentTime >= maxTime) {
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
      lastTimestampRef.current = null;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    const animate = (timestamp) => {
      if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
      const deltaTime = (timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      setCurrentTime((prev) => {
        const next = prev + deltaTime * playbackSpeed;
        if (next >= maxTime) {
          setIsPlaying(false);
          return maxTime;
        }
        return next;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, maxTime, playbackSpeed]);

  // Current values
  const curState = preset.eval(currentTime);

  // Generate curve data points for SVG rendering
  const samplePoints = 120;
  const sPoints = [];
  const vPoints = [];
  const aPoints = [];

  let sMin = 0, sMax = 1;
  let vMin = 0, vMax = 1;
  let aMin = -10, aMax = 10;

  for (let i = 0; i <= samplePoints; i++) {
    const t = (i / samplePoints) * maxTime;
    const { s, v, a } = preset.eval(t);
    sPoints.push({ t, val: s });
    vPoints.push({ t, val: v });
    aPoints.push({ t, val: a });

    if (s < sMin) sMin = s;
    if (s > sMax) sMax = s;
    if (v < vMin) vMin = v;
    if (v > vMax) vMax = v;
    if (a < aMin) aMin = a;
    if (a > aMax) aMax = a;
  }

  // Padding
  sMax = sMax === 0 ? 10 : sMax * 1.15;
  vMax = Math.max(vMax * 1.15, 5);
  vMin = Math.min(vMin * 1.15, -5);
  aMax = Math.max(aMax * 1.2, 5);
  aMin = Math.min(aMin * 1.2, -5);

  const svgWidth = 400;
  const svgHeight = 160;
  const padL = 45;
  const padR = 15;
  const padT = 20;
  const padB = 25;

  const getSvgPath = (points, yMin, yMax) => {
    return points
      .map((p, i) => {
        const x = padL + (p.t / maxTime) * (svgWidth - padL - padR);
        const y = padT + (1 - (p.val - yMin) / (yMax - yMin)) * (svgHeight - padT - padB);
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  };

  const getAreaSvgPath = (points, yMin, yMax, tLimit) => {
    const filtered = points.filter(p => p.t <= tLimit);
    if (filtered.length === 0) return '';
    const baselineY = padT + (1 - (0 - yMin) / (yMax - yMin)) * (svgHeight - padT - padB);
    const startX = padL;
    const endX = padL + (tLimit / maxTime) * (svgWidth - padL - padR);

    const pathData = filtered.map((p, i) => {
      const x = padL + (p.t / maxTime) * (svgWidth - padL - padR);
      const y = padT + (1 - (p.val - yMin) / (yMax - yMin)) * (svgHeight - padT - padB);
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');

    return `${pathData} L ${endX.toFixed(1)} ${baselineY.toFixed(1)} L ${startX.toFixed(1)} ${baselineY.toFixed(1)} Z`;
  };

  const currentX = padL + (currentTime / maxTime) * (svgWidth - padL - padR);

  return (
    <div className="my-8 rounded-2xl border border-cyan-500/30 bg-slate-900/80 backdrop-blur-xl p-5 sm:p-6 shadow-2xl">
      {/* Simulation Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-100 flex items-center gap-2">
              Synchronized Motion Graphs Visualizer
            </h3>
            <p className="text-xs text-slate-400">
              Interactive comparative dynamics: <MathView math="s(t), v(t), a(t)" /> with live gradient & integral visualization.
            </p>
          </div>
        </div>

        {/* Preset Selector */}
        <select
          value={selectedPresetKey}
          onChange={(e) => {
            playSound('click');
            setSelectedPresetKey(e.target.value);
            setCurrentTime(0);
            setIsPlaying(false);
          }}
          aria-label="Select motion preset scenario"
          className="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm font-medium text-cyan-300 focus:outline-none focus:border-cyan-400"
        >
          {Object.entries(MOTION_PRESETS).map(([key, item]) => (
            <option key={key} value={key} className="bg-slate-900 text-slate-200">
              {item.title}
            </option>
          ))}
        </select>
      </div>

      {/* Preset Description */}
      <div className="mt-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-200">{preset.title}: </span>
          {preset.description}
        </div>
      </div>

      {/* Telemetry Dashboard */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
          <span className="text-[11px] font-mono text-slate-400 block uppercase">Time Elapsed</span>
          <span className="text-lg sm:text-xl font-bold font-mono text-cyan-300">
            {currentTime.toFixed(2)} <span className="text-xs text-slate-400">s</span>
          </span>
        </div>
        <div className="p-3 rounded-xl bg-slate-950/80 border border-blue-500/20 text-center">
          <span className="text-[11px] font-mono text-blue-400 block uppercase">Displacement s(t)</span>
          <span className="text-lg sm:text-xl font-bold font-mono text-blue-300">
            {curState.s.toFixed(2)} <span className="text-xs text-slate-400">m</span>
          </span>
        </div>
        <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/20 text-center">
          <span className="text-[11px] font-mono text-emerald-400 block uppercase">Velocity v(t)</span>
          <span className="text-lg sm:text-xl font-bold font-mono text-emerald-300">
            {curState.v.toFixed(2)} <span className="text-xs text-slate-400">m/s</span>
          </span>
        </div>
        <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/20 text-center">
          <span className="text-[11px] font-mono text-amber-400 block uppercase">Acceleration a(t)</span>
          <span className="text-lg sm:text-xl font-bold font-mono text-amber-300">
            {curState.a.toFixed(2)} <span className="text-xs text-slate-400">m/s²</span>
          </span>
        </div>
      </div>

      {/* Synchronized 3-Graph View */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Displacement s-t Graph */}
        <div className="rounded-xl border border-blue-500/30 bg-slate-950/70 p-3 relative">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-blue-400">Displacement vs Time (s-t)</span>
            <span className="text-[10px] font-mono text-slate-400">Slope = v</span>
          </div>
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-visible">
            {/* Grid & axes */}
            <line x1={padL} y1={padT} x2={padL} y2={svgHeight - padB} stroke="#334155" strokeWidth="1" />
            <line x1={padL} y1={svgHeight - padB} x2={svgWidth - padR} y2={svgHeight - padB} stroke="#334155" strokeWidth="1" />
            
            {/* Y axis labels */}
            <text x={padL - 6} y={padT + 8} fill="#94a3b8" fontSize="9" textAnchor="end" fontFamily="JetBrains Mono">{sMax.toFixed(0)}m</text>
            <text x={padL - 6} y={svgHeight - padB} fill="#94a3b8" fontSize="9" textAnchor="end" fontFamily="JetBrains Mono">{sMin.toFixed(0)}</text>
            
            {/* Main Curve */}
            <path d={getSvgPath(sPoints, sMin, sMax)} fill="none" stroke="#38bdf8" strokeWidth="2.5" />
            
            {/* Current Cursor Line & Dot */}
            <line x1={currentX} y1={padT} x2={currentX} y2={svgHeight - padB} stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle
              cx={currentX}
              cy={padT + (1 - (curState.s - sMin) / (sMax - sMin)) * (svgHeight - padT - padB)}
              r="4.5"
              fill="#38bdf8"
              stroke="#ffffff"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Velocity v-t Graph */}
        <div className="rounded-xl border border-emerald-500/30 bg-slate-950/70 p-3 relative">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-emerald-400">Velocity vs Time (v-t)</span>
            <span className="text-[10px] font-mono text-slate-400">Area = Δs | Slope = a</span>
          </div>
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-visible">
            {/* Zero axis line */}
            {vMin < 0 && (
              <line
                x1={padL}
                y1={padT + (1 - (0 - vMin) / (vMax - vMin)) * (svgHeight - padT - padB)}
                x2={svgWidth - padR}
                y2={padT + (1 - (0 - vMin) / (vMax - vMin)) * (svgHeight - padT - padB)}
                stroke="#475569"
                strokeDasharray="2 2"
                strokeWidth="1"
              />
            )}
            <line x1={padL} y1={padT} x2={padL} y2={svgHeight - padB} stroke="#334155" strokeWidth="1" />
            <line x1={padL} y1={svgHeight - padB} x2={svgWidth - padR} y2={svgHeight - padB} stroke="#334155" strokeWidth="1" />
            
            {/* Shaded Area Under Curve up to currentTime */}
            <path
              d={getAreaSvgPath(vPoints, vMin, vMax, currentTime)}
              fill="rgba(16, 185, 129, 0.25)"
            />

            {/* Main Curve */}
            <path d={getSvgPath(vPoints, vMin, vMax)} fill="none" stroke="#10b981" strokeWidth="2.5" />
            
            {/* Current Cursor Line & Dot */}
            <line x1={currentX} y1={padT} x2={currentX} y2={svgHeight - padB} stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle
              cx={currentX}
              cy={padT + (1 - (curState.v - vMin) / (vMax - vMin)) * (svgHeight - padT - padB)}
              r="4.5"
              fill="#10b981"
              stroke="#ffffff"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Acceleration a-t Graph */}
        <div className="rounded-xl border border-amber-500/30 bg-slate-950/70 p-3 relative">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-amber-400">Acceleration vs Time (a-t)</span>
            <span className="text-[10px] font-mono text-slate-400">Area = Δv</span>
          </div>
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-visible">
            {/* Zero axis line */}
            <line
              x1={padL}
              y1={padT + (1 - (0 - aMin) / (aMax - aMin)) * (svgHeight - padT - padB)}
              x2={svgWidth - padR}
              y2={padT + (1 - (0 - aMin) / (aMax - aMin)) * (svgHeight - padT - padB)}
              stroke="#475569"
              strokeDasharray="2 2"
              strokeWidth="1"
            />
            <line x1={padL} y1={padT} x2={padL} y2={svgHeight - padB} stroke="#334155" strokeWidth="1" />
            <line x1={padL} y1={svgHeight - padB} x2={svgWidth - padR} y2={svgHeight - padB} stroke="#334155" strokeWidth="1" />
            
            {/* Main Curve */}
            <path d={getSvgPath(aPoints, aMin, aMax)} fill="none" stroke="#f59e0b" strokeWidth="2.5" />
            
            {/* Current Cursor Line & Dot */}
            <line x1={currentX} y1={padT} x2={currentX} y2={svgHeight - padB} stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle
              cx={currentX}
              cy={padT + (1 - (curState.a - aMin) / (aMax - aMin)) * (svgHeight - padT - padB)}
              r="4.5"
              fill="#f59e0b"
              stroke="#ffffff"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      {/* Playback Controls & Time Scrubber */}
      <div className="mt-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="p-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium shadow-md active:scale-95 transition-all"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
          </button>
          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Scrubber slider */}
        <div className="flex-1 w-full flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400">0s</span>
          <input
            type="range"
            min="0"
            max={maxTime}
            step="0.05"
            value={currentTime}
            onChange={(e) => {
              setIsPlaying(false);
              setCurrentTime(parseFloat(e.target.value));
            }}
            className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
          />
          <span className="text-xs font-mono text-slate-400">{maxTime}s</span>
        </div>

        {/* Speed toggle */}
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <span className="text-slate-400">Speed:</span>
          {[0.5, 1, 2].map((spd) => (
            <button
              key={spd}
              onClick={() => {
                playSound('click');
                setPlaybackSpeed(spd);
              }}
              className={`px-2 py-1 rounded ${
                playbackSpeed === spd
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MotionGraphsLab;
