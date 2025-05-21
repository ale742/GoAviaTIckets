import { FlightRoute, Airport, Airline } from '@/types/apiTypes';
import { FaPlaneDeparture, FaPlaneArrival, FaMapMarkerAlt, FaBuilding, FaBroadcastTower, FaInfoCircle, FaGlobeEurope, FaArrowsAltH } from 'react-icons/fa';

interface DetailItemProps {
  icon: React.ElementType;
  label: string;
  value: string | number | null | undefined;
  className?: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ icon: Icon, label, value, className = '' }) => {
  if (value === null || value === undefined || value === '') return null;
  return (
    <div className={`flex items-start text-sm mb-2 ${className}`}>
      <Icon className="w-4 h-4 mr-2 mt-0.5 text-blue-500 dark:text-blue-400 flex-shrink-0" />
      <span className="font-semibold text-gray-700 dark:text-gray-300 mr-1">{label}:</span>
      <span className="text-gray-600 dark:text-gray-400 break-words">{value}</span>
    </div>
  );
};

interface AirportInfoProps {
  airport: Airport;
  type: 'Origin' | 'Midpoint' | 'Destination';
}

const AirportInfo: React.FC<AirportInfoProps> = ({ airport, type }) => {
  const Icon = type === 'Origin' ? FaPlaneDeparture : FaPlaneArrival;
  const color = type === 'Origin' ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400';
  if (type === 'Midpoint' && !airport) return null;

  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700/50">
      <h4 className="font-semibold text-md mb-2 flex items-center">
        <Icon className={`mr-2 ${color}`} />
        {type === 'Origin' && 'Аэропорт вылета'}
        {type === 'Destination' && 'Аэропорт назначения'}
        {type === 'Midpoint' && 'Промежуточный аэропорт'}
      </h4>
      <DetailItem icon={FaBuilding} label="Название" value={airport.name} />
      <DetailItem icon={FaMapMarkerAlt} label="Город" value={airport.municipality} />
      <DetailItem icon={FaGlobeEurope} label="Страна" value={airport.country_name} />
      <DetailItem icon={FaInfoCircle} label="ICAO" value={airport.icao_code} />
      {airport.iata_code && <DetailItem icon={FaInfoCircle} label="IATA" value={airport.iata_code} />}
      <DetailItem icon={FaArrowsAltH} label="Координаты" value={`${airport.latitude?.toFixed(4)}, ${airport.longitude?.toFixed(4)}`} />
    </div>
  );
};


interface FlightRouteDetailsProps {
  route: FlightRoute;
}

const FlightRouteDetails: React.FC<FlightRouteDetailsProps> = ({ route }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-5 md:p-6">
      <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Маршрут: {route.callsign}
        </h2>
        {route.callsign_icao && <DetailItem icon={FaBroadcastTower} label="ICAO позывной" value={route.callsign_icao} className="text-md" />}
        {route.callsign_iata && <DetailItem icon={FaBroadcastTower} label="IATA позывной" value={route.callsign_iata} className="text-md" />}
      </div>

      {route.airline && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
          <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center">
            <FaBuilding className="mr-2" /> Авиакомпания
          </h3>
          <DetailItem label="Название" value={route.airline.name} icon={FaInfoCircle} />
          <DetailItem label="ICAO" value={route.airline.icao} icon={FaInfoCircle} />
          {route.airline.iata && <DetailItem label="IATA" value={route.airline.iata} icon={FaInfoCircle} />}
          <DetailItem label="Страна" value={route.airline.country} icon={FaGlobeEurope} />
          {route.airline.callsign && <DetailItem label="Позывной (а/к)" value={route.airline.callsign} icon={FaBroadcastTower} />}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AirportInfo airport={route.origin} type="Origin" />
        <AirportInfo airport={route.destination} type="Destination" />
      </div>

      {route.midpoint && (
        <div className="mt-6">
           <AirportInfo airport={route.midpoint} type="Midpoint" />
        </div>
      )}
    </div>
  );
};

export default FlightRouteDetails;