import axios, { AxiosRequestConfig } from 'axios';
import { API_URL, API_TOKEN } from '@env';
import { Location } from '../hooks/location';

export const apiConfig = {
  onecall: {
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      appid: API_TOKEN,
      lang: 'pt_br',
      units: 'metric',
      exclude: 'minutely',
    },
  },
  weather: {
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      appid: API_TOKEN,
      lang: 'pt_br',
      units: 'metric',
    },
  },
};

export const getConfigApi = (
  api: 'onecall' | 'weather',
  { latitude, longitude }: Location,
): AxiosRequestConfig => {
  switch (api) {
    case 'onecall':
      return {
        ...apiConfig.onecall,
        params: { ...apiConfig.onecall.params, lat: latitude, lon: longitude },
      };
    case 'weather':
      return {
        ...apiConfig.weather,
        params: { ...apiConfig.weather.params, lat: latitude, lon: longitude },
      };
    default:
      return {
        ...apiConfig.onecall,
        params: { ...apiConfig.onecall.params, lat: latitude, lon: longitude },
      };
  }
};

const api = axios.create({
  baseURL: API_URL,
});

export default api;
