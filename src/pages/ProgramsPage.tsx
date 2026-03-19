import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CTABanner } from '../components/sections/CTABanner';

const programs = [
  {
    slug: 'private-studio',
    title: 'Private Studio',
    tagline: 'One-on-one instruction, tailored to you',
    description:
      'Private studio lessons are the foundation of musical growth at Eden. Every session is fully tailored to the individual student — their goals, learning pace, and personality. With the undivided attention of a dedicated teacher, students build strong technique, musicianship, and confidence at every stage.',
    highlights: ['All ages & levels welcome', '30 or 60 min sessions', 'Structured term-by-term progression'],
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80',
  },
  {
    slug: 'ensemble',
    title: 'Ensemble',
    tagline: 'Music is better together',
    description:
      'At Eden, we believe music is meant to be shared. Our ensemble program brings students together to play as a group — whether with close friends or peers they\'ve just met through the academy. Playing together builds listening skills, rhythmic precision, and a deep sense of musical community that solo practice simply cannot replicate. We strongly encourage all students to participate in ensemble alongside their private lessons.',
    highlights: ['Play with friends or meet new ones', 'Builds listening & teamwork', 'Strongly recommended for all students'],
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&q=80',
    featured: true,
  },
  {
    slug: 'music-theory',
    title: 'Music Theory',
    tagline: 'Understand the language of music',
    description:
      'Music theory unlocks a deeper understanding of everything students play. Our theory program covers note reading, rhythm, harmony, scales, and musical form — giving students the tools to learn new pieces faster, compose their own music, and communicate fluently with other musicians. Theory is offered as a standalone class or integrated into private lessons.',
    highlights: ['Note reading & rhythm', 'Harmony & musical form', 'Standalone or integrated into lessons'],
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=80',
  },
];

export function ProgramsPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-20 pb-12 px-6 bg-background text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest">
            What We Offer
          </span>
          <h1 className="text-5xl lg:text-6xl font-display font-bold text-charcoal leading-tight">
            Our Programs
          </h1>
          <p className="text-lg text-charcoal/65 font-light leading-relaxed">
            Private studio, ensemble, and music theory — a complete musical education grounded in community, craft, and genuine joy.
          </p>
        </div>
      </section>

      {/* Community callout */}
      <section className="py-10 px-6 bg-white">
        <div className="max-w-4xl mx-auto bg-primary/8 rounded-3xl px-10 py-8 flex flex-col items-center gap-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0">
            <PeopleIcon className="w-7 h-7 text-primary" />
          </div>
          <div>
            <p className="font-display font-bold text-charcoal text-lg">Music thrives in community</p>
            <p className="text-charcoal/65 text-sm mt-1 leading-relaxed">
              We strongly encourage every student to join an ensemble. Playing alongside friends — or making new ones — is where music truly comes alive. It builds skills no private lesson can replicate and creates friendships that last beyond the studio.
            </p>
          </div>
        </div>
      </section>

      {/* Program list */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-8">
          {programs.map(({ slug, title, tagline, description, highlights, image, featured }, i) => (
            <div
              key={slug}
              className={`grid lg:grid-cols-2 gap-12 items-center rounded-3xl overflow-hidden border bg-background p-8 lg:p-12 ${
                featured ? 'border-primary/25 shadow-lg' : 'border-primary/8'
              } ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-last' : ''}`}
            >
              {/* Text */}
              <div className="space-y-5">
                {featured && (
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest">
                    Highly Recommended
                  </span>
                )}
                <div className="w-10 h-1 bg-accent rounded-full" />
                <h2 className="text-3xl font-display font-bold text-charcoal">{title}</h2>
                <p className="text-accent font-semibold italic font-display">{tagline}</p>
                <p className="text-charcoal/65 leading-relaxed">{description}</p>
                <ul className="space-y-2 pt-1">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2.5 text-sm text-charcoal/70">
                      <CheckIcon className="w-4 h-4 text-primary shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 mt-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  Enquire about {title}
                </Link>
              </div>

              {/* Image */}
              <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
                <img
                  src={image}
                  alt={`${title} at Eden Music Academy`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community section */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <SectionHeading
            tag="Our Philosophy"
            title="Learning music together changes everything"
            subtitle="Private lessons build technique. Ensemble builds musicians. We designed Eden so students can experience both — and find their people along the way."
          />
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 mt-4 px-8 py-3.5 bg-primary text-white rounded-lg
                       font-semibold text-sm hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Get in touch
          </Link>
        </div>
      </section>

      <CTABanner />
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

function PeopleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  );
}
