import { SectionHeading } from '../ui/SectionHeading';

const testimonials = [
  {
    quote:
      'Eden has completely transformed my daughter\'s relationship with music. The environment is so calm and encouraging, and her teacher is both incredibly skilled and genuinely kind.',
    name: 'Sarah Mitchell',
    role: 'Parent, Mt Martha',
    initials: 'SM',
  },
  {
    quote:
      'As an adult learner, I was nervous to start. Eden\'s approach made me feel at home from day one. My piano lessons are honestly the highlight of my week.',
    name: 'James Richards',
    role: 'Adult Student, Mornington',
    initials: 'JR',
  },
  {
    quote:
      'My son has been coming to Eden for two years. His confidence — both musically and socially — has grown enormously. We couldn\'t recommend it more highly.',
    name: 'Emma Calloway',
    role: 'Parent, Rosebud',
    initials: 'EC',
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="Student Stories"
          title="What Our Families Say"
          subtitle="Real words from the students and parents who've made Eden part of their lives."
          className="mb-16"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, role, initials }) => (
            <div
              key={name}
              className="bg-background rounded-3xl p-8 border border-primary/8 flex flex-col gap-6"
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
