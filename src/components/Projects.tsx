import { useState } from 'react';
import { ArrowUpRight, Sparkles, MapPin, Calendar, Layers } from 'lucide-react';
import { projects, type Project } from '../data/projects';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

export default function Projects({ onSelectProject }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'ready') return p.status === 'Сдан';
    return p.category === activeFilter;
  });

  return (
    <section id="projects" className="py-28 md:py-36 px-6 md:px-12 bg-brand-light text-brand-text-dark border-t border-brand-text-dark/10 relative w-full overflow-hidden z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-brand-accent font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Коллекция новостроек • 2025–2027
            </p>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display uppercase tracking-tight">
              Жилые комплексы
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'Все объекты' },
              { id: 'deluxe', label: 'De Luxe' },
              { id: 'premium', label: 'Premium' },
              { id: 'business', label: 'Business' },
              { id: 'ready', label: 'Сдан в эксплуатацию' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all duration-300 ${
                  activeFilter === tab.id
                    ? 'bg-brand-text-dark text-brand-text-light font-bold shadow-md'
                    : 'bg-black/5 text-brand-text-dark/70 hover:bg-black/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article 
              key={project.id} 
              className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-brand-text-dark/10 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
            >
              {/* Image & Badges */}
              <div 
                className="relative aspect-[4/3] overflow-hidden cursor-pointer"
                onClick={() => onSelectProject(project)}
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  loading="lazy" 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                
                {/* Status badge */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="rounded-full bg-brand-dark/85 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-text-light backdrop-blur-md border border-white/10">
                    {project.status}
                  </span>
                  <span className="rounded-full bg-brand-accent/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-dark backdrop-blur-md">
                    {project.categoryLabel}
                  </span>
                </div>

                {/* Price tag in image */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-white/70 block">Стоимость от:</span>
                    <span className="text-xl md:text-2xl font-display font-bold text-white">
                      {project.priceFrom}
                    </span>
                  </div>
                  <span className="text-xs text-white/80 font-mono">
                    {project.pricePerMeter}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-brand-muted mb-2">
                    <span className="font-mono">{project.id} / METROPOLIS</span>
                    <span className="flex items-center gap-1 text-brand-accent font-medium">
                      <Calendar className="w-3 h-3" />
                      {project.deliveryQuarter}
                    </span>
                  </div>

                  <h3 
                    onClick={() => onSelectProject(project)}
                    className="text-xl md:text-2xl font-display uppercase tracking-tight text-brand-text-dark group-hover:text-brand-accent transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>

                  <p className="mt-2 text-xs text-brand-muted line-clamp-2 leading-relaxed">
                    {project.details}
                  </p>

                  <div className="mt-4 pt-4 border-t border-brand-text-dark/10 flex items-center justify-between text-xs text-brand-muted">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-accent" />
                      {project.district}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Layers className="w-3.5 h-3.5 text-brand-accent" />
                      {project.floors}
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-6 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="flex-1 py-3 px-4 rounded-full bg-brand-text-dark text-brand-text-light text-xs uppercase tracking-widest font-semibold hover:bg-brand-accent hover:text-brand-dark transition-colors flex items-center justify-center gap-2"
                  >
                    Подробнее <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="py-3 px-4 rounded-full border border-brand-text-dark/20 text-brand-text-dark text-xs uppercase tracking-widest hover:border-brand-text-dark transition-colors"
                  >
                    Планировки
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
