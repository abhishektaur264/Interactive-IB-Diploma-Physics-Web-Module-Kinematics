// Comprehensive Physics Calculation Engine for IB Diploma Kinematics

/**
 * SUVAT Solver - Solves unknown kinematic quantities given 3 known values
 * Quantities: s (displacement, m), u (initial velocity, m/s), v (final velocity, m/s), a (acceleration, m/s^2), t (time, s)
 */
export const solveSuvat = ({ s, u, v, a, t }) => {
  const known = {};
  if (s !== '' && !isNaN(Number(s))) known.s = Number(s);
  if (u !== '' && !isNaN(Number(u))) known.u = Number(u);
  if (v !== '' && !isNaN(Number(v))) known.v = Number(v);
  if (a !== '' && !isNaN(Number(a))) known.a = Number(a);
  if (t !== '' && !isNaN(Number(t))) known.t = Number(t);

  const keys = Object.keys(known);
  if (keys.length < 3) {
    return { error: 'Please provide at least 3 known kinematic variables.' };
  }

  const steps = [];
  const result = { ...known };

  // Case 1: Know u, v, a -> solve s, t
  if ('u' in known && 'v' in known && 'a' in known) {
    if (known.a === 0 && known.u !== known.v) {
      return { error: 'Inconsistent data: zero acceleration requires initial and final velocity to be identical.' };
    }
    // t = (v - u) / a
    if (known.a !== 0) {
      result.t = (known.v - known.u) / known.a;
      steps.push({
        name: 'Calculate Time (t)',
        formula: 'v = u + at \\implies t = \\frac{v - u}{a}',
        calculation: `t = \\frac{${known.v} - ${known.u}}{${known.a}} = ${result.t.toFixed(4)}\\text{ s}`
      });
      // s = (u + v)t / 2 or v^2 = u^2 + 2as => s = (v^2 - u^2)/(2a)
      result.s = (Math.pow(known.v, 2) - Math.pow(known.u, 2)) / (2 * known.a);
      steps.push({
        name: 'Calculate Displacement (s)',
        formula: 'v^2 = u^2 + 2as \\implies s = \\frac{v^2 - u^2}{2a}',
        calculation: `s = \\frac{(${known.v})^2 - (${known.u})^2}{2(${known.a})} = ${result.s.toFixed(4)}\\text{ m}`
      });
    } else {
      return { error: 'Constant velocity with infinite time options or undefined.' };
    }
  }
  // Case 2: Know u, a, t -> solve v, s
  else if ('u' in known && 'a' in known && 't' in known) {
    result.v = known.u + known.a * known.t;
    steps.push({
      name: 'Calculate Final Velocity (v)',
      formula: 'v = u + at',
      calculation: `v = ${known.u} + (${known.a})(${known.t}) = ${result.v.toFixed(4)}\\text{ m s}^{-1}`
    });
    result.s = known.u * known.t + 0.5 * known.a * Math.pow(known.t, 2);
    steps.push({
      name: 'Calculate Displacement (s)',
      formula: 's = ut + \\frac{1}{2}at^2',
      calculation: `s = (${known.u})(${known.t}) + \\frac{1}{2}(${known.a})(${known.t})^2 = ${result.s.toFixed(4)}\\text{ m}`
    });
  }
  // Case 3: Know u, v, t -> solve s, a
  else if ('u' in known && 'v' in known && 't' in known) {
    if (known.t <= 0) return { error: 'Time duration must be positive.' };
    result.a = (known.v - known.u) / known.t;
    steps.push({
      name: 'Calculate Acceleration (a)',
      formula: 'v = u + at \\implies a = \\frac{v - u}{t}',
      calculation: `a = \\frac{${known.v} - ${known.u}}{${known.t}} = ${result.a.toFixed(4)}\\text{ m s}^{-2}`
    });
    result.s = ((known.u + known.v) / 2) * known.t;
    steps.push({
      name: 'Calculate Displacement (s)',
      formula: 's = \\frac{u + v}{2}t',
      calculation: `s = \\frac{${known.u} + ${known.v}}{2}(${known.t}) = ${result.s.toFixed(4)}\\text{ m}`
    });
  }
  // Case 4: Know s, u, t -> solve a, v
  else if ('s' in known && 'u' in known && 't' in known) {
    if (known.t <= 0) return { error: 'Time duration must be positive.' };
    // s = ut + 0.5 a t^2 => a = 2(s - ut) / t^2
    result.a = (2 * (known.s - known.u * known.t)) / Math.pow(known.t, 2);
    steps.push({
      name: 'Calculate Acceleration (a)',
      formula: 's = ut + \\frac{1}{2}at^2 \\implies a = \\frac{2(s - ut)}{t^2}',
      calculation: `a = \\frac{2(${known.s} - (${known.u})(${known.t}))}{(${known.t})^2} = ${result.a.toFixed(4)}\\text{ m s}^{-2}`
    });
    result.v = known.u + result.a * known.t;
    steps.push({
      name: 'Calculate Final Velocity (v)',
      formula: 'v = u + at',
      calculation: `v = ${known.u} + (${result.a.toFixed(4)})(${known.t}) = ${result.v.toFixed(4)}\\text{ m s}^{-1}`
    });
  }
  // Case 5: Know s, v, t -> solve a, u
  else if ('s' in known && 'v' in known && 't' in known) {
    if (known.t <= 0) return { error: 'Time duration must be positive.' };
    // s = vt - 0.5 a t^2 => a = 2(vt - s) / t^2
    result.a = (2 * (known.v * known.t - known.s)) / Math.pow(known.t, 2);
    result.u = (2 * known.s) / known.t - known.v;
    steps.push({
      name: 'Calculate Initial Velocity (u)',
      formula: 's = \\frac{u + v}{2}t \\implies u = \\frac{2s}{t} - v',
      calculation: `u = \\frac{2(${known.s})}{${known.t}} - ${known.v} = ${result.u.toFixed(4)}\\text{ m s}^{-1}`
    });
    steps.push({
      name: 'Calculate Acceleration (a)',
      formula: 'v = u + at \\implies a = \\frac{v - u}{t}',
      calculation: `a = \\frac{${known.v} - ${result.u.toFixed(4)}}{${known.t}} = ${result.a.toFixed(4)}\\text{ m s}^{-2}`
    });
  }
  // Case 6: Know s, u, a -> solve v, t
  else if ('s' in known && 'u' in known && 'a' in known) {
    const vSq = Math.pow(known.u, 2) + 2 * known.a * known.s;
    if (vSq < 0) return { error: 'Physical impossibility: negative square under radical in v^2 = u^2 + 2as.' };
    result.v = Math.sqrt(vSq);
    steps.push({
      name: 'Calculate Final Velocity (v)',
      formula: 'v^2 = u^2 + 2as \\implies v = \\sqrt{u^2 + 2as}',
      calculation: `v = \\sqrt{(${known.u})^2 + 2(${known.a})(${known.s})} = ${result.v.toFixed(4)}\\text{ m s}^{-1}`
    });
    if (known.a !== 0) {
      result.t = (result.v - known.u) / known.a;
      steps.push({
        name: 'Calculate Time (t)',
        formula: 'v = u + at \\implies t = \\frac{v - u}{a}',
        calculation: `t = \\frac{${result.v.toFixed(4)} - ${known.u}}{${known.a}} = ${result.t.toFixed(4)}\\text{ s}`
      });
    } else {
      result.t = known.s / known.u;
      steps.push({
        name: 'Calculate Time (t)',
        formula: 's = ut \\implies t = \\frac{s}{u}',
        calculation: `t = \\frac{${known.s}}{${known.u}} = ${result.t.toFixed(4)}\\text{ s}`
      });
    }
  }
  // Case 7: Know s, v, a -> solve u, t
  else if ('s' in known && 'v' in known && 'a' in known) {
    const uSq = Math.pow(known.v, 2) - 2 * known.a * known.s;
    if (uSq < 0) return { error: 'Physical impossibility: u^2 = v^2 - 2as yields negative number.' };
    result.u = Math.sqrt(uSq);
    steps.push({
      name: 'Calculate Initial Velocity (u)',
      formula: 'v^2 = u^2 + 2as \\implies u = \\sqrt{v^2 - 2as}',
      calculation: `u = \\sqrt{(${known.v})^2 - 2(${known.a})(${known.s})} = ${result.u.toFixed(4)}\\text{ m s}^{-1}`
    });
    result.t = (known.v - result.u) / known.a;
    steps.push({
      name: 'Calculate Time (t)',
      formula: 't = \\frac{v - u}{a}',
      calculation: `t = \\frac{${known.v} - ${result.u.toFixed(4)}}{${known.a}} = ${result.t.toFixed(4)}\\text{ s}`
    });
  }
  // Case 8: Know s, a, t -> solve u, v
  else if ('s' in known && 'a' in known && 't' in known) {
    if (known.t <= 0) return { error: 'Time must be strictly positive.' };
    result.u = (known.s - 0.5 * known.a * Math.pow(known.t, 2)) / known.t;
    result.v = result.u + known.a * known.t;
    steps.push({
      name: 'Calculate Initial Velocity (u)',
      formula: 's = ut + \\frac{1}{2}at^2 \\implies u = \\frac{s - \\frac{1}{2}at^2}{t}',
      calculation: `u = \\frac{${known.s} - 0.5(${known.a})(${known.t})^2}{${known.t}} = ${result.u.toFixed(4)}\\text{ m s}^{-1}`
    });
    steps.push({
      name: 'Calculate Final Velocity (v)',
      formula: 'v = u + at',
      calculation: `v = ${result.u.toFixed(4)} + (${known.a})(${known.t}) = ${result.v.toFixed(4)}\\text{ m s}^{-1}`
    });
  }

  return { result, steps };
};

/**
 * Calculates Projectile Motion trajectories (Ideal vs Air Resistance)
 */
export const calculateProjectileTrajectory = ({
  u = 25, // initial speed (m/s)
  angleDeg = 45, // launch angle (degrees)
  h0 = 0, // initial elevation (m)
  g = 9.81, // gravity (m/s^2)
  includeDrag = false,
  dragCoeff = 0.05, // drag constant
  mass = 1.0 // kg
}) => {
  const theta = (angleDeg * Math.PI) / 180;
  const ux = u * Math.cos(theta);
  const uy = u * Math.sin(theta);

  // Ideal physics analytical solutions
  const timeToApex = uy / g;
  const maxElevation = h0 + (Math.pow(uy, 2) / (2 * g));
  
  // Quadratic for total flight time: h0 + uy*t - 0.5*g*t^2 = 0
  // 0.5*g*t^2 - uy*t - h0 = 0
  const disc = Math.pow(uy, 2) + 2 * g * h0;
  const totalFlightTime = (uy + Math.sqrt(disc)) / g;
  const maxRange = ux * totalFlightTime;

  // Ideal path points
  const pointsIdeal = [];
  const numSteps = 100;
  const dt = totalFlightTime / numSteps;

  for (let i = 0; i <= numSteps; i++) {
    const t = i * dt;
    const x = ux * t;
    const y = Math.max(0, h0 + uy * t - 0.5 * g * Math.pow(t, 2));
    const vx = ux;
    const vy = uy - g * t;
    const speed = Math.sqrt(vx * vx + vy * vy);
    pointsIdeal.push({ t, x, y, vx, vy, speed });
  }

  let pointsDrag = [];
  let dragRange = maxRange;
  let dragMaxH = maxElevation;
  let dragFlightTime = totalFlightTime;

  if (includeDrag) {
    pointsDrag = [];
    let curX = 0;
    let curY = h0;
    let curVx = ux;
    let curVy = uy;
    let curT = 0;
    const simDt = 0.005;
    dragMaxH = h0;

    while (curY >= 0 && curT < 60) {
      const vMag = Math.sqrt(curVx * curVx + curVy * curVy);
      pointsDrag.push({
        t: curT,
        x: curX,
        y: curY,
        vx: curVx,
        vy: curVy,
        speed: vMag
      });

      if (curY > dragMaxH) dragMaxH = curY;

      // Drag force: Fd = k * v^2 opposite to velocity
      const Fd = dragCoeff * vMag * vMag;
      const ax = -(Fd * (curVx / vMag)) / mass;
      const ay = -g - (Fd * (curVy / vMag)) / mass;

      curX += curVx * simDt;
      curY += curVy * simDt;
      curVx += ax * simDt;
      curVy += ay * simDt;
      curT += simDt;
    }
    dragRange = curX;
    dragFlightTime = curT;
  }

  return {
    ideal: {
      points: pointsIdeal,
      range: maxRange,
      maxHeight: maxElevation,
      flightTime: totalFlightTime,
      apexTime: timeToApex,
      ux,
      uy
    },
    drag: includeDrag ? {
      points: pointsDrag,
      range: dragRange,
      maxHeight: dragMaxH,
      flightTime: dragFlightTime
    } : null
  };
};

/**
 * Preset motion scenarios for coordinated Motion Graphs (s-t, v-t, a-t)
 */
export const MOTION_PRESETS = {
  uniform_velocity: {
    id: 'uniform_velocity',
    title: '1. Uniform Velocity (Cruising Car)',
    description: 'Constant velocity motion with zero acceleration. s-t is a straight sloped line, v-t is horizontal, a-t is zero.',
    totalTime: 10,
    eval: (t) => {
      const v = 15;
      const s = v * t;
      const a = 0;
      return { s, v, a };
    }
  },
  constant_acceleration: {
    id: 'constant_acceleration',
    title: '2. Constant Acceleration (Rocket Launch)',
    description: 'Constant forward thrust creates uniform acceleration. s-t is parabolic, v-t has constant positive slope, a-t is horizontal positive.',
    totalTime: 8,
    eval: (t) => {
      const u = 0;
      const a = 4;
      const v = u + a * t;
      const s = u * t + 0.5 * a * Math.pow(t, 2);
      return { s, v, a };
    }
  },
  braking_to_rest: {
    id: 'braking_to_rest',
    title: '3. Braking to Rest (Emergency Stop)',
    description: 'Initial forward velocity with uniform negative acceleration until the vehicle halts.',
    totalTime: 6,
    eval: (t) => {
      const u = 30;
      const a = -5;
      if (t > 6) return { s: 90, v: 0, a: 0 };
      const v = u + a * t;
      const s = u * t + 0.5 * a * Math.pow(t, 2);
      return { s, v, a };
    }
  },
  vertical_toss: {
    id: 'vertical_toss',
    title: '4. Free-Fall Ball Toss (Up and Down)',
    description: 'Ball projected upwards against gravity (g = 9.8 m/s²). At apex, instantaneous v = 0 m/s while acceleration remains -9.8 m/s²!',
    totalTime: 6,
    eval: (t) => {
      const u = 29.43; // apex at t=3s
      const g = 9.81;
      const v = u - g * t;
      const s = u * t - 0.5 * g * Math.pow(t, 2);
      const a = -g;
      return { s: Math.max(0, s), v, a };
    }
  },
  multiphase_journey: {
    id: 'multiphase_journey',
    title: '5. Multi-Phase Commute (Acc, Cruise, Dec)',
    description: 'Phase 1: Accel (0-4s), Phase 2: Cruise (4-8s), Phase 3: Decel to rest (8-12s). Classic IB exam graph question.',
    totalTime: 12,
    eval: (t) => {
      let s = 0, v = 0, a = 0;
      if (t <= 4) {
        a = 5;
        v = a * t;
        s = 0.5 * a * Math.pow(t, 2);
      } else if (t <= 8) {
        a = 0;
        v = 20;
        s = 40 + v * (t - 4);
      } else {
        a = -5;
        const dt = t - 8;
        v = 20 + a * dt;
        s = 120 + 20 * dt + 0.5 * a * Math.pow(dt, 2);
      }
      return { s, v, a };
    }
  }
};

/**
 * Terminal Velocity calculation model (Skydiver dynamics)
 */
export const calculateTerminalVelocityModel = ({
  mass = 75, // kg
  cd = 1.0, // drag coefficient
  area = 0.7, // m^2 (belly-to-earth)
  airDensity = 1.225, // kg/m^3
  g = 9.81,
  parachuteOpenTime = 12, // seconds
  parachuteArea = 25.0 // m^2
}) => {
  const points = [];
  let curT = 0;
  let curY = 4000; // altitude (m)
  let curV = 0; // downward speed (m/s)
  const dt = 0.1;
  const maxTime = 30;

  const kPre = 0.5 * airDensity * cd * area;
  const kPost = 0.5 * airDensity * 1.5 * parachuteArea;
  const vTermPre = Math.sqrt((mass * g) / kPre);
  const vTermPost = Math.sqrt((mass * g) / kPost);

  while (curT <= maxTime) {
    const isParachute = curT >= parachuteOpenTime;
    const effectiveK = isParachute ? kPost : kPre;
    
    // Forces: downward = m*g, upward = k * v^2
    const Fg = mass * g;
    const Fdrag = effectiveK * Math.pow(curV, 2);
    const Fnet = Fg - Fdrag;
    const accel = Fnet / mass;

    points.push({
      t: Number(curT.toFixed(2)),
      altitude: Math.max(0, curY),
      v: curV,
      accel: accel,
      dragForce: Fdrag,
      weight: Fg,
      netForce: Fnet,
      isParachute
    });

    curV += accel * dt;
    curY -= curV * dt;
    curT += dt;
  }

  return {
    points,
    vTermPre,
    vTermPost,
    terminalSpeedKmh: vTermPre * 3.6
  };
};
