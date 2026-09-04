import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeft, ArrowUpRight, ExternalLink, MapPin, Phone } from 'lucide-react';
import type { Project } from '../data/projects';

interface ProjectDetailsProps {
  project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const pageRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = `${project.title} | Nova Residence`;

    if (!pageRef.current || !imageRef.current || !contentRef.current) return;

    const contentElement = contentRef.current;
    const context = gsap.context(() => {
      gsap.fromTo(imageRef.current, { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.4, ease: 'power3.out' });
      gsap.fromTo(contentElement.children, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out', delay: 0.15 });
    }, pageRef);

    return () => context.revert();
  }, [project]);

  return (
    <main ref={pageRef} className="bg-brand-dark text-brand-text-light">
      <section className="relative min-h-screen overflow-hidden">
        <img ref={imageRef} src={project.detailImage} alt={project.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/35 to-brand-dark/10" />
        <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 py-28 md:px-12 md:py-36">
          <a href="/#projects" className="inline-flex w-fit items-center gap-2 text-xs uppercase tracking-widest text-brand-text-light/70 transition-colors hover:text-brand-accent">
            <ArrowLeft className="h-4 w-4" /> Все новостройки
          </a>
          <div ref={contentRef} className="max-w-5xl">
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-brand-accent">Жилой комплекс / {project.id}</p>
            <h1 className="max-w-4xl text-5xl font-display uppercase leading-[0.9] md:text-8xl">{project.title}</h1>
            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-brand-text-light/75">
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand-accent" />{project.location}</span>
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-brand-accent" />{project.status}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-24 md:px-12 md:py-40">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[0.8fr_1.2fr] md:gap-24">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-brand-accent">О комплексе</p>
            <h2 className="max-w-md text-4xl font-display uppercase leading-none md:text-6xl">Место для новой истории</h2>
          </div>
          <div>
            <p className="max-w-2xl text-lg leading-relaxed text-brand-text-light/70">{project.details}</p>
            <div className="mt-12 grid gap-5 border-y border-white/15 py-8 sm:grid-cols-2">
              {project.facts.map((fact) => <p key={fact} className="text-sm uppercase tracking-wider text-brand-text-light/80">{fact}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-light px-6 py-24 text-brand-text-dark md:px-12 md:py-40">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.3em] text-brand-accent">Преимущества</p>
              <h2 className="text-4xl font-display uppercase leading-none md:text-7xl">Всё рядом</h2>
            </div>
            <p className="max-w-sm text-base leading-relaxed text-brand-muted">Продуманные решения, которые делают каждый день в новом доме спокойнее и удобнее.</p>
          </div>
          <div className="grid gap-0 border-t border-brand-text-dark/15 md:grid-cols-2">
            {project.features.map((feature, index) => (
              <div key={feature} className="flex items-center gap-6 border-b border-brand-text-dark/15 py-7 md:px-6 md:first:pl-0 md:odd:border-r md:odd:pl-0">
                <span className="font-display text-3xl text-brand-accent/60">0{index + 1}</span>
                <span className="text-sm uppercase tracking-[0.16em]">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-24 md:px-12 md:py-40">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-brand-accent">Окружение</p>
              <h2 className="text-4xl font-display uppercase leading-none md:text-7xl">В ритме города</h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-brand-text-light/65">{project.neighborhood}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {project.gallery.map((image) => <img key={image} src={image} alt={`${project.title} — фото комплекса`} loading="lazy" decoding="async" className="h-64 w-full object-cover md:h-96" />)}
          </div>
        </div>
      </section>

      <section className="bg-brand-light px-6 py-24 text-brand-text-dark md:px-12 md:py-40">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.75fr_1.25fr] md:gap-24">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-brand-accent">Планировки квартир</p>
            <h2 className="text-4xl font-display uppercase leading-none md:text-7xl">Найдите свой формат</h2>
          </div>
          <div className="border-t border-brand-text-dark/15">
            {project.plans.map((plan, index) => (
              <a key={plan.slug} href={`/projects/${project.slug}/plans/${plan.slug}`} className="group flex items-center gap-5 border-b border-brand-text-dark/15 py-4 transition-colors hover:text-brand-accent">
                <img src={plan.image} alt={plan.label} loading="lazy" decoding="async" className="h-20 w-28 object-cover grayscale transition-all duration-500 group-hover:grayscale-0" />
                <span className="flex flex-1 items-center justify-between gap-4"><span className="flex items-center gap-5"><span className="font-display text-2xl text-brand-accent/60">{String(index + 1).padStart(2, '0')}</span><span className="text-sm uppercase tracking-wider">{plan.label}</span></span><ExternalLink className="h-4 w-4 shrink-0" /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {project.liveStreams && project.liveStreams.length > 0 && (
        <section className="border-t border-white/10 px-6 py-24 md:px-12 md:py-40">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <p className="mb-4 text-xs uppercase tracking-[0.3em] text-brand-accent">Онлайн</p>
                <h2 className="text-4xl font-display uppercase leading-none md:text-7xl">Строительство в кадре</h2>
              </div>
              <p className="hidden max-w-sm text-sm leading-relaxed text-brand-text-light/60 md:block">Официальные камеры объекта, доступные на сайте застройщика.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {project.liveStreams.map((stream: { label: string; href: string }) => (
                <div key={stream.href} className="overflow-hidden border border-white/10 bg-black">
                  <iframe src={stream.href} title={stream.label} loading="lazy" className="aspect-video w-full" allow="fullscreen" />
                  <div className="flex items-center justify-between gap-4 px-4 py-4 text-xs uppercase tracking-widest text-brand-text-light/70">
                    <span>{stream.label}</span>
                    <a href={stream.href} target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:text-white">Открыть камеру</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-6 py-24 md:px-12 md:py-40">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 border-t border-white/15 pt-8 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-brand-accent">Следующий шаг</p>
            <h2 className="max-w-2xl text-4xl font-display uppercase leading-none md:text-7xl">Выберите свой дом</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={`tel:+992907772233`} className="inline-flex items-center justify-center gap-2 bg-brand-accent px-6 py-4 text-xs uppercase tracking-widest text-brand-dark transition-colors hover:bg-white"><Phone className="h-4 w-4" /> Консультация</a>
            <a href={project.documentsHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-white/20 px-6 py-4 text-xs uppercase tracking-widest transition-colors hover:border-brand-accent hover:text-brand-accent">Документы <ExternalLink className="h-4 w-4" /></a>
            {project.liveStreams?.map((stream: { label: string; href: string }) => <a key={stream.href} href={stream.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-white/20 px-6 py-4 text-xs uppercase tracking-widest transition-colors hover:border-brand-accent hover:text-brand-accent">{stream.label} <ArrowUpRight className="h-4 w-4" /></a>)}
            <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-white/20 px-6 py-4 text-xs uppercase tracking-widest transition-colors hover:border-brand-accent hover:text-brand-accent">Официальная страница <ArrowUpRight className="h-4 w-4" /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
