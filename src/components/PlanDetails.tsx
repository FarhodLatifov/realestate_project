import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeft, Check, Phone } from 'lucide-react';
import type { Plan, Project } from '../data/projects';

interface PlanDetailsProps {
  project: Project;
  plan: Plan;
}

export default function PlanDetails({ project, plan }: PlanDetailsProps) {
  const pageRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = `${plan.label} | ${project.title}`;
    if (!pageRef.current || !contentRef.current) return;

    const context = gsap.context(() => {
      gsap.fromTo(contentRef.current!.children, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out' });
    }, pageRef);

    return () => context.revert();
  }, [plan, project]);

  return (
    <main ref={pageRef} className="bg-brand-light text-brand-text-dark">
      <section className="min-h-screen px-6 pb-24 pt-32 md:px-12 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <a href={`/projects/${project.slug}`} className="mb-16 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-muted transition-colors hover:text-brand-accent">
            <ArrowLeft className="h-4 w-4" /> Вернуться к проекту
          </a>
          <div className="grid items-start gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-24">
            <div className="overflow-hidden bg-white">
              <img src={plan.image} alt={plan.label} className="w-full object-contain" />
            </div>
            <div ref={contentRef}>
              <p className="mb-5 text-xs uppercase tracking-[0.3em] text-brand-accent">{project.title} / Планировка</p>
              <h1 className="text-5xl font-display uppercase leading-[0.9] md:text-8xl">{plan.label}</h1>
              <p className="mt-8 max-w-md text-base leading-relaxed text-brand-muted">Планировка квартиры в проекте {project.title}. Изучите состав помещений и свяжитесь с отделом продаж для уточнения доступности.</p>
              <div className="mt-12 border-t border-brand-text-dark/15">
                {plan.rooms.length > 0 ? plan.rooms.map((room) => (
                  <div key={`${room.name}-${room.area}`} className="flex items-center justify-between gap-6 border-b border-brand-text-dark/15 py-5 text-sm">
                    <span className="flex items-center gap-3 uppercase tracking-wider"><Check className="h-4 w-4 text-brand-accent" />{room.name}</span>
                    <span className="text-brand-muted">{room.area}</span>
                  </div>
                )) : <p className="py-6 text-sm text-brand-muted">Состав помещений уточняется в отделе продаж.</p>}
              </div>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a href="tel:+992907772233" className="inline-flex items-center justify-center gap-2 bg-brand-text-dark px-6 py-4 text-xs uppercase tracking-widest text-brand-text-light transition-colors hover:bg-brand-accent hover:text-brand-dark"><Phone className="h-4 w-4" /> Консультация</a>
                <span className="inline-flex items-center justify-center gap-2 border border-brand-text-dark/20 px-6 py-4 text-xs uppercase tracking-widest text-brand-muted">Данные Nova Residence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
