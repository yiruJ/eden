import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 lg:pt-28 lg:pb-36 px-6 bg-background">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* Text content */}
        <div className="relative z-10 space-y-8">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest">
            Mornington Peninsula's Premier Music School
          </span>

          <h1 className="text-5xl lg:text-7xl font-display font-black leading-[1.08] text-charcoal">
            Where Music{' '}
            <span className="block">Becomes a</span>
            <span className="italic text-primary">Way of Life</span>
          </h1>

          <p className="text-lg lg:text-xl text-charcoal/65 max-w-lg leading-relaxed font-light">
            Private lessons, group programs and school incursions designed to
            nurture creativity and technical excellence across all ages.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button variant="primary" size="lg" as={Link} to="/programs">
              Explore Programs
              <ArrowRightIcon />
            </Button>
            <Button variant="ghost" size="lg" as={Link} to="/teachers">
              Meet Our Teachers
            </Button>
          </div>

          {/* Social proof bar */}
          <div className="flex items-center gap-6 pt-4">
            <div className="flex -space-x-3">
              {['A', 'B', 'C', 'D'].map((letter) => (
                <div
                  key={letter}
                  className="w-9 h-9 rounded-full bg-primary/20 border-2 border-white flex items-center justify-center text-xs font-bold text-primary"
                >
                  {letter}
                </div>
              ))}
            </div>
            <p className="text-sm text-charcoal/60">
              <span className="font-semibold text-charcoal">200+ students</span> trust Eden
            </p>
          </div>
        </div>

        {/* Hero image */}
        <div className="relative hidden lg:block">
          {/* Decorative offset bg */}
          <div className="absolute -bottom-6 -right-6 w-full h-full bg-primary/8 rounded-3xl" />

          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] bg-primary/5">
            {/* Botanical SVG overlay */}
            <BotanicalDecoration className="absolute -top-8 -right-8 w-48 h-48 text-primary/15 pointer-events-none z-10" />

            <img
              src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=900&q=80"
              alt="Student playing piano in a warm, sunlit studio"
              className="w-full h-full object-cover"
              loading="eager"
            />
            {/* Warm tint overlay */}
            <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />
          </div>

          {/* Floating stats card */}
          <div className="absolute -left-8 bottom-12 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-4 border border-primary/10">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <MusicNoteIcon className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-charcoal/50 font-medium">Programs available</p>
              <p className="text-lg font-display font-bold text-charcoal">8 Instruments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background botanical decoration */}
      <BotanicalDecoration className="absolute -bottom-20 -left-20 w-80 h-80 text-primary/5 pointer-events-none" />
    </section>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function MusicNoteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
    </svg>
  );
}

function BotanicalDecoration({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="currentColor" aria-hidden="true">
      <path d="M100 10 C60 10, 10 60, 10 100 C10 140, 60 190, 100 190 C140 190, 190 140, 190 100 C190 60 140 10 100 10Z M100 30 C70 50, 50 70, 50 100 C50 130, 70 150, 100 170 C130 150, 150 130, 150 100 C150 70, 130 50, 100 30Z" opacity="0.4" />
      <ellipse cx="100" cy="100" rx="35" ry="60" transform="rotate(-30 100 100)" opacity="0.3" />
      <ellipse cx="100" cy="100" rx="35" ry="60" transform="rotate(30 100 100)" opacity="0.3" />
      <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <line x1="30" y1="65" x2="100" y2="100" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <line x1="170" y1="65" x2="100" y2="100" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <line x1="30" y1="135" x2="100" y2="100" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <line x1="170" y1="135" x2="100" y2="100" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}
