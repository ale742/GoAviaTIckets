import Container from '@/components/layout/Container';
import { FaPaperPlane } from 'react-icons/fa';
import { Button } from '../ui/button';
import Link from 'next/link';

const CallToActionSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <Container className="text-center">
        <FaPaperPlane className="text-5xl md:text-6xl mx-auto mb-6 opacity-80" />
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Готовы начать исследование?
        </h2>
        <p className="text-lg md:text-xl mb-10 max-w-xl mx-auto opacity-90">
          Присоединяйтесь к тысячам авиационных энтузиастов и профессионалов.
          Найдите интересующую вас информацию прямо сейчас!
        </p>
         <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-3">
          <Link
            href="/aircraft"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium bg-white text-blue-600 hover:bg-gray-200  dark:bg-gray-200 dark:text-blue-700 dark:hover:bg-gray-300 transition-colors duration-150"
          >
            Искать самолеты
          </Link>
          <Link
            href="/flight-routes"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium border border-blue-300 text-white hover:bg-blue-300 hover:text-blue-700 dark:border-blue-400 dark:text-gray-100 dark:hover:bg-blue-400 dark:hover:text-blue-800 transition-colors duration-150"
          >
            Маршруты полетов
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default CallToActionSection;