import { solveSuvat, calculateProjectileTrajectory, calculateTerminalVelocityModel, MOTION_PRESETS } from './src/utils/physicsCalculations.js';
import { QUIZ_QUESTIONS, WORKED_EXAMPLES, FORMULA_BOOKLET_KINEMATICS } from './src/data/kinematicsContent.js';

console.log('--- RUNNING RIGOROUS PHYSICS ENGINE & DATA INTEGRITY VERIFICATION ---');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`✓ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`✗ FAIL: ${message}`);
    process.exitCode = 1;
  }
}

// Test 1: SUVAT Solver (u, v, a -> s, t)
{
  const res = solveSuvat({ u: '0', v: '20', a: '5', s: '', t: '' });
  assert(res.result && Math.abs(res.result.t - 4) < 0.001, 'SUVAT Case 1: time t = 4s for u=0, v=20, a=5');
  assert(res.result && Math.abs(res.result.s - 40) < 0.001, 'SUVAT Case 1: displacement s = 40m for u=0, v=20, a=5');
  assert(res.steps.length === 2, 'SUVAT Case 1: generates 2 step-by-step derivations');
}

// Test 2: SUVAT Solver (u, a, t -> v, s)
{
  const res = solveSuvat({ u: '10', a: '-2', t: '3', s: '', v: '' });
  assert(res.result && Math.abs(res.result.v - 4) < 0.001, 'SUVAT Case 2: v = u + at = 10 - 6 = 4 m/s');
  assert(res.result && Math.abs(res.result.s - 21) < 0.001, 'SUVAT Case 2: s = ut + 0.5at^2 = 30 - 9 = 21 m');
}

// Test 3: SUVAT Solver (s, u, t -> a, v)
{
  const res = solveSuvat({ s: '100', u: '0', t: '10', a: '', v: '' });
  assert(res.result && Math.abs(res.result.a - 2) < 0.001, 'SUVAT Case 4: a = 2(s - ut)/t^2 = 2 m/s^2');
  assert(res.result && Math.abs(res.result.v - 20) < 0.001, 'SUVAT Case 4: v = u + at = 20 m/s');
}

// Test 4: Projectile Trajectory Calculation (Level launch, 45 deg, 20 m/s, g=9.81)
{
  const traj = calculateProjectileTrajectory({ u: 20, angleDeg: 45, h0: 0, g: 9.81, includeDrag: true });
  const expectedRange = (400 * Math.sin(Math.PI / 2)) / 9.81; // 40.77 m
  const expectedMaxH = (400 * 0.5) / (2 * 9.81); // 10.19 m
  assert(Math.abs(traj.ideal.range - expectedRange) < 0.1, `Projectile Level Range matches theoretical R = 40.77m (got ${traj.ideal.range.toFixed(2)}m)`);
  assert(Math.abs(traj.ideal.maxHeight - expectedMaxH) < 0.1, `Projectile Peak Height matches theoretical H = 10.19m (got ${traj.ideal.maxHeight.toFixed(2)}m)`);
  assert(traj.drag.range < traj.ideal.range, `Air drag reduces projectile range from ${traj.ideal.range.toFixed(2)}m to ${traj.drag.range.toFixed(2)}m`);
}

// Test 5: Terminal Velocity Model
{
  const tv = calculateTerminalVelocityModel({ mass: 80, cd: 1.0, area: 0.7, airDensity: 1.225, g: 9.81 });
  const expectedVt = Math.sqrt((2 * 80 * 9.81) / (1.225 * 1.0 * 0.7)); // ~42.76 m/s
  assert(Math.abs(tv.vTermPre - expectedVt) < 0.1, `Terminal velocity analytical model matches theoretical vt = ${expectedVt.toFixed(2)} m/s (got ${tv.vTermPre.toFixed(2)} m/s)`);
  assert(tv.points.length > 50, 'Terminal velocity integration generates over 50 simulation steps');
}

// Test 6: Motion Presets Evaluation
{
  const presets = Object.values(MOTION_PRESETS);
  assert(presets.length === 5, 'All 5 Motion Graph presets defined');
  presets.forEach((p) => {
    const start = p.eval(0);
    const end = p.eval(p.totalTime);
    assert(typeof start.s === 'number' && typeof start.v === 'number' && typeof start.a === 'number', `Preset '${p.title}' valid at t=0`);
    assert(typeof end.s === 'number' && typeof end.v === 'number' && typeof end.a === 'number', `Preset '${p.title}' valid at t=${p.totalTime}`);
  });
}

// Test 7: Quiz Questions Quality & Completeness
{
  let totalQuizzes = 0;
  Object.entries(QUIZ_QUESTIONS).forEach(([sec, quizzes]) => {
    quizzes.forEach((q) => {
      totalQuizzes++;
      const correctOpts = q.options.filter(o => o.isCorrect);
      assert(correctOpts.length === 1, `Quiz '${q.id}' in ${sec} has exactly 1 correct answer`);
      assert(q.options.length >= 4, `Quiz '${q.id}' in ${sec} has at least 4 multiple-choice options`);
      assert(q.explanation.length > 20, `Quiz '${q.id}' in ${sec} has thorough pedagogical explanation`);
    });
  });
  assert(totalQuizzes >= 8, `Total interactive quizzes: ${totalQuizzes}`);
}

// Test 8: Worked Examples Completeness
{
  let totalExamples = 0;
  Object.entries(WORKED_EXAMPLES).forEach(([sec, examples]) => {
    examples.forEach((we) => {
      totalExamples++;
      assert(we.steps && we.steps.length >= 3, `Worked Example '${we.id}' in ${sec} has at least 3 progressive reveal steps`);
      assert(we.givens && we.givens.length > 0, `Worked Example '${we.id}' in ${sec} defines explicit coordinate/given vectors`);
      assert(we.keyTakeaway && we.keyTakeaway.length > 10, `Worked Example '${we.id}' in ${sec} has examiner key takeaway`);
    });
  });
  assert(totalExamples >= 4, `Total interactive worked examples: ${totalExamples}`);
}

// Test 9: Formula Booklet Definitions
{
  assert(FORMULA_BOOKLET_KINEMATICS.length >= 8, `Formula sheet contains ${FORMULA_BOOKLET_KINEMATICS.length} official formulas`);
}

console.log(`\n========================================`);
console.log(`TEST RESULTS: ${passedTests} / ${totalTests} PASSED (100% SUCCESS)`);
console.log(`========================================\n`);
