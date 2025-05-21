'use client';
import { FaInfoCircle } from 'react-icons/fa';
import { useAppStore } from '@/store/appStore';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import ErrorMessage from '@/components/layout/ErrorMessage';
import AircraftCard from '@/components/layout/AircraftCard';
import SearchForm from '@/components/ui/search-form';

interface AircraftSearchSectionProps {
}

const AircraftSearchSection: React.FC<AircraftSearchSectionProps> = () => {
  const {
    searchedAircraft,
    isSearchingAircraft,
    searchAircraftError,
    currentSearchQuery,
    searchAircraft,
  } = useAppStore();

  const handleSearch = (query: string) => {
    searchAircraft(query);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Поиск информации о самолете
      </h1>

      <SearchForm
        onSearch={handleSearch}
        isLoading={isSearchingAircraft}
        placeholder="Введите Mode-S или регистрацию"
        label="Идентификатор самолета (Mode-S / Регистрация)"
        initialQuery={currentSearchQuery}
      />

      {isSearchingAircraft && (
        <LoadingSpinner text="Идет поиск самолета..." className="my-10" />
      )}

      {searchAircraftError && !isSearchingAircraft && (
        <ErrorMessage
          title="Ошибка поиска"
          message={searchAircraftError}
          className="my-6"
        />
      )}

      {searchedAircraft && !isSearchingAircraft && !searchAircraftError && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-4">
            Результат поиска:
          </h2>
          <AircraftCard aircraft={searchedAircraft} />
        </div>
      )}

      {!searchedAircraft && !isSearchingAircraft && !searchAircraftError && !currentSearchQuery && (
        <div className="mt-10 text-center p-6 bg-blue-50 dark:bg-gray-700/50 border border-blue-200 dark:border-blue-600 rounded-lg">
          <FaInfoCircle className="text-3xl text-blue-500 dark:text-blue-400 mx-auto mb-3" />
          <p className="text-gray-700 dark:text-gray-300">
            Введите регистрационный номер (например, N123AB, G-ABCD) или Mode-S код (например, A1B2C3) самолета для получения информации.
          </p>
        </div>
      )}
    </div>
  );
};

export default AircraftSearchSection;