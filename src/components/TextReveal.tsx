import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TextRevealProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  stagger?: number;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export default function TextReveal({ 
  children, 
  className = '', 
  as: Tag = 'h2',
  delay = 0,
  stagger = 0.08,
  triggerRef,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const lines = containerRef.current.querySelectorAll('.line-inner');

    gsap.fromTo(lines, 
        { 
          y: '110%',
          rotateX: -80,
        },
        { 
          y: '0%',
          rotateX: 0,
          duration: 1.2,
          stagger,
          delay,
          ease: "power4.out",
          scrollTrigger: {
            trigger: triggerRef?.current || containerRef.current,
            start: "top 80%",
            once: true,
          }
        }
    );
  }, [delay, stagger, triggerRef]);

  const lines = children.split('\n');

  return (
    <div ref={containerRef} className={className} style={{ perspective: '400px' }}>
      <Tag className="m-0">
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden">
            <span className="line-inner block" style={{ willChange: 'transform' }}>
              {line}
            </span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
