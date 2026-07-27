import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

type PlanId = 'casual' | 'five' | 'ten';
type Duration = 30 | 45 | 60;

interface Plan {
  id: PlanId;
  label: string;
  shortLabel: string;
  lessons: string;
}

const PLANS: Plan[] = [
  {
    id: 'casual',
    label: 'Casual',
    shortLabel: 'Casual',
    lessons: '1 to 4 weeks',
  },
  {
    id: 'five',
    label: '5 weeks',
    shortLabel: '5 weeks',
    lessons: '5 lessons',
  },
  {
    id: 'ten',
    label: '10 weeks',
    shortLabel: '10 weeks',
    lessons: '10 lessons',
  },
];

const DURATIONS: Duration[] = [30, 45, 60];

/** Standard per-lesson rate, used as the 5-week rate and the anchor for the others. */
const BASE: Record<Duration, number> = { 30: 55, 45: 82.5, 60: 110 };
/** Total dollars off a 10-week package. */
const TEN_WEEK_DISCOUNT: Record<Duration, number> = { 30: 50, 45: 100, 60: 150 };
/** Per-lesson premium for paying casually rather than in a package. */
const CASUAL_PREMIUM = 15;

const DURATION_NOTE: Record<Duration, string> = {
  30: 'Best for younger beginners and first-year students',
  45: 'A balanced session that suits all ages and levels',
  60: 'Popular with adults, high schoolers and exam preparation',
};

function perLesson(plan: PlanId, duration: Duration): number {
  if (plan === 'casual') return BASE[duration] + CASUAL_PREMIUM;
  if (plan === 'five') return BASE[duration];
  return (BASE[duration] * 10 - TEN_WEEK_DISCOUNT[duration]) / 10;
}

function packageTotal(plan: PlanId, duration: Duration): number | null {
  if (plan === 'casual') return null;
  if (plan === 'five') return BASE[duration] * 5;
  return BASE[duration] * 10 - TEN_WEEK_DISCOUNT[duration];
}

/** Shows cents only when they exist, so $55 stays $55 but $82.50 keeps its decimals. */
function money(value: number): string {
  return value.toLocaleString('en-AU', {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

export function PricingTiers() {
  const [plan, setPlan] = useState<PlanId>('ten');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activePlan = PLANS.find((p) => p.id === plan)!;
  const isTen = plan === 'ten';

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = e.key === 'ArrowRight'
      ? (index + 1) % PLANS.length
      : (index - 1 + PLANS.length) % PLANS.length;
    setPlan(PLANS[next].id);
    tabRefs.current[next]?.focus();
  }

  const minSaving = Math.min(...DURATIONS.map((d) => TEN_WEEK_DISCOUNT[d]));
  const maxSaving = Math.max(...DURATIONS.map((d) => TEN_WEEK_DISCOUNT[d]));

  return (
    <section className="py-16 px-6 bg-background">
      <div className="max-w-5xl mx-auto">

        {/* Header row with discounts shortcut */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
              Private Lessons
            </p>
            <h2 className="text-3xl font-display font-bold text-charcoal leading-tight">
              Choose how you pay
            </h2>
          </div>
          <a
            href="#discounts"
            className="inline-flex items-center justify-center gap-2 shrink-0 px-5 py-3 rounded-lg
                       border-2 border-primary/25 text-charcoal font-semibold text-sm
                       hover:border-primary/60 hover:bg-primary/5
                       transition-colors duration-200 cursor-pointer
                       focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <TagIcon className="w-4 h-4 text-primary" />
            See ways to save
          </a>
        </div>

        {/* Plan selector */}
        <div
          role="radiogroup"
          aria-label="Choose a payment plan"
          className="grid grid-cols-3 gap-2 p-2 rounded-2xl bg-surface border border-primary/10"
        >
          {PLANS.map((p, i) => {
            const selected = p.id === plan;
            return (
              <button
                key={p.id}
                ref={(el) => { tabRefs.current[i] = el; }}
                role="radio"
                aria-checked={selected}
                tabIndex={selected ? 0 : -1}
                onClick={() => setPlan(p.id)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className={`relative min-h-[56px] px-3 py-3 rounded-xl font-semibold text-sm
                            transition-colors duration-200 cursor-pointer
                            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                            ${selected
                              ? 'bg-primary text-white shadow-sm'
                              : 'text-charcoal/60 hover:text-charcoal hover:bg-white/70'}`}
              >
                <span className="block">{p.shortLabel}</span>
                {p.id === 'ten' && (
                  <span
                    className={`block text-[10px] font-bold uppercase tracking-wider mt-0.5
                                ${selected ? 'text-white/85' : 'text-accent'}`}
                  >
                    Best value
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Context bar: reinforces the saving, or nudges toward it */}
        <div
          aria-live="polite"
          className={`mt-4 flex items-start gap-3 rounded-xl px-5 py-4 border transition-colors duration-200
                      ${isTen
                        ? 'bg-primary/10 border-primary/20'
                        : 'bg-accent/5 border-accent/20'}`}
        >
          {isTen ? (
            <>
              <CheckCircleIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-charcoal/75">
                You are saving{' '}
                <span className="font-semibold text-charcoal">
                  ${minSaving} to ${maxSaving}
                </span>{' '}
                on this package, and paying our lowest per-lesson rate.
              </p>
            </>
          ) : (
            <>
              <InfoIcon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <p className="text-sm text-charcoal/75">
                A 10 week package costs{' '}
                <span className="font-semibold text-charcoal">
                  ${minSaving} to ${maxSaving} less
                </span>{' '}
                and drops the per-lesson price.{' '}
                <button
                  type="button"
                  onClick={() => setPlan('ten')}
                  className="font-semibold text-primary underline underline-offset-2
                             hover:text-primary/80 transition-colors duration-200 cursor-pointer
                             focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  Compare 10 weeks
                </button>
              </p>
            </>
          )}
        </div>

        {/* Duration cards */}
        <div className="grid sm:grid-cols-3 gap-6 items-stretch mt-8">
          {DURATIONS.map((duration) => {
            const price = perLesson(plan, duration);
            const total = packageTotal(plan, duration);
            const saving = isTen ? TEN_WEEK_DISCOUNT[duration] : 0;
            const featured = duration === 60;

            return (
              <div
                key={duration}
                className={`relative flex flex-col rounded-2xl border p-7 transition-all duration-200
                            ${featured
                              ? 'bg-white border-primary/30 shadow-lg'
                              : 'bg-white border-primary/10'}`}
              >
                {featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full
                                   bg-primary text-white text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                    Most chosen
                  </span>
                )}

                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-5 mt-1">
                  {duration} min lesson
                </p>

                {/* Anchor: full undiscounted total, slashed, above the real total */}
                <div className="min-h-[44px] flex items-end">
                  {isTen && (
                    <span className="price-slash text-4xl font-display font-bold leading-none text-charcoal/30">
                      ${money(BASE[duration] * 10)}
                    </span>
                  )}
                </div>

                <div className="flex items-end gap-2 mt-3">
                  <span className="text-2xl font-display font-bold leading-none text-charcoal">
                    ${money(total ?? price)}
                  </span>
                  <span className="text-sm text-charcoal/50 leading-none mb-0.5">
                    {total !== null ? 'total' : '/ week'}
                  </span>
                </div>

                {saving > 0 && (
                  <span className="inline-flex self-start items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full
                                   bg-accent text-white text-xs font-bold">
                    <TagIcon className="w-3 h-3" />
                    Save ${saving}
                  </span>
                )}

                <div className="mt-6 pt-5 border-t border-primary/10">
                  <p className="text-sm text-charcoal/70">
                    <span className="font-semibold text-charcoal">{activePlan.lessons}</span>
                    <span className="text-charcoal/45"> · ${money(price)} per lesson</span>
                  </p>
                  <p className="text-xs text-charcoal/45 mt-2 leading-relaxed">
                    {DURATION_NOTE[duration]}
                  </p>
                </div>

                <div className="flex-1" />

                <Link
                  to="/enrol"
                  className={`inline-flex items-center justify-center gap-2 w-full mt-6 px-6 py-3.5 rounded-lg
                              font-semibold text-sm transition-colors duration-200 cursor-pointer
                              focus:outline-none focus:ring-2 focus:ring-offset-2
                              ${featured
                                ? 'bg-primary hover:bg-primary/90 text-white focus:ring-primary'
                                : 'bg-primary/10 hover:bg-primary/20 text-primary focus:ring-primary'}`}
                >
                  Book a Trial Lesson
                </Link>
              </div>
            );
          })}
        </div>

        {/* Full comparison, so nothing is hidden behind the selector */}
        <details className="mt-8 group">
          <summary
            className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-charcoal/70
                       hover:text-charcoal transition-colors duration-200 list-none
                       focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded py-2"
          >
            <ChevronIcon className="w-4 h-4 transition-transform duration-200 group-open:rotate-90" />
            See every rate side by side
          </summary>
          <div className="mt-4 rounded-2xl border border-primary/10 bg-white overflow-hidden">
            <table className="w-full table-fixed">
              <caption className="sr-only">
                Package totals and per-lesson rates for each lesson length and payment plan
              </caption>
              <colgroup>
                <col className="w-[19%]" />
                <col className="w-[27%]" />
                <col className="w-[27%]" />
                <col className="w-[27%]" />
              </colgroup>
              <thead>
                <tr className="border-b border-primary/10">
                  <th
                    scope="col"
                    className="text-center font-semibold text-charcoal px-1 sm:px-3 py-3 text-xs sm:text-sm"
                  >
                    Lesson
                  </th>
                  {PLANS.map((p) => (
                    <th
                      key={p.id}
                      scope="col"
                      className={`text-center font-semibold px-1 sm:px-3 py-3 text-xs sm:text-sm
                                  ${p.id === 'ten' ? 'text-primary' : 'text-charcoal'}`}
                    >
                      {p.label}
                      {p.id === 'ten' && (
                        <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-accent">
                          Best value
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DURATIONS.map((duration) => (
                  <tr key={duration} className="border-b border-primary/5 last:border-0">
                    <th
                      scope="row"
                      className="text-center font-medium text-charcoal px-1 sm:px-3 py-3.5 text-xs sm:text-sm"
                    >
                      {duration} min
                    </th>
                    {PLANS.map((p) => {
                      const price = perLesson(p.id, duration);
                      const total = packageTotal(p.id, duration);
                      return (
                        <td
                          key={p.id}
                          className={`text-center px-1 sm:px-3 py-3.5
                                      ${p.id === 'ten' ? 'bg-primary/5' : ''}`}
                        >
                          <span className="block font-semibold text-charcoal text-xs sm:text-sm">
                            ${money(total ?? price)}
                          </span>
                          <span className="block text-[10px] sm:text-xs text-charcoal/45">
                            {total !== null ? 'total' : 'per week'}
                          </span>
                          <span className="block text-[10px] sm:text-xs text-charcoal/45 mt-1">
                            ${money(price)}/lesson
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>

      </div>
    </section>
  );
}

function TagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}
