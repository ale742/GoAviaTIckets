import Link from 'next/link';
import { FaPlaneDeparture } from 'react-icons/fa';

export const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 text-2xl font-bold">
          <FaPlaneDeparture size={30} />
          <span>GoAviaTickets</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-blue-200 transition-colors">
                Главная
              </Link>
            </li>
            <li>
              <Link href="/aircraft" className="hover:text-blue-200 transition-colors">
                Самолеты
              </Link>
            </li>
            <li>
              <Link href="/flight-routes" className="hover:text-blue-200 transition-colors">
                Маршруты
              </Link>
            </li>
            <li>
              <Link href="/airlines" className="hover:text-blue-200 transition-colors">
                Авиакомпании
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;