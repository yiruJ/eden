import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import heroImg from '../../assets/hero.webp';


export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white -mt-10 lg:pb-14">

      {/* ── MOBILE: full-bleed image hero ── */}
      <div className="lg:hidden relative h-[74svh] max-h-[600px] flex flex-col justify-end">

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
        <div className="relative z-10 px-6 pb-10 space-y-6">
          <h1 className="text-[clamp(1.25rem,6.7vw,2.75rem)] font-display font-black leading-[1.1] text-white">
            Helping Children Discover<br />
            <span className="italic">Confidence</span> Through<br />
            Music
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

          <div className="pt-1">
            <Link to="/enrol" className="block">
              <Button variant="primary" size="lg" className="w-full">
                Book a Trial Lesson
                <ArrowRightIcon />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── DESKTOP: full-bleed image hero ── */}
      {/* +2.5rem cancels the section's -mt-10, so the photo still reaches the fold. */}
      <div className="hidden lg:block relative overflow-hidden h-[calc(100svh+2.5rem)] min-h-[560px] bg-black">

        {/* Offset right so the subject clears the headline, leaving black down the left edge.
            That strip sits under the darkest part of the scrim, so it reads as shadow rather than a gap.
            Offsetting beats scaling here: the 4:3 source crops vertically in this box, so any horizontal
            shift would otherwise have to come from zooming in. */}
        <img
          src={heroImg}
          alt="Student playing piano in a warm, sunlit studio"
          className="absolute inset-y-0 left-[15%] h-full w-full object-cover object-[50%_12%]
                     [mask-image:linear-gradient(to_right,transparent,black_18%)]
                     [-webkit-mask-image:linear-gradient(to_right,transparent,black_18%)]"
          loading="eager"
          fetchPriority="high"
        />

        {/* Darkest on the left where the copy sits, so the photo still reads on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
          <div className="max-w-xl space-y-8">
            <h1 className="text-[clamp(2rem,3.4vw,2.75rem)] font-display font-black leading-[1.08] text-white">
              Helping Children Discover
              <span className="block"><span className="italic">Confidence</span> Through</span>
              Music<span className="inline-block w-2.5 h-2.5 rounded-full align-baseline ml-1" style={{ backgroundColor: '#ed3144' }} aria-hidden="true" />
            </h1>

            <p className="text-xl text-white/75 max-w-lg leading-relaxed font-light">
              Sydney Conservatorium-trained teachers offering piano, violin, cello
              and viola lessons for children from age 4 in Strathfield.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/enrol">
                <Button variant="primary" size="lg">
                  Book a Trial Lesson
                  <ArrowRightIcon />
                </Button>
              </Link>
              <Link to="/teachers">
                <Button
                  variant="ghost"
                  size="lg"
                  className="!text-white !border-white/35 hover:!border-white/70 backdrop-blur-sm"
                >
                  Explore Teachers
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
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

