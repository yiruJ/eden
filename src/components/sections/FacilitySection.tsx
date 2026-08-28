import { Link } from 'react-router-dom';
import exteriorImg from '../../assets/Facility Shot - Exterior.webp';
import interiorImg from '../../assets/Facility Shot - Interior.webp';

export function FacilitySection() {
  return (
    <section className="pb-10 px-6 bg-secondary">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12 space-y-3">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest">
            Our Studio
          </span>
          <h2 className="text-4xl font-display font-bold text-charcoal leading-tight">
            A space built for music
          </h2>
          <p className="text-charcoal/60 font-light max-w-xl">
            Our dedicated studio in Strathfield gives every student a calm, focused
            environment to learn, practise, and grow.
          </p>
          <p className="text-charcoal/60 font-light max-w-xl">
            Eden families also have three dedicated parking spots in the building's
            underground car park.{' '}
            <Link to="/parking" className="text-primary font-semibold hover:underline">
              See how to park
            </Link>
            .
          </p>
        </div>

        {/* Split panel */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Exterior */}
          <div className="relative overflow-hidden rounded-3xl shadow-md" style={{ height: '420px' }}>
            <img
              src={exteriorImg}
              alt="Eden Music Academy studio exterior — new Strathfield location"
              className="w-full h-full object-cover scale-110 blur-lg"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-charcoal/55 flex flex-col items-center justify-center text-center px-6 gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent text-white text-[11px] font-semibold uppercase tracking-widest">
                Coming Soon
              </span>
              <p className="text-white font-display font-bold text-2xl leading-tight">New Location</p>
              <p className="text-white/75 text-sm max-w-[220px]">
                We're moving to a brand new studio in Strathfield. Photos coming soon.
              </p>
            </div>
          </div>

          {/* Interior */}
          <div className="relative overflow-hidden rounded-3xl shadow-md" style={{ height: '420px' }}>
            <img
              src={interiorImg}
              alt="Eden Music Academy studio interior — new practice rooms"
              className="w-full h-full object-cover scale-110 blur-lg"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-charcoal/55 flex flex-col items-center justify-center text-center px-6 gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent text-white text-[11px] font-semibold uppercase tracking-widest">
                Coming Soon
              </span>
              <p className="text-white font-display font-bold text-2xl leading-tight">New Studio</p>
              <p className="text-white/75 text-sm max-w-[220px]">
                Purpose-built practice rooms are being prepared for our new home.
              </p>
            </div>
          </div>
        </div>

        {/* Address + directions */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4
                        bg-white rounded-2xl px-7 py-5 shadow-sm border border-primary/8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <LocationIcon className="w-4.5 h-4.5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-charcoal">Eden Music Academy</p>
              <p className="text-xs text-charcoal/55 mt-0.5">Strathfield, NSW 2135</p>
            </div>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Shop+24%2F48+Cooper+Street%2C+Strathfield+NSW"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white
                       rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shrink-0"
          >
            Get Directions
            <ArrowRightIcon className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}
