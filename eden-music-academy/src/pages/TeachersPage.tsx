import { SectionHeading } from '../components/ui/SectionHeading';
import { CTABanner } from '../components/sections/CTABanner';

const teachers = [
  {
    name: 'Sophie Lawson',
    role: 'Founder & Piano Teacher',
    instruments: ['Piano', 'Music Theory'],
    bio: 'A graduate of the Melbourne Conservatorium of Music, Sophie has over 15 years of teaching and performance experience. She founded Eden with a vision to create music education that feels as nurturing as it is excellent. Sophie teaches students from age 4 through to adults, with a particular passion for helping beginners fall in love with music.',
    qualifications: ['BMus (Melbourne Conservatorium)', 'AMEB Grade 8 Piano', 'Working With Children Check'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
    initials: 'SL',
  },
  {
    name: 'Marcus Chen',
    role: 'Guitar & Theory Teacher',
    instruments: ['Acoustic Guitar', 'Electric Guitar', 'Ukulele', 'Music Theory'],
    bio: 'Marcus brings a deep love of jazz, classical, and contemporary guitar to every lesson. With a background in both performance and education, his patient and methodical approach helps students of all ages find their own musical voice. He has performed nationally and recorded with several Australian artists.',
    qualifications: ['BMus Jazz Performance (VCA)', 'AMEB Registered Teacher', 'Working With Children Check'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    initials: 'MC',
  },
  {
    name: 'Priya Anand',
    role: 'Vocals & Songwriting Teacher',
    instruments: ['Contemporary Voice', 'Classical Voice', 'Songwriting'],
    bio: 'With a background spanning musical theatre, contemporary vocal coaching, and original songwriting, Priya brings warmth and expertise to every session. She specialises in breath technique, performance confidence, and helping students write and produce their own original music.',
    qualifications: ['BA Musical Theatre (VCA)', 'Certified Vocal Health Practitioner', 'Working With Children Check'],
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80',
    initials: 'PA',
  },
  {
    name: 'Tom Ellery',
    role: 'Drums & Percussion Teacher',
    instruments: ['Drum Kit', 'Cajón', 'Percussion'],
    bio: 'Tom has toured nationally with several Australian acts and brings genuine real-world experience into his teaching. He works across all styles from jazz and funk to rock and pop, with a relentless focus on groove, feel, and rhythmic vocabulary. His lessons are energetic, practical, and always grounded in real music.',
    qualifications: ['BMus Performance (Monash)', 'Berklee Online — Modern Drummer', 'Working With Children Check'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80',
    initials: 'TE',
  },
  {
    name: 'Claire Dubois',
    role: 'Violin & Strings Teacher',
    instruments: ['Violin', 'Viola'],
    bio: 'Claire trained in France before settling on the Mornington Peninsula, where she has been teaching violin for over a decade. She uses a blend of Suzuki and traditional methods to engage young learners and guide advanced students toward excellence. Her warm, nurturing style makes lessons a joy.',
    qualifications: ['Diplôme National Supérieur (CRR Paris)', 'Suzuki Violin Book 1–5 Certified', 'Working With Children Check'],
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80',
    initials: 'CD',
  },
  {
    name: 'Liam Porter',
    role: 'Flute & Woodwind Teacher',
    instruments: ['Flute', 'Clarinet', 'Saxophone'],
    bio: 'Liam studied at the Australian National Academy of Music and has performed with orchestras and chamber ensembles across Australia. As a teacher, he draws on deep technical knowledge to help students build strong foundational technique while keeping lessons engaging and musical.',
    qualifications: ['BMus (ANAM)', 'AMEB Registered Teacher', 'Working With Children Check'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
    initials: 'LP',
  },
];

export function TeachersPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-20 pb-12 px-6 bg-background text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest">
            The People Behind Eden
          </span>
          <h1 className="text-5xl lg:text-6xl font-display font-bold text-charcoal leading-tight">
            Meet Our Teachers
          </h1>
          <p className="text-lg text-charcoal/65 font-light leading-relaxed">
            Every teacher at Eden is qualified, experienced, and genuinely passionate about helping students grow — musically and as people.
          </p>
        </div>
      </section>

      {/* Teachers grid */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map(({ name, role, instruments, bio, qualifications, initials }) => (
            <div key={name} className="bg-background rounded-3xl overflow-hidden border border-primary/8 flex flex-col">
              {/* Avatar area */}
              <div className="bg-primary/8 h-40 flex items-center justify-center">
                <div className="w-24 h-24 rounded-2xl bg-primary/20 flex items-center justify-center font-display font-bold text-primary text-3xl">
                  {initials}
                </div>
              </div>

              <div className="p-7 flex flex-col gap-4 flex-1">
                <div>
                  <h3 className="text-xl font-display font-bold text-charcoal">{name}</h3>
                  <p className="text-accent text-xs font-semibold uppercase tracking-wider mt-1">{role}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {instruments.map((inst) => (
                    <span key={inst} className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {inst}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-charcoal/60 leading-relaxed flex-1">{bio}</p>

                <div className="pt-2 border-t border-primary/8 space-y-1.5">
                  {qualifications.map((q) => (
                    <div key={q} className="flex items-start gap-2 text-xs text-charcoal/50">
                      <CheckIcon className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                      {q}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join the team */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <SectionHeading
            tag="Join Us"
            title="Interested in Teaching at Eden?"
            subtitle="We're always looking for passionate, qualified teachers who share our values. Get in touch."
          />
          <a
            href="mailto:hello@edenmusic.edu.au"
            className="inline-flex items-center gap-2 mt-4 px-8 py-3.5 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Get in Touch
          </a>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}
