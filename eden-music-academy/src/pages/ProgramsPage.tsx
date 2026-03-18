import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CTABanner } from '../components/sections/CTABanner';

const programs = [
  {
    slug: 'piano',
    title: 'Piano & Keyboard',
    tagline: 'The foundation of musical understanding',
    description:
      'Piano lessons at Eden span classical technique, contemporary styles, music theory, and improvisation. Whether your child is just starting out or you are an adult returning to the keys, our teachers tailor every lesson to your goals.',
    ageGroups: ['Ages 4+', 'Adults welcome'],
    duration: '30 or 60 min lessons',
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80',
  },
  {
    slug: 'guitar',
    title: 'Guitar & Ukulele',
    tagline: 'Acoustic, electric, classical and beyond',
    description:
      'Our guitar program covers everything from beginner chord shapes to advanced fingerpicking, improvisation, and music theory. Ukulele is also available — a perfect first instrument for young learners.',
    ageGroups: ['Ages 5+', 'Adults welcome'],
    duration: '30 or 60 min lessons',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80',
  },
  {
    slug: 'vocals',
    title: 'Vocals & Songwriting',
    tagline: 'Find your voice. Tell your story.',
    description:
      'Vocal lessons cover breath technique, tone, range, performance confidence, and repertoire. Our songwriting stream takes students through the craft of lyric writing, melody, and arrangement.',
    ageGroups: ['Ages 7+', 'Adults welcome'],
    duration: '30 or 60 min lessons',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80',
  },
  {
    slug: 'drums',
    title: 'Drums & Percussion',
    tagline: 'Rhythm is the heartbeat of music',
    description:
      'Drum lessons at Eden focus on groove, timing, coordination and style. Students work through real songs and progressively build the vocabulary to play in any genre — from jazz and funk to rock and pop.',
    ageGroups: ['Ages 6+', 'Adults welcome'],
    duration: '30 or 60 min lessons',
    image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&q=80',
  },
  {
    slug: 'violin',
    title: 'Violin & Strings',
    tagline: 'Classical beauty, modern approach',
    description:
      'Our strings program introduces students to the rich tradition of classical violin while keeping lessons engaging and age-appropriate. Suzuki-inspired methods are used for our youngest learners.',
    ageGroups: ['Ages 4+', 'Adults welcome'],
    duration: '30 or 60 min lessons',
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&q=80',
  },
  {
    slug: 'flute',
    title: 'Flute & Woodwind',
    tagline: 'Breath, tone, and musical colour',
    description:
      'Woodwind lessons are available for flute, clarinet, and saxophone. Students develop breath control, embouchure, tone quality, and musicality across classical and contemporary repertoire.',
    ageGroups: ['Ages 7+', 'Adults welcome'],
    duration: '30 or 60 min lessons',
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
            Private lessons across six instruments for students of all ages and experience levels — from first-timers to advanced performers.
          </p>
        </div>
      </section>

      {/* Program list */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-8">
          {programs.map(({ slug, title, tagline, description, ageGroups, duration, image }, i) => (
            <div
              key={slug}
              className={`grid lg:grid-cols-2 gap-12 items-center rounded-3xl overflow-hidden border border-primary/8 bg-background p-8 lg:p-12 ${
                i % 2 === 1 ? 'lg:[&>*:first-child]:order-last' : ''
              }`}
            >
              {/* Text */}
              <div className="space-y-5">
                <div className="w-10 h-1 bg-accent rounded-full" />
                <h2 className="text-3xl font-display font-bold text-charcoal">{title}</h2>
                <p className="text-accent font-semibold italic font-display">{tagline}</p>
                <p className="text-charcoal/65 leading-relaxed">{description}</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  {ageGroups.map((age) => (
                    <span key={age} className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      {age}
                    </span>
                  ))}
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                    {duration}
                  </span>
                </div>
                <Link
                  to="/enrol"
                  className="inline-flex items-center gap-2 mt-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  Enrol in {title.split(' ')[0]}
                </Link>
              </div>

              {/* Image */}
              <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
                <img
                  src={image}
                  alt={`${title} lessons at Eden Music Academy`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing note */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <SectionHeading
            title="Simple, Transparent Pricing"
            subtitle="All lessons are billed per term. No joining fees, no lock-in contracts."
          />
          <div className="grid sm:grid-cols-2 gap-4 mt-10">
            <div className="bg-white rounded-2xl p-8 border border-primary/8">
              <p className="text-4xl font-display font-bold text-charcoal">$45</p>
              <p className="text-charcoal/50 text-sm mt-1">per 30-minute lesson</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-primary/8">
              <p className="text-4xl font-display font-bold text-charcoal">$75</p>
              <p className="text-charcoal/50 text-sm mt-1">per 60-minute lesson</p>
            </div>
          </div>
          <p className="text-sm text-charcoal/45 pt-2">Sibling discounts available. Contact us for details.</p>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
