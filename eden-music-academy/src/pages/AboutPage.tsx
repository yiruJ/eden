import { SectionHeading } from '../components/ui/SectionHeading';
import { CTABanner } from '../components/sections/CTABanner';

const team = [
  {
    name: 'Sophie Lawson',
    role: 'Founder & Piano Teacher',
    bio: 'A graduate of the Melbourne Conservatorium, Sophie has over 15 years of teaching and performance experience. She founded Eden with a vision to create music education that feels as nurturing as it is excellent.',
    initials: 'SL',
  },
  {
    name: 'Marcus Chen',
    role: 'Guitar & Theory',
    bio: 'Marcus brings a deep love of jazz, classical, and contemporary guitar to every lesson. His patient, methodical approach helps students of all ages find their own musical voice.',
    initials: 'MC',
  },
  {
    name: 'Priya Anand',
    role: 'Vocals & Songwriting',
    bio: 'With a background in musical theatre and contemporary vocal coaching, Priya specialises in breath technique, performance confidence, and original songwriting.',
    initials: 'PA',
  },
  {
    name: 'Tom Ellery',
    role: 'Drums & Percussion',
    bio: 'Tom has toured nationally and brings real-world performance experience into his teaching. He works across all styles from jazz to rock, with a focus on groove and feel.',
    initials: 'TE',
  },
];

const values = [
  {
    title: 'Artistry First',
    description:
      'We believe technique is a means to an end — the end being genuine musical expression and a lifelong love of music.',
  },
  {
    title: 'Student-Centred',
    description:
      'Every lesson is tailored to the individual. We meet students where they are and build at their pace.',
  },
  {
    title: 'Community',
    description:
      'Eden is more than lessons. It is a community of musicians, families, and teachers who support each other.',
  },
];

export function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-16 px-6 bg-background">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest">
              Our Story
            </span>
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-charcoal leading-tight">
              Music education <span className="italic text-primary">with heart</span>
            </h1>
            <p className="text-lg text-charcoal/65 leading-relaxed font-light max-w-lg">
              Eden Music Academy was born from a simple belief — that great music teaching changes lives. Founded on the Mornington Peninsula in 2014, we've grown into a community of passionate teachers and curious students of all ages.
            </p>
            <p className="text-lg text-charcoal/65 leading-relaxed font-light max-w-lg">
              We named ourselves Eden because we wanted to create a space where creativity flourishes naturally — warm, alive, and full of possibility.
            </p>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-primary/8 rounded-3xl translate-x-5 translate-y-5" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80"
                alt="The Eden Music Academy studio — a warm, plant-filled teaching space"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            tag="What We Stand For"
            title="Our Values"
            className="mb-14"
          />
          <div className="grid md:grid-cols-3 gap-8">
            {values.map(({ title, description }) => (
              <div key={title} className="bg-background rounded-2xl p-8 border border-primary/8">
                <div className="w-10 h-1 bg-accent rounded-full mb-6" />
                <h3 className="text-xl font-display font-bold text-charcoal mb-3">{title}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            tag="The People Behind Eden"
            title="Meet the Team"
            subtitle="Qualified, passionate, and genuinely invested in your musical growth."
            className="mb-14"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(({ name, role, bio, initials }) => (
              <div key={name} className="bg-white rounded-2xl p-6 border border-primary/8 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center font-display font-bold text-primary text-xl">
                  {initials}
                </div>
                <div>
                  <h3 className="font-display font-bold text-charcoal">{name}</h3>
                  <p className="text-xs text-accent font-semibold uppercase tracking-wider mt-0.5">{role}</p>
                </div>
                <p className="text-sm text-charcoal/60 leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
