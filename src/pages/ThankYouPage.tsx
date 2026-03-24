import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../components/ui/FadeIn';
import { SEO } from '../components/SEO';

export function ThankYouPage() {
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', { send_to: 'AW-18033582805/tEA9COH_w44cENXFipdD' });
    }
  }, []);

  return (
    <>
      <SEO
        title="Enrolment Received — Eden Music Academy"
        description="Thank you for enrolling with Eden Music Academy. We will be in touch within one business day."
        canonical="/thank-you"
      />
      <FadeIn direction="up" duration={700}>
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mx-auto">
            <CheckIcon className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-display font-bold text-charcoal">Enrolment received!</h1>
          <p className="text-charcoal/60 leading-relaxed">
            Thank you for enrolling with Eden Music Academy. We will be in touch within one business day to confirm your lesson time and next steps.
          </p>
          <p className="text-sm text-charcoal/40">
            In the meantime, feel free to explore what we offer.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all"
            >
              Back to Home
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
