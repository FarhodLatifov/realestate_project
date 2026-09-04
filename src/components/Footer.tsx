const LOGO_URL = '/logo.svg';

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-dark text-brand-text-light py-20 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <img src={LOGO_URL} alt="Nova Residence" width={150} height={48} className="h-12 w-auto mb-6" />
          <p className="text-white/60 max-w-sm mb-6 text-sm leading-relaxed">
            Премиальные резиденции в Metropolis Capital от девелопера Nova Residence. Авторская европейская архитектура, просторные планировки, подземные паркинги и гибкая рассрочка 0%.
          </p>
          <a href="tel:+992907772233" className="text-xl font-display text-brand-accent hover:text-white transition-colors block">
            +992 90 777 2233
          </a>
          <span className="text-xs text-white/40 block mt-1">Отдел клиентского сервиса 24/7</span>
        </div>

        <div>
          <h3 className="uppercase tracking-widest text-xs mb-6 text-white/40 font-semibold">Навигация по сайту</h3>
          <ul className="space-y-3.5 text-xs uppercase tracking-wider text-white/70">
            <li>
              <button type="button" onClick={() => scrollTo('projects')} className="hover:text-brand-accent transition-colors">
                Жилые комплексы
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollTo('about')} className="hover:text-brand-accent transition-colors">
                О девелопере
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollTo('apartments')} className="hover:text-brand-accent transition-colors">
                Каталог планировок
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollTo('calculator')} className="hover:text-brand-accent transition-colors">
                Калькулятор рассрочки
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollTo('map')} className="hover:text-brand-accent transition-colors">
                Карта локаций
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollTo('contact')} className="hover:text-brand-accent transition-colors">
                Контакты
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="uppercase tracking-widest text-xs mb-6 text-white/40 font-semibold">Центральный офис</h3>
          <address className="not-italic text-xs text-white/80 space-y-2 leading-relaxed">
            <p className="font-semibold text-white">Metropolis Capital</p>
            <p>Grand Boulevard 48, Central Plaza, Tower A</p>
            <p className="text-white/50">Пн — Сб: 09:00 – 20:00</p>
          </address>
          <div className="mt-6 flex gap-3">
            <a 
              href="https://wa.me/992907772233" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-2 border border-white/20 rounded-full text-xs uppercase tracking-wider hover:bg-brand-accent hover:text-brand-dark hover:border-brand-accent transition-all"
            >
              WhatsApp
            </a>
            <a 
              href="https://t.me/nova_residence" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-2 border border-white/20 rounded-full text-xs uppercase tracking-wider hover:bg-brand-accent hover:text-brand-dark hover:border-brand-accent transition-all"
            >
              Telegram
            </a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between text-xs text-white/40 uppercase tracking-widest">
        <p>© 2024 — 2026 Nova Residence Group. Все права защищены.</p>
        <p className="mt-2 md:mt-0">Metropolis Capital Real Estate Development</p>
      </div>
    </footer>
  );
}
