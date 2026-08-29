import { Link } from 'react-router-dom';
import { CTABanner } from '../components/sections/CTABanner';
import { SEO } from '../components/SEO';
import { CelloModel } from '../components/ui/CelloModel';
import { PianoModel } from '../components/ui/PianoModel';
import { ViolinModel } from '../components/ui/ViolinModel';

export function InstrumentsPage() {
  return (
    <>
      <SEO
        title="Choose an Instrument: Piano, Violin, Viola & Cello | Eden Music Academy"
        description="Not sure which instrument to start? Compare piano, violin, viola and cello lessons at Eden Music Academy, Strathfield. Sydney Conservatorium-trained teachers, ages 4+."
        canonical="/instruments"
      />
      {/* Header */}
      <section className="pt-28 pb-12 px-6 bg-background text-center">
        <div className="max-w-2xl mx-auto space-y-5">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest">
            What We Teach
          </span>
          <h1 className="text-5xl lg:text-6xl font-display font-bold text-charcoal leading-tight">
            Instruments
          </h1>
          <p className="text-lg text-charcoal/65 font-light leading-relaxed">
            Piano, violin, viola, and cello, taught with care and intention. Regardless of age or experience, we'll match you with the right teacher and approach.
          </p>
        </div>
      </section>

      {/* Bento grid */}
      <section className="py-8 px-6 pb-20 bg-background">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-2 gap-4">

          {/* Piano — landscape, cols 1-4 row 1 */}
          <div className="sm:col-span-2 lg:col-span-4 lg:row-span-1 lg:col-start-1 lg:row-start-1
                       bg-white rounded-3xl border border-primary/8 shadow-sm
                       overflow-hidden flex flex-row min-h-[220px]">
            <div className="flex flex-col justify-center p-7 w-1/2 shrink-0">
              <span className="text-xs font-semibold text-accent uppercase tracking-widest mb-2 block">Keyboard</span>
              <h3 className="text-2xl font-display font-bold text-charcoal mb-2">Piano</h3>
              <p className="text-sm text-charcoal/60 leading-relaxed">
                Build a strong musical foundation through classical technique, contemporary styles, and music theory. All on one instrument.
              </p>
            </div>
            <div className="relative w-1/2 min-h-0">
              <PianoModel />
            </div>
          </div>

          {/* Violin + Viola wrapper — cols 1-4 row 2 */}
          <div className="lg:col-span-4 lg:row-span-1 lg:col-start-1 lg:row-start-2
                       flex flex-col lg:flex-row gap-4">

            {/* Violin */}
            <div className="relative bg-white rounded-3xl border border-primary/8 shadow-sm overflow-hidden
                         w-full lg:w-[48%]" style={{ minHeight: '280px' }}>
              <div className="absolute inset-0">
                <ViolinModel distanceMultiplier={1.6} cameraYOffset={0.32} cameraXOffset={-0.15} />
              </div>
              <div className="absolute top-0 left-0 p-4 w-1/2">
                <span className="text-xs font-semibold text-accent uppercase tracking-widest mb-1 block">Strings</span>
                <h3 className="text-lg font-display font-bold text-charcoal mb-1">Violin</h3>
                <p className="text-xs text-charcoal/60 leading-relaxed">
                  Classical strings from first bow hold to advanced repertoire.
                </p>
              </div>
            </div>

            {/* Viola */}
            <div className="bg-white rounded-3xl border border-primary/8 shadow-sm overflow-hidden flex flex-row
                         w-full lg:w-[52%]">
              <div className="relative w-[55%]" style={{ minHeight: '280px' }}>
                <ViolinModel distanceMultiplier={1.3} cameraYOffset={0.22} />
              </div>
              <div className="flex flex-col justify-end p-5 pb-6 w-[45%]">
                <span className="text-xs font-semibold text-accent uppercase tracking-widest mb-1 block">Strings</span>
                <h3 className="text-lg font-display font-bold text-charcoal mb-1">Viola</h3>
                <p className="text-xs text-charcoal/60 leading-relaxed">
                  Warm, resonant tone. Open to beginners and violin transfers.
                </p>
              </div>
            </div>

          </div>

          {/* Cello — tall vertical, cols 5-6 rows 1-2 */}
          <div className="sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:col-start-5 lg:row-start-1
                       bg-white rounded-3xl border border-primary/8 shadow-sm
                       overflow-hidden flex flex-col min-h-[400px]">
            <div className="relative flex-1 min-h-0" style={{ minHeight: '300px' }}>
              <CelloModel />
            </div>
            <div className="p-6">
              <span className="text-xs font-semibold text-accent uppercase tracking-widest mb-1 block">Strings</span>
              <h3 className="text-xl font-display font-bold text-charcoal mb-1.5">Cello</h3>
              <p className="text-sm text-charcoal/60 leading-relaxed">
                Rich, expressive, and deeply musical. Lessons cover posture, bow technique, and beautiful classical repertoire.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Not sure section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest">
            Need guidance?
          </span>
          <h2 className="text-3xl font-display font-bold text-charcoal">Not Sure Which Instrument?</h2>
          <p className="text-charcoal/60 font-light leading-relaxed max-w-xl mx-auto">
            That's totally fine. Get in touch and we'll help you find the perfect fit based on your interests, age, and goals.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-lg font-semibold text-sm
                       hover:bg-primary/90 transition-colors cursor-pointer mt-4"
          >
            Ask Us
          </Link>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

function PianoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 80" fill="none" aria-hidden="true">
      <rect x="4" y="10" width="112" height="62" rx="5" stroke="currentColor" strokeWidth="3.5" fill="none" />
      {[20, 36, 52, 68, 84, 100].map((x) => (
        <line key={x} x1={x} y1="10" x2={x} y2="72" stroke="currentColor" strokeWidth="2" />
      ))}
      {[12, 28, 60, 76, 92].map((x) => (
        <rect key={x} x={x} y="10" width="12" height="34" rx="2" fill="currentColor" />
      ))}
    </svg>
  );
}

function ViolinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 160" fill="none" aria-hidden="true">
      <ellipse cx="30" cy="115" rx="22" ry="26" stroke="currentColor" strokeWidth="3" fill="none" />
      <ellipse cx="30" cy="58" rx="17" ry="20" stroke="currentColor" strokeWidth="3" fill="none" />
      <path d="M8 89 C12 82, 12 74, 13 68" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M52 89 C48 82, 48 74, 47 68" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
      <rect x="26" y="22" width="8" height="22" rx="3" fill="currentColor" />
      <path d="M30 22 C30 22, 22 18, 22 12 C22 6, 27 4, 30 6 C33 8, 34 13, 30 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M22 105 C22 101, 24 99, 24 95" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M38 105 C38 101, 36 99, 36 95" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="30" y1="14" x2="30" y2="135" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
    </svg>
  );
}

function ViolaIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 165" fill="none" aria-hidden="true">
      <ellipse cx="32" cy="118" rx="24" ry="28" stroke="currentColor" strokeWidth="3" fill="none" />
      <ellipse cx="32" cy="59" rx="19" ry="22" stroke="currentColor" strokeWidth="3" fill="none" />
      <path d="M8 92 C13 84, 13 76, 14 70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M56 92 C51 84, 51 76, 50 70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
      <rect x="28" y="22" width="8" height="22" rx="3" fill="currentColor" />
      <path d="M32 22 C32 22, 24 18, 24 12 C24 6, 29 4, 32 6 C35 8, 36 13, 32 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M23 108 C23 104, 25 102, 25 98" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M41 108 C41 104, 39 102, 39 98" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="14" x2="32" y2="138" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
    </svg>
  );
}

