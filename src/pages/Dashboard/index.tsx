import React from 'react';
import { Button, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useLocation } from '../../hooks/location';
import { CurrentWeatherView, Container } from './styles';
import CloudIcon from '../../components/Icons/CloudIcon';
import { colors } from '../../styles/colors';

const Dashboard: React.FC = () => {
  const { clearLocation } = useLocation();
  return (
    <LinearGradient colors={colors.sunny} style={{ flex: 1 }}>
      <Container>
        <Button title="Sair" onPress={() => clearLocation()} />
        <CurrentWeatherView>
          <CloudIcon />
        </CurrentWeatherView>
      </Container>
    </LinearGradient>
  );
};

export default Dashboard;
