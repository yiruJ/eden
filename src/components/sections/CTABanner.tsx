import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export function CTABanner() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto bg-primary rounded-4xl p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl">
        {/* Decorative circles */}
        <div className="absolute -top-12 -left-12 w-56 h-56 border-[28px] border-white/10 rounded-full pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-80 h-80 border-[36px] border-white/10 rounded-full pointer-events-none" />
        <div className="absolute top-8 right-16 w-6 h-6 bg-accent/40 rounded-full pointer-events-none" />
        <div className="absolute bottom-12 left-20 w-4 h-4 bg-white/20 rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <span className="inline-block px-4 py-1 rounded-full bg-white/15 text-white/90 font-semibold text-xs uppercase tracking-widest">
            Enrolments Open
          </span>

          <h2 className="text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
            Ready to Begin Your<br />Musical Journey?
          </h2>

          <p className="text-white/75 text-lg max-w-xl mx-auto font-light leading-relaxed">
            Enrolment for the new term is now open. Spaces are limited for our most popular programs — secure your spot today.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              to="/enrol"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-lg bg-rose-700 hover:bg-rose-800
                         text-white font-semibold text-base transition-colors duration-200 cursor-pointer shadow-sm"
            >
              Secure Your Spot
              <ArrowRightIcon />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-lg text-white/90 border-2 border-white/25
                         hover:border-white/50 font-semibold text-base transition-all duration-200 cursor-pointer"
            >
              Ask a Question
            </Link>
          </div>
        </div>
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
