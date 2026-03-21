import { Hero } from '../components/sections/Hero';
import { ProgramsStrip } from '../components/sections/ProgramsStrip';
import { TeachersPreview } from '../components/sections/TeachersPreview';
import { WhyEden } from '../components/sections/WhyEden';
import { Testimonials } from '../components/sections/Testimonials';
import { CTABanner } from '../components/sections/CTABanner';
import { SEO } from '../components/SEO';

export function HomePage() {
  return (
    <>
      <SEO
        title="Eden Music Academy: Piano, Violin, Viola & Cello Lessons in Sydney"
        description="Expert piano, violin, viola & cello lessons for all ages in North Strathfield, Sydney. Sydney Conservatorium-trained teachers. Book a trial lesson today."
        canonical="/"
      />
      <Hero />
      <ProgramsStrip />
      <TeachersPreview />
      <WhyEden />
      <Testimonials />
      <CTABanner />
    </>
  );
}
