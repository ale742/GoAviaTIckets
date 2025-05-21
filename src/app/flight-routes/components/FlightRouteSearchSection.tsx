'use client';

import { FaInfoCircle } from 'react-icons/fa';
import { useAppStore } from '@/store/appStore';
import SearchForm from '@/components/ui/search-form';
import FlightRouteDetails from '@/components/layout/FlightRouteDetails';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import ErrorMessage from '@/components/layout/ErrorMessage';


const FlightRouteSearchSection = () => {
  const {
    searchedFlightRoute,
    isSearchingFlightRoute,
    searchFlightRouteError,
    currentFlightRouteQuery,
    searchFlightRoute,
  } = useAppStore();

  const handleSearch = (callsign: string) => {
    searchFlightRoute(callsign.toUpperCase());
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Поиск информации о маршруте полета
      </h1>
      <SearchForm
        onSearch={handleSearch}
        isLoading={isSearchingFlightRoute}
        placeholder="Введите позывной рейса (Callsign)"
        label="Позывной рейса"
        initialQuery={currentFlightRouteQuery}
      />
      {isSearchingFlightRoute && (
        <LoadingSpinner text="Идет поиск маршрута..." className="my-10" />
      )}
      {searchFlightRouteError && !isSearchingFlightRoute && (
        <ErrorMessage
          title="Ошибка поиска маршрута"
          message={searchFlightRouteError}
          className="my-6"
        />
      )}
      {searchedFlightRoute && !isSearchingFlightRoute && !searchFlightRouteError && (
        <div className="mt-10">
          <FlightRouteDetails route={searchedFlightRoute} />
        </div>
      )}
      {!searchedFlightRoute && !isSearchingFlightRoute && !searchFlightRouteError && !currentFlightRouteQuery && (
        <div className="mt-10 text-center p-6 bg-blue-50 dark:bg-gray-700/50 border border-blue-200 dark:border-blue-600 rounded-lg">
          <FaInfoCircle className="text-3xl text-blue-500 dark:text-blue-400 mx-auto mb-3" />
          <p className="text-gray-700 dark:text-gray-300">
            Введите позывной рейса (например, AFL201, UAL123, BAW245) для получения информации о маршруте.
          </p>
        </div>
      )}
    </div>
  );
};

export default FlightRouteSearchSection;