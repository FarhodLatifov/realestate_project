import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Wind, VolumeX, SunMedium, Layers, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StandardCard {
  number: string;
  category: string;
  title: string;
  description: string;
  metrics: { label: string; value: string }[];
  image: string;
  icon: typeof ShieldCheck;
  color: string;
}

const standardsData: StandardCard[] = [
  {
    number: '01',
    category: 'Акустика и тишина',
    title: 'Шумоизоляция премиум-класса до 54 дБ',
    description: 'Многослойная конструкция «плавающих» полов, утолщенные межквартирные монолитные перегородки и виброизолированные бесшумные стояки канализации гарантируют абсолютную тишину в вашей резиденции.',
    metrics: [
      { label: 'Изоляция шума', value: '54 дБ' },
      { label: 'Толщина перекрытий', value: '250 мм' },
      { label: 'Бесшумные трубы', value: 'Rehau Raupiano' },
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    icon: VolumeX,
    color: 'from-amber-500/10 to-transparent',
  },
  {
    number: '02',
    category: 'Микроклимат и экология',
    title: 'Приточная вентиляция с очисткой PM2.5',
    description: 'Индивидуальные вентиляционные установки с трехступенчатой очисткой задерживают 99.8% пыли, аллергенов и смога. Система увлажнения и рекуперации поддерживает здоровый климат круглый год.',
    metrics: [
      { label: 'Очистка воздуха', value: '99.8%' },
      { label: 'Воздухообмен', value: '80 м³/ч на чел.' },
      { label: 'Уровень влажности', value: '45–55%' },
    ],
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    icon: Wind,
    color: 'from-blue-500/10 to-transparent',
  },
  {
    number: '03',
    category: 'Приватность и контроль',
    title: 'Бесшовный биометрический доступ Face ID',
    description: 'Умный дом нового поколения. От ворот паркинга до двери вашей квартиры — всё открывается по оптическому сканированию лица или мобильному NFC. Никаких связок ключей и пропусков.',
    metrics: [
      { label: 'Скорость Face ID', value: '0.2 сек' },
      { label: 'Камеры видеонаблюдения', value: '180+ HD' },
      { label: 'Контроль', value: 'Мобильное приложение' },
    ],
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
    icon: ShieldCheck,
    color: 'from-emerald-500/10 to-transparent',
  },
  {
    number: '04',
    category: 'Архитектурная оболочка',
    title: 'Витражи Guardian Glass и вентилируемый фасад',
    description: 'Панорамные стеклопакеты с двойным серебряным напылением отражают до 70% солнечного тепла летом и не выпускают тепло зимой. Фасады отделаны натуральным португальским известняком и керамогранитом.',
    metrics: [
      { label: 'Энергоэффективность', value: 'Класс A++' },
      { label: 'Защита от УФ', value: '99%' },
      { label: 'Срок службы фасада', value: '70+ лет' },
    ],
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    icon: SunMedium,
    color: 'from-brand-accent/10 to-transparent',
  },
];

interface StandardsStackProps {
  onOpenConsultation?: () => void;
}

export default function StandardsStack({ onOpenConsultation }: StandardsStackProps) {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    // Apply scroll stacking scale and fade to each card except the last
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;

      const nextCard = cards[i + 1];

      gsap.to(card, {
        scale: 0.93 - (cards.length - 1 - i) * 0.02,
        opacity: 0.45,
        yPercent: -4,
        force3D: true,
        ease: "power1.out",
        scrollTrigger: {
          trigger: nextCard,
          start: "top 70%",
          end: "top 25%",
          scrub: 0.5,
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger && containerRef.current?.contains(t.trigger as Node)) {
          t.kill();
        }
      });
    };
  }, []);

  const addCardRef = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section 
      ref={containerRef} 
      id="standards" 
      className="py-16 sm:py-24 md:py-36 px-4 sm:px-6 md:px-12 bg-[#0c0c0e] text-brand-text-light border-t border-white/5 relative w-full overflow-hidden z-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-24">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-2.5 sm:mb-3 text-brand-accent font-semibold flex items-center justify-center gap-2">
            <Layers className="w-3.5 h-3.5" />
            Инженерные стандарты Nova
          </p>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-display uppercase tracking-tight text-white mb-4 sm:mb-6 leading-tight">
            Технологии приватности <br />
            <span className="text-brand-accent">и совершенства</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-white/70 leading-relaxed font-light">
            Каждое инженерное решение спроектировано так, чтобы ваш комфорт был абсолютным и незаметным: от чистоты горного воздуха в спальне до полной тишины за стенами.
          </p>
        </div>

        {/* Stacked Cards Container */}
        <div className="relative flex flex-col gap-8 sm:gap-12 pb-16">
          {standardsData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.number}
                ref={addCardRef}
                style={{ top: `clamp(65px, calc(65px + ${index} * 14px), 160px)` }}
                className="sticky rounded-2xl sm:rounded-3xl bg-brand-dark/95 border border-white/15 p-5 sm:p-8 md:p-12 shadow-2xl backdrop-blur-2xl transition-all will-change-transform overflow-hidden"
              >
                {/* Subtle gradient accent inside card */}
                <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl ${item.color} rounded-full blur-[100px] pointer-events-none`} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
                  {/* Left Column: Info & Metrics */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      {/* Top badge */}
                      <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-brand-accent/20 border border-brand-accent/40 flex items-center justify-center text-brand-accent">
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-brand-accent">
                          Стандарт {item.number} / {item.category}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl md:text-4xl font-display uppercase tracking-tight text-white mb-3 sm:mb-4 leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm md:text-base text-white/70 leading-relaxed font-light mb-6 sm:mb-8">
                        {item.description}
                      </p>
                    </div>

                    {/* Metrics row */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-6 border-t border-white/10">
                      {item.metrics.map((metric, mi) => (
                        <div key={mi}>
                          <p className="text-base sm:text-xl md:text-2xl font-display font-bold text-white">
                            {metric.value}
                          </p>
                          <p className="text-[9px] sm:text-[11px] uppercase tracking-wider text-white/50 mt-0.5 sm:mt-1">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Imagery */}
                  <div className="lg:col-span-5 relative aspect-[16/9] lg:aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-lg group">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      loading="lazy"
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs uppercase tracking-wider text-white/80">
                      <span className="font-mono">Лаборатория качества</span>
                      <button 
                        type="button"
                        onClick={onOpenConsultation}
                        className="flex items-center gap-1 text-brand-accent hover:text-white transition-colors"
                      >
                        Технический паспорт <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
