import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LOGO_URL = '/logo.svg';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !logoRef.current || !lineRef.current || !progressRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.2,
          ease: "power4.inOut",
          onComplete: onComplete,
        });
      }
    });

    tl.fromTo(logoRef.current, 
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" }
    )
    .fromTo(lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.2, ease: "power2.out" },
      "-=0.2"
    )
    .fromTo(progressRef.current,
      { width: '0%' },
      { width: '100%', duration: 1.2, ease: "power1.inOut" },
      "-=0.1"
    )
    .to(logoRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.2,
      ease: "power2.in",
    }, "+=0.2");

  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[100] bg-brand-dark flex flex-col items-center justify-center"
      style={{ clipPath: 'inset(0 0 0 0)' }}
    >
      <img 
        ref={logoRef} 
        src={LOGO_URL} 
        alt="Nova Residence" 
        className="w-auto h-16 mb-8 opacity-0 md:h-20"
      />
      <div ref={lineRef} className="w-48 h-px origin-left bg-white/20">
        <div ref={progressRef} className="w-0 h-full bg-brand-accent" />
      </div>
    </div>
  );
}
