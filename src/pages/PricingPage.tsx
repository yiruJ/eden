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

const ensembleTiers = [
  {
    duration: '45 min',
    price: 35,
    description: 'A focused group session to develop ensemble skills, intonation, and musical communication.',
    highlights: ['2+ students', 'Per student pricing', 'String ensemble focus'],
  },
  {
    duration: '60 min',
    price: 45,
    description: 'The full ensemble experience — more time for repertoire, part-work, and performance preparation together.',
    highlights: ['2+ students', 'Per student pricing', 'Best for exam or concert prep'],
    featured: true,
  },
];

const discounts = [
  {
    icon: UsersIcon,
    title: 'Ensemble + Private Combo',
    badge: '$50 off',
    badgeColor: 'bg-primary text-white',
    description: 'Enrol in both ensemble and private lessons with Eden and receive $50 off your ensemble package payment.',
  },
  {
    icon: SiblingIcon,
    title: 'Sibling Discount',
    badge: '10% off each',
    badgeColor: 'bg-primary text-white',
    description: 'When two siblings both enrol in private lessons, each sibling receives 10% off their individual lesson fees.',
  },
  {
    icon: PianoIcon,
    title: 'Piano Pairing',
    badge: '5% off',
    badgeColor: 'bg-primary text-white',
    description: 'Add piano lessons alongside your primary instrument and receive a stackable 5% discount on your fees.',
  },
  {
    icon: ReferralIcon,
    title: 'Referral Reward',
    badge: '5% off',
    badgeColor: 'bg-accent/10 text-accent',
    description: "Refer a friend to Eden and you'll receive 5% off your next payment package once they enrol. Applied to the referrer only.",
  },
  {
    icon: PackageIcon,
    title: '10-Week Package',
    badge: '$50 off',
    badgeColor: 'bg-primary text-white',
    description: 'Pay upfront for a full 10-week term and receive $50 off the total price. Secures your regular time slot and gives your teacher time to plan ahead.',
  },
];

const included = [
  {
    heading: 'One-on-one attention',
    body: "Every lesson is private. Your teacher knows your child's pace, personality, and goals, and every session reflects that.",
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

      {/* Private lesson pricing cards */}
      <FadeIn direction="up" delay={100}>
        <section className="py-16 px-6 bg-background">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-8">Private Lessons</p>
            <div className="grid sm:grid-cols-3 gap-6 items-stretch">
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
          </div>
        </section>
      </FadeIn>

      {/* Ensemble pricing */}
      <FadeIn direction="up" delay={100}>
        <section className="py-16 px-6 bg-[#eef6f1]">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Ensemble Lessons</p>
<p className="text-charcoal/60 text-sm mt-2 max-w-xl">
                Ensemble lessons bring 2 or more students together to develop chamber music skills, musical listening, and performance confidence. Pricing is per student.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
              {ensembleTiers.map(({ duration, price, description, highlights, featured }) => (
                <div
                  key={duration}
                  className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                    featured
                      ? 'bg-primary text-white border-primary shadow-2xl scale-[1.02]'
                      : 'bg-white border-primary/10 hover:border-primary/30 hover:shadow-xl'
                  }`}
                >
                  {featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-white text-xs font-semibold uppercase tracking-widest whitespace-nowrap">
                      Recommended
                    </span>
                  )}
                  <div className="mb-6">
                    <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${featured ? 'text-white/70' : 'text-primary'}`}>
                      {duration} session
                    </p>
                    <div className="flex items-end gap-1">
                      <span className={`text-5xl font-display font-bold leading-none ${featured ? 'text-white' : 'text-charcoal'}`}>
                        ${price}
                      </span>
                      <span className={`text-sm mb-1 ${featured ? 'text-white/60' : 'text-charcoal/50'}`}>/ student</span>
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
                    Enquire About Ensemble
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Discounts */}
      <FadeIn direction="up" delay={100}>
        <section className="py-16 px-6 bg-background">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Discounts</p>
              <h2 className="text-3xl font-display font-bold text-charcoal leading-tight">Ways to save</h2>
              <p className="text-charcoal/60 text-sm mt-2 max-w-xl">
                Contact us to have discounts applied to your enrolment.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {discounts.map(({ icon: Icon, title, badge, badgeColor, description }) => (
                <div
                  key={title}
                  className="bg-white rounded-2xl border border-primary/10 p-7 flex gap-5 hover:border-primary/25 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="font-display font-bold text-charcoal text-base leading-snug">{title}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${badgeColor}`}>{badge}</span>
                    </div>
                    <p className="text-sm text-charcoal/60 leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Max discount callout */}
            <div className="mt-6 flex items-center gap-3 bg-primary/5 border border-primary/10 rounded-xl px-6 py-4">
              <InfoIcon className="w-4 h-4 text-primary shrink-0" />
              <p className="text-sm text-charcoal/70">
                Discounts are stackable but capped at <span className="font-semibold text-charcoal">20% maximum</span> per student per payment cycle. To apply a discount, mention it when you enrol or contact us directly.
              </p>
            </div>
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

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  );
}

function SiblingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );
}

function PianoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
    </svg>
  );
}

function ReferralIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
    </svg>
  );
}

function PackageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  );
}
