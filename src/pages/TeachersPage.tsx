import { CTABanner } from '../components/sections/CTABanner';
import jiminImg from '../assets/teachers/jimin.JPG';
import hanaImg from '../assets/teachers/hana.jpeg';
import dylanImg from '../assets/teachers/dylan.JPEG';
import { SEO } from '../components/SEO';

const teachers = [
  {
    name: 'Jimin Park',
    instruments: ['Violin'],
    image: jiminImg,
    bio: 'A passionate violinist with a deep commitment to nurturing each student\'s individual voice and musical confidence.',
  },
  {
    name: 'Hana Lee',
    instruments: ['Violin'],
    image: hanaImg,
    bio: 'Hana brings warmth and precision to every lesson, guiding students from their very first notes through to advanced classical repertoire.',
  },
  {
    name: 'Dylan Lee',
    instruments: ['Violin', 'Viola'],
    image: dylanImg,
    bio: 'Dylan\'s dual expertise in violin and viola gives students a rich perspective on string playing and ensemble musicianship.',
  },
];

export function TeachersPage() {
  return (
    <>
      <SEO
        title="Eden Music Academy: Meet Our Sydney Conservatorium-Trained Teachers"
        description="Meet Eden Music Academy's qualified music teachers — all students of the Sydney Conservatorium of Music. Expert violin, viola, cello & piano tuition in North Strathfield."
        canonical="/teachers"
      />
      {/* Header */}
      <section className="pt-20 pb-16 px-6 bg-background text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest">
            The People Behind Eden
          </span>
          <h1 className="text-5xl lg:text-6xl font-display font-bold text-charcoal leading-tight">
            Meet Our Teachers
          </h1>
          <p className="text-lg text-charcoal/65 font-light leading-relaxed max-w-xl mx-auto">
            All of our teachers are students of the{' '}
            <span className="font-semibold text-charcoal">Sydney Conservatorium of Music</span>{' '}
            — one of Australia's most prestigious music institutions.
          </p>
        </div>
      </section>

      {/* Teachers grid */}
      <section className="pb-24 px-6 bg-background">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {teachers.map(({ name, instruments, image, bio }) => (
            <article
              key={name}
              className="group bg-white rounded-3xl overflow-hidden border border-primary/8
                         shadow-md hover:shadow-2xl hover:-translate-y-1.5
                         transition-all duration-300 flex flex-col"
            >
              {/* Photo — dominant area */}
              <div className="relative overflow-hidden" style={{ height: '420px' }}>
                <img
                  src={image}
                  alt={`${name} — Eden Music Academy teacher`}
                  className="w-full h-full object-cover object-top
                             group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Instrument tags overlaid bottom-left */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {instruments.map((inst) => (
                    <span
                      key={inst}
                      className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm
                                 text-charcoal text-xs font-semibold shadow-sm"
                    >
                      {inst}
                    </span>
                  ))}
                </div>
              </div>

              {/* Info — compact below photo */}
              <div className="flex flex-col flex-1 px-7 pt-6 pb-7 space-y-4">
                {/* Name */}
                <h2 className="text-2xl font-display font-bold text-charcoal tracking-tight">
                  {name}
                </h2>

                {/* Bio */}
                <p className="text-sm text-charcoal/60 leading-relaxed flex-1">
                  {bio}
                </p>

                {/* Credentials */}
                <div className="pt-2 border-t border-primary/8 space-y-2.5">
                  {/* Sydney Conservatorium — key credential */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <CapIcon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-xs font-semibold text-charcoal/75">
                      Sydney Conservatorium of Music
                    </span>
                  </div>
                  {/* WWCC */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <ShieldCheckIcon className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <span className="text-xs font-semibold text-charcoal/75">
                      Working With Children Check
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Credential callout */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-primary/5 border border-primary/10 px-10 py-10
                          grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto">
                <CapIcon className="w-6 h-6 text-primary" />
              </div>
              <p className="font-display font-bold text-charcoal text-base">
                Sydney Conservatorium
              </p>
              <p className="text-xs text-charcoal/55 leading-relaxed">
                All teachers study at Australia's leading conservatorium of music
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
                <ShieldCheckIcon className="w-6 h-6 text-accent" />
              </div>
              <p className="font-display font-bold text-charcoal text-base">
                Fully Verified
              </p>
              <p className="text-xs text-charcoal/55 leading-relaxed">
                Every teacher holds a current Working With Children Check
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto">
                <MusicNoteIcon className="w-6 h-6 text-primary" />
              </div>
              <p className="font-display font-bold text-charcoal text-base">
                Specialist Strings
              </p>
              <p className="text-xs text-charcoal/55 leading-relaxed">
                Dedicated instruction in violin, viola, cello and piano
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join the team */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest">
            Join Us
          </span>
          <h2 className="text-3xl font-display font-bold text-charcoal">
            Interested in Teaching at Eden?
          </h2>
          <p className="text-charcoal/60 leading-relaxed font-light">
            We're always looking for passionate, qualified teachers who share our values. Get in touch.
          </p>
          <a
            href="mailto:emacademyinfo@gmail.com"
            className="inline-flex items-center gap-2 mt-4 px-8 py-3.5 bg-primary text-white
                       rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Get in Touch
          </a>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

function CapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
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
