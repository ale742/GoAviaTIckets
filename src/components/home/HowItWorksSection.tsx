import Container from '@/components/layout/Container';
import { FaSearch, FaListAlt, FaInfoCircle } from 'react-icons/fa';

const steps = [
  {
    icon: FaSearch,
    title: 'Простой Поиск',
    description: 'Легко находите информацию о самолетах, авиакомпаниях или рейсах, используя удобные формы поиска.',
  },
  {
    icon: FaListAlt,
    title: 'Обширные Данные',
    description: 'Получите доступ к актуальной информации о тысячах воздушных судов, перевозчиков и маршрутов по всему миру.',
  },
  {
    icon: FaInfoCircle,
    title: 'Детальные Сведения',
    description: 'Узнавайте характеристики самолетов, детали маршрутов, информацию об авиакомпаниях и многое другое в одном месте.',
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-800/50">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Как найти нужную информацию?
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Всего несколько простых шагов для доступа к миру авиационных данных.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-700/60 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HowItWorksSection;