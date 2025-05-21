'use client';
import { useEffect } from 'react';
import { FaPlane } from 'react-icons/fa';
import { useAppStore } from '@/store/appStore';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import ErrorMessage from '@/components/layout/ErrorMessage';
import AircraftCard from '@/components/layout/AircraftCard';

interface ExampleAircraftsSectionProps {
  exampleIds: string[];
}

const ExampleAircraftsSection: React.FC<ExampleAircraftsSectionProps> = ({ exampleIds }) => {
  const {
    exampleAircrafts,
    isLoadingExamples,
    examplesError,
    fetchExampleAircrafts,
  } = useAppStore();

  useEffect(() => {
    if (exampleAircrafts.length === 0 && !isLoadingExamples && exampleIds.length > 0) {
      fetchExampleAircrafts(exampleIds);
    }
  }, [fetchExampleAircrafts, exampleAircrafts.length, isLoadingExamples, exampleIds]);

  return (
    <div className="mt-16 pt-10 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        <FaPlane className="inline-block mr-2 mb-1" />
        Примеры самолетов
      </h2>

      {isLoadingExamples && (
        <LoadingSpinner text="Загрузка примеров..." className="my-8" />
      )}

      {examplesError && !isLoadingExamples && (
        <ErrorMessage
          title="Ошибка загрузки примеров"
          message={examplesError}
          className="my-6 max-w-xl mx-auto"
        />
      )}

      {!isLoadingExamples && !examplesError && exampleAircrafts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {exampleAircrafts.map((aircraft) => (
            <AircraftCard key={aircraft.mode_s || aircraft.registration} aircraft={aircraft} />
          ))}
        </div>
      )}

      {!isLoadingExamples && !examplesError && exampleAircrafts.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Примеры самолетов не найдены или не удалось загрузить.
        </p>
      )}
    </div>
  );
};

export default ExampleAircraftsSection;