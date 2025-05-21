import CallToActionSection from '@/components/home/CallToActionSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import HeroSection from '@/components/home/HeroSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import QuickSearchLinks from '@/components/home/QuickSearchLinks';


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuickSearchLinks />
      <HowItWorksSection />
      <FeaturesSection />
      <CallToActionSection />
    </>
  );
}