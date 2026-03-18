import { Link } from 'react-router-dom';
import jiminImg from '../../assets/teachers/jimin.JPG';
import hanaImg from '../../assets/teachers/hana.jpeg';
import dylanImg from '../../assets/teachers/dylan.JPEG';

const teachers = [
  { name: 'Jimin Park', instruments: 'Violin', image: jiminImg },
  { name: 'Hana Lee', instruments: 'Violin', image: hanaImg },
  { name: 'Dylan Lee', instruments: 'Violin & Viola', image: dylanImg },
];

export function TeachersPreview() {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest">
              Our Teachers
            </span>
            <h2 className="text-4xl font-display font-bold text-charcoal leading-tight">
              Learn from the best
            </h2>
            <p className="text-charcoal/60 font-light whitespace-nowrap">
              All our teachers study at the{' '}
              <span className="font-semibold text-charcoal whitespace-nowrap">Sydney Conservatorium of Music.</span>
            </p>
          </div>
          <Link
            to="/teachers"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-primary/25
                       hover:border-primary/50 text-charcoal font-semibold text-sm transition-all
                       duration-200 cursor-pointer shrink-0"
          >
            Meet all teachers
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>

        {/* Teacher cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          {teachers.map(({ name, instruments, image }) => (
            <Link
              key={name}
              to="/teachers"
              className="group flex items-center gap-4 p-4 bg-white rounded-2xl border border-primary/8
                         hover:border-primary/20 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {/* Circular profile photo */}
              <div className="w-36 h-36 rounded-full overflow-hidden shrink-0 ring-2 ring-primary/10
                              group-hover:ring-primary/30 transition-all duration-200">
                <img
                  src={image}
                  alt={`${name} — Eden Music Academy`}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div className="min-w-0">
                <p className="font-display font-bold text-charcoal text-base leading-tight">{name}</p>
                <p className="text-accent text-xs font-semibold uppercase tracking-wider mt-0.5">{instruments}</p>
                <p className="text-charcoal/45 text-xs mt-1 truncate">Sydney Conservatorium</p>
              </div>

              {/* Arrow */}
              <ArrowIcon className="w-4 h-4 text-charcoal/25 group-hover:text-primary ml-auto shrink-0
                                    transition-colors duration-200" />
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}
