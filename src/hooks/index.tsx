import React from 'react';
import { LocationProvider } from './location';
import { WeatherProvider } from './weather';

export const AppProvider: React.FC = ({ children }) => (
  <WeatherProvider>
    <LocationProvider>{children}</LocationProvider>
  </WeatherProvider>
);
