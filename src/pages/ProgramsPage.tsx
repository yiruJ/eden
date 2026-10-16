import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CTABanner } from '../components/sections/CTABanner';
import { FadeIn } from '../components/ui/FadeIn';
import { SEO } from '../components/SEO';
import privateLessonImg from '../assets/moments/Img3.webp';
import ensembleImg from '../assets/programs.webp';
import theoryImg from '../assets/moments/Img5.webp';

interface Program {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  image: string;
  /** CSS object-position, to keep faces in frame when a portrait photo is cropped */
  imagePosition?: string;
  featured?: boolean;
}

const programs: Program[] = [
  {
    slug: 'private-studio',
    title: 'Private Lesson',
    tagline: 'One-on-one, at your own pace',
    description:
      "Every lesson is shaped around the student's goals and pace, with a teacher's full attention.",
    highlights: ['All ages & levels welcome', '30, 45 or 60 min lessons', 'Structured term-by-term progression'],
    image: privateLessonImg,
  },
  {
    slug: 'ensemble',
    title: 'Ensemble',
    tagline: 'Music is better together',
    description:
      'Students play together in small groups, building listening, timing and confidence. We recommend it alongside private lessons.',
    highlights: ['Play with friends or meet new ones', 'Builds listening & teamwork', 'Strongly recommended for all students'],
    image: ensembleImg,
    imagePosition: 'center 35%',
    featured: true,
  },
  {
    slug: 'music-theory',
    title: 'Music Theory',
    tagline: 'Understand the language of music',
    description:
      'Note reading, rhythm, harmony and scales, so students learn new pieces faster. Take it as a class or within private lessons.',
    highlights: ['Note reading & rhythm', 'Harmony & musical form', 'Standalone or integrated into lessons'],
    image: theoryImg,
  },
];

export function ProgramsPage() {
  return (
    <>
      <SEO
        title="Eden Music Academy: Private Lessons, Ensemble & Music Theory in Sydney"
        description="Explore private studio lessons, ensemble, and music theory at Eden Music Academy, Strathfield, Sydney. Tailored programs for all ages and experience levels."
        canonical="/programs"
      />
      {/* Header */}
      <FadeIn direction="up" duration={700}>
      <section className="pt-28 pb-12 px-6 bg-background text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest">
            What We Offer
          </span>
          <h1 className="text-5xl lg:text-6xl font-display font-bold text-charcoal leading-tight">
            Our Programs
          </h1>
          <p className="text-lg text-charcoal/65 font-light leading-relaxed">
            Private studio, ensemble, and music theory. A complete musical education grounded in community, craft, and genuine joy.
          </p>
        </div>
      </section>
      </FadeIn>

      {/* Program list */}
      <FadeIn direction="up" delay={100}>
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-8">
          {programs.map(({ slug, title, tagline, description, highlights, image, imagePosition, featured }, i) => (
            <div
              key={slug}
              className={`grid lg:grid-cols-2 gap-12 items-center rounded-3xl overflow-hidden border bg-background p-8 lg:p-12 ${
                featured ? 'border-primary/25 shadow-lg' : 'border-primary/8'
              } ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-last' : ''}`}
            >
              {/* Text */}
              <div className="space-y-5">
                {featured && (
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest">
                    Highly Recommended
                  </span>
                )}
                <div className="w-10 h-1 bg-accent rounded-full" />
                <h2 className="text-3xl font-display font-bold text-charcoal">{title}</h2>
                <p className="text-accent font-semibold italic font-display">{tagline}</p>
                <p className="text-charcoal/65 leading-relaxed">{description}</p>
                <ul className="space-y-2 pt-1">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2.5 text-sm text-charcoal/70">
                      <CheckIcon className="w-4 h-4 text-primary shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 mt-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  Enquire about {title}
                </Link>
              </div>

              {/* Image */}
              <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
                <img
                  src={image}
                  alt={`${title} at Eden Music Academy`}
                  className="w-full h-full object-cover"
                  style={imagePosition ? { objectPosition: imagePosition } : undefined}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
      </FadeIn>

      {/* Community section */}
      <FadeIn direction="up" delay={100}>
      <section className="py-20 px-6 bg-background">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <SectionHeading
            tag="Our Philosophy"
            title="Learning music together changes everything"
            subtitle="Private lessons build technique. Ensemble builds musicians. We designed Eden so students can experience both and find their people along the way."
          />
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 mt-4 px-8 py-3.5 bg-primary text-white rounded-lg
                       font-semibold text-sm hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Get in touch
          </Link>
        </div>
      </section>
      </FadeIn>

      <FadeIn direction="up" delay={100}>
        <CTABanner />
      </FadeIn>
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
