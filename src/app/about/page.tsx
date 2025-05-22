import Container from '@/components/layout/Container';
import Link from 'next/link';
import Image from 'next/image';
import { FaPlaneDeparture, FaUsers, FaLightbulb, FaCode, FaHeart } from 'react-icons/fa';

interface AboutSectionProps {
  title: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ title, icon: Icon, children, className = '' }) => (
  <section className={`mb-10 md:mb-12 ${className}`}>
    <div className="flex items-center mb-4">
      {Icon && <Icon className="text-3xl text-blue-500 dark:text-blue-400 mr-3 flex-shrink-0" />}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white">
        {title}
      </h2>
    </div>
    <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
      {}
      {children}
    </div>
  </section>
);

export default function AboutPage() {
  return (
    <Container className="py-8 md:py-16">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12 md:mb-16">
          <FaUsers className="text-6xl text-blue-500 dark:text-blue-400 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
            О проекте GoAviaTickets
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Узнайте больше о нашей миссии, команде и технологиях, стоящих за этим сайтом.
          </p>
        </header>

        <AboutSection title="Кто мы?" icon={FaPlaneDeparture}>
          <p>
            <strong>GoAviaTickets</strong> — это веб-приложение, созданное энтузиастами авиации для таких же увлеченных людей, а также для всех, кто интересуется миром самолетов, авиакомпаний и маршрутов полетов. Мы стремимся предоставить удобный и быстрый доступ к обширной авиационной информации.
          </p>
          <p>
            Наш проект родился из желания сделать сложные авиационные данные более доступными и понятными для широкой аудитории.
          </p>
        </AboutSection>

        <AboutSection title="Наша миссия" icon={FaLightbulb}>
          <p>
            Мы верим, что информация должна быть открытой. Наша главная цель — предоставить пользователям простой и интуитивно понятный инструмент для поиска и изучения данных о:
          </p>
          <ul>
            <li>Конкретных самолетах по их регистрационным номерам или Mode-S кодам.</li>
            <li>Маршрутах полетов по позывным рейсов.</li>
            <li>Авиакомпаниях по их кодам ICAO или IATA.</li>
          </ul>
          <p>
            Мы хотим, чтобы каждый, от профессионала авиационной отрасли до простого любознательного человека, мог легко найти интересующие его сведения.
          </p>
        </AboutSection>

        <AboutSection title="Команда" icon={FaUsers}>
          <p>
            Проект GoAviaTickets был разработан командой из двух человек:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">Дидиченко Алексей</h3>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">Мусин Аслан</h3>
            </div>
          </div>
        </AboutSection>

        <div className="mt-16 text-center border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-3">
            Спасибо, что пользуетесь GoAviaTickets!
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaPlaneDeparture className="mr-2" />
            Вернуться на главную
          </Link>
        </div>
      </div>
    </Container>
  );
}

