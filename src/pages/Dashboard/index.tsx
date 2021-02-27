import React from 'react';
import { Button, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useLocation } from '../../hooks/location';
import {
  CurrentWeatherView,
  Container,
  CurrentWeatherInfo,
  MainTemp,
  ImgTemp,
  TextTitle,
  TextSubtitle,
  WeekTemps,
} from './styles';
import { colors } from '../../styles/colors';
import SunIcon from '../../components/Icons/SunIcon';

const Dashboard: React.FC = () => {
  const { clearLocation } = useLocation();
  return (
    <LinearGradient colors={colors.sunny} style={{ flex: 1 }}>
      <Container>
        <Button title="Sair" onPress={() => clearLocation()} />
        <CurrentWeatherView>
          <CurrentWeatherInfo>
            <TextTitle>Goiânia</TextTitle>
            <MainTemp>35°</MainTemp>
            <View>
              <TextTitle>Ensolarado</TextTitle>
              <TextSubtitle>Sensação térmica 38°</TextSubtitle>
            </View>
          </CurrentWeatherInfo>
          <ImgTemp>
            <SunIcon height="300px" />
          </ImgTemp>
        </CurrentWeatherView>
        <WeekTemps>
          <View>
            <TextSubtitle>2:00</TextSubtitle>
            <TextTitle>35°</TextTitle>
          </View>
          <View>
            <TextSubtitle>3:00</TextSubtitle>
            <TextTitle>35°</TextTitle>
          </View>
          <View>
            <TextSubtitle>4:00</TextSubtitle>
            <TextTitle>30°</TextTitle>
          </View>
          <View>
            <TextSubtitle>5:00</TextSubtitle>
            <TextTitle>27°</TextTitle>
          </View>
          <View>
            <TextSubtitle>6:00</TextSubtitle>
            <TextTitle>28°</TextTitle>
          </View>
        </WeekTemps>
      </Container>
    </LinearGradient>
  );
};

export default Dashboard;
