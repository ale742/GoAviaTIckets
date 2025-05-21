import type {
  ApiResponse,
  ApiStatus,
  Aircraft,
  Airline,
  FlightRoute,
  AircraftWithFlightRoute,
  ModeSNNumberConversionResponse,
} from '@/types/apiTypes';
import { apiInstance } from './api-instance';

export const getApiStatus = async (): Promise<ApiStatus> => {
  const response = await apiInstance.get<ApiResponse<ApiStatus>>('/online');
  return response.data.response;
};

export const getAircraftByModeSReg = async (identifier: string): Promise<Aircraft> => {
  const response = await apiInstance.get<ApiResponse<{ aircraft: Aircraft }>>(`/aircraft/${identifier}`);
  if (response.data.response && response.data.response.aircraft) {
    return response.data.response.aircraft;
  }
  throw new Error('Aircraft data not found in response');
};

export const getFlightRouteByCallsign = async (callsign: string): Promise<FlightRoute> => {
  const response = await apiInstance.get<ApiResponse<{ flightroute: FlightRoute }>>(`/callsign/${callsign}`);
  if (response.data.response && response.data.response.flightroute) {
    return response.data.response.flightroute;
  }
  throw new Error('Flightroute data not found in response');
};

export const getAircraftWithFlightRoute = async (
  aircraftIdentifier: string,
  callsign: string
): Promise<AircraftWithFlightRoute> => {
  const response = await apiInstance.get<ApiResponse<AircraftWithFlightRoute>>(
    `/aircraft/${aircraftIdentifier}?callsign=${callsign}`
  );
  return response.data.response;
};

export const getAirlineByCode = async (airlineCode: string): Promise<Airline[]> => {
  const response = await apiInstance.get<ApiResponse<Airline[]>>(`/airline/${airlineCode}`);
  return response.data.response;
};

export const convertModeSToNNumber = async (modeS: string): Promise<string> => {
  const response = await apiInstance.get<ApiResponse<ModeSNNumberConversionResponse>>(`/mode-s/${modeS}`);
  return response.data.response;
};

export const convertNNumberToModeS = async (nNumber: string): Promise<string> => {
  const response = await apiInstance.get<ApiResponse<ModeSNNumberConversionResponse>>(`/n-number/${nNumber}`);
  return response.data.response;
};

