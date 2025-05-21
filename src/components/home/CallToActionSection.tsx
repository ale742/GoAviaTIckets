import Container from '@/components/layout/Container';
import { FaPaperPlane } from 'react-icons/fa';
import { Button } from '../ui/button';

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
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button
            className="bg-white text-blue-700 hover:bg-gray-100 shadow-lg"
          >
            Искать самолеты
          </Button>
          <Button
            className="bg-transparent border border-white text-white hover:bg-white hover:text-blue-700 shadow-lg"
          >
            Маршруты полетов
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default CallToActionSection;