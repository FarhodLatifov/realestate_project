import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, X, Navigation } from 'lucide-react';
import { projects, type Project } from '../data/projects';

interface LocationProps {
  onSelectProject?: (project: Project) => void;
}

const mapLocations = [
  { id: '01', slug: 'lumiere-residence', title: 'LUMIÈRE RESIDENCE', status: 'Строится (IV кв. 2026)', district: 'Metropolis Central', position: 'left-[42%] top-[38%]' },
  { id: '02', slug: 'vista-waterfront', title: 'VISTA WATERFRONT', status: 'Сдача в 2026', district: 'Marina Waterfront', position: 'left-[68%] top-[28%]' },
  { id: '03', slug: 'the-royale-empire', title: 'THE ROYALE EMPIRE', status: 'Сдача в 2025', district: 'Embassy Quarter', position: 'left-[32%] top-[58%]' },
  { id: '04', slug: 'skyline-horizon', title: 'SKYLINE HORIZON', status: 'Строится (2027)', district: 'Financial District', position: 'left-[78%] top-[62%]' },
  { id: '05', slug: 'botanica-oasis', title: 'BOTANICA OASIS', status: 'Сдача в 2027', district: 'Green Park Avenue', position: 'left-[22%] top-[74%]' },
  { id: '06', slug: 'aurora-riverfront', title: 'AURORA RIVERFRONT', status: 'Сдан в эксплуатацию', district: 'Riverside Bay', position: 'left-[84%] top-[40%]' },
];

export default function Location({ onSelectProject }: LocationProps) {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapImageRef = useRef<HTMLDivElement>(null);
  const [mapOpen, setMapOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(mapLocations[0]);

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !mapRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      }
    });

    tl.fromTo(textRef.current.children, 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
    ).fromTo(mapRef.current,
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: "power3.inOut" },
      "-=0.4"
    );

    if (mapImageRef.current) {
      gsap.to(mapImageRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: mapRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    }

  }, []);

  const handleOpenProjectDetails = (slug: string) => {
    setMapOpen(false);
    if (onSelectProject) {
      const found = projects.find((p) => p.slug === slug);
      if (found) onSelectProject(found);
    }
  };

  return (
    <section ref={containerRef} id="map" className="py-24 md:py-40 px-6 md:px-12 bg-brand-dark text-brand-text-light border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center">
        <div ref={textRef} className="w-full md:w-1/3 flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.3em] mb-4 text-brand-accent font-semibold">
            Месторасположение • Картография
          </p>
          <h2 className="text-3xl md:text-5xl font-display mb-6 uppercase leading-tight">
            Metropolis<br />
            <span className="text-brand-accent">Capital</span>
          </h2>
          <p className="text-white/70 mb-8 leading-relaxed text-sm md:text-base">
            Все резиденции возводятся в наиболее привлекательных и экологически чистых точках столицы с развитой приватной инфраструктурой.
          </p>
          
          <ul className="space-y-4 text-xs uppercase tracking-widest text-white/80">
            <li className="flex justify-between border-b border-white/10 pb-3">
              <span>Международный аэропорт</span>
              <span className="text-brand-accent font-semibold">15 мин</span>
            </li>
            <li className="flex justify-between border-b border-white/10 pb-3">
              <span>Финансовый квартал & Сити</span>
              <span className="text-brand-accent font-semibold">5 мин</span>
            </li>
            <li className="flex justify-between border-b border-white/10 pb-3">
              <span>Яхт-клуб & Марина</span>
              <span className="text-brand-accent font-semibold">8 мин</span>
            </li>
            <li className="flex justify-between border-b border-white/10 pb-3">
              <span>Оперный театр и парки</span>
              <span className="text-brand-accent font-semibold">3 мин</span>
            </li>
          </ul>
        </div>
        
        <div className="w-full md:w-2/3">
          <div ref={mapRef} className="w-full aspect-square md:aspect-[16/10] bg-brand-light/5 rounded-3xl relative overflow-hidden border border-white/10 shadow-2xl">
            {/* High-res metropolis skyline night texture */}
            <div 
              ref={mapImageRef} 
              className="absolute inset-[-8%] bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85')] bg-cover bg-center opacity-45 mix-blend-luminosity" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />

            {/* Simulated interactive mini pins on preview */}
            {mapLocations.slice(0, 4).map((loc) => (
              <div 
                key={loc.id} 
                className={`absolute ${loc.position} flex items-center gap-2 pointer-events-none`}
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-accent"></span>
                </span>
                <span className="hidden sm:block text-[10px] uppercase tracking-widest text-white/90 bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
                  {loc.title}
                </span>
              </div>
            ))}

            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                onClick={() => setMapOpen(true)}
                className="group flex items-center gap-3 border border-brand-accent/50 bg-brand-dark/80 px-8 py-4 rounded-full text-xs uppercase tracking-widest backdrop-blur-md transition-all duration-300 hover:border-brand-accent hover:bg-brand-accent hover:text-brand-dark shadow-xl"
              >
                <Navigation className="h-4 w-4 text-brand-accent transition-transform duration-300 group-hover:rotate-45 group-hover:text-brand-dark" />
                Интерактивная карта объектов
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Map Modal */}
      {mapOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md md:p-10 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          onClick={() => setMapOpen(false)}
        >
          <div
            className="relative grid max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-3xl bg-brand-dark border border-white/15 text-white shadow-2xl md:grid-cols-[1.3fr_0.7fr]"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Visual Interactive Map Area */}
            <div className="relative min-h-[380px] overflow-hidden bg-brand-dark md:min-h-[580px]">
              <div className="absolute inset-[-8%] bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85')] bg-cover bg-center opacity-60" />
              <div className="absolute inset-0 bg-brand-dark/40" />
              
              <div className="absolute left-6 top-6 rounded-full bg-black/70 px-4 py-2 text-xs uppercase tracking-widest text-white/90 border border-white/10 backdrop-blur-md">
                Metropolis Capital Map
              </div>

              {mapLocations.map((location) => (
                <button
                  key={location.id}
                  type="button"
                  onClick={() => setSelectedLocation(location)}
                  className={`absolute ${location.position} group -translate-x-1/2 -translate-y-1/2 z-10`}
                >
                  <span className={`flex h-11 w-11 items-center justify-center rounded-full border text-xs font-bold transition-all duration-300 ${
                    selectedLocation.id === location.id 
                      ? 'scale-125 border-brand-accent bg-brand-accent text-brand-dark shadow-[0_0_25px_rgba(185,151,91,0.8)]' 
                      : 'border-white/60 bg-brand-dark/80 text-white group-hover:scale-110 group-hover:border-brand-accent'
                  }`}>
                    {location.id}
                  </span>
                  <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap bg-black/90 px-3 py-1.5 rounded text-[10px] uppercase tracking-widest text-white border border-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {location.title}
                  </span>
                </button>
              ))}

              <div className="absolute bottom-6 left-6 flex items-center gap-2 text-xs uppercase tracking-widest text-white/80 bg-black/70 px-3 py-1.5 rounded-full border border-white/10">
                <span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
                6 премиальных резиденций
              </div>
            </div>

            {/* Selected Location Details Panel */}
            <div className="relative flex flex-col justify-between p-6 md:p-10 bg-brand-dark/95 border-l border-white/10">
              <button
                type="button"
                onClick={() => setMapOpen(false)}
                className="absolute right-5 top-5 p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                aria-label="Закрыть карту"
              >
                <X className="h-6 w-6" />
              </button>

              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-brand-accent font-semibold block mb-2">
                  {selectedLocation.district}
                </span>
                <h3 className="text-3xl md:text-4xl font-display uppercase leading-tight pr-6">
                  {selectedLocation.title}
                </h3>
                
                <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-wider text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  {selectedLocation.status}
                </div>

                <p className="mt-6 text-sm text-white/70 leading-relaxed">
                  Идеальное транспортное сообщение, шаговая доступность лучших ресторанов, парков и международных школ столицы.
                </p>
              </div>

              <div className="mt-8 space-y-3">
                <button
                  type="button"
                  onClick={() => handleOpenProjectDetails(selectedLocation.slug)}
                  className="w-full py-4 rounded-full bg-brand-accent text-brand-dark font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2"
                >
                  Смотреть проект и цены <ArrowUpRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setMapOpen(false)}
                  className="w-full py-3.5 rounded-full border border-white/20 text-xs uppercase tracking-widest hover:border-white text-white/80 transition-colors"
                >
                  Закрыть карту
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
