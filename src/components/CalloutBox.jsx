import React from 'react';
import { BookOpen, Sparkles, Lightbulb, AlertTriangle, Atom } from 'lucide-react';
import MathView from './MathView';

const CALLOUT_CONFIGS = {
  definition: {
    title: 'IB Formal Definition',
    badge: 'Definition',
    icon: BookOpen,
    containerClass: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-200',
    headerClass: 'text-cyan-400 border-cyan-500/20',
    badgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    iconColor: 'text-cyan-400'
  },
  formula: {
    title: 'IB Data Booklet Formula',
    badge: 'Formula',
    icon: Sparkles,
    containerClass: 'border-indigo-500/30 bg-indigo-950/20 text-indigo-200',
    headerClass: 'text-indigo-400 border-indigo-500/20',
    badgeClass: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    iconColor: 'text-indigo-400'
  },
  tip: {
    title: 'IB Examiner Tip & Strategy',
    badge: 'Exam Insight',
    icon: Lightbulb,
    containerClass: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200',
    headerClass: 'text-emerald-400 border-emerald-500/20',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    iconColor: 'text-emerald-400'
  },
  misconception: {
    title: 'Common Conceptual Misconception',
    badge: 'Warning / Pitfall',
    icon: AlertTriangle,
    containerClass: 'border-amber-500/30 bg-amber-950/20 text-amber-200',
    headerClass: 'text-amber-400 border-amber-500/20',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    iconColor: 'text-amber-400'
  },
  deepdive: {
    title: 'Mathematical Derivation / Deep Dive',
    badge: 'Proof & Calculus',
    icon: Atom,
    containerClass: 'border-purple-500/30 bg-purple-950/20 text-purple-200',
    headerClass: 'text-purple-400 border-purple-500/20',
    badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    iconColor: 'text-purple-400'
  }
};

export const CalloutBox = ({
  type = 'definition',
  title,
  children,
  mathFormula,
  className = ''
}) => {
  const config = CALLOUT_CONFIGS[type] || CALLOUT_CONFIGS.definition;
  const Icon = config.icon;

  return (
    <div
      className={`my-5 rounded-xl border p-4.5 backdrop-blur-md shadow-sm transition-all duration-200 hover:shadow-md ${config.containerClass} ${className}`}
    >
      <div className={`flex items-center justify-between pb-3 mb-3 border-b ${config.headerClass}`}>
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-slate-900/60 border border-white/10">
            <Icon className={`w-4.5 h-4.5 ${config.iconColor}`} />
          </div>
          <span className="font-semibold text-sm tracking-wide text-slate-100">
            {title || config.title}
          </span>
        </div>
        <span className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded-full border ${config.badgeClass}`}>
          {config.badge}
        </span>
      </div>

      {mathFormula && (
        <div className="my-2 p-3 rounded-lg bg-slate-900/70 border border-white/5 text-center overflow-x-auto">
          <MathView math={mathFormula} block={true} />
        </div>
      )}

      <div className="text-sm leading-relaxed text-slate-200 font-sans space-y-2">
        {typeof children === 'string' ? <MathView math={children} /> : children}
      </div>
    </div>
  );
};

export default CalloutBox;
