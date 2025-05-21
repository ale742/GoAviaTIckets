'use client';
import { FaInfoCircle } from 'react-icons/fa';
import { useAppStore } from '@/store/appStore';
import SearchForm from '@/components/ui/search-form';
import AirlineCard from '@/components/layout/AirlineCard';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import ErrorMessage from '@/components/layout/ErrorMessage';

const AirlineSearchSection = () => {
  const {
    searchedAirlines,
    isSearchingAirlines,
    searchAirlinesError,
    currentAirlineQuery,
    searchAirlines,
  } = useAppStore();

  const handleSearch = (code: string) => {
    searchAirlines(code.toUpperCase());
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Поиск авиакомпаний
      </h1>

      <SearchForm
        onSearch={handleSearch}
        isLoading={isSearchingAirlines}
        placeholder="Введите ICAO или IATA код"
        label="Код авиакомпании (ICAO / IATA)"
        initialQuery={currentAirlineQuery}
      />

      {isSearchingAirlines && (
        <LoadingSpinner text="Идет поиск авиакомпаний..." className="my-10" />
      )}

      {searchAirlinesError && !isSearchingAirlines && (
        <ErrorMessage
          title="Ошибка поиска"
          message={searchAirlinesError}
          className="my-6"
        />
      )}

      {!isSearchingAirlines && !searchAirlinesError && searchedAirlines.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-4">
            Найдено авиакомпаний: {searchedAirlines.length}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {searchedAirlines.map((airline) => (
              <AirlineCard key={airline.icao + (airline.iata || '')} airline={airline} />
            ))}
          </div>
        </div>
      )}

      {!isSearchingAirlines && !searchAirlinesError && searchedAirlines.length === 0 && currentAirlineQuery && (
         <div className="mt-10 text-center p-6 bg-yellow-50 dark:bg-yellow-800/60 border border-yellow-300 dark:border-yellow-600 rounded-lg">
          <FaInfoCircle className="text-3xl text-yellow-600 dark:text-yellow-400 mx-auto mb-3" />
          <p className="text-gray-700 dark:text-gray-200">
            Авиакомпании по коду "{currentAirlineQuery}" не найдены. Попробуйте другой код.
          </p>
        </div>
      )}

      {!isSearchingAirlines && !searchAirlinesError && searchedAirlines.length === 0 && !currentAirlineQuery && (
        <div className="mt-10 text-center p-6 bg-blue-50 dark:bg-gray-700/50 border border-blue-200 dark:border-blue-600 rounded-lg">
          <FaInfoCircle className="text-3xl text-blue-500 dark:text-blue-400 mx-auto mb-3" />
          <p className="text-gray-700 dark:text-gray-300">
            Введите код ICAO (3 буквы, например, AFL, UAL) или IATA (2 символа, например, SU, UA) авиакомпании.
          </p>
        </div>
      )}
    </div>
  );
};

export default AirlineSearchSection;