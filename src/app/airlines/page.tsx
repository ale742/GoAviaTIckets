'use client';
import Container from '@/components/layout/Container';
import AirlineSearchSection from './components/AirlineSearchSection';
import RecentAirlinesSection from './components/RecentAirlinesSection';

export default function AirlinesPage() {
  return (
    <Container className="py-8 md:py-12">
      <AirlineSearchSection />
      <RecentAirlinesSection />
    </Container>
  );
}