import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ImageReveal from './ImageReveal';

interface ConceptProps {
  onOpenConsultation?: () => void;
}

export default function Concept({ onOpenConsultation }: ConceptProps) {
  const containerRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const titleLines = useRef<(HTMLSpanElement | null)[]>([]);
  const descRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
      }
    });

    if (labelRef.current) {
      tl.fromTo(labelRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        0
      );
    }

    titleLines.current.forEach((line, i) => {
      if (!line) return;
      tl.fromTo(line,
        { y: '120%', rotateX: -60 },
        { y: '0%', rotateX: 0, duration: 1.2, ease: "power4.out" },
        0.2 + i * 0.12
      );
    });

    if (descRef.current) {
      tl.fromTo(descRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        0.6
      );
    }
  }, []);

  const addLineRef = (el: HTMLSpanElement | null) => {
    if (el && !titleLines.current.includes(el)) {
      titleLines.current.push(el);
    }
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} id="about" className="py-28 md:py-40 px-6 md:px-12 bg-brand-light text-brand-text-dark overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
        <div className="w-full md:w-1/2">
          <p ref={labelRef} className="text-xs uppercase tracking-[0.3em] mb-6 text-brand-accent font-semibold opacity-0">
            О девелопере • Nova Residence
          </p>
          
          <div className="mb-8" style={{ perspective: '500px' }}>
            {['Создавая', 'Новые стандарты', 'Премиальной жизни'].map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <span 
                  ref={addLineRef}
                  className="block text-3xl sm:text-5xl md:text-5xl lg:text-6xl font-display leading-[1.05] uppercase"
                  style={{ willChange: 'transform' }}
                >
                  {line}
                </span>
              </span>
            ))}
          </div>

          <div ref={descRef}>
            <p className="text-base md:text-lg text-brand-muted max-w-lg mb-4 leading-relaxed">
              Девелоперская группа «Nova Residence» создает знаковые жилые кварталы в знаковых локациях Metropolis Capital: от набережных Marina Bay до тихого посольского квартала.
            </p>
            <p className="text-sm md:text-base text-brand-muted max-w-lg mb-8 leading-relaxed">
              Мы объединяем передовую европейскую архитектуру, энергоэффективные эко-стандарты и приватные дворы-сады без машин, создавая дома, чья ценность только растет со временем.
            </p>

            <div className="grid grid-cols-3 gap-4 border-t border-brand-text-dark/15 pt-6 mb-8">
              <div>
                <p className="text-2xl md:text-3xl font-display font-bold text-brand-accent">12+</p>
                <p className="text-[11px] uppercase tracking-wider text-brand-muted mt-1">Лет опыта</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-display font-bold text-brand-accent">340 тыс. м²</p>
                <p className="text-[11px] uppercase tracking-wider text-brand-muted mt-1">Построено</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-display font-bold text-brand-accent">100%</p>
                <p className="text-[11px] uppercase tracking-wider text-brand-muted mt-1">Сданы в срок</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button 
                type="button"
                onClick={scrollToProjects}
                className="px-8 py-3.5 bg-brand-text-dark text-brand-text-light rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-brand-accent hover:text-brand-dark transition-all duration-300"
              >
                Наши проекты →
              </button>
              <button 
                type="button"
                onClick={onOpenConsultation}
                className="px-8 py-3.5 border border-brand-text-dark/20 text-brand-text-dark rounded-full text-xs uppercase tracking-widest hover:border-brand-text-dark transition-all duration-300"
              >
                Презентация компании
              </button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <ImageReveal 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
            alt="Архитектура и лобби Nova Residence"
            className="aspect-[4/5] rounded-2xl shadow-2xl"
            direction="left"
          />
        </div>
      </div>
    </section>
  );
}
