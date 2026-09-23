import { Hero } from '../components/sections/Hero';
import { MomentsStrip } from '../components/sections/MomentsStrip';
import { ProgramsStrip } from '../components/sections/ProgramsStrip';
import { TeachersPreview } from '../components/sections/TeachersPreview';
import { CTABanner } from '../components/sections/CTABanner';
import { FacilitySection } from '../components/sections/FacilitySection';
import { SEO } from '../components/SEO';
import { FadeIn } from '../components/ui/FadeIn';

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
      <FadeIn direction="none">
        <MomentsStrip />
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
        <CTABanner />
      </FadeIn>
    </>
  );
}
