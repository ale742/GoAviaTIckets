import Link from 'next/link';
import { FaPlaneDeparture, FaPaperPlane } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10 text-center border-b border-gray-700">
          <Link href="/" className="inline-flex items-center mb-4">
            <FaPlaneDeparture className="h-8 w-8 mr-2 text-white" />
            <span className="text-2xl font-bold text-white">GoAviaTickets</span>
          </Link>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            Ваш надежный источник информации о самолетах, маршрутах и авиакомпаниях. Исследуйте мир авиации вместе с нами!
          </p>
        </div>

        <div className="py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Навигация</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-base hover:text-white transition-colors">Главная</Link></li>
              <li><Link href="/aircraft" className="text-base hover:text-white transition-colors">Самолеты</Link></li>
              <li><Link href="/flight-routes" className="text-base hover:text-white transition-colors">Маршруты</Link></li>
              <li><Link href="/airlines" className="text-base hover:text-white transition-colors">Авиакомпании</Link></li>
            </ul>
          </div>

          <div className="text-center">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Информация</h3>
            <ul className="space-y-3">
              <li><Link href="/help" className="text-base hover:text-white transition-colors">Справка</Link></li>
              <li><Link href="/about" className="text-base hover:text-white transition-colors">О нас</Link></li>
              <li><Link href="#" className="text-base hover:text-white transition-colors">Конфиденциальность</Link></li>
            </ul>
          </div>

          <div className="text-center">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Связь</h3>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-base hover:text-white transition-colors">Контакты</Link></li>
              <li><a href="mailto:info@goaviatickets.com" className="text-base hover:text-white transition-colors">GoAvia@Tickets.com</a></li>
              <li className="flex items-center justify-center pt-2">
                <FaPaperPlane className="mr-2 flex-shrink-0" />
                <span className="text-xs">Подпишитесь на новости (скоро)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-8 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400 mb-1">
            © {currentYear} GoAviaTickets. Все права защищены.
          </p>
          <p className="text-xs text-gray-500 mb-2">
            Разработано с Дидиченко Алексеем и Мусином Асланом.
          </p>
          <p className="text-xs text-gray-500">
            Данные предоставлены{' '}
            <a
              href="https://www.adsbdb.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-300 hover:text-white underline"
            >
              adsbdb.com
            </a>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;