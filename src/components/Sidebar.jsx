import React, { useState } from 'react';
import { 
  Navigation, 
  TrendingUp, 
  Activity, 
  Crosshair, 
  Wind, 
  Cpu, 
  Award, 
  CheckCircle2, 
  Search, 
  X, 
  Clock,
  Sparkles
} from 'lucide-react';
import { playSound } from '../utils/soundEffects';

const ICON_MAP = {
  Navigation,
  TrendingUp,
  Activity,
  Crosshair,
  Wind,
  Cpu,
  Award
};

export const Sidebar = ({
  sections,
  activeSection,
  onSelectSection,
  completedSections = [],
  isMobileOpen,
  onCloseMobile
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSections = sections.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.number.includes(searchQuery)
  );

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-950/95 border-r border-slate-800 p-4">
      {/* Mobile Drawer Header */}
      <div className="lg:hidden flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <span className="font-heading font-bold text-sm text-slate-200">
          Module Navigation
        </span>
        <button
          onClick={onCloseMobile}
          className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chapter Overview Header */}
      <div className="mb-4 p-3.5 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-md">
        <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-1">
          <span>IB DP PHYSICS • CORE</span>
          <span>7TH EDITION</span>
        </div>
        <h2 className="font-heading font-extrabold text-base text-slate-100">
          Chapter 1: Kinematics
        </h2>
        <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-400 font-mono">
          <span>7 Subsections</span>
          <span>•</span>
          <span>4 Labs</span>
          <span>•</span>
          <span>35+ Problems</span>
        </div>
      </div>

      {/* Quick Search */}
      <div className="relative mb-3">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search topics, equations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
          >
            ×
          </button>
        )}
      </div>

      {/* Sections List */}
      <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
        {filteredSections.map((section) => {
          const isActive = activeSection === section.id;
          const isDone = completedSections.includes(section.id);
          const Icon = ICON_MAP[section.icon] || Navigation;

          return (
            <button
              key={section.id}
              onClick={() => {
                playSound('click');
                onSelectSection(section.id);
                if (onCloseMobile) onCloseMobile();
              }}
              className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 group relative ${
                isActive
                  ? 'bg-cyan-950/40 border-cyan-500/50 text-white shadow-lg shadow-cyan-950/40'
                  : 'bg-slate-900/30 border-transparent hover:bg-slate-900 hover:border-slate-800 text-slate-300'
              }`}
            >
              <div
                className={`p-2 rounded-lg shrink-0 transition-colors ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'bg-slate-900 text-slate-400 group-hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className={`text-[11px] font-mono font-bold ${isActive ? 'text-cyan-400' : 'text-slate-400'}`}>
                    {section.number}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {isDone && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    )}
                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-0.5">
                      <Clock className="w-2.5 h-2.5" />
                      {section.readingTime}
                    </span>
                  </div>
                </div>

                <div className="font-medium text-xs truncate">
                  {section.title}
                </div>
              </div>

              {isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-400 rounded-l-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Sidebar Footer */}
      <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
        <span>Progress</span>
        <span className="text-cyan-400 font-bold">
          {completedSections.length} / {sections.length} Done
        </span>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-80 h-[calc(100vh-4rem)] sticky top-16 shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-Over Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <div className="relative w-80 max-w-[85vw] h-full shadow-2xl z-10 animate-slideRight">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
