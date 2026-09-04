import { useState } from 'react';
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { projects } from '../data/projects';

interface CtaProps {
  onOpenConsultation?: () => void;
}

export default function Cta({ onOpenConsultation }: CtaProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedProject, setSelectedProject] = useState(projects[0]?.title || '');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-28 md:py-40 px-6 bg-brand-dark text-brand-text-light border-t border-white/5 overflow-hidden">
      {/* Background with luxury evening facade */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1920&q=85')] bg-cover bg-center opacity-15"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-brand-dark" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-brand-accent font-semibold mb-4 px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20">
          <Sparkles className="w-3.5 h-3.5" />
          Персональный сервис
        </p>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-display uppercase leading-tight mb-6">
          Забронируйте резиденцию <br />
          <span className="text-brand-accent">на стартовых условиях</span>
        </h2>

        <p className="text-sm md:text-base text-white/70 max-w-xl mx-auto mb-12 leading-relaxed">
          Оставьте контакты для получения закрытого каталога планировок с ценами и специальными условиями беспроцентной рассрочки.
        </p>

        {isSubmitted ? (
          <div className="max-w-md mx-auto p-8 rounded-3xl bg-white/[0.05] border border-emerald-500/40 text-center backdrop-blur-md animate-fadeIn">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-xl font-display uppercase">Спасибо за обращение!</h3>
            <p className="text-xs text-white/70 mt-2">
              Ваш персональный менеджер свяжется с вами в течение 10 минут.
            </p>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                id="cta-name"
                name="name"
                type="text"
                placeholder="Ваше имя"
                aria-label="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-3.5 text-xs bg-white/5 border border-white/15 rounded-full text-white placeholder-white/40 focus:outline-none focus:border-brand-accent"
              />
              <input
                id="cta-phone"
                name="phone"
                type="tel"
                placeholder="Телефон: +..."
                aria-label="Номер телефона"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-5 py-3.5 text-xs bg-white/5 border border-white/15 rounded-full text-white placeholder-white/40 focus:outline-none focus:border-brand-accent"
              />
            </div>

            <select
              id="cta-project"
              name="project"
              aria-label="Выберите жилой комплекс"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full px-5 py-3.5 text-xs bg-brand-dark border border-white/15 rounded-full text-white focus:outline-none focus:border-brand-accent"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.title} className="bg-brand-dark text-white">
                  {p.title} ({p.priceFrom})
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-brand-accent text-brand-dark font-bold text-xs uppercase tracking-widest hover:bg-white hover:shadow-[0_0_35px_rgba(185,151,91,0.5)] transition-all duration-300 flex items-center justify-center gap-2"
            >
              Получить персональное предложение <ArrowRight className="w-4 h-4" />
            </button>

            {onOpenConsultation && (
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="text-[11px] uppercase tracking-wider text-brand-accent hover:text-white transition-colors underline underline-offset-4"
                >
                  Или откройте расширенную форму консультации
                </button>
              </div>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
