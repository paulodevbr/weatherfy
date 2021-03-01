import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AskLocation from '../pages/AskLocation';

const Location = createStackNavigator();

const LocationRoutes: React.FC = () => (
  <Location.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: '#312e38',
      },
    }}
  >
    <Location.Screen name="AskLocation" component={AskLocation} />
  </Location.Navigator>
);

export default LocationRoutes;
