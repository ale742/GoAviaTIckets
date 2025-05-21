'use client';
import { useEffect } from 'react';
import { FaHistory } from 'react-icons/fa';
import { useAppStore } from '@/store/appStore';
import FlightRouteDetails from '@/components/layout/FlightRouteDetails';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import ErrorMessage from '@/components/layout/ErrorMessage';

const RecentFlightRoutesSection = () => {
  const {
    recentFlightRoutes,
    isLoadingRecentRoutes,
    recentRoutesError,
    fetchRecentFlightRoutes,
  } = useAppStore();

  useEffect(() => {
    if (recentFlightRoutes.length === 0 && !isLoadingRecentRoutes) {
        fetchRecentFlightRoutes();
    }
  }, [fetchRecentFlightRoutes, recentFlightRoutes.length, isLoadingRecentRoutes]);

  return (
    <div className="mt-16 pt-10 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        <FaHistory className="inline-block mr-2 mb-1" /> Недавние маршруты
      </h2>
      {isLoadingRecentRoutes && (
        <LoadingSpinner text="Загрузка недавних маршрутов..." className="my-8" />
      )}
      {recentRoutesError && !isLoadingRecentRoutes && (
        <ErrorMessage
          title="Ошибка загрузки недавних маршрутов"
          message={recentRoutesError}
          className="my-6 max-w-xl mx-auto"
        />
      )}
      {!isLoadingRecentRoutes && !recentRoutesError && recentFlightRoutes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {recentFlightRoutes.map((route) => (
            <FlightRouteDetails key={route.callsign} route={route} />
          ))}
        </div>
      )}
      {!isLoadingRecentRoutes && !recentRoutesError && recentFlightRoutes.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Вы еще не искали маршруты. Ваши недавние поиски появятся здесь.
        </p>
      )}
    </div>
  );
};

export default RecentFlightRoutesSection;