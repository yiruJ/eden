import { Link } from 'react-router-dom';
import { SectionHeading } from '../ui/SectionHeading';

const programs = [
  {
    id: 'piano',
    icon: PianoIcon,
    title: 'Piano & Keyboard',
    description:
      'From classical foundations to contemporary improvisation — find your unique voice on the keys. Suitable for all ages and experience levels.',
    to: '/instruments/piano',
  },
  {
    id: 'guitar',
    icon: GuitarIcon,
    title: 'Guitar & Ukulele',
    description:
      'Master the strings in an environment that encourages exploration across acoustic, electric, and all genres and styles.',
    to: '/instruments/guitar',
  },
  {
    id: 'vocals',
    icon: MicIcon,
    title: 'Vocals & Songwriting',
    description:
      'Discover the power of your voice and the art of storytelling through melody, harmony, and original songwriting.',
    to: '/instruments/vocals',
  },
  {
    id: 'drums',
    icon: DrumsIcon,
    title: 'Drums & Percussion',
    description:
      'Build rhythm, timing, and feel across a wide variety of styles — from jazz brushwork to rock performance.',
    to: '/instruments/drums',
  },
  {
    id: 'violin',
    icon: ViolinIcon,
    title: 'Violin & Strings',
    description:
      'A nurturing approach to classical strings technique with a focus on tone, posture, and musical expression.',
    to: '/instruments/violin',
  },
  {
    id: 'woodwind',
    icon: WoodwindIcon,
    title: 'Flute & Woodwind',
    description:
      'Develop breath control, tone quality, and musicianship across flute, clarinet, saxophone, and more.',
    to: '/instruments/flute',
  },
];

export function ProgramsStrip() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="What We Teach"
          title="Our Programs"
          subtitle="Expertly crafted lessons for every instrument, age, and skill level."
          className="mb-16"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map(({ id, icon: Icon, title, description, to }) => (
            <Link
              key={id}
              to={to}
              className="group p-8 rounded-2xl bg-background border border-primary/8
                         hover:border-primary/20 hover:shadow-xl hover:-translate-y-1
                         transition-all duration-300 cursor-pointer block"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6
                              group-hover:bg-primary/20 transition-colors duration-200">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-display font-bold text-charcoal mb-3">{title}</h3>
              <p className="text-charcoal/60 text-sm leading-relaxed mb-6">{description}</p>
              <span className="inline-flex items-center gap-2 text-accent font-semibold text-xs uppercase tracking-widest
                               group-hover:gap-3 transition-all duration-200">
                Learn More
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border-2 border-primary/25
                       hover:border-primary/50 text-charcoal font-semibold text-sm transition-all duration-200 cursor-pointer"
          >
            View All Programs
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function PianoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path strokeLinecap="round" d="M6 4v10M9 4v10M12 4v10M15 4v10M18 4v10" />
      <path strokeLinecap="round" d="M7.5 4v7M10.5 4v7M13.5 4v7M16.5 4v7" strokeWidth={3} className="text-charcoal/30" />
    </svg>
  );
}

function GuitarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6M12 3v4m-4.5 4.5a4.5 4.5 0 109 0 4.5 4.5 0 00-9 0zM12 17v4m-2 0h4" />
    </svg>
  );
}

function MicIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
    </svg>
  );
}

function DrumsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <ellipse cx="12" cy="9" rx="9" ry="4" />
      <path strokeLinecap="round" d="M3 9v6c0 2.21 4.03 4 9 4s9-1.79 9-4V9" />
      <path strokeLinecap="round" d="M8 3.5L5 1M16 3.5l3-2.5" />
    </svg>
  );
}

function ViolinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.5 0-3 1.5-3 4s1 3.5 1 5-1.5 2-1.5 4 2 5 3.5 5 3.5-2 3.5-5S14 14 14 12s1-2 1-5-1.5-4-3-4z" />
      <path strokeLinecap="round" d="M3 3l4 4M21 3l-4 4" />
    </svg>
  );
}

function WoodwindIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3l6 18M9 3c0 0-2 1-2 3s2 2 2 2M15 21c0 0 2-1 2-3s-2-2-2-2" />
      <circle cx="10.5" cy="9" r="1" fill="currentColor" />
      <circle cx="11.5" cy="13" r="1" fill="currentColor" />
      <circle cx="12.5" cy="17" r="1" fill="currentColor" />
    </svg>
  );
}
