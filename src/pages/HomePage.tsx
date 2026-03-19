import { Hero } from '../components/sections/Hero';
import { ProgramsStrip } from '../components/sections/ProgramsStrip';
import { TeachersPreview } from '../components/sections/TeachersPreview';
import { WhyEden } from '../components/sections/WhyEden';
import { Testimonials } from '../components/sections/Testimonials';
import { CTABanner } from '../components/sections/CTABanner';

export function HomePage() {
  return (
    <>
      <Hero />
      <ProgramsStrip />
      <TeachersPreview />
      <WhyEden />
      <Testimonials />
      <CTABanner />
    </>
  );
}
