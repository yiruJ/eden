import whyEdenImg from '../../assets/why_choose_eden_music_academy.png';

const values = [
  {
    icon: StarIcon,
    title: 'Expert Teachers',
    description: 'Learn from qualified, passionate instructors with real performance and teaching experience.',
  },
  {
    icon: CalendarIcon,
    title: 'Flexible Scheduling',
    description: 'Lessons designed to fit your lifestyle — mornings, afternoons, evenings, and weekends.',
  },
  {
    icon: HeartIcon,
    title: 'All Ages Welcome',
    description: 'From curious 4-year-olds to adult learners returning to music — everyone belongs at Eden.',
  },
  {
    icon: LeafIcon,
    title: 'Nurturing Environment',
    description: 'A warm, beautiful space free of pressure — where creativity and confidence naturally flourish.',
  },
];

export function WhyEden() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

        {/* Text side */}
        <div className="space-y-10">
          <div className="flex flex-col gap-4 items-start text-left">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest">
              Why Eden
            </span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-charcoal leading-tight">
              Why Choose<br />
              <span className="underline underline-offset-4">Eden Music Academy</span>?
            </h2>
            <p className="text-lg text-charcoal/65 max-w-2xl leading-relaxed font-light">
              We believe music education should feel as good as it sounds — expert guidance in a space that inspires.
            </p>
            <div className="w-16 h-1 bg-accent/40 rounded-full" />
          </div>

          <div className="grid grid-cols-2 gap-8">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-display font-bold text-charcoal">{title}</h4>
                <p className="hidden sm:block text-sm text-charcoal/60 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Image side */}
        <div className="relative">
          <div className="absolute inset-0 bg-primary/8 rounded-3xl translate-x-5 translate-y-5" />
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-square bg-primary/5">
            <img
              src={whyEdenImg}
              alt="Teacher guiding a young student through a piano lesson in a sunlit room"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl px-5 py-4 border border-primary/10">
            <p className="text-3xl font-display font-black text-primary">10+</p>
            <p className="text-xs text-charcoal/50 font-medium mt-0.5">Years of nurturing</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  );
}

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20c9 0 14-8 14-8a25.53 25.53 0 00-5-4z" />
    </svg>
  );
}
