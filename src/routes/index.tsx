import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import LocationRoutes from './location.routes';
import AppRoutes from './app.routes';
import { useLocation } from '../hooks/location';

const Routes: React.FC = () => {
  const { location, loading } = useLocation();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  return location ? <AppRoutes /> : <LocationRoutes />;
};

export default Routes;
