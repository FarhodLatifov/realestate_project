import { useState } from 'react';
import { Eye } from 'lucide-react';
import Counter from './Counter';
import { projects, type Project } from '../data/projects';

interface ApartmentsProps {
  onSelectPlan: (project: Project, planSlug: string) => void;
  onOpenConsultation: () => void;
}

export default function Apartments({ onSelectPlan, onOpenConsultation }: ApartmentsProps) {
  const [selectedRoomFilter, setSelectedRoomFilter] = useState<number | 'all'>('all');

  // Flatten plans with their project context
  const allApartmentPlans = projects.flatMap((project) =>
    project.plans.map((plan) => ({
      ...plan,
      project,
    }))
  );

  const filteredPlans = allApartmentPlans.filter((item) => {
    if (selectedRoomFilter === 'all') return true;
    return item.roomsCount === selectedRoomFilter;
  });

  return (
    <section id="apartments" className="relative overflow-hidden py-28 md:py-36 px-6 md:px-12 bg-white text-brand-text-dark border-t border-brand-text-dark/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-16 md:mb-20 grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-accent">
              <span className="h-px w-10 bg-brand-accent" />
              Каталог планировок
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display uppercase leading-[0.95]">
              Пространство <br />
              <span className="text-brand-accent">под ваш стиль жизни</span>
            </h2>
          </div>
          <p className="max-w-md text-base text-brand-muted leading-relaxed">
            От функциональных видовых студий до двухуровневых пентхаусов с собственными террасами. Каждая планировка создана с учетом инсоляции и эргономики.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20 p-8 rounded-3xl bg-brand-light border border-brand-text-dark/10">
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-widest text-brand-muted mb-2">01 / Форматы</span>
            <Counter target={4} prefix="1–" className="text-4xl md:text-5xl font-display font-bold text-brand-text-dark" />
            <span className="text-xs uppercase tracking-wider text-brand-text-dark font-semibold mt-1">Комнаты</span>
            <p className="text-xs text-brand-muted mt-0.5">От эргономичных студий до пентхаусов</p>
          </div>

          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-widest text-brand-muted mb-2">02 / Площади</span>
            <Counter target={182} suffix=" м²" className="text-4xl md:text-5xl font-display font-bold text-brand-text-dark" />
            <span className="text-xs uppercase tracking-wider text-brand-text-dark font-semibold mt-1">Максимум</span>
            <p className="text-xs text-brand-muted mt-0.5">Просторные залы и мастер-спальни</p>
          </div>

          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-widest text-brand-muted mb-2">03 / Потолки</span>
            <div className="text-4xl md:text-5xl font-display font-bold text-brand-text-dark">до 3.8 м</div>
            <span className="text-xs uppercase tracking-wider text-brand-text-dark font-semibold mt-1">Объем и свет</span>
            <p className="text-xs text-brand-muted mt-0.5">Панорамное остекление в пол</p>
          </div>

          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-widest text-brand-muted mb-2">04 / Локации</span>
            <Counter target={6} className="text-4xl md:text-5xl font-display font-bold text-brand-text-dark" duration={1.5} />
            <span className="text-xs uppercase tracking-wider text-brand-text-dark font-semibold mt-1">Районов</span>
            <p className="text-xs text-brand-muted mt-0.5">Топовые локации Metropolis Capital</p>
          </div>
        </div>

        {/* Room Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-brand-text-dark/10">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all' as const, label: 'Все планировки' },
              { id: 1, label: '1-комнатные' },
              { id: 2, label: '2-комнатные' },
              { id: 3, label: '3-комнатные' },
              { id: 4, label: 'Пентхаусы' },
            ].map((tab) => (
              <button
                key={String(tab.id)}
                type="button"
                onClick={() => setSelectedRoomFilter(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${
                  selectedRoomFilter === tab.id
                    ? 'bg-brand-text-dark text-brand-text-light shadow-md'
                    : 'bg-brand-light text-brand-text-dark/70 hover:bg-black/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-brand-muted">
            Найдено вариантов: <strong className="text-brand-text-dark">{filteredPlans.length}</strong>
          </span>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlans.map((item) => (
            <div
              key={`${item.project.id}-${item.slug}`}
              className="group rounded-3xl bg-brand-light border border-brand-text-dark/10 p-6 flex flex-col justify-between hover:shadow-xl hover:border-brand-accent/50 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-brand-muted mb-4">
                  <span className="font-semibold text-brand-accent uppercase tracking-wider">
                    {item.project.title}
                  </span>
                  <span>{item.floor}</span>
                </div>

                <div 
                  className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-black/5 mb-5 cursor-pointer"
                  onClick={() => onSelectPlan(item.project, item.slug)}
                >
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-brand-dark px-4 py-2 rounded-full text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5 shadow-lg">
                      <Eye className="w-3.5 h-3.5" /> Схема комнат
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-lg font-display uppercase tracking-tight text-brand-text-dark">
                    {item.label}
                  </h3>
                  <span className="text-base font-bold text-brand-accent">
                    {item.priceEstimate}
                  </span>
                </div>

                <div className="space-y-1.5 my-4 border-t border-brand-text-dark/10 pt-3 text-xs text-brand-muted">
                  {item.rooms.slice(0, 3).map((r, i) => (
                    <div key={i} className="flex justify-between">
                      <span>{r.name}</span>
                      <span className="font-semibold text-brand-text-dark">{r.area}</span>
                    </div>
                  ))}
                  {item.rooms.length > 3 && (
                    <div className="text-[11px] text-brand-accent pt-1">
                      + ещё {item.rooms.length - 3} зоны (лоджия, гардеробная...)
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-brand-text-dark/10 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onSelectPlan(item.project, item.slug)}
                  className="flex-1 py-3 rounded-full bg-brand-text-dark text-white text-xs uppercase tracking-widest font-semibold hover:bg-brand-accent hover:text-brand-dark transition-colors flex items-center justify-center gap-1.5"
                >
                  Смотреть детали
                </button>
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="px-4 py-3 rounded-full border border-brand-text-dark/20 text-xs uppercase tracking-wider hover:border-brand-text-dark transition-colors"
                >
                  Бронь
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
