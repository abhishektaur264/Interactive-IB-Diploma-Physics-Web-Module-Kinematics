// Comprehensive IB Diploma Physics Curriculum Content for Topic 1: Kinematics (K.A. Tsokos 7th Ed.)

export const SECTIONS_METADATA = [
  {
    id: 'displacement_velocity',
    number: '1.1',
    title: 'Displacement, Distance & Velocity',
    shortTitle: '1.1 Displacement & Velocity',
    description: 'Fundamental kinematics quantities, position vectors, and the critical distinction between average and instantaneous rates.',
    icon: 'Navigation',
    readingTime: '8 min'
  },
  {
    id: 'suvat_equations',
    number: '1.2',
    title: 'Uniform Acceleration & SUVAT Equations',
    shortTitle: '1.2 Uniform Acceleration',
    description: 'Derivations of the 5 kinematic equations from first principles, calculus connections, and free-fall conditions.',
    icon: 'TrendingUp',
    readingTime: '12 min'
  },
  {
    id: 'motion_graphs',
    number: '1.3',
    title: 'Motion Graphs Analysis (s-t, v-t, a-t)',
    shortTitle: '1.3 Motion Graphs',
    description: 'Geometric interpretation of gradients and areas under curves, graph transformation algorithms, and inflection points.',
    icon: 'Activity',
    readingTime: '10 min'
  },
  {
    id: 'projectile_motion',
    number: '1.4',
    title: '2D Projectile Motion Laboratory',
    shortTitle: '1.4 Projectile Motion',
    description: 'Orthogonal vector independence, trajectory equations, range & maximum height derivations, and launch angle optimization.',
    icon: 'Crosshair',
    readingTime: '14 min'
  },
  {
    id: 'fluid_resistance',
    number: '1.5',
    title: 'Fluid Resistance & Terminal Velocity',
    shortTitle: '1.5 Fluid Resistance',
    description: 'Drag forces, quadratic air resistance, dynamic equilibrium, and real-world skydiver velocity-time curves.',
    icon: 'Wind',
    readingTime: '9 min'
  },
  {
    id: 'suvat_solver',
    number: '1.6',
    title: 'Interactive SUVAT Problem Engine',
    shortTitle: '1.6 SUVAT Solver',
    description: 'Dynamic algebraic equation solver with step-by-step mathematical reasoning and trajectory verification.',
    icon: 'Cpu',
    readingTime: '5 min'
  },
  {
    id: 'exam_review',
    number: '1.7',
    title: 'Exam Review & Formula Cheat Sheet',
    shortTitle: '1.7 Exam Review',
    description: 'Diagnostic assessment, IB exam mark scheme strategies, and complete printable IB Physics Data Booklet cheat sheet.',
    icon: 'Award',
    readingTime: '15 min'
  }
];

export const FORMULA_BOOKLET_KINEMATICS = [
  {
    name: 'Final Velocity (no displacement)',
    formula: 'v = u + at',
    variables: 'v = \\text{final velocity}, u = \\text{initial velocity}, a = \\text{acceleration}, t = \\text{time elapsed}',
    conditions: 'Valid only for constant acceleration \\(a = \\text{const}\\).'
  },
  {
    name: 'Displacement from Average Velocity',
    formula: 's = \\frac{u + v}{2}t',
    variables: 's = \\text{displacement}, u = \\text{initial velocity}, v = \\text{final velocity}, t = \\text{time}',
    conditions: 'Valid only when acceleration is uniform (linear velocity variation).'
  },
  {
    name: 'Displacement with Initial Velocity & Acceleration',
    formula: 's = ut + \\frac{1}{2}at^2',
    variables: 's = \\text{displacement}, u = \\text{initial velocity}, a = \\text{acceleration}, t = \\text{time}',
    conditions: 'Fundamental kinematic equation derived from the area under a \\(v\\)-\\(t\\) graph.'
  },
  {
    name: 'Displacement with Final Velocity & Acceleration',
    formula: 's = vt - \\frac{1}{2}at^2',
    variables: 's = \\text{displacement}, v = \\text{final velocity}, a = \\text{acceleration}, t = \\text{time}',
    conditions: 'Used when initial velocity \\(u\\) is unknown.'
  },
  {
    name: 'Timeless Velocity-Displacement Relation',
    formula: 'v^2 = u^2 + 2as',
    variables: 'v = \\text{final velocity}, u = \\text{initial velocity}, a = \\text{acceleration}, s = \\text{displacement}',
    conditions: 'Used when time \\(t\\) is neither given nor required.'
  },
  {
    name: 'Instantaneous Velocity (Calculus)',
    formula: 'v = \\frac{\\mathrm{d}s}{\\mathrm{d}t} = \\lim_{\\Delta t \\to 0} \\frac{\\Delta s}{\\Delta t}',
    variables: 's(t) = \\text{position function}, t = \\text{time}',
    conditions: 'General definition valid for both uniform and non-uniform motion.'
  },
  {
    name: 'Instantaneous Acceleration (Calculus)',
    formula: 'a = \\frac{\\mathrm{d}v}{\\mathrm{d}t} = \\frac{\\mathrm{d}^2s}{\\mathrm{d}t^2}',
    variables: 'v(t) = \\text{velocity function}, s(t) = \\text{position function}',
    conditions: 'Second time-derivative of displacement.'
  },
  {
    name: 'Terminal Velocity (Quadratic Drag)',
    formula: 'v_t = \\sqrt{\\frac{2mg}{\\rho C_d A}}',
    variables: 'm = \\text{mass}, g = 9.81\\text{ m s}^{-2}, \\rho = \\text{fluid density}, C_d = \\text{drag coeff}, A = \\text{cross-sectional area}',
    conditions: 'Occurs when upward drag force equals downward weight \\(F_d = mg\\).'
  }
];

export const WORKED_EXAMPLES = {
  displacement_velocity: [
    {
      id: 'we_1_1',
      title: 'Worked Example 1.1: Multi-Leg Vector Journey',
      difficulty: 'Standard Level (SL)',
      question: 'A field drone flies 120 m due East in 10.0 s, hovers for 5.0 s, and then flies 160 m due North in 15.0 s. Determine: (a) the total distance traveled, (b) the drone\'s average speed for the entire 30.0 s journey, (c) the drone\'s final displacement vector from its origin, and (d) its average velocity vector.',
      givens: [
        '\\Delta x_1 = +120\\text{ m (East)}, \\Delta t_1 = 10.0\\text{ s}',
        '\\text{Hover phase: } \\Delta s_2 = 0\\text{ m}, \\Delta t_2 = 5.0\\text{ s}',
        '\\Delta y_3 = +160\\text{ m (North)}, \\Delta t_3 = 15.0\\text{ s}',
        '\\text{Total time } T = 10.0 + 5.0 + 15.0 = 30.0\\text{ s}'
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Establish Coordinate System and Calculate Total Distance',
          instruction: 'Distance is a scalar quantity equal to the arithmetic sum of path lengths traversed.',
          latexFormula: 'd_{\\text{total}} = d_1 + d_2 + d_3',
          calculation: 'd_{\\text{total}} = 120\\text{ m} + 0\\text{ m} + 160\\text{ m} = 280\\text{ m}'
        },
        {
          stepNumber: 2,
          title: 'Calculate Average Speed',
          instruction: 'Average speed is total distance divided by total elapsed time.',
          latexFormula: '\\text{Average Speed } \\bar{v} = \\frac{d_{\\text{total}}}{\\Delta t_{\\text{total}}}',
          calculation: '\\bar{v} = \\frac{280\\text{ m}}{30.0\\text{ s}} = 9.33\\text{ m s}^{-1}'
        },
        {
          stepNumber: 3,
          title: 'Calculate Net Displacement Vector (Magnitude & Direction)',
          instruction: 'Displacement is the vector connecting the initial point \\((0,0)\\) to final point \\((120, 160)\\). Apply the Pythagorean theorem and trigonometry.',
          latexFormula: '|\\vec{s}| = \\sqrt{(\\Delta x)^2 + (\\Delta y)^2}, \\quad \\theta = \\arctan\\left(\\frac{\\Delta y}{\\Delta x}\\right)',
          calculation: '|\\vec{s}| = \\sqrt{120^2 + 160^2} = \\sqrt{14400 + 25600} = \\sqrt{40000} = 200\\text{ m} \\\\[6pt] \\theta = \\arctan\\left(\\frac{160}{120}\\right) = \\arctan(1.333) = 53.1^\\circ\\text{ North of East (bearing } 036.9^\\circ\\text{)}'
        },
        {
          stepNumber: 4,
          title: 'Calculate Average Velocity Vector',
          instruction: 'Average velocity is net displacement vector divided by total time elapsed.',
          latexFormula: '\\vec{v}_{\\text{avg}} = \\frac{\\vec{s}}{\\Delta t}',
          calculation: '|\\vec{v}_{\\text{avg}}| = \\frac{200\\text{ m}}{30.0\\text{ s}} = 6.67\\text{ m s}^{-1} \\text{ at } 53.1^\\circ\\text{ North of East}'
        }
      ],
      keyTakeaway: 'Notice that average speed (\\(9.33\\text{ m/s}\\)) is strictly greater than the magnitude of average velocity (\\(6.67\\text{ m/s}\\)) because the path changes direction and includes a stationary phase.'
    }
  ],
  suvat_equations: [
    {
      id: 'we_1_2',
      title: 'Worked Example 1.2: Runway Aircraft Take-Off with Deceleration Margin',
      difficulty: 'Higher Level (HL) / SL Core',
      question: 'A passenger jet touches down at \\(70.0\\text{ m s}^{-1}\\) and decelerates uniformly at \\(2.50\\text{ m s}^{-2}\\). (a) Calculate the minimum runway length required for the jet to come to a complete halt. (b) Calculate the time elapsed from touchdown to rest.',
      givens: [
        '\\text{Initial velocity } u = +70.0\\text{ m s}^{-1}',
        '\\text{Final velocity } v = 0\\text{ m s}^{-1}',
        '\\text{Acceleration } a = -2.50\\text{ m s}^{-2} \\text{ (negative sign denotes deceleration)}'
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Select Kinematic Equation Independent of Time',
          instruction: 'We know \\(u, v, a\\) and seek displacement \\(s\\). Use \\(v^2 = u^2 + 2as\\).',
          latexFormula: 'v^2 = u^2 + 2as \\implies s = \\frac{v^2 - u^2}{2a}',
          calculation: 's = \\frac{0^2 - (70.0)^2}{2(-2.50)} = \\frac{-4900}{-5.00} = 980\\text{ m}'
        },
        {
          stepNumber: 2,
          title: 'Calculate Time to Halt',
          instruction: 'Use the first kinematic equation \\(v = u + at\\) rearranged for \\(t\\).',
          latexFormula: 't = \\frac{v - u}{a}',
          calculation: 't = \\frac{0 - 70.0}{-2.50} = 28.0\\text{ s}'
        },
        {
          stepNumber: 3,
          title: 'Verification using Independent Formula',
          instruction: 'Cross-check displacement using \\(s = \\frac{u+v}{2}t\\).',
          latexFormula: 's = \\left(\\frac{70.0 + 0}{2}\\right)(28.0) = 35.0 \\times 28.0 = 980\\text{ m}',
          calculation: '\\text{Result is mutually consistent. Required runway } = 980\\text{ m}.'
        }
      ],
      keyTakeaway: 'Always declare the positive direction at the start of a problem (here, forward = positive). Deceleration must be assigned a negative algebraic sign.'
    },
    {
      id: 'we_1_3',
      title: 'Worked Example 1.3: Vertical Cliff Drop & Sound Delay',
      difficulty: 'Higher Level (HL)',
      question: 'A stone is dropped from rest from the edge of a vertical cliff of height \\(h\\). The sound of the stone hitting the water at the base of the cliff is heard at the top \\(4.20\\text{ s}\\) later. Taking \\(g = 9.81\\text{ m s}^{-2}\\) and speed of sound \\(v_s = 340\\text{ m s}^{-1}\\), find the cliff height \\(h\\).',
      givens: [
        '\\text{Initial velocity of stone } u = 0\\text{ m s}^{-1}',
        '\\text{Acceleration due to gravity } g = 9.81\\text{ m s}^{-2}',
        '\\text{Speed of sound } v_s = 340\\text{ m s}^{-1}',
        '\\text{Total time } t_{\\text{total}} = t_{\\text{fall}} + t_{\\text{sound}} = 4.20\\text{ s}'
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Express Fall Time and Sound Time in terms of Height h',
          instruction: 'For the stone falling under uniform gravity from rest: \\(h = \\frac{1}{2}gt_{\\text{fall}}^2 \\implies t_{\\text{fall}} = \\sqrt{\\frac{2h}{g}}\\). For sound traveling upwards at constant speed: \\(t_{\\text{sound}} = \\frac{h}{v_s}\\).',
          latexFormula: '\\sqrt{\\frac{2h}{g}} + \\frac{h}{v_s} = t_{\\text{total}}',
          calculation: '\\sqrt{\\frac{2h}{9.81}} + \\frac{h}{340} = 4.20'
        },
        {
          stepNumber: 2,
          title: 'Substitute \\(x = \\sqrt{h}\\) to Form a Standard Quadratic Equation',
          instruction: 'Let \\(x = \\sqrt{h}\\), so \\(h = x^2\\). Rearrange the equation into \\(A x^2 + B x + C = 0\\).',
          latexFormula: '\\frac{1}{340}x^2 + \\sqrt{\\frac{2}{9.81}}x - 4.20 = 0 \\implies 0.002941 x^2 + 0.45152 x - 4.20 = 0',
          calculation: 'x = \\frac{-0.45152 + \\sqrt{(0.45152)^2 - 4(0.002941)(-4.20)}}{2(0.002941)} \\\\[6pt] x = \\frac{-0.45152 + \\sqrt{0.20387 + 0.04941}}{0.005882} = \\frac{-0.45152 + 0.50327}{0.005882} = 8.798'
        },
        {
          stepNumber: 3,
          title: 'Compute Cliff Height \\(h\\)',
          instruction: 'Since \\(x = \\sqrt{h}\\), square the positive root to obtain the physical height.',
          latexFormula: 'h = x^2',
          calculation: 'h = (8.798)^2 = 77.4\\text{ m}'
        }
      ],
      keyTakeaway: 'Sound travels at finite speed; in IB Paper 2 extended problems, ignoring sound travel time leads to an overestimation of the fall duration and height.'
    }
  ],
  projectile_motion: [
    {
      id: 'we_1_4',
      title: 'Worked Example 1.4: Asymmetric Cliff Projectile Launch',
      difficulty: 'IB Exam Classic (SL & HL)',
      question: 'A projectile is launched from the top of a \\(45.0\\text{ m}\\) cliff with an initial velocity of \\(30.0\\text{ m s}^{-1}\\) at an angle of \\(35.0^\\circ\\) above the horizontal into the sea below. (a) Determine the time of flight until impact. (b) Find the horizontal distance from the base of the cliff to the impact point. (c) Calculate the impact velocity magnitude and angle.',
      givens: [
        '\\text{Cliff height } h_0 = 45.0\\text{ m}',
        '\\text{Initial speed } u = 30.0\\text{ m s}^{-1}',
        '\\text{Launch angle } \\theta = 35.0^\\circ',
        'g = 9.81\\text{ m s}^{-2}'
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Resolve Initial Velocity into Orthogonal Components',
          instruction: 'Compute horizontal component \\(u_x\\) and vertical component \\(u_y\\).',
          latexFormula: 'u_x = u\\cos\\theta = 30.0\\cos(35.0^\\circ) = 24.57\\text{ m s}^{-1} \\\\[4pt] u_y = u\\sin\\theta = 30.0\\sin(35.0^\\circ) = 17.21\\text{ m s}^{-1}',
          calculation: 'u_x = 24.57\\text{ m s}^{-1}, \\quad u_y = +17.21\\text{ m s}^{-1}'
        },
        {
          stepNumber: 2,
          title: 'Solve for Total Flight Time using Vertical SUVAT',
          instruction: 'Take upward as positive: \\(s_y = -45.0\\text{ m}\\), \\(u_y = +17.21\\text{ m s}^{-1}\\), \\(a_y = -9.81\\text{ m s}^{-2}\\). Apply \\(s_y = u_y t + \\frac{1}{2}a_y t^2\\).',
          latexFormula: '-45.0 = 17.21 t - 4.905 t^2 \\implies 4.905 t^2 - 17.21 t - 45.0 = 0',
          calculation: 't = \\frac{17.21 + \\sqrt{(-17.21)^2 - 4(4.905)(-45.0)}}{2(4.905)} = \\frac{17.21 + \\sqrt{296.18 + 882.90}}{9.81} \\\\[6pt] t = \\frac{17.21 + 34.34}{9.81} = 5.25\\text{ s}'
        },
        {
          stepNumber: 3,
          title: 'Calculate Horizontal Range',
          instruction: 'Since horizontal acceleration \\(a_x = 0\\), \\(x = u_x \\times t\\).',
          latexFormula: 'R = u_x \\cdot t_{\\text{flight}}',
          calculation: 'R = 24.57\\text{ m s}^{-1} \\times 5.25\\text{ s} = 129.0\\text{ m}'
        },
        {
          stepNumber: 4,
          title: 'Calculate Impact Velocity Vector',
          instruction: 'Determine final components \\(v_x\\) and \\(v_y\\), then combine via Pythagoras.',
          latexFormula: 'v_x = u_x = 24.57\\text{ m s}^{-1} \\\\[4pt] v_y = u_y + a_y t = 17.21 - (9.81)(5.25) = -34.29\\text{ m s}^{-1} \\\\[4pt] v_{\\text{impact}} = \\sqrt{v_x^2 + v_y^2} = \\sqrt{24.57^2 + (-34.29)^2} = \\sqrt{603.68 + 1175.8} = 42.2\\text{ m s}^{-1} \\\\[4pt] \\phi = \\arctan\\left(\\frac{34.29}{24.57}\\right) = 54.4^\\circ\\text{ below the horizontal}',
          calculation: 'v_{\\text{impact}} = 42.2\\text{ m s}^{-1} \\text{ at } 54.4^\\circ \\text{ below horizontal}'
        }
      ],
      keyTakeaway: 'The horizontal range formula \\(R = \\frac{u^2\\sin 2\\theta}{g}\\) ONLY works for level launches where \\(s_y = 0\\). For launches from a height, you must solve the vertical quadratic equation first.'
    }
  ]
};

export const QUIZ_QUESTIONS = {
  displacement_velocity: [
    {
      id: 'q_1_1',
      question: 'A runner completes exactly 3.5 laps of a standard 400 m circular athletic track in a time of 7.0 minutes. Which statement correctly identifies their total distance and net displacement?',
      options: [
        { id: 'a', text: 'Distance = 1400 m, Displacement = 0 m', isCorrect: false },
        { id: 'b', text: 'Distance = 1400 m, Displacement = 127.3 m', isCorrect: true },
        { id: 'c', text: 'Distance = 127.3 m, Displacement = 1400 m', isCorrect: false },
        { id: 'd', text: 'Distance = 1400 m, Displacement = 400 m', isCorrect: false }
      ],
      explanation: 'Total distance is the scalar path length: \\(3.5 \\times 400\\text{ m} = 1400\\text{ m}\\). After 3.5 laps, the runner is on the exact opposite side of the circular track. The straight-line displacement is the diameter of the track: \\(C = 2\\pi r = 400\\text{ m} \\implies 2r = \\frac{400}{\\pi} \\approx 127.3\\text{ m}\\).',
      examinerTip: 'IB examiners frequently test the distinction between scalar distance (path length) and vector displacement (straight line between initial and final position).'
    },
    {
      id: 'q_1_2',
      question: 'An object moves such that its position is given by \\(s(t) = 3t^3 - 2t + 4\\). What is its instantaneous velocity at \\(t = 2.0\\text{ s}\\)?',
      options: [
        { id: 'a', text: '34 m s⁻¹', isCorrect: true },
        { id: 'b', text: '24 m s⁻¹', isCorrect: false },
        { id: 'c', text: '36 m s⁻¹', isCorrect: false },
        { id: 'd', text: '18 m s⁻¹', isCorrect: false }
      ],
      explanation: 'Instantaneous velocity is the first time derivative of position: \\(v(t) = \\frac{\\mathrm{d}s}{\\mathrm{d}t} = \\frac{\\mathrm{d}}{\\mathrm{d}t}(3t^3 - 2t + 4) = 9t^2 - 2\\). At \\(t = 2.0\\text{ s}\\): \\(v(2) = 9(2)^2 - 2 = 9(4) - 2 = 34\\text{ m s}^{-1}\\).',
      examinerTip: 'Differentiate with respect to time; do not divide \\(s(2)\\) by 2, as that gives average velocity, not instantaneous velocity.'
    }
  ],
  suvat_equations: [
    {
      id: 'q_2_1',
      question: 'Under what strict physical condition are the five standard SUVAT kinematic equations valid?',
      options: [
        { id: 'a', text: 'The velocity must remain constant throughout the motion.', isCorrect: false },
        { id: 'b', text: 'The acceleration must remain constant in both magnitude and direction.', isCorrect: true },
        { id: 'c', text: 'The trajectory must be a perfect circle.', isCorrect: false },
        { id: 'd', text: 'Air resistance must increase quadratically with speed.', isCorrect: false }
      ],
      explanation: 'The SUVAT equations are derived under the fundamental assumption that acceleration \\(a\\) is uniform (constant in magnitude and direction). If acceleration varies with time or position (e.g. fluid resistance, spring force), calculus integration or numerical methods must be used.',
      examinerTip: 'Whenever an IB exam question mentions fluid resistance or drag forces, SUVAT equations cannot be used directly to calculate distance or final speed.'
    },
    {
      id: 'q_2_2',
      question: 'A tennis ball is projected vertically upwards with speed \\(u\\). Neglecting air resistance, what is the speed of the ball when it returns to the exact projection height?',
      options: [
        { id: 'a', text: '0 m s⁻¹', isCorrect: false },
        { id: 'b', text: 'u/2', isCorrect: false },
        { id: 'c', text: 'u', isCorrect: true },
        { id: 'd', text: '2u', isCorrect: false }
      ],
      explanation: 'From \\(v^2 = u^2 + 2as\\), when the ball returns to the launch height, displacement \\(s = 0\\). Therefore, \\(v^2 = u^2 + 2(-g)(0) = u^2 \\implies |v| = u\\). By symmetry, the return speed equals the launch speed, with velocity directed downwards (\\(v = -u\\)).',
      examinerTip: 'Symmetry is a powerful tool in free-fall kinematics: time up equals time down, and speed at any given elevation during ascent equals speed during descent.'
    }
  ],
  motion_graphs: [
    {
      id: 'q_3_1',
      question: 'What does the area under an acceleration-time (a-t) graph between time \\(t_1\\) and \\(t_2\\) represent physically?',
      options: [
        { id: 'a', text: 'Total displacement \\(s\\)', isCorrect: false },
        { id: 'b', text: 'Final instantaneous velocity \\(v_2\\)', isCorrect: false },
        { id: 'c', text: 'Change in velocity \\(\\Delta v = v_2 - v_1\\)', isCorrect: true },
        { id: 'd', text: 'Rate of change of acceleration (jerk)', isCorrect: false }
      ],
      explanation: 'Since \\(a = \\frac{\\mathrm{d}v}{\\mathrm{d}t}\\), integrating both sides gives \\(\\int_{t_1}^{t_2} a \\,\\mathrm{d}t = v(t_2) - v(t_1) = \\Delta v\\). The area represents the change in velocity, NOT the final velocity (unless initial velocity was zero).',
      examinerTip: 'Common mistake alert: Never forget to add the initial velocity \\(u\\) to the area under the \\(a\\)-\\(t\\) graph to find the final velocity \\(v\\).'
    },
    {
      id: 'q_3_2',
      question: 'A velocity-time graph is a curve whose slope is decreasing over time while remaining positive. What is happening to the moving object?',
      options: [
        { id: 'a', text: 'It is moving forward and speeding up at a decreasing rate.', isCorrect: true },
        { id: 'b', text: 'It is moving backward and slowing down.', isCorrect: false },
        { id: 'c', text: 'It is moving forward and slowing down.', isCorrect: false },
        { id: 'd', text: 'It is stationary with zero acceleration.', isCorrect: false }
      ],
      explanation: 'Since \\(v > 0\\), the object is traveling in the positive (forward) direction. The gradient of \\(v\\)-\\(t\\) represents acceleration \\(a\\). A positive decreasing gradient means \\(a > 0\\) but \\(a\\) is decreasing; thus, velocity is increasing, but at a declining rate (approaching a terminal value).',
      examinerTip: 'Do not confuse "decreasing acceleration" with "deceleration". If velocity is positive and acceleration is positive (even if getting smaller), the object is still speeding up!'
    }
  ],
  projectile_motion: [
    {
      id: 'q_4_1',
      question: 'A projectile is launched from ground level at an angle \\(\\theta\\) to the horizontal with initial speed \\(u\\). At the highest point of its trajectory, what are its velocity and acceleration vectors?',
      options: [
        { id: 'a', text: 'Velocity = 0, Acceleration = 0', isCorrect: false },
        { id: 'b', text: 'Velocity = u cos θ (horizontal), Acceleration = 9.81 m s⁻² (downwards)', isCorrect: true },
        { id: 'c', text: 'Velocity = u sin θ (vertical), Acceleration = 9.81 m s⁻² (downwards)', isCorrect: false },
        { id: 'd', text: 'Velocity = 0, Acceleration = 9.81 m s⁻² (downwards)', isCorrect: false }
      ],
      explanation: 'At the apex, only the vertical component of velocity is momentarily zero (\\(v_y = 0\\)). The horizontal velocity remains constant at \\(v_x = u\\cos\\theta\\). Gravity acts downward at all times throughout the flight, so \\(\\vec{a} = 9.81\\text{ m s}^{-2}\\) downwards.',
      examinerTip: 'One of the most persistent misconceptions in IB Physics! At the top of a parabolic flight, the acceleration is NOT zero. Only \\(v_y = 0\\).'
    },
    {
      id: 'q_4_2',
      question: 'Two bullets, A and B, are released simultaneously from the exact same height above a flat horizontal desert. Bullet A is fired horizontally at 800 m/s from a rifle, while Bullet B is simply dropped from rest. Neglecting air resistance and Earth curvature, which bullet hits the ground first?',
      options: [
        { id: 'a', text: 'Bullet B hits first because it travels a shorter distance.', isCorrect: false },
        { id: 'b', text: 'Bullet A hits first because of its immense kinetic energy.', isCorrect: false },
        { id: 'c', text: 'Both bullets hit the ground at the exact same instant.', isCorrect: true },
        { id: 'd', text: 'Bullet A never reaches the ground.', isCorrect: false }
      ],
      explanation: 'Because orthogonal motions are completely independent, the vertical motion for both bullets is governed by \\(s_y = u_y t + \\frac{1}{2}g t^2\\). Both bullets start with \\(u_y = 0\\) and experience identical downward acceleration \\(g\\) across the same vertical displacement \\(h\\). Thus \\(t = \\sqrt{\\frac{2h}{g}}\\) for both!',
      examinerTip: 'Galileo\'s principle of independent orthogonal motions: horizontal velocity has zero influence on vertical free-fall acceleration.'
    }
  ],
  fluid_resistance: [
    {
      id: 'q_5_1',
      question: 'When a skydiver in free-fall reaches terminal velocity, which statement regarding forces and acceleration is completely correct?',
      options: [
        { id: 'a', text: 'The drag force is zero, and acceleration is 9.81 m s⁻².', isCorrect: false },
        { id: 'b', text: 'The upward drag force equals the downward weight, and acceleration is zero.', isCorrect: true },
        { id: 'c', text: 'The drag force is greater than the weight, causing upward acceleration.', isCorrect: false },
        { id: 'd', text: 'Gravity ceases to act on the skydiver.', isCorrect: false }
      ],
      explanation: 'Terminal velocity is a state of dynamic translational equilibrium where the upward air resistance force matches the downward gravitational force: \\(F_d = W = mg\\). Therefore, \\(F_{\\text{net}} = 0\\), and by Newton\'s 1st & 2nd Laws, \\(a = 0\\text{ m s}^{-2}\\). The skydiver continues falling at constant velocity.',
      examinerTip: 'Zero acceleration does not mean zero velocity. The skydiver is traveling at their maximum terminal speed (typically ~55 m/s belly-to-earth).'
    }
  ]
};
