import { Airline } from '@/types/apiTypes';
import { FaBuilding, FaPlane, FaGlobeEurope, FaTag, FaInfoCircle } from 'react-icons/fa';

interface AirlineCardProps {
  airline: Airline;
}

const DetailItem: React.FC<{ icon: React.ElementType; label: string; value: string | null | undefined }> = ({
  icon: Icon,
  label,
  value,
}) => {
  if (!value) return null;
  return (
    <div className="flex items-center text-sm mb-1.5">
      <Icon className="w-4 h-4 mr-2 text-blue-500 dark:text-blue-400 flex-shrink-0" />
      <span className="font-semibold text-gray-600 dark:text-gray-300 mr-1">{label}:</span>
      <span className="text-gray-700 dark:text-gray-200">{value}</span>
    </div>
  );
};

const AirlineCard: React.FC<AirlineCardProps> = ({ airline }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center mb-3">
        <FaBuilding className="text-3xl text-blue-600 dark:text-blue-400 mr-3" />
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {airline.name}
          </h2>
          {airline.callsign && (
             <p className="text-xs text-gray-500 dark:text-gray-400">Позывной: {airline.callsign}</p>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <DetailItem icon={FaTag} label="ICAO" value={airline.icao} />
        {airline.iata && <DetailItem icon={FaTag} label="IATA" value={airline.iata} />}
        <DetailItem icon={FaGlobeEurope} label="Страна" value={`${airline.country} (${airline.country_iso})`} />
      </div>
    </div>
  );
};

export default AirlineCard;