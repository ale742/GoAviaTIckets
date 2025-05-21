import Container from '@/components/layout/Container';
import Link from 'next/link';
import { FaSearch, FaPlane, FaRoute, FaBuilding, FaInfoCircle, FaHistory, FaQuestionCircle, FaListAlt } from 'react-icons/fa';

interface HelpSectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

const HelpSection: React.FC<HelpSectionProps> = ({ title, icon: Icon, children }) => (
  <section className="mb-10 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
    <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4 flex items-center">
      <Icon className="mr-3 text-3xl" />
      {title}
    </h2>
    <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
      {children}
    </div>
  </section>
);

export default function HelpPage() {
  return (
    <Container className="py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <FaQuestionCircle className="text-6xl text-blue-500 dark:text-blue-400 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
            Справочник пользователя
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Как пользоваться сайтом GoAviaTickets для поиска авиационной информации.
          </p>
        </header>

        <HelpSection title="Поиск самолетов" icon={FaPlane}>
          <p>
            На странице <Link href="/aircraft" className="text-blue-600 hover:underline dark:text-blue-400">"Самолеты"</Link> вы можете найти подробную информацию о конкретном воздушном судне.
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <strong>Что вводить:</strong> Введите регистрационный номер самолета (например, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">N123AB</code>, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">G-ABCD</code>) или его уникальный Mode-S код (6-значный шестнадцатеричный код, например, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">A1B2C3</code>). Регистр ввода не имеет значения.
            </li>
            <li>
              <strong>Результат:</strong> Вы увидите карточку с типом самолета, производителем, владельцем, страной регистрации и, если доступно, фотографией.
            </li>
          </ul>
          <p className="mt-2">
            Внизу страницы также отображаются карточки с примерами самолетов для быстрого ознакомления.
          </p>
        </HelpSection>

        <HelpSection title="Поиск маршрутов полетов" icon={FaRoute}>
          <p>
            Перейдите на страницу <Link href="/flight-routes" className="text-blue-600 hover:underline dark:text-blue-400">"Маршруты"</Link> для получения информации о маршрутах полетов.
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <strong>Что вводить:</strong> Укажите позывной рейса (Callsign). Позывные обычно состоят из кода авиакомпании (ICAO или IATA) и номера рейса (например, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">AFL201</code>, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">SWA2399</code>, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">BAW245</code>).
            </li>
            <li>
              <strong>Результат:</strong> Вы получите информацию об аэропортах вылета и назначения, авиакомпании, выполняющей рейс, и, возможно, промежуточных точках.
            </li>
          </ul>
        </HelpSection>

        <HelpSection title="Поиск авиакомпаний" icon={FaBuilding}>
          <p>
            На странице <Link href="/airlines" className="text-blue-600 hover:underline dark:text-blue-400">"Авиакомпании"</Link> вы можете найти информацию об авиаперевозчиках.
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <strong>Что вводить:</strong> Введите код авиакомпании ICAO (3 буквы, например, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">AFL</code>, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">UAL</code>) или IATA (2 символа, например, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">SU</code>, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">UA</code>).
            </li>
            <li>
              <strong>Результат:</strong> Отобразится список авиакомпаний, соответствующих коду, с их названием, страной и другими доступными данными.
            </li>
          </ul>
        </HelpSection>

        <HelpSection title="Секции 'Недавние ...'" icon={FaHistory}>
          <p>
            На страницах поиска маршрутов и авиакомпаний вы найдете секцию "Недавние...".
            В ней отображаются последние 3-5 успешно найденных вами элементов (маршрутов или авиакомпаний по коду запроса).
          </p>
          <p>
            Это помогает быстро вернуться к предыдущим поискам. Данные о недавних поисках хранятся локально в вашем браузере.
          </p>
        </HelpSection>

        <HelpSection title="Источник данных" icon={FaInfoCircle}>
          <p>
            Вся информация на сайте GoAviaTickets предоставляется с использованием публичного API от <a href="https://www.adsbdb.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">adsbdb.com</a>.
          </p>
        </HelpSection>

         <div className="mt-12 text-center">
            <Link href="/" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <FaSearch className="mr-2 -ml-1 h-5 w-5" />
                Начать поиск
            </Link>
        </div>

      </div>
    </Container>
  );
}

