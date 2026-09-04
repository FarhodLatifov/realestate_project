import { useState, useEffect } from 'react';
import { X, Check, ArrowRight, MapPin, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Project, Plan } from '../data/projects';

interface ProjectModalProps {
  project: Project | null;
  initialPlanSlug?: string;
  onClose: () => void;
  onBookPlan?: (projectTitle: string, planLabel: string) => void;
}

export default function ProjectModal({ project, initialPlanSlug, onClose, onBookPlan }: ProjectModalProps) {
  const [selectedPlanSlug, setSelectedPlanSlug] = useState<string>('');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'plans' | 'gallery'>('overview');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [clientPhone, setClientPhone] = useState('');

  useEffect(() => {
    if (project) {
      setSelectedPlanSlug(initialPlanSlug || project.plans[0]?.slug || '');
      setActiveImageIndex(0);
      setActiveTab(initialPlanSlug ? 'plans' : 'overview');
      setBookingSuccess(false);
      setClientPhone('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project, initialPlanSlug]);

  if (!project) return null;

  const allImages = [project.detailImage, ...project.gallery];
  const currentPlan: Plan | undefined = project.plans.find((p) => p.slug === selectedPlanSlug) || project.plans[0];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientPhone.trim()) return;
    setBookingSuccess(true);
    setTimeout(() => {
      if (onBookPlan && currentPlan) {
        onBookPlan(project.title, currentPlan.label);
      }
    }, 1500);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-3 md:p-6 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] bg-brand-dark border border-white/15 rounded-2xl overflow-hidden flex flex-col text-brand-text-light shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-brand-dark/95 z-10 shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-brand-accent/20 text-brand-accent border border-brand-accent/30">
              {project.categoryLabel}
            </span>
            <h2 className="text-xl md:text-2xl font-display uppercase tracking-wide">
              {project.title}
            </h2>
          </div>
          
          <button 
            type="button" 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            aria-label="Закрыть окно"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-brand-dark/60 px-6 shrink-0 gap-6 text-xs uppercase tracking-widest">
          <button 
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`py-3 font-semibold transition-colors border-b-2 -mb-px ${
              activeTab === 'overview' ? 'border-brand-accent text-brand-accent' : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            О резиденции
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('plans')}
            className={`py-3 font-semibold transition-colors border-b-2 -mb-px ${
              activeTab === 'plans' ? 'border-brand-accent text-brand-accent' : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            Планировки ({project.plans.length})
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`py-3 font-semibold transition-colors border-b-2 -mb-px ${
              activeTab === 'gallery' ? 'border-brand-accent text-brand-accent' : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            Галерея ({allImages.length})
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-8 flex-1">
          {activeTab === 'overview' && (
            <>
              {/* Hero Image & Quick Specs Banner */}
              <div className="relative rounded-xl overflow-hidden aspect-[16/9] md:aspect-[21/9]">
                <img 
                  src={project.detailImage} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <p className="text-sm md:text-base text-white/80 max-w-xl mb-3">
                    {project.subtitle}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs">
                    <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-brand-accent border border-brand-accent/30">
                      <MapPin className="w-3.5 h-3.5" />
                      {project.location}
                    </span>
                    <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-white/90 border border-white/20">
                      <Calendar className="w-3.5 h-3.5 text-brand-accent" />
                      {project.deliveryQuarter}
                    </span>
                    <span className="bg-brand-accent text-brand-dark font-bold px-3 py-1.5 rounded-full">
                      {project.priceFrom} ({project.pricePerMeter})
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Architecture Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <p className="text-[11px] uppercase tracking-wider text-white/50 mb-1">Срок сдачи</p>
                  <p className="text-base font-semibold text-brand-accent">{project.deliveryQuarter}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <p className="text-[11px] uppercase tracking-wider text-white/50 mb-1">Этажность</p>
                  <p className="text-base font-semibold">{project.floors}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <p className="text-[11px] uppercase tracking-wider text-white/50 mb-1">Высота потолков</p>
                  <p className="text-base font-semibold">{project.ceilingHeight}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <p className="text-[11px] uppercase tracking-wider text-white/50 mb-1">Паркинг</p>
                  <p className="text-base font-semibold">{project.parkingSpots}</p>
                </div>
              </div>

              {/* Description & Features */}
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.25em] text-brand-accent mb-3">
                    Концепция проекта
                  </h3>
                  <p className="text-white/80 leading-relaxed text-sm md:text-base mb-6">
                    {project.details}
                  </p>
                  <p className="text-xs text-white/50 italic border-l-2 border-brand-accent pl-3">
                    {project.neighborhood}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs uppercase tracking-[0.25em] text-brand-accent mb-3">
                    Привилегии резидентов
                  </h3>
                  <div className="space-y-2.5">
                    {project.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 text-xs md:text-sm text-white/90">
                        <span className="w-5 h-5 rounded-full bg-brand-accent/20 text-brand-accent flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3" />
                        </span>
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'plans' && (
            <div className="space-y-6">
              {/* Plan selector pills */}
              <div className="flex flex-wrap gap-2">
                {project.plans.map((p) => (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => setSelectedPlanSlug(p.slug)}
                    className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all ${
                      selectedPlanSlug === p.slug
                        ? 'bg-brand-accent text-brand-dark font-bold shadow-md'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {currentPlan && (
                <div className="grid md:grid-cols-12 gap-8 items-center bg-white/[0.02] p-6 rounded-2xl border border-white/10">
                  {/* Plan Visual */}
                  <div className="md:col-span-7 rounded-xl overflow-hidden bg-black/40 p-4 border border-white/5">
                    <img 
                      src={currentPlan.image} 
                      alt={currentPlan.label} 
                      className="w-full h-72 md:h-96 object-cover rounded-lg"
                    />
                  </div>

                  {/* Plan Details & Room Breakdown */}
                  <div className="md:col-span-5 space-y-6">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-brand-accent font-semibold">
                        {currentPlan.floor} • Общая площадь {currentPlan.area}
                      </span>
                      <h3 className="text-2xl font-display uppercase mt-1 mb-2">
                        {currentPlan.label}
                      </h3>
                      <p className="text-xl font-bold text-brand-accent">
                        {currentPlan.priceEstimate}
                      </p>
                    </div>

                    <div className="space-y-2 border-y border-white/10 py-4 text-xs">
                      <p className="text-white/40 uppercase tracking-widest text-[10px] mb-2">Экспликация помещений:</p>
                      {currentPlan.rooms.map((r, i) => (
                        <div key={i} className="flex justify-between py-1 border-b border-white/5 last:border-0">
                          <span className="text-white/70">{r.name}</span>
                          <span className="font-semibold text-white">{r.area}</span>
                        </div>
                      ))}
                    </div>

                    {/* Quick Booking Form */}
                    {bookingSuccess ? (
                      <div className="p-4 rounded-xl bg-emerald-900/30 border border-emerald-500/40 text-center text-emerald-300 text-xs">
                        <Check className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
                        Заявка принята! Персональный менеджер свяжется с вами в течение 10 минут.
                      </div>
                    ) : (
                      <form onSubmit={handleBookingSubmit} className="space-y-3">
                        <input
                          id="modal-client-phone"
                          name="clientPhone"
                          type="tel"
                          placeholder="Ваш номер телефона (+...)"
                          aria-label="Номер телефона для бронирования"
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          required
                          className="w-full px-4 py-3 text-xs bg-white/5 border border-white/20 rounded-full text-white placeholder-white/40 focus:outline-none focus:border-brand-accent"
                        />
                        <button
                          type="submit"
                          className="w-full py-3.5 rounded-full bg-brand-accent text-brand-dark font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2"
                        >
                          Забронировать планировку <ArrowRight className="w-4 h-4" />
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-6">
              {/* Main large preview */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-black">
                <img 
                  src={allImages[activeImageIndex]} 
                  alt={`${project.title} фото`} 
                  className="w-full h-full object-cover"
                />
                
                {/* Carousel navigation controls */}
                <button
                  type="button"
                  onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-brand-accent hover:text-brand-dark transition-colors"
                  aria-label="Предыдущее фото"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-brand-accent hover:text-brand-dark transition-colors"
                  aria-label="Следующее фото"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx ? 'border-brand-accent scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Миниатюра" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="px-6 py-4 border-t border-white/10 bg-brand-dark/95 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-white/60 text-center sm:text-left">
            Условия покупки: <span className="text-brand-accent font-semibold">{project.installment}</span>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="https://wa.me/992907772233"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-full border border-white/20 text-xs uppercase tracking-widest text-center hover:border-brand-accent hover:text-brand-accent transition-colors"
            >
              Консультация в WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setActiveTab('plans')}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-brand-accent text-brand-dark font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors"
            >
              Выбрать квартиру
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
