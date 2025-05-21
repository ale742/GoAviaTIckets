import { create } from 'zustand';
import { getApiStatus, getAircraftByModeSReg, getFlightRouteByCallsign, } from '@/services/adsbApi';
import type { ApiStatus, Aircraft, FlightRoute,} from '@/types/apiTypes';

const MAX_RECENT_ROUTES = 5;
const RECENT_ROUTES_LS_KEY = 'goAviaTickets_recentRoutes';

const getFromLS = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  const stored = localStorage.getItem(key);
  try {
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error(`Error parsing LS item ${key}:`, error);
    return defaultValue;
  }
};

const saveToLS = <T>(key: string, value: T) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving LS item ${key}:`, error);
  }
};

const manageRecentListInLS = (key: string, newItem: string, maxSize: number): string[] => {
  if (typeof window === 'undefined') return [];
  let recents = getFromLS<string[]>(key, []);
  recents = recents.filter(r => r.toUpperCase() !== newItem.toUpperCase());
  recents.unshift(newItem.toUpperCase());
  if (recents.length > maxSize) {
    recents = recents.slice(0, maxSize);
  }
  saveToLS(key, recents);
  return recents;
};

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

  searchedFlightRoute: FlightRoute | null;
  isSearchingFlightRoute: boolean;
  searchFlightRouteError: string | null;
  currentFlightRouteQuery: string;
  searchFlightRoute: (callsign: string) => Promise<void>;
  clearFlightRouteSearch: () => void;

  recentFlightRoutes: FlightRoute[];
  isLoadingRecentRoutes: boolean;
  recentRoutesError: string | null;
  fetchRecentFlightRoutes: () => Promise<void>;
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
    const upperQuery = query.toUpperCase();
    set({
      isSearchingAircraft: true,
      searchAircraftError: null,
      searchedAircraft: null,
      currentSearchQuery: upperQuery,
    });
    try {
      const aircraftData = await getAircraftByModeSReg(upperQuery);
      set({ searchedAircraft: aircraftData, isSearchingAircraft: false });
    } catch (error: any) {
      console.error(`Failed to search aircraft with query "${upperQuery}":`, error);
      let errorMessage = 'Не удалось найти самолет.';
      if (error.response) {
        if (error.response.status === 404) {errorMessage = `Самолет с идентификатором "${upperQuery}" не найден.`;}
        else if (error.response.data?.response && typeof error.response.data.response === 'string') {errorMessage = error.response.data.response;}
        else if (error.response.data?.message) {errorMessage = error.response.data.message;}
      } else if (error.message) {errorMessage = error.message;}
      set({ searchAircraftError: errorMessage, isSearchingAircraft: false, searchedAircraft: null });
    }
  },
  clearAircraftSearch: () => {
    set({ searchedAircraft: null, searchAircraftError: null, isSearchingAircraft: false });
  },

  exampleAircrafts: [],
  isLoadingExamples: false,
  examplesError: null,
  fetchExampleAircrafts: async (ids: string[]) => {
    if (get().isLoadingExamples || ids.length === 0) return;
    set({ isLoadingExamples: true, examplesError: null, exampleAircrafts: [] });
    try {
      const aircraftPromises = ids.map(id => getAircraftByModeSReg(id).catch(e => {
        console.warn(`Failed to fetch example aircraft ${id}:`, e.message || e); return null;
      }));
      const results = await Promise.all(aircraftPromises);
      const validAircrafts = results.filter(ac => ac !== null) as Aircraft[];
      set({ exampleAircrafts: validAircrafts, isLoadingExamples: false });
    } catch (error: any) {
      console.error("Failed to fetch example aircrafts:", error);
      set({ examplesError: 'Не удалось загрузить примеры самолетов.', isLoadingExamples: false });
    }
  },

  searchedFlightRoute: null,
  isSearchingFlightRoute: false,
  searchFlightRouteError: null,
  currentFlightRouteQuery: '',
  searchFlightRoute: async (callsign: string) => {
    if (get().isSearchingFlightRoute) return;
    const upperCallsign = callsign.toUpperCase();
    set({
      isSearchingFlightRoute: true,
      searchFlightRouteError: null,
      searchedFlightRoute: null,
      currentFlightRouteQuery: upperCallsign,
    });
    try {
      const routeData = await getFlightRouteByCallsign(upperCallsign);
      set({ searchedFlightRoute: routeData, isSearchingFlightRoute: false });
      manageRecentListInLS(RECENT_ROUTES_LS_KEY, upperCallsign, MAX_RECENT_ROUTES);
      get().fetchRecentFlightRoutes();
    } catch (error: any) {
      console.error(`Failed to search flight route with callsign "${upperCallsign}":`, error);
      let errorMessage = 'Не удалось найти маршрут.';
      if (error.response) {
        if (error.response.status === 404) {errorMessage = `Маршрут с позывным "${upperCallsign}" не найден.`;}
        else if (error.response.data?.response && typeof error.response.data.response === 'string') {errorMessage = error.response.data.response;}
        else if (error.response.data?.message) {errorMessage = error.response.data.message;}
      } else if (error.message) {errorMessage = error.message;}
      set({ searchFlightRouteError: errorMessage, isSearchingFlightRoute: false, searchedFlightRoute: null });
    }
  },
  clearFlightRouteSearch: () => {
    set({ searchedFlightRoute: null, searchFlightRouteError: null, currentFlightRouteQuery: '', isSearchingFlightRoute: false });
  },

  recentFlightRoutes: [],
  isLoadingRecentRoutes: false,
  recentRoutesError: null,
  fetchRecentFlightRoutes: async () => {
    const recentCallsigns = getFromLS<string[]>(RECENT_ROUTES_LS_KEY, []);
    if (recentCallsigns.length === 0) {
      set({ recentFlightRoutes: [], isLoadingRecentRoutes: false }); return;
    }
    if (get().isLoadingRecentRoutes) return;
    set({ isLoadingRecentRoutes: true, recentRoutesError: null, recentFlightRoutes: [] });
    try {
      const routePromises = recentCallsigns.map(cs => getFlightRouteByCallsign(cs).catch(e => {
        console.warn(`Failed to fetch recent route ${cs}:`, e.message || e); return null;
      }));
      const results = await Promise.all(routePromises);
      const validRoutes = results.filter(r => r !== null) as FlightRoute[];
      set({ recentFlightRoutes: validRoutes, isLoadingRecentRoutes: false });
    } catch (error: any) {
      console.error("Failed to fetch recent flight routes:", error);
      set({ recentRoutesError: 'Не удалось загрузить недавние маршруты.', isLoadingRecentRoutes: false });
    }
  },
}));