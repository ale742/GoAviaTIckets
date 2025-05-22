'use client';
import Container from '@/components/layout/Container';
import AircraftSearchSection from './components/AircraftSearchSection';
import ExampleAircraftsSection from './components/ExampleAircraftsSection';

const EXAMPLE_AIRCRAFT_IDS = [
  'A6-EDY',
  'G-XLEL',
  'B-LRA',
  'AD6FF2',
  'A1B95F',
  '398495',
];

export default function AircraftSearchPage() {
  return (
    <Container className="py-8 md:py-12">
      <AircraftSearchSection />
      <ExampleAircraftsSection exampleIds={EXAMPLE_AIRCRAFT_IDS} />
    </Container>
  );
}