import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, MapPin, Percent, ShieldCheck, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onOpenConsultation?: () => void;
}

export default function Hero({ onOpenConsultation }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const titleLines = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const uspRef = useRef<HTMLDivElement>(null);

  // Floating parallax widgets refs
  const floatWidget1 = useRef<HTMLDivElement>(null);
  const floatWidget2 = useRef<HTMLDivElement>(null);
  const floatWidget3 = useRef<HTMLDivElement>(null);
  const gridDecorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !bgRef.current || !textRef.current) return;

    const tl = gsap.timeline({ delay: 0.2 });

    // Soft background reveal
    tl.fromTo(bgRef.current, 
      { opacity: 0, scale: 1.08 }, 
      { opacity: 1, scale: 1, duration: 2.2, ease: "power2.out" },
      0
    );

    // Subtitle label fades in
    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0.3
      );
    }

    // Title lines reveal one by one
    titleLines.current.forEach((line, i) => {
      if (!line) return;
      tl.fromTo(line,
        { y: '120%', rotateX: -40 },
        { y: '0%', rotateX: 0, duration: 1.2, ease: "power4.out" },
        0.5 + i * 0.15
      );
    });

    // Description
    if (descRef.current) {
      tl.fromTo(descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        1.0
      );
    }

    // CTA buttons
    if (ctaRef.current) {
      tl.fromTo(ctaRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        1.2
      );
    }

    // USP bar at bottom
    if (uspRef.current) {
      tl.fromTo(uspRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        1.5
      );
    }

    // Floating badges entrance animation
    const floatingBadges = [floatWidget1.current, floatWidget2.current, floatWidget3.current].filter(Boolean);
    if (floatingBadges.length > 0) {
      tl.fromTo(floatingBadges,
        { opacity: 0, scale: 0.85, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1, stagger: 0.2, ease: "back.out(1.4)" },
        1.3
      );
    }

    // Parallax on scroll - Multi-layer speed differences
    // 1. Background slow parallax
    gsap.to(bgRef.current, {
      yPercent: 20,
      ease: "none",
      force3D: true,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      }
    });

    // 2. Blueprint / grid decorative layer
    if (gridDecorRef.current) {
      gsap.to(gridDecorRef.current, {
        yPercent: -15,
        opacity: 0,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "60% top",
          scrub: 0.5,
        }
      });
    }

    // 3. Center hero text fade out and lift
    gsap.to(textRef.current, {
      yPercent: -35,
      opacity: 0,
      ease: "none",
      force3D: true,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "70% top",
        scrub: 0.5,
      }
    });

    // 4. Floating Widget 1 (Location): lifts faster upwards with subtle tilt
    if (floatWidget1.current) {
      gsap.to(floatWidget1.current, {
        yPercent: -55,
        xPercent: -10,
        rotate: -3,
        opacity: 0.1,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "75% top",
          scrub: 0.5,
        }
      });
    }

    // 5. Floating Widget 2 (Installment): drops down / resists
    if (floatWidget2.current) {
      gsap.to(floatWidget2.current, {
        yPercent: 40,
        xPercent: 12,
        rotate: 4,
        opacity: 0.1,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "75% top",
          scrub: 0.5,
        }
      });
    }

    // 6. Floating Widget 3 (Rating): lifts medium with subtle counter-tilt
    if (floatWidget3.current) {
      gsap.to(floatWidget3.current, {
        yPercent: -35,
        xPercent: 8,
        rotate: 2,
        opacity: 0.1,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "75% top",
          scrub: 0.5,
        }
      });
    }

  }, []);

  const addLineRef = (el: HTMLSpanElement | null) => {
    if (el && !titleLines.current.includes(el)) {
      titleLines.current.push(el);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-brand-dark z-10" />
      
      {/* Animated background - ultra-luxury illuminated Metropolis skyscraper */}
      <div 
        ref={bgRef}
        className="absolute inset-[-10%] bg-[url('https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=75')] bg-cover bg-center bg-no-repeat opacity-0"
      />

      {/* Decorative architectural blueprint grid layer (Multi-layer parallax) */}
      <div 
        ref={gridDecorRef} 
        className="absolute inset-0 z-10 pointer-events-none opacity-25 bg-[radial-gradient(#b9975b_1px,transparent_1px)] [background-size:32px_32px]"
      />

      {/* Floating Parallax Widget 1: Location & Coordinates (Left) */}
      <div 
        ref={floatWidget1}
        className="hidden lg:flex absolute left-8 xl:left-16 top-1/3 z-20 items-center gap-3 px-4 py-3 rounded-2xl bg-brand-dark/70 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 text-left pointer-events-none transition-transform"
      >
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-brand-accent">
            <MapPin className="w-3 h-3" />
            Metropolis Prime
          </div>
          <p className="text-xs font-mono text-white/90 font-medium">41°20&apos;N • 69°18&apos;E</p>
        </div>
      </div>

      {/* Floating Parallax Widget 2: 0% Installment (Bottom-Right) */}
      <div 
        ref={floatWidget2}
        className="hidden lg:flex absolute right-8 xl:right-16 bottom-28 z-20 items-center gap-3 px-4 py-3.5 rounded-2xl bg-brand-dark/70 backdrop-blur-xl border border-brand-accent/30 shadow-2xl shadow-black/50 text-left pointer-events-none"
      >
        <div className="w-9 h-9 rounded-xl bg-brand-accent/20 border border-brand-accent/40 flex items-center justify-center text-brand-accent">
          <Percent className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-accent block">Прямая рассрочка 0%</span>
          <span className="text-xs font-semibold text-white">До 36 месяцев без %</span>
        </div>
      </div>

      {/* Floating Parallax Widget 3: Reliability Rating A++ (Top-Right) */}
      <div 
        ref={floatWidget3}
        className="hidden lg:flex absolute right-10 xl:right-20 top-28 z-20 items-center gap-3 px-4 py-2.5 rounded-2xl bg-brand-dark/70 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 pointer-events-none"
      >
        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="text-left">
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-white">Рейтинг A++</span>
            <Sparkles className="w-3 h-3 text-brand-accent" />
          </div>
          <span className="text-[10px] uppercase tracking-wider text-white/60 block">100% сдача в срок</span>
        </div>
      </div>
      
      {/* Content */}
      <div ref={textRef} className="relative z-20 text-center px-4 max-w-5xl">
        <p ref={subtitleRef} className="text-xs md:text-sm uppercase tracking-[0.35em] mb-6 text-brand-accent opacity-0 font-medium">
          Архитектурные резиденции в Metropolis Capital
        </p>
        
        {/* Line-by-line title reveal */}
        <div className="mb-4 sm:mb-6" style={{ perspective: '600px' }}>
          {['Nova Residence', 'Искусство Жизни'].map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <span 
                ref={addLineRef}
                className="block text-[2.1rem] sm:text-5xl md:text-7xl lg:text-[7.5rem] font-display uppercase tracking-tight leading-[0.98] sm:leading-[0.95]"
                style={{ willChange: 'transform' }}
              >
                {line}
              </span>
            </span>
          ))}
        </div>

        <p ref={descRef} className="text-xs sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-6 sm:mb-10 opacity-0 leading-relaxed font-light px-2">
          Авторские жилые комплексы с панорамными видами, приватными парками и беспроцентной рассрочкой 0% до 36 месяцев напрямую от застройщика.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full max-w-sm sm:max-w-none mx-auto">
          <button
            type="button"
            onClick={() => scrollToSection('projects')}
            className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 bg-brand-accent text-brand-dark rounded-full text-xs uppercase tracking-widest font-bold hover:bg-white hover:shadow-[0_0_40px_rgba(185,151,91,0.5)] transition-all duration-300"
          >
            Смотреть резиденции
          </button>
          <button 
            type="button"
            onClick={() => onOpenConsultation ? onOpenConsultation() : scrollToSection('calculator')}
            className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 border border-white/30 rounded-full text-xs uppercase tracking-widest hover:bg-white/10 transition-all duration-300 text-white"
          >
            Рассчитать рассрочку
          </button>
        </div>
      </div>

      {/* USP bar */}
      <div ref={uspRef} className="absolute bottom-10 left-0 w-full z-20 hidden md:flex justify-center gap-12 text-[11px] uppercase tracking-[0.25em] text-white/60">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 bg-brand-accent rounded-full" />
          6 клубных комплексов
        </div>
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 bg-brand-accent rounded-full" />
          Рассрочка 0% без банков
        </div>
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 bg-brand-accent rounded-full" />
          Потолки от 3.3 до 3.8 м
        </div>
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 bg-brand-accent rounded-full" />
          Приватные парки и SPA
        </div>
      </div>

      {/* Scroll down indicator */}
      <button 
        type="button"
        onClick={() => scrollToSection('about')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/40 hover:text-brand-accent transition-colors"
        aria-label="Прокрутить вниз"
      >
        <span className="text-[10px] uppercase tracking-widest">Вниз</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
}
