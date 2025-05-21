import Container from '@/components/layout/Container';
import { FaPlane, FaGlobeAmericas, FaBolt, FaUsers } from 'react-icons/fa';

const features = [
  {
    icon: FaPlane,
    title: 'Всё о самолетах',
    description: 'Подробные характеристики, история и сведения о владельцах воздушных судов.',
  },
  {
    icon: FaGlobeAmericas,
    title: 'Мировое покрытие',
    description: 'Актуальная информация о рейсах и авиакомпаниях из разных уголков планеты.',
  },
  {
    icon: FaBolt,
    title: 'Быстрый результат',
    description: 'Получайте нужные данные мгновенно благодаря нашей оптимизированной системе.',
  },
  {
    icon: FaUsers,
    title: 'Для всех энтузиастов',
    description: 'Идеальный ресурс для споттеров, исследователей и всех, кто увлечен авиацией.',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-900">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Ключевые возможности
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Узнайте, почему GoAviaTickets - ваш лучший выбор для авиационной информации.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center w-12 h-12 mb-5 rounded-md bg-blue-600 dark:bg-blue-500 text-white">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturesSection;