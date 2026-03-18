import { Link } from 'react-router-dom';
import { SectionHeading } from '../ui/SectionHeading';

const programs = [
  {
    id: 'private-studio',
    icon: PersonIcon,
    title: 'Private Studio',
    description:
      'One-on-one lessons fully tailored to each student\'s goals, pace, and personality. The foundation of musical growth at Eden.',
    to: '/programs',
  },
  {
    id: 'ensemble',
    icon: PeopleIcon,
    title: 'Ensemble',
    description:
      'Play alongside friends or meet new ones through music. We strongly recommend ensemble for every student — it\'s where music truly comes alive.',
    to: '/programs',
    featured: true,
  },
  {
    id: 'music-theory',
    icon: NoteIcon,
    title: 'Music Theory',
    description:
      'Understand the language of music. From note reading and rhythm to harmony and form — theory makes every student a more complete musician.',
    to: '/programs',
  },
];

export function ProgramsStrip() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="What We Offer"
          title="Our Programs"
          subtitle="A complete musical education — private instruction, ensemble playing, and music theory, all rooted in community."
          className="mb-16"
        />

        <div className="grid sm:grid-cols-3 gap-6">
          {programs.map(({ id, icon: Icon, title, description, to, featured }) => (
            <Link
              key={id}
              to={to}
              className={`group p-8 rounded-2xl border transition-all duration-300 cursor-pointer block
                         hover:shadow-xl hover:-translate-y-1 ${
                           featured
                             ? 'bg-primary text-white border-primary'
                             : 'bg-background border-primary/8 hover:border-primary/20'
                         }`}
            >
              {featured && (
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white font-semibold text-xs uppercase tracking-widest mb-4">
                  Highly Recommended
                </span>
              )}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-200 ${
                featured ? 'bg-white/20 group-hover:bg-white/30' : 'bg-primary/10 group-hover:bg-primary/20'
              }`}>
                <Icon className={`w-7 h-7 ${featured ? 'text-white' : 'text-primary'}`} />
              </div>
              <h3 className={`text-xl font-display font-bold mb-3 ${featured ? 'text-white' : 'text-charcoal'}`}>
                {title}
              </h3>
              <p className={`text-sm leading-relaxed mb-6 ${featured ? 'text-white/80' : 'text-charcoal/60'}`}>
                {description}
              </p>
              <span className={`inline-flex items-center gap-2 font-semibold text-xs uppercase tracking-widest
                               group-hover:gap-3 transition-all duration-200 ${featured ? 'text-white' : 'text-accent'}`}>
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

function PersonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
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

function NoteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
    </svg>
  );
}
