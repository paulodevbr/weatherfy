import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import IconFeather from 'react-native-vector-icons/Feather';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { getDay } from 'date-fns';
import { useLocation } from '../../hooks/location';
import {
  CurrentWeatherView,
  Container,
  CurrentWeatherInfo,
  MainTemp,
  ImgTemp,
  TextTitle,
  TextSubtitle,
  HourTemps,
  WeekTemps,
  WeekDayText,
  HourTemp,
} from './styles';
import { colors } from '../../styles/colors';
import { Row } from '../../components/Row';
import { useWeather } from '../../hooks/weather';
import toDayOfWeek from '../../utils/toDayOfWeek';
import getWeatherColor from '../../utils/getWeatherColor';
import getWeatherIcon from '../../utils/getWeatherIcon';
import Button from '../../components/Button';

const Dashboard: React.FC = () => {
  const { clearLocation } = useLocation();
  const { loading, current, getWeather, hourly, daily } = useWeather();

  if (loading) {
    return (
      <LinearGradient
        colors={colors.rainy}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <ActivityIndicator size="large" color="#999" />
      </LinearGradient>
    );
  }

  if (!current) {
    return (
      <LinearGradient
        colors={colors.rainy}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <TextTitle>Não foi possível buscar dados do clima</TextTitle>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={getWeatherColor(current.main)} style={{ flex: 1 }}>
      <Container>
        <Row full withSpaceBetween>
          <Button
            onPress={() => clearLocation()}
            style={{
              height: 50,
              width: 50,
              borderRadius: 50 / 2,
              backgroundColor: 'rgba(255,255,255,0.3)',
            }}
          >
            <IconIonicons
              name="return-up-back-outline"
              size={25}
              color="white"
            />
          </Button>

          <Button
            onPress={() => getWeather()}
            style={{
              height: 50,
              width: 50,
              borderRadius: 50 / 2,
              backgroundColor: 'rgba(255,255,255,0.3)',
            }}
          >
            <IconIonicons name="refresh-outline" size={25} color="white" />
          </Button>
        </Row>

        <CurrentWeatherView>
          <CurrentWeatherInfo>
            <TextTitle>{current.city}</TextTitle>
            <View>
              <MainTemp>{current.temp}</MainTemp>
              <Row>
                <Row>
                  <IconFeather name="chevron-up" color="white" size={18} />
                  <TextSubtitle>{current.tempMax}</TextSubtitle>
                </Row>
                <Row>
                  <IconFeather name="chevron-down" color="white" size={18} />
                  <TextSubtitle>{current.tempMin}</TextSubtitle>
                </Row>
              </Row>
            </View>

            <View>
              <TextTitle>{current.description}</TextTitle>
              <TextSubtitle>{`Sensação térmica ${current.feelsLike}`}</TextSubtitle>
            </View>
          </CurrentWeatherInfo>
          <ImgTemp>
            <IconIonicons
              name={getWeatherIcon(current.main)}
              size={300}
              color="white"
            />
          </ImgTemp>
        </CurrentWeatherView>
        <HourTemps>
          {hourly.map(hourTemp => (
            <HourTemp>
              <TextSubtitle opacity="0.8">
                {`${new Date(hourTemp.time).getHours()}:00`}
              </TextSubtitle>
              <TextTitle fontWeight="bold">{hourTemp.temp}</TextTitle>
            </HourTemp>
          ))}
        </HourTemps>
        <WeekTemps>
          {daily.map(dayWeather => (
            <Row full withSpaceBetween>
              <WeekDayText>
                {toDayOfWeek(getDay(new Date(dayWeather.time)))}
              </WeekDayText>
              <IconIonicons
                name={getWeatherIcon(dayWeather.main)}
                size={24}
                color="white"
              />
              <Row width="15%" height="40px" withSpaceBetween>
                <TextSubtitle fontWeight="bold">
                  {dayWeather.tempMax}
                </TextSubtitle>
                <TextSubtitle opacity="0.8">{dayWeather.tempMin}</TextSubtitle>
              </Row>
            </Row>
          ))}
        </WeekTemps>
      </Container>
    </LinearGradient>
  );
};

export default Dashboard;
