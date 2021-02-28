import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api, { apiConfig } from '../services/api';
import { useLocation } from './location';
import upperCaseFirstLetter from '../utils/upperCaseFirstLetter';

interface WeatherState {
  current: WeatherLocation;
  hourly: Weather[];
  daily: WeatherDaily[];
}

interface Weather {
  time: Date;
  main: string;
  description: string;
  temp: string;
  feelsLike: string;
  tempMin: string;
  tempMax: string;
  windSpeed: number;
  humidity: number;
}

interface WeatherLocation extends Weather {
  city: string;
}

interface WeatherDaily extends Weather {
  tempNight: string;
  tempEvening: string;
  tempMorning: string;
}

interface WeatherLocationResponse {
  name: string;
}

interface WeatherResponse {
  timezone_offset: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  current: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    wind_speed: number;
    weather: [
      {
        id: number;
        main: string;
        description: string;
      },
    ];
  };
  hourly: {
    dt: number;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    wind_speed: number;
    weather: {
      id: number;
      main: string;
      description: string;
    }[];
  }[];
  daily: {
    dt: number;
    temp: {
      day: number;
      min: number;
      max: number;
      night: number;
      eve: number;
      morn: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
    }[];
    humidity: number;
    wind_speed: number;
  }[];
}

interface WeatherContextData {
  current: WeatherLocation;
  daily: WeatherDaily[];
  hourly: Weather[];
  loading: boolean;
  getWeather(): void;
  clearWeather(): void;
}

const Weather = createContext<WeatherContextData>({} as WeatherContextData);

export const WeatherProvider: React.FC = ({ children }) => {
  const [init, setInit] = useState(false);
  const [data, setData] = useState<WeatherState>({} as WeatherState);
  const [loading, setLoading] = useState(true);
  const currentLocation = useLocation();

  const getWeather = useCallback(async () => {
    const configApiOneCall = {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        lat: currentLocation.location.latitude,
        lon: currentLocation.location.longitude,
        ...apiConfig.onecall.params,
      },
    };
    const configApiWeather = {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        lat: currentLocation.location.latitude,
        lon: currentLocation.location.longitude,
        ...apiConfig.weather.params,
      },
    };
    setLoading(true);
    try {
      const weatherLocationResponse = (
        await api.get<WeatherLocationResponse>('/weather', configApiWeather)
      ).data;

      const weatherResponse = (
        await api.get<WeatherResponse>('/onecall', configApiOneCall)
      ).data;

      const { current, hourly, daily, timezone_offset } = weatherResponse;

      const currentWeather = current.weather[0];

      const newCurrentWeather: WeatherLocation = {
        city: weatherLocationResponse.name,
        time: new Date(Date.now()),
        main: currentWeather.main.toLowerCase(),
        description: upperCaseFirstLetter(currentWeather.description),
        temp: `${Math.floor(current.temp).toString()}°`,
        tempMax: `${Math.floor(daily[0].temp.max).toString()}°`,
        tempMin: `${Math.floor(daily[0].temp.min).toString()}°`,
        feelsLike: `${Math.floor(current.feels_like).toString()}°`,
        windSpeed: current.wind_speed,
        humidity: current.humidity,
      };

      const newHourlyWeather: Weather[] = hourly.map(hourWeather => ({
        time: new Date(hourWeather.dt * 1000 - timezone_offset),
        main: hourWeather.weather[0].main.toLowerCase(),
        description: upperCaseFirstLetter(hourWeather.weather[0].description),
        temp: `${Math.floor(hourWeather.temp).toString()}°`,
        tempMax: `${Math.floor(hourWeather.temp_max).toString()}°`,
        tempMin: `${Math.floor(hourWeather.temp_min).toString()}°`,
        feelsLike: `${Math.floor(hourWeather.feels_like).toString()}°`,
        windSpeed: hourWeather.wind_speed,
        humidity: Math.floor(hourWeather.humidity),
      }));

      const newDailyWeather: WeatherDaily[] = daily
        .filter((_, i) => i > 0 && i <= 7)
        .map(dayWeather => ({
          time: new Date(dayWeather.dt * 1000 - timezone_offset),
          main: dayWeather.weather[0].main.toLowerCase(),
          description: upperCaseFirstLetter(dayWeather.weather[0].description),
          temp: `${Math.floor(dayWeather.temp.day).toString()}°`,
          tempMax: `${Math.floor(dayWeather.temp.max).toString()}°`,
          tempMin: `${Math.floor(dayWeather.temp.min).toString()}°`,
          feelsLike: `${Math.floor(dayWeather.temp.day).toString()}°`,
          windSpeed: dayWeather.wind_speed,
          humidity: dayWeather.humidity,
          tempEvening: `${Math.floor(dayWeather.temp.eve).toString()}°`,
          tempMorning: `${Math.floor(dayWeather.temp.morn).toString()}°`,
          tempNight: `${Math.floor(dayWeather.temp.night).toString()}°`,
        }));

      await AsyncStorage.multiSet([
        ['@Weatherfy:weather-current', JSON.stringify(newCurrentWeather)],
        ['@Weatherfy:weather-hourly', JSON.stringify(newHourlyWeather)],
        ['@Weatherfy:weather-daily', JSON.stringify(newDailyWeather)],
      ]);

      setData({
        current: newCurrentWeather,
        hourly: newHourlyWeather,
        daily: newDailyWeather,
      });

      console.log(data);
    } catch (e) {
      console.error(e);
      throw new Error('Não foi possível buscar a temperatura');
    } finally {
      setLoading(false);
    }
  }, [data, currentLocation]);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [current, hourly, daily] = await AsyncStorage.multiGet([
        '@Weatherfy:weather-current',
        '@Weatherfy:weather-hourly',
        '@Weatherfy:weather-daily',
      ]);

      if (current[1] && hourly[1] && daily[1]) {
        setData({
          current: JSON.parse(current[1]),
          hourly: JSON.parse(hourly[1]),
          daily: JSON.parse(daily[1]),
        });
      } else {
        await getWeather();
      }

      console.log(data.current);
      setLoading(false);
    }

    if (!init && currentLocation && !currentLocation.loading) {
      setInit(true);
      loadStorageData();
    }
  }, [init, currentLocation, getWeather, data]);

  const clearWeather = useCallback(async () => {
    setData({} as WeatherState);
  }, []);

  return (
    <Weather.Provider
      value={{
        current: data ? data.current : ({} as WeatherLocation),
        daily: data ? data.daily : [],
        hourly: data ? data.hourly : [],
        getWeather,
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
