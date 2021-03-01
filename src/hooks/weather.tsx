import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
import api, { getConfigApi } from '../services/api';
import { useLocation } from './location';
import upperCaseFirstLetter from '../utils/upperCaseFirstLetter';

interface WeatherState {
  current: WeatherLocation;
  hourly: Weather[];
  daily: WeatherDaily[];
}

export interface Weather {
  time: number;
  main: string;
  description: string;
  temp: string;
  feelsLike: string;
  tempMin: string;
  tempMax: string;
  windSpeed: string;
  humidity: string;
}

interface WeatherLocation extends Weather {
  latitude: number;
  longitude: number;
  city: string;
}

export interface WeatherDaily extends Weather {
  tempNight: string;
  tempEvening: string;
  tempMorning: string;
  pressure: string;
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
    pressure: number;
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
    setLoading(true);
    const { location } = currentLocation;
    try {
      const weatherLocationResponse = (
        await api.get<WeatherLocationResponse>(
          '/weather',
          getConfigApi('weather', location),
        )
      ).data;

      const weatherResponse = (
        await api.get<WeatherResponse>(
          '/onecall',
          getConfigApi('onecall', location),
        )
      ).data;

      const { current, hourly, daily, timezone_offset } = weatherResponse;

      const currentWeather = current.weather[0];

      const newCurrentWeather: WeatherLocation = {
        latitude: location.latitude,
        longitude: location.longitude,
        city: weatherLocationResponse.name,
        time: Date.now(),
        main: currentWeather.main.toLowerCase(),
        description: upperCaseFirstLetter(currentWeather.description),
        temp: `${Math.floor(current.temp).toString()}°`,
        tempMax: `${Math.floor(daily[0].temp.max).toString()}°`,
        tempMin: `${Math.floor(daily[0].temp.min).toString()}°`,
        feelsLike: `${Math.floor(current.feels_like).toString()}°`,
        windSpeed: `${Math.floor(current.wind_speed).toString()} km/h`,
        humidity: `${Math.floor(current.humidity).toString()} %`,
      };

      const newHourlyWeather: Weather[] = hourly.map(hourWeather => ({
        time: hourWeather.dt * 1000 - timezone_offset,
        main: hourWeather.weather[0].main.toLowerCase(),
        description: upperCaseFirstLetter(hourWeather.weather[0].description),
        temp: `${Math.floor(hourWeather.temp).toString()}°`,
        tempMax: `${Math.floor(hourWeather.temp_max).toString()}°`,
        tempMin: `${Math.floor(hourWeather.temp_min).toString()}°`,
        feelsLike: `${Math.floor(hourWeather.feels_like).toString()}°`,
        windSpeed: `${Math.floor(hourWeather.wind_speed).toString()} km/h`,
        humidity: `${Math.floor(hourWeather.humidity).toString()} %`,
      }));

      const newDailyWeather: WeatherDaily[] = daily
        .filter((_, i) => i > 0 && i <= 7)
        .map(dayWeather => ({
          time: dayWeather.dt * 1000 - timezone_offset,
          main: dayWeather.weather[0].main.toLowerCase(),
          description: upperCaseFirstLetter(dayWeather.weather[0].description),
          temp: `${Math.floor(dayWeather.temp.day).toString()}°`,
          tempMax: `${Math.floor(dayWeather.temp.max).toString()}°`,
          tempMin: `${Math.floor(dayWeather.temp.min).toString()}°`,
          feelsLike: `${Math.floor(dayWeather.temp.day).toString()}°`,
          windSpeed: `${Math.floor(dayWeather.wind_speed).toString()} km/h`,
          humidity: `${Math.floor(dayWeather.humidity).toString()} %`,
          pressure: `${Math.floor(dayWeather.pressure).toString()} hPa`,
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
    } catch (e) {
      Alert.alert(
        'Sem conexão',
        'Não foi possível buscar o clima, usando dados offline',
      );
    } finally {
      setLoading(false);
    }
  }, [currentLocation]);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [current, hourly, daily] = await AsyncStorage.multiGet([
        '@Weatherfy:weather-current',
        '@Weatherfy:weather-hourly',
        '@Weatherfy:weather-daily',
      ]);

      if (current[1] && hourly[1] && daily[1]) {
        const currentWeather = JSON.parse(current[1]) as WeatherLocation;

        const isDifferentLatitude =
          Math.abs(
            currentWeather.latitude - currentLocation.location.latitude,
          ) > 1;

        const isDifferentLongitude =
          Math.abs(
            currentWeather.longitude - currentLocation.location.longitude,
          ) > 1;

        if (isDifferentLatitude || isDifferentLongitude) {
          await getWeather();
        } else {
          setData({
            current: JSON.parse(current[1]),
            hourly: JSON.parse(hourly[1]),
            daily: JSON.parse(daily[1]),
          });
        }
      } else {
        await getWeather();
      }

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
