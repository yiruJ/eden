import { Hero } from '../components/sections/Hero';
import { ProgramsStrip } from '../components/sections/ProgramsStrip';
import { TeachersPreview } from '../components/sections/TeachersPreview';
import { WhyEden } from '../components/sections/WhyEden';
import { Testimonials } from '../components/sections/Testimonials';
import { CTABanner } from '../components/sections/CTABanner';
import { SEO } from '../components/SEO';
import { FadeIn } from '../components/ui/FadeIn';

export function HomePage() {
  return (
    <>
      <SEO
        title="Eden Music Academy: Piano, Violin, Viola & Cello Lessons in Sydney"
        description="Expert piano, violin, viola & cello lessons for all ages in North Strathfield, Sydney. Sydney Conservatorium-trained teachers. Book a trial lesson today."
        canonical="/"
      />
      <FadeIn direction="up" duration={700}>
        <Hero />
      </FadeIn>
      <FadeIn direction="up" delay={100}>
        <ProgramsStrip />
      </FadeIn>
      <FadeIn direction="up" delay={100}>
        <TeachersPreview />
      </FadeIn>
      <FadeIn direction="up" delay={100}>
        <WhyEden />
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
