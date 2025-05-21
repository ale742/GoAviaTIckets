import Link from 'next/link';
import { FaSearch, FaPlane } from 'react-icons/fa';
import Container from '../layout/Container';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 md:py-32">
      <Container className="text-center">
        <FaPlane className="text-6xl md:text-8xl mx-auto mb-6 opacity-80" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          Откройте мир авиации с GoAviaTickets
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
          Быстрый доступ к информации о самолетах, маршрутах полетов и авиакомпаниях.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            href="/aircraft"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 transition-colors shadow-lg"
          >
            <FaSearch className="mr-2 -ml-1 h-5 w-5" />
            Найти самолет
          </Link>
          <Link
            href="/flight-routes"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors shadow-lg"
          >
            Искать маршрут
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default HeroSection;