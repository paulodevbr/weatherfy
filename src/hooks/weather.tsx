import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
import { useLocation } from './location';

interface WeatherState {
  weather: Weather;
}

interface Weather {
  latitude: number;
  longitude: number;
}

interface CurrentWeatherResponse {
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

interface WeatherContextData {
  weather: Weather;
  loading: boolean;
  getCurrentWeather(): void;
  clearWeather(): void;
}

const Weather = createContext<WeatherContextData>({} as WeatherContextData);

export const WeatherProvider: React.FC = ({ children }) => {
  const [init, setInit] = useState(false);
  const [data, setData] = useState<WeatherState>({} as WeatherState);
  const [loading, setLoading] = useState(true);
  const { location } = useLocation();

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [weather] = await AsyncStorage.multiGet(['@Weatherfy:weather']);

      if (weather[1]) {
        setData({ weather: JSON.parse(weather[1]) });
      }

      setLoading(false);
    }

    if (!init) {
      setInit(true);
      loadStorageData();
    }
  });

  const getCurrentWeather = useCallback(async () => {
    const config = {
      params: {
        lat: location.latitude,
        lon: location.longitude,
        units: 'metric',
      },
    };
  }, []);

  const clearWeather = useCallback(async () => {
    setData({} as WeatherState);
  }, []);

  return (
    <Weather.Provider
      value={{
        weather: data.weather,
        getCurrentWeather,
        clearWeather,
        loading,
      }}
    >
      {children}
    </Weather.Provider>
  );
};

export const useWeather = (): WeatherContextData => {
  const context = useContext(Weather);

  if (!context) {
    throw new Error('useWeather must be used within an WeatherProvider');
  }

  return context;
};
