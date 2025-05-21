'use client';
import { useEffect } from 'react';
import { FaHistory } from 'react-icons/fa';
import { useAppStore } from '@/store/appStore';
import AirlineCard from '@/components/layout/AirlineCard';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import ErrorMessage from '@/components/layout/ErrorMessage';
import { Airline } from '@/types/apiTypes';

const RecentAirlinesSection = () => {
  const {
    recentAirlines,
    isLoadingRecentAirlines,
    recentAirlinesError,
    fetchRecentAirlines,
  } = useAppStore();

  useEffect(() => {
    if (recentAirlines.length === 0 && !isLoadingRecentAirlines) {
        fetchRecentAirlines();
    }
  }, [fetchRecentAirlines, recentAirlines.length, isLoadingRecentAirlines]);

  const getUniqueAirlines = (groupedAirlines: Airline[][]): Airline[] => {
    const flatList = groupedAirlines.flat();
    const uniqueMap = new Map<string, Airline>();
    flatList.forEach(airline => {
      if (!uniqueMap.has(airline.icao)) {
        uniqueMap.set(airline.icao, airline);
      }
    });
    return Array.from(uniqueMap.values());
  };

  const displayAirlines = getUniqueAirlines(recentAirlines);

  return (
    <div className="mt-16 pt-10 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        <FaHistory className="inline-block mr-2 mb-1" />
        Недавно просмотренные авиакомпании
      </h2>

      {isLoadingRecentAirlines && (
        <LoadingSpinner text="Загрузка недавних авиакомпаний..." className="my-8" />
      )}

      {recentAirlinesError && !isLoadingRecentAirlines && (
        <ErrorMessage
          title="Ошибка загрузки"
          message={recentAirlinesError}
          className="my-6 max-w-xl mx-auto"
        />
      )}

      {!isLoadingRecentAirlines && !recentAirlinesError && displayAirlines.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayAirlines.map((airline) => (
            <AirlineCard key={airline.icao + (airline.iata || '')} airline={airline} />
          ))}
        </div>
      )}

      {!isLoadingRecentAirlines && !recentAirlinesError && displayAirlines.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Вы еще не искали авиакомпании. Ваши недавние поиски появятся здесь.
        </p>
      )}
    </div>
  );
};

export default RecentAirlinesSection;