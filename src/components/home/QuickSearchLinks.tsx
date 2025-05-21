import Link from 'next/link';
import { FaPlaneDeparture, FaBuilding, FaRoute, FaBroadcastTower } from 'react-icons/fa';
import Container from '../layout/Container';

const linkItems = [
  { href: '/aircraft', icon: FaPlaneDeparture, title: 'Поиск самолетов', description: 'Найдите информацию по бортовому номеру или Mode-S.' },
  { href: '/airlines', icon: FaBuilding, title: 'Каталог авиакомпаний', description: 'Просмотрите авиакомпании по их кодам ICAO/IATA.' },
  { href: '/flight-routes', icon: FaRoute, title: 'Информация о маршрутах', description: 'Узнайте детали полета по позывному.' },
  { href: '/api-status', icon: FaBroadcastTower, title: 'Справочник аэропортов', description: 'Информация об аэропортах по кодам.' },
];

const QuickSearchLinks = () => {
  return (
    <div className="py-12 md:py-20 bg-gray-50 dark:bg-gray-800">
      <Container>
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10 md:mb-16">
          Основные разделы
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {linkItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group block p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default QuickSearchLinks;