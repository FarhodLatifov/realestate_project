import { useEffect, useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const LOGO_URL = '/logo.svg';

interface HeaderProps {
  onOpenConsultation?: () => void;
}

const navLinks = [
  { label: 'Новостройки', id: 'projects' },
  { label: 'О девелопере', id: 'about' },
  { label: 'Инфраструктура', id: 'amenities' },
  { label: 'Стандарты', id: 'standards' },
  { label: 'Планировки', id: 'apartments' },
  { label: 'Рассрочка 0%', id: 'calculator' },
  { label: 'Локация', id: 'map' },
  { label: 'Контакты', id: 'contact' },
];

export default function Header({ onOpenConsultation }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const scrolledRef = useRef(false);

  useEffect(() => {
    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const isPastThreshold = window.scrollY > 40;
        if (isPastThreshold !== scrolledRef.current) {
          scrolledRef.current = isPastThreshold;
          setScrolled(isPastThreshold);
        }
        if (progressBarRef.current) {
          const winHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (winHeight > 0) {
            progressBarRef.current.style.width = `${(window.scrollY / winHeight) * 100}%`;
          }
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out px-6 md:px-12 flex justify-between items-center ${
          scrolled ? 'bg-brand-dark/95 backdrop-blur-md py-3 shadow-lg border-b border-white/10' : 'bg-transparent py-5'
        }`}
      >
        {/* Top page scroll progress bar */}
        <div 
          ref={progressBarRef}
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-brand-accent via-white to-brand-accent will-change-[width]"
          style={{ width: '0%' }}
        />

        <a href="/" className="shrink-0 flex items-center gap-3">
          <img 
            src={LOGO_URL} 
            alt="Nova Residence" 
            width={140}
            height={44}
            className="h-10 md:h-11 w-auto"
          />
          <span className="hidden sm:inline-block text-[10px] uppercase tracking-[0.25em] text-white/50 border-l border-white/20 pl-3">
            Metropolis Capital
          </span>
        </a>
        
        <nav className="hidden xl:flex items-center gap-6 text-[11px] uppercase tracking-widest text-brand-text-light font-medium">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              type="button"
              onClick={() => scrollToSection(link.id)} 
              className="hover:text-brand-accent transition-colors duration-300 py-1"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a 
            href="tel:+992907772233" 
            className="hidden lg:block text-xs uppercase tracking-widest hover:text-brand-accent transition-colors text-brand-text-light font-mono"
          >
            +992 90 777 2233
          </a>
          <button 
            type="button"
            onClick={onOpenConsultation}
            className="hidden sm:block px-5 py-2.5 border border-brand-accent/50 bg-brand-accent/10 rounded-full text-xs uppercase tracking-widest text-brand-accent hover:bg-brand-accent hover:text-brand-dark transition-all duration-300 font-semibold"
          >
            Заказать звонок
          </button>
          <button 
            type="button"
            className="xl:hidden text-brand-text-light z-[60] p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 bg-brand-dark/98 backdrop-blur-lg z-[55] flex flex-col items-center justify-center gap-6 transition-all duration-300 ease-out px-6 ${
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col items-center gap-6">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              type="button"
              onClick={() => scrollToSection(link.id)}
              className="text-xl font-display uppercase tracking-widest text-brand-text-light hover:text-brand-accent transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col items-center gap-4">
          <a 
            href="tel:+992907772233" 
            className="text-lg text-brand-accent font-display"
          >
            +992 90 777 2233
          </a>
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              if (onOpenConsultation) onOpenConsultation();
            }}
            className="px-8 py-3 rounded-full bg-brand-accent text-brand-dark font-bold text-xs uppercase tracking-widest"
          >
            Заказать звонок
          </button>
        </div>
      </div>
    </>
  );
}
