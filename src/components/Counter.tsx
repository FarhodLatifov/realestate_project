import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface CounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}

export default function Counter({ 
  target, 
  suffix = '', 
  prefix = '',
  className = '',
  duration = 2,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(ref.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
            onEnter: () => {
              if (triggered.current) return;
              triggered.current = true;

              const obj = { val: 0 };
              gsap.to(obj, {
                val: target,
                duration,
                ease: "power2.out",
                onUpdate: () => {
                  if (ref.current) {
                    ref.current.textContent = prefix + Math.round(obj.val).toString().padStart(target < 10 ? 2 : 1, '0') + suffix;
                  }
                }
              });
            }
          }
        }
    );
  }, [target, suffix, prefix, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
