import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import FormulaSheetModal from './components/FormulaSheetModal';
import { SECTIONS_METADATA } from './data/kinematicsContent';
import { setSoundEnabled, getSoundEnabled, playSound } from './utils/soundEffects';

// Section Views
import DisplacementVelocitySection from './sections/DisplacementVelocitySection';
import SuvatEquationsSection from './sections/SuvatEquationsSection';
import MotionGraphsSection from './sections/MotionGraphsSection';
import ProjectileMotionSection from './sections/ProjectileMotionSection';
import FluidResistanceSection from './sections/FluidResistanceSection';
import SuvatSolverSection from './sections/SuvatSolverSection';
import ExamReviewSection from './sections/ExamReviewSection';

import { ChevronLeft, ChevronRight } from 'lucide-react';

export const App = () => {
  const [activeSectionId, setActiveSectionId] = useState('displacement_velocity');
  const [completedSections, setCompletedSections] = useState(() => {
    try {
      const saved = localStorage.getItem('ib_physics_completed_sections');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isFormulaSheetOpen, setIsFormulaSheetOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync completion to local storage
  useEffect(() => {
    try {
      localStorage.setItem('ib_physics_completed_sections', JSON.stringify(completedSections));
    } catch {
      // ignore
    }
  }, [completedSections]);

  const handleToggleSound = () => {
    const next = !isSoundOn;
    setIsSoundOn(next);
    setSoundEnabled(next);
  };

  const handleMarkComplete = (sectionId) => {
    playSound('correct');
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId]);
    }
  };

  // Section Index & Navigation
  const activeIdx = SECTIONS_METADATA.findIndex((s) => s.id === activeSectionId);
  const prevSection = activeIdx > 0 ? SECTIONS_METADATA[activeIdx - 1] : null;
  const nextSection = activeIdx < SECTIONS_METADATA.length - 1 ? SECTIONS_METADATA[activeIdx + 1] : null;

  const goToPrev = () => {
    if (prevSection) {
      playSound('click');
      setActiveSectionId(prevSection.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToNext = () => {
    if (nextSection) {
      playSound('click');
      setActiveSectionId(nextSection.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const progressPercentage = Math.round((completedSections.length / SECTIONS_METADATA.length) * 100);

  const renderActiveSection = () => {
    const isDone = completedSections.includes(activeSectionId);
    switch (activeSectionId) {
      case 'displacement_velocity':
        return <DisplacementVelocitySection onMarkComplete={handleMarkComplete} isCompleted={isDone} />;
      case 'suvat_equations':
        return <SuvatEquationsSection onMarkComplete={handleMarkComplete} isCompleted={isDone} />;
      case 'motion_graphs':
        return <MotionGraphsSection onMarkComplete={handleMarkComplete} isCompleted={isDone} />;
      case 'projectile_motion':
        return <ProjectileMotionSection onMarkComplete={handleMarkComplete} isCompleted={isDone} />;
      case 'fluid_resistance':
        return <FluidResistanceSection onMarkComplete={handleMarkComplete} isCompleted={isDone} />;
      case 'suvat_solver':
        return <SuvatSolverSection onMarkComplete={handleMarkComplete} isCompleted={isDone} />;
      case 'exam_review':
        return <ExamReviewSection onMarkComplete={handleMarkComplete} isCompleted={isDone} />;
      default:
        return <DisplacementVelocitySection onMarkComplete={handleMarkComplete} isCompleted={isDone} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header */}
      <Header
        activeSection={activeSectionId}
        sections={SECTIONS_METADATA}
        progressPercentage={progressPercentage}
        isSoundOn={isSoundOn}
        onToggleSound={handleToggleSound}
        onOpenFormulaSheet={() => setIsFormulaSheetOpen(true)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* Main Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Persistent Sidebar */}
        <Sidebar
          sections={SECTIONS_METADATA}
          activeSection={activeSectionId}
          onSelectSection={(id) => {
            setActiveSectionId(id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          completedSections={completedSections}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Content Area */}
        <main className="flex-1 min-w-0 px-4 sm:px-8 py-8">
          {renderActiveSection()}

          {/* Bottom Pagination Controls */}
          <div className="mt-12 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            {prevSection ? (
              <button
                onClick={goToPrev}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs sm:text-sm font-medium transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <div className="text-left">
                  <span className="text-[10px] text-slate-500 block">Previous Topic</span>
                  <span>{prevSection.shortTitle}</span>
                </div>
              </button>
            ) : (
              <div />
            )}

            {nextSection && (
              <button
                onClick={goToNext}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/40 text-cyan-200 text-xs sm:text-sm font-medium transition-colors ml-auto"
              >
                <div className="text-right">
                  <span className="text-[10px] text-cyan-400 block">Next Topic</span>
                  <span>{nextSection.shortTitle}</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </main>
      </div>

      {/* Formula Sheet Modal */}
      <FormulaSheetModal
        isOpen={isFormulaSheetOpen}
        onClose={() => setIsFormulaSheetOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500 font-mono">
        IB Diploma Physics Interactive Micro-Learning • Topic 1: Kinematics (K.A. Tsokos 7th Ed.)
      </footer>
    </div>
  );
};

export default App;
