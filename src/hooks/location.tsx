import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';

interface LocationState {
  location: Location;
}

interface Location {
  latitude: number;
  longitude: number;
}

interface InfoCurrentLocation {
  coords: {
    latitude: number;
    longitude: number;
  };
}

interface LocationContextData {
  location: Location;
  loading: boolean;
  getCurrentLocation(): void;
  clearLocation(): void;
}

const Location = createContext<LocationContextData>({} as LocationContextData);

export const LocationProvider: React.FC = ({ children }) => {
  const [init, setInit] = useState(false);
  const [data, setData] = useState<LocationState>({} as LocationState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [location] = await AsyncStorage.multiGet(['@Weatherfy:location']);

      if (location[1]) {
        setData({ location: JSON.parse(location[1]) });
      }

      setLoading(false);
    }

    if (!init) {
      setInit(true);
      loadStorageData();
    }
  });

  const getCurrentLocation = useCallback(async () => {
    Geolocation.getCurrentPosition(async (info: InfoCurrentLocation) => {
      const { latitude, longitude } = info.coords;
      setLoading(true);

      const location: Location = { latitude, longitude };
      await AsyncStorage.multiSet([
        ['@Weatherfy:location', JSON.stringify(location)],
      ]);
      setData({ location });

      setLoading(false);
    });
  }, []);

  const clearLocation = useCallback(async () => {
    setData({} as LocationState);
  }, []);

  return (
    <Location.Provider
      value={{
        location: data.location,
        getCurrentLocation,
        clearLocation,
        loading,
      }}
    >
      {children}
    </Location.Provider>
  );
};

export const useLocation = (): LocationContextData => {
  const context = useContext(Location);

  if (!context) {
    throw new Error('useLocation must be used within an LocationProvider');
  }

  return context;
};
