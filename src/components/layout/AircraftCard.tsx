import { Aircraft } from '@/types/apiTypes';
import Image from 'next/image';
import { FaPlane, FaFlag, FaBuilding, FaUserCog, FaCalendarAlt, FaTag } from 'react-icons/fa';

interface AircraftCardProps {
  aircraft: Aircraft;
}

const DetailItem: React.FC<{ icon: React.ElementType; label: string; value: string | null | undefined }> = ({
  icon: Icon,
  label,
  value,
}) => {
  if (!value) return null;
  return (
    <div className="flex items-start text-sm mb-2">
      <Icon className="w-4 h-4 mr-2 mt-0.5 text-blue-500 dark:text-blue-400 flex-shrink-0" />
      <span className="font-semibold text-gray-700 dark:text-gray-300 mr-1">{label}:</span>
      <span className="text-gray-600 dark:text-gray-400 break-all">{value}</span>
    </div>
  );
};

const AircraftCard: React.FC<AircraftCardProps> = ({ aircraft }) => {
  const placeholderImage = "https://dav.kz/wp-content/uploads/woocommerce-placeholder.png";

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
      <div className="relative h-48 sm:h-56 w-full bg-gray-200 dark:bg-gray-700">
        {aircraft.url_photo || aircraft.url_photo_thumbnail ? (
          <Image
            src={aircraft.url_photo || aircraft.url_photo_thumbnail || placeholderImage}
            alt={`Фото ${aircraft.manufacturer} ${aircraft.type}`}
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <Image
            src={placeholderImage}
            alt="Фото самолета отсутствует"
            layout="fill"
            objectFit="contain"
            className="p-4"
          />
        )}
         {aircraft.registered_owner_operator_flag_code && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 p-1 rounded">
            <span className="text-white text-xs font-bold drop-shadow-sm">
              {aircraft.registered_owner_operator_flag_code}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 md:p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          {aircraft.registration}
        </h2>
        <p className="text-md text-blue-600 dark:text-blue-400 font-medium mb-4">
          {aircraft.manufacturer} {aircraft.type}
        </p>

        <div className="space-y-3">
          <DetailItem icon={FaTag} label="ICAO тип" value={aircraft.icao_type} />
          <DetailItem icon={FaPlane} label="Mode-S" value={aircraft.mode_s} />
          <DetailItem icon={FaBuilding} label="Владелец" value={aircraft.registered_owner} />
          <DetailItem icon={FaFlag} label="Страна регистрации" value={aircraft.registered_owner_country_name} />
        </div>
      </div>
    </div>
  );
};

export default AircraftCard;