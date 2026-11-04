import { useState } from 'react';
import { Link } from 'react-router-dom';
import { parentQuestions } from '../../data/parentQuestions';

export function ParentQuestions() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="mb-8 md:mb-10 text-3xl sm:text-4xl font-display font-bold text-charcoal leading-tight">
          FAQ
        </h2>

        <div className="space-y-3">
          {parentQuestions.map(({ q, a }, i) => {
            const isOpen = openQuestion === i;
            return (
              <div key={q} className="rounded-2xl border border-primary/10 bg-background overflow-hidden">
                <h3>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between gap-4 min-h-14 px-6 py-4 text-left cursor-pointer
                      transition-colors duration-200 hover:bg-primary/5
                      focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-primary/25"
                    onClick={() => setOpenQuestion(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span className="text-lg font-display font-bold text-charcoal">{q}</span>
                    <ChevronIcon
                      className={`w-5 h-5 shrink-0 text-primary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                </h3>
                {isOpen && (
                  <p id={`faq-answer-${i}`} className="px-6 pb-5 text-charcoal/70 leading-relaxed">
                    {a}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <Link
          to="/programs#pricing"
          className="inline-block mt-6 font-semibold text-charcoal underline underline-offset-4 hover:no-underline"
        >
          See full lesson prices
        </Link>
      </div>
    </section>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
