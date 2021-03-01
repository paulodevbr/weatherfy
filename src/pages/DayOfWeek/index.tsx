import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import IconFeather from 'react-native-vector-icons/Feather';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { format, isSameDay } from 'date-fns';
import { useNavigation, Route } from '@react-navigation/native';
import {
  CurrentWeatherView,
  Container,
  CurrentWeatherInfo,
  MainTemp,
  ImgTemp,
  ActionButton,
} from './styles';
import { colors } from '../../styles/colors';
import { Row } from '../../components/Row';
import { useWeather, WeatherDaily } from '../../hooks/weather';
import getWeatherColor from '../../utils/getWeatherColor';
import getWeatherIcon from '../../utils/getWeatherIcon';
import { BrazilLocale } from '../../utils/BrazilLocale';
import upperCaseFirstLetter from '../../utils/upperCaseFirstLetter';
import TextTitle from '../../components/TextTitle';
import { ListWeatherHourly } from '../../components/ListWeatherHourly';
import TextSubtitle from '../../components/TextSubtitle';

interface Props {
  route: Route<'DayOfWeek', { weatherDay: WeatherDaily }>;
}

const DayOfWeek: React.FC<Props> = ({ route }) => {
  const { loading, current, hourly } = useWeather();
  const { goBack } = useNavigation();
  const { weatherDay } = route.params;

  const hoursFromDay = hourly.filter(hourWeather =>
    isSameDay(new Date(hourWeather.time), new Date(weatherDay.time)),
  );

  if (loading) {
    return (
      <LinearGradient
        colors={colors.default}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <ActivityIndicator size="large" color="#fff" />
      </LinearGradient>
    );
  }

  if (!weatherDay) {
    return (
      <LinearGradient
        colors={colors.default}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <TextTitle>Não foi possível buscar dados do clima</TextTitle>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={getWeatherColor(weatherDay.main)}
      style={{ flex: 1 }}
    >
      <Container>
        <Row full center height="100px">
          <TextSubtitle>
            {upperCaseFirstLetter(
              format(
                new Date(weatherDay.time),
                "eee, dd 'de' MMMM",
                BrazilLocale,
              ),
            )}
          </TextSubtitle>
        </Row>

        <CurrentWeatherView>
          <CurrentWeatherInfo>
            <TextTitle>{current.city}</TextTitle>
            <View>
              <MainTemp>{weatherDay.temp}</MainTemp>
              <Row>
                <Row>
                  <IconFeather name="chevron-up" color="white" size={18} />
                  <TextSubtitle>{weatherDay.tempMax}</TextSubtitle>
                </Row>
                <Row>
                  <IconFeather name="chevron-down" color="white" size={18} />
                  <TextSubtitle>{weatherDay.tempMin}</TextSubtitle>
                </Row>
              </Row>
            </View>

            <View>
              <TextTitle>{weatherDay.description}</TextTitle>
              <TextSubtitle>{`Sensação térmica ${weatherDay.feelsLike}`}</TextSubtitle>
            </View>
          </CurrentWeatherInfo>
          <ImgTemp>
            <IconIonicons
              name={getWeatherIcon(weatherDay.main)}
              size={300}
              color="white"
            />
          </ImgTemp>
        </CurrentWeatherView>
        <Row full withSpaceBetween height="50px">
          <Row width="30%">
            <IconFeather name="wind" size={24} color="white" />
            <TextSubtitle>{weatherDay.windSpeed}</TextSubtitle>
          </Row>
          <Row width="30%">
            <IconFeather name="droplet" size={24} color="white" />
            <TextSubtitle>{weatherDay.humidity}</TextSubtitle>
          </Row>
          <Row width="30%">
            <IconFeather name="clock" size={24} color="white" />
            <TextSubtitle>{weatherDay.pressure}</TextSubtitle>
          </Row>
        </Row>

        <ListWeatherHourly weatherByHour={hoursFromDay} />

        <Row full center height="100px">
          <ActionButton onPress={() => goBack()}>
            <IconIonicons
              name="return-up-back-outline"
              size={25}
              color="white"
            />
          </ActionButton>
        </Row>
      </Container>
    </LinearGradient>
  );
};

export default DayOfWeek;
