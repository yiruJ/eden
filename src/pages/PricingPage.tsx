import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CTABanner } from '../components/sections/CTABanner';
import { FadeIn } from '../components/ui/FadeIn';
import { SEO } from '../components/SEO';

const tiers = [
  {
    duration: '30 min',
    price: 45,
    description: 'A focused session ideal for younger beginners or students with shorter attention spans. Great for building early habits.',
    highlights: ['Ages 4+ recommended', 'Ideal for first-year students', 'One instrument focus'],
  },
  {
    duration: '45 min',
    price: 65,
    description: 'The sweet spot for most students. Enough time to warm up, work on technique, and run through repertoire in a single session.',
    highlights: ['Most popular choice', 'Suits all ages and levels', 'Balanced pacing'],
    featured: true,
  },
  {
    duration: '60 min',
    price: 80,
    description: 'A full hour for students who are ready to go deeper, with more repertoire, theory integration, and performance preparation.',
    highlights: ['Popular with adults & high schoolers', 'Performance prep included', 'Best value per minute'],
  },
];

export function PricingPage() {
  return (
    <>
      <SEO
        title="Lesson Pricing — Eden Music Academy"
        description="Simple, transparent pricing for piano, violin, viola and cello lessons at Eden Music Academy in North Strathfield. 30, 45 and 60 minute sessions available."
        canonical="/pricing"
      />

      {/* Page header */}
      <FadeIn direction="up" duration={700}>
        <section className="pt-20 pb-10 px-6 bg-[#eef6f1]">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading
              tag="Lesson Pricing"
              title="Simple, transparent pricing"
              subtitle="Choose the lesson length that suits your child's age and focus. No hidden fees, no term contracts. Just great teaching."
            />
          </div>
        </section>
      </FadeIn>

      {/* Pricing cards */}
      <FadeIn direction="up" delay={100}>
        <section className="py-16 px-6 bg-background">
          <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-6 items-stretch">
            {tiers.map(({ duration, price, description, highlights, featured }) => (
              <div
                key={duration}
                className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                  featured
                    ? 'bg-primary text-white border-primary shadow-2xl scale-[1.03]'
                    : 'bg-white border-primary/10 hover:border-primary/30 hover:shadow-xl'
                }`}
              >
                {featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-white text-xs font-semibold uppercase tracking-widest whitespace-nowrap">
                    Most Popular
                  </span>
                )}

                <div className="mb-6">
                  <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${featured ? 'text-white/70' : 'text-primary'}`}>
                    {duration} lesson
                  </p>
                  <div className="flex items-end gap-1">
                    <span className={`text-5xl font-display font-bold leading-none ${featured ? 'text-white' : 'text-charcoal'}`}>
                      ${price}
                    </span>
                    <span className={`text-sm mb-1 ${featured ? 'text-white/60' : 'text-charcoal/50'}`}>/ session</span>
                  </div>
                </div>

                <p className={`text-sm leading-relaxed mb-6 flex-1 ${featured ? 'text-white/80' : 'text-charcoal/65'}`}>
                  {description}
                </p>

                <ul className="space-y-2 mb-8">
                  {highlights.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm">
                      <CheckIcon className={`w-4 h-4 shrink-0 ${featured ? 'text-white/70' : 'text-primary'}`} />
                      <span className={featured ? 'text-white/85' : 'text-charcoal/70'}>{point}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/enrol"
                  className={`inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    featured
                      ? 'bg-white text-primary hover:bg-white/90'
                      : 'bg-primary/10 text-primary hover:bg-primary/20'
                  }`}
                >
                  Book a Trial Lesson
                </Link>
              </div>
            ))}
          </div>

        </section>
      </FadeIn>

      {/* What's included */}
      <FadeIn direction="up" delay={100}>
        <section className="py-16 px-6 bg-[#eef6f1]">
          <div className="max-w-4xl mx-auto">
            <SectionHeading
              tag="What to expect"
              title="Every lesson includes"
              subtitle="Whether you choose 30 or 60 minutes, every session at Eden is purposeful and personal."
              className="mb-12"
            />
            <div className="grid sm:grid-cols-2 gap-6">
              {included.map(({ heading, body }) => (
                <div key={heading} className="bg-white rounded-2xl p-7 border border-primary/8">
                  <h3 className="font-display font-bold text-charcoal text-lg mb-2">{heading}</h3>
                  <p className="text-sm text-charcoal/65 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn direction="up" delay={100}>
        <CTABanner />
      </FadeIn>
    </>
  );
}

const included = [
  {
    heading: 'One-on-one attention',
    body: 'Every lesson is private. Your teacher knows your child\'s pace, personality, and goals, and every session reflects that.',
  },
  {
    heading: 'Structured progression',
    body: 'We follow a clear, term-by-term curriculum so students build skills systematically, not randomly.',
  },
  {
    heading: 'Repertoire and technique',
    body: 'Each lesson balances technical exercises with real pieces so students are always working toward something they want to play.',
  },
  {
    heading: 'Teacher communication',
    body: 'Parents are kept in the loop. We share what was covered and what to practise before the next lesson.',
  },
];

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}
