import { create } from 'zustand';
import { getApiStatus, getAircraftByModeSReg } from '@/services/adsbApi';
import type { ApiStatus, Aircraft } from '@/types/apiTypes';

interface AppState {
  apiStatus: ApiStatus | null;
  isLoadingApiStatus: boolean;
  apiStatusError: string | null;
  fetchApiStatus: () => Promise<void>;

  searchedAircraft: Aircraft | null;
  isSearchingAircraft: boolean;
  searchAircraftError: string | null;
  currentSearchQuery: string;
  searchAircraft: (query: string) => Promise<void>;
  clearAircraftSearch: () => void;

  exampleAircrafts: Aircraft[];
  isLoadingExamples: boolean;
  examplesError: string | null;
  fetchExampleAircrafts: (ids: string[]) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  apiStatus: null,
  isLoadingApiStatus: false,
  apiStatusError: null,
  fetchApiStatus: async () => {
    if (get().isLoadingApiStatus) return;

    set({ isLoadingApiStatus: true, apiStatusError: null });
    try {
      const statusData = await getApiStatus();
      set({ apiStatus: statusData, isLoadingApiStatus: false });
    } catch (error: any) {
      console.error("Failed to fetch API status:", error);
      const errorMessage = error.response?.data?.message || error.message || 'Не удалось загрузить статус API.';
      set({ apiStatusError: errorMessage, isLoadingApiStatus: false, apiStatus: null });
    }
  },

  searchedAircraft: null,
  isSearchingAircraft: false,
  searchAircraftError: null,
  currentSearchQuery: '',
  searchAircraft: async (query: string) => {
    if (get().isSearchingAircraft) return;

    set({
      isSearchingAircraft: true,
      searchAircraftError: null,
      searchedAircraft: null,
      currentSearchQuery: query,
    });
    try {
      const aircraftData = await getAircraftByModeSReg(query);
      set({ searchedAircraft: aircraftData, isSearchingAircraft: false });
    } catch (error: any) {
      console.error(`Failed to search aircraft with query "${query}":`, error);
      let errorMessage = 'Не удалось найти самолет.';
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = `Самолет с идентификатором "${query}" не найден.`;
        } else if (error.response.data && typeof error.response.data.response === 'string') {
          errorMessage = error.response.data.response;
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      set({ searchAircraftError: errorMessage, isSearchingAircraft: false, searchedAircraft: null });
    }
  },
  clearAircraftSearch: () => {
    set({
      searchedAircraft: null,
      searchAircraftError: null,
      isSearchingAircraft: false,
    });
  },

  exampleAircrafts: [],
  isLoadingExamples: false,
  examplesError: null,
  fetchExampleAircrafts: async (ids: string[]) => {
    if (get().isLoadingExamples || ids.length === 0) return;
    set({ isLoadingExamples: true, examplesError: null, exampleAircrafts: [] });
    try {
      const aircraftPromises = ids.map(id =>
        getAircraftByModeSReg(id).catch(e => {
          console.warn(`Failed to fetch example aircraft ${id}:`, e.message || e);
          return null;
        })
      );
      const results = await Promise.all(aircraftPromises);
      const validAircrafts = results.filter(aircraft => aircraft !== null) as Aircraft[];

      set({ exampleAircrafts: validAircrafts, isLoadingExamples: false });
    } catch (error: any) {
      console.error("Failed to fetch example aircrafts (overall error):", error);
      set({ examplesError: 'Не удалось загрузить все примеры самолетов.', isLoadingExamples: false });
    }
  },
}));