import { SectionHeading } from '../ui/SectionHeading';
import TextType from '../ui/TextType';
import { CardCarousel } from '../ui/CardCarousel';

const testimonials = [
  {
    quote:
      'We bought the piano before his first lesson and I worried it would just sit there. His teacher has made it so fun that he plays almost every day now.',
    name: 'Jess Kim',
    role: 'Parent, North Strathfield',
    initials: 'JK',
  },
  {
    quote:
      'I started piano at 28, convinced I was too old. Six months later I\'m playing pieces I\'ve loved for years. My teacher never once made me feel behind.',
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
    <section id="testimonials" className="py-14 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="Student Stories"
          title="Testimonials"
          className="mb-6"
        />
        <div className="text-center mb-10">
          <TextType
            text="Real words from the students and parents who make up the Eden community."
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

        <CardCarousel
          className="max-w-2xl mx-auto"
          ariaLabel="What our families say"
          items={testimonials}
          getKey={(t) => t.name}
          getLabel={(t) => t.name}
          autoplay
          renderItem={({ quote, name, role, initials }) => (
            <figure className="w-full bg-background rounded-3xl p-8 sm:p-10 border border-primary/8 flex flex-col gap-6 select-none">
              {/* Quote mark */}
              <QuoteIcon className="w-8 h-8 text-accent/60 shrink-0" />

              {/* Quote text */}
              <blockquote className="flex-1 text-charcoal/85 font-body text-lg sm:text-xl leading-relaxed">
                "{quote}"
              </blockquote>

              {/* Attribution */}
              <figcaption className="flex items-center gap-4 pt-2 border-t border-primary/8">
                <div className="w-11 h-11 rounded-full bg-primary/15 flex items-center justify-center font-bold text-primary text-sm shrink-0">
                  {initials}
                </div>
                <div>
                  <p className="font-semibold text-charcoal text-sm">{name}</p>
                  <p className="text-xs text-charcoal/45">{role}</p>
                </div>
              </figcaption>
            </figure>
          )}
        />
      </div>
    </section>
  );
}

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7c0-1.654 1.346-3 3-3V8zm18 0c-3.314 0-6 2.686-6 6v10h10V14h-7c0-1.654 1.346-3 3-3V8z" />
    </svg>
  );
}
