import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import heroImg from '../../assets/hero.webp';

const instruments = ['Piano', 'Violin', 'Cello', 'Viola'] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background -mt-16">

      {/* ── MOBILE: full-bleed image hero ── */}
      <div className="lg:hidden relative h-[70svh] max-h-[520px] flex flex-col justify-end">

        {/* Background image */}
        <img
          src={heroImg}
          alt="Student playing violin in a warm sunlit studio"
          className="absolute inset-0 w-full h-full object-cover object-top"
          loading="eager"
          fetchPriority="high"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/55 to-black/95" />

        {/* Text + credential chips + CTAs */}
        <div className="relative z-10 px-6 pb-10 space-y-4">
          <h1 className="text-4xl font-display font-black text-white leading-[1.1]">
            Where Young<br />
            Musicians<br />
            <span className="italic" style={{ color: '#4aaf81' }}>Find Their Voice</span><span className="inline-block w-2.5 h-2.5 rounded-full align-baseline ml-1" style={{ backgroundColor: '#ed3144' }} aria-hidden="true" />
          </h1>

          {/* Credential chips */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-primary/80 backdrop-blur-sm flex items-center justify-center shrink-0">
                <GraduationCapIcon className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-white/90 text-sm font-medium">Sydney Conservatorium-trained teachers</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-primary/80 backdrop-blur-sm flex items-center justify-center shrink-0">
                <PeopleIcon className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-white/90 text-sm font-medium">All ages & levels welcome</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-1">
            <Link to="/enrol" className="block">
              <Button variant="primary" size="lg" className="w-full">
                Book a Free Trial Lesson
                <ArrowRightIcon />
              </Button>
            </Link>
            <Link to="/teachers" className="block">
              <button className="w-full inline-flex items-center justify-center gap-2 rounded-lg font-semibold
                                 px-10 py-4 text-base border-2 border-white/35 text-white
                                 bg-white/10 backdrop-blur-sm hover:bg-white/20
                                 transition-all duration-200 cursor-pointer
                                 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent">
                Explore Teachers
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── DESKTOP: 2-column layout ── */}
      <div className="hidden lg:block pt-10 pb-14 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* Text content */}
          <div className="relative z-10 space-y-8 -mt-4">
            <h1 className="text-7xl font-display font-black leading-[1.08] text-charcoal">
              Where Young{' '}
              <span className="block">Musicians</span>
              <span className="italic" style={{ color: '#4aaf81' }}>Find Their Voice</span><span className="inline-block w-2.5 h-2.5 rounded-full align-baseline ml-1" style={{ backgroundColor: '#ed3144' }} aria-hidden="true" />
            </h1>

            <p className="text-xl text-charcoal/65 max-w-lg leading-relaxed font-light">
              Sydney Conservatorium-trained teachers offering piano, violin, cello
              and viola lessons for children from age 4 in North Strathfield.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/enrol">
                <Button variant="primary" size="lg">
                  Book a Free Trial Lesson
                  <ArrowRightIcon />
                </Button>
              </Link>
              <Link to="/teachers">
                <Button variant="ghost" size="lg">
                  Explore Teachers
                </Button>
              </Link>
            </div>

            {/* Instrument pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {instruments.map(i => (
                <span key={i} className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/15">
                  {i}
                </span>
              ))}
            </div>
          </div>

          {/* Image side */}
          <div className="relative">
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-primary/8 rounded-3xl" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] bg-primary/5">
              <BotanicalDecoration className="absolute -top-8 -right-8 w-48 h-48 text-primary/15 pointer-events-none z-10" />
              <img
                src={heroImg}
                alt="Student playing piano in a warm, sunlit studio"
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />
            </div>

            {/* Floating stats card */}
            <div className="absolute -left-8 bottom-12 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-4 border border-primary/10">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <MusicNoteIcon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-xs text-charcoal/50 font-medium">Programs available</p>
                <p className="text-lg font-display font-bold text-charcoal">4 Instruments</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BotanicalDecoration className="absolute -bottom-20 -left-20 w-80 h-80 text-primary/5 pointer-events-none hidden lg:block" />
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

function GraduationCapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  );
}

function PeopleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
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
