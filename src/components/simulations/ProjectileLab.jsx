import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Crosshair, Wind, Sparkles, Target, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import MathView from '../MathView';
import { calculateProjectileTrajectory } from '../../utils/physicsCalculations';
import { playSound } from '../../utils/soundEffects';

const CELESTIAL_GRAVITIES = [
  { name: 'Earth', g: 9.81 },
  { name: 'Moon', g: 1.62 },
  { name: 'Mars', g: 3.71 },
  { name: 'Jupiter', g: 24.79 }
];

export const ProjectileLab = () => {
  const [angle, setAngle] = useState(45);
  const [velocity, setVelocity] = useState(25);
  const [initialHeight, setInitialHeight] = useState(10);
  const [gravity, setGravity] = useState(9.81);
  const [includeDrag, setIncludeDrag] = useState(false);
  const [showVectors, setShowVectors] = useState(true);

  // Target challenge state
  const [targetMode, setTargetMode] = useState(false);
  const [targetDistance, setTargetDistance] = useState(55);
  const [hasHitTarget, setHasHitTarget] = useState(false);

  // Playback animation
  const [isSimulating, setIsSimulating] = useState(false);
  const [simProgress, setSimProgress] = useState(1); // 0 to 1
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const simStartTimeRef = useRef(null);

  // Calculate trajectory physics
  const trajectoryData = calculateProjectileTrajectory({
    u: velocity,
    angleDeg: angle,
    h0: initialHeight,
    g: gravity,
    includeDrag,
    dragCoeff: 0.04,
    mass: 1.0
  });

  const { ideal, drag } = trajectoryData;
  const activeTrajectory = includeDrag && drag ? drag : ideal;

  // New Target Generation
  const generateNewTarget = () => {
    playSound('click');
    const randomDist = Math.floor(Math.random() * 45) + 25; // 25m to 70m
    setTargetDistance(randomDist);
    setHasHitTarget(false);
  };

  // Launch animation
  const handleFire = () => {
    playSound('launch');
    setIsSimulating(true);
    setSimProgress(0);
    setHasHitTarget(false);
    simStartTimeRef.current = performance.now();
  };

  const handleReset = () => {
    playSound('click');
    setIsSimulating(false);
    setSimProgress(1);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };

  useEffect(() => {
    if (!isSimulating) return;

    const flightDuration = (activeTrajectory.flightTime || 3) * 1000;

    const animateLoop = (timestamp) => {
      const elapsed = timestamp - simStartTimeRef.current;
      const progress = Math.min(elapsed / flightDuration, 1);
      setSimProgress(progress);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateLoop);
      } else {
        setIsSimulating(false);
        // Check target hit
        if (targetMode) {
          const finalX = activeTrajectory.range;
          if (Math.abs(finalX - targetDistance) <= 2.5) {
            setHasHitTarget(true);
            playSound('correct');
            confetti({
              particleCount: 70,
              spread: 70,
              origin: { y: 0.6 }
            });
          }
        }
      }
    };

    animationRef.current = requestAnimationFrame(animateLoop);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isSimulating, activeTrajectory, targetMode, targetDistance]);

  // Render Canvas Visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Viewport scaling
    const margin = { left: 45, right: 30, top: 35, bottom: 40 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;

    const maxDomainX = Math.max(80, ideal.range * 1.15, (targetDistance || 0) + 15);
    const maxDomainY = Math.max(35, ideal.maxHeight * 1.3);

    const scaleX = (x) => margin.left + (x / maxDomainX) * plotWidth;
    const scaleY = (y) => margin.top + (1 - y / maxDomainY) * plotHeight;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Background grid
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.4)';
    ctx.lineWidth = 0.8;
    ctx.setLineDash([4, 4]);

    const numGridX = 6;
    for (let i = 0; i <= numGridX; i++) {
      const gx = (i / numGridX) * maxDomainX;
      const sx = scaleX(gx);
      ctx.beginPath();
      ctx.moveTo(sx, margin.top);
      ctx.lineTo(sx, height - margin.bottom);
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '10px JetBrains Mono';
      ctx.textAlign = 'center';
      ctx.fillText(`${gx.toFixed(0)}m`, sx, height - margin.bottom + 16);
    }

    const numGridY = 4;
    for (let i = 0; i <= numGridY; i++) {
      const gy = (i / numGridY) * maxDomainY;
      const sy = scaleY(gy);
      ctx.beginPath();
      ctx.moveTo(margin.left, sy);
      ctx.lineTo(width - margin.right, sy);
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '10px JetBrains Mono';
      ctx.textAlign = 'right';
      ctx.fillText(`${gy.toFixed(0)}m`, margin.left - 8, sy + 3);
    }

    ctx.setLineDash([]); // Reset dash

    // Ground platform & Launch cliff
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(margin.left - 20, scaleY(0), width - margin.left + 20, height - scaleY(0));

    // Launch cliff rectangle
    if (initialHeight > 0) {
      const cliffX = scaleX(0);
      const cliffY = scaleY(initialHeight);
      ctx.fillStyle = '#334155';
      ctx.fillRect(margin.left - 15, cliffY, cliffX - margin.left + 15, scaleY(0) - cliffY);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(margin.left - 15, cliffY, cliffX - margin.left + 15, scaleY(0) - cliffY);
    }

    // Draw Target if Target Mode is on
    if (targetMode) {
      const tx = scaleX(targetDistance);
      const ty = scaleY(0);
      
      // Target platform
      ctx.fillStyle = hasHitTarget ? '#10b981' : '#f43f5e';
      ctx.beginPath();
      ctx.arc(tx, ty, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#f43f5e';
      ctx.font = 'bold 10px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(`Target: ${targetDistance}m`, tx, ty - 12);
    }

    // Draw Ideal Trajectory Curve (Cyan)
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ideal.points.forEach((p, idx) => {
      const sx = scaleX(p.x);
      const sy = scaleY(p.y);
      if (idx === 0) ctx.moveTo(sx, sy);
      else ctx.lineTo(sx, sy);
    });
    ctx.stroke();

    // Draw Drag Trajectory Curve (Amber/Dashed) if enabled
    if (includeDrag && drag) {
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      drag.points.forEach((p, idx) => {
        const sx = scaleX(p.x);
        const sy = scaleY(p.y);
        if (idx === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      });
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw Current Projectile Position & Vectors
    const pointsList = activeTrajectory.points;
    const activeIndex = Math.min(
      Math.floor(simProgress * (pointsList.length - 1)),
      pointsList.length - 1
    );
    const curP = pointsList[activeIndex] || pointsList[0];

    const projX = scaleX(curP.x);
    const projY = scaleY(curP.y);

    // Glowing projectile ball
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#38bdf8';
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.arc(projX, projY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0; // reset

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(projX, projY, 3, 0, Math.PI * 2);
    ctx.fill();

    // Draw Velocity Vectors (Vx, Vy, V)
    if (showVectors && curP) {
      const vScale = 1.2; // visual vector length scale
      const vxEnd = projX + curP.vx * vScale;
      const vyEnd = projY - curP.vy * vScale; // minus because canvas Y is inverted

      // Horizontal Vx (Blue)
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(projX, projY);
      ctx.lineTo(vxEnd, projY);
      ctx.stroke();

      // Vertical Vy (Green)
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(projX, projY);
      ctx.lineTo(projX, vyEnd);
      ctx.stroke();

      // Net V vector (Purple/Rose)
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(projX, projY);
      ctx.lineTo(vxEnd, vyEnd);
      ctx.stroke();
    }
  }, [
    ideal,
    drag,
    activeTrajectory,
    initialHeight,
    simProgress,
    showVectors,
    includeDrag,
    targetMode,
    targetDistance,
    hasHitTarget
  ]);

  return (
    <div className="my-8 rounded-2xl border border-indigo-500/30 bg-slate-900/80 backdrop-blur-xl p-5 sm:p-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/40">
            <Crosshair className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-100 flex items-center gap-2">
              2D Projectile Trajectory Laboratory
            </h3>
            <p className="text-xs text-slate-400">
              Orthogonal independence: <MathView math="x(t) = u_x t, \quad y(t) = h_0 + u_y t - \frac{1}{2}gt^2" />
            </p>
          </div>
        </div>

        {/* Mode Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playSound('click');
              setTargetMode(!targetMode);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              targetMode
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            {targetMode ? 'Target Mode: Active' : 'Target Practice'}
          </button>

          <button
            onClick={() => {
              playSound('click');
              setShowVectors(!showVectors);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              showVectors
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            {showVectors ? 'Vectors: ON' : 'Vectors: OFF'}
          </button>
        </div>
      </div>

      {/* Target Game Notification Banner */}
      {targetMode && (
        <div className="mt-3 p-3.5 rounded-xl bg-gradient-to-r from-rose-950/40 to-slate-900 border border-rose-500/30 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-rose-200">
            <Target className="w-4 h-4 text-rose-400" />
            <span>
              Target is at <strong className="text-white">{targetDistance} meters</strong>. Adjust angle & velocity to hit the target!
            </span>
          </div>
          {hasHitTarget && (
            <span className="font-bold text-emerald-400 flex items-center gap-1 animate-bounce">
              <Sparkles className="w-4 h-4" /> DIRECT HIT! (+100 XP)
            </span>
          )}
          <button
            onClick={generateNewTarget}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-mono text-[11px]"
          >
            New Target Location
          </button>
        </div>
      )}

      {/* Trajectory Canvas Viewport */}
      <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/90 overflow-hidden relative shadow-inner">
        <canvas
          ref={canvasRef}
          width={800}
          height={320}
          className="w-full h-auto block"
        />

        {/* Dynamic Canvas Legend */}
        <div className="absolute top-3 right-3 flex flex-wrap gap-2 text-[10px] font-mono bg-slate-900/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-slate-700/60">
          <span className="flex items-center gap-1 text-cyan-300">
            <span className="w-2.5 h-0.5 bg-cyan-400 inline-block"></span> Vacuum Ideal
          </span>
          {includeDrag && (
            <span className="flex items-center gap-1 text-amber-300">
              <span className="w-2.5 h-0.5 bg-amber-400 inline-block border-dashed"></span> Air Drag
            </span>
          )}
          {showVectors && (
            <>
              <span className="flex items-center gap-1 text-blue-400">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"></span> v_x
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span> v_y
              </span>
              <span className="flex items-center gap-1 text-rose-400">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 inline-block"></span> v_net
              </span>
            </>
          )}
        </div>
      </div>

      {/* Physics Analytics Telemetry Cards */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-3 rounded-xl bg-slate-950/80 border border-cyan-500/20 text-center">
          <span className="text-[10px] font-mono text-cyan-400 block uppercase">Max Range (R)</span>
          <span className="text-lg font-bold font-mono text-cyan-300">
            {ideal.range.toFixed(2)} <span className="text-xs text-slate-400">m</span>
          </span>
        </div>
        <div className="p-3 rounded-xl bg-slate-950/80 border border-blue-500/20 text-center">
          <span className="text-[10px] font-mono text-blue-400 block uppercase">Peak Height (H)</span>
          <span className="text-lg font-bold font-mono text-blue-300">
            {ideal.maxHeight.toFixed(2)} <span className="text-xs text-slate-400">m</span>
          </span>
        </div>
        <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/20 text-center">
          <span className="text-[10px] font-mono text-emerald-400 block uppercase">Flight Time (T)</span>
          <span className="text-lg font-bold font-mono text-emerald-300">
            {ideal.flightTime.toFixed(2)} <span className="text-xs text-slate-400">s</span>
          </span>
        </div>
        <div className="p-3 rounded-xl bg-slate-950/80 border border-indigo-500/20 text-center">
          <span className="text-[10px] font-mono text-indigo-400 block uppercase">Initial u_x / u_y</span>
          <span className="text-xs font-mono font-bold text-indigo-300 block mt-1">
            {ideal.ux.toFixed(1)} / {ideal.uy.toFixed(1)} <span className="text-[10px] text-slate-400">m/s</span>
          </span>
        </div>
      </div>

      {/* Interactive Controls Grid */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
        {/* Launch Angle */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300 font-medium">Launch Angle (θ)</span>
            <span className="font-mono text-cyan-300 font-bold">{angle}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="90"
            step="1"
            value={angle}
            onChange={(e) => setAngle(parseInt(e.target.value))}
            className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Initial Speed */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300 font-medium">Initial Speed (u)</span>
            <span className="font-mono text-blue-300 font-bold">{velocity} m/s</span>
          </div>
          <input
            type="range"
            min="5"
            max="60"
            step="1"
            value={velocity}
            onChange={(e) => setVelocity(parseInt(e.target.value))}
            className="w-full accent-blue-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Cliff Height */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300 font-medium">Platform Height (h₀)</span>
            <span className="font-mono text-emerald-300 font-bold">{initialHeight} m</span>
          </div>
          <input
            type="range"
            min="0"
            max="50"
            step="1"
            value={initialHeight}
            onChange={(e) => setInitialHeight(parseInt(e.target.value))}
            className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Gravity selector */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300 font-medium">Gravity (g)</span>
            <span className="font-mono text-indigo-300 font-bold">{gravity} m/s²</span>
          </div>
          <select
            value={gravity}
            onChange={(e) => {
              playSound('click');
              setGravity(parseFloat(e.target.value));
            }}
            aria-label="Select gravity environment"
            className="w-full py-1.5 px-2 bg-slate-800 border border-slate-700 rounded-lg text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-400"
          >
            {CELESTIAL_GRAVITIES.map((c) => (
              <option key={c.name} value={c.g}>
                {c.name} ({c.g} m/s²)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bottom Action Row */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={handleFire}
            disabled={isSimulating}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-medium text-sm shadow-lg shadow-indigo-900/30 active:scale-95 disabled:opacity-50 transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            Launch Projectile
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Path
          </button>
        </div>

        {/* Air Resistance Checkbox */}
        <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-amber-300 bg-amber-950/30 px-3 py-2 rounded-xl border border-amber-500/30 hover:bg-amber-950/50 transition-colors">
          <input
            type="checkbox"
            checked={includeDrag}
            onChange={(e) => {
              playSound('click');
              setIncludeDrag(e.target.checked);
            }}
            className="rounded accent-amber-400"
          />
          <Wind className="w-3.5 h-3.5 text-amber-400" />
          <span>Simulate Quadratic Air Resistance (F_d ∝ v²)</span>
        </label>
      </div>
    </div>
  );
};

export default ProjectileLab;
