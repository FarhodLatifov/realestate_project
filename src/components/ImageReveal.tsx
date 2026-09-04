import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  parallax?: boolean;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export default function ImageReveal({ 
  src, 
  alt, 
  className = '',
  parallax = true,
  direction = 'up',
}: ImageRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !imageRef.current) return;

    const clipMap = {
      up: { from: 'inset(100% 0 0 0)', to: 'inset(0% 0 0 0)' },
      down: { from: 'inset(0 0 100% 0)', to: 'inset(0 0 0% 0)' },
      left: { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0%)' },
      right: { from: 'inset(0 100% 0 0)', to: 'inset(0 0% 0 0)' },
    };

    const clip = clipMap[direction];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top 80%",
      }
    });

    tl.fromTo(wrapperRef.current,
      { clipPath: clip.from },
      { clipPath: clip.to, duration: 1.4, ease: "power4.inOut" }
    ).fromTo(imageRef.current,
      { scale: 1.3 },
      { scale: 1, duration: 1.8, ease: "power3.out" },
      "-=1.2"
    );

    // Parallax on scroll
    if (parallax) {
      gsap.to(imageRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    }
  }, [direction, parallax]);

  return (
    <div ref={wrapperRef} className={`overflow-hidden ${className}`} style={{ clipPath: 'inset(100% 0 0 0)' }}>
      <img 
        ref={imageRef} 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover scale-130"
      />
    </div>
  );
}
