import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Amenity {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  tag: string;
}

const amenities: Amenity[] = [
  { 
    id: '01', 
    title: 'Infinity Pool & Sky Lounge', 
    subtitle: 'Высота 85 метров',
    desc: 'Круглогодичный подогреваемый панорамный бассейн на видовой крыше с приватным лаунж-баром и шезлонгами только для резидентов.',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80',
    tag: 'Акватермальный комплекс'
  },
  { 
    id: '02', 
    title: 'Консьерж-сервис 24/7', 
    subtitle: 'Уровень 5-звездочного отеля',
    desc: 'Служба портье премиального уровня: встреча гостей, бронирование перелетов, ресторанов, клининг, химчистка и доставка.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    tag: 'Безупречный сервис'
  },
  { 
    id: '03', 
    title: 'Подземный паркинг с EV', 
    subtitle: '2 машиноместа на квартиру',
    desc: 'Отапливаемый охраняемый паркинг с прямым доступом к скоростным лифтам Kone, системами сверхбыстрой зарядки электромобилей и детейлингом.',
    image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1000&q=80',
    tag: 'Инфраструктура мобильности'
  },
  { 
    id: '04', 
    title: 'Приватный парк 1.2 га', 
    subtitle: 'Двор без машин',
    desc: 'Закрытый внутренний ландшафтный сад от европейского бюро: вековые деревья, зоны для утренней йоги, эко-воркаут и музыкальные фонтаны.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1000&q=80',
    tag: 'Экологический оазис'
  },
  { 
    id: '05', 
    title: 'Smart Ecosystem & Face ID', 
    subtitle: 'Интеллект здания',
    desc: 'Бесконтактный доступ по биометрии, системы тонкой очистки воздуха до уровня операционных, фильтрация питьевой воды и контроль со смартфона.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1000&q=80',
    tag: 'Технологии комфорта'
  },
];

export default function Amenities() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef<number>(1);
  const [activeItemIndex, setActiveItemIndex] = useState<number>(1);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    let cachedScrollAmount = 0;
    const getScrollAmount = () => {
      if (!containerRef.current) return 0;
      const scrollDist = containerRef.current.scrollWidth - window.innerWidth;
      cachedScrollAmount = -Math.max(0, scrollDist);
      return cachedScrollAmount;
    };

    // Pre-calculate initial scroll distance
    getScrollAmount();

    const tween = gsap.to(containerRef.current, {
      x: () => cachedScrollAmount,
      ease: "none",
      force3D: true,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${Math.abs(getScrollAmount())}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.7,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        onRefresh: () => {
          getScrollAmount();
        },
        onUpdate: (self) => {
          // Update progress bar width directly in DOM
          if (progressLineRef.current) {
            progressLineRef.current.style.width = `${self.progress * 100}%`;
          }
          // Calculate active card index (1 to amenities.length)
          const newIndex = Math.min(
            amenities.length,
            Math.max(1, Math.floor(self.progress * amenities.length) + 1)
          );
          if (newIndex !== activeIndexRef.current) {
            activeIndexRef.current = newIndex;
            setActiveItemIndex(newIndex);
          }
        }
      }
    });

    return () => {
      if (tween.scrollTrigger) {
        tween.scrollTrigger.kill(true);
      }
      tween.kill();
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="amenities" 
      className="relative w-full min-w-full flex flex-col justify-center h-[100dvh] overflow-hidden bg-brand-dark text-brand-text-light border-t border-white/10 z-20"
      style={{ width: '100%', maxWidth: '100vw' }}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header bar pinned inside section */}
      <div className="absolute z-20 top-6 sm:top-10 md:top-16 left-4 sm:left-6 md:left-12 right-4 sm:right-6 md:right-12 flex items-end justify-between pointer-events-none">
        <div className="pointer-events-auto">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-1.5 text-brand-accent font-semibold flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            Привилегии резидентов
          </p>
          <h2 className="text-xl sm:text-3xl md:text-5xl tracking-tight uppercase font-display">
            Клубная инфраструктура
          </h2>
        </div>

        {/* Counter and Scroll hint */}
        <div className="flex items-center gap-4 sm:gap-6 pointer-events-auto shrink-0">
          <div className="hidden sm:flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
            <span>Прокручивайте</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-accent" />
          </div>
          <div className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md font-mono text-xs sm:text-sm">
            <span className="text-brand-accent font-bold">0{activeItemIndex}</span>
            <span className="text-white/40"> / 0{amenities.length}</span>
          </div>
        </div>
      </div>

      {/* Horizontal Cards Container */}
      <div 
        ref={containerRef} 
        className="flex items-center h-full gap-5 sm:gap-8 md:gap-12 px-4 sm:px-6 md:px-12 pt-20 sm:pt-28 pb-12 sm:pb-16 w-max will-change-transform"
      >
        {amenities.map((item, index) => (
          <div 
            key={item.id} 
            className="group w-[82vw] sm:w-[55vw] md:w-[40vw] lg:w-[32vw] max-w-[420px] flex flex-col shrink-0 rounded-2xl sm:rounded-3xl bg-brand-dark/90 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300 hover:border-brand-accent/50"
          >
            {/* Card Image */}
            <div className="relative aspect-[16/9] sm:aspect-[16/10] overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                loading="lazy"
                width={800}
                height={500}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex gap-2">
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-brand-dark/80 backdrop-blur-md border border-white/10 text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-brand-accent">
                  {item.tag}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-end justify-between text-white">
                <span className="text-[11px] sm:text-xs uppercase font-mono text-brand-accent tracking-wider">
                  {item.subtitle}
                </span>
                <span className="text-2xl sm:text-3xl font-display font-bold text-white/30 group-hover:text-brand-accent transition-colors">
                  {item.id}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-display uppercase tracking-tight text-white mb-2 sm:mb-3 group-hover:text-brand-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-wider text-white/50">
                <span className="flex items-center gap-1.5 text-brand-accent">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Клубный доступ
                </span>
                <span className="font-mono">
                  {index + 1} из {amenities.length}
                </span>
              </div>
            </div>
          </div>
        ))}
        {/* Extra spacing padding at end of scroll */}
        <div className="w-[10vw] h-full shrink-0" />
      </div>

      {/* Bottom Horizontal Progress Bar */}
      <div className="absolute bottom-6 md:bottom-8 left-6 md:left-12 right-6 md:right-12 z-20">
        <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
          <div 
            ref={progressLineRef} 
            className="h-full bg-gradient-to-r from-brand-accent to-white rounded-full transition-[width] duration-75"
            style={{ width: '0%' }}
          />
        </div>
      </div>
    </section>
  );
}
