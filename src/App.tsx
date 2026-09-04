import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Header from './components/Header';
import Hero from './components/Hero';
import Concept from './components/Concept';
import TextScrollHighlight from './components/TextScrollHighlight';
import CinematicReveal from './components/CinematicReveal';
import Projects from './components/Projects';
import Amenities from './components/Amenities';
import StandardsStack from './components/StandardsStack';
import Apartments from './components/Apartments';
import MortgageCalculator from './components/MortgageCalculator';
import Location from './components/Location';
import Cta from './components/Cta';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import ProjectModal from './components/ProjectModal';
import ConsultationModal from './components/ConsultationModal';

import type { Project } from './data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activePlanSlug, setActivePlanSlug] = useState<string | undefined>(undefined);
  const [consultationOpen, setConsultationOpen] = useState<boolean>(false);
  const [consultationNote, setConsultationNote] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Initialize Lenis smooth scroll with optimal responsiveness
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger calculations after initial DOM & images settle
    const refreshTimeout1 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    const refreshTimeout2 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 800);

    const onWindowLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onWindowLoad);

    return () => {
      clearTimeout(refreshTimeout1);
      clearTimeout(refreshTimeout2);
      window.removeEventListener('load', onWindowLoad);
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  const handleOpenProject = (project: Project, planSlug?: string) => {
    setActivePlanSlug(planSlug);
    setActiveProject(project);
  };

  const handleCloseProject = () => {
    setActiveProject(null);
    setActivePlanSlug(undefined);
  };

  const handleOpenConsultation = (note?: string) => {
    setConsultationNote(note);
    setConsultationOpen(true);
  };

  const handleCloseConsultation = () => {
    setConsultationOpen(false);
    setConsultationNote(undefined);
  };

  const handleBookPlan = (projectTitle: string, planLabel: string) => {
    setActiveProject(null);
    handleOpenConsultation(`Бронирование планировки: ${planLabel} в ${projectTitle}`);
  };

  return (
    <div className="min-h-screen bg-brand-dark text-brand-text-light selection:bg-brand-accent selection:text-brand-dark">
      {/* Header */}
      <Header onOpenConsultation={() => handleOpenConsultation('Запрос обратного звонка из шапки сайта')} />

      {/* Main Landing Sections */}
      <main>
        <Hero onOpenConsultation={() => handleOpenConsultation('Заявка на подбор квартиры из Hero блока')} />
        <Concept onOpenConsultation={() => handleOpenConsultation('Запрос презентации о компании')} />
        <TextScrollHighlight />
        <CinematicReveal onOpenConsultation={() => handleOpenConsultation('Заявка на панорамный тур по объектам')} />
        <Projects onSelectProject={(project) => handleOpenProject(project)} />
        <Amenities />
        <StandardsStack onOpenConsultation={() => handleOpenConsultation('Запрос инженерной документации')} />
        <Apartments 
          onSelectPlan={(project, planSlug) => handleOpenProject(project, planSlug)}
          onOpenConsultation={() => handleOpenConsultation('Запрос подбора планировки из каталога')}
        />
        <MortgageCalculator onOpenConsultation={(details) => handleOpenConsultation(details)} />
        <Location onSelectProject={(project) => handleOpenProject(project)} />
        <Cta onOpenConsultation={() => handleOpenConsultation('Заявка на индивидуальные стартовые условия')} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Quick Floating Action Widget */}
      <FloatingContact onOpenConsultation={() => handleOpenConsultation('Быстрая заявка из плавающего виджета')} />

      {/* In-Page Quick View Project Modal */}
      <ProjectModal
        project={activeProject}
        initialPlanSlug={activePlanSlug}
        onClose={handleCloseProject}
        onBookPlan={handleBookPlan}
      />

      {/* Consultation / Callback Modal */}
      <ConsultationModal
        isOpen={consultationOpen}
        initialNote={consultationNote}
        onClose={handleCloseConsultation}
      />
    </div>
  );
}
