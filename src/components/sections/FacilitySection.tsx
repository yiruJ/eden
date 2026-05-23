import exteriorImg from '../../assets/Facility Shot - Exterior.webp';
import interiorImg from '../../assets/Facility Shot - Interior.webp';

export function FacilitySection() {
  return (
    <section className="py-20 px-6 bg-secondary">
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
            Our dedicated studio in North Strathfield gives every student a calm, focused
            environment to learn, practise, and grow.
          </p>
        </div>

        {/* Split panel */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Exterior */}
          <div className="relative overflow-hidden rounded-3xl shadow-md group" style={{ height: '420px' }}>
            <img
              src={exteriorImg}
              alt="Eden Music Academy studio exterior — North Strathfield"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute bottom-0 inset-x-0 px-6 py-5 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-white font-display font-bold text-lg leading-tight">Exterior</p>
              <p className="text-white/70 text-sm mt-0.5">North Strathfield, Sydney</p>
            </div>
          </div>

          {/* Interior */}
          <div className="relative overflow-hidden rounded-3xl shadow-md group" style={{ height: '420px' }}>
            <img
              src={interiorImg}
              alt="Eden Music Academy studio interior — practice room"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute bottom-0 inset-x-0 px-6 py-5 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-white font-display font-bold text-lg leading-tight">Studio Interior</p>
              <p className="text-white/70 text-sm mt-0.5">Purpose-built practice rooms</p>
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
              <p className="text-xs text-charcoal/55 mt-0.5">North Strathfield, NSW 2137</p>
            </div>
          </div>
          <a
            href="https://maps.google.com/?q=North+Strathfield+NSW+2137"
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
