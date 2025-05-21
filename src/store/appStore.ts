import { create, StoreApi } from 'zustand';
import { getApiStatus, getAircraftByModeSReg, getFlightRouteByCallsign, getAirlineByCode, } from '@/services/adsbApi';
import type { ApiStatus, Aircraft, FlightRoute, Airline, } from '@/types/apiTypes';

const MAX_RECENT_ROUTES = 5;
const RECENT_ROUTES_LS_KEY = 'goAviaTickets_recentRoutes';
const MAX_RECENT_AIRLINES = 3;
const RECENT_AIRLINES_LS_KEY = 'goAviaTickets_recentAirlines';

const ls = {
  get: <T>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue;
    const stored = localStorage.getItem(key);
    try { return stored ? JSON.parse(stored) : defaultValue; }
    catch (error) { console.error(`LS_GET_ERROR [${key}]:`, error); return defaultValue; }
  },
  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return;
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch (error) { console.error(`LS_SET_ERROR [${key}]:`, error); }
  },
  manageRecentList: (key: string, newItem: string, maxSize: number): string[] => {
    if (typeof window === 'undefined') return [];
    let recents = ls.get<string[]>(key, []);
    const upperNewItem = newItem.toUpperCase();
    recents = recents.filter(r => r.toUpperCase() !== upperNewItem);
    recents.unshift(upperNewItem);
    if (recents.length > maxSize) { recents = recents.slice(0, maxSize); }
    ls.set(key, recents);
    return recents;
  },
};

const getErrorMessage = (error: any, defaultMessage: string, queryInfo?: string): string => {
  if (error.response) {
    if (error.response.status === 404) return `${queryInfo || "Запрашиваемый ресурс"} не найден.`;
    if (error.response.data?.response && typeof error.response.data.response === 'string') return error.response.data.response;
    if (error.response.data?.message) return error.response.data.message;
  }
  return error.message || defaultMessage;
};

type ZustandSet<T> = StoreApi<T>['setState'];
type ZustandGet<T> = StoreApi<T>['getState'];


async function handleAsyncFetch<TData>(
  set: ZustandSet<AppState>,
  get: ZustandGet<AppState>,
  loadingFlag: keyof Pick<AppState, 'isLoadingApiStatus' | 'isSearchingAircraft' | 'isLoadingExamples' | 'isSearchingFlightRoute' | 'isLoadingRecentRoutes' | 'isSearchingAirlines' | 'isLoadingRecentAirlines'>,
  errorFlag: keyof Pick<AppState, 'apiStatusError' | 'searchAircraftError' | 'examplesError' | 'searchFlightRouteError' | 'recentRoutesError' | 'searchAirlinesError' | 'recentAirlinesError'>,
  dataField: keyof Pick<AppState, 'apiStatus' | 'searchedAircraft' | 'exampleAircrafts' | 'searchedFlightRoute' | 'recentFlightRoutes' | 'searchedAirlines' | 'recentAirlines'>,
  apiCall: () => Promise<TData>,
  options?: {
    defaultErrorMessage?: string;
    queryInfoForError?: string;
    onSuccess?: (data: TData) => void;
    onStart?: () => Partial<AppState>;
    isArrayData?: boolean;
  }
) {
  if (get()[loadingFlag]) return;

  const startStateUpdate: Partial<AppState> = {
    [loadingFlag]: true,
    [errorFlag]: null,
    ...(dataField !== 'exampleAircrafts' && dataField !== 'recentFlightRoutes' && dataField !== 'recentAirlines' && { [dataField]: options?.isArrayData ? [] : null }),
    ...(options?.onStart ? options.onStart() : {}),
  };
  set(startStateUpdate as Partial<AppState>);

  try {
    const data = await apiCall();
    set({ [loadingFlag]: false, [dataField]: data } as Partial<AppState>);
    options?.onSuccess?.(data);
  } catch (error: any) {
    const defaultMsg = options?.defaultErrorMessage || 'Произошла ошибка.';
    console.error(`ASYNC_FETCH_ERROR [${String(dataField)}]:`, error);
    set({
      [loadingFlag]: false,
      [errorFlag]: getErrorMessage(error, defaultMsg, options?.queryInfoForError),
      [dataField]: options?.isArrayData ? [] : null,
    } as Partial<AppState>);
  }
}


export interface AppState {
  apiStatus: ApiStatus | null; isLoadingApiStatus: boolean; apiStatusError: string | null;
  fetchApiStatus: () => Promise<void>;

  searchedAircraft: Aircraft | null; isSearchingAircraft: boolean; searchAircraftError: string | null; currentSearchQuery: string;
  searchAircraft: (query: string) => Promise<void>; clearAircraftSearch: () => void;

  exampleAircrafts: Aircraft[]; isLoadingExamples: boolean; examplesError: string | null;
  fetchExampleAircrafts: (ids: string[]) => Promise<void>;

  searchedFlightRoute: FlightRoute | null; isSearchingFlightRoute: boolean; searchFlightRouteError: string | null; currentFlightRouteQuery: string;
  searchFlightRoute: (callsign: string) => Promise<void>; clearFlightRouteSearch: () => void;

  recentFlightRoutes: FlightRoute[]; isLoadingRecentRoutes: boolean; recentRoutesError: string | null;
  fetchRecentFlightRoutes: () => Promise<void>;

  searchedAirlines: Airline[]; isSearchingAirlines: boolean; searchAirlinesError: string | null; currentAirlineQuery: string;
  searchAirlines: (code: string) => Promise<void>; clearAirlinesSearch: () => void;

  recentAirlines: Airline[][]; isLoadingRecentAirlines: boolean; recentAirlinesError: string | null;
  fetchRecentAirlines: () => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  apiStatus: null, isLoadingApiStatus: false, apiStatusError: null,
  fetchApiStatus: () => handleAsyncFetch(set, get, 'isLoadingApiStatus', 'apiStatusError', 'apiStatus', getApiStatus, { defaultErrorMessage: 'Не удалось загрузить статус API.' }),

  searchedAircraft: null, isSearchingAircraft: false, searchAircraftError: null, currentSearchQuery: '',
  searchAircraft: (query: string) => {
    const upperQuery = query.toUpperCase();
    return handleAsyncFetch(set, get, 'isSearchingAircraft', 'searchAircraftError', 'searchedAircraft', () => getAircraftByModeSReg(upperQuery), {
        defaultErrorMessage: 'Не удалось найти самолет.', queryInfoForError: `Самолет "${upperQuery}"`, onStart: () => ({ currentSearchQuery: upperQuery }),
    });
  },
  clearAircraftSearch: () => set({ searchedAircraft: null, searchAircraftError: null, isSearchingAircraft: false, currentSearchQuery: '' }),

  exampleAircrafts: [], isLoadingExamples: false, examplesError: null,
  fetchExampleAircrafts: async (ids: string[]) => {
    if (get().isLoadingExamples || ids.length === 0) return;
    set({ isLoadingExamples: true, examplesError: null, exampleAircrafts: [] });
    try {
      const results = await Promise.all(ids.map(id => getAircraftByModeSReg(id).catch(e => { console.warn(`Example aircraft ${id} fetch error:`, e.message || e); return null; })));
      set({ exampleAircrafts: results.filter(Boolean) as Aircraft[], isLoadingExamples: false });
    } catch (error) { console.error("Fetch examples error:", error); set({ examplesError: 'Не удалось загрузить примеры.', isLoadingExamples: false }); }
  },

  searchedFlightRoute: null, isSearchingFlightRoute: false, searchFlightRouteError: null, currentFlightRouteQuery: '',
  searchFlightRoute: (callsign: string) => {
    const upperCallsign = callsign.toUpperCase();
    return handleAsyncFetch(set, get, 'isSearchingFlightRoute', 'searchFlightRouteError', 'searchedFlightRoute', () => getFlightRouteByCallsign(upperCallsign), {
        defaultErrorMessage: 'Не удалось найти маршрут.', queryInfoForError: `Маршрут "${upperCallsign}"`, onStart: () => ({ currentFlightRouteQuery: upperCallsign }),
        onSuccess: () => { ls.manageRecentList(RECENT_ROUTES_LS_KEY, upperCallsign, MAX_RECENT_ROUTES); get().fetchRecentFlightRoutes(); },
    });
  },
  clearFlightRouteSearch: () => set({ searchedFlightRoute: null, searchFlightRouteError: null, currentFlightRouteQuery: '', isSearchingFlightRoute: false }),

  recentFlightRoutes: [], isLoadingRecentRoutes: false, recentRoutesError: null,
  fetchRecentFlightRoutes: async () => {
    const recentCallsigns = ls.get<string[]>(RECENT_ROUTES_LS_KEY, []);
    if (recentCallsigns.length === 0) { set({ recentFlightRoutes: [], isLoadingRecentRoutes: false }); return; }
    if (get().isLoadingRecentRoutes) return;
    set({ isLoadingRecentRoutes: true, recentRoutesError: null, recentFlightRoutes: [] });
    try {
      const results = await Promise.all(recentCallsigns.map(cs => getFlightRouteByCallsign(cs).catch(e => { console.warn(`Recent route ${cs} fetch error:`, e.message || e); return null; })));
      set({ recentFlightRoutes: results.filter(Boolean) as FlightRoute[], isLoadingRecentRoutes: false });
    } catch (error) { console.error("Fetch recent routes error:", error); set({ recentRoutesError: 'Не удалось загрузить недавние маршруты.', isLoadingRecentRoutes: false }); }
  },

  searchedAirlines: [], isSearchingAirlines: false, searchAirlinesError: null, currentAirlineQuery: '',
  searchAirlines: (code: string) => {
    const upperCode = code.toUpperCase();
    return handleAsyncFetch<Airline[]>(set, get, 'isSearchingAirlines', 'searchAirlinesError', 'searchedAirlines', () => getAirlineByCode(upperCode), {
        defaultErrorMessage: 'Не удалось найти авиакомпании.', queryInfoForError: `Авиакомпании по коду "${upperCode}"`,
        onStart: () => ({ currentAirlineQuery: upperCode, searchedAirlines: [] }), isArrayData: true,
        onSuccess: (data) => { if (data && data.length > 0) { ls.manageRecentList(RECENT_AIRLINES_LS_KEY, upperCode, MAX_RECENT_AIRLINES); get().fetchRecentAirlines(); } },
    });
  },
  clearAirlinesSearch: () => set({ searchedAirlines: [], searchAirlinesError: null, isSearchingAirlines: false, currentAirlineQuery: '' }),

  recentAirlines: [], isLoadingRecentAirlines: false, recentAirlinesError: null,
  fetchRecentAirlines: async () => {
    const recentAirlineCodes = ls.get<string[]>(RECENT_AIRLINES_LS_KEY, []);
    if (recentAirlineCodes.length === 0) { set({ recentAirlines: [], isLoadingRecentAirlines: false }); return; }
    if (get().isLoadingRecentAirlines) return;
    set({ isLoadingRecentAirlines: true, recentAirlinesError: null, recentAirlines: [] });
    try {
      const resultsArraysOrNull = await Promise.all(
        recentAirlineCodes.map(code => getAirlineByCode(code).catch(e => {
          console.warn(`Recent airline code ${code} fetch error:`, e.message || e); return null;
        }))
      );
      const validResultsArrays = resultsArraysOrNull.filter(arr => arr !== null && arr.length > 0) as Airline[][];
      set({ recentAirlines: validResultsArrays, isLoadingRecentAirlines: false });
    } catch (error) {
      console.error("Fetch recent airlines error:", error);
      set({ recentAirlinesError: 'Не удалось загрузить недавние авиакомпании.', isLoadingRecentAirlines: false });
    }
  },
}));