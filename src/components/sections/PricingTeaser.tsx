import { Link } from 'react-router-dom';

export function PricingTeaser() {
  return (
    <section className="py-12 px-6 bg-[#eef6f1]">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Transparent pricing</p>
          <h2 className="text-2xl font-display font-bold text-charcoal leading-snug">
            No hidden fees. No surprises.
          </h2>
          <p className="text-charcoal/60 text-sm mt-2 max-w-md">
            30, 45, and 60 minute sessions available, priced to reflect real, expert teaching without the chain school markup.
          </p>
        </div>
        <Link
          to="/pricing"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-primary text-white font-semibold text-sm
                     hover:bg-primary/90 transition-colors duration-200 whitespace-nowrap shrink-0"
        >
          View Lesson Pricing
          <ArrowRightIcon />
        </Link>
      </div>
    </section>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}
