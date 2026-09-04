import { useState } from 'react';
import { Phone, MessageSquare, ChevronUp, Calendar } from 'lucide-react';

interface FloatingContactProps {
  onOpenConsultation: () => void;
}

export default function FloatingContact({ onOpenConsultation }: FloatingContactProps) {
  const [expanded, setExpanded] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside aria-label="Быстрая связь" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3">
      {/* Scroll to top button */}
      <button
        type="button"
        onClick={scrollToTop}
        className="w-10 h-10 rounded-full bg-brand-dark/90 border border-white/20 text-white flex items-center justify-center shadow-lg hover:border-brand-accent hover:text-brand-accent transition-all backdrop-blur-md"
        aria-label="Наверх"
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      {/* Expanded Actions */}
      {expanded && (
        <div className="flex flex-col items-end gap-2 animate-slideUp">
          <button
            type="button"
            onClick={() => {
              setExpanded(false);
              onOpenConsultation();
            }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-brand-accent text-brand-dark text-xs font-bold shadow-xl hover:bg-white transition-colors"
          >
            <span>Заказать звонок</span>
            <Calendar className="w-4 h-4" />
          </button>
          <a
            href="https://wa.me/992907772233?text=Здравствуйте!%20Интересуют%20резиденции%20Nova%20Residence."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-emerald-600 text-white text-xs font-semibold shadow-xl hover:bg-emerald-500 transition-colors"
          >
            <span>Написать в WhatsApp</span>
            <MessageSquare className="w-4 h-4" />
          </a>
          <a
            href="tel:+992907772233"
            className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-brand-dark/95 border border-brand-accent/40 text-brand-accent text-xs font-semibold shadow-xl hover:bg-brand-accent hover:text-brand-dark transition-all backdrop-blur-md"
          >
            <span>+992 90 777 2233</span>
            <Phone className="w-4 h-4" />
          </a>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="relative group flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-brand-accent text-brand-dark font-bold text-xs uppercase tracking-widest shadow-[0_4px_25px_rgba(185,151,91,0.4)] hover:shadow-[0_4px_35px_rgba(185,151,91,0.6)] hover:bg-white transition-all duration-300"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-dark opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-dark"></span>
        </span>
        <span>Связаться</span>
      </button>
    </aside>
  );
}
