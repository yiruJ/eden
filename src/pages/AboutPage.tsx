import { SectionHeading } from '../components/ui/SectionHeading';
import { CTABanner } from '../components/sections/CTABanner';
import { FadeIn } from '../components/ui/FadeIn';
import aboutImg from '../assets/about.jpg';
import { SEO } from '../components/SEO';

const team = [
  {
    name: 'Yiru Jang',
    role: 'Co-Founder & Director',
    bio: 'Yiru oversees all administration and business operations at Eden, ensuring every student benefits from a high-quality environment and a well-crafted curriculum. His leadership keeps Eden running with purpose and care.',
    initials: 'YJ',
  },
  {
    name: 'Dylan Lee',
    role: 'Co-Founder & Violin / Viola Teacher',
    bio: 'Dylan\'s dual expertise in violin and viola gives students a rich perspective on string playing and ensemble musicianship.',
    initials: 'D',
  },
  {
    name: 'Jimin Yang',
    role: 'Violin Teacher',
    bio: 'A passionate violinist with a deep commitment to nurturing each student\'s individual voice and musical confidence.',
    initials: 'J',
  },
  {
    name: 'Hana Lee',
    role: 'Violin Teacher',
    bio: 'Hana brings warmth and precision to every lesson, guiding students from their very first notes through to advanced classical repertoire.',
    initials: 'H',
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
      <SEO
        title="Eden Music Academy: About Our Music School in North Strathfield, Sydney"
        description="Founded in 2014, Eden Music Academy is a warm, community-focused music school in North Strathfield, Sydney's Inner West. Meet our Sydney Conservatorium-trained teachers."
        canonical="/about"
      />
      {/* Hero */}
      <FadeIn direction="up" duration={700}>
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
              Eden Music Academy was born from a simple belief — that great music teaching changes lives. Founded in Sydney in 2014, we've grown into a community of passionate teachers and curious students of all ages.
            </p>
            <p className="text-lg text-charcoal/65 leading-relaxed font-light max-w-lg">
              We named ourselves Eden because we wanted to create a space where creativity flourishes naturally — warm, alive, and full of possibility.
            </p>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-primary/8 rounded-3xl translate-x-5 translate-y-5" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src={aboutImg}
                alt="The Eden Music Academy studio"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      </FadeIn>

      {/* Values */}
      <FadeIn direction="up" delay={100}>
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
      </FadeIn>

      {/* Team */}
      <FadeIn direction="up" delay={100}>
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
      </FadeIn>

      <FadeIn direction="up" delay={100}>
        <CTABanner />
      </FadeIn>
    </>
  );
}
