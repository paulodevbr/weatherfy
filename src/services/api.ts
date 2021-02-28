import axios from 'axios';
import { API_URL, API_TOKEN } from '@env';

export const apiConfig = {
  onecall: {
    params: {
      appid: API_TOKEN,
      lang: 'pt_br',
      units: 'metric',
      exclude: 'minutely',
    },
  },
  weather: {
    params: {
      appid: API_TOKEN,
      lang: 'pt_br',
      units: 'metric',
    },
  },
};

const api = axios.create({
  baseURL: API_URL,
});

export default api;
