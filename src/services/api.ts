import axios from 'axios';
import { API_URL, API_TOKEN } from '@env';

const api = axios.create({
  baseURL: API_URL,
  params: { appid: API_TOKEN, lang: 'pt_br' },
});

export default api;
