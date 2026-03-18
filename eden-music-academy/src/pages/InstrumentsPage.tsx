import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CTABanner } from '../components/sections/CTABanner';

const instruments = [
  {
    slug: 'piano',
    name: 'Piano & Keyboard',
    tagline: 'The universal instrument',
    description: 'Piano is the ideal first instrument — it teaches music theory visually and builds a foundation transferable to any other instrument.',
    minAge: 'From age 4',
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=700&q=80',
  },
  {
    slug: 'guitar',
    name: 'Guitar & Ukulele',
    tagline: 'Acoustic, electric & classical',
    description: 'From campfire chords to shredding leads — guitar and ukulele open up a world of styles and musical community.',
    minAge: 'From age 5',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=700&q=80',
  },
  {
    slug: 'vocals',
    name: 'Vocals & Songwriting',
    tagline: 'Your voice is your instrument',
    description: 'Develop technique, confidence, and your own artistic voice. Our vocal program covers contemporary, classical, and original songwriting.',
    minAge: 'From age 7',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=700&q=80',
  },
  {
    slug: 'drums',
    name: 'Drums & Percussion',
    tagline: 'The heartbeat of the band',
    description: 'Groove, timing, and creative rhythm-making across all styles. Practice pads available for students without a kit at home.',
    minAge: 'From age 6',
    image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=700&q=80',
  },
  {
    slug: 'violin',
    name: 'Violin & Strings',
    tagline: 'Classical beauty, lifelong skill',
    description: 'A nurturing approach to violin for young beginners and a rigorous path for advancing students. Suzuki methods for younger learners.',
    minAge: 'From age 4',
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=700&q=80',
  },
  {
    slug: 'flute',
    name: 'Flute & Woodwind',
    tagline: 'Breath, colour & melody',
    description: 'Flute, clarinet, and saxophone lessons focused on tone, technique, and musicality across classical and contemporary styles.',
    minAge: 'From age 7',
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=700&q=80',
  },
];

export function InstrumentsPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-20 pb-12 px-6 bg-background text-center">
        <div className="max-w-2xl mx-auto space-y-5">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest">
            What We Teach
          </span>
          <h1 className="text-5xl lg:text-6xl font-display font-bold text-charcoal leading-tight">
            Instruments
          </h1>
          <p className="text-lg text-charcoal/65 font-light leading-relaxed">
            Six instruments, countless paths. Whether you're 4 or 64, we'll match you with the right teacher and the right approach.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {instruments.map(({ slug, name, tagline, description, minAge, image }) => (
            <Link
              key={slug}
              to={`/instruments/${slug}`}
              className="group bg-background rounded-3xl overflow-hidden border border-primary/8
                         hover:border-primary/20 hover:shadow-xl hover:-translate-y-1
                         transition-all duration-300 cursor-pointer block"
            >
              {/* Image */}
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={image}
                  alt={`${name} lessons at Eden`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-display font-bold text-charcoal">{name}</h3>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-primary/10 text-primary rounded-full shrink-0 mt-0.5">
                    {minAge}
                  </span>
                </div>
                <p className="text-accent text-xs font-semibold uppercase tracking-wider">{tagline}</p>
                <p className="text-sm text-charcoal/60 leading-relaxed">{description}</p>
                <span className="inline-flex items-center gap-1.5 text-accent font-semibold text-xs uppercase tracking-widest
                                 group-hover:gap-2.5 transition-all duration-200 pt-1">
                  Learn More
                  <ArrowIcon className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Not sure section */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <SectionHeading
            title="Not Sure Which Instrument?"
            subtitle="That's totally fine. Get in touch and we'll help you find the perfect fit based on your age, interests, and goals."
          />
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-lg font-semibold text-sm
                       hover:bg-primary/90 transition-colors cursor-pointer mt-4"
          >
            Ask Us
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}
