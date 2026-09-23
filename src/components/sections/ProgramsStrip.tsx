import { Link } from 'react-router-dom';
import { SectionHeading } from '../ui/SectionHeading';
import { FeatureCard } from '../ui/FeatureCard';
// Placeholder image until a dedicated programs photo is ready.
import programsImg from '../../assets/why_choose_eden_music_academy.webp';
import teachersImg from '../../assets/about.webp';

export function ProgramsStrip() {
  return (
    <section className="py-14 px-6 md:px-0 bg-white">
      {/* Mobile keeps programs on its own, with TeachersPreview as a separate section below. */}
      <div className="md:hidden max-w-6xl mx-auto">
        <SectionHeading
          title="Our Programs"
          subtitle="Private Lesson | Ensemble | Music Theory"
          className="mb-10 sm:mb-12"
        />

        <Link
          to="/programs"
          aria-label="More info about our programs"
          className="group relative block cursor-pointer overflow-hidden rounded-3xl shadow-md bg-charcoal/5
                     aspect-[4/3] sm:aspect-[16/7]
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                     focus-visible:ring-offset-2"
        >
          <img
            src={programsImg}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500
                       group-hover:scale-105"
          />
          <span
            className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 inline-flex items-center gap-2
                       px-5 py-3 rounded-full bg-white text-primary text-sm font-semibold shadow-lg
                       transition-all duration-200 group-hover:gap-3"
          >
            More info
            <ArrowRightIcon className="w-4 h-4" />
          </span>
        </Link>
      </div>

      {/* Desktop pairs programs and teachers near full width; side padding matches the 12px gap. */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-3 md:px-3">
        <FeatureCard
          to="/programs"
          image={programsImg}
          title="Our Programs"
          caption="Private Lesson | Ensemble | Music Theory"
          ariaLabel="More info about our programs"
          className="aspect-[3/2] max-h-[560px]"
        />
        <FeatureCard
          to="/teachers"
          image={teachersImg}
          title="Our Teachers"
          caption="Sydney Conservatorium trained"
          ariaLabel="Meet our teachers"
          className="aspect-[3/2] max-h-[560px]"
        />
      </div>
    </section>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}
