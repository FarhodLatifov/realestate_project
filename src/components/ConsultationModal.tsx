import { useState, useEffect } from 'react';
import { X, CheckCircle, ArrowRight, ShieldCheck, Phone, User, Home } from 'lucide-react';
import { projects } from '../data/projects';

interface ConsultationModalProps {
  isOpen: boolean;
  initialNote?: string;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, initialNote, onClose }: ConsultationModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedProject, setSelectedProject] = useState(projects[0]?.title || '');
  const [preferredContact, setPreferredContact] = useState<'phone' | 'whatsapp' | 'telegram'>('whatsapp');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setName('');
      setPhone('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2800);
  };

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-brand-dark border border-white/15 rounded-3xl p-6 md:p-8 text-brand-text-light shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          aria-label="Закрыть окно"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-display uppercase">Заявка принята!</h3>
            <p className="text-sm text-white/70 max-w-sm mx-auto">
              Наш эксперт свяжется с вами через <span className="text-brand-accent uppercase">{preferredContact}</span> в течение 10 минут и вышлет персональную презентацию с планировками.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-accent font-semibold">
                Nova Residence • Metropolis Capital
              </span>
              <h3 className="text-2xl md:text-3xl font-display uppercase mt-1">
                Персональная консультация
              </h3>
              <p className="text-xs text-white/60 mt-1">
                Подберем идеальную планировку, рассчитаем персональный график рассрочки 0%
              </p>
              {initialNote && (
                <div className="mt-3 p-2.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-brand-accent">
                  {initialNote}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="consult-name" className="block text-[11px] uppercase tracking-wider text-white/50 mb-1.5">
                  Ваше имя
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    id="consult-name"
                    name="name"
                    type="text"
                    placeholder="Например: Александр"
                    aria-label="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 text-xs bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-brand-accent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="consult-phone" className="block text-[11px] uppercase tracking-wider text-white/50 mb-1.5">
                  Номер телефона <span className="text-brand-accent">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    id="consult-phone"
                    name="phone"
                    type="tel"
                    placeholder="+992 90 000 00 00"
                    aria-label="Номер телефона"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 text-xs bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-brand-accent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="consult-project" className="block text-[11px] uppercase tracking-wider text-white/50 mb-1.5">
                  Интересующий жилой комплекс
                </label>
                <div className="relative">
                  <Home className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    id="consult-project"
                    name="project"
                    aria-label="Интересующий жилой комплекс"
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 text-xs bg-brand-dark border border-white/15 rounded-xl text-white focus:outline-none focus:border-brand-accent appearance-none"
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.title} className="bg-brand-dark text-white">
                        {p.title} ({p.priceFrom})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-white/50 mb-1.5">
                  Удобный способ связи:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['whatsapp', 'phone', 'telegram'] as const).map((channel) => (
                    <button
                      key={channel}
                      type="button"
                      onClick={() => setPreferredContact(channel)}
                      className={`py-2 text-[11px] uppercase tracking-wider rounded-lg border transition-all ${
                        preferredContact === channel
                          ? 'border-brand-accent bg-brand-accent/20 text-brand-accent font-bold'
                          : 'border-white/10 text-white/60 hover:bg-white/5'
                      }`}
                    >
                      {channel === 'whatsapp' ? 'WhatsApp' : channel === 'phone' ? 'Звонок' : 'Telegram'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-brand-accent text-brand-dark font-bold text-xs uppercase tracking-widest hover:bg-white hover:shadow-[0_0_30px_rgba(185,151,91,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  Получить презентацию <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[10px] text-center text-white/40 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-brand-accent" />
                Конфиденциальность данных гарантирована
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
