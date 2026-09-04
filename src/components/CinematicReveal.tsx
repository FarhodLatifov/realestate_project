import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Compass, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CinematicRevealProps {
  onOpenConsultation?: () => void;
}

export default function CinematicReveal({ onOpenConsultation }: CinematicRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const mediaWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !mediaWrapperRef.current || !imageRef.current) return;

    const mm = gsap.matchMedia();

    // DESKTOP: Cinematic Pinning & Full-bleed Clip-path Zoom (>= 768px)
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          fastScrollEnd: true,
        }
      });

      // Animate the clip-path from inset rounded box to full bleed
      tl.fromTo(mediaWrapperRef.current,
        { clipPath: "inset(12% 14% round 36px)" },
        { clipPath: "inset(0% 0% round 0px)", ease: "power2.inOut", force3D: true },
        0
      );

      // Zoom dolly effect on image
      tl.fromTo(imageRef.current,
        { scale: 1.22 },
        { scale: 1.0, ease: "power2.inOut", force3D: true },
        0
      );

      // Text overlay reveals during the middle-to-end of the zoom
      if (overlayTextRef.current) {
        tl.fromTo(overlayTextRef.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, ease: "power3.out", force3D: true },
          0.35
        );
      }
    });

    // MOBILE: Natural responsive view without screen freeze, void clips, or desktop pin (< 768px)
    mm.add("(max-width: 767px)", () => {
      if (mediaWrapperRef.current) {
        gsap.set(mediaWrapperRef.current, { clipPath: "none" });
      }

      // Smooth parallax on image
      gsap.fromTo(imageRef.current,
        { scale: 1.15 },
        {
          scale: 1.0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          }
        }
      );

      // Subtle fade in for text on mobile
      if (overlayTextRef.current) {
        gsap.fromTo(overlayTextRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
            }
          }
        );
      }
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-[580px] h-[85vh] md:h-screen overflow-hidden bg-brand-dark flex items-center justify-center border-t border-white/5"
    >
      {/* Media wrapper with adaptive clip-path mask on desktop and full cover on mobile */}
      <div 
        ref={mediaWrapperRef}
        className="absolute inset-0 w-full h-full overflow-hidden will-change-[clip-path,transform]"
      >
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=75"
          alt="Панорамный вид на жилой квартал Nova Residence"
          loading="lazy"
          decoding="async"
          width={1200}
          height={800}
          className="w-full h-full object-cover will-change-transform brightness-[0.8]"
        />

        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60 pointer-events-none" />

        {/* Corner luxury accent mark */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2.5 sm:gap-3 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-brand-dark/70 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs uppercase tracking-widest text-brand-accent">
          <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin [animation-duration:12s]" />
          <span>Архитектурная доминанта</span>
        </div>

        {/* Revealed Overlay Text */}
        <div 
          ref={overlayTextRef}
          className="absolute inset-x-4 sm:inset-x-6 bottom-8 sm:bottom-12 md:bottom-20 max-w-4xl mx-auto text-center flex flex-col items-center justify-center z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-brand-accent/20 border border-brand-accent/40 text-brand-accent text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-3 sm:mb-4 backdrop-blur-md">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            Видовые горизонты Metropolis
          </div>

          <h3 className="text-2xl sm:text-4xl md:text-6xl font-display uppercase tracking-tight text-white mb-3 sm:mb-4 leading-snug sm:leading-tight">
            Панорама, меняющая <br className="hidden sm:inline" />
            <span className="text-brand-accent">восприятие жизни</span>
          </h3>

          <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-xl md:max-w-2xl mx-auto mb-6 sm:mb-8 font-light leading-relaxed px-2">
            Широкоформатные стеклянные фасады от пола до потолка с нано-напылением и шумоизоляцией 52 дБ создают приватный оазис тишины в самом эпицентре деловой активности.
          </p>

          <button
            type="button"
            onClick={onOpenConsultation}
            className="w-full sm:w-auto px-7 py-3 sm:px-8 sm:py-3.5 rounded-full bg-brand-accent text-brand-dark text-xs uppercase tracking-widest font-bold hover:bg-white transition-all shadow-xl hover:shadow-brand-accent/40 flex items-center justify-center gap-2.5"
          >
            <Eye className="w-4 h-4" />
            Записаться на панорамный тур
          </button>
        </div>
      </div>
    </section>
  );
}
