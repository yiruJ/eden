import { Hero } from '../components/sections/Hero';
import { ProgramsStrip } from '../components/sections/ProgramsStrip';
import { TeachersPreview } from '../components/sections/TeachersPreview';
import { Testimonials } from '../components/sections/Testimonials';
import { CTABanner } from '../components/sections/CTABanner';
import { FacilitySection } from '../components/sections/FacilitySection';
import { SEO } from '../components/SEO';
import { FadeIn } from '../components/ui/FadeIn';
import { GoogleReviewBadge } from '../components/ui/GoogleReviewBadge';

export function HomePage() {
  return (
    <>
      <SEO
        title="Eden Music Academy: Piano, Violin, Viola & Cello Lessons in Sydney"
        description="Expert piano, violin, viola & cello lessons for all ages in Strathfield, Sydney. Sydney Conservatorium-trained teachers. Book a trial lesson today."
        canonical="/"
      />
      <FadeIn direction="up" duration={700}>
        <Hero />
      </FadeIn>
      <FadeIn direction="up" delay={100}>
        <div className="flex justify-center px-6 py-8 bg-background">
          <GoogleReviewBadge />
        </div>
      </FadeIn>
      <FadeIn direction="up" delay={100}>
        <ProgramsStrip />
      </FadeIn>
      <FadeIn direction="up" delay={100}>
        <TeachersPreview />
      </FadeIn>
      <FadeIn direction="up" delay={100}>
        <FacilitySection />
      </FadeIn>
      <FadeIn direction="up" delay={100}>
        <Testimonials />
      </FadeIn>
      <FadeIn direction="up" delay={100}>
        <CTABanner />
      </FadeIn>
    </>
  );
}
