import React from 'react';
import { Menu, Volume2, VolumeX, BookOpen, Sparkles, Award } from 'lucide-react';
import { playSound } from '../utils/soundEffects';

export const Header = ({
  activeSection,
  sections,
  progressPercentage,
  isSoundOn,
  onToggleSound,
  onOpenFormulaSheet,
  onOpenMobileMenu
}) => {
  const currentSection = sections.find((s) => s.id === activeSection) || sections[0];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile Menu Trigger + Module Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-cyan-900/20">
              Ψ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-sm sm:text-base text-slate-100 tracking-tight">
                  IB Physics Interactive
                </span>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hidden sm:inline-block">
                  Topic 1: Kinematics
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden md:block">
                K.A. Tsokos 7th Ed. • High-Fidelity Interactive Learning
              </p>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Formula Sheet Trigger */}
          <button
            onClick={() => {
              playSound('click');
              onOpenFormulaSheet();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-200 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Formula Sheet</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              playSound('click');
            }}
            className={`p-2 rounded-xl border transition-colors ${
              isSoundOn
                ? 'bg-slate-900 text-cyan-400 border-cyan-500/30'
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
            title={isSoundOn ? 'Sound Effects Enabled' : 'Sound Effects Muted'}
          >
            {isSoundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Progress Mastery Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-300">{progressPercentage}% Mastery</span>
          </div>
        </div>
      </div>

      {/* Chapter Progress Line */}
      <div className="w-full bg-slate-900 h-1">
        <div
          className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 h-1 transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </header>
  );
};

export default Header;
