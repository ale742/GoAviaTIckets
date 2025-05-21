'use client';
import Container from '@/components/layout/Container';
import FlightRouteSearchSection from './components/FlightRouteSearchSection';
import RecentFlightRoutesSection from './components/RecentFlightRoutesSection';

export default function FlightRoutesPage() {
  return (
    <Container className="py-8 md:py-12">
      <FlightRouteSearchSection />
      <RecentFlightRoutesSection />
    </Container>
  );
}