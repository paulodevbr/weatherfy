import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../pages/Dashboard';
import DayOfWeek from '../pages/DayOfWeek';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="DayOfWeek" component={DayOfWeek} />
  </App.Navigator>
);

export default AppRoutes;
