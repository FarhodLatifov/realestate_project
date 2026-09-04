import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MANIFESTO_TEXT = 
  "Мы строим не просто здания. Мы создаем пространство абсолютного спокойствия, где каждая линия европейской архитектуры подчеркивает статус владельца, а каждый рассвет за панорамным остеклением дарит ощущение истинной свободы и гармонии.";

export default function TextScrollHighlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsContainerRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !wordsContainerRef.current) return;

    const words = wordsContainerRef.current.querySelectorAll('.scroll-word');

    // Create a scrubbed animation that lights up words in sequence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        end: "bottom 35%",
        scrub: 0.8,
      }
    });

    tl.to(words, {
      opacity: 1,
      color: "#f8f8f8",
      stagger: 0.08,
      ease: "power1.out",
    });

    // Subtitle / signature reveal
    if (authorRef.current) {
      gsap.fromTo(authorRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: authorRef.current,
            start: "top 85%",
          }
        }
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  const words = MANIFESTO_TEXT.split(' ');

  return (
    <section 
      ref={sectionRef} 
      className="py-24 md:py-36 px-6 md:px-12 bg-gradient-to-b from-brand-dark via-[#121214] to-brand-dark text-brand-text-light relative overflow-hidden border-t border-white/5"
    >
      {/* Subtle radial ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Category badge */}
        <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-brand-accent/30 text-[11px] uppercase tracking-[0.3em] text-brand-accent font-semibold mb-8 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          Философия девелопмента
        </div>

        <Quote className="w-8 h-8 md:w-12 md:h-12 mx-auto text-brand-accent/40 mb-6" />

        {/* Dynamic word-by-word highlighted text */}
        <p 
          ref={wordsContainerRef}
          className="text-2xl sm:text-3xl md:text-5xl lg:text-[3.2rem] font-display font-medium leading-[1.3] md:leading-[1.25] tracking-tight max-w-4xl mx-auto"
        >
          {words.map((word, index) => (
            <span 
              key={index} 
              className="scroll-word inline-block mr-[0.28em] transition-colors text-white/20 will-change-[color,opacity]"
            >
              {word}
            </span>
          ))}
        </p>

        {/* Author / Manifesto Signature */}
        <div ref={authorRef} className="mt-12 flex flex-col items-center justify-center">
          <div className="h-8 w-[1px] bg-gradient-to-b from-brand-accent to-transparent mb-4" />
          <p className="text-sm font-display tracking-widest uppercase text-white font-semibold">
            Nova Residence Architectural Board
          </p>
          <p className="text-xs font-mono text-brand-accent/80 mt-1 uppercase tracking-wider">
            Стремление к безупречности в каждой детали
          </p>
        </div>
      </div>
    </section>
  );
}
