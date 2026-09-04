import { useState } from 'react';
import { CheckCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface MortgageCalculatorProps {
  onOpenConsultation: (details: string) => void;
}

export default function MortgageCalculator({ onOpenConsultation }: MortgageCalculatorProps) {
  const [apartmentPrice, setApartmentPrice] = useState<number>(125000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [termMonths, setTermMonths] = useState<number>(24);

  const downPaymentAmount = Math.round((apartmentPrice * downPaymentPercent) / 100);
  const remainingAmount = apartmentPrice - downPaymentAmount;
  const monthlyPayment = Math.round(remainingAmount / termMonths);

  const formatCurrency = (val: number) => {
    return '$ ' + val.toLocaleString('ru-RU');
  };

  const handleApply = () => {
    const summary = `Рассрочка 0%: Стоимость ${formatCurrency(apartmentPrice)}, Взнос ${downPaymentPercent}% (${formatCurrency(downPaymentAmount)}), Срок ${termMonths} мес., Платеж ${formatCurrency(monthlyPayment)}/мес.`;
    onOpenConsultation(summary);
  };

  return (
    <section id="calculator" className="py-24 md:py-36 px-6 md:px-12 bg-brand-dark text-brand-text-light border-t border-white/5 relative overflow-hidden">
      {/* Subtle decorative glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-brand-accent font-semibold mb-4 px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20">
            <Sparkles className="w-3.5 h-3.5" />
            Индивидуальные программы оплаты
          </p>
          <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight">
            Калькулятор <span className="text-brand-accent">рассрочки 0%</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-white/60">
            Без участия банков и переплат. Прямой договор с застройщиком с фиксацией цены в долларах.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-stretch bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-12 backdrop-blur-sm shadow-2xl">
          {/* Sliders Area */}
          <div className="lg:col-span-7 space-y-8">
            {/* Price Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label htmlFor="calc-price" className="text-xs uppercase tracking-widest text-white/70">
                  Стоимость резиденции
                </label>
                <span className="text-xl md:text-2xl font-display text-brand-accent font-bold">
                  {formatCurrency(apartmentPrice)}
                </span>
              </div>
              <input
                id="calc-price"
                name="apartmentPrice"
                aria-label="Стоимость резиденции"
                type="range"
                min={60000}
                max={400000}
                step={5000}
                value={apartmentPrice}
                onChange={(e) => setApartmentPrice(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-accent"
              />
              <div className="flex justify-between text-[11px] text-white/40 mt-1.5 font-mono">
                <span>$ 60 000</span>
                <span>$ 200 000</span>
                <span>$ 400 000</span>
              </div>
            </div>

            {/* Down Payment Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label htmlFor="calc-down-payment" className="text-xs uppercase tracking-widest text-white/70">
                  Первоначальный взнос ({downPaymentPercent}%)
                </label>
                <span className="text-lg md:text-xl font-display text-white font-semibold">
                  {formatCurrency(downPaymentAmount)}
                </span>
              </div>
              <input
                id="calc-down-payment"
                name="downPaymentPercent"
                aria-label="Первоначальный взнос в процентах"
                type="range"
                min={20}
                max={70}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-accent"
              />
              <div className="flex justify-between text-[11px] text-white/40 mt-1.5 font-mono">
                <span>20%</span>
                <span>35%</span>
                <span>50%</span>
                <span>70%</span>
              </div>
            </div>

            {/* Term Months Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label htmlFor="calc-term" className="text-xs uppercase tracking-widest text-white/70">
                  Срок рассрочки
                </label>
                <span className="text-lg md:text-xl font-display text-white font-semibold">
                  {termMonths} месяцев
                </span>
              </div>
              <input
                id="calc-term"
                name="termMonths"
                aria-label="Срок рассрочки в месяцах"
                type="range"
                min={6}
                max={36}
                step={6}
                value={termMonths}
                onChange={(e) => setTermMonths(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-accent"
              />
              <div className="flex justify-between text-[11px] text-white/40 mt-1.5 font-mono">
                <span>6 мес.</span>
                <span>12 мес.</span>
                <span>24 мес.</span>
                <span>36 мес.</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-accent shrink-0" />
                <span>Фиксация цены на весь срок</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-accent shrink-0" />
                <span>Без справок о доходах</span>
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-2xl bg-white/[0.04] border border-white/10 relative">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <span className="text-xs uppercase tracking-widest text-white/60">Ставка рассрочки</span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  0% без переплат
                </span>
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-1">
                    Ежемесячный платеж:
                  </p>
                  <p className="text-4xl md:text-5xl font-display text-brand-accent font-bold">
                    {formatCurrency(monthlyPayment)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-white/50">Первый взнос</p>
                    <p className="text-base font-semibold mt-0.5">{formatCurrency(downPaymentAmount)}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-white/50">Остаток суммы</p>
                    <p className="text-base font-semibold mt-0.5">{formatCurrency(remainingAmount)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 space-y-3">
              <button
                type="button"
                onClick={handleApply}
                className="w-full py-4 rounded-full bg-brand-accent text-brand-dark font-bold text-xs uppercase tracking-widest hover:bg-white hover:shadow-[0_0_30px_rgba(185,151,91,0.4)] transition-all duration-300 flex items-center justify-center gap-2"
              >
                Зафиксировать расчет <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[10px] text-center text-white/40">
                Расчет носит предварительный характер. Точный график платежей составляется менеджером.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
