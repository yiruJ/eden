import { Link } from 'react-router-dom';
import { FadeIn } from '../components/ui/FadeIn';
import { SEO } from '../components/SEO';

export function ThankYouPage() {
  return (
    <>
      <SEO
        title="Trial Request Received | Eden Music Academy"
        description="Thanks for requesting a trial lesson at Eden Music Academy. We will be in touch within one business day to confirm your time."
        canonical="/thank-you"
        noindex
      />
      <FadeIn direction="up" duration={700}>
      <div className="min-h-[80vh] flex items-center justify-center px-6 pt-28 pb-16">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mx-auto">
            <CheckIcon className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-display font-bold text-charcoal">Trial request received!</h1>
          <p className="text-charcoal/60 leading-relaxed">
            Thanks for requesting a trial lesson. We will call or email you within one business day.
          </p>
          <Link
            to="/parking"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            See how to park
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              to="/teachers"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all"
            >
              Explore Teachers
            </Link>
            <Link
              to="/programs"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-primary/20 text-charcoal font-semibold text-sm hover:border-primary/40 transition-all"
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </div>
      </FadeIn>
    </>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}
