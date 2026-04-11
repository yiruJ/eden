import { SectionHeading } from '../ui/SectionHeading';
import TextType from '../ui/TextType';

const testimonials = [
  {
    quote:
      'My daughter asked to skip a birthday party so she wouldn\'t miss her lesson. That\'s when I knew Eden was the right place for her.',
    name: 'Sarah Mitchell',
    role: 'Parent, North Strathfield',
    initials: 'SM',
  },
  {
    quote:
      'I started piano at 34, convinced I was too old. Six months later I\'m playing pieces I\'ve loved for years. My teacher never once made me feel behind.',
    name: 'James Richards',
    role: 'Adult Student, Strathfield',
    initials: 'JR',
  },
  {
    quote:
      'We tried two other teachers before Eden. The difference was immediate. My son actually practises without being asked now.',
    name: 'Emma Calloway',
    role: 'Parent, Burwood',
    initials: 'EC',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-14 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="Student Stories"
          title="What Our Families Say"
          className="mb-6"
        />
        <div className="text-center mb-10">
          <TextType
            text="Real words from the students and parents who've made Eden part of their lives."
            as="p"
            className="text-lg text-charcoal/65 font-light leading-relaxed max-w-2xl mx-auto"
            typingSpeed={65}
            initialDelay={400}
            loop={false}
            showCursor={true}
            cursorCharacter="_"
            cursorBlinkDuration={0.3}
            cursorClassName="text-primary"
            startOnVisible={true}
          />
        </div>

        <div className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible">
          {testimonials.map(({ quote, name, role, initials }) => (
            <div
              key={name}
              className="bg-background rounded-3xl p-8 border border-primary/8 flex flex-col gap-6 shrink-0 w-[72vw] snap-start md:w-auto"
            >
              {/* Quote mark */}
              <QuoteIcon className="w-8 h-8 text-accent/60 shrink-0" />

              {/* Quote text */}
              <blockquote className="flex-1 text-charcoal/75 font-display italic text-lg leading-relaxed">
                "{quote}"
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center gap-4 pt-2 border-t border-primary/8">
                <div className="w-11 h-11 rounded-full bg-primary/15 flex items-center justify-center font-bold text-primary text-sm shrink-0">
                  {initials}
                </div>
                <div>
                  <p className="font-semibold text-charcoal text-sm">{name}</p>
                  <p className="text-xs text-charcoal/45">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Review Badge */}
        <div className="mt-12 flex justify-center">
          <a
            href="https://g.page/r/CWebQOEralbjEAE/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-5 bg-white border border-charcoal/10 rounded-2xl px-7 py-5 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
          >
            {/* Google G logo */}
            <GoogleIcon className="w-9 h-9 shrink-0" />

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-charcoal leading-none">5.0</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-[#FBBC04]" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-charcoal/50 font-medium">Rated on Google Reviews</p>
            </div>

            <div className="h-10 w-px bg-charcoal/10" />

            <span className="text-sm font-semibold text-[#4285F4] whitespace-nowrap">Write a review</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7c0-1.654 1.346-3 3-3V8zm18 0c-3.314 0-6 2.686-6 6v10h10V14h-7c0-1.654 1.346-3 3-3V8z" />
    </svg>
  );
}
