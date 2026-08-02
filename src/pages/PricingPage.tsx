import { SectionHeading } from '../components/ui/SectionHeading';
import { CTABanner } from '../components/sections/CTABanner';
import { PricingTiers } from '../components/sections/PricingTiers';
import { FadeIn } from '../components/ui/FadeIn';
import { SEO } from '../components/SEO';


const discounts = [
  {
    icon: SiblingIcon,
    title: 'Sibling Discount',
    badge: '5% off each',
    badgeColor: 'bg-primary text-white',
    description: 'When two siblings both enrol in private lessons, each sibling receives 5% off their individual lesson fees.',
  },
  {
    icon: PianoIcon,
    title: 'Piano Pairing',
    badge: '5% off',
    badgeColor: 'bg-primary text-white',
    description: 'Add piano lessons alongside your primary instrument and receive a stackable 5% discount on your fees.',
  },
  {
    icon: TheoryIcon,
    title: 'Music Theory Pairing',
    badge: '5% off',
    badgeColor: 'bg-primary text-white',
    description: 'Add music theory alongside your instrument lessons and receive a stackable 5% discount on your fees.',
  },
  {
    icon: ReferralIcon,
    title: 'Referral Reward',
    badge: '5% off',
    badgeColor: 'bg-accent/10 text-accent',
    description: "Refer a friend to Eden and you'll receive 5% off your next payment package once they enrol. Applied to the referrer only.",
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
        description="Piano, violin, viola and cello lesson rates at Eden Music Academy in North Strathfield. 30, 45 and 60 minute lessons, with casual, 5 week and 10 week payment options."
        canonical="/pricing"
      />

      {/* Page header */}
      <FadeIn direction="up" duration={700}>
        <section className="pt-20 pb-10 px-6 bg-[#eef6f1]">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading
              tag="Lesson Pricing"
              title="Simple, transparent pricing"
              subtitle="No hidden fees, no term contracts. Just great teaching."
            />
          </div>
        </section>
      </FadeIn>

      {/* Private lesson pricing */}
      <PricingTiers />

      {/* Discounts */}
      <FadeIn direction="up" delay={100}>
        <section id="discounts" className="py-16 px-6 bg-background scroll-mt-24">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Discounts</p>
              <h2 className="text-3xl font-display font-bold text-charcoal leading-tight">Ways to save</h2>
              <p className="text-charcoal/60 text-sm mt-2 max-w-xl">
                These stack on top of the package rates above. Contact us to have them applied to your enrolment.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {discounts.map(({ icon: Icon, title, badge, badgeColor, description }) => (
                <div
                  key={title}
                  className="bg-white rounded-2xl border border-primary/10 p-7 flex gap-5 hover:border-primary/25 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
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
                Discounts are stackable but capped at <span className="font-semibold text-charcoal">10% maximum</span> per student per payment cycle. To apply a discount, mention it when you enrol or contact us directly.
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
                <div key={heading} className="bg-white rounded-2xl p-7 border border-primary/10">
                  <h3 className="font-display font-bold text-charcoal text-lg mb-2">{heading}</h3>
                  <p className="text-sm text-charcoal/65 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Fee promise */}
      <FadeIn direction="up" delay={100}>
        <section className="py-16 px-6 bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-3xl border border-primary/15 bg-white p-8 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
                Our fee promise
              </p>
              <h2 className="text-2xl font-display font-bold text-charcoal mb-6">
                You will always know where you stand
              </h2>
              <ul className="space-y-5">
                <li className="flex gap-4">
                  <LockIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-charcoal/70 leading-relaxed">
                    <span className="font-semibold text-charcoal">Your package is locked in.</span>{' '}
                    Once you have paid for a 5 or 10 week package, it is honoured in full at the rate you
                    paid, whatever happens to our rates in the meantime.
                  </p>
                </li>
                <li className="flex gap-4">
                  <BellIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-charcoal/70 leading-relaxed">
                    <span className="font-semibold text-charcoal">You will always get notice.</span>{' '}
                    If our rates change, families already enrolled keep their existing rate until the change
                    date, and we give at least two months' written notice beforehand.
                  </p>
                </li>
              </ul>
              <p className="text-sm text-charcoal/55 mt-7 pt-6 border-t border-primary/10">
                Any questions about your rate, call us on{' '}
                <a
                  href="tel:+61434144955"
                  className="font-semibold text-primary hover:text-primary/80 transition-colors duration-200
                             focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  0434 144 955
                </a>{' '}
                or email{' '}
                <a
                  href="mailto:info@edenmusicacademy.com"
                  className="font-semibold text-primary hover:text-primary/80 transition-colors duration-200
                             focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  info@edenmusicacademy.com
                </a>
                .
              </p>
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

function TheoryIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
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

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
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
